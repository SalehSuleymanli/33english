"use client";
import Link from "next/link";
import { EXAMS, READINGS, testById } from "@/content/tests";
import { TEST_UI } from "@/content/l10n/tests";
import { bestFor, useTestHistory } from "@/lib/tests/history";
import { useLang } from "@/lib/i18n/useLang";
import { pick } from "@/lib/i18n";
import { useLearner } from "@/lib/learner/store";
import { card } from "@/components/ui/styles";

const TXT = {
  title: { en: "Exams & Tests", az: "İmtahanlar və testlər", ru: "Экзамены и тесты" },
  lead: {
    en: "Check what you really understand. Questions use new sentences, every answer is explained, and your results are saved.",
    az: "Həqiqətən nəyi başa düşdüyünüzü yoxlayın. Suallarda yeni cümlələr var, hər cavab izah olunur və nəticələriniz saxlanılır.",
    ru: "Проверьте, что вы действительно понимаете. В вопросах новые предложения, каждый ответ объясняется, результаты сохраняются.",
  },
  placement: { en: "Placement test", az: "Səviyyə testi", ru: "Тест на определение уровня" },
  placementBody: { en: "18 questions to find your starting day. Not an official CEFR test.", az: "Başlanğıc gününüzü tapmaq üçün 18 sual. Rəsmi CEFR testi deyil.", ru: "18 вопросов, чтобы найти день, с которого начать. Не официальный тест CEFR." },
  lastPlacement: { en: "Last result: Day {d} suggested", az: "Son nəticə: {d}-ci gün tövsiyə olunub", ru: "Последний результат: рекомендован день {d}" },
  grammar: { en: "Grammar exams (timed)", az: "Qrammatika imtahanları (vaxtlı)", ru: "Грамматические экзамены (на время)" },
  comprehension: { en: "Text-based comprehension tests", az: "Mətn üzrə anlama testləri", ru: "Тесты на понимание текста" },
  comprehensionBody: { en: "Read a text at your level and answer multiple-choice, True/False/Not Given and short-answer questions.", az: "Səviyyənizə uyğun mətn oxuyun və test, Doğru/Yanlış/Verilməyib və qısa cavablı suallara cavab verin.", ru: "Прочитайте текст своего уровня и ответьте на вопросы с выбором ответа, True/False/Not Given и с кратким ответом." },
  openReading: { en: "Open Reading", az: "Oxu bölməsinə keç", ru: "Открыть «Чтение»" },
  ielts: { en: "Pre-IELTS", az: "Pre-IELTS", ru: "Pre-IELTS" },
  ieltsBody: { en: "IELTS-style speaking and reading practice.", az: "IELTS formatında danışıq və oxu məşqi.", ru: "Практика говорения и чтения в формате IELTS." },
  open: { en: "Open", az: "Aç", ru: "Открыть" },
};

export function ExamsView() {
  const lang = useLang();
  const { attempts, ready } = useTestHistory();
  const { state } = useLearner();
  const pl = state.profile.placement;
  return (
    <div className="flex flex-col gap-8" lang={lang}>
      <div>
        <h1 className="text-[2rem] font-bold leading-tight tracking-[-0.02em]">{TXT.title[lang]}</h1>
        <p className="mt-1 text-ink-2">{TXT.lead[lang]}</p>
      </div>

      <section>
        <h2 className="text-lg font-bold">{TXT.grammar[lang]}</h2>
        <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
          <li>
            <Link href="/onboarding" className={`${card} flex h-full flex-col p-4 hover:border-line-strong`}>
              <span className="font-bold">🧭 {TXT.placement[lang]}</span>
              <span className="mt-1 text-sm text-ink-2">{TXT.placementBody[lang]}</span>
              {pl && <span className="mt-2 text-xs font-bold text-muted">{TXT.lastPlacement[lang].replace("{d}", String(pl.suggestedStartDay))}</span>}
            </Link>
          </li>
          {EXAMS.map((e) => {
            const b = bestFor(attempts, e.id);
            return (
              <li key={e.id}>
                <Link href={`/exams/${e.id}`} className={`${card} flex h-full flex-col p-4 hover:border-line-strong`}>
                  <span className="font-bold">📝 {lang === "en" ? e.title.en : pick(e.title, lang)}</span>
                  <span className="mt-1 text-sm text-ink-2">{lang === "en" ? e.description.en : pick(e.description, lang)}</span>
                  <span className="mt-2 text-xs font-bold text-muted">
                    ⏱ {e.minutes} {TEST_UI.minutes[lang]} · {e.sections.reduce((n, s) => n + s.questions.length, 0)} {TEST_UI.questions[lang]}
                    {b ? ` · ${TEST_UI.best[lang]} ${b.best}% (${b.count} ${TEST_UI.attempts[lang]})` : ""}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="grid gap-2.5 sm:grid-cols-2">
        <Link href="/reading" className={`${card} p-4 hover:border-line-strong`}>
          <span className="block font-bold">📖 {TXT.comprehension[lang]}</span>
          <span className="mt-1 block text-sm text-ink-2">{TXT.comprehensionBody[lang]}</span>
          <span className="mt-2 block text-sm font-bold underline underline-offset-4">{TXT.openReading[lang]} →</span>
        </Link>
      </section>

      <section>
        <h2 className="text-lg font-bold">{TEST_UI.history[lang]}</h2>
        {ready && !attempts.length ? (
          <p className="mt-2 text-sm text-muted">{TEST_UI.noHistory[lang]}</p>
        ) : (
          <ol className="mt-3 flex flex-col divide-y divide-line rounded-2xl border border-line bg-surface">
            {attempts.slice(0, 15).map((a, i) => {
              const t = testById(a.test_id);
              return (
                <li key={i} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
                  <span className="min-w-0 truncate font-bold">{t ? (lang === "en" ? t.title.en : pick(t.title, lang)) : a.test_id}</span>
                  <span className="shrink-0 tabular-nums text-muted">
                    {a.percent}% · {new Date(a.created_at).toLocaleDateString(lang === "en" ? "en-GB" : lang)}
                  </span>
                </li>
              );
            })}
          </ol>
        )}
        <p className="mt-2 text-xs text-muted">{READINGS.length} reading texts · {EXAMS.length} exams</p>
      </section>
    </div>
  );
}
