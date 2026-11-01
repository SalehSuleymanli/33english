"use client";
import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_PUBLIC_KEY, SUPABASE_URL, isSupabaseConfigured } from "@/lib/env";

let client: SupabaseClient | null = null;

/** Browser client (uses the public key; all access is limited by row-level security). */
export function getBrowserSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  client ??= createBrowserClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
  return client;
}
