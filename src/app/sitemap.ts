import type { MetadataRoute } from "next";
import { PORTFOLIO_EVENTS, SITE_URL } from "@/lib/constants";

const routes = [
  "",
  "/portfolio",
  "/about",
  "/inquire",
  ...PORTFOLIO_EVENTS.map((event) => `/portfolio/${event.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
