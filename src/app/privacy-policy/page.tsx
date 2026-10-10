import type { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How The Hue Story collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      <section className="section-y px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-body text-[15px] font-light leading-[1.7] text-bare md:text-base">
            Our privacy policy is being prepared. For any questions about how
            we handle your information, please write to{" "}
            <a href="mailto:hello@thehuestory.com" className="underline underline-offset-4">
              hello@thehuestory.com
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
