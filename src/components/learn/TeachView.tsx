"use client";
import type { Teach, TeachBlock } from "@/content/teach/types";
import { pick, type Lang } from "@/lib/i18n";
import { useLang, useT } from "@/lib/i18n/useLang";
import { LangSwitch } from "@/components/app/LangSwitch";
import { SlotChip } from "@/components/ui/StructureDiagram";
import { SpeakButton } from "@/components/ui/Speak";

/** The full Azerbaijani/Russian explanation of a lesson. English stays English. */
export function TeachView({ teach }: { teach: Teach }) {
  const chosen = useLang();
  const t = useT();
  // Explanations exist in Azerbaijani and Russian; English-interface learners read the Azerbaijani version until they switch.
  const lang: Lang = chosen === "en" ? "az" : chosen;
  return (
    <div lang={lang}>
      <h1 id="step-heading" tabIndex={-1} className="text-[1.75rem] font-bold leading-tight outline-none">
        {t("lesson.teach")}
      </h1>
      {chosen === "en" && (
        <div className="mt-3 rounded-2xl bg-surface-2 p-3 text-sm">
          <p className="mb-2 font-bold">This explanation is written in Azerbaijani and Russian. Choose one:</p>
          <LangSwitch size="sm" />
        </div>
      )}
      <p className="mt-3 text-lg leading-relaxed text-ink-2">{pick(teach.summary, lang)}</p>

      <nav aria-label="Contents" className="mt-5 rounded-2xl border border-line bg-surface p-3">
        <ol className="grid gap-0.5 text-sm font-bold sm:grid-cols-2">
          {teach.sections.map((s) => (
            <li key={s.id}>
              <a href={`#t-${s.id}`} className="text-ink-2 underline-offset-4 hover:underline">
                {pick(s.title, lang)}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-6 flex flex-col gap-9">
        {teach.sections.map((s) => (
          <section key={s.id} id={`t-${s.id}`} className="scroll-mt-20">
            <h2 className="text-[1.3rem] font-bold leading-tight">{pick(s.title, lang)}</h2>
            <div className="mt-3 flex flex-col gap-4">
              {s.blocks.map((b, i) => (
                <Block key={i} b={b} lang={lang} />
              ))}
            </div>
          </section>
        ))}
        <section className="rounded-2xl bg-f-wash p-5">
          <h2 className="font-bold">{lang === "az" ? "Xülasə" : "Итоги"}</h2>
          <ul className="mt-2 flex list-disc flex-col gap-1.5 pl-5 text-ink-2">
            {teach.recap.map((r, i) => (
              <li key={i}>{pick(r, lang)}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

const En = ({ children }: { children: string }) => (
  <span lang="en" className="specimen">
    {children}
  </span>
);

function Block({ b, lang }: { b: TeachBlock; lang: Lang }) {
  switch (b.kind) {
    case "p":
      return <p className="leading-relaxed text-ink-2">{pick(b.text, lang)}</p>;
    case "tip":
      return <p className="rounded-2xl border-l-4 border-f bg-f-wash px-4 py-3 font-bold leading-relaxed">{pick(b.text, lang)}</p>;
    case "formula":
      return (
        <figure className="rounded-2xl bg-f-wash p-4">
          <figcaption className="text-sm font-bold text-muted">{pick(b.label, lang)}</figcaption>
          <div className="mt-3 flex flex-wrap items-start gap-x-2 gap-y-3">
            {b.parts.map((p, i) => (
              <SlotChip key={i} slot={{ label: "", text: p.text, role: p.role }} compact />
            ))}
          </div>
          <dl className="mt-3 grid gap-1.5 text-sm">
            {b.parts.map((p, i) => (
              <div key={i} className="grid grid-cols-[auto_1fr] gap-2">
                <dt className="font-bold">
                  <En>{p.text}</En>
                </dt>
                <dd className="text-ink-2">— {pick(p.note, lang)}</dd>
              </div>
            ))}
          </dl>
          {b.example && (
            <p className="mt-3 flex items-center gap-2 text-lg">
              <En>{b.example}</En>
              <SpeakButton text={b.example} />
            </p>
          )}
        </figure>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[28rem] text-left text-sm">
            {b.caption && <caption className="p-2 text-left font-bold text-muted">{pick(b.caption, lang)}</caption>}
            <thead className="bg-surface-2">
              <tr>
                {b.head.map((h, i) => (
                  <th key={i} scope="col" className="px-3 py-2 font-bold">
                    {pick(h, lang)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i} className="border-t border-line align-top">
                  {r.map((c, k) => (
                    <td key={k} lang="en" className={`px-3 py-2 ${k === 0 ? "font-bold" : "specimen"}`}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "examples":
      return (
        <ul className="flex flex-col gap-2">
          {b.items.map((e, i) => (
            <li key={i} className="rounded-2xl border border-line bg-surface px-4 py-3">
              <p className="flex items-start gap-2 text-lg">
                <span className="flex-1">
                  <En>{e.en}</En>
                </span>
                <SpeakButton text={e.en} />
              </p>
              <p className="text-sm text-muted">{e[lang]}</p>
              {e.note && <p className="mt-1 text-sm text-ink-2">{pick(e.note, lang)}</p>}
            </li>
          ))}
        </ul>
      );
    case "compare":
      return (
        <ul className="flex flex-col gap-3">
          {b.items.map((c, i) => (
            <li key={i} className="rounded-2xl border border-line bg-surface p-4">
              <p className="text-lg font-bold">
                <En>{c.en}</En>
              </p>
              <p className="mt-1 leading-relaxed text-ink-2">{pick(c.text, lang)}</p>
            </li>
          ))}
        </ul>
      );
    case "signals":
      return (
        <div>
          <ul className="flex flex-wrap gap-1.5" lang="en">
            {b.words.map((w) => (
              <li key={w} className="rounded-full bg-f-tint px-3 py-1 text-sm font-bold text-f">
                {w}
              </li>
            ))}
          </ul>
          <p className="mt-2 leading-relaxed text-ink-2">{pick(b.text, lang)}</p>
        </div>
      );
    case "mistakes":
      return (
        <ul className="flex flex-col gap-3">
          {b.items.map((m, i) => (
            <li key={i} className="rounded-2xl border border-line bg-surface p-4">
              <p className="text-bad line-through decoration-2">
                <En>{m.wrong}</En>
              </p>
              <p className="font-bold text-good">
                <En>{m.right}</En>
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink-2">{pick(m.why, lang)}</p>
            </li>
          ))}
        </ul>
      );
  }
}
