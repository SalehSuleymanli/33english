"use client";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { DRILL_META, drillStars, drillXp, gradeItem, itemPoints, makeRound, type DrillAnswer, type DrillId, type DrillItem } from "@/lib/game/drills";
import { DRILL_TEXT, DRILL_UI } from "@/content/l10n/drills";
import { useLang } from "@/lib/i18n/useLang";
import type { Lang } from "@/lib/i18n";
import { useRewards } from "@/lib/rewards/client";
import { useDrillStats } from "@/lib/game/drillStats";
import { frameClass } from "@/content/frames";
import { button, card } from "@/components/ui/styles";
import { SpeakButton } from "@/components/ui/Speak";
import { GameBar } from "./GameBar";

const newSeed = () => 1 + Math.floor(Math.random() * 2_000_000_000);

export function DrillGame({ game }: { game: DrillId }) {
  const lang = useLang();
  const T = (k: keyof typeof DRILL_UI) => DRILL_UI[k][lang];
  const text = DRILL_TEXT[game];
  const [seed, setSeed] = useState<number | null>(null);
  const items = useMemo(() => (seed ? makeRound(game, seed) : []), [game, seed]);
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<DrillAnswer[]>([]);
  const [checked, setChecked] = useState(false);
  const [bonus, setBonus] = useState(0);
  const [done, setDone] = useState(false);
  const { claim, status } = useRewards();
  const { stats, record } = useDrillStats();
  const [claimMsg, setClaimMsg] = useState<string | null>(null);

  const start = () => {
    setSeed(newSeed());
    setI(0);
    setAnswers([]);
    setChecked(false);
    setBonus(0);
    setDone(false);
    setClaimMsg(null);
  };

  const submit = (a: DrillAnswer, msLeft?: number) => {
    const next = [...answers];
    next[i] = a;
    setAnswers(next);
    setChecked(true);
    if (game === "battle" && msLeft && gradeItem(items[i], a)) setBonus((b) => b + Math.ceil(msLeft / 1000));
  };

  const advance = () => {
    if (i + 1 < items.length) {
      setI(i + 1);
      setChecked(false);
      return;
    }
    setDone(true);
  };

  const points = items.reduce((n, it, k) => n + gradeItem(it, answers[k] ?? null), 0);
  const total = items.reduce((n, it) => n + itemPoints(it), 0);
  const percent = total ? Math.round((points / total) * 100) : 0;

  const finished = useRef<number | null>(null);
  useEffect(() => {
    if (!done || !seed || finished.current === seed) return;
    finished.current = seed;
    record(game, percent);
    if (status === "guest" || status === "unavailable") return;
    void claim({ type: "drill", game, seed, answers }, { won: percent >= 50, stars: drillStars(percent) }).then((r) => {
      const xp = r ? r.granted.reduce((n, g) => n + g.xp, 0) : 0;
      setClaimMsg(r?.message ?? (xp ? `+${xp} XP` : null));
    });
  }, [done, seed, game, percent, answers, claim, record, status]);

  if (!seed)
    return (
      <>
        <GameBar title={text.name[lang]} />
        <main className="mx-auto max-w-xl px-4 pb-16 pt-8" lang={lang}>
          <p className="text-5xl">{text.icon}</p>
          <h1 className="mt-2 text-[2rem] font-black leading-tight">{text.name[lang]}</h1>
          <p className="mt-2 text-lg text-ink-2">{text.short[lang]}</p>
          <p className={`${card} mt-5 p-4 text-ink-2`}>{text.how[lang]}</p>
          <p className="mt-4 text-sm text-muted">
            {stats[game] ? `${T("best")}: ${stats[game]!.best}% · ${T("plays")}: ${stats[game]!.plays}` : T("never")}
          </p>
          <button type="button" onClick={start} className={`${button("primary", "lg")} mt-6`}>
            {T("start")}
          </button>
          {status === "guest" && <p className="mt-4 text-sm text-muted">{T("xpGuest")}</p>}
        </main>
      </>
    );

  if (done) {
    const stars = drillStars(percent);
    const xp = drillXp(points, total);
    return (
      <>
        <GameBar title={text.name[lang]} />
        <main className="mx-auto max-w-xl px-4 pb-16 pt-8" lang={lang}>
          <section className={`${card} p-6 text-center`}>
            <p className="text-sm font-bold uppercase tracking-wide text-muted">{T("results")}</p>
            <p className="mt-2 text-4xl" aria-label={`${stars} of 3 stars`}>
              {"★".repeat(stars)}
              <span className="text-line-strong">{"★".repeat(3 - stars)}</span>
            </p>
            <p className="mt-2 text-[2.5rem] font-black tabular-nums">{percent}%</p>
            <p className="text-ink-2">
              {points} / {total}
              {game === "battle" && bonus > 0 ? ` · +${bonus} speed` : ""}
            </p>
            <p className="mt-3 text-sm font-bold">{status === "guest" ? T("xpGuest") : claimMsg ?? (xp ? T("saving") : "")}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <button type="button" onClick={start} className={button("primary", "lg")}>
                {T("again")}
              </button>
              <Link href="/games" className={button("secondary", "lg")}>
                {T("allGames")}
              </Link>
            </div>
          </section>
          <h2 className="mt-8 font-bold">{T("review")}</h2>
          <ol className="mt-2 flex flex-col gap-2">
            {items.map((it, k) => (
              <li key={k} className={`${card} p-3 text-sm`}>
                <ReviewLine item={it} answer={answers[k] ?? null} lang={lang} />
              </li>
            ))}
          </ol>
        </main>
      </>
    );
  }

  const item = items[i];
  const right = checked && gradeItem(item, answers[i] ?? null) === itemPoints(item);
  return (
    <>
      <GameBar title={text.name[lang]} right={<span className="text-sm font-bold tabular-nums text-muted">{i + 1}/{items.length}</span>} />
      <main className={`mx-auto max-w-xl px-4 pb-16 pt-6 ${"frame" in item ? frameClass(item.frame) : ""}`} lang={lang}>
        <div className="h-2 overflow-hidden rounded-full bg-surface-2" role="progressbar" aria-valuenow={i} aria-valuemin={0} aria-valuemax={items.length} aria-label="Progress">
          <div className="h-full rounded-full bg-ink transition-[width]" style={{ width: `${(i / items.length) * 100}%` }} />
        </div>
        <div key={`${seed}-${i}`} className="anim-rise mt-6">
          {item.kind === "order" && <OrderItem item={item} checked={checked} onSubmit={submit} T={T} />}
          {item.kind === "choice" && <ChoiceItem item={item} checked={checked} answer={answers[i]} onSubmit={submit} seconds={DRILL_META[game].seconds} T={T} />}
          {item.kind === "detect" && <DetectItem item={item} checked={checked} answer={answers[i]} onSubmit={submit} T={T} />}
          {item.kind === "type" && <TypeItem item={item} checked={checked} onSubmit={submit} lang={lang} T={T} />}
          {item.kind === "match" && <MatchItem item={item} checked={checked} answer={answers[i]} onSubmit={submit} lang={lang} T={T} />}
        </div>
        {checked && (
          <div className={`anim-drop mt-5 rounded-2xl p-4 ${right ? "bg-good/10" : "bg-bad/10"}`} role="status">
            <p className={`font-black ${right ? "text-good" : "text-bad"}`}>{right ? T("right") : answers[i] === null ? T("timeUp") : T("wrong")}</p>
            {!right && <Model item={item} lang={lang} T={T} />}
            {"tip" in item && item.tip && <p className="mt-1 text-sm text-ink-2">💡 {item.tip[lang]}</p>}
            <button type="button" onClick={advance} className={`${button("primary")} mt-3`} autoFocus>
              {i + 1 < items.length ? T("next") : T("finish")}
            </button>
          </div>
        )}
      </main>
    </>
  );
}

type TFn = (k: keyof typeof DRILL_UI) => string;

function Model({ item, lang, T }: { item: DrillItem; lang: Lang; T: TFn }) {
  const model =
    item.kind === "order" ? item.answer : item.kind === "choice" ? item.prompt.replace("___", item.options[item.answer]) : item.kind === "detect" ? (item.answer === 0 ? T("correctAsIs") : item.options[item.answer]) : item.kind === "type" ? item.accept[0] : item.pairs.map((p) => `${p.en} — ${lang === "ru" ? p.ru : p.az}`).join(" · ");
  return (
    <p className="mt-1 text-sm">
      <span className="font-bold">{T("answerIs")}</span>{" "}
      <span lang="en" className="specimen">
        {model}
      </span>
    </p>
  );
}

function ReviewLine({ item, answer, lang }: { item: DrillItem; answer: DrillAnswer; lang: Lang }) {
  const ok = gradeItem(item, answer) === itemPoints(item);
  const label = item.kind === "order" ? item.answer : item.kind === "choice" ? item.prompt.replace("___", item.options[item.answer]) : item.kind === "detect" ? item.sentence : item.kind === "type" ? `${item.prompt} → ${item.accept[0]}` : item.pairs.map((p) => `${p.en} = ${lang === "ru" ? p.ru : p.az}`).join(", ");
  return (
    <p className="flex gap-2">
      <span className={ok ? "text-good" : "text-bad"}>{ok ? "✓" : "✗"}</span>
      <span lang="en">{label}</span>
    </p>
  );
}

function OrderItem({ item, checked, onSubmit, T }: { item: Extract<DrillItem, { kind: "order" }>; checked: boolean; onSubmit: (a: DrillAnswer) => void; T: TFn }) {
  const [picked, setPicked] = useState<number[]>([]);
  const left = item.tiles.map((t, k) => ({ t, k })).filter((x) => !picked.includes(x.k));
  return (
    <div>
      <div className="min-h-16 rounded-2xl border-2 border-dashed border-line-strong p-3" aria-label="Your sentence">
        <div className="flex flex-wrap gap-2" lang="en">
          {picked.map((k) => (
            <button key={k} type="button" disabled={checked} onClick={() => setPicked(picked.filter((x) => x !== k))} className="specimen rounded-xl bg-f-tint px-3 py-2 text-lg font-semibold text-f">
              {item.tiles[k]}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2" lang="en">
        {left.map(({ t, k }) => (
          <button key={k} type="button" disabled={checked} onClick={() => setPicked([...picked, k])} className="specimen rounded-xl border border-line-strong bg-surface px-3 py-2 text-lg hover:border-ink">
            {t}
          </button>
        ))}
      </div>
      {!checked && (
        <div className="mt-5 flex gap-2">
          <button type="button" disabled={left.length > 0} onClick={() => onSubmit(picked.map((k) => item.tiles[k]).join(" "))} className={button("primary")}>
            {T("check")}
          </button>
          <button type="button" onClick={() => setPicked([])} className={button("ghost")}>
            {T("clear")}
          </button>
        </div>
      )}
    </div>
  );
}

function optionTone(k: number, answer: DrillAnswer | undefined, correct: number, checked: boolean) {
  if (!checked) return "hover:-translate-y-0.5 hover:border-ink";
  if (k === correct) return "border-good bg-good/15";
  if (k === answer) return "border-bad bg-bad/10";
  return "opacity-60";
}

function ChoiceItem({ item, checked, answer, onSubmit, seconds, T }: { item: Extract<DrillItem, { kind: "choice" }>; checked: boolean; answer: DrillAnswer | undefined; onSubmit: (a: DrillAnswer, msLeft?: number) => void; seconds?: number; T: TFn }) {
  const [left, setLeft] = useState(seconds ? seconds * 1000 : 0);
  const sent = useRef(false);
  useEffect(() => {
    if (!seconds || checked) return;
    const startedAt = Date.now();
    const id = setInterval(() => {
      const rest = seconds * 1000 - (Date.now() - startedAt);
      setLeft(Math.max(0, rest));
      if (rest <= 0 && !sent.current) {
        sent.current = true;
        onSubmit(null);
      }
    }, 100);
    return () => clearInterval(id);
  }, [seconds, checked]); // eslint-disable-line react-hooks/exhaustive-deps
  const choose = (k: number) => {
    if (checked || sent.current) return;
    sent.current = true;
    onSubmit(k, left);
  };
  return (
    <div>
      {seconds && (
        <div className="mb-4 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2" aria-hidden>
            <div className="h-full rounded-full" style={{ width: `${(left / (seconds * 1000)) * 100}%`, background: left > 4000 ? "var(--ink)" : "var(--bad)" }} />
          </div>
          <span className="w-8 text-right font-black tabular-nums">{Math.ceil(left / 1000)}</span>
        </div>
      )}
      <p className="specimen text-[1.5rem] leading-snug" lang="en">
        {item.prompt}
      </p>
      <div className="mt-5 grid gap-2" lang="en">
        {item.options.map((o, k) => (
          <button key={k} type="button" disabled={checked} onClick={() => choose(k)} className={`min-h-12 rounded-2xl border border-line-strong bg-surface px-4 py-2.5 text-left text-lg font-bold transition ${optionTone(k, answer, item.answer, checked)}`}>
            {o}
          </button>
        ))}
      </div>
      <span className="sr-only">{T("check")}</span>
    </div>
  );
}

function DetectItem({ item, checked, answer, onSubmit, T }: { item: Extract<DrillItem, { kind: "detect" }>; checked: boolean; answer: DrillAnswer | undefined; onSubmit: (a: DrillAnswer) => void; T: TFn }) {
  return (
    <div>
      <p className="flex items-start gap-2 text-[1.5rem] leading-snug">
        <span className="specimen flex-1" lang="en">
          {item.sentence}
        </span>
        <SpeakButton text={item.sentence} />
      </p>
      <div className="mt-5 grid gap-2">
        {item.options.map((o, k) => (
          <button key={k} type="button" disabled={checked} onClick={() => onSubmit(k)} className={`min-h-12 rounded-2xl border border-line-strong bg-surface px-4 py-2.5 text-left font-bold transition ${optionTone(k, answer, item.answer, checked)}`}>
            {k === 0 ? (
              <>✓ {T("correctAsIs")}</>
            ) : (
              <>
                <span className="text-sm text-muted">{T("shouldBe")}</span>{" "}
                <span lang="en" className="specimen">
                  {o}
                </span>
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function TypeItem({ item, checked, onSubmit, lang, T }: { item: Extract<DrillItem, { kind: "type" }>; checked: boolean; onSubmit: (a: DrillAnswer) => void; lang: Lang; T: TFn }) {
  const [v, setV] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!checked && v.trim()) onSubmit(v);
      }}
    >
      <p className="text-sm font-bold uppercase tracking-wide text-f">{item.instruction[lang]}</p>
      <p className="specimen mt-2 text-[1.5rem] leading-snug" lang="en">
        {item.prompt}
      </p>
      <input value={v} onChange={(e) => setV(e.target.value)} disabled={checked} autoFocus autoComplete="off" autoCapitalize="off" spellCheck={false} lang="en" aria-label={T("typeHere")} placeholder={T("typeHere")} className="mt-5 h-14 w-full rounded-2xl border-2 border-line-strong bg-surface px-4 text-lg focus:border-ink focus:outline-none" />
      {!checked && (
        <button type="submit" disabled={!v.trim()} className={`${button("primary")} mt-4`}>
          {T("check")}
        </button>
      )}
    </form>
  );
}

function MatchItem({ item, checked, answer, onSubmit, lang, T }: { item: Extract<DrillItem, { kind: "match" }>; checked: boolean; answer: DrillAnswer | undefined; onSubmit: (a: DrillAnswer) => void; lang: Lang; T: TFn }) {
  const [pairs, setPairs] = useState<number[]>(() => item.pairs.map(() => -1)); // word i → meaning index
  const [sel, setSel] = useState<number | null>(null);
  const meaning = (k: number) => (lang === "ru" ? item.pairs[k].ru : item.pairs[k].az);
  const shown = Array.isArray(answer) ? (answer as number[]) : pairs;
  const takeMeaning = (m: number) => {
    if (checked || sel === null) return;
    const next = pairs.map((x) => (x === m ? -1 : x));
    next[sel] = m;
    setPairs(next);
    setSel(null);
  };
  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <ul className="flex flex-col gap-2" lang="en">
          {item.pairs.map((p, w) => {
            const ok = checked && shown[w] === w;
            return (
              <li key={w}>
                <button type="button" disabled={checked} onClick={() => setSel(w)} className={`w-full rounded-2xl border px-3 py-2.5 text-left font-bold transition ${sel === w ? "border-ink ring-2 ring-ink" : "border-line-strong"} ${checked ? (ok ? "border-good bg-good/15" : "border-bad bg-bad/10") : "bg-surface"}`}>
                  {p.en}
                  {shown[w] >= 0 && <span className="block text-xs font-normal text-muted" lang={lang}>→ {meaning(shown[w])}</span>}
                </button>
              </li>
            );
          })}
        </ul>
        <ul className="flex flex-col gap-2" lang={lang}>
          {item.order.map((m) => (
            <li key={m}>
              <button type="button" disabled={checked || sel === null} onClick={() => takeMeaning(m)} className={`w-full rounded-2xl border border-line-strong bg-surface px-3 py-2.5 text-left transition ${pairs.includes(m) ? "opacity-50" : ""} ${sel !== null && !checked ? "hover:border-ink" : ""}`}>
                {meaning(m)}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {!checked && (
        <button type="button" disabled={pairs.includes(-1)} onClick={() => onSubmit(pairs)} className={`${button("primary")} mt-5`}>
          {T("check")}
        </button>
      )}
    </div>
  );
}
