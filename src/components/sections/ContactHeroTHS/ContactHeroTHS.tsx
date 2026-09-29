"use client";

import { useEffect, useState } from "react";
import { PATTERN_BG } from "@/lib/constants";
import HeroNav from "@/components/layout/HeroNav";

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const TITLE = "Inquire";

/**
 * ContactHeroTHS — striped floral pattern hero · INQUIRE title
 * Full-height like PortfolioHeroTHS / AboutHeroTHS, same overlay language.
 */
export default function ContactHeroTHS() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const id = window.setTimeout(() => setReady(true), mq.matches ? 0 : 80);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <section
      className="relative z-0 h-[100svh] min-h-[560px] w-full overflow-hidden bg-base sm:min-h-[640px]"
      aria-labelledby="contact-hero-heading"
    >
      <div
        aria-hidden
        className="absolute inset-0 will-change-[opacity,transform]"
        style={{
          backgroundColor: "var(--color-base)",
          backgroundImage: `url(${PATTERN_BG.contactPage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          opacity: ready ? 1 : 0,
          transform: ready ? "scale(1)" : "scale(1.08)",
          transition: `opacity 1.8s ${EASE} 0.05s, transform 3s ${EASE} 0.05s`,
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-base/35"
        style={{ opacity: ready ? 1 : 0, transition: `opacity 1.4s ${EASE} 0.2s` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-black/20"
        style={{ opacity: ready ? 1 : 0, transition: `opacity 1.4s ${EASE} 0.28s` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(28,24,22,0.3)_0%,transparent_32%,transparent_50%,rgba(28,24,22,0.6)_100%)]"
        style={{ opacity: ready ? 1 : 0, transition: `opacity 1.5s ${EASE} 0.35s` }}
      />

      <div className="pointer-events-none absolute inset-0 z-10">
        <div
          className="pointer-events-auto relative h-full"
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
            id="contact-hero-heading"
            aria-label={TITLE}
            className="font-title flex overflow-hidden pb-[0.08em] text-[clamp(2.6rem,12vw,3.5rem)] font-normal leading-[1.02] tracking-[0.06em] text-cream uppercase md:text-[clamp(3.25rem,7vw,5.5rem)] md:tracking-[0.08em]"
          >
            {TITLE.split("").map((ch, i) => (
              <span
                key={i}
                aria-hidden
                className="inline-block will-change-[opacity,transform]"
                style={{
                  opacity: ready ? 1 : 0,
                  transform: ready ? "translate3d(0,0,0)" : "translate3d(0,105%,0)",
                  transition: `opacity 1s ${EASE} ${0.55 + i * 0.06}s, transform 1.3s ${EASE} ${0.55 + i * 0.06}s`,
                }}
              >
                {ch}
              </span>
            ))}
          </h1>
        </div>
      </div>
    </section>
  );
}
