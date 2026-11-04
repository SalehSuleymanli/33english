import "server-only";
/**
 * The only place XP is created. Every claim is re-checked here (lesson answers,
 * crossword grids, full battle replays) before public.grant_xp is called with
 * the service role. Learners can read their totals but never write them.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import { getLesson } from "@/content/lessons";
import { speakingById } from "@/content/speaking";
import { stageById } from "@/content/quest";
import { gradeReview } from "@/engine/grade";
import { checkCrossword, crosswordStars, crosswordXp, parsePuzzleId } from "@/lib/game/crossword";
import { heroUnlocked, isStageOpen, powerFromStars, questXp, replay, starsFor, type Action } from "@/lib/game/quest";
import {
  BADGES,
  CAPS,
  COURSE_STAGES,
  LEVEL_TEST_DAYS,
  STREAK_MILESTONES,
  XP,
  dailyChallenges,
  weekDates,
  weekKey,
  weeklyChallenges,
  type EventKind,
  type Facts,
} from "@/lib/game/rewards";
import { HEROES, type HeroId } from "@/content/quest";
import type { ChallengeState, ClaimResponse, Grant, RewardsSnapshot } from "./types";
import { LESSON_LIST } from "@/content/lessons/registry";
import { isFreeDay } from "@/content/curriculum";

/* ------------------------------------------------------------------ input */

const answers = z.record(z.string().max(80), z.string().max(500)).refine((o) => Object.keys(o).length <= 80);
const action = z.union([
  z.object({ t: z.literal("answer"), a: z.string().max(300) }),
  z.object({ t: z.literal("potion") }),
  z.object({ t: z.literal("shield") }),
  z.object({ t: z.literal("special") }),
]);

export const ClaimBody = z.discriminatedUnion("type", [
  z.object({ type: z.literal("lesson"), localDate: z.string(), day: z.number().int().min(1).max(33), answers }),
  z.object({
    type: z.literal("crossword"),
    localDate: z.string(),
    puzzleId: z.string().max(20),
    answers,
    hints: z.number().int().min(0).max(200),
    seconds: z.number().int().min(0).max(86_400),
  }),
  z.object({
    type: z.literal("quest"),
    localDate: z.string(),
    stageId: z.string().max(10),
    seed: z.number().int().min(1).max(2_147_483_647),
    hero: z.enum(HEROES.map((h) => h.id) as [HeroId, ...HeroId[]]),
    power: z.number().int().min(0).max(10),
    log: z.array(action).max(240),
  }),
  z.object({ type: z.literal("speaking"), localDate: z.string(), topicId: z.string().max(60) }),
  z.object({ type: z.literal("word"), localDate: z.string(), term: z.string().max(120) }),
]);
export type Claim = z.infer<typeof ClaimBody>;

/* ------------------------------------------------------------------ facts */

type RawFacts = {
  progress: { total_xp: number; level: number; current_streak: number; best_streak: number; last_active_date: string | null } | null;
  lesson_days: string[];
  perfect: number;
  stages: string[];
  crosswords: number;
  hard_crosswords: number;
  quest_wins: number;
  quest_cleared: string[];
  quest_stars: number;
  speaking: number;
  words: number;
  sweeps: number;
  today: Record<string, number>;
  today_xp: number;
  week: Record<string, number>;
  week_days: number;
  week_xp: number;
  claimed_today: string[];
  claimed_week: string[];
  badges: Record<string, string>;
  quest_records: Record<string, { stars: number; wins: number; plays: number }>;
  crossword_solved: string[];
  speaking_done: Record<string, number>;
  recent: RewardsSnapshot["recent"];
  last7: Record<string, number>;
};

async function loadFacts(admin: SupabaseClient, uid: string, date: string): Promise<RawFacts> {
  const week = weekDates(date);
  const { data, error } = await admin.rpc("reward_facts", { p_user: uid, p_local_date: date, p_week_start: week[0], p_week_key: weekKey(date) });
  if (error) throw new Error(`reward_facts: ${error.message}`);
  return data as RawFacts;
}

function toFacts(f: RawFacts): Facts {
  return {
    totalXp: f.progress?.total_xp ?? 0,
    level: f.progress?.level ?? 1,
    bestStreak: f.progress?.best_streak ?? 0,
    lessons: f.lesson_days.length,
    perfect: Number(f.perfect),
    stages: f.stages,
    crosswords: Number(f.crosswords),
    hardCrosswords: Number(f.hard_crosswords),
    questWins: Number(f.quest_wins),
    questCleared: f.quest_cleared,
    questStars: Number(f.quest_stars),
    speaking: Number(f.speaking),
    words: Number(f.words),
    sweeps: Number(f.sweeps),
  };
}

const countKinds = (m: Record<string, number>, kinds: EventKind[]) => kinds.reduce((n, k) => n + Number(m[k] ?? 0), 0);

export function snapshotFrom(f: RawFacts, date: string): RewardsSnapshot {
  const wk = weekKey(date);
  const daily: ChallengeState[] = dailyChallenges(date).map((c) => ({
    id: c.id,
    title: c.title,
    icon: c.icon,
    href: c.href,
    xp: c.xp,
    count: c.count,
    done: Math.min(c.count, countKinds(f.today, c.kinds)),
    claimed: f.claimed_today.includes(`${date}:${c.id}`),
  }));
  const weekly: ChallengeState[] = weeklyChallenges(date).map((c) => ({
    id: c.id,
    title: c.title,
    icon: c.icon,
    href: c.href,
    xp: c.xp,
    count: c.count,
    done: Math.min(c.count, c.distinctDays ? Number(f.week_days) : countKinds(f.week, c.kinds)),
    claimed: f.claimed_week.includes(`${wk}:${c.id}`),
  }));
  const p = f.progress;
  return {
    totalXp: p?.total_xp ?? 0,
    level: p?.level ?? 1,
    currentStreak: p ? effectiveStreak(p.current_streak, p.last_active_date, date) : 0,
    bestStreak: p?.best_streak ?? 0,
    lastActiveDate: p?.last_active_date ?? null,
    todayXp: Number(f.today_xp),
    weekXp: Number(f.week_xp),
    last7: f.last7,
    daily,
    weekly,
    badges: f.badges,
    facts: {
      lessons: f.lesson_days.length,
      lessonDays: f.lesson_days.map(Number).sort((a, b) => a - b),
      perfect: Number(f.perfect),
      stages: f.stages,
      crosswords: Number(f.crosswords),
      hardCrosswords: Number(f.hard_crosswords),
      questWins: Number(f.quest_wins),
      questCleared: f.quest_cleared,
      questStars: Number(f.quest_stars),
      speaking: Number(f.speaking),
      words: Number(f.words),
      sweeps: Number(f.sweeps),
    },
    questRecords: f.quest_records,
    crosswordSolved: f.crossword_solved,
    speakingDone: f.speaking_done,
    recent: f.recent,
  };
}

/** A streak only "counts" if the learner was active today or yesterday. */
export function effectiveStreak(current: number, last: string | null, today: string): number {
  if (!last) return 0;
  const d = (Date.parse(`${today}T00:00:00Z`) - Date.parse(`${last}T00:00:00Z`)) / 86_400_000;
  return d <= 1 ? current : 0;
}

/* ------------------------------------------------------------------ grants */

type GrantResult = { granted: boolean; xp: number; total_xp: number; level: number; current_streak: number };

class Granter {
  grants: Grant[] = [];
  last: GrantResult | null = null;
  constructor(private admin: SupabaseClient, private uid: string, private date: string) {}
  async give(kind: EventKind, ref: string, xp: number, label: string, opts: { cap?: number; group?: string; meta?: Record<string, unknown> } = {}) {
    const { data, error } = await this.admin.rpc("grant_xp", {
      p_user: this.uid,
      p_kind: kind,
      p_ref: ref,
      p_xp: xp,
      p_local_date: this.date,
      p_meta: opts.meta ?? {},
      p_daily_cap: opts.cap ?? null,
      p_cap_group: opts.group ?? null,
    });
    if (error) throw new Error(`grant_xp: ${error.message}`);
    const r = data as GrantResult;
    this.last = r;
    if (r.granted) this.grants.push({ kind, ref, xp: r.xp, label });
    return r;
  }
}

async function autoRewards(g: Granter, admin: SupabaseClient, uid: string, date: string): Promise<RawFacts> {
  let f = await loadFacts(admin, uid, date);
  const done = new Set(f.lesson_days.map(Number));
  for (const s of COURSE_STAGES) {
    if (s.days.every((d) => done.has(d)) && !f.stages.includes(s.id)) await g.give("stage_complete", s.id, XP.stage, `${s.name} stage complete`);
  }
  const daily = dailyChallenges(date);
  let claimed = new Set(f.claimed_today);
  for (const c of daily) {
    const key = `${date}:${c.id}`;
    if (!claimed.has(key) && countKinds(f.today, c.kinds) >= c.count) {
      await g.give("daily", key, c.xp, `Daily challenge: ${c.title}`);
      claimed = new Set([...claimed, key]);
    }
  }
  if (daily.every((c) => claimed.has(`${date}:${c.id}`))) await g.give("daily_sweep", date, XP.dailySweep, "All daily challenges done");
  const wk = weekKey(date);
  for (const c of weeklyChallenges(date)) {
    const key = `${wk}:${c.id}`;
    const n = c.distinctDays ? Number(f.week_days) : countKinds(f.week, c.kinds);
    if (!f.claimed_week.includes(key) && n >= c.count) await g.give("weekly", key, c.xp, `Weekly challenge: ${c.title}`);
  }
  const streakNow = g.last?.current_streak ?? f.progress?.current_streak ?? 0;
  if (STREAK_MILESTONES[streakNow]) await g.give("streak", `${streakNow}@${date}`, STREAK_MILESTONES[streakNow], `${streakNow}-day streak!`);
  if (g.grants.length) f = await loadFacts(admin, uid, date);
  return f;
}

async function awardBadges(admin: SupabaseClient, uid: string, f: RawFacts): Promise<string[]> {
  const facts = toFacts(f);
  const fresh = BADGES.filter((b) => b.test(facts) && !f.badges[b.id]).map((b) => b.id);
  if (fresh.length) {
    const { error } = await admin.from("user_badges").upsert(
      fresh.map((badge_id) => ({ user_id: uid, badge_id })),
      { ignoreDuplicates: true },
    );
    if (error) throw new Error(`badges: ${error.message}`);
    const now = new Date().toISOString();
    for (const id of fresh) f.badges[id] = now;
  }
  return fresh;
}

/* ------------------------------------------------------------------ claims */

export class ClaimError extends Error {
  constructor(message: string, public status = 400) {
    super(message);
  }
}

export async function processClaim(admin: SupabaseClient, uid: string, premium: boolean, claim: Claim, date: string): Promise<ClaimResponse> {
  const g = new Granter(admin, uid, date);
  const before = await loadFacts(admin, uid, date);
  const beforeLevel = before.progress?.level ?? 1;
  let verified = true;
  let message: string | undefined;
  const detail: Record<string, unknown> = {};

  switch (claim.type) {
    case "lesson": {
      const lesson = getLesson(claim.day);
      if (!lesson) throw new ClaimError("Unknown lesson");
      if (!isFreeDay(claim.day) && !premium) throw new ClaimError("This lesson needs Premium", 403);
      const graded = lesson.review.filter((e) => e.type !== "speak");
      const answered = graded.filter((e) => (claim.answers[e.id] ?? "").trim() !== "").length;
      if (answered < graded.length) throw new ClaimError("Answer every review question first");
      const { score } = gradeReview(lesson.review, claim.answers);
      detail.score = score;
      const first = await g.give("lesson_complete", String(claim.day), XP.lessonBase + (score >= 80 ? XP.lessonGood : 0), `Day ${claim.day} complete`, { meta: { score } });
      if (!first.granted)
        await g.give("lesson_replay", `${claim.day}@${date}`, XP.lessonReplay, `Day ${claim.day} practised again`, { cap: CAPS.lesson_replay, group: "lesson_replay" });
      if (score === 100) await g.give("lesson_perfect", String(claim.day), XP.lessonPerfect, `Perfect score on Day ${claim.day}`);
      if (LEVEL_TEST_DAYS.includes(claim.day) && score >= 70) await g.give("level_test", String(claim.day), XP.levelTest, `Level test passed (Day ${claim.day})`);
      break;
    }
    case "crossword": {
      const parsed = parsePuzzleId(claim.puzzleId);
      if (!parsed) throw new ClaimError("Unknown puzzle");
      const check = checkCrossword(claim.puzzleId, claim.answers);
      if (!check.ok) {
        verified = false;
        message = `${check.correct} of ${check.total} words are right — finish the grid to earn XP.`;
        break;
      }
      const xp = crosswordXp(parsed.difficulty, claim.hints, claim.seconds);
      const stars = crosswordStars(claim.hints, claim.seconds, parsed.difficulty);
      detail.stars = stars;
      const r = await g.give("crossword", claim.puzzleId, xp, `Crossword solved (${parsed.difficulty})`, { cap: CAPS.games, group: "games", meta: { hints: claim.hints, seconds: claim.seconds } });
      if (!r.granted) message = "You've solved this puzzle before — no extra XP this time.";
      else if (r.xp < xp) message = "You've reached today's game XP limit. Lessons and speaking still earn XP!";
      const { error } = await admin.rpc("record_game", { p_user: uid, p_game: "crossword", p_ref: claim.puzzleId, p_score: xp, p_stars: stars, p_won: true, p_time_ms: claim.seconds * 1000 });
      if (error) throw new Error(error.message);
      break;
    }
    case "quest": {
      const stage = stageById(claim.stageId);
      if (!stage) throw new ClaimError("Unknown stage");
      const facts = toFacts(before);
      const cleared = new Set(facts.questCleared);
      if (!isStageOpen(stage.id, cleared)) throw new ClaimError("Clear the previous stage first", 403);
      if (!heroUnlocked(claim.hero, { cleared, crosswordsSolved: facts.crosswords, bestStreak: facts.bestStreak, level: facts.level }))
        throw new ClaimError("That hero is still locked", 403);
      if (claim.power > powerFromStars(facts.questStars)) throw new ClaimError("Power level doesn't match your record", 403);
      const result = replay(stage.id, claim.seed, claim.hero, claim.power, claim.log as Action[]);
      const won = result.status === "won";
      const stars = starsFor(result);
      detail.status = result.status;
      detail.stars = stars;
      const { error } = await admin.rpc("record_game", { p_user: uid, p_game: "quest", p_ref: stage.id, p_score: result.correct * 10, p_stars: stars, p_won: won, p_time_ms: null });
      if (error) throw new Error(error.message);
      if (!won) {
        verified = result.status === "lost";
        message = verified ? undefined : "We couldn't confirm this battle.";
        break;
      }
      const first = !cleared.has(stage.id);
      if (first) await g.give("quest_clear", stage.id, questXp(stage, true), `${stage.boss ? "Boss defeated" : "Stage cleared"}: ${stage.title}`, { cap: CAPS.games, group: "games", meta: { stars } });
      else {
        const r = await g.give("quest_win", `${stage.id}:${claim.seed}`, questXp(stage, false), `Battle won: ${stage.title}`, { cap: CAPS.games, group: "games", meta: { stars } });
        if (r.granted && r.xp === 0) message = "You've reached today's game XP limit. Lessons and speaking still earn XP!";
      }
      break;
    }
    case "speaking": {
      const topic = speakingById(claim.topicId);
      if (!topic) throw new ClaimError("Unknown topic");
      const r = await g.give("speaking", topic.id, XP.speaking, `Speaking: ${topic.title}`);
      if (!r.granted) await g.give("speaking_repeat", `${topic.id}@${date}`, XP.speakingRepeat, `Speaking practice: ${topic.title}`, { cap: CAPS.speaking_repeat, group: "speaking_repeat" });
      const { error } = await admin.rpc("record_speaking", { p_user: uid, p_topic: topic.id });
      if (error) throw new Error(error.message);
      break;
    }
    case "word": {
      const term = claim.term.trim().toLowerCase();
      const source = LESSON_LIST.find((l) => l.vocabulary.some((v) => v.term.toLowerCase() === term));
      if (!source) throw new ClaimError("Unknown word");
      if (!isFreeDay(source.day) && !premium) throw new ClaimError("This lesson needs Premium", 403);
      await g.give("word_saved", term, XP.word, `New word: ${claim.term}`, { cap: CAPS.words, group: "words" });
      break;
    }
  }

  const after = await autoRewards(g, admin, uid, date);
  const newBadges = await awardBadges(admin, uid, after);
  const snapshot = snapshotFrom(after, date);
  const levelUp = snapshot.level > beforeLevel ? snapshot.level : null;
  return { ok: true, verified, message, granted: g.grants, newBadges, levelUp, snapshot, detail };
}

export async function loadSnapshot(admin: SupabaseClient, uid: string, date: string): Promise<RewardsSnapshot> {
  const f = await loadFacts(admin, uid, date);
  return snapshotFrom(f, date);
}
