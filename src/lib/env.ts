/**
 * Environment access. Public values (NEXT_PUBLIC_*) are safe in the browser.
 * Secrets are read only in server code (see src/lib/server-env.ts).
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
/** Supabase calls this the "publishable" (formerly "anon") key. Either name works. */
export const SUPABASE_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured = () => Boolean(SUPABASE_URL && SUPABASE_PUBLIC_KEY);

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** Paddle client-side token and price ids are designed to be public. */
export const PADDLE_CLIENT_TOKEN = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN ?? "";
export const PADDLE_ENVIRONMENT = (process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT ?? "sandbox") as "sandbox" | "production";
export const PADDLE_PRICES = {
  monthly: process.env.NEXT_PUBLIC_PADDLE_PRICE_MONTHLY ?? "",
  annual: process.env.NEXT_PUBLIC_PADDLE_PRICE_ANNUAL ?? "",
};
export const isPaymentsConfigured = () => Boolean(PADDLE_CLIENT_TOKEN && PADDLE_PRICES.monthly && PADDLE_PRICES.annual && isSupabaseConfigured());
