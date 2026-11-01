import type { Metadata } from "next";
import { PracticeView } from "@/components/app/views/PracticeView";

export const metadata: Metadata = { title: "Practice" };
export default function Page() {
  return <PracticeView />;
}
