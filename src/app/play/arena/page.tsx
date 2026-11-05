import type { Metadata } from "next";
import { ArenaGame } from "@/components/game/ArenaGame";

export const metadata: Metadata = { title: "English Arena", description: "A live English trivia match for 5 players. Answer grammar and vocabulary questions fast to win." };

export default function Page() {
  return <ArenaGame />;
}
