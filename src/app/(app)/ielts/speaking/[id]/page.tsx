import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { IELTS_SPEAKING_IDS, ieltsSpeakingById } from "@/content/ielts";
import { IeltsSpeakingTopicView } from "@/components/ielts/IeltsViews";

export function generateStaticParams() {
  return IELTS_SPEAKING_IDS.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps<"/ielts/speaking/[id]">): Promise<Metadata> {
  const { id } = await params;
  const t = ieltsSpeakingById(id);
  return t ? { title: `IELTS Speaking: ${t.title.en}` } : {};
}

export default function Page({ params }: PageProps<"/ielts/speaking/[id]">) {
  return (
    <Suspense>
      <Inner params={params} />
    </Suspense>
  );
}

async function Inner({ params }: { params: PageProps<"/ielts/speaking/[id]">["params"] }) {
  const { id } = await params;
  if (!IELTS_SPEAKING_IDS.includes(id)) notFound();
  return <IeltsSpeakingTopicView id={id} />;
}
