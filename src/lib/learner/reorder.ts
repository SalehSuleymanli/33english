/**
 * Course reorder (v2): the 33 days now follow the order of the original
 * syllabus. Progress saved under the old day numbers is moved to the new ones,
 * so nobody loses a lesson they finished.
 *
 * Old days 12 and 21 (review checkpoints) and 33 (graduation) no longer exist.
 * Old days 18, 25 and 29 were each split into two lessons; their progress
 * moves to the first half, and the exercises that moved to the second half
 * keep their history there.
 */

/** old day → new day; null = that lesson no longer exists. */
export const OLD_TO_NEW: Record<number, number | null> = {
  1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10,
  11: 19, 12: null, 13: 17, 14: 11, 15: 16, 16: 18, 17: 15, 18: 24, 19: 29, 20: 30,
  21: null, 22: 12, 23: 14, 24: 13, 25: 22, 26: 20, 27: 27, 28: 26, 29: 21, 30: 31,
  31: 32, 32: 33, 33: null,
};

/** Exercises of old day 29 that now live in the new Day 28 (prepositions, as/like, so/such). */
const OLD29_TO_28 = new Set(["p01", "p02", "p04", "p05", "p08", "p09", "r02", "r03", "r04", "r05"]);

const pad = (n: number) => String(n).padStart(2, "0");

export const newDay = (old: number): number | null => (old === 0 ? 0 : (OLD_TO_NEW[old] ?? null));

/** "d11-p03" → "d19-p03". Ids that aren't lesson exercises (vocab:, bookmark:, lab…) pass through. */
export function newExerciseId(id: string): string | null {
  const m = /^d(\d\d)-(.+)$/.exec(id);
  if (!m) return id;
  const old = Number(m[1]);
  if (old === 29 && OLD29_TO_28.has(m[2])) return `d28-${m[2]}`;
  const d = OLD_TO_NEW[old];
  return d ? `d${pad(d)}-${m[2]}` : null;
}

/** Day an exercise belongs to after the move (follows the id, so split lessons land right). */
function dayOfId(id: string, fallback: number): number {
  const m = /^d(\d\d)-/.exec(id);
  return m ? Number(m[1]) : fallback;
}

type Shape = {
  lessons: Record<number, { day: number }>;
  attempts: { exerciseId: string; day: number }[];
  review: Record<string, { itemId: string; day: number }>;
  vocab: Record<string, { day: number }>;
  bookmarks: Record<string, { day: number }>;
};

/** Moves a v1 state (old numbering) to the new numbering. Pure; returns a new object. */
export function reorderState<T extends Shape>(s: T): T {
  const lessons: Record<number, T["lessons"][number]> = {};
  for (const [k, v] of Object.entries(s.lessons)) {
    const d = newDay(Number(k));
    if (d) lessons[d] = { ...v, day: d };
  }
  const attempts: T["attempts"] = [];
  for (const a of s.attempts) {
    const id = newExerciseId(a.exerciseId);
    const d = newDay(a.day);
    if (id === null || d === null) continue;
    attempts.push({ ...a, exerciseId: id, day: dayOfId(id, d) });
  }
  const review: Record<string, T["review"][string]> = {};
  for (const v of Object.values(s.review)) {
    const id = newExerciseId(v.itemId);
    const d = newDay(v.day);
    if (id === null) continue;
    review[id] = { ...v, itemId: id, day: dayOfId(id, d ?? 0) } as T["review"][string];
  }
  const reday = <V extends { day: number }>(rec: Record<string, V>) =>
    Object.fromEntries(Object.entries(rec).map(([k, v]) => [k, { ...v, day: newDay(v.day) ?? 0 }])) as Record<string, V>;
  return { ...s, lessons, attempts, review: review as T["review"], vocab: reday(s.vocab), bookmarks: reday(s.bookmarks) };
}
