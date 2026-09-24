"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const PAPER = "#F7F3EB";

const STEPS = [
  {
    num: "01",
    label: "Discovery",
    body: "Every occasion starts with a conversation, not a questionnaire. We spend real time understanding who a couple is, the story they want told, and the cultures they're bringing together.",
  },
  {
    num: "02",
    label: "Design",
    body: "From there, we build the world around that story: the destination, the concept, the palette, the pacing of the celebration itself.",
  },
  {
    num: "03",
    label: "Direction",
    body: "Every decision, design and production alike, is carried through personally, backed by a decade of relationships with artisans, chefs, and makers around the world. Nothing is diluted between idea and execution.",
  },
  {
    num: "04",
    label: "Celebration",
    body: "The occasion itself, and often, the start of something longer, a relationship many families choose to begin again.",
  },
] as const;

type ProcessTone = "cream" | "slate";

/**
 * AboutProcessTHS — elevated editorial process
 * cream (home) · slate (about)
 */
export default function AboutProcessTHS({
  tone = "cream",
}: {
  tone?: ProcessTone;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const slate = tone === "slate";

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
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const rise = (delay: number, dist = "1rem") =>
    ({
      opacity: visible ? 1 : 0,
      transform: visible ? "translate3d(0,0,0)" : `translate3d(0,${dist},0)`,
      transition: visible
        ? `opacity 0.95s ${EASE} ${delay}s, transform 1.05s ${EASE} ${delay}s`
        : "none",
    }) as const;

  const lineX = (delay: number) =>
    ({
      opacity: visible ? 1 : 0,
      transform: visible ? "scaleX(1)" : "scaleX(0)",
      transition: visible
        ? `opacity 0.7s ${EASE} ${delay}s, transform 1.1s ${EASE} ${delay}s`
        : "none",
    }) as const;

  const lineY = (delay: number) =>
    ({
      opacity: visible ? 1 : 0,
      transform: visible ? "scaleY(1)" : "scaleY(0)",
      transition: visible
        ? `opacity 0.7s ${EASE} ${delay}s, transform 1.05s ${EASE} ${delay}s`
        : "none",
    }) as const;

  const titlePad = slate ? undefined : PAPER;
  const titlePadClass = slate ? "bg-base" : undefined;

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative z-10 w-full overflow-x-clip",
        slate ? "bg-base text-cream" : "text-ink"
      )}
      aria-labelledby="about-process-heading"
      style={slate ? undefined : { backgroundColor: PAPER }}
    >
      <div className="relative mx-auto w-full max-w-[90rem] px-4 pt-16 pb-10 sm:px-6 sm:pt-20 sm:pb-12 md:px-8 md:pt-24 md:pb-14 lg:px-10 lg:pt-28 lg:pb-16">
        <div className="relative mb-10 flex items-center justify-center sm:mb-12 md:mb-14">
          <div
            aria-hidden
            className={cn(
              "absolute inset-x-0 top-1/2 h-px origin-center -translate-y-1/2",
              slate ? "bg-cream/25" : "bg-ink/20"
            )}
            style={lineX(0.05)}
          />
          <h2
            id="about-process-heading"
            className={cn(
              "font-title relative z-10 px-6 text-[30px] leading-none font-normal tracking-[0.14em] uppercase will-change-[opacity,transform] sm:px-8 sm:text-[36px] md:px-10 md:text-[44px] lg:text-[52px]",
              slate ? "bg-base text-cream" : "text-ink",
              titlePadClass
            )}
            style={{
              ...(titlePad ? { backgroundColor: titlePad } : null),
              ...rise(0.12, "0.7rem"),
            }}
          >
            Process
          </h2>
        </div>

        <div
          className={cn(
            "relative border will-change-[opacity,transform]",
            slate ? "border-cream/25" : "border-ink/20"
          )}
          style={rise(0.22, "1.1rem")}
        >
          <ol className="grid list-none grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => {
              const base = 0.32 + i * 0.12;
              return (
                <li key={step.label} className="relative">
                  {i < STEPS.length - 1 ? (
                    <>
                      <span
                        aria-hidden
                        className={cn(
                          "absolute right-10 bottom-0 left-10 h-px origin-center md:hidden",
                          slate ? "bg-cream/15" : "bg-ink/12"
                        )}
                        style={lineX(base + 0.35)}
                      />
                      <span
                        aria-hidden
                        className={cn(
                          "pointer-events-none absolute origin-top",
                          slate ? "bg-cream/15" : "bg-ink/12",
                          i % 2 === 0
                            ? "top-10 right-0 bottom-10 hidden w-px md:block lg:block"
                            : "top-10 right-0 bottom-10 hidden w-px lg:block"
                        )}
                        style={lineY(base + 0.28)}
                      />
                      {i < 2 ? (
                        <span
                          aria-hidden
                          className={cn(
                            "absolute right-10 bottom-0 left-10 h-px origin-center max-lg:md:block lg:hidden",
                            slate ? "bg-cream/15" : "bg-ink/12"
                          )}
                          style={lineX(base + 0.35)}
                        />
                      ) : null}
                    </>
                  ) : null}

                  <article className="relative flex h-full flex-col px-6 py-11 sm:px-8 sm:py-12 md:px-7 md:py-12 lg:px-6 lg:py-14 xl:px-8 xl:py-16">
                    <p
                      aria-hidden
                      className={cn(
                        "font-title mb-5 text-center text-[14px] font-bold tracking-[0.24em] tabular-nums will-change-[opacity,transform] sm:mb-6 sm:text-[15px] md:text-[16px]",
                        slate ? "text-cream/50" : "text-ink/50"
                      )}
                      style={rise(base, "0.55rem")}
                    >
                      {step.num}
                    </p>

                    <h3
                      className={cn(
                        "font-title text-center text-[18px] font-normal leading-[1.1] tracking-[0.16em] uppercase will-change-[opacity,transform] sm:text-[20px] sm:tracking-[0.18em] md:text-[22px] lg:text-[18px] xl:text-[20px]",
                        slate ? "text-cream" : "text-ink"
                      )}
                      style={rise(base + 0.08, "0.65rem")}
                    >
                      {step.label}
                    </h3>

                    <div
                      aria-hidden
                      className={cn(
                        "mx-auto mt-5 h-px w-8 origin-center sm:mt-6 sm:w-9",
                        slate ? "bg-cream/25" : "bg-ink/20"
                      )}
                      style={lineX(base + 0.16)}
                    />

                    <p
                      className={cn(
                        "font-body mt-6 w-full text-center text-[12px] leading-[1.9] font-light tracking-[0.01em] normal-case will-change-[opacity,transform] sm:mt-7 sm:text-[13px] sm:leading-[1.95] md:mt-8 md:text-[14px] md:leading-[2] lg:mt-7 lg:text-[13px] lg:leading-[1.95] xl:mt-8 xl:text-[14px] xl:leading-[2]",
                        slate ? "text-cream/70" : "text-ink/75"
                      )}
                      style={rise(base + 0.22, "0.75rem")}
                    >
                      {step.body}
                    </p>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
