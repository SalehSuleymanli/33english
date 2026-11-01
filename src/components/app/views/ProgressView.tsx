"use client";

import Link from "next/link";
import { useLearner } from "@/lib/learner/store";
import { accuracyBy, completedDays, dayKey, streak, type Accuracy } from "@/lib/learner/state";
import { evaluate } from "@/lib/learner/achievements";
import { FRAMES } from "@/content/frames";
import { TOTAL_DAYS, summaryByDay } from "@/content/curriculum";
import type { FrameId, Skill } from "@/content/types";
import { useEntitlement } from "@/components/app/useEntitlement";
import { button, card } from "@/components/ui/styles";

const MIN = 5;
const SKILL_LABEL: Record<Skill, string> = {
  form: "Building forms",
  meaning: "Meaning",
  "word-order": "Word order",
  questions: "Questions",
  negatives: "Negatives",
  tense: "Changing tense",
  vocabulary: "Vocabulary",
  listening: "Listening",
  reading: "Reading",
  speaking: "Speaking",
  writing: "Writing",
};

function Bar({ label, acc, className = "" }: { label: string; acc?: Accuracy; className?: string }) {
  const enough = acc && acc.total >= MIN;
  return (
    <div className={`grid grid-cols-[8.5rem_1fr_3.5rem] items-center gap-3 ${className}`}>
      <span className="text-f truncate text-sm font-bold">{label}</span>
      <div className="h-2.5 overflow-hidden rounded-full bg-surface-2" aria-hidden>
        {enough && <div className="bg-f h-full rounded-full" style={{ width: `${Math.round(acc.ratio * 100)}%` }} />}
      </div>
      <span className="text-right text-sm tabular-nums text-muted">{enough ? `${Math.round(acc.ratio * 100)}%` : acc ? `${acc.total}/${MIN}` : "—"}</span>
      <span className="sr-only">{enough ? `${Math.round(acc.ratio * 100)} percent correct in the last ${acc.total} answers` : "Not enough answers yet"}</span>
    </div>
  );
}

export function ProgressView() {
  const { state, hydrated } = useLearner();
  const ent = useEntitlement();
  if (!hydrated) return <div className="h-64 animate-pulse rounded-2xl bg-surface-2" aria-busy="true" />;

  const done = completedDays(state);
  const graded = state.attempts;
  const right = graded.filter((a) => a.correct).length;
  const byFrame = accuracyBy<FrameId>(state, (a) => a.frame);
  const bySkill = accuracyBy<Skill>(state, (a) => a.skill);
  const st = streak(state);
  const ach = evaluate(state);

  const ranked = [
    ...Object.entries(byFrame).map(([k, v]) => ({ name: FRAMES.find((f) => f.id === k)?.name ?? k, ...v })),
    ...Object.entries(bySkill).map(([k, v]) => ({ name: SKILL_LABEL[k as Skill] ?? k, ...v })),
  ].filter((x) => x.total >= MIN);
  const strengths = [...ranked].sort((a, b) => b.ratio - a.ratio).filter((x) => x.ratio >= 0.8).slice(0, 3);
  const weak = [...ranked].sort((a, b) => a.ratio - b.ratio).filter((x) => x.ratio < 0.7).slice(0, 3);

  const days = Array.from({ length: 35 }, (_, k) => {
    const d = new Date();
    d.setDate(d.getDate() - (34 - k));
    const a = state.activity[dayKey(d)];
    return { date: d, items: a?.items ?? 0 };
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-[2rem] font-bold tracking-[-0.02em]">Progress</h1>
        <p className="mt-1 text-ink-2">Everything here comes from your own answers. Percentages use your last 20 answers in each area, after at least {MIN}.</p>
      </div>

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ["Days complete", `${done.length}/${TOTAL_DAYS}`],
          ["Answers", String(graded.length)],
          ["Correct overall", graded.length ? `${Math.round((right / graded.length) * 100)}%` : "—"],
          ["Best run", `${st.best} day${st.best === 1 ? "" : "s"}`],
        ].map(([l, v]) => (
          <div key={l} className={`${card} p-4`}>
            <dt className="text-xs font-bold text-muted">{l}</dt>
            <dd className="mt-1 text-2xl font-bold tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>

      {graded.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line-strong p-6 text-ink-2">
          No answers yet. Complete your first lesson and your progress will appear here.{" "}
          <Link href="/learn/1" className="font-bold text-ink underline">
            Start Day 1
          </Link>
        </p>
      ) : (
        <>
          <section aria-labelledby="frames" className={`${card} p-5 sm:p-6`}>
            <h2 id="frames" className="font-bold">
              By frame
            </h2>
            <div className="mt-4 flex flex-col gap-3">
              {FRAMES.map((f) => (
                <Bar key={f.id} label={f.name} acc={byFrame[f.id]} className={f.className} />
              ))}
            </div>
          </section>

          <div className="grid gap-4 sm:grid-cols-2">
            <section className={`${card} p-5`}>
              <h2 className="font-bold">Strengths</h2>
              {strengths.length ? (
                <ul className="mt-2 flex flex-col gap-1">
                  {strengths.map((s) => (
                    <li key={s.name}>
                      <span className="font-bold">{s.name}</span> <span className="text-muted">— {Math.round(s.ratio * 100)}%</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-ink-2">Keep going — strengths show up once you&apos;re above 80% in an area.</p>
              )}
            </section>
            <section className={`${card} p-5`}>
              <h2 className="font-bold">To work on</h2>
              {weak.length ? (
                <>
                  <ul className="mt-2 flex flex-col gap-1">
                    {weak.map((s) => (
                      <li key={s.name}>
                        <span className="font-bold">{s.name}</span> <span className="text-muted">— {Math.round(s.ratio * 100)}%</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/practice" className={`${button("secondary", "sm")} mt-3`}>
                    Practice mistakes
                  </Link>
                </>
              ) : (
                <p className="mt-2 text-ink-2">Nothing below 70% right now.</p>
              )}
            </section>
          </div>

          <section aria-labelledby="skills" className={`${card} frame-none p-5 sm:p-6`}>
            <h2 id="skills" className="font-bold">
              By skill
            </h2>
            {ent?.premium ? (
              <div className="mt-4 flex flex-col gap-3">
                {(Object.keys(SKILL_LABEL) as Skill[])
                  .filter((k) => bySkill[k])
                  .map((k) => (
                    <Bar key={k} label={SKILL_LABEL[k]} acc={bySkill[k]} />
                  ))}
              </div>
            ) : (
              <p className="mt-2 text-ink-2">
                See accuracy by skill — questions, negatives, word order, listening and more — with{" "}
                <Link href="/pricing" className="font-bold text-ink underline underline-offset-4">
                  Premium
                </Link>
                .
              </p>
            )}
          </section>
        </>
      )}

      <section aria-labelledby="activity" className={`${card} p-5 sm:p-6`}>
        <h2 id="activity" className="font-bold">
          Last 5 weeks
        </h2>
        <ol className="mt-4 grid grid-cols-7 gap-1.5 sm:max-w-sm">
          {days.map((d, k) => (
            <li
              key={k}
              title={`${d.date.toLocaleDateString()}: ${d.items} answers`}
              className="aspect-square rounded-md"
              style={{ background: d.items ? `color-mix(in oklab, var(--good) ${Math.min(100, 30 + d.items * 3)}%, var(--surface))` : "var(--surface-2)" }}
            >
              <span className="sr-only">
                {d.date.toLocaleDateString()}: {d.items} answers
              </span>
            </li>
          ))}
        </ol>
      </section>

      {done.length > 0 && (
        <section aria-labelledby="scores">
          <h2 id="scores" className="text-lg font-bold">
            Lesson scores
          </h2>
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {done.map((d) => (
              <li key={d} className="flex items-center gap-3 py-3">
                <span className="w-16 text-sm font-bold text-muted">Day {d}</span>
                <Link href={`/learn/${d}`} className="flex-1 hover:underline">
                  {summaryByDay(d)?.title}
                </Link>
                <span className="tabular-nums">{state.lessons[d].bestScore ?? 0}%</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="ach">
        <h2 id="ach" className="text-lg font-bold">
          Achievements
        </h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {ach.map((a) => (
            <li key={a.id} className={`${card} flex items-center gap-3 p-4 ${a.unlocked ? "" : "opacity-70"}`}>
              <span className={`grid size-10 shrink-0 place-items-center rounded-full ${a.unlocked ? "bg-ink text-paper" : "bg-surface-2 text-muted"}`} aria-hidden>
                {a.unlocked ? "★" : "☆"}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-bold">{a.title}</p>
                <p className="text-sm text-muted">{a.description}</p>
                {!a.unlocked && (
                  <p className="text-xs text-muted tabular-nums">
                    {Math.min(a.value, a.target)} / {a.target}
                  </p>
                )}
              </div>
              <span className="sr-only">{a.unlocked ? "Unlocked" : "Locked"}</span>
            </li>
          ))}
        </ul>
        {!state.profile.streaksEnabled && <p className="mt-3 text-sm text-muted">Streak achievements are hidden because streaks are turned off in settings.</p>}
      </section>
    </div>
  );
}
