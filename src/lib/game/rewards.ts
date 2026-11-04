/**
 * Reward rules shared by the server (which grants XP) and the browser (which
 * shows progress). XP amounts are fixed here — the browser never decides them.
 */
import { hashString, rng, shuffle } from "./rng";

export type EventKind =
  | "lesson_complete"
  | "lesson_perfect"
  | "lesson_replay"
  | "level_test"
  | "stage_complete"
  | "crossword"
  | "quest_clear"
  | "quest_win"
  | "speaking"
  | "speaking_repeat"
  | "word_saved"
  | "daily"
  | "daily_sweep"
  | "weekly"
  | "streak";

export const XP = {
  lessonBase: 100,
  lessonGood: 25, // score ≥ 80
  lessonPerfect: 50, // first 100% on a lesson
  lessonReplay: 15,
  levelTest: 150, // checkpoint days 12, 21, 33 with score ≥ 70
  stage: 250,
  speaking: 40,
  speakingRepeat: 10,
  word: 5,
  daily: 30,
  dailySweep: 50,
  weekly: 150,
};

/** Daily caps (per local day) — enough for a great session, not for endless grinding. */
export const CAPS: Record<string, number> = {
  games: 400, // crosswords + battles together
  lesson_replay: 45,
  speaking_repeat: 30,
  words: 50,
};

export const LEVEL_TEST_DAYS = [12, 21, 33];

/** Course stages ("grammar levels") and the days they contain. */
export const COURSE_STAGES: { id: string; name: string; days: number[] }[] = [
  { id: "foundation", name: "Foundation", days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { id: "expansion", name: "Expansion", days: [13, 14] },
  { id: "combination", name: "Combination", days: [15, 16, 17, 18, 19, 20, 21] },
  { id: "communication", name: "Communication", days: [22, 23, 24, 25, 26, 27, 28, 29, 30] },
  { id: "application", name: "Application", days: [31, 32, 33] },
];

export const STREAK_MILESTONES: Record<number, number> = { 3: 30, 7: 70, 14: 150, 30: 300, 60: 500, 100: 800 };

/* ------------------------------------------------------------------ challenges */

export type Challenge = { id: string; title: string; kinds: EventKind[]; count: number; xp: number; icon: string; href: string; distinctDays?: boolean };

export const DAILY_POOL: Challenge[] = [
  { id: "lesson", title: "Finish a lesson", kinds: ["lesson_complete", "lesson_replay"], count: 1, xp: XP.daily, icon: "book", href: "/today" },
  { id: "crossword", title: "Solve a crossword", kinds: ["crossword"], count: 1, xp: XP.daily, icon: "grid", href: "/play/crossword" },
  { id: "crossword2", title: "Solve 2 crosswords", kinds: ["crossword"], count: 2, xp: XP.daily, icon: "grid", href: "/play/crossword" },
  { id: "battle", title: "Win a Word Quest battle", kinds: ["quest_clear", "quest_win"], count: 1, xp: XP.daily, icon: "sword", href: "/play/quest" },
  { id: "battle3", title: "Win 3 battles", kinds: ["quest_clear", "quest_win"], count: 3, xp: XP.daily, icon: "sword", href: "/play/quest" },
  { id: "speak", title: "Practise a speaking topic", kinds: ["speaking", "speaking_repeat"], count: 1, xp: XP.daily, icon: "mic", href: "/speaking" },
  { id: "words", title: "Save 3 new words", kinds: ["word_saved"], count: 3, xp: XP.daily, icon: "star", href: "/today" },
];

export const WEEKLY_POOL: Challenge[] = [
  { id: "w-lessons", title: "Finish 4 lessons this week", kinds: ["lesson_complete", "lesson_replay"], count: 4, xp: XP.weekly, icon: "book", href: "/course" },
  { id: "w-battles", title: "Win 10 battles this week", kinds: ["quest_clear", "quest_win"], count: 10, xp: XP.weekly, icon: "sword", href: "/play/quest" },
  { id: "w-crosswords", title: "Solve 5 crosswords this week", kinds: ["crossword"], count: 5, xp: XP.weekly, icon: "grid", href: "/play/crossword" },
  { id: "w-speaking", title: "Practise 3 speaking topics", kinds: ["speaking", "speaking_repeat"], count: 3, xp: XP.weekly, icon: "mic", href: "/speaking" },
  {
    id: "w-days",
    title: "Learn on 5 different days",
    kinds: ["lesson_complete", "lesson_replay", "crossword", "quest_clear", "quest_win", "speaking", "speaking_repeat", "word_saved"],
    count: 5,
    xp: XP.weekly,
    icon: "flame",
    href: "/today",
    distinctDays: true,
  },
];

/** Three daily challenges: one learning, one game, one more — the same for everyone on a date. */
export function dailyChallenges(date: string): Challenge[] {
  const r = rng(`daily:${date}`);
  const learning = shuffle(r, DAILY_POOL.filter((c) => ["lesson", "speak", "words"].includes(c.id)));
  const games = shuffle(r, DAILY_POOL.filter((c) => !["lesson", "speak", "words"].includes(c.id)));
  const first = learning[0];
  const second = games[0];
  const rest = shuffle(r, DAILY_POOL.filter((c) => c !== first && c !== second && c.icon !== second.icon));
  return [first, second, rest[0]];
}

export function weekKey(date: string): string {
  // ISO week, e.g. 2026-W45
  const [y, m, d] = date.split("-").map(Number);
  const t = new Date(Date.UTC(y, m - 1, d));
  const day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((t.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
  return `${t.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

export function weekDates(date: string): string[] {
  const [y, m, d] = date.split("-").map(Number);
  const t = new Date(Date.UTC(y, m - 1, d));
  const day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() - (day - 1));
  return Array.from({ length: 7 }, (_, i) => {
    const x = new Date(t);
    x.setUTCDate(t.getUTCDate() + i);
    return x.toISOString().slice(0, 10);
  });
}

export function weeklyChallenges(date: string): Challenge[] {
  const r = rng(hashString(`weekly:${weekKey(date)}`));
  return shuffle(r, WEEKLY_POOL).slice(0, 2);
}

/* ------------------------------------------------------------------ badges */

export type Facts = {
  totalXp: number;
  level: number;
  bestStreak: number;
  lessons: number; // distinct lessons completed
  perfect: number;
  stages: string[];
  crosswords: number;
  hardCrosswords: number;
  questWins: number;
  questCleared: string[];
  questStars: number;
  speaking: number;
  words: number;
  sweeps: number;
};

export type Badge = { id: string; title: string; description: string; group: "Learning" | "Games" | "Speaking" | "Habits"; test: (f: Facts) => boolean; progress: (f: Facts) => [number, number] };

const b = (id: string, title: string, description: string, group: Badge["group"], value: (f: Facts) => number, target: number): Badge => ({
  id,
  title,
  description,
  group,
  test: (f) => value(f) >= target,
  progress: (f) => [Math.min(value(f), target), target],
});

export const BADGES: Badge[] = [
  b("first-xp", "First spark", "Earn your first XP.", "Habits", (f) => f.totalXp, 1),
  b("lesson-1", "Day one done", "Complete your first lesson.", "Learning", (f) => f.lessons, 1),
  b("lesson-7", "Free week hero", "Complete 7 lessons.", "Learning", (f) => f.lessons, 7),
  b("six-frames", "All six frames", "Complete the Foundation stage.", "Learning", (f) => (f.stages.includes("foundation") ? 1 : 0), 1),
  b("lesson-17", "Halfway there", "Complete 17 lessons.", "Learning", (f) => f.lessons, 17),
  b("graduate", "Graduate", "Complete all 33 lessons.", "Learning", (f) => f.lessons, 33),
  b("perfect-3", "Clean sheets", "Score 100% on 3 lessons.", "Learning", (f) => f.perfect, 3),
  b("words-25", "Word collector", "Save 25 words.", "Learning", (f) => f.words, 25),
  b("words-100", "Walking dictionary", "Save 100 words.", "Learning", (f) => f.words, 100),
  b("crossword-1", "First grid", "Solve your first crossword.", "Games", (f) => f.crosswords, 1),
  b("crossword-10", "Puzzle master", "Solve 10 crosswords.", "Games", (f) => f.crosswords, 10),
  b("crossword-hard", "Hard as nails", "Solve a hard crossword.", "Games", (f) => f.hardCrosswords, 1),
  b("quest-1", "First victory", "Win your first Word Quest battle.", "Games", (f) => f.questWins, 1),
  b("quest-boss", "Giant slayer", "Defeat a boss.", "Games", (f) => f.questCleared.filter((s) => s.endsWith("-s5")).length, 1),
  b("quest-hero", "Hero of the realm", "Defeat The Great Muddle.", "Games", (f) => (f.questCleared.includes("w4-s5") ? 1 : 0), 1),
  b("quest-stars", "Star collector", "Collect 30 stars in Word Quest.", "Games", (f) => f.questStars, 30),
  b("speaker-1", "First words out loud", "Complete a speaking topic.", "Speaking", (f) => f.speaking, 1),
  b("speaker-5", "Finding my voice", "Complete 5 speaking topics.", "Speaking", (f) => f.speaking, 5),
  b("speaker-all", "Storyteller", "Complete 20 speaking topics.", "Speaking", (f) => f.speaking, 20),
  b("streak-3", "Warming up", "Learn 3 days in a row.", "Habits", (f) => f.bestStreak, 3),
  b("streak-7", "One full week", "Learn 7 days in a row.", "Habits", (f) => f.bestStreak, 7),
  b("streak-30", "Unstoppable", "Learn 30 days in a row.", "Habits", (f) => f.bestStreak, 30),
  b("sweep-1", "Clean sweep", "Finish all 3 daily challenges in one day.", "Habits", (f) => f.sweeps, 1),
  b("sweep-7", "Challenge champion", "Finish all daily challenges on 7 days.", "Habits", (f) => f.sweeps, 7),
  b("level-5", "Level 5", "Reach level 5.", "Habits", (f) => f.level, 5),
  b("level-10", "Level 10", "Reach level 10.", "Habits", (f) => f.level, 10),
  b("level-20", "Level 20", "Reach level 20.", "Habits", (f) => f.level, 20),
];

export const badgeById = (id: string) => BADGES.find((x) => x.id === id);

export const EMPTY_FACTS: Facts = {
  totalXp: 0,
  level: 1,
  bestStreak: 0,
  lessons: 0,
  perfect: 0,
  stages: [],
  crosswords: 0,
  hardCrosswords: 0,
  questWins: 0,
  questCleared: [],
  questStars: 0,
  speaking: 0,
  words: 0,
  sweeps: 0,
};

/** Checks a YYYY-MM-DD local date sent by a browser: must be within a day of server time. */
export function validLocalDate(s: unknown, now = new Date()): string | null {
  if (typeof s !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
  const t = Date.parse(`${s}T12:00:00Z`);
  if (Number.isNaN(t)) return null;
  const diff = Math.abs(t - now.getTime());
  return diff <= 40 * 3_600_000 ? s : null;
}
