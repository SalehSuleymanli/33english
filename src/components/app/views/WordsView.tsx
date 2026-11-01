"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useLearner } from "@/lib/learner/store";
import { removeVocab, saveVocab, toggleBookmark } from "@/lib/learner/state";
import { describeBox } from "@/engine/srs";
import { SpeakButton } from "@/components/ui/Speak";
import { button, card } from "@/components/ui/styles";

export function WordsView() {
  const { state, hydrated, dispatch } = useLearner();
  const [q, setQ] = useState("");
  const [adding, setAdding] = useState(false);
  const words = useMemo(
    () =>
      Object.values(state.vocab)
        .filter((v) => !q || `${v.term} ${v.meaning}`.toLowerCase().includes(q.toLowerCase()))
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [state.vocab, q],
  );
  const marks = Object.values(state.bookmarks).sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  if (!hydrated) return <div className="h-64 animate-pulse rounded-2xl bg-surface-2" aria-busy="true" />;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-[2rem] font-bold tracking-[-0.02em]">Your words</h1>
        <p className="mt-1 text-ink-2">Words and phrases you&apos;ve saved. Each one comes back in your review until you know it.</p>
      </div>

      <section aria-labelledby="vocab">
        <div className="flex flex-wrap items-center gap-2">
          <h2 id="vocab" className="mr-auto text-lg font-bold">
            Saved words <span className="font-normal text-muted">({Object.keys(state.vocab).length})</span>
          </h2>
          <label className="sr-only" htmlFor="q">
            Search words
          </label>
          <input id="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" className="h-10 w-40 rounded-full border border-line-strong bg-surface px-4 text-sm" />
          <button type="button" onClick={() => setAdding((a) => !a)} className={button("secondary", "sm")}>
            {adding ? "Cancel" : "Add a word"}
          </button>
        </div>

        {adding && (
          <form
            className={`${card} mt-4 grid gap-3 p-4 sm:grid-cols-3`}
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              const term = String(f.get("term") ?? "").trim().slice(0, 120);
              if (!term) return;
              dispatch((s) => saveVocab(s, { term, meaning: String(f.get("meaning") ?? "").trim().slice(0, 400), example: String(f.get("example") ?? "").trim().slice(0, 400), day: 0 }));
              setAdding(false);
            }}
          >
            <label className="text-sm font-bold">
              Word or phrase
              <input name="term" required maxLength={120} className="mt-1 h-11 w-full rounded-xl border border-line-strong bg-paper px-3 font-normal" />
            </label>
            <label className="text-sm font-bold">
              Meaning
              <input name="meaning" required maxLength={400} className="mt-1 h-11 w-full rounded-xl border border-line-strong bg-paper px-3 font-normal" />
            </label>
            <label className="text-sm font-bold">
              Example (optional)
              <input name="example" maxLength={400} className="mt-1 h-11 w-full rounded-xl border border-line-strong bg-paper px-3 font-normal" />
            </label>
            <button type="submit" className={`${button("primary", "sm")} sm:col-span-3 sm:justify-self-start`}>
              Save word
            </button>
          </form>
        )}

        {words.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-line-strong p-6 text-ink-2">
            {q ? "No saved words match that search." : "No saved words yet. Tap Save on any word in a lesson, or add your own."}
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {words.map((v) => {
              const r = state.review[`vocab:${v.term.toLowerCase()}`];
              return (
                <li key={v.term} className="flex items-start gap-2 py-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-bold">{v.term}</p>
                    <p className="text-ink-2">{v.meaning}</p>
                    {v.example && <p className="specimen mt-1 text-muted">{v.example}</p>}
                    <p className="mt-1 text-xs text-muted">
                      {v.day ? `From Day ${v.day}` : "Added by you"}
                      {r ? ` · ${describeBox(r.box)}` : ""}
                    </p>
                  </div>
                  {v.example && <SpeakButton text={v.example} />}
                  <button type="button" onClick={() => dispatch((s) => removeVocab(s, v.term))} className="h-9 rounded-full px-3 text-sm text-muted hover:bg-surface-2 hover:text-bad" aria-label={`Remove ${v.term}`}>
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section aria-labelledby="marks">
        <h2 id="marks" className="text-lg font-bold">
          Bookmarks <span className="font-normal text-muted">({marks.length})</span>
        </h2>
        {marks.length === 0 ? (
          <p className="mt-3 text-ink-2">Bookmark structures and example sentences you find difficult. They&apos;ll be collected here.</p>
        ) : (
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {marks.map((b) => (
              <li key={b.ref} className="flex items-center gap-2 py-3">
                <Link href={`/learn/${b.day}`} className="min-w-0 flex-1 hover:underline">
                  <span className="specimen text-lg">{b.label}</span>
                  <span className="block text-xs text-muted">Day {b.day}</span>
                </Link>
                <button type="button" onClick={() => dispatch((s) => toggleBookmark(s, b))} className="h-9 rounded-full px-3 text-sm text-muted hover:bg-surface-2 hover:text-bad">
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
