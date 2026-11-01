import { NextResponse, type NextRequest } from "next/server";
import { getAdminSupabase } from "@/lib/supabase/server";
import { PADDLE_PRICE_ANNUAL, PADDLE_PRICE_MONTHLY, PAYMENT_WEBHOOK_SECRET } from "@/lib/server-env";
import { mapSubscriptionEvent, verifyPaddleSignature } from "@/lib/payments/paddle";

/**
 * Paddle webhook — the only code path that grants or removes Premium.
 * 1. Verify the signature on the raw body.  2. Record the event once (idempotent).
 * 3. Apply subscription changes only if newer than what we have.
 */
export async function POST(req: NextRequest) {
  const raw = await req.text();
  if (!verifyPaddleSignature(raw, req.headers.get("paddle-signature"), PAYMENT_WEBHOOK_SECRET)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }
  const admin = getAdminSupabase();
  if (!admin) {
    console.error("[paddle] SUPABASE_SERVICE_ROLE_KEY missing — cannot store webhook");
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }
  let event: Parameters<typeof mapSubscriptionEvent>[0];
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Bad JSON" }, { status: 400 });
  }

  const { error: dupErr } = await admin.from("payment_events").insert({ id: event.event_id, provider: "paddle", type: event.event_type, payload: event });
  if (dupErr) {
    if (dupErr.code === "23505") return NextResponse.json({ ok: true, duplicate: true }); // already processed
    console.error("[paddle] event insert failed", dupErr.message);
    return NextResponse.json({ error: "Storage error" }, { status: 500 });
  }

  const row = mapSubscriptionEvent(event, { monthly: PADDLE_PRICE_MONTHLY, annual: PADDLE_PRICE_ANNUAL });
  if (!row) return NextResponse.json({ ok: true, ignored: true });

  const { data: existing } = await admin.from("subscriptions").select("updated_at").eq("user_id", row.user_id).maybeSingle();
  if (existing && new Date(existing.updated_at).getTime() > new Date(row.updated_at).getTime()) {
    return NextResponse.json({ ok: true, stale: true }); // out-of-order delivery
  }
  const { error } = await admin.from("subscriptions").upsert(row, { onConflict: "user_id" });
  if (error) {
    console.error("[paddle] subscription upsert failed", error.message);
    return NextResponse.json({ error: "Storage error" }, { status: 500 }); // Paddle will retry
  }
  return NextResponse.json({ ok: true });
}
