import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SPEAKING, speakingById } from "@/content/speaking";
import { SpeakingTopicView } from "@/components/speaking/SpeakingTopicView";

export function generateStaticParams() {
  return SPEAKING.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: PageProps<"/speaking/[id]">): Promise<Metadata> {
  const { id } = await params;
  const t = speakingById(id);
  return t ? { title: t.title, description: t.description } : {};
}

export default async function Page({ params }: PageProps<"/speaking/[id]">) {
  const { id } = await params;
  const topic = speakingById(id);
  if (!topic) notFound();
  return <SpeakingTopicView topic={topic} />;
}
