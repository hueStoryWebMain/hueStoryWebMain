import type { Metadata } from "next";
import HomePageView from "@/components/pages/HomePage/HomePageView";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Home 2 · Font Pairing | ${SITE_NAME}`,
  description: `${SITE_TAGLINE}. Font pairing 2 — Florian, Poppins Light, Monsieur La Doulaise.`,
};

export default function Home2Page() {
  return <HomePageView pairing={2} />;
}
