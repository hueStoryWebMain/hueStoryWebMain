"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ABOUT_HOME_IMAGES, LOGOS, ROUTES, SITE_NAME } from "@/lib/constants";

/**
 * AboutHeroLegacy — archived editorial about band (pre–font-pairing).
 * Kept for reference; not mounted on the live homepage.
 * New About home section will be redesigned separately as AboutHomeTHS.
 *
 * Fonts locked to original system: Silk Serif · Gallient · Raleway (CTA chrome)
 */
export default function AboutHeroLegacy() {
  useEffect(() => {
    document.body.style.overflow = "";
  }, []);

  return (
    <section
      className="relative z-10 w-full overflow-x-clip bg-base"
      aria-labelledby="about-hero-legacy-heading"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center px-5 pt-14 text-center sm:px-8 sm:pt-20 md:px-8 md:pt-28 lg:px-12">
        <h2
          id="about-hero-legacy-heading"
          className="font-silk about-reveal max-w-4xl text-[25px] leading-[1.2] font-light tracking-[0.01em] text-[#FCFBF6] lowercase sm:text-[30px] sm:leading-[1.18] md:text-[46px] md:leading-[1.15] lg:text-[54px]"
        >
          <span className="block">
            <em className="font-[200] italic">intentional</em> planning,{" "}
            <em className="font-[200] italic">editorial</em>
          </span>
          <span className="block">
            vision, <em className="font-[200] italic">seamless</em> days,
          </span>
          <span className="block">
            <em className="font-[200] italic">unforgettable</em> hue
          </span>
        </h2>

        <div
          className="about-reveal mt-7 h-px w-20 origin-center bg-bare/45 sm:mt-10 sm:w-28 md:mt-12 md:w-40"
          style={{ animationDelay: "0.08s" }}
          aria-hidden="true"
        />

        <p
          className="font-silk about-reveal mt-7 max-w-2xl text-[13px] leading-[1.7] font-[200] italic text-[#FCFBF6]/90 sm:mt-10 sm:text-[15px] sm:leading-[1.75] md:mt-12 md:text-[17px]"
          style={{ animationDelay: "0.14s" }}
        >
          The Hue Story designs and produces elegant, timeless destination
          weddings and private events across the globe. With a decade of
          meticulous attention to detail and a passion for turning culture and
          place into lived experience, we take a hands-on approach to crafting
          celebrations that exceed expectation. Our considered approach,
          inventive design, and flawless execution create unforgettable
          occasions that leave a lasting impression on our clients and their
          guests.
        </p>

        <p
          className="font-display about-reveal mt-12 text-center text-[22px] tracking-[0.08em] text-[#FCFBF6] uppercase sm:mt-14 sm:text-[28px] md:mt-16 md:text-[34px] lg:text-[40px]"
          style={{ animationDelay: "0.22s" }}
        >
          Authored
        </p>
      </div>

      {/* Editorial collage */}
      <div className="relative overflow-x-clip px-4 pb-2 pt-10 sm:px-8 sm:pb-3 sm:pt-14 md:px-8 md:pb-4 md:pt-16 lg:px-12">
        <div className="relative mx-auto w-full max-w-6xl">
          <div className="relative mx-auto h-[min(118vw,420px)] sm:h-[min(95vw,560px)] md:h-[min(78vw,900px)]">
            <div
              className="pointer-events-none absolute top-[26%] right-0 z-0 w-[48%] overflow-hidden sm:right-[-2%] md:right-[-4%]"
              aria-hidden
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={ABOUT_HOME_IMAGES.landscape}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, 48vw"
                  className="object-cover object-center opacity-45"
                />
                <div className="absolute inset-0 bg-base/70" />
              </div>
            </div>

            <figure className="absolute top-[12%] left-0 z-10 w-[34%]">
              <div
                className="pointer-events-none absolute left-0 top-0 z-40 h-12 w-12 -translate-x-[55%] -translate-y-[55%] sm:h-16 sm:w-16 md:h-24 md:w-24 lg:h-28 lg:w-28"
                aria-hidden
              >
                <Image
                  src={LOGOS.emblem}
                  alt=""
                  width={160}
                  height={160}
                  className="h-full w-full object-contain mix-blend-screen"
                />
                <span className="sr-only">{SITE_NAME} emblem</span>
              </div>
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={ABOUT_HOME_IMAGES.couple1}
                  alt="A couple on their wedding day"
                  fill
                  sizes="(max-width: 768px) 34vw, 34vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute top-full right-0 z-[5] mt-2 h-px bg-bare/40 sm:mt-3 md:mt-4"
                style={{ width: "100vw" }}
              />
            </figure>

            <figure className="absolute top-[2%] left-[40%] z-20 w-[26%]">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={ABOUT_HOME_IMAGES.outsideDecor}
                  alt="Outdoor celebration décor"
                  fill
                  sizes="(max-width: 768px) 26vw, 26vw"
                  className="object-cover"
                />
              </div>
            </figure>

            <figure className="absolute top-[48%] left-[46%] z-30 w-[24%]">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={ABOUT_HOME_IMAGES.decorCloseup}
                  alt="Table setting detail"
                  fill
                  sizes="(max-width: 768px) 24vw, 24vw"
                  className="object-cover"
                />
              </div>
            </figure>

            <figure className="absolute top-[16%] right-[1%] z-20 w-[26%]">
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-full left-0 z-[5] mb-2 h-px bg-bare/40 sm:mb-3 md:mb-4"
                style={{ width: "100vw" }}
              />
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={ABOUT_HOME_IMAGES.couple2}
                  alt="A couple walking together"
                  fill
                  sizes="(max-width: 768px) 26vw, 26vw"
                  className="object-cover"
                />
              </div>
            </figure>
          </div>
        </div>
      </div>

      {/* Vertical rule + offset-frame portfolio CTA */}
      <div className="flex flex-col items-center px-5 pt-0 pb-16 sm:pb-20 md:pb-24">
        <div
          aria-hidden
          className="h-10 w-px bg-bare/50 sm:h-14 md:h-16"
        />

        <div className="mt-5 sm:mt-6">
          <Link
            href={ROUTES.PORTFOLIO}
            className="group relative inline-block"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-1.5 -translate-y-1.5 border border-cream/55 transition-colors duration-300 group-hover:border-cream/80 sm:-translate-x-2 sm:-translate-y-2"
            />
            <span className="relative flex flex-wrap items-center justify-center gap-x-2 gap-y-1 bg-bare px-5 py-3.5 transition-colors duration-300 group-hover:bg-bare/90 sm:gap-x-2.5 sm:px-8 sm:py-4 md:px-10">
              <span className="font-raleway text-[10px] font-medium tracking-[0.24em] text-ink uppercase sm:text-[11px] md:text-xs">
                Explore our
              </span>
              <span className="font-silk text-[15px] font-[200] italic text-ink sm:text-[17px] md:text-[19px]">
                Portfolio
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
