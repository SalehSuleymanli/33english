import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CURRICULUM, TOTAL_DAYS, summaryByDay } from "@/content/curriculum";
import { getLesson } from "@/content/lessons";
import { canAccessDay, getViewer } from "@/lib/entitlements";
import { LessonPlayer } from "@/components/learn/LessonPlayer";
import { Paywall } from "@/components/learn/Paywall";
import { LogoMark } from "@/components/ui/Logo";

export function generateStaticParams() {
  return CURRICULUM.map((c) => ({ day: String(c.day) }));
}

export async function generateMetadata({ params }: PageProps<"/learn/[day]">): Promise<Metadata> {
  const { day } = await params;
  const s = summaryByDay(Number(day));
  return { title: s ? `Day ${s.day}: ${s.title}` : "Lesson" };
}

export default function LessonPage({ params }: PageProps<"/learn/[day]">) {
  return (
    <div className="min-h-dvh">
      <Suspense fallback={<LessonSkeleton />}>
        <Gate params={params} />
      </Suspense>
    </div>
  );
}

async function Gate({ params }: { params: PageProps<"/learn/[day]">["params"] }) {
  const { day: raw } = await params;
  const day = Number(raw);
  if (!Number.isInteger(day) || day < 1 || day > TOTAL_DAYS) notFound();
  const viewer = await getViewer();
  const summary = summaryByDay(day)!;
  if (!canAccessDay(day, viewer)) return <Paywall summary={summary} signedIn={!!viewer.userId} />;
  const lesson = getLesson(day);
  if (!lesson) {
    // Day exists in the curriculum but content isn't published in this build.
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Day {day} isn&apos;t available in this version</h1>
        <p className="mt-2 text-ink-2">The lesson content hasn&apos;t been published yet.</p>
        <Link href="/course" className="mt-6 inline-block font-bold underline">
          Back to the course
        </Link>
      </div>
    );
  }
  return <LessonPlayer lesson={lesson} />;
}

function LessonSkeleton() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-6" aria-busy="true">
      <div className="flex items-center gap-3">
        <LogoMark size={24} />
        <div className="h-2 flex-1 rounded-full bg-surface-2" />
      </div>
      <div className="mt-12 h-3 w-16 animate-pulse rounded bg-surface-2" />
      <div className="mt-3 h-9 w-2/3 animate-pulse rounded bg-surface-2" />
      <span className="sr-only">Loading lesson…</span>
      <div className="mt-8 flex flex-col gap-3">
        <div className="h-4 w-11/12 animate-pulse rounded bg-surface-2" />
        <div className="h-4 w-9/12 animate-pulse rounded bg-surface-2" />
        <div className="h-4 w-10/12 animate-pulse rounded bg-surface-2" />
      </div>
    </div>
  );
}
