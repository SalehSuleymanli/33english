"use client";
import { useState } from "react";
import { build, DEFAULT_OPTIONS, type Options } from "@/engine/build";
import { seedById } from "@/engine/seeds";
import { Specimen } from "@/components/ui/Specimen";

const MOVES: { label: string; o: Partial<Options> }[] = [
  { label: "Statement", o: {} },
  { label: "Negative", o: { polarity: "negative", contract: true } },
  { label: "Question", o: { mood: "question" } },
  { label: "Past", o: { time: "past" } },
  { label: "Future", o: { time: "future" } },
  { label: "In progress", o: { aspect: "continuous", contract: true } },
  { label: "Perfect", o: { aspect: "perfect", contract: true } },
  { label: "Can", o: { modal: "can" } },
  { label: "Have to", o: { modal: "haveTo" } },
];

/** The landing page's centrepiece: a real sentence, transformed live by the engine. */
export function HeroTransformer() {
  const [i, setI] = useState(0);
  const seed = seedById("ac-work")!;
  const r = build(seed, { ...DEFAULT_OPTIONS, ...MOVES[i].o });
  return (
    <div className="frame-actions rounded-[1.5rem] border border-line bg-surface p-5 shadow-lift sm:p-7">
      <p className="text-sm font-bold text-muted">Try it — tap to change the sentence</p>
      <div className="mt-5 min-h-[7.5rem] sm:min-h-[8.5rem]" aria-live="polite">
        {r.ok && (
          <div key={i} className="anim-rise">
            <Specimen tokens={r.tokens} question={MOVES[i].o.mood === "question"} className="text-[2.1rem] sm:text-[2.75rem]" />
            <p className="mt-3 max-w-md text-sm text-muted">{r.notes[r.notes.length - 1]}</p>
          </div>
        )}
      </div>
      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Transformations">
        {MOVES.map((m, k) => (
          <button
            key={m.label}
            type="button"
            onClick={() => setI(k)}
            aria-pressed={i === k}
            className={`h-9 rounded-full border px-3.5 text-sm font-bold transition-colors ${
              i === k ? "border-f bg-f-tint text-f" : "border-line-strong text-ink-2 hover:border-ink"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  );
}
