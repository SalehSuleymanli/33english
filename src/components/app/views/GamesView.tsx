"use client";
import Link from "next/link";
import { useGameProgress, useRewards } from "@/lib/rewards/client";
import { STAGES, WORLDS } from "@/content/quest";
import { CAPS } from "@/lib/game/rewards";
import { EnemyArt, HeroArt } from "@/components/game/Creatures";
import { useLearner } from "@/lib/learner/store";
import type { HeroId } from "@/content/quest";
import { WorldMap } from "@/components/game/WorldMap";

// a mid-war snapshot for the card: each region's owner (-1 = free)
const WAR_PREVIEW = [0, 0, -1, 1, 1, 2, 2, 2, 2, 1, -1, 3, 3, 3, 3, -1];

export function GamesView() {
  const gp = useGameProgress();
  const { snapshot } = useRewards();
  const { state } = useLearner();
  const hero = (state.profile.avatar ?? "fox") as HeroId;
  const nextStage = STAGES.find((s) => !gp.cleared.has(s.id));
  const worldNow = WORLDS.find((w) => w.id === (nextStage?.world ?? 4))!;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[2rem] font-bold leading-tight tracking-[-0.02em]">Games</h1>
        <p className="mt-1 text-ink-2">Play to practise. Every game uses the same six frames and real everyday vocabulary.</p>
      </div>

      <Link href="/play/conquest" className="group relative block overflow-hidden rounded-[1.75rem] border border-line text-white shadow-lift transition-transform hover:-translate-y-1" style={{ background: "linear-gradient(160deg, #0f1d3d, #2a1a4a 60%, #5a1e3a)" }}>
        <div className="relative p-6 pb-2 sm:p-8 sm:pb-2">
          <p className="text-xs font-black uppercase tracking-[0.16em] opacity-80">Live · 4 players · World conquest</p>
          <h2 className="mt-1 text-[2rem] font-black leading-tight">Word Empires</h2>
          <p className="mt-1 max-w-md opacity-90">Win English questions to claim land, attack your rivals and storm their capitals.</p>
          <span className="mt-4 inline-flex rounded-full bg-[#e84a5f] px-6 py-3 font-black text-white shadow-[0_5px_0_#9c2438] transition group-hover:-translate-y-0.5">⚔️ Go to war</span>
        </div>
        <div aria-hidden className="px-3 pb-3 opacity-90 sm:px-5 sm:pb-5">
          <WorldMap owner={WAR_PREVIEW} towers={[3, 3, 3, 3]} />
        </div>
      </Link>

      <Link href="/play/quest" className="group relative block overflow-hidden rounded-[1.75rem] border border-line p-6 shadow-lift transition-transform hover:-translate-y-1 sm:p-8" style={{ background: `linear-gradient(160deg, ${worldNow.sky[0]}, ${worldNow.sky[1]})` }}>
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-20" style={{ background: worldNow.ground, borderRadius: "50% 50% 0 0 / 30px 30px 0 0" }} />
        <div className={`relative z-10 max-w-sm ${worldNow.id === 4 ? "text-white" : "text-[#1d2340]"}`}>
          <p className="text-xs font-black uppercase tracking-[0.16em] opacity-70">Adventure · Battle</p>
          <h2 className="mt-1 text-[2rem] font-black leading-tight">Word Quest</h2>
          <p className="mt-1 opacity-85">Lead your animal hero through four worlds. Correct answers attack; mistakes let the Muddles strike back.</p>
          <p className="mt-3 text-sm font-bold">
            {gp.cleared.size} / {STAGES.length} stages · {gp.totalStars} ★ {nextStage ? `· Next: ${worldNow.name}` : "· Quest complete!"}
          </p>
          <span className="mt-4 inline-flex rounded-full bg-[#1d2340] px-6 py-3 font-black text-white transition group-hover:brightness-125">Play Word Quest</span>
        </div>
        <div aria-hidden className="pointer-events-none absolute bottom-3 right-3 flex items-end sm:right-8">
          <HeroArt id={hero} size={120} className="anim-bob" mood="happy" />
          <EnemyArt art={nextStage?.enemies[0].art ?? "muddle"} size={100} className="-ml-3" />
        </div>
      </Link>

      <Link href="/play/crossword" className="frame-existence group relative block overflow-hidden rounded-[1.75rem] border border-line bg-surface p-6 shadow-lift transition-transform hover:-translate-y-1 sm:p-8">
        <div aria-hidden className="absolute -right-6 -top-6 grid rotate-12 grid-cols-5 gap-1.5 opacity-90">
          {"WORDSCLUESPLAY·GRIDS".split("").map((ch, i) => (
            <span key={i} className={`grid size-10 place-items-center rounded-lg text-lg font-black ${ch === "·" ? "" : i % 3 === 0 ? "bg-f text-white dark:text-paper" : "bg-f-tint text-f"}`}>
              {ch === "·" ? "" : ch}
            </span>
          ))}
        </div>
        <div className="relative max-w-sm">
          <p className="text-f text-xs font-black uppercase tracking-[0.16em]">Puzzle · Vocabulary</p>
          <h2 className="mt-1 text-[2rem] font-black leading-tight">Crossword</h2>
          <p className="mt-1 text-ink-2">Definitions, synonyms and sentences with a gap. Three levels, new puzzles every time.</p>
          <p className="mt-3 text-sm font-bold">{gp.crosswordCount} solved</p>
          <span className="bg-f mt-4 inline-flex rounded-full px-6 py-3 font-black text-white transition group-hover:brightness-110 dark:text-paper">Play Crossword</span>
        </div>
      </Link>

      <p className="text-sm text-muted">
        Fair play: games can earn up to {CAPS.games} XP a day{snapshot ? ` (${snapshot.todayXp} XP earned today across everything)` : ""}. Lessons and speaking practice always earn XP — they&apos;re the heart of the method.
      </p>
    </div>
  );
}
