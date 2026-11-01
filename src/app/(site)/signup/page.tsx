import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/site/AuthForm";

export const metadata: Metadata = { title: "Create account" };

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-14 sm:px-6">
      <h1 className="text-[2rem] font-bold tracking-[-0.02em]">Create your account</h1>
      <p className="mt-2 mb-8 text-ink-2">Free. Keeps your progress safe and lets you learn on any device.</p>
      <AuthForm mode="signup" />
      <p className="mt-6 text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-ink underline underline-offset-4">
          Sign in
        </Link>
        . By creating an account you agree to the <Link href="/terms" className="underline">terms</Link> and{" "}
        <Link href="/privacy" className="underline">privacy policy</Link>.
      </p>
    </div>
  );
}
