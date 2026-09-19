"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Logo from "@/components/common/Logo";
import SiteMenu from "./SiteMenu";

/**
 * Site navbar for non-home pages (home uses HeroNav inside the sticky hero).
 */
export default function Navbar() {
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
      <header className="fixed top-0 right-0 left-0 z-[100] border-b border-transparent bg-transparent">
        <nav
          className="relative flex h-[96px] w-full items-center lg:h-[112px]"
          aria-label="Primary"
        >
          <div className="absolute top-[54%] left-1/2 -translate-x-1/2 -translate-y-1/2 lg:top-[55%]">
            <Logo variant="altWhite" size={80} priority />
          </div>

          <button
            type="button"
            className="absolute top-[54%] right-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-cream sm:right-6 lg:top-[55%] lg:right-8"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex w-[22px] flex-col gap-[6px]" aria-hidden>
              <span
                className={cn(
                  "h-px w-full origin-center bg-cream transition-transform duration-300",
                  isMenuOpen && "translate-y-[3.5px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "h-px w-full origin-center bg-cream transition-transform duration-300",
                  isMenuOpen && "-translate-y-[3.5px] -rotate-45"
                )}
              />
            </span>
          </button>
        </nav>
      </header>

      <SiteMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activePath={pathname ?? "/"}
      />
    </>
  );
}
