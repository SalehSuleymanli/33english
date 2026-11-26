import { AppNav } from "@/components/app/AppNav";

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="min-h-dvh md:pl-64">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
        Skip to content
      </a>
      <AppNav />
      <main id="main" className="mx-auto max-w-5xl px-4 pb-28 pt-6 sm:px-6 md:px-10 md:pb-20 md:pt-12">
        {children}
      </main>
    </div>
  );
}
