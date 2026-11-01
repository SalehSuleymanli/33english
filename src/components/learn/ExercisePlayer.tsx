"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import type { Exercise } from "@/content/types";
import { checkOrder, checkText, transcriptMatch, type CheckResult } from "@/engine/check";
import { SpeakButton, speak, useTtsSupported } from "@/components/ui/Speak";
import { button } from "@/components/ui/styles";
import { Rich } from "@/components/ui/Rich";

export type ExerciseOutcome = { correct: boolean; answer: string; graded: boolean };

const TYPE_LABEL: Record<Exercise["type"], string> = {
  choice: "Choose the answer",
  fill: "Fill the gap",
  transform: "Transform the sentence",
  correct: "Correct the mistake",
  order: "Put the words in order",
  translate: "Translate",
  listen: "Listen and type",
  speak: "Say it aloud",
  reading: "Read and answer",
};

/**
 * Plays one exercise: collects the answer, checks it, explains the result.
 * Calls onDone once the learner continues past the feedback.
 */
export function ExercisePlayer({
  exercise,
  onAnswered,
  onDone,
  speechRate = 0.9,
  continueLabel = "Continue",
}: {
  exercise: Exercise;
  onAnswered?: (o: ExerciseOutcome) => void;
  onDone: (o: ExerciseOutcome) => void;
  speechRate?: number;
  continueLabel?: string;
}) {
  const [result, setResult] = useState<{ check: CheckResult | null; outcome: ExerciseOutcome; extra?: ReactNode } | null>(null);
  const contRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (result) contRef.current?.focus();
  }, [result]);

  const finish = (check: CheckResult | null, outcome: ExerciseOutcome, extra?: ReactNode) => {
    setResult({ check, outcome, extra });
    onAnswered?.(outcome);
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-sm font-bold text-muted">{TYPE_LABEL[exercise.type]}</p>
        <h2 className="mt-1 text-xl font-bold leading-snug">{exercise.prompt}</h2>
      </div>

      <Body exercise={exercise} locked={!!result} onResult={finish} speechRate={speechRate} />

      {result && (
        <Feedback exercise={exercise} check={result.check} outcome={result.outcome} extra={result.extra}>
          <button ref={contRef} type="button" onClick={() => onDone(result.outcome)} className={`${button("primary", "lg")} w-full sm:w-auto`}>
            {continueLabel}
          </button>
        </Feedback>
      )}
    </div>
  );
}

type BodyProps = {
  exercise: Exercise;
  locked: boolean;
  onResult: (c: CheckResult | null, o: ExerciseOutcome, extra?: ReactNode) => void;
  speechRate: number;
};

function Body(p: BodyProps) {
  switch (p.exercise.type) {
    case "choice":
      return <Choice {...p} ex={p.exercise} />;
    case "order":
      return <Order {...p} ex={p.exercise} />;
    case "speak":
      return <Speak {...p} ex={p.exercise} />;
    case "reading":
      return <Reading {...p} ex={p.exercise} />;
    default:
      return <TextInput {...p} />;
  }
}

/* ---------------- choice ---------------- */

function Choice({ ex, locked, onResult }: BodyProps & { ex: Extract<Exercise, { type: "choice" }> }) {
  const [picked, setPicked] = useState<number | null>(null);
  const choose = (i: number) => {
    if (locked) return;
    setPicked(i);
    const correct = i === ex.answer;
    onResult(
      { status: correct ? "correct" : "incorrect", model: ex.options[ex.answer], note: correct ? undefined : ex.optionFeedback?.[i] },
      { correct, answer: ex.options[i], graded: true },
    );
  };
  return (
    <div className="grid gap-2.5" role="group" aria-label="Options">
      {ex.options.map((o, i) => {
        const state = !locked ? "idle" : i === ex.answer ? "right" : i === picked ? "wrong" : "dim";
        return (
          <button
            key={i}
            type="button"
            disabled={locked}
            onClick={() => choose(i)}
            className={[
              "specimen min-h-14 rounded-2xl border-2 px-4 py-3 text-left text-lg transition-colors",
              state === "idle" && "border-line-strong bg-surface hover:border-ink",
              state === "right" && "border-good bg-good/10",
              state === "wrong" && "border-bad bg-bad/10",
              state === "dim" && "border-line bg-surface opacity-60",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <span className="mr-3 font-sans text-sm font-bold text-muted">{String.fromCharCode(65 + i)}</span>
            {o}
          </button>
        );
      })}
    </div>
  );
}

/* ---------------- typed answers ---------------- */

function TextInput({ exercise, locked, onResult, speechRate }: BodyProps) {
  const [value, setValue] = useState("");
  const tts = useTtsSupported();
  const ex = exercise as Extract<Exercise, { type: "fill" | "transform" | "correct" | "translate" | "listen" }>;

  useEffect(() => {
    if (ex.type === "listen") {
      const t = setTimeout(() => speak(ex.audioText, speechRate), 300);
      return () => clearTimeout(t);
    }
  }, [ex, speechRate]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (locked || !value.trim()) return;
    const answer = ex.type === "fill" ? ex.sentence.replace("___", value.trim()) : value.trim();
    const target = ex.type === "fill" ? { ...ex, accept: ex.accept.map((a) => ex.sentence.replace("___", a)), alternatives: ex.alternatives?.map((a) => ({ ...a, text: ex.sentence.replace("___", a.text) })), traps: ex.traps?.map((t) => ({ ...t, text: ex.sentence.replace("___", t.text) })) } : ex;
    const c = checkText(answer, target);
    const shownModel = ex.type === "fill" ? ex.accept[0] : c.model;
    onResult({ ...c, model: shownModel }, { correct: c.status === "correct" || c.status === "alternative", answer, graded: true });
  };

  const inputCls =
    "w-full rounded-2xl border-2 border-line-strong bg-surface px-4 text-lg outline-none focus:border-focus disabled:opacity-80";

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      {ex.type === "fill" && (
        <div className="specimen rounded-2xl bg-surface-2 p-4 text-xl leading-relaxed">
          {ex.sentence.split("___").map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <input
                  aria-label="Your answer"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  disabled={locked}
                  autoFocus
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  size={Math.max(6, value.length + 1)}
                  className="mx-1 inline-block rounded-lg border-b-2 border-ink bg-surface px-2 py-0.5 font-sans text-lg outline-none focus:border-focus"
                />
              )}
            </span>
          ))}
          {ex.hint && <p className="mt-2 font-sans text-sm text-muted">Hint: {ex.hint}</p>}
        </div>
      )}
      {ex.type === "transform" && (
        <div className="rounded-2xl bg-surface-2 p-4">
          <p className="specimen text-xl">{ex.source}</p>
          <p className="mt-1 font-bold text-ink-2">{ex.instruction}</p>
        </div>
      )}
      {ex.type === "correct" && (
        <div className="rounded-2xl bg-surface-2 p-4">
          <p className="specimen text-xl text-bad line-through decoration-bad/40">{ex.wrong}</p>
          <p className="mt-1 text-sm text-muted">Write the corrected sentence.</p>
        </div>
      )}
      {ex.type === "translate" && (
        <div className="rounded-2xl bg-surface-2 p-4">
          <p className="specimen text-xl" lang={ex.from}>
            {ex.source}
          </p>
        </div>
      )}
      {ex.type === "listen" && (
        <div className="flex items-center gap-3 rounded-2xl bg-surface-2 p-4">
          {tts ? (
            <>
              <button type="button" onClick={() => speak(ex.audioText, speechRate)} className={button("secondary")}>
                Play again
              </button>
              <button type="button" onClick={() => speak(ex.audioText, 0.65)} className={button("ghost")}>
                Slower
              </button>
            </>
          ) : (
            <p className="text-sm text-ink-2">Your browser can&apos;t play speech. Here is the sentence to read instead: <span className="specimen">{ex.audioText}</span></p>
          )}
        </div>
      )}
      {ex.type !== "fill" && (
        <textarea
          aria-label="Your answer"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) submit(e);
          }}
          disabled={locked}
          rows={2}
          autoFocus
          autoComplete="off"
          autoCapitalize="sentences"
          spellCheck={false}
          placeholder="Type your answer"
          className={`${inputCls} py-3`}
        />
      )}
      {!locked && (
        <button type="submit" disabled={!value.trim()} className={`${button("primary", "lg")} w-full sm:w-auto sm:self-start`}>
          Check
        </button>
      )}
    </form>
  );
}

/* ---------------- word order ---------------- */

function shuffleStable(arr: string[], seed: string) {
  // deterministic shuffle so server and client agree, and never returns the correct order for 3+ tiles
  const a = arr.map((t, i) => ({ t, i }));
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  for (let i = a.length - 1; i > 0; i--) {
    h = (h * 1103515245 + 12345) >>> 0;
    const j = h % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  if (a.length > 2 && a.every((x, k) => x.i === k)) a.push(a.shift()!);
  return a;
}

function Order({ ex, locked, onResult }: BodyProps & { ex: Extract<Exercise, { type: "order" }> }) {
  const bank = useMemo(() => shuffleStable(ex.tiles, ex.id), [ex]);
  const [picked, setPicked] = useState<number[]>([]); // indexes into bank
  const add = (k: number) => !locked && setPicked((p) => [...p, k]);
  const remove = (pos: number) => !locked && setPicked((p) => p.filter((_, i) => i !== pos));
  const check = () => {
    const words = picked.map((k) => bank[k].t);
    const c = checkOrder(ex.tiles, words, ex.alsoValid);
    onResult(c, { correct: c.status === "correct" || c.status === "alternative", answer: words.join(" "), graded: true });
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex min-h-16 flex-wrap items-center gap-2 rounded-2xl border-2 border-dashed border-line-strong bg-surface p-3" aria-label="Your sentence" aria-live="polite">
        {picked.length === 0 && <span className="px-1 text-muted">Tap the words below in order</span>}
        {picked.map((k, pos) => (
          <button key={pos} type="button" onClick={() => remove(pos)} disabled={locked} className="specimen anim-pop h-10 rounded-xl bg-ink px-3 text-lg text-paper" aria-label={`Remove ${bank[k].t}`}>
            {bank[k].t}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2" aria-label="Word bank">
        {bank.map((b, k) =>
          picked.includes(k) ? (
            <span key={k} className="h-10 rounded-xl border border-dashed border-line px-3 text-lg text-transparent" aria-hidden>
              {b.t}
            </span>
          ) : (
            <button key={k} type="button" onClick={() => add(k)} disabled={locked} className="specimen h-10 rounded-xl border border-line-strong bg-surface px-3 text-lg hover:border-ink">
              {b.t}
            </button>
          ),
        )}
      </div>
      {!locked && (
        <button type="button" onClick={check} disabled={picked.length !== bank.length} className={`${button("primary", "lg")} w-full sm:w-auto sm:self-start`}>
          Check
        </button>
      )}
    </div>
  );
}

/* ---------------- reading ---------------- */

function Reading({ ex, locked, onResult }: BodyProps & { ex: Extract<Exercise, { type: "reading" }> }) {
  const [answers, setAnswers] = useState<(number | null)[]>(ex.questions.map(() => null));
  const done = answers.every((a) => a !== null);
  const check = () => {
    const right = ex.questions.filter((q, i) => answers[i] === q.answer).length;
    const all = right === ex.questions.length;
    onResult(
      { status: all ? "correct" : "incorrect", model: `${right} of ${ex.questions.length} correct` },
      { correct: all, answer: answers.join(","), graded: true },
      <ul className="mt-3 flex flex-col gap-2 text-sm">
        {ex.questions.map((q, i) => (
          <li key={i}>
            <span className={answers[i] === q.answer ? "text-good font-bold" : "text-bad font-bold"}>{answers[i] === q.answer ? "✓" : "✗"}</span> {q.q} — <strong>{q.options[q.answer]}</strong>. {q.why}
          </li>
        ))}
      </ul>,
    );
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start gap-2 rounded-2xl bg-surface-2 p-4">
        <p className="specimen flex-1 text-lg leading-relaxed">{ex.passage}</p>
        <SpeakButton text={ex.passage} />
      </div>
      {ex.questions.map((q, i) => (
        <fieldset key={i} className="flex flex-col gap-2">
          <legend className="mb-2 font-bold">
            {i + 1}. {q.q}
          </legend>
          {q.options.map((o, k) => (
            <label key={k} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 ${answers[i] === k ? "border-ink bg-surface" : "border-line-strong bg-surface"}`}>
              <input type="radio" name={`${ex.id}-q${i}`} checked={answers[i] === k} disabled={locked} onChange={() => setAnswers((a) => a.map((v, j) => (j === i ? k : v)))} className="accent-[var(--ink)]" />
              {o}
            </label>
          ))}
        </fieldset>
      ))}
      {!locked && (
        <button type="button" onClick={check} disabled={!done} className={`${button("primary", "lg")} w-full sm:w-auto sm:self-start`}>
          Check answers
        </button>
      )}
    </div>
  );
}

/* ---------------- speaking ---------------- */

type Rec = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  onresult: ((e: { results: { 0: { transcript: string } }[] }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
};

function getRecognition(): Rec | null {
  if (typeof window === "undefined") return null;
  const W = window as unknown as { SpeechRecognition?: new () => Rec; webkitSpeechRecognition?: new () => Rec };
  const C = W.SpeechRecognition ?? W.webkitSpeechRecognition;
  return C ? new C() : null;
}

export function useSpeechRecognitionSupported() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- feature detection after mount
    setOk(Boolean(getRecognition()));
  }, []);
  return ok;
}

function Speak({ ex, locked, onResult, speechRate }: BodyProps & { ex: Extract<Exercise, { type: "speak" }> }) {
  const supported = useSpeechRecognitionSupported();
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recRef = useRef<Rec | null>(null);

  const start = () => {
    const rec = getRecognition();
    if (!rec) return;
    recRef.current = rec;
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    setError(null);
    rec.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      const m = transcriptMatch(transcript, ex.target);
      const ok = m.ratio >= 0.8;
      onResult(
        { status: ok ? "correct" : "close", model: ex.target, note: `We heard: “${transcript}”` },
        { correct: ok, answer: transcript, graded: false },
        <p className="mt-3 text-lg">
          {m.matched.map((w, i) => (
            <span key={i} className={w.heard ? "text-good" : "text-bad underline decoration-dotted"}>
              {w.word}{" "}
            </span>
          ))}
        </p>,
      );
    };
    rec.onerror = (e) => setError(e.error === "not-allowed" ? "Microphone access was blocked. Allow it in your browser settings, or skip this one." : "We couldn't hear that. Try again closer to the microphone.");
    rec.onend = () => setListening(false);
    setListening(true);
    rec.start();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 rounded-2xl bg-surface-2 p-4">
        <p className="specimen flex-1 text-2xl">{ex.target}</p>
        <SpeakButton text={ex.target} rate={speechRate} />
      </div>
      {!locked &&
        (supported ? (
          <div className="flex flex-col gap-2">
            <button type="button" onClick={listening ? () => recRef.current?.stop() : start} className={`${button(listening ? "secondary" : "primary", "lg")} w-full sm:w-auto sm:self-start`}>
              {listening ? "Listening… tap to stop" : "Tap and say the sentence"}
            </button>
            <p className="text-xs text-muted">This checks which words were recognized. It is not a pronunciation score.</p>
            {error && <p role="alert" className="text-sm text-bad">{error}</p>}
            <button type="button" onClick={() => onResult(null, { correct: true, answer: "", graded: false })} className="self-start text-sm text-muted underline">
              Skip speaking for now
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="text-sm text-ink-2">
              Your browser doesn&apos;t support speech recognition. Listen, then say the sentence aloud two or three times.
            </p>
            <button type="button" onClick={() => onResult(null, { correct: true, answer: "", graded: false })} className={`${button("secondary")} self-start`}>
              I said it aloud
            </button>
          </div>
        ))}
    </div>
  );
}

/* ---------------- feedback ---------------- */

function Feedback({ exercise, check, outcome, extra, children }: { exercise: Exercise; check: CheckResult | null; outcome: ExerciseOutcome; extra?: ReactNode; children: ReactNode }) {
  const status = check?.status ?? (outcome.graded ? (outcome.correct ? "correct" : "incorrect") : "practice");
  const tone =
    status === "correct" || status === "alternative" ? "border-good bg-good/8" : status === "close" ? "border-warn bg-warn/8" : status === "practice" ? "border-line-strong bg-surface" : "border-bad bg-bad/8";
  const title =
    status === "correct" ? "Correct" : status === "alternative" ? "Also correct" : status === "close" ? "Almost" : status === "practice" ? "Good practice" : "Not quite";
  const hasDiff = !!check?.diff?.some((d) => d.kind !== "same");
  const showModel = check && status !== "correct" && exercise.type !== "reading" && !(hasDiff && exercise.type === "fill");
  return (
    <div role="status" className={`anim-rise flex flex-col gap-3 rounded-2xl border-2 p-5 ${tone}`}>
      <p className="text-lg font-bold">{title}</p>
      {check?.note && (
        <p className="text-ink-2">
          <Rich text={check.note} />
        </p>
      )}
      {check?.diff && check.diff.some((d) => d.kind !== "same") && (
        <div className="text-sm">
          <p className="font-bold text-muted">Compared with the answer</p>
          <p className="specimen mt-1 text-lg">
            {check.diff.map((d, i) => (
              <span
                key={i}
                className={d.kind === "missing" ? "rounded bg-good/15 px-1 text-good font-semibold" : d.kind === "extra" ? "rounded px-1 text-bad line-through" : ""}
                title={d.kind === "missing" ? "needed" : d.kind === "extra" ? "not needed" : undefined}
              >
                {d.text}{" "}
              </span>
            ))}
          </p>
        </div>
      )}
      {showModel && (
        <p>
          <span className="text-sm font-bold text-muted">{exercise.type === "fill" ? "Answer: " : "Model answer: "}</span>
          <span className="specimen text-lg">{check.model}</span>
        </p>
      )}
      {extra}
      <p className="text-ink-2">
        <Rich text={exercise.explanation} />
      </p>
      <div>{children}</div>
    </div>
  );
}
