/**
 * Spaced repetition: a five-box Leitner system.
 *
 * Simple and explainable: answer correctly → the item moves up a box and comes
 * back later; answer wrongly → it returns to box 1 and is due again today.
 */
export const BOX_INTERVAL_DAYS = [0, 1, 2, 4, 8, 16] as const; // index = box (1..5)
export const MAX_BOX = 5;

export type ReviewKind = "exercise" | "vocab" | "bookmark";

export type ReviewItem = {
  itemId: string; // exercise id, "vocab:<term>", or "bookmark:<ref>"
  kind: ReviewKind;
  day: number; // lesson day it came from (0 = Lab / other)
  box: number;
  dueAt: string; // ISO
  lapses: number;
  reviews: number;
  lastCorrect?: boolean;
  updatedAt: string;
};

const DAY_MS = 86_400_000;

export function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

/** Schedule after an answer. `existing` is undefined for a brand-new item. */
export function schedule(
  existing: ReviewItem | undefined,
  init: { itemId: string; kind: ReviewKind; day: number },
  correct: boolean,
  now = new Date(),
  /** Box to start a new item in when first answered correctly (e.g. 2 for review-quiz items). */
  firstCorrectBox = 2,
): ReviewItem {
  const base: ReviewItem = existing ?? {
    itemId: init.itemId,
    kind: init.kind,
    day: init.day,
    box: 0,
    dueAt: now.toISOString(),
    lapses: 0,
    reviews: 0,
    updatedAt: now.toISOString(),
  };
  let box: number;
  if (correct) box = existing ? Math.min(MAX_BOX, base.box + 1) : firstCorrectBox;
  else box = 1;
  const due = correct ? new Date(startOfDay(now).getTime() + BOX_INTERVAL_DAYS[box] * DAY_MS) : now;
  return {
    ...base,
    box,
    dueAt: due.toISOString(),
    lapses: base.lapses + (correct ? 0 : 1),
    reviews: base.reviews + 1,
    lastCorrect: correct,
    updatedAt: now.toISOString(),
  };
}

export function isDue(item: ReviewItem, now = new Date()): boolean {
  return new Date(item.dueAt).getTime() <= now.getTime();
}

/**
 * Today's queue: due items, recent mistakes first (lower box first),
 * then the most overdue. Capped to keep sessions short.
 */
export function buildQueue(items: ReviewItem[], now = new Date(), cap = 20): ReviewItem[] {
  return items
    .filter((i) => isDue(i, now))
    .sort((a, b) => a.box - b.box || new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime())
    .slice(0, cap);
}

export function nextDue(items: ReviewItem[], now = new Date()): Date | null {
  const future = items.filter((i) => !isDue(i, now)).map((i) => new Date(i.dueAt).getTime());
  return future.length ? new Date(Math.min(...future)) : null;
}

/** Plain-language description of a box, for the UI. */
export function describeBox(box: number): string {
  if (box <= 1) return "Learning — back again soon";
  if (box === 2) return "Getting there — every 2 days";
  if (box === 3) return "Familiar — every 4 days";
  if (box === 4) return "Strong — every 8 days";
  return "Mastered — every 16 days";
}
