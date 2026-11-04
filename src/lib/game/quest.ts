/**
 * Word Quest engine — pure and deterministic.
 * The browser plays the battle with these functions, and the server replays
 * the same action log to confirm a win before any XP is given.
 */
import { FIXES, GRAMMAR, HEROES, STAGES, stageById, worldById, type Enemy, type Hero, type HeroId, type QuestionKind, type Stage } from "@/content/quest";
import { WORDS } from "@/content/words";
import { build, DEFAULT_OPTIONS, type Options } from "@/engine/build";
import { seedsForFrame } from "@/engine/seeds";
import type { FrameId } from "@/content/types";
import { pick, rng, scramble, shuffle } from "./rng";

export type Question =
  | { kind: "discover"; id: string; prompt: string; hint: string; letters: string[]; answer: string; tip: string }
  | { kind: "build"; id: string; prompt: string; tiles: string[]; answer: string; frame: FrameId; tip: string }
  | { kind: "grammar"; id: string; prompt: string; options: string[]; answer: string; frame: FrameId; tip: string }
  | { kind: "match"; id: string; prompt: string; options: string[]; answer: string; tip: string }
  | { kind: "fix"; id: string; prompt: string; wrong: string; options: string[]; answer: string; frame: FrameId; tip: string };

export const MAX_TURNS = 40;

export const KIND_LABEL: Record<QuestionKind, string> = {
  discover: "Word discovery",
  build: "Sentence builder",
  grammar: "Grammar battle",
  match: "Vocabulary match",
  fix: "Fix the mistake",
};

const norm = (s: string) => s.toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, " ").trim();

export function isCorrect(q: Question, answer: string): boolean {
  if (q.kind === "build") return norm(answer).replace(/[.?!]$/, "") === norm(q.answer).replace(/[.?!]$/, "");
  return norm(answer) === norm(q.answer);
}

/* ------------------------------------------------------------------ question generation */

function kindsFor(stage: Stage): QuestionKind[] {
  const w = worldById(stage.world);
  return Object.entries(w.mix).flatMap(([k, n]) => Array<QuestionKind>(n ?? 0).fill(k as QuestionKind));
}

const BUILD_OPTIONS: Record<number, Partial<Options>[]> = {
  1: [{}, { time: "past" }, { polarity: "negative" }, { mood: "question" }, { time: "future" }],
  2: [{}, { time: "past" }, { aspect: "continuous" }, { aspect: "perfect" }, { mood: "question", time: "past" }, { polarity: "negative" }],
  3: [{ modal: "can" }, { modal: "should" }, { modal: "must" }, { modal: "might" }, { modal: "haveTo" }, {}, { time: "past" }, { polarity: "negative" }],
  4: [{ voice: "passive" }, { voice: "passive", time: "past" }, { voice: "passive", aspect: "perfect" }, { voice: "passive", time: "future" }, { modal: "should" }, { aspect: "perfect" }],
};

function buildQuestion(stage: Stage, r: () => number, id: string): Question | null {
  const w = worldById(stage.world);
  const frames = w.frames.filter((f) => f !== "passive" || stage.world === 4);
  for (let tries = 0; tries < 30; tries++) {
    const frame = stage.world === 4 && r() < 0.6 ? "passive" : pick(r, frames);
    const pool = seedsForFrame(frame);
    if (!pool.length) continue;
    const seed = pick(r, pool);
    const o = { ...DEFAULT_OPTIONS, ...pick(r, BUILD_OPTIONS[stage.world]) } as Options;
    if (frame === "passive") o.voice = "passive";
    const res = build(seed, o);
    if (!res.ok) continue;
    const words = res.sentence.split(" ");
    if (words.length < 3 || words.length > 9) continue;
    return { kind: "build", id, prompt: "Put the words in order to attack!", tiles: scramble(r, words), answer: res.sentence, frame, tip: res.notes[0] ?? "Follow the frame: each word has its place." };
  }
  return null;
}

function wordPool(stage: Stage) {
  const w = worldById(stage.world);
  return WORDS.filter((x) => w.wordLevels.includes(x.level));
}

export function questionFor(stageId: string, seed: number, index: number): Question {
  const stage = stageById(stageId)!;
  const r = rng(`q:${stageId}:${seed}:${index}`);
  const kinds = kindsFor(stage);
  // vary the order across a battle without repeating the same kind three times in a row
  const kind = kinds[Math.floor(r() * kinds.length)];
  const id = `${stageId}:${seed}:${index}`;
  const deck = (name: string) => rng(`deck:${stageId}:${seed}:${name}`);
  const w = worldById(stage.world);

  if (kind === "build") {
    const q = buildQuestion(stage, r, id);
    if (q) return q;
  }
  if (kind === "grammar" || kind === "build") {
    const items = shuffle(deck("grammar"), GRAMMAR.filter((g) => w.frames.includes(g.frame)));
    const g = items[index % items.length];
    return { kind: "grammar", id, prompt: g.sentence, options: shuffle(r, g.options), answer: g.answer, frame: g.frame, tip: g.tip };
  }
  if (kind === "fix") {
    const items = shuffle(deck("fix"), FIXES.filter((f) => w.frames.includes(f.frame)));
    const f = items[index % items.length];
    return { kind: "fix", id, prompt: "Which sentence fixes the mistake?", wrong: f.wrong, options: shuffle(r, [f.right, f.decoy, f.wrong]), answer: f.right, frame: f.frame, tip: f.tip };
  }
  const words = shuffle(deck("words"), wordPool(stage).filter((x) => x.word.length <= 9));
  const target = words[index % words.length];
  if (kind === "discover") {
    return {
      kind: "discover",
      id,
      prompt: target.def.charAt(0).toUpperCase() + target.def.slice(1),
      hint: target.example,
      letters: scramble(r, target.word.split("")),
      answer: target.word,
      tip: target.example.replace("___", target.word),
    };
  }
  const others = shuffle(r, wordPool(stage).filter((x) => x.word !== target.word)).slice(0, 3).map((x) => x.word);
  return {
    kind: "match",
    id,
    prompt: target.def.charAt(0).toUpperCase() + target.def.slice(1),
    options: shuffle(r, [target.word, ...others]),
    answer: target.word,
    tip: target.example.replace("___", target.word),
  };
}

/* ------------------------------------------------------------------ battle state */

export type Action = { t: "answer"; a: string } | { t: "potion" } | { t: "shield" } | { t: "special" };

export type Fx =
  | { type: "hit"; dmg: number; crit: boolean }
  | { type: "hurt"; dmg: number; blocked: boolean; rage?: boolean }
  | { type: "heal"; amount: number }
  | { type: "shield" }
  | { type: "special" }
  | { type: "defeat"; enemy: string; drop?: "potion" | "shield" }
  | { type: "won" }
  | { type: "lost" };

export type Battle = {
  stageId: string;
  seed: number;
  hero: HeroId;
  power: number;
  maxHp: number;
  hp: number;
  atk: number;
  enemyIdx: number;
  enemyHp: number;
  potions: number;
  shields: number;
  shieldUp: boolean;
  combo: number;
  bestCombo: number;
  specialReady: boolean;
  specialArmed: boolean;
  turn: number;
  correct: number;
  wrong: number;
  status: "playing" | "won" | "lost";
  fx: Fx[];
  lastCorrect?: boolean;
};

export const MAX_POWER = 10;
export const powerFromStars = (stars: number) => Math.min(MAX_POWER, Math.floor(Math.max(0, stars) / 5));

export function heroById(id: string): Hero | undefined {
  return HEROES.find((h) => h.id === id);
}

export function startBattle(stageId: string, seed: number, heroId: HeroId, power = 0): Battle {
  const stage = stageById(stageId);
  const hero = heroById(heroId);
  if (!stage || !hero) throw new Error("Unknown stage or hero");
  const p = Math.max(0, Math.min(MAX_POWER, Math.floor(power)));
  return {
    stageId,
    seed,
    hero: hero.id,
    power: p,
    maxHp: hero.hp,
    hp: hero.hp,
    atk: hero.atk + p,
    enemyIdx: 0,
    enemyHp: stage.enemies[0].hp,
    potions: hero.potions,
    shields: hero.shields,
    shieldUp: false,
    combo: 0,
    bestCombo: 0,
    specialReady: false,
    specialArmed: false,
    turn: 0,
    correct: 0,
    wrong: 0,
    status: "playing",
    fx: [],
  };
}

export function currentEnemy(b: Battle): Enemy {
  return stageById(b.stageId)!.enemies[Math.min(b.enemyIdx, stageById(b.stageId)!.enemies.length - 1)];
}

export function currentQuestion(b: Battle): Question {
  return questionFor(b.stageId, b.seed, b.turn);
}

export function step(b: Battle, action: Action): Battle {
  if (b.status !== "playing") return b;
  const stage = stageById(b.stageId)!;
  const fx: Fx[] = [];

  if (action.t === "potion") {
    if (b.potions < 1 || b.hp >= b.maxHp) return b;
    const amount = Math.min(40, b.maxHp - b.hp);
    return { ...b, hp: b.hp + amount, potions: b.potions - 1, fx: [{ type: "heal", amount }] };
  }
  if (action.t === "shield") {
    if (b.shields < 1 || b.shieldUp) return b;
    return { ...b, shields: b.shields - 1, shieldUp: true, fx: [{ type: "shield" }] };
  }
  if (action.t === "special") {
    if (!b.specialReady || b.specialArmed) return b;
    return { ...b, specialReady: false, specialArmed: true, fx: [{ type: "special" }] };
  }

  const q = currentQuestion(b);
  const ok = isCorrect(q, action.a);
  const enemy = stage.enemies[b.enemyIdx];
  let { hp, enemyHp, enemyIdx, potions, shields, shieldUp, combo, bestCombo, specialReady, specialArmed } = b;
  let status: Battle["status"] = "playing";

  if (ok) {
    combo += 1;
    bestCombo = Math.max(bestCombo, combo);
    let dmg = b.atk;
    const crit = specialArmed;
    if (specialArmed) dmg = Math.round(dmg * 2.5);
    if (b.hero === "owl" && combo >= 2) dmg = Math.round(dmg * 1.25);
    specialArmed = false;
    if (combo % 3 === 0) specialReady = true;
    enemyHp -= dmg;
    fx.push({ type: "hit", dmg, crit });
    if (enemyHp <= 0) {
      const last = enemyIdx >= stage.enemies.length - 1;
      const drop = last ? undefined : enemyIdx % 2 === 0 ? ("potion" as const) : ("shield" as const);
      if (drop === "potion") potions += 1;
      if (drop === "shield") shields += 1;
      fx.push({ type: "defeat", enemy: enemy.name, drop });
      if (last) {
        status = "won";
        enemyHp = 0;
        fx.push({ type: "won" });
      } else {
        enemyIdx += 1;
        enemyHp = stage.enemies[enemyIdx].hp;
      }
    }
  } else {
    combo = 0;
    specialArmed = false;
    if (shieldUp) {
      shieldUp = false;
      fx.push({ type: "hurt", dmg: 0, blocked: true });
    } else {
      hp -= enemy.atk;
      fx.push({ type: "hurt", dmg: enemy.atk, blocked: false });
    }
  }

  const turn = b.turn + 1;
  // bosses grow restless: every third turn they strike anyway
  if (status === "playing" && enemy.boss && turn % 3 === 0) {
    const dmg = Math.round(enemy.atk * 0.6);
    if (shieldUp) {
      shieldUp = false;
      fx.push({ type: "hurt", dmg: 0, blocked: true, rage: true });
    } else {
      hp -= dmg;
      fx.push({ type: "hurt", dmg, blocked: false, rage: true });
    }
  }
  if (status === "playing" && hp <= 0) {
    hp = 0;
    status = "lost";
    fx.push({ type: "lost" });
  }
  if (status === "playing" && turn >= MAX_TURNS) {
    status = "lost";
    fx.push({ type: "lost" });
  }
  return {
    ...b,
    hp,
    enemyHp,
    enemyIdx,
    potions,
    shields,
    shieldUp,
    combo,
    bestCombo,
    specialReady,
    specialArmed,
    turn,
    correct: b.correct + (ok ? 1 : 0),
    wrong: b.wrong + (ok ? 0 : 1),
    status,
    fx,
    lastCorrect: ok,
  };
}

/** Replays a whole battle from its log (used by the server to verify a win). */
export function replay(stageId: string, seed: number, hero: HeroId, power: number, log: Action[]): Battle {
  let b = startBattle(stageId, seed, hero, power);
  for (const a of log) {
    if (b.status !== "playing") break;
    b = step(b, a);
  }
  return b;
}

export function starsFor(b: Battle): number {
  if (b.status !== "won") return 0;
  const ratio = b.hp / b.maxHp;
  return ratio >= 0.6 ? 3 : ratio >= 0.3 ? 2 : 1;
}

export function questXp(stage: Stage, firstClear: boolean): number {
  if (!firstClear) return 15;
  return 40 + stage.world * 10 + (stage.boss ? 60 : 0);
}

export function stageIndex(id: string) {
  return STAGES.findIndex((s) => s.id === id);
}

/** A stage is open when the one before it has been cleared. */
export function isStageOpen(id: string, cleared: Set<string>): boolean {
  const i = stageIndex(id);
  if (i < 0) return false;
  return i === 0 || cleared.has(STAGES[i - 1].id);
}

export type UnlockFacts = { cleared: Set<string>; crosswordsSolved: number; bestStreak: number; level: number };

export function heroUnlocked(id: HeroId, f: UnlockFacts): boolean {
  switch (id) {
    case "fox":
      return true;
    case "turtle":
      return f.cleared.has("w1-s5");
    case "owl":
      return f.crosswordsSolved >= 5;
    case "bunny":
      return f.bestStreak >= 7;
    case "bear":
      return f.cleared.has("w2-s5") && f.level >= 8;
  }
}
