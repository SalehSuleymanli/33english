"use client";

import Link from "next/link";
import Script from "next/script";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { PADDLE_CLIENT_TOKEN, PADDLE_ENVIRONMENT, PADDLE_PRICES, isPaymentsConfigured } from "@/lib/env";
import { PRICES, PREMIUM_FEATURES, fmt } from "@/lib/pricing";
import { button, card } from "@/components/ui/styles";

type Viewer = { signedIn: boolean; email?: string; userId?: string; premium: boolean; plan?: string; status?: string; periodEnd?: string | null; cancelAtPeriodEnd?: boolean; devUnlock: boolean };

type PaddleGlobal = {
  Environment: { set: (e: string) => void };
  Initialize: (o: { token: string; eventCallback?: (e: { name: string }) => void }) => void;
  Checkout: { open: (o: unknown) => void };
};

export function BillingView({ viewer }: { viewer: Viewer }) {
  const params = useSearchParams();
  const [plan, setPlan] = useState<"annual" | "monthly">((params.get("plan") as "annual" | "monthly") === "monthly" ? "monthly" : "annual");
  const [ready, setReady] = useState(false);
  const [msg, setMsg] = useState<string | null>(params.get("checkout") === "success" ? "Thanks! Your payment is being confirmed. Premium appears here within a minute — refresh if it doesn't." : null);
  const [busy, setBusy] = useState(false);
  const configured = isPaymentsConfigured();

  const initPaddle = () => {
    const P = (window as unknown as { Paddle?: PaddleGlobal }).Paddle;
    if (!P) return;
    if (PADDLE_ENVIRONMENT === "sandbox") P.Environment.set("sandbox");
    P.Initialize({ token: PADDLE_CLIENT_TOKEN });
    setReady(true);
  };

  const checkout = () => {
    const P = (window as unknown as { Paddle?: PaddleGlobal }).Paddle;
    if (!P || !viewer.userId) return;
    P.Checkout.open({
      items: [{ priceId: plan === "annual" ? PADDLE_PRICES.annual : PADDLE_PRICES.monthly, quantity: 1 }],
      customer: viewer.email ? { email: viewer.email } : undefined,
      // The webhook uses this to attach the subscription to the right account.
      customData: { user_id: viewer.userId },
      settings: { successUrl: `${window.location.origin}/billing?checkout=success`, displayMode: "overlay" },
    });
  };

  const portal = async () => {
    setBusy(true);
    setMsg(null);
    try {
      const r = await fetch("/api/billing/portal", { method: "POST" });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error ?? "Couldn't open billing.");
      window.location.href = j.url;
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Couldn't open billing.");
      setBusy(false);
    }
  };

  return (
    <div className="max-w-2xl">
      {configured && <Script src="https://cdn.paddle.com/paddle/v2/paddle.js" onLoad={initPaddle} />}
      <h1 className="text-[2rem] font-bold tracking-[-0.02em]">Subscription</h1>
      {msg && (
        <p role="status" className="mt-4 rounded-xl bg-surface-2 p-3">
          {msg}
        </p>
      )}

      {viewer.devUnlock && <p className="mt-4 rounded-lg bg-warn/10 p-3 text-sm text-warn">Development mode is unlocking all lessons (DEV_UNLOCK_ALL). This is not a subscription and never applies in production.</p>}

      {!viewer.signedIn ? (
        <section className={`${card} mt-6 p-6`}>
          <h2 className="font-bold">Sign in to manage your subscription</h2>
          <p className="mt-1 text-ink-2">Premium is linked to your account, so you can use it on any device.</p>
          <div className="mt-4 flex gap-2">
            <Link href="/signup" className={button("primary")}>
              Create account
            </Link>
            <Link href="/login" className={button("secondary")}>
              Sign in
            </Link>
          </div>
        </section>
      ) : viewer.premium && !viewer.devUnlock ? (
        <section className={`${card} mt-6 p-6`}>
          <p className="text-sm font-bold text-good">Premium is active</p>
          <h2 className="mt-1 text-xl font-bold">{viewer.plan === "annual" ? "Yearly plan" : "Monthly plan"}</h2>
          <p className="mt-1 text-ink-2">
            {viewer.cancelAtPeriodEnd ? "Cancelled — access continues until " : "Renews on "}
            {viewer.periodEnd ? new Date(viewer.periodEnd).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) : "—"}.
          </p>
          <button type="button" onClick={portal} disabled={busy} className={`${button("secondary")} mt-5`}>
            {busy ? "Opening…" : "Update payment method or cancel"}
          </button>
        </section>
      ) : (
        <section className={`${card} mt-6 p-6`}>
          <h2 className="text-xl font-bold">Premium</h2>
          {viewer.status && viewer.status !== "active" && (
            <p className="mt-1 text-sm text-warn">
              Your last subscription is {viewer.status.replace("_", " ")}.{" "}
              {viewer.status === "past_due" ? "Update your payment method to keep access." : ""}
            </p>
          )}
          <ul className="mt-3 flex list-disc flex-col gap-1 pl-5 text-ink-2">
            {PREMIUM_FEATURES.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <div role="radiogroup" aria-label="Plan" className="mt-6 grid gap-2 sm:grid-cols-2">
            {(["annual", "monthly"] as const).map((p) => (
              <button
                key={p}
                role="radio"
                aria-checked={plan === p}
                onClick={() => setPlan(p)}
                className={`rounded-2xl border-2 p-4 text-left ${plan === p ? "border-ink" : "border-line-strong"}`}
              >
                <span className="block font-bold">{p === "annual" ? "Yearly" : "Monthly"}</span>
                <span className="block text-2xl font-bold">{fmt(p === "annual" ? PRICES.annual : PRICES.monthly)}</span>
                <span className="text-sm text-muted">{p === "annual" ? `${fmt(PRICES.annual / 12)} a month` : "per month"}</span>
              </button>
            ))}
          </div>
          {configured ? (
            <button type="button" onClick={checkout} disabled={!ready} className={`${button("primary", "lg")} mt-6 w-full sm:w-auto`}>
              {ready ? "Continue to secure checkout" : "Loading checkout…"}
            </button>
          ) : (
            <div className="mt-6 rounded-xl border border-dashed border-line-strong p-4">
              <p className="font-bold">Checkout isn&apos;t open yet</p>
              <p className="mt-1 text-sm text-ink-2">Payments haven&apos;t been connected on this site. Nothing will be charged, and Premium can&apos;t be bought until they are.</p>
            </div>
          )}
          <p className="mt-4 text-xs text-muted">Payments are processed by Paddle, our reseller, who handles taxes and invoices. Cancel anytime from this page.</p>
        </section>
      )}
    </div>
  );
}
