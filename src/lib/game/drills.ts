/**
 * Six short practice games built from the course's own tested content:
 *   builder   — Sentence Builder: put shuffled words in order (engine sentences)
 *   battle    — Grammar Battle: choose the right form, against the clock (GRAMMAR)
 *   detective — Error Detective: is it right? if not, pick the correction (FIXES)
 *   transform — Sentence Transformation: rewrite as told (engine challenges)
 *   vocab     — Vocabulary Challenge: match English words with AZ/RU meanings (WORDS)
 *   gap       — Fill in the Gap: type the missing form (GRAMMAR)
 * A round is fully determined by (game, seed), so the server can rebuild and
 * re-grade it before granting XP.
 */
import { FIXES, GRAMMAR } from "@/content/quest";
import { WORDS } from "@/content/words";
import { WORD_L10N } from "@/content/l10n/words";
import { CHANGE_LABELS, FIX_TIPS, GRAMMAR_TIPS } from "@/content/l10n/quest-tips";
import type { FrameId } from "@/content/types";
import { CHANGES, challengeFromId } from "@/engine/challenges";
import { seedsForFrame } from "@/engine/seeds";
import { checkText } from "@/engine/check";
import { rng, scramble, shuffle } from "./rng";

export const DRILL_IDS = ["builder", "battle", "detective", "transform", "vocab", "gap"] as const;
export type DrillId = (typeof DRILL_IDS)[number];

type Tip = { en: string; az: string; ru: string };

export type DrillItem =
  | { kind: "order"; frame: FrameId; tiles: string[]; answer: string }
  | { kind: "choice"; frame: FrameId; prompt: string; options: string[]; answer: number; tip: Tip }
  | { kind: "detect"; frame: FrameId; sentence: string; options: string[]; answer: number; tip: Tip } // option 0 = "correct as it is"
  | { kind: "type"; frame: FrameId; prompt: string; instruction: Tip; accept: string[]; tip?: Tip }
  | { kind: "match"; pairs: { en: string; az: string; ru: string }[]; order: number[] }; // order = shuffled meanings shown

/** What the player submits for each item. */
export type DrillAnswer = number | string | number[] | null;

export const DRILL_META: Record<DrillId, { items: number; seconds?: number }> = {
  builder: { items: 8 },
  battle: { items: 10, seconds: 15 },
  detective: { items: 8 },
  transform: { items: 8 },
  vocab: { items: 3 },
  gap: { items: 10 },
};

const FRAMES: FrameId[] = ["existence", "states", "actions", "modals", "possession", "passive"];

type EngineSentence = { frame: FrameId; text: string; source: string; ci: number; accept: string[] };

function engineSentences(r: () => number, n: number): EngineSentence[] {
  const out: EngineSentence[] = [];
  const seen = new Set<string>();
  for (let tries = 0; out.length < n && tries < 400; tries++) {
    const frame = FRAMES[Math.floor(r() * FRAMES.length)];
    const pool = seedsForFrame(frame);
    const seed = pool[Math.floor(r() * pool.length)];
    const ci = Math.floor(r() * CHANGES.length);
    const c = challengeFromId(`lab~${frame}~${seed.id}~${ci}`);
    if (!c || seen.has(c.target)) continue;
    seen.add(c.target);
    out.push({ frame, text: c.target, source: c.source, ci, accept: c.accept });
  }
  return out;
}

export function makeRound(game: DrillId, seed: number): DrillItem[] {
  const r = rng(`drill:${game}:${seed}`);
  const n = DRILL_META[game].items;
  if (game === "builder") {
    return engineSentences(r, n).map((s) => {
      const words = s.text.split(" ");
      return { kind: "order", frame: s.frame, tiles: scramble(r, words), answer: s.text };
    });
  }
  if (game === "battle") {
    return shuffle(r, GRAMMAR.map((g, i) => ({ g, i }))).slice(0, n).map(({ g, i }) => {
      const options = shuffle(r, g.options);
      return { kind: "choice", frame: g.frame, prompt: g.sentence, options, answer: options.indexOf(g.answer), tip: { en: g.tip, ...GRAMMAR_TIPS[i] } };
    });
  }
  if (game === "gap") {
    return shuffle(r, GRAMMAR.map((g, i) => ({ g, i }))).slice(0, n).map(({ g, i }) => ({
      kind: "type",
      frame: g.frame,
      prompt: g.sentence,
      instruction: { en: "Type the missing word(s).", az: "Buraxılmış söz(lər)i yazın.", ru: "Впишите пропущенное слово (слова)." },
      accept: [g.answer],
      tip: { en: g.tip, ...GRAMMAR_TIPS[i] },
    }));
  }
  if (game === "detective") {
    return shuffle(r, FIXES.map((f, i) => ({ f, i }))).slice(0, n).map(({ f, i }) => {
      const showWrong = r() < 0.7;
      const fixes = shuffle(r, showWrong ? [f.right, f.decoy] : [f.wrong, f.decoy]);
      const options = ["", ...fixes]; // 0 = correct as it is
      return { kind: "detect", frame: f.frame, sentence: showWrong ? f.wrong : f.right, options, answer: showWrong ? options.indexOf(f.right) : 0, tip: { en: f.tip, ...FIX_TIPS[i] } };
    });
  }
  if (game === "transform") {
    return engineSentences(r, n).map((s): DrillItem => ({
      kind: "type",
      frame: s.frame,
      prompt: s.source,
      instruction: { en: CHANGES[s.ci].label, ...CHANGE_LABELS[s.ci] },
      accept: s.accept,
    }));
  }
  // vocab: sets of 5 words to match with their meanings
  const words = shuffle(r, WORDS.filter((w) => WORD_L10N[w.word]));
  return Array.from({ length: n }, (_, k) => {
    const pairs = words.slice(k * 5, k * 5 + 5).map((w) => ({ en: w.word, az: WORD_L10N[w.word][0], ru: WORD_L10N[w.word][1] }));
    return { kind: "match", pairs, order: scramble(r, pairs.map((_, i) => i)) };
  });
}

/** Points available for one item (vocab sets are worth one point per pair). */
export const itemPoints = (item: DrillItem) => (item.kind === "match" ? item.pairs.length : 1);

/** Points earned for one answer. */
export function gradeItem(item: DrillItem, answer: DrillAnswer): number {
  if (answer === null || answer === undefined) return 0;
  switch (item.kind) {
    case "order":
      return typeof answer === "string" && norm(answer) === norm(item.answer) ? 1 : 0;
    case "choice":
    case "detect":
      return answer === item.answer ? 1 : 0;
    case "type": {
      if (typeof answer !== "string" || !answer.trim()) return 0;
      const res = checkText(answer, { accept: item.accept });
      return res.status === "correct" || res.status === "alternative" ? 1 : 0;
    }
    case "match": {
      // answer[i] = index of the meaning (in item.pairs) chosen for word i
      if (!Array.isArray(answer)) return 0;
      return item.pairs.reduce((n, _, i) => n + (answer[i] === i ? 1 : 0), 0);
    }
  }
}

const norm = (s: string) => s.toLowerCase().replace(/[.,!?]/g, "").replace(/\s+/g, " ").trim();

export function gradeRound(game: DrillId, seed: number, answers: DrillAnswer[]) {
  const items = makeRound(game, seed);
  const total = items.reduce((n, it) => n + itemPoints(it), 0);
  const points = items.reduce((n, it, i) => n + gradeItem(it, answers[i] ?? null), 0);
  return { points, total, percent: Math.round((points / total) * 100) };
}

/** XP for a round: up to 40, in proportion to the score; nothing below 30%. */
export const drillXp = (points: number, total: number) => (points / total < 0.3 ? 0 : Math.round((40 * points) / total));
export const drillStars = (percent: number) => (percent >= 90 ? 3 : percent >= 70 ? 2 : percent >= 40 ? 1 : 0);
