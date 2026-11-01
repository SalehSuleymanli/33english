import { completedDays, streak, type LearnerState } from "./state";

export type Achievement = {
  id: string;
  title: string;
  description: string;
  progress: (s: LearnerState) => { value: number; target: number };
  /** Only shown when streaks are enabled. */
  streak?: boolean;
};

const correctCount = (s: LearnerState) => s.attempts.filter((a) => a.correct).length;
const reviewCount = (s: LearnerState) => s.attempts.filter((a) => a.source === "review").length;
const foundationDone = (s: LearnerState) => completedDays(s).filter((d) => d <= 11).length;

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first-sentence", title: "First sentence", description: "Answer your first exercise correctly.", progress: (s) => ({ value: Math.min(1, correctCount(s)), target: 1 }) },
  { id: "day-one", title: "Day one done", description: "Complete Day 1.", progress: (s) => ({ value: completedDays(s).includes(1) ? 1 : 0, target: 1 }) },
  { id: "first-week", title: "Free week complete", description: "Complete Days 1–7.", progress: (s) => ({ value: completedDays(s).filter((d) => d <= 7).length, target: 7 }) },
  { id: "six-frames", title: "All six frames", description: "Complete the Foundation stage (Days 1–11).", progress: (s) => ({ value: foundationDone(s), target: 11 }) },
  { id: "halfway", title: "Halfway", description: "Complete 17 days.", progress: (s) => ({ value: completedDays(s).length, target: 17 }) },
  { id: "graduate", title: "Graduate", description: "Complete all 33 days.", progress: (s) => ({ value: completedDays(s).length, target: 33 }) },
  { id: "hundred", title: "One hundred right", description: "Give 100 correct answers.", progress: (s) => ({ value: correctCount(s), target: 100 }) },
  { id: "builder", title: "Sentence builder", description: "Build 25 sentences in the Sentence Lab.", progress: (s) => ({ value: s.stats.labBuilds, target: 25 }) },
  { id: "reviewer", title: "Steady reviewer", description: "Answer 50 review questions.", progress: (s) => ({ value: reviewCount(s), target: 50 }) },
  { id: "collector", title: "Word collector", description: "Save 25 words or phrases.", progress: (s) => ({ value: Object.keys(s.vocab).length, target: 25 }) },
  { id: "perfect", title: "Clean sheet", description: "Score 100% on a lesson review.", progress: (s) => ({ value: Object.values(s.lessons).some((l) => (l.bestScore ?? 0) >= 100) ? 1 : 0, target: 1 }) },
  { id: "conversations", title: "Out in the world", description: "Finish 5 real-life scenarios.", progress: (s) => ({ value: s.stats.scenariosDone.length, target: 5 }) },
  { id: "week-of-practice", title: "Seven days of practice", description: "Practice on 7 different days — they don't need to be in a row.", progress: (s) => ({ value: Object.values(s.activity).filter((a) => a.items > 0).length, target: 7 }) },
  { id: "streak-7", title: "Seven in a row", description: "Practice 7 days in a row.", streak: true, progress: (s) => ({ value: streak(s).best, target: 7 }) },
];

export function evaluate(s: LearnerState) {
  return ACHIEVEMENTS.filter((a) => !a.streak || s.profile.streaksEnabled).map((a) => {
    const p = a.progress(s);
    return { ...a, ...p, unlocked: p.value >= p.target, unlockedAt: s.achievements[a.id] };
  });
}

/** Returns ids newly unlocked compared with what's recorded. */
export function newlyUnlocked(s: LearnerState): string[] {
  return evaluate(s)
    .filter((a) => a.unlocked && !s.achievements[a.id])
    .map((a) => a.id);
}
