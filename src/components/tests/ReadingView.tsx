"use client";
import Link from "next/link";
import { LEVELS, READINGS } from "@/content/tests";
import { TEST_UI } from "@/content/l10n/tests";
import { bestFor, useTestHistory } from "@/lib/tests/history";
import { useLang } from "@/lib/i18n/useLang";
import { pick } from "@/lib/i18n";
import { card } from "@/components/ui/styles";

const TXT = {
  title: { en: "Reading", az: "Oxu", ru: "Чтение" },
  lead: {
    en: "Original texts from beginner to advanced. Each has vocabulary, a full translation, the grammar used and comprehension questions with explanations.",
    az: "Başlanğıcdan irəli səviyyəyə qədər orijinal mətnlər. Hər birində lüğət, tam tərcümə, istifadə olunan qrammatika və izahlı anlama sualları var.",
    ru: "Оригинальные тексты от начального до продвинутого уровня. В каждом — словарь, полный перевод, использованная грамматика и вопросы на понимание с объяснениями.",
  },
};

export function ReadingView() {
  const lang = useLang();
  const { attempts } = useTestHistory();
  return (
    <div className="flex flex-col gap-8" lang={lang}>
      <div>
        <h1 className="text-[2rem] font-bold leading-tight tracking-[-0.02em]">{TXT.title[lang]}</h1>
        <p className="mt-1 text-ink-2">{TXT.lead[lang]}</p>
      </div>
      {LEVELS.map((l) => (
        <section key={l.id}>
          <h2 className="text-lg font-bold">{l[lang]}</h2>
          <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {READINGS.filter((r) => r.level === l.id).map((r) => {
              const b = bestFor(attempts, r.id);
              return (
                <li key={r.id}>
                  <Link href={`/reading/${r.id}`} className={`${card} flex h-full flex-col p-4 hover:border-line-strong`}>
                    <span className="text-xs font-bold uppercase tracking-wide text-muted">{pick(r.reading!.topic, lang)}</span>
                    <span className="mt-0.5 font-bold" lang="en">
                      {r.title.en}
                    </span>
                    {lang !== "en" && <span className="text-sm text-ink-2">{pick(r.title, lang)}</span>}
                    <span className="mt-1 text-sm text-ink-2">{lang === "en" ? r.description.en : pick(r.description, lang)}</span>
                    <span className="mt-2 text-xs font-bold text-muted">
                      ~{r.minutes} {TEST_UI.minutes[lang]}
                      {b ? ` · ${TEST_UI.best[lang]} ${b.best}%` : ""}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
