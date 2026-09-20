"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { HOME_STOCK_IMAGES } from "@/lib/constants";
import HeroNav from "@/components/layout/HeroNav";

const SLIDE_MS = 5500;
const FADE_MS = 2.2;
const HERO_SLIDES = HOME_STOCK_IMAGES;
const SLIDE_TOTAL = HERO_SLIDES.length;
const ease = [0.16, 1, 0.3, 1] as const;
const HERO_TITLE = "A World, Gathered Into One Story";
const HERO_WORDS = HERO_TITLE.split(" ");
const MOBILE_LINES = ["A World,", "Gathered Into", "One Story"] as const;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/**
 * Editorial sticky hero
 * — Soft crossfade between slides
 * — Masked title reveal + slide index
 */
export default function HomeHero() {
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const reduceMotion = useReducedMotion();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = window.setTimeout(
      () => setReady(true),
      reduceMotion ? 0 : 280
    );
    document.body.style.overflow = "";
    return () => window.clearTimeout(id);
  }, [reduceMotion]);

  useEffect(() => {
    if (HERO_SLIDES.length <= 1) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, SLIDE_MS);

    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const el = titleRef.current;
    const track = trackRef.current;
    if (!el || !track) return;

    const fit = () => {
      if (window.matchMedia("(max-width: 767px)").matches) {
        el.style.fontSize = "";
        return;
      }

      const available = track.clientWidth;
      if (!available) return;

      let low = 10;
      let high = Math.min(200, available * 0.2);
      for (let i = 0; i < 24; i++) {
        const mid = (low + high) / 2;
        el.style.fontSize = `${mid}px`;
        if (el.scrollWidth <= available) low = mid;
        else high = mid;
      }
      el.style.fontSize = `${Math.max(14, low * 0.985)}px`;
    };

    const run = () => {
      fit();
      requestAnimationFrame(fit);
    };

    run();
    const ro = new ResizeObserver(run);
    ro.observe(track);
    document.fonts?.ready?.then(run).catch(() => {});
    window.addEventListener("orientationchange", run);
    window.addEventListener("resize", run);
    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", run);
      window.removeEventListener("resize", run);
    };
  }, []);

  const eyebrow = {
    hidden: reduceMotion
      ? { opacity: 1, letterSpacing: "0.28em" }
      : { opacity: 0, letterSpacing: "0.5em", filter: "blur(6px)" },
    visible: {
      opacity: 1,
      letterSpacing: "0.28em",
      filter: "blur(0px)",
      transition: { duration: reduceMotion ? 0 : 0.9, ease },
    },
  };

  const rise = {
    hidden: reduceMotion
      ? { y: "0%", opacity: 1 }
      : { y: "115%", opacity: 0.35 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration: reduceMotion ? 0 : 0.95, ease },
    },
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.07,
        delayChildren: reduceMotion ? 0 : 0.12,
      },
    },
  };

  const slideLabel = `${pad(index + 1)} / ${pad(SLIDE_TOTAL)}`;

  return (
    <div className="relative z-0 h-[200svh]">
      <div className="sticky top-0 h-[100svh] min-h-[560px] w-full overflow-hidden bg-base sm:min-h-[640px]">
        <div className="absolute inset-0">
          {HERO_SLIDES.map((src, i) => {
            const active = i === index;
            return (
              <motion.div
                key={src}
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: active ? 1 : 0 }}
                transition={{
                  duration: reduceMotion ? 0.35 : FADE_MS,
                  ease: [0.45, 0, 0.2, 1],
                }}
                style={{ zIndex: active ? 2 : 1 }}
                aria-hidden={!active}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover object-[center_30%] sm:object-center"
                />
              </motion.div>
            );
          })}
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[3] bg-[linear-gradient(180deg,rgba(28,24,22,0.4)_0%,rgba(28,24,22,0.12)_36%,rgba(28,24,22,0.22)_58%,rgba(28,24,22,0.62)_100%)] sm:bg-[linear-gradient(180deg,rgba(28,24,22,0.28)_0%,rgba(28,24,22,0.06)_42%,rgba(28,24,22,0.18)_72%,rgba(28,24,22,0.42)_100%)]"
        />

        {/* Nav + copy live inside sticky so they pin with the image */}
        <div className="pointer-events-none absolute inset-0 z-10">
          <div className="pointer-events-auto relative h-full">
            <HeroNav light />

            <p
              className="pointer-events-none absolute right-4 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-10 font-body text-[9px] font-medium tracking-[0.28em] text-white/65 tabular-nums sm:right-6 sm:bottom-40 sm:text-[10px] md:right-5 md:bottom-[6.5rem] lg:right-6 lg:bottom-28"
              aria-live="polite"
            >
              {slideLabel}
            </p>

            {/* ——— Mobile ——— */}
            <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-[max(1.75rem,env(safe-area-inset-bottom))] sm:px-7 md:hidden">
              <motion.div
                initial="hidden"
                animate={ready ? "visible" : "hidden"}
                variants={stagger}
                className="max-w-[22rem]"
              >
                <motion.p
                  variants={eyebrow}
                  className="mb-4 font-body text-[10px] font-medium uppercase tracking-[0.32em] text-white/80"
                >
                  Wedding &amp; Event Design. Worldwide.
                </motion.p>
                <h1 className="font-title text-[clamp(2.35rem,11.5vw,3.35rem)] font-normal leading-[1.02] tracking-[0.02em] text-white uppercase">
                  {MOBILE_LINES.map((line) => (
                    <span
                      key={line}
                      className="block overflow-hidden pb-[0.06em]"
                    >
                      <motion.span variants={rise} className="block">
                        {line}
                      </motion.span>
                    </span>
                  ))}
                </h1>
              </motion.div>
            </div>

            {/* ——— Desktop ——— */}
            <div className="absolute inset-x-0 bottom-0 z-10 hidden px-4 pb-5 md:block md:px-5 md:pb-6 lg:px-6 lg:pb-7">
              <div
                ref={trackRef}
                className="flex w-full flex-col items-start text-left"
              >
                <motion.p
                  initial="hidden"
                  animate={ready ? "visible" : "hidden"}
                  variants={eyebrow}
                  className="mb-3 font-body text-[11px] font-medium uppercase tracking-[0.28em] text-white/80 lg:mb-4 lg:text-xs"
                >
                  Wedding &amp; Event Design. Worldwide.
                </motion.p>
                <motion.h1
                  ref={titleRef}
                  initial="hidden"
                  animate={ready ? "visible" : "hidden"}
                  variants={stagger}
                  className="block w-full text-left font-title font-normal leading-[0.95] tracking-[0.02em] text-white uppercase whitespace-nowrap"
                >
                  {HERO_WORDS.map((word, i) => (
                    <span
                      key={`${word}-${i}`}
                      className="inline-block overflow-hidden align-bottom"
                    >
                      <motion.span variants={rise} className="inline-block">
                        {word}
                        {i < HERO_WORDS.length - 1 ? "\u00A0" : ""}
                      </motion.span>
                    </span>
                  ))}
                </motion.h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
