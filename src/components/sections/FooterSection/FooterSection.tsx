import Link from "next/link";
import { FOOTER_LINKS, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";
import Logo from "@/components/common/Logo";
import Container from "@/components/common/Container";

export default function FooterSection() {
  return (
    <footer className="relative z-10 border-t border-cream/20 bg-base">
      <Container className="py-16 md:py-20">
        <div className="flex flex-col items-center text-center">
          <Logo variant="altWhite" size={80} />

          <p className="text-script mt-6 text-[22px] md:text-[28px]">in colour</p>

          <nav
            className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
            aria-label="Footer"
          >
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-nav text-cream/70 transition-colors hover:text-blush"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-10 flex items-center gap-6">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="text-cream/55 transition-colors hover:text-blush"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
                  aria-hidden
                >
                  <path d={social.iconPath} />
                </svg>
              </a>
            ))}
          </div>

          <p className="mt-12 font-body text-[12px] font-normal tracking-wide text-bare">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
