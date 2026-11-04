"use client";
import { useState } from "react";
import { HEROES, STAGES, WORLDS, stageById, type HeroId } from "@/content/quest";
import { heroUnlocked, isStageOpen, powerFromStars } from "@/lib/game/quest";
import { useGameProgress } from "@/lib/rewards/client";
import { useLearner } from "@/lib/learner/store";
import { setProfile, streak } from "@/lib/learner/state";
import { EnemyArt, HeroArt } from "./Creatures";
import { GameBar } from "./GameBar";
import { BattleScreen } from "./QuestBattle";
import { IconLock } from "@/components/app/icons";

export function QuestGame() {
  const gp = useGameProgress();
  const { state, dispatch, hydrated } = useLearner();
  const [stageId, setStageId] = useState<string | null>(null);
  const [run, setRun] = useState(0);
  // dates are only read in the browser, after hydration
  const localBest = hydrated ? streak(state).best : 0;
  const facts = { cleared: gp.cleared, crosswordsSolved: gp.crosswordCount, bestStreak: Math.max(gp.bestStreak, localBest), level: gp.level };
  const chosen = (state.profile.avatar ?? "fox") as HeroId;
  const hero: HeroId = heroUnlocked(chosen, facts) ? chosen : "fox";
  const power = powerFromStars(gp.totalStars);

  if (stageId)
    return (
      <BattleScreen
        key={`${stageId}-${run}`}
        stage={stageById(stageId)!}
        hero={hero}
        power={power}
        firstClear={!gp.cleared.has(stageId)}
        onExit={() => setStageId(null)}
        onRetry={() => setRun((r) => r + 1)}
        onNext={(id) => {
          setStageId(id);
          setRun((r) => r + 1);
        }}
      />
    );

  return (
    <>
      <GameBar title="Word Quest" />
      <main className="mx-auto max-w-5xl px-4 pb-20 pt-6">
        <section className="relative overflow-hidden rounded-[1.75rem] border border-line p-6 pb-36 sm:p-8 sm:pb-8" style={{ background: "linear-gradient(160deg, #bfe8ff, #fff3d6)" }}>
          <div className="relative z-10 max-w-md text-[#1d2340]">
            <p className="text-sm font-black uppercase tracking-[0.16em] opacity-70">An English adventure</p>
            <h1 className="mt-1 text-[2.4rem] font-black leading-[1.05] tracking-[-0.02em]">Word Quest</h1>
            <p className="mt-2 opacity-80">The Muddles have scrambled every sentence in the land. Answer correctly to attack — every battle teaches one of the six frames.</p>
          </div>
          <div className="pointer-events-none absolute -bottom-3 right-2 flex items-end sm:right-10">
            <HeroArt id={hero} size={130} className="anim-bob" mood="happy" />
            <EnemyArt art="slime" size={90} className="-ml-4 opacity-90" />
          </div>
        </section>

        {/* hero picker */}
        <section aria-labelledby="pick-hero" className="mt-6">
          <div className="flex items-baseline justify-between">
            <h2 id="pick-hero" className="font-bold">
              Your hero
            </h2>
            <span className="text-sm text-muted">
              Power +{power} <span className="hidden sm:inline">· every 5 ★ adds +1 attack</span>
            </span>
          </div>
          <ul className="mt-3 flex gap-3 overflow-x-auto pb-2">
            {HEROES.map((h) => {
              const open = heroUnlocked(h.id, facts);
              const on = hero === h.id;
              return (
                <li key={h.id} className="shrink-0">
                  <button
                    disabled={!open}
                    onClick={() => dispatch((s) => setProfile(s, { avatar: h.id }))}
                    aria-pressed={on}
                    className={`relative flex w-32 flex-col items-center rounded-2xl border p-2.5 text-center ${on ? "border-ink bg-surface shadow-lift" : "border-line bg-surface/70"} disabled:cursor-not-allowed`}
                  >
                    <HeroArt id={h.id} size={70} className={open ? "" : "opacity-25 grayscale"} />
                    {!open && (
                      <span className="absolute right-2 top-2 text-muted">
                        <IconLock />
                      </span>
                    )}
                    <span className="text-sm font-bold">
                      {h.name} <span className="font-normal text-muted">the {h.species}</span>
                    </span>
                    <span className="text-[0.7rem] leading-tight text-muted">{open ? `❤ ${h.hp} · ⚔ ${h.atk + power}` : h.unlock}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {/* worlds */}
        <div className="mt-6 flex flex-col gap-5">
          {WORLDS.map((w) => {
            const stages = STAGES.filter((s) => s.world === w.id);
            const worldOpen = isStageOpen(stages[0].id, gp.cleared);
            const dark = w.id === 4;
            return (
              <section key={w.id} aria-labelledby={`w${w.id}`} className="relative overflow-hidden rounded-[1.5rem] border border-line" style={{ background: `linear-gradient(180deg, ${w.sky[0]}, ${w.sky[1]})` }}>
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-16" style={{ background: w.ground, borderRadius: "50% 50% 0 0 / 30px 30px 0 0" }} />
                <div className={`relative p-5 ${dark ? "text-white" : "text-[#1d2340]"}`}>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.14em] opacity-70">World {w.id}</p>
                      <h2 id={`w${w.id}`} className="text-[1.5rem] font-black leading-tight">
                        {w.name}
                      </h2>
                      <p className="text-sm opacity-80">{w.tagline}</p>
                    </div>
                    {!worldOpen && (
                      <span className="flex items-center gap-1 rounded-full bg-black/25 px-3 py-1 text-sm font-bold text-white">
                        <IconLock /> Beat the previous boss
                      </span>
                    )}
                  </div>
                  <ol className="mt-5 grid grid-cols-5 gap-2 pb-3 sm:gap-4">
                    {stages.map((s) => {
                      const open = isStageOpen(s.id, gp.cleared);
                      const stars = gp.stars[s.id] ?? 0;
                      const done = gp.cleared.has(s.id);
                      return (
                        <li key={s.id} className="flex flex-col items-center">
                          <button
                            disabled={!open}
                            onClick={() => setStageId(s.id)}
                            aria-label={`${s.boss ? "Boss: " + s.title : `Stage ${s.n}`}${done ? `, ${stars} stars` : open ? "" : ", locked"}`}
                            className={`relative grid place-items-center rounded-full border-4 font-black transition-transform enabled:hover:scale-105 ${s.boss ? "size-20 sm:size-24" : "size-14 sm:size-16"} ${
                              done ? "border-white bg-[#ffcf5c] text-[#5b3a00]" : open ? "anim-pulse-ring border-white bg-white text-[#1d2340]" : "border-white/50 bg-black/20 text-white/70"
                            }`}
                          >
                            {s.boss ? <EnemyArt art={s.enemies[0].art} size={s.boss ? 64 : 40} className={open ? "" : "opacity-40 grayscale"} /> : open ? s.n : <IconLock />}
                          </button>
                          <span className="mt-1 h-4 text-sm leading-none text-[#f5b82e] drop-shadow-[0_1px_0_rgba(0,0,0,0.35)]" aria-hidden>
                            {done ? "★".repeat(stars) + "☆".repeat(3 - stars) : ""}
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </section>
            );
          })}
        </div>
        <HowToPlay />
      </main>
    </>
  );
}

function HowToPlay() {
  return (
    <section className="mt-8 grid gap-3 text-sm sm:grid-cols-4">
      {[
        ["Answer to attack", "A correct answer makes your hero strike. A wrong one lets the enemy hit back."],
        ["Build a combo", "Three right in a row charges your Power Strike: 2.5× damage."],
        ["Use your items", "Potions heal 40 ❤. Shields block one hit. Defeated enemies drop more."],
        ["Learn from every turn", "After each answer you get a short rule, so mistakes turn into progress."],
      ].map(([t, b]) => (
        <div key={t} className="rounded-2xl bg-surface/80 p-4">
          <p className="font-bold">{t}</p>
          <p className="text-ink-2">{b}</p>
        </div>
      ))}
    </section>
  );
}
