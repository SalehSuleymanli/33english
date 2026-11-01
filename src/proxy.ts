import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { SUPABASE_PUBLIC_KEY, SUPABASE_URL, isSupabaseConfigured } from "@/lib/env";
import { SCENARIO_IDS, TOTAL_LESSON_DAYS } from "@/content/ids";

/** Unknown lesson / scenario ids get a real 404 status (not a streamed "soft" 404). */
function isUnknownContent(pathname: string): boolean {
  const lesson = pathname.match(/^\/learn\/([^/]+)\/?$/);
  if (lesson) {
    const n = Number(lesson[1]);
    return !(/^\d+$/.test(lesson[1]) && n >= 1 && n <= TOTAL_LESSON_DAYS);
  }
  const sc = pathname.match(/^\/scenarios\/([^/]+)\/?$/);
  if (sc) return !(SCENARIO_IDS as readonly string[]).includes(sc[1]);
  return false;
}

/**
 * Refreshes the Supabase session cookie on each request so server components
 * see a valid session. Authorization itself happens in server code (RLS +
 * entitlement checks), never here.
 */
export async function proxy(request: NextRequest) {
  if (isUnknownContent(request.nextUrl.pathname)) {
    return NextResponse.rewrite(new URL("/__not-found", request.url), { status: 404 });
  }
  let response = NextResponse.next({ request });
  if (!isSupabaseConfigured()) return response;

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => {
        list.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        list.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });
  await supabase.auth.getUser();
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:png|jpg|svg|webp|woff2)$).*)"],
};
