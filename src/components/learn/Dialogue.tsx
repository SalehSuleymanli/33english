"use client";
import { useState } from "react";
import type { Dialogue as D } from "@/content/types";
import { SpeakButton, speak, useTtsSupported } from "@/components/ui/Speak";
import { button } from "@/components/ui/styles";

function highlight(line: string, focus: string[]) {
  const f = focus.find((p) => line.toLowerCase().includes(p.toLowerCase()));
  if (!f) return line;
  const at = line.toLowerCase().indexOf(f.toLowerCase());
  return (
    <>
      {line.slice(0, at)}
      <mark className="bg-f-tint text-f rounded px-0.5 font-semibold">{line.slice(at, at + f.length)}</mark>
      {line.slice(at + f.length)}
    </>
  );
}

/** A conversation with per-line audio, a play-all option, and a "hide my lines" role-play mode. */
export function Dialogue({ dialogue, rate = 0.9 }: { dialogue: D; rate?: number }) {
  const tts = useTtsSupported();
  const speakers = [...new Set(dialogue.lines.map((l) => l.speaker))];
  const [roleplay, setRoleplay] = useState<string | null>(null);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [playing, setPlaying] = useState(false);

  const playAll = () => {
    if (!("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    setPlaying(true);
    dialogue.lines.forEach((l, k) => {
      const u = new SpeechSynthesisUtterance(l.line);
      u.lang = "en-US";
      u.rate = rate;
      u.pitch = speakers.indexOf(l.speaker) % 2 ? 0.85 : 1.1;
      if (k === dialogue.lines.length - 1) u.onend = () => setPlaying(false);
      synth.speak(u);
    });
  };

  return (
    <div className="mt-2 flex flex-col gap-5">
      <p className="text-ink-2">{dialogue.setting}</p>
      <div className="flex flex-wrap items-center gap-2">
        {tts && (
          <button type="button" onClick={playing ? () => (window.speechSynthesis.cancel(), setPlaying(false)) : playAll} className={button("secondary", "sm")}>
            {playing ? "Stop" : "Play conversation"}
          </button>
        )}
        <span className="text-sm text-muted">Role-play as:</span>
        {speakers.map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={roleplay === s}
            onClick={() => {
              setRoleplay(roleplay === s ? null : s);
              setRevealed(new Set());
            }}
            className={`h-9 rounded-full border px-3 text-sm font-bold ${roleplay === s ? "border-f bg-f-tint text-f" : "border-line-strong"}`}
          >
            {s}
          </button>
        ))}
      </div>
      {roleplay && <p className="text-sm text-ink-2">Your lines are hidden. Say each one aloud, then reveal it to check.</p>}
      <ol className="flex flex-col gap-3">
        {dialogue.lines.map((l, k) => {
          const mine = roleplay === l.speaker;
          const hidden = mine && !revealed.has(k);
          const right = speakers.indexOf(l.speaker) % 2 === 1;
          return (
            <li key={k} className={`flex max-w-[92%] flex-col ${right ? "self-end items-end" : "items-start"}`}>
              <span className="mb-1 px-1 text-xs font-bold text-muted">{l.speaker}</span>
              <div className={`flex items-center gap-1 rounded-2xl px-4 py-3 ${right ? "bg-surface-2" : "bg-surface border border-line"} ${mine ? "ring-2 ring-f/40" : ""}`}>
                {hidden ? (
                  <button type="button" onClick={() => setRevealed((r) => new Set(r).add(k))} className="text-sm font-bold text-f">
                    Say your line, then tap to reveal
                  </button>
                ) : (
                  <>
                    <p className="specimen text-lg">{highlight(l.line, dialogue.focus)}</p>
                    <SpeakButton text={l.line} rate={rate} />
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      <div className="rounded-2xl bg-f-wash p-4">
        <p className="text-sm font-bold">Notice</p>
        <ul className="mt-1 flex flex-wrap gap-2">
          {dialogue.focus.map((f) => (
            <li key={f}>
              <button type="button" onClick={() => speak(f, rate)} className="specimen rounded-lg bg-surface px-2 py-1 text-base">
                {f}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
