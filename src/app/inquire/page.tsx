import type { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import ContactPlaceholder from "@/components/pages/GetInTouchPage/ContactPlaceholder";

export const metadata: Metadata = {
  title: "Enquire",
  description:
    "Begin your story with The Hue Story — enquire about luxury editorial weddings and events.",
};

export default function GetInTouchPage() {
  return (
    <>
      <PageHeader
        eyebrow="Let's begin"
        title="Enquire"
        subtitle="Tell us about your celebration. We'll respond with care."
      />
      <ContactPlaceholder />
    </>
  );
}
