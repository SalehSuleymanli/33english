import type { Metadata } from "next";
import { ConquestGame } from "@/components/game/ConquestGame";

export const metadata: Metadata = { title: "Word Empires", description: "A live 4-player world-conquest game. Win English questions to claim regions, attack rivals and capture their capitals." };

export default function Page() {
  return <ConquestGame />;
}
