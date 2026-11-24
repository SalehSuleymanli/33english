import type { Metadata } from "next";
import { ExamsView } from "@/components/tests/ExamsView";

export const metadata: Metadata = { title: "Exams & Tests" };
export default function Page() {
  return <ExamsView />;
}
