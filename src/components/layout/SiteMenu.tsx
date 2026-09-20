"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import {
  ROUTES,
  SITE_NAME,
  SITE_TAGLINE,
  SOCIAL_LINKS,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

type SiteMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  activePath: string;
};

const HOME_LINKS = [
  { name: "Home 1", href: ROUTES.HOME_1 },
  { name: "Home 2", href: ROUTES.HOME_2 },
  { name: "Home 3", href: ROUTES.HOME_3 },
] as const;

const MENU_LINKS = [
  { name: "About", href: ROUTES.ABOUT },
  { name: "Portfolio", href: ROUTES.PORTFOLIO },
  { name: "Contact", href: ROUTES.CONTACT, silk: true },
] as const;

const MENU_BG = "/images/home/hero-lead-01.webp";

const INSTAGRAM =
  SOCIAL_LINKS.find((s) => s.name === "Instagram")?.href ??
  "https://www.instagram.com/the_hue_story";

const INSTAGRAM_HANDLE = "@the_hue_story";

const MENU_IMAGES = [
  "/images/section-images/036_2500x3670.webp",
  "/images/section-images/039_2500x3559.webp",
  "/images/section-images/047_2048x3078.webp",
] as const;

const MAIL_PATH =
  "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Full-bleed editorial menu — photo overlay · navigate · instagram · elsewhere
 */
export default function SiteMenu({
  isOpen,
  onClose,
  activePath,
}: SiteMenuProps) {
  const lenis = useLenis();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    lenis?.stop();

    const blockScroll = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-site-menu-scroll]")) return;
      e.preventDefault();
    };

    window.addEventListener("wheel", blockScroll, { passive: false });
    window.addEventListener("touchmove", blockScroll, { passive: false });

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      lenis?.start();
      window.removeEventListener("wheel", blockScroll);
      window.removeEventListener("touchmove", blockScroll);
    };
  }, [isOpen, lenis]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key="site-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="fixed inset-0 z-[95] overflow-y-auto overscroll-contain text-cream"
          data-site-menu-scroll
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <Image
              src={MENU_BG}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-base/82" />
          </div>

          {/* Sticky close — text only */}
          <div className="sticky top-0 z-30 flex justify-end px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-2 sm:px-8 md:px-10 lg:px-14">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-11 items-center gap-2 px-1 py-2 transition-colors"
              aria-label="Close menu"
            >
              <span className="font-body text-[10px] font-medium tracking-[0.22em] text-cream/75 uppercase transition-colors hover:text-cream sm:text-[11px]">
                Close
              </span>
              <span
                aria-hidden
                className="font-body text-[18px] leading-none text-cream/80"
              >
                ×
              </span>
            </button>
          </div>

          <div className="relative z-10 flex min-h-[calc(100svh-3.5rem)] flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8 sm:pb-12 md:px-10 lg:px-14">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.5, ease: EASE }}
              className="mx-auto flex w-full max-w-3xl shrink-0 flex-col items-center pt-1 text-center sm:pt-2"
            >
              <p className="font-title text-[20px] leading-[1.05] font-normal tracking-[0.14em] text-cream uppercase sm:text-[28px] md:text-[34px] lg:text-[40px]">
                {SITE_NAME}
              </p>
              <p className="font-body mt-2 max-w-[16rem] text-[8px] font-medium tracking-[0.18em] text-cream/55 uppercase sm:mt-3 sm:max-w-md sm:text-[10px] md:tracking-[0.26em]">
                {SITE_TAGLINE}
              </p>
            </motion.div>

            {/* Columns: stack + tight on mobile, centered row on desktop */}
            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-start pt-8 pb-6 sm:pt-10 md:justify-center md:py-8 lg:py-6">
              <div className="grid w-full grid-cols-1 items-start gap-10 sm:gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,32rem)_minmax(0,1fr)] md:gap-8 lg:gap-10">
                {/* Navigate */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16, duration: 0.55, ease: EASE }}
                  className="flex min-w-0 w-full flex-col items-center text-center"
                >
                  <p className="font-script text-[26px] leading-none tracking-[0.01em] text-cream/90 normal-case sm:text-[32px] md:text-[36px]">
                    Navigate
                  </p>

                  <div
                    aria-hidden
                    className="mt-4 h-px w-full max-w-[12rem] bg-cream/30 sm:mt-6 sm:max-w-[14rem]"
                  />

                  <nav
                    className="mt-4 flex flex-col items-center gap-3 sm:mt-6 sm:gap-4"
                    aria-label="Menu"
                  >
                    {/* Temp: home options in one row on mobile until a single home is chosen */}
                    <div className="flex flex-row flex-wrap items-center justify-center gap-x-4 gap-y-2 md:flex-col md:gap-4">
                      {HOME_LINKS.map((link) => {
                        const active = activePath === link.href;

                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={onClose}
                            className={cn(
                              "font-title text-[11px] font-normal tracking-[0.18em] uppercase transition-colors duration-300 sm:text-[14px] sm:tracking-[0.22em]",
                              active
                                ? "text-blush"
                                : "text-cream/85 hover:text-blush"
                            )}
                          >
                            {link.name}
                          </Link>
                        );
                      })}
                    </div>

                    {MENU_LINKS.map((link) => {
                      const active =
                        activePath === link.href ||
                        activePath.startsWith(`${link.href}/`);

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={onClose}
                          className={cn(
                            "transition-colors duration-300",
                            "silk" in link && link.silk
                              ? "font-silk text-[17px] font-[200] tracking-[0.02em] italic normal-case sm:text-[20px]"
                              : "font-title text-[12px] font-normal tracking-[0.22em] uppercase sm:text-[14px]",
                            active
                              ? "text-blush"
                              : "text-cream/85 hover:text-blush"
                          )}
                        >
                          {link.name}
                        </Link>
                      );
                    })}
                  </nav>

                  <div
                    aria-hidden
                    className="mt-4 h-px w-full max-w-[12rem] bg-cream/30 sm:mt-6 sm:max-w-[14rem]"
                  />

                  <Link
                    href={ROUTES.CONTACT}
                    onClick={onClose}
                    className="group relative mt-5 inline-block sm:mt-8"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 translate-x-1.5 translate-y-1.5 border border-cream/35 transition-colors duration-300 group-hover:border-blush/60 sm:translate-x-2 sm:translate-y-2"
                    />
                    <span className="relative inline-flex max-w-[16rem] flex-wrap items-center justify-center gap-x-2 gap-y-1 border border-cream/80 bg-[color-mix(in_srgb,var(--color-cream)_88%,transparent)] px-4 py-2.5 transition-colors duration-300 group-hover:border-blush/70 sm:max-w-none sm:gap-x-2.5 sm:px-6 sm:py-3">
                      <span className="font-body text-[9px] font-medium tracking-[0.2em] text-ink uppercase sm:text-[10px]">
                        Inquire about your
                      </span>
                      <span className="font-silk text-[14px] font-[200] tracking-normal text-ink italic normal-case sm:text-[15px]">
                        celebration
                      </span>
                    </span>
                  </Link>
                </motion.div>

                {/* Instagram */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.24, duration: 0.55, ease: EASE }}
                  className="flex min-w-0 w-full flex-col items-center text-center"
                >
                  <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                    <p className="font-title text-[11px] font-normal tracking-[0.28em] text-cream uppercase sm:text-[13px] md:text-[14px]">
                      Instagram
                    </p>
                    <p className="font-script text-[20px] leading-none tracking-[0.01em] text-cream/85 normal-case sm:text-[26px] md:text-[28px]">
                      Follow Along
                    </p>
                  </div>

                  <a
                    href={INSTAGRAM}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-title mt-3 text-[9px] font-normal tracking-[0.2em] text-cream/55 uppercase transition-colors duration-300 hover:text-blush sm:mt-5 sm:text-[10px]"
                  >
                    {INSTAGRAM_HANDLE}
                  </a>

                  <div
                    aria-hidden
                    className="mt-2.5 h-px w-14 bg-cream/35 sm:mt-4 sm:w-20"
                  />

                  <div className="mt-4 grid w-full max-w-[32rem] grid-cols-3 gap-2.5 self-center sm:mt-6 sm:gap-3.5 md:gap-4">
                    {MENU_IMAGES.map((src) => (
                      <a
                        key={src}
                        href={INSTAGRAM}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative aspect-square w-full min-w-0 overflow-hidden bg-cream/10"
                      >
                        <Image
                          src={src}
                          alt=""
                          fill
                          sizes="(max-width: 768px) 30vw, 170px"
                          className="object-cover object-center transition-transform duration-500 hover:scale-105"
                        />
                      </a>
                    ))}
                  </div>
                </motion.div>

                {/* Elsewhere */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32, duration: 0.55, ease: EASE }}
                  className="relative flex min-w-0 w-full flex-col items-center pb-2 text-center md:min-h-[22rem] md:pb-0"
                >
                  <p className="font-script text-[26px] leading-none tracking-[0.01em] text-cream/90 normal-case sm:text-[32px] md:text-[36px]">
                    elsewhere
                  </p>
                  <p className="font-body mt-2.5 text-[8px] font-medium tracking-[0.22em] text-cream/50 uppercase sm:mt-3.5 sm:text-[10px]">
                    Find Us On Social Media
                  </p>

                  <div className="mt-5 flex items-center justify-center gap-5 sm:mt-7 sm:gap-6">
                    {SOCIAL_LINKS.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className="flex h-10 w-10 items-center justify-center text-cream/70 transition-colors duration-300 hover:text-blush"
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
                      className="flex h-10 w-10 items-center justify-center text-cream/70 transition-colors duration-300 hover:text-blush"
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

                  <div className="mt-8 hidden flex-col items-center md:absolute md:right-0 md:bottom-0 md:mt-0 md:flex md:items-end">
                    <div className="relative flex items-end gap-0">
                      <div
                        aria-hidden
                        className="pointer-events-none absolute right-full bottom-[50%] hidden h-px w-16 bg-cream/30 md:block lg:w-24"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute bottom-full left-1/2 hidden h-16 w-px -translate-x-1/2 bg-cream/30 md:block lg:h-24"
                      />
                      <div className="relative h-16 w-16 sm:h-20 sm:w-20 md:h-28 md:w-28 lg:h-32 lg:w-32">
                        <Image
                          src="/images/logo/logo-light.png"
                          alt=""
                          fill
                          sizes="128px"
                          className="object-contain opacity-95"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
