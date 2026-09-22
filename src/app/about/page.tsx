import type { Metadata } from "next";
import AboutPageView from "@/components/pages/AboutPage/AboutPageView";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Roshini Kurup and The Hue Story — a luxury editorial wedding and event planning practice.",
};

export default function AboutPage() {
  return <AboutPageView />;
}
