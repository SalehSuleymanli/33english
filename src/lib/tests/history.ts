"use client";
/** Test results: from the server when signed in (all devices), otherwise from this device. */
import { useCallback, useEffect, useState } from "react";

export type Attempt = { test_id: string; kind: string; score: number; total: number; percent: number; seconds: number | null; created_at: string };
const KEY = "structa:tests";

function readLocal(): Attempt[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

export function saveLocalAttempt(a: Attempt) {
  try {
    localStorage.setItem(KEY, JSON.stringify([a, ...readLocal()].slice(0, 300)));
  } catch {
    /* storage unavailable */
  }
}

export function useTestHistory() {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [ready, setReady] = useState(false);
  const load = useCallback(async () => {
    const local = readLocal();
    try {
      const res = await fetch("/api/tests/history", { cache: "no-store" });
      const data = await res.json();
      const server: Attempt[] = data?.attempts ?? [];
      setAttempts(server.length ? server : local);
    } catch {
      setAttempts(local);
    }
    setReady(true);
  }, []);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- results come from the server and browser storage
  useEffect(() => void load(), [load]);
  return { attempts, ready, reload: load };
}

export function bestFor(attempts: Attempt[], testId: string) {
  const mine = attempts.filter((a) => a.test_id === testId);
  return mine.length ? { best: Math.max(...mine.map((a) => a.percent)), count: mine.length, last: mine[0] } : null;
}
