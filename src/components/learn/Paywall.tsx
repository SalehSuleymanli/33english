import Link from "next/link";
import type { LessonSummary } from "@/content/types";
import { FREE_DAYS } from "@/content/curriculum";
import { frameClass } from "@/content/frames";
import { button } from "@/components/ui/styles";
import { PREMIUM_FEATURES } from "@/lib/pricing";

export function Paywall({ summary, signedIn }: { summary: LessonSummary; signedIn: boolean }) {
  return (
    <div className={`${frameClass(summary.frame)} mx-auto max-w-xl px-4 py-16 sm:py-24`}>
      <Link href="/course" className="text-sm font-bold text-muted hover:text-ink">
        ← Course
      </Link>
      <p className="text-f mt-8 font-bold">Day {summary.day} · Premium</p>
      <h1 className="mt-1 text-[2.2rem] font-bold leading-tight tracking-[-0.02em]">{summary.title}</h1>
      <p className="mt-3 text-lg text-ink-2">{summary.objective}</p>
      <div className="mt-8 rounded-[var(--radius-card)] border border-line bg-surface p-6">
        <p className="font-bold">Days 1–{FREE_DAYS} are free. This day is part of Premium.</p>
        <ul className="mt-3 flex list-disc flex-col gap-1 pl-5 text-ink-2">
          {PREMIUM_FEATURES.slice(0, 4).map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={signedIn ? "/billing" : "/signup?next=/billing"} className={button("primary")}>
            {signedIn ? "See Premium plans" : "Create an account to upgrade"}
          </Link>
          <Link href="/practice" className={button("secondary")}>
            Practice what you&apos;ve learned
          </Link>
        </div>
      </div>
    </div>
  );
}
