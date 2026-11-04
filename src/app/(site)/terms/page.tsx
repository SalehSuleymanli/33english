import type { Metadata } from "next";
import { PageIntro } from "@/components/site/PageIntro";
import { LegalDraftNotice } from "@/components/site/LegalNotice";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = { title: "Terms of service" };

export default function TermsPage() {
  return (
    <>
      <PageIntro title="Terms of service" />
      <article className="mx-auto max-w-3xl px-4 sm:px-6 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_p]:mt-3 text-ink-2">
        <LegalDraftNotice />
        <h2>The service</h2>
        <p>{BRAND.name} provides online English lessons and practice. We work to keep the content accurate, but we do not guarantee any particular result, test score or level of fluency.</p>
        <h2>Your account</h2>
        <p>Keep your login details safe. You are responsible for activity on your account. You must be old enough to agree to these terms where you live.</p>
        <h2>Subscriptions</h2>
        <p>Premium is billed monthly or yearly in advance through our payment provider, and renews automatically until you cancel. You can cancel at any time; access continues until the end of the paid period. Refunds follow the payment provider&apos;s policy and the law where you live.</p>
        <h2>Acceptable use</h2>
        <p>Don&apos;t copy or resell the course content, interfere with the service, or try to access other people&apos;s data.</p>
        <h2>Content</h2>
        <p>The course content and the 33English method belong to {BRAND.name} and its founder. You may use them for your own learning.</p>
        <h2>Changes</h2>
        <p>We may update these terms. If changes are significant, we will tell you before they take effect.</p>
        <h2>Contact</h2>
        <p>{BRAND.supportEmail}</p>
      </article>
    </>
  );
}
