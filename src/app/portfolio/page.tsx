import type { Metadata } from "next";
import PortfolioPageView from "@/components/pages/PortfolioPage/PortfolioPageView";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected weddings and events from The Hue Story — photography-led, editorial celebrations.",
};

export default function PortfolioPage() {
  return <PortfolioPageView />;
}
