"use client";

import Link from "next/link";
import { useLearner } from "@/lib/learner/store";
import { completedDays, dayKey, inProgressLesson, nextDay, streak } from "@/lib/learner/state";
import { buildQueue, nextDue } from "@/engine/srs";
import { summaryByDay, TOTAL_DAYS, isFreeDay } from "@/content/curriculum";
import { frameById, frameClass } from "@/content/frames";
import { button, card } from "@/components/ui/styles";
import { isSupabaseConfigured } from "@/lib/env";
import { useRewards } from "@/lib/rewards/client";
import { StatusCard } from "@/components/rewards/StatusCard";
import { Challenges } from "@/components/rewards/Challenges";
import { BadgeMedal } from "@/components/rewards/BadgeMedal";
import { badgeById, BADGES } from "@/lib/game/rewards";
import { SPEAKING } from "@/content/speaking";
import { FRAMES } from "@/content/frames";
import { STAGES } from "@/content/curriculum";
import { hashString } from "@/lib/game/rng";
import { IconGrid, IconMic, IconPractice, IconSword } from "@/components/app/icons";

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

/** Lessons where each frame is introduced; a frame counts as learned when its lessons are done. */
const FRAME_DAYS: Record<string, number[]> = { existence: [1, 2], states: [3, 4], actions: [5, 6, 7], modals: [8, 9], possession: [10], passive: [11] };

export function TodayView() {
  const { state, hydrated, user } = useLearner();
  const { snapshot } = useRewards();
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
  const doneSet = new Set(done);
  const stage = STAGES.find((x) => day >= x.days[0] && day <= x.days[1]) ?? STAGES[0];
  const framesLearned = FRAMES.filter((f) => FRAME_DAYS[f.id].every((d) => doneSet.has(d)));
  const spokenIds = new Set(Object.keys(snapshot?.speakingDone ?? {}));
  const openTopics = SPEAKING.filter((t) => !spokenIds.has(t.id));
  const topicPool = openTopics.length ? openTopics : SPEAKING;
  const topic = topicPool[hashString(dayKey()) % topicPool.length];
  const recentBadges = Object.entries(snapshot?.badges ?? {})
    .sort((a, b) => b[1].localeCompare(a[1]))
    .slice(0, 4)
    .map(([id]) => badgeById(id))
    .filter((b): b is NonNullable<typeof b> => !!b);
  const firstOpenChallenge = snapshot?.daily.find((c) => !c.claimed);
  const recommended = resume ? "lesson" : queue.length >= 8 ? "review" : firstOpenChallenge?.href.includes("quest") ? "quest" : firstOpenChallenge?.href.includes("crossword") ? "crossword" : firstOpenChallenge?.href.includes("speaking") ? "speaking" : "lesson";

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
          {fresh ? "Welcome to 33English. Let's find your starting point." : `${done.length} of ${TOTAL_DAYS} days complete.`}
        </p>
      </div>

      <StatusCard />

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

      <Challenges kind="daily" />

      {/* play & practise */}
      <section aria-labelledby="play">
        <h2 id="play" className="mb-3 font-bold">
          Play and practise
        </h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Tile href="/play/quest" title="Word Quest" sub="Battle the Muddles" Icon={IconSword} tone="frame-actions" pick={recommended === "quest"} />
          <Tile href="/play/crossword" title="Crossword" sub="Find the words" Icon={IconGrid} tone="frame-existence" pick={recommended === "crossword"} />
          <Tile href={`/speaking/${topic.id}`} title="Speaking" sub={topic.title} Icon={IconMic} tone="frame-modals" pick={recommended === "speaking"} />
          <Tile href="/practice" title="Review" sub={queue.length ? `${queue.length} ready` : "All caught up"} Icon={IconPractice} tone="frame-passive" pick={recommended === "review"} />
        </div>
      </section>

      {/* level */}
      <section aria-labelledby="eng-level" className={`${card} p-5`}>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="eng-level" className="font-bold">
            Your English level
          </h2>
          <Link href="/course" className="text-sm font-bold text-muted hover:text-ink">
            Course map →
          </Link>
        </div>
        <p className="mt-1 text-[1.4rem] font-bold leading-tight">
          {finished ? "Course complete" : `${stage.name} stage`}
        </p>
        <p className="text-sm text-muted">{finished ? "You've built all six frames and combined them." : stage.summary}</p>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-surface-2" role="progressbar" aria-label="Course progress" aria-valuenow={done.length} aria-valuemin={0} aria-valuemax={TOTAL_DAYS}>
          <div className="h-full rounded-full bg-ink transition-[width]" style={{ width: `${(done.length / TOTAL_DAYS) * 100}%` }} />
        </div>
        <p className="mt-1 text-xs text-muted">
          {done.length} of {TOTAL_DAYS} lessons · {framesLearned.length} of 6 frames learned
        </p>
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="The six frames">
          {FRAMES.map((f) => {
            const got = framesLearned.includes(f);
            return (
              <li key={f.id} className={`${f.className} rounded-full px-2.5 py-1 text-xs font-bold ${got ? "bg-f text-white dark:text-paper" : "bg-f-wash text-f border-f-soft border"}`}>
                {got ? "✓ " : ""}
                {f.name}
              </li>
            );
          })}
        </ul>
      </section>

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
        <Challenges kind="weekly" />
        <section aria-labelledby="badges" className={`${card} p-5`}>
          <div className="flex items-baseline justify-between">
            <h2 id="badges" className="font-bold">
              Badges
            </h2>
            <Link href="/profile" className="text-sm font-bold text-muted hover:text-ink">
              All {BADGES.length} →
            </Link>
          </div>
          {recentBadges.length ? (
            <ul className="mt-3 grid grid-cols-4 gap-2">
              {recentBadges.map((b) => (
                <li key={b.id} className="flex flex-col items-center text-center">
                  <BadgeMedal group={b.group} unlocked size={52} />
                  <span className="mt-1 text-xs font-bold leading-tight">{b.title}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-ink-2">Finish a lesson, win a battle or solve a crossword to earn your first badge.</p>
          )}
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

function Tile({ href, title, sub, Icon, tone, pick }: { href: string; title: string; sub: string; Icon: () => React.JSX.Element; tone: string; pick?: boolean }) {
  return (
    <Link href={href} className={`${tone} group relative flex min-h-32 flex-col justify-between overflow-hidden rounded-[1.25rem] border p-4 transition-transform hover:-translate-y-0.5 ${pick ? "border-f bg-f-tint" : "border-line bg-surface hover:border-line-strong"}`}>
      {pick && <span className="bg-f absolute right-3 top-3 rounded-full px-2 py-0.5 text-[0.68rem] font-black uppercase tracking-wide text-white dark:text-paper">Next</span>}
      <span className="bg-f-tint text-f grid size-10 place-items-center rounded-xl">
        <Icon />
      </span>
      <span>
        <span className="block font-bold leading-tight">{title}</span>
        <span className="mt-0.5 line-clamp-2 block text-sm text-muted">{sub}</span>
      </span>
    </Link>
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
