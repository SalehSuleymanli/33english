/** Shared class recipes, so buttons and surfaces stay consistent. */
export const btn = {
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold tracking-[-0.01em] transition-[background,color,box-shadow,transform] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45",
  size: { sm: "h-9 px-4 text-sm", md: "h-11 px-6", lg: "h-14 px-8 text-lg" },
  primary: "bg-accent text-white hover:bg-accent-hover",
  secondary: "bg-surface-2 text-ink hover:bg-line",
  ghost: "text-ink hover:bg-surface-2",
  frame: "bg-f text-white hover:brightness-110 dark:text-paper",
};

export const button = (variant: "primary" | "secondary" | "ghost" | "frame" = "primary", size: "sm" | "md" | "lg" = "md") =>
  `${btn.base} ${btn.size[size]} ${btn[variant]}`;

export const card = "rounded-[var(--radius-card)] border border-transparent bg-surface shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:border-line";
export const eyebrow = "text-sm font-bold text-muted";
