/**
 * Mapping between local learner state and Supabase tables, plus pull/push.
 * All requests use the signed-in user's session; RLS guarantees isolation.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { ReviewItem } from "@/engine/srs";
import { emptyState, type LearnerState } from "./state";

export type Dirty = {
  profile: boolean;
  stats: boolean;
  lessons: Set<number>;
  attempts: Set<string>;
  review: Set<string>;
  vocab: Set<string>;
  vocabDeleted: Set<string>;
  bookmarks: Set<string>;
  bookmarksDeleted: Set<string>;
  activity: Set<string>;
};

export const emptyDirty = (): Dirty => ({
  profile: false,
  stats: false,
  lessons: new Set(),
  attempts: new Set(),
  review: new Set(),
  vocab: new Set(),
  vocabDeleted: new Set(),
  bookmarks: new Set(),
  bookmarksDeleted: new Set(),
  activity: new Set(),
});

/** Work out which records changed between two states. */
export function diffStates(prev: LearnerState, next: LearnerState, d: Dirty): Dirty {
  if (prev.profile !== next.profile) d.profile = true;
  if (prev.stats !== next.stats || prev.achievements !== next.achievements) d.stats = true;
  if (prev.lessons !== next.lessons)
    for (const [k, v] of Object.entries(next.lessons)) if (prev.lessons[+k] !== v) d.lessons.add(+k);
  if (prev.attempts !== next.attempts) {
    const ids = new Set(prev.attempts.map((a) => a.id));
    for (const a of next.attempts) if (!ids.has(a.id)) d.attempts.add(a.id);
  }
  if (prev.review !== next.review) for (const [k, v] of Object.entries(next.review)) if (prev.review[k] !== v) d.review.add(k);
  if (prev.vocab !== next.vocab) {
    for (const k of Object.keys(next.vocab)) {
      if (prev.vocab[k]) continue;
      d.vocab.add(k);
      d.vocabDeleted.delete(next.vocab[k].term);
    }
    for (const k of Object.keys(prev.vocab)) {
      if (next.vocab[k]) continue;
      d.vocabDeleted.add(prev.vocab[k].term);
      d.vocab.delete(k);
      d.review.delete(`vocab:${k}`);
    }
  }
  if (prev.bookmarks !== next.bookmarks) {
    for (const k of Object.keys(next.bookmarks)) {
      if (prev.bookmarks[k]) continue;
      d.bookmarks.add(k);
      d.bookmarksDeleted.delete(k);
    }
    for (const k of Object.keys(prev.bookmarks)) {
      if (next.bookmarks[k]) continue;
      d.bookmarksDeleted.add(k);
      d.bookmarks.delete(k);
    }
  }
  if (prev.activity !== next.activity) for (const [k, v] of Object.entries(next.activity)) if (prev.activity[k] !== v) d.activity.add(k);
  return d;
}

export function everythingDirty(s: LearnerState): Dirty {
  return diffStates(emptyState(), s, emptyDirty());
}

export const isClean = (d: Dirty) =>
  !d.profile && !d.stats && [d.lessons, d.attempts, d.review, d.vocab, d.vocabDeleted, d.bookmarks, d.bookmarksDeleted, d.activity].every((x) => x.size === 0);

/* ---------------- push ---------------- */

export async function push(sb: SupabaseClient, uid: string, s: LearnerState, d: Dirty): Promise<void> {
  const ops: PromiseLike<{ error: unknown }>[] = [];
  const p = s.profile;
  if (d.profile)
    ops.push(
      sb.from("profiles").upsert({
        id: uid,
        display_name: p.displayName ?? null,
        native_language: p.nativeLanguage ?? null,
        daily_goal: p.dailyGoal,
        streaks_enabled: p.streaksEnabled,
        show_translations: p.showTranslations,
        speech_rate: p.speechRate,
        onboarded: p.onboarded,
        placement: p.placement ?? null,
        updated_at: p.updatedAt,
      }),
    );
  if (d.stats)
    ops.push(
      sb.from("learner_stats").upsert({
        user_id: uid,
        lab_builds: s.stats.labBuilds,
        scenarios_done: s.stats.scenariosDone,
        achievements: s.achievements,
        updated_at: new Date().toISOString(),
      }),
    );
  if (d.lessons.size)
    ops.push(
      sb.from("lesson_progress").upsert(
        [...d.lessons].map((day) => {
          const l = s.lessons[day];
          return {
            user_id: uid,
            day,
            status: l.status,
            started_at: l.startedAt,
            completed_at: l.completedAt ?? null,
            last_section: l.lastSection ?? null,
            score: l.score ?? null,
            best_score: l.bestScore ?? null,
            updated_at: l.updatedAt,
          };
        }),
      ),
    );
  if (d.attempts.size) {
    const rows = s.attempts
      .filter((a) => d.attempts.has(a.id))
      .map((a) => ({
        id: a.id,
        user_id: uid,
        exercise_id: a.exerciseId,
        day: a.day,
        correct: a.correct,
        answer: a.answer,
        source: a.source,
        frame: a.frame ?? null,
        skill: a.skill ?? null,
        created_at: a.at,
      }));
    if (rows.length) ops.push(sb.from("exercise_attempts").upsert(rows, { ignoreDuplicates: true }));
  }
  if (d.review.size) {
    const rows = [...d.review].filter((k) => s.review[k]).map((k) => reviewRow(uid, s.review[k]));
    if (rows.length) ops.push(sb.from("review_items").upsert(rows));
  }
  if (d.vocab.size)
    ops.push(
      sb.from("vocabulary").upsert(
        [...d.vocab].filter((k) => s.vocab[k]).map((k) => {
          const v = s.vocab[k];
          return { user_id: uid, term: v.term, meaning: v.meaning, example: v.example, source_day: v.day, created_at: v.createdAt };
        }),
      ),
    );
  for (const term of d.vocabDeleted) {
    ops.push(sb.from("vocabulary").delete().eq("user_id", uid).eq("term", term));
    ops.push(sb.from("review_items").delete().eq("user_id", uid).eq("item_id", `vocab:${term.toLowerCase()}`));
  }
  if (d.bookmarks.size)
    ops.push(
      sb.from("bookmarks").upsert(
        [...d.bookmarks].filter((k) => s.bookmarks[k]).map((k) => {
          const b = s.bookmarks[k];
          return { user_id: uid, ref: b.ref, label: b.label, day: b.day, note: b.note ?? null, created_at: b.createdAt };
        }),
      ),
    );
  for (const k of d.bookmarksDeleted) ops.push(sb.from("bookmarks").delete().eq("user_id", uid).eq("ref", k));
  if (d.activity.size)
    ops.push(
      sb.from("activity_days").upsert(
        [...d.activity].map((date) => ({ user_id: uid, date, items: s.activity[date].items, correct: s.activity[date].correct })),
      ),
    );

  const results = await Promise.all(ops);
  const err = results.find((r) => r.error)?.error;
  if (err) throw err instanceof Error ? err : new Error(JSON.stringify(err));
}

function reviewRow(uid: string, r: ReviewItem) {
  return {
    user_id: uid,
    item_id: r.itemId,
    kind: r.kind,
    day: r.day,
    box: r.box,
    due_at: r.dueAt,
    lapses: r.lapses,
    reviews: r.reviews,
    last_correct: r.lastCorrect ?? null,
    updated_at: r.updatedAt,
  };
}

/* ---------------- pull ---------------- */

type Row = Record<string, unknown>;

export async function pull(sb: SupabaseClient, uid: string): Promise<LearnerState> {
  const q = (table: string, order?: string) => {
    let req = sb.from(table).select("*").eq(table === "profiles" ? "id" : "user_id", uid);
    if (order) req = req.order(order, { ascending: false }).limit(2000);
    return req;
  };
  const [profile, stats, lessons, attempts, review, vocab, bookmarks, activity] = await Promise.all([
    q("profiles"),
    q("learner_stats"),
    q("lesson_progress"),
    q("exercise_attempts", "created_at"),
    q("review_items"),
    q("vocabulary"),
    q("bookmarks"),
    q("activity_days"),
  ]);
  const firstErr = [profile, stats, lessons, attempts, review, vocab, bookmarks, activity].find((r) => r.error)?.error;
  if (firstErr) throw new Error(firstErr.message);
  return fromRows({
    profile: (profile.data?.[0] as Row) ?? null,
    stats: (stats.data?.[0] as Row) ?? null,
    lessons: (lessons.data as Row[]) ?? [],
    attempts: (attempts.data as Row[]) ?? [],
    review: (review.data as Row[]) ?? [],
    vocab: (vocab.data as Row[]) ?? [],
    bookmarks: (bookmarks.data as Row[]) ?? [],
    activity: (activity.data as Row[]) ?? [],
  });
}

export function fromRows(r: {
  profile: Row | null;
  stats: Row | null;
  lessons: Row[];
  attempts: Row[];
  review: Row[];
  vocab: Row[];
  bookmarks: Row[];
  activity: Row[];
}): LearnerState {
  const s = emptyState(new Date(0));
  if (r.profile) {
    const p = r.profile;
    s.profile = {
      displayName: (p.display_name as string) || undefined,
      nativeLanguage: (p.native_language as string) || undefined,
      dailyGoal: (p.daily_goal as number) ?? 20,
      streaksEnabled: (p.streaks_enabled as boolean) ?? true,
      showTranslations: (p.show_translations as boolean) ?? false,
      speechRate: Number(p.speech_rate ?? 0.9),
      onboarded: (p.onboarded as boolean) ?? false,
      placement: (p.placement as LearnerState["profile"]["placement"]) ?? undefined,
      updatedAt: (p.updated_at as string) ?? new Date(0).toISOString(),
    };
  }
  if (r.stats) {
    s.stats = { labBuilds: (r.stats.lab_builds as number) ?? 0, scenariosDone: (r.stats.scenarios_done as string[]) ?? [] };
    s.achievements = (r.stats.achievements as Record<string, string>) ?? {};
  }
  for (const l of r.lessons) {
    const day = l.day as number;
    s.lessons[day] = {
      day,
      status: l.status as "started" | "completed",
      startedAt: l.started_at as string,
      completedAt: (l.completed_at as string) ?? undefined,
      lastSection: (l.last_section as number) ?? undefined,
      score: (l.score as number) ?? undefined,
      bestScore: (l.best_score as number) ?? undefined,
      updatedAt: l.updated_at as string,
    };
  }
  s.attempts = r.attempts
    .map((a) => ({
      id: a.id as string,
      exerciseId: a.exercise_id as string,
      day: a.day as number,
      correct: a.correct as boolean,
      answer: (a.answer as string) ?? "",
      source: a.source as LearnerState["attempts"][number]["source"],
      frame: (a.frame as LearnerState["attempts"][number]["frame"]) ?? undefined,
      skill: (a.skill as LearnerState["attempts"][number]["skill"]) ?? undefined,
      at: a.created_at as string,
    }))
    .sort((x, y) => x.at.localeCompare(y.at));
  for (const v of r.review) {
    const id = v.item_id as string;
    s.review[id] = {
      itemId: id,
      kind: v.kind as ReviewItem["kind"],
      day: v.day as number,
      box: v.box as number,
      dueAt: v.due_at as string,
      lapses: v.lapses as number,
      reviews: v.reviews as number,
      lastCorrect: (v.last_correct as boolean) ?? undefined,
      updatedAt: v.updated_at as string,
    };
  }
  for (const v of r.vocab)
    s.vocab[(v.term as string).toLowerCase()] = { term: v.term as string, meaning: v.meaning as string, example: v.example as string, day: v.source_day as number, createdAt: v.created_at as string };
  for (const b of r.bookmarks)
    s.bookmarks[b.ref as string] = { ref: b.ref as string, label: b.label as string, day: b.day as number, note: (b.note as string) ?? undefined, createdAt: b.created_at as string };
  for (const a of r.activity) s.activity[a.date as string] = { items: a.items as number, correct: a.correct as number };
  return s;
}
