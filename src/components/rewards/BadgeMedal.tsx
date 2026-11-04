import type { Badge } from "@/lib/game/rewards";

const GROUP_COLOR: Record<Badge["group"], [string, string]> = {
  Learning: ["var(--f-states)", "var(--f-existence)"],
  Games: ["var(--f-actions)", "var(--f-possession)"],
  Speaking: ["var(--f-modals)", "var(--f-passive)"],
  Habits: ["var(--f-possession)", "var(--f-actions)"],
};

const GLYPH: Record<Badge["group"], string> = {
  Learning: "M8 7h10a2 2 0 0 1 2 2v9H10a2 2 0 0 1-2-2V7Zm0 9a2 2 0 0 1 2-2h10",
  Games: "M12 4l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 16.4 7.2 18.9l.9-5.4L4.2 9.7l5.4-.8L12 4Z",
  Speaking: "M12 4a3 3 0 0 1 3 3v5a3 3 0 1 1-6 0V7a3 3 0 0 1 3-3Zm-6 8a6 6 0 0 0 12 0M12 18v3",
  Habits: "M12 3c1 3 4 4.5 4 8.5a4 4 0 1 1-8 0c0-1.8.8-3 1.8-4 .2 1.4.9 2.3 1.8 2.6C11 7.6 11.3 5 12 3Z",
};

/** A small medal. Colour comes from the frame palette, so badges feel native to the method. */
export function BadgeMedal({ group, unlocked, size = 56 }: { group: Badge["group"]; unlocked: boolean; size?: number }) {
  const [a, b] = GROUP_COLOR[group];
  const id = `m-${group}-${unlocked ? 1 : 0}`;
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden className={unlocked ? "" : "opacity-45 grayscale"}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      <path d="M24 2l5.2 3.6 6.3-.2 2.2 5.9 5 3.9-1.8 6 1.8 6-5 3.9-2.2 5.9-6.3-.2L24 46l-5.2-3.6-6.3.2-2.2-5.9-5-3.9 1.8-6-1.8-6 5-3.9 2.2-5.9 6.3.2L24 2Z" fill={`url(#${id})`} />
      <circle cx="24" cy="24" r="13.5" fill="var(--surface)" opacity="0.92" />
      <g transform="translate(12 12)" fill="none" stroke={a} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={GLYPH[group]} fill={group === "Games" || group === "Habits" ? a : "none"} />
      </g>
    </svg>
  );
}
