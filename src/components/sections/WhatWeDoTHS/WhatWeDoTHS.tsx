"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ROUTES, SECTION_STOCK_IMAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SLIDE_MS = 8200;
const FADE_MS = 2200;
const IMAGES = SECTION_STOCK_IMAGES;

const ROMAN = ["I", "II", "III"] as const;

const SERVICES = [
  {
    title: "Weddings",
    body: "Full creative direction from concept to execution: design, production, and coordination for ceremonies of any scale, including multi-day celebrations and unions that layer two cultures, faiths, or family traditions into one shared story.",
    href: ROUTES.PORTFOLIO,
    cta: "Explore",
  },
  {
    title: "Private Events",
    body: "Milestone occasions, designed and directed with the same rigour and imagination as a wedding.",
    href: ROUTES.PORTFOLIO,
    cta: "Explore",
  },
  {
    title: "Galas & Curated Events",
    body: "Evenings built around a cause, a launch, or the pleasure of an impeccable guest list, composed down to the smallest, most memorable detail.",
    href: ROUTES.PORTFOLIO,
    cta: "Explore",
  },
] as const;

function ImageSlot({
  src,
  priority = false,
}: {
  src: string;
  priority?: boolean;
}) {
  const activeSrc = useRef(src);
  const [layerA, setLayerA] = useState(src);
  const [layerB, setLayerB] = useState(src);
  const [showA, setShowA] = useState(true);

  useEffect(() => {
    if (src === activeSrc.current) return;
    activeSrc.current = src;
    setShowA((wasA) => {
      if (wasA) setLayerB(src);
      else setLayerA(src);
      return !wasA;
    });
  }, [src]);

  const fadeStyle = {
    transitionProperty: "opacity",
    transitionDuration: `${FADE_MS}ms`,
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  } as const;

  return (
    <div className="relative h-full w-full overflow-hidden bg-cream/5">
      <Image
        src={layerA}
        alt=""
        fill
        sizes="(max-width: 640px) 46vw, (max-width: 1024px) 42vw, 28vw"
        priority={priority}
        style={fadeStyle}
        className={cn(
          "object-cover object-[center_30%] sm:object-center will-change-[opacity]",
          showA ? "opacity-100" : "opacity-0"
        )}
      />
      <Image
        src={layerB}
        alt=""
        fill
        sizes="(max-width: 640px) 46vw, (max-width: 1024px) 42vw, 28vw"
        style={fadeStyle}
        className={cn(
          "object-cover object-[center_30%] sm:object-center will-change-[opacity]",
          showA ? "opacity-0" : "opacity-100"
        )}
      />
    </div>
  );
}

/**
 * WhatWeDoTHS — slate blue split: equal-height image pair | services
 */
export default function WhatWeDoTHS() {
  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (IMAGES.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % IMAGES.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const serviceEnter = (i: number) =>
    ({
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(0.6rem)",
      transition: `opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${0.12 + i * 0.14}s, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${0.12 + i * 0.14}s`,
    }) as const;

  const leftSrc = IMAGES[index] ?? IMAGES[0];
  const rightSrc =
    IMAGES[
      IMAGES.length > 1
        ? (index + Math.max(1, Math.floor(IMAGES.length / 2))) % IMAGES.length
        : 0
    ] ?? IMAGES[0];

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full overflow-x-clip border-t border-cream/20 bg-base text-cream"
      aria-labelledby="what-we-do-heading"
    >
      <div className="grid w-full grid-cols-1 lg:grid-cols-2 lg:items-stretch">
        {/* ——— Left: two equal-height frames ——— */}
        <div className="relative w-full self-stretch">
          <div
            className={cn(
              "flex w-full",
              /* Mobile / tablet: edge-to-edge, shorter strip */
              "h-[260px] gap-2",
              "sm:h-[320px] sm:gap-3",
              "md:h-[380px] md:gap-4",
              /* Desktop: fill column, flush left with right breathing room */
              "lg:h-full lg:min-h-[520px] lg:gap-4"
            )}
          >
            <div className="relative h-full w-1/2 min-w-0">
              <ImageSlot src={leftSrc} priority />
            </div>
            <div className="relative h-full w-1/2 min-w-0 lg:pr-6">
              <ImageSlot src={rightSrc} priority />
            </div>
          </div>
        </div>

        {/* ——— Right: What we do ——— */}
        <div className="relative flex h-full min-h-0 w-full flex-col justify-center">
          <p
            aria-hidden
            className="font-script pointer-events-none absolute top-3 right-3 z-20 text-right text-[28px] leading-none tracking-[0.02em] normal-case sm:top-4 sm:right-5 sm:text-[34px] md:top-5 md:right-6 md:text-[40px] lg:top-6 lg:right-8 lg:text-[44px]"
            style={{ color: "#FCFBF6" }}
          >
            intentional
          </p>

          <div className="flex flex-col justify-center px-6 pt-14 pb-10 sm:px-10 sm:pt-16 sm:pb-12 md:px-12 md:pt-16 lg:px-14 lg:pt-20 lg:pb-14 xl:px-16">
            <h2
              id="what-we-do-heading"
              className="font-title text-[24px] font-normal tracking-[0.1em] text-cream uppercase sm:text-[28px] md:text-[32px]"
            >
              What{" "}
              <em className="font-silk text-[1.05em] font-[200] tracking-[0.02em] text-cream italic normal-case">
                We Do
              </em>
            </h2>
            <div
              className="mt-4 h-px w-12 bg-cream/25 sm:mt-5 sm:w-14"
              aria-hidden
            />

            <p className="font-body mt-5 max-w-xl text-[12px] leading-[1.85] font-light tracking-[0.01em] text-cream/75 sm:mt-6 sm:text-[13px] sm:leading-[1.9] md:text-[14px] md:leading-[1.95]">
              Every celebration is built on finesse and restraint: opulent,
              understated, and made to last.
            </p>

            <div className="mt-6 sm:mt-7">
              {SERVICES.map((service, i) => (
                <div
                  key={service.title}
                  style={serviceEnter(i)}
                  className={cn(
                    "py-4 sm:py-5",
                    i < SERVICES.length - 1 && "border-b border-cream/20"
                  )}
                >
                  <div className="flex items-baseline gap-3 sm:gap-4">
                    <span
                      aria-hidden
                      className="font-body shrink-0 text-[10px] font-light tracking-[0.18em] text-cream/40 sm:text-[11px]"
                    >
                      {ROMAN[i]}
                    </span>
                    <h3 className="font-title text-[18px] font-normal tracking-[0.08em] text-cream uppercase sm:text-[22px] md:text-[24px]">
                      {service.title.includes("&") ? (
                        <>
                          {service.title.split("&")[0]}
                          <span className="font-silk inline-block px-[0.04em] text-[0.92em] leading-none font-[300] not-italic normal-case tracking-normal">
                            &
                          </span>
                          {service.title.split("&")[1]}
                        </>
                      ) : (
                        service.title
                      )}
                    </h3>
                  </div>
                  <p className="font-body mt-2 max-w-xl pl-6 text-[12px] leading-[1.85] font-light tracking-[0.01em] text-cream/70 sm:mt-2.5 sm:pl-7 sm:text-[13px] sm:leading-[1.9] md:text-[14px] md:leading-[1.95]">
                    {service.body}
                  </p>
                  <Link
                    href={service.href}
                    className="mt-3 ml-6 inline-flex items-center gap-3 font-body text-[10px] font-medium tracking-[0.22em] text-cream/45 uppercase transition-colors hover:text-cream sm:mt-3.5 sm:ml-7 sm:text-[11px]"
                  >
                    {service.cta}
                    <span
                      aria-hidden
                      className="block h-px w-8 bg-current sm:w-10"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
