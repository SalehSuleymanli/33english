"use client";

import Link from "next/link";
import { useState } from "react";
import { PLACEMENT, scorePlacement } from "@/content/placement";
import { useLearner } from "@/lib/learner/store";
import { recordAnswer, setProfile } from "@/lib/learner/state";
import { LangSwitch } from "@/components/app/LangSwitch";
import { useT } from "@/lib/i18n/useLang";
import { summaryByDay, isFreeDay } from "@/content/curriculum";
import { FRAMES } from "@/content/frames";
import { button, card } from "@/components/ui/styles";

const BAND_TEXT = {
  starter: "Start at Day 1. You'll build the six frames from the ground up — the foundation everything else rests on.",
  builder: "You know the basic frames well. Start at Day 11, where verbs start linking together — comparisons, who / which, and then the perfect tenses. Feel free to revisit any earlier day.",
  connector: "You handle the frames and combinations. Start with the communication stage at Day 20 — and use review to fill any gaps.",
};

export function OnboardingView() {
  const { dispatch, state } = useLearner();
  const t = useT();
  const [stage, setStage] = useState<"intro" | "quiz" | "result">("intro");
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<ReturnType<typeof scorePlacement> | null>(null);
  const [name, setName] = useState(state.profile.displayName ?? "");

  const q = PLACEMENT[i];

  const answer = (k: number) => {
    const next = { ...answers, [q.id]: k };
    setAnswers(next);
    if (i < PLACEMENT.length - 1) setI(i + 1);
    else {
      const r = scorePlacement(next);
      setResult(r);
      dispatch((s) => {
        let x = s;
        for (const p of PLACEMENT) {
          const area = p.area;
          x = recordAnswer(x, {
            exerciseId: p.id,
            day: 0,
            correct: next[p.id] === p.answer,
            answer: p.options[next[p.id]] ?? "",
            source: "placement",
            frame: FRAMES.some((f) => f.id === area) ? (area as never) : undefined,
            skipReview: true,
          });
        }
        return setProfile(x, { onboarded: true, displayName: name.trim() || x.profile.displayName, placement: { takenAt: new Date().toISOString(), ...r } });
      });
      setStage("result");
    }
  };

  if (stage === "intro")
    return (
      <div className="mx-auto max-w-xl">
        <p className="text-sm font-bold">{t("lang.choose")}</p>
        <div className="mt-2">
          <LangSwitch />
        </div>
        <h1 className="mt-8 text-[2.2rem] font-bold leading-tight tracking-[-0.02em]">{t("onb.title")}</h1>
        <p className="mt-3 text-lg text-ink-2">{t("onb.body")}</p>
        <Link href="/intro" className="mt-3 inline-block font-bold underline underline-offset-4">
          {t("onb.intro")} →
        </Link>
        <label className="mt-6 block">
          <span className="text-sm font-bold">{t("onb.name")}</span>
          <input value={name} onChange={(e) => setName(e.target.value)} maxLength={80} className="mt-1 h-12 w-full rounded-xl border border-line-strong bg-surface px-4" />
        </label>
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={() => setStage("quiz")} className={button("primary", "lg")}>
            {t("onb.start")}
          </button>
          <Link
            href="/learn/1"
            onClick={() => dispatch((s) => setProfile(s, { onboarded: true, displayName: name.trim() || s.profile.displayName }))}
            className={button("secondary", "lg")}
          >
            {t("onb.skip")}
          </Link>
        </div>
      </div>
    );

  if (stage === "quiz")
    return (
      <div className="mx-auto max-w-xl">
        <div className="flex items-center gap-3">
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-2" role="progressbar" aria-label="Placement progress" aria-valuenow={i} aria-valuemin={0} aria-valuemax={PLACEMENT.length}>
            <div className="h-full rounded-full bg-ink transition-[width]" style={{ width: `${(i / PLACEMENT.length) * 100}%` }} />
          </div>
          <span className="text-sm tabular-nums text-muted">
            {i + 1}/{PLACEMENT.length}
          </span>
        </div>
        <h1 className="specimen mt-8 text-[1.75rem] leading-snug" aria-live="polite">
          {q.q}
        </h1>
        <div className="mt-6 grid gap-2.5" key={q.id}>
          {q.options.map((o, k) => (
            <button key={k} type="button" onClick={() => answer(k)} className="specimen anim-rise min-h-14 rounded-2xl border-2 border-line-strong bg-surface px-4 text-left text-lg hover:border-ink">
              {o}
            </button>
          ))}
          <button type="button" onClick={() => answer(-1)} className="mt-2 self-start text-sm font-bold text-muted underline underline-offset-4">
            {t("onb.dontKnow")}
          </button>
        </div>
      </div>
    );

  const r = result!;
  const s = summaryByDay(r.suggestedStartDay)!;
  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-[2.2rem] font-bold leading-tight tracking-[-0.02em]">Suggested start: Day {r.suggestedStartDay}</h1>
      <p className="mt-3 text-lg text-ink-2">{BAND_TEXT[r.band]}</p>
      <div className={`${card} mt-6 p-5`}>
        <p className="text-sm font-bold text-muted">
          {r.score} of {r.total} correct
        </p>
        <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
          {Object.entries(r.byArea).map(([k, v]) => (
            <li key={k} className="flex justify-between">
              <span className="capitalize">{k}</span>
              <span className="tabular-nums text-muted">
                {v.correct}/{v.total}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted">A quick estimate from 18 questions — not an official CEFR level.</p>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={`/learn/${r.suggestedStartDay}`} className={button("primary", "lg")}>
          Go to Day {r.suggestedStartDay}: {s.title}
        </Link>
        {r.suggestedStartDay !== 1 && (
          <Link href="/learn/1" className={button("secondary", "lg")}>
            Start at Day 1 anyway
          </Link>
        )}
      </div>
      {!isFreeDay(r.suggestedStartDay) && <p className="mt-4 text-sm text-muted">Day {r.suggestedStartDay} is part of Premium. Days 1–7 are free and still useful as a refresher.</p>}
    </div>
  );
}
