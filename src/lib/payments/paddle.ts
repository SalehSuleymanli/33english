/**
 * Paddle Billing helpers — pure functions so they can be unit-tested.
 * Docs: https://developer.paddle.com/webhooks/signature-verification
 */
import { createHmac, timingSafeEqual } from "node:crypto";

export const SIGNATURE_TOLERANCE_SECONDS = 60;

/** Verifies a `Paddle-Signature: ts=…;h1=…` header against the raw request body. */
export function verifyPaddleSignature(rawBody: string, header: string | null, secret: string, nowMs = Date.now()): boolean {
  if (!header || !secret) return false;
  let ts = "";
  const h1s: string[] = [];
  for (const part of header.split(";")) {
    const [k, v] = part.split("=");
    if (k === "ts") ts = v;
    if (k === "h1" && v) h1s.push(v);
  }
  if (!ts || !h1s.length || !/^\d+$/.test(ts)) return false;
  if (Math.abs(nowMs / 1000 - Number(ts)) > SIGNATURE_TOLERANCE_SECONDS) return false;
  const expected = createHmac("sha256", secret).update(`${ts}:${rawBody}`, "utf8").digest("hex");
  const exp = Buffer.from(expected, "hex");
  return h1s.some((h) => {
    const got = Buffer.from(h, "hex");
    return got.length === exp.length && timingSafeEqual(got, exp);
  });
}

export type SubscriptionRow = {
  user_id: string;
  provider: "paddle";
  provider_customer_id: string | null;
  provider_subscription_id: string;
  status: "active" | "trialing" | "past_due" | "paused" | "canceled";
  plan: "monthly" | "annual";
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  updated_at: string;
};

type PaddleSubscriptionEvent = {
  event_id: string;
  event_type: string;
  occurred_at: string;
  data: {
    id: string;
    status: string;
    customer_id?: string;
    custom_data?: { user_id?: string } | null;
    items?: { price?: { id?: string; billing_cycle?: { interval?: string } } }[];
    current_billing_period?: { ends_at?: string } | null;
    scheduled_change?: { action?: string } | null;
  };
};

const STATUSES = ["active", "trialing", "past_due", "paused", "canceled"] as const;

/** Maps a subscription.* webhook event to our row. Returns null for events we don't handle. */
export function mapSubscriptionEvent(e: PaddleSubscriptionEvent, prices: { monthly: string; annual: string }): SubscriptionRow | null {
  if (!e.event_type.startsWith("subscription.")) return null;
  const d = e.data;
  const userId = d.custom_data?.user_id;
  if (!userId || !/^[0-9a-f-]{36}$/i.test(userId)) return null;
  const status = (STATUSES as readonly string[]).includes(d.status) ? (d.status as SubscriptionRow["status"]) : null;
  if (!status) return null;
  const priceId = d.items?.[0]?.price?.id ?? "";
  const interval = d.items?.[0]?.price?.billing_cycle?.interval;
  const plan: SubscriptionRow["plan"] = priceId === prices.annual || interval === "year" ? "annual" : "monthly";
  return {
    user_id: userId,
    provider: "paddle",
    provider_customer_id: d.customer_id ?? null,
    provider_subscription_id: d.id,
    status,
    plan,
    current_period_end: d.current_billing_period?.ends_at ?? null,
    cancel_at_period_end: d.scheduled_change?.action === "cancel",
    updated_at: e.occurred_at,
  };
}

export const paddleApiBase = (env: "sandbox" | "production") => (env === "production" ? "https://api.paddle.com" : "https://sandbox-api.paddle.com");
