import { describe, expect, it } from "vitest";
import { createHmac } from "node:crypto";
import { mapSubscriptionEvent, verifyPaddleSignature } from "@/lib/payments/paddle";

const secret = "pdl_ntfset_test_secret";
const sign = (body: string, ts: number, key = secret) => `ts=${ts};h1=${createHmac("sha256", key).update(`${ts}:${body}`).digest("hex")}`;

describe("Paddle signature", () => {
  const body = JSON.stringify({ event_id: "evt_1", event_type: "subscription.created" });
  const now = 1_800_000_000_000;
  const ts = now / 1000;
  it("accepts a valid signature", () => expect(verifyPaddleSignature(body, sign(body, ts), secret, now)).toBe(true));
  it("rejects a tampered body", () => expect(verifyPaddleSignature(body + " ", sign(body, ts), secret, now)).toBe(false));
  it("rejects the wrong secret", () => expect(verifyPaddleSignature(body, sign(body, ts, "other"), secret, now)).toBe(false));
  it("rejects old timestamps (replay)", () => expect(verifyPaddleSignature(body, sign(body, ts - 600), secret, now)).toBe(false));
  it("rejects missing or malformed headers", () => {
    expect(verifyPaddleSignature(body, null, secret, now)).toBe(false);
    expect(verifyPaddleSignature(body, "garbage", secret, now)).toBe(false);
    expect(verifyPaddleSignature(body, sign(body, ts), "", now)).toBe(false);
  });
  it("accepts if any of several h1 values matches (secret rotation)", () => {
    const good = sign(body, ts).split(";")[1];
    expect(verifyPaddleSignature(body, `ts=${ts};h1=deadbeef;${good}`, secret, now)).toBe(true);
  });
});

describe("subscription event mapping", () => {
  const prices = { monthly: "pri_m", annual: "pri_y" };
  const base = {
    event_id: "evt_1",
    event_type: "subscription.updated",
    occurred_at: "2026-10-01T10:00:00Z",
    data: {
      id: "sub_1",
      status: "active",
      customer_id: "ctm_1",
      custom_data: { user_id: "11111111-1111-1111-1111-111111111111" },
      items: [{ price: { id: "pri_y" } }],
      current_billing_period: { ends_at: "2027-10-01T10:00:00Z" },
      scheduled_change: null,
    },
  };
  it("maps an active annual subscription", () => {
    const r = mapSubscriptionEvent(base, prices)!;
    expect(r).toMatchObject({ status: "active", plan: "annual", cancel_at_period_end: false, current_period_end: "2027-10-01T10:00:00Z" });
  });
  it("detects scheduled cancellation", () => {
    expect(mapSubscriptionEvent({ ...base, data: { ...base.data, scheduled_change: { action: "cancel" } } }, prices)!.cancel_at_period_end).toBe(true);
  });
  it("ignores events without a valid user id or unknown status", () => {
    expect(mapSubscriptionEvent({ ...base, data: { ...base.data, custom_data: null } }, prices)).toBeNull();
    expect(mapSubscriptionEvent({ ...base, data: { ...base.data, custom_data: { user_id: "'; drop table" } } }, prices)).toBeNull();
    expect(mapSubscriptionEvent({ ...base, data: { ...base.data, status: "weird" } }, prices)).toBeNull();
    expect(mapSubscriptionEvent({ ...base, event_type: "transaction.completed" }, prices)).toBeNull();
  });
});
