import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/site/PageIntro";
import { StructureDiagram } from "@/components/ui/StructureDiagram";
import { FRAMES } from "@/content/frames";
import { button } from "@/components/ui/styles";

export const metadata: Metadata = { title: "The method", description: "How six sentence frames let you build and change almost any English sentence." };

const CHANGES = [
  ["Polarity", "Positive, negative or question", "I work → I don't work → Do I work?"],
  ["Time", "Past, present or future", "I work → I worked → I will work"],
  ["Aspect", "Simple, in progress, completed", "I work → I am working → I have worked"],
  ["Attitude", "Ability, advice, obligation, possibility", "I work → I can work → I should work"],
  ["Focus", "Who acts, or what happens to something", "They built it → It was built"],
] as const;

export default function MethodPage() {
  return (
    <>
      <PageIntro title="Learn the frame, then change it">
        <p>
          Most courses teach English as a long list of tenses and rules. Structa starts from a different idea: almost every English sentence is
          built on one of six frames. Once you can build a frame, you can change it in a small number of predictable ways.
        </p>
      </PageIntro>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-[1.75rem] font-bold tracking-[-0.02em]">The six frames</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {FRAMES.map((f) => (
            <article key={f.id} className={`${f.className} rounded-[var(--radius-card)] border border-line bg-surface p-6`}>
              <p className="text-f font-bold">
                Frame {f.number} · {f.name}
              </p>
              <h3 className="mt-1 text-xl font-bold">{f.pattern}</h3>
              <p className="mt-1 text-muted">{f.question}</p>
              <div className="mt-5">
                <StructureDiagram pattern={{ name: "Structure", slots: f.slots }} compact />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="text-[1.75rem] font-bold tracking-[-0.02em]">Five ways every frame changes</h2>
            <p className="mt-3 text-ink-2">
              Instead of learning twelve tenses as separate topics, you learn five kinds of change and apply them to any frame. The helper words —
              do, be, have, will, can — move and change; the frame stays the same.
            </p>
          </div>
          <dl className="divide-y divide-line border-y border-line">
            {CHANGES.map(([name, what, ex]) => (
              <div key={name} className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr]">
                <dt className="font-bold">{name}</dt>
                <dd>
                  <p className="text-ink-2">{what}</p>
                  <p className="specimen mt-1 text-lg">{ex}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-3xl px-4 sm:px-6">
        <h2 className="text-[1.75rem] font-bold tracking-[-0.02em]">Why it works</h2>
        <div className="mt-4 flex flex-col gap-4 text-ink-2">
          <p>
            <strong className="text-ink">You build before you memorize.</strong> Each lesson has you assemble sentences slot by slot. Understanding
            why the words go where they go is what lets you make new sentences you have never seen.
          </p>
          <p>
            <strong className="text-ink">Everything connects.</strong> The perfect tense is not a new topic; it is Frame 3 with a helper. The
            passive is a frame of its own, but it reuses the be you learned on Day 3. Every day names the frames it builds on.
          </p>
          <p>
            <strong className="text-ink">Grammar serves conversation.</strong> Every lesson ends in a real situation — ordering food, asking for
            directions, a job interview — using the structure you just learned.
          </p>
          <p>
            <strong className="text-ink">Mistakes are information.</strong> When you get something wrong, you see exactly what was different and
            why. That item comes back for review until it sticks.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/lab" className={button("primary")}>
            Try the Sentence Lab
          </Link>
          <Link href="/curriculum" className={button("secondary")}>
            See all 33 days
          </Link>
        </div>
      </section>
    </>
  );
}
