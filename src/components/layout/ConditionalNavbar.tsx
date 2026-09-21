"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();

  // Home: logo + menu live inside the sticky hero (HeroNav)
  if (!pathname || pathname === "/" || pathname.startsWith("/studio")) {
    return null;
  }

  return <Navbar />;
}
