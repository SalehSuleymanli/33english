import { AppNav } from "@/components/app/AppNav";

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="min-h-dvh md:pl-60">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
        Skip to content
      </a>
      <AppNav />
      <main id="main" className="mx-auto max-w-4xl px-4 pb-28 pt-6 sm:px-6 md:pb-16 md:pt-10">
        {children}
      </main>
    </div>
  );
}
