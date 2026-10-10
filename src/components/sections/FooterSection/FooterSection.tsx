"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { ROUTES, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";
import Logo from "@/components/common/Logo";

const NAVIGATE = [
  { name: "Home", href: ROUTES.HOME },
  { name: "About", href: `${ROUTES.HOME}#about` },
  { name: "Services", href: `${ROUTES.HOME}#services` },
  { name: "Process", href: `${ROUTES.HOME}#process` },
  { name: "Portfolio", href: ROUTES.PORTFOLIO },
  { name: "Inquire", href: ROUTES.CONTACT },
] as const;

const LOCATIONS = "United States · India · Worldwide";

const ARCHIVE_IMAGES = [
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

function ArchiveOrnament({ flip = false }: { flip?: boolean }) {
  return (
    <span
      aria-hidden
      className={`flex items-center gap-1.5 text-ink/40 sm:gap-2 ${flip ? "flex-row-reverse" : ""}`}
    >
      <span className="block h-px w-6 bg-current sm:w-10 md:w-14" />
      <svg viewBox="0 0 10 10" className="h-2 w-2 fill-current sm:h-2.5 sm:w-2.5">
        <path d="M5 0l1.1 3.9L10 5 6.1 6.1 5 10 3.9 6.1 0 5l3.9-1.1z" />
      </svg>
    </span>
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
  const pathname = usePathname();
  const lenis = useLenis();

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

  const onNavigate = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname !== ROUTES.HOME) return;
    const [, hash] = href.split("#");
    const target = hash ? document.getElementById(hash) : null;
    if (hash && !target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target ?? 0, { duration: 1.6 });
    else if (target) target.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", hash ? `#${hash}` : ROUTES.HOME);
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
            <Logo variant="mainSlate" size={88} className="opacity-90" />
            <p className="font-silk mt-4 max-w-xs text-[14px] leading-snug font-[300] tracking-[0.01em] text-ink/90 italic normal-case sm:mt-5 sm:text-[15px] md:mt-6 md:text-[17px]">
              Wedding &amp; Event Design. Worldwide.
            </p>
            <p className="font-body mt-4 flex flex-col items-center gap-1.5 text-[10px] leading-none font-medium tracking-[0.2em] text-ink/70 uppercase sm:mt-5 sm:gap-2 sm:text-[11px]">
              <span>United States · India</span>{" "}
              <span>Worldwide</span>
            </p>
            {/* Mobile divider under brand */}
            <div
              aria-hidden
              className="mt-8 h-px w-14 bg-ink/20 sm:mt-10 sm:w-16 md:hidden"
            />
          </div>

          {/* Socialize — second on mobile */}
          <div
            className="order-2 flex flex-col items-center px-6 pt-2 pb-10 text-center sm:pb-12 md:order-1 md:justify-center md:px-8 md:py-16"
            style={fadeUp(upperVisible, "0.12s")}
          >
            <SectionLabel>Socialize</SectionLabel>
            <div className="mt-6 flex items-center gap-4 sm:mt-7 sm:gap-5">
              {[
                ...SOCIAL_LINKS.map((s) => ({
                  name: s.name,
                  href: s.href,
                  path: s.iconPath,
                  external: true,
                })),
                {
                  name: "Inquire",
                  href: ROUTES.CONTACT,
                  path: MAIL_PATH,
                  external: false,
                },
              ].map((item) => {
                const className =
                  "group flex h-12 w-12 items-center justify-center rounded-full border border-ink/25 text-ink/70 transition-all duration-500 hover:-translate-y-0.5 hover:border-base hover:bg-base hover:text-cream sm:h-[3.25rem] sm:w-[3.25rem]";
                const icon = (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-current transition-transform duration-500 group-hover:scale-110 sm:h-[22px] sm:w-[22px]"
                    aria-hidden
                  >
                    <path d={item.path} />
                  </svg>
                );
                return item.external ? (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className={className}
                  >
                    {icon}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-label={item.name}
                    className={className}
                  >
                    {icon}
                  </Link>
                );
              })}
            </div>

            <div
              aria-hidden
              className="mt-8 h-px w-14 bg-ink/20 sm:mt-10 sm:w-16 md:hidden"
            />
          </div>

          <div
            className="order-3 flex flex-col items-center px-6 pt-0 pb-10 text-center sm:pb-12 md:px-8 md:py-16"
            style={fadeUp(upperVisible, "0.24s")}
          >
            <SectionLabel>Navigate</SectionLabel>
            <nav
              className="mt-6 flex flex-col items-center gap-3 sm:mt-7 sm:gap-3.5"
              aria-label="Footer"
            >
              {NAVIGATE.filter(
                (link) => !(pathname === ROUTES.HOME && link.href === ROUTES.HOME)
              ).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => onNavigate(e, link.href)}
                  className="font-title text-[12px] font-normal tracking-[0.2em] text-ink/70 uppercase transition-colors duration-300 hover:text-blush sm:text-[12px]"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Back to top — pocket is pointer-events none so straddling strip stays clickable */}
        <div
          className="pointer-events-none relative z-10 flex flex-col items-center px-6 pt-2 pb-40 sm:pb-44 md:pb-52 lg:pb-56"
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
            <span className="font-body relative inline-flex items-center justify-center gap-x-3 border border-ink bg-transparent px-8 py-3.5 text-[11px] leading-none font-normal tracking-[0.3em] text-ink uppercase transition-colors duration-300 group-hover:border-blush/80 group-hover:bg-[color-mix(in_srgb,var(--color-blush)_18%,#F7F3EB)] sm:px-10 sm:py-4 sm:text-[12px]">
              <span>Back to top</span>
              <svg
                aria-hidden
                viewBox="0 0 10 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="h-3.5 w-2.5 transition-transform duration-500 group-hover:-translate-y-0.5"
              >
                <path d="M5 13V1M1 5l4-4 4 4" />
              </svg>
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
            <div
              className="absolute left-1/2 bottom-full z-20 mb-3 flex -translate-x-1/2 flex-col items-center whitespace-nowrap text-ink sm:mb-4 md:mb-5"
              style={fadeUp(stripVisible, "0s", "0.45rem")}
            >
              <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
                <ArchiveOrnament />
                <p
                  className="font-script cursor-text px-1 py-1 text-[30px] leading-[1.2] tracking-[0.01em] normal-case select-text sm:text-[38px] md:text-[46px] lg:text-[52px]"
                  style={{ color: "#2C2723" }}
                >
                  from the archive
                </p>
                <ArchiveOrnament flip />
              </div>
            </div>

            {/* Hairline — desktop+ */}
            <div className="relative z-20 hidden min-w-0 flex-1 items-center md:flex">
              <div
                className="flex w-full -translate-y-3 flex-col items-start gap-1.5 sm:-translate-y-3.5 md:-translate-y-4"
                style={fadeUp(stripVisible, "0.05s", "0.6rem")}
              >
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
                {ARCHIVE_IMAGES.map((src, i) => (
                  <Link
                    key={src}
                    href={ROUTES.PORTFOLIO}
                    aria-label={`View the portfolio, image ${i + 1}`}
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
                  </Link>
                ))}
              </div>

              {/* Press-mark stamp — tight on mobile, freer on desktop */}
              <div
                className="pointer-events-none absolute -top-2 -right-3 z-20 h-12 w-12 -rotate-6 sm:-top-5 sm:-right-8 sm:h-16 sm:w-16 md:-top-10 md:-right-12 md:h-24 md:w-24 lg:-top-14 lg:-right-[4.5rem] lg:h-28 lg:w-28"
                style={fadeScale(stripVisible, "0.45s")}
              >
                <Image
                  src="/images/logo/Antique-gold-outlinepng.png"
                  alt=""
                  fill
                  sizes="(max-width: 640px) 48px, 112px"
                  className="object-contain opacity-95 drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]"
                />
              </div>
            </div>

            {/* Mirror hairline — desktop+ */}
            <div className="relative z-20 hidden min-w-0 flex-1 items-center md:flex">
              <div
                className="flex w-full -translate-y-3 flex-col items-end gap-1.5 sm:-translate-y-3.5 md:-translate-y-4"
                style={fadeUp(stripVisible, "0.1s", "0.6rem")}
              >
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
            className="font-title mt-3 max-w-xs text-[9px] font-normal tracking-[0.18em] text-cream/90 uppercase sm:mt-5 sm:max-w-xl sm:text-[11px] md:text-[12px]"
            style={fadeUp(brandVisible, "0.12s", "0.7rem")}
          >
            Wedding <span className="font-silk font-[400] normal-case">&amp;</span> Event Design. Worldwide.
          </p>
          <p
            className="font-silk mt-3 max-w-[15rem] text-[12px] font-[300] tracking-[0.02em] text-cream/85 italic normal-case sm:mt-5 sm:max-w-none sm:text-[14px] md:text-[15px]"
            style={fadeUp(brandVisible, "0.22s", "0.55rem")}
          >
            {LOCATIONS}
          </p>
        </div>

        {/* Utility bar */}
        <div
          className="relative z-10 border-t border-cream/15 px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 lg:px-10"
          style={fadeUp(brandVisible, "0.3s", "0.4rem")}
        >
          <div className="flex w-full flex-col items-center gap-2.5 text-center md:flex-row md:justify-between md:gap-8">
            <p className="font-body order-2 flex items-center text-[8px] leading-none tracking-[0.12em] whitespace-nowrap text-cream/50 uppercase sm:text-[9px] sm:tracking-[0.18em] md:order-1 md:text-[10px] md:tracking-[0.22em]">
              <span className="font-silk mr-1 text-[11px] tracking-normal sm:text-[12px] md:text-[13px]">
                &copy;
              </span>
              {new Date().getFullYear()} {SITE_NAME}
              <span aria-hidden className="mx-1.5 text-cream/30 sm:mx-2">
                ·
              </span>
              All rights reserved
            </p>

            <nav
              aria-label="Legal"
              className="order-1 flex items-center gap-2.5 md:order-2 md:gap-4"
            >
              <Link
                href={ROUTES.PRIVACY}
                className="font-body text-[8px] leading-none tracking-[0.12em] whitespace-nowrap text-cream/60 uppercase transition-colors duration-300 hover:text-cream sm:text-[9px] sm:tracking-[0.18em] md:text-[10px] md:tracking-[0.22em]"
              >
                Privacy Policy
              </Link>
              <span aria-hidden className="h-2.5 w-px bg-cream/25 md:h-3" />
              <Link
                href={ROUTES.TERMS}
                className="font-body text-[8px] leading-none tracking-[0.12em] whitespace-nowrap text-cream/60 uppercase transition-colors duration-300 hover:text-cream sm:text-[9px] sm:tracking-[0.18em] md:text-[10px] md:tracking-[0.22em]"
              >
                Terms &amp; Conditions
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
