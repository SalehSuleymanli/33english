"use client";
import { useLearner } from "@/lib/learner/store";

export function ScenarioDone({ id }: { id: string }) {
  const { state, hydrated } = useLearner();
  if (!hydrated || !state.stats.scenariosDone.includes(id)) return null;
  return <span className="rounded-full bg-good/15 px-2 py-0.5 text-xs font-bold text-good">Done</span>;
}
