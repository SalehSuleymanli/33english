"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLearner } from "@/lib/learner/store";
import { setProfile } from "@/lib/learner/state";
import { getBrowserSupabase } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/env";
import { useThemePref } from "@/components/ui/ThemeToggle";
import { speak, useTtsSupported } from "@/components/ui/Speak";
import { button, card } from "@/components/ui/styles";

const LANGS = [
  ["", "Not set"],
  ["az", "Azerbaijani"],
  ["tr", "Turkish"],
  ["ru", "Russian"],
  ["ar", "Arabic"],
  ["fa", "Persian"],
  ["es", "Spanish"],
  ["pt", "Portuguese"],
  ["zh", "Chinese"],
  ["other", "Another language"],
] as const;

function Row({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 py-4 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6">
      <div>
        <p className="font-bold">{title}</p>
        {hint && <p className="text-sm text-muted">{hint}</p>}
      </div>
      <div>{children}</div>
    </div>
  );
}

export function SettingsView() {
  const { state, dispatch, user, hydrated, resetLocal } = useLearner();
  const [theme, setTheme] = useThemePref();
  const tts = useTtsSupported();
  const router = useRouter();
  const [confirmReset, setConfirmReset] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const p = state.profile;
  const upd = (x: Partial<typeof p>) => dispatch((s) => setProfile(s, x));

  if (!hydrated) return <div className="h-64 animate-pulse rounded-2xl bg-surface-2" aria-busy="true" />;

  const exportData = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `structa-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const signOut = async () => {
    await getBrowserSupabase()?.auth.signOut();
    router.push("/");
  };

  const deleteData = async () => {
    const sb = getBrowserSupabase();
    if (user && sb) {
      const tables = ["exercise_attempts", "lesson_progress", "review_items", "vocabulary", "bookmarks", "activity_days", "learner_stats"];
      const res = await Promise.all(tables.map((t) => sb.from(t).delete().eq("user_id", user.id)));
      if (res.some((r) => r.error)) {
        setMsg("Some data couldn't be deleted. Check your connection and try again.");
        return;
      }
    }
    resetLocal();
    setConfirmReset(false);
    setMsg("Your learning progress was deleted.");
  };

  const field = "h-11 rounded-xl border border-line-strong bg-surface px-3";

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-[2rem] font-bold tracking-[-0.02em]">Settings</h1>
      {msg && (
        <p role="status" className="rounded-xl bg-surface-2 p-3">
          {msg}
        </p>
      )}

      <section aria-labelledby="account" className={`${card} px-5`}>
        <h2 id="account" className="pt-5 text-lg font-bold">
          Account
        </h2>
        <div className="divide-y divide-line">
          {user ? (
            <>
              <Row title="Signed in" hint={user.email}>
                <button type="button" onClick={signOut} className={button("secondary", "sm")}>
                  Sign out
                </button>
              </Row>
              <Row title="Subscription" hint="Plan, billing and cancellation">
                <Link href="/billing" className={button("secondary", "sm")}>
                  Manage
                </Link>
              </Row>
            </>
          ) : (
            <Row title="Not signed in" hint={isSupabaseConfigured() ? "Your progress is saved on this device only." : "Accounts aren't switched on for this site yet. Progress is saved on this device."}>
              {isSupabaseConfigured() && (
                <div className="flex gap-2">
                  <Link href="/login" className={button("ghost", "sm")}>
                    Sign in
                  </Link>
                  <Link href="/signup" className={button("primary", "sm")}>
                    Create account
                  </Link>
                </div>
              )}
            </Row>
          )}
          <Row title="Name" hint="Used to greet you">
            <input className={`${field} w-56`} defaultValue={p.displayName ?? ""} maxLength={80} onBlur={(e) => upd({ displayName: e.target.value.trim() || undefined })} aria-label="Name" />
          </Row>
        </div>
      </section>

      <section aria-labelledby="learning" className={`${card} px-5`}>
        <h2 id="learning" className="pt-5 text-lg font-bold">
          Learning
        </h2>
        <div className="divide-y divide-line">
          <Row title="Daily goal" hint="Answers per day. Also the size of your daily review.">
            <select className={field} value={p.dailyGoal} onChange={(e) => upd({ dailyGoal: Number(e.target.value) })} aria-label="Daily goal">
              {[10, 20, 30, 50].map((n) => (
                <option key={n} value={n}>
                  {n} answers
                </option>
              ))}
            </select>
          </Row>
          <Row title="Your first language" hint="Adds translation exercises where they're available (currently Azerbaijani).">
            <select className={field} value={p.nativeLanguage ?? ""} onChange={(e) => upd({ nativeLanguage: e.target.value || undefined })} aria-label="First language">
              {LANGS.map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </Row>
          <Row title="Streaks" hint="Count days in a row. Turn off if it adds pressure — your progress never resets either way.">
            <Toggle on={p.streaksEnabled} onChange={(v) => upd({ streaksEnabled: v })} label="Streaks" />
          </Row>
          <Row title="Speech speed" hint={tts ? "How fast examples are read aloud." : "Your browser doesn't support reading aloud."}>
            <div className="flex items-center gap-3">
              <input type="range" min={0.6} max={1.1} step={0.05} value={p.speechRate} onChange={(e) => upd({ speechRate: Number(e.target.value) })} aria-label="Speech speed" disabled={!tts} className="w-36 accent-[var(--ink)]" />
              <button type="button" disabled={!tts} onClick={() => speak("There are three people outside.", p.speechRate)} className={button("ghost", "sm")}>
                Test
              </button>
            </div>
          </Row>
          <Row title="Theme">
            <div role="radiogroup" aria-label="Theme" className="inline-flex rounded-full border border-line-strong p-1">
              {(["system", "light", "dark"] as const).map((t) => (
                <button key={t} role="radio" aria-checked={theme === t} onClick={() => setTheme(t)} className={`h-8 rounded-full px-3 text-sm font-bold capitalize ${theme === t ? "bg-ink text-paper" : "text-muted"}`}>
                  {t}
                </button>
              ))}
            </div>
          </Row>
          <Row title="Placement check" hint={p.placement ? `Suggested start: Day ${p.placement.suggestedStartDay}` : "Not taken yet"}>
            <Link href="/onboarding" className={button("secondary", "sm")}>
              {p.placement ? "Retake" : "Take it"}
            </Link>
          </Row>
        </div>
      </section>

      <section aria-labelledby="data" className={`${card} px-5`}>
        <h2 id="data" className="pt-5 text-lg font-bold">
          Your data
        </h2>
        <div className="divide-y divide-line">
          <Row title="Download your data" hint="Everything Structa stores about your learning, as a JSON file.">
            <button type="button" onClick={exportData} className={button("secondary", "sm")}>
              Download
            </button>
          </Row>
          <Row title="Delete learning progress" hint={user ? "Deletes your progress on this device and in your account. This can't be undone." : "Deletes your progress on this device. This can't be undone."}>
            {confirmReset ? (
              <div className="flex gap-2">
                <button type="button" onClick={() => setConfirmReset(false)} className={button("ghost", "sm")}>
                  Cancel
                </button>
                <button type="button" onClick={deleteData} className={`${button("primary", "sm")} !bg-bad`}>
                  Delete everything
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => setConfirmReset(true)} className={`${button("secondary", "sm")} text-bad`}>
                Delete progress
              </button>
            )}
          </Row>
        </div>
      </section>
    </div>
  );
}

function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} onClick={() => onChange(!on)} className={`relative h-7 w-12 rounded-full transition-colors ${on ? "bg-good" : "bg-line-strong"}`}>
      <span className={`absolute top-1 size-5 rounded-full bg-white shadow transition-[left] ${on ? "left-6" : "left-1"}`} />
    </button>
  );
}
