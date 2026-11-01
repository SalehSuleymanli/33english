"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import type { FrameId } from "@/content/types";
import { FRAMES, frameById } from "@/content/frames";
import { build, DEFAULT_OPTIONS, isPureModal, type Aspect, type Modal, type Options, type Seed, type Time, type Token } from "@/engine/build";
import { seedById, seedLabel, seedsForFrame } from "@/engine/seeds";
import { checkText } from "@/engine/check";
import { randomChallenge, type Challenge as Task } from "@/engine/challenges";
import { useLearner } from "@/lib/learner/store";
import { bumpLab, recordAnswer } from "@/lib/learner/state";
import { Specimen } from "@/components/ui/Specimen";
import { SpeakButton } from "@/components/ui/Speak";
import { button } from "@/components/ui/styles";

const ROLE_LABEL: Record<string, string> = {
  subject: "subject",
  there: "there",
  be: "be",
  aux: "helper",
  modal: "modal",
  verb: "main verb",
  negation: "not",
  object: "object",
  complement: "complement",
  place: "place / time",
  time: "time",
  other: "doer",
};

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
  disabled,
}: {
  label: string;
  value: T;
  options: { v: T; label: string; disabled?: boolean }[];
  onChange: (v: T) => void;
  disabled?: boolean;
}) {
  return (
    <fieldset className={`flex flex-col gap-1.5 ${disabled ? "opacity-45" : ""}`} disabled={disabled}>
      <legend className="mb-1.5 text-sm font-bold text-muted">{label}</legend>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o.v}
            type="button"
            aria-pressed={value === o.v}
            disabled={o.disabled}
            onClick={() => onChange(o.v)}
            className={`h-9 rounded-full border px-3 text-sm font-bold transition-colors disabled:opacity-40 ${value === o.v ? "border-f bg-f-tint text-f" : "border-line-strong bg-surface hover:border-ink"}`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function LabView() {
  const params = useSearchParams();
  const { dispatch, state } = useLearner();
  const initialSeed = seedById(params.get("seed") ?? "") ?? seedById("ac-work")!;
  const [frame, setFrame] = useState<FrameId>(initialSeed.frame === "actions" ? "actions" : initialSeed.frame);
  const [seed, setSeed] = useState<Seed>(initialSeed);
  const [o, setO] = useState<Options>({ ...DEFAULT_OPTIONS });
  const [mode, setMode] = useState<"explore" | "challenge">("explore");
  const lastCounted = useRef("");

  const seeds = useMemo(() => seedsForFrame(frame), [frame]);
  const pickFrame = (f: FrameId) => {
    setFrame(f);
    const first = seedsForFrame(f)[0];
    setSeed(first);
    setO({ ...DEFAULT_OPTIONS, modal: f === "modals" ? "can" : "none", voice: f === "passive" ? "passive" : "active" });
  };

  const result = build(seed, o);
  const set = (p: Partial<Options>) => setO((x) => ({ ...x, ...p }));

  // count distinct sentences built (for the achievement), not every render
  useEffect(() => {
    if (!result.ok || mode !== "explore") return;
    const k = result.sentence;
    if (k === lastCounted.current) return;
    lastCounted.current = k;
    const t = setTimeout(() => dispatch(bumpLab), 400);
    return () => clearTimeout(t);
  }, [result, mode, dispatch]);

  const pureModal = isPureModal(o.modal);
  const passiveAllowed = seed.frame === "actions" && !!seed.passive;
  const fc = frameById(frame).className;

  return (
    <div className={fc}>
      <h1 className="text-[2rem] font-bold tracking-[-0.02em]">Sentence Lab</h1>
      <p className="mt-1 max-w-2xl text-ink-2">Choose a frame and a sentence, then change it. Every result is built by rules and checked — and when a change isn&apos;t natural English, the Lab tells you why.</p>

      <div role="tablist" aria-label="Mode" className="mt-6 inline-flex rounded-full border border-line-strong bg-surface p-1">
        {(["explore", "challenge"] as const).map((m) => (
          <button key={m} role="tab" aria-selected={mode === m} onClick={() => setMode(m)} className={`h-9 rounded-full px-4 text-sm font-bold ${mode === m ? "bg-ink text-paper" : "text-muted hover:text-ink"}`}>
            {m === "explore" ? "Explore" : "Challenge"}
          </button>
        ))}
      </div>

      {/* frame tabs */}
      <div className="mt-6 -mx-4 overflow-x-auto px-4 pb-1">
        <div role="tablist" aria-label="Frame" className="flex min-w-max gap-2">
          {FRAMES.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={frame === f.id}
              onClick={() => pickFrame(f.id)}
              className={`${f.className} flex h-12 items-center gap-2 rounded-2xl border px-4 text-left ${frame === f.id ? "border-f bg-f-tint" : "border-line bg-surface hover:border-line-strong"}`}
            >
              <span className="text-f text-sm font-bold">{f.number}</span>
              <span className={`text-sm font-bold ${frame === f.id ? "text-f" : ""}`}>{f.name}</span>
            </button>
          ))}
        </div>
      </div>

      {mode === "challenge" ? (
        <Challenge frame={frame} onAnswer={(correct, answer, id) => dispatch((s) => recordAnswer(s, { exerciseId: id, day: 0, correct, answer, source: "lab", frame, skill: "tense" }))} rate={state.profile.speechRate} />
      ) : (
        <>
          {/* sentence picker */}
          <div className="mt-6">
            <label htmlFor="seed" className="text-sm font-bold text-muted">
              Sentence
            </label>
            <select
              id="seed"
              value={seed.id}
              onChange={(e) => setSeed(seedById(e.target.value)!)}
              className="mt-1.5 h-12 w-full rounded-xl border border-line-strong bg-surface px-3 text-base sm:max-w-md"
            >
              {seeds.map((s) => (
                <option key={s.id} value={s.id}>
                  {seedLabel(s)}
                </option>
              ))}
            </select>
          </div>

          {/* result */}
          <section aria-live="polite" className="mt-6 rounded-[1.5rem] border border-line bg-surface p-5 shadow-lift sm:p-7">
            {result.ok ? (
              <>
                <div className="flex items-start gap-2">
                  <Specimen tokens={result.tokens} question={o.mood === "question"} className="flex-1 text-[1.9rem] sm:text-[2.4rem]" />
                  <SpeakButton text={result.sentence} rate={state.profile.speechRate} />
                </div>
                <SlotBreakdown tokens={result.tokens} />
                <div className="mt-5 border-t border-line pt-4">
                  <p className="text-sm font-bold text-muted">Why it looks like this</p>
                  <ul className="mt-2 flex list-disc flex-col gap-1.5 pl-5 text-ink-2">
                    {result.notes.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                  {result.timeHint && o.voice === "active" && (
                    <p className="mt-3 text-sm text-muted">
                      Often used with: <span className="text-ink-2">{result.timeHint}</span>
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div>
                <p className="text-lg font-bold">Not used in natural English</p>
                <p className="mt-2 text-ink-2">{result.reason}</p>
              </div>
            )}
          </section>

          {/* controls */}
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Segmented label="Form" value={o.polarity} onChange={(v) => set({ polarity: v })} options={[{ v: "positive", label: "Positive" }, { v: "negative", label: "Negative" }]} />
            <Segmented label="Type" value={o.mood} onChange={(v) => set({ mood: v })} options={[{ v: "statement", label: "Statement" }, { v: "question", label: "Question" }]} />
            <Segmented<Time>
              label={pureModal ? "Time (modals don't change for time)" : "Time"}
              value={o.time}
              disabled={pureModal}
              onChange={(v) => set({ time: v })}
              options={[{ v: "past", label: "Past" }, { v: "present", label: "Present" }, { v: "future", label: "Future" }]}
            />
            <Segmented<Aspect>
              label="Aspect"
              value={o.aspect}
              onChange={(v) => set({ aspect: v })}
              options={[
                { v: "simple", label: "Simple" },
                { v: "continuous", label: "In progress" },
                { v: "perfect", label: "Perfect" },
                { v: "perfectContinuous", label: "Perfect + in progress" },
              ]}
            />
            <Segmented<Modal>
              label="Modal"
              value={o.modal}
              onChange={(v) => set({ modal: v })}
              options={[
                { v: "none", label: "None" },
                { v: "can", label: "can" },
                { v: "could", label: "could" },
                { v: "should", label: "should" },
                { v: "must", label: "must" },
                { v: "might", label: "might" },
                { v: "haveTo", label: "have to" },
                { v: "beAbleTo", label: "be able to" },
              ]}
            />
            <div className="flex flex-col gap-5">
              {seed.frame === "actions" && (
                <Segmented
                  label="Voice"
                  value={o.voice}
                  onChange={(v) => set({ voice: v })}
                  options={[
                    { v: "active", label: "Active" },
                    { v: "passive", label: "Passive", disabled: !passiveAllowed },
                  ]}
                />
              )}
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={o.contract} onChange={(e) => set({ contract: e.target.checked })} className="size-5 accent-[var(--ink)]" />
                <span className="font-bold">Use contractions</span>
                <span className="text-sm text-muted">(don&apos;t, I&apos;m, she&apos;s)</span>
              </label>
              <button type="button" onClick={() => setO({ ...DEFAULT_OPTIONS, modal: frame === "modals" ? "can" : "none", voice: frame === "passive" ? "passive" : "active" })} className={`${button("ghost", "sm")} self-start`}>
                Reset
              </button>
            </div>
          </div>
          {seed.frame === "actions" && !passiveAllowed && seed.noPassiveReason && <p className="mt-4 text-sm text-muted">Passive isn&apos;t offered here: {seed.noPassiveReason}</p>}
        </>
      )}
    </div>
  );
}

function SlotBreakdown({ tokens }: { tokens: Token[] }) {
  return (
    <ol className="mt-4 flex flex-wrap gap-x-1.5 gap-y-2" aria-label="Sentence parts">
      {tokens.map((t, i) => {
        const key = ["there", "be", "aux", "modal", "verb", "negation"].includes(t.role);
        return (
          <li key={i} className="flex flex-col">
            <span className={`rounded-lg px-2 py-1 text-sm ${key ? "bg-f-tint text-f font-bold" : "bg-surface-2"}`}>{t.text}</span>
            <span className={`px-1 text-[0.7rem] ${key ? "text-f" : "text-muted"}`}>{ROLE_LABEL[t.role] ?? t.role}</span>
          </li>
        );
      })}
    </ol>
  );
}

/* ---------------- challenge mode ---------------- */

function Challenge({ frame, onAnswer, rate }: { frame: FrameId; onAnswer: (correct: boolean, answer: string, id: string) => void; rate: number }) {
  const [task, setTask] = useState<Task | null>(null);
  const [value, setValue] = useState("");
  const [res, setRes] = useState<ReturnType<typeof checkText> | null>(null);
  const [score, setScore] = useState({ right: 0, total: 0 });

  useEffect(() => {
    // generate on the client only (random), after mount
    // eslint-disable-next-line react-hooks/set-state-in-effect -- random task must not render on the server
    setTask(randomChallenge(frame));
    setRes(null);
    setValue("");
  }, [frame]);

  if (!task) return <div className="mt-6 h-40 animate-pulse rounded-2xl bg-surface-2" />;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (res || !value.trim()) return;
    const r = checkText(value, { accept: task.accept });
    setRes(r);
    const ok = r.status === "correct" || r.status === "alternative";
    setScore((s) => ({ right: s.right + (ok ? 1 : 0), total: s.total + 1 }));
    onAnswer(ok, value, task.id);
  };
  const next = () => {
    setTask(randomChallenge(frame, task.id));
    setValue("");
    setRes(null);
  };

  return (
    <section className="mt-6 rounded-[1.5rem] border border-line bg-surface p-5 sm:p-7">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-muted">Transform the sentence</p>
        <p className="text-sm text-muted tabular-nums">
          {score.right}/{score.total} correct
        </p>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <p className="specimen flex-1 text-2xl">{task.source}</p>
        <SpeakButton text={task.source} rate={rate} />
      </div>
      <p className="text-f mt-2 text-lg font-bold">{task.instruction}</p>
      <form onSubmit={submit} className="mt-4 flex flex-col gap-3">
        <input
          aria-label="Your sentence"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!!res}
          autoComplete="off"
          spellCheck={false}
          className="h-13 rounded-2xl border-2 border-line-strong bg-paper px-4 text-lg outline-none focus:border-focus"
          placeholder="Type the new sentence"
        />
        {!res && (
          <button type="submit" disabled={!value.trim()} className={`${button("primary")} self-start`}>
            Check
          </button>
        )}
      </form>
      {res && (
        <div role="status" className={`anim-rise mt-4 rounded-2xl border-2 p-4 ${res.status === "correct" || res.status === "alternative" ? "border-good bg-good/8" : res.status === "close" ? "border-warn bg-warn/8" : "border-bad bg-bad/8"}`}>
          <p className="font-bold">{res.status === "correct" ? "Correct" : res.status === "close" ? "Almost" : res.status === "alternative" ? "Also correct" : "Not quite"}</p>
          {res.status !== "correct" && (
            <p className="mt-1">
              Answer: <span className="specimen text-lg">{task.target}</span>
            </p>
          )}
          {res.diff && res.status !== "correct" && (
            <p className="specimen mt-1">
              {res.diff.map((d, i) => (
                <span key={i} className={d.kind === "missing" ? "text-good font-semibold" : d.kind === "extra" ? "text-bad line-through" : ""}>
                  {d.text}{" "}
                </span>
              ))}
            </p>
          )}
          <button type="button" onClick={next} className={`${button("primary")} mt-4`} autoFocus>
            Next sentence
          </button>
        </div>
      )}
    </section>
  );
}
