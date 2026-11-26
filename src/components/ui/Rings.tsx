/** Activity rings, Apple Watch style: each ring fills with a real progress value from 0 to 1. */
export type Ring = { label: string; value: number; text: string; from: string; to: string; track: string };

const SIZES = [94, 68, 42];

export function Rings({ rings, size = 200, className = "" }: { rings: Ring[]; size?: number; className?: string }) {
  const label = rings.map((r) => `${r.label}: ${r.text}`).join(", ");
  return (
    <svg width={size} height={size} viewBox="0 0 220 220" role="img" aria-label={label} className={`shrink-0 ${className}`}>
      <defs>
        {rings.map((r, i) => (
          <linearGradient key={i} id={`ring-${i}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={r.from} />
            <stop offset="1" stopColor={r.to} />
          </linearGradient>
        ))}
      </defs>
      {rings.slice(0, 3).map((r, i) => {
        const rad = SIZES[i];
        const c = 2 * Math.PI * rad;
        const v = Math.max(0, Math.min(1, r.value));
        return (
          <g key={i} transform="rotate(-90 110 110)">
            <circle cx="110" cy="110" r={rad} fill="none" stroke={r.track} strokeWidth="22" />
            {v > 0 && (
              <circle
                cx="110"
                cy="110"
                r={rad}
                fill="none"
                stroke={`url(#ring-${i})`}
                strokeWidth="22"
                strokeLinecap="round"
                strokeDasharray={`${Math.max(v * c, 0.1)} ${c}`}
                className="transition-[stroke-dasharray] duration-700 ease-out"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
