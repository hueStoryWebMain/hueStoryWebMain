"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOGOS, ROUTES, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import SiteMenu from "./SiteMenu";

type HeroNavProps = {
  /** Cream wordmark + hamburger for photography heroes */
  light?: boolean;
  /** Circular logo mark on the top left */
  logo?: boolean;
  /** Heavier wordmark (title font only ships at 400) */
  boldWordmark?: boolean;
};

/**
 * Nav chrome that lives inside the sticky hero — pins and gets covered with it.
 */
export default function HeroNav({
  light = true,
  logo = false,
  boldWordmark = false,
}: HeroNavProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 pt-[env(safe-area-inset-top)]">
        <nav
          className="pointer-events-auto relative flex h-[72px] w-full items-center sm:h-[88px] lg:h-[112px]"
          aria-label="Primary"
        >
          {logo ? (
            <Link
              href={ROUTES.HOME}
              aria-label={`${SITE_NAME} home`}
              className="absolute top-1/2 left-4 z-10 block h-10 w-10 -translate-y-1/2 transition-opacity hover:opacity-80 sm:left-6 sm:h-16 sm:w-16 lg:left-8 lg:h-20 lg:w-20"
            >
              <Image
                src={LOGOS.light}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 80px, (min-width: 640px) 64px, 40px"
                className="object-contain"
              />
            </Link>
          ) : null}

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link
              href={ROUTES.HOME}
              className={cn(
                "font-title block whitespace-nowrap text-[19px] font-normal tracking-[0.06em] uppercase transition-opacity hover:opacity-80 sm:text-[20px] sm:tracking-[0.08em] md:text-[20px] md:tracking-[0.1em] lg:text-[24px]",
                boldWordmark && "[-webkit-text-stroke:0.6px_currentColor]",
                light ? "text-cream" : "text-ink"
              )}
            >
              {SITE_NAME}
            </Link>
          </div>

          <button
            type="button"
            className={cn(
              "absolute top-1/2 right-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center sm:right-6 lg:right-8",
              light ? "text-cream" : "text-ink"
            )}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex w-[22px] flex-col gap-[6px]" aria-hidden>
              <span
                className={cn(
                  "h-px w-full origin-center transition-transform duration-300",
                  light ? "bg-cream" : "bg-ink",
                  isMenuOpen && "translate-y-[7px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "h-px w-full transition-opacity duration-300",
                  light ? "bg-cream" : "bg-ink",
                  isMenuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "h-px w-full origin-center transition-transform duration-300",
                  light ? "bg-cream" : "bg-ink",
                  isMenuOpen && "-translate-y-[7px] -rotate-45"
                )}
              />
            </span>
          </button>
        </nav>
      </div>

      <SiteMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activePath={pathname ?? "/"}
      />
    </>
  );
}
