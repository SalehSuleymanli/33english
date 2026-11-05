"use client";
/**
 * Browser side of rewards. It never decides XP — it sends what the learner did
 * to /api/rewards, which checks it and answers with the new totals.
 * Guests can still play: their game progress is kept on this device, and they
 * are invited to create an account to start earning XP.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useSyncExternalStore, type ReactNode } from "react";
import { useLearner } from "@/lib/learner/store";
import { dayKey } from "@/lib/learner/state";
import { isSupabaseConfigured } from "@/lib/env";
import { badgeById } from "@/lib/game/rewards";
import type { ClaimResponse, Grant, RewardsSnapshot } from "./types";

export type ClaimInput =
  | { type: "lesson"; day: number; answers: Record<string, string> }
  | { type: "crossword"; puzzleId: string; answers: Record<string, string>; hints: number; seconds: number }
  | { type: "quest"; stageId: string; seed: number; hero: string; power: number; log: unknown[] }
  | { type: "speaking"; topicId: string }
  | { type: "word"; term: string }
  | { type: "arena"; matchId: string };

export type Celebration =
  | { id: number; type: "xp"; grants: Grant[]; total: number }
  | { id: number; type: "badge"; badgeId: string }
  | { id: number; type: "level"; level: number }
  | { id: number; type: "guest"; what: string };

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

type Local = {
  questCleared: string[];
  questStars: Record<string, number>;
  crosswordSolved: string[];
  speakingDone: string[];
};

type Snap = {
  status: "idle" | "loading" | "ready" | "guest" | "unavailable" | "error";
  snapshot: RewardsSnapshot | null;
  local: Local;
  celebrations: Celebration[];
};

const LOCAL_KEY = "33e:games:local";
const EMPTY_LOCAL: Local = { questCleared: [], questStars: {}, crosswordSolved: [], speakingDone: [] };

function readLocal(): Local {
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY);
    if (!raw) return EMPTY_LOCAL;
    const d = JSON.parse(raw) as Partial<Local>;
    return {
      questCleared: Array.isArray(d.questCleared) ? d.questCleared : [],
      questStars: d.questStars && typeof d.questStars === "object" ? d.questStars : {},
      crosswordSolved: Array.isArray(d.crosswordSolved) ? d.crosswordSolved : [],
      speakingDone: Array.isArray(d.speakingDone) ? d.speakingDone : [],
    };
  } catch {
    return EMPTY_LOCAL;
  }
}

class RewardsStore {
  snap: Snap = { status: "idle", snapshot: null, local: EMPTY_LOCAL, celebrations: [] };
  private listeners = new Set<() => void>();
  private seq = 0;
  private uid: string | null = null;

  subscribe = (l: () => void) => {
    this.listeners.add(l);
    return () => this.listeners.delete(l);
  };
  get = () => this.snap;
  private set(p: Partial<Snap>) {
    this.snap = { ...this.snap, ...p };
    this.listeners.forEach((l) => l());
  }

  hydrateLocal() {
    this.set({ local: readLocal() });
  }

  private saveLocal(next: Local) {
    this.set({ local: next });
    try {
      window.localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
    } catch {}
  }

  noteLocal(input: ClaimInput, outcome?: { won?: boolean; stars?: number }) {
    const l = this.snap.local;
    if (input.type === "quest" && outcome?.won) {
      this.saveLocal({
        ...l,
        questCleared: [...new Set([...l.questCleared, input.stageId])],
        questStars: { ...l.questStars, [input.stageId]: Math.max(l.questStars[input.stageId] ?? 0, outcome.stars ?? 0) },
      });
    }
    if (input.type === "crossword") this.saveLocal({ ...l, crosswordSolved: [...new Set([...l.crosswordSolved, input.puzzleId])] });
    if (input.type === "speaking") this.saveLocal({ ...l, speakingDone: [...new Set([...l.speakingDone, input.topicId])] });
  }

  async setUser(uid: string | null) {
    if (uid === this.uid && this.snap.status !== "idle") return;
    this.uid = uid;
    if (!isSupabaseConfigured()) return this.set({ status: "unavailable", snapshot: null });
    if (!uid) return this.set({ status: "guest", snapshot: null });
    await this.refresh();
  }

  async refresh() {
    if (!this.uid) return;
    this.set({ status: this.snap.snapshot ? "ready" : "loading" });
    try {
      const res = await fetch(`/api/rewards?date=${dayKey()}`, { cache: "no-store" });
      if (res.status === 401) return this.set({ status: "guest", snapshot: null });
      if (res.status === 503) return this.set({ status: "unavailable", snapshot: null });
      const data = (await res.json()) as { ok: boolean; snapshot?: RewardsSnapshot };
      if (!res.ok || !data.snapshot) return this.set({ status: "error" });
      this.set({ status: "ready", snapshot: data.snapshot });
    } catch {
      this.set({ status: "error" });
    }
  }

  private celebrate(c: DistributiveOmit<Celebration, "id">) {
    this.set({ celebrations: [...this.snap.celebrations, { ...c, id: ++this.seq } as Celebration] });
  }
  dismiss = (id: number) => this.set({ celebrations: this.snap.celebrations.filter((c) => c.id !== id) });

  /** Send a claim. Returns the server answer, or null for guests / when offline. */
  claim = async (input: ClaimInput, outcome?: { won?: boolean; stars?: number }, opts: { quiet?: boolean } = {}): Promise<ClaimResponse | null> => {
    this.noteLocal(input, outcome);
    if (this.snap.status === "guest" || this.snap.status === "unavailable") {
      if (!opts.quiet && this.snap.status === "guest") this.celebrate({ type: "guest", what: input.type });
      return null;
    }
    try {
      const res = await fetch("/api/rewards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, localDate: dayKey() }),
      });
      if (res.status === 401) {
        this.set({ status: "guest", snapshot: null });
        if (!opts.quiet) this.celebrate({ type: "guest", what: input.type });
        return null;
      }
      const data = (await res.json()) as ClaimResponse & { error?: string };
      if (!res.ok) return { ...data, ok: false, verified: false, granted: [], newBadges: [], levelUp: null, message: data.error } as ClaimResponse;
      this.set({ snapshot: data.snapshot, status: "ready" });
      if (data.granted.length) this.celebrate({ type: "xp", grants: data.granted, total: data.granted.reduce((n, g) => n + g.xp, 0) });
      if (data.levelUp) this.celebrate({ type: "level", level: data.levelUp });
      for (const b of data.newBadges) if (badgeById(b)) this.celebrate({ type: "badge", badgeId: b });
      return data;
    } catch {
      return null;
    }
  };
}

const Ctx = createContext<RewardsStore | null>(null);
let singleton: RewardsStore | null = null;

export function RewardsProvider({ children }: { children: ReactNode }) {
  const store = useMemo(() => (singleton ??= new RewardsStore()), []);
  const { user, authReady } = useLearner();
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    store.hydrateLocal();
  }, [store]);
  useEffect(() => {
    if (!authReady) return;
    void store.setUser(user?.id ?? null);
  }, [authReady, user?.id, store]);
  return <Ctx value={store}>{children}</Ctx>;
}

const SERVER: Snap = { status: "idle", snapshot: null, local: EMPTY_LOCAL, celebrations: [] };

export function useRewards() {
  const store = useContext(Ctx);
  if (!store) throw new Error("useRewards must be used inside <RewardsProvider>");
  const snap = useSyncExternalStore(store.subscribe, store.get, () => SERVER);
  const claim = useCallback((i: ClaimInput, o?: { won?: boolean; stars?: number }, opts?: { quiet?: boolean }) => store.claim(i, o, opts), [store]);
  const refresh = useCallback(() => store.refresh(), [store]);
  return { ...snap, claim, refresh, dismiss: store.dismiss };
}

/**
 * Game progress for unlocks. Signed in: the verified account record (so the
 * server will agree). Guest: what was played on this device.
 */
export function useGameProgress() {
  const { snapshot, local } = useRewards();
  return useMemo(() => {
    const signedIn = !!snapshot;
    const cleared = new Set(signedIn ? snapshot.facts.questCleared : local.questCleared);
    const stars: Record<string, number> = {};
    if (signedIn) for (const [k, v] of Object.entries(snapshot.questRecords)) stars[k] = v.stars;
    else Object.assign(stars, local.questStars);
    const crosswordSolved = new Set(signedIn ? snapshot.crosswordSolved : local.crosswordSolved);
    const speakingDone = new Set([...Object.keys(snapshot?.speakingDone ?? {}), ...local.speakingDone]);
    const totalStars = signedIn ? snapshot.facts.questStars : Object.values(stars).reduce((a, b) => a + b, 0);
    return {
      signedIn,
      cleared,
      stars,
      totalStars,
      crosswordSolved,
      crosswordCount: signedIn ? snapshot.facts.crosswords : local.crosswordSolved.length,
      speakingDone,
      bestStreak: snapshot?.bestStreak ?? 0,
      level: snapshot?.level ?? 1,
    };
  }, [snapshot, local]);
}
