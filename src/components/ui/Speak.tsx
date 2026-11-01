"use client";
import { useEffect, useState } from "react";

/**
 * Text-to-speech with the browser's built-in voices (Web Speech API).
 * No external service or licence needed. Hidden if the browser lacks support.
 */
export function speak(text: string, rate = 0.9) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = rate;
  const voices = synth.getVoices();
  const v = voices.find((x) => x.lang === "en-US" && /natural|google|samantha|aria|jenny/i.test(x.name)) ?? voices.find((x) => x.lang.startsWith("en"));
  if (v) u.voice = v;
  synth.speak(u);
  return true;
}

export function useTtsSupported() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- feature detection after mount
    setOk(typeof window !== "undefined" && "speechSynthesis" in window);
  }, []);
  return ok;
}

export function SpeakButton({ text, rate, label = "Listen", className = "" }: { text: string; rate?: number; label?: string; className?: string }) {
  const ok = useTtsSupported();
  if (!ok) return null;
  return (
    <button
      type="button"
      onClick={() => speak(text, rate)}
      className={`inline-grid size-9 shrink-0 place-items-center rounded-full text-muted hover:bg-surface-2 hover:text-ink ${className}`}
      aria-label={`${label}: ${text}`}
      title={label}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M11 5 6 9H3v6h3l5 4V5Z" />
        <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
      </svg>
    </button>
  );
}
