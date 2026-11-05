import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getAdminSupabase } from "@/lib/supabase/server";
import { getViewer } from "@/lib/entitlements";
import { ConquestError, conquestAnswer, conquestJoin, conquestLeave, conquestPick, conquestState } from "@/lib/conquest/server";

const NO_STORE = { "Cache-Control": "private, no-store" };
const fail = (error: string, status: number) => NextResponse.json({ ok: false, error }, { status, headers: NO_STORE });
const MatchId = z.string().uuid();

const Body = z.discriminatedUnion("action", [
  z.object({ action: z.literal("join") }),
  z.object({ action: z.literal("leave"), matchId: MatchId }),
  z.object({ action: z.literal("pick"), matchId: MatchId, step: z.number().int().min(0).max(40), region: z.number().int().min(0).max(40) }),
  z.object({ action: z.literal("answer"), matchId: MatchId, step: z.number().int().min(0).max(40), choice: z.number().int().min(0).max(9) }),
]);

async function guard() {
  const admin = getAdminSupabase();
  if (!admin) return { error: fail("Live games are not configured", 503) };
  const viewer = await getViewer();
  if (!viewer.userId) return { error: fail("Sign in to play live", 401) };
  return { admin, uid: viewer.userId };
}

function handle(e: unknown) {
  if (e instanceof ConquestError) return fail(e.message, e.status);
  console.error("[conquest]", e);
  return fail("Something went wrong", 500);
}

/** GET /api/conquest?match=… — the live state of a match you're in. */
export async function GET(req: NextRequest) {
  const g = await guard();
  if ("error" in g) return g.error;
  const id = MatchId.safeParse(req.nextUrl.searchParams.get("match"));
  if (!id.success) return fail("Invalid match", 400);
  try {
    return NextResponse.json(await conquestState(g.admin, g.uid, id.data), { headers: NO_STORE });
  } catch (e) {
    return handle(e);
  }
}

/** POST /api/conquest — join, leave the lobby, pick a region, or answer. */
export async function POST(req: NextRequest) {
  const body = Body.safeParse(await req.json().catch(() => null));
  if (!body.success) return fail("Invalid request", 400);
  const g = await guard();
  if ("error" in g) return g.error;
  try {
    const b = body.data;
    const json = (d: unknown) => NextResponse.json(d, { headers: NO_STORE });
    if (b.action === "join") return json({ ok: true, matchId: await conquestJoin(g.admin, g.uid) });
    if (b.action === "leave") return json({ ok: true, left: await conquestLeave(g.admin, g.uid, b.matchId) });
    if (b.action === "pick") return json(await conquestPick(g.admin, g.uid, b.matchId, b.step, b.region));
    return json(await conquestAnswer(g.admin, g.uid, b.matchId, b.step, b.choice));
  } catch (e) {
    return handle(e);
  }
}
