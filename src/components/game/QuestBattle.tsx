"use client";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { STAGES, worldById, type HeroId, type Stage } from "@/content/quest";
import { KIND_LABEL, currentEnemy, currentQuestion, heroById, questXp, startBattle, starsFor, step, type Action, type Battle, type Question } from "@/lib/game/quest";
import { useRewards } from "@/lib/rewards/client";
import { frameById } from "@/content/frames";
import { EnemyArt, HeroArt } from "./Creatures";
import { GameBar } from "./GameBar";
import { Confetti } from "@/components/rewards/Confetti";
import { button } from "@/components/ui/styles";

/* ------------------------------------------------------------------ battle */

type Feedback = { ok: boolean; q: Question; given: string; dmg: number; crit: boolean; hurt: number; blocked: boolean; rage: boolean; drop?: "potion" | "shield"; defeated?: string };
type Anim = { hero: string; enemy: string; key: number; floats: { id: number; text: string; side: "hero" | "enemy"; tone: string }[] };

export function BattleScreen({ stage, hero, power, firstClear, onExit, onRetry, onNext }: { stage: Stage; hero: HeroId; power: number; firstClear: boolean; onExit: () => void; onRetry: () => void; onNext: (id: string) => void }) {
  const { claim, status } = useRewards();
  const world = worldById(stage.world);
  const [seed] = useState(() => 1 + Math.floor(Math.random() * 2_000_000_000));
  const [b, setB] = useState<Battle>(() => startBattle(stage.id, seed, hero, power));
  const [log, setLog] = useState<Action[]>([]);
  const [fb, setFb] = useState<Feedback | null>(null);
  const [anim, setAnim] = useState<Anim>({ hero: "", enemy: "", key: 0, floats: [] });
  const [mistakes, setMistakes] = useState<{ q: Question; given: string }[]>([]);
  const [result, setResult] = useState<{ xp: number | null; message?: string }>({ xp: null });
  const [ended, setEnded] = useState(false);
  const floatId = useRef(0);
  const enemy = currentEnemy(b);
  const q = useMemo(() => currentQuestion(b), [b]);
  const heroInfo = heroById(hero)!;
  const dark = world.id === 4;

  const pushFloat = (text: string, side: "hero" | "enemy", tone: string) => {
    const id = ++floatId.current;
    setAnim((a) => ({ ...a, floats: [...a.floats, { id, text, side, tone }] }));
    setTimeout(() => setAnim((a) => ({ ...a, floats: a.floats.filter((f) => f.id !== id) })), 950);
  };

  const act = (a: Action) => {
    if (b.status !== "playing" || (a.t === "answer" && fb)) return;
    const next = step(b, a);
    if (next === b) return;
    const newLog = [...log, a];
    setLog(newLog);
    setB(next);
    const k = anim.key + 1;
    if (a.t === "potion") {
      pushFloat(`+${next.hp - b.hp} ❤`, "hero", "text-good");
      setAnim((x) => ({ ...x, key: k, hero: "anim-zoom", enemy: "" }));
      return;
    }
    if (a.t === "shield" || a.t === "special") {
      setAnim((x) => ({ ...x, key: k, hero: "anim-zoom", enemy: "" }));
      return;
    }
    const hit = next.fx.find((f) => f.type === "hit");
    const hurts = next.fx.filter((f) => f.type === "hurt");
    const defeat = next.fx.find((f) => f.type === "defeat");
    const hurtTotal = hurts.reduce((n, f) => n + (f.type === "hurt" ? f.dmg : 0), 0);
    const fbk: Feedback = {
      ok: !!next.lastCorrect,
      q,
      given: a.a,
      dmg: hit && hit.type === "hit" ? hit.dmg : 0,
      crit: !!(hit && hit.type === "hit" && hit.crit),
      hurt: hurtTotal,
      blocked: hurts.some((f) => f.type === "hurt" && f.blocked),
      rage: hurts.some((f) => f.type === "hurt" && f.rage),
      drop: defeat && defeat.type === "defeat" ? defeat.drop : undefined,
      defeated: defeat && defeat.type === "defeat" ? defeat.enemy : undefined,
    };
    setFb(fbk);
    if (!next.lastCorrect) setMistakes((m) => [...m, { q, given: a.a }]);
    if (hit && hit.type === "hit") pushFloat(`−${hit.dmg}${hit.crit ? "!" : ""}`, "enemy", hit.crit ? "text-f-possession" : "text-white");
    if (hurtTotal) pushFloat(`−${hurtTotal}`, "hero", "text-bad");
    else if (fbk.blocked) pushFloat("Blocked!", "hero", "text-f-passive");
    setAnim((x) => ({
      ...x,
      key: k,
      hero: next.lastCorrect ? "anim-lunge" : hurtTotal ? "anim-hurt" : "",
      enemy: next.lastCorrect ? (defeat ? "anim-faint" : "anim-hurt") : "anim-lunge-back",
    }));
    if (next.status !== "playing") finish(next, newLog);
  };

  const finish = (end: Battle, fullLog: Action[]) => {
    const stars = starsFor(end);
    setTimeout(() => setEnded(true), 1100);
    void claim({ type: "quest", stageId: stage.id, seed, hero, power, log: fullLog }, { won: end.status === "won", stars }, { quiet: end.status !== "won" }).then((r) => {
      const xp = r ? r.granted.filter((g) => g.kind === "quest_clear" || g.kind === "quest_win").reduce((n, g) => n + g.xp, 0) : 0;
      setResult({ xp, message: r ? r.message : end.status === "won" ? "Your XP wasn't saved — check your connection and that you're signed in." : undefined });
    });
  };

  const next = () => {
    setFb(null);
    setAnim((a) => ({ ...a, hero: "", enemy: "" }));
  };

  // correct answers move on by themselves after a short beat
  useEffect(() => {
    if (!fb || !fb.ok || b.status !== "playing") return;
    const t = setTimeout(next, 1500);
    return () => clearTimeout(t);
  }, [fb, b.status]);

  if (ended && b.status !== "playing")
    return <BattleResult battle={b} stage={stage} firstClear={firstClear} result={result} guest={status === "guest"} mistakes={mistakes} onExit={onExit} onRetry={onRetry} onNext={onNext} />;

  const hpPct = (b.hp / b.maxHp) * 100;
  const ePct = (b.enemyHp / enemy.hp) * 100;

  return (
    <div className="flex min-h-dvh flex-col">
      <GameBar title={`${world.name} · ${stage.boss ? "Boss" : `Stage ${stage.n}`}`} onBack={onExit} />
      {/* battlefield */}
      <section aria-label="Battlefield" className="relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${world.sky[0]}, ${world.sky[1]})` }}>
        <Clouds dark={dark} />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[34%]" style={{ background: world.ground, borderRadius: "50% 50% 0 0 / 26px 26px 0 0" }} />
        <div className="relative mx-auto grid max-w-3xl grid-cols-2 gap-4 px-4 pb-3 pt-4">
          <Fighter
            side="hero"
            name={heroInfo.name}
            hp={b.hp}
            max={b.maxHp}
            pct={hpPct}
            dark={dark}
            extra={
              <span className="flex gap-1 text-[0.7rem] font-black">
                {b.combo > 1 && <span className="rounded-full bg-[#ffcf5c] px-1.5 text-[#5b3a00]">×{b.combo} combo</span>}
                {b.specialArmed && <span className="rounded-full bg-[#e84a5f] px-1.5 text-white">POWER!</span>}
              </span>
            }
          >
            <div key={`h${anim.key}`} className={`relative ${anim.hero}`}>
              {b.shieldUp && <span aria-label="Shield up" className="absolute inset-[-6%] rounded-full border-4 border-[#73b3f2] bg-[#73b3f2]/20" />}
              <HeroArt id={hero} size={132} mood={fb && !fb.ok ? "hurt" : fb?.ok ? "happy" : "idle"} className="mx-auto" />
            </div>
            {anim.floats.filter((f) => f.side === "hero").map((f) => (
              <span key={f.id} className={`float-dmg pointer-events-none absolute left-1/2 top-6 text-2xl font-black drop-shadow-[0_2px_0_rgba(0,0,0,0.4)] ${f.tone}`}>
                {f.text}
              </span>
            ))}
          </Fighter>
          <Fighter
            side="enemy"
            name={enemy.name}
            hp={Math.max(0, b.enemyHp)}
            max={enemy.hp}
            pct={ePct}
            dark={dark}
            extra={
              <span className="flex gap-1" aria-label={`Enemy ${b.enemyIdx + 1} of ${stage.enemies.length}`}>
                {stage.enemies.map((_, i) => (
                  <span key={i} className={`size-2 rounded-full ${i < b.enemyIdx ? "bg-black/25" : i === b.enemyIdx ? "bg-[#e84a5f]" : "bg-white/80"}`} />
                ))}
              </span>
            }
          >
            <div key={`e${anim.key}-${b.enemyIdx}`} className={`${anim.enemy}`}>
              <EnemyArt art={enemy.art} size={enemy.boss ? 150 : 128} mood={fb?.ok ? "hurt" : "idle"} className="mx-auto" />
            </div>
            {anim.floats.filter((f) => f.side === "enemy").map((f) => (
              <span key={f.id} className={`float-dmg pointer-events-none absolute left-1/2 top-6 text-3xl font-black drop-shadow-[0_2px_0_rgba(0,0,0,0.5)] ${f.tone}`}>
                {f.text}
              </span>
            ))}
          </Fighter>
        </div>
        {b.turn === 0 && !fb && (
          <p className={`relative mx-auto mb-2 w-fit rounded-full px-4 py-1 text-sm font-bold italic ${dark ? "bg-black/30 text-white" : "bg-white/80 text-[#1d2340]"}`}>“{enemy.taunt}”</p>
        )}
      </section>

      {/* items */}
      <div className="mx-auto flex w-full max-w-3xl items-center gap-2 px-4 pt-3">
        <ItemButton label="Potion" icon="🧪" count={b.potions} disabled={!b.potions || b.hp >= b.maxHp || !!fb} onClick={() => act({ t: "potion" })} hint="Heal 40" />
        <ItemButton label="Shield" icon="🛡️" count={b.shields} disabled={!b.shields || b.shieldUp || !!fb} onClick={() => act({ t: "shield" })} hint={b.shieldUp ? "Active" : "Block a hit"} />
        <button
          onClick={() => act({ t: "special" })}
          disabled={!b.specialReady || !!fb}
          className={`ml-auto flex h-12 items-center gap-2 rounded-2xl px-4 font-black transition ${b.specialReady ? "anim-pulse-ring bg-[#e84a5f] text-white" : b.specialArmed ? "bg-[#e84a5f]/20 text-[#e84a5f]" : "bg-surface-2 text-muted"} disabled:cursor-not-allowed`}
        >
          ⚡ {b.specialArmed ? "Armed!" : "Power Strike"}
          {!b.specialReady && !b.specialArmed && <span className="text-xs font-bold tabular-nums">{b.combo % 3}/3</span>}
        </button>
      </div>

      {/* question */}
      <section aria-live="polite" className="mx-auto w-full max-w-3xl flex-1 px-4 pb-8 pt-3">
        {fb ? <FeedbackPanel fb={fb} onNext={next} ending={b.status !== "playing"} /> : <QuestionPanel key={q.id} q={q} onAnswer={(a) => act({ t: "answer", a })} />}
      </section>
    </div>
  );
}

function Clouds({ dark }: { dark: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-70">
      {[0, 1, 2].map((i) => (
        <span key={i} className="absolute block h-6 w-24 rounded-full" style={{ top: `${10 + i * 14}%`, left: 0, background: dark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.75)", animation: `drift ${38 + i * 14}s linear ${-i * 11}s infinite` }} />
      ))}
    </div>
  );
}

function Fighter({ side, name, hp, max, pct, dark, extra, children }: { side: "hero" | "enemy"; name: string; hp: number; max: number; pct: number; dark: boolean; extra?: React.ReactNode; children: React.ReactNode }) {
  const color = pct > 50 ? "#3fbf6f" : pct > 25 ? "#f5b82e" : "#e84a5f";
  return (
    <div className="relative flex flex-col">
      <div className={`rounded-2xl p-2 ${dark ? "bg-black/30 text-white" : "bg-white/80 text-[#1d2340]"} shadow-sm backdrop-blur`}>
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm font-black">{name}</span>
          {extra}
        </div>
        <div className="mt-1 h-3 overflow-hidden rounded-full bg-black/15" role="progressbar" aria-label={`${name} health`} aria-valuenow={hp} aria-valuemin={0} aria-valuemax={max}>
          <div className="h-full rounded-full transition-[width] duration-500" style={{ width: `${Math.max(0, pct)}%`, background: color }} />
        </div>
        <p className="mt-0.5 text-right text-[0.7rem] font-bold tabular-nums opacity-80">
          {hp} / {max}
        </p>
      </div>
      <div className={`relative mt-2 flex min-h-36 items-end ${side === "enemy" ? "justify-end" : "justify-start"}`}>{children}</div>
    </div>
  );
}

function ItemButton({ label, icon, count, disabled, onClick, hint }: { label: string; icon: string; count: number; disabled: boolean; onClick: () => void; hint: string }) {
  return (
    <button onClick={onClick} disabled={disabled} className="flex h-12 items-center gap-2 rounded-2xl bg-surface px-3 shadow-[inset_0_0_0_1px_var(--line)] transition enabled:hover:shadow-[inset_0_0_0_1.5px_var(--ink)] disabled:opacity-50" aria-label={`${label}: ${count} left. ${hint}`}>
      <span className="text-xl" aria-hidden>
        {icon}
      </span>
      <span className="text-left leading-tight">
        <span className="block text-sm font-black tabular-nums">×{count}</span>
        <span className="block text-[0.68rem] text-muted">{hint}</span>
      </span>
    </button>
  );
}

function QuestionPanel({ q, onAnswer }: { q: Question; onAnswer: (a: string) => void }) {
  const [picked, setPicked] = useState<number[]>([]);
  const frame = "frame" in q ? frameById(q.frame) : null;
  const head = (
    <div className="mb-3 flex items-center gap-2">
      <span className={`${frame?.className ?? "frame-none"} bg-f-tint text-f rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide`}>{KIND_LABEL[q.kind]}</span>
      {frame && <span className="text-xs text-muted">Frame {frame.number} · {frame.name}</span>}
    </div>
  );

  if (q.kind === "grammar" || q.kind === "match" || q.kind === "fix") {
    return (
      <div className="anim-rise rounded-[1.5rem] border border-line bg-surface p-5 shadow-lift">
        {head}
        {q.kind === "fix" ? (
          <>
            <p className="font-bold">{q.prompt}</p>
            <p className="specimen mt-2 rounded-xl bg-bad/10 px-3 py-2 text-lg text-bad line-through decoration-bad/40">{q.wrong}</p>
          </>
        ) : q.kind === "match" ? (
          <>
            <p className="text-sm font-bold text-muted">Which word means…</p>
            <p className="specimen mt-1 text-[1.4rem] leading-snug">{q.prompt}</p>
          </>
        ) : (
          <p className="specimen text-[1.45rem] leading-snug">{q.prompt}</p>
        )}
        <div className={`mt-4 grid gap-2 ${q.kind === "fix" ? "" : "sm:grid-cols-2"}`}>
          {q.options.map((o) => (
            <button key={o} onClick={() => onAnswer(o)} className={`min-h-12 rounded-2xl border border-line-strong bg-surface px-4 py-2.5 text-left font-bold transition hover:-translate-y-0.5 hover:border-ink active:translate-y-0 ${q.kind === "fix" ? "specimen font-normal" : ""}`}>
              {o}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const pieces = q.kind === "discover" ? q.letters : q.tiles;
  const built = picked.map((i) => pieces[i]);
  const answer = q.kind === "discover" ? built.join("") : built.join(" ");
  const full = picked.length === pieces.length;
  return (
    <div className="anim-rise rounded-[1.5rem] border border-line bg-surface p-5 shadow-lift">
      {head}
      {q.kind === "discover" ? (
        <>
          <p className="text-sm font-bold text-muted">Find the word:</p>
          <p className="specimen mt-1 text-[1.35rem] leading-snug">{q.prompt}</p>
          <p className="mt-1 text-sm text-muted">e.g. “{q.hint}”</p>
        </>
      ) : (
        <p className="font-bold">{q.prompt}</p>
      )}
      <div className={`mt-4 flex min-h-14 flex-wrap items-center gap-1.5 rounded-2xl border-2 border-dashed border-line-strong p-2 ${q.kind === "discover" ? "justify-center" : ""}`} aria-label="Your answer">
        {built.length === 0 && <span className="px-2 text-sm text-muted">Tap the {q.kind === "discover" ? "letters" : "words"} in order</span>}
        {picked.map((i, k) => (
          <button key={`${i}-${k}`} onClick={() => setPicked((p) => p.filter((_, j) => j !== k))} className={`rounded-xl bg-ink px-3 py-2 font-bold text-paper ${q.kind === "discover" ? "w-10 text-center text-lg uppercase" : "specimen"}`}>
            {pieces[i]}
          </button>
        ))}
      </div>
      <div className={`mt-3 flex flex-wrap gap-1.5 ${q.kind === "discover" ? "justify-center" : ""}`}>
        {pieces.map((p, i) => (
          <button
            key={i}
            disabled={picked.includes(i)}
            onClick={() => setPicked((x) => [...x, i])}
            className={`rounded-xl border border-line-strong bg-surface px-3 py-2 font-bold shadow-[inset_0_-2px_0_var(--line)] transition disabled:opacity-20 ${q.kind === "discover" ? "w-10 text-center text-lg uppercase" : "specimen"}`}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <button onClick={() => setPicked([])} disabled={!picked.length} className={button("ghost")}>
          Clear
        </button>
        <button onClick={() => onAnswer(answer)} disabled={!full} className={`${button("primary", "lg")} flex-1`}>
          ⚔ Attack!
        </button>
      </div>
    </div>
  );
}

function FeedbackPanel({ fb, onNext, ending }: { fb: Feedback; onNext: () => void; ending: boolean }) {
  return (
    <div className={`anim-drop rounded-[1.5rem] border-2 p-5 ${fb.ok ? "border-good bg-good/10" : "border-bad bg-bad/10"}`}>
      <p className={`text-[1.4rem] font-black ${fb.ok ? "text-good" : "text-bad"}`}>
        {fb.ok ? (fb.crit ? `POWER STRIKE! −${fb.dmg}` : `Hit! −${fb.dmg}`) : fb.blocked && !fb.hurt ? "Wrong — but your shield blocked it!" : `Ouch! −${fb.hurt} ❤`}
      </p>
      {fb.ok && fb.rage && <p className="text-sm font-bold text-bad">The boss struck back in rage: −{fb.hurt} ❤</p>}
      {fb.defeated && (
        <p className="mt-1 font-bold">
          {fb.defeated} is defeated!{fb.drop === "potion" ? " It dropped a potion 🧪" : fb.drop === "shield" ? " It dropped a shield 🛡️" : ""}
        </p>
      )}
      {!fb.ok && (
        <p className="mt-2">
          <span className="text-sm font-bold text-muted">Answer: </span>
          <span className="specimen text-lg">{fb.q.answer}</span>
        </p>
      )}
      <p className="mt-2 text-ink-2">💡 {fb.q.tip}</p>
      {!ending && (
        <button onClick={onNext} autoFocus className={`${button("primary", "lg")} mt-4 w-full`}>
          {fb.ok ? "Next" : "Got it — next"}
        </button>
      )}
    </div>
  );
}

function BattleResult({ battle, stage, firstClear, result, guest, mistakes, onExit, onRetry, onNext }: { battle: Battle; stage: Stage; firstClear: boolean; result: { xp: number | null; message?: string }; guest: boolean; mistakes: { q: Question; given: string }[]; onExit: () => void; onRetry: () => void; onNext: (id: string) => void }) {
  const won = battle.status === "won";
  const stars = starsFor(battle);
  const idx = STAGES.findIndex((s) => s.id === stage.id);
  const nextStage = STAGES[idx + 1];
  const world = worldById(stage.world);
  return (
    <div className="min-h-dvh">
      {won && <Confetti />}
      <GameBar title={won ? "Victory!" : "Defeated"} onBack={onExit} />
      <main className="mx-auto max-w-2xl px-4 pb-16 pt-8">
        <section className="anim-zoom overflow-hidden rounded-[1.75rem] border border-line bg-surface text-center shadow-lift">
          <div className="relative flex items-end justify-center gap-2 pt-6" style={{ background: `linear-gradient(180deg, ${world.sky[0]}, ${world.sky[1]})` }}>
            <HeroArt id={battle.hero} size={120} mood={won ? "happy" : "hurt"} className={won ? "anim-bob" : ""} />
            {!won && <EnemyArt art={currentEnemy(battle).art} size={110} />}
          </div>
          <div className="p-6 sm:p-8">
            {won && (
              <div className="flex justify-center gap-1 text-[2.6rem] leading-none" aria-label={`${stars} of 3 stars`}>
                {[1, 2, 3].map((s) => (
                  <span key={s} className={s <= stars ? "text-f-possession drop-shadow" : "text-line-strong"}>
                    ★
                  </span>
                ))}
              </div>
            )}
            <h1 className="mt-2 text-[2rem] font-black leading-tight">{won ? (stage.boss ? `${stage.title} is defeated!` : "Stage cleared!") : "The Muddles won this time"}</h1>
            <p className="text-ink-2">
              {battle.correct} correct · {battle.wrong} wrong · best combo ×{battle.bestCombo}
            </p>
            {won ? (
              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-surface-2 px-4 py-2 font-black">
                <span className="xp-coin grid size-7 place-items-center rounded-full text-[0.6rem] text-[#5b3a00]">XP</span>
                {guest ? `Sign in to earn ${questXp(stage, firstClear)} XP` : result.xp === null ? "Saving…" : `+${result.xp} XP`}
              </div>
            ) : (
              <p className="mx-auto mt-3 max-w-sm text-ink-2">Every hero falls sometimes. Read the tips below, use a potion earlier, and try again — you&apos;re getting stronger.</p>
            )}
            {result.message && <p className="mt-3 text-sm text-muted">{result.message}</p>}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {won && nextStage && (
                <button onClick={() => onNext(nextStage.id)} className={button("primary", "lg")}>
                  {nextStage.world !== stage.world ? `Enter ${worldById(nextStage.world).name}` : "Next stage"}
                </button>
              )}
              <button onClick={onRetry} className={button(won ? "secondary" : "primary", "lg")}>
                {won ? "Play again" : "Try again"}
              </button>
              <button onClick={onExit} className={button("ghost", "lg")}>
                Map
              </button>
            </div>
            {guest && (
              <Link href="/signup" className="mt-4 inline-block text-sm font-bold underline underline-offset-4">
                Create a free account to save your quest
              </Link>
            )}
          </div>
        </section>
        {mistakes.length > 0 && (
          <section className="mt-6">
            <h2 className="mb-3 font-bold">Learn from this battle</h2>
            <ul className="flex flex-col gap-2">
              {mistakes.map((m, i) => (
                <li key={i} className="rounded-2xl border border-line bg-surface p-4">
                  <p className="text-xs font-black uppercase tracking-wide text-muted">{KIND_LABEL[m.q.kind]}</p>
                  <p className="mt-1 text-sm text-bad line-through">{m.given || "(no answer)"}</p>
                  <p className="specimen text-lg">{m.q.answer}</p>
                  <p className="mt-1 text-sm text-ink-2">💡 {m.q.tip}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
