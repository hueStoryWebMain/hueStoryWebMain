"use client";

import { useEffect, useRef, useState } from "react";
import { PATTERN_BG } from "@/lib/constants";

/**
 * AboutHomeTHS — pattern-framed cream paper panel
 * Sticky pattern bg · paper scrolls over it
 */
export default function AboutHomeTHS() {
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
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const item = (delay: string) =>
    ({
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(0.75rem)",
      transition: `opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1) ${delay}, transform 0.85s cubic-bezier(0.22, 1, 0.36, 1) ${delay}`,
    }) as const;

  const patternStyle = {
    backgroundColor: "var(--color-base)",
    backgroundImage: `url(${PATTERN_BG.aboutTHS})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
  } as const;

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full"
      aria-labelledby="about-home-heading"
      style={patternStyle}
    >
      {/* Full-section fill — stops slate peeking through on iOS sticky/vh gaps */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={patternStyle}
      >
        <div className="absolute inset-0 bg-base/45" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Pinned pattern — dvh covers iPhone chrome expand/collapse */}
      <div
        className="sticky top-0 h-[100dvh] min-h-[100svh] w-full overflow-hidden"
        aria-hidden
        style={patternStyle}
      >
        <div className="pointer-events-none absolute inset-0 bg-base/45" />
        <div className="pointer-events-none absolute inset-0 bg-black/30" />
      </div>

      {/* Paper scrolls over pattern */}
      <div className="relative z-10 -mt-[100dvh] flex w-full justify-center px-5 pb-20 pt-[14svh] sm:px-8 sm:pb-24 sm:pt-[16svh] md:px-10 md:pb-28 md:pt-[18svh] lg:px-14 lg:pb-32">
        <div
          className="relative w-full max-w-3xl overflow-visible px-7 py-14 pb-16 text-center text-ink sm:px-12 sm:py-16 sm:pb-[4.25rem] md:max-w-4xl md:px-16 md:py-20 md:pb-20 lg:px-20 lg:py-24"
          style={{
            backgroundColor: "#F7F3EB",
            boxShadow:
              "0 1px 1px rgba(44,39,35,0.04), 0 12px 40px rgba(44,39,35,0.12), 0 2px 8px rgba(44,39,35,0.06)",
            ...item("0s"),
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-multiply"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
              backgroundSize: "180px 180px",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              boxShadow: "inset 0 0 60px rgba(232,220,200,0.45)",
            }}
          />

          <div className="relative">
            <h2
              id="about-home-heading"
              className="font-title text-[20px] font-normal leading-[1.2] tracking-[0.08em] text-ink uppercase sm:text-[24px] md:text-[28px] lg:text-[32px]"
              style={item("0.1s")}
            >
              An Atelier for the World
              <span className="font-silk inline-block px-[0.04em] text-[0.9em] leading-none font-[400] not-italic normal-case text-ink">
                ’
              </span>
              s Weddings
            </h2>

            <p
              className="font-script mt-5 text-[26px] leading-snug text-ink/80 normal-case sm:mt-6 sm:text-[32px] md:text-[38px] lg:text-[42px]"
              style={item("0.22s")}
            >
              Curating Memories Of A Lifetime
            </p>

            <p
              className="font-body mx-auto mt-8 max-w-xl text-[12px] leading-[1.85] font-light tracking-[0.01em] text-ink/80 sm:mt-10 sm:text-[13px] sm:leading-[1.9] md:mt-12 md:max-w-2xl md:text-[14px] md:leading-[1.95]"
              style={item("0.36s")}
            >
              The Hue Story was founded on a conviction that has never wavered:
              an occasion of real significance deserves genuine authorship.
              Every project is led personally, from the first conversation to
              the final toast, by a team built over a decade with artisans,
              chefs, and makers around the world.
            </p>

            <p
              className="font-body mx-auto mt-5 max-w-xl text-[12px] leading-[1.85] font-light tracking-[0.01em] text-ink/80 sm:mt-6 sm:text-[13px] sm:leading-[1.9] md:max-w-2xl md:text-[14px] md:leading-[1.95]"
              style={item("0.48s")}
            >
              That decade gives us range: precision paired with cultural depth,
              equally at home in a Rajasthani palace, a Balinese cliffside, or a
              California vineyard, the elegance particular to each occasion.
            </p>

            <p
              className="font-body mx-auto mt-8 max-w-lg text-[11px] leading-[1.7] font-medium tracking-[0.12em] text-ink/55 uppercase sm:mt-10 sm:text-[12px]"
              style={item("0.6s")}
            >
              Featured In{" "}
              <span className="font-silk text-[14px] font-[300] tracking-[0.02em] text-ink/70 italic uppercase sm:text-[15px] md:text-[16px]">
                Vogue, Architectural Digest and the Vogue Wedding Book
              </span>
            </p>
          </div>

          <p
            className="font-script pointer-events-none absolute right-5 bottom-4 z-20 text-[36px] font-normal leading-none tracking-[0.02em] normal-case sm:right-7 sm:bottom-5 sm:text-[42px] md:right-8 md:bottom-6 md:text-[48px] lg:text-[54px]"
            style={{
              color: "#2C2723",
              opacity: visible ? 1 : 0,
              transform: visible
                ? "translateY(0) rotate(-12deg)"
                : "translateY(0.75rem) rotate(-12deg)",
              transition:
                "opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.72s, transform 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.72s",
            }}
          >
            authored
          </p>
        </div>
      </div>
    </section>
  );
}
