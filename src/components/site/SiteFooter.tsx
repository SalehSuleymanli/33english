import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { BRAND } from "@/lib/brand";

const COLS = [
  { title: "Learn", links: [["/method", "The method"], ["/journey", "How the 33 days work"], ["/curriculum", "Curriculum"], ["/lab", "Sentence Lab"]] },
  { title: "Product", links: [["/pricing", "Pricing"], ["/faq", "FAQ"], ["/login", "Sign in"], ["/signup", "Create account"]] },
  { title: "Legal", links: [["/privacy", "Privacy policy"], ["/terms", "Terms of service"]] },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-3 text-sm text-muted">{BRAND.tagline} A 33-day method for building English sentences with confidence.</p>
        </div>
        {COLS.map((c) => (
          <div key={c.title}>
            <h2 className="text-sm font-bold">{c.title}</h2>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-muted">
              {c.links.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-ink">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-10 text-xs text-muted sm:px-6">© {BRAND.name}. Contact: {BRAND.supportEmail}</div>
    </footer>
  );
}
