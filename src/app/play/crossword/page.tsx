import type { Metadata } from "next";
import { CrosswordGame } from "@/components/game/CrosswordGame";

export const metadata: Metadata = { title: "Crossword", description: "English vocabulary crosswords with definitions, synonyms and example sentences." };

export default function Page() {
  return <CrosswordGame />;
}
