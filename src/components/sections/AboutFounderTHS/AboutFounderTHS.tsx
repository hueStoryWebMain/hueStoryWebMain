"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FOUNDER } from "@/lib/constants";

const FLOWER = "/images/shapes/flowersbluePink.png";

const INTRO = [
  "Roshni Kurup is a cultural strategist, creative director, and entrepreneur whose work explores the relationship between culture, place, aesthetics, and human experience.",
  "Her career has spanned strategy, finance, investment, entrepreneurship, luxury hospitality, and experiential design, with a life shaped across India, Singapore, Bali, and the United States.",
  "She is the co-founder and creative director of The Hue Story, a luxury experiential design and destination events company, and has developed projects across hospitality, culture, design, and creative storytelling. Her wider body of work includes Belong and Tranquebar, alongside a growing portfolio of creative and cultural ventures.",
] as const;

const CLOSING = [
  "Her work brings together strategic thinking, cultural fluency, creative direction, and a deep interest in place and identity. She is particularly drawn to the intersections of art, architecture, design, craft, history, and everyday life.",
  "Roshni's practice is, at its core, about creating spaces, experiences, and ideas that make culture tangible, meaningful, and alive.",
] as const;

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * AboutFounderTHS — paper cream · names first · soft portrait fade-up · bio
 */
export default function AboutFounderTHS() {
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
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const fade = (delay: string, dist = "1.1rem", duration = "1.3s") =>
    ({
      opacity: visible ? 1 : 0,
      transform: visible ? "translate3d(0,0,0)" : `translate3d(0,${dist},0)`,
      transition: `opacity ${duration} ${EASE} ${delay}, transform ${duration} ${EASE} ${delay}`,
    }) as const;

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full overflow-x-clip text-ink"
      aria-labelledby="about-founder-heading"
      style={{ backgroundColor: "#F7F3EB" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.32] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 80px rgba(232,220,200,0.4)" }}
      />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-5 pt-14 pb-10 sm:px-8 sm:pt-16 sm:pb-12 md:pt-20 md:pb-14 lg:pt-24">
        <p
          aria-hidden
          className="font-title pointer-events-none relative z-0 -mb-[0.32em] text-center text-[clamp(3.75rem,18vw,9.5rem)] leading-none font-normal tracking-[0.06em] text-ink uppercase select-none will-change-[opacity,transform]"
          style={fade("0.06s", "1.35rem", "1.45s")}
        >
          Roshni
        </p>

        <div className="relative z-10 w-[min(68vw,280px)] sm:w-[min(52vw,320px)] md:w-[340px] lg:w-[380px]">
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[124%] w-[132%] will-change-[opacity,transform] sm:h-[132%] sm:w-[140%] md:h-[138%] md:w-[148%]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible
                ? "translate(-50%, -48%) scale(1) rotate(0deg)"
                : "translate(-50%, -48%) scale(0.92) rotate(-6deg)",
              transition: `opacity 1.5s ${EASE} 0.55s, transform 1.7s ${EASE} 0.55s`,
            }}
          >
            <Image
              src={FLOWER}
              alt=""
              fill
              sizes="(max-width: 768px) 90vw, 520px"
              className="object-contain object-center opacity-95"
              priority
            />
          </div>

          {/* Portrait — simple fade up only */}
          <div
            className="relative z-10 aspect-[3/4] w-full overflow-hidden shadow-[0_18px_48px_rgba(44,39,35,0.18)] will-change-[opacity,transform]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible
                ? "translate3d(0,0,0)"
                : "translate3d(0,1.1rem,0)",
              transition: `opacity 1.2s ${EASE} 0.85s, transform 1.2s ${EASE} 0.85s`,
            }}
          >
            <Image
              src={FOUNDER.image}
              alt={`${FOUNDER.name}, co-founder and creative director of The Hue Story`}
              fill
              sizes="(max-width: 768px) 70vw, 380px"
              className="object-cover object-[center_18%]"
              priority
            />
          </div>
        </div>

        <p
          id="about-founder-heading"
          className="font-title pointer-events-none relative z-0 -mt-[0.42em] text-center text-[clamp(3.75rem,18vw,9.5rem)] leading-none font-normal tracking-[0.06em] text-ink uppercase select-none will-change-[opacity,transform]"
          style={fade("0.28s", "1.35rem", "1.45s")}
        >
          Kurup
        </p>
      </div>

      <div className="relative mx-auto w-full max-w-3xl px-6 pb-20 sm:px-8 sm:pb-24 md:px-10 md:pb-28 lg:pb-32">
        <p
          className="font-body text-center text-[10px] font-medium tracking-[0.28em] text-ink/50 uppercase will-change-[opacity,transform] sm:text-[11px]"
          style={fade("1.55s", "0.65rem", "1.2s")}
        >
          Co-founder &amp; Creative Director
        </p>

        <div
          aria-hidden
          className="mx-auto mt-4 h-px w-10 origin-center bg-ink/25 sm:mt-5"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scaleX(1)" : "scaleX(0.3)",
            transition: `opacity 1.1s ${EASE} 1.65s, transform 1.25s ${EASE} 1.65s`,
          }}
        />

        <div className="mt-8 space-y-5 sm:mt-10 sm:space-y-6">
          {INTRO.map((para, i) => (
            <p
              key={para.slice(0, 28)}
              className="font-silk text-center text-[14px] leading-[1.8] font-[300] tracking-[0.01em] text-ink/85 not-italic normal-case will-change-[opacity,transform] sm:text-[15px] sm:leading-[1.85] md:text-[16px]"
              style={fade(`${1.75 + i * 0.14}s`, "0.85rem", "1.25s")}
            >
              {para}
            </p>
          ))}
        </div>

        <div
          aria-hidden
          className="mx-auto mt-9 h-px w-10 origin-center bg-ink/20 sm:mt-11"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scaleX(1)" : "scaleX(0.3)",
            transition: `opacity 1.1s ${EASE} 2.15s, transform 1.25s ${EASE} 2.15s`,
          }}
        />

        <div className="mt-8 space-y-5 sm:mt-10 sm:space-y-6">
          {CLOSING.map((para, i) => (
            <p
              key={para.slice(0, 28)}
              className="font-silk text-center text-[14px] leading-[1.8] font-[300] tracking-[0.01em] text-ink/85 not-italic normal-case will-change-[opacity,transform] sm:text-[15px] sm:leading-[1.85] md:text-[16px]"
              style={fade(`${2.25 + i * 0.14}s`, "0.85rem", "1.25s")}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
