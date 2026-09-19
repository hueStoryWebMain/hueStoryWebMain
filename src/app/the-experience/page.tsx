import type { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import ExperiencePlaceholder from "@/components/pages/TheExperiencePage/ExperiencePlaceholder";

export const metadata: Metadata = {
  title: "The Experience",
  description:
    "What it feels like to plan with The Hue Story — from vision to celebration day.",
};

export default function TheExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="The process"
        title="The Experience"
        subtitle="A seamless journey from first conversation to your perfect day."
      />
      <ExperiencePlaceholder />
    </>
  );
}
