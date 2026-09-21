"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ABOUT_HOME_IMAGES } from "@/lib/constants";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const ROTATE_MS = 32_000;

const TESTIMONIALS = [
  {
    image: ABOUT_HOME_IMAGES.couple1,
    name: "Ananya & Rohan",
    place: "Udaipur · 2024",
    pull:
      "Every detail carried meaning — from the flowers to the final toast.",
    paraA:
      "Working with The Hue Story felt like being gently guided through something sacred. Our families still talk about those days as if they happened yesterday.",
    paraB:
      "Nothing was rushed. Every choice felt considered, quiet, and entirely our own — a celebration we continue to carry with us.",
  },
  {
    image: ABOUT_HOME_IMAGES.couple2,
    name: "Meera & James",
    place: "Tuscany · 2023",
    pull: "They held our two cultures with such grace and care.",
    paraA:
      "Nothing felt forced — just texture upon texture until the celebration felt entirely ours. Guests still write to us about how deeply moved they were.",
    paraB:
      "From the first conversation onward, we felt understood. Two traditions found one shared language, and it was quietly beautiful.",
  },
  {
    image: "/images/section-images/013_2500x3333.webp",
    name: "Priya & Arjun",
    place: "Jaipur · 2024",
    pull: "Richness without excess — beauty that never shouts.",
    paraA:
      "From the first conversation to the last dance, everything was considered. The restraint they bring is rare, and we felt held the entire way.",
    paraB:
      "It was editorial in the best sense: precise, warm, and unforgettable for everyone who gathered with us that week.",
  },
  {
    image: "/images/section-images/018_2500x3841.webp",
    name: "Sofia & Kabir",
    place: "Bali · 2025",
    pull: "It did not feel like planning — it felt like authoring a memory.",
    paraA:
      "The Hue Story made space for our families, our stories, and a shared language we did not know we needed until it appeared.",
    paraB:
      "What remains is not only the photographs, but the feeling of being seen, guided, and celebrated with quiet, lasting care.",
  },
] as const;

/**
 * TestimonialHomeTHS — slate · KIND WORDS · instant-ready crossfade carousel
 */
export default function TestimonialHomeTHS() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  const goNext = () => {
    setIndex((current) => (current + 1) % TESTIMONIALS.length);
  };

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
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % TESTIMONIALS.length);
    }, ROTATE_MS);

    return () => window.clearInterval(id);
  }, [visible]);

  const fadeUp = (delay: string, dist = "1rem") =>
    ({
      opacity: visible ? 1 : 0,
      transform: visible ? "translate3d(0,0,0)" : `translate3d(0,${dist},0)`,
      transition: `opacity 0.95s ${EASE} ${delay}, transform 0.95s ${EASE} ${delay}`,
    }) as const;

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full overflow-x-clip bg-base"
      aria-labelledby="testimonial-home-heading"
      aria-roledescription="carousel"
    >
      <p
        aria-hidden
        className="font-title pointer-events-none absolute top-4 right-4 z-20 text-[11px] font-normal tracking-[0.28em] text-cream/45 uppercase sm:top-5 sm:right-5 sm:text-[12px] md:top-6 md:right-6 md:text-[13px] lg:top-7 lg:right-8"
        style={fadeUp("0.1s", "0.5rem")}
      >
        Letters
      </p>

      {/* Warm decode — all slides ready before first swap */}
      <div className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden>
        {TESTIMONIALS.map((item) => (
          <Image
            key={`preload-${item.image}`}
            src={item.image}
            alt=""
            width={8}
            height={10}
            priority
          />
        ))}
      </div>

      <div className="relative mx-auto w-full max-w-[1400px] px-0 pt-3 pb-16 sm:pt-4 sm:pb-20 md:pt-5 md:pb-24 lg:pt-6 lg:pb-28">
        <div className="relative z-0 px-5 sm:px-8 lg:px-10">
          <p
            className="font-script mb-2 text-center text-[22px] leading-none tracking-[0.01em] text-cream/70 normal-case sm:mb-2.5 sm:text-[26px] md:mb-3 md:pl-[38%] md:text-left md:text-[28px] lg:pl-[36%] xl:pl-[34%]"
            style={fadeUp("0.02s", "0.75rem")}
          >
            from our couples
          </p>
          <h2
            id="testimonial-home-heading"
            className="font-title pointer-events-none text-center text-[42px] leading-[0.92] font-normal tracking-[0.08em] text-cream uppercase sm:text-[56px] md:text-left md:text-[72px] lg:text-[88px] xl:text-[104px]"
            style={fadeUp("0.06s", "1.25rem")}
          >
            <span className="block md:pl-[38%] lg:pl-[36%] xl:pl-[34%]">
              Kind
            </span>
            <span className="block md:pl-[38%] lg:pl-[36%] xl:pl-[34%]">
              Words
            </span>
          </h2>
        </div>

        <div className="relative z-10 mt-[-1.25rem] grid grid-cols-1 items-start gap-6 px-5 sm:mt-[-1.75rem] sm:px-8 md:mt-[-2.25rem] md:grid-cols-12 md:gap-8 md:px-10 lg:mt-[-2.75rem] lg:gap-10">
          <div
            className="mx-auto flex w-full max-w-[320px] flex-col sm:max-w-[360px] md:col-span-5 md:mx-0 md:max-w-none lg:col-span-5 xl:col-span-4"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible
                ? "translate3d(0,0,0)"
                : "translate3d(0,1.2rem,0)",
              transition: `opacity 1.1s ${EASE} 0.12s, transform 1.25s ${EASE} 0.12s`,
            }}
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
              {TESTIMONIALS.map((item, i) => (
                <div
                  key={item.image}
                  className="absolute inset-0"
                  style={{
                    opacity: i === index ? 1 : 0,
                    transition: `opacity 0.85s ${EASE}`,
                    zIndex: i === index ? 1 : 0,
                  }}
                  aria-hidden={i !== index}
                >
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 80vw, 40vw"
                    className="object-cover object-center"
                    priority
                  />
                </div>
              ))}
              <span
                aria-hidden
                className="pointer-events-none absolute top-3 left-3 z-10 h-5 w-5 border-t border-l border-cream/55 sm:top-4 sm:left-4 sm:h-6 sm:w-6"
              />
              <p
                aria-live="polite"
                className="font-title pointer-events-none absolute right-3 bottom-3 z-10 text-[10px] font-normal tracking-[0.22em] text-cream/80 tabular-nums sm:right-4 sm:bottom-4 sm:text-[11px]"
              >
                {String(index + 1).padStart(2, "0")}
                <span className="mx-1.5 text-cream/45">/</span>
                {String(TESTIMONIALS.length).padStart(2, "0")}
              </p>
            </div>

            <button
              type="button"
              onClick={goNext}
              className="group mt-4 flex items-center justify-end gap-3 self-end sm:mt-5"
              aria-label="Read next testimonial"
            >
              <span className="font-body text-[10px] font-medium tracking-[0.22em] text-cream/70 uppercase transition-colors duration-300 group-hover:text-cream sm:text-[11px]">
                Read next
              </span>
              <span
                aria-hidden
                className="flex items-center gap-2 text-cream/55 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cream"
              >
                <span className="block h-px w-8 bg-current sm:w-10" />
                <span className="font-body text-[13px] leading-none">→</span>
              </span>
            </button>
          </div>

          <div
            className="relative md:col-span-7 lg:col-span-7 xl:col-span-8 xl:max-w-xl xl:justify-self-end"
            style={fadeUp("0.28s", "1.1rem")}
          >
            <div
              className="relative overflow-hidden px-7 py-9 sm:px-9 sm:py-11 md:px-10 md:py-12 lg:px-12 lg:py-14"
              style={{
                backgroundColor: "#F7F3EB",
                boxShadow:
                  "0 1px 1px rgba(44,39,35,0.04), 0 14px 40px rgba(0,0,0,0.18)",
              }}
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
                style={{
                  boxShadow: "inset 0 0 50px rgba(232,220,200,0.4)",
                }}
              />

              <span
                aria-hidden
                className="pointer-events-none absolute top-4 left-4 z-10 h-4 w-4 border-t border-l border-ink/20 sm:top-5 sm:left-5 sm:h-5 sm:w-5"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute right-4 bottom-4 z-10 h-4 w-4 border-r border-b border-ink/20 sm:right-5 sm:bottom-5 sm:h-5 sm:w-5"
              />

              {/* Stacked copy — true crossfade, no blank gap */}
              <div
                className="relative min-h-[22rem] sm:min-h-[24rem] md:min-h-[26rem]"
                aria-live="polite"
              >
                {TESTIMONIALS.map((item, i) => (
                  <div
                    key={item.name}
                    className="flex flex-col"
                    style={{
                      position: i === 0 ? "relative" : "absolute",
                      inset: i === 0 ? undefined : 0,
                      top: i === 0 ? undefined : 0,
                      left: i === 0 ? undefined : 0,
                      right: i === 0 ? undefined : 0,
                      opacity: i === index ? 1 : 0,
                      transition: `opacity 0.85s ${EASE}`,
                      pointerEvents: i === index ? "auto" : "none",
                      zIndex: i === index ? 1 : 0,
                    }}
                    aria-hidden={i !== index}
                  >
                    <p className="font-title text-[12px] font-normal tracking-[0.18em] text-ink/55 uppercase sm:text-[13px]">
                      Warmest words from
                    </p>

                    <p className="font-title mt-3 text-[18px] font-normal tracking-[0.1em] text-ink uppercase sm:mt-3.5 sm:text-[20px] md:text-[22px]">
                      {item.name}
                    </p>
                    <p className="font-silk mt-1.5 text-[14px] font-[200] tracking-[0.02em] text-ink/55 italic normal-case sm:text-[15px]">
                      {item.place}
                    </p>

                    <p className="font-silk mt-4 min-h-[2.75rem] text-[16px] font-[200] leading-snug tracking-[0.01em] text-ink/75 italic normal-case sm:mt-5 sm:min-h-[3rem] sm:text-[17px] md:text-[18px]">
                      “{item.pull}”
                    </p>

                    <div
                      aria-hidden
                      className="mt-5 h-px w-10 shrink-0 bg-ink/20 sm:mt-6"
                    />

                    <div className="mt-5 flex flex-col gap-4 sm:mt-6">
                      <p className="font-silk text-[13px] leading-[1.75] font-[300] tracking-[0.01em] text-ink/80 not-italic normal-case sm:text-[14px] sm:leading-[1.8]">
                        {item.paraA}
                      </p>
                      <p className="font-silk text-[13px] leading-[1.75] font-[300] tracking-[0.01em] text-ink/80 not-italic normal-case sm:text-[14px] sm:leading-[1.8]">
                        {item.paraB}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
