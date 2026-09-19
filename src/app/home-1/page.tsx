import type { Metadata } from "next";
import HomePageView from "@/components/pages/HomePage/HomePageView";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Home 1 · Font Pairing | ${SITE_NAME}`,
  description: `${SITE_TAGLINE}. Font pairing 1 — Cammron, Rexton, Frontage, Collingethon.`,
};

export default function Home1Page() {
  return <HomePageView pairing={1} />;
}
