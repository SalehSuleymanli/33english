import type { Metadata } from "next";
import { TodayView } from "@/components/app/views/TodayView";

export const metadata: Metadata = { title: "Today" };
export default function Page() {
  return <TodayView />;
}
