"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo, LogoMark } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useLearner } from "@/lib/learner/store";
import { IconChat, IconCourse, IconGames, IconLab, IconMic, IconPractice, IconProgress, IconSettings, IconToday, IconUser, IconWords } from "./icons";

const ITEMS = [
  { href: "/today", label: "Today", Icon: IconToday, mobile: true },
  { href: "/course", label: "Course", Icon: IconCourse, mobile: true },
  { href: "/games", label: "Games", Icon: IconGames, mobile: true },
  { href: "/speaking", label: "Speaking", Icon: IconMic, mobile: true },
  { href: "/practice", label: "Practice", Icon: IconPractice, mobile: true },
  { href: "/lab", label: "Lab", Icon: IconLab, mobile: false },
  { href: "/scenarios", label: "Conversations", Icon: IconChat, mobile: false },
  { href: "/words", label: "Words", Icon: IconWords, mobile: false },
  { href: "/progress", label: "Progress", Icon: IconProgress, mobile: false },
  { href: "/profile", label: "Profile", Icon: IconUser, mobile: false },
];

const SYNC_LABEL = { local: "Saved on this device", syncing: "Saving…", synced: "Synced", offline: "Offline — will sync later", error: "Sync paused — retrying" } as const;

export function AppNav() {
  const path = usePathname();
  const { user, sync, hydrated } = useLearner();
  const active = (href: string) => path === href || path.startsWith(href + "/");
  return (
    <>
      {/* desktop rail */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-line bg-paper px-3 py-5 md:flex">
        <Link href="/" className="px-3" aria-label="33English home">
          <Logo />
        </Link>
        <nav aria-label="App" className="mt-6 flex min-h-0 flex-col gap-0.5 overflow-y-auto">
          {ITEMS.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              aria-current={active(href) ? "page" : undefined}
              className={`flex h-11 items-center gap-3 rounded-xl px-3 font-bold ${active(href) ? "bg-surface text-ink shadow-[inset_0_0_0_1px_var(--line)]" : "text-muted hover:bg-surface-2 hover:text-ink"}`}
            >
              <Icon />
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-1">
          <Link href="/settings" aria-current={active("/settings") ? "page" : undefined} className={`flex h-11 items-center gap-3 rounded-xl px-3 font-bold ${active("/settings") ? "bg-surface text-ink" : "text-muted hover:bg-surface-2 hover:text-ink"}`}>
            <IconSettings />
            Settings
          </Link>
          <div className="flex items-center justify-between px-3 pt-2">
            <span className="text-xs text-muted" aria-live="polite">
              {hydrated ? (user ? SYNC_LABEL[sync] : "Saved on this device") : ""}
            </span>
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* mobile top bar */}
      <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-line bg-paper/90 px-4 backdrop-blur md:hidden">
        <Link href="/" aria-label="33English home">
          <LogoMark />
        </Link>
        <span className="ml-1 text-xs text-muted">{hydrated ? (user ? SYNC_LABEL[sync] : "Saved on this device") : ""}</span>
        <div className="ml-auto flex items-center">
          <Link href="/lab" aria-label="Sentence Lab" className="grid size-10 place-items-center rounded-full text-muted hover:text-ink">
            <IconLab />
          </Link>
          <Link href="/words" aria-label="Words" className="grid size-10 place-items-center rounded-full text-muted hover:text-ink">
            <IconWords />
          </Link>
          <Link href="/profile" aria-label="Profile" className="grid size-10 place-items-center rounded-full text-muted hover:text-ink">
            <IconUser />
          </Link>
          <Link href="/settings" aria-label="Settings" className="grid size-10 place-items-center rounded-full text-muted hover:text-ink">
            <IconSettings />
          </Link>
        </div>
      </header>

      {/* mobile bottom bar */}
      <nav aria-label="App" className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
        <ul className="grid grid-cols-5">
          {ITEMS.filter((i) => i.mobile).map(({ href, label, Icon }) => (
            <li key={href}>
              <Link href={href} aria-current={active(href) ? "page" : undefined} className={`flex h-16 flex-col items-center justify-center gap-1 text-[0.72rem] font-bold ${active(href) ? "text-ink" : "text-muted"}`}>
                <Icon />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
