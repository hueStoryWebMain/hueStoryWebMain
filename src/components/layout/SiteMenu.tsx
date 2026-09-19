"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS, ROUTES, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

type SiteMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  activePath: string;
};

export default function SiteMenu({
  isOpen,
  onClose,
  activePath,
}: SiteMenuProps) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key="site-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[95] bg-base"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <nav className="flex h-full flex-col items-center justify-center gap-7 px-8 pb-8 pt-24 md:gap-9">
            {NAV_LINKS.map((link, index) => {
              const active =
                activePath === link.href ||
                activePath.startsWith(`${link.href}/`);

              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.08 * index + 0.12,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      "font-heading text-3xl tracking-wide transition-colors md:text-5xl",
                      active ? "text-blush" : "text-cream hover:text-blush"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.45 }}
              className="mt-6"
            >
              <Link
                href={ROUTES.CONTACT}
                onClick={onClose}
                className="text-nav font-cta border border-cream bg-cream px-8 py-3 text-ink transition-colors hover:bg-cream/90"
              >
                Enquire
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="text-script mt-10 text-[22px] md:text-[28px]"
            >
              {SITE_NAME}
            </motion.p>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
