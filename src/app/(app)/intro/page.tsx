import type { Metadata } from "next";
import { IntroView } from "@/components/app/views/IntroView";

export const metadata: Metadata = { title: "Introductory consultation" };
export default function Page() {
  return <IntroView />;
}
