"use client";

import { useEffect, useState } from "react";
import { PATTERN_BG } from "@/lib/constants";
import HeroNav from "@/components/layout/HeroNav";

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * AboutHeroTHS — full-bleed pattern hero · ABOUT US title
 * Soft slate/black overlay (same language as AboutHomeTHS)
 */
export default function AboutHeroTHS() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReady(true);
      return;
    }
    /* Slight hold so first paint feels considered, not abrupt */
    const id = window.setTimeout(() => setReady(true), 80);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <section
      className="relative z-0 h-[100svh] min-h-[560px] w-full overflow-hidden bg-base sm:min-h-[640px]"
      aria-labelledby="about-hero-heading"
    >
      {/* Pattern plate */}
      <div
        aria-hidden
        className="absolute inset-0 will-change-[opacity,transform]"
        style={{
          backgroundColor: "var(--color-base)",
          backgroundImage: `url(${PATTERN_BG.aboutPage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          opacity: ready ? 1 : 0,
          transform: ready ? "scale(1)" : "scale(1.04)",
          transition: `opacity 1.6s ${EASE} 0.05s, transform 2.2s ${EASE} 0.05s`,
        }}
      />

      {/* Soft overlays — keep pattern readable, title clear */}
      <div
        className="pointer-events-none absolute inset-0 bg-base/40 will-change-opacity"
        aria-hidden
        style={{
          opacity: ready ? 1 : 0,
          transition: `opacity 1.4s ${EASE} 0.2s`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-black/28 will-change-opacity"
        aria-hidden
        style={{
          opacity: ready ? 1 : 0,
          transition: `opacity 1.4s ${EASE} 0.28s`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(28,24,22,0.28)_0%,transparent_32%,transparent_55%,rgba(28,24,22,0.55)_100%)] will-change-opacity"
        style={{
          opacity: ready ? 1 : 0,
          transition: `opacity 1.5s ${EASE} 0.35s`,
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-10">
        <div
          className="pointer-events-auto relative h-full will-change-[opacity,transform]"
          style={{
            opacity: ready ? 1 : 0,
            transform: ready ? "translate3d(0,0,0)" : "translate3d(0,-0.4rem,0)",
            transition: `opacity 1.1s ${EASE} 0.25s, transform 1.1s ${EASE} 0.25s`,
          }}
        >
          <HeroNav light />
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-[max(1.75rem,env(safe-area-inset-bottom))] sm:px-7 md:px-5 md:pb-6 lg:px-6 lg:pb-7">
          <h1
            id="about-hero-heading"
            className="font-title max-w-[22rem] text-[clamp(2.6rem,12vw,3.5rem)] font-normal leading-[1.02] tracking-[0.06em] text-cream uppercase will-change-[opacity,transform] sm:max-w-none md:text-[clamp(3.25rem,7vw,5.5rem)] md:tracking-[0.08em]"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready
                ? "translate3d(0,0,0)"
                : "translate3d(0,1.5rem,0)",
              transition: `opacity 1.35s ${EASE} 0.45s, transform 1.45s ${EASE} 0.45s`,
            }}
          >
            About Us
          </h1>
        </div>
      </div>
    </section>
  );
}
