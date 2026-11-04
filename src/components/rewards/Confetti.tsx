const COLORS = ["var(--f-existence)", "var(--f-states)", "var(--f-actions)", "var(--f-modals)", "var(--f-possession)", "var(--f-passive)"];

/** Pure-CSS confetti in the six frame colours. Hidden for reduced-motion users by the global rule. */
export function Confetti({ count = 36 }: { count?: number }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {Array.from({ length: count }, (_, i) => {
        const left = (i * 37) % 100;
        const delay = (i % 9) * 0.09;
        const dur = 1.6 + ((i * 13) % 10) / 10;
        const size = 6 + (i % 4) * 2;
        return (
          <span
            key={i}
            className="confetti-bit absolute top-[-20px] block rounded-[2px]"
            style={{ left: `${left}%`, width: size, height: size * 1.6, background: COLORS[i % COLORS.length], animationDelay: `${delay}s`, animationDuration: `${dur}s`, transform: `rotate(${i * 29}deg)` }}
          />
        );
      })}
    </div>
  );
}
