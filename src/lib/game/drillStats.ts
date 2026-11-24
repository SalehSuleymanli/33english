"use client";
/** Per-device record of practice-game results (best score, plays). Signed-in players also get best scores saved on the server. */
import { useCallback, useEffect, useState } from "react";
import type { DrillId } from "./drills";

export type DrillStat = { plays: number; best: number; last: number; lastAt: string };
const KEY = "structa:drills";

function read(): Partial<Record<DrillId, DrillStat>> {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") ?? {};
  } catch {
    return {};
  }
}

export function useDrillStats() {
  const [stats, setStats] = useState<Partial<Record<DrillId, DrillStat>>>({});
  // eslint-disable-next-line react-hooks/set-state-in-effect -- browser storage is only readable after mount
  useEffect(() => setStats(read()), []);
  const record = useCallback((game: DrillId, percent: number) => {
    const all = read();
    const prev = all[game];
    all[game] = { plays: (prev?.plays ?? 0) + 1, best: Math.max(prev?.best ?? 0, percent), last: percent, lastAt: new Date().toISOString() };
    try {
      localStorage.setItem(KEY, JSON.stringify(all));
    } catch {
      /* storage unavailable: results still show for this round */
    }
    setStats(all);
  }, []);
  return { stats, record };
}
