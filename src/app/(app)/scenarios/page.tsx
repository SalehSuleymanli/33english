import type { Metadata } from "next";
import Link from "next/link";
import { SCENARIOS } from "@/content/scenarios";
import { isFreeDay } from "@/content/curriculum";
import { frameById } from "@/content/frames";
import { ScenarioDone } from "@/components/app/ScenarioDone";

export const metadata: Metadata = { title: "Conversations" };

export default function ScenariosPage() {
  const list = [...SCENARIOS].sort((a, b) => a.afterDay - b.afterDay);
  return (
    <div>
      <h1 className="text-[2rem] font-bold tracking-[-0.02em]">Conversations</h1>
      <p className="mt-1 max-w-2xl text-ink-2">Real situations built on the frames you&apos;re learning. Listen, role-play, check your understanding, and say the key lines yourself.</p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {list.map((s) => (
          <li key={s.id}>
            <Link href={`/scenarios/${s.id}`} className="flex h-full flex-col rounded-2xl border border-line bg-surface p-5 hover:border-line-strong">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-bold">{s.title}</h2>
                <ScenarioDone id={s.id} />
              </div>
              <p className="mt-1 flex-1 text-ink-2">{s.summary}</p>
              <p className="mt-3 flex flex-wrap items-center gap-x-2 text-sm text-muted">
                <span>Best after Day {s.afterDay}</span>
                <span aria-hidden>·</span>
                {s.frames.map((f) => (
                  <span key={f} className={`${frameById(f).className} text-f font-bold`}>
                    {frameById(f).name}
                  </span>
                ))}
                {!isFreeDay(s.afterDay) && <span className="rounded-full bg-surface-2 px-2 text-xs font-bold">Premium</span>}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
