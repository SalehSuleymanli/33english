import type { Metadata } from "next";
import { IeltsHub } from "@/components/ielts/IeltsViews";

export const metadata: Metadata = { title: "Pre-IELTS" };
export default function Page() {
  return <IeltsHub />;
}
