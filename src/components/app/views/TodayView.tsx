"use client";

import Link from "next/link";
import { useLearner } from "@/lib/learner/store";
import { completedDays, dayKey, inProgressLesson, nextDay, streak } from "@/lib/learner/state";
import { buildQueue, nextDue } from "@/engine/srs";
import { summaryByDay, TOTAL_DAYS, isFreeDay } from "@/content/curriculum";
import { frameById, frameClass } from "@/content/frames";
import { button, card } from "@/components/ui/styles";
import { isSupabaseConfigured } from "@/lib/env";

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

export function TodayView() {
  const { state, hydrated, user } = useLearner();
  if (!hydrated) return <TodaySkeleton />;

  const done = completedDays(state);
  const resume = inProgressLesson(state);
  const day = resume?.day ?? nextDay(state, TOTAL_DAYS);
  const s = summaryByDay(day)!;
  const finished = done.length === TOTAL_DAYS;
  const queue = buildQueue(Object.values(state.review), new Date(), 200);
  const upcoming = nextDue(Object.values(state.review));
  const today = state.activity[dayKey()] ?? { items: 0, correct: 0 };
  const goal = state.profile.dailyGoal;
  const st = streak(state);
  const fresh = done.length === 0 && !resume && state.attempts.length === 0;

  const week = Array.from({ length: 7 }, (_, k) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - k));
    return { label: d.toLocaleDateString(undefined, { weekday: "narrow" }), active: (state.activity[dayKey(d)]?.items ?? 0) > 0, today: k === 6 };
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[2rem] font-bold leading-tight tracking-[-0.02em]">
          {greeting()}
          {state.profile.displayName ? `, ${state.profile.displayName}` : ""}
        </h1>
        <p className="mt-1 text-ink-2">
          {fresh ? "Welcome to Structa. Let's find your starting point." : `${done.length} of ${TOTAL_DAYS} days complete.`}
        </p>
      </div>

      {fresh && !state.profile.placement && (
        <section className={`${card} p-5 sm:p-6`}>
          <h2 className="text-lg font-bold">Not sure where to start?</h2>
          <p className="mt-1 text-ink-2">A short check (about 4 minutes) suggests a starting day. Or simply begin with Day 1 — most learners do.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/onboarding" className={button("primary")}>
              Take the placement check
            </Link>
            <Link href="/learn/1" className={button("secondary")}>
              Start Day 1
            </Link>
          </div>
        </section>
      )}

      {/* continue */}
      {!finished ? (
        <section aria-labelledby="continue" className={`${frameClass(s.frame)} relative overflow-hidden rounded-[1.5rem] border border-line bg-surface p-6 sm:p-8`}>
          <div className="bg-f absolute inset-y-0 left-0 w-1.5" aria-hidden />
          <p className="text-f text-sm font-bold">
            {resume ? "Continue where you left off" : "Your next lesson"} · Day {s.day}
          </p>
          <h2 id="continue" className="mt-1 text-[1.75rem] font-bold leading-tight tracking-[-0.02em]">
            {s.title}
          </h2>
          <p className="mt-2 max-w-xl text-ink-2">{s.objective}</p>
          <p className="mt-2 text-sm text-muted">
            {s.frame ? `${frameById(s.frame).name} · ` : ""}
            {s.minutes} min{!isFreeDay(s.day) ? " · Premium" : ""}
          </p>
          <Link href={`/learn/${s.day}`} className={`${button("frame", "lg")} mt-6`}>
            {resume ? "Resume lesson" : `Start Day ${s.day}`}
          </Link>
        </section>
      ) : (
        <section className={`${card} p-6`}>
          <h2 className="text-xl font-bold">You&apos;ve completed all 33 days.</h2>
          <p className="mt-1 text-ink-2">Keep your English active with daily review, the Sentence Lab and conversations.</p>
        </section>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {/* review */}
        <section aria-labelledby="review" className={`${card} p-5`}>
          <h2 id="review" className="font-bold">
            Review
          </h2>
          {queue.length > 0 ? (
            <>
              <p className="mt-1 text-[2rem] font-bold leading-none tabular-nums">{queue.length}</p>
              <p className="mt-1 text-sm text-muted">{queue.length === 1 ? "item is" : "items are"} ready — mistakes first</p>
              <Link href="/practice" className={`${button("primary")} mt-4`}>
                Start review
              </Link>
            </>
          ) : (
            <p className="mt-2 text-ink-2">
              {Object.keys(state.review).length === 0
                ? "Nothing to review yet. Items appear here after your first lesson."
                : `All caught up. Next review: ${upcoming ? upcoming.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" }) : "soon"}.`}
            </p>
          )}
        </section>

        {/* goal + week */}
        <section aria-labelledby="goal" className={`${card} p-5`}>
          <h2 id="goal" className="font-bold">
            Today&apos;s goal
          </h2>
          <p className="mt-1 text-sm text-muted">
            {Math.min(today.items, goal)} of {goal} answers
          </p>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-surface-2" role="progressbar" aria-label="Daily goal" aria-valuenow={Math.min(today.items, goal)} aria-valuemin={0} aria-valuemax={goal}>
            <div className="h-full rounded-full bg-good transition-[width]" style={{ width: `${Math.min(100, (today.items / goal) * 100)}%` }} />
          </div>
          <div className="mt-5 flex items-end justify-between">
            <ol className="flex gap-1.5" aria-label="Practice in the last 7 days">
              {week.map((w, k) => (
                <li key={k} className="flex flex-col items-center gap-1">
                  <span className={`size-6 rounded-md ${w.active ? "bg-good" : "bg-surface-2"} ${w.today ? "ring-2 ring-ink/30" : ""}`} aria-label={w.active ? "practiced" : "no practice"} />
                  <span className="text-[0.7rem] text-muted" aria-hidden>
                    {w.label}
                  </span>
                </li>
              ))}
            </ol>
            <p className="text-right text-sm text-muted">
              {state.profile.streaksEnabled && st.current > 1 ? (
                <>
                  <span className="block text-lg font-bold text-ink">{st.current} days</span>in a row
                </>
              ) : (
                <>
                  <span className="block text-lg font-bold text-ink">{st.daysThisWeek}/7</span>days this week
                </>
              )}
            </p>
          </div>
        </section>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/lab" className={`${card} group p-5 hover:border-line-strong`}>
          <h2 className="font-bold">Sentence Lab</h2>
          <p className="mt-1 text-ink-2">Pick a sentence and change it: past, future, negative, passive. See why each change happens.</p>
        </Link>
        <Link href="/scenarios" className={`${card} p-5 hover:border-line-strong`}>
          <h2 className="font-bold">Conversations</h2>
          <p className="mt-1 text-ink-2">Practice real situations — ordering food, directions, interviews — with listening and role-play.</p>
        </Link>
      </div>

      {!user && isSupabaseConfigured() && done.length > 0 && (
        <section className="rounded-2xl border border-dashed border-line-strong p-5">
          <p className="font-bold">Your progress is only on this device.</p>
          <p className="mt-1 text-ink-2">Create a free account to keep it safe and continue on your phone or computer.</p>
          <Link href="/signup" className={`${button("secondary", "sm")} mt-3`}>
            Create free account
          </Link>
        </section>
      )}
    </div>
  );
}

function TodaySkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true">
      <div className="h-9 w-64 animate-pulse rounded-lg bg-surface-2" />
      <div className="h-56 animate-pulse rounded-[1.5rem] bg-surface-2" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="h-40 animate-pulse rounded-2xl bg-surface-2" />
        <div className="h-40 animate-pulse rounded-2xl bg-surface-2" />
      </div>
      <span className="sr-only">Loading your day…</span>
    </div>
  );
}
