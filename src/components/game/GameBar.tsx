"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import { useRewards } from "@/lib/rewards/client";
import { levelProgress } from "@/lib/game/levels";

/** Slim top bar for full-screen games: back, title, XP. */
export function GameBar({ title, back = "/games", onBack, right }: { title: ReactNode; back?: string; onBack?: () => void; right?: ReactNode }) {
  const { snapshot } = useRewards();
  const p = levelProgress(snapshot?.totalXp ?? 0);
  const backCls = "grid size-10 place-items-center rounded-full bg-surface text-ink shadow-[inset_0_0_0_1px_var(--line)] hover:bg-surface-2";
  return (
    <header className="sticky top-0 z-30 border-b border-line/60 bg-paper/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-3 px-4">
        {onBack ? (
          <button onClick={onBack} aria-label="Back" className={backCls}>
            ←
          </button>
        ) : (
          <Link href={back} aria-label="Back" className={backCls}>
            ←
          </Link>
        )}
        <div className="min-w-0 flex-1 truncate font-bold">{title}</div>
        {right}
        {snapshot && (
          <span className="flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-1 text-sm font-bold shadow-[inset_0_0_0_1px_var(--line)]" title={`Level ${p.level}`}>
            <span className="xp-coin grid size-5 place-items-center rounded-full text-[0.55rem] font-black text-[#5b3a00]">XP</span>
            <span className="tabular-nums">{snapshot.totalXp.toLocaleString()}</span>
          </span>
        )}
      </div>
    </header>
  );
}
