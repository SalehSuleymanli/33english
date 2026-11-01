"use client";

import Link from "next/link";
import { useLearner } from "@/lib/learner/store";
import { nextDay } from "@/lib/learner/state";
import { CURRICULUM, STAGES, TOTAL_DAYS, isFreeDay, FREE_DAYS } from "@/content/curriculum";
import { frameById, frameClass } from "@/content/frames";
import { useEntitlement } from "@/components/app/useEntitlement";

export function CourseView() {
  const { state, hydrated } = useLearner();
  const ent = useEntitlement();
  const upNext = hydrated ? nextDay(state, TOTAL_DAYS) : 1;
  const doneCount = Object.values(state.lessons).filter((l) => l.status === "completed").length;

  return (
    <div>
      <h1 className="text-[2rem] font-bold tracking-[-0.02em]">Your 33 days</h1>
      <p className="mt-1 text-ink-2">
        {hydrated ? `${doneCount} complete.` : " "} You can open any day you have access to — the order is a recommendation, not a rule.
      </p>
      {ent && !ent.premium && (
        <p className="mt-3 text-sm text-muted">
          Days 1–{FREE_DAYS} are free.{" "}
          <Link href="/pricing" className="font-bold text-ink underline underline-offset-4">
            Premium
          </Link>{" "}
          unlocks Days {FREE_DAYS + 1}–33.
        </p>
      )}
      {ent?.devUnlock && <p className="mt-3 rounded-lg bg-warn/10 p-2 text-sm text-warn">Development mode: all days unlocked (DEV_UNLOCK_ALL). This never applies in production.</p>}

      <div className="mt-8 flex flex-col gap-10">
        {STAGES.map((st) => (
          <section key={st.id} aria-labelledby={`s-${st.id}`}>
            <div className="flex items-baseline justify-between gap-3">
              <h2 id={`s-${st.id}`} className="text-lg font-bold">
                {st.name}
              </h2>
              <span className="text-sm text-muted">{st.days[0] === st.days[1] ? `Day ${st.days[0]}` : `Days ${st.days[0]}–${st.days[1]}`}</span>
            </div>
            <ol className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {CURRICULUM.filter((c) => c.day >= st.days[0] && c.day <= st.days[1]).map((c) => {
                const rec = state.lessons[c.day];
                const locked = !isFreeDay(c.day) && ent !== null && !ent.premium;
                const status = rec?.status === "completed" ? "done" : rec?.status === "started" ? "started" : c.day === upNext ? "next" : "todo";
                return (
                  <li key={c.day} className={frameClass(c.frame)}>
                    <Link
                      href={`/learn/${c.day}`}
                      className={`flex h-full items-start gap-3 rounded-2xl border p-4 transition-colors hover:border-line-strong ${status === "next" ? "border-f border-2 bg-surface" : "border-line bg-surface"}`}
                    >
                      <span
                        className={`grid size-10 shrink-0 place-items-center rounded-xl text-sm font-bold tabular-nums ${status === "done" ? "bg-f text-white dark:text-paper" : "bg-f-tint text-f"}`}
                        aria-hidden
                      >
                        {status === "done" ? "✓" : c.day}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-bold leading-snug">
                          <span className="sr-only">Day {c.day}: </span>
                          {c.title}
                        </span>
                        <span className="mt-0.5 block text-sm text-muted">
                          {c.frame ? frameById(c.frame).name : "Mixed"} · {c.minutes} min
                          {status === "done" && rec?.bestScore !== undefined ? ` · best ${rec.bestScore}%` : ""}
                          {status === "started" ? " · in progress" : ""}
                          {status === "next" ? " · up next" : ""}
                        </span>
                      </span>
                      {locked && (
                        <span className="mt-1 text-muted" title="Premium" aria-label="Premium">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                            <rect x="5" y="11" width="14" height="10" rx="2" />
                            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                          </svg>
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
