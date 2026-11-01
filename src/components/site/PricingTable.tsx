"use client";
import Link from "next/link";
import { useState } from "react";
import { FREE_FEATURES, PREMIUM_FEATURES, PRICES, fmt } from "@/lib/pricing";
import { button } from "@/components/ui/styles";

export function PricingTable() {
  const [plan, setPlan] = useState<"annual" | "monthly">("annual");
  const saving = Math.round((1 - PRICES.annual / (PRICES.monthly * 12)) * 100);
  return (
    <div>
      <div role="radiogroup" aria-label="Billing period" className="inline-flex rounded-full border border-line-strong bg-surface p-1">
        {(["annual", "monthly"] as const).map((p) => (
          <button
            key={p}
            role="radio"
            aria-checked={plan === p}
            onClick={() => setPlan(p)}
            className={`h-9 rounded-full px-4 text-sm font-bold ${plan === p ? "bg-ink text-paper" : "text-muted hover:text-ink"}`}
          >
            {p === "annual" ? `Yearly · save ${saving}%` : "Monthly"}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <section className="flex flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 sm:p-8">
          <h2 className="text-xl font-bold">Free</h2>
          <p className="mt-2 text-[2.25rem] font-bold leading-none">{fmt(0)}</p>
          <p className="mt-1 text-sm text-muted">No card needed</p>
          <ul className="mt-6 flex flex-1 flex-col gap-2.5">
            {FREE_FEATURES.map((f) => (
              <li key={f} className="flex gap-2">
                <Check /> {f}
              </li>
            ))}
          </ul>
          <Link href="/learn/1" className={`${button("secondary")} mt-8`}>
            Start Day 1
          </Link>
        </section>
        <section className="flex flex-col rounded-[var(--radius-card)] border-2 border-ink bg-surface p-6 sm:p-8">
          <h2 className="text-xl font-bold">Premium</h2>
          <p className="mt-2 text-[2.25rem] font-bold leading-none">
            {fmt(plan === "annual" ? PRICES.annual : PRICES.monthly)}
            <span className="text-base font-normal text-muted"> / {plan === "annual" ? "year" : "month"}</span>
          </p>
          <p className="mt-1 text-sm text-muted">
            {plan === "annual" ? `${fmt(PRICES.annual / 12)} a month, billed yearly` : "Billed monthly"} · cancel anytime
          </p>
          <ul className="mt-6 flex flex-1 flex-col gap-2.5">
            <li className="flex gap-2 font-bold">
              <Check /> Everything in Free
            </li>
            {PREMIUM_FEATURES.map((f) => (
              <li key={f} className="flex gap-2">
                <Check /> {f}
              </li>
            ))}
          </ul>
          <Link href={`/billing?plan=${plan}`} className={`${button("primary")} mt-8`}>
            Get Premium
          </Link>
        </section>
      </div>
    </div>
  );
}

function Check() {
  return (
    <svg className="mt-1 shrink-0 text-good" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}
