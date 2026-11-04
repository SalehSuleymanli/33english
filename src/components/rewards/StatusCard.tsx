"use client";
import Link from "next/link";
import { useLearner } from "@/lib/learner/store";
import { useRewards } from "@/lib/rewards/client";
import { levelProgress, levelTitle } from "@/lib/game/levels";
import { streak } from "@/lib/learner/state";
import { HeroArt } from "@/components/game/Creatures";
import { HEROES, type HeroId } from "@/content/quest";
import { button } from "@/components/ui/styles";
import { IconFlame } from "@/components/app/icons";

/** The learner's level, XP and streak at a glance. */
export function StatusCard({ compact = false }: { compact?: boolean }) {
  const { state, user } = useLearner();
  const { snapshot, status } = useRewards();
  const avatar = (HEROES.some((h) => h.id === state.profile.avatar) ? state.profile.avatar : "fox") as HeroId;
  const xp = snapshot?.totalXp ?? 0;
  const p = levelProgress(xp);
  const localStreak = streak(state);
  const currentStreak = snapshot ? snapshot.currentStreak : localStreak.current;
  const guest = status === "guest" || (!user && status !== "unavailable");
  const loading = status === "loading" || status === "idle";

  return (
    <section aria-label="Your level" className="relative overflow-hidden rounded-[1.5rem] border border-line bg-surface p-5 sm:p-6">
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full opacity-[0.13] level-burst" />
      <div className="relative flex items-center gap-4 sm:gap-5">
        <Link href="/profile" className="relative shrink-0" aria-label="Your profile">
          <span className="grid size-20 place-items-center rounded-full bg-surface-2 sm:size-24">
            <HeroArt id={avatar} size={compact ? 72 : 84} className="anim-bob" />
          </span>
          <span className="level-burst absolute -bottom-1 -right-1 grid size-9 place-items-center rounded-full text-sm font-black text-white" aria-label={`Level ${p.level}`}>
            {p.level}
          </span>
        </Link>
        <div className="min-w-0 flex-1">
          {guest ? (
            <>
              <p className="text-sm font-bold text-muted">Playing as a guest</p>
              <p className="text-lg font-bold leading-tight">Earn XP, level up and unlock heroes</p>
              <Link href="/signup" className={`${button("primary", "sm")} mt-3`}>
                Create free account
              </Link>
            </>
          ) : (
            <>
              <p className="text-sm font-bold text-muted">
                Level {p.level} · {levelTitle(p.level)}
              </p>
              <p className="text-[1.6rem] font-black leading-tight tabular-nums">{loading && !snapshot ? "…" : `${xp.toLocaleString()} XP`}</p>
              <div className="mt-2 h-3 overflow-hidden rounded-full bg-surface-2" role="progressbar" aria-label="Progress to next level" aria-valuenow={p.into} aria-valuemin={0} aria-valuemax={p.span}>
                <div className="h-full rounded-full transition-[width] duration-700" style={{ width: `${Math.max(3, p.ratio * 100)}%`, background: "linear-gradient(90deg, var(--f-existence), var(--f-states), var(--f-modals))" }} />
              </div>
              <p className="mt-1 text-xs text-muted tabular-nums">{p.toNext.toLocaleString()} XP to level {p.level + 1}</p>
            </>
          )}
        </div>
        <div className="hidden shrink-0 flex-col items-end gap-2 sm:flex">
          <Stat label="day streak" value={currentStreak} flame />
          {snapshot && <Stat label="XP today" value={snapshot.todayXp} />}
        </div>
      </div>
      <div className="mt-4 flex gap-2 sm:hidden">
        <Stat label="day streak" value={currentStreak} flame />
        {snapshot && <Stat label="XP today" value={snapshot.todayXp} />}
      </div>
    </section>
  );
}

function Stat({ label, value, flame }: { label: string; value: number; flame?: boolean }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-surface-2 px-3 py-2">
      {flame && (
        <span className={value > 0 ? "text-f-actions" : "text-muted"}>
          <IconFlame />
        </span>
      )}
      <span className="text-lg font-black tabular-nums leading-none">{value}</span>
      <span className="text-xs text-muted">{label}</span>
    </div>
  );
}
