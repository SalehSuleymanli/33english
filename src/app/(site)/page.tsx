import Link from "next/link";
import { HeroTransformer } from "@/components/site/HeroTransformer";
import { FRAMES } from "@/content/frames";
import { FREE_DAYS } from "@/content/curriculum";
import { button } from "@/components/ui/styles";

const KEY_ROLES = new Set(["there", "be", "aux", "modal", "verb"]);

const DAY_FLOW = [
  ["See the frame", "A short explanation and a color-coded diagram of the structure."],
  ["Build it", "Assemble sentences step by step, then transform them: negative, question, past, future."],
  ["Practise", "Fill gaps, order words, correct mistakes, listen and speak — with instant explanations."],
  ["Use it", "Read a real conversation that uses the day's structure, and save the phrases you need."],
  ["Check it", "A short review. Anything you miss comes back later in your review queue."],
] as const;

const STICK = [
  ["Review that adapts to you", "Mistakes return the same day. Things you know come back less often — every 1, 2, 4, 8, then 16 days."],
  ["Your own phrasebook", "Save words and expressions from any lesson. They join your review automatically."],
  ["Listening and speaking", "Hear every example read aloud. Practice speaking and see which words were recognized."],
  ["Miss a day? Carry on.", "Your progress never resets. Streaks are optional, and you can turn them off."],
] as const;

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-12 sm:px-6 md:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div>
          <h1 className="text-[2.6rem] font-bold leading-[1.05] tracking-[-0.025em] sm:text-[3.6rem]">
            Six frames build almost every English sentence.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink-2">
            33English teaches you to construct sentences instead of memorizing rules. Learn six core frames, then change them — negative, question,
            past, future, perfect — in 33 short daily lessons.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/learn/1" className={button("primary", "lg")}>
              Start Day 1 free
            </Link>
            <Link href="/method" className={button("secondary", "lg")}>
              How the method works
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted">No account needed to start. The first {FREE_DAYS} days are free.</p>
        </div>
        <HeroTransformer />
      </section>

      {/* The six frames */}
      <section aria-labelledby="frames" className="border-y border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <div className="max-w-2xl">
            <h2 id="frames" className="text-[2rem] font-bold leading-tight tracking-[-0.02em]">
              The six frames
            </h2>
            <p className="mt-3 text-ink-2">
              Each frame answers one kind of question. Learn the frame once, and you can say it in any time, as a statement, a negative or a
              question. Each frame has its own color, everywhere in the app.
            </p>
          </div>
          <ol className="mt-10 divide-y divide-line border-y border-line">
            {FRAMES.map((f) => (
              <li key={f.id} className={`${f.className} grid gap-2 py-5 sm:grid-cols-[3rem_13rem_1fr] sm:items-baseline sm:gap-6`}>
                <span className="text-f text-lg font-bold tabular-nums">{f.number}</span>
                <div>
                  <p className="font-bold">{f.name}</p>
                  <p className="text-sm text-muted">{f.pattern}</p>
                </div>
                <p className="specimen text-xl sm:text-2xl">
                  {f.slots.map((s, i) => (
                    <span key={i} className={KEY_ROLES.has(s.role) ? "text-f font-semibold" : ""}>
                      {s.text}
                      {i < f.slots.length - 1 ? " " : "."}
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ol>
          <Link href="/method" className={`${button("ghost", "md")} mt-6 -ml-4`}>
            Read the full method
          </Link>
        </div>
      </section>

      {/* A day */}
      <section aria-labelledby="day" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 id="day" className="text-[2rem] font-bold leading-tight tracking-[-0.02em]">
              One frame at a time, twenty minutes a day
            </h2>
            <p className="mt-3 text-ink-2">
              Every lesson follows the same rhythm, so you always know what comes next — and every day connects to the frames you already know.
            </p>
          </div>
          <ol className="flex flex-col gap-0">
            {DAY_FLOW.map(([t, d], i) => (
              <li key={t} className="grid grid-cols-[2.5rem_1fr] gap-3 border-l border-line pb-7 pl-0 last:pb-0">
                <span className="-ml-[1.05rem] grid size-8 place-items-center rounded-full border border-line-strong bg-paper text-sm font-bold">{i + 1}</span>
                <div>
                  <p className="font-bold">{t}</p>
                  <p className="text-ink-2">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Outcomes, honestly */}
      <section aria-labelledby="outcomes" className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 rounded-[1.5rem] bg-ink p-7 text-paper sm:p-10 md:grid-cols-2">
          <div>
            <h2 id="outcomes" className="text-[1.75rem] font-bold leading-tight tracking-[-0.02em]">
              What you can do after 33 days
            </h2>
            <ul className="mt-5 flex flex-col gap-3 text-paper/90">
              <li>Build and change sentences in all six frames, in past, present and future.</li>
              <li>Ask any question — and understand the answer.</li>
              <li>Use perfect, continuous and passive forms with confidence.</li>
              <li>Connect ideas: if, although, who, which, because, so.</li>
              <li>Handle everyday conversations: introductions, travel, food, work.</li>
            </ul>
          </div>
          <div className="md:border-l md:border-paper/15 md:pl-8">
            <h3 className="text-lg font-bold">What we don&apos;t promise</h3>
            <p className="mt-3 text-paper/80">
              Nobody becomes fluent in 33 days, and we won&apos;t tell you otherwise. What you get is a solid, usable structure for English — and a
              record of skills you have actually shown, not a guess. Fluency comes from using it; the course gets you ready to.
            </p>
          </div>
        </div>
      </section>

      {/* Retention */}
      <section aria-labelledby="stick" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <h2 id="stick" className="max-w-2xl text-[2rem] font-bold leading-tight tracking-[-0.02em]">
          Built so it stays with you
        </h2>
        <dl className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {STICK.map(([t, d]) => (
            <div key={t} className="border-t border-line pt-5">
              <dt className="font-bold">{t}</dt>
              <dd className="mt-1 text-ink-2">{d}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start gap-5 border-t border-line pt-12 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-[1.75rem] font-bold tracking-[-0.02em]">Start with There is / There are.</h2>
            <p className="mt-1 text-ink-2">Day 1 takes about 20 minutes. No account needed.</p>
          </div>
          <Link href="/learn/1" className={button("primary", "lg")}>
            Start Day 1
          </Link>
        </div>
      </section>
    </>
  );
}
