"use client";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Test, TestQ } from "@/content/tests/types";
import { LEVELS } from "@/content/tests";
import { TEST_UI } from "@/content/l10n/tests";
import { allQuestions, gradeQ, gradeTest, practiceBand, type TestAnswer } from "@/lib/tests/grade";
import { saveLocalAttempt } from "@/lib/tests/history";
import { useLang } from "@/lib/i18n/useLang";
import { pick, type Lang } from "@/lib/i18n";
import { useRewards } from "@/lib/rewards/client";
import { button, card } from "@/components/ui/styles";

type T = (k: keyof typeof TEST_UI) => string;

/** Runs an exam, a reading test or a Pre-IELTS reading test: questions, timer, grading, review. */
export function TestRunner({ test, back }: { test: Test; back: { href: string; label: string } }) {
  const lang = useLang();
  const t: T = (k) => TEST_UI[k][lang];
  const qs = useMemo(() => allQuestions(test), [test]);
  const [started, setStarted] = useState(!test.timed);
  const [answers, setAnswers] = useState<Record<string, TestAnswer>>({});
  const [startedAt, setStartedAt] = useState<number>(0);
  const [result, setResult] = useState<ReturnType<typeof gradeTest> | null>(null);
  const [timedOut, setTimedOut] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [tab, setTab] = useState<"text" | "vocab" | "translation" | "grammar">("text");
  const [inline, setInline] = useState(false);
  const { claim, status } = useRewards();
  const [claimMsg, setClaimMsg] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the clock starts when the test is shown
    if (started && !startedAt) setStartedAt(Date.now());
  }, [started, startedAt]);

  const limitMs = test.minutes * 60_000;
  const leftMs = test.timed && startedAt ? Math.max(0, limitMs - (now - startedAt)) : limitMs;

  const finish = (auto = false) => {
    if (result) return;
    const seconds = startedAt ? Math.round((Date.now() - startedAt) / 1000) : 0;
    const r = gradeTest(test, answers);
    setResult(r);
    setTimedOut(auto);
    setConfirm(false);
    saveLocalAttempt({ test_id: test.id, kind: test.kind, score: r.score, total: r.total, percent: r.percent, seconds, created_at: new Date().toISOString() });
    if (status !== "guest" && status !== "unavailable")
      void claim({ type: "test", testId: test.id, answers, seconds }).then((res) => {
        const xp = res ? res.granted.reduce((n, g) => n + g.xp, 0) : 0;
        setClaimMsg(res?.message ?? (xp ? `+${xp} XP` : null));
      });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const finishRef = useRef(finish);
  useEffect(() => {
    finishRef.current = finish;
  });
  useEffect(() => {
    if (!test.timed || !started || result) return;
    const id = setInterval(() => {
      setNow(Date.now());
      if (startedAt && Date.now() - startedAt >= limitMs) finishRef.current(true);
    }, 500);
    return () => clearInterval(id);
  }, [test.timed, started, result, startedAt, limitMs]);

  const answered = qs.filter((q) => answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== "").length;
  const level = test.level ? LEVELS.find((l) => l.id === test.level) : null;
  const set = (id: string, v: TestAnswer) => setAnswers((a) => ({ ...a, [id]: v }));

  const header = (
    <header>
      <Link href={back.href} className="text-sm font-bold text-muted hover:text-ink">
        ← {back.label}
      </Link>
      <p className="mt-3 text-sm font-bold uppercase tracking-wide text-muted">
        {level ? `${level[lang]} · ` : ""}
        {test.reading ? `${pick(test.reading.topic, lang)} · ` : ""}
        {qs.length} {t("questions")} · {test.minutes} {t("minutes")}
      </p>
      <h1 className="mt-1 text-[2rem] font-bold leading-tight tracking-[-0.02em]">{lang === "en" ? test.title.en : pick(test.title, lang)}</h1>
      <p className="mt-1 text-ink-2">{lang === "en" ? test.description.en : pick(test.description, lang)}</p>
    </header>
  );

  if (!started)
    return (
      <div className="mx-auto max-w-2xl" lang={lang}>
        {header}
        {test.passMark && (
          <p className="mt-4 text-sm text-muted">
            {t("passMark")}: {test.passMark}%
          </p>
        )}
        <button type="button" onClick={() => setStarted(true)} className={`${button("primary", "lg")} mt-6`}>
          {t("startTimed")} ({test.minutes} {t("minutes")})
        </button>
      </div>
    );

  const passage = test.passage && (
    <section className={`${card} p-5`} aria-label={test.passage.title}>
      {test.reading && (
        <div role="tablist" className="mb-4 flex flex-wrap gap-1">
          {(["text", "vocab", "translation", "grammar"] as const).map((k) => (
            <button key={k} role="tab" aria-selected={tab === k} type="button" onClick={() => setTab(k)} className={`rounded-full px-3 py-1.5 text-sm font-bold ${tab === k ? "bg-ink text-paper" : "bg-surface-2 text-ink-2"}`}>
              {k === "text" ? t("text") : k === "vocab" ? t("vocab") : k === "translation" ? t("translation") : t("grammar")}
            </button>
          ))}
        </div>
      )}
      {tab === "text" && (
        <div lang="en">
          <h2 className="specimen text-xl font-bold">{test.passage.title}</h2>
          {test.reading && lang !== "en" && (
            <label className="mt-2 flex items-center gap-2 text-sm text-muted" lang={lang}>
              <input type="checkbox" checked={inline} onChange={(e) => setInline(e.target.checked)} />
              {t("showTranslation")}
            </label>
          )}
          <div className="mt-3 flex flex-col gap-3">
            {test.passage.paragraphs.map((p, i) => (
              <div key={i}>
                <p className="specimen leading-relaxed">
                  {test.passage!.labels && <span className="mr-2 font-black">{test.passage!.labels[i]}</span>}
                  {p}
                </p>
                {inline && test.reading && lang !== "en" && (
                  <p className="mt-1 border-l-2 border-line-strong pl-3 text-sm text-muted" lang={lang}>
                    {test.reading.translation[lang][i]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {tab === "vocab" && test.reading && (
        <ul className="grid gap-1.5 sm:grid-cols-2">
          {test.reading.vocab.map((v) => (
            <li key={v.en} className="rounded-xl bg-surface-2 px-3 py-2">
              <span className="font-bold" lang="en">
                {v.en}
              </span>{" "}
              <span className="text-sm text-ink-2">— {lang === "ru" ? v.ru : v.az}</span>
            </li>
          ))}
        </ul>
      )}
      {tab === "translation" && test.reading && (
        <div className="flex flex-col gap-3" lang={lang === "en" ? "az" : lang}>
          {test.reading.translation[lang === "ru" ? "ru" : "az"].map((p, i) => (
            <p key={i} className="leading-relaxed text-ink-2">
              {p}
            </p>
          ))}
        </div>
      )}
      {tab === "grammar" && test.reading && (
        <ul className="flex flex-col gap-2">
          {test.reading.grammar.map((g, i) => (
            <li key={i} className="rounded-xl bg-surface-2 p-3">
              <p className="specimen font-bold" lang="en">
                {g.en}
              </p>
              <p className="text-sm text-ink-2">{pick(g.note, lang === "en" ? "az" : lang)}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );

  if (result) {
    const pass = test.passMark ? result.percent >= test.passMark : null;
    return (
      <div className="mx-auto flex max-w-3xl flex-col gap-6" lang={lang}>
        {header}
        <section className={`${card} p-6 text-center`} role="status">
          {timedOut && <p className="mb-2 text-sm font-bold text-warn">{t("timeUp")}</p>}
          <p className="text-sm font-bold uppercase tracking-wide text-muted">{t("result")}</p>
          <p className="mt-1 text-[3rem] font-black tabular-nums leading-none">{result.percent}%</p>
          <p className="mt-1 text-ink-2">
            {result.score} / {result.total}
          </p>
          {pass !== null && <p className={`mt-2 font-black ${pass ? "text-good" : "text-bad"}`}>{pass ? t("passed") : `${t("notPassed")} · ${t("passMark")} ${test.passMark}%`}</p>}
          {test.kind === "ielts-reading" && (
            <div className="mt-3">
              <p className="font-bold">
                {t("band")}: {practiceBand(result.percent)}
              </p>
              <p className="text-xs text-muted">{t("practiceOnly")}</p>
            </div>
          )}
          <p className="mt-3 text-sm font-bold">{status === "guest" ? t("savedLocal") : claimMsg}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                setResult(null);
                setAnswers({});
                setStartedAt(0);
                setStarted(!test.timed);
                setClaimMsg(null);
              }}
              className={button("primary")}
            >
              {t("again")}
            </button>
            <Link href={back.href} className={button("secondary")}>
              {back.label}
            </Link>
          </div>
        </section>
        {passage}
        <section>
          <h2 className="text-xl font-bold">{t("review")}</h2>
          <ol className="mt-3 flex flex-col gap-3">
            {qs.map((q, i) => (
              <ReviewItem key={q.id} q={q} n={i + 1} answer={answers[q.id] ?? null} lang={lang} t={t} />
            ))}
          </ol>
        </section>
      </div>
    );
  }

  return (
    <div className={`mx-auto ${test.passage ? "max-w-6xl" : "max-w-2xl"}`} lang={lang}>
      <div className="max-w-2xl">{header}</div>
      {test.timed && (
        <div className="sticky top-14 z-20 mt-4 flex items-center justify-between rounded-2xl border border-line bg-paper/95 px-4 py-2 backdrop-blur md:top-2">
          <span className="text-sm font-bold text-muted">
            {answered}/{qs.length}
          </span>
          <span className={`font-black tabular-nums ${leftMs < 60_000 ? "text-bad" : ""}`} aria-label={t("timeLeft")}>
            ⏱ {Math.floor(leftMs / 60_000)}:{String(Math.floor((leftMs % 60_000) / 1000)).padStart(2, "0")}
          </span>
        </div>
      )}
      <div className={`mt-6 grid gap-6 ${test.passage ? "lg:grid-cols-2 lg:items-start" : ""}`}>
        {test.passage && <div className="lg:sticky lg:top-20 lg:max-h-[calc(100dvh-6rem)] lg:overflow-y-auto">{passage}</div>}
        <div className="flex flex-col gap-6">
          {test.sections.map((s, si) => (
            <section key={si}>
              {s.title && <h2 className="font-bold">{s.title}</h2>}
              {s.instructions && <p className="text-sm text-muted">{lang === "en" ? s.instructions.en : pick(s.instructions, lang)}</p>}
              <ol className="mt-3 flex flex-col gap-3">
                {s.questions.map((q) => (
                  <li key={q.id} className={`${card} p-4`}>
                    <Question q={q} n={qs.indexOf(q) + 1} value={answers[q.id] ?? null} onChange={(v) => set(q.id, v)} lang={lang} t={t} />
                  </li>
                ))}
              </ol>
            </section>
          ))}
          {confirm ? (
            <div className={`${card} p-4`} role="alertdialog" aria-label={t("confirmSubmit")}>
              <p className="font-bold">{t("confirmSubmit")}</p>
              <div className="mt-3 flex gap-2">
                <button type="button" onClick={() => finish()} className={button("primary")}>
                  {t("yesSubmit")}
                </button>
                <button type="button" onClick={() => setConfirm(false)} className={button("ghost")}>
                  {t("keepGoing")}
                </button>
              </div>
            </div>
          ) : (
            <button type="button" onClick={() => (answered < qs.length ? setConfirm(true) : finish())} className={`${button("primary", "lg")} self-start`}>
              {t("submit")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const tfLabels = (q: Extract<TestQ, { type: "tfng" }>, t: T) => [
  ["T", q.yesNo ? t("yes") : t("true")],
  ["F", q.yesNo ? t("no") : t("false")],
  ["NG", t("notGiven")],
] as const;

function Question({ q, n, value, onChange, lang, t }: { q: TestQ; n: number; value: TestAnswer; onChange: (v: TestAnswer) => void; lang: Lang; t: T }) {
  const num = <span className="mr-2 font-black text-muted">{n}.</span>;
  if (q.type === "match")
    return (
      <label className="block">
        <span className="specimen font-bold" lang="en">
          {num}
          {q.prompt}
        </span>
        <select value={typeof value === "number" ? value : ""} onChange={(e) => onChange(e.target.value === "" ? null : Number(e.target.value))} lang="en" className="mt-2 h-12 w-full rounded-xl border border-line-strong bg-surface px-3 focus:border-ink focus:outline-none">
          <option value="">—</option>
          {q.options.map((o, k) => (
            <option key={k} value={k}>
              {o}
            </option>
          ))}
        </select>
      </label>
    );
  if (q.type === "choice")
    return (
      <fieldset>
        <legend className="specimen font-bold" lang="en">
          {num}
          {q.prompt}
        </legend>
        <div className="mt-3 grid gap-1.5" lang="en">
          {q.options.map((o, k) => (
            <label key={k} className={`flex cursor-pointer items-start gap-2 rounded-xl border px-3 py-2 ${value === k ? "border-ink bg-surface-2" : "border-line"}`}>
              <input type="radio" name={q.id} checked={value === k} onChange={() => onChange(k)} className="mt-1" />
              <span className="specimen">{o}</span>
            </label>
          ))}
        </div>
      </fieldset>
    );
  if (q.type === "tfng")
    return (
      <fieldset>
        <legend className="specimen font-bold" lang="en">
          {num}
          {q.prompt}
        </legend>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tfLabels(q, t).map(([v, label]) => (
            <button key={v} type="button" aria-pressed={value === v} onClick={() => onChange(v)} className={`rounded-xl border px-3 py-2 text-sm font-bold ${value === v ? "border-ink bg-ink text-paper" : "border-line-strong"}`}>
              {label}
            </button>
          ))}
        </div>
      </fieldset>
    );
  if (q.type === "order") return <OrderQ q={q} n={n} value={value} onChange={onChange} t={t} />;
  const instruction = q.type === "transform" ? (lang === "en" ? q.instruction.en : pick(q.instruction, lang)) : null;
  return (
    <div>
      <p className="specimen font-bold" lang="en">
        {num}
        {q.prompt}
      </p>
      {instruction && <p className="mt-1 text-sm font-bold text-ink-2">{instruction}</p>}
      {q.type === "short" && q.maxWords && <p className="mt-1 text-xs text-muted">{t("maxWords").replace("{n}", String(q.maxWords))}</p>}
      <input value={typeof value === "string" ? value : ""} onChange={(e) => onChange(e.target.value)} lang="en" autoComplete="off" autoCapitalize="off" spellCheck={false} aria-label={`${n}. ${t("typeAnswer")}`} placeholder={t("typeAnswer")} className="mt-3 h-12 w-full rounded-xl border border-line-strong bg-surface px-3 focus:border-ink focus:outline-none" />
    </div>
  );
}

function OrderQ({ q, n, value, onChange, t }: { q: Extract<TestQ, { type: "order" }>; n: number; value: TestAnswer; onChange: (v: TestAnswer) => void; t: T }) {
  const picked = typeof value === "string" && value ? value.split(" ") : [];
  const remaining = [...q.tiles];
  for (const w of picked) remaining.splice(remaining.indexOf(w), 1);
  return (
    <div>
      <p className="font-bold">
        <span className="mr-2 font-black text-muted">{n}.</span>
        {t("tapToOrder")}
      </p>
      <div className="mt-2 min-h-12 rounded-xl border-2 border-dashed border-line-strong p-2" lang="en">
        <span className="specimen">{picked.join(" ")}</span>
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5" lang="en">
        {remaining.map((w, k) => (
          <button key={`${w}-${k}`} type="button" onClick={() => onChange([...picked, w].join(" "))} className="specimen rounded-lg border border-line-strong px-2.5 py-1.5 hover:border-ink">
            {w}
          </button>
        ))}
        {picked.length > 0 && (
          <button type="button" onClick={() => onChange("")} className="rounded-lg px-2.5 py-1.5 text-sm font-bold text-muted underline">
            {t("clear")}
          </button>
        )}
      </div>
    </div>
  );
}

function shown(q: TestQ, a: TestAnswer, t: T): string {
  if (a === null || a === "") return t("noAnswer");
  if ((q.type === "choice" || q.type === "match") && typeof a === "number") return q.options[a] ?? t("noAnswer");
  if (q.type === "tfng") return tfLabels(q, t).find(([v]) => v === a)?.[1] ?? String(a);
  return String(a);
}

function correctText(q: TestQ, t: T): string {
  if (q.type === "choice" || q.type === "match") return q.options[q.answer];
  if (q.type === "tfng") return tfLabels(q, t).find(([v]) => v === q.answer)![1];
  if (q.type === "order") return q.answer;
  return q.accept[0];
}

function ReviewItem({ q, n, answer, lang, t }: { q: TestQ; n: number; answer: TestAnswer; lang: Lang; t: T }) {
  const ok = gradeQ(q, answer);
  const prompt = q.type === "order" ? q.tiles.join(" / ") : q.prompt;
  return (
    <li className={`${card} p-4`}>
      <p className="flex gap-2 font-bold">
        <span className={ok ? "text-good" : "text-bad"}>{ok ? "✓" : "✗"}</span>
        <span className="specimen" lang="en">
          {n}. {prompt}
        </span>
      </p>
      {!ok && (
        <p className="mt-1 text-sm">
          <span className="text-muted">{t("yourAnswer")}:</span>{" "}
          <span lang="en" className="text-bad">
            {shown(q, answer, t)}
          </span>
        </p>
      )}
      <p className="mt-0.5 text-sm">
        <span className="text-muted">{t("correctAnswer")}:</span>{" "}
        <span lang="en" className="font-bold text-good">
          {correctText(q, t)}
        </span>
      </p>
      <p className="mt-1 text-sm text-ink-2">💡 {pick(q.why, lang === "en" ? "az" : lang)}</p>
    </li>
  );
}
