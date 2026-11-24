"use client";
import type { Test } from "@/content/tests/types";
import { testById } from "@/content/tests";
import { TestRunner } from "./TestRunner";
import { useLang } from "@/lib/i18n/useLang";

const BACK = {
  exam: { href: "/exams", en: "Exams & Tests", az: "İmtahanlar və testlər", ru: "Экзамены и тесты" },
  reading: { href: "/reading", en: "Reading", az: "Oxu", ru: "Чтение" },
  "ielts-reading": { href: "/ielts/reading", en: "Pre-IELTS Reading", az: "Pre-IELTS Oxu", ru: "Pre-IELTS Чтение" },
};

/** Client wrapper so pages can pass a test id (the content is shared and public). */
export function TestPage({ id }: { id: string }) {
  const lang = useLang();
  const test = testById(id) as Test;
  const b = BACK[test.kind];
  return <TestRunner test={test} back={{ href: b.href, label: b[lang] }} />;
}
