import type { Metadata } from "next";
import Link from "next/link";
import { PasswordResetForm } from "@/components/site/PasswordForms";

export const metadata: Metadata = { title: "Reset your password" };

export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-14 sm:px-6">
      <h1 className="text-[2rem] font-bold tracking-[-0.02em]">Forgot your password?</h1>
      <p className="mt-2 mb-8 text-ink-2">Enter your email and we&apos;ll send you a link to choose a new one.</p>
      <PasswordResetForm />
      <p className="mt-6 text-sm text-muted">
        Remembered it?{" "}
        <Link href="/login" className="font-bold text-ink underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </div>
  );
}
