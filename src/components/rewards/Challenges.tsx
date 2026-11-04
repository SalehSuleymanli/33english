"use client";
import Link from "next/link";
import { useRewards } from "@/lib/rewards/client";
import { dailyChallenges, weeklyChallenges } from "@/lib/game/rewards";
import { dayKey } from "@/lib/learner/state";
import type { ChallengeState } from "@/lib/rewards/types";
import { card } from "@/components/ui/styles";
import { CHALLENGE_ICON, IconCheck } from "@/components/app/icons";

/** Daily (or weekly) challenges with live progress. Guests see them too, as a preview. */
export function Challenges({ kind = "daily" }: { kind?: "daily" | "weekly" }) {
  const { snapshot, status } = useRewards();
  const list: ChallengeState[] =
    (kind === "daily" ? snapshot?.daily : snapshot?.weekly) ??
    (kind === "daily" ? dailyChallenges(dayKey()) : weeklyChallenges(dayKey())).map((c) => ({ id: c.id, title: c.title, icon: c.icon, href: c.href, xp: c.xp, count: c.count, done: 0, claimed: false }));
  const doneCount = list.filter((c) => c.claimed).length;
  return (
    <section aria-labelledby={`${kind}-ch`} className={`${card} p-5`}>
      <div className="flex items-baseline justify-between gap-3">
        <h2 id={`${kind}-ch`} className="font-bold">
          {kind === "daily" ? "Daily challenges" : "Weekly challenges"}
        </h2>
        <span className="text-sm text-muted tabular-nums">
          {doneCount}/{list.length}
          {kind === "daily" && doneCount === list.length ? " · +50 bonus!" : ""}
        </span>
      </div>
      <ul className="mt-3 flex flex-col gap-2.5">
        {list.map((c) => {
          const Icon = CHALLENGE_ICON[c.icon] ?? CHALLENGE_ICON.star;
          const ratio = c.count ? c.done / c.count : 0;
          return (
            <li key={c.id}>
              <Link href={c.href} className={`flex items-center gap-3 rounded-2xl border p-3 transition-colors ${c.claimed ? "border-transparent bg-surface-2" : "border-line hover:border-line-strong"}`}>
                <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${c.claimed ? "bg-good text-white" : "bg-surface-2 text-ink-2"}`}>{c.claimed ? <IconCheck /> : <Icon />}</span>
                <span className="min-w-0 flex-1">
                  <span className={`block text-[0.95rem] font-bold leading-tight ${c.claimed ? "text-muted line-through decoration-2" : ""}`}>{c.title}</span>
                  <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-surface-2">
                    <span className="block h-full rounded-full bg-good transition-[width] duration-500" style={{ width: `${Math.round(ratio * 100)}%` }} />
                  </span>
                </span>
                <span className="shrink-0 text-right text-xs font-bold text-muted tabular-nums">
                  {c.done}/{c.count}
                  <span className="block text-f-possession">+{c.xp} XP</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      {status === "guest" && <p className="mt-3 text-xs text-muted">Sign in to complete challenges and collect XP.</p>}
    </section>
  );
}
