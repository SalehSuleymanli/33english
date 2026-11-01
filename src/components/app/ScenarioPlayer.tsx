"use client";

import Link from "next/link";
import { useState } from "react";
import type { Scenario } from "@/content/scenarios";
import type { Exercise } from "@/content/types";
import { Dialogue } from "@/components/learn/Dialogue";
import { ExercisePlayer } from "@/components/learn/ExercisePlayer";
import { useLearner } from "@/lib/learner/store";
import { markScenario, recordAnswer } from "@/lib/learner/state";
import { frameClass } from "@/content/frames";
import { button } from "@/components/ui/styles";

export function ScenarioPlayer({ scenario }: { scenario: Scenario }) {
  const { dispatch, state } = useLearner();
  const exercises: Exercise[] = [
    ...scenario.questions.map(
      (q, k): Exercise => ({ id: `sc-${scenario.id}-q${k}`, type: "choice", prompt: q.q, options: q.options, answer: q.answer, explanation: q.why, skill: "listening" }),
    ),
    ...scenario.yourTurn.map((t, k): Exercise => ({ id: `sc-${scenario.id}-s${k}`, type: "speak", prompt: t.prompt, target: t.target, explanation: "Say it two or three times until it feels natural.", skill: "speaking" })),
  ];
  const [phase, setPhase] = useState<"dialogue" | "tasks" | "done">("dialogue");
  const [i, setI] = useState(0);

  return (
    <div className={`${frameClass(scenario.frames[0])} max-w-2xl`}>
      <Link href="/scenarios" className="text-sm font-bold text-muted hover:text-ink">
        ← Conversations
      </Link>
      <h1 className="mt-4 text-[2rem] font-bold leading-tight tracking-[-0.02em]">{scenario.title}</h1>
      {phase === "dialogue" && (
        <>
          <h2 className="sr-only">{scenario.dialogue.title}</h2>
          <Dialogue dialogue={scenario.dialogue} rate={state.profile.speechRate} />
          <button type="button" onClick={() => setPhase("tasks")} className={`${button("frame", "lg")} mt-8`}>
            Check your understanding
          </button>
        </>
      )}
      {phase === "tasks" && (
        <div className="mt-6">
          <p className="mb-4 text-sm text-muted">
            {i + 1} of {exercises.length}
          </p>
          <ExercisePlayer
            key={exercises[i].id}
            exercise={exercises[i]}
            speechRate={state.profile.speechRate}
            onAnswered={(o) => o.graded && dispatch((s) => recordAnswer(s, { exerciseId: exercises[i].id, day: scenario.afterDay, correct: o.correct, answer: o.answer, source: "scenario", skill: exercises[i].skill, skipReview: true }))}
            onDone={() => {
              if (i < exercises.length - 1) setI(i + 1);
              else {
                dispatch((s) => markScenario(s, scenario.id));
                setPhase("done");
              }
            }}
          />
        </div>
      )}
      {phase === "done" && (
        <div className="anim-rise mt-8">
          <p className="text-xl font-bold">Conversation complete.</p>
          <p className="mt-1 text-ink-2">Try the role-play again as the other speaker — it&apos;s the fastest way to make these lines yours.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={() => (setPhase("dialogue"), setI(0))} className={button("secondary")}>
              Role-play again
            </button>
            <Link href="/scenarios" className={button("primary")}>
              More conversations
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
