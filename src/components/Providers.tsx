"use client";
import type { ReactNode } from "react";
import { LearnerProvider } from "@/lib/learner/store";
import { Toaster } from "@/components/ui/Toaster";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LearnerProvider>
      {children}
      <Toaster />
    </LearnerProvider>
  );
}
