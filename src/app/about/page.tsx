import type { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import AboutPlaceholder from "@/components/pages/AboutPage/AboutPlaceholder";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Roshini Kurup and The Hue Story — a luxury editorial wedding and event planning practice.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="The studio"
        title="About"
        subtitle="A quiet, intentional practice — colour chosen once, carried through every detail."
      />
      <AboutPlaceholder />
    </>
  );
}
