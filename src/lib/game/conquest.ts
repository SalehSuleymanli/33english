/**
 * Word Empires — a 4-player world-conquest game powered by English answers.
 *
 * Expansion: everyone picks an empty region next to their land, then answers
 * the same question; right answers claim their picks (fastest wins a clash).
 * Battle: players take turns attacking a neighbouring region; attacker and
 * defender answer the same question and the better answer wins the region.
 * Capitals have towers; knock them all down to take the whole empire.
 *
 * Everything here is deterministic: the server replays the match from the
 * stored picks and answers, so nobody can fake a conquest.
 */
import { FIXES, GRAMMAR, HEROES, type HeroId } from "@/content/quest";
import { WORDS, type GameWord } from "@/content/words";
import { hashString, rng, shuffle } from "./rng";

export const SEATS = 4;
export const LOBBY_MS = 15_000;
export const COUNTDOWN_MS = 4_000;
export const PICK_MS = 8_000;
export const QUESTION_MS = 10_000;
export const REVEAL_MS = 4_500;
export const STEP_MS = PICK_MS + QUESTION_MS + REVEAL_MS;
export const EXPAND_ROUNDS = 3;
export const BATTLE_ROUNDS = 3;
export const CAPITAL_TOWERS = 3;
export const REGION_POINTS = 200;
export const CAPITAL_POINTS = 600;
export const SEAT_COLORS = ["#e84a5f", "#3f7fe8", "#2fa86b", "#f0a020"];

/* ------------------------------------------------------------------ the world */

export type Region = { id: string; name: string; letter: string; adj: number[] };

const DEFS: [id: string, name: string, letter: string, adj: string[]][] = [
  ["canada", "Canada", "C", ["usa", "nordic", "russia"]],
  ["usa", "United States", "U", ["canada", "mexico"]],
  ["mexico", "Central America", "M", ["usa", "brazil"]],
  ["brazil", "Brazil", "B", ["mexico", "andes", "sahara"]],
  ["andes", "Andes", "A", ["brazil", "safrica", "australia"]],
  ["westeu", "Western Europe", "W", ["nordic", "easteu", "sahara"]],
  ["nordic", "Scandinavia", "N", ["westeu", "easteu", "canada", "russia"]],
  ["easteu", "Eastern Europe", "E", ["westeu", "nordic", "russia", "mideast"]],
  ["sahara", "North Africa", "S", ["westeu", "brazil", "safrica", "mideast"]],
  ["safrica", "Southern Africa", "F", ["sahara", "andes", "mideast"]],
  ["mideast", "Middle East", "D", ["easteu", "sahara", "safrica", "india", "russia"]],
  ["russia", "Russia", "R", ["canada", "nordic", "easteu", "mideast", "china"]],
  ["india", "South Asia", "I", ["mideast", "china", "seasia"]],
  ["china", "East Asia", "H", ["russia", "india", "seasia"]],
  ["seasia", "Southeast Asia", "P", ["india", "china", "australia"]],
  ["australia", "Australia", "O", ["seasia", "andes", "india"]],
];

const IDS = DEFS.map((d) => d[0]);
export const REGIONS: Region[] = DEFS.map(([id, name, letter]) => ({ id, name, letter, adj: [] }));
for (const [id, , , adj] of DEFS) {
  const i = IDS.indexOf(id);
  for (const a of adj) {
    const j = IDS.indexOf(a);
    if (!REGIONS[i].adj.includes(j)) REGIONS[i].adj.push(j);
    if (!REGIONS[j].adj.includes(i)) REGIONS[j].adj.push(i);
  }
}

/** Seat i starts in CAPITALS[i] (chosen so each start wins about a quarter of bot-only matches). */
export const CAPITALS = ["usa", "easteu", "safrica", "australia"].map((id) => IDS.indexOf(id));
export const isCapital = (r: number) => CAPITALS.includes(r);
export const regionPoints = (r: number) => (isCapital(r) ? CAPITAL_POINTS : REGION_POINTS);

/** A stylised hex world: each letter is one hex of a region, "." is sea. */
export const MAP_ROWS = [
  "..CCCC......NN..RRRRRRRR..",
  ".CCCCCC....NNN.RRRRRRRRRR.",
  "..CCCCC.....NNEERRRRRRRR..",
  "...UUUU....WWEEERRRRHHH...",
  "...UUUUU...WWWEEDDRHHHHH..",
  "....UUU.....SSSDDDIIHHHH..",
  ".....MM....SSSSSDDIIIPHH..",
  "......MM...SSSSS..III.PP..",
  ".......BBB...FFF...I..PPP.",
  "......BBBB...FFF......P...",
  "......BBB....FF.....OOOO..",
  ".......AA...........OOOOO.",
  ".......AA............OO...",
];

/** Routes across the sea, drawn as dashed lines on the map. */
export const SEA_ROUTES: [number, number][] = [
  ["canada", "nordic"],
  ["canada", "russia"],
  ["brazil", "sahara"],
  ["andes", "safrica"],
  ["andes", "australia"],
  ["seasia", "australia"],
  ["india", "australia"],
].map(([a, b]) => [IDS.indexOf(a), IDS.indexOf(b)]);

/* ------------------------------------------------------------------ the match plan */

export type StepDef = { index: number; kind: "expand" | "duel"; round: number; attacker: number | null };

export const STEPS: StepDef[] = [
  ...Array.from({ length: EXPAND_ROUNDS }, (_, r): StepDef => ({ index: r, kind: "expand", round: r + 1, attacker: null })),
  ...Array.from({ length: BATTLE_ROUNDS }, (_, r) =>
    Array.from({ length: SEATS }, (_, k): StepDef => ({ index: EXPAND_ROUNDS + r * SEATS + k, kind: "duel", round: r + 1, attacker: (r + k) % SEATS })),
  ).flat(),
];
export const MATCH_MS = STEPS.length * STEP_MS; // the longest a match can last after the countdown

/* ------------------------------------------------------------------ questions */

export type QKind = "grammar" | "fix" | "meaning" | "gap";
export const Q_LABEL: Record<QKind, string> = { grammar: "Grammar", fix: "Spot the correct one", meaning: "What's the word?", gap: "Fill the gap" };
export type Question = { kind: QKind; prompt: string; options: string[]; answer: number; tip: string };

function wordOptions(r: () => number, target: GameWord): string[] {
  const pool = shuffle(
    r,
    WORDS.filter((w) => w.word !== target.word && Math.abs(w.level - target.level) <= 1 && w.syn !== target.word && target.syn !== w.word),
  );
  return shuffle(r, [target.word, ...pool.slice(0, 3).map((w) => w.word)]);
}

export function matchQuestions(seed: number, n = STEPS.length): Question[] {
  const r = rng(hashString(`conquest:${seed}`));
  const base: QKind[] = ["grammar", "fix", "meaning", "gap"];
  const kinds = Array.from({ length: Math.ceil(n / 4) }, () => shuffle(r, base)).flat().slice(0, n);
  const grammar = shuffle(r, GRAMMAR);
  const fixes = shuffle(r, FIXES);
  const words = shuffle(r, WORDS);
  let g = 0;
  let f = 0;
  let w = 0;
  return kinds.map((kind): Question => {
    if (kind === "grammar") {
      const it = grammar[g++ % grammar.length];
      const options = shuffle(r, it.options);
      return { kind, prompt: it.sentence, options, answer: options.indexOf(it.answer), tip: it.tip };
    }
    if (kind === "fix") {
      const it = fixes[f++ % fixes.length];
      const options = shuffle(r, [it.right, it.wrong, it.decoy]);
      return { kind, prompt: "Which sentence is correct?", options, answer: options.indexOf(it.right), tip: it.tip };
    }
    const word = words[w++ % words.length];
    const options = wordOptions(r, word);
    const answer = options.indexOf(word.word);
    if (kind === "meaning") return { kind, prompt: word.def, options, answer, tip: word.example.replace("___", word.word) };
    return { kind, prompt: word.example, options, answer, tip: `${word.word} — ${word.def}` };
  });
}

/* ------------------------------------------------------------------ bots */

const BOT_NAMES = ["Aysel", "Murad", "Leyla", "Emma", "Kenji", "Sara", "Tural", "Nigar", "Lucas", "Amina", "Elvin", "Mia", "Omar", "Zara", "Farid", "Lena", "Ravan", "Nora", "Kamal", "Ivy"];

export type Bot = { seat: number; name: string; avatar: HeroId; skill: number };

export function matchBots(seed: number, humanSeats: number[]): Bot[] {
  const r = rng(hashString(`conquest-bots:${seed}`));
  const names = shuffle(r, BOT_NAMES);
  return Array.from({ length: SEATS }, (_, s) => s)
    .filter((s) => !humanSeats.includes(s))
    .map((seat, k) => ({ seat, name: names[k], avatar: HEROES[Math.floor(r() * HEROES.length)].id, skill: 0.5 + r() * 0.35 }));
}

function botAnswer(seed: number, bot: Bot, step: number, q: Question) {
  const r = rng(hashString(`conquest-bot:${seed}:${bot.seat}:${step}`));
  const correct = r() < bot.skill;
  const ms = Math.round((correct ? 2200 : 3500) + r() * 6000);
  const wrong = q.options.map((_, i) => i).filter((i) => i !== q.answer);
  return { choice: correct ? q.answer : wrong[Math.floor(r() * wrong.length)], ms };
}

/* ------------------------------------------------------------------ state */

export type Board = { owner: number[]; towers: number[]; alive: boolean[]; correct: number[] };

export function initialBoard(): Board {
  const owner = REGIONS.map(() => -1);
  CAPITALS.forEach((r, seat) => (owner[r] = seat));
  return { owner, towers: Array(SEATS).fill(CAPITAL_TOWERS), alive: Array(SEATS).fill(true), correct: Array(SEATS).fill(0) };
}

const cloneBoard = (b: Board): Board => ({ owner: [...b.owner], towers: [...b.towers], alive: [...b.alive], correct: [...b.correct] });

export function scoreOf(b: Board, seat: number): number {
  return b.owner.reduce((n, o, r) => n + (o === seat ? regionPoints(r) : 0), 0);
}

/** Regions a seat may pick in this kind of step. */
export function legalTargets(b: Board, seat: number, kind: "expand" | "duel"): number[] {
  if (!b.alive[seat]) return [];
  const mine = b.owner.map((o, r) => (o === seat ? r : -1)).filter((r) => r >= 0);
  const near = new Set(mine.flatMap((r) => REGIONS[r].adj));
  if (kind === "expand") {
    const free = REGIONS.map((_, r) => r).filter((r) => b.owner[r] === -1);
    const adjacentFree = free.filter((r) => near.has(r));
    return adjacentFree.length ? adjacentFree : free;
  }
  return [...near].filter((r) => b.owner[r] !== seat).sort((a, c) => a - c);
}

/** What a bot (or a player who ran out of time) picks. */
export function defaultPick(b: Board, seat: number, kind: "expand" | "duel", seed: number, step: number): number | null {
  const legal = legalTargets(b, seat, kind);
  if (!legal.length) return null;
  const r = rng(hashString(`conquest-pick:${seed}:${step}:${seat}`));
  if (kind === "expand") return legal[Math.floor(r() * legal.length)];
  // prefer neutral land, then the weakest-looking enemy; sometimes go for a capital
  const scored = legal.map((t) => ({ t, w: (b.owner[t] === -1 ? 3 : 1) + (isCapital(t) ? 0.6 : 0) + r() * 1.5 }));
  scored.sort((a, c) => c.w - a.w);
  return scored[0].t;
}

/* ------------------------------------------------------------------ replay */

export type Action = { seat: number; step: number; kind: "pick" | "answer"; value: number; ms: number };
export type AnswerResult = { seat: number; choice: number | null; correct: boolean; ms: number };
export type Outcome = {
  step: number;
  kind: "expand" | "duel";
  picks: Record<number, number>; // seat → region (expand: all; duel: attacker)
  target: number | null;
  defender: number | null; // seat, or null for neutral land
  results: AnswerResult[];
  captured: { seat: number; region: number }[];
  towerHit: { seat: number; left: number } | null;
  eliminated: number | null;
  text: string;
};

export type Live =
  | { phase: "countdown"; endsAt: number }
  | { phase: "pick" | "question" | "reveal"; step: StepDef; stepStart: number; endsAt: number; pickers: number[]; participants: number[]; target: number | null; defender: number | null; legal: Record<number, number[]>; outcome: Outcome | null }
  | { phase: "done" };

export type Replay = { board: Board; live: Live; history: Outcome[]; questions: Question[] };

type ReplayArgs = { seed: number; names: string[]; humanSeats: number[]; actions: Action[]; start: number; now: number };

function pickFor(a: ReplayArgs, b: Board, seat: number, step: StepDef): number | null {
  const kind = step.kind;
  const legal = legalTargets(b, seat, kind);
  if (a.humanSeats.includes(seat)) {
    const act = a.actions.find((x) => x.seat === seat && x.step === step.index && x.kind === "pick");
    if (act && legal.includes(act.value)) return act.value;
  }
  return defaultPick(b, seat, kind, a.seed, step.index);
}

function answerFor(a: ReplayArgs, bots: Bot[], seat: number, step: number, q: Question): AnswerResult {
  const bot = bots.find((x) => x.seat === seat);
  if (bot) {
    const { choice, ms } = botAnswer(a.seed, bot, step, q);
    return { seat, choice, correct: choice === q.answer, ms };
  }
  const act = a.actions.find((x) => x.seat === seat && x.step === step && x.kind === "answer");
  if (!act || act.ms > QUESTION_MS) return { seat, choice: null, correct: false, ms: QUESTION_MS };
  return { seat, choice: act.value, correct: act.value === q.answer, ms: act.ms };
}

const better = (x: AnswerResult, y: AnswerResult) => x.correct && (!y.correct || x.ms < y.ms);

function resolve(a: ReplayArgs, bots: Bot[], b: Board, step: StepDef, q: Question): { board: Board; outcome: Outcome } {
  const next = cloneBoard(b);
  const name = (s: number) => a.names[s] ?? `Player ${s + 1}`;
  if (step.kind === "expand") {
    const seats = [0, 1, 2, 3].filter((s) => b.alive[s]);
    const picks: Record<number, number> = {};
    for (const s of seats) {
      const p = pickFor(a, b, s, step);
      if (p !== null) picks[s] = p;
    }
    const results = seats.map((s) => answerFor(a, bots, s, step.index, q));
    for (const r of results) if (r.correct) next.correct[r.seat]++;
    const captured: Outcome["captured"] = [];
    for (const r of [...results].filter((x) => x.correct && picks[x.seat] !== undefined).sort((x, y) => x.ms - y.ms || x.seat - y.seat)) {
      const region = picks[r.seat];
      if (next.owner[region] === -1) {
        next.owner[region] = r.seat;
        captured.push({ seat: r.seat, region });
      }
    }
    const text = captured.length ? captured.map((c) => `${name(c.seat)} claimed ${REGIONS[c.region].name}`).join(" · ") : "Nobody claimed new land this round.";
    return { board: next, outcome: { step: step.index, kind: "expand", picks, target: null, defender: null, results, captured, towerHit: null, eliminated: null, text } };
  }

  const attacker = step.attacker!;
  const target = pickFor(a, b, attacker, step)!;
  const defOwner = b.owner[target];
  const defender = defOwner >= 0 ? defOwner : null;
  const atk = answerFor(a, bots, attacker, step.index, q);
  const def = defender !== null ? answerFor(a, bots, defender, step.index, q) : null;
  const results = def ? [atk, def] : [atk];
  for (const r of results) if (r.correct) next.correct[r.seat]++;
  const wins = def ? better(atk, def) : atk.correct;
  const outcome: Outcome = { step: step.index, kind: "duel", picks: { [attacker]: target }, target, defender, results, captured: [], towerHit: null, eliminated: null, text: "" };
  const where = REGIONS[target].name;
  if (!wins) {
    outcome.text = defender === null ? `${name(attacker)} failed to take ${where}.` : `${name(defender)} defended ${where}!`;
    return { board: next, outcome };
  }
  if (defender !== null && isCapital(target) && CAPITALS[defender] === target) {
    next.towers[defender]--;
    outcome.towerHit = { seat: defender, left: next.towers[defender] };
    if (next.towers[defender] > 0) {
      outcome.text = `${name(attacker)} broke a tower of ${name(defender)}'s capital! ${next.towers[defender]} left.`;
      return { board: next, outcome };
    }
    // the capital falls: the whole empire changes hands
    next.alive[defender] = false;
    next.owner.forEach((o, r) => {
      if (o === defender) {
        next.owner[r] = attacker;
        outcome.captured.push({ seat: attacker, region: r });
      }
    });
    outcome.eliminated = defender;
    outcome.text = `${name(attacker)} captured ${name(defender)}'s capital and the whole empire!`;
    return { board: next, outcome };
  }
  next.owner[target] = attacker;
  outcome.captured.push({ seat: attacker, region: target });
  outcome.text = `${name(attacker)} conquered ${where}!`;
  return { board: next, outcome };
}

/** Replays the match up to `now`. The same inputs always give the same result. */
export function replay(a: ReplayArgs): Replay {
  const questions = matchQuestions(a.seed);
  const bots = matchBots(a.seed, a.humanSeats);
  let board = initialBoard();
  const history: Outcome[] = [];
  if (a.now < a.start) return { board, live: { phase: "countdown", endsAt: a.start }, history, questions };
  let t = a.start;
  for (const step of STEPS) {
    if (board.alive.filter(Boolean).length <= 1) break;
    const pickers = step.kind === "expand" ? [0, 1, 2, 3].filter((s) => board.alive[s]) : [step.attacker!];
    const legal: Record<number, number[]> = {};
    for (const s of pickers) legal[s] = legalTargets(board, s, step.kind);
    // a turn with nothing to do is skipped instantly
    if (pickers.every((s) => !board.alive[s] || legal[s].length === 0)) continue;
    const end = t + STEP_MS;
    if (a.now < end) {
      const e = a.now - t;
      const phase = e < PICK_MS ? "pick" : e < PICK_MS + QUESTION_MS ? "question" : "reveal";
      let target: number | null = null;
      let defender: number | null = null;
      let participants = pickers;
      if (step.kind === "duel" && phase !== "pick") {
        target = pickFor(a, board, step.attacker!, step);
        const o = target === null ? -1 : board.owner[target];
        defender = o >= 0 ? o : null;
        participants = defender === null ? [step.attacker!] : [step.attacker!, defender];
      } else if (step.kind === "duel") participants = [step.attacker!];
      let outcome: Outcome | null = null;
      let shown = board;
      if (phase === "reveal") {
        const r = resolve(a, bots, board, step, questions[step.index]);
        outcome = r.outcome;
        shown = r.board;
      }
      const endsAt = phase === "pick" ? t + PICK_MS : phase === "question" ? t + PICK_MS + QUESTION_MS : end;
      return { board: shown, live: { phase, step, stepStart: t, endsAt, pickers, participants, target, defender, legal, outcome }, history, questions };
    }
    const r = resolve(a, bots, board, step, questions[step.index]);
    board = r.board;
    history.push(r.outcome);
    t = end;
  }
  return { board, live: { phase: "done" }, history, questions };
}

/* ------------------------------------------------------------------ results & XP */

export type PlayerView = { seat: number; name: string; avatar: HeroId; bot: boolean; me: boolean; score: number; regions: number; towers: number; alive: boolean; correct: number; color: string };

export function rankPlayers<T extends { score: number; correct: number; seat: number }>(players: T[]): T[] {
  return [...players].sort((a, b) => b.score - a.score || b.correct - a.correct || a.seat - b.seat);
}

const PLACE_BONUS = [60, 35, 20, 5];
export const conquestXp = (rank: number, correct: number) => 30 + 5 * correct + (PLACE_BONUS[rank - 1] ?? 0);
export const ordinal = (n: number) => `${n}${n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th"}`;
export const safeAvatar = (a: string | null | undefined): HeroId => (HEROES.some((h) => h.id === a) ? (a as HeroId) : "fox");

/** What the server sends on every poll. */
export type ConquestState = {
  ok: true;
  matchId: string;
  serverNow: number;
  fillAt: number;
  startAt: number;
  phase: "lobby" | "countdown" | "pick" | "question" | "reveal" | "done";
  endsAt: number | null;
  step: { index: number; total: number; kind: "expand" | "duel"; round: number; attacker: number | null; target: number | null; defender: number | null } | null;
  owner: number[];
  towers: number[];
  players: PlayerView[];
  mySeat: number;
  legal: number[]; // regions I may pick right now
  myPick: number | null;
  canAnswer: boolean;
  myChoice: number | null;
  question: { kind: QKind; prompt: string; options: string[] } | null;
  reveal: { answer: number; tip: string; results: AnswerResult[]; text: string; captured: number[]; picks: Record<number, number> } | null;
  lastEvent: string | null;
  review: { kind: QKind; prompt: string; options: string[]; answer: number; mine: number | null; tip: string }[] | null;
};
