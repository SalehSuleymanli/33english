"use client";
import { useEffect, useState } from "react";

type Pref = "system" | "light" | "dark";

export function applyTheme(p: Pref) {
  const dark = p === "dark" || (p === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.dataset.theme = dark ? "dark" : "light";
}

export function useThemePref(): [Pref, (p: Pref) => void] {
  const [pref, setPref] = useState<Pref>("system");
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- read saved preference after mount
      setPref((localStorage.getItem("structa:theme") as Pref) || "system");
    } catch {}
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const p = (localStorage.getItem("structa:theme") as Pref) || "system";
      if (p === "system") applyTheme("system");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  const update = (p: Pref) => {
    setPref(p);
    try {
      localStorage.setItem("structa:theme", p);
    } catch {}
    applyTheme(p);
  };
  return [pref, update];
}

/** Compact light/dark switch for headers. */
export function ThemeToggle() {
  const [pref, setPref] = useThemePref();
  const [dark, setDark] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync with DOM theme after mount
    setDark(document.documentElement.dataset.theme === "dark");
  }, [pref]);
  return (
    <button
      type="button"
      onClick={() => setPref(dark ? "light" : "dark")}
      className="grid size-10 place-items-center rounded-full text-muted hover:bg-surface-2 hover:text-ink"
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {dark ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" /></svg>
      )}
    </button>
  );
}
