"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { getBrowserSupabase } from "@/lib/supabase/client";
import { button } from "@/components/ui/styles";
import { useLearner } from "@/lib/learner/store";

type Mode = "login" | "signup";

export function AuthForm({ mode }: { mode: Mode }) {
  const sb = getBrowserSupabase();
  const router = useRouter();
  const { state } = useLearner();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [useLink, setUseLink] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<string | null>(null);
  const hasGuestProgress = Object.keys(state.lessons).length > 0 || state.attempts.length > 0;

  if (!sb) {
    return (
      <div className="rounded-[var(--radius-card)] border border-line bg-surface p-6">
        <h2 className="font-bold">Accounts aren&apos;t switched on yet</h2>
        <p className="mt-2 text-ink-2">
          This copy of 33English isn&apos;t connected to an account service yet. You can still learn: your progress is saved on this device.
        </p>
        <Link href="/today" className={`${button("primary")} mt-5`}>
          Continue without an account
        </Link>
      </div>
    );
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!sb) return;
    setBusy(true);
    setError(null);
    const redirect = `${window.location.origin}/auth/callback?next=/today`;
    try {
      if (useLink) {
        const { error } = await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: redirect, shouldCreateUser: mode === "signup", data: name ? { display_name: name } : undefined } });
        if (error) throw error;
        setSent(`We sent a sign-in link to ${email}. Open it on this device to continue.`);
      } else if (mode === "signup") {
        const { data, error } = await sb.auth.signUp({ email, password, options: { emailRedirectTo: redirect, data: { display_name: name } } });
        if (error) throw error;
        if (data.session) router.push("/today");
        else setSent(`Check ${email} to confirm your account. Then sign in.`);
      } else {
        const { error } = await sb.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push("/today");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setError(friendly(msg));
    } finally {
      setBusy(false);
    }
  }

  if (sent)
    return (
      <div role="status" className="rounded-[var(--radius-card)] border border-line bg-surface p-6">
        <h2 className="font-bold">Check your email</h2>
        <p className="mt-2 text-ink-2">{sent}</p>
      </div>
    );

  const field = "mt-1 h-12 w-full rounded-xl border border-line-strong bg-surface px-4 text-base outline-none focus:border-focus focus:ring-2 focus:ring-focus/30";
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate={false}>
      {mode === "signup" && hasGuestProgress && (
        <p className="rounded-xl bg-surface-2 p-3 text-sm text-ink-2">Your progress on this device will be added to your new account.</p>
      )}
      {mode === "signup" && (
        <label className="block">
          <span className="text-sm font-bold">Name (optional)</span>
          <input className={field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="given-name" maxLength={80} />
        </label>
      )}
      <label className="block">
        <span className="text-sm font-bold">Email</span>
        <input className={field} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
      </label>
      {!useLink && (
        <label className="block">
          <span className="text-sm font-bold">Password</span>
          <input
            className={field}
            type="password"
            required
            minLength={mode === "signup" ? 8 : undefined}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
          />
          {mode === "signup" && <span className="mt-1 block text-xs text-muted">At least 8 characters.</span>}
        </label>
      )}
      {error && (
        <p role="alert" className="text-sm text-bad">
          {error}
        </p>
      )}
      <button type="submit" disabled={busy} className={button("primary", "lg")}>
        {busy ? "Please wait…" : useLink ? "Email me a sign-in link" : mode === "signup" ? "Create account" : "Sign in"}
      </button>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <button type="button" onClick={() => setUseLink((v) => !v)} className="text-sm font-bold text-muted underline-offset-4 hover:text-ink hover:underline">
          {useLink ? "Use a password instead" : "Use an email link instead"}
        </button>
        {mode === "login" && !useLink && (
          <Link href="/forgot-password" className="text-sm font-bold text-muted underline-offset-4 hover:text-ink hover:underline">
            Forgot password?
          </Link>
        )}
      </div>
    </form>
  );
}

function friendly(msg: string) {
  if (/invalid login/i.test(msg)) return "That email and password don't match. Check them, or use an email link instead.";
  if (/already registered/i.test(msg)) return "An account with this email already exists. Sign in instead.";
  if (/rate limit/i.test(msg)) return "Too many attempts. Wait a minute and try again.";
  if (/email not confirmed/i.test(msg)) return "Please confirm your email first — check your inbox (and spam folder) for our message.";
  if (/password should be|at least/i.test(msg)) return "Please choose a stronger password (at least 8 characters).";
  return msg;
}
