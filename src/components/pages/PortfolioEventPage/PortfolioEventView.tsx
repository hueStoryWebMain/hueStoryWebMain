"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import HeroNav from "@/components/layout/HeroNav";
import {
  ROUTES,
  eventHeroImage,
  imageDimsFromPath,
  portfolioEventHref,
  type PortfolioEvent,
} from "@/lib/constants";
import { useReveal } from "@/lib/useReveal";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const PAPER = "#F7F3EB";

function GalleryImage({
  src,
  alt,
  index,
  onOpen,
}: {
  src: string;
  alt: string;
  index: number;
  onOpen: (index: number) => void;
}) {
  const [ref, visible] = useReveal<HTMLButtonElement>(0.08);
  const { width, height } = imageDimsFromPath(src);

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`Open image ${index + 1}`}
      className="group mb-2 block w-full cursor-zoom-in overflow-hidden break-inside-avoid"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate3d(0,0,0)" : "translate3d(0,1.25rem,0)",
        transition: `opacity 1.1s ${EASE} ${(index % 3) * 0.08}s, transform 1.2s ${EASE} ${(index % 3) * 0.08}s`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 34vw"
        className="h-auto w-full transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
      />
    </button>
  );
}

function Lightbox({
  images,
  index,
  title,
  onClose,
  onStep,
}: {
  images: readonly string[];
  index: number;
  title: string;
  onClose: () => void;
  onStep: (dir: -1 | 1) => void;
}) {
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onStep]);

  const src = images[index];
  const { width, height } = imageDimsFromPath(src);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title}, image ${index + 1} of ${images.length}`}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#1C1816]/92 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center text-cream/80 transition-colors hover:text-cream sm:top-7 sm:right-7"
      >
        <span aria-hidden className="relative block h-5 w-5">
          <span className="absolute top-1/2 left-0 h-px w-full rotate-45 bg-current" />
          <span className="absolute top-1/2 left-0 h-px w-full -rotate-45 bg-current" />
        </span>
      </button>

      <button
        type="button"
        aria-label="Previous image"
        onClick={(e) => {
          e.stopPropagation();
          onStep(-1);
        }}
        className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center font-body text-[18px] text-cream/70 transition-colors hover:text-cream sm:left-5"
      >
        ←
      </button>

      <div
        className="relative mx-14 flex max-h-[86svh] max-w-[min(92vw,1100px)] items-center justify-center sm:mx-20"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          key={src}
          src={src}
          alt={`${title}, photograph ${index + 1}`}
          width={width}
          height={height}
          sizes="92vw"
          className="h-auto max-h-[86svh] w-auto max-w-full object-contain"
          priority
        />
      </div>

      <button
        type="button"
        aria-label="Next image"
        onClick={(e) => {
          e.stopPropagation();
          onStep(1);
        }}
        className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center font-body text-[18px] text-cream/70 transition-colors hover:text-cream sm:right-5"
      >
        →
      </button>

      <p className="font-body absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.24em] text-cream/55 tabular-nums sm:bottom-7 sm:text-[11px]">
        {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </p>
    </div>,
    document.body
  );
}

/**
 * PortfolioEventView — landscape hero · full-width masonry gallery · lightbox · next event
 */
export default function PortfolioEventView({
  event,
  next,
}: {
  event: PortfolioEvent;
  next: PortfolioEvent;
}) {
  const [headerRef, headerIn] = useReveal<HTMLElement>(0.2);
  const [footerRef, footerIn] = useReveal<HTMLElement>(0.2);
  const [open, setOpen] = useState<number | null>(null);
  const heroSrc = eventHeroImage(event);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: -1 | 1) =>
      setOpen((i) =>
        i === null
          ? i
          : (i + dir + event.gallery.length) % event.gallery.length
      ),
    [event.gallery.length]
  );

  const rise = (on: boolean, delay: number, dist = "0.9rem") =>
    ({
      opacity: on ? 1 : 0,
      transform: on ? "translate3d(0,0,0)" : `translate3d(0,${dist},0)`,
      transition: `opacity 1s ${EASE} ${delay}s, transform 1.1s ${EASE} ${delay}s`,
    }) as const;

  return (
    <main>
      {/* ——— Landscape hero · title bottom-right ——— */}
      <header
        ref={headerRef}
        className="relative z-0 h-[58svh] min-h-[400px] w-full overflow-hidden bg-base sm:h-[64svh] md:h-[70svh] md:min-h-[480px]"
      >
        <div
          aria-hidden
          className="absolute inset-0 will-change-[opacity,transform]"
          style={{
            opacity: headerIn ? 1 : 0,
            transform: headerIn ? "scale(1)" : "scale(1.04)",
            transition: `opacity 1.6s ${EASE} 0.05s, transform 2.2s ${EASE} 0.05s`,
          }}
        >
          <Image
            src={heroSrc}
            alt={`${event.title}, a celebration designed by The Hue Story`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-black/20"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(28,24,22,0.35)_0%,transparent_30%,transparent_55%,rgba(28,24,22,0.6)_100%)]"
        />

        <div className="pointer-events-none absolute inset-0 z-10">
          <div
            className="pointer-events-auto relative h-full"
            style={rise(headerIn, 0.25, "-0.4rem")}
          >
            <HeroNav light />
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 flex justify-end px-5 pb-6 sm:px-7 sm:pb-7 md:px-6 md:pb-8 lg:px-8">
            <h1
              className="font-title ml-auto w-fit max-w-[16rem] text-right text-[clamp(1.9rem,8.5vw,2.75rem)] font-normal leading-[1.02] tracking-[0.06em] text-cream uppercase sm:max-w-none md:text-[clamp(2.75rem,5vw,4.25rem)] md:tracking-[0.08em]"
              style={rise(headerIn, 0.45, "1.5rem")}
            >
              {event.title}
            </h1>
          </div>
        </div>
      </header>

      {/* ——— Couple name · hairline · full-width gallery ——— */}
      <section
        aria-label={`${event.title} gallery`}
        className="w-full"
        style={{ backgroundColor: PAPER }}
      >
        <div className="flex justify-center px-5 pt-12 sm:pt-14 md:pt-16 lg:pt-20">
          <div className="inline-flex flex-col items-center">
            <p
              className="font-title text-center text-[24px] leading-[1.15] font-normal tracking-[0.08em] text-ink uppercase sm:text-[30px] md:text-[36px] lg:text-[40px]"
              style={rise(headerIn, 0.6, "0.8rem")}
            >
              {event.couple.split("&").map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 ? (
                    <span className="font-silk normal-case">&amp;</span>
                  ) : null}
                </span>
              ))}
            </p>
            <div
              aria-hidden
              className="mt-4 h-px w-full origin-center bg-ink/30 sm:mt-5"
              style={{
                opacity: headerIn ? 1 : 0,
                transform: headerIn ? "scaleX(1)" : "scaleX(0)",
                transition: `opacity 0.8s ${EASE} 0.8s, transform 1.2s ${EASE} 0.8s`,
              }}
            />
          </div>
        </div>

        <div className="w-full columns-1 gap-2 px-2 pt-10 pb-2 sm:columns-2 sm:pt-12 md:columns-3 md:pt-14 lg:pt-16">
          {event.gallery.map((src, i) => (
            <GalleryImage
              key={src}
              src={src}
              alt={`${event.title}, photograph ${i + 1} of ${event.gallery.length}`}
              index={i}
              onOpen={setOpen}
            />
          ))}
        </div>
      </section>

      {/* ——— Next event ——— */}
      <section
        ref={footerRef}
        aria-label="Next event"
        className="w-full"
        style={{ backgroundColor: PAPER }}
      >
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-5 pt-14 pb-20 text-center sm:pt-16 sm:pb-24 md:pt-20 md:pb-28">
          <div
            aria-hidden
            className="h-px w-14 origin-center bg-ink/20 sm:w-16"
            style={{
              opacity: footerIn ? 1 : 0,
              transform: footerIn ? "scaleX(1)" : "scaleX(0)",
              transition: `opacity 0.8s ${EASE} 0.05s, transform 1.1s ${EASE} 0.05s`,
            }}
          />

          <p
            className="font-body mt-8 text-[10px] font-medium tracking-[0.28em] text-ink/45 uppercase sm:text-[11px]"
            style={rise(footerIn, 0.12, "0.5rem")}
          >
            Next
          </p>

          <Link
            href={portfolioEventHref(next.slug)}
            className="font-title mt-3 text-[24px] leading-[1.1] font-normal tracking-[0.14em] text-ink uppercase transition-colors duration-300 hover:text-blush sm:text-[30px] md:text-[36px]"
            style={rise(footerIn, 0.2, "0.8rem")}
          >
            {next.title}
          </Link>

          <Link
            href={ROUTES.PORTFOLIO}
            className="group mt-8 inline-flex items-center gap-3 sm:mt-10"
            style={rise(footerIn, 0.3, "0.5rem")}
          >
            <span className="font-body text-[10px] font-medium tracking-[0.24em] text-ink/60 uppercase transition-colors duration-300 group-hover:text-blush sm:text-[11px]">
              All events
            </span>
            <span
              aria-hidden
              className="block h-px w-8 bg-ink/35 transition-all duration-300 group-hover:w-12 group-hover:bg-blush sm:w-10"
            />
          </Link>
        </div>
      </section>

      {open !== null ? (
        <Lightbox
          images={event.gallery}
          index={open}
          title={event.title}
          onClose={close}
          onStep={step}
        />
      ) : null}
    </main>
  );
}
