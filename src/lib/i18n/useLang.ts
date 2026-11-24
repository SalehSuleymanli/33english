"use client";
import { useCallback } from "react";
import { useLearner } from "@/lib/learner/store";
import { langOf, type Lang } from "./index";
import { translate, type UIKey } from "./ui";

/** The learner's explanation language (English until they choose). */
export function useLang(): Lang {
  const { state } = useLearner();
  return langOf(state.profile.nativeLanguage);
}

/** `t("nav.today")` → the interface string in the learner's language. */
export function useT() {
  const lang = useLang();
  return useCallback((key: UIKey) => translate(key, lang), [lang]);
}
