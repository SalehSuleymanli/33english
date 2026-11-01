import { Fragment } from "react";

/** Renders **highlighted** grammar words in the current frame color. Content is authored, not user input. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <strong key={i} className="text-f font-bold">
            {p.slice(2, -2)}
          </strong>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}

/** Strip markup (for speech, plain-text contexts). */
export const plain = (s: string) => s.replace(/\*\*/g, "");
