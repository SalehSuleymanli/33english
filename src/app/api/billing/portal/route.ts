import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase/server";
import { PADDLE_API_KEY, PADDLE_ENV } from "@/lib/server-env";
import { paddleApiBase } from "@/lib/payments/paddle";

/** Creates a Paddle customer-portal session so a subscriber can update payment details or cancel. */
export async function POST() {
  const sb = await getServerSupabase();
  if (!sb || !PADDLE_API_KEY) return NextResponse.json({ error: "Billing isn't configured yet." }, { status: 503 });
  const { data } = await sb.auth.getUser();
  if (!data.user) return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  const { data: sub } = await sb.from("subscriptions").select("provider_customer_id, provider_subscription_id").eq("user_id", data.user.id).maybeSingle();
  if (!sub?.provider_customer_id) return NextResponse.json({ error: "No subscription found." }, { status: 404 });
  const res = await fetch(`${paddleApiBase(PADDLE_ENV)}/customers/${encodeURIComponent(sub.provider_customer_id)}/portal-sessions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${PADDLE_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ subscription_ids: sub.provider_subscription_id ? [sub.provider_subscription_id] : [] }),
  });
  if (!res.ok) {
    console.error("[billing] portal session failed", res.status, await res.text());
    return NextResponse.json({ error: "Couldn't open the billing portal. Try again in a minute." }, { status: 502 });
  }
  const json = await res.json();
  const url = json?.data?.urls?.general?.overview;
  if (!url) return NextResponse.json({ error: "Unexpected response from billing provider." }, { status: 502 });
  return NextResponse.json({ url });
}
