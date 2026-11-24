import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DRILL_IDS, type DrillId } from "@/lib/game/drills";
import { DRILL_TEXT } from "@/content/l10n/drills";
import { DrillGame } from "@/components/game/DrillGame";

export function generateStaticParams() {
  return DRILL_IDS.map((game) => ({ game }));
}

const isDrill = (g: string): g is DrillId => (DRILL_IDS as readonly string[]).includes(g);

export async function generateMetadata({ params }: PageProps<"/play/drill/[game]">): Promise<Metadata> {
  const { game } = await params;
  return isDrill(game) ? { title: DRILL_TEXT[game].name.en, description: DRILL_TEXT[game].short.en } : {};
}

export default function Page({ params }: PageProps<"/play/drill/[game]">) {
  return (
    <Suspense>
      <Game params={params} />
    </Suspense>
  );
}

async function Game({ params }: { params: PageProps<"/play/drill/[game]">["params"] }) {
  const { game } = await params;
  if (!isDrill(game)) notFound();
  return <DrillGame game={game} />;
}
