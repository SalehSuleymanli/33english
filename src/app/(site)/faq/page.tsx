import type { Metadata } from "next";
import { PageIntro } from "@/components/site/PageIntro";
import { FREE_DAYS } from "@/content/curriculum";

export const metadata: Metadata = { title: "FAQ" };

const FAQ: [string, string][] = [
  ["Will I be fluent after 33 days?", "No — and be careful with anyone who promises that. After 33 days you will be able to build and change sentences in all six frames, ask and answer questions, connect ideas and handle common conversations. Fluency comes from using English over time; 33English gives you the structure to do that."],
  ["What level do I need?", "33English is for adults from beginner to intermediate. If you can read simple English, you can start. Beginners usually start at Day 1. If you already know the basics, the placement check suggests a later starting day."],
  ["Is the placement check an official level test?", "No. It's a quick estimate to suggest where to start. It is not a CEFR or IELTS assessment."],
  ["Do I need an account?", `No. You can start immediately and your progress is saved on this device. Create a free account to keep your progress safe and use it on other devices.`],
  ["What happens if I miss a day?", "Nothing bad. Your progress never resets, and the course waits for you. Streaks are optional — you can turn them off in settings."],
  ["How does review work?", "Anything you get wrong returns the same day. Things you get right come back after 1, 2, 4, 8 and then 16 days. It's a simple, well-known system (Leitner boxes) — no hidden algorithm."],
  ["Can it check my pronunciation?", "Not precisely, and we won't pretend otherwise. In browsers that support speech recognition, you can speak a sentence and see which words were recognized. That helps you practice, but it is not a pronunciation score."],
  ["What's free?", `Days 1–${FREE_DAYS}, the Sentence Lab with all six frames, placement, review, your word collection and progress tracking. Premium unlocks the rest of the course.`],
  ["Can I cancel Premium?", "Yes, anytime. You keep access until the end of the period you paid for."],
  ["Is it British or American English?", "Lessons use American spelling, and we point out British differences where they matter. The answer checker accepts both spellings (color / colour)."],
];

export default function FaqPage() {
  return (
    <>
      <PageIntro title="Questions and answers" />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="divide-y divide-line border-y border-line">
          {FAQ.map(([q, a]) => (
            <details key={q} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg py-4 text-lg font-bold">
                {q}
                <span aria-hidden className="text-muted transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pb-5 text-ink-2">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </>
  );
}
