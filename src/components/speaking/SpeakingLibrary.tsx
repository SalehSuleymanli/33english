"use client";
import Link from "next/link";
import { useState } from "react";
import { SPEAKING, type SpeakingTopic } from "@/content/speaking";
import { useGameProgress } from "@/lib/rewards/client";
import { dayKey } from "@/lib/learner/state";
import { useLearner } from "@/lib/learner/store";
import { hashString } from "@/lib/game/rng";
import { XP } from "@/lib/game/rewards";
import { card } from "@/components/ui/styles";
import { IconCheck, IconMic } from "@/components/app/icons";

const CATS = ["All", "People", "Places", "Daily life", "Experiences", "Future", "Things I love"] as const;
const LEVEL_TONE: Record<SpeakingTopic["level"], string> = { Beginner: "frame-existence", Intermediate: "frame-states", Confident: "frame-modals" };

export function SpeakingLibrary() {
  const { speakingDone } = useGameProgress();
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const { hydrated } = useLearner();
  // the date is only read in the browser, after hydration
  const today = hydrated ? SPEAKING[hashString(dayKey()) % SPEAKING.length] : SPEAKING[0];
  const list = SPEAKING.filter((t) => cat === "All" || t.category === cat);
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[2rem] font-bold leading-tight tracking-[-0.02em]">Speaking</h1>
        <p className="mt-1 max-w-2xl text-ink-2">
          Everyday topics people actually enjoy talking about. Each one has a speaking card, a natural sample answer, and a grammar-rich answer that shows the six frames at work.
        </p>
        <p className="mt-2 text-sm font-bold text-muted">
          {speakingDone.size} of {SPEAKING.length} topics practised · +{XP.speaking} XP for each new topic
        </p>
      </div>

      <Link href={`/speaking/${today.id}`} className="frame-modals group relative block overflow-hidden rounded-[1.5rem] border border-line bg-surface p-6 shadow-lift transition-transform hover:-translate-y-0.5">
        <div className="bg-f-tint absolute -right-10 -top-10 size-44 rounded-full" aria-hidden />
        <div className="relative">
          <p className="text-f text-xs font-black uppercase tracking-[0.16em]">Topic of the day</p>
          <h2 className="mt-1 text-[1.6rem] font-bold leading-tight">{today.title}</h2>
          <p className="mt-1 text-ink-2">{today.description}</p>
          <span className="bg-f mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-bold text-white dark:text-paper">
            <IconMic /> Practise now
          </span>
        </div>
      </Link>

      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1" role="tablist" aria-label="Categories">
        {CATS.map((c) => (
          <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`h-9 shrink-0 rounded-full px-4 text-sm font-bold ${cat === c ? "bg-ink text-paper" : "bg-surface text-ink-2 shadow-[inset_0_0_0_1px_var(--line)]"}`}>
            {c}
          </button>
        ))}
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {list.map((t) => {
          const done = speakingDone.has(t.id);
          return (
            <li key={t.id}>
              <Link href={`/speaking/${t.id}`} className={`${card} ${LEVEL_TONE[t.level]} flex h-full flex-col p-5 transition-colors hover:border-line-strong`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="bg-f-tint text-f rounded-full px-2.5 py-0.5 text-xs font-black">{t.level}</span>
                  {done ? (
                    <span className="flex items-center gap-1 text-sm font-bold text-good">
                      <IconCheck /> Done
                    </span>
                  ) : (
                    <span className="text-xs text-muted">
                      {t.category} · {t.minutes} min
                    </span>
                  )}
                </div>
                <h2 className="mt-2 text-lg font-bold leading-tight">{t.title}</h2>
                <p className="mt-1 text-sm text-ink-2">{t.description}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
