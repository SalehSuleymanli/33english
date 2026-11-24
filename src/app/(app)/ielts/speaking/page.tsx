import type { Metadata } from "next";
import { IeltsSpeakingList } from "@/components/ielts/IeltsViews";

export const metadata: Metadata = { title: "Pre-IELTS Speaking" };
export default function Page() {
  return <IeltsSpeakingList />;
}
