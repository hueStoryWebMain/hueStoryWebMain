import type { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import ServicesPlaceholder from "@/components/pages/ServicesPage/ServicesPlaceholder";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Wedding and event planning services from The Hue Story — editorial, minimal, photography-led.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="How we help"
        title="Services"
        subtitle="From first conversation to the last candle — planning with a refined, calm hand."
      />
      <ServicesPlaceholder />
    </>
  );
}
