import { NextResponse, type NextRequest } from "next/server";
import { getAdminSupabase } from "@/lib/supabase/server";
import { getViewer } from "@/lib/entitlements";
import { validLocalDate } from "@/lib/game/rewards";
import { ClaimBody, ClaimError, loadSnapshot, processClaim } from "@/lib/rewards/server";

const NO_STORE = { "Cache-Control": "private, no-store" };

function fail(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status, headers: NO_STORE });
}

/** GET /api/rewards?date=YYYY-MM-DD — the signed-in learner's XP, streak, challenges and badges. */
export async function GET(req: NextRequest) {
  const admin = getAdminSupabase();
  if (!admin) return fail("Rewards are not configured", 503);
  const viewer = await getViewer();
  if (!viewer.userId) return fail("Sign in to earn XP", 401);
  const date = validLocalDate(req.nextUrl.searchParams.get("date")) ?? new Date().toISOString().slice(0, 10);
  try {
    const snapshot = await loadSnapshot(admin, viewer.userId, date);
    return NextResponse.json({ ok: true, snapshot }, { headers: NO_STORE });
  } catch (e) {
    console.error("[rewards] snapshot failed", e);
    return fail("Couldn't load your rewards", 500);
  }
}

/** POST /api/rewards — claim XP for a lesson, crossword, battle, speaking topic or saved word. */
export async function POST(req: NextRequest) {
  const admin = getAdminSupabase();
  if (!admin) return fail("Rewards are not configured", 503);
  const parsed = ClaimBody.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return fail("Invalid request", 400);
  const date = validLocalDate(parsed.data.localDate);
  if (!date) return fail("Your device date looks wrong", 400);
  const viewer = await getViewer();
  if (!viewer.userId) return fail("Sign in to earn XP", 401);
  try {
    const result = await processClaim(admin, viewer.userId, viewer.premium, parsed.data, date);
    return NextResponse.json(result, { headers: NO_STORE });
  } catch (e) {
    if (e instanceof ClaimError) return fail(e.message, e.status);
    console.error("[rewards] claim failed", e);
    return fail("Something went wrong saving your reward", 500);
  }
}
