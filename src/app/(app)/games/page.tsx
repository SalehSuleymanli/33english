import type { Metadata } from "next";
import { GamesView } from "@/components/app/views/GamesView";

export const metadata: Metadata = { title: "Games" };
export default function Page() {
  return <GamesView />;
}
