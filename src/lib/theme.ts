/**
 * Round 04 — Deep Editorial (Sep 2026)
 * Preferred lock: Slate Blue. Fonts unchanged.
 * Warm white #FCFBF6 is never the primary site background.
 */

export const BASE_OPTIONS = {
  slate: "#5C6E73",
  forest: "#2D3A31",
  taupe: "#A2968E",
  burgundy: "#4A1624",
} as const;

export type BaseOption = keyof typeof BASE_OPTIONS;

/** Active canvas — Slate Blue (first preference) */
export const ACTIVE_BASE: BaseOption = "slate";

export const colors = {
  /** Deep site canvas (~75–80%) — Slate Blue */
  base: BASE_OPTIONS.slate,
  forest: BASE_OPTIONS.forest,
  taupe: BASE_OPTIONS.taupe,
  burgundy: BASE_OPTIONS.burgundy,

  /** Type + filled/outlined buttons on dark bases */
  cream: "#F1EDE7",
  /** Alternate light */
  lace: "#F3EAE2",
  /** Muted captions / soft support */
  bare: "#E0CDC9",

  /** Light section band paired with Slate Blue */
  mist: "#E2E9F5",
  /** Light section band for Forest / Taupe / Burgundy */
  sheet: "#F2EFE9",

  /** Brand rose — active nav, links, script only */
  blush: "#D8A2A6",
  /** Soft Ink — type on light section bands (and Warm Taupe base) */
  ink: "#2C2723",
  /** Logo mark only */
  logoRose: "#CD888D",
  /** Do not use as primary canvas */
  warmWhite: "#FCFBF6",

  /* ——— Extended palette (named lock) ——— */
  oxblood: "#41111A",
  wedgewoodBlue: "#A5BDD5",
  vellum: "#EAE0BC",
  milkGlass: "#F7F4F0",
  fieldstone: "#AC9F90",
  cameo: "#D8BCAD",
} as const;

/** Section ground for the active base */
export const sectionBand =
  ACTIVE_BASE === "slate" ? colors.mist : colors.sheet;

export const typeScale = {
  h1: { desktop: "56–72px", mobile: "32–40px" },
  h2: { desktop: "32–40px", mobile: "24–28px" },
  h3: { desktop: "20–24px", mobile: "18px" },
  pullQuote: { desktop: "22–28px", mobile: "18–20px" },
  body: { desktop: "16–17px", mobile: "15px", lineHeight: 1.7 },
  caption: { desktop: "12–13px", mobile: "12px" },
  nav: { desktop: "10–12px", mobile: "10–11px", tracking: "0.2–0.28em" },
  script: { desktop: "28–40px", mobile: "22–28px" },
} as const;

export const space = {
  buttonInset: 8,
  paragraph: 16,
  block: 32,
  section: 64,
} as const;
