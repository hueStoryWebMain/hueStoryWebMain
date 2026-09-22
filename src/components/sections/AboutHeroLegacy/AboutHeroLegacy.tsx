"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ABOUT_HOME_IMAGES, LOGOS, SITE_NAME } from "@/lib/constants";

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * AboutHeroLegacy — editorial about band below AboutHeroTHS
 */
export default function AboutHeroLegacy() {
  const sectionRef = useRef<HTMLElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);
  const [copyIn, setCopyIn] = useState(false);
  const [collageIn, setCollageIn] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setCopyIn(true);
      setCollageIn(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCopyIn(true);
          io.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = collageRef.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setCollageIn(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCollageIn(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -4% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const fade = (on: boolean, delay: string, dist = "1.25rem") =>
    ({
      opacity: on ? 1 : 0,
      transform: on ? "translate3d(0,0,0)" : `translate3d(0,${dist},0)`,
      transition: `opacity 1.2s ${EASE} ${delay}, transform 1.3s ${EASE} ${delay}`,
    }) as const;

  const imageFade = (on: boolean, delay: string) =>
    ({
      opacity: on ? 1 : 0,
      transform: on
        ? "translate3d(0,0,0) scale(1)"
        : "translate3d(0,1.5rem,0) scale(0.98)",
      transition: `opacity 1.35s ${EASE} ${delay}, transform 1.5s ${EASE} ${delay}`,
    }) as const;

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full overflow-x-clip bg-base"
      aria-labelledby="about-hero-legacy-heading"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center px-5 pt-14 text-center sm:px-8 sm:pt-20 md:px-8 md:pt-28 lg:px-12">
        <h2
          id="about-hero-legacy-heading"
          className="font-title max-w-4xl text-[22px] leading-[1.2] font-normal tracking-[0.08em] text-cream uppercase will-change-[opacity,transform] sm:text-[26px] md:text-[34px] lg:text-[40px]"
          style={fade(copyIn, "0.05s", "1.4rem")}
        >
          An Atelier for the World&apos;s Weddings.
        </h2>

        <div
          className="mt-7 h-px w-20 origin-center bg-bare/45 will-change-[opacity,transform] sm:mt-10 sm:w-28 md:mt-12 md:w-40"
          aria-hidden="true"
          style={{
            opacity: copyIn ? 1 : 0,
            transform: copyIn ? "scaleX(1)" : "scaleX(0.35)",
            transition: `opacity 1s ${EASE} 0.18s, transform 1.15s ${EASE} 0.18s`,
          }}
        />

        <div className="mt-7 flex max-w-2xl flex-col gap-5 sm:mt-10 sm:gap-6 md:mt-12">
          <p
            className="font-silk text-[13px] leading-[1.75] font-[300] tracking-[0.01em] text-cream/90 not-italic normal-case will-change-[opacity,transform] sm:text-[15px] sm:leading-[1.8] md:text-[17px]"
            style={fade(copyIn, "0.28s")}
          >
            The Hue Story was founded on a conviction that has never wavered: an
            occasion of real significance deserves genuine authorship.
          </p>
          <p
            className="font-silk text-[13px] leading-[1.75] font-[300] tracking-[0.01em] text-cream/90 not-italic normal-case will-change-[opacity,transform] sm:text-[15px] sm:leading-[1.8] md:text-[17px]"
            style={fade(copyIn, "0.4s")}
          >
            Every project is led personally, from the first conversation to the
            final toast, by a team built over a decade of relationships with
            artisans, chefs, and makers around the world.
          </p>
          <p
            className="font-silk text-[13px] leading-[1.75] font-[300] tracking-[0.01em] text-cream/90 not-italic normal-case will-change-[opacity,transform] sm:text-[15px] sm:leading-[1.8] md:text-[17px]"
            style={fade(copyIn, "0.52s")}
          >
            A decade of experience gives us range: precision paired with genuine
            cultural depth, an eye equally at home with a Rajasthani palace, a
            Balinese cliffside, or a California vineyard. It is this range that
            gives each occasion its particular elegance
          </p>
        </div>

        <p
          className="font-script mt-12 text-center text-[22px] font-normal tracking-[0.02em] text-cream normal-case will-change-[opacity,transform] sm:mt-14 sm:text-[28px] md:mt-16 md:text-[34px] lg:text-[40px]"
          style={fade(copyIn, "0.66s", "0.9rem")}
        >
          Authored
        </p>
      </div>

      {/* Editorial collage */}
      <div
        ref={collageRef}
        className="relative overflow-x-clip px-4 pt-10 pb-16 sm:px-8 sm:pt-14 sm:pb-20 md:px-8 md:pt-16 md:pb-24 lg:px-12"
      >
        <div className="relative mx-auto w-full max-w-6xl">
          <div className="relative mx-auto h-[min(118vw,420px)] sm:h-[min(95vw,560px)] md:h-[min(78vw,900px)]">
            <div
              className="pointer-events-none absolute top-[26%] right-0 z-0 w-[48%] overflow-hidden will-change-[opacity,transform] sm:right-[-2%] md:right-[-4%]"
              aria-hidden
              style={imageFade(collageIn, "0.05s")}
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={ABOUT_HOME_IMAGES.landscape}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, 48vw"
                  className="object-cover object-center opacity-45"
                />
                <div className="absolute inset-0 bg-base/70" />
              </div>
            </div>

            <figure
              className="absolute top-[12%] left-0 z-10 w-[34%] will-change-[opacity,transform]"
              style={imageFade(collageIn, "0.16s")}
            >
              <div
                className="pointer-events-none absolute left-0 top-0 z-40 h-12 w-12 -translate-x-[55%] -translate-y-[55%] sm:h-16 sm:w-16 md:h-24 md:w-24 lg:h-28 lg:w-28"
                aria-hidden
              >
                <Image
                  src={LOGOS.emblem}
                  alt=""
                  width={160}
                  height={160}
                  className="h-full w-full object-contain mix-blend-screen"
                />
                <span className="sr-only">{SITE_NAME} emblem</span>
              </div>
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={ABOUT_HOME_IMAGES.couple1}
                  alt="A couple on their wedding day"
                  fill
                  sizes="(max-width: 768px) 34vw, 34vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute top-full right-0 z-[5] mt-2 h-px bg-bare/40 sm:mt-3 md:mt-4"
                style={{ width: "100vw" }}
              />
            </figure>

            <figure
              className="absolute top-[2%] left-[40%] z-20 w-[26%] will-change-[opacity,transform]"
              style={imageFade(collageIn, "0.28s")}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={ABOUT_HOME_IMAGES.outsideDecor}
                  alt="Outdoor celebration décor"
                  fill
                  sizes="(max-width: 768px) 26vw, 26vw"
                  className="object-cover"
                />
              </div>
            </figure>

            <figure
              className="absolute top-[48%] left-[46%] z-30 w-[24%] will-change-[opacity,transform]"
              style={imageFade(collageIn, "0.4s")}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={ABOUT_HOME_IMAGES.decorCloseup}
                  alt="Table setting detail"
                  fill
                  sizes="(max-width: 768px) 24vw, 24vw"
                  className="object-cover"
                />
              </div>
            </figure>

            <figure
              className="absolute top-[16%] right-[1%] z-20 w-[26%] will-change-[opacity,transform]"
              style={imageFade(collageIn, "0.34s")}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-full left-0 z-[5] mb-2 h-px bg-bare/40 sm:mb-3 md:mb-4"
                style={{ width: "100vw" }}
              />
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={ABOUT_HOME_IMAGES.couple2}
                  alt="A couple walking together"
                  fill
                  sizes="(max-width: 768px) 26vw, 26vw"
                  className="object-cover"
                />
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
