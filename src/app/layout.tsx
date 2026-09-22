import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import "react-photo-view/dist/react-photo-view.css";
import ConditionalNavbar from "@/components/layout/ConditionalNavbar";
import SmoothScroll from "@/components/layout/SmoothScroll";
import FooterSection from "@/components/sections/FooterSection/FooterSection";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/constants";
import { fontVariables } from "@/lib/fonts";
import { colors } from "@/lib/theme";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: colors.base,
};

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: `${SITE_TAGLINE}. Quiet, intentional planning — colour chosen once, carried through every detail.`,
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [{ url: "/images/logo/SlateBlue-logo.png", type: "image/png" }],
    apple: [{ url: "/images/logo/SlateBlue-logo.png", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body className="min-h-dvh overflow-x-clip bg-base text-cream antialiased">
        <SmoothScroll>
          <ConditionalNavbar />
          <main className="min-h-dvh">{children}</main>
          <FooterSection />
        </SmoothScroll>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
