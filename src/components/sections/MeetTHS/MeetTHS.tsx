"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const HEADLINE = "A World, Gathered Into One Story.";

const BODY =
  "The Hue Story designs multi-day destination weddings and private events for clients across the globe. A decade spent crafting weddings for families across the United States, India, Australia, Italy, Kenya, Sri Lanka, South Africa, the Emirates, Bali, and beyond has left us with an inheritance of taste, artisanship, and cultural fluency, one that now travels with us wherever we work.";

const RECOGNITION =
  "Featured In Vogue, Architectural Digest and The Vogue Wedding Book";

/** Full-bleed opener above the flower */
const INTRO_LINE =
  "A decade of destination weddings — taste, artisanship, and cultural fluency across the globe";

const TITLE_LINE_1 = ["ABOUT"] as const;
const HEADLINE_WORDS = HEADLINE.replace(/\.$/, "").split(" ");


function WordFade({
  words,
  visible,
  baseDelay = 0,
  stagger = 0.05,
  className,
}: {
  words: readonly string[];
  visible: boolean;
  baseDelay?: number;
  stagger?: number;
  className?: string;
}) {
  return (
    <span className={cn("inline", className)}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block will-change-[opacity,transform]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-0.55em)",
            transition: visible
              ? `opacity 0.26s ease-out ${baseDelay + i * stagger}s, transform 0.26s ease-out ${baseDelay + i * stagger}s`
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
 * MeetTHS — slate blue editorial split: title | copy + Enquire
 */
export default function MeetTHS() {
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
      { threshold: 0.22 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const bodyWords = BODY.split(" ");
  const recognitionWords = RECOGNITION.split(" ");
  const introWords = INTRO_LINE.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full overflow-x-clip bg-base text-cream"
      aria-labelledby="meet-ths-heading"
    >
      {/* Full-bleed single line left→right + hairline, then flower */}
      <div className="flex w-full flex-col items-center pt-5 sm:pt-6 md:pt-7">
        <p className="font-body w-full px-4 text-center text-[10px] leading-[1.55] font-medium tracking-[0.14em] text-cream/55 uppercase sm:px-4 sm:text-[11px] sm:leading-none sm:tracking-[0.2em] sm:whitespace-nowrap md:text-[12px]">
          <WordFade
            words={introWords}
            visible={visible}
            baseDelay={0}
            stagger={0.028}
          />
        </p>

        <div
          aria-hidden
          className="mt-4 h-px w-full origin-left bg-cream/25 sm:mt-5"
          style={{
            transform: visible ? "scaleX(1)" : "scaleX(0)",
            transition: visible
              ? "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.45s"
              : "none",
          }}
        />

        <div
          className="relative mt-8 h-24 w-24 sm:mt-10 sm:h-28 sm:w-28 md:mt-12 md:h-32 md:w-32 lg:h-36 lg:w-36"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(0.5rem)",
            transition:
              "opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.7s, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.7s",
          }}
        >
          <Image
            src="/images/shapes/flowerpaper.png"
            alt=""
            fill
            sizes="144px"
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 pt-8 pb-16 sm:gap-12 sm:px-8 sm:pt-10 sm:pb-20 md:px-10 md:pt-12 md:pb-24 lg:grid-cols-2 lg:items-start lg:gap-16 lg:px-14 lg:pt-14 lg:pb-28 xl:gap-20 xl:px-16">
        {/* ——— Left: ABOUT / THE HUE STORY ——— */}
        <div className="min-w-0 overflow-visible">
          <h2
            id="meet-ths-heading"
            className="font-title font-normal text-cream uppercase"
          >
            <span className="block text-[40px] leading-[0.95] tracking-[0.08em] text-cream transition-colors duration-500 ease-out hover:text-blush sm:text-[52px] md:text-[64px] lg:text-[72px] xl:text-[80px]">
              <WordFade words={TITLE_LINE_1} visible={visible} baseDelay={0} />
            </span>
          </h2>
        </div>

        {/* ——— Right: headline + copy + Enquire ——— */}
        <div className="flex min-w-0 flex-col">
          <p className="font-title mb-5 whitespace-nowrap text-[clamp(1.05rem,2.4vw,1.5rem)] leading-[1.2] font-normal tracking-[0.04em] text-cream uppercase sm:mb-6">
            <WordFade
              words={HEADLINE_WORDS}
              visible={visible}
              baseDelay={0.12}
              stagger={0.035}
            />
            <span
              className="inline-block will-change-[opacity,transform]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-0.55em)",
                transition: visible
                  ? `opacity 0.26s ease-out ${0.12 + 0.035 * HEADLINE_WORDS.length}s, transform 0.26s ease-out ${0.12 + 0.035 * HEADLINE_WORDS.length}s`
                  : "none",
              }}
            >
              .
            </span>
          </p>

          <p className="font-body max-w-xl text-[12px] leading-[1.85] font-light tracking-[0.01em] text-cream/80 normal-case sm:text-[13px] sm:leading-[1.9] md:text-[14px] md:leading-[1.95]">
            <WordFade
              words={bodyWords}
              visible={visible}
              baseDelay={0.28}
              stagger={0.012}
            />
          </p>

          <p className="font-silk mt-7 max-w-xl text-[15px] leading-[1.7] font-[300] tracking-[0.02em] text-cream/75 italic normal-case sm:mt-8 sm:text-[16px] md:text-[17px]">
            <WordFade
              words={recognitionWords}
              visible={visible}
              baseDelay={0.42}
              stagger={0.02}
            />
          </p>

          <div
            className="mt-9 sm:mt-10"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-0.75rem)",
              transition: visible
                ? "opacity 0.32s ease-out 0.72s, transform 0.32s ease-out 0.72s"
                : "none",
            }}
          >
            <Link
              href={ROUTES.ABOUT}
              className="group relative inline-block"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 translate-x-1.5 translate-y-1.5 border border-cream/50 transition-colors duration-300 group-hover:border-blush/70 sm:translate-x-2 sm:translate-y-2"
              />
              <span className="relative inline-flex items-center justify-center gap-x-2 border border-cream bg-transparent px-7 py-3 transition-colors duration-300 group-hover:border-blush/80 group-hover:bg-[color-mix(in_srgb,var(--color-blush)_22%,#F7F3EB)] sm:gap-x-2.5 sm:px-8 sm:py-3.5">
                <span className="font-body text-[10px] leading-none font-medium tracking-[0.24em] text-cream uppercase transition-colors duration-300 group-hover:text-ink sm:text-[11px]">
                  Read about
                </span>
                <span className="font-silk inline-block text-[15px] leading-none font-[300] tracking-normal text-cream italic normal-case transition-colors duration-300 group-hover:text-ink sm:text-[17px]">
                  US
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
