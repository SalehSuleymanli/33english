/** Shared class recipes, so buttons and surfaces stay consistent. */
export const btn = {
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-bold transition-[background,color,box-shadow,transform] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45",
  size: { sm: "h-9 px-4 text-sm", md: "h-11 px-5", lg: "h-13 px-7 text-lg" },
  primary: "bg-ink text-paper hover:bg-ink-2",
  secondary: "bg-surface text-ink border border-line-strong hover:border-ink",
  ghost: "text-ink hover:bg-surface-2",
  frame: "bg-f text-white hover:brightness-110 dark:text-paper",
};

export const button = (variant: "primary" | "secondary" | "ghost" | "frame" = "primary", size: "sm" | "md" | "lg" = "md") =>
  `${btn.base} ${btn.size[size]} ${btn[variant]}`;

export const card = "rounded-[var(--radius-card)] border border-line bg-surface";
export const eyebrow = "text-sm font-bold text-muted";
