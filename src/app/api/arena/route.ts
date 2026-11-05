import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getAdminSupabase } from "@/lib/supabase/server";
import { getViewer } from "@/lib/entitlements";
import { ArenaError, arenaAnswer, arenaJoin, arenaLeave, arenaState } from "@/lib/arena/server";

const NO_STORE = { "Cache-Control": "private, no-store" };
const fail = (error: string, status: number) => NextResponse.json({ ok: false, error }, { status, headers: NO_STORE });
const MatchId = z.string().uuid();

const Body = z.discriminatedUnion("action", [
  z.object({ action: z.literal("join") }),
  z.object({ action: z.literal("leave"), matchId: MatchId }),
  z.object({ action: z.literal("answer"), matchId: MatchId, q: z.number().int().min(0).max(19), choice: z.number().int().min(0).max(9) }),
]);

async function guard() {
  const admin = getAdminSupabase();
  if (!admin) return { error: fail("Live games are not configured", 503) };
  const viewer = await getViewer();
  if (!viewer.userId) return { error: fail("Sign in to play live", 401) };
  return { admin, uid: viewer.userId };
}

function handle(e: unknown) {
  if (e instanceof ArenaError) return fail(e.message, e.status);
  console.error("[arena]", e);
  return fail("Something went wrong", 500);
}

/** GET /api/arena?match=… — the live state of a match you're in. */
export async function GET(req: NextRequest) {
  const g = await guard();
  if ("error" in g) return g.error;
  const id = MatchId.safeParse(req.nextUrl.searchParams.get("match"));
  if (!id.success) return fail("Invalid match", 400);
  try {
    return NextResponse.json(await arenaState(g.admin, g.uid, id.data), { headers: NO_STORE });
  } catch (e) {
    return handle(e);
  }
}

/** POST /api/arena — join a match, leave the lobby, or answer a question. */
export async function POST(req: NextRequest) {
  const body = Body.safeParse(await req.json().catch(() => null));
  if (!body.success) return fail("Invalid request", 400);
  const g = await guard();
  if ("error" in g) return g.error;
  try {
    const b = body.data;
    if (b.action === "join") return NextResponse.json({ ok: true, matchId: await arenaJoin(g.admin, g.uid) }, { headers: NO_STORE });
    if (b.action === "leave") return NextResponse.json({ ok: true, left: await arenaLeave(g.admin, g.uid, b.matchId) }, { headers: NO_STORE });
    return NextResponse.json(await arenaAnswer(g.admin, g.uid, b.matchId, b.q, b.choice), { headers: NO_STORE });
  } catch (e) {
    return handle(e);
  }
}
