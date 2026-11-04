/** Helpers for tagging phrases with their frame in grammar-rich answers. */
export const ex = (phrase: string) => ({ frame: "existence" as const, phrase });
export const st = (phrase: string) => ({ frame: "states" as const, phrase });
export const ac = (phrase: string) => ({ frame: "actions" as const, phrase });
export const mo = (phrase: string) => ({ frame: "modals" as const, phrase });
export const po = (phrase: string) => ({ frame: "possession" as const, phrase });
export const pa = (phrase: string) => ({ frame: "passive" as const, phrase });

