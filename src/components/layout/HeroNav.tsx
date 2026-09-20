"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES, SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Logo from "@/components/common/Logo";
import SiteMenu from "./SiteMenu";

type HeroNavProps = {
  /** Cream logo + hamburger for photography heroes */
  light?: boolean;
};

const MAIL_ICON =
  "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z";

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
            <Logo
              variant="whiteName"
              size={44}
              priority
              className="sm:!h-14 md:!h-16"
            />
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

        {/* Full-bleed muted rule under the wordmark */}
        <div className="h-px w-full bg-white/45" aria-hidden />

        {/* Meta strip — editorial label left, socials + mail right */}
        <div className="pointer-events-auto relative z-10 flex w-full items-center justify-between px-4 py-2.5 sm:px-6 sm:py-3.5 lg:px-8">
          <p className="font-script overflow-visible py-1 text-[18px] leading-[1.4] tracking-[0.04em] text-warm-white/95 normal-case sm:text-[20px] md:text-[22px]">
            Elsewhere
          </p>

          <div className="flex items-center gap-4 sm:gap-5">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="text-warm-white/90 transition-colors hover:text-warm-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current sm:h-[17px] sm:w-[17px]"
                  aria-hidden
                >
                  <path d={social.iconPath} fillRule="evenodd" />
                </svg>
              </a>
            ))}
            <Link
              href={ROUTES.CONTACT}
              aria-label="Email / get in touch"
              className="text-warm-white/90 transition-colors hover:text-warm-white"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-current sm:h-[17px] sm:w-[17px]"
                aria-hidden
              >
                <path d={MAIL_ICON} />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <SiteMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activePath={pathname ?? "/"}
      />
    </>
  );
}
