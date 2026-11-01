import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getExercise, getLesson } from "@/content/lessons";
import { canAccessDay, getViewer } from "@/lib/entitlements";

const Body = z.union([
  z.object({ ids: z.array(z.string().max(64)).max(60) }),
  z.object({ day: z.number().int().min(1).max(33) }),
]);

/** Returns exercise content for review sessions — only from days the viewer can access. */
export async function POST(req: NextRequest) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  const viewer = await getViewer();
  const ids = "ids" in parsed.data ? parsed.data.ids : (() => {
    const l = getLesson(parsed.data.day);
    return l ? [...l.practice, ...l.review].map((e) => e.id) : [];
  })();
  const out = ids
    .map((id) => getExercise(id))
    .filter((x): x is NonNullable<typeof x> => !!x && canAccessDay(x.day, viewer))
    .map((x) => ({ ...x.exercise, day: x.day }));
  return NextResponse.json({ exercises: out }, { headers: { "Cache-Control": "private, no-store" } });
}
