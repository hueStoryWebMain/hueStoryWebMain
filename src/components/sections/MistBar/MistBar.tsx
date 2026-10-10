"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ROUTES, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Wordmark matches HeroNav (size, tracking, weight) so it reads as one line
 * when the mist bar scrolls up over the hero.
 */
const WORDMARK =
  "font-title block whitespace-nowrap text-[19px] font-normal tracking-[0.06em] text-[#2C2723] uppercase [-webkit-text-stroke:0.6px_currentColor] sm:text-[20px] sm:tracking-[0.08em] md:tracking-[0.1em] lg:text-[24px]";

const SIDE_LINK =
  "absolute top-1/2 z-10 flex h-11 -translate-y-1/2 items-center font-body text-[8px] font-medium uppercase tracking-normal text-[#2C2723] transition-colors hover:text-blush min-[360px]:text-[10px] min-[360px]:tracking-[0.12em] min-[420px]:tracking-[0.18em] sm:text-[11px] sm:tracking-[0.22em] md:text-xs md:tracking-[0.24em]";

function Bar() {
  return (
    <div className="relative h-[72px] w-full sm:h-[88px] lg:h-[112px]">
      <Link
        href={ROUTES.HOME}
        className={cn(
          SIDE_LINK,
          "left-2.5 min-[360px]:left-4 sm:left-6 lg:left-[9vw] xl:left-[12vw]"
        )}
      >
        Home
      </Link>

      <p className="pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <span className={WORDMARK}>{SITE_NAME}</span>
      </p>

      <Link
        href={ROUTES.CONTACT}
        className={cn(
          SIDE_LINK,
          "right-2.5 min-[360px]:right-4 sm:right-6 lg:right-[9vw] xl:right-[12vw]"
        )}
      >
        Inquire
      </Link>
    </div>
  );
}

/**
 * Cool Mist utility bar — Home · brand title · Inquire.
 * After it leaves the viewport, scrolling up slides it back so the links stay reachable.
 */
export default function MistBar() {
  const slotRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    let frame = 0;
    let last = window.scrollY;
    let shown = false;

    const update = () => {
      frame = 0;
      const slot = slotRef.current;
      if (!slot) return;

      const y = window.scrollY;
      const delta = y - last;
      last = y;

      const top = slot.getBoundingClientRect().top;
      let next = shown;

      if (top >= -1) next = false;
      else if (delta < -6) next = true;
      else if (delta > 6) next = false;

      if (next !== shown) {
        shown = next;
        setRevealed(next);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <section
        ref={slotRef}
        className="relative z-10 w-full bg-mist text-ink"
        aria-label="Site bar"
        aria-hidden={revealed}
        inert={revealed}
      >
        <Bar />
      </section>

      <div
        className={cn(
          "fixed inset-x-0 top-0 z-[80] bg-mist pt-[env(safe-area-inset-top)] text-ink shadow-[0_10px_28px_-18px_rgba(44,39,35,0.45)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          revealed
            ? "translate-y-0"
            : "pointer-events-none -translate-y-full"
        )}
        aria-hidden={!revealed}
        inert={!revealed}
      >
        <Bar />
      </div>
    </>
  );
}
