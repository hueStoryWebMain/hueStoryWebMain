import Link from "next/link";
import { ROUTES, SITE_NAME } from "@/lib/constants";

/**
 * Cool Mist utility bar — Home · brand title · Inquire
 * Soft Ink type on #E2E9F5 (Round 04 section band).
 */
export default function MistBar() {
  return (
    <section
      className="relative z-10 w-full bg-mist text-ink"
      aria-label="Site bar"
    >
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-5 py-4 sm:gap-6 sm:px-8 sm:py-5 md:max-w-6xl md:gap-8 md:px-10 md:py-6 lg:max-w-7xl lg:gap-16 lg:px-12">
        <Link
          href={ROUTES.HOME}
          className="text-nav shrink-0 text-[#2C2723] transition-colors hover:text-blush"
        >
          Home
        </Link>

        <p className="font-title min-w-0 flex-1 truncate text-center text-[13px] font-normal tracking-[0.06em] text-[#2C2723] uppercase sm:text-[16px] sm:tracking-[0.08em] md:text-[18px] md:tracking-[0.1em] lg:text-[22px]">
          {SITE_NAME}
        </p>

        <Link
          href={ROUTES.CONTACT}
          className="text-nav shrink-0 text-[#2C2723] transition-colors hover:text-blush"
        >
          Inquire
        </Link>
      </div>
    </section>
  );
}
