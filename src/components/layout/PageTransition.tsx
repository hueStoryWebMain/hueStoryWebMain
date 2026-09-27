"use client";

import { ViewTransition } from "react";
import { usePathname } from "next/navigation";

/**
 * Soft page change — old page fades out, new page rises in.
 * Keyed by pathname so /portfolio → /portfolio/[slug] also transitions.
 * Animations live in globals.css (.page-exit / .page-enter).
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <ViewTransition
      key={pathname}
      enter="page-enter"
      exit="page-exit"
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
