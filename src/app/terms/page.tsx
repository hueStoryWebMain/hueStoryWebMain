import type { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms and conditions for using The Hue Story website and services.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms & Conditions" />
      <section className="section-y px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-body text-[15px] font-light leading-[1.7] text-bare md:text-base">
            Our terms and conditions are being prepared. For any questions,
            please write to{" "}
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
