import type { Metadata } from "next";
import { OnboardingView } from "@/components/app/views/OnboardingView";

export const metadata: Metadata = { title: "Find your starting point" };
export default function Page() {
  return <OnboardingView />;
}
