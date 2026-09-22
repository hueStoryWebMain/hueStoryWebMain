"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();

  // Home + About: logo + menu live inside the sticky / page hero (HeroNav)
  if (
    !pathname ||
    pathname === "/" ||
    pathname === "/about" ||
    pathname.startsWith("/studio")
  ) {
    return null;
  }

  return <Navbar />;
}
