import type { Metadata } from "next";
import { IeltsReadingList } from "@/components/ielts/IeltsViews";

export const metadata: Metadata = { title: "Pre-IELTS Reading" };
export default function Page() {
  return <IeltsReadingList />;
}
