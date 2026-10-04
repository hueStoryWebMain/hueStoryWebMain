"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";

/** Lenis keeps its own scroll target, so reset it on route change or it restores the old position. */
function ScrollToTopOnRoute() {
  const pathname = usePathname();
  const lenis = useLenis();

  useLayoutEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    lenis?.scrollTo(target ?? 0, { immediate: true, force: true });
  }, [pathname, lenis]);

  return null;
}

type SmoothScrollProps = {
  children: React.ReactNode;
};

/**
 * Site-wide Lenis smooth scroll.
 * Disabled when the user prefers reduced motion.
 */
export default function SmoothScroll({ children }: SmoothScrollProps) {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (!enabled) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.08,
        duration: 1.15,
        smoothWheel: true,
        wheelMultiplier: 0.92,
        touchMultiplier: 1.1,
        syncTouch: false,
      }}
    >
      <ScrollToTopOnRoute />
      {children}
    </ReactLenis>
  );
}
