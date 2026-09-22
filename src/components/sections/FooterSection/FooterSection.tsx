"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FOOTER_LINKS,
  ROUTES,
  SITE_NAME,
  SOCIAL_LINKS,
} from "@/lib/constants";
import Logo from "@/components/common/Logo";

const NAVIGATE = [
  { name: "Home", href: ROUTES.HOME },
  ...FOOTER_LINKS.filter((l) => l.name !== "Enquire").map((l) => ({
    name: l.name,
    href: l.href,
  })),
  { name: "Contact", href: ROUTES.CONTACT },
] as const;

const LOCATIONS =
  "India · United States · Europe · Bali and beyond";

const INSTAGRAM =
  SOCIAL_LINKS.find((s) => s.name === "Instagram")?.href ??
  "https://www.instagram.com/the_hue_story/";

const INSTAGRAM_HANDLE = "@the_hue_story";

const INSTAGRAM_IMAGES = [
  "/images/section-images/036_2500x3670.webp",
  "/images/section-images/039_2500x3559.webp",
  "/images/section-images/041_2500x3945.webp",
  "/images/section-images/047_2048x3078.webp",
] as const;

const BRAND_BGS = [
  "/images/home/hero-lead-02.webp",
  "/images/home/hero-lead-01.webp",
  "/images/home/hero-01.webp",
  "/images/home/hero-03.webp",
  "/images/home/hero-04.webp",
  "/images/home/hero-10.webp",
] as const;

const BRAND_ROTATE_MS = 8_000;

const MAIL_PATH =
  "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="font-title flex items-center justify-center gap-2.5 text-[11px] font-normal tracking-[0.28em] text-ink/55 uppercase sm:gap-3 sm:text-[12px]">
      <span
        aria-hidden
        className="inline-block h-[3px] w-[3px] rounded-full bg-ink/40"
      />
      {children}
      <span
        aria-hidden
        className="inline-block h-[3px] w-[3px] rounded-full bg-ink/40"
      />
    </p>
  );
}

function useInView(
  ref: React.RefObject<HTMLElement | null>,
  threshold = 0.12
) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
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
      { threshold, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);

  return visible;
}

/**
 * Footer — paper cream columns · back to top · insta strip · brand band
 */
export default function FooterSection() {
  const upperRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const [bgIndex, setBgIndex] = useState(0);

  const upperVisible = useInView(upperRef);
  const stripVisible = useInView(stripRef, 0.2);
  const brandVisible = useInView(brandRef, 0.2);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const id = window.setInterval(() => {
      setBgIndex((i) => (i + 1) % BRAND_BGS.length);
    }, BRAND_ROTATE_MS);

    return () => window.clearInterval(id);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fadeUp = (on: boolean, delay: string, dist = "1rem") =>
    ({
      opacity: on ? 1 : 0,
      transform: on ? "translate3d(0,0,0)" : `translate3d(0,${dist},0)`,
      transition: `opacity 0.85s ${EASE} ${delay}, transform 0.85s ${EASE} ${delay}`,
    }) as const;

  const fadeScale = (on: boolean, delay: string) =>
    ({
      opacity: on ? 1 : 0,
      transform: on ? "scale(1)" : "scale(0.94)",
      transition: `opacity 0.75s ${EASE} ${delay}, transform 0.75s ${EASE} ${delay}`,
    }) as const;

  return (
    <footer className="relative z-10 w-full text-ink">
      {/* ——— Paper cream upper ——— */}
      <div
        ref={upperRef}
        className="pointer-events-none"
        style={{ backgroundColor: "#F7F3EB" }}
      >
        <div className="pointer-events-auto relative mx-auto grid w-full max-w-6xl grid-cols-1 md:grid-cols-3">
          <div
            aria-hidden
            className="pointer-events-none absolute top-10 bottom-0 left-1/3 hidden w-px -translate-x-1/2 bg-ink/15 md:block lg:top-12"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute top-10 bottom-0 left-2/3 hidden w-px -translate-x-1/2 bg-ink/15 md:block lg:top-12"
          />

          {/* Logo / brand — first on mobile */}
          <div
            className="order-1 flex flex-col items-center px-6 pt-12 pb-8 text-center sm:pt-14 sm:pb-10 md:order-2 md:justify-center md:border-t-0 md:px-8 md:py-16"
            style={fadeUp(upperVisible, "0s")}
          >
            <Logo variant="mainSlate" size={68} className="opacity-90" />
            <p className="font-silk mt-4 max-w-xs text-[14px] leading-snug font-[200] tracking-[0.01em] text-ink/75 italic normal-case sm:mt-5 sm:text-[15px] md:mt-6 md:text-[17px]">
              Wedding &amp; Event Design. Worldwide.
            </p>
            <p className="font-body mt-4 max-w-[16rem] text-[10px] leading-[1.7] font-light tracking-[0.04em] text-ink/55 sm:mt-5 sm:max-w-sm sm:text-[11px] md:mt-6 md:text-[12px]">
              {LOCATIONS}
            </p>
            {/* Mobile divider under brand */}
            <div
              aria-hidden
              className="mt-8 h-px w-14 bg-ink/20 sm:mt-10 sm:w-16 md:hidden"
            />
          </div>

          {/* Socialize + Inquire — second on mobile */}
          <div
            className="order-2 flex flex-col items-center px-6 pt-2 pb-10 text-center sm:pb-12 md:order-1 md:px-8 md:py-16"
            style={fadeUp(upperVisible, "0.12s")}
          >
            <SectionLabel>Socialize</SectionLabel>
            <div className="mt-5 flex items-center gap-5 sm:mt-6 sm:gap-6">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-ink/60 transition-colors duration-300 hover:text-blush"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current sm:h-[17px] sm:w-[17px]"
                    aria-hidden
                  >
                    <path d={social.iconPath} />
                  </svg>
                </a>
              ))}
              <a
                href="mailto:hello@thehuestory.com"
                aria-label="Email"
                className="text-ink/60 transition-colors duration-300 hover:text-blush"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current sm:h-[17px] sm:w-[17px]"
                  aria-hidden
                >
                  <path d={MAIL_PATH} />
                </svg>
              </a>
            </div>

            <div
              aria-hidden
              className="mt-8 h-px w-16 bg-ink/20 sm:mt-10 sm:w-20"
            />

            <p className="font-title mt-8 text-[11px] font-normal tracking-[0.28em] text-ink/55 uppercase sm:mt-10 sm:text-[12px]">
              Inquire
            </p>
            <Link
              href={ROUTES.CONTACT}
              aria-label="Inquire"
              className="mt-4 text-ink/60 transition-colors duration-300 hover:text-blush"
            >
              <svg
                viewBox="0 0 24 24"
                className="mx-auto h-5 w-5 fill-current"
                aria-hidden
              >
                <path d={MAIL_PATH} />
              </svg>
            </Link>
            <p className="font-silk mt-3 max-w-[14rem] text-[13px] leading-snug font-[200] tracking-[0.01em] text-ink/65 italic normal-case sm:text-[14px]">
              Share a few details and we&apos;ll be in touch.
            </p>
          </div>

          {/* Navigate — desktop only */}
          <div
            className="order-3 hidden flex-col items-center px-6 py-12 text-center md:flex md:px-8 md:py-16"
            style={fadeUp(upperVisible, "0.24s")}
          >
            <SectionLabel>Navigate</SectionLabel>
            <nav
              className="mt-6 flex flex-col items-center gap-3 sm:mt-7 sm:gap-3.5"
              aria-label="Footer"
            >
              {NAVIGATE.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-title text-[11px] font-normal tracking-[0.2em] text-ink/70 uppercase transition-colors duration-300 hover:text-blush sm:text-[12px]"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Back to top — pocket is pointer-events none so straddling strip stays clickable */}
        <div
          className="pointer-events-none relative z-10 flex flex-col items-center px-6 pt-2 pb-28 sm:pb-32 md:pb-40 lg:pb-44"
          style={fadeUp(upperVisible, "0.32s", "0.75rem")}
        >
          <div aria-hidden className="h-px w-12 bg-ink/20 sm:w-14" />
          <button
            type="button"
            onClick={scrollTop}
            className="group relative mt-7 inline-block pointer-events-auto sm:mt-8"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 translate-x-1.5 translate-y-1.5 border border-ink/30 transition-colors duration-300 group-hover:border-blush/60 sm:translate-x-2 sm:translate-y-2"
            />
            <span className="relative inline-flex items-center justify-center gap-x-2.5 border border-ink bg-transparent px-6 py-2.5 transition-colors duration-300 group-hover:border-blush/80 group-hover:bg-[color-mix(in_srgb,var(--color-blush)_18%,#F7F3EB)] sm:gap-x-3 sm:px-7 sm:py-3">
              <span className="font-body text-[10px] font-medium tracking-[0.24em] text-ink uppercase sm:text-[11px]">
                Back to
              </span>
              <span className="font-silk text-[15px] font-[200] tracking-normal text-ink italic normal-case sm:text-[16px]">
                top
              </span>
              <span
                aria-hidden
                className="font-body text-[9px] text-ink/50 transition-transform duration-300 group-hover:-translate-y-0.5"
              >
                ▲
              </span>
            </span>
          </button>
        </div>
      </div>

      {/* ——— Dark footer: images straddle paper | dark divide ——— */}
      <div className="relative text-cream">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          {BRAND_BGS.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt=""
              fill
              sizes="100vw"
              priority={i === 0}
              className="object-cover object-center transition-opacity duration-[1400ms] ease-in-out"
              style={{ opacity: i === bgIndex ? 1 : 0 }}
            />
          ))}
          <div className="absolute inset-0 bg-base/78" />
        </div>

        <div
          ref={stripRef}
          className="relative z-30 flex -translate-y-1/2 flex-col items-center px-3 sm:px-6 md:px-8"
        >
          <div className="relative flex w-full items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            <p
              className="font-script pointer-events-none absolute left-1/2 bottom-full z-20 mb-2 -translate-x-1/2 overflow-visible px-2 py-1 text-center text-[28px] leading-[1.35] tracking-[0.01em] normal-case sm:mb-3 sm:text-[38px] sm:leading-[1.25] md:mb-3.5 md:text-[46px] lg:text-[54px]"
              style={{
                color: "#2C2723",
                ...fadeUp(stripVisible, "0s", "0.45rem"),
              }}
            >
              from the archive
            </p>

            {/* Insta label — desktop+ */}
            <div className="relative z-20 hidden min-w-0 flex-1 items-center md:flex">
              <div
                className="flex w-full -translate-y-3 flex-col items-start gap-1.5 sm:-translate-y-3.5 md:-translate-y-4"
                style={fadeUp(stripVisible, "0.05s", "0.6rem")}
              >
                <p className="font-title text-[8px] font-normal tracking-[0.28em] text-ink uppercase sm:text-[9px]">
                  Insta
                </p>
                <div
                  aria-hidden
                  className="h-px w-full origin-left bg-ink/35"
                  style={{
                    width: stripVisible ? "100%" : "0%",
                    transition: `width 0.9s ${EASE} 0.15s`,
                  }}
                />
              </div>
            </div>

            <div className="relative w-[min(94%,21rem)] shrink-0 sm:w-[min(70%,26rem)] md:w-[min(48%,36rem)] lg:w-[40rem]">
              <div
                className="pointer-events-none absolute top-1/2 left-1/2 h-[118%] w-[108%] -translate-x-1/2 -translate-y-1/2 overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
                aria-hidden
                style={fadeScale(stripVisible, "0.05s")}
              >
                {BRAND_BGS.map((src, i) => (
                  <Image
                    key={`plate-${src}`}
                    src={src}
                    alt=""
                    fill
                    sizes="80vw"
                    className="object-cover object-center transition-opacity duration-[1400ms] ease-in-out"
                    style={{ opacity: i === bgIndex ? 1 : 0 }}
                  />
                ))}
                <div className="absolute inset-0 bg-cream/50" />
              </div>
              <div className="relative z-10 grid grid-cols-4 gap-1 sm:gap-2 md:gap-2.5">
                {INSTAGRAM_IMAGES.map((src, i) => (
                  <a
                    key={src}
                    href={INSTAGRAM}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative aspect-square overflow-hidden"
                    style={fadeScale(stripVisible, `${0.12 + i * 0.08}s`)}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 22vw, 160px"
                      className="object-cover object-center"
                    />
                  </a>
                ))}
              </div>

              {/* Press-mark stamp — tight on mobile, freer on desktop */}
              <div
                className="pointer-events-none absolute -top-2 -right-2 z-20 h-12 w-12 -rotate-6 sm:-top-5 sm:-right-5 sm:h-16 sm:w-16 md:-top-10 md:-right-10 md:h-24 md:w-24 lg:-top-14 lg:-right-14 lg:h-28 lg:w-28"
                style={fadeScale(stripVisible, "0.45s")}
              >
                <Image
                  src="/images/logo/logo-emblem.png"
                  alt=""
                  fill
                  sizes="(max-width: 640px) 48px, 112px"
                  className="object-contain opacity-55"
                />
              </div>
            </div>

            {/* Handle — desktop+ */}
            <div className="relative z-50 hidden min-w-0 flex-1 items-center md:flex">
              <div
                className="flex w-full -translate-y-3 flex-col items-end gap-1.5 sm:-translate-y-3.5 md:-translate-y-4"
                style={fadeUp(stripVisible, "0.1s", "0.6rem")}
              >
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open The Hue Story on Instagram"
                  className="font-title pointer-events-auto relative z-50 cursor-pointer text-[8px] font-normal tracking-[0.2em] text-ink uppercase underline-offset-[3px] transition-colors duration-300 hover:text-blush hover:underline sm:text-[9px]"
                >
                  {INSTAGRAM_HANDLE}
                </a>
                <div
                  aria-hidden
                  className="pointer-events-none h-px w-full origin-right bg-ink/35"
                  style={{
                    width: stripVisible ? "100%" : "0%",
                    transition: `width 0.9s ${EASE} 0.25s`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Brand */}
        <div
          ref={brandRef}
          className="relative z-10 flex flex-col items-center px-5 pt-1 pb-10 text-center sm:px-6 sm:pt-4 sm:pb-16 md:pt-6 md:pb-20"
        >
          <p
            className="font-title text-[22px] leading-[1.05] font-normal tracking-[0.12em] text-cream uppercase sm:text-[36px] md:text-[44px] lg:text-[52px]"
            style={fadeUp(brandVisible, "0s", "1.1rem")}
          >
            The Hue Story
          </p>
          <p
            className="font-title mt-3 max-w-xs text-[9px] font-normal tracking-[0.18em] text-cream/75 uppercase sm:mt-5 sm:max-w-xl sm:text-[11px] md:text-[12px]"
            style={fadeUp(brandVisible, "0.12s", "0.7rem")}
          >
            Wedding &amp; Event Design. Worldwide.
          </p>
          <p
            className="font-silk mt-3 max-w-[15rem] text-[12px] font-[200] tracking-[0.02em] text-cream/60 italic normal-case sm:mt-5 sm:max-w-none sm:text-[14px] md:text-[15px]"
            style={fadeUp(brandVisible, "0.22s", "0.55rem")}
          >
            {LOCATIONS}
          </p>
        </div>

        {/* Utility bar */}
        <div
          className="relative z-10 border-t border-cream/15 px-5 py-5 sm:px-6 sm:py-6 md:px-8"
          style={fadeUp(brandVisible, "0.3s", "0.4rem")}
        >
          <div className="flex w-full min-w-0 flex-col items-center gap-3.5 text-center lg:flex-row lg:items-center lg:gap-5 lg:text-left">
            <p className="font-body order-2 max-w-[20rem] text-[9px] leading-relaxed tracking-[0.06em] text-cream/45 uppercase sm:max-w-md sm:text-[10px] lg:order-1 lg:max-w-[14rem] lg:shrink-0 lg:text-left lg:text-[11px] xl:max-w-none">
              Copyright {new Date().getFullYear()} {SITE_NAME}. All rights
              reserved
            </p>

            <div className="order-1 flex min-w-0 w-full items-center gap-3 lg:order-2 lg:w-auto lg:flex-1 lg:gap-4">
              <div aria-hidden className="h-px min-w-[1rem] flex-1 bg-cream/30" />
              <div className="flex shrink-0 items-center gap-3.5">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="text-cream/55 transition-colors duration-300 hover:text-blush"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5 fill-current sm:h-4 sm:w-4"
                      aria-hidden
                    >
                      <path d={social.iconPath} />
                    </svg>
                  </a>
                ))}
                <a
                  href="mailto:hello@thehuestory.com"
                  aria-label="Email"
                  className="text-cream/55 transition-colors duration-300 hover:text-blush"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5 fill-current sm:h-4 sm:w-4"
                    aria-hidden
                  >
                    <path d={MAIL_PATH} />
                  </svg>
                </a>
              </div>
              <div aria-hidden className="h-px min-w-[1rem] flex-1 bg-cream/30" />
            </div>

            <p className="font-body order-3 min-w-0 max-w-full px-2 text-[9px] tracking-[0.04em] text-cream/45 sm:text-[10px] lg:shrink-0 lg:px-0 lg:text-right lg:text-[11px]">
              Website designed by{" "}
              <a
                href="https://www.instagram.com/bymotifstudios/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-silk text-[12px] font-[200] tracking-normal text-cream/70 italic normal-case transition-colors duration-300 hover:text-blush sm:text-[13px] lg:text-[14px]"
              >
                bymotifstudios
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
