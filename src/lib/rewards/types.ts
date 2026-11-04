/** Shapes shared by the rewards API and the browser. */
import type { EventKind } from "@/lib/game/rewards";

export type ChallengeState = { id: string; title: string; icon: string; href: string; xp: number; count: number; done: number; claimed: boolean };

export type RewardsSnapshot = {
  totalXp: number;
  level: number;
  currentStreak: number;
  bestStreak: number;
  lastActiveDate: string | null;
  todayXp: number;
  weekXp: number;
  last7: Record<string, number>;
  daily: ChallengeState[];
  weekly: ChallengeState[];
  badges: Record<string, string>;
  facts: {
    lessons: number;
    lessonDays: number[];
    perfect: number;
    stages: string[];
    crosswords: number;
    hardCrosswords: number;
    questWins: number;
    questCleared: string[];
    questStars: number;
    speaking: number;
    words: number;
    sweeps: number;
  };
  questRecords: Record<string, { stars: number; wins: number; plays: number }>;
  crosswordSolved: string[];
  speakingDone: Record<string, number>;
  recent: { kind: EventKind; ref: string; xp: number; created_at: string }[];
};

export type Grant = { kind: EventKind; ref: string; xp: number; label: string };

export type ClaimResponse = {
  ok: boolean;
  verified: boolean;
  message?: string;
  granted: Grant[];
  newBadges: string[];
  levelUp: number | null;
  snapshot: RewardsSnapshot;
  detail?: Record<string, unknown>;
};
