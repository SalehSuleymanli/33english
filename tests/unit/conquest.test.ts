import { describe, expect, test, vi } from "vitest";
vi.mock("server-only", () => ({}));
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  CAPITALS,
  COUNTDOWN_MS,
  LOBBY_MS,
  PICK_MS,
  QUESTION_MS,
  REGIONS,
  STEPS,
  STEP_MS,
  conquestXp,
  initialBoard,
  legalTargets,
  matchQuestions,
  replay,
  scoreOf,
  type Action,
} from "@/lib/game/conquest";
import { conquestAnswer, conquestPick, conquestResult, conquestState } from "@/lib/conquest/server";
import { processClaim } from "@/lib/rewards/server";

const NAMES = ["A", "B", "C", "D"];

describe("map and rules", () => {
  test("every region is reachable and links go both ways", () => {
    for (const [i, r] of REGIONS.entries()) for (const j of r.adj) expect(REGIONS[j].adj, `${r.id}`).toContain(i);
    const seen = new Set([0]);
    const queue = [0];
    while (queue.length) for (const j of REGIONS[queue.shift()!].adj) if (!seen.has(j)) (seen.add(j), queue.push(j));
    expect(seen.size).toBe(REGIONS.length);
    expect(new Set(CAPITALS).size).toBe(4);
  });
  test("expansion targets are free neighbours; battle targets are neighbouring rivals or free land", () => {
    const b = initialBoard();
    const t = legalTargets(b, 0, "expand");
    expect(t.length).toBeGreaterThan(0);
    for (const r of t) expect(b.owner[r]).toBe(-1);
    for (const r of legalTargets(b, 0, "duel")) expect(b.owner[r]).not.toBe(0);
  });
  test("questions: one per step, well-formed for 300 seeds", () => {
    for (let seed = 1; seed <= 300; seed++) {
      const qs = matchQuestions(seed);
      expect(qs).toHaveLength(STEPS.length);
      for (const q of qs) {
        expect(new Set(q.options).size).toBe(q.options.length);
        expect(q.answer).toBeGreaterThanOrEqual(0);
      }
    }
  });
});

describe("replay", () => {
  test("bot-only matches always finish with every region accounted for", () => {
    for (let seed = 1; seed <= 200; seed++) {
      const r = replay({ seed, names: NAMES, humanSeats: [], actions: [], start: 0, now: 10 ** 9 });
      expect(r.live.phase).toBe("done");
      const total = [0, 1, 2, 3].reduce((n, s) => n + scoreOf(r.board, s), 0);
      expect(total).toBeGreaterThan(0);
      for (let s = 0; s < 4; s++) if (!r.board.alive[s]) expect(r.board.owner.filter((o) => o === s)).toHaveLength(0);
    }
  });
  test("a perfect human beats average bots most of the time", () => {
    let wins = 0;
    for (let seed = 1; seed <= 60; seed++) {
      const actions: Action[] = [];
      const qs = matchQuestions(seed);
      for (const s of STEPS) actions.push({ seat: 0, step: s.index, kind: "answer", value: qs[s.index].answer, ms: 900 });
      const r = replay({ seed, names: NAMES, humanSeats: [0], actions, start: 0, now: 10 ** 9 });
      const best = Math.max(...[1, 2, 3].map((s) => scoreOf(r.board, s)));
      if (scoreOf(r.board, 0) > best) wins++;
    }
    expect(wins).toBeGreaterThan(40);
  });
  test("same inputs → same result (the server can re-check any match)", () => {
    const a = replay({ seed: 77, names: NAMES, humanSeats: [1], actions: [], start: 0, now: 10 ** 9 });
    const b = replay({ seed: 77, names: NAMES, humanSeats: [1], actions: [], start: 0, now: 10 ** 9 });
    expect(a.board).toEqual(b.board);
    expect(a.history).toEqual(b.history);
  });
});

/* ---------- server with an in-memory database ---------- */
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
        const dup = (tables[table] ?? []).some((r) => r.match_id === row.match_id && r.user_id === row.user_id && r.step === row.step && r.kind === row.kind);
        if (dup) return { error: { code: "23505", message: "duplicate" } };
        (tables[table] ??= []).push(row);
        return { error: null };
      },
    };
    return q;
  };
  return { from: query, tables } as unknown as SupabaseClient & { tables: Record<string, Row[]> };
}

const MATCH = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
const ME = "11111111-1111-1111-1111-111111111111";
const T0 = Date.UTC(2026, 10, 7, 12, 0, 0);
const START = T0 + LOBBY_MS + COUNTDOWN_MS;
const at = (step: number, ms: number) => START + step * STEP_MS + ms; // no turns are skipped early in a match

function setup() {
  return fakeAdmin({
    conquest_matches: [{ id: MATCH, seed: 4242, fill_at: new Date(T0 + LOBBY_MS).toISOString(), start_at: null }],
    conquest_players: [{ match_id: MATCH, user_id: ME, seat: 0, name: "Me", avatar: "fox" }],
    conquest_actions: [],
  });
}

describe("conquest server", () => {
  test("lobby, then countdown with bots, then the first pick", async () => {
    const admin = setup();
    expect((await conquestState(admin, ME, MATCH, T0 + 1000)).phase).toBe("lobby");
    const cd = await conquestState(admin, ME, MATCH, T0 + LOBBY_MS + 100);
    expect(cd.phase).toBe("countdown");
    expect(cd.players.filter((p) => p.bot)).toHaveLength(3);
    const pick = await conquestState(admin, ME, MATCH, at(0, 100));
    expect(pick.phase).toBe("pick");
    expect(pick.legal.length).toBeGreaterThan(0);
    expect(pick.question).toBeNull(); // the question is hidden until picking ends
    expect(JSON.stringify(pick)).not.toContain("4242"); // the seed never leaves the server
  });
  test("picks must be legal and on time; answers are timed by the server", async () => {
    const admin = setup();
    const s = await conquestState(admin, ME, MATCH, at(0, 100));
    const illegal = REGIONS.findIndex((_, r) => !s.legal.includes(r));
    await expect(conquestPick(admin, ME, MATCH, 0, illegal, at(0, 200))).rejects.toMatchObject({ status: 400 });
    await conquestPick(admin, ME, MATCH, 0, s.legal[0], at(0, 300));
    await expect(conquestPick(admin, ME, MATCH, 0, s.legal[0], at(0, PICK_MS + 10))).rejects.toMatchObject({ status: 409 });
    const q = await conquestState(admin, ME, MATCH, at(0, PICK_MS + 100));
    expect(q.phase).toBe("question");
    expect(q.canAnswer).toBe(true);
    expect(JSON.stringify(q)).not.toContain('"answer"');
    const right = matchQuestions(4242)[0].answer;
    await conquestAnswer(admin, ME, MATCH, 0, right, at(0, PICK_MS + 1500));
    const saved = admin.tables.conquest_actions.find((a) => a.kind === "answer")!;
    expect(saved.ms).toBe(1500);
    const rev = await conquestState(admin, ME, MATCH, at(0, PICK_MS + QUESTION_MS + 100));
    expect(rev.phase).toBe("reveal");
    expect(rev.reveal?.answer).toBe(right);
    // a right answer claims the picked region (unless a faster bot took the same one)
    const claimedByMe = rev.owner[s.legal[0]] === 0;
    const fasterClash = rev.reveal!.results.some((r) => r.seat !== 0 && r.correct && r.ms < 1500 && rev.reveal!.picks[r.seat] === s.legal[0]);
    expect(claimedByMe || fasterClash).toBe(true);
  });
  test("you can't answer someone else's duel", async () => {
    const admin = setup();
    // find a battle turn where seat 0 neither attacks nor defends
    const firstDuel = STEPS.find((x) => x.kind === "duel" && x.attacker !== 0)!;
    const st = await conquestState(admin, ME, MATCH, at(firstDuel.index, PICK_MS + 100));
    if (st.step?.defender !== 0) await expect(conquestAnswer(admin, ME, MATCH, firstDuel.index, 0, at(firstDuel.index, PICK_MS + 200))).rejects.toMatchObject({ status: 403 });
  });
  test("results and XP only after the war ends", async () => {
    const admin = setup();
    expect((await conquestResult(admin, ME, MATCH, at(2, 0))).finished).toBe(false);
    const done = await conquestResult(admin, ME, MATCH, START + STEPS.length * STEP_MS + 1);
    expect(done.finished).toBe(true);
    expect(conquestXp(1, 10)).toBe(140);
    const rpc = vi.fn(async () => ({ data: { progress: null, badges: {}, today: {}, week: {}, claimed_today: [], claimed_week: [] }, error: null }));
    Object.assign(admin, { rpc });
    vi.useFakeTimers();
    vi.setSystemTime(at(1, 0));
    await expect(processClaim(admin, ME, false, { type: "conquest", localDate: "2026-11-07", matchId: MATCH }, "2026-11-07")).rejects.toMatchObject({ status: 409 });
    vi.useRealTimers();
  });
  test("strangers can't see a match", async () => {
    await expect(conquestState(setup(), "someone-else", MATCH, T0)).rejects.toMatchObject({ status: 403 });
  });
});
