import type { Metadata } from "next";
import { PageIntro } from "@/components/site/PageIntro";
import { PricingTable } from "@/components/site/PricingTable";

export const metadata: Metadata = { title: "Pricing", description: "Start free. Upgrade for the full 33-day course." };

export default function PricingPage() {
  return (
    <>
      <PageIntro title="Start free. Go further when you're ready.">
        <p>The first week is free and complete — three full frames, the Sentence Lab and review. Premium unlocks the whole course.</p>
      </PageIntro>
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <PricingTable />
        <p className="mt-6 text-sm text-muted">
          Prices in US dollars. Taxes may apply depending on where you live. You can cancel at any time and keep access until the end of the period
          you paid for.
        </p>
      </div>
    </>
  );
}
