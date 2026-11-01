import type { Metadata } from "next";
import { WordsView } from "@/components/app/views/WordsView";

export const metadata: Metadata = { title: "Your words" };
export default function Page() {
  return <WordsView />;
}
