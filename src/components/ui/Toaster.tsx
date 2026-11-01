"use client";
import { useEffect } from "react";
import { useLearner } from "@/lib/learner/store";

/** Shows achievement unlocks. Polite live region so screen readers hear them. */
export function Toaster() {
  const { toasts, dismissToast } = useLearner();
  useEffect(() => {
    if (!toasts.length) return;
    const t = setTimeout(() => dismissToast(toasts[0].id), 5000);
    return () => clearTimeout(t);
  }, [toasts, dismissToast]);
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 top-3 z-50 flex flex-col items-center gap-2 px-4 md:top-auto md:bottom-6">
      {toasts.slice(0, 2).map((t) => (
        <div key={t.id} className="anim-rise pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border border-line bg-surface p-4 shadow-lift">
          <span aria-hidden className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-ink text-paper">★</span>
          <div className="min-w-0 flex-1">
            <p className="font-bold">Achievement: {t.title}</p>
            <p className="text-sm text-muted">{t.body}</p>
          </div>
          <button onClick={() => dismissToast(t.id)} className="text-sm text-muted hover:text-ink" aria-label="Dismiss">✕</button>
        </div>
      ))}
    </div>
  );
}
