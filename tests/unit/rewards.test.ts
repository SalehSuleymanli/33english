import { describe, expect, test, vi } from "vitest";
vi.mock("server-only", () => ({}));
import type { SupabaseClient } from "@supabase/supabase-js";
import { processClaim, ClaimError, snapshotFrom, effectiveStreak } from "@/lib/rewards/server";
import { generatePuzzle, checkCrossword, crosswordXp } from "@/lib/game/crossword";
import { currentQuestion, replay, startBattle, step, type Action } from "@/lib/game/quest";
import { STAGES } from "@/content/quest";
import { LESSON_LIST } from "@/content/lessons/registry";
import { levelForXp, xpToReach } from "@/lib/game/levels";
import { dailyChallenges, weekKey, weekDates, validLocalDate, BADGES, EMPTY_FACTS } from "@/lib/game/rewards";
import { SPEAKING } from "@/content/speaking";
import { WORDS } from "@/content/words";
import { SPEAKING_TOPIC_IDS } from "@/content/ids";

/* ---------- an in-memory stand-in for the SQL functions (same rules as the migration) ---------- */
type Ev = { kind: string; ref: string; xp: number; cap_group: string; local_date: string; created_at: string };
function fakeDb() {
  const events: Ev[] = [];
  const progress = { total_xp: 0, level: 1, current_streak: 0, best_streak: 0, last_active_date: null as string | null };
  const games = new Map<string, { stars: number; wins: number; plays: number; best_score: number }>();
  const speaking = new Map<string, number>();
  const badges: Record<string, string> = {};
  let hasProgress = false;
  const dayDiff = (a: string, b: string) => (Date.parse(a) - Date.parse(b)) / 86_400_000;
  const rpc = async (fn: string, a: Record<string, unknown>) => {
    if (fn === "grant_xp") {
      const group = (a.p_cap_group as string) ?? (a.p_kind as string);
      let xp = Math.max(0, Math.min(a.p_xp as number, 1000));
      if (a.p_daily_cap != null) {
        const used = events.filter((e) => e.local_date === a.p_local_date && e.cap_group === group).reduce((n, e) => n + e.xp, 0);
        xp = Math.max(0, Math.min(xp, (a.p_daily_cap as number) - used));
      }
      const dup = events.some((e) => e.kind === a.p_kind && e.ref === a.p_ref);
      hasProgress = true;
      if (!dup) {
        events.push({ kind: a.p_kind as string, ref: a.p_ref as string, xp, cap_group: group, local_date: a.p_local_date as string, created_at: new Date().toISOString() });
        const d = a.p_local_date as string;
        const last = progress.last_active_date;
        progress.current_streak = !last ? 1 : d === last ? Math.max(progress.current_streak, 1) : dayDiff(d, last) === 1 ? progress.current_streak + 1 : d < last ? progress.current_streak : 1;
        progress.best_streak = Math.max(progress.best_streak, progress.current_streak);
        progress.last_active_date = !last || d > last ? d : last;
        progress.total_xp += xp;
        progress.level = levelForXp(progress.total_xp);
      }
      return { data: { granted: !dup, xp: dup ? 0 : xp, ...progress }, error: null };
    }
    if (fn === "record_game") {
      const k = `${a.p_game}:${a.p_ref}`;
      const g = games.get(k) ?? { stars: 0, wins: 0, plays: 0, best_score: 0 };
      g.plays++;
      if (a.p_won) {
        g.wins++;
        g.stars = Math.max(g.stars, a.p_stars as number);
      }
      g.best_score = Math.max(g.best_score, a.p_score as number);
      games.set(k, g);
      return { data: null, error: null };
    }
    if (fn === "record_speaking") {
      speaking.set(a.p_topic as string, (speaking.get(a.p_topic as string) ?? 0) + 1);
      return { data: null, error: null };
    }
    if (fn === "reward_facts") {
      const date = a.p_local_date as string;
      const ws = a.p_week_start as string;
      const inWeek = (e: Ev) => e.local_date >= ws && dayDiff(e.local_date, ws) <= 6;
      const by = (f: (e: Ev) => boolean) => events.filter(f);
      const countBy = (list: Ev[]) => list.reduce<Record<string, number>>((m, e) => ((m[e.kind] = (m[e.kind] ?? 0) + 1), m), {});
      const learning = (e: Ev) => !["daily", "daily_sweep", "weekly", "streak", "stage_complete", "level_test", "lesson_perfect"].includes(e.kind);
      return {
        data: {
          progress: hasProgress ? { ...progress } : null,
          lesson_days: by((e) => e.kind === "lesson_complete").map((e) => e.ref),
          perfect: by((e) => e.kind === "lesson_perfect").length,
          stages: by((e) => e.kind === "stage_complete").map((e) => e.ref),
          crosswords: by((e) => e.kind === "crossword").length,
          hard_crosswords: by((e) => e.kind === "crossword" && e.ref.startsWith("hard-")).length,
          quest_wins: by((e) => e.kind === "quest_clear" || e.kind === "quest_win").length,
          quest_cleared: by((e) => e.kind === "quest_clear").map((e) => e.ref),
          quest_stars: [...games.entries()].filter(([k]) => k.startsWith("quest:")).reduce((n, [, g]) => n + g.stars, 0),
          speaking: by((e) => e.kind === "speaking").length,
          words: by((e) => e.kind === "word_saved").length,
          sweeps: by((e) => e.kind === "daily_sweep").length,
          today: countBy(by((e) => e.local_date === date)),
          today_xp: by((e) => e.local_date === date).reduce((n, e) => n + e.xp, 0),
          week: countBy(by(inWeek)),
          week_days: new Set(by((e) => inWeek(e) && learning(e)).map((e) => e.local_date)).size,
          week_xp: by(inWeek).reduce((n, e) => n + e.xp, 0),
          claimed_today: by((e) => e.kind === "daily" && e.ref.startsWith(`${date}:`)).map((e) => e.ref),
          claimed_week: by((e) => e.kind === "weekly" && e.ref.startsWith(`${a.p_week_key}:`)).map((e) => e.ref),
          badges: { ...badges },
          quest_records: Object.fromEntries([...games.entries()].filter(([k]) => k.startsWith("quest:")).map(([k, g]) => [k.slice(6), g])),
          crossword_solved: [...games.entries()].filter(([k, g]) => k.startsWith("crossword:") && g.wins).map(([k]) => k.slice(10)),
          speaking_done: Object.fromEntries(speaking),
          recent: [],
          last7: {},
        },
        error: null,
      };
    }
    throw new Error(`unknown rpc ${fn}`);
  };
  const from = (table: string) => ({
    upsert: async (rows: { badge_id: string }[]) => {
      if (table !== "user_badges") throw new Error("unexpected table");
      for (const r of rows) badges[r.badge_id] ??= new Date().toISOString();
      return { error: null };
    },
  });
  return { client: { rpc, from } as unknown as SupabaseClient, events, progress, badges };
}

const DATE = "2026-11-04";
const UID = "u1";

function perfectAnswers(day: number) {
  const lesson = LESSON_LIST.find((l) => l.day === day)!;
  const out: Record<string, string> = {};
  for (const ex of lesson.review) {
    if (ex.type === "choice") out[ex.id] = ex.options[ex.answer];
    else if (ex.type === "order") out[ex.id] = ex.tiles.join(" ");
    else if (ex.type === "reading") out[ex.id] = ex.questions.map((q) => q.answer).join(",");
    else if (ex.type === "speak") continue;
    else out[ex.id] = ex.accept[0];
  }
  return out;
}

function winLog(stageId: string, seed: number): Action[] {
  let b = startBattle(stageId, seed, "fox");
  const log: Action[] = [];
  while (b.status === "playing") {
    const a: Action = { t: "answer", a: currentQuestion(b).answer };
    log.push(a);
    b = step(b, a);
  }
  return log;
}

describe("levels", () => {
  test("curve matches the database function", () => {
    expect(levelForXp(0)).toBe(1);
    expect(levelForXp(149)).toBe(1);
    expect(levelForXp(150)).toBe(2);
    expect(levelForXp(375)).toBe(3);
    expect(levelForXp(4050)).toBe(10);
    for (let l = 1; l < 30; l++) expect(levelForXp(xpToReach(l))).toBe(l);
  });
});

describe("lesson claims are re-graded on the server", () => {
  test("perfect review: completion + perfect bonus, once", async () => {
    const db = fakeDb();
    const r = await processClaim(db.client, UID, false, { type: "lesson", localDate: DATE, day: 1, answers: perfectAnswers(1) }, DATE);
    expect(r.detail?.score).toBe(100);
    const kinds = r.granted.map((g) => g.kind);
    expect(kinds).toContain("lesson_complete");
    expect(kinds).toContain("lesson_perfect");
    expect(r.granted.find((g) => g.kind === "lesson_complete")!.xp).toBe(125);
    expect(r.newBadges).toContain("lesson-1");
    // replaying only gives the small replay reward
    const again = await processClaim(db.client, UID, false, { type: "lesson", localDate: DATE, day: 1, answers: perfectAnswers(1) }, DATE);
    expect(again.granted.map((g) => g.kind)).toEqual(["lesson_replay"]);
  });
  test("wrong answers lower the score and remove the bonuses", async () => {
    const db = fakeDb();
    const answers = Object.fromEntries(Object.keys(perfectAnswers(2)).map((k) => [k, "nonsense"]));
    const r = await processClaim(db.client, UID, false, { type: "lesson", localDate: DATE, day: 2, answers }, DATE);
    expect(r.detail?.score).toBe(0);
    expect(r.granted.find((g) => g.kind === "lesson_complete")!.xp).toBe(100);
    expect(r.granted.some((g) => g.kind === "lesson_perfect")).toBe(false);
  });
  test("missing answers are rejected", async () => {
    const db = fakeDb();
    await expect(processClaim(db.client, UID, false, { type: "lesson", localDate: DATE, day: 1, answers: {} }, DATE)).rejects.toBeInstanceOf(ClaimError);
  });
  test("premium lessons need premium", async () => {
    const db = fakeDb();
    await expect(processClaim(db.client, UID, false, { type: "lesson", localDate: DATE, day: 8, answers: perfectAnswers(8) }, DATE)).rejects.toMatchObject({ status: 403 });
    const ok = await processClaim(db.client, UID, true, { type: "lesson", localDate: DATE, day: 8, answers: perfectAnswers(8) }, DATE);
    expect(ok.granted[0].kind).toBe("lesson_complete");
  });
  test("every lesson's authored answers grade at 100%", async () => {
    const { gradeReview } = await import("@/engine/grade");
    for (const l of LESSON_LIST) expect(gradeReview(l.review, perfectAnswers(l.day)).score, `day ${l.day}`).toBe(100);
  });
});

describe("crossword", () => {
  test("solved grid earns XP once; a wrong grid earns nothing", async () => {
    const db = fakeDb();
    const p = generatePuzzle("medium-3")!;
    const answers = Object.fromEntries(p.entries.map((e) => [`${e.num}-${e.dir}`, e.answer]));
    const bad = { ...answers, [`${p.entries[0].num}-${p.entries[0].dir}`]: "zzz" };
    const r0 = await processClaim(db.client, UID, false, { type: "crossword", localDate: DATE, puzzleId: p.id, answers: bad, hints: 0, seconds: 100 }, DATE);
    expect(r0.verified).toBe(false);
    expect(r0.granted).toEqual([]);
    const r1 = await processClaim(db.client, UID, false, { type: "crossword", localDate: DATE, puzzleId: p.id, answers, hints: 2, seconds: 100 }, DATE);
    expect(r1.granted[0]).toMatchObject({ kind: "crossword", xp: crosswordXp("medium", 2, 100) });
    const r2 = await processClaim(db.client, UID, false, { type: "crossword", localDate: DATE, puzzleId: p.id, answers, hints: 0, seconds: 100 }, DATE);
    expect(r2.granted.some((g) => g.kind === "crossword")).toBe(false);
  });
  test("games share a daily cap", async () => {
    const db = fakeDb();
    let total = 0;
    for (let n = 1; n <= 8; n++) {
      const p = generatePuzzle(`hard-${n}`)!;
      const answers = Object.fromEntries(p.entries.map((e) => [`${e.num}-${e.dir}`, e.answer]));
      const r = await processClaim(db.client, UID, false, { type: "crossword", localDate: DATE, puzzleId: p.id, answers, hints: 0, seconds: 60 }, DATE);
      total += r.granted.filter((g) => g.kind === "crossword").reduce((a, g) => a + g.xp, 0);
    }
    expect(total).toBe(400);
  });
  test("generator: 300 puzzles, every word placed and checkable, no stray words", () => {
    for (const d of ["easy", "medium", "hard"] as const)
      for (let n = 1; n <= 100; n++) {
        const p = generatePuzzle(`${d}-${n}`)!;
        expect(p.entries.length).toBe(d === "easy" ? 6 : d === "medium" ? 8 : 10);
        expect(checkCrossword(p.id, Object.fromEntries(p.entries.map((e) => [`${e.num}-${e.dir}`, e.answer]))).ok).toBe(true);
        const ents = new Set(p.entries.map((e) => `${e.row},${e.col},${e.dir}`));
        for (let r = 0; r < p.height; r++)
          for (let c = 0; c < p.width; c++) {
            if (!p.grid[r][c]) continue;
            if ((c === 0 || !p.grid[r][c - 1]) && p.grid[r][c + 1]) expect(ents.has(`${r},${c},across`), `${p.id} ${r},${c}`).toBe(true);
            if ((r === 0 || !p.grid[r - 1][c]) && p.grid[r + 1]?.[c]) expect(ents.has(`${r},${c},down`), `${p.id} ${r},${c}`).toBe(true);
          }
      }
  });
});

describe("Word Quest battles are replayed on the server", () => {
  test("a real win earns first-clear XP and unlocks the next stage", async () => {
    const db = fakeDb();
    const log = winLog("w1-s1", 42);
    const r = await processClaim(db.client, UID, false, { type: "quest", localDate: DATE, stageId: "w1-s1", seed: 42, hero: "fox", power: 0, log }, DATE);
    expect(r.granted[0]).toMatchObject({ kind: "quest_clear", xp: 50 });
    expect(r.snapshot.facts.questCleared).toContain("w1-s1");
    const r2 = await processClaim(db.client, UID, false, { type: "quest", localDate: DATE, stageId: "w1-s2", seed: 7, hero: "fox", power: 0, log: winLog("w1-s2", 7) }, DATE);
    expect(r2.granted[0].kind).toBe("quest_clear");
  });
  test("a forged log (wrong answers) is not a win", async () => {
    const db = fakeDb();
    const log: Action[] = Array.from({ length: 30 }, () => ({ t: "answer", a: "I win" }));
    const r = await processClaim(db.client, UID, false, { type: "quest", localDate: DATE, stageId: "w1-s1", seed: 42, hero: "fox", power: 0, log }, DATE);
    expect(r.granted).toEqual([]);
    expect(r.detail?.status).toBe("lost");
  });
  test("answers for a different seed don't work", async () => {
    const db = fakeDb();
    const r = await processClaim(db.client, UID, false, { type: "quest", localDate: DATE, stageId: "w1-s1", seed: 43, hero: "fox", power: 0, log: winLog("w1-s1", 42) }, DATE);
    expect(r.granted).toEqual([]);
  });
  test("locked stages, locked heroes and inflated power are refused", async () => {
    const db = fakeDb();
    await expect(processClaim(db.client, UID, false, { type: "quest", localDate: DATE, stageId: "w2-s1", seed: 1, hero: "fox", power: 0, log: winLog("w2-s1", 1) }, DATE)).rejects.toMatchObject({ status: 403 });
    await expect(processClaim(db.client, UID, false, { type: "quest", localDate: DATE, stageId: "w1-s1", seed: 1, hero: "bear", power: 0, log: [] }, DATE)).rejects.toMatchObject({ status: 403 });
    await expect(processClaim(db.client, UID, false, { type: "quest", localDate: DATE, stageId: "w1-s1", seed: 1, hero: "fox", power: 5, log: [] }, DATE)).rejects.toMatchObject({ status: 403 });
  });
  test("every stage can be won with correct answers, and replays match", () => {
    for (const s of STAGES) {
      const log = winLog(s.id, 99);
      expect(replay(s.id, 99, "fox", 0, log).status, s.id).toBe("won");
    }
  });
  test("questions are well-formed for all stages", () => {
    for (const s of STAGES)
      for (let seed = 1; seed <= 20; seed++)
        for (let i = 0; i < 20; i++) {
          const q = currentQuestion({ ...startBattle(s.id, seed, "fox"), turn: i });
          if (q.kind === "grammar" || q.kind === "match" || q.kind === "fix") expect(q.options).toContain(q.answer);
          if (q.kind === "discover") expect([...q.letters].sort().join("")).toBe([...q.answer].sort().join(""));
          if (q.kind === "build") expect([...q.tiles].sort().join(" ")).toBe(q.answer.split(" ").sort().join(" "));
        }
  });
});

describe("speaking, words, challenges, streaks", () => {
  test("speaking: new topic 40 XP, repeat 10 XP", async () => {
    const db = fakeDb();
    const a = await processClaim(db.client, UID, false, { type: "speaking", localDate: DATE, topicId: "dream-house" }, DATE);
    expect(a.granted[0]).toMatchObject({ kind: "speaking", xp: 40 });
    const b = await processClaim(db.client, UID, false, { type: "speaking", localDate: DATE, topicId: "dream-house" }, DATE);
    expect(b.granted[0]).toMatchObject({ kind: "speaking_repeat", xp: 10 });
    await expect(processClaim(db.client, UID, false, { type: "speaking", localDate: DATE, topicId: "nope" }, DATE)).rejects.toBeInstanceOf(ClaimError);
  });
  test("words must come from the lessons", async () => {
    const db = fakeDb();
    const term = LESSON_LIST[0].vocabulary[0].term;
    const r = await processClaim(db.client, UID, false, { type: "word", localDate: DATE, term }, DATE);
    expect(r.granted[0]).toMatchObject({ kind: "word_saved", xp: 5 });
    await expect(processClaim(db.client, UID, false, { type: "word", localDate: DATE, term: "made-up-word" }, DATE)).rejects.toBeInstanceOf(ClaimError);
  });
  test("completing all three daily challenges gives the bonus", async () => {
    const db = fakeDb();
    const chs = dailyChallenges(DATE);
    // do two of everything that could be asked
    const lessonTerms = LESSON_LIST[0].vocabulary.map((v) => v.term);
    for (const t of lessonTerms.slice(0, 3)) await processClaim(db.client, UID, false, { type: "word", localDate: DATE, term: t }, DATE);
    await processClaim(db.client, UID, false, { type: "lesson", localDate: DATE, day: 1, answers: perfectAnswers(1) }, DATE);
    await processClaim(db.client, UID, false, { type: "speaking", localDate: DATE, topicId: "hobby" }, DATE);
    for (const n of [1, 2]) {
      const p = generatePuzzle(`easy-${n}`)!;
      await processClaim(db.client, UID, false, { type: "crossword", localDate: DATE, puzzleId: p.id, answers: Object.fromEntries(p.entries.map((e) => [`${e.num}-${e.dir}`, e.answer])), hints: 0, seconds: 30 }, DATE);
    }
    let r = await processClaim(db.client, UID, false, { type: "quest", localDate: DATE, stageId: "w1-s1", seed: 5, hero: "fox", power: 0, log: winLog("w1-s1", 5) }, DATE);
    for (const [st, sd] of [["w1-s2", 6], ["w1-s3", 8]] as const) r = await processClaim(db.client, UID, false, { type: "quest", localDate: DATE, stageId: st, seed: sd, hero: "fox", power: 0, log: winLog(st, sd) }, DATE);
    expect(r.snapshot.daily.map((c) => c.id)).toEqual(chs.map((c) => c.id));
    expect(r.snapshot.daily.every((c) => c.claimed)).toBe(true);
    expect(db.events.some((e) => e.kind === "daily_sweep")).toBe(true);
    expect(db.badges["sweep-1"]).toBeTruthy();
  });
  test("streak milestone after 3 days in a row", async () => {
    const db = fakeDb();
    for (const [d, t] of [["2026-11-02", "hobby"], ["2026-11-03", "gift"], ["2026-11-04", "hometown"]]) await processClaim(db.client, UID, false, { type: "speaking", localDate: d, topicId: t }, d);
    expect(db.events.some((e) => e.kind === "streak" && e.ref === "3@2026-11-04")).toBe(true);
    expect(db.progress.current_streak).toBe(3);
  });
  test("streak shows 0 after a missed day", () => {
    expect(effectiveStreak(5, "2026-11-03", "2026-11-04")).toBe(5);
    expect(effectiveStreak(5, "2026-11-02", "2026-11-04")).toBe(0);
  });
  test("helpers", () => {
    expect(weekKey("2026-11-04")).toBe("2026-W45");
    expect(weekDates("2026-11-04")[0]).toBe("2026-11-02");
    expect(validLocalDate("2026-11-04", new Date("2026-11-04T10:00:00Z"))).toBe("2026-11-04");
    expect(validLocalDate("2026-11-09", new Date("2026-11-04T10:00:00Z"))).toBeNull();
    expect(validLocalDate("garbage")).toBeNull();
    expect(BADGES.every((b) => !b.test(EMPTY_FACTS))).toBe(true);
    expect(snapshotFrom).toBeTypeOf("function");
  });
});

describe("content", () => {
  test("speaking: 20 topics, every tagged phrase appears in its sentence, all six frames used", () => {
    expect(SPEAKING.length).toBeGreaterThanOrEqual(20);
    expect(new Set(SPEAKING.map((t) => t.id)).size).toBe(SPEAKING.length);
    expect([...SPEAKING_TOPIC_IDS]).toEqual(SPEAKING.map((t) => t.id));
    for (const t of SPEAKING) {
      for (const r of t.rich) for (const tag of r.tags) expect(r.s.includes(tag.phrase), `${t.id}: \"${tag.phrase}\"`).toBe(true);
      const frames = new Set(t.rich.flatMap((r) => r.tags.map((x) => x.frame)));
      expect(frames.size, t.id).toBeGreaterThanOrEqual(5);
      expect(t.vocab.length).toBeGreaterThanOrEqual(5);
    }
  });
  test("word bank: unique, letters only, every example has one gap", () => {
    expect(new Set(WORDS.map((w) => w.word)).size).toBe(WORDS.length);
    for (const w of WORDS) {
      expect(w.word).toMatch(/^[a-z]{3,12}$/);
      expect(w.example.split("___").length, w.word).toBe(2);
    }
  });
});
