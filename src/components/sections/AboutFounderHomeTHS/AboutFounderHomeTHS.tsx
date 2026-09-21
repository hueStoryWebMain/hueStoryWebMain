"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FOUNDER, PATTERN_BG, ROUTES } from "@/lib/constants";
import { colors } from "@/lib/theme";
import { cn } from "@/lib/utils";

const BODY =
  "Roshni Kurup is a cultural strategist, creative director, and entrepreneur whose work explores culture, place, and aesthetics. At its core, her practice is about creating spaces and experiences that make culture tangible, meaningful, and alive.";

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
 * AboutFounderHomeTHS — pattern + Roshini | paper cream copy + CTA
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

  const bodyWords = BODY.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full overflow-x-clip"
      aria-labelledby="founder-home-heading"
    >
      <div className="grid w-full grid-cols-1 lg:grid-cols-2 lg:items-stretch">
        {/* ——— Left: stripe pattern + Roshini + angled script ——— */}
        <div className="relative min-h-[520px] w-full overflow-visible pb-10 sm:min-h-[560px] sm:pb-12 md:min-h-[620px] lg:min-h-[680px] lg:pb-0">
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

          <div className="relative z-10 flex h-full items-center justify-center px-6 py-12 sm:px-12 sm:py-14 md:px-14 md:py-16 lg:px-16">
            {/* Mobile: nudge image left so script has room on the right */}
            <div className="relative w-full max-w-[240px] -translate-x-3 sm:max-w-[300px] sm:translate-x-0 md:max-w-[340px] lg:max-w-[360px]">
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
                    priority
                  />
                </div>

                {/* Anchored to image BR — softer offset on mobile so it stays in frame */}
                <p
                  aria-hidden
                  className={cn(
                    "font-script pointer-events-none absolute right-0 bottom-0 z-20 origin-bottom-right text-left text-[26px] leading-[1.15] tracking-[0.01em] normal-case will-change-[opacity,transform] sm:text-[34px] md:text-[40px] lg:text-[46px]",
                    visible
                      ? "translate-x-[18%] translate-y-[38%] -rotate-[11deg] opacity-100 sm:translate-x-[40%] sm:translate-y-[34%] md:translate-x-[60%] md:translate-y-[32%] lg:translate-x-[88%] lg:translate-y-[32%]"
                      : "translate-x-[18%] translate-y-[48%] -rotate-[11deg] opacity-0 sm:translate-x-[40%] sm:translate-y-[44%] md:translate-x-[60%] md:translate-y-[42%] lg:translate-x-[88%] lg:translate-y-[42%]"
                  )}
                  style={{
                    color: colors.cobalt,
                    transition:
                      "opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.3s, transform 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.3s",
                  }}
                >
                  <span className="block whitespace-nowrap">
                    Timeless editorial
                  </span>
                  <span className="mt-0.5 block whitespace-nowrap">
                    <span className="relative inline-block px-0.5">
                      thoughtful
                      <svg
                        className="pointer-events-none absolute top-1/2 left-1/2 h-[135%] w-[120%] -translate-x-1/2 -translate-y-1/2"
                        viewBox="0 0 120 48"
                        fill="none"
                        aria-hidden
                      >
                        <ellipse
                          cx="60"
                          cy="24"
                          rx="54"
                          ry="18"
                          stroke={colors.cobalt}
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          transform="rotate(-6 60 24)"
                          opacity="0.9"
                        />
                      </svg>
                    </span>{" "}
                    Creative
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ——— Right: paper cream + title, para, CTA ——— */}
        <div
          className="flex flex-col justify-center px-6 py-14 text-ink sm:px-10 sm:py-16 md:px-12 lg:px-14 lg:py-20 xl:px-16"
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
            co-founder and creative director
          </p>

          <p className="font-silk mt-6 max-w-md text-[14px] leading-[1.85] font-[300] tracking-[0.01em] text-ink/80 not-italic normal-case sm:mt-7 sm:text-[15px] sm:leading-[1.9]">
            <WordFade
              words={bodyWords}
              visible={visible}
              baseDelay={0.28}
              stagger={0.012}
            />
          </p>

          <div
            className={cn("mt-9 sm:mt-10")}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-0.75rem)",
              transition: visible
                ? "opacity 0.35s ease-out 0.65s, transform 0.35s ease-out 0.65s"
                : "none",
            }}
          >
            <Link
              href={ROUTES.ABOUT}
              className="group inline-flex flex-col gap-2.5"
            >
              <span className="inline-flex items-baseline gap-x-2 sm:gap-x-2.5">
                <span className="font-body text-[10px] font-medium tracking-[0.22em] text-base uppercase transition-colors duration-300 group-hover:text-blush sm:text-[11px]">
                  Read more about
                </span>
                <span className="font-silk text-[18px] font-[200] tracking-normal text-ink italic normal-case transition-colors duration-300 group-hover:text-blush sm:text-[20px]">
                  Roshni
                </span>
              </span>
              <span className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="h-px w-10 origin-left bg-ink/30 transition-all duration-300 group-hover:w-16 group-hover:bg-blush sm:w-12 sm:group-hover:w-20"
                />
                <span
                  aria-hidden
                  className="font-body text-[11px] tracking-[0.18em] text-ink/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blush"
                >
                  →
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
