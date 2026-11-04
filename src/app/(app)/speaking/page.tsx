import type { Metadata } from "next";
import { SpeakingLibrary } from "@/components/speaking/SpeakingLibrary";

export const metadata: Metadata = { title: "Speaking", description: "Everyday English speaking topics with natural and grammar-rich sample answers." };
export default function Page() {
  return <SpeakingLibrary />;
}
