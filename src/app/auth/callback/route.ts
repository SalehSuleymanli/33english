import { NextResponse, type NextRequest } from "next/server";
import { getServerSupabase } from "@/lib/supabase/server";

/** Completes email-link and confirmation sign-ins (PKCE code exchange). */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const nextParam = url.searchParams.get("next") ?? "/today";
  // only allow same-site relative redirects
  const next = nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : "/today";
  const sb = await getServerSupabase();
  if (code && sb) {
    const { error } = await sb.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(next, url.origin));
    console.error("[auth] code exchange failed", error.message);
  }
  return NextResponse.redirect(new URL("/login?error=link", url.origin));
}
