"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const REMARKS = [
  {
    title: "Excellence",
    body: "Excellence is a discipline we return to on every project, without exception. Nothing leaves our hands until it is.",
  },
  {
    title: "Looking Ahead",
    body: "Weddings and private events are where The Hue Story began. We are now developing cultural projects of a considerably greater scale and ambition.",
    coda: "More will be shared in due course.",
  },
] as const;

function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 10" aria-hidden className={className}>
      <path
        d="M5 0l1.1 3.9L10 5 6.1 6.1 5 10 3.9 6.1 0 5l3.9-1.1z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * ClosingRemarksTHS — mist bookend · Excellence | Looking Ahead
 */
export default function ClosingRemarksTHS() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const fadeUp = (delay: string, dist = "1rem") =>
    ({
      opacity: visible ? 1 : 0,
      transform: visible ? "translate3d(0,0,0)" : `translate3d(0,${dist},0)`,
      transition: `opacity 0.9s ${EASE} ${delay}, transform 0.9s ${EASE} ${delay}`,
    }) as const;

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full bg-[#C0C9D2] text-ink"
      aria-label="Excellence and looking ahead"
    >
      <div className="mx-auto w-full max-w-6xl px-6 pt-8 pb-14 sm:px-10 sm:pt-10 sm:pb-16 md:px-12 md:pt-12 md:pb-20 lg:pt-14 lg:pb-24">
        <div
          className="flex flex-col items-center"
          style={fadeUp("0s", "0.6rem")}
        >
          <div className="relative aspect-[1983/793] w-[150px] sm:w-[180px] md:w-[210px]">
            <Image
              src="/images/shapes/flowerpaper.png"
              alt=""
              fill
              sizes="210px"
              className="object-contain"
            />
          </div>
          <p className="font-silk mt-2 text-center text-[20px] leading-snug font-[300] tracking-[0.01em] text-ink/75 italic normal-case sm:mt-3 sm:text-[22px] md:text-[24px]">
            What we hold to, and where we&rsquo;re going
          </p>
        </div>

        <div className="relative mt-10 grid grid-cols-1 gap-12 sm:mt-12 md:mt-14 md:grid-cols-2 md:gap-0">
          <div
            aria-hidden
            className="pointer-events-none absolute top-[12%] bottom-[12%] left-1/2 hidden w-px -translate-x-1/2 bg-ink/20 md:block"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(-50%) scaleY(1)" : "translateX(-50%) scaleY(0)",
              transition: `opacity 0.8s ${EASE} 0.3s, transform 1.1s ${EASE} 0.3s`,
            }}
          />

          {REMARKS.map((remark, i) => (
            <article
              key={remark.title}
              className="flex flex-col items-center text-center md:px-6 lg:px-10"
              style={fadeUp(`${0.15 + i * 0.15}s`)}
            >
              {i > 0 ? (
                <span
                  aria-hidden
                  className="-mt-6 mb-12 flex items-center gap-2 text-ink/30 md:hidden"
                >
                  <span className="block h-px w-10 bg-current" />
                  <Star className="h-2 w-2" />
                  <span className="block h-px w-10 bg-current" />
                </span>
              ) : null}

              <h2 className="font-title text-[30px] leading-[1.05] font-normal tracking-[0.08em] whitespace-nowrap text-ink uppercase sm:text-[36px] md:text-[26px] lg:text-[34px] xl:text-[40px]">
                {remark.title}
              </h2>
              <span aria-hidden className="mt-5 block h-px w-10 bg-ink/30 sm:mt-6" />
              <p className="font-body mt-5 max-w-[26rem] text-[12px] leading-[1.9] font-light tracking-[0.01em] text-ink/80 sm:mt-6 sm:text-[13px] md:text-[13.5px]">
                {remark.body}
              </p>
              {"coda" in remark ? (
                <p className="font-silk mt-4 text-[17px] leading-snug font-[300] tracking-[0.01em] text-ink/75 italic normal-case sm:mt-5 sm:text-[19px]">
                  {remark.coda}
                </p>
              ) : null}
            </article>
          ))}
        </div>

        <div
          aria-hidden
          className="mt-14 flex justify-center text-ink/35 sm:mt-16 md:mt-20"
          style={fadeUp("0.5s", "0.5rem")}
        >
          <Star className="h-3 w-3" />
        </div>
      </div>
    </section>
  );
}
