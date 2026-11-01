import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SCENARIOS, scenarioById } from "@/content/scenarios";
import { canAccessDay, getViewer } from "@/lib/entitlements";
import { ScenarioPlayer } from "@/components/app/ScenarioPlayer";
import { button } from "@/components/ui/styles";

export function generateStaticParams() {
  return SCENARIOS.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: PageProps<"/scenarios/[id]">): Promise<Metadata> {
  const { id } = await params;
  return { title: scenarioById(id)?.title ?? "Conversation" };
}

export default function Page({ params }: PageProps<"/scenarios/[id]">) {
  return (
    <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-surface-2" aria-busy="true" />}>
      <Gate params={params} />
    </Suspense>
  );
}

async function Gate({ params }: { params: PageProps<"/scenarios/[id]">["params"] }) {
  const { id } = await params;
  const s = scenarioById(id);
  if (!s) notFound();
  const viewer = await getViewer();
  if (!canAccessDay(s.afterDay, viewer))
    return (
      <div className="max-w-xl">
        <Link href="/scenarios" className="text-sm font-bold text-muted">
          ← Conversations
        </Link>
        <h1 className="mt-6 text-[2rem] font-bold">{s.title}</h1>
        <p className="mt-2 text-ink-2">{s.summary}</p>
        <p className="mt-6 rounded-2xl border border-line bg-surface p-5">This conversation is part of Premium.</p>
        <Link href={viewer.userId ? "/billing" : "/signup"} className={`${button("primary")} mt-4`}>
          {viewer.userId ? "See Premium plans" : "Create an account to upgrade"}
        </Link>
      </div>
    );
  return <ScenarioPlayer scenario={s} />;
}
