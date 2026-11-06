"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { BATTLE_ROUNDS, EXPAND_ROUNDS, PICK_MS, QUESTION_MS, Q_LABEL, REGIONS, SEATS, SEAT_COLORS, conquestXp, initialBoard, ordinal, type ConquestState, type PlayerView, type Stage } from "@/lib/game/conquest";
import { useRewards } from "@/lib/rewards/client";
import { HeroArt } from "./Creatures";
import { GameBar } from "./GameBar";
import { WorldMap, attackFrom } from "./WorldMap";
import { Confetti } from "@/components/rewards/Confetti";
import { button } from "@/components/ui/styles";

type Claimed = { xp: number | null; message?: string };
const WAR_BG = "linear-gradient(160deg, #0f1d3d, #2a1a4a 60%, #5a1e3a)";

const STAGE: Record<Stage, { title: (round: number) => string; rule: string | null }> = {
  expansion: { title: (r) => `Expansion · Round ${r} of ${EXPAND_ROUNDS}`, rule: null },
  battle: { title: (r) => `Battle · Round ${r}`, rule: null },
  escalation: { title: (r) => `⚠️ War escalation · Round ${r}`, rule: "War escalation: capitals now have at most 2 towers, and every won attack on a capital breaks 2." },
  "final-war": { title: (r) => `🔥 Final war · Round ${r}`, rule: "Final war: attack any region on the map. Win an attack on a capital and you take the whole empire." },
  "final-invasion": { title: () => "👑 Final invasion", rule: "Final invasion: the biggest empire marches on the smallest. The winner of the duel takes everything." },
};
const outLabel = (round: number | null) => (round === null ? "" : round > BATTLE_ROUNDS ? "fell in the final invasion" : `fell in round ${round}`);

async function post(body: unknown) {
  const res = await fetch("/api/conquest", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json().catch(() => ({ ok: false, error: "Network error" }));
  return { status: res.status, data };
}

export function ConquestGame() {
  const { status } = useRewards();
  const [matchId, setMatchId] = useState<string | null>(null);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const join = async () => {
    setJoining(true);
    setError(null);
    const { status: code, data } = await post({ action: "join" });
    setJoining(false);
    if (code === 200 && data.matchId) setMatchId(data.matchId);
    else setError(data.error ?? "Couldn't find a match. Try again.");
  };

  if (matchId) return <Match key={matchId} matchId={matchId} onExit={() => setMatchId(null)} onAgain={() => void join()} />;

  const demo = initialBoard();
  return (
    <>
      <GameBar title="Word Empires" />
      <main className="mx-auto max-w-4xl px-4 pb-16 pt-6">
        <section className="overflow-hidden rounded-[1.75rem] border border-line text-white shadow-lift" style={{ background: WAR_BG }}>
          <div className="p-6 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.16em] opacity-80">Live · {SEATS} players · World conquest</p>
            <h1 className="mt-1 text-[2.4rem] font-black leading-tight">Word Empires</h1>
            <p className="mt-2 max-w-xl opacity-90">Build an empire with your English. Win questions to claim land, attack your rivals in head-to-head duels, and storm their capitals.</p>
            <div className="mt-5">
              {status === "guest" ? (
                <div className="flex flex-wrap gap-2">
                  <Link href="/signup" className="inline-flex rounded-full bg-white px-6 py-3 font-black text-[#2a1a4a]">
                    Create a free account to play
                  </Link>
                  <Link href="/login?next=/play/conquest" className="inline-flex rounded-full px-5 py-3 font-bold text-white underline underline-offset-4">
                    Sign in
                  </Link>
                </div>
              ) : status === "unavailable" ? (
                <p className="rounded-2xl bg-black/25 p-3 text-sm font-bold">Live matches are switched off on this server right now.</p>
              ) : (
                <button onClick={join} disabled={joining || status === "loading" || status === "idle"} className="inline-flex items-center gap-2 rounded-full bg-[#e84a5f] px-8 py-3.5 text-lg font-black text-white shadow-[0_6px_0_#9c2438] transition hover:-translate-y-0.5 active:translate-y-1 active:shadow-none disabled:opacity-60">
                  ⚔️ {joining ? "Finding a battle…" : "Go to war"}
                </button>
              )}
              {error && <p className="mt-3 rounded-xl bg-black/30 px-3 py-2 text-sm font-bold">{error}</p>}
            </div>
          </div>
          <div className="px-3 pb-3 sm:px-5 sm:pb-5">
            <WorldMap owner={demo.owner} towers={demo.towers} />
          </div>
        </section>
        <ol className="mt-6 grid gap-3 text-sm text-ink-2 sm:grid-cols-3">
          <Rule n={1} title="Expand" body={`${EXPAND_ROUNDS} rounds: pick empty land next to your empire, then answer. Right answers claim it — the fastest wins a clash.`} />
          <Rule n={2} title="Attack" body="On your turn, attack a neighbour. You and the defender answer the same question; the better answer wins the region." />
          <Rule n={3} title="Conquer the world" body="Knock down a capital's 3 towers to take the whole empire. The war escalates until only one empire is left: the last one standing rules the world." />
        </ol>
        <p className="mt-4 text-sm text-muted">A war lasts about 8–12 minutes. If fewer than 4 people are online, friendly bots join so every match is full.</p>
      </main>
    </>
  );
}

function Rule({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <li className="rounded-2xl bg-surface/70 p-4">
      <p className="font-bold text-ink">
        <span className="mr-1.5 inline-grid size-6 place-items-center rounded-full bg-[#e84a5f] text-xs font-black text-white">{n}</span>
        {title}
      </p>
      <p className="mt-1">{body}</p>
    </li>
  );
}

/* ------------------------------------------------------------------ match */

function Match({ matchId, onExit, onAgain }: { matchId: string; onExit: () => void; onAgain: () => void }) {
  const { claim } = useRewards();
  const [st, setSt] = useState<ConquestState | null>(null);
  const [offset, setOffset] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [claimed, setClaimed] = useState<Claimed | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const alive = useRef(true);
  const again = useRef<() => void>(() => {});

  const poll = useCallback(async () => {
    if (timer.current) clearTimeout(timer.current);
    try {
      const sent = Date.now();
      const res = await fetch(`/api/conquest?match=${matchId}`, { cache: "no-store" });
      const data = await res.json();
      if (!alive.current) return;
      if (!res.ok) {
        setError(data.error ?? "Lost the match");
        return;
      }
      const s = data as ConquestState;
      setOffset(s.serverNow - Math.round((sent + Date.now()) / 2));
      setSt(s);
      setError(null);
      if (s.phase === "done") return;
    } catch {
      if (!alive.current) return;
    }
    timer.current = setTimeout(() => again.current(), 800);
  }, [matchId]);

  useEffect(() => {
    again.current = () => void poll();
  }, [poll]);

  useEffect(() => {
    alive.current = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- polling the server is an external subscription
    void poll();
    const tick = setInterval(() => setNow(Date.now()), 100);
    return () => {
      alive.current = false;
      clearInterval(tick);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [poll]);

  const serverNow = now + offset;
  const endsAt = st?.endsAt ?? null;

  // when the current phase runs out, ask straight away instead of waiting for the next poll
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch the next phase from the server
    if (endsAt && serverNow >= endsAt + 50) void poll();
  }, [endsAt, serverNow >= (endsAt ?? Infinity) + 50, poll]); // eslint-disable-line react-hooks/exhaustive-deps

  const claimedOnce = useRef(false);
  const meNow = st?.players.find((p) => p.me);
  const fallen = !!meNow && !meNow.alive && st?.phase !== "reveal";
  useEffect(() => {
    if ((st?.phase !== "done" && !fallen) || claimedOnce.current) return;
    claimedOnce.current = true;
    void claim({ type: "conquest", matchId }).then((r) => {
      const xp = r ? r.granted.filter((g) => g.kind === "conquest").reduce((n, g) => n + g.xp, 0) : 0;
      setClaimed({ xp, message: r?.message });
    });
  }, [st?.phase, fallen, matchId, claim]);

  const act = async (body: Record<string, unknown>, patch: Partial<ConquestState>) => {
    if (busy || !st?.step) return;
    setBusy(true);
    setSt((s) => (s ? { ...s, ...patch } : s));
    const { status, data } = await post({ matchId, step: st.step.index, ...body });
    if (status !== 200) {
      setError(data.error ?? "Not saved");
      void poll();
    }
    setBusy(false);
  };
  const pick = (region: number) => st?.legal.includes(region) && st.myPick === null && act({ action: "pick", region }, { myPick: region });
  const answer = (choice: number) => st?.canAnswer && st.myChoice === null && act({ action: "answer", choice }, { myChoice: choice, canAnswer: false });

  const leave = async () => {
    if (st?.phase === "lobby") await post({ action: "leave", matchId });
    onExit();
  };

  if (!st)
    return (
      <>
        <GameBar title="Word Empires" onBack={onExit} />
        <p className="mt-24 text-center font-bold text-muted">{error ?? "Connecting…"}</p>
      </>
    );

  if (st.phase === "done") return <Results st={st} claimed={claimed} onExit={onExit} onAgain={onAgain} />;

  const secs = endsAt ? Math.max(0, Math.ceil((endsAt - serverNow) / 1000)) : 0;
  const step = st.step;
  const by = (seat: number | null | undefined) => (seat === null || seat === undefined ? null : st.players.find((p) => p.seat === seat) ?? null);
  const attacker = by(step?.attacker);
  const defender = by(step?.defender);
  const arrow =
    step && step.kind !== "expand" && step.target !== null && step.attacker !== null && (st.phase !== "pick" || step.kind === "final")
      ? { from: attackFrom(st.owner, step.attacker, step.target), to: step.target, color: SEAT_COLORS[step.attacker] }
      : null;
  const pins = st.reveal && step?.kind === "expand" ? Object.entries(st.reveal.picks).map(([seat, region]) => ({ seat: Number(seat), region })) : [];
  const title = !step ? "Word Empires" : STAGE[step.stage].title(step.round);
  const rule = step ? STAGE[step.stage].rule : null;
  const me = st.players.find((p) => p.me);

  if (st.phase === "lobby") return <Lobby st={st} secs={secs} onCancel={leave} />;

  return (
    <div className="flex min-h-dvh flex-col" style={{ background: WAR_BG }}>
      <GameBar title={title} onBack={leave} />
      <main className="mx-auto grid w-full max-w-6xl flex-1 gap-3 px-3 pb-8 pt-3 lg:grid-cols-[1fr_22rem] lg:gap-5 lg:px-5">
        <div className="flex flex-col gap-3">
          <Players players={st.players} active={[step?.attacker ?? -1, step?.defender ?? -1]} />
          {rule && <p className={`rounded-2xl px-4 py-2 text-center text-sm font-bold text-white ${step?.stage === "escalation" ? "bg-[#f0a020]/30" : "bg-[#e84a5f]/35"}`}>{rule}</p>}
          <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10">
            <WorldMap owner={st.owner} towers={st.towers} legal={st.myPick === null ? st.legal : []} picked={st.phase === "pick" ? st.myPick : null} onPick={pick} arrow={arrow} flash={st.reveal?.captured ?? []} pins={pins} />
            {st.phase === "countdown" && (
              <div className="absolute inset-0 grid place-items-center bg-black/40 text-center text-white">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.2em] opacity-80">The war begins</p>
                  <p key={secs} className="anim-zoom text-[5rem] font-black leading-none">
                    {secs || "⚔️"}
                  </p>
                </div>
              </div>
            )}
          </div>
          {st.lastEvent && st.phase === "pick" && <p className="text-center text-sm font-bold text-white/70">Last turn: {st.lastEvent}</p>}
        </div>

        <aside className="lg:self-start">
          {me && !me.alive && (
            <div className="mb-3 rounded-[1.5rem] border border-white/10 bg-black/40 p-4 text-center text-white">
              <p className="text-3xl">💀</p>
              <p className="font-black">Your empire has fallen. You finished {ordinal(me.rank)}.</p>
              <p className="mt-1 text-sm opacity-80">{claimed === null ? "Saving your XP…" : claimed.xp ? `+${claimed.xp} XP saved.` : "XP not saved."} Watch who rules the world, or leave.</p>
              <button onClick={onExit} className="mt-3 rounded-full bg-white px-5 py-2 text-sm font-black text-[#2a1a4a]">
                Leave the war
              </button>
            </div>
          )}
          <div className="rounded-[1.5rem] border border-white/10 bg-surface p-4 shadow-lift sm:p-5">
            {st.phase === "countdown" && <p className="text-center font-bold">Get ready — your capital is the castle in your colour.</p>}

            {st.phase === "pick" && step && (
              <PickPanel st={st} secs={secs} remaining={Math.max(0, (endsAt ?? 0) - serverNow)} attacker={attacker} onPick={pick} />
            )}

            {(st.phase === "question" || st.phase === "reveal") && st.question && step && (
              <>
                <DuelHeader st={st} attacker={attacker} defender={defender} />
                <QuestionCard st={st} remaining={st.phase === "question" ? Math.max(0, (endsAt ?? 0) - serverNow) : 0} onAnswer={answer} />
              </>
            )}
            {error && <p className="mt-3 text-center text-sm font-bold text-bad">{error}</p>}
          </div>
        </aside>
      </main>
    </div>
  );
}

function Avatar({ p, size = 36 }: { p: PlayerView; size?: number }) {
  return (
    <span className={`grid shrink-0 place-items-center overflow-hidden rounded-full bg-white ${p.alive ? "" : "grayscale"}`} style={{ width: size, height: size, boxShadow: `0 0 0 3px ${p.color}` }}>
      <HeroArt id={p.avatar} size={size * 1.15} mood={p.alive ? "happy" : "hurt"} />
    </span>
  );
}

function Players({ players, active }: { players: PlayerView[]; active: number[] }) {
  return (
    <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {players.map((p) => (
        <li
          key={p.seat}
          className={`flex items-center gap-2 rounded-2xl px-2.5 py-2 text-white transition ${active.includes(p.seat) ? "scale-[1.03] ring-2 ring-white" : ""} ${p.alive ? "" : "opacity-50"}`}
          style={{ background: `linear-gradient(135deg, ${p.color}cc, ${p.color}66)` }}
        >
          <Avatar p={p} size={34} />
          <div className="min-w-0 flex-1 leading-tight">
            <p className="flex items-center gap-1 truncate text-sm font-black">
              {p.me ? "You" : p.name}
              {p.bot && <span className="rounded bg-black/25 px-1 text-[0.58rem] uppercase">bot</span>}
            </p>
            {p.alive ? (
              <p className="flex items-center justify-between gap-1 whitespace-nowrap text-xs font-bold tabular-nums opacity-90">
                <span>
                  {p.score} pts · {p.regions} 🗺
                </span>
                <span aria-label={`${p.towers} towers`}>{"♜".repeat(p.towers)}</span>
              </p>
            ) : (
              <p className="text-xs font-bold opacity-90">💀 {outLabel(p.outRound)}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

function Bar({ remaining, total }: { remaining: number; total: number }) {
  const pct = (remaining / total) * 100;
  return (
    <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-2" aria-hidden>
      <div className="h-full rounded-full transition-[width] duration-100 ease-linear" style={{ width: `${pct}%`, background: pct > 30 ? "#7a3fc4" : "#e84a5f" }} />
    </div>
  );
}

function PickPanel({ st, secs, remaining, attacker, onPick }: { st: ConquestState; secs: number; remaining: number; attacker: PlayerView | null; onPick: (r: number) => void }) {
  const step = st.step!;
  const mine = st.legal.length > 0;
  const verb = step.kind === "expand" ? "claim" : "attack";
  if (step.kind === "final") {
    const def = st.players.find((p) => p.seat === step.defender);
    return (
      <div className="text-center">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#e84a5f]">Final invasion</p>
        <p className="mt-2 text-lg font-black">
          👑 {attacker?.me ? "You march" : `${attacker?.name ?? "The biggest empire"} marches`} on {def?.me ? "your" : `${def?.name ?? "the smallest empire"}'s`} capital!
        </p>
        <p className="mt-1 text-sm text-muted">One duel. The winner takes the whole empire. {secs}s</p>
        <Bar remaining={remaining} total={PICK_MS} />
      </div>
    );
  }
  if (!mine) {
    return (
      <div className="text-center">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-muted">{step.kind === "expand" ? "Everyone is choosing" : "Enemy turn"}</p>
        <p className="mt-2 text-lg font-black">{step.kind === "expand" ? (st.myPick !== null ? `🚩 Target locked: ${REGIONS[st.myPick].name}` : "Waiting…") : `⚔️ ${attacker?.name ?? "Someone"} is choosing a target…`}</p>
        <p className="mt-1 text-sm text-muted">{secs}s</p>
        <Bar remaining={remaining} total={PICK_MS} />
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#e84a5f]">{step.kind === "expand" ? "Expand your empire" : "Your turn to attack!"}</p>
        <span className="text-lg font-black tabular-nums">{secs}s</span>
      </div>
      <p className="mt-1 font-bold">
        {st.myPick !== null ? `🚩 Target locked: ${REGIONS[st.myPick].name}` : `Tap a glowing region on the map to ${verb} it.`}
      </p>
      <Bar remaining={remaining} total={PICK_MS} />
      {st.myPick === null && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {st.legal.map((r) => {
            const o = st.owner[r];
            return (
              <button key={r} onClick={() => onPick(r)} className="rounded-full border border-line-strong bg-surface px-3 py-1.5 text-sm font-bold transition hover:border-ink">
                <span className="mr-1 inline-block size-2.5 rounded-full align-middle" style={{ background: o >= 0 ? SEAT_COLORS[o] : "#c7cede" }} />
                {REGIONS[r].name}
              </button>
            );
          })}
        </div>
      )}
      <p className="mt-3 text-xs text-muted">No choice in time? We&apos;ll pick for you.</p>
    </div>
  );
}

function DuelHeader({ st, attacker, defender }: { st: ConquestState; attacker: PlayerView | null; defender: PlayerView | null }) {
  const step = st.step!;
  if (step.kind === "expand")
    return <p className="mb-3 text-center text-xs font-black uppercase tracking-[0.16em] text-muted">Everyone answers · right answers claim their land</p>;
  const target = step.kind === "final" ? "Winner takes all" : step.target !== null ? REGIONS[step.target].name : "";
  return (
    <div className="mb-3 flex items-center justify-center gap-3 text-center">
      {attacker && (
        <div className="flex flex-col items-center">
          <Avatar p={attacker} size={40} />
          <span className="mt-1 text-xs font-black">{attacker.me ? "You" : attacker.name}</span>
        </div>
      )}
      <div>
        <p className="text-2xl">⚔️</p>
        <p className="text-xs font-black uppercase text-muted">{target}</p>
      </div>
      {defender ? (
        <div className="flex flex-col items-center">
          <Avatar p={defender} size={40} />
          <span className="mt-1 text-xs font-black">{defender.me ? "You" : defender.name}</span>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <span className="grid size-10 place-items-center rounded-full bg-[#c7cede] text-lg">🏳️</span>
          <span className="mt-1 text-xs font-black">Free land</span>
        </div>
      )}
    </div>
  );
}

function QuestionCard({ st, remaining, onAnswer }: { st: ConquestState; remaining: number; onAnswer: (i: number) => void }) {
  const q = st.question!;
  const reveal = st.reveal;
  const mine = st.myChoice;
  const watching = !reveal && !st.canAnswer && mine === null;
  return (
    <section key={st.step?.index} className="anim-rise">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-[#7a3fc4]/12 px-3 py-1 text-xs font-black uppercase tracking-wide text-[#7a3fc4] dark:text-[#c9a6ff]">{Q_LABEL[q.kind]}</span>
        {!reveal && <span className={`text-lg font-black tabular-nums ${remaining < 3000 ? "text-bad" : ""}`}>{Math.ceil(remaining / 1000)}s</span>}
      </div>
      {!reveal && <Bar remaining={remaining} total={QUESTION_MS} />}
      <p className={`specimen mt-4 leading-snug ${q.kind === "fix" ? "text-lg font-bold" : "text-[1.35rem]"}`}>{q.kind === "meaning" ? `“${q.prompt}”` : q.prompt}</p>
      <div className="mt-4 grid gap-2">
        {q.options.map((o, i) => {
          const tone = reveal
            ? i === reveal.answer
              ? "border-good bg-good/15"
              : mine === i
                ? "border-bad bg-bad/10"
                : "opacity-60"
            : mine === i
              ? "border-[#7a3fc4] bg-[#7a3fc4]/10 ring-2 ring-[#7a3fc4]"
              : mine !== null || watching
                ? "opacity-60"
                : "hover:-translate-y-0.5 hover:border-ink";
          const who = reveal ? reveal.results.filter((r) => r.choice === i).map((r) => st.players.find((p) => p.seat === r.seat)!) : [];
          return (
            <button
              key={i}
              onClick={() => onAnswer(i)}
              disabled={!!reveal || mine !== null || !st.canAnswer}
              className={`flex min-h-12 items-center gap-2 rounded-2xl border border-line-strong bg-surface px-4 py-2.5 text-left font-bold transition ${q.kind === "fix" ? "specimen font-normal" : ""} ${tone}`}
            >
              <span className="flex-1">{o}</span>
              {reveal && i === reveal.answer && <span className="text-good">✓</span>}
              {who.length > 0 && (
                <span className="flex -space-x-2">
                  {who.map((p) => (
                    <Avatar key={p.seat} p={p} size={22} />
                  ))}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {watching && <p className="mt-3 text-center text-sm font-bold text-muted">👀 You&apos;re watching this duel</p>}
      {!reveal && mine !== null && <p className="mt-3 text-center text-sm font-bold text-muted">Locked in! Waiting…</p>}
      {reveal && (
        <div className="anim-drop mt-4 rounded-2xl bg-surface-2 px-4 py-3">
          <p className="font-black">{reveal.text}</p>
          <p className="mt-1 text-sm text-ink-2">💡 {reveal.tip}</p>
          <ul className="mt-2 flex flex-wrap gap-2 text-xs font-bold">
            {reveal.results.map((r) => {
              const p = st.players.find((x) => x.seat === r.seat)!;
              return (
                <li key={r.seat} className="flex items-center gap-1 rounded-full bg-surface px-2 py-1">
                  <span className="inline-block size-2.5 rounded-full" style={{ background: p.color }} />
                  {p.me ? "You" : p.name} {r.correct ? `✓ ${(r.ms / 1000).toFixed(1)}s` : "✗"}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}

function Lobby({ st, secs, onCancel }: { st: ConquestState; secs: number; onCancel: () => void }) {
  return (
    <div className="min-h-dvh" style={{ background: WAR_BG }}>
      <GameBar title="Word Empires" onBack={onCancel} />
      <main className="mx-auto max-w-xl px-4 pt-10">
        <section className="rounded-[1.5rem] border border-white/10 bg-surface p-6 text-center shadow-lift">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-muted">Gathering armies</p>
          <p className="mt-1 text-[2rem] font-black tabular-nums">0:{String(secs).padStart(2, "0")}</p>
          <ul className="mx-auto mt-5 grid max-w-sm grid-cols-4 gap-2">
            {Array.from({ length: SEATS }, (_, s) => {
              const p = st.players.find((x) => x.seat === s);
              return (
                <li key={s} className="flex flex-col items-center gap-1">
                  {p ? (
                    <span className="anim-pop">
                      <Avatar p={p} size={54} />
                    </span>
                  ) : (
                    <span className="grid size-[54px] animate-pulse place-items-center rounded-full border-2 border-dashed text-muted" style={{ borderColor: SEAT_COLORS[s] }}>
                      ?
                    </span>
                  )}
                  <span className="w-full truncate text-xs font-bold">{p ? (p.me ? "You" : p.name) : "…"}</span>
                </li>
              );
            })}
          </ul>
          <p className="mx-auto mt-5 max-w-sm text-sm text-ink-2">The war starts when 4 people join, or in {secs}s with bots in the empty seats.</p>
          <button onClick={onCancel} className={`${button("ghost")} mt-4`}>
            Cancel
          </button>
        </section>
      </main>
    </div>
  );
}

function Results({ st, claimed, onExit, onAgain }: { st: ConquestState; claimed: Claimed | null; onExit: () => void; onAgain: () => void }) {
  const ranked = [...st.players].sort((a, b) => a.rank - b.rank);
  const me = ranked.find((p) => p.me)!;
  const rank = me.rank;
  const emperor = ranked[0];
  return (
    <div className="min-h-dvh" style={{ background: WAR_BG }}>
      {rank === 1 && <Confetti />}
      <GameBar title="The war is over" onBack={onExit} />
      <main className="mx-auto max-w-3xl px-4 pb-16 pt-6">
        <section className="anim-zoom overflow-hidden rounded-[1.75rem] border border-white/10 bg-surface text-center shadow-lift">
          <div className="p-3 sm:p-4" style={{ background: "#0c1a36" }}>
            <WorldMap owner={st.owner} towers={st.towers} />
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-5xl">{rank === 1 ? "👑" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : "🛡️"}</p>
            <h1 className="mt-2 text-[2rem] font-black leading-tight">{rank === 1 ? "You rule the world!" : `You finished ${ordinal(rank)}`}</h1>
            <p className="text-ink-2">{rank === 1 ? `You conquered every empire with ${me.correct} right answers.` : `👑 ${emperor.name} rules the world. You ${outLabel(me.outRound)} with ${me.correct} right answers.`}</p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-surface-2 px-4 py-2 font-black">
              <span className="xp-coin grid size-7 place-items-center rounded-full text-[0.6rem] text-[#5b3a00]">XP</span>
              {claimed === null ? "Saving…" : claimed.xp ? `+${claimed.xp} XP` : `${conquestXp(rank, me.correct)} XP not saved`}
            </div>
            {claimed?.message && <p className="mt-3 text-sm text-muted">{claimed.message}</p>}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <button onClick={onAgain} className={button("primary", "lg")}>
                ⚔️ Play again
              </button>
              <Link href="/games" className={button("secondary", "lg")}>
                All games
              </Link>
            </div>
          </div>
        </section>
        <section className="mt-6">
          <h2 className="mb-2 font-bold text-white">Final standings</h2>
          <ol className="flex flex-col gap-1 rounded-2xl border border-line bg-surface p-2">
            {ranked.map((p) => (
              <li key={p.seat} className={`flex items-center gap-3 rounded-xl px-2 py-2 ${p.me ? "bg-[#7a3fc4]/10" : ""}`}>
                <span className="w-5 text-center font-black text-muted">{p.rank}</span>
                <Avatar p={p} size={34} />
                <span className="min-w-0 flex-1 truncate font-bold">
                  {p.me ? "You" : p.name}
                  {p.bot && <span className="ml-1.5 rounded-full bg-surface-2 px-1.5 text-[0.62rem] font-black uppercase text-muted">bot</span>}
                </span>
                <span className="text-right text-sm text-muted">{p.alive ? "👑 World emperor" : `💀 ${outLabel(p.outRound)}`}</span>
              </li>
            ))}
          </ol>
        </section>
        {st.review && st.review.length > 0 && (
          <section className="mt-6">
            <h2 className="mb-2 font-bold text-white">Learn from this war</h2>
            <ul className="flex flex-col gap-2">
              {st.review.map((r, i) => (
                <li key={i} className="rounded-2xl border border-line bg-surface p-4">
                  <p className="text-xs font-black uppercase tracking-wide text-muted">
                    {Q_LABEL[r.kind]} {r.mine === r.answer ? <span className="text-good">✓</span> : <span className="text-bad">✗</span>}
                  </p>
                  <p className="specimen mt-1">{r.prompt}</p>
                  {r.mine !== null && r.mine !== r.answer && <p className="mt-1 text-sm text-bad line-through">{r.options[r.mine]}</p>}
                  <p className="font-bold text-good">{r.options[r.answer]}</p>
                  <p className="mt-1 text-sm text-ink-2">💡 {r.tip}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
