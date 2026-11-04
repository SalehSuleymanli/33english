"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useRewards, type Celebration } from "@/lib/rewards/client";
import { badgeById } from "@/lib/game/rewards";
import { levelTitle } from "@/lib/game/levels";
import { button } from "@/components/ui/styles";
import { BadgeMedal } from "./BadgeMedal";
import { Confetti } from "./Confetti";

/** XP, level-ups, badges and the guest nudge — one at a time, never blocking for long. */
export function Celebrations() {
  const { celebrations, dismiss } = useRewards();
  const guestShown = useRef(false);
  const level = celebrations.find((c) => c.type === "level");
  const toasts = celebrations.filter((c) => c.type !== "level");

  // only nudge guests once per visit
  useEffect(() => {
    for (const c of celebrations) {
      if (c.type !== "guest") continue;
      if (guestShown.current) dismiss(c.id);
      else guestShown.current = true;
    }
  }, [celebrations, dismiss]);

  return (
    <>
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 top-3 z-[60] flex flex-col items-center gap-2 px-4">
        {toasts.slice(0, 3).map((c) => (
          <Toast key={c.id} c={c} onDone={() => dismiss(c.id)} />
        ))}
      </div>
      {level && level.type === "level" && <LevelUp level={level.level} onClose={() => dismiss(level.id)} />}
    </>
  );
}

function Toast({ c, onDone }: { c: Celebration; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, c.type === "guest" ? 8000 : c.type === "xp" ? 3800 : 5200);
    return () => clearTimeout(t);
  }, [c, onDone]);

  if (c.type === "xp")
    return (
      <div className="anim-drop pointer-events-auto flex max-w-sm items-center gap-3 rounded-2xl border border-line bg-surface py-2.5 pl-2.5 pr-4 shadow-lift">
        <span className="xp-coin grid size-10 shrink-0 place-items-center rounded-full text-sm font-black text-[#5b3a00]">XP</span>
        <div className="min-w-0">
          <p className="text-lg font-black leading-tight tabular-nums">+{c.total} XP</p>
          <p className="truncate text-sm text-muted">{c.grants.map((g) => g.label).join(" · ")}</p>
        </div>
      </div>
    );
  if (c.type === "badge") {
    const b = badgeById(c.badgeId);
    if (!b) return null;
    return (
      <div className="anim-drop pointer-events-auto flex max-w-sm items-center gap-3 rounded-2xl border border-line bg-surface p-3 pr-4 shadow-lift">
        <BadgeMedal group={b.group} unlocked size={44} />
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wide text-muted">Badge unlocked</p>
          <p className="font-bold leading-tight">{b.title}</p>
          <p className="text-sm text-muted">{b.description}</p>
        </div>
        <button onClick={onDone} className="ml-1 self-start text-sm text-muted hover:text-ink" aria-label="Dismiss">
          ✕
        </button>
      </div>
    );
  }
  if (c.type === "guest")
    return (
      <div className="anim-drop pointer-events-auto w-full max-w-sm rounded-2xl border border-line bg-surface p-4 shadow-lift">
        <p className="font-bold">Nice work! Want to keep your XP?</p>
        <p className="mt-0.5 text-sm text-muted">Create a free account to earn XP, unlock badges and save your games on every device.</p>
        <div className="mt-3 flex gap-2">
          <Link href="/signup" className={button("primary", "sm")} onClick={onDone}>
            Create free account
          </Link>
          <button onClick={onDone} className={button("ghost", "sm")}>
            Later
          </button>
        </div>
      </div>
    );
  return null;
}

function LevelUp({ level, onClose }: { level: number; onClose: () => void }) {
  const btn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    btn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="levelup-title" className="fixed inset-0 z-[70] grid place-items-center bg-ink/40 p-4 backdrop-blur-sm">
      <Confetti />
      <div className="anim-zoom relative w-full max-w-sm overflow-hidden rounded-[1.75rem] border border-line bg-surface p-8 text-center shadow-lift">
        <div className="level-burst mx-auto grid size-28 place-items-center rounded-full">
          <span className="text-5xl font-black text-white drop-shadow">{level}</span>
        </div>
        <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-muted">Level up!</p>
        <h2 id="levelup-title" className="mt-1 text-[1.75rem] font-bold leading-tight tracking-[-0.02em]">
          You&apos;re now a {levelTitle(level)}
        </h2>
        <p className="mt-2 text-ink-2">Every lesson, game and conversation brought you here. Keep going!</p>
        <button ref={btn} onClick={onClose} className={`${button("primary", "lg")} mt-6 w-full`}>
          Keep learning
        </button>
      </div>
    </div>
  );
}
