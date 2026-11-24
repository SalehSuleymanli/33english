"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IELTS_SPEAKING, ieltsSpeakingById } from "@/content/ielts";
import { SPEAKING_CRITERIA, SPEAKING_PARTS } from "@/content/ielts/guide";
import type { QA } from "@/content/ielts/types";
import { IELTS_READINGS } from "@/content/tests";
import { TEST_UI } from "@/content/l10n/tests";
import { bestFor, useTestHistory } from "@/lib/tests/history";
import { practiceBand } from "@/lib/tests/grade";
import { useLang } from "@/lib/i18n/useLang";
import { pick, type Lang } from "@/lib/i18n";
import { SpeakButton } from "@/components/ui/Speak";
import { button, card } from "@/components/ui/styles";

type L = { en: string; az: string; ru: string };
const tx = (l: L, lang: Lang) => l[lang];

const T = {
  title: { en: "Pre-IELTS", az: "Pre-IELTS", ru: "Pre-IELTS" },
  lead: {
    en: "Practise for the IELTS exam with full speaking topics and academic-style reading tests. All results are practice results, not official IELTS scores.",
    az: "Tam danışıq mövzuları və akademik formatlı oxu testləri ilə IELTS imtahanına hazırlaşın. Bütün nəticələr məşq nəticələridir, rəsmi IELTS balı deyil.",
    ru: "Готовьтесь к IELTS с полными разговорными темами и академическими тестами по чтению. Все результаты — тренировочные, а не официальные баллы IELTS.",
  },
  listening: { en: "Listening", az: "Dinləmə", ru: "Аудирование" },
  speaking: { en: "Speaking", az: "Danışıq", ru: "Говорение" },
  reading: { en: "Reading", az: "Oxu", ru: "Чтение" },
  soon: { en: "Coming soon", az: "Tezliklə", ru: "Скоро" },
  topics: { en: "5 complete topics · Parts 1, 2 and 3", az: "5 tam mövzu · 1, 2 və 3-cü hissələr", ru: "5 полных тем · части 1, 2 и 3" },
  tests: { en: "5 practice tests · 13 questions each", az: "5 məşq testi · hər birində 13 sual", ru: "5 тренировочных тестов · по 13 вопросов" },
  listeningOnWay: { en: "Listening is on its way.", az: "Dinləmə bölməsi hazırlanır.", ru: "Раздел аудирования готовится." },
  listeningBody: {
    en: "We are recording real audio for this module, so it isn't available yet. When it's ready, it will follow the four parts of the IELTS Listening test, with question types like form completion, multiple choice, map labelling and note completion.",
    az: "Bu modul üçün real audio yazırıq, ona görə hələ mövcud deyil. Hazır olanda IELTS Dinləmə imtahanının dörd hissəsini izləyəcək: forma doldurma, çoxseçimli suallar, xəritə üzərində işarələmə və qeydlərin tamamlanması kimi tapşırıqlarla.",
    ru: "Мы записываем настоящее аудио для этого модуля, поэтому он пока недоступен. Когда он будет готов, он повторит четыре части IELTS Listening: заполнение форм, множественный выбор, работа с картой и завершение заметок.",
  },
  meanwhile: { en: "Meanwhile, train your ear with:", az: "Bu vaxt qulağınızı bunlarla məşq etdirin:", ru: "А пока тренируйте слух:" },
  partsTitle: { en: "How the Speaking test works", az: "Danışıq imtahanı necə keçir", ru: "Как проходит устная часть" },
  criteria: { en: "What the examiner listens for", az: "İmtahançı nəyə qulaq asır", ru: "Что оценивает экзаменатор" },
  sample: { en: "Show sample answer", az: "Nümunə cavabı göstər", ru: "Показать образец ответа" },
  hide: { en: "Hide answer", az: "Cavabı gizlət", ru: "Скрыть ответ" },
  cueCard: { en: "Cue card", az: "Tapşırıq kartı", ru: "Карточка с заданием" },
  youShouldSay: { en: "You should say:", az: "Danışmalı olduğunuz:", ru: "Вы должны рассказать:" },
  prepare: { en: "Prepare (1 min)", az: "Hazırlaş (1 dəq)", ru: "Подготовка (1 мин)" },
  speakNow: { en: "Speak (2 min)", az: "Danış (2 dəq)", ru: "Говорите (2 мин)" },
  stop: { en: "Stop", az: "Dayandır", ru: "Стоп" },
  timeToSpeak: { en: "Time to speak!", az: "Danışmaq vaxtıdır!", ru: "Время говорить!" },
  done: { en: "Well done. Compare your talk with the sample below.", az: "Əla. Danışığınızı aşağıdakı nümunə ilə müqayisə edin.", ru: "Отлично. Сравните свой ответ с образцом ниже." },
  sampleAnswer: { en: "Sample answer (about 2 minutes)", az: "Nümunə cavab (təxminən 2 dəqiqə)", ru: "Образец ответа (около 2 минут)" },
  showTr: { en: "Show translation", az: "Tərcüməni göstər", ru: "Показать перевод" },
  vocab: { en: "Vocabulary", az: "Lüğət", ru: "Словарь" },
  expressions: { en: "Useful expressions", az: "Faydalı ifadələr", ru: "Полезные выражения" },
  grammar: { en: "Grammar used in the sample", az: "Nümunədə işlənən qrammatika", ru: "Грамматика в образце" },
  part: { en: "Part", az: "Hissə", ru: "Часть" },
  practiceTip: { en: "Answer each question aloud first, then open the sample.", az: "Əvvəlcə hər suala ucadan cavab verin, sonra nümunəni açın.", ru: "Сначала ответьте на каждый вопрос вслух, затем откройте образец." },
  readingLead: {
    en: "Academic-style passages with real IELTS question types. Timed: 20 minutes each. Scores show a practice band — not an official IELTS score.",
    az: "Real IELTS sual növləri ilə akademik formatlı mətnlər. Vaxtlı: hər biri 20 dəqiqə. Nəticə təxmini məşq balını göstərir — rəsmi IELTS balı deyil.",
    ru: "Академические тексты с настоящими типами вопросов IELTS. На время: по 20 минут. Результат показывает примерный тренировочный балл — не официальный балл IELTS.",
  },
  back: { en: "Pre-IELTS", az: "Pre-IELTS", ru: "Pre-IELTS" },
};

export function IeltsHub() {
  const lang = useLang();
  return (
    <div className="flex flex-col gap-6" lang={lang}>
      <div>
        <h1 className="text-[2rem] font-bold leading-tight tracking-[-0.02em]">{tx(T.title, lang)}</h1>
        <p className="mt-1 text-ink-2">{tx(T.lead, lang)}</p>
      </div>
      <ul className="grid gap-3 sm:grid-cols-3">
        <li>
          <Link href="/ielts/speaking" className={`${card} flex h-full flex-col p-5 hover:border-line-strong`}>
            <span className="text-3xl">🗣️</span>
            <span className="mt-2 text-lg font-bold">{tx(T.speaking, lang)}</span>
            <span className="text-sm text-ink-2">{tx(T.topics, lang)}</span>
          </Link>
        </li>
        <li>
          <Link href="/ielts/reading" className={`${card} flex h-full flex-col p-5 hover:border-line-strong`}>
            <span className="text-3xl">📄</span>
            <span className="mt-2 text-lg font-bold">{tx(T.reading, lang)}</span>
            <span className="text-sm text-ink-2">{tx(T.tests, lang)}</span>
          </Link>
        </li>
        <li>
          <Link href="/ielts/listening" className={`${card} flex h-full flex-col p-5 hover:border-line-strong`}>
            <span className="text-3xl">🎧</span>
            <span className="mt-2 text-lg font-bold">{tx(T.listening, lang)}</span>
            <span className="text-sm font-bold text-muted">{tx(T.soon, lang)}</span>
          </Link>
        </li>
      </ul>
      <PartsGuide lang={lang} />
    </div>
  );
}

export function IeltsListening() {
  const lang = useLang();
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6" lang={lang}>
      <Link href="/ielts" className="text-sm font-bold text-muted hover:text-ink">
        ← {tx(T.back, lang)}
      </Link>
      <section className="overflow-hidden rounded-[1.75rem] border border-line bg-surface text-center shadow-lift">
        <div className="flex h-40 items-end justify-center gap-1.5 bg-surface-2 px-6 pb-8" aria-hidden>
          {[18, 34, 52, 30, 64, 44, 72, 38, 56, 26, 46, 20].map((h, i) => (
            <span key={i} className="w-3 rounded-full bg-ink/20" style={{ height: h }} />
          ))}
        </div>
        <div className="p-6 sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-muted">IELTS · {tx(T.listening, lang)}</p>
          <h1 className="mt-2 text-[2rem] font-bold leading-tight">{tx(T.listeningOnWay, lang)}</h1>
          <p className="mx-auto mt-3 max-w-lg text-ink-2">{tx(T.listeningBody, lang)}</p>
        </div>
      </section>
      <div>
        <p className="font-bold">{tx(T.meanwhile, lang)}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Link href="/ielts/speaking" className={button("secondary")}>
            🗣️ {tx(T.speaking, lang)}
          </Link>
          <Link href="/scenarios" className={button("secondary")}>
            💬 {lang === "az" ? "Dialoqlar" : lang === "ru" ? "Диалоги" : "Conversations"}
          </Link>
        </div>
      </div>
    </div>
  );
}

function PartsGuide({ lang }: { lang: Lang }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">{tx(T.partsTitle, lang)}</h2>
      <ol className="grid gap-3 md:grid-cols-3">
        {SPEAKING_PARTS.map((p) => (
          <li key={p.id} className={`${card} p-4`}>
            <p className="font-bold">{tx(p.name, lang)}</p>
            <p className="text-xs font-bold text-muted">{tx(p.time, lang)}</p>
            <p className="mt-2 text-sm text-ink-2">{tx(p.what, lang)}</p>
            <p className="mt-2 rounded-xl bg-surface-2 p-2 text-sm">💡 {tx(p.tip, lang)}</p>
          </li>
        ))}
      </ol>
      <h2 className="text-xl font-bold">{tx(T.criteria, lang)}</h2>
      <ul className="grid gap-2 sm:grid-cols-2">
        {SPEAKING_CRITERIA.map((c, i) => (
          <li key={i} className="rounded-2xl bg-surface-2 p-3">
            <p className="font-bold">{tx(c.name, lang)}</p>
            <p className="text-sm text-ink-2">{tx(c.what, lang)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function IeltsSpeakingList() {
  const lang = useLang();
  return (
    <div className="flex flex-col gap-6" lang={lang}>
      <Link href="/ielts" className="text-sm font-bold text-muted hover:text-ink">
        ← {tx(T.back, lang)}
      </Link>
      <div>
        <h1 className="text-[2rem] font-bold leading-tight tracking-[-0.02em]">IELTS {tx(T.speaking, lang)}</h1>
        <p className="mt-1 text-ink-2">{tx(T.topics, lang)}</p>
      </div>
      <ul className="grid gap-2.5 sm:grid-cols-2">
        {IELTS_SPEAKING.map((t, i) => (
          <li key={t.id}>
            <Link href={`/ielts/speaking/${t.id}`} className={`${card} flex h-full flex-col p-4 hover:border-line-strong`}>
              <span className="text-xs font-bold uppercase tracking-wide text-muted">
                {lang === "az" ? "Mövzu" : lang === "ru" ? "Тема" : "Topic"} {i + 1}
              </span>
              <span className="font-bold" lang="en">
                {t.title.en}
              </span>
              {lang !== "en" && <span className="text-sm text-ink-2">{pick(t.title, lang)}</span>}
              <span className="mt-1 text-sm text-ink-2" lang="en">
                “{t.part2.cue}”
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <PartsGuide lang={lang} />
    </div>
  );
}

function QAItem({ qa, lang }: { qa: QA; lang: Lang }) {
  const [open, setOpen] = useState(false);
  return (
    <li className={`${card} p-4`}>
      <p className="flex items-start gap-2 text-lg font-bold">
        <span className="specimen flex-1" lang="en">
          {qa.q}
        </span>
        <SpeakButton text={qa.q} />
      </p>
      {lang !== "en" && <p className="text-sm text-muted">{pick(qa.tr, lang)}</p>}
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="mt-2 text-sm font-bold underline underline-offset-4">
        {open ? tx(T.hide, lang) : tx(T.sample, lang)}
      </button>
      {open && (
        <p className="mt-2 flex items-start gap-2 rounded-xl bg-surface-2 p-3">
          <span className="specimen flex-1 leading-relaxed" lang="en">
            {qa.a}
          </span>
          <SpeakButton text={qa.a} />
        </p>
      )}
    </li>
  );
}

function CueTimer({ lang }: { lang: Lang }) {
  const [phase, setPhase] = useState<"idle" | "prep" | "speak" | "done">("idle");
  const [left, setLeft] = useState(0);
  useEffect(() => {
    if (phase !== "prep" && phase !== "speak") return;
    const id = setInterval(() => {
      setLeft((l) => Math.max(0, l - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [phase]);
  // when a countdown reaches zero, move on (decided during render, no effect needed)
  if ((phase === "prep" || phase === "speak") && left === 0) {
    if (phase === "prep") {
      setPhase("speak");
      setLeft(120);
    } else setPhase("done");
  }
  return (
    <div className="mt-4 rounded-2xl bg-surface-2 p-4" aria-live="polite">
      {phase === "idle" && (
        <button type="button" onClick={() => {
            setPhase("prep");
            setLeft(60);
          }} className={button("primary")}>
          ⏱ {tx(T.prepare, lang)}
        </button>
      )}
      {(phase === "prep" || phase === "speak") && (
        <div className="flex items-center gap-4">
          <span className="text-3xl font-black tabular-nums">
            {Math.floor(left / 60)}:{String(left % 60).padStart(2, "0")}
          </span>
          <span className="font-bold">{phase === "prep" ? tx(T.prepare, lang) : `🎙️ ${tx(T.timeToSpeak, lang)}`}</span>
          <button type="button" onClick={() => setPhase("done")} className={`${button("ghost", "sm")} ml-auto`}>
            {tx(T.stop, lang)}
          </button>
        </div>
      )}
      {phase === "done" && <p className="font-bold">✓ {tx(T.done, lang)}</p>}
    </div>
  );
}

export function IeltsSpeakingTopicView({ id }: { id: string }) {
  const lang = useLang();
  const t = ieltsSpeakingById(id)!;
  const [part, setPart] = useState<1 | 2 | 3>(1);
  const [showTr, setShowTr] = useState(false);
  const trLang: "az" | "ru" = lang === "ru" ? "ru" : "az";
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-5" lang={lang}>
      <Link href="/ielts/speaking" className="text-sm font-bold text-muted hover:text-ink">
        ← IELTS {tx(T.speaking, lang)}
      </Link>
      <div>
        <h1 className="text-[2rem] font-bold leading-tight tracking-[-0.02em]" lang="en">
          {t.title.en}
        </h1>
        {lang !== "en" && <p className="text-lg text-ink-2">{pick(t.title, lang)}</p>}
        <p className="mt-2 text-ink-2">{pick(t.intro, trLang)}</p>
      </div>
      <div role="tablist" className="flex gap-1 rounded-2xl border border-line bg-surface p-1">
        {([1, 2, 3] as const).map((n) => (
          <button key={n} role="tab" aria-selected={part === n} type="button" onClick={() => setPart(n)} className={`flex-1 rounded-xl px-3 py-2 font-bold ${part === n ? "bg-ink text-paper" : "text-muted hover:bg-surface-2"}`}>
            {tx(T.part, lang)} {n}
          </button>
        ))}
      </div>
      <p className="rounded-2xl bg-surface-2 p-3 text-sm">
        <span className="font-bold">{tx(SPEAKING_PARTS[part - 1].name, lang)}</span> · {tx(SPEAKING_PARTS[part - 1].time, lang)} — 💡 {tx(SPEAKING_PARTS[part - 1].tip, lang)}
      </p>

      {part !== 2 && (
        <>
          <p className="text-sm text-muted">{tx(T.practiceTip, lang)}</p>
          <ol className="flex flex-col gap-3">
            {(part === 1 ? t.part1 : t.part3).map((qa) => (
              <QAItem key={qa.q} qa={qa} lang={lang} />
            ))}
          </ol>
        </>
      )}

      {part === 2 && (
        <>
          <section className="rounded-[1.5rem] border-2 border-ink bg-surface p-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">{tx(T.cueCard, lang)}</p>
            <p className="specimen mt-2 text-xl font-bold" lang="en">
              {t.part2.cue}
            </p>
            <p className="mt-3 font-bold" lang="en">
              You should say:
            </p>
            <ul className="specimen mt-1 list-disc pl-6" lang="en">
              {t.part2.prompts.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p className="specimen mt-1" lang="en">
              {t.part2.closing}
            </p>
            {lang !== "en" && <p className="mt-3 border-t border-line pt-3 text-sm text-ink-2">{pick(t.part2.cueTr, lang)}</p>}
            <CueTimer lang={lang} />
          </section>

          <section>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xl font-bold">{tx(T.sampleAnswer, lang)}</h2>
              <div className="flex items-center gap-2">
                <SpeakButton text={t.part2.answer.join(" ")} />
                <label className="flex items-center gap-2 text-sm font-bold">
                  <input type="checkbox" checked={showTr} onChange={(e) => setShowTr(e.target.checked)} />
                  {tx(T.showTr, lang)}
                </label>
              </div>
            </div>
            <div className="mt-3 flex flex-col gap-3">
              {t.part2.answer.map((p, i) => (
                <div key={i}>
                  <p className="specimen leading-relaxed" lang="en">
                    {p}
                  </p>
                  {showTr && (
                    <p className="mt-1 border-l-2 border-line-strong pl-3 text-sm text-muted" lang={trLang}>
                      {t.part2.translation[trLang][i]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <div>
              <h2 className="font-bold">{tx(T.vocab, lang)}</h2>
              <ul className="mt-2 flex flex-col gap-1.5">
                {t.part2.vocab.map((v) => (
                  <li key={v.en} className="rounded-xl bg-surface-2 px-3 py-2 text-sm">
                    <span className="font-bold" lang="en">
                      {v.en}
                    </span>{" "}
                    — {v[trLang]}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-bold">{tx(T.expressions, lang)}</h2>
              <ul className="mt-2 flex flex-col gap-1.5">
                {t.part2.expressions.map((v) => (
                  <li key={v.en} className="rounded-xl bg-surface-2 px-3 py-2 text-sm">
                    <span className="font-bold" lang="en">
                      {v.en}
                    </span>{" "}
                    — {v[trLang]}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-bold">{tx(T.grammar, lang)}</h2>
            <ul className="mt-2 flex flex-col gap-2">
              {t.part2.grammar.map((g) => (
                <li key={g.en} className={`${card} p-3`}>
                  <p className="specimen font-bold" lang="en">
                    {g.en}
                  </p>
                  <p className="text-sm text-ink-2">{pick(g.note, trLang)}</p>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}

export function IeltsReadingList() {
  const lang = useLang();
  const { attempts } = useTestHistory();
  return (
    <div className="flex flex-col gap-6" lang={lang}>
      <Link href="/ielts" className="text-sm font-bold text-muted hover:text-ink">
        ← {tx(T.back, lang)}
      </Link>
      <div>
        <h1 className="text-[2rem] font-bold leading-tight tracking-[-0.02em]">IELTS {tx(T.reading, lang)}</h1>
        <p className="mt-1 text-ink-2">{tx(T.readingLead, lang)}</p>
      </div>
      <ul className="flex flex-col gap-2.5">
        {IELTS_READINGS.map((r) => {
          const b = bestFor(attempts, r.id);
          return (
            <li key={r.id}>
              <Link href={`/ielts/reading/${r.id}`} className={`${card} flex flex-col p-4 hover:border-line-strong`}>
                <span className="font-bold" lang="en">
                  {r.title.en}
                </span>
                <span className="mt-1 text-sm text-ink-2">{lang === "en" ? r.description.en : pick(r.description, lang)}</span>
                <span className="mt-2 text-xs font-bold text-muted">
                  ⏱ {r.minutes} {TEST_UI.minutes[lang]}
                  {b ? ` · ${TEST_UI.best[lang]} ${b.best}% · ${TEST_UI.band[lang]} ${practiceBand(b.best)}` : ""}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <p className="text-xs text-muted">{TEST_UI.practiceOnly[lang]}</p>
    </div>
  );
}
