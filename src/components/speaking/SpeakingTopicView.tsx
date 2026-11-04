"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { RichSentence, SpeakingTopic } from "@/content/speaking";
import type { FrameId } from "@/content/types";
import { FRAMES, frameById } from "@/content/frames";
import { useGameProgress, useRewards } from "@/lib/rewards/client";
import { useLearner } from "@/lib/learner/store";
import { saveVocab } from "@/lib/learner/state";
import { XP } from "@/lib/game/rewards";
import { SpeakButton } from "@/components/ui/Speak";
import { button, card } from "@/components/ui/styles";
import { IconCheck, IconMic } from "@/components/app/icons";

type Tab = "card" | "natural" | "rich" | "words";

export function SpeakingTopicView({ topic }: { topic: SpeakingTopic }) {
  const [tab, setTab] = useState<Tab>("card");
  const { speakingDone } = useGameProgress();
  const done = speakingDone.has(topic.id);
  const frameCounts = countFrames(topic.rich);

  return (
    <div className="flex flex-col gap-5">
      <Link href="/speaking" className="text-sm font-bold text-muted hover:text-ink">
        ← All topics
      </Link>
      <header>
        <p className="text-sm font-bold text-muted">
          {topic.category} · {topic.level} · {topic.minutes} {topic.minutes === 1 ? "minute" : "minutes"}
          {done && <span className="ml-2 text-good">✓ Practised</span>}
        </p>
        <h1 className="mt-1 text-[2rem] font-bold leading-tight tracking-[-0.02em]">{topic.title}</h1>
        <p className="mt-1 text-ink-2">{topic.description}</p>
      </header>

      <div className="sticky top-14 z-20 -mx-4 flex gap-1 overflow-x-auto border-b border-line bg-paper/90 px-4 py-2 backdrop-blur md:top-0" role="tablist" aria-label="Topic sections">
        {(
          [
            ["card", "Speaking card"],
            ["natural", "Natural answer"],
            ["rich", "Grammar-rich answer"],
            ["words", "Useful vocabulary"],
          ] as [Tab, string][]
        ).map(([id, label]) => (
          <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)} className={`h-9 shrink-0 rounded-full px-4 text-sm font-bold ${tab === id ? "bg-ink text-paper" : "text-ink-2 hover:bg-surface-2"}`}>
            {label}
          </button>
        ))}
      </div>

      {tab === "card" && (
        <>
          <section className="frame-modals relative overflow-hidden rounded-[1.5rem] border-2 border-dashed border-f-soft bg-surface p-6 sm:p-8">
            <p className="text-f text-xs font-black uppercase tracking-[0.16em]">Speaking card</p>
            <h2 className="mt-2 text-[1.5rem] font-bold leading-tight">{topic.title}</h2>
            <p className="mt-3 text-sm font-bold text-muted">You should say:</p>
            <ul className="mt-2 flex flex-col gap-2">
              {topic.questions.map((q) => (
                <li key={q} className="flex gap-2 text-lg">
                  <span className="text-f" aria-hidden>
                    •
                  </span>
                  {q}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">
              Speak for about {topic.minutes} {topic.minutes === 1 ? "minute" : "minutes"}. Take a moment to think first — it&apos;s fine to make notes.
            </p>
          </section>
          <PracticeMode topic={topic} done={done} onSeeAnswers={() => setTab("natural")} />
        </>
      )}

      {tab === "natural" && (
        <section className={`${card} p-6`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">Natural sample answer</h2>
              <p className="text-sm text-muted">How a real person might answer — relaxed, clear, not an essay.</p>
            </div>
            <SpeakButton text={topic.natural.join(" ")} />
          </div>
          <div className="specimen mt-4 flex flex-col gap-3 text-[1.15rem] leading-relaxed">
            {topic.natural.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <button onClick={() => setTab("rich")} className={`${button("secondary")} mt-6`}>
            See the grammar-rich version →
          </button>
        </section>
      )}

      {tab === "rich" && (
        <>
          <section className={`${card} p-6`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold">Grammar-rich sample answer</h2>
                <p className="text-sm text-muted">The same kind of answer, using as many of the six frames as sounds natural. Colours show each frame.</p>
              </div>
              <SpeakButton text={topic.rich.map((r) => r.s).join(" ")} />
            </div>
            <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Frames used">
              {FRAMES.map((f) => (
                <li key={f.id} className={`${f.className} rounded-full px-2.5 py-1 text-xs font-bold ${frameCounts[f.id] ? "bg-f-tint text-f" : "bg-surface-2 text-muted line-through"}`}>
                  {f.number}. {f.name} {frameCounts[f.id] ? `×${frameCounts[f.id]}` : ""}
                </li>
              ))}
            </ul>
            <p className="specimen mt-5 text-[1.15rem] leading-[1.9]">
              {topic.rich.map((r, i) => (
                <span key={i}>
                  <Highlighted r={r} />{" "}
                </span>
              ))}
            </p>
          </section>
          <section aria-labelledby="breakdown">
            <h2 id="breakdown" className="mb-3 text-lg font-bold">
              Grammar breakdown
            </h2>
            <ol className="flex flex-col gap-2">
              {topic.rich.map((r, i) => (
                <li key={i} className={`${card} p-4`}>
                  <p className="specimen text-[1.05rem]">
                    <Highlighted r={r} />
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {r.tags.map((t, k) => {
                      const f = frameById(t.frame);
                      return (
                        <li key={k} className={`${f.className} bg-f-tint text-f rounded-lg px-2 py-1 text-xs font-bold`}>
                          Frame {f.number} · {f.name}: <span className="specimen font-normal">“{t.phrase}”</span>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ol>
          </section>
        </>
      )}

      {tab === "words" && <Vocab topic={topic} />}
    </div>
  );
}

function countFrames(rich: RichSentence[]) {
  const out: Partial<Record<FrameId, number>> = {};
  for (const r of rich) for (const t of r.tags) out[t.frame] = (out[t.frame] ?? 0) + 1;
  return out;
}

/** Colours each tagged phrase in its frame colour. */
function Highlighted({ r }: { r: RichSentence }) {
  const spans: { start: number; end: number; frame: FrameId }[] = [];
  for (const t of r.tags) {
    const start = r.s.indexOf(t.phrase);
    if (start < 0) continue;
    const end = start + t.phrase.length;
    if (spans.some((s) => start < s.end && end > s.start)) continue;
    spans.push({ start, end, frame: t.frame });
  }
  spans.sort((a, b) => a.start - b.start);
  const parts: React.ReactNode[] = [];
  let at = 0;
  spans.forEach((s, i) => {
    if (s.start > at) parts.push(r.s.slice(at, s.start));
    const f = frameById(s.frame);
    parts.push(
      <mark key={i} className={`${f.className} bg-f-tint text-f rounded px-0.5 font-semibold`} title={`Frame ${f.number}: ${f.name}`}>
        {r.s.slice(s.start, s.end)}
      </mark>,
    );
    at = s.end;
  });
  if (at < r.s.length) parts.push(r.s.slice(at));
  return <>{parts}</>;
}

function Vocab({ topic }: { topic: SpeakingTopic }) {
  const { state, dispatch } = useLearner();
  return (
    <section className={`${card} px-5`}>
      <h2 className="pt-5 text-lg font-bold">Useful vocabulary</h2>
      <p className="text-sm text-muted">Expressions and collocations for this topic. Save them to review later.</p>
      <ul className="divide-y divide-line">
        {topic.vocab.map((v) => {
          const saved = !!state.vocab[v.term.toLowerCase()];
          return (
            <li key={v.term} className="flex items-start gap-3 py-4">
              <div className="min-w-0 flex-1">
                <p className="font-bold">{v.term}</p>
                <p className="text-ink-2">{v.meaning}</p>
                <p className="specimen mt-1 text-muted">{v.example}</p>
              </div>
              <SpeakButton text={v.example} />
              <button
                disabled={saved}
                onClick={() => dispatch((s) => saveVocab(s, { term: v.term, meaning: v.meaning, example: v.example, day: 0 }))}
                className={`h-9 shrink-0 rounded-full px-3 text-sm font-bold ${saved ? "text-good" : "border border-line-strong hover:border-ink"}`}
              >
                {saved ? "Saved ✓" : "Save"}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ practice */

type Phase = "ready" | "prepare" | "speak" | "done";

function PracticeMode({ topic, done, onSeeAnswers }: { topic: SpeakingTopic; done: boolean; onSeeAnswers: () => void }) {
  const { claim, status } = useRewards();
  const [phase, setPhase] = useState<Phase>("ready");
  const [left, setLeft] = useState(0);
  const [notes, setNotes] = useState("");
  const [rec, setRec] = useState<{ on: boolean; url: string | null; supported: boolean; error?: string }>({ on: false, url: null, supported: false });
  const [claimed, setClaimed] = useState<number | null>(null);
  const media = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- feature detection after mount
    setRec((r) => ({ ...r, supported: typeof window !== "undefined" && "MediaRecorder" in window && !!navigator.mediaDevices?.getUserMedia }));
  }, []);

  const stopSpeaking = () => {
    if (media.current && media.current.state === "recording") media.current.stop();
    setPhase("done");
  };

  useEffect(() => {
    if (phase !== "prepare" && phase !== "speak") return;
    if (left <= 0) {
      if (phase === "prepare") {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- timer moves to the next phase
        setPhase("speak");
        setLeft(topic.minutes * 60);
      } else stopSpeaking();
      return;
    }
    const t = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, left]);

  useEffect(() => () => media.current?.stream.getTracks().forEach((t) => t.stop()), []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const m = new MediaRecorder(stream);
      chunks.current = [];
      m.ondataavailable = (e) => e.data.size && chunks.current.push(e.data);
      m.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunks.current, { type: m.mimeType || "audio/webm" });
        setRec((r) => ({ ...r, on: false, url: URL.createObjectURL(blob) }));
      };
      m.start();
      media.current = m;
      setRec((r) => ({ ...r, on: true, url: null, error: undefined }));
    } catch {
      setRec((r) => ({ ...r, error: "Microphone not available — you can still practise out loud." }));
    }
  };

  const complete = async () => {
    const r = await claim({ type: "speaking", topicId: topic.id }, undefined);
    setClaimed(r ? r.granted.filter((g) => g.kind === "speaking" || g.kind === "speaking_repeat").reduce((n, g) => n + g.xp, 0) : 0);
  };

  const mmss = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`;

  return (
    <section aria-labelledby="practice" className="frame-modals rounded-[1.5rem] border border-line bg-surface p-6 shadow-lift">
      <h2 id="practice" className="flex items-center gap-2 text-lg font-bold">
        <span className="bg-f-tint text-f grid size-9 place-items-center rounded-xl">
          <IconMic />
        </span>
        Practice mode
      </h2>

      {phase === "ready" && (
        <>
          <ol className="mt-3 flex flex-col gap-1 text-ink-2">
            <li>1. Think and make notes (1 minute)</li>
            <li>2. Speak for {topic.minutes} {topic.minutes === 1 ? "minute" : "minutes"} — record yourself if you like</li>
            <li>3. Compare with the sample answers and mark it complete</li>
          </ol>
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              onClick={() => {
                setPhase("prepare");
                setLeft(60);
              }}
              className={button("frame", "lg")}
            >
              Start practice
            </button>
            <button onClick={onSeeAnswers} className={button("secondary", "lg")}>
              Read sample answers first
            </button>
          </div>
        </>
      )}

      {phase === "prepare" && (
        <div className="mt-4">
          <p className="font-bold">
            Prepare · <span className="tabular-nums text-f">{mmss}</span>
          </p>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} placeholder="Key words, ideas… (only you see these)" className="mt-2 w-full rounded-2xl border border-line-strong bg-surface p-3 outline-none focus:border-focus" />
          <button onClick={() => { setPhase("speak"); setLeft(topic.minutes * 60); }} className={`${button("frame")} mt-3`}>
            I&apos;m ready to speak
          </button>
        </div>
      )}

      {phase === "speak" && (
        <div className="mt-4 text-center">
          <p className="text-sm font-bold text-muted">Speak now</p>
          <p className="text-f text-[3.5rem] font-black leading-none tabular-nums">{mmss}</p>
          {notes && <p className="mx-auto mt-3 max-w-md whitespace-pre-wrap rounded-xl bg-surface-2 p-3 text-left text-sm text-ink-2">{notes}</p>}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {rec.supported && !rec.on && (
              <button onClick={startRecording} className={button("secondary")}>
                ● Record my answer
              </button>
            )}
            {rec.on && <span className="flex items-center gap-2 rounded-full bg-bad/10 px-4 py-2 font-bold text-bad"><span className="size-2.5 animate-pulse rounded-full bg-bad" /> Recording</span>}
            <button onClick={stopSpeaking} className={button("frame")}>
              I&apos;m finished
            </button>
          </div>
          {rec.error && <p className="mt-2 text-sm text-muted">{rec.error}</p>}
        </div>
      )}

      {phase === "done" && (
        <div className="mt-4">
          <p className="text-lg font-bold">Well done! 🎉</p>
          {rec.url && (
            <div className="mt-2">
              <p className="text-sm text-muted">Listen to yourself (the recording stays on this device):</p>
              <audio controls src={rec.url} className="mt-1 w-full" />
            </div>
          )}
          <p className="mt-3 text-ink-2">Now compare: which frames did you use? Read the grammar-rich answer and try one more time using a frame you missed.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {claimed === null ? (
              <button onClick={complete} className={button("frame", "lg")}>
                <IconCheck /> Mark as completed {done ? `(+${XP.speakingRepeat} XP)` : `(+${XP.speaking} XP)`}
              </button>
            ) : (
              <span className="flex items-center gap-2 rounded-full bg-good/10 px-4 py-2 font-bold text-good">
                <IconCheck /> {status === "guest" ? "Completed on this device" : claimed ? `+${claimed} XP` : "Completed"}
              </span>
            )}
            <button onClick={onSeeAnswers} className={button("secondary", "lg")}>
              See sample answers
            </button>
            <button onClick={() => { setPhase("ready"); setClaimed(null); }} className={button("ghost", "lg")}>
              Practise again
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
