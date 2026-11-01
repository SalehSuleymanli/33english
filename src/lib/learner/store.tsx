"use client";

/**
 * Local-first learner store.
 *
 * - Every action is applied immediately and saved on this device, so the app
 *   works with no account and offline.
 * - When the learner is signed in (and Supabase is configured), changes are
 *   pushed to the database in the background, and the account's data is
 *   pulled and merged on sign-in.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useSyncExternalStore, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { getBrowserSupabase } from "@/lib/supabase/client";
import { newlyUnlocked, ACHIEVEMENTS } from "./achievements";
import { emptyState, mergeStates, parseState, type LearnerState } from "./state";
import { diffStates, emptyDirty, everythingDirty, isClean, pull, push, type Dirty } from "./sync";

const GUEST_KEY = "structa:state:guest";
const userKey = (id: string) => `structa:state:${id}`;

export type SyncStatus = "local" | "syncing" | "synced" | "offline" | "error";

type Snapshot = {
  state: LearnerState;
  hydrated: boolean;
  user: { id: string; email?: string } | null;
  authReady: boolean;
  sync: SyncStatus;
  toasts: { id: number; title: string; body: string }[];
};

class LearnerStore {
  snap: Snapshot = {
    state: emptyState(new Date(0)),
    hydrated: false,
    user: null,
    authReady: false,
    sync: "local",
    toasts: [],
  };
  private listeners = new Set<() => void>();
  private dirty: Dirty = emptyDirty();
  private timer: ReturnType<typeof setTimeout> | null = null;
  private toastId = 0;

  subscribe = (l: () => void) => {
    this.listeners.add(l);
    return () => this.listeners.delete(l);
  };
  get = () => this.snap;
  private set(p: Partial<Snapshot>) {
    this.snap = { ...this.snap, ...p };
    this.listeners.forEach((l) => l());
  }

  private key() {
    return this.snap.user ? userKey(this.snap.user.id) : GUEST_KEY;
  }

  hydrate() {
    if (this.snap.hydrated) return;
    const state = parseState(safeGet(GUEST_KEY));
    this.set({ state, hydrated: true });
  }

  dispatch = (fn: (s: LearnerState) => LearnerState) => {
    const prev = this.snap.state;
    let next = fn(prev);
    if (next === prev) return;
    const unlocked = newlyUnlocked(next);
    if (unlocked.length) {
      const now = new Date().toISOString();
      next = { ...next, achievements: { ...next.achievements, ...Object.fromEntries(unlocked.map((id) => [id, now])) } };
      const toasts = unlocked.map((id) => {
        const a = ACHIEVEMENTS.find((x) => x.id === id)!;
        return { id: ++this.toastId, title: a.title, body: a.description };
      });
      this.set({ toasts: [...this.snap.toasts, ...toasts] });
    }
    this.set({ state: next });
    safeSet(this.key(), JSON.stringify(next));
    if (this.snap.user) {
      diffStates(prev, next, this.dirty);
      this.scheduleFlush();
    }
  };

  dismissToast = (id: number) => this.set({ toasts: this.snap.toasts.filter((t) => t.id !== id) });

  private scheduleFlush(delay = 1200) {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => void this.flush(), delay);
  }

  async flush() {
    const sb = getBrowserSupabase();
    const user = this.snap.user;
    if (!sb || !user || isClean(this.dirty)) return;
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      this.set({ sync: "offline" });
      this.scheduleFlush(5000);
      return;
    }
    const batch = this.dirty;
    this.dirty = emptyDirty();
    this.set({ sync: "syncing" });
    try {
      await push(sb, user.id, this.snap.state, batch);
      this.set({ sync: isClean(this.dirty) ? "synced" : "syncing" });
    } catch (e) {
      console.error("[structa] sync failed", e);
      // put the batch back and retry later
      mergeDirty(this.dirty, batch);
      this.set({ sync: "error" });
      this.scheduleFlush(10_000);
    }
  }

  /** Called when auth state changes. */
  async setUser(user: User | null) {
    const prevId = this.snap.user?.id;
    if (user?.id === prevId) {
      this.set({ authReady: true });
      return;
    }
    if (!user) {
      // signed out: go back to the guest state on this device
      this.dirty = emptyDirty();
      this.set({ user: null, authReady: true, sync: "local", state: parseState(safeGet(GUEST_KEY)) });
      return;
    }
    const sb = getBrowserSupabase();
    const cached = parseState(safeGet(userKey(user.id)));
    const guest = parseState(safeGet(GUEST_KEY));
    this.set({ user: { id: user.id, email: user.email ?? undefined }, authReady: true, sync: "syncing", state: mergeStates(cached, guest) });
    if (!sb) return;
    try {
      const remote = await pull(sb, user.id);
      const merged = mergeStates(mergeStates(remote, cached), guest);
      this.set({ state: merged });
      safeSet(userKey(user.id), JSON.stringify(merged));
      // guest progress now belongs to the account
      safeRemove(GUEST_KEY);
      this.dirty = everythingDirty(merged);
      await this.flush();
    } catch (e) {
      console.error("[structa] initial sync failed", e);
      this.dirty = everythingDirty(this.snap.state);
      this.set({ sync: "error" });
      this.scheduleFlush(10_000);
    }
  }

  resetLocal() {
    safeRemove(this.key());
    this.dirty = emptyDirty();
    this.set({ state: emptyState() });
  }
}

function mergeDirty(into: Dirty, from: Dirty) {
  into.profile ||= from.profile;
  into.stats ||= from.stats;
  for (const k of ["lessons", "attempts", "review", "vocab", "vocabDeleted", "bookmarks", "bookmarksDeleted", "activity"] as const)
    (from[k] as Set<string | number>).forEach((v) => (into[k] as Set<string | number>).add(v));
}

function safeGet(k: string): string | null {
  try {
    return window.localStorage.getItem(k);
  } catch {
    return null;
  }
}
function safeSet(k: string, v: string) {
  try {
    window.localStorage.setItem(k, v);
  } catch {
    // storage full or blocked — progress stays in memory for this session
  }
}
function safeRemove(k: string) {
  try {
    window.localStorage.removeItem(k);
  } catch {}
}

/* ---------------- React bindings ---------------- */

const Ctx = createContext<LearnerStore | null>(null);
let singleton: LearnerStore | null = null;

export function LearnerProvider({ children }: { children: ReactNode }) {
  const store = useMemo(() => (singleton ??= new LearnerStore()), []);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    store.hydrate();
    const sb = getBrowserSupabase();
    if (!sb) {
      void store.setUser(null);
      return;
    }
    sb.auth.getUser().then(({ data }) => void store.setUser(data.user ?? null));
    const { data: sub } = sb.auth.onAuthStateChange((_e, session) => void store.setUser(session?.user ?? null));
    const onOnline = () => void store.flush();
    window.addEventListener("online", onOnline);
    return () => {
      sub.subscription.unsubscribe();
      window.removeEventListener("online", onOnline);
    };
  }, [store]);

  return <Ctx value={store}>{children}</Ctx>;
}

const SERVER_SNAPSHOT: Snapshot = {
  state: emptyState(new Date(0)),
  hydrated: false,
  user: null,
  authReady: false,
  sync: "local",
  toasts: [],
};

export function useLearner() {
  const store = useContext(Ctx);
  if (!store) throw new Error("useLearner must be used inside <LearnerProvider>");
  const snap = useSyncExternalStore(store.subscribe, store.get, () => SERVER_SNAPSHOT);
  const dispatch = useCallback((fn: (s: LearnerState) => LearnerState) => store.dispatch(fn), [store]);
  return { ...snap, dispatch, dismissToast: store.dismissToast, resetLocal: () => store.resetLocal() };
}
