"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { button } from "@/components/ui/styles";
import { useLearner } from "@/lib/learner/store";

const NAV = [
  { href: "/method", label: "Method" },
  { href: "/journey", label: "The 33 days" },
  { href: "/curriculum", label: "Curriculum" },
  { href: "/lab", label: "Sentence Lab" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
];

export function SiteHeader() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { user, state, hydrated } = useLearner();
  const started = hydrated && (Object.keys(state.lessons).length > 0 || state.profile.onboarded);
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" aria-label="Structa home" className="shrink-0">
          <Logo />
        </Link>
        <nav aria-label="Main" className="ml-6 hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={path === n.href ? "page" : undefined}
              className={`rounded-full px-3 py-2 text-[0.95rem] ${path === n.href ? "bg-surface-2 text-ink font-bold" : "text-muted hover:text-ink"}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <ThemeToggle />
          {!user && (
            <span className="hidden sm:block">
              <Link href="/login" className={button("ghost", "sm")}>
                Sign in
              </Link>
            </span>
          )}
          <Link href={started || user ? "/today" : "/learn/1"} className={button("primary", "sm")}>
            {started || user ? "Continue learning" : "Start free"}
          </Link>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full hover:bg-surface-2 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line bg-paper px-4 pb-4 lg:hidden">
          <ul className="flex flex-col py-2">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 text-lg hover:bg-surface-2">
                  {n.label}
                </Link>
              </li>
            ))}
            {!user && (
              <li>
                <Link href="/login" onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 text-lg hover:bg-surface-2">
                  Sign in
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
