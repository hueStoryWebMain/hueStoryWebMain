"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();

  // Home pairing previews: logo + menu live inside the sticky hero (HeroNav)
  if (
    !pathname ||
    pathname === "/" ||
    pathname === "/home-1" ||
    pathname === "/home-2" ||
    pathname === "/home-3" ||
    pathname.startsWith("/studio")
  ) {
    return null;
  }

  return <Navbar />;
}
