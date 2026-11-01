import { describe, expect, it } from "vitest";
import { completeLesson, emptyState, mergeStates, nextDay, parseState, recordAnswer, removeVocab, saveVocab, startLesson, streak, toggleBookmark, inProgressLesson, dayKey } from "@/lib/learner/state";
import { diffStates, emptyDirty, fromRows } from "@/lib/learner/sync";
import { evaluate, newlyUnlocked } from "@/lib/learner/achievements";
import { scorePlacement, PLACEMENT } from "@/content/placement";

const t0 = new Date("2026-03-10T09:00:00");

describe("learner reducers", () => {
  it("records answers; wrong answers enter review, correct ones only if asked", () => {
    let s = emptyState(t0);
    s = recordAnswer(s, { exerciseId: "a", day: 1, correct: true, answer: "x", source: "lesson" }, t0);
    expect(s.review.a).toBeUndefined();
    s = recordAnswer(s, { exerciseId: "b", day: 1, correct: false, answer: "x", source: "lesson" }, t0);
    expect(s.review.b.box).toBe(1);
    s = recordAnswer(s, { exerciseId: "c", day: 1, correct: true, answer: "x", source: "lesson", addToReview: true }, t0);
    expect(s.review.c.box).toBe(2);
    s = recordAnswer(s, { exerciseId: "d", day: 0, correct: false, answer: "x", source: "placement", skipReview: true }, t0);
    expect(s.review.d).toBeUndefined();
    expect(s.attempts).toHaveLength(4);
    expect(s.activity[dayKey(t0)]).toEqual({ items: 4, correct: 2 });
  });

  it("tracks lesson start, resume and completion", () => {
    let s = startLesson(emptyState(t0), 1, 3, t0);
    expect(inProgressLesson(s)?.lastSection).toBe(3);
    s = completeLesson(s, 1, 80, t0);
    s = completeLesson(s, 1, 60, t0);
    expect(s.lessons[1]).toMatchObject({ status: "completed", score: 60, bestScore: 80 });
    expect(nextDay(s)).toBe(2);
    expect(inProgressLesson(s)).toBeUndefined();
  });

  it("vocab and bookmarks", () => {
    let s = saveVocab(emptyState(t0), { term: "Near here", meaning: "close", example: "Is there…", day: 1 }, t0);
    expect(s.review["vocab:near here"]).toBeDefined();
    s = removeVocab(s, "near here");
    expect(Object.keys(s.vocab)).toHaveLength(0);
    expect(s.review["vocab:near here"]).toBeUndefined();
    s = toggleBookmark(s, { ref: "r", label: "L", day: 1 }, t0);
    expect(s.bookmarks.r).toBeDefined();
    s = toggleBookmark(s, { ref: "r", label: "L", day: 1 }, t0);
    expect(s.bookmarks.r).toBeUndefined();
  });

  it("streaks don't punish: yesterday's streak still counts today", () => {
    const s = emptyState(t0);
    s.activity = { "2026-03-07": { items: 3, correct: 3 }, "2026-03-08": { items: 1, correct: 1 }, "2026-03-09": { items: 2, correct: 1 } };
    expect(streak(s, t0)).toMatchObject({ current: 3, best: 3, daysThisWeek: 3 });
  });

  it("merges guest progress into an account", () => {
    const a = completeLesson(emptyState(t0), 1, 90, t0);
    const b = startLesson(recordAnswer(emptyState(t0), { exerciseId: "z", day: 2, correct: false, answer: "", source: "lesson" }, t0), 2, 1, t0);
    const m = mergeStates(a, b);
    expect(m.lessons[1].status).toBe("completed");
    expect(m.lessons[2].status).toBe("started");
    expect(m.attempts).toHaveLength(1);
    expect(m.review.z).toBeDefined();
    // completed always beats started
    const c = mergeStates(startLesson(emptyState(), 1, 2), a);
    expect(c.lessons[1].status).toBe("completed");
  });

  it("parses corrupted storage safely", () => {
    expect(parseState("{not json").attempts).toEqual([]);
    expect(parseState(null).profile.dailyGoal).toBe(20);
    expect(parseState('{"profile":{"dailyGoal":30}}').profile).toMatchObject({ dailyGoal: 30, streaksEnabled: true });
  });
});

describe("sync diff", () => {
  it("detects changed records only", () => {
    const a = emptyState(t0);
    const b = recordAnswer(completeLesson(a, 3, 70, t0), { exerciseId: "q", day: 3, correct: false, answer: "", source: "lesson" }, t0);
    const d = diffStates(a, b, emptyDirty());
    expect([...d.lessons]).toEqual([3]);
    expect(d.attempts.size).toBe(1);
    expect([...d.review]).toEqual(["q"]);
    expect([...d.activity]).toHaveLength(1);
    expect(d.profile).toBe(false);
  });
  it("tracks vocab deletions by their original term", () => {
    const a = saveVocab(emptyState(t0), { term: "Get Used To", meaning: "", example: "", day: 18 }, t0);
    const d = diffStates(a, removeVocab(a, "get used to"), emptyDirty());
    expect([...d.vocabDeleted]).toEqual(["Get Used To"]);
  });
  it("maps database rows back to state", () => {
    const s = fromRows({
      profile: { display_name: "Ali", daily_goal: 30, streaks_enabled: false, speech_rate: "0.85", onboarded: true, updated_at: "2026-01-01T00:00:00Z" },
      stats: null,
      lessons: [{ day: 2, status: "completed", started_at: "x", updated_at: "y", best_score: 90 }],
      attempts: [],
      review: [],
      vocab: [{ term: "Near Here", meaning: "m", example: "e", source_day: 1, created_at: "z" }],
      bookmarks: [],
      activity: [{ date: "2026-01-02", items: 4, correct: 3 }],
    });
    expect(s.profile).toMatchObject({ displayName: "Ali", dailyGoal: 30, speechRate: 0.85, streaksEnabled: false });
    expect(s.lessons[2].bestScore).toBe(90);
    expect(s.vocab["near here"].term).toBe("Near Here");
  });
});

describe("achievements and placement", () => {
  it("unlocks from real data only", () => {
    expect(newlyUnlocked(emptyState())).toEqual([]);
    const s = completeLesson(recordAnswer(emptyState(), { exerciseId: "a", day: 1, correct: true, answer: "", source: "lesson" }), 1, 100);
    expect(newlyUnlocked(s).sort()).toEqual(["day-one", "first-sentence", "perfect"]);
    expect(evaluate({ ...s, profile: { ...s.profile, streaksEnabled: false } }).some((a) => a.id === "streak-7")).toBe(false);
  });
  it("placement suggests a start day", () => {
    const all = Object.fromEntries(PLACEMENT.map((q) => [q.id, q.answer]));
    expect(scorePlacement(all)).toMatchObject({ score: 18, suggestedStartDay: 22, band: "connector" });
    expect(scorePlacement({}).suggestedStartDay).toBe(1);
    const foundationOnly = Object.fromEntries(PLACEMENT.filter((q) => !["combination", "communication"].includes(q.area)).map((q) => [q.id, q.answer]));
    expect(scorePlacement(foundationOnly).suggestedStartDay).toBe(12);
  });
});
