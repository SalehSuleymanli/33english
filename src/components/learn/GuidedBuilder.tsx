"use client";
import { useState } from "react";
import type { GuidedBuild, SlotRole } from "@/content/types";
import { SpeakButton } from "@/components/ui/Speak";
import { Rich } from "@/components/ui/Rich";

const KEY: SlotRole[] = ["there", "be", "aux", "modal", "verb", "negation", "question"];

/** Step-by-step sentence assembly: pick the right piece for each slot, with a reason for every choice. */
export function GuidedBuilder({ build, rate }: { build: GuidedBuild; rate?: number }) {
  const [step, setStep] = useState(0);
  const [wrong, setWrong] = useState<{ step: number; option: number } | null>(null);
  const [lastWhy, setLastWhy] = useState<string | null>(null);
  const done = step >= build.steps.length;
  const current = build.steps[step];

  const pick = (k: number) => {
    if (done) return;
    if (k === current.answer) {
      setLastWhy(current.why);
      setWrong(null);
      setStep((s) => s + 1);
    } else {
      setWrong({ step, option: k });
      setLastWhy(null);
    }
  };

  return (
    <div className="mt-3 flex flex-col gap-5">
      <p className="text-ink-2">{build.goal}</p>
      <div className="flex min-h-16 flex-wrap items-center gap-2 rounded-2xl border-2 border-dashed border-line-strong bg-surface p-3" aria-live="polite" aria-label="Your sentence so far">
        {build.steps.slice(0, step).map((s, k) => (
          <span key={k} className={`specimen anim-pop rounded-xl px-3 py-1.5 text-xl ${KEY.includes(s.role) ? "bg-f-tint text-f font-semibold" : s.role === "subject" ? "border-2 border-ink" : "bg-surface-2"}`}>
            {s.options[s.answer]}
          </span>
        ))}
        {!done && <span className="h-10 w-16 rounded-xl border-2 border-f border-dashed" aria-hidden />}
      </div>

      {!done ? (
        <div>
          <p className="font-bold">
            Step {step + 1} of {build.steps.length}: {current.label}
          </p>
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label={current.label}>
            {current.options.map((o, k) => (
              <button
                key={k}
                type="button"
                onClick={() => pick(k)}
                className={`specimen h-12 rounded-xl border-2 px-4 text-lg ${wrong?.step === step && wrong.option === k ? "border-bad bg-bad/10" : "border-line-strong bg-surface hover:border-ink"}`}
              >
                {o}
              </button>
            ))}
          </div>
          {wrong?.step === step && (
            <p role="alert" className="mt-3 text-bad">
              Not this one — look at the goal sentence and try again.
            </p>
          )}
          {lastWhy && (
            <p className="mt-3 text-good">
              ✓ <Rich text={lastWhy} />
            </p>
          )}
        </div>
      ) : (
        <div className="anim-rise rounded-2xl bg-f-wash p-5">
          <p className="text-sm font-bold text-good">
            ✓ <Rich text={lastWhy ?? ""} />
          </p>
          <div className="mt-3 flex items-center gap-2">
            <p className="specimen flex-1 text-2xl">{build.result}</p>
            <SpeakButton text={build.result} rate={rate} />
          </div>
          <p className="mt-2 text-ink-2">You built it. Say it aloud once before you continue.</p>
        </div>
      )}
    </div>
  );
}
