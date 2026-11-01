/**
 * Learner state — pure data + reducers. No React, no storage, so it is easy to test.
 * Everything here records what the learner actually did; nothing is invented.
 */
import type { FrameId, Skill } from "@/content/types";
import { schedule, type ReviewItem, type ReviewKind } from "@/engine/srs";

export const STATE_VERSION = 1;

export type PlacementResult = {
  takenAt: string;
  score: number;
  total: number;
  byArea: Record<string, { correct: number; total: number }>;
  suggestedStartDay: number;
  band: "starter" | "builder" | "connector";
};

export type Profile = {
  displayName?: string;
  nativeLanguage?: string; // ISO code, e.g. "az"
  dailyGoal: number; // items per day
  streaksEnabled: boolean;
  showTranslations: boolean;
  speechRate: number; // 0.7–1.1
  onboarded: boolean;
  placement?: PlacementResult;
  updatedAt: string;
};

export type LessonRecord = {
  day: number;
  status: "started" | "completed";
  startedAt: string;
  completedAt?: string;
  lastSection?: number;
  score?: number; // last review score 0–100
  bestScore?: number;
  updatedAt: string;
};

export type Attempt = {
  id: string;
  exerciseId: string;
  day: number;
  correct: boolean;
  answer: string;
  source: "lesson" | "review" | "lab" | "placement" | "scenario";
  frame?: FrameId;
  skill?: Skill;
  at: string;
};

export type VocabEntry = {
  term: string;
  meaning: string;
  example: string;
  day: number;
  createdAt: string;
};

export type Bookmark = { ref: string; label: string; day: number; note?: string; createdAt: string };

export type LearnerState = {
  version: number;
  profile: Profile;
  lessons: Record<number, LessonRecord>;
  attempts: Attempt[];
  review: Record<string, ReviewItem>;
  vocab: Record<string, VocabEntry>;
  bookmarks: Record<string, Bookmark>;
  activity: Record<string, { items: number; correct: number }>; // key: YYYY-MM-DD (local)
  stats: { labBuilds: number; scenariosDone: string[] };
  achievements: Record<string, string>; // id → unlockedAt
};

export const MAX_ATTEMPTS = 2000;

export function emptyState(now = new Date()): LearnerState {
  return {
    version: STATE_VERSION,
    profile: {
      dailyGoal: 20,
      streaksEnabled: true,
      showTranslations: false,
      speechRate: 0.9,
      onboarded: false,
      updatedAt: now.toISOString(),
    },
    lessons: {},
    attempts: [],
    review: {},
    vocab: {},
    bookmarks: {},
    activity: {},
    stats: { labBuilds: 0, scenariosDone: [] },
    achievements: {},
  };
}

export function dayKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

export function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

/* ---------------- Reducers ---------------- */

export type AnswerInput = {
  exerciseId: string;
  day: number;
  correct: boolean;
  answer: string;
  source: Attempt["source"];
  frame?: FrameId;
  skill?: Skill;
  /** Put this item into spaced review (wrong answers always go in). */
  addToReview?: boolean;
  /** Never schedule this item (placement, scenario checks). */
  skipReview?: boolean;
  kind?: ReviewKind;
};

export function recordAnswer(s: LearnerState, a: AnswerInput, now = new Date()): LearnerState {
  const attempt: Attempt = {
    id: newId(),
    exerciseId: a.exerciseId,
    day: a.day,
    correct: a.correct,
    answer: a.answer.slice(0, 500),
    source: a.source,
    frame: a.frame,
    skill: a.skill,
    at: now.toISOString(),
  };
  const attempts = [...s.attempts, attempt].slice(-MAX_ATTEMPTS);
  const review = { ...s.review };
  const existing = review[a.exerciseId];
  if (!a.skipReview && (existing || !a.correct || a.addToReview)) {
    review[a.exerciseId] = schedule(existing, { itemId: a.exerciseId, kind: a.kind ?? "exercise", day: a.day }, a.correct, now);
  }
  const k = dayKey(now);
  const act = s.activity[k] ?? { items: 0, correct: 0 };
  return {
    ...s,
    attempts,
    review,
    activity: { ...s.activity, [k]: { items: act.items + 1, correct: act.correct + (a.correct ? 1 : 0) } },
  };
}

export function startLesson(s: LearnerState, day: number, section = 0, now = new Date()): LearnerState {
  const cur = s.lessons[day];
  if (cur?.status === "completed") {
    return { ...s, lessons: { ...s.lessons, [day]: { ...cur, lastSection: section, updatedAt: now.toISOString() } } };
  }
  return {
    ...s,
    lessons: {
      ...s.lessons,
      [day]: { day, status: "started", startedAt: cur?.startedAt ?? now.toISOString(), lastSection: section, updatedAt: now.toISOString() },
    },
  };
}

export function completeLesson(s: LearnerState, day: number, score: number, now = new Date()): LearnerState {
  const cur = s.lessons[day];
  const best = Math.max(cur?.bestScore ?? 0, score);
  return {
    ...s,
    lessons: {
      ...s.lessons,
      [day]: {
        day,
        status: "completed",
        startedAt: cur?.startedAt ?? now.toISOString(),
        completedAt: cur?.completedAt ?? now.toISOString(),
        lastSection: 0,
        score,
        bestScore: best,
        updatedAt: now.toISOString(),
      },
    },
  };
}

export function saveVocab(s: LearnerState, v: Omit<VocabEntry, "createdAt">, now = new Date()): LearnerState {
  const key = v.term.toLowerCase();
  if (s.vocab[key]) return s;
  const itemId = `vocab:${key}`;
  return {
    ...s,
    vocab: { ...s.vocab, [key]: { ...v, createdAt: now.toISOString() } },
    review: {
      ...s.review,
      [itemId]: {
        itemId,
        kind: "vocab",
        day: v.day,
        box: 1,
        dueAt: new Date(now.getTime() + 86_400_000).toISOString(),
        lapses: 0,
        reviews: 0,
        updatedAt: now.toISOString(),
      },
    },
  };
}

export function removeVocab(s: LearnerState, term: string): LearnerState {
  const key = term.toLowerCase();
  const vocab = { ...s.vocab };
  delete vocab[key];
  const review = { ...s.review };
  delete review[`vocab:${key}`];
  return { ...s, vocab, review };
}

export function toggleBookmark(s: LearnerState, b: Omit<Bookmark, "createdAt">, now = new Date()): LearnerState {
  const bookmarks = { ...s.bookmarks };
  if (bookmarks[b.ref]) delete bookmarks[b.ref];
  else bookmarks[b.ref] = { ...b, createdAt: now.toISOString() };
  return { ...s, bookmarks };
}

export function setProfile(s: LearnerState, p: Partial<Profile>, now = new Date()): LearnerState {
  return { ...s, profile: { ...s.profile, ...p, updatedAt: now.toISOString() } };
}

export function bumpLab(s: LearnerState): LearnerState {
  return { ...s, stats: { ...s.stats, labBuilds: s.stats.labBuilds + 1 } };
}

export function markScenario(s: LearnerState, id: string): LearnerState {
  if (s.stats.scenariosDone.includes(id)) return s;
  return { ...s, stats: { ...s.stats, scenariosDone: [...s.stats.scenariosDone, id] } };
}

/* ---------------- Derived ---------------- */

export function completedDays(s: LearnerState): number[] {
  return Object.values(s.lessons)
    .filter((l) => l.status === "completed")
    .map((l) => l.day)
    .sort((a, b) => a - b);
}

/** The next lesson to take: first not-completed day, starting at the suggested day. */
export function nextDay(s: LearnerState, total = 33): number {
  const done = new Set(completedDays(s));
  const start = s.profile.placement?.suggestedStartDay ?? 1;
  for (let d = start; d <= total; d++) if (!done.has(d)) return d;
  for (let d = 1; d < start; d++) if (!done.has(d)) return d;
  return total;
}

/** Last lesson that is started but not finished (for "resume"). */
export function inProgressLesson(s: LearnerState): LessonRecord | undefined {
  return Object.values(s.lessons)
    .filter((l) => l.status === "started")
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0];
}

export type Streak = { current: number; best: number; daysThisWeek: number };

export function streak(s: LearnerState, now = new Date()): Streak {
  const keys = new Set(Object.keys(s.activity).filter((k) => s.activity[k].items > 0));
  let current = 0;
  const d = new Date(now);
  // today counts if active; if not active today, the streak from yesterday still stands
  if (!keys.has(dayKey(d))) d.setDate(d.getDate() - 1);
  while (keys.has(dayKey(d))) {
    current++;
    d.setDate(d.getDate() - 1);
  }
  const sorted = [...keys].sort();
  let best = 0;
  let run = 0;
  let prev: Date | null = null;
  for (const k of sorted) {
    const [y, m, dd] = k.split("-").map(Number);
    const cur = new Date(y, m - 1, dd);
    run = prev && Math.round((cur.getTime() - prev.getTime()) / 86_400_000) === 1 ? run + 1 : 1;
    best = Math.max(best, run);
    prev = cur;
  }
  let week = 0;
  const w = new Date(now);
  for (let i = 0; i < 7; i++) {
    if (keys.has(dayKey(w))) week++;
    w.setDate(w.getDate() - 1);
  }
  return { current, best, daysThisWeek: week };
}

export type Accuracy = { correct: number; total: number; ratio: number };

/** Accuracy over the most recent `window` attempts per key. Needs `min` attempts to count. */
export function accuracyBy<K extends string>(
  s: LearnerState,
  key: (a: Attempt) => K | undefined,
  window = 20,
): Record<K, Accuracy> {
  const groups: Record<string, Attempt[]> = {};
  for (const a of s.attempts) {
    const k = key(a);
    if (!k) continue;
    (groups[k] ??= []).push(a);
  }
  const out: Record<string, Accuracy> = {};
  for (const [k, list] of Object.entries(groups)) {
    const recent = list.slice(-window);
    const correct = recent.filter((a) => a.correct).length;
    out[k] = { correct, total: recent.length, ratio: recent.length ? correct / recent.length : 0 };
  }
  return out as Record<K, Accuracy>;
}

/** Merge two states (e.g. guest progress into an account). Newer records win; attempts are unioned. */
export function mergeStates(a: LearnerState, b: LearnerState): LearnerState {
  const newer = <T extends { updatedAt: string }>(x?: T, y?: T) => (!x ? y : !y ? x : x.updatedAt >= y.updatedAt ? x : y);
  const lessons: LearnerState["lessons"] = { ...a.lessons };
  for (const [k, v] of Object.entries(b.lessons)) {
    const cur = lessons[+k];
    // completed beats started; otherwise newer wins
    if (!cur) lessons[+k] = v;
    else if (cur.status !== v.status) lessons[+k] = cur.status === "completed" ? { ...cur, bestScore: Math.max(cur.bestScore ?? 0, v.bestScore ?? 0) } : { ...v, bestScore: Math.max(cur.bestScore ?? 0, v.bestScore ?? 0) };
    else lessons[+k] = { ...newer(cur, v)!, bestScore: Math.max(cur.bestScore ?? 0, v.bestScore ?? 0) };
  }
  const review: LearnerState["review"] = { ...a.review };
  for (const [k, v] of Object.entries(b.review)) review[k] = newer(review[k], v)!;
  const ids = new Set(a.attempts.map((x) => x.id));
  const attempts = [...a.attempts, ...b.attempts.filter((x) => !ids.has(x.id))].sort((x, y) => x.at.localeCompare(y.at)).slice(-MAX_ATTEMPTS);
  const activity: LearnerState["activity"] = { ...a.activity };
  for (const [k, v] of Object.entries(b.activity)) {
    const cur = activity[k];
    activity[k] = cur ? { items: Math.max(cur.items, v.items), correct: Math.max(cur.correct, v.correct) } : v;
  }
  return {
    version: STATE_VERSION,
    profile: a.profile.updatedAt >= b.profile.updatedAt ? a.profile : b.profile,
    lessons,
    attempts,
    review,
    vocab: { ...b.vocab, ...a.vocab },
    bookmarks: { ...b.bookmarks, ...a.bookmarks },
    activity,
    stats: {
      labBuilds: Math.max(a.stats.labBuilds, b.stats.labBuilds),
      scenariosDone: [...new Set([...a.stats.scenariosDone, ...b.stats.scenariosDone])],
    },
    achievements: { ...b.achievements, ...a.achievements },
  };
}

/** Defensive parse of stored state (handles corrupted or old data). */
export function parseState(raw: string | null): LearnerState {
  if (!raw) return emptyState();
  try {
    const data = JSON.parse(raw) as Partial<LearnerState>;
    const base = emptyState();
    if (typeof data !== "object" || data === null) return base;
    return {
      ...base,
      ...data,
      profile: { ...base.profile, ...(data.profile ?? {}) },
      stats: { ...base.stats, ...(data.stats ?? {}) },
      attempts: Array.isArray(data.attempts) ? data.attempts : [],
      version: STATE_VERSION,
    };
  } catch {
    return emptyState();
  }
}
