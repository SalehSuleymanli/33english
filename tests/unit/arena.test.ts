import { describe, expect, test, vi } from "vitest";
vi.mock("server-only", () => ({}));
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  COUNTDOWN_MS,
  LOBBY_MS,
  MATCH_MS,
  QUESTIONS,
  QUESTION_MS,
  ROUND_MS,
  arenaBots,
  arenaQuestions,
  arenaXp,
  botAnswer,
  phaseAt,
  pointsFor,
} from "@/lib/game/arena";
import { arenaAnswer, arenaResult, arenaState, ArenaError } from "@/lib/arena/server";
import { processClaim } from "@/lib/rewards/server";

/* ---------- a tiny in-memory stand-in for the arena tables ---------- */
type Row = Record<string, unknown>;
function fakeAdmin(tables: Record<string, Row[]>) {
  const query = (table: string) => {
    const filters: [string, unknown][] = [];
    const run = () => ({ data: (tables[table] ?? []).filter((r) => filters.every(([k, v]) => r[k] === v)), error: null });
    const q = {
      select: () => q,
      eq: (k: string, v: unknown) => (filters.push([k, v]), q),
      maybeSingle: async () => ({ data: run().data[0] ?? null, error: null }),
      then: (res: (v: unknown) => unknown) => Promise.resolve(run()).then(res),
      insert: async (row: Row) => {
        const dup = (tables[table] ?? []).some((r) => r.match_id === row.match_id && r.user_id === row.user_id && r.q === row.q);
        if (dup) return { error: { code: "23505", message: "duplicate" } };
        (tables[table] ??= []).push(row);
        return { error: null };
      },
    };
    return q;
  };
  return { from: query, tables } as unknown as SupabaseClient & { tables: Record<string, Row[]> };
}

const MATCH = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const ME = "11111111-1111-1111-1111-111111111111";
const T0 = Date.UTC(2026, 10, 5, 12, 0, 0);

function setup(humans = 1) {
  return fakeAdmin({
    arena_matches: [{ id: MATCH, seed: 12345, fill_at: new Date(T0 + LOBBY_MS).toISOString(), start_at: null }],
    arena_players: Array.from({ length: humans }, (_, i) => ({ match_id: MATCH, user_id: i === 0 ? ME : `u${i}`, seat: i, name: i === 0 ? "Me" : `P${i}`, avatar: "fox" })),
    arena_answers: [],
  });
}
const qStart = (q: number) => T0 + LOBBY_MS + COUNTDOWN_MS + q * ROUND_MS;

describe("arena timeline", () => {
  test("lobby → countdown → questions → done", () => {
    const fill = T0 + LOBBY_MS;
    expect(phaseAt(T0, fill, null).phase).toBe("lobby");
    expect(phaseAt(fill + 1, fill, null).phase).toBe("countdown");
    expect(phaseAt(qStart(0) + 1, fill, null)).toMatchObject({ phase: "question", q: 0 });
    expect(phaseAt(qStart(0) + QUESTION_MS + 1, fill, null)).toMatchObject({ phase: "reveal", q: 0 });
    expect(phaseAt(qStart(7) + 1, fill, null)).toMatchObject({ phase: "question", q: 7 });
    expect(phaseAt(qStart(0) + MATCH_MS, fill, null).phase).toBe("done");
  });
  test("a full lobby starts early", () => {
    expect(phaseAt(T0 + 1000, T0 + LOBBY_MS, T0 + 4000).phase).toBe("countdown");
    expect(phaseAt(T0 + 4001, T0 + LOBBY_MS, T0 + 4000)).toMatchObject({ phase: "question", q: 0 });
  });
  test("points reward speed, wrong answers score 0", () => {
    expect(pointsFor(true, 0)).toBe(1000);
    expect(pointsFor(true, QUESTION_MS)).toBe(500);
    expect(pointsFor(false, 100)).toBe(0);
    expect(arenaXp(1, 8)).toBe(100);
    expect(arenaXp(5, 0)).toBe(20);
  });
});

describe("arena questions and bots", () => {
  test("500 seeds: 8 questions, unique options, the answer is one of them", () => {
    for (let seed = 1; seed <= 500; seed++) {
      const qs = arenaQuestions(seed);
      expect(qs).toHaveLength(QUESTIONS);
      expect(new Set(qs.map((q) => q.prompt + q.options[q.answer])).size).toBe(QUESTIONS);
      for (const q of qs) {
        expect(new Set(q.options).size, `${seed}: ${q.prompt}`).toBe(q.options.length);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(q.options.length);
      }
    }
  });
  test("same seed → same match; bots fill the free seats", () => {
    expect(arenaQuestions(7)).toEqual(arenaQuestions(7));
    const bots = arenaBots(7, [0, 2]);
    expect(bots.map((b) => b.seat)).toEqual([1, 3, 4]);
    expect(new Set(bots.map((b) => b.name)).size).toBe(3);
    const q = arenaQuestions(7)[0];
    for (const b of bots) {
      const a = botAnswer(7, b, 0, q);
      expect(a.correct).toBe(a.choice === q.answer);
    }
  });
  test("bots answer like real learners (50–85% right)", () => {
    let right = 0;
    let total = 0;
    for (let seed = 1; seed <= 200; seed++) {
      const qs = arenaQuestions(seed);
      for (const b of arenaBots(seed, [0])) for (let i = 0; i < QUESTIONS; i++) (total++, botAnswer(seed, b, i, qs[i]).correct && right++);
    }
    expect(right / total).toBeGreaterThan(0.55);
    expect(right / total).toBeLessThan(0.8);
  });
});

describe("arena server", () => {
  test("the lobby shows only people; questions and answers stay hidden until their time", async () => {
    const admin = setup(2);
    const lobby = await arenaState(admin, ME, MATCH, T0 + 1000);
    expect(lobby.phase.phase).toBe("lobby");
    expect(lobby.players).toHaveLength(2);
    expect(lobby.question).toBeNull();
    const live = await arenaState(admin, ME, MATCH, qStart(0) + 500);
    expect(live.players).toHaveLength(5);
    expect(live.players.filter((p) => p.bot)).toHaveLength(3);
    expect(live.question?.index).toBe(0);
    expect(live.reveal).toBeNull();
    expect(JSON.stringify(live)).not.toContain('"answer"');
    expect(JSON.stringify(live)).not.toContain("12345"); // the seed never leaves the server
  });
  test("answers are timed and scored by the server, once, and only while the question is open", async () => {
    const admin = setup();
    const q = arenaQuestions(12345)[0];
    await expect(arenaAnswer(admin, ME, MATCH, 0, q.answer, qStart(0) - 10)).rejects.toBeInstanceOf(ArenaError);
    await arenaAnswer(admin, ME, MATCH, 0, q.answer, qStart(0) + 2000);
    await arenaAnswer(admin, ME, MATCH, 0, (q.answer + 1) % q.options.length, qStart(0) + 2500); // second try ignored
    const saved = admin.tables.arena_answers;
    expect(saved).toHaveLength(1);
    expect(saved[0]).toMatchObject({ correct: true, ms: 2000, points: pointsFor(true, 2000) });
    await expect(arenaAnswer(admin, ME, MATCH, 1, 0, qStart(0) + 3000)).rejects.toMatchObject({ status: 409 });
    await expect(arenaAnswer(admin, ME, MATCH, 0, 0, qStart(0) + QUESTION_MS + 1)).rejects.toMatchObject({ status: 409 });
    // scores only count once the question closes
    const during = await arenaState(admin, ME, MATCH, qStart(0) + 5000);
    expect(during.players.find((p) => p.me)!.score).toBe(0);
    const after = await arenaState(admin, ME, MATCH, qStart(0) + QUESTION_MS + 100);
    expect(after.players.find((p) => p.me)!.score).toBe(pointsFor(true, 2000));
    expect(after.reveal?.answer).toBe(q.answer);
  });
  test("strangers can't read or answer", async () => {
    const admin = setup();
    await expect(arenaState(admin, "someone-else", MATCH, T0)).rejects.toMatchObject({ status: 403 });
    await expect(arenaAnswer(admin, "someone-else", MATCH, 0, 0, qStart(0) + 1)).rejects.toMatchObject({ status: 403 });
  });
  test("result and XP only after the match ends", async () => {
    const admin = setup();
    const qs = arenaQuestions(12345);
    for (let i = 0; i < QUESTIONS; i++) await arenaAnswer(admin, ME, MATCH, i, qs[i].answer, qStart(i) + 500);
    expect((await arenaResult(admin, ME, MATCH, qStart(7) + 100)).finished).toBe(false);
    const r = await arenaResult(admin, ME, MATCH, qStart(0) + MATCH_MS + 1);
    expect(r).toMatchObject({ finished: true, rank: 1, correct: 8 });
  });
  test("an unfinished match can't be claimed for XP", async () => {
    const admin = setup();
    const rpc = vi.fn(async () => ({ data: { progress: null, badges: {}, today: {}, week: {}, claimed_today: [], claimed_week: [] }, error: null }));
    Object.assign(admin, { rpc });
    vi.useFakeTimers();
    vi.setSystemTime(T0);
    await expect(processClaim(admin, ME, false, { type: "arena", localDate: "2026-11-05", matchId: MATCH }, "2026-11-05")).rejects.toMatchObject({ status: 409 });
    vi.useRealTimers();
  });
});
