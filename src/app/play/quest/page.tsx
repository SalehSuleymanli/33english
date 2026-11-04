import type { Metadata } from "next";
import { QuestGame } from "@/components/game/QuestGame";

export const metadata: Metadata = { title: "Word Quest", description: "An English adventure: answer grammar and vocabulary challenges to help your animal hero defeat the Muddles." };

export default function Page() {
  return <QuestGame />;
}
