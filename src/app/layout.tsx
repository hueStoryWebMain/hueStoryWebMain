import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import "react-photo-view/dist/react-photo-view.css";
import ConditionalNavbar from "@/components/layout/ConditionalNavbar";
import SmoothScroll from "@/components/layout/SmoothScroll";
import PageTransition from "@/components/layout/PageTransition";
import FooterSection from "@/components/sections/FooterSection/FooterSection";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
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
  description:
    "Experiential event and space design. The Hue Story designs multi-day destination weddings and private events for clients across the globe.",
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [{ url: "/images/logo/SlateBlue-logo.png", type: "image/png" }],
    apple: [{ url: "/images/logo/SlateBlue-logo.png", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: SITE_NAME,
    images: [
      {
        url: "/images/og-share.jpg",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og-share.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={fontVariables} suppressHydrationWarning>
      <body className="min-h-dvh overflow-x-clip bg-base text-cream antialiased">
        <SmoothScroll>
          <ConditionalNavbar />
          <main className="min-h-dvh">
            <PageTransition>{children}</PageTransition>
          </main>
          <FooterSection />
        </SmoothScroll>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
