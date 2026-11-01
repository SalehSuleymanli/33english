import type { Pattern, Slot, SlotRole } from "@/content/types";

/** Roles that carry the frame's grammar get the frame color. */
const KEY_ROLES: SlotRole[] = ["there", "be", "aux", "modal", "verb", "negation", "question"];

export function SlotChip({ slot, compact = false }: { slot: Slot; compact?: boolean }) {
  const key = KEY_ROLES.includes(slot.role);
  const subject = slot.role === "subject";
  return (
    <span className={`inline-flex flex-col gap-1 ${slot.optional ? "opacity-80" : ""}`}>
      <span
        className={[
          "inline-flex items-center rounded-xl px-3 font-serif",
          compact ? "h-9 text-base" : "h-12 text-lg sm:text-xl",
          key
            ? "bg-f-tint text-f font-semibold"
            : subject
              ? "bg-surface border-2 border-ink/80 text-ink"
              : `bg-surface border border-line-strong text-ink-2 ${slot.optional ? "border-dashed" : ""}`,
        ].join(" ")}
      >
        {slot.text ?? "…"}
      </span>
      <span className={`px-1 text-xs ${key ? "text-f font-bold" : "text-muted"}`}>
        {slot.label}
        {slot.optional ? " (optional)" : ""}
      </span>
    </span>
  );
}

export function StructureDiagram({ pattern, compact }: { pattern: Pattern; compact?: boolean }) {
  return (
    <figure className="flex flex-col gap-2">
      <figcaption className="text-sm font-bold text-muted">{pattern.name}</figcaption>
      <div className="flex flex-wrap items-start gap-x-2 gap-y-3" role="img" aria-label={`${pattern.name}: ${pattern.slots.map((s) => `${s.label} (${s.text ?? ""})`).join(", then ")}`}>
        {pattern.slots.map((s, i) => (
          <SlotChip key={i} slot={s} compact={compact} />
        ))}
      </div>
    </figure>
  );
}
