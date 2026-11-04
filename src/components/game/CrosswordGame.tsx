"use client";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DIFFICULTY, entryCells, generatePuzzle, puzzleId, type Difficulty, type Entry, type Puzzle } from "@/lib/game/crossword";
import { useGameProgress, useRewards } from "@/lib/rewards/client";
import { GameBar } from "./GameBar";
import { Confetti } from "@/components/rewards/Confetti";
import { SpeakButton } from "@/components/ui/Speak";
import { button } from "@/components/ui/styles";
import { IconCheck } from "@/components/app/icons";

type Sel = { row: number; col: number; dir: "across" | "down" };

const LEVELS: Difficulty[] = ["easy", "medium", "hard"];
const TONE: Record<Difficulty, string> = { easy: "frame-existence", medium: "frame-states", hard: "frame-modals" };

export function CrosswordGame() {
  const gp = useGameProgress();
  const [active, setActive] = useState<string | null>(null);

  const nextNumber = useCallback(
    (d: Difficulty) => {
      let n = 1;
      while (gp.crosswordSolved.has(puzzleId(d, n)) && n < 9999) n++;
      return n;
    },
    [gp.crosswordSolved],
  );

  if (active) {
    const p = generatePuzzle(active);
    if (p)
      return (
        <Board
          key={active}
          puzzle={p}
          onExit={() => setActive(null)}
          onNext={() => setActive(puzzleId(p.difficulty, nextNumber(p.difficulty) === p.number ? p.number + 1 : nextNumber(p.difficulty)))}
        />
      );
  }

  return (
    <>
      <GameBar title="Crossword" />
      <main className="mx-auto max-w-5xl px-4 pb-16 pt-8">
        <div className="text-center">
          <MiniGrid />
          <h1 className="mt-4 text-[2.25rem] font-black leading-tight tracking-[-0.02em]">Word Crossword</h1>
          <p className="mx-auto mt-2 max-w-md text-ink-2">Read the clue — a definition, a synonym or a sentence with a gap — and find the English word. Solve the whole grid to win.</p>
        </div>
        <ul className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
          {LEVELS.map((d) => {
            const cfg = DIFFICULTY[d];
            const n = nextNumber(d);
            const solved = [...gp.crosswordSolved].filter((x) => x.startsWith(`${d}-`)).length;
            return (
              <li key={d} className={TONE[d]}>
                <button onClick={() => setActive(puzzleId(d, n))} className="group flex h-full w-full flex-col rounded-[1.5rem] border border-line bg-surface p-5 text-left shadow-lift transition-transform hover:-translate-y-1">
                  <span className="bg-f-tint text-f inline-flex self-start rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide">{cfg.label}</span>
                  <span className="mt-3 text-[1.35rem] font-bold leading-tight">Puzzle #{n}</span>
                  <span className="text-sm text-muted">{cfg.blurb}</span>
                  <span className="mt-4 flex items-center justify-between text-sm">
                    <span className="font-bold text-f-possession">up to {cfg.xp + 20} XP</span>
                    <span className="text-muted">{solved} solved</span>
                  </span>
                  <span className="bg-f mt-4 rounded-full py-2.5 text-center font-bold text-white transition group-hover:brightness-110 dark:text-paper">Play</span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="mx-auto mt-10 grid max-w-3xl gap-3 text-sm text-ink-2 sm:grid-cols-3">
          <Rule title="Speed bonus" body="Finish under the par time for +20 XP." />
          <Rule title="Hints cost a little" body="Each revealed letter takes 5 XP off. Checking is free." />
          <Rule title="Learn as you go" body="Every answer comes with a real example sentence." />
        </div>
      </main>
    </>
  );
}

function Rule({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl bg-surface/70 p-4">
      <p className="font-bold text-ink">{title}</p>
      <p>{body}</p>
    </div>
  );
}

function MiniGrid() {
  const pattern = ["·W···", "·ORDS", "·R···", "PLAY·", "·D···"];
  return (
    <div aria-hidden className="mx-auto inline-grid grid-cols-5 gap-1 rotate-[-4deg]">
      {pattern.flatMap((row, r) =>
        row.split("").map((ch, c) => (
          <span key={`${r}-${c}`} className={`grid size-8 place-items-center rounded-md text-sm font-black ${ch === "·" ? "" : "bg-surface text-ink shadow-[inset_0_0_0_1.5px_var(--line-strong)]"}`}>
            {ch === "·" ? "" : ch}
          </span>
        )),
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ board */

function Board({ puzzle, onExit, onNext }: { puzzle: Puzzle; onExit: () => void; onNext: () => void }) {
  const { claim, status } = useRewards();
  const [letters, setLetters] = useState<string[][]>(() => puzzle.grid.map((r) => r.map(() => "")));
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<Set<string>>(new Set());
  const [sel, setSel] = useState<Sel>(() => ({ row: puzzle.entries[0].row, col: puzzle.entries[0].col, dir: puzzle.entries[0].dir }));
  const [hints, setHints] = useState(0);
  const [started, setStarted] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [finished, setFinished] = useState<{ seconds: number; xp: number | null; stars: number; message?: string } | null>(null);
  const [popped, setPopped] = useState<Set<string>>(new Set());
  const cfg = DIFFICULTY[puzzle.difficulty];

  const cellEntries = useMemo(() => {
    const m = new Map<string, Entry[]>();
    for (const e of puzzle.entries) for (const [r, c] of entryCells(e)) m.set(`${r},${c}`, [...(m.get(`${r},${c}`) ?? []), e]);
    return m;
  }, [puzzle]);
  const numbers = useMemo(() => {
    const m = new Map<string, number>();
    for (const e of puzzle.entries) m.set(`${e.row},${e.col}`, e.num);
    return m;
  }, [puzzle]);

  const current = useMemo(() => {
    const list = cellEntries.get(`${sel.row},${sel.col}`) ?? [];
    return list.find((e) => e.dir === sel.dir) ?? list[0] ?? puzzle.entries[0];
  }, [cellEntries, sel, puzzle.entries]);
  const currentCells = useMemo(() => new Set(entryCells(current).map(([r, c]) => `${r},${c}`)), [current]);

  const solvedEntries = useMemo(
    () => new Set(puzzle.entries.filter((e) => entryCells(e).every(([r, c], i) => letters[r][c] === e.answer[i])).map((e) => `${e.num}-${e.dir}`)),
    [letters, puzzle.entries],
  );

  // timer
  useEffect(() => {
    if (!started || finished) return;
    const t = setInterval(() => setElapsed(Math.floor((Date.now() - started) / 1000)), 500);
    return () => clearInterval(t);
  }, [started, finished]);

  // celebrate a word the moment it's complete
  const prevSolved = useRef<Set<string>>(new Set());
  useEffect(() => {
    const fresh = [...solvedEntries].filter((k) => !prevSolved.current.has(k));
    prevSolved.current = solvedEntries;
    if (!fresh.length) return;
    const cells = new Set<string>();
    for (const k of fresh) {
      const e = puzzle.entries.find((x) => `${x.num}-${x.dir}` === k)!;
      for (const [r, c] of entryCells(e)) cells.add(`${r},${c}`);
    }
    setPopped(cells);
    const t = setTimeout(() => setPopped(new Set()), 420);
    return () => clearTimeout(t);
  }, [solvedEntries, puzzle.entries]);

  // finish
  useEffect(() => {
    if (finished || solvedEntries.size !== puzzle.entries.length) return;
    const seconds = Math.max(1, Math.floor((Date.now() - (started ?? Date.now())) / 1000));
    const answers = Object.fromEntries(puzzle.entries.map((e) => [`${e.num}-${e.dir}`, entryCells(e).map(([r, c]) => letters[r][c]).join("")]));
    const stars = 1 + (hints === 0 ? 1 : 0) + (seconds <= cfg.parSeconds ? 1 : 0);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- finishing is a one-time transition when the grid becomes complete
    setFinished({ seconds, xp: null, stars });
    void claim({ type: "crossword", puzzleId: puzzle.id, answers, hints, seconds }, { won: true, stars }).then((r) => {
      const xp = r ? r.granted.filter((g) => g.kind === "crossword").reduce((n, g) => n + g.xp, 0) : 0;
      setFinished((f) => (f ? { ...f, xp, message: r ? r.message : "Your XP wasn't saved — check your connection and that you're signed in." } : f));
    });
  }, [solvedEntries, puzzle, letters, finished, started, hints, cfg.parSeconds, claim]);

  const focusInput = () => {};

  const moveWithin = (e: Entry, from: [number, number], step: 1 | -1) => {
    const cells = entryCells(e);
    const i = cells.findIndex(([r, c]) => r === from[0] && c === from[1]);
    const next = cells[Math.min(cells.length - 1, Math.max(0, i + step))];
    setSel({ row: next[0], col: next[1], dir: e.dir });
  };

  const type = (ch: string) => {
    if (finished) return;
    if (!started) setStarted(Date.now());
    const k = `${sel.row},${sel.col}`;
    if (revealed.has(k)) {
      moveWithin(current, [sel.row, sel.col], 1);
      return;
    }
    setLetters((L) => {
      const n = L.map((r) => [...r]);
      n[sel.row][sel.col] = ch;
      return n;
    });
    setWrong((w) => {
      if (!w.has(k)) return w;
      const n = new Set(w);
      n.delete(k);
      return n;
    });
    // move to the next cell of this word (learners usually type the whole word, crossings included)
    moveWithin(current, [sel.row, sel.col], 1);
  };

  const erase = () => {
    if (finished) return;
    const k = `${sel.row},${sel.col}`;
    if (letters[sel.row][sel.col] && !revealed.has(k)) {
      setLetters((L) => {
        const n = L.map((r) => [...r]);
        n[sel.row][sel.col] = "";
        return n;
      });
    } else moveWithin(current, [sel.row, sel.col], -1);
  };

  const gotoEntry = (step: 1 | -1) => {
    const list = puzzle.entries;
    const i = list.findIndex((e) => e === current);
    for (let k = 1; k <= list.length; k++) {
      const e = list[(i + step * k + list.length * 2) % list.length];
      if (!solvedEntries.has(`${e.num}-${e.dir}`) || k === list.length) {
        const empty = entryCells(e).find(([r, c]) => !letters[r][c]) ?? [e.row, e.col];
        setSel({ row: empty[0], col: empty[1], dir: e.dir });
        return;
      }
    }
  };

  const clickCell = (r: number, c: number) => {
    const list = cellEntries.get(`${r},${c}`) ?? [];
    if (!list.length) return;
    if (r === sel.row && c === sel.col && list.length > 1) setSel({ row: r, col: c, dir: sel.dir === "across" ? "down" : "across" });
    else setSel({ row: r, col: c, dir: list.some((e) => e.dir === sel.dir) ? sel.dir : list[0].dir });
    focusInput();
  };

  const revealLetter = () => {
    const cells = entryCells(current);
    const target = cells.find(([r, c]) => letters[r][c] !== puzzle.grid[r][c]) ?? null;
    if (!target) return;
    const [r, c] = target;
    if (!started) setStarted(Date.now());
    setHints((h) => h + 1);
    setRevealed((s) => new Set(s).add(`${r},${c}`));
    setLetters((L) => {
      const n = L.map((x) => [...x]);
      n[r][c] = puzzle.grid[r][c]!;
      return n;
    });
    setSel({ row: r, col: c, dir: current.dir });
  };

  const checkWord = () => {
    const bad = entryCells(current).filter(([r, c]) => letters[r][c] && letters[r][c] !== puzzle.grid[r][c]).map(([r, c]) => `${r},${c}`);
    setWrong(new Set(bad));
    if (bad.length) setTimeout(() => setWrong(new Set()), 1600);
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (/^[a-zA-Z]$/.test(e.key)) {
      e.preventDefault();
      type(e.key.toLowerCase());
    } else if (e.key === "Backspace") {
      e.preventDefault();
      erase();
    } else if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      gotoEntry(e.shiftKey ? -1 : 1);
    } else if (e.key.startsWith("Arrow")) {
      e.preventDefault();
      const d = { ArrowRight: [0, 1], ArrowLeft: [0, -1], ArrowDown: [1, 0], ArrowUp: [-1, 0] }[e.key]!;
      const dir = d[1] !== 0 ? "across" : "down";
      if (dir !== sel.dir && (cellEntries.get(`${sel.row},${sel.col}`) ?? []).some((x) => x.dir === dir)) {
        setSel({ ...sel, dir });
        return;
      }
      let r = sel.row + d[0];
      let c = sel.col + d[1];
      while (r >= 0 && c >= 0 && r < puzzle.height && c < puzzle.width) {
        if (puzzle.grid[r][c]) {
          const list = cellEntries.get(`${r},${c}`)!;
          setSel({ row: r, col: c, dir: list.some((x) => x.dir === dir) ? dir : list[0].dir });
          return;
        }
        r += d[0];
        c += d[1];
      }
    }
  };

  // physical keyboards: listen on the window, so typing works without focusing anything
  const keyRef = useRef(onKey);
  useEffect(() => {
    keyRef.current = onKey;
  });
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      keyRef.current(e);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const mm = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const cell = `min(2.75rem, calc((100vw - 2rem) / ${puzzle.width}))`;

  if (finished) return <Results puzzle={puzzle} finished={finished} hints={hints} guest={status === "guest"} onNext={onNext} onExit={onExit} />;

  return (
    <div className={TONE[puzzle.difficulty]}>
      <GameBar
        title={`${cfg.label} · Puzzle #${puzzle.number}`}
        onBack={onExit}
        right={
          <span className={`rounded-full px-2.5 py-1 text-sm font-bold tabular-nums shadow-[inset_0_0_0_1px_var(--line)] ${elapsed > cfg.parSeconds ? "bg-surface text-muted" : "bg-f-tint text-f"}`} aria-label="Time">
            ⏱ {mm(elapsed)}
          </span>
        }
      />
      <main className="mx-auto grid max-w-5xl gap-6 px-4 pb-6 pt-5 lg:grid-cols-[1fr_20rem]">
        <div className="flex flex-col items-center">
          <div className="mb-3 flex w-full max-w-xl items-center justify-between text-sm text-muted">
            <span>
              {solvedEntries.size} / {puzzle.entries.length} words
            </span>
            <span>Par {mm(cfg.parSeconds)}</span>
          </div>
          <div role="grid" aria-label="Crossword grid" className="inline-grid touch-manipulation select-none gap-[3px]" style={{ gridTemplateColumns: `repeat(${puzzle.width}, ${cell})` }}>
            {puzzle.grid.flatMap((row, r) =>
              row.map((sol, c) => {
                const k = `${r},${c}`;
                if (!sol) return <span key={k} aria-hidden style={{ width: cell, height: cell }} />;
                const isSel = r === sel.row && c === sel.col;
                const inWord = currentCells.has(k);
                const done = (cellEntries.get(k) ?? []).some((e) => solvedEntries.has(`${e.num}-${e.dir}`));
                return (
                  <button
                    key={k}
                    role="gridcell"
                    aria-label={`Row ${r + 1}, column ${c + 1}${letters[r][c] ? `, ${letters[r][c]}` : ", empty"}`}
                    onClick={() => clickCell(r, c)}
                    className={`relative grid place-items-center rounded-[6px] font-black uppercase transition-colors ${
                      wrong.has(k) ? "anim-wiggle bg-bad text-white" : isSel ? "bg-f text-white dark:text-paper" : done ? "bg-good/15 text-good" : inWord ? "bg-f-tint text-ink" : "bg-surface text-ink"
                    } ${popped.has(k) ? "anim-cell-pop" : ""} shadow-[inset_0_0_0_1.5px_var(--line-strong)]`}
                    style={{ width: cell, height: cell, fontSize: `calc(${cell} * 0.5)` }}
                  >
                    {numbers.has(k) && <span className="absolute left-[3px] top-[1px] text-[0.55rem] font-bold leading-none opacity-70">{numbers.get(k)}</span>}
                    {letters[r][c]}
                    {revealed.has(k) && <span className="absolute bottom-[2px] right-[3px] size-1.5 rounded-full bg-f-possession" aria-hidden />}
                  </button>
                );
              }),
            )}
          </div>

          {/* clue bar */}
          <div className="sticky bottom-0 mt-5 w-full max-w-xl">
            <div className="flex items-stretch gap-2 rounded-2xl border border-line bg-surface p-2 shadow-lift">
              <button onClick={() => gotoEntry(-1)} aria-label="Previous clue" className="w-9 shrink-0 rounded-xl text-lg text-muted hover:bg-surface-2">
                ‹
              </button>
              <button onClick={focusInput} className="min-w-0 flex-1 px-1 py-1 text-left">
                <span className="text-f text-xs font-black uppercase tracking-wide">
                  {current.num} {current.dir} · {current.answer.length} letters ·{" "}
                  {current.clueType === "example" ? "fill the gap" : current.clueType}
                </span>
                <span className="block font-bold leading-snug">{current.clue}</span>
              </button>
              <button onClick={() => gotoEntry(1)} aria-label="Next clue" className="w-9 shrink-0 rounded-xl text-lg text-muted hover:bg-surface-2">
                ›
              </button>
            </div>
            <div className="mt-2 flex gap-2">
              <button onClick={checkWord} className={`${button("secondary", "sm")} flex-1`}>
                Check word
              </button>
              <button onClick={revealLetter} className={`${button("secondary", "sm")} flex-1`}>
                Reveal letter (−5 XP)
              </button>
            </div>
            <Keyboard onKey={type} onBack={erase} />
          </div>
        </div>

        {/* clue lists */}
        <aside className="hidden lg:block">
          {(["across", "down"] as const).map((dir) => (
            <section key={dir} className="mb-5">
              <h2 className="mb-2 text-sm font-black uppercase tracking-wide text-muted">{dir}</h2>
              <ul className="flex flex-col gap-1">
                {puzzle.entries
                  .filter((e) => e.dir === dir)
                  .map((e) => {
                    const on = e === current;
                    const ok = solvedEntries.has(`${e.num}-${e.dir}`);
                    return (
                      <li key={`${e.num}-${dir}`}>
                        <button
                          onClick={() => {
                            setSel({ row: e.row, col: e.col, dir });
                            focusInput();
                          }}
                          className={`flex w-full gap-2 rounded-xl px-3 py-2 text-left text-sm ${on ? "bg-f-tint" : "hover:bg-surface"} ${ok ? "text-muted line-through" : ""}`}
                        >
                          <span className="text-f w-5 shrink-0 font-black">{e.num}</span>
                          <span>{e.clue}</span>
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </section>
          ))}
        </aside>
      </main>
    </div>
  );
}

const ROWS = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

function Keyboard({ onKey, onBack }: { onKey: (c: string) => void; onBack: () => void }) {
  return (
    <div className="mt-3 flex select-none flex-col gap-1.5 lg:hidden" aria-label="Keyboard">
      {ROWS.map((row, i) => (
        <div key={row} className="flex justify-center gap-1">
          {row.split("").map((ch) => (
            <button key={ch} onClick={() => onKey(ch)} className="h-11 flex-1 max-w-10 rounded-lg bg-surface text-base font-bold uppercase shadow-[inset_0_-2px_0_var(--line-strong),inset_0_0_0_1px_var(--line)] active:translate-y-px active:bg-surface-2">
              {ch}
            </button>
          ))}
          {i === 2 && (
            <button onClick={onBack} aria-label="Delete" className="h-11 w-14 rounded-lg bg-surface-2 font-bold shadow-[inset_0_-2px_0_var(--line-strong)]">
              ⌫
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

function Results({ puzzle, finished, hints, guest, onNext, onExit }: { puzzle: Puzzle; finished: { seconds: number; xp: number | null; stars: number; message?: string }; hints: number; guest: boolean; onNext: () => void; onExit: () => void }) {
  const mm = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  return (
    <div className={TONE[puzzle.difficulty]}>
      <Confetti />
      <GameBar title="Puzzle solved!" onBack={onExit} />
      <main className="mx-auto max-w-2xl px-4 pb-16 pt-8">
        <section className="anim-zoom rounded-[1.75rem] border border-line bg-surface p-6 text-center shadow-lift sm:p-8">
          <div className="flex justify-center gap-1 text-[2.6rem] leading-none" aria-label={`${finished.stars} of 3 stars`}>
            {[1, 2, 3].map((s) => (
              <span key={s} className={s <= finished.stars ? "text-f-possession drop-shadow" : "text-line-strong"}>
                ★
              </span>
            ))}
          </div>
          <h1 className="mt-3 text-[2rem] font-black leading-tight">Brilliant!</h1>
          <p className="text-ink-2">
            {DIFFICULTY[puzzle.difficulty].label} puzzle #{puzzle.number} solved in {mm(finished.seconds)} with {hints} {hints === 1 ? "hint" : "hints"}.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-surface-2 px-4 py-2 font-black">
            <span className="xp-coin grid size-7 place-items-center rounded-full text-[0.6rem] text-[#5b3a00]">XP</span>
            {guest ? "Sign in to earn XP" : finished.xp === null ? "Saving…" : `+${finished.xp} XP`}
          </div>
          {finished.message && <p className="mt-3 text-sm text-muted">{finished.message}</p>}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button onClick={onNext} className={button("frame", "lg")}>
              Next puzzle
            </button>
            <button onClick={onExit} className={button("secondary", "lg")}>
              Change level
            </button>
          </div>
          {guest && (
            <Link href="/signup" className="mt-4 inline-block text-sm font-bold underline underline-offset-4">
              Create a free account to keep your XP
            </Link>
          )}
        </section>
        <section className="mt-6">
          <h2 className="mb-3 font-bold">Words in this puzzle</h2>
          <ul className="flex flex-col gap-2">
            {puzzle.entries.map((e) => (
              <li key={`${e.num}-${e.dir}`} className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-3">
                <span className="text-good mt-0.5">
                  <IconCheck />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-black uppercase tracking-wide">{e.answer}</p>
                  <p className="specimen text-ink-2">{e.example}</p>
                </div>
                <SpeakButton text={e.example} />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
