import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/site/PageIntro";
import { CURRICULUM, STAGES, isFreeDay } from "@/content/curriculum";
import { frameById, frameClass } from "@/content/frames";

export const metadata: Metadata = { title: "Curriculum", description: "All 33 days of the Structa course." };

export default function CurriculumPage() {
  return (
    <>
      <PageIntro title="All 33 days">
        <p>Each day has a clear goal, connects to what came before, and ends with something you can do in real life.</p>
      </PageIntro>
      <div className="mx-auto flex max-w-6xl flex-col gap-14 px-4 sm:px-6">
        {STAGES.map((st) => (
          <section key={st.id} aria-labelledby={`st-${st.id}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-ink pb-3">
              <h2 id={`st-${st.id}`} className="text-xl font-bold">
                {st.name}
              </h2>
              <p className="text-sm text-muted">{st.summary}</p>
            </div>
            <ol className="divide-y divide-line">
              {CURRICULUM.filter((c) => c.day >= st.days[0] && c.day <= st.days[1]).map((c) => (
                <li key={c.day} className={`${frameClass(c.frame)} grid gap-1 py-4 sm:grid-cols-[5rem_1fr_11rem] sm:gap-4`}>
                  <span className="text-f font-bold tabular-nums">Day {c.day}</span>
                  <div>
                    <h3 className="font-bold">
                      {isFreeDay(c.day) ? (
                        <Link href={`/learn/${c.day}`} className="hover:underline">
                          {c.title}
                        </Link>
                      ) : (
                        c.title
                      )}
                    </h3>
                    <p className="text-ink-2">{c.objective}</p>
                    <p className="mt-1 text-sm text-muted">In practice: {c.scenario.toLowerCase()}</p>
                  </div>
                  <div className="flex items-start gap-2 text-sm sm:justify-end">
                    {c.frame && <span className="text-f font-bold">{frameById(c.frame).name}</span>}
                    <span className="text-muted">{c.minutes} min</span>
                    {isFreeDay(c.day) && <span className="rounded-full bg-surface-2 px-2 font-bold">Free</span>}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </>
  );
}
