import { BRAND } from "@/lib/brand";

/** The mark: three lines of slots, like a sentence broken into its frame. One slot carries the verb. */
export function LogoMark({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect x="3" y="5" width="13" height="6" rx="3" fill="currentColor" />
      <rect x="18" y="5" width="11" height="6" rx="3" fill="currentColor" opacity="0.45" />
      <rect x="3" y="13" width="7" height="6" rx="3" fill="currentColor" opacity="0.45" />
      <rect x="12" y="13" width="17" height="6" rx="3" fill="var(--f-actions)" />
      <rect x="3" y="21" width="17" height="6" rx="3" fill="currentColor" />
      <rect x="22" y="21" width="7" height="6" rx="3" fill="currentColor" opacity="0.45" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 text-ink ${className}`}>
      <LogoMark />
      <span className="text-[1.3rem] font-bold tracking-[-0.02em] leading-none">{BRAND.name.toLowerCase()}</span>
    </span>
  );
}
