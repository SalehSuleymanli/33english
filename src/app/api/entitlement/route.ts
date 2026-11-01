import { NextResponse } from "next/server";
import { getViewer } from "@/lib/entitlements";

/** For display only (e.g. lock icons). Content access is enforced server-side on each request. */
export async function GET() {
  const v = await getViewer();
  return NextResponse.json(
    { signedIn: !!v.userId, premium: v.premium, plan: v.plan ?? null, status: v.status ?? null, periodEnd: v.periodEnd ?? null, cancelAtPeriodEnd: v.cancelAtPeriodEnd ?? false, devUnlock: v.devUnlock },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
