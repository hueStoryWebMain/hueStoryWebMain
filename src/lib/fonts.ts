import { Monsieur_La_Doulaise, Poppins, Raleway } from "next/font/google";
import localFont from "next/font/local";

/**
 * Font system — client pairing comparison
 * Pairing 1 (local): Cammron · Rexton · Frontage · Collingethon
 * Pairing 2: Florian · Poppins 300 · Monsieur La Doulaise
 * Pairing 3 (legacy): Gallient title · Silk Serif · Raleway · Fresh Script
 */

/* ——— Pairing 1 ——— */
export const cammron = localFont({
  src: "../../public/fonts/pairing1/CammronDemo.otf",
  weight: "400",
  style: "normal",
  variable: "--font-cammron",
  display: "swap",
});

export const rexton = localFont({
  src: "../../public/fonts/pairing1/Rexton Regular.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-rexton",
  display: "swap",
});

export const frontage = localFont({
  src: "../../public/fonts/pairing1/Frontage-Regular.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-frontage",
  display: "swap",
});

export const collingethon = localFont({
  src: "../../public/fonts/pairing1/Collingethon.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-collingethon",
  display: "swap",
});

/* ——— Pairing 2 ——— */
export const florian = localFont({
  src: "../../public/fonts/pairing2/Florian W05 Regular.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-florian",
  display: "swap",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-poppins",
  display: "swap",
});

export const monsieur = Monsieur_La_Doulaise({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-monsieur",
  display: "swap",
});

/* ——— Legacy (optional accents until sections are redesigned) ——— */
export const silkSerif = localFont({
  src: [
    {
      path: "../../public/fonts/SilkSerif-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/SilkSerif-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/SilkSerif-ExtraLightItalic.ttf",
      weight: "200",
      style: "italic",
    },
  ],
  variable: "--font-silk-serif",
  display: "swap",
});

export const freshScript = localFont({
  src: "../../public/fonts/FreshScript.otf",
  weight: "400",
  style: "normal",
  variable: "--font-fresh-script",
  display: "swap",
});

export const gallient = localFont({
  src: "../../public/fonts/Gallient.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-gallient",
  display: "swap",
});

export const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-raleway",
  display: "swap",
});

export const fontVariables = [
  silkSerif.variable,
  raleway.variable,
  freshScript.variable,
  gallient.variable,
  cammron.variable,
  rexton.variable,
  frontage.variable,
  collingethon.variable,
  florian.variable,
  poppins.variable,
  monsieur.variable,
].join(" ");
