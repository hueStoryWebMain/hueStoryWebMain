"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FOUNDER, PATTERN_BG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const FOUNDER_SITE = "https://roshnikurup.com/";

const BODY_A =
  "Roshni Kurup is a cultural strategist, creative director, and entrepreneur whose work explores the relationship between culture, place, aesthetics, and human experience.";

const BODY_INTEREST =
  "She has a deep interest in place and identity. She is particularly drawn to the intersections of art, architecture, design, craft, history, and everyday life.";

const BODY_B =
  "Roshni's practice is, at its core, about creating spaces, experiences, and ideas that make culture tangible, meaningful, and alive.";

function WordFade({
  words,
  visible,
  baseDelay = 0,
  stagger = 0.05,
}: {
  words: readonly string[];
  visible: boolean;
  baseDelay?: number;
  stagger?: number;
}) {
  return (
    <span className="inline">
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block will-change-[opacity,transform]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-0.5em)",
            transition: visible
              ? `opacity 0.28s ease-out ${baseDelay + i * stagger}s, transform 0.28s ease-out ${baseDelay + i * stagger}s`
              : "none",
          }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}

/**
 * AboutFounderHomeTHS — pattern + Roshni | paper cream copy + CTA
 */
export default function AboutFounderHomeTHS() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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

  const bodyAWords = BODY_A.split(" ");
  const bodyInterestWords = BODY_INTEREST.split(" ");
  const bodyBWords = BODY_B.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full overflow-x-clip"
      aria-labelledby="founder-home-heading"
    >
      <div className="grid w-full grid-cols-1 lg:grid-cols-2 lg:items-stretch">
        {/* ——— Left: stripe pattern + Roshni + angled script ——— */}
        <div className="relative min-h-[580px] w-full overflow-visible pb-12 sm:min-h-[640px] sm:pb-14 md:min-h-[720px] lg:min-h-[780px] lg:pb-0">
          <div
            className="absolute inset-0"
            aria-hidden
            style={{
              backgroundImage: `url(${PATTERN_BG.stripeAlternate})`,
              backgroundRepeat: "repeat",
              backgroundSize: "auto 100%",
              backgroundPosition: "center top",
            }}
          />

          <div className="relative z-10 flex h-full items-center justify-center px-6 py-16 sm:px-12 sm:py-20 md:px-14 md:py-20 lg:px-16 lg:py-24">
            {/* Mobile: nudge image left so script has room on the right */}
            <div className="relative w-full max-w-[240px] -translate-x-5 sm:max-w-[300px] sm:translate-x-0 md:max-w-[340px] lg:max-w-[360px]">
              <div className="relative">
                {/* Offset plate outline — outside the photo */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-2 border border-cream/70 sm:-inset-2.5 md:-inset-3"
                  style={{
                    opacity: visible ? 1 : 0,
                    transition:
                      "opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.12s",
                  }}
                />

                {/* L-corners on the outer plate */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-2 -left-2 z-10 h-6 w-6 border-t-[1.5px] border-l-[1.5px] border-cream sm:-top-2.5 sm:-left-2.5 sm:h-7 sm:w-7 md:-top-3 md:-left-3"
                  style={{
                    opacity: visible ? 1 : 0,
                    transition:
                      "opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1) 0.28s",
                  }}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-2 -left-2 z-10 h-6 w-6 border-b-[1.5px] border-l-[1.5px] border-cream sm:-bottom-2.5 sm:-left-2.5 sm:h-7 sm:w-7 md:-bottom-3 md:-left-3"
                  style={{
                    opacity: visible ? 1 : 0,
                    transition:
                      "opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1) 0.34s",
                  }}
                />

                <div
                  className="relative aspect-[3/4] w-full overflow-hidden shadow-[0_12px_40px_rgba(44,39,35,0.14)]"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(1rem)",
                    transition:
                      "opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.08s, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.08s",
                  }}
                >
                  <Image
                    src={FOUNDER.image}
                    alt={FOUNDER.name}
                    fill
                    sizes="(max-width: 1024px) 70vw, 360px"
                    className="object-cover object-top"
                  />
                </div>

                {/* Anchored to image BR — softer offset on mobile so it stays in frame */}
                <p
                  aria-hidden
                  className={cn(
                    "font-script pointer-events-none absolute right-0 bottom-0 z-20 origin-bottom-right text-left text-[26px] leading-[1.15] tracking-[0.01em] normal-case will-change-[opacity,transform] sm:text-[34px] md:text-[40px] lg:text-[46px]",
                    visible
                      ? "translate-x-[58%] translate-y-[86%] -rotate-[12deg] opacity-100 sm:translate-x-[40%] sm:translate-y-[34%] md:translate-x-[60%] md:translate-y-[32%] lg:translate-x-[88%] lg:translate-y-[32%]"
                      : "translate-x-[58%] translate-y-[96%] -rotate-[12deg] opacity-0 sm:translate-x-[40%] sm:translate-y-[44%] md:translate-x-[60%] md:translate-y-[42%] lg:translate-x-[88%] lg:translate-y-[42%]"
                  )}
                  style={{
                    color: "#2C2723",
                    transition:
                      "opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.3s, transform 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.3s",
                  }}
                >
                  <span className="block whitespace-nowrap">With love,</span>
                  <span className="mt-0.5 block whitespace-nowrap pl-[1.4em]">
                    Rosh
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ——— Right: paper cream + title, para, CTA ——— */}
        <div
          className="flex flex-col justify-center px-6 py-16 text-ink sm:px-10 sm:py-20 md:px-12 lg:px-14 lg:py-24 xl:px-16"
          style={{ backgroundColor: "#F7F3EB" }}
        >
          <h2
            id="founder-home-heading"
            className="font-title text-[32px] leading-[1.05] font-normal tracking-[0.08em] text-ink uppercase sm:text-[40px] md:text-[48px] lg:text-[52px]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-0.5rem)",
              transition: visible
                ? "opacity 0.4s ease-out 0.1s, transform 0.4s ease-out 0.1s"
                : "none",
            }}
          >
            {FOUNDER.name}
          </h2>

          <p
            className="font-silk mt-3 text-[16px] font-[200] leading-snug tracking-[0.02em] text-ink/70 italic normal-case sm:mt-3.5 sm:text-[18px] md:text-[20px]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-0.5rem)",
              transition: visible
                ? "opacity 0.4s ease-out 0.22s, transform 0.4s ease-out 0.22s"
                : "none",
            }}
          >
            founder and creative director
          </p>

          <p className="font-body mt-6 max-w-md text-[12px] leading-[1.85] font-light tracking-[0.01em] text-ink/80 sm:mt-7 sm:text-[13px] sm:leading-[1.9] md:text-[14px] md:leading-[1.95]">
            <WordFade
              words={bodyAWords}
              visible={visible}
              baseDelay={0.28}
              stagger={0.012}
            />
          </p>

          <p className="font-body mt-4 max-w-md sm:mt-5 text-[12px] leading-[1.85] font-light tracking-[0.01em] text-ink/80 sm:text-[13px] sm:leading-[1.9] md:text-[14px] md:leading-[1.95]">
            <WordFade
              words={bodyInterestWords}
              visible={visible}
              baseDelay={0.4}
              stagger={0.012}
            />
          </p>

          <p className="font-body mt-4 max-w-md sm:mt-5 text-[12px] leading-[1.85] font-light tracking-[0.01em] text-ink/80 sm:text-[13px] sm:leading-[1.9] md:text-[14px] md:leading-[1.95]">
            <WordFade
              words={bodyBWords}
              visible={visible}
              baseDelay={0.56}
              stagger={0.012}
            />{" "}
            <a
              href={FOUNDER_SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="font-silk ml-1 inline-block text-[1.15em] font-[300] whitespace-nowrap text-base italic no-underline transition-colors duration-300 hover:text-blush"
              style={{
                opacity: visible ? 1 : 0,
                transition: visible
                  ? "opacity 0.4s ease-out 0.8s, color 0.3s"
                  : "none",
              }}
            >
              Read more
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
