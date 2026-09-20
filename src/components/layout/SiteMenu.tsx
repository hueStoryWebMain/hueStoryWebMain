"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
 * Portaled to body so sticky/overflow ancestors cannot clip it on mobile.
 */
export default function SiteMenu({
  isOpen,
  onClose,
  activePath,
}: SiteMenuProps) {
  const lenis = useLenis();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      lenis?.start();
    };
  }, [isOpen, lenis]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key="site-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="fixed inset-0 z-[200] flex h-[100dvh] max-h-[100dvh] flex-col overflow-hidden text-cream"
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

          <button
            type="button"
            onClick={onClose}
            className="absolute top-[max(0.5rem,env(safe-area-inset-top))] right-3 z-40 flex h-11 w-11 items-center justify-center text-cream/85 transition-colors hover:text-cream sm:right-6 md:right-8 lg:right-10"
            aria-label="Close menu"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <div
            data-site-menu-scroll
            className="relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch] px-5 pt-[max(2.75rem,calc(env(safe-area-inset-top)+2.25rem))] pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8 sm:pt-14 sm:pb-12 md:px-10 lg:px-14"
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.5, ease: EASE }}
              className="mx-auto flex w-full max-w-3xl shrink-0 flex-col items-center text-center"
            >
              <p className="font-title text-[18px] leading-[1.05] font-normal tracking-[0.14em] text-cream uppercase sm:text-[28px] md:text-[34px] lg:text-[40px]">
                {SITE_NAME}
              </p>
              <p className="font-body mt-1.5 max-w-[16rem] text-[8px] font-medium tracking-[0.18em] text-cream/55 uppercase sm:mt-3 sm:max-w-md sm:text-[10px] md:tracking-[0.26em]">
                {SITE_TAGLINE}
              </p>
            </motion.div>

            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-start pt-5 pb-8 sm:pt-10 md:justify-center md:py-8 lg:py-6">
              <div className="grid w-full grid-cols-1 items-start gap-7 sm:gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,32rem)_minmax(0,1fr)] md:gap-8 lg:gap-10">
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
                      const isContact = link.href === ROUTES.CONTACT;

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={onClose}
                          className={cn(
                            "transition-colors duration-300",
                            isContact && "hidden md:inline",
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

                {/* Mobile: follow along elsewhere → icons → images */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.24, duration: 0.55, ease: EASE }}
                  className="flex min-w-0 w-full flex-col items-center text-center md:hidden"
                >
                  <p className="font-script py-1 text-[26px] leading-[1.35] tracking-[0.01em] text-cream/90 normal-case">
                    follow along elsewhere
                  </p>
                  <a
                    href={INSTAGRAM}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-title mt-2 text-[9px] font-normal tracking-[0.2em] text-cream/55 uppercase transition-colors duration-300 hover:text-blush"
                  >
                    {INSTAGRAM_HANDLE}
                  </a>

                  <div className="mt-4 flex items-center justify-center gap-4">
                    {SOCIAL_LINKS.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className="flex h-11 w-11 items-center justify-center text-cream/80 transition-colors duration-300 hover:text-blush"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4 fill-current"
                          aria-hidden
                        >
                          <path d={social.iconPath} />
                        </svg>
                      </a>
                    ))}
                    <a
                      href="mailto:hello@thehuestory.com"
                      aria-label="Email"
                      className="flex h-11 w-11 items-center justify-center text-cream/80 transition-colors duration-300 hover:text-blush"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4 fill-current"
                        aria-hidden
                      >
                        <path d={MAIL_PATH} />
                      </svg>
                    </a>
                  </div>

                  <div
                    aria-hidden
                    className="mt-4 h-px w-14 bg-cream/35"
                  />

                  <div className="mt-4 grid w-full max-w-[17.5rem] grid-cols-3 gap-2 self-center">
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
                          sizes="28vw"
                          className="object-cover object-center transition-transform duration-500 hover:scale-105"
                        />
                      </a>
                    ))}
                  </div>
                </motion.div>

                {/* Desktop: Instagram */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.24, duration: 0.55, ease: EASE }}
                  className="hidden min-w-0 w-full flex-col items-center text-center md:flex"
                >
                  <div className="flex flex-col items-center gap-1">
                    <p className="font-title text-[13px] font-normal tracking-[0.28em] text-cream uppercase md:text-[14px]">
                      Instagram
                    </p>
                    <p className="font-script text-[26px] leading-[1.3] tracking-[0.01em] text-cream/85 normal-case md:text-[28px]">
                      Follow Along
                    </p>
                  </div>

                  <a
                    href={INSTAGRAM}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-title mt-5 text-[10px] font-normal tracking-[0.2em] text-cream/55 uppercase transition-colors duration-300 hover:text-blush"
                  >
                    {INSTAGRAM_HANDLE}
                  </a>

                  <div
                    aria-hidden
                    className="mt-4 h-px w-20 bg-cream/35"
                  />

                  <div className="mt-6 grid w-full max-w-[24rem] grid-cols-3 gap-3.5 self-center md:max-w-[32rem] md:gap-4">
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
                          sizes="170px"
                          className="object-cover object-center transition-transform duration-500 hover:scale-105"
                        />
                      </a>
                    ))}
                  </div>
                </motion.div>

                {/* Elsewhere — desktop only (mobile icons live above images) */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32, duration: 0.55, ease: EASE }}
                  className="relative hidden min-w-0 w-full flex-col items-center text-center md:flex md:min-h-[22rem]"
                >
                  <p className="font-script py-1 text-[32px] leading-[1.3] tracking-[0.01em] text-cream/90 normal-case md:text-[36px]">
                    elsewhere
                  </p>
                  <p className="font-body mt-3.5 text-[10px] font-medium tracking-[0.22em] text-cream/50 uppercase">
                    Find Us On Social Media
                  </p>

                  <div className="mt-7 flex items-center justify-center gap-6">
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
                          className="h-[17px] w-[17px] fill-current"
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
                        className="h-[17px] w-[17px] fill-current"
                        aria-hidden
                      >
                        <path d={MAIL_PATH} />
                      </svg>
                    </a>
                  </div>

                  <div className="absolute right-0 bottom-0 mt-0 flex flex-col items-end">
                    <div className="relative flex items-end gap-0">
                      <div
                        aria-hidden
                        className="pointer-events-none absolute right-full bottom-[50%] h-px w-16 bg-cream/30 lg:w-24"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute bottom-full left-1/2 h-16 w-px -translate-x-1/2 bg-cream/30 lg:h-24"
                      />
                      <div className="relative h-28 w-28 lg:h-32 lg:w-32">
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
    </AnimatePresence>,
    document.body
  );
}
