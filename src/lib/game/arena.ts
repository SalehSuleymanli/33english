/**
 * English Arena — a live 5-player trivia match. Everything that decides the
 * game (questions, timeline, bots, points) lives here and is deterministic, so
 * the server can check every answer. The match seed never leaves the server.
 */
import { FIXES, GRAMMAR, HEROES, type HeroId } from "@/content/quest";
import { WORDS, type GameWord } from "@/content/words";
import { hashString, rng, shuffle } from "./rng";

export const SEATS = 5;
export const QUESTIONS = 8;
export const LOBBY_MS = 12_000; // how long we wait for real players before bots join
export const COUNTDOWN_MS = 4_000;
export const QUESTION_MS = 10_000;
export const REVEAL_MS = 4_000;
export const ROUND_MS = QUESTION_MS + REVEAL_MS;
export const MATCH_MS = QUESTIONS * ROUND_MS;
export const MAX_POINTS = 1000;

export type ArenaKind = "grammar" | "fix" | "meaning" | "gap";
export const ARENA_KIND_LABEL: Record<ArenaKind, string> = { grammar: "Grammar", fix: "Spot the correct one", meaning: "What's the word?", gap: "Fill the gap" };

export type ArenaQuestion = { kind: ArenaKind; prompt: string; options: string[]; answer: number; tip: string };

export type Phase =
  | { phase: "lobby" }
  | { phase: "countdown"; endsAt: number }
  | { phase: "question"; q: number; endsAt: number; startedAt: number }
  | { phase: "reveal"; q: number; endsAt: number }
  | { phase: "done" };

/** When the match starts: as soon as 5 players are in, or when the lobby wait ends. */
export const effectiveStart = (fillAt: number, startAt: number | null) => startAt ?? fillAt + COUNTDOWN_MS;

export function phaseAt(now: number, fillAt: number, startAt: number | null): Phase {
  const start = effectiveStart(fillAt, startAt);
  if (startAt === null && now < fillAt) return { phase: "lobby" };
  if (now < start) return { phase: "countdown", endsAt: start };
  const t = now - start;
  const q = Math.floor(t / ROUND_MS);
  if (q >= QUESTIONS) return { phase: "done" };
  const within = t - q * ROUND_MS;
  const qStart = start + q * ROUND_MS;
  if (within < QUESTION_MS) return { phase: "question", q, startedAt: qStart, endsAt: qStart + QUESTION_MS };
  return { phase: "reveal", q, endsAt: qStart + ROUND_MS };
}

/** Number of questions whose answers are public (closed) at this moment. */
export function closedCount(p: Phase): number {
  if (p.phase === "done") return QUESTIONS;
  if (p.phase === "reveal") return p.q + 1;
  if (p.phase === "question") return p.q;
  return 0;
}

/** Faster correct answers score more: 500–1000 points. */
export function pointsFor(correct: boolean, ms: number): number {
  if (!correct) return 0;
  const t = Math.min(Math.max(ms, 0), QUESTION_MS);
  return Math.round(500 + 500 * (1 - t / QUESTION_MS));
}

/* ------------------------------------------------------------------ questions */

function wordOptions(r: () => number, target: GameWord, n = 4): string[] {
  const pool = shuffle(
    r,
    WORDS.filter((w) => w.word !== target.word && Math.abs(w.level - target.level) <= 1 && w.syn !== target.word && target.syn !== w.word),
  );
  return shuffle(r, [target.word, ...pool.slice(0, n - 1).map((w) => w.word)]);
}

export function arenaQuestions(seed: number): ArenaQuestion[] {
  const r = rng(hashString(`arena:${seed}`));
  const kinds = shuffle(r, ["grammar", "grammar", "fix", "fix", "meaning", "meaning", "gap", "gap"] as ArenaKind[]);
  const grammar = shuffle(r, GRAMMAR);
  const fixes = shuffle(r, FIXES);
  const words = shuffle(r, WORDS);
  const used = new Set<string>();
  const nextWord = () => {
    const w = words.find((x) => !used.has(x.word))!;
    used.add(w.word);
    return w;
  };
  let g = 0;
  let f = 0;
  return kinds.map((kind): ArenaQuestion => {
    if (kind === "grammar") {
      const it = grammar[g++];
      const options = shuffle(r, it.options);
      return { kind, prompt: it.sentence, options, answer: options.indexOf(it.answer), tip: it.tip };
    }
    if (kind === "fix") {
      const it = fixes[f++];
      const options = shuffle(r, [it.right, it.wrong, it.decoy]);
      return { kind, prompt: "Which sentence is correct?", options, answer: options.indexOf(it.right), tip: it.tip };
    }
    const w = nextWord();
    const options = wordOptions(r, w);
    const answer = options.indexOf(w.word);
    if (kind === "meaning") return { kind, prompt: w.def, options, answer, tip: w.example.replace("___", w.word) };
    return { kind, prompt: w.example, options, answer, tip: `${w.word} — ${w.def}` };
  });
}

/* ------------------------------------------------------------------ bots */

const BOT_NAMES = ["Aysel", "Murad", "Leyla", "Emma", "Kenji", "Sara", "Tural", "Nigar", "Lucas", "Amina", "Elvin", "Mia", "Omar", "Zara", "Farid", "Lena", "Ravan", "Nora", "Kamal", "Ivy"];

export type Bot = { seat: number; name: string; avatar: HeroId; skill: number };

/** Bots take every seat that no person took. */
export function arenaBots(seed: number, takenSeats: number[]): Bot[] {
  const r = rng(hashString(`arena-bots:${seed}`));
  const names = shuffle(r, BOT_NAMES);
  const free = Array.from({ length: SEATS }, (_, s) => s).filter((s) => !takenSeats.includes(s));
  return free.map((seat, k) => ({
    seat,
    name: names[k],
    avatar: HEROES[Math.floor(r() * HEROES.length)].id,
    skill: 0.5 + r() * 0.35, // 50–85% right, like real learners
  }));
}

export type BotAnswer = { choice: number; correct: boolean; ms: number; points: number };

export function botAnswer(seed: number, bot: Bot, q: number, question: ArenaQuestion): BotAnswer {
  const r = rng(hashString(`arena-bot:${seed}:${bot.seat}:${q}`));
  const correct = r() < bot.skill;
  const ms = Math.round((correct ? 2200 : 3500) + r() * 6000);
  const wrong = question.options.map((_, i) => i).filter((i) => i !== question.answer);
  const choice = correct ? question.answer : wrong[Math.floor(r() * wrong.length)];
  return { choice, correct, ms, points: pointsFor(correct, ms) };
}

/* ------------------------------------------------------------------ results & XP */

export type ArenaPlayerView = {
  seat: number;
  name: string;
  avatar: HeroId;
  bot: boolean;
  me: boolean;
  score: number;
  correct: number;
  last: boolean | null; // result of the latest closed question
};

/** Rank by score; ties go to the player with more correct answers, then the lower seat. */
export function rankPlayers<T extends { score: number; correct: number; seat: number }>(players: T[]): T[] {
  return [...players].sort((a, b) => b.score - a.score || b.correct - a.correct || a.seat - b.seat);
}

/** What the server sends to a player on every poll. */
export type ArenaState = {
  ok: true;
  matchId: string;
  serverNow: number;
  fillAt: number;
  startAt: number;
  phase: Phase;
  question: { index: number; kind: ArenaKind; prompt: string; options: string[] } | null;
  reveal: { answer: number; tip: string; picks: Record<number, number> } | null; // picks: seat → option
  myChoice: number | null;
  players: ArenaPlayerView[];
  review: { kind: ArenaKind; prompt: string; options: string[]; answer: number; mine: number | null; tip: string }[] | null;
};

const PLACE_BONUS = [40, 25, 15, 5, 0];
export const arenaXp = (rank: number, correct: number) => 20 + 5 * correct + (PLACE_BONUS[rank - 1] ?? 0);

export const ordinal = (n: number) => `${n}${n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th"}`;

export const safeAvatar = (a: string | null | undefined): HeroId => (HEROES.some((h) => h.id === a) ? (a as HeroId) : "fox");
