import Image from "next/image";
import { FEATURED_PRESS } from "@/lib/constants";

/**
 * Features + Awards — Pale Slate press band
 * Editorial recognition line + publication marks
 */
export default function FeaturesAwards() {
  return (
    <section
      className="relative z-10 w-full bg-mist text-ink"
      aria-label="Features and awards"
    >
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12 md:px-8 md:py-12 lg:px-12">
        {/* Title + logos row */}
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-center md:gap-0 md:text-left">
          <div className="shrink-0 md:max-w-[14rem] md:pr-5 lg:max-w-none lg:pr-10">
            <h2 className="font-heading text-[15px] font-light tracking-[0.14em] text-ink uppercase sm:text-[16px] md:text-[16px] lg:text-[17px]">
              Features + Awards
            </h2>
            <p className="font-script mt-1.5 text-[22px] leading-snug text-ink/75 normal-case sm:mt-2 sm:text-[26px] md:text-[24px] lg:text-[28px]">
              Press Publications and Recognitions
            </p>
          </div>

          <div className="h-px w-10 bg-ink/15 md:hidden" aria-hidden />
          <div
            className="hidden h-12 w-px shrink-0 bg-ink/15 md:block"
            aria-hidden
          />

          <div className="flex w-full min-w-0 flex-1 flex-col items-center gap-8 md:flex-row md:flex-wrap md:justify-center md:gap-x-6 md:gap-y-5 md:pl-5 lg:flex-nowrap lg:justify-evenly lg:gap-12 lg:pl-10">
            {FEATURED_PRESS.map((item) => (
              <div
                key={item.src}
                className="relative h-12 w-40 shrink-0 sm:h-14 sm:w-44 md:h-12 md:w-32 lg:h-12 lg:w-40"
              >
                <Image
                  src={item.src}
                  alt={item.name}
                  fill
                  sizes="(max-width: 1024px) 128px, 176px"
                  className="object-contain object-center opacity-80"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Editorial recognition */}
        <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center sm:mt-12 md:mt-14">
          <div className="mb-6 h-px w-12 bg-ink/20 sm:mb-7 sm:w-14" aria-hidden />
          <p className="font-body text-center text-[12px] leading-[1.75] font-light tracking-[0.01em] text-ink/85 sm:text-[13px] md:text-[14px] md:leading-[1.7]">
            Entrusted by prominent and discerning families around the world, for
            occasions where refined taste and discretion are simply assumed.
          </p>
        </div>
      </div>
    </section>
  );
}
