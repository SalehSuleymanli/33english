import type { Metadata } from "next";
import { PageIntro } from "@/components/site/PageIntro";
import { LegalDraftNotice } from "@/components/site/LegalNotice";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = { title: "Privacy policy" };

export default function PrivacyPage() {
  return (
    <>
      <PageIntro title="Privacy policy" />
      <article className="mx-auto max-w-3xl px-4 sm:px-6 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_p]:mt-3 [&_li]:mt-1 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6 text-ink-2">
        <LegalDraftNotice />
        <h2>What we collect</h2>
        <ul>
          <li>Account details: your email address and, if you add one, a display name.</li>
          <li>Learning data: lessons started and completed, your answers to exercises, review schedule, saved words and bookmarks, and settings such as your daily goal.</li>
          <li>Subscription data: your plan and its status, received from our payment provider. We never see or store your full card details.</li>
          <li>Rewards and games: your XP, level, streak, badges, completed speaking topics, and game results (puzzles solved, battle stages cleared and stars).</li>
        </ul>
        <h2>Without an account</h2>
        <p>If you use {BRAND.name} without signing in, your progress is stored only in your browser on this device. It is not sent to us.</p>
        <h2>Speech features</h2>
        <p>
          Listening uses your device&apos;s built-in voices. Speaking practice uses your browser&apos;s speech recognition; depending on your browser,
          the audio may be processed by the browser maker (for example Google or Apple) under their privacy terms. {BRAND.name} does not upload
          or store your voice. If you record yourself in Speaking practice, the recording stays in your browser and disappears when you leave the page.
        </p>
        <h2>How we use your data</h2>
        <p>To run the course, save and sync your progress, schedule reviews, show your progress, manage your subscription, and respond to support requests. We do not sell your data.</p>
        <h2>Service providers</h2>
        <p>We use Supabase for accounts and data storage, a hosting provider to run the website, and a payment provider to process subscriptions. They process data on our behalf.</p>
        <h2>Your rights</h2>
        <p>You can view and change your settings at any time, and delete your learning data from the settings page. To delete your account entirely, contact {BRAND.supportEmail}.</p>
        <h2>Contact</h2>
        <p>{BRAND.supportEmail}</p>
      </article>
    </>
  );
}
