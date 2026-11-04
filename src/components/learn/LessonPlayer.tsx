"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Exercise, Lesson } from "@/content/types";
import { frameById, frameClass } from "@/content/frames";
import { TOTAL_DAYS, isFreeDay } from "@/content/curriculum";
import { useLearner } from "@/lib/learner/store";
import { useRewards } from "@/lib/rewards/client";
import { completeLesson, recordAnswer, saveVocab, startLesson, toggleBookmark } from "@/lib/learner/state";
import { ExercisePlayer, type ExerciseOutcome } from "./ExercisePlayer";
import { GuidedBuilder } from "./GuidedBuilder";
import { Dialogue } from "./Dialogue";
import { StructureDiagram } from "@/components/ui/StructureDiagram";
import { SpeakButton } from "@/components/ui/Speak";
import { button } from "@/components/ui/styles";
import { Rich } from "@/components/ui/Rich";

type Step =
  | { kind: "intro" }
  | { kind: "learn" }
  | { kind: "examples" }
  | { kind: "forms" }
  | { kind: "mistakes" }
  | { kind: "build" }
  | { kind: "practice"; ex: Exercise; n: number; of: number }
  | { kind: "words" }
  | { kind: "dialogue" }
  | { kind: "review"; ex: Exercise; n: number; of: number }
  | { kind: "done" };

const STEP_TITLE: Record<Step["kind"], string> = {
  intro: "Today",
  learn: "The frame",
  examples: "Examples",
  forms: "Positive, negative, question",
  mistakes: "Common mistakes",
  build: "Build it",
  practice: "Practice",
  words: "Words and phrases",
  dialogue: "In real life",
  review: "Review",
  done: "Done",
};

export function LessonPlayer({ lesson }: { lesson: Lesson }) {
  const { state, dispatch, hydrated } = useLearner();
  const lang = state.profile.nativeLanguage;
  const rate = state.profile.speechRate;

  const steps = useMemo<Step[]>(() => {
    const show = (e: Exercise) => e.type !== "translate" || e.from === lang;
    const practice = lesson.practice.filter(show);
    const review = lesson.review.filter(show);
    return [
      { kind: "intro" },
      { kind: "learn" },
      { kind: "examples" },
      ...(lesson.forms.length ? [{ kind: "forms" } as Step] : []),
      { kind: "mistakes" },
      { kind: "build" },
      ...practice.map((ex, i) => ({ kind: "practice", ex, n: i + 1, of: practice.length }) as Step),
      { kind: "words" },
      { kind: "dialogue" },
      ...review.map((ex, i) => ({ kind: "review", ex, n: i + 1, of: review.length }) as Step),
      { kind: "done" },
    ];
  }, [lesson, lang]);

  const [i, setI] = useState(0);
  const [resumeOffer, setResumeOffer] = useState<number | null>(null);
  const [reviewResults, setReviewResults] = useState<boolean[]>([]);
  const [reviewAnswers, setReviewAnswers] = useState<Record<string, string>>({});
  const { claim } = useRewards();
  const [practiceResults, setPracticeResults] = useState<boolean[]>([]);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  // offer to resume once local progress has loaded
  useEffect(() => {
    if (!hydrated || initialized.current) return;
    initialized.current = true;
    const rec = state.lessons[lesson.day];
    if (rec?.status === "started" && rec.lastSection && rec.lastSection > 0 && rec.lastSection < steps.length - 1) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time resume offer after hydration
      setResumeOffer(rec.lastSection);
    }
  }, [hydrated, state.lessons, lesson.day, steps.length]);

  const go = (next: number) => {
    const n = Math.max(0, Math.min(steps.length - 1, next));
    setI(n);
    if (steps[n].kind !== "done" && steps[n].kind !== "review") dispatch((s) => startLesson(s, lesson.day, n));
    topRef.current?.scrollIntoView({ block: "start" });
    // move focus to the step heading for screen readers / keyboard users
    requestAnimationFrame(() => document.getElementById("step-heading")?.focus());
  };

  const step = steps[i];
  const fc = frameClass(lesson.frame);
  const progress = Math.round((i / (steps.length - 1)) * 100);

  const onAnswered = (ex: Exercise, kind: "practice" | "review") => (o: ExerciseOutcome) => {
    if (!o.graded) return;
    (kind === "review" ? setReviewResults : setPracticeResults)((r) => [...r, o.correct]);
    if (kind === "review") setReviewAnswers((a) => ({ ...a, [ex.id]: o.answer }));
    dispatch((s) =>
      recordAnswer(s, {
        exerciseId: ex.id,
        day: lesson.day,
        correct: o.correct,
        answer: o.answer,
        source: "lesson",
        frame: ex.frame ?? lesson.frame,
        skill: ex.skill,
        addToReview: kind === "review",
      }),
    );
  };

  const finish = () => {
    const r = reviewResults;
    const score = r.length ? Math.round((r.filter(Boolean).length / r.length) * 100) : 100;
    setFinalScore(score);
    dispatch((s) => completeLesson(s, lesson.day, score));
    // the server re-grades these answers before giving XP
    void claim({ type: "lesson", day: lesson.day, answers: reviewAnswers });
    go(steps.length - 1);
  };

  const next = () => {
    if (i === steps.length - 2) finish();
    else go(i + 1);
  };

  const isExercise = step.kind === "practice" || step.kind === "review";

  return (
    <div className={`${fc} mx-auto flex min-h-dvh max-w-2xl flex-col px-4 sm:px-6`} ref={topRef}>
      {/* top bar */}
      <header className="sticky top-0 z-30 -mx-4 flex items-center gap-3 bg-paper/90 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <Link href="/course" aria-label="Close lesson" className="grid size-10 place-items-center rounded-full text-muted hover:bg-surface-2 hover:text-ink">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </Link>
        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-2" role="progressbar" aria-label="Lesson progress" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="bg-f h-full rounded-full transition-[width] duration-500" style={{ width: `${Math.max(3, progress)}%` }} />
        </div>
        <span className="w-14 text-right text-sm font-bold tabular-nums text-muted">Day {lesson.day}</span>
      </header>

      <main id="main" className="flex flex-1 flex-col pb-32 pt-6">
        <p className="text-f text-sm font-bold">
          {STEP_TITLE[step.kind]}
          {isExercise ? ` · ${(step as { n: number }).n} of ${(step as { of: number }).of}` : ""}
        </p>

        <div key={i} className="anim-rise mt-2 flex flex-col">
          {step.kind === "intro" && (
            <section aria-labelledby="step-heading">
              <h1 id="step-heading" tabIndex={-1} className="text-[2.2rem] font-bold leading-[1.1] tracking-[-0.02em] outline-none sm:text-[2.6rem]">
                {lesson.title}
              </h1>
              {lesson.frame && (
                <p className="text-f mt-3 font-bold">
                  Frame {frameById(lesson.frame).number} · {frameById(lesson.frame).name}
                </p>
              )}
              <dl className="mt-8 flex flex-col gap-5">
                <div>
                  <dt className="text-sm font-bold text-muted">Goal</dt>
                  <dd className="text-lg">{lesson.objective}</dd>
                </div>
                <div>
                  <dt className="text-sm font-bold text-muted">Builds on</dt>
                  <dd className="text-ink-2">{lesson.builds_on}</dd>
                </div>
                <div>
                  <dt className="text-sm font-bold text-muted">By the end</dt>
                  <dd className="text-ink-2">{lesson.outcome}</dd>
                </div>
                <div>
                  <dt className="text-sm font-bold text-muted">Time</dt>
                  <dd className="text-ink-2">About {lesson.minutes} minutes</dd>
                </div>
              </dl>
              {resumeOffer !== null && (
                <div className="mt-8 rounded-2xl border border-line bg-surface p-4">
                  <p className="font-bold">You were part-way through this lesson.</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button type="button" className={button("frame")} onClick={() => go(resumeOffer)}>
                      Resume where I left off
                    </button>
                    <button type="button" className={button("ghost")} onClick={() => setResumeOffer(null)}>
                      Start from the beginning
                    </button>
                  </div>
                </div>
              )}
            </section>
          )}

          {step.kind === "learn" && (
            <section aria-labelledby="step-heading">
              <h1 id="step-heading" tabIndex={-1} className="text-[1.75rem] font-bold leading-tight outline-none">
                How it works
              </h1>
              <div className="mt-4 flex flex-col gap-3 text-lg text-ink-2">
                {lesson.explanation.map((p, k) => (
                  <p key={k}>
                    <Rich text={p} />
                  </p>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-7 rounded-2xl bg-f-wash p-5">
                {lesson.patterns.map((p, k) => (
                  <StructureDiagram key={k} pattern={p} />
                ))}
              </div>
              <BookmarkButton day={lesson.day} refId={`d${lesson.day}-structure`} label={`Day ${lesson.day} structure: ${lesson.title}`} />
            </section>
          )}

          {step.kind === "examples" && (
            <section aria-labelledby="step-heading">
              <h1 id="step-heading" tabIndex={-1} className="text-[1.75rem] font-bold leading-tight outline-none">
                See it in sentences
              </h1>
              <ul className="mt-5 flex flex-col divide-y divide-line border-y border-line">
                {lesson.examples.map((e, k) => (
                  <li key={k} className="flex gap-2 py-4">
                    <div className="min-w-0 flex-1">
                      <p className="specimen text-xl">
                        {e.en}
                        {e.register && e.register !== "neutral" && <span className="ml-2 rounded-full bg-surface-2 px-2 py-0.5 align-middle font-sans text-xs font-bold text-muted">{e.register}</span>}
                      </p>
                      {e.note && (
                        <p className="mt-1 text-ink-2">
                          <Rich text={e.note} />
                        </p>
                      )}
                    </div>
                    <SpeakButton text={e.en} rate={rate} />
                    <BookmarkButton compact day={lesson.day} refId={`d${lesson.day}-ex${k}`} label={e.en} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {step.kind === "forms" && (
            <section aria-labelledby="step-heading">
              <h1 id="step-heading" tabIndex={-1} className="text-[1.75rem] font-bold leading-tight outline-none">
                Three forms of every sentence
              </h1>
              <div className="mt-5 flex flex-col gap-5">
                {lesson.forms.map((f, k) => (
                  <div key={k} className="rounded-2xl border border-line bg-surface p-5">
                    <p className="text-sm font-bold text-muted">{f.label}</p>
                    <dl className="mt-3 grid gap-3 sm:grid-cols-[6.5rem_1fr]">
                      {(
                        [
                          ["Positive", f.positive],
                          ["Negative", f.negative],
                          ["Question", f.question],
                        ] as const
                      ).map(([lab, s]) => (
                        <div key={lab} className="contents">
                          <dt className="text-f text-sm font-bold sm:pt-1.5">{lab}</dt>
                          <dd className="flex items-center gap-1">
                            <span className="specimen flex-1 text-lg">{s}</span>
                            <SpeakButton text={s} rate={rate} />
                          </dd>
                        </div>
                      ))}
                    </dl>
                    {f.shortAnswers && <p className="mt-3 border-t border-line pt-3 text-sm text-ink-2">Short answers: {f.shortAnswers}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {step.kind === "mistakes" && (
            <section aria-labelledby="step-heading">
              <h1 id="step-heading" tabIndex={-1} className="text-[1.75rem] font-bold leading-tight outline-none">
                Mistakes learners often make
              </h1>
              <ul className="mt-5 flex flex-col gap-4">
                {lesson.mistakes.map((m, k) => (
                  <li key={k} className="rounded-2xl border border-line bg-surface p-5">
                    <p className="specimen text-lg text-bad line-through decoration-bad/40">
                      <span className="sr-only">Wrong: </span>
                      {m.wrong}
                    </p>
                    <p className="specimen mt-1 text-lg text-good">
                      <span className="sr-only">Right: </span>
                      {m.right}
                    </p>
                    <p className="mt-2 text-ink-2">
                      <Rich text={m.why} />
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {step.kind === "build" && (
            <section aria-labelledby="step-heading">
              <h1 id="step-heading" tabIndex={-1} className="text-[1.75rem] font-bold leading-tight outline-none">
                Build it step by step
              </h1>
              <GuidedBuilder build={lesson.guided} rate={rate} />
            </section>
          )}

          {isExercise && (
            <section aria-labelledby="step-heading">
              <span id="step-heading" tabIndex={-1} className="sr-only">
                {STEP_TITLE[step.kind]} question {(step as { n: number }).n}
              </span>
              <ExercisePlayer
                key={(step as { ex: Exercise }).ex.id}
                exercise={(step as { ex: Exercise }).ex}
                speechRate={rate}
                onAnswered={onAnswered((step as { ex: Exercise }).ex, step.kind as "practice" | "review")}
                onDone={next}
                continueLabel={i === steps.length - 2 ? "Finish lesson" : "Continue"}
              />
            </section>
          )}

          {step.kind === "words" && (
            <section aria-labelledby="step-heading">
              <h1 id="step-heading" tabIndex={-1} className="text-[1.75rem] font-bold leading-tight outline-none">
                Words and phrases for today
              </h1>
              <p className="mt-2 text-ink-2">Save the ones you want to remember. They&apos;ll join your review.</p>
              <ul className="mt-5 flex flex-col divide-y divide-line border-y border-line">
                {lesson.vocabulary.map((v) => {
                  const saved = !!state.vocab[v.term.toLowerCase()];
                  return (
                    <li key={v.term} className="flex items-start gap-3 py-4">
                      <div className="min-w-0 flex-1">
                        <p className="font-bold">{v.term}</p>
                        <p className="text-ink-2">{v.meaning}</p>
                        <p className="specimen mt-1 text-muted">{v.example}</p>
                      </div>
                      <SpeakButton text={v.example} rate={rate} />
                      <button
                        type="button"
                        disabled={saved}
                        onClick={() => {
                          dispatch((s) => saveVocab(s, { term: v.term, meaning: v.meaning, example: v.example, day: lesson.day }));
                          void claim({ type: "word", term: v.term }, undefined, { quiet: true });
                        }}
                        className={`h-9 shrink-0 rounded-full px-3 text-sm font-bold ${saved ? "text-good" : "border border-line-strong hover:border-ink"}`}
                        aria-label={saved ? `${v.term} saved` : `Save ${v.term}`}
                      >
                        {saved ? "Saved ✓" : "Save"}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {step.kind === "dialogue" && (
            <section aria-labelledby="step-heading">
              <h1 id="step-heading" tabIndex={-1} className="text-[1.75rem] font-bold leading-tight outline-none">
                {lesson.dialogue.title}
              </h1>
              <Dialogue dialogue={lesson.dialogue} rate={rate} />
            </section>
          )}

          {step.kind === "done" && <Done lesson={lesson} score={finalScore ?? 0} practice={practiceResults} />}
        </div>
      </main>

      {/* sticky continue for reading steps */}
      {!isExercise && step.kind !== "done" && (
        <footer className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 backdrop-blur">
          <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3 sm:px-6">
            {i > 0 && (
              <button type="button" onClick={() => go(i - 1)} className={button("ghost")}>
                Back
              </button>
            )}
            <button type="button" onClick={next} className={`${button("frame", "lg")} ml-auto min-w-40`}>
              {step.kind === "intro" ? "Start lesson" : "Continue"}
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}

function BookmarkButton({ day, refId, label, compact }: { day: number; refId: string; label: string; compact?: boolean }) {
  const { state, dispatch } = useLearner();
  const on = !!state.bookmarks[refId];
  const toggle = () => dispatch((s) => toggleBookmark(s, { ref: refId, label, day }));
  if (compact)
    return (
      <button type="button" onClick={toggle} aria-pressed={on} aria-label={on ? "Remove bookmark" : "Bookmark this sentence"} className={`grid size-9 shrink-0 place-items-center rounded-full hover:bg-surface-2 ${on ? "text-f" : "text-muted"}`}>
        <BookmarkIcon filled={on} />
      </button>
    );
  return (
    <button type="button" onClick={toggle} aria-pressed={on} className={`mt-4 inline-flex items-center gap-2 self-start rounded-full px-3 py-2 text-sm font-bold hover:bg-surface-2 ${on ? "text-f" : "text-muted"}`}>
      <BookmarkIcon filled={on} />
      {on ? "Bookmarked" : "Bookmark this structure"}
    </button>
  );
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden>
      <path d="M6 3h12v18l-6-4-6 4V3Z" />
    </svg>
  );
}

function Done({ lesson, score, practice }: { lesson: Lesson; score: number; practice: boolean[] }) {
  const { state } = useLearner();
  const next = lesson.day + 1;
  const pRight = practice.filter(Boolean).length;
  const mistakes = practice.length - pRight;
  return (
    <section aria-labelledby="step-heading" className="flex flex-col items-start">
      <div className="bg-f anim-pop grid size-16 place-items-center rounded-2xl text-white dark:text-paper" aria-hidden>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="m5 12.5 4.5 4.5L19 7.5" />
        </svg>
      </div>
      <h1 id="step-heading" tabIndex={-1} className="mt-6 text-[2rem] font-bold leading-tight outline-none">
        Day {lesson.day} complete
      </h1>
      <p className="mt-2 text-lg text-ink-2">{lesson.outcome}</p>
      <dl className="mt-8 grid w-full grid-cols-3 gap-3">
        <Stat label="Review score" value={`${score}%`} />
        <Stat label="Practice" value={practice.length ? `${pRight}/${practice.length}` : "—"} />
        <Stat label="Days done" value={`${Object.values(state.lessons).filter((l) => l.status === "completed").length}/${TOTAL_DAYS}`} />
      </dl>
      {mistakes > 0 && <p className="mt-5 text-ink-2">{mistakes === 1 ? "One question" : `${mistakes} questions`} you missed will come back in today&apos;s review.</p>}
      <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
        {next <= TOTAL_DAYS && (
          <Link href={`/learn/${next}`} className={button("frame", "lg")}>
            {isFreeDay(next) ? `Continue to Day ${next}` : `See Day ${next}`}
          </Link>
        )}
        <Link href="/today" className={button("secondary", "lg")}>
          Back to Today
        </Link>
      </div>
      {lesson.labSeeds?.length ? (
        <Link href={`/lab?seed=${lesson.labSeeds[0]}`} className="mt-6 text-sm font-bold text-muted underline underline-offset-4 hover:text-ink">
          Explore today&apos;s sentences in the Sentence Lab
        </Link>
      ) : null}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-4">
      <dt className="text-xs font-bold text-muted">{label}</dt>
      <dd className="mt-1 text-2xl font-bold tabular-nums">{value}</dd>
    </div>
  );
}
