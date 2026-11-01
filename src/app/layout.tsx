import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BRAND } from "@/lib/brand";
import { SITE_URL } from "@/lib/env";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${BRAND.name} — ${BRAND.tagline}`, template: `%s · ${BRAND.name}` },
  description: BRAND.description,
  openGraph: { title: `${BRAND.name} — ${BRAND.tagline}`, description: BRAND.description, type: "website" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7fb" },
    { media: "(prefers-color-scheme: dark)", color: "#131626" },
  ],
};

// Applies the saved (or system) theme before first paint, so there is no flash.
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('structa:theme')||'system';var d=t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.dataset.theme=d?'dark':'light';}catch(e){document.documentElement.dataset.theme='light';}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-dvh">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
