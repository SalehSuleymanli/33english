import "server-only";

/** Server-only secrets. Never import this file from a client component. */
export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY ?? "";
export const PAYMENT_WEBHOOK_SECRET = process.env.PADDLE_WEBHOOK_SECRET ?? "";
export const PADDLE_API_KEY = process.env.PADDLE_API_KEY ?? "";
export const PADDLE_ENV = (process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT ?? "sandbox") as "sandbox" | "production";
export const PADDLE_PRICE_MONTHLY = process.env.NEXT_PUBLIC_PADDLE_PRICE_MONTHLY ?? "";
export const PADDLE_PRICE_ANNUAL = process.env.NEXT_PUBLIC_PADDLE_PRICE_ANNUAL ?? "";

/**
 * Development only: unlock premium lessons without a subscription so the full
 * course can be tested locally. Ignored in production builds.
 */
export const DEV_UNLOCK_ALL = process.env.NODE_ENV !== "production" && process.env.DEV_UNLOCK_ALL === "true";
