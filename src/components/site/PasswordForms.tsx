"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { getBrowserSupabase } from "@/lib/supabase/client";
import { button } from "@/components/ui/styles";

const field = "mt-1 h-12 w-full rounded-xl border border-line-strong bg-surface px-4 text-base outline-none focus:border-focus focus:ring-2 focus:ring-focus/30";

function NotConfigured() {
  return (
    <p className="rounded-xl bg-surface-2 p-4 text-ink-2">Accounts aren&apos;t switched on for this site yet.</p>
  );
}

export function PasswordResetForm() {
  const sb = getBrowserSupabase();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  if (!sb) return <NotConfigured />;

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!sb) return;
    setBusy(true);
    setError(null);
    const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/auth/callback?next=/reset-password` });
    setBusy(false);
    if (error) setError(/rate limit/i.test(error.message) ? "Too many requests. Wait a minute and try again." : error.message);
    else setSent(true);
  }

  if (sent)
    return (
      <div role="status" className="rounded-[var(--radius-card)] border border-line bg-surface p-6">
        <h2 className="font-bold">Check your email</h2>
        <p className="mt-2 text-ink-2">If an account exists for {email}, a reset link is on its way. It works once and expires after an hour.</p>
      </div>
    );

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <label className="block">
        <span className="text-sm font-bold">Email</span>
        <input className={field} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
      </label>
      {error && (
        <p role="alert" className="text-sm text-bad">
          {error}
        </p>
      )}
      <button type="submit" disabled={busy} className={button("primary", "lg")}>
        {busy ? "Sending…" : "Send reset link"}
      </button>
    </form>
  );
}

export function NewPasswordForm() {
  const sb = getBrowserSupabase();
  const router = useRouter();
  const [ready, setReady] = useState<"checking" | "ok" | "missing">("checking");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sb) return;
    sb.auth.getUser().then(({ data }) => setReady(data.user ? "ok" : "missing"));
  }, [sb]);

  if (!sb) return <NotConfigured />;
  if (ready === "checking") return <div className="h-40 animate-pulse rounded-2xl bg-surface-2" aria-busy="true" />;
  if (ready === "missing")
    return (
      <div className="rounded-[var(--radius-card)] border border-line bg-surface p-6">
        <h2 className="font-bold">This link has expired</h2>
        <p className="mt-2 text-ink-2">Reset links work once and expire after an hour. Request a new one.</p>
        <Link href="/forgot-password" className={`${button("primary")} mt-5`}>
          Send a new link
        </Link>
      </div>
    );

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!sb) return;
    if (password.length < 8) return setError("Use at least 8 characters.");
    if (password !== confirm) return setError("The two passwords don't match.");
    setBusy(true);
    setError(null);
    const { error } = await sb.auth.updateUser({ password });
    setBusy(false);
    if (error) setError(error.message);
    else router.push("/today?password=updated");
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <label className="block">
        <span className="text-sm font-bold">New password</span>
        <input className={field} type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
      </label>
      <label className="block">
        <span className="text-sm font-bold">Repeat new password</span>
        <input className={field} type="password" required minLength={8} value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="new-password" />
      </label>
      {error && (
        <p role="alert" className="text-sm text-bad">
          {error}
        </p>
      )}
      <button type="submit" disabled={busy} className={button("primary", "lg")}>
        {busy ? "Saving…" : "Save new password"}
      </button>
    </form>
  );
}

/** Shown on /login when an email link has expired or was already used. */
export function LinkError() {
  const params = useSearchParams();
  if (params.get("error") !== "link") return null;
  return (
    <p role="alert" className="mb-6 rounded-xl bg-surface-2 p-3 text-sm text-ink-2">
      That email link has expired or was already used. Sign in below, or request a new link.
    </p>
  );
}
