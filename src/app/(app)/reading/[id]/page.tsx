import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { READING_IDS, testById } from "@/content/tests";
import { TestPage } from "@/components/tests/TestPage";

export function generateStaticParams() {
  return READING_IDS.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps<"/reading/[id]">): Promise<Metadata> {
  const { id } = await params;
  const t = testById(id);
  return t ? { title: t.title.en, description: t.description.en } : {};
}

export default function Page({ params }: PageProps<"/reading/[id]">) {
  return (
    <Suspense>
      <Inner params={params} />
    </Suspense>
  );
}

async function Inner({ params }: { params: PageProps<"/reading/[id]">["params"] }) {
  const { id } = await params;
  if (!READING_IDS.includes(id)) notFound();
  return <TestPage id={id} />;
}
