"use client";
import type { ReactNode } from "react";
import { LearnerProvider } from "@/lib/learner/store";
import { RewardsProvider } from "@/lib/rewards/client";
import { Toaster } from "@/components/ui/Toaster";
import { Celebrations } from "@/components/rewards/Celebrations";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LearnerProvider>
      <RewardsProvider>
        {children}
        <Toaster />
        <Celebrations />
      </RewardsProvider>
    </LearnerProvider>
  );
}
