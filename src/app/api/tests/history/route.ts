import { NextResponse } from "next/server";
import { getAdminSupabase } from "@/lib/supabase/server";
import { getViewer } from "@/lib/entitlements";

const NO_STORE = { "Cache-Control": "private, no-store" };

export type TestAttempt = { test_id: string; kind: string; score: number; total: number; percent: number; seconds: number | null; created_at: string };

/** GET /api/tests/history — the signed-in learner's exam and reading results, newest first. */
export async function GET() {
  const admin = getAdminSupabase();
  const viewer = await getViewer();
  if (!admin || !viewer.userId) return NextResponse.json({ ok: true, attempts: [], signedIn: !!viewer.userId }, { headers: NO_STORE });
  const { data, error } = await admin
    .from("test_attempts")
    .select("test_id, kind, score, total, percent, seconds, created_at")
    .eq("user_id", viewer.userId)
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) {
    // the table may not exist until the tests migration has been run
    if (!/does not exist|schema cache/i.test(error.message)) console.error("[tests] history failed", error.message);
    return NextResponse.json({ ok: true, attempts: [], signedIn: true }, { headers: NO_STORE });
  }
  return NextResponse.json({ ok: true, attempts: (data ?? []) as TestAttempt[], signedIn: true }, { headers: NO_STORE });
}
