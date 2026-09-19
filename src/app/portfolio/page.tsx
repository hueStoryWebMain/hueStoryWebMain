import type { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import PortfolioPlaceholder from "@/components/pages/PortfolioPage/PortfolioPlaceholder";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected weddings and events from The Hue Story — photography-led, editorial celebrations.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title="Portfolio"
        subtitle="Weddings and events with a palette of their own."
      />
      <PortfolioPlaceholder />
    </>
  );
}
