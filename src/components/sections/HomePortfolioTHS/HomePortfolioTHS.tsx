"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  PORTFOLIO_HOME_ROW_A,
  PORTFOLIO_HOME_ROW_B,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

const IDLE_MS = 15_000;
/** Auto drift speed — pixels per second (slower) */
const AUTO_SPEED_PX_S = 11;
const INERTIA_FRICTION = 0.95;
const INERTIA_MIN_V = 0.08;

const QUOTE_WORDS = "“quietly intentional in every hue”".split(" ");

type Frame = {
  src: string;
  shape: "portrait" | "wide";
};

function FrameCard({
  frame,
  priority = false,
}: {
  frame: Frame;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden bg-ink/10",
        /* Shorter on mobile; scale up from tablet */
        "h-[156px] sm:h-[220px] md:h-[300px] lg:h-[360px]",
        frame.shape === "portrait"
          ? "w-[110px] sm:w-[154px] md:w-[210px] lg:w-[252px]"
          : "w-[220px] sm:w-[310px] md:w-[420px] lg:w-[510px]"
      )}
    >
      <Image
        src={frame.src}
        alt=""
        fill
        draggable={false}
        sizes="(max-width: 640px) 55vw, (max-width: 1024px) 40vw, 34vw"
        priority={priority}
        className="pointer-events-none select-none object-cover object-center"
      />
    </div>
  );
}

function MarqueeRow({
  frames,
  direction,
  autoScroll,
  onInteract,
  priority,
}: {
  frames: readonly Frame[];
  direction: "rtl" | "ltr";
  autoScroll: boolean;
  onInteract: () => void;
  priority?: boolean;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const loopWidthRef = useRef(0);
  const xRef = useRef(0);
  const vRef = useRef(0);
  const draggingRef = useRef(false);
  const axisRef = useRef<"h" | "v" | null>(null);
  const lastXRef = useRef(0);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const lastTRef = useRef(0);
  const autoScrollRef = useRef(autoScroll);
  const track = [...frames, ...frames];

  autoScrollRef.current = autoScroll;

  const normalize = useCallback((value: number) => {
    const loop = loopWidthRef.current;
    if (loop <= 0) return value;
    let x = value % loop;
    if (x < 0) x += loop;
    return x;
  }, []);

  const applyX = useCallback(
    (value: number) => {
      const trackEl = trackRef.current;
      if (!trackEl) return;
      xRef.current = normalize(value);
      trackEl.style.transform = `translate3d(${-xRef.current}px, 0, 0)`;
    },
    [normalize]
  );

  const measure = useCallback(() => {
    const trackEl = trackRef.current;
    if (!trackEl) return;
    loopWidthRef.current = trackEl.scrollWidth / 2;
    applyX(xRef.current);
  }, [applyX]);

  useEffect(() => {
    measure();
    const trackEl = trackRef.current;
    if (!trackEl) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(trackEl);
    return () => ro.disconnect();
  }, [measure, frames]);

  /* Unified RAF: auto drift + inertia — GPU transform, no scrollLeft jumps */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (!draggingRef.current) {
        if (autoScrollRef.current && !mq.matches) {
          const dir = direction === "rtl" ? 1 : -1;
          applyX(xRef.current + dir * AUTO_SPEED_PX_S * dt);
          vRef.current = 0;
        } else if (Math.abs(vRef.current) > INERTIA_MIN_V) {
          applyX(xRef.current + vRef.current);
          vRef.current *= INERTIA_FRICTION;
        } else {
          vRef.current = 0;
        }
      }

      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [applyX, direction]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    /* Only drag-to-scroll while holding — never steal wheel / page scroll */
    draggingRef.current = true;
    axisRef.current = null;
    vRef.current = 0;
    lastXRef.current = e.clientX;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    lastTRef.current = performance.now();
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;

    if (axisRef.current === null) {
      const adx = Math.abs(e.clientX - startXRef.current);
      const ady = Math.abs(e.clientY - startYRef.current);
      if (adx < 8 && ady < 8) return;
      axisRef.current = adx > ady ? "h" : "v";
      if (axisRef.current === "v") {
        draggingRef.current = false;
        return;
      }
      /* Confirmed horizontal hold-drag */
      onInteract();
      e.currentTarget.setPointerCapture(e.pointerId);
      e.currentTarget.classList.add("cursor-grabbing");
    }

    if (axisRef.current !== "h") return;

    const now = performance.now();
    const dx = e.clientX - lastXRef.current;
    const dt = Math.max(now - lastTRef.current, 1);
    applyX(xRef.current - dx);
    vRef.current = (-dx / dt) * 16.67;
    lastXRef.current = e.clientX;
    lastTRef.current = now;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const wasHorizontal = axisRef.current === "h";
    draggingRef.current = false;
    axisRef.current = null;
    e.currentTarget.classList.remove("cursor-grabbing");
    if (wasHorizontal) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* already released */
      }
    }
  };

  return (
    <div
      ref={viewportRef}
      role="region"
      aria-label="Portfolio images"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className="w-full cursor-grab overflow-hidden select-none"
      style={{ touchAction: "pan-y" }}
    >
      <div
        ref={trackRef}
        className="flex w-max gap-2 will-change-transform sm:gap-3 md:gap-3.5"
        style={{ transform: "translate3d(0, 0, 0)" }}
      >
        {track.map((frame, i) => (
          <FrameCard
            key={`${frame.src}-${i}`}
            frame={frame}
            priority={priority && i < frames.length}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * HomePortfolioTHS — paper cream · full-bleed quote · dual marquees
 * Smooth transform drift · drag / wheel / touch with inertia
 */
export default function HomePortfolioTHS() {
  const sectionRef = useRef<HTMLElement>(null);
  const inViewRef = useRef(false);
  const idleTimerRef = useRef<number | undefined>(undefined);
  const quotePlayedRef = useRef(false);
  const [autoScroll, setAutoScroll] = useState(false);
  const [quoteIn, setQuoteIn] = useState(false);

  const clearIdle = useCallback(() => {
    if (idleTimerRef.current !== undefined) {
      window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = undefined;
    }
  }, []);

  const armIdle = useCallback(() => {
    clearIdle();
    if (!inViewRef.current) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    idleTimerRef.current = window.setTimeout(() => {
      if (inViewRef.current) setAutoScroll(true);
    }, IDLE_MS);
  }, [clearIdle]);

  const onInteract = useCallback(() => {
    if (!inViewRef.current) return;
    setAutoScroll(false);
    armIdle();
  }, [armIdle]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        inViewRef.current = visible;
        if (visible) {
          setAutoScroll(false);
          armIdle();
          if (!quotePlayedRef.current) {
            quotePlayedRef.current = true;
            if (mq.matches) setQuoteIn(true);
            else requestAnimationFrame(() => setQuoteIn(true));
          }
        } else {
          clearIdle();
          setAutoScroll(false);
        }
      },
      { threshold: 0.28 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      clearIdle();
    };
  }, [armIdle, clearIdle]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full"
      aria-label="Portfolio"
      style={{ backgroundColor: "#F7F3EB" }}
    >
      <div className="relative z-10 flex flex-col gap-3 pt-5 pb-7 sm:gap-4 sm:pt-4 sm:pb-10 md:gap-5 md:pb-12 lg:pb-14">
        {/*
          Script glyphs overhang their layout box. Fitting text to the viewport
          edge + transform on inline-block spans was clipping letters (l, y, h).
          Use CSS clamp sizing, plain inline spans, opacity-only reveal.
        */}
        <div className="w-full overflow-visible px-5 py-5 sm:px-8 sm:py-6 md:px-10">
          <p
            className="font-script mx-auto max-w-[24rem] text-center text-[clamp(1.95rem,9.2vw,2.9rem)] leading-[1.7] tracking-[0.02em] normal-case select-none sm:max-w-none sm:text-[clamp(1.85rem,4.2vw,3.35rem)] sm:leading-[1.55]"
            style={{ color: "#A5BDD5" }}
          >
            {QUOTE_WORDS.map((word, i) => (
              <span
                key={`${word}-${i}`}
                className="inline"
                style={{
                  opacity: quoteIn ? 1 : 0,
                  transition: quoteIn
                    ? `opacity 0.35s ease-out ${i * 0.06}s`
                    : "none",
                }}
              >
                {word}
                {i < QUOTE_WORDS.length - 1 ? " " : ""}
              </span>
            ))}
          </p>
        </div>

        <div className="flex flex-col gap-2 overflow-x-clip sm:gap-3 md:gap-3.5">
          <MarqueeRow
            frames={PORTFOLIO_HOME_ROW_A}
            direction="rtl"
            autoScroll={autoScroll}
            onInteract={onInteract}
            priority
          />
          <MarqueeRow
            frames={PORTFOLIO_HOME_ROW_B}
            direction="ltr"
            autoScroll={autoScroll}
            onInteract={onInteract}
          />
        </div>
      </div>
    </section>
  );
}
