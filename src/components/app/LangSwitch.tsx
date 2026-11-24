"use client";
import { useLearner } from "@/lib/learner/store";
import { setProfile } from "@/lib/learner/state";
import { LANG_OPTIONS, langOf } from "@/lib/i18n";
import { useT } from "@/lib/i18n/useLang";

/** Segmented choice of the explanation language. Saved to the profile (and synced when signed in). */
export function LangSwitch({ size = "md" }: { size?: "sm" | "md" }) {
  const { state, dispatch } = useLearner();
  const t = useT();
  const current = langOf(state.profile.nativeLanguage);
  return (
    <div role="radiogroup" aria-label={t("lang.title")} className="inline-flex flex-wrap gap-1 rounded-2xl border border-line bg-surface p-1">
      {LANG_OPTIONS.map((o) => (
        <button
          key={o.code}
          type="button"
          role="radio"
          aria-checked={current === o.code}
          lang={o.code}
          onClick={() => dispatch((s) => setProfile(s, { nativeLanguage: o.code === "en" ? undefined : o.code }))}
          className={`rounded-xl font-bold transition ${size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2.5"} ${current === o.code ? "bg-ink text-paper" : "text-muted hover:bg-surface-2 hover:text-ink"}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
