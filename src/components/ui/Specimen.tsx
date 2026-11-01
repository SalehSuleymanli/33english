import type { Token } from "@/engine/build";

const KEY = new Set(["there", "be", "aux", "modal", "verb", "negation"]);

/** A sentence rendered with its grammar visible: frame-colored engine words, underlined subject. */
export function Specimen({ tokens, question, className = "" }: { tokens: Token[]; question?: boolean; className?: string }) {
  return (
    <p className={`specimen ${className}`}>
      {tokens.map((t, i) => (
        <span key={i}>
          <span
            className={
              KEY.has(t.role)
                ? "text-f font-semibold"
                : t.role === "subject" || t.role === "there"
                  ? "underline decoration-2 underline-offset-[0.2em] decoration-line-strong"
                  : ""
            }
          >
            {t.text}
          </span>
          {i < tokens.length - 1 ? " " : ""}
        </span>
      ))}
      {question ? "?" : "."}
    </p>
  );
}
