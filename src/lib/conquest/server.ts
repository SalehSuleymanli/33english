import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  COUNTDOWN_MS,
  LOBBY_MS,
  MATCH_MS,
  PICK_MS,
  SEATS,
  SEAT_COLORS,
  STEPS,
  matchBots,
  rankPlayers,
  replay,
  safeAvatar,
  scoreOf,
  type Action,
  type ConquestState,
  type PlayerView,
} from "@/lib/game/conquest";
import { hashString } from "@/lib/game/rng";

export class ConquestError extends Error {
  constructor(message: string, public status = 400) {
    super(message);
  }
}

type MatchRow = { id: string; seed: number; fill_at: string; start_at: string | null };
type PlayerRow = { user_id: string; seat: number; name: string; avatar: string };
type ActionRow = { user_id: string; step: number; kind: "pick" | "answer"; value: number; ms: number };

async function load(admin: SupabaseClient, matchId: string, uid: string) {
  const [m, p, a] = await Promise.all([
    admin.from("conquest_matches").select("id, seed, fill_at, start_at").eq("id", matchId).maybeSingle(),
    admin.from("conquest_players").select("user_id, seat, name, avatar").eq("match_id", matchId),
    admin.from("conquest_actions").select("user_id, step, kind, value, ms").eq("match_id", matchId),
  ]);
  if (m.error || p.error || a.error) throw new Error((m.error ?? p.error ?? a.error)!.message);
  if (!m.data) throw new ConquestError("Match not found", 404);
  const match = m.data as MatchRow;
  const players = (p.data ?? []) as PlayerRow[];
  const me = players.find((x) => x.user_id === uid);
  if (!me) throw new ConquestError("You're not in this match", 403);
  const fillAt = Date.parse(match.fill_at);
  const startAt = match.start_at ? Date.parse(match.start_at) : fillAt + COUNTDOWN_MS;
  const lobby = !match.start_at;
  const seatOf = new Map(players.map((x) => [x.user_id, x.seat]));
  const actions: Action[] = ((a.data ?? []) as ActionRow[]).map((r) => ({ seat: seatOf.get(r.user_id) ?? -1, step: r.step, kind: r.kind, value: r.value, ms: r.ms }));
  const bots = matchBots(
    match.seed,
    players.map((x) => x.seat),
  );
  const names = Array.from({ length: SEATS }, (_, s) => players.find((x) => x.seat === s)?.name ?? bots.find((b) => b.seat === s)?.name ?? `Player ${s + 1}`);
  return { match, players, me, fillAt, startAt, lobby, actions, bots, names };
}

const guestName = (uid: string) => `Player ${100 + (hashString(uid) % 900)}`;

export async function conquestJoin(admin: SupabaseClient, uid: string): Promise<string> {
  const { data: profile } = await admin.from("profiles").select("display_name, avatar").eq("id", uid).maybeSingle();
  const name = (profile?.display_name as string | null)?.trim().split(/\s+/)[0]?.slice(0, 24) || guestName(uid);
  const { data, error } = await admin.rpc("conquest_join", {
    p_user: uid,
    p_name: name,
    p_avatar: safeAvatar(profile?.avatar as string | undefined),
    p_lobby_ms: LOBBY_MS,
    p_countdown_ms: COUNTDOWN_MS,
    p_match_ms: MATCH_MS,
  });
  if (error) throw new Error(error.message);
  return data as string;
}

export async function conquestLeave(admin: SupabaseClient, uid: string, matchId: string): Promise<boolean> {
  const { data, error } = await admin.rpc("conquest_leave", { p_user: uid, p_match: matchId });
  if (error) throw new Error(error.message);
  return !!data;
}

export async function conquestState(admin: SupabaseClient, uid: string, matchId: string, now = Date.now()): Promise<ConquestState> {
  const L = await load(admin, matchId, uid);
  const mySeat = L.me.seat;
  const base = { ok: true as const, matchId, serverNow: now, fillAt: L.fillAt, startAt: L.startAt, mySeat };

  if (L.lobby && now < L.fillAt) {
    const players: PlayerView[] = L.players
      .map((p) => ({ seat: p.seat, name: p.name, avatar: safeAvatar(p.avatar), bot: false, me: p.user_id === uid, score: 0, regions: 1, towers: 3, alive: true, correct: 0, color: SEAT_COLORS[p.seat] }))
      .sort((a, b) => a.seat - b.seat);
    return { ...base, phase: "lobby", endsAt: L.fillAt, step: null, owner: [], towers: [], players, legal: [], myPick: null, canAnswer: false, myChoice: null, question: null, reveal: null, lastEvent: null, review: null };
  }

  const r = replay({ seed: L.match.seed, names: L.names, humanSeats: L.players.map((p) => p.seat), actions: L.actions, start: L.startAt, now });
  const b = r.board;
  const players: PlayerView[] = Array.from({ length: SEATS }, (_, s) => {
    const human = L.players.find((p) => p.seat === s);
    const bot = L.bots.find((x) => x.seat === s);
    return {
      seat: s,
      name: human?.name ?? bot?.name ?? `Player ${s + 1}`,
      avatar: human ? safeAvatar(human.avatar) : (bot?.avatar ?? "fox"),
      bot: !human,
      me: s === mySeat,
      score: scoreOf(b, s),
      regions: b.owner.filter((o) => o === s).length,
      towers: b.towers[s],
      alive: b.alive[s],
      correct: b.correct[s],
      color: SEAT_COLORS[s],
    };
  });
  const lastEvent = r.history.length ? r.history[r.history.length - 1].text : null;
  const live = r.live;
  const common = { ...base, owner: b.owner, towers: b.towers, players, lastEvent };

  if (live.phase === "countdown")
    return { ...common, phase: "countdown", endsAt: live.endsAt, step: null, legal: [], myPick: null, canAnswer: false, myChoice: null, question: null, reveal: null, review: null };

  if (live.phase === "done") {
    const mine = (step: number) => L.actions.find((a) => a.seat === mySeat && a.step === step && a.kind === "answer")?.value ?? null;
    const asked = new Set(r.history.filter((h) => h.results.some((x) => x.seat === mySeat)).map((h) => h.step));
    const review = STEPS.filter((s) => asked.has(s.index)).map((s) => {
      const q = r.questions[s.index];
      return { kind: q.kind, prompt: q.prompt, options: q.options, answer: q.answer, mine: mine(s.index), tip: q.tip };
    });
    return { ...common, phase: "done", endsAt: null, step: null, legal: [], myPick: null, canAnswer: false, myChoice: null, question: null, reveal: null, review };
  }

  const q = r.questions[live.step.index];
  const myPickAct = L.actions.find((a) => a.seat === mySeat && a.step === live.step.index && a.kind === "pick");
  const myAnswer = L.actions.find((a) => a.seat === mySeat && a.step === live.step.index && a.kind === "answer");
  const showQuestion = live.phase !== "pick";
  return {
    ...common,
    phase: live.phase,
    endsAt: live.endsAt,
    step: { index: live.step.index, total: STEPS.length, kind: live.step.kind, round: live.step.round, attacker: live.step.attacker, target: live.target, defender: live.defender },
    legal: live.phase === "pick" && live.pickers.includes(mySeat) ? (live.legal[mySeat] ?? []) : [],
    myPick: myPickAct?.value ?? (live.step.kind === "duel" && live.step.attacker === mySeat ? live.target : null),
    canAnswer: live.phase === "question" && live.participants.includes(mySeat) && !myAnswer,
    myChoice: myAnswer?.value ?? null,
    question: showQuestion ? { kind: q.kind, prompt: q.prompt, options: q.options } : null,
    reveal:
      live.phase === "reveal" && live.outcome
        ? { answer: q.answer, tip: q.tip, results: live.outcome.results, text: live.outcome.text, captured: live.outcome.captured.map((c) => c.region), picks: live.outcome.picks }
        : null,
    review: null,
  };
}

async function record(admin: SupabaseClient, matchId: string, uid: string, step: number, kind: "pick" | "answer", value: number, ms: number) {
  const { error } = await admin.from("conquest_actions").insert({ match_id: matchId, user_id: uid, step, kind, value, ms });
  if (error && error.code !== "23505") throw new Error(error.message); // 23505 = already chosen
}

/** Choose a region. Only during your pick window, and only a legal region. */
export async function conquestPick(admin: SupabaseClient, uid: string, matchId: string, step: number, region: number, now = Date.now()) {
  const L = await load(admin, matchId, uid);
  if (L.lobby && now < L.fillAt) throw new ConquestError("The match hasn't started", 409);
  const r = replay({ seed: L.match.seed, names: L.names, humanSeats: L.players.map((p) => p.seat), actions: L.actions, start: L.startAt, now });
  const live = r.live;
  if (live.phase !== "pick" || live.step.index !== step) throw new ConquestError("Too late to choose", 409);
  if (!live.pickers.includes(L.me.seat)) throw new ConquestError("It's not your turn", 403);
  if (!(live.legal[L.me.seat] ?? []).includes(region)) throw new ConquestError("You can't pick that region");
  await record(admin, matchId, uid, step, "pick", region, now - live.stepStart);
  return { ok: true as const, step, region };
}

/** Answer the question. The server times it; the result is shown when the question closes. */
export async function conquestAnswer(admin: SupabaseClient, uid: string, matchId: string, step: number, choice: number, now = Date.now()) {
  const L = await load(admin, matchId, uid);
  if (L.lobby && now < L.fillAt) throw new ConquestError("The match hasn't started", 409);
  const r = replay({ seed: L.match.seed, names: L.names, humanSeats: L.players.map((p) => p.seat), actions: L.actions, start: L.startAt, now });
  const live = r.live;
  if (live.phase !== "question" || live.step.index !== step) throw new ConquestError("Time's up for that question", 409);
  if (!live.participants.includes(L.me.seat)) throw new ConquestError("You're watching this duel", 403);
  const q = r.questions[step];
  if (choice < 0 || choice >= q.options.length) throw new ConquestError("Invalid answer");
  await record(admin, matchId, uid, step, "answer", choice, now - (live.stepStart + PICK_MS));
  return { ok: true as const, step, choice };
}

/** Final placing for XP — only once the match is over. */
export async function conquestResult(admin: SupabaseClient, uid: string, matchId: string, now = Date.now()) {
  const L = await load(admin, matchId, uid);
  const r = replay({ seed: L.match.seed, names: L.names, humanSeats: L.players.map((p) => p.seat), actions: L.actions, start: L.startAt, now });
  if (r.live.phase !== "done") return { finished: false as const };
  const ranked = rankPlayers(Array.from({ length: SEATS }, (_, s) => ({ seat: s, score: scoreOf(r.board, s), correct: r.board.correct[s] })));
  const rank = ranked.findIndex((p) => p.seat === L.me.seat) + 1;
  return { finished: true as const, rank, correct: r.board.correct[L.me.seat], score: scoreOf(r.board, L.me.seat) };
}
