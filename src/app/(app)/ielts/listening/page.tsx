import type { Metadata } from "next";
import { IeltsListening } from "@/components/ielts/IeltsViews";

export const metadata: Metadata = { title: "Pre-IELTS Listening" };
export default function Page() {
  return <IeltsListening />;
}
