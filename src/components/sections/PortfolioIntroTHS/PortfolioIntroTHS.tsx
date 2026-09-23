"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const FLOWER = "/images/shapes/flowerPaperCreame.png";

const TITLE = ["Colour chosen once.", "Told across every frame."] as const;

const LEAD =
  "A portfolio is never a catalogue. It is a sequence of decisions held in light, colour, and quiet. Each frame here was chosen once, then carried through.";

const IMAGES = {
  one: {
    src: "/images/section-images/026_2500x3693.webp",
    alt: "A celebration held in soft evening light",
  },
  two: {
    src: "/images/section-images/041_2500x3945.webp",
    alt: "Intimate portrait from a destination wedding",
  },
  three: {
    src: "/images/section-images/010_2500x3750.webp",
    alt: "Floral and table detail in editorial light",
  },
  four: {
    src: "/images/section-images/003_2500x3766.webp",
    alt: "Guests gathered in a sunlit courtyard",
  },
} as const;

/**
 * PortfolioIntroTHS — slate · overlapping editorial collage
 * Desktop & mobile layouts are isolated (md breakpoint).
 */
export default function PortfolioIntroTHS() {
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
      { threshold: 0.06, rootMargin: "0px 0px -4% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const fade = (delay: string, dist = "1.2rem", duration = "1.4s") =>
    ({
      opacity: visible ? 1 : 0,
      transform: visible ? "translate3d(0,0,0)" : `translate3d(0,${dist},0)`,
      transition: `opacity ${duration} ${EASE} ${delay}, transform ${duration} ${EASE} ${delay}`,
    }) as const;

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full overflow-x-clip bg-base text-cream"
      aria-labelledby="portfolio-intro-heading"
    >
      {/* ——— Intro ——— */}
      <div className="relative mx-auto flex w-full max-w-2xl flex-col items-center px-5 pt-8 text-center sm:px-8 sm:pt-10 md:pt-12 lg:pt-14">
        <div
          className="relative mb-2.5 h-11 w-11 will-change-[opacity,transform] sm:mb-3 sm:h-12 sm:w-12 md:mb-3.5 md:h-14 md:w-14"
          style={{
            ...fade("0.04s", "0.75rem", "1.2s"),
            transform: visible
              ? "translate3d(0,0,0) rotate(-8deg)"
              : "translate3d(0,0.75rem,0) rotate(-8deg)",
          }}
        >
          <Image
            src={FLOWER}
            alt=""
            fill
            sizes="56px"
            className="object-contain"
            aria-hidden
          />
        </div>

        <h2
          id="portfolio-intro-heading"
          className="will-change-[opacity,transform]"
          style={fade("0.12s", "0.9rem", "1.35s")}
        >
          {TITLE.map((line) => (
            <span
              key={line}
              className="font-title block text-[clamp(1.3rem,3.8vw,2.15rem)] leading-[1.2] font-normal tracking-[0.05em] text-cream uppercase"
            >
              {line}
            </span>
          ))}
        </h2>

        <p
          className="font-heading mt-5 max-w-md text-[11px] leading-[1.7] font-normal tracking-[0.04em] text-cream/75 not-italic normal-case will-change-[opacity,transform] sm:mt-6 sm:text-[12px] md:text-[13px]"
          style={fade("0.24s", "0.8rem", "1.25s")}
        >
          {LEAD}
        </p>
      </div>

      {/* ================================================================ */}
      {/* DESKTOP — dense overlapping collage (md+)                        */}
      {/* Height from image 1 in-flow; others absolute on top of it         */}
      {/* ================================================================ */}
      <div className="relative hidden w-full pt-14 md:block lg:pt-16">
        <div className="relative w-full">
          {/* 1 — in flow, defines height, flush left */}
          <figure
            className="relative z-10 w-[48%] will-change-[opacity,transform] lg:w-[46%]"
            style={fade("0.2s", "1.5rem", "1.5s")}
          >
            <div className="relative aspect-[3/4] overflow-hidden shadow-[0_28px_70px_rgba(28,24,22,0.45)]">
              <Image
                src={IMAGES.one.src}
                alt={IMAGES.one.alt}
                fill
                sizes="48vw"
                className="object-cover object-[center_18%]"
                priority
              />
            </div>
          </figure>

          {/* 2 — overlaps right side of 1 */}
          <figure
            className="absolute top-[12%] left-[36%] z-20 w-[30%] will-change-[opacity,transform] lg:left-[34%] lg:w-[28%]"
            style={fade("0.34s", "1.4rem", "1.45s")}
          >
            <div className="relative aspect-[3/4] overflow-hidden shadow-[0_24px_56px_rgba(28,24,22,0.42)]">
              <Image
                src={IMAGES.two.src}
                alt={IMAGES.two.alt}
                fill
                sizes="30vw"
                className="object-cover object-[center_20%]"
              />
            </div>
          </figure>

          {/* Script — above fourth image, right side */}
          <p
            className="font-script pointer-events-none absolute top-[16%] right-[2%] z-40 origin-center whitespace-nowrap text-center text-[clamp(3.75rem,6.5vw,6.25rem)] leading-none tracking-[0.01em] text-cream normal-case will-change-[opacity,transform] select-none lg:right-[4%]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible
                ? "rotate(-12deg)"
                : "translate3d(0,1rem,0) rotate(-12deg)",
              transition: `opacity 1.5s ${EASE} 0.45s, transform 1.6s ${EASE} 0.45s`,
              textShadow: "0 10px 32px rgba(28,24,22,0.45)",
            }}
          >
            Intentional Hue
          </p>

          {/* 3 — overlaps script / mid-right of field */}
          <figure
            className="absolute top-[48%] left-[52%] z-30 w-[28%] will-change-[opacity,transform] lg:left-[54%] lg:w-[26%]"
            style={fade("0.5s", "1.35rem", "1.45s")}
          >
            <div className="relative aspect-[3/4] overflow-hidden shadow-[0_22px_54px_rgba(28,24,22,0.42)]">
              <Image
                src={IMAGES.three.src}
                alt={IMAGES.three.alt}
                fill
                sizes="28vw"
                className="object-cover object-center"
              />
            </div>
          </figure>

          {/* 4 — overlaps 3, flush right; sits within image-1 height band */}
          <figure
            className="absolute top-[28%] right-0 z-20 w-[32%] will-change-[opacity,transform] lg:w-[30%]"
            style={fade("0.62s", "1.3rem", "1.45s")}
          >
            <div className="relative aspect-[3/4] overflow-hidden shadow-[0_22px_54px_rgba(28,24,22,0.4)]">
              <Image
                src={IMAGES.four.src}
                alt={IMAGES.four.alt}
                fill
                sizes="32vw"
                className="object-cover object-[center_12%]"
              />
            </div>
          </figure>

          {/* Spacer so image 3 (lower) has room below image 1's box */}
          <div className="pointer-events-none w-full pb-[12%]" aria-hidden />
        </div>
      </div>

      {/* ================================================================ */}
      {/* MOBILE — simple overlap (isolated)                               */}
      {/* ================================================================ */}
      <div className="relative w-full pt-12 md:hidden">
        <div className="relative w-full">
          <figure
            className="relative z-10 w-[72%] will-change-[opacity,transform]"
            style={fade("0.2s", "1.3rem", "1.4s")}
          >
            <div className="relative aspect-[3/4] overflow-hidden shadow-[0_18px_40px_rgba(28,24,22,0.4)]">
              <Image
                src={IMAGES.one.src}
                alt={IMAGES.one.alt}
                fill
                sizes="72vw"
                className="object-cover object-[center_18%]"
                priority
              />
            </div>
          </figure>
          <figure
            className="absolute top-[14%] right-0 z-20 w-[50%] will-change-[opacity,transform]"
            style={fade("0.34s", "1.2rem", "1.35s")}
          >
            <div className="relative aspect-[3/4] overflow-hidden shadow-[0_14px_32px_rgba(28,24,22,0.38)]">
              <Image
                src={IMAGES.two.src}
                alt={IMAGES.two.alt}
                fill
                sizes="50vw"
                className="object-cover object-[center_20%]"
              />
            </div>
          </figure>
        </div>

        <div className="relative z-30 flex justify-center px-4 py-8">
          <p
            className="font-script pointer-events-none text-center text-[clamp(2.2rem,10vw,3rem)] leading-[1.05] tracking-[0.01em] text-cream normal-case will-change-[opacity,transform] select-none"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible
                ? "rotate(-11deg)"
                : "translate3d(0,0.85rem,0) rotate(-11deg)",
              transition: `opacity 1.35s ${EASE} 0.4s, transform 1.45s ${EASE} 0.4s`,
              textShadow: "0 8px 24px rgba(28,24,22,0.35)",
            }}
          >
            Intentional Hue
          </p>
        </div>

        <div className="relative w-full pb-[82%]">
          <figure
            className="absolute top-[8%] left-0 z-20 w-[50%] will-change-[opacity,transform]"
            style={fade("0.5s", "1.2rem", "1.35s")}
          >
            <div className="relative aspect-[3/4] overflow-hidden shadow-[0_14px_32px_rgba(28,24,22,0.38)]">
              <Image
                src={IMAGES.three.src}
                alt={IMAGES.three.alt}
                fill
                sizes="50vw"
                className="object-cover object-center"
              />
            </div>
          </figure>
          <figure
            className="absolute top-0 right-0 z-10 w-[52%] will-change-[opacity,transform]"
            style={fade("0.62s", "1.1rem", "1.35s")}
          >
            <div className="relative aspect-[3/4] overflow-hidden shadow-[0_14px_32px_rgba(28,24,22,0.38)]">
              <Image
                src={IMAGES.four.src}
                alt={IMAGES.four.alt}
                fill
                sizes="52vw"
                className="object-cover object-[center_12%]"
              />
            </div>
          </figure>
        </div>
      </div>

      {/* ——— Closing hairline ——— */}
      <div className="relative z-50 flex w-full justify-center pt-3 pb-12 sm:pt-3 sm:pb-14 md:pt-3 md:pb-16 lg:pb-20">
        <div
          aria-hidden
          className="h-px w-16 origin-center bg-cream/35 sm:w-20"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scaleX(1)" : "scaleX(0.35)",
            transition: `opacity 1.1s ${EASE} 0.75s, transform 1.2s ${EASE} 0.75s`,
          }}
        />
      </div>
    </section>
  );
}
