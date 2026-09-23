"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import SiteMenu from "./SiteMenu";

type HeroNavProps = {
  /** Cream wordmark + hamburger for photography heroes */
  light?: boolean;
};

/**
 * Nav chrome that lives inside the sticky hero — pins and gets covered with it.
 */
export default function HeroNav({ light = true }: HeroNavProps) {
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link
              href={ROUTES.HOME}
              className={cn(
                "font-title block whitespace-nowrap text-[19px] font-normal tracking-[0.06em] uppercase transition-opacity hover:opacity-80 sm:text-[20px] sm:tracking-[0.08em] md:text-[20px] md:tracking-[0.1em] lg:text-[24px]",
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
                  isMenuOpen && "translate-y-[3.5px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "h-px w-full origin-center transition-transform duration-300",
                  light ? "bg-cream" : "bg-ink",
                  isMenuOpen && "-translate-y-[3.5px] -rotate-45"
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
