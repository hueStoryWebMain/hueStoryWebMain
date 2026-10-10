import type { Metadata } from "next";
import InquireView from "@/components/pages/InquirePage/InquireView";

export const metadata: Metadata = {
  title: "Inquire",
  description:
    "Begin your story with The Hue Story. Inquire about luxury editorial weddings and events.",
};

export default function InquirePage() {
  return <InquireView />;
}
