"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Exercise } from "@/content/types";
import { useLearner } from "@/lib/learner/store";
import { completedDays, recordAnswer } from "@/lib/learner/state";
import { buildQueue, describeBox, nextDue, type ReviewItem } from "@/engine/srs";
import { challengeFromId } from "@/engine/challenges";
import { summaryByDay } from "@/content/curriculum";
import { ExercisePlayer } from "@/components/learn/ExercisePlayer";
import { SpeakButton } from "@/components/ui/Speak";
import { button, card } from "@/components/ui/styles";

type Card =
  | { kind: "exercise"; item?: ReviewItem; ex: Exercise; day: number }
  | { kind: "vocab"; item: ReviewItem; term: string; meaning: string; example: string };

type Session = { title: string; source: "review" | "lesson"; cards: Card[] };

async function fetchExercises(body: { ids: string[] } | { day: number }): Promise<(Exercise & { day: number })[]> {
  const r = await fetch("/api/exercises", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!r.ok) throw new Error("Couldn't load practice items.");
  return (await r.json()).exercises;
}

function labExercise(id: string): Exercise | null {
  const c = challengeFromId(id);
  if (!c) return null;
  return { id, type: "transform", prompt: "Transform the sentence.", source: c.source, instruction: c.instruction, accept: c.accept, explanation: "This came from a Sentence Lab challenge you missed." };
}

function shuffle<T>(a: T[]) {
  const x = [...a];
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

export function PracticeView() {
  const { state, hydrated } = useLearner();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const items = useMemo(() => Object.values(state.review), [state.review]);
  const due = useMemo(() => (hydrated ? buildQueue(items, new Date(), state.profile.dailyGoal) : []), [items, hydrated, state.profile.dailyGoal]);
  const mistakes = useMemo(() => items.filter((i) => i.kind === "exercise" && i.box <= 2 && i.lapses > 0), [items]);
  const done = completedDays(state);

  async function toCards(list: ReviewItem[]): Promise<Card[]> {
    const lessonIds = list.filter((i) => i.kind === "exercise" && !i.itemId.startsWith("lab~")).map((i) => i.itemId);
    const fetched = lessonIds.length ? await fetchExercises({ ids: lessonIds }) : [];
    const byId = new Map(fetched.map((e) => [e.id, e]));
    const cards: Card[] = [];
    for (const it of list) {
      if (it.kind === "vocab") {
        const v = state.vocab[it.itemId.slice(6)];
        if (v) cards.push({ kind: "vocab", item: it, term: v.term, meaning: v.meaning, example: v.example });
      } else if (it.itemId.startsWith("lab~")) {
        const ex = labExercise(it.itemId);
        if (ex) cards.push({ kind: "exercise", item: it, ex, day: 0 });
      } else {
        const ex = byId.get(it.itemId);
        if (ex && ex.type !== "speak") cards.push({ kind: "exercise", item: it, ex, day: ex.day });
      }
    }
    return cards;
  }

  async function start(make: () => Promise<Session>) {
    setLoading(true);
    setError(null);
    try {
      const s = await make();
      if (!s.cards.length) setError("There's nothing to practice in that set right now.");
      else setSession(s);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  if (session) return <Runner session={session} onExit={() => setSession(null)} />;

  if (!hydrated) return <div className="h-64 animate-pulse rounded-2xl bg-surface-2" aria-busy="true" />;

  const upcoming = nextDue(items);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[2rem] font-bold tracking-[-0.02em]">Practice</h1>
        <p className="mt-1 text-ink-2">Short sessions that bring back what you&apos;re about to forget. Mistakes come back the same day; things you know come back later.</p>
      </div>

      {error && (
        <p role="alert" className="rounded-xl border border-bad/40 bg-bad/5 p-3 text-bad">
          {error}
        </p>
      )}

      <section className={`${card} p-6`}>
        <h2 className="text-lg font-bold">Today&apos;s review</h2>
        {due.length ? (
          <>
            <p className="mt-1 text-ink-2">
              {due.length} item{due.length === 1 ? "" : "s"} ready ({due.filter((d) => d.box <= 1).length} from recent mistakes).
            </p>
            <button type="button" disabled={loading} onClick={() => start(async () => ({ title: "Today's review", source: "review", cards: await toCards(due) }))} className={`${button("primary", "lg")} mt-4`}>
              {loading ? "Loading…" : "Start review"}
            </button>
          </>
        ) : (
          <p className="mt-1 text-ink-2">
            {items.length === 0
              ? "Nothing yet. Complete a lesson and your review queue will start filling up."
              : `You're up to date. Next items are due ${upcoming ? upcoming.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" }) : "soon"}.`}
          </p>
        )}
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <section className={`${card} p-5`}>
          <h2 className="font-bold">Your mistakes</h2>
          <p className="mt-1 text-sm text-ink-2">{mistakes.length ? `${mistakes.length} item${mistakes.length === 1 ? "" : "s"} you've missed recently, whether due or not.` : "No recent mistakes to work on."}</p>
          <button
            type="button"
            disabled={!mistakes.length || loading}
            onClick={() => start(async () => ({ title: "Your mistakes", source: "review", cards: shuffle(await toCards(mistakes.slice(0, 20))) }))}
            className={`${button("secondary")} mt-4`}
          >
            Practice mistakes
          </button>
        </section>
        <section className={`${card} p-5`}>
          <h2 className="font-bold">Review a lesson</h2>
          {done.length ? (
            <form
              className="mt-2 flex flex-wrap gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                const day = Number(new FormData(e.currentTarget).get("day"));
                start(async () => {
                  const ex = await fetchExercises({ day });
                  return { title: `Day ${day} review`, source: "lesson", cards: shuffle(ex.filter((x) => x.type !== "speak" && x.type !== "translate").map((x) => ({ kind: "exercise" as const, ex: x, day }))).slice(0, 12) };
                });
              }}
            >
              <label htmlFor="day" className="sr-only">
                Lesson
              </label>
              <select id="day" name="day" className="h-11 min-w-0 flex-1 rounded-xl border border-line-strong bg-surface px-3">
                {done.map((d) => (
                  <option key={d} value={d}>
                    Day {d}: {summaryByDay(d)?.title}
                  </option>
                ))}
              </select>
              <button type="submit" disabled={loading} className={button("secondary")}>
                Practice
              </button>
            </form>
          ) : (
            <p className="mt-1 text-sm text-ink-2">Complete a lesson to practice it again here.</p>
          )}
        </section>
      </div>

      {items.length > 0 && <BoxSummary items={items} />}

      <p className="text-sm text-muted">
        How it works: each item sits in one of five boxes. A correct answer moves it up a box, so it comes back after 1, 2, 4, 8 and then 16 days. A wrong
        answer sends it back to box 1, due today.{" "}
        <Link href="/scenarios" className="font-bold text-ink underline underline-offset-4">
          Practice conversations
        </Link>
      </p>
    </div>
  );
}

function BoxSummary({ items }: { items: ReviewItem[] }) {
  const counts = [1, 2, 3, 4, 5].map((b) => items.filter((i) => (b === 1 ? i.box <= 1 : i.box === b)).length);
  const max = Math.max(1, ...counts);
  return (
    <section className={`${card} p-5`} aria-labelledby="boxes">
      <h2 id="boxes" className="font-bold">
        Your review boxes
      </h2>
      <ol className="mt-4 grid grid-cols-5 items-end gap-2">
        {counts.map((c, k) => (
          <li key={k} className="flex flex-col items-center gap-1.5" title={describeBox(k + 1)}>
            <span className="text-sm font-bold tabular-nums">{c}</span>
            <span className="w-full rounded-lg bg-ink/80" style={{ height: `${8 + (c / max) * 80}px`, opacity: 0.35 + k * 0.15 }} aria-hidden />
            <span className="text-center text-xs text-muted">Box {k + 1}</span>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-sm text-muted">Box 1 = still learning · Box 5 = mastered.</p>
    </section>
  );
}

function Runner({ session, onExit }: { session: Session; onExit: () => void }) {
  const { dispatch, state } = useLearner();
  const [i, setI] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const finished = i >= session.cards.length;
  const card = session.cards[i];

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [i]);

  const record = (c: Card, correct: boolean, answer: string) => {
    setResults((r) => [...r, correct]);
    const id = c.kind === "vocab" ? c.item.itemId : c.ex.id;
    dispatch((s) =>
      recordAnswer(s, {
        exerciseId: id,
        day: c.kind === "vocab" ? c.item.day : c.day,
        correct,
        answer,
        source: session.source === "review" ? "review" : "lesson",
        frame: c.kind === "exercise" ? c.ex.frame : undefined,
        skill: c.kind === "exercise" ? c.ex.skill : "vocabulary",
        kind: c.kind === "vocab" ? "vocab" : "exercise",
        addToReview: true,
      }),
    );
  };

  if (finished) {
    const right = results.filter(Boolean).length;
    return (
      <div className="flex flex-col items-start gap-4">
        <h1 className="text-[2rem] font-bold tracking-[-0.02em]">{session.title}: done</h1>
        <p className="text-lg text-ink-2">
          {right} of {results.length} correct. {results.length - right > 0 ? "The ones you missed will come back soon." : "Those items will now come back less often."}
        </p>
        <button type="button" onClick={onExit} className={button("primary", "lg")}>
          Back to Practice
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <button type="button" onClick={onExit} className={button("ghost", "sm")}>
          End
        </button>
        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-2" role="progressbar" aria-label="Session progress" aria-valuenow={i} aria-valuemin={0} aria-valuemax={session.cards.length}>
          <div className="h-full rounded-full bg-ink transition-[width]" style={{ width: `${(i / session.cards.length) * 100}%` }} />
        </div>
        <span className="text-sm tabular-nums text-muted">
          {i + 1}/{session.cards.length}
        </span>
      </div>
      {card.kind === "exercise" ? (
        <>
          {card.day > 0 && <p className="mb-2 text-sm text-muted">From Day {card.day}</p>}
          <ExercisePlayer key={`${i}-${card.ex.id}`} exercise={card.ex} speechRate={state.profile.speechRate} onAnswered={(o) => o.graded && record(card, o.correct, o.answer)} onDone={() => setI((x) => x + 1)} />
        </>
      ) : (
        <VocabCard key={`${i}-${card.term}`} card={card} onGrade={(ok) => (record(card, ok, ok ? "knew" : "didn't know"), setI((x) => x + 1))} />
      )}
    </div>
  );
}

function VocabCard({ card, onGrade }: { card: Extract<Card, { kind: "vocab" }>; onGrade: (ok: boolean) => void }) {
  const [shown, setShown] = useState(false);
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-sm font-bold text-muted">Your words</p>
        <h2 className="mt-1 text-xl font-bold">Which word or phrase means this?</h2>
      </div>
      <p className="rounded-2xl bg-surface-2 p-5 text-lg">{card.meaning}</p>
      {!shown ? (
        <button type="button" onClick={() => setShown(true)} className={`${button("primary", "lg")} self-start`} autoFocus>
          Show answer
        </button>
      ) : (
        <div className="anim-rise flex flex-col gap-4">
          <div className="flex items-center gap-2 rounded-2xl border border-line bg-surface p-5">
            <div className="flex-1">
              <p className="text-2xl font-bold">{card.term}</p>
              <p className="specimen mt-1 text-ink-2">{card.example}</p>
            </div>
            <SpeakButton text={card.example} />
          </div>
          <p className="text-sm text-muted">Be honest — it decides when you see this again.</p>
          <div className="flex gap-2">
            <button type="button" onClick={() => onGrade(false)} className={button("secondary", "lg")}>
              Not yet
            </button>
            <button type="button" onClick={() => onGrade(true)} className={button("primary", "lg")} autoFocus>
              I knew it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
