"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ROUTES, SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const IMAGES = {
  heroLeft: "/images/section-images/009_2500x3750.webp",
  heroRight: "/images/section-images/017_2500x3125.webp",
  gridLeft: "/images/section-images/027_2048x3078.webp",
  gridMid: "/images/section-images/020_2477x3647.webp",
  gridWide: "/images/section-images/008_2500x3688.webp",
} as const;

const PARAS: readonly { heading?: string; body: string }[] = [
  {
    body: "We believe every celebration should be built from moments that feel like magic: guests spellbound and moved, carrying it with them long after the last guest has gone home.",
  },
  {
    heading: "Two traditions, one language",
    body: "Every wedding begins with two people, the cultures, stories, and experiences they carry with them, and almost always, two traditions finding their way into one shared language. We build outward from there, texture upon texture, tradition upon tradition, sourcing flowers from Holland to Africa, chefs from Italy and France, and craftsmanship from India, until a celebration feels genuinely abundant.",
  },
  {
    heading: "The art of restraint",
    body: "Whether an occasion leans quiet or exuberant, the secret is the same: restraint, the discernment to know which detail earns its place, keeping richness from tipping into excess.",
  },
  {
    heading: "Friends of the house",
    body: "The truest measure of our work is what follows it: families who return for a second wedding, then a third, no longer clients but friends of the house.",
  },
];

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * PhilosophyHomeTHS — flush editorial · PHILOSOPHY copy · inquire · image grid
 */
export default function PhilosophyHomeTHS() {
  const sectionRef = useRef<HTMLElement>(null);
  const lowerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [lowerVisible, setLowerVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setVisible(true);
      setLowerVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = lowerRef.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setLowerVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLowerVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const fadeUp = (on: boolean, delay: string, dist = "1.1rem") =>
    ({
      opacity: on ? 1 : 0,
      transform: on ? "translate3d(0,0,0)" : `translate3d(0,${dist},0)`,
      transition: `opacity 0.9s ${EASE} ${delay}, transform 0.9s ${EASE} ${delay}`,
    }) as const;

  const fadeSide = (on: boolean, delay: string, dir: "left" | "right") =>
    ({
      opacity: on ? 1 : 0,
      transform: on
        ? "translate3d(0,0,0)"
        : `translate3d(${dir === "left" ? "-1.25rem" : "1.25rem"},0,0)`,
      transition: `opacity 1s ${EASE} ${delay}, transform 1s ${EASE} ${delay}`,
    }) as const;

  const imageReveal = (on: boolean, delay: string) =>
    ({
      opacity: on ? 1 : 0,
      transform: on ? "scale(1)" : "scale(1.08)",
      transition: `opacity 1.15s ${EASE} ${delay}, transform 1.35s ${EASE} ${delay}`,
    }) as const;

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full overflow-x-clip bg-[#FAF8F4]"
      aria-labelledby="philosophy-home-heading"
    >
      {/* ——— Belief row: left flush | copy | right ——— */}
      <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-12 md:items-stretch md:gap-3 lg:gap-4">
        <div
          className="relative aspect-[2/3] w-full overflow-hidden md:col-span-3 md:aspect-auto md:min-h-[520px] lg:min-h-[580px]"
          style={fadeSide(visible, "0.04s", "left")}
        >
          <div
            className="absolute inset-0 will-change-transform"
            style={imageReveal(visible, "0.04s")}
          >
            <Image
              src={IMAGES.heroLeft}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 28vw"
              className="object-cover object-[center_12%] sm:object-[center_15%]"
              priority
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center px-6 py-12 sm:px-8 md:col-span-5 md:px-6 md:py-14 lg:px-8 lg:py-16 xl:px-10">
          <div className="flex w-full flex-col items-center text-center md:items-start md:text-left">
            <p
              className="font-body text-[9px] font-normal tracking-[0.34em] text-ink/55 uppercase sm:text-[10px]"
              style={fadeUp(visible, "0.14s", "0.6rem")}
            >
              What we believe
            </p>

            <h2
              id="philosophy-home-heading"
              className="font-title mt-3 text-[34px] leading-[1.05] font-normal tracking-[0.08em] text-ink uppercase sm:mt-4 sm:text-[40px] md:text-[32px] lg:text-[38px] xl:text-[44px]"
              style={fadeUp(visible, "0.22s", "0.85rem")}
            >
              Philosophy
            </h2>

            <p
              className="font-silk mt-3 text-[17px] font-[300] leading-snug tracking-[0.01em] text-ink/75 italic normal-case sm:mt-4 sm:text-[19px] lg:text-[20px]"
              style={fadeUp(visible, "0.3s", "0.65rem")}
            >
              Where two stories become one.
            </p>

            <div className="mt-8 flex w-full flex-col items-center sm:mt-10 md:items-start">
              {PARAS.map((para, i) => (
                <div
                  key={para.body.slice(0, 24)}
                  className={cn(
                    "flex flex-col items-center md:items-start",
                    i > 0 && "mt-5 sm:mt-6",
                  )}
                  style={fadeUp(visible, `${0.42 + i * 0.1}s`, "0.75rem")}
                >
                  {para.heading ? (
                    <h3 className="font-silk mb-4 text-[20px] leading-snug font-[300] tracking-[0.01em] text-ink italic normal-case sm:mb-5 sm:text-[22px] lg:text-[24px]">
                      {para.heading}
                    </h3>
                  ) : null}
                  <p className="font-body text-[10px] leading-[2] font-normal tracking-[0.12em] text-ink/75 uppercase sm:text-[11.5px] lg:text-[12px]">
                    {para.body}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="mt-10 sm:mt-12"
              style={fadeUp(visible, "0.9s", "0.65rem")}
            >
              <Link
                href={ROUTES.CONTACT}
                className="group relative inline-block"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 translate-x-1.5 translate-y-1.5 border border-ink/35 transition-colors duration-300 group-hover:border-blush/70 sm:translate-x-2 sm:translate-y-2"
                />
                <span className="relative inline-flex items-baseline justify-center gap-x-2 border border-ink bg-transparent px-7 py-3 transition-colors duration-300 group-hover:border-blush/80 group-hover:bg-[color-mix(in_srgb,var(--color-blush)_22%,#FAF8F4)] sm:gap-x-2.5 sm:px-8 sm:py-3.5">
                  <span className="font-body text-[10px] leading-none font-medium tracking-[0.24em] text-ink uppercase transition-colors duration-300 sm:text-[11px]">
                    Inquire about
                  </span>
                  <span className="font-silk inline-block translate-y-[0.12em] text-[15px] leading-none font-[300] tracking-normal text-ink italic normal-case transition-colors duration-300 sm:text-[17px]">
                    your celebration
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div
          className="relative aspect-[4/5] w-full overflow-hidden md:col-span-4 md:aspect-auto md:min-h-[520px] lg:min-h-[580px]"
          style={fadeSide(visible, "0.12s", "right")}
        >
          <div
            className="absolute inset-0 will-change-transform"
            style={imageReveal(visible, "0.12s")}
          >
            <Image
              src={IMAGES.heroRight}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 34vw"
              className="object-cover object-[center_14%] sm:object-[center_18%]"
              priority
            />
          </div>
        </div>
      </div>

      {/* ——— Lower image grid ——— */}
      <div
        ref={lowerRef}
        className="mt-2 grid w-full grid-cols-1 items-start gap-2 sm:mt-3 sm:grid-cols-12 sm:gap-3 md:mt-4 md:gap-3 lg:mt-4 lg:gap-4"
      >
        <div
          className={cn(
            "relative aspect-[2/3] w-full overflow-hidden sm:col-span-3 sm:aspect-auto sm:h-[380px] md:h-[420px] lg:h-[460px]",
          )}
          style={fadeUp(lowerVisible, "0.05s", "1.4rem")}
        >
          <div
            className="absolute inset-0 will-change-transform"
            style={imageReveal(lowerVisible, "0.05s")}
          >
            <Image
              src={IMAGES.gridLeft}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, 25vw"
              className="object-cover object-[center_18%] sm:object-center"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:col-span-4 sm:gap-3">
          <div
            className="relative aspect-[2/3] w-full overflow-hidden sm:aspect-auto sm:h-[320px] md:h-[350px] lg:h-[380px]"
            style={fadeUp(lowerVisible, "0.16s", "1.4rem")}
          >
            <div
              className="absolute inset-0 will-change-transform"
              style={imageReveal(lowerVisible, "0.16s")}
            >
              <Image
                src={IMAGES.gridMid}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover object-[center_18%] sm:object-center"
              />
            </div>
          </div>

          <div
            className="flex flex-col items-center justify-center gap-2 bg-[#FAF8F4] px-3 py-4 sm:gap-2.5 sm:py-5"
            style={fadeUp(lowerVisible, "0.28s", "0.7rem")}
          >
            <p className="font-body text-[9px] font-medium tracking-[0.28em] text-ink/50 uppercase sm:text-[10px]">
              Follow along
            </p>
            <div
              aria-hidden
              className="h-px w-8 origin-center bg-ink/20 sm:w-10"
              style={{
                opacity: lowerVisible ? 1 : 0,
                transform: lowerVisible ? "scaleX(1)" : "scaleX(0)",
                transition: `opacity 0.6s ${EASE} 0.36s, transform 0.7s ${EASE} 0.36s`,
              }}
            />
            <div className="flex items-center gap-3.5 sm:gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink/45 transition-colors duration-300 hover:text-blush"
                  aria-label={social.name}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current sm:h-[17px] sm:w-[17px]"
                    aria-hidden
                  >
                    <path d={social.iconPath} />
                  </svg>
                </a>
              ))}
              <a
                href="mailto:hello@thehuestory.com"
                className="text-ink/45 transition-colors duration-300 hover:text-blush"
                aria-label="Email"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current sm:h-[17px] sm:w-[17px]"
                  aria-hidden
                >
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div
          className="relative aspect-[2/3] w-full overflow-hidden sm:col-span-5 sm:aspect-auto sm:h-[420px] md:h-[470px] lg:h-[520px]"
          style={fadeUp(lowerVisible, "0.24s", "1.4rem")}
        >
          <div
            className="absolute inset-0 will-change-transform"
            style={imageReveal(lowerVisible, "0.24s")}
          >
            <Image
              src={IMAGES.gridWide}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, 42vw"
              className="object-cover object-[center_20%] sm:object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
