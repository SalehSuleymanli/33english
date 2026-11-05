"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ARENA_KIND_LABEL, QUESTIONS, QUESTION_MS, SEATS, arenaXp, ordinal, rankPlayers, type ArenaPlayerView, type ArenaState } from "@/lib/game/arena";
import { useRewards } from "@/lib/rewards/client";
import { HeroArt } from "./Creatures";
import { GameBar } from "./GameBar";
import { Confetti } from "@/components/rewards/Confetti";
import { button } from "@/components/ui/styles";

type Claimed = { xp: number | null; message?: string };

async function post(body: unknown) {
  const res = await fetch("/api/arena", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json().catch(() => ({ ok: false, error: "Network error" }));
  return { status: res.status, data };
}

export function ArenaGame() {
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

  if (matchId) return <Match key={matchId} matchId={matchId} onExit={() => setMatchId(null)} onAgain={() => void join().then(() => undefined)} />;

  return (
    <>
      <GameBar title="English Arena" />
      <main className="mx-auto max-w-3xl px-4 pb-16 pt-8">
        <section className="relative overflow-hidden rounded-[1.75rem] border border-line p-6 text-white shadow-lift sm:p-8" style={{ background: "linear-gradient(150deg, #3b2a8c, #7a3fc4 55%, #e84a5f)" }}>
          <div aria-hidden className="pointer-events-none absolute -bottom-4 right-2 flex items-end opacity-95">
            {(["fox", "owl", "bear", "bunny", "turtle"] as const).map((h, i) => (
              <HeroArt key={h} id={h} size={i === 2 ? 96 : 70} className={`-ml-4 ${i === 2 ? "anim-bob" : ""}`} mood="happy" />
            ))}
          </div>
          <div className="relative max-w-md">
            <p className="text-xs font-black uppercase tracking-[0.16em] opacity-80">Live · {SEATS} players</p>
            <h1 className="mt-1 text-[2.4rem] font-black leading-tight">English Arena</h1>
            <p className="mt-2 opacity-90">
              {QUESTIONS} quick English questions against 4 other players. Answer right <em>and</em> fast to score up to 1000 points per question.
            </p>
            <div className="mt-5 pb-16 sm:pb-0">
              {status === "guest" ? (
                <div className="flex flex-wrap gap-2">
                  <Link href="/signup" className="inline-flex rounded-full bg-white px-6 py-3 font-black text-[#3b2a8c]">
                    Create a free account to play
                  </Link>
                  <Link href="/login?next=/play/arena" className="inline-flex rounded-full px-5 py-3 font-bold text-white underline underline-offset-4">
                    Sign in
                  </Link>
                </div>
              ) : status === "unavailable" ? (
                <p className="rounded-2xl bg-black/25 p-3 text-sm font-bold">Live matches are switched off on this server right now.</p>
              ) : (
                <button onClick={join} disabled={joining || status === "loading" || status === "idle"} className="inline-flex rounded-full bg-white px-8 py-3.5 text-lg font-black text-[#3b2a8c] transition hover:scale-[1.03] disabled:opacity-60">
                  {joining ? "Finding a match…" : "Play now"}
                </button>
              )}
              {error && <p className="mt-3 rounded-xl bg-black/30 px-3 py-2 text-sm font-bold">{error}</p>}
            </div>
          </div>
        </section>
        <ul className="mt-6 grid gap-3 text-sm text-ink-2 sm:grid-cols-3">
          <Rule title="Quick matches" body="About 2 minutes. If not enough people are online, friendly bots fill the empty seats." />
          <Rule title="Speed matters" body="A right answer scores 500–1000 points — the faster, the more." />
          <Rule title="Earn XP" body="Every match earns XP, with bonuses for 1st, 2nd and 3rd place." />
        </ul>
      </main>
    </>
  );
}

function Rule({ title, body }: { title: string; body: string }) {
  return (
    <li className="rounded-2xl bg-surface/70 p-4">
      <p className="font-bold text-ink">{title}</p>
      <p>{body}</p>
    </li>
  );
}

/* ------------------------------------------------------------------ match */

function Match({ matchId, onExit, onAgain }: { matchId: string; onExit: () => void; onAgain: () => void }) {
  const { claim } = useRewards();
  const [st, setSt] = useState<ArenaState | null>(null);
  const [offset, setOffset] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const [pending, setPending] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [claimed, setClaimed] = useState<Claimed | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const alive = useRef(true);
  const again = useRef<() => void>(() => {});

  const poll = useCallback(async () => {
    if (timer.current) clearTimeout(timer.current);
    try {
      const sent = Date.now();
      const res = await fetch(`/api/arena?match=${matchId}`, { cache: "no-store" });
      const data = await res.json();
      if (!alive.current) return;
      if (!res.ok) {
        setError(data.error ?? "Lost the match");
        return;
      }
      const s = data as ArenaState;
      setOffset(s.serverNow - Math.round((sent + Date.now()) / 2));
      setSt(s);
      setError(null);
      if (s.phase.phase === "done") return;
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
  const phase = st?.phase;
  const endsAt = phase && "endsAt" in phase ? phase.endsAt : null;

  // when the current phase runs out, ask straight away instead of waiting for the next poll
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch the next phase from the server
    if (endsAt && serverNow >= endsAt + 50) void poll();
  }, [endsAt, serverNow >= (endsAt ?? Infinity) + 50, poll]); // eslint-disable-line react-hooks/exhaustive-deps

  // claim XP once the match is over
  const claimedOnce = useRef(false);
  useEffect(() => {
    if (phase?.phase !== "done" || claimedOnce.current) return;
    claimedOnce.current = true;
    void claim({ type: "arena", matchId }).then((r) => {
      const xp = r ? r.granted.filter((g) => g.kind === "arena").reduce((n, g) => n + g.xp, 0) : 0;
      setClaimed({ xp, message: r?.message });
    });
  }, [phase?.phase, matchId, claim]);

  const answer = async (choice: number) => {
    if (!st?.question || st.myChoice !== null || pending !== null) return;
    setPending(choice);
    const { status, data } = await post({ action: "answer", matchId, q: st.question.index, choice });
    if (status === 200) setSt((s) => (s ? { ...s, myChoice: choice } : s));
    else setError(data.error ?? "Answer not saved");
    setPending(null);
  };

  const leave = async () => {
    if (phase?.phase === "lobby") await post({ action: "leave", matchId });
    onExit();
  };

  if (!st || !phase)
    return (
      <>
        <GameBar title="English Arena" onBack={onExit} />
        <p className="mt-24 text-center font-bold text-muted">{error ?? "Connecting…"}</p>
      </>
    );

  const secs = endsAt ? Math.max(0, Math.ceil((endsAt - serverNow) / 1000)) : 0;

  if (phase.phase === "done") return <Results st={st} claimed={claimed} onExit={onExit} onAgain={onAgain} />;

  return (
    <div className="flex min-h-dvh flex-col">
      <GameBar
        title={phase.phase === "question" || phase.phase === "reveal" ? `Question ${phase.q + 1} of ${QUESTIONS}` : "English Arena"}
        onBack={leave}
      />
      <main className={`mx-auto grid w-full flex-1 gap-5 px-4 pb-10 pt-5 ${phase.phase === "lobby" ? "max-w-2xl" : "max-w-5xl lg:grid-cols-[1fr_17rem]"}`}>
        <div>
          {phase.phase === "lobby" && <Lobby players={st.players} secs={Math.max(0, Math.ceil((st.fillAt - serverNow) / 1000))} onCancel={leave} />}
          {phase.phase === "countdown" && (
            <div className="grid place-items-center py-16 text-center">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-muted">Get ready</p>
              <p key={secs} className="anim-zoom mt-2 text-[6rem] font-black leading-none tabular-nums">
                {secs || "Go!"}
              </p>
              <p className="mt-4 text-ink-2">Answer fast — speed earns extra points.</p>
            </div>
          )}
          {(phase.phase === "question" || phase.phase === "reveal") && st.question && (
            <QuestionCard st={st} reveal={phase.phase === "reveal"} remaining={phase.phase === "question" ? Math.max(0, endsAt! - serverNow) : 0} pending={pending} onAnswer={answer} />
          )}
          {error && <p className="mt-3 text-center text-sm font-bold text-bad">{error}</p>}
        </div>
        {phase.phase !== "lobby" && <Scoreboard players={st.players} reveal={phase.phase === "reveal"} />}
      </main>
    </div>
  );
}

function Avatar({ p, size = 40 }: { p: ArenaPlayerView; size?: number }) {
  return (
    <span className="grid shrink-0 place-items-center overflow-hidden rounded-full bg-surface-2" style={{ width: size, height: size }}>
      <HeroArt id={p.avatar} size={size * 1.15} mood={p.last === false ? "hurt" : "happy"} />
    </span>
  );
}

function Name({ p }: { p: ArenaPlayerView }) {
  return (
    <span className="flex min-w-0 items-center gap-1.5">
      <span className="truncate font-bold">{p.me ? "You" : p.name}</span>
      {p.bot && <span className="rounded-full bg-surface-2 px-1.5 text-[0.62rem] font-black uppercase text-muted">bot</span>}
    </span>
  );
}

function Lobby({ players, secs, onCancel }: { players: ArenaPlayerView[]; secs: number; onCancel: () => void }) {
  return (
    <section className="rounded-[1.5rem] border border-line bg-surface p-6 text-center shadow-lift">
      <p className="text-sm font-black uppercase tracking-[0.16em] text-muted">Finding players</p>
      <p className="mt-1 text-[2rem] font-black tabular-nums">0:{String(secs).padStart(2, "0")}</p>
      <ul className="mx-auto mt-5 grid max-w-md grid-cols-5 gap-2">
        {Array.from({ length: SEATS }, (_, s) => {
          const p = players.find((x) => x.seat === s);
          return (
            <li key={s} className="flex flex-col items-center gap-1">
              {p ? (
                <span className="anim-pop">
                  <Avatar p={p} size={52} />
                </span>
              ) : (
                <span className="grid size-[52px] animate-pulse place-items-center rounded-full border-2 border-dashed border-line-strong text-muted">?</span>
              )}
              <span className="w-full truncate text-xs font-bold">{p ? (p.me ? "You" : p.name) : "…"}</span>
            </li>
          );
        })}
      </ul>
      <p className="mx-auto mt-5 max-w-sm text-sm text-ink-2">The match starts when 5 people join, or in {secs}s with friendly bots in the empty seats.</p>
      <button onClick={onCancel} className={`${button("ghost")} mt-4`}>
        Cancel
      </button>
    </section>
  );
}

function QuestionCard({ st, reveal, remaining, pending, onAnswer }: { st: ArenaState; reveal: boolean; remaining: number; pending: number | null; onAnswer: (i: number) => void }) {
  const q = st.question!;
  const mine = st.myChoice ?? pending;
  const answer = st.reveal?.answer;
  const pct = (remaining / QUESTION_MS) * 100;
  return (
    <section key={q.index} className="anim-rise rounded-[1.5rem] border border-line bg-surface p-5 shadow-lift sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-[#7a3fc4]/12 px-3 py-1 text-xs font-black uppercase tracking-wide text-[#7a3fc4] dark:text-[#c9a6ff]">{ARENA_KIND_LABEL[q.kind]}</span>
        {!reveal && <span className={`text-lg font-black tabular-nums ${remaining < 3000 ? "text-bad" : ""}`}>{Math.ceil(remaining / 1000)}s</span>}
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-2" aria-hidden>
        <div className="h-full rounded-full transition-[width] duration-100 ease-linear" style={{ width: `${reveal ? 0 : pct}%`, background: pct > 30 ? "#7a3fc4" : "#e84a5f" }} />
      </div>
      <p className={`specimen mt-5 leading-snug ${q.kind === "fix" ? "text-xl font-bold" : "text-[1.55rem]"}`}>{q.kind === "meaning" ? `“${q.prompt}”` : q.prompt}</p>
      <div className={`mt-5 grid gap-2 ${q.kind === "fix" ? "" : "sm:grid-cols-2"}`}>
        {q.options.map((o, i) => {
          const isMine = mine === i;
          const tone = reveal
            ? i === answer
              ? "border-good bg-good/15"
              : isMine
                ? "border-bad bg-bad/10"
                : "opacity-60"
            : isMine
              ? "border-[#7a3fc4] bg-[#7a3fc4]/10 ring-2 ring-[#7a3fc4]"
              : mine !== null
                ? "opacity-50"
                : "hover:-translate-y-0.5 hover:border-ink";
          const who = reveal ? st.players.filter((p) => st.reveal?.picks[p.seat] === i) : [];
          return (
            <button
              key={i}
              onClick={() => onAnswer(i)}
              disabled={reveal || mine !== null}
              className={`flex min-h-14 items-center gap-2 rounded-2xl border border-line-strong bg-surface px-4 py-3 text-left font-bold transition ${q.kind === "fix" ? "specimen font-normal" : ""} ${tone}`}
            >
              <span className="flex-1">{o}</span>
              {reveal && i === answer && <span className="text-good">✓</span>}
              {who.length > 0 && (
                <span className="flex -space-x-2">
                  {who.map((p) => (
                    <Avatar key={p.seat} p={p} size={24} />
                  ))}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {!reveal && mine !== null && <p className="mt-4 text-center text-sm font-bold text-muted">Locked in! Waiting for the others…</p>}
      {reveal && (
        <p className="anim-drop mt-4 rounded-2xl bg-surface-2 px-4 py-3 text-ink-2">
          <span className={`font-black ${mine === answer ? "text-good" : "text-bad"}`}>{mine === answer ? "Correct! " : mine === null ? "Too slow! " : "Not this time. "}</span>
          💡 {st.reveal?.tip}
        </p>
      )}
    </section>
  );
}

function Scoreboard({ players, reveal }: { players: ArenaPlayerView[]; reveal: boolean }) {
  const ranked = rankPlayers(players);
  return (
    <aside className="rounded-[1.5rem] border border-line bg-surface p-3 lg:self-start" aria-label="Scores">
      <ol className="flex flex-col gap-1">
        {ranked.map((p, i) => (
          <li key={p.seat} className={`flex items-center gap-2 rounded-xl px-2 py-1.5 transition-all ${p.me ? "bg-[#7a3fc4]/10" : ""}`}>
            <span className="w-4 text-center text-sm font-black text-muted">{i + 1}</span>
            <Avatar p={p} size={34} />
            <span className="min-w-0 flex-1 text-sm">
              <Name p={p} />
            </span>
            {reveal && p.last !== null && <span className={`text-sm font-black ${p.last ? "text-good" : "text-bad"}`}>{p.last ? "✓" : "✗"}</span>}
            <span className="w-12 text-right text-sm font-black tabular-nums">{p.score}</span>
          </li>
        ))}
      </ol>
    </aside>
  );
}

function Results({ st, claimed, onExit, onAgain }: { st: ArenaState; claimed: Claimed | null; onExit: () => void; onAgain: () => void }) {
  const ranked = rankPlayers(st.players);
  const rank = ranked.findIndex((p) => p.me) + 1;
  const me = ranked[rank - 1];
  const podium = [ranked[1], ranked[0], ranked[2]];
  return (
    <div className="min-h-dvh">
      {rank <= 3 && <Confetti />}
      <GameBar title="Match over" onBack={onExit} />
      <main className="mx-auto max-w-2xl px-4 pb-16 pt-8">
        <section className="anim-zoom overflow-hidden rounded-[1.75rem] border border-line bg-surface text-center shadow-lift">
          <div className="flex items-end justify-center gap-3 px-4 pt-8" style={{ background: "linear-gradient(160deg, #3b2a8c, #7a3fc4)" }}>
            {podium.map((p, k) =>
              p ? (
                <div key={p.seat} className="flex w-24 flex-col items-center text-white">
                  <HeroArt id={p.avatar} size={k === 1 ? 84 : 64} mood="happy" className={k === 1 ? "anim-bob" : ""} />
                  <span className="w-full truncate text-sm font-bold">{p.me ? "You" : p.name}</span>
                  <span className="text-xs tabular-nums opacity-80">{p.score}</span>
                  <span className={`mt-1 grid w-full place-items-center rounded-t-xl bg-white/20 font-black ${k === 1 ? "h-16 text-2xl" : k === 0 ? "h-11 text-xl" : "h-8 text-lg"}`}>{k === 1 ? 1 : k === 0 ? 2 : 3}</span>
                </div>
              ) : null,
            )}
          </div>
          <div className="p-6 sm:p-8">
            <h1 className="text-[2rem] font-black leading-tight">{rank === 1 ? "You won! 🏆" : `You finished ${ordinal(rank)}`}</h1>
            <p className="text-ink-2">
              {me.correct} of {QUESTIONS} correct · {me.score} points
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-surface-2 px-4 py-2 font-black">
              <span className="xp-coin grid size-7 place-items-center rounded-full text-[0.6rem] text-[#5b3a00]">XP</span>
              {claimed === null ? "Saving…" : claimed.xp ? `+${claimed.xp} XP` : `${arenaXp(rank, me.correct)} XP not saved`}
            </div>
            {claimed?.message && <p className="mt-3 text-sm text-muted">{claimed.message}</p>}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <button onClick={onAgain} className={button("primary", "lg")}>
                Play again
              </button>
              <Link href="/games" className={button("secondary", "lg")}>
                All games
              </Link>
            </div>
          </div>
        </section>
        <section className="mt-6">
          <h2 className="mb-2 font-bold">Final scores</h2>
          <ol className="flex flex-col gap-1 rounded-2xl border border-line bg-surface p-2">
            {ranked.map((p, i) => (
              <li key={p.seat} className={`flex items-center gap-3 rounded-xl px-2 py-2 ${p.me ? "bg-[#7a3fc4]/10" : ""}`}>
                <span className="w-5 text-center font-black text-muted">{i + 1}</span>
                <Avatar p={p} size={36} />
                <span className="min-w-0 flex-1">
                  <Name p={p} />
                </span>
                <span className="text-sm text-muted">{p.correct}/{QUESTIONS}</span>
                <span className="w-14 text-right font-black tabular-nums">{p.score}</span>
              </li>
            ))}
          </ol>
        </section>
        {st.review && (
          <section className="mt-6">
            <h2 className="mb-2 font-bold">Learn from this match</h2>
            <ul className="flex flex-col gap-2">
              {st.review.map((r, i) => (
                <li key={i} className="rounded-2xl border border-line bg-surface p-4">
                  <p className="text-xs font-black uppercase tracking-wide text-muted">
                    {i + 1}. {ARENA_KIND_LABEL[r.kind]} {r.mine === r.answer ? <span className="text-good">✓</span> : <span className="text-bad">✗</span>}
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
