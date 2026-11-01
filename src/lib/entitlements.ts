import "server-only";
import { connection } from "next/server";
import { isFreeDay } from "@/content/curriculum";
import { getServerSupabase } from "@/lib/supabase/server";
import { DEV_UNLOCK_ALL } from "@/lib/server-env";

export type Viewer = {
  userId: string | null;
  email?: string;
  premium: boolean;
  plan?: "monthly" | "annual";
  status?: string;
  periodEnd?: string | null;
  cancelAtPeriodEnd?: boolean;
  devUnlock: boolean;
};

/**
 * Server-side source of truth for access. Premium comes only from the
 * subscriptions table, which only the payment webhook can write.
 */
export async function getViewer(): Promise<Viewer> {
  // Access is always decided per request — never baked into a static page.
  await connection();
  const sb = await getServerSupabase();
  if (!sb) return { userId: null, premium: DEV_UNLOCK_ALL, devUnlock: DEV_UNLOCK_ALL };
  const { data } = await sb.auth.getUser();
  const user = data.user;
  if (!user) return { userId: null, premium: DEV_UNLOCK_ALL, devUnlock: DEV_UNLOCK_ALL };
  const { data: sub, error } = await sb
    .from("subscriptions")
    .select("status, plan, current_period_end, cancel_at_period_end")
    .eq("user_id", user.id)
    .maybeSingle();
  if (error) console.error("[entitlements] subscription lookup failed", error.message);
  const active =
    !!sub &&
    (sub.status === "active" || sub.status === "trialing") &&
    (!sub.current_period_end || new Date(sub.current_period_end).getTime() > Date.now());
  return {
    userId: user.id,
    email: user.email ?? undefined,
    premium: active || DEV_UNLOCK_ALL,
    plan: sub?.plan,
    status: sub?.status,
    periodEnd: sub?.current_period_end ?? null,
    cancelAtPeriodEnd: sub?.cancel_at_period_end ?? false,
    devUnlock: DEV_UNLOCK_ALL,
  };
}

export const canAccessDay = (day: number, v: Viewer) => isFreeDay(day) || v.premium;
