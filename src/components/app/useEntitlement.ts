"use client";
import { useEffect, useState } from "react";
import { useLearner } from "@/lib/learner/store";

export type Entitlement = { signedIn: boolean; premium: boolean; plan: string | null; status: string | null; periodEnd: string | null; cancelAtPeriodEnd: boolean; devUnlock: boolean };

/** Display-only view of the viewer's access. The server enforces access independently. */
export function useEntitlement() {
  const { user } = useLearner();
  const [ent, setEnt] = useState<Entitlement | null>(null);
  useEffect(() => {
    let alive = true;
    fetch("/api/entitlement", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => alive && setEnt(d))
      .catch(() => alive && setEnt(null));
    return () => {
      alive = false;
    };
  }, [user?.id]);
  return ent;
}
