import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { EXAMS_IDS, testById } from "@/content/tests";
import { TestPage } from "@/components/tests/TestPage";

export function generateStaticParams() {
  return EXAMS_IDS.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps<"/exams/[id]">): Promise<Metadata> {
  const { id } = await params;
  const t = testById(id);
  return t ? { title: t.title.en, description: t.description.en } : {};
}

export default function Page({ params }: PageProps<"/exams/[id]">) {
  return (
    <Suspense>
      <Inner params={params} />
    </Suspense>
  );
}

async function Inner({ params }: { params: PageProps<"/exams/[id]">["params"] }) {
  const { id } = await params;
  if (!EXAMS_IDS.includes(id)) notFound();
  return <TestPage id={id} />;
}
