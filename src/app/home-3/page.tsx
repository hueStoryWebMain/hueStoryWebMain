import type { Metadata } from "next";
import HomePageView from "@/components/pages/HomePage/HomePageView";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Home 3 · Legacy Fonts | ${SITE_NAME}`,
  description: `${SITE_TAGLINE}. Legacy fonts — Gallient title, Silk Serif, Raleway, Fresh Script.`,
};

export default function Home3Page() {
  return <HomePageView pairing={3} />;
}
