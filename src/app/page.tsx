import type { Metadata } from "next";
import HomePageView from "@/components/pages/HomePage/HomePageView";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE_NAME} | Luxury Editorial Weddings`,
  description: `${SITE_TAGLINE}. Quiet, intentional planning led by photography and colour.`,
};

/** Site home — font pairing 1 */
export default function HomePage() {
  return <HomePageView />;
}
