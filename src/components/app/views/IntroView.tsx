"use client";
import Link from "next/link";
import { INTRO, INTRO_FRAMES, INTRO_LEAD, INTRO_STAGES, INTRO_TITLE, type IntroBlock } from "@/content/intro";
import { pick, pickList, type Lang } from "@/lib/i18n";
import { useLang, useT } from "@/lib/i18n/useLang";
import { LangSwitch } from "@/components/app/LangSwitch";
import { button, card } from "@/components/ui/styles";

export function IntroView() {
  const lang = useLang();
  const t = useT();
  return (
    <article className="mx-auto flex max-w-2xl flex-col gap-8" lang={lang}>
      <header>
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted">{t("intro.kicker")}</p>
        <h1 className="mt-2 text-[2.1rem] font-bold leading-tight tracking-[-0.02em]">{pick(INTRO_TITLE, lang)}</h1>
        <p className="mt-1 text-sm text-muted">{t("intro.minutes")}</p>
        <div className="mt-4">
          <LangSwitch size="sm" />
        </div>
        <p className="mt-5 text-lg leading-relaxed text-ink-2">{pick(INTRO_LEAD, lang)}</p>
      </header>

      <nav aria-label="Contents" className={`${card} p-4`}>
        <ol className="grid gap-1 text-sm font-bold">
          {INTRO.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-ink-2 underline-offset-4 hover:underline">
                {pick(s.title, lang)}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {INTRO.map((s) => (
        <section key={s.id} id={s.id} className="scroll-mt-20">
          <h2 className="text-[1.5rem] font-bold leading-tight">{pick(s.title, lang)}</h2>
          <div className="mt-3 flex flex-col gap-4">
            {s.blocks.map((b, i) => (
              <Block key={i} b={b} lang={lang} />
            ))}
          </div>
        </section>
      ))}

      <div className="flex flex-wrap gap-3 border-t border-line pt-6">
        <Link href="/learn/1" className={button("primary", "lg")}>
          {t("intro.cta")}
        </Link>
        <Link href="/course" className={button("secondary", "lg")}>
          {t("intro.course")}
        </Link>
      </div>
    </article>
  );
}

function Block({ b, lang }: { b: IntroBlock; lang: Lang }) {
  if (b.kind === "p")
    return (
      <>
        {pickList(b.text, lang).map((p, i) => (
          <p key={i} className="leading-relaxed text-ink-2">
            {p}
          </p>
        ))}
      </>
    );
  if (b.kind === "quote")
    return <blockquote className="border-l-4 border-ink pl-4 text-lg font-bold leading-relaxed">{pick(b.text, lang)}</blockquote>;
  if (b.kind === "list")
    return (
      <ul className="flex list-disc flex-col gap-2 pl-6 leading-relaxed text-ink-2">
        {b.items.map((it, i) => (
          <li key={i}>{it[lang]}</li>
        ))}
      </ul>
    );
  if (b.kind === "frames")
    return (
      <ul className="grid gap-2 sm:grid-cols-2">
        {INTRO_FRAMES.map((f) => (
          <li key={f.id} className={`frame-${f.id} rounded-2xl border border-line bg-surface p-4`} style={{ borderLeft: "6px solid var(--f)" }}>
            <p className="font-bold" style={{ color: "var(--f)" }}>
              {pick(f.name, lang)}
            </p>
            <p className="mt-1 font-mono text-sm">{f.formula}</p>
            <p className="specimen mt-1" lang="en">
              {f.example}
            </p>
            <p className="mt-1 text-sm text-ink-2">{pick(f.meaning, lang)}</p>
          </li>
        ))}
      </ul>
    );
  return (
    <ol className="flex flex-col gap-2">
      {INTRO_STAGES.map((s, i) => (
        <li key={i} className="flex gap-3 rounded-2xl border border-line bg-surface p-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface-2 text-xs font-black tabular-nums">{s.days}</span>
          <div>
            <p className="font-bold">{pick(s.name, lang)}</p>
            <p className="text-sm text-ink-2">{pick(s.what, lang)}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
