import type { Metadata } from "next";
import { Suspense } from "react";
import { getViewer } from "@/lib/entitlements";
import { BillingView } from "@/components/app/views/BillingView";

export const metadata: Metadata = { title: "Subscription" };

export default function Page() {
  return (
    <Suspense fallback={<div className="h-64 max-w-2xl animate-pulse rounded-2xl bg-surface-2" aria-busy="true" />}>
      <Billing />
    </Suspense>
  );
}

async function Billing() {
  const v = await getViewer();
  return (
    <BillingView
      viewer={{ signedIn: !!v.userId, userId: v.userId ?? undefined, email: v.email, premium: v.premium, plan: v.plan, status: v.status, periodEnd: v.periodEnd, cancelAtPeriodEnd: v.cancelAtPeriodEnd, devUnlock: v.devUnlock }}
    />
  );
}
