"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SITE_NAME } from "@/lib/constants";

const QUOTE_LINES = [
  "Chronicles of love,",
  "laughter and good times",
] as const;

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const PAPER = "#F7F3EB";
const INK = "#2C2723";

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`;

function Ornament({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <div className="flex items-center justify-center gap-3 sm:gap-4">
        <span className="h-px w-10 bg-ink/25 sm:w-16 md:w-20" />
        <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 text-ink/45 sm:h-3 sm:w-3">
          <path
            d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"
            fill="currentColor"
          />
        </svg>
        <span className="h-px w-10 bg-ink/25 sm:w-16 md:w-20" />
      </div>
    </div>
  );
}

/**
 * IntentionalHomeTHS — sealed letter: slate canvas · stationery paper · wax seal
 */
export default function IntentionalHomeTHS() {
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

  const item = (delay: number) =>
    ({
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(0.75rem)",
      transition: `opacity 0.9s ${EASE} ${delay}s, transform 0.9s ${EASE} ${delay}s`,
    }) as const;

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full overflow-x-clip bg-base"
      aria-labelledby="intentional-home-heading"
    >
      {/* Soft light pooling behind the letter */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 52%, rgba(241,237,231,0.16) 0%, rgba(241,237,231,0.05) 45%, transparent 75%)",
        }}
      />

      <div className="relative flex w-full justify-center px-5 pt-28 pb-20 sm:px-8 sm:pt-32 sm:pb-24 md:px-10 md:pt-36 md:pb-28 lg:px-14 lg:pt-40 lg:pb-32">
        <div className="relative w-full max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
          {/* Second sheet peeking behind — a letter, not a card */}
          <div
            aria-hidden
            className="absolute inset-0 rotate-[1.6deg]"
            style={{
              backgroundColor: "#EDE6DA",
              boxShadow: "0 10px 30px rgba(20,18,16,0.18)",
              opacity: visible ? 1 : 0,
              transition: `opacity 1s ${EASE} 0.15s`,
            }}
          />

          <div
            className="relative overflow-visible px-7 pt-20 pb-14 text-center sm:px-12 sm:pt-24 sm:pb-16 md:px-16 md:pt-28 md:pb-20 lg:px-20 lg:pt-32 lg:pb-24"
            style={{
              backgroundColor: PAPER,
              boxShadow:
                "0 1px 1px rgba(44,39,35,0.05), 0 18px 50px rgba(20,18,16,0.22), 0 3px 10px rgba(20,18,16,0.1)",
              ...item(0),
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-multiply"
              style={{
                backgroundImage: GRAIN,
                backgroundRepeat: "repeat",
                backgroundSize: "180px 180px",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ boxShadow: "inset 0 0 70px rgba(226,212,190,0.5)" }}
            />

            {/* Stationery double frame */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-3 border border-ink/20 sm:inset-4 md:inset-5"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-[18px] border border-ink/10 sm:inset-[22px] md:inset-[26px]"
            />

            <div className="relative flex flex-col items-center">
              <p
                className="font-body text-[9px] font-medium tracking-[0.34em] text-ink/55 uppercase sm:text-[10px] md:text-[11px]"
                style={item(0.35)}
              >
                It&apos;s all in the details
              </p>

              <Ornament className="mt-5 sm:mt-6" />

              <h2
                id="intentional-home-heading"
                className="font-script mt-7 flex max-w-[19rem] flex-col items-center gap-1 text-center text-[clamp(1.9rem,8vw,2.4rem)] leading-[1.3] tracking-[0.015em] normal-case sm:mt-8 sm:max-w-[32rem] sm:gap-1.5 sm:text-[clamp(2.4rem,4.6vw,3rem)] md:mt-9 md:max-w-none md:text-[clamp(2.8rem,3.4vw,3.4rem)]"
                style={{ color: INK, ...item(0.5) }}
              >
                {QUOTE_LINES.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>

              <Ornament className="mt-7 sm:mt-8 md:mt-9" />

              <p
                className="font-title mt-5 text-[11px] tracking-[0.32em] text-ink/70 uppercase sm:mt-6 sm:text-[12px] md:text-[13px]"
                style={item(0.7)}
              >
                {SITE_NAME}
              </p>
            </div>
          </div>

          {/* Wax seal pressed onto the top edge */}
          <div
            className="absolute top-0 left-1/2 z-20 h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-40 lg:w-40"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible
                ? "translate(-50%, -50%) scale(1) rotate(-6deg)"
                : "translate(-50%, -50%) scale(1.35) rotate(-18deg)",
              transition: `opacity 0.5s ${EASE} 0.55s, transform 0.9s cubic-bezier(0.34, 1.4, 0.64, 1) 0.55s`,
              filter:
                "drop-shadow(0 6px 10px rgba(20,18,16,0.35)) drop-shadow(0 2px 3px rgba(20,18,16,0.25))",
            }}
          >
            <Image
              src="/images/logo/Embossed-logo.png"
              alt={`${SITE_NAME} wax seal`}
              fill
              sizes="(min-width: 1024px) 160px, (min-width: 768px) 144px, (min-width: 640px) 128px, 112px"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
