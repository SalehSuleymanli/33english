import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = { robots: { index: true } };

/** Games run full-screen, without the app navigation, like a real game. */
export default function PlayLayout({ children }: { children: ReactNode }) {
  return <div className="game-surface min-h-dvh">{children}</div>;
}
