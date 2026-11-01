import type { Metadata } from "next";
import { ProgressView } from "@/components/app/views/ProgressView";

export const metadata: Metadata = { title: "Progress" };
export default function Page() {
  return <ProgressView />;
}
