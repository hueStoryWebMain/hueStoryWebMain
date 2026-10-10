import type { Metadata } from "next";
import HomePageView from "@/components/pages/HomePage/HomePageView";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE_NAME} | Luxury Editorial Weddings`,
  description:
    "Experiential event and space design. The Hue Story designs multi-day destination weddings and private events for clients across the globe.",
};

/** Site home — font pairing 1 */
export default function HomePage() {
  return <HomePageView />;
}
