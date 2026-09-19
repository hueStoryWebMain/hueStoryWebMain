import type { Config } from "tailwindcss";

/**
 * Tailwind v4 primarily reads tokens from src/styles/globals.css `@theme`.
 * Bridge for tooling — keep in sync with Round 04 Slate Blue system.
 */
const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#5C6E73",
        forest: "#2D3A31",
        taupe: "#A2968E",
        burgundy: "#4A1624",
        cream: "#F1EDE7",
        lace: "#F3EAE2",
        bare: "#E0CDC9",
        mist: "#E2E9F5",
        sheet: "#F2EFE9",
        blush: "#D8A2A6",
        ink: "#2C2723",
        "logo-rose": "#CD888D",
        background: "#5C6E73",
        foreground: "#F1EDE7",
        section: "#E2E9F5",
        accent: {
          DEFAULT: "#D8A2A6",
          hover: "#CD888D",
        },
        muted: "#E0CDC9",
        border: "#E0CDC9",
      },
      fontFamily: {
        heading: ["var(--font-silk-serif)", "Times New Roman", "Times", "serif"],
        body: ["var(--font-raleway)", "ui-sans-serif", "system-ui", "sans-serif"],
        script: ["var(--font-fresh-script)", "Apple Chancery", "cursive"],
      },
      letterSpacing: {
        nav: "0.24em",
        eyebrow: "0.28em",
      },
    },
  },
  plugins: [],
};

export default config;
