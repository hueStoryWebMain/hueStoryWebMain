"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const QUOTE_LINES = [
  "It's all in the details,",
  "made with love, finesse & craft,",
  "opulent yet understated",
] as const;

/**
 * IntentionalHomeTHS — slate canvas · cream paper plate · script quote
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

  const item = (delay: string) =>
    ({
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(0.75rem)",
      transition: `opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1) ${delay}, transform 0.85s cubic-bezier(0.22, 1, 0.36, 1) ${delay}`,
    }) as const;

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full bg-base"
      aria-labelledby="intentional-home-heading"
    >
      <div className="flex w-full justify-center px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-28 lg:px-14 lg:py-32">
        <div
          className="relative w-full max-w-xl overflow-visible px-8 pt-6 pb-16 text-center sm:max-w-2xl sm:px-12 sm:pt-7 sm:pb-20 md:max-w-3xl md:px-16 md:pt-8 md:pb-24 lg:max-w-4xl lg:px-20 lg:pt-9 lg:pb-28"
          style={{
            backgroundColor: "#F7F3EB",
            boxShadow:
              "0 1px 1px rgba(44,39,35,0.04), 0 12px 40px rgba(44,39,35,0.12), 0 2px 8px rgba(44,39,35,0.06)",
            ...item("0s"),
          }}
        >
          {/* Paper grain — same treatment as AboutHomeTHS */}
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

          {/* Thin L-corners on the plate */}
          <span
            aria-hidden
            className="pointer-events-none absolute top-4 left-4 z-10 h-5 w-5 border-t border-l border-ink/25 sm:top-5 sm:left-5 sm:h-6 sm:w-6"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute top-4 right-4 z-10 h-5 w-5 border-t border-r border-ink/25 sm:top-5 sm:right-5 sm:h-6 sm:w-6"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-4 left-4 z-10 h-5 w-5 border-b border-l border-ink/25 sm:bottom-5 sm:left-5 sm:h-6 sm:w-6"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute right-4 bottom-4 z-10 h-5 w-5 border-r border-b border-ink/25 sm:right-5 sm:bottom-5 sm:h-6 sm:w-6"
          />

          <div className="relative flex flex-col items-center">
            <div
              className="relative mb-6 h-16 w-16 sm:mb-8 sm:h-20 sm:w-20 md:mb-10 md:h-24 md:w-24"
              style={{
                ...item("0.08s"),
                transform: visible
                  ? "translateY(0) rotate(-18deg)"
                  : "translateY(0.75rem) rotate(-18deg)",
              }}
            >
              <Image
                src="/images/shapes/flowersbluePink.png"
                alt=""
                fill
                sizes="96px"
                className="object-contain"
                aria-hidden
              />
            </div>

            <h2
              id="intentional-home-heading"
              className="font-script flex max-w-[19rem] flex-col items-center gap-1 text-center text-[clamp(1.65rem,6.5vw,2.15rem)] leading-[1.3] tracking-[0.015em] normal-case sm:max-w-[28rem] sm:gap-1.5 sm:text-[clamp(1.9rem,3.8vw,2.5rem)] md:max-w-none md:text-[clamp(2.1rem,2.8vw,2.75rem)]"
              style={{
                color: "#2C2723",
                ...item("0.18s"),
              }}
            >
              {QUOTE_LINES.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
