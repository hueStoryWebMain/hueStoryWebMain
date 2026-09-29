"use client";

import Image from "next/image";
import Link from "next/link";
import {
  PORTFOLIO_EVENTS,
  portfolioEventHref,
  type PortfolioEvent,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useReveal } from "@/lib/useReveal";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const PAPER = "#F7F3EB";

function EventCard({
  event,
  index,
}: {
  event: PortfolioEvent;
  index: number;
}) {
  const [ref, visible] = useReveal<HTMLElement>(0.12);
  const href = portfolioEventHref(event.slug);
  /* Right-column cards trail slightly so each pair reads left → right */
  const delay = index % 2 === 1 ? 0.14 : 0;

  const rise = (extra: number, dist = "1.25rem") =>
    ({
      opacity: visible ? 1 : 0,
      transform: visible ? "translate3d(0,0,0)" : `translate3d(0,${dist},0)`,
      transition: `opacity 1.1s ${EASE} ${delay + extra}s, transform 1.2s ${EASE} ${delay + extra}s`,
    }) as const;

  return (
    <article ref={ref} className="group flex flex-col">
      <Link
        href={href}
        aria-label={`${event.title} — view the gallery`}
        className="relative block overflow-hidden will-change-[opacity,transform]"
        style={rise(0, "1.75rem")}
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink/5">
          <Image
            src={event.cover}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, 46vw"
            priority={index < 2}
            className="object-cover object-center"
          />
        </div>
      </Link>

      <div className="mt-6 flex flex-col items-center text-center sm:mt-7 md:mt-8">
        <h3
          className="font-title text-[20px] leading-[1.1] font-normal tracking-[0.14em] text-ink uppercase will-change-[opacity,transform] sm:text-[22px] md:text-[24px] lg:text-[28px]"
          style={rise(0.18, "0.8rem")}
        >
          <Link
            href={href}
            className="text-ink transition-colors duration-300 hover:text-blush"
          >
            {event.title}
          </Link>
        </h3>

        <div style={rise(0.3, "0.6rem")}>
          <Link
            href={href}
            className="group/cta mt-4 inline-flex items-center gap-3 sm:mt-5"
          >
            <span className="font-body text-[10px] font-medium tracking-[0.24em] text-ink/60 uppercase transition-colors duration-300 group-hover/cta:text-blush sm:text-[11px]">
              View the gallery
            </span>
            <span
              aria-hidden
              className="block h-px w-8 bg-ink/35 transition-all duration-300 group-hover/cta:w-12 group-hover/cta:bg-blush sm:w-10 sm:group-hover/cta:w-14"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

/**
 * PortfolioEventsTHS — paper cream · paired event covers → gallery pages
 */
export default function PortfolioEventsTHS() {
  const [headRef, headIn] = useReveal<HTMLElement>(0.3);

  const lineIn = (origin: "left" | "right") =>
    ({
      transformOrigin: origin,
      opacity: headIn ? 1 : 0,
      transform: headIn ? "scaleX(1)" : "scaleX(0)",
      transition: `opacity 0.8s ${EASE} 0.1s, transform 1.3s ${EASE} 0.1s`,
    }) as const;

  const rise = (delay: number, dist = "0.7rem") =>
    ({
      opacity: headIn ? 1 : 0,
      transform: headIn ? "translate3d(0,0,0)" : `translate3d(0,${dist},0)`,
      transition: `opacity 1s ${EASE} ${delay}s, transform 1.1s ${EASE} ${delay}s`,
    }) as const;

  return (
    <section
      className="relative z-10 w-full overflow-x-clip text-ink"
      aria-labelledby="portfolio-events-heading"
      style={{ backgroundColor: PAPER }}
    >
      {/* Label with edge-to-edge hairlines, then one-line title */}
      <header
        ref={headRef}
        className="flex w-full flex-col items-center pt-8 sm:pt-10 md:pt-12 lg:pt-14"
      >
        <div className="flex w-full items-center gap-4 sm:gap-6 md:gap-8">
          <span
            aria-hidden
            className="h-px flex-1 bg-ink/20"
            style={lineIn("right")}
          />
          <p
            className="font-body shrink-0 text-[10px] font-normal tracking-[0.28em] text-ink/60 uppercase sm:text-[11px] md:text-[12px]"
            style={rise(0.05, "0.4rem")}
          >
            A selection of our work
          </p>
          <span
            aria-hidden
            className="h-px flex-1 bg-ink/20"
            style={lineIn("left")}
          />
        </div>

        <h2
          id="portfolio-events-heading"
          className="font-title mt-5 px-5 text-center text-[17px] leading-[1.2] font-normal tracking-[0.1em] text-ink uppercase sm:mt-6 sm:text-[22px] sm:whitespace-nowrap md:text-[26px] lg:text-[30px]"
          style={rise(0.2, "0.8rem")}
        >
          Each celebration, its own story
        </h2>
      </header>

      <div className="mx-auto w-full max-w-[88rem] px-5 pt-12 pb-20 sm:px-8 sm:pt-14 sm:pb-24 md:px-10 md:pt-16 md:pb-40 lg:px-14 lg:pt-20 lg:pb-48">
        <ul className="grid list-none grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 md:grid-cols-2 md:gap-x-10 md:gap-y-24 lg:gap-x-16 lg:gap-y-28 xl:gap-x-20">
          {PORTFOLIO_EVENTS.map((event, i) => (
            <li
              key={event.slug}
              className={cn(
                /* Right column drops for an editorial stagger */
                i % 2 === 1 && "md:translate-y-24 lg:translate-y-32"
              )}
            >
              <EventCard event={event} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
