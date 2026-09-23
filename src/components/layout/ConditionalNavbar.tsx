"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();

  // Home + About + Portfolio: logo + menu live inside the page hero (HeroNav)
  if (
    !pathname ||
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/portfolio" ||
    pathname.startsWith("/studio")
  ) {
    return null;
  }

  return <Navbar />;
}
