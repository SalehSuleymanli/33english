import type { Metadata } from "next";
import { NewPasswordForm } from "@/components/site/PasswordForms";

export const metadata: Metadata = { title: "Choose a new password", robots: { index: false } };

export default function ResetPasswordPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-14 sm:px-6">
      <h1 className="text-[2rem] font-bold tracking-[-0.02em]">Choose a new password</h1>
      <p className="mt-2 mb-8 text-ink-2">Make it at least 8 characters. You&apos;ll stay signed in after saving.</p>
      <NewPasswordForm />
    </div>
  );
}
