import type { Metadata } from "next";
import { ReadingView } from "@/components/tests/ReadingView";

export const metadata: Metadata = { title: "Reading" };
export default function Page() {
  return <ReadingView />;
}
