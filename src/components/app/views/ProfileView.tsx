"use client";
import Link from "next/link";
import { useState } from "react";
import { useLearner } from "@/lib/learner/store";
import { setProfile, streak, completedDays } from "@/lib/learner/state";
import { useGameProgress, useRewards } from "@/lib/rewards/client";
import { BADGES, EMPTY_FACTS, type Badge, type Facts } from "@/lib/game/rewards";
import { levelTitle } from "@/lib/game/levels";
import { HEROES, type HeroId } from "@/content/quest";
import { heroUnlocked } from "@/lib/game/quest";
import { HeroArt } from "@/components/game/Creatures";
import { StatusCard } from "@/components/rewards/StatusCard";
import { BadgeMedal } from "@/components/rewards/BadgeMedal";
import { button, card } from "@/components/ui/styles";
import { IconLock } from "@/components/app/icons";
import { dayKey } from "@/lib/learner/state";

const GROUPS: Badge["group"][] = ["Learning", "Games", "Speaking", "Habits"];

export function ProfileView() {
  const { state, dispatch, user, hydrated } = useLearner();
  const { snapshot, status } = useRewards();
  const gp = useGameProgress();
  const [name, setName] = useState<string | null>(null);
  if (!hydrated) return <div className="h-64 animate-pulse rounded-2xl bg-surface-2" aria-busy="true" />;

  const facts: Facts = snapshot
    ? { ...snapshot.facts, totalXp: snapshot.totalXp, level: snapshot.level, bestStreak: snapshot.bestStreak }
    : { ...EMPTY_FACTS, lessons: completedDays(state).length, bestStreak: streak(state).best, words: Object.keys(state.vocab).length };
  const unlockFacts = { cleared: gp.cleared, crosswordsSolved: gp.crosswordCount, bestStreak: Math.max(gp.bestStreak, streak(state).best), level: gp.level };
  const avatar = (state.profile.avatar ?? "fox") as HeroId;
  const unlockedCount = Object.keys(snapshot?.badges ?? {}).length;

  // last 7 days of XP
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const k = dayKey(d);
    return { k, label: d.toLocaleDateString(undefined, { weekday: "short" }), xp: snapshot?.last7[k] ?? 0 };
  });
  const maxXp = Math.max(50, ...days.map((d) => d.xp));

  const saveName = () => {
    if (name === null) return;
    dispatch((s) => setProfile(s, { displayName: name.trim().slice(0, 80) || undefined }));
    setName(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[2rem] font-bold leading-tight tracking-[-0.02em]">{state.profile.displayName || "Your profile"}</h1>
          <p className="text-ink-2">{user?.email ?? "Guest on this device"}</p>
        </div>
        {name === null ? (
          <button className={button("secondary", "sm")} onClick={() => setName(state.profile.displayName ?? "")}>
            Edit name
          </button>
        ) : (
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              saveName();
            }}
          >
            <input autoFocus value={name} onChange={(e) => setName(e.target.value)} maxLength={80} aria-label="Display name" className="h-9 w-44 rounded-full border border-line-strong bg-surface px-4 text-sm" />
            <button className={button("primary", "sm")}>Save</button>
          </form>
        )}
      </div>

      <StatusCard />

      {/* stats */}
      <section aria-labelledby="stats">
        <h2 id="stats" className="mb-3 font-bold">
          Your statistics
        </h2>
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Total XP" value={snapshot?.totalXp ?? 0} />
          <Stat label="Best streak" value={facts.bestStreak} suffix=" days" />
          <Stat label="Lessons done" value={completedDays(state).length} suffix={` / 33`} />
          <Stat label="Words saved" value={Object.keys(state.vocab).length} />
          <Stat label="Crosswords" value={gp.crosswordCount} />
          <Stat label="Battles won" value={snapshot?.facts.questWins ?? gp.cleared.size} />
          <Stat label="Quest stars" value={gp.totalStars} suffix=" ★" />
          <Stat label="Speaking topics" value={gp.speakingDone.size} suffix=" / 20" />
        </dl>
      </section>

      {/* xp chart */}
      {snapshot && (
        <section aria-labelledby="week-xp" className={`${card} p-5`}>
          <div className="flex items-baseline justify-between">
            <h2 id="week-xp" className="font-bold">
              XP this week
            </h2>
            <span className="text-sm text-muted tabular-nums">{snapshot.weekXp.toLocaleString()} XP</span>
          </div>
          <ol className="mt-4 flex h-36 items-end gap-2" aria-label="XP per day, last 7 days">
            {days.map((d) => (
              <li key={d.k} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[0.7rem] font-bold tabular-nums text-muted">{d.xp || ""}</span>
                <span className="w-full max-w-10 rounded-t-lg transition-[height] duration-500" style={{ height: `${Math.max(4, (d.xp / maxXp) * 100)}px`, background: d.xp ? "var(--f-states)" : "var(--surface-2)" }} />
                <span className="text-[0.7rem] text-muted">{d.label}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* heroes */}
      <section aria-labelledby="heroes" className={`${card} p-5`}>
        <h2 id="heroes" className="font-bold">
          Choose your hero
        </h2>
        <p className="text-sm text-muted">Your hero appears on your profile and fights for you in Word Quest.</p>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {HEROES.map((h) => {
            const open = heroUnlocked(h.id, unlockFacts);
            const active = avatar === h.id;
            return (
              <li key={h.id}>
                <button
                  type="button"
                  disabled={!open}
                  onClick={() => dispatch((s) => setProfile(s, { avatar: h.id }))}
                  aria-pressed={active}
                  className={`relative flex w-full flex-col items-center rounded-2xl border p-3 text-center transition-colors ${active ? "border-ink bg-surface-2" : "border-line hover:border-line-strong"} disabled:cursor-not-allowed`}
                >
                  <HeroArt id={h.id} size={76} className={open ? "" : "opacity-30 grayscale"} />
                  {!open && (
                    <span className="absolute right-2 top-2 text-muted">
                      <IconLock />
                    </span>
                  )}
                  <span className="mt-1 font-bold leading-tight">{h.name}</span>
                  <span className="text-xs text-muted">{open ? h.perk : h.unlock}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {/* badges */}
      <section aria-labelledby="all-badges">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 id="all-badges" className="font-bold">
            Badges
          </h2>
          <span className="text-sm text-muted tabular-nums">
            {unlockedCount} / {BADGES.length}
          </span>
        </div>
        {status === "guest" && <p className="mb-3 rounded-xl bg-surface-2 p-3 text-sm text-ink-2">Badges are saved to your account. <Link href="/signup" className="font-bold underline">Create a free account</Link> to start collecting them.</p>}
        <div className="flex flex-col gap-5">
          {GROUPS.map((g) => (
            <div key={g}>
              <h3 className="mb-2 text-sm font-bold text-muted">{g}</h3>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {BADGES.filter((b) => b.group === g).map((b) => {
                  const got = !!snapshot?.badges[b.id];
                  const [v, t] = b.progress(facts);
                  return (
                    <li key={b.id} className={`${card} flex items-center gap-3 p-3`}>
                      <BadgeMedal group={b.group} unlocked={got} size={48} />
                      <div className="min-w-0">
                        <p className="font-bold leading-tight">{b.title}</p>
                        <p className="text-xs text-muted">{b.description}</p>
                        {!got && t > 1 && <p className="mt-0.5 text-xs font-bold tabular-nums text-ink-2">{v} / {t}</p>}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {snapshot && snapshot.recent.length > 0 && (
        <section aria-labelledby="recent" className={`${card} p-5`}>
          <h2 id="recent" className="font-bold">
            Recent rewards
          </h2>
          <ul className="mt-2 divide-y divide-line">
            {snapshot.recent.map((r, i) => (
              <li key={i} className="flex items-center justify-between gap-3 py-2 text-sm">
                <span className="text-ink-2">{describe(r.kind, r.ref)}</span>
                <span className="font-bold tabular-nums text-f-possession">{r.xp ? `+${r.xp} XP` : "—"}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
      <p className="text-sm text-muted">
        Level titles: {[1, 3, 5, 8, 12, 16, 20, 25].map((l) => `${l} ${levelTitle(l)}`).join(" · ")}
      </p>
    </div>
  );
}

function Stat({ label, value, suffix = "" }: { label: string; value: number; suffix?: string }) {
  return (
    <div className={`${card} p-4`}>
      <dt className="text-xs font-bold text-muted">{label}</dt>
      <dd className="mt-1 text-[1.5rem] font-black leading-none tabular-nums">
        {value.toLocaleString()}
        <span className="text-sm font-bold text-muted">{suffix}</span>
      </dd>
    </div>
  );
}

function describe(kind: string, ref: string) {
  switch (kind) {
    case "lesson_complete": return `Completed Day ${ref}`;
    case "lesson_replay": return `Practised Day ${ref.split("@")[0]} again`;
    case "lesson_perfect": return `Perfect score on Day ${ref}`;
    case "level_test": return `Passed the level test (Day ${ref})`;
    case "stage_complete": return `Finished the ${ref} stage`;
    case "crossword": return `Solved crossword ${ref}`;
    case "quest_clear": return `Cleared Word Quest stage ${ref.toUpperCase()}`;
    case "quest_win": return `Won a battle (${ref.split(":")[0].toUpperCase()})`;
    case "speaking": return `Speaking topic: ${ref.replace(/-/g, " ")}`;
    case "speaking_repeat": return `Speaking practice: ${ref.split("@")[0].replace(/-/g, " ")}`;
    case "word_saved": return `Saved "${ref}"`;
    case "daily": return "Daily challenge complete";
    case "daily_sweep": return "All daily challenges done";
    case "weekly": return "Weekly challenge complete";
    case "streak": return `${ref.split("@")[0]}-day streak bonus`;
    default: return kind;
  }
}
