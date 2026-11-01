import type { ReactNode } from "react";

export function PageIntro({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-10 pt-12 sm:px-6 md:pt-16">
      <h1 className="max-w-3xl text-[2.4rem] font-bold leading-[1.08] tracking-[-0.025em] sm:text-[3rem]">{title}</h1>
      {children && <div className="mt-4 max-w-2xl text-lg text-ink-2">{children}</div>}
    </div>
  );
}
