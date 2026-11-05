import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  COUNTDOWN_MS,
  LOBBY_MS,
  MATCH_MS,
  QUESTIONS,
  arenaBots,
  arenaQuestions,
  botAnswer,
  closedCount,
  effectiveStart,
  phaseAt,
  pointsFor,
  rankPlayers,
  safeAvatar,
  type ArenaPlayerView,
  type ArenaState,
} from "@/lib/game/arena";
import { hashString } from "@/lib/game/rng";

export class ArenaError extends Error {
  constructor(message: string, public status = 400) {
    super(message);
  }
}

type MatchRow = { id: string; seed: number; fill_at: string; start_at: string | null };
type PlayerRow = { user_id: string; seat: number; name: string; avatar: string };
type AnswerRow = { user_id: string; q: number; choice: number; correct: boolean; ms: number; points: number };

async function loadMatch(admin: SupabaseClient, matchId: string) {
  const [m, p, a] = await Promise.all([
    admin.from("arena_matches").select("id, seed, fill_at, start_at").eq("id", matchId).maybeSingle(),
    admin.from("arena_players").select("user_id, seat, name, avatar").eq("match_id", matchId),
    admin.from("arena_answers").select("user_id, q, choice, correct, ms, points").eq("match_id", matchId),
  ]);
  if (m.error || p.error || a.error) throw new Error((m.error ?? p.error ?? a.error)!.message);
  if (!m.data) throw new ArenaError("Match not found", 404);
  const match = m.data as MatchRow;
  const fillAt = Date.parse(match.fill_at);
  const startAt = match.start_at ? Date.parse(match.start_at) : null;
  return { match, fillAt, startAt, players: (p.data ?? []) as PlayerRow[], answers: (a.data ?? []) as AnswerRow[] };
}

function guestName(uid: string) {
  return `Player ${100 + (hashString(uid) % 900)}`;
}

export async function arenaJoin(admin: SupabaseClient, uid: string): Promise<string> {
  const { data: profile } = await admin.from("profiles").select("display_name, avatar").eq("id", uid).maybeSingle();
  const name = (profile?.display_name as string | null)?.trim().split(/\s+/)[0]?.slice(0, 24) || guestName(uid);
  const { data, error } = await admin.rpc("arena_join", {
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

export async function arenaLeave(admin: SupabaseClient, uid: string, matchId: string): Promise<boolean> {
  const { data, error } = await admin.rpc("arena_leave", { p_user: uid, p_match: matchId });
  if (error) throw new Error(error.message);
  return !!data;
}

/** Scores for every seat, counting only questions that have closed. */
function standings(seed: number, players: PlayerRow[], answers: AnswerRow[], closed: number, uid: string, filled: boolean): ArenaPlayerView[] {
  const questions = arenaQuestions(seed);
  const humans: ArenaPlayerView[] = players.map((p) => {
    const mine = answers.filter((a) => a.user_id === p.user_id && a.q < closed);
    const last = closed > 0 ? (mine.find((a) => a.q === closed - 1)?.correct ?? false) : null;
    return {
      seat: p.seat,
      name: p.name,
      avatar: safeAvatar(p.avatar),
      bot: false,
      me: p.user_id === uid,
      score: mine.reduce((n, a) => n + a.points, 0),
      correct: mine.filter((a) => a.correct).length,
      last,
    };
  });
  if (!filled) return humans.sort((a, b) => a.seat - b.seat);
  const bots: ArenaPlayerView[] = arenaBots(
    seed,
    players.map((p) => p.seat),
  ).map((b) => {
    const results = Array.from({ length: closed }, (_, q) => botAnswer(seed, b, q, questions[q]));
    return {
      seat: b.seat,
      name: b.name,
      avatar: b.avatar,
      bot: true,
      me: false,
      score: results.reduce((n, r) => n + r.points, 0),
      correct: results.filter((r) => r.correct).length,
      last: closed > 0 ? results[closed - 1].correct : null,
    };
  });
  return [...humans, ...bots].sort((a, b) => a.seat - b.seat);
}

export async function arenaState(admin: SupabaseClient, uid: string, matchId: string, now = Date.now()): Promise<ArenaState> {
  const { match, fillAt, startAt, players, answers } = await loadMatch(admin, matchId);
  if (!players.some((p) => p.user_id === uid)) throw new ArenaError("You're not in this match", 403);
  const phase = phaseAt(now, fillAt, startAt);
  const questions = arenaQuestions(match.seed);
  const closed = closedCount(phase);
  const filled = phase.phase !== "lobby";
  const view = standings(match.seed, players, answers, closed, uid, filled);
  const mineAll = answers.filter((a) => a.user_id === uid);

  let question: ArenaState["question"] = null;
  let reveal: ArenaState["reveal"] = null;
  let myChoice: number | null = null;
  if (phase.phase === "question" || phase.phase === "reveal") {
    const q = questions[phase.q];
    question = { index: phase.q, kind: q.kind, prompt: q.prompt, options: q.options };
    myChoice = mineAll.find((a) => a.q === phase.q)?.choice ?? null;
    if (phase.phase === "reveal") {
      const picks: Record<number, number> = {};
      for (const p of players) {
        const a = answers.find((x) => x.user_id === p.user_id && x.q === phase.q);
        if (a) picks[p.seat] = a.choice;
      }
      for (const b of arenaBots(
        match.seed,
        players.map((p) => p.seat),
      ))
        picks[b.seat] = botAnswer(match.seed, b, phase.q, q).choice;
      reveal = { answer: q.answer, tip: q.tip, picks };
    }
  }
  const review =
    phase.phase === "done"
      ? questions.map((q, i) => ({ kind: q.kind, prompt: q.prompt, options: q.options, answer: q.answer, mine: mineAll.find((a) => a.q === i)?.choice ?? null, tip: q.tip }))
      : null;

  return { ok: true, matchId, serverNow: now, fillAt, startAt: effectiveStart(fillAt, startAt), phase, question, reveal, myChoice, players: view, review };
}

/** Record an answer. The server decides the time and the points; the result stays hidden until the question closes. */
export async function arenaAnswer(admin: SupabaseClient, uid: string, matchId: string, q: number, choice: number, now = Date.now()) {
  const { match, fillAt, startAt, players } = await loadMatch(admin, matchId);
  if (!players.some((p) => p.user_id === uid)) throw new ArenaError("You're not in this match", 403);
  const phase = phaseAt(now, fillAt, startAt);
  if (phase.phase !== "question" || phase.q !== q) throw new ArenaError("Time's up for that question", 409);
  const question = arenaQuestions(match.seed)[q];
  if (choice < 0 || choice >= question.options.length) throw new ArenaError("Invalid answer");
  const ms = now - phase.startedAt;
  const correct = choice === question.answer;
  const { error } = await admin.from("arena_answers").insert({ match_id: matchId, user_id: uid, q, choice, correct, ms, points: pointsFor(correct, ms) });
  if (error && error.code !== "23505") throw new Error(error.message); // 23505 = already answered
  return { ok: true as const, locked: true, choice };
}

/** Final placing for XP. Only available once the match is over. */
export async function arenaResult(admin: SupabaseClient, uid: string, matchId: string, now = Date.now()) {
  const { match, fillAt, startAt, players, answers } = await loadMatch(admin, matchId);
  if (!players.some((p) => p.user_id === uid)) throw new ArenaError("You're not in this match", 403);
  if (phaseAt(now, fillAt, startAt).phase !== "done") return { finished: false as const };
  const ranked = rankPlayers(standings(match.seed, players, answers, QUESTIONS, uid, true));
  const rank = ranked.findIndex((p) => p.me) + 1;
  const me = ranked[rank - 1];
  return { finished: true as const, rank, correct: me.correct, score: me.score, players: ranked.length };
}
