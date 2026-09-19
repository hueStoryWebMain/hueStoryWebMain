import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ROUTES, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE_NAME} | Luxury Editorial Weddings`,
  description: `${SITE_TAGLINE}. Quiet, intentional planning led by photography and colour.`,
};

/** Default entry — Pairing 1 */
export default function HomePage() {
  redirect(ROUTES.HOME_1);
}
