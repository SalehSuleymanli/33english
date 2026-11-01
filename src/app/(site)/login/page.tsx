import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/site/AuthForm";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-14 sm:px-6">
      <h1 className="text-[2rem] font-bold tracking-[-0.02em]">Sign in</h1>
      <p className="mt-2 mb-8 text-ink-2">Pick up where you left off, on any device.</p>
      <AuthForm mode="login" />
      <p className="mt-6 text-sm text-muted">
        New here?{" "}
        <Link href="/signup" className="font-bold text-ink underline underline-offset-4">
          Create an account
        </Link>
      </p>
    </div>
  );
}
