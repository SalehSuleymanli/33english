import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { button } from "@/components/ui/styles";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-4 py-16">
      <Link href="/" aria-label="33English home">
        <Logo />
      </Link>
      <p className="specimen mt-10 text-[2rem] leading-tight">
        There is <span className="text-bad">no</span> page here.
      </p>
      <p className="mt-3 text-ink-2">The link may be wrong, or the page may have moved.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/today" className={button("primary")}>
          Go to Today
        </Link>
        <Link href="/curriculum" className={button("secondary")}>
          See all 33 days
        </Link>
      </div>
    </main>
  );
}
