import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/site/PageIntro";
import { STAGES, FREE_DAYS } from "@/content/curriculum";
import { button } from "@/components/ui/styles";

export const metadata: Metadata = { title: "How the 33 days work", description: "Stages, daily lessons, review and what happens if you miss a day." };

export default function JourneyPage() {
  return (
    <>
      <PageIntro title="How the 33-day journey works">
        <p>One lesson a day, each about 20–30 minutes, in six stages. Every day builds on the ones before it — and you can go at your own pace.</p>
      </PageIntro>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <ol className="relative grid gap-0 border-l-2 border-line pl-6 sm:pl-8">
          {STAGES.map((s) => (
            <li key={s.id} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[2.05rem] top-1 size-3.5 rounded-full border-2 border-ink bg-paper sm:-left-[2.55rem]" aria-hidden />
              <p className="text-sm font-bold text-muted">
                {s.days[0] === s.days[1] ? `Day ${s.days[0]}` : `Days ${s.days[0]}–${s.days[1]}`}
              </p>
              <h2 className="text-xl font-bold">{s.name}</h2>
              <p className="mt-1 max-w-xl text-ink-2">{s.summary}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto mt-20 grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-3">
        <div>
          <h2 className="text-lg font-bold">Your daily routine</h2>
          <p className="mt-2 text-ink-2">
            Open Today. If you have reviews due, start there — it takes a few minutes. Then continue to your next lesson. That&apos;s it.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-bold">Missing a day is fine</h2>
          <p className="mt-2 text-ink-2">
            Nothing resets. The course waits for you, and your review queue keeps the right things ready. Streaks are optional — turn them off in
            settings if they don&apos;t help you.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-bold">Start where you are</h2>
          <p className="mt-2 text-ink-2">
            A short placement check suggests where to begin. It&apos;s a quick estimate, not an official level test. You can always go back to any
            day.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <div className="rounded-[var(--radius-card)] border border-line bg-surface p-6 sm:p-8">
          <h2 className="text-xl font-bold">Free and premium</h2>
          <p className="mt-2 max-w-2xl text-ink-2">
            Days 1–{FREE_DAYS} — the first three frames — are free, along with the Sentence Lab, review and your word collection. Premium unlocks
            Days {FREE_DAYS + 1}–33 and extra real-life scenarios.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/learn/1" className={button("primary")}>
              Start Day 1
            </Link>
            <Link href="/pricing" className={button("secondary")}>
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
