/**
 * Deterministic crossword generator. The same puzzle id always gives the same
 * grid, so the server can rebuild a puzzle and check a learner's answers.
 */
import { WORDS, type GameWord } from "@/content/words";
import { rng, shuffle } from "./rng";

export type Difficulty = "easy" | "medium" | "hard";
export type Dir = "across" | "down";
export type ClueType = "definition" | "example" | "synonym";

export type Entry = {
  num: number;
  dir: Dir;
  row: number;
  col: number;
  answer: string;
  clue: string;
  clueType: ClueType;
  example: string; // the full example, shown after solving
};

export type Puzzle = {
  id: string;
  difficulty: Difficulty;
  number: number;
  width: number;
  height: number;
  /** null = black square */
  grid: (string | null)[][];
  entries: Entry[];
};

export const DIFFICULTY: Record<Difficulty, { label: string; words: number; levels: (1 | 2 | 3)[]; parSeconds: number; xp: number; blurb: string }> = {
  easy: { label: "Easy", words: 6, levels: [1], parSeconds: 180, xp: 40, blurb: "Everyday words · 6 clues" },
  medium: { label: "Medium", words: 8, levels: [1, 2, 2], parSeconds: 300, xp: 60, blurb: "Useful words · 8 clues" },
  hard: { label: "Hard", words: 10, levels: [2, 3, 3], parSeconds: 480, xp: 90, blurb: "Richer vocabulary · 10 clues" },
};

export const MAX_PUZZLE_NUMBER = 9999;

export function puzzleId(d: Difficulty, n: number) {
  return `${d}-${n}`;
}

export function parsePuzzleId(id: string): { difficulty: Difficulty; number: number } | null {
  const m = /^(easy|medium|hard)-(\d{1,4})$/.exec(id);
  if (!m) return null;
  const n = Number(m[2]);
  if (n < 1 || n > MAX_PUZZLE_NUMBER) return null;
  return { difficulty: m[1] as Difficulty, number: n };
}

const SIZE = 17;

type Placed = { w: GameWord; row: number; col: number; dir: Dir };

const occ = new Set<string>(); // "r,c,dir" for cells used by a word in that direction

function fits(board: (string | null)[][], word: string, row: number, col: number, dir: Dir): number {
  const dr = dir === "down" ? 1 : 0;
  const dc = dir === "across" ? 1 : 0;
  const endR = row + dr * (word.length - 1);
  const endC = col + dc * (word.length - 1);
  if (row < 0 || col < 0 || endR >= SIZE || endC >= SIZE) return -1;
  // cells just before and after the word must be empty
  const br = row - dr, bc = col - dc, ar = endR + dr, ac = endC + dc;
  if (br >= 0 && bc >= 0 && board[br][bc]) return -1;
  if (ar < SIZE && ac < SIZE && board[ar][ac]) return -1;
  let crossings = 0;
  for (let i = 0; i < word.length; i++) {
    const r = row + dr * i;
    const c = col + dc * i;
    const cur = board[r][c];
    if (cur) {
      if (cur !== word[i] || occ.has(`${r},${c},${dir}`)) return -1;
      crossings++;
      continue;
    }
    // a new letter must not touch other letters side-by-side (no accidental words)
    const n1 = dir === "across" ? (r > 0 ? board[r - 1][c] : null) : c > 0 ? board[r][c - 1] : null;
    const n2 = dir === "across" ? (r < SIZE - 1 ? board[r + 1][c] : null) : c < SIZE - 1 ? board[r][c + 1] : null;
    if (n1 || n2) return -1;
  }
  return crossings;
}

function place(board: (string | null)[][], p: Placed) {
  for (let i = 0; i < p.w.word.length; i++) {
    const r = p.row + (p.dir === "down" ? i : 0);
    const c = p.col + (p.dir === "across" ? i : 0);
    board[r][c] = p.w.word[i];
    occ.add(`${r},${c},${p.dir}`);
  }
}

function attempt(id: string, d: Difficulty, salt: number): Placed[] {
  const cfg = DIFFICULTY[d];
  const r = rng(`cw:${id}:${salt}`);
  const pool = shuffle(
    r,
    WORDS.filter((w) => cfg.levels.includes(w.level) && w.word.length >= 3 && w.word.length <= (d === "easy" ? 8 : 11)),
  );
  // mix levels as configured (e.g. hard = mostly level 3)
  const ordered: GameWord[] = [];
  const byLevel = new Map<number, GameWord[]>();
  for (const w of pool) byLevel.set(w.level, [...(byLevel.get(w.level) ?? []), w]);
  for (let i = 0; ordered.length < pool.length && i < pool.length * 2; i++) {
    const lv = cfg.levels[i % cfg.levels.length];
    const list = byLevel.get(lv);
    const next = list?.shift();
    if (next) ordered.push(next);
    else {
      const any = [...byLevel.values()].find((l) => l.length)?.shift();
      if (any) ordered.push(any);
    }
  }
  // start with a longer word for a better skeleton
  const firstIdx = ordered.findIndex((w) => w.word.length >= 5);
  const first = ordered.splice(Math.max(0, firstIdx), 1)[0];
  const board: (string | null)[][] = Array.from({ length: SIZE }, () => Array<string | null>(SIZE).fill(null));
  occ.clear();
  const placed: Placed[] = [];
  const start: Placed = { w: first, row: Math.floor(SIZE / 2), col: Math.floor((SIZE - first.word.length) / 2), dir: "across" };
  place(board, start);
  placed.push(start);
  const used = new Set([first.word]);

  for (const w of ordered) {
    if (placed.length >= cfg.words) break;
    if (used.has(w.word)) continue;
    let best: { p: Placed; score: number } | null = null;
    for (const other of placed) {
      for (let i = 0; i < other.w.word.length; i++) {
        for (let j = 0; j < w.word.length; j++) {
          if (other.w.word[i] !== w.word[j]) continue;
          const dir: Dir = other.dir === "across" ? "down" : "across";
          const cr = other.row + (other.dir === "down" ? i : 0);
          const cc = other.col + (other.dir === "across" ? i : 0);
          const row = dir === "down" ? cr - j : cr;
          const col = dir === "across" ? cc - j : cc;
          const crossings = fits(board, w.word, row, col, dir);
          if (crossings < 1) continue;
          // prefer more crossings, then compactness, with a little randomness
          const spread = Math.abs(row - SIZE / 2) + Math.abs(col - SIZE / 2);
          const score = crossings * 10 - spread * 0.4 + r();
          if (!best || score > best.score) best = { p: { w, row, col, dir }, score };
        }
      }
    }
    if (best) {
      place(board, best.p);
      placed.push(best.p);
      used.add(w.word);
    }
  }
  return placed;
}

const cache = new Map<string, Puzzle>();

export function generatePuzzle(id: string): Puzzle | null {
  const parsed = parsePuzzleId(id);
  if (!parsed) return null;
  const hit = cache.get(id);
  if (hit) return hit;
  const { difficulty: d, number } = parsed;
  let placed: Placed[] = [];
  for (let salt = 0; salt < 12; salt++) {
    const a = attempt(id, d, salt);
    if (a.length > placed.length) placed = a;
    if (placed.length >= DIFFICULTY[d].words) break;
  }

  // crop to the used area
  let minR = SIZE, minC = SIZE, maxR = 0, maxC = 0;
  for (const p of placed) {
    const endR = p.row + (p.dir === "down" ? p.w.word.length - 1 : 0);
    const endC = p.col + (p.dir === "across" ? p.w.word.length - 1 : 0);
    minR = Math.min(minR, p.row); minC = Math.min(minC, p.col);
    maxR = Math.max(maxR, endR); maxC = Math.max(maxC, endC);
  }
  const height = maxR - minR + 1;
  const width = maxC - minC + 1;
  const grid: (string | null)[][] = Array.from({ length: height }, () => Array<string | null>(width).fill(null));
  const shifted = placed.map((p) => ({ ...p, row: p.row - minR, col: p.col - minC }));
  for (const p of shifted) {
    for (let i = 0; i < p.w.word.length; i++) {
      grid[p.row + (p.dir === "down" ? i : 0)][p.col + (p.dir === "across" ? i : 0)] = p.w.word[i];
    }
  }

  // standard numbering: reading order of start cells
  const starts = [...new Set(shifted.map((p) => `${p.row},${p.col}`))]
    .map((k) => k.split(",").map(Number) as [number, number])
    .sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const numberOf = new Map(starts.map(([r, c], i) => [`${r},${c}`, i + 1]));

  const r = rng(`cw-clues:${id}`);
  const entries: Entry[] = shifted
    .map((p) => {
      const types: ClueType[] = ["definition", "definition", "example", ...(p.w.syn ? (["synonym"] as ClueType[]) : [])];
      const clueType = types[Math.floor(r() * types.length)];
      const clue =
        clueType === "synonym" ? `Another word for "${p.w.syn}"` : clueType === "example" ? p.w.example : capitalise(p.w.def);
      return {
        num: numberOf.get(`${p.row},${p.col}`)!,
        dir: p.dir,
        row: p.row,
        col: p.col,
        answer: p.w.word,
        clue,
        clueType,
        example: p.w.example.replace("___", p.w.word),
      };
    })
    .sort((a, b) => (a.dir === b.dir ? a.num - b.num : a.dir === "across" ? -1 : 1));

  const puzzle: Puzzle = { id, difficulty: d, number, width, height, grid, entries };
  if (cache.size > 200) cache.clear();
  cache.set(id, puzzle);
  return puzzle;
}

const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function entryCells(e: Pick<Entry, "row" | "col" | "dir" | "answer">): [number, number][] {
  return Array.from({ length: e.answer.length }, (_, i) => [e.row + (e.dir === "down" ? i : 0), e.col + (e.dir === "across" ? i : 0)]);
}

/** Server-side check: every word must be filled in correctly. */
export function checkCrossword(id: string, answers: Record<string, string>): { ok: boolean; puzzle: Puzzle | null; correct: number; total: number } {
  const puzzle = generatePuzzle(id);
  if (!puzzle) return { ok: false, puzzle: null, correct: 0, total: 0 };
  let correct = 0;
  for (const e of puzzle.entries) {
    const given = (answers[`${e.num}-${e.dir}`] ?? "").toLowerCase().replace(/[^a-z]/g, "");
    if (given === e.answer) correct++;
  }
  return { ok: correct === puzzle.entries.length, puzzle, correct, total: puzzle.entries.length };
}

/** XP for a solved puzzle: base by difficulty, a speed bonus, minus hints. */
export function crosswordXp(d: Difficulty, hints: number, seconds: number): number {
  const cfg = DIFFICULTY[d];
  const speed = seconds > 0 && seconds <= cfg.parSeconds ? 20 : 0;
  const penalty = Math.min(cfg.xp / 2, Math.max(0, Math.floor(hints)) * 5);
  return Math.max(10, cfg.xp + speed - penalty);
}

export function crosswordStars(hints: number, seconds: number, d: Difficulty): number {
  let s = 1;
  if (hints === 0) s++;
  if (seconds > 0 && seconds <= DIFFICULTY[d].parSeconds) s++;
  return s;
}
