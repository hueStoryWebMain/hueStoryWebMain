"use client";

import { useEffect, useRef, useState } from "react";

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const STEPS = [
  {
    label: "Discovery",
    roman: "I",
    body: "Every occasion starts with a conversation, not a questionnaire. We spend real time understanding who a couple is, the story they want told, and the cultures they're bringing together.",
  },
  {
    label: "Design",
    roman: "II",
    body: "From there, we build the world around that story: the destination, the concept, the palette, the pacing of the celebration itself.",
  },
  {
    label: "Direction",
    roman: "III",
    body: "Every decision, design and production alike, is carried through personally, backed by a decade of relationships with artisans, chefs, and makers around the world. Nothing is diluted between idea and execution.",
  },
  {
    label: "Celebration",
    roman: "IV",
    body: "The occasion itself, and often, the start of something longer — a relationship many families choose to begin again.",
  },
] as const;

/**
 * AboutProcessTHS — slate · editorial process steps
 */
export default function AboutProcessTHS() {
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
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const fade = (delay: string, dist = "1.1rem") =>
    ({
      opacity: visible ? 1 : 0,
      transform: visible ? "translate3d(0,0,0)" : `translate3d(0,${dist},0)`,
      transition: `opacity 1.15s ${EASE} ${delay}, transform 1.25s ${EASE} ${delay}`,
    }) as const;

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full overflow-x-clip bg-base text-cream"
      aria-labelledby="about-process-heading"
    >
      <div className="relative mx-auto w-full max-w-5xl px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-28 lg:px-12 lg:py-32">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="about-process-heading"
            className="font-title text-[28px] leading-[1.1] font-normal tracking-[0.08em] text-cream uppercase sm:text-[34px] md:text-[42px] lg:text-[48px]"
            style={fade("0.08s", "1rem")}
          >
            The Process
          </h2>

          <p
            className="font-silk mx-auto mt-5 max-w-md text-[15px] font-[200] leading-snug tracking-[0.01em] text-cream/65 italic normal-case sm:mt-6 sm:text-[16px] md:text-[17px]"
            style={fade("0.18s", "0.75rem")}
          >
            From first conversation to lasting relationship.
          </p>

          <div
            aria-hidden
            className="mx-auto mt-7 h-px w-12 origin-center bg-cream/25 sm:mt-8"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "scaleX(1)" : "scaleX(0.35)",
              transition: `opacity 1s ${EASE} 0.26s, transform 1.15s ${EASE} 0.26s`,
            }}
          />
        </div>

        {/* Steps */}
        <ol className="mx-auto mt-14 max-w-3xl list-none space-y-0 sm:mt-16 md:mt-20">
          {STEPS.map((step, i) => (
            <li
              key={step.label}
              className="relative border-t border-cream/15 py-9 first:border-t-0 first:pt-0 sm:py-10 md:py-11"
              style={fade(`${0.36 + i * 0.12}s`, "1.15rem")}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-[4.5rem_1fr] sm:gap-8 md:grid-cols-[5.5rem_1fr] md:gap-10">
                <p
                  aria-hidden
                  className="font-title pt-0.5 text-[11px] font-normal tracking-[0.22em] text-cream/40 tabular-nums sm:text-[12px]"
                >
                  {step.roman}
                </p>

                <div>
                  <h3 className="font-title text-[18px] font-normal tracking-[0.12em] text-cream uppercase sm:text-[20px] md:text-[22px]">
                    {step.label}
                  </h3>
                  <p className="font-silk mt-3 max-w-xl text-[13px] leading-[1.8] font-[300] tracking-[0.01em] text-cream/75 not-italic normal-case sm:mt-3.5 sm:text-[14px] sm:leading-[1.85] md:text-[15px]">
                    {step.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
