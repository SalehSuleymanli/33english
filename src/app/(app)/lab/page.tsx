import type { Metadata } from "next";
import { Suspense } from "react";
import { LabView } from "@/components/app/views/LabView";

export const metadata: Metadata = { title: "Sentence Lab", description: "Build an English sentence and transform it: tense, negative, question, modal, passive." };
export default function Page() {
  return (
    <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-surface-2" />}>
      <LabView />
    </Suspense>
  );
}
