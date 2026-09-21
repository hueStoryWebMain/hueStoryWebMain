export const SITE_NAME = "The Hue Story";
export const SITE_TAGLINE = "Luxury editorial weddings & events";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const ROUTES = {
  HOME: "/",
  PORTFOLIO: "/portfolio",
  ABOUT: "/about",
  SERVICES: "/services",
  THE_EXPERIENCE: "/the-experience",
  CONTACT: "/get-in-touch",
} as const;

/** Primary nav */
export const NAV_LINKS = [
  { name: "Home", href: ROUTES.HOME },
  { name: "Portfolio", href: ROUTES.PORTFOLIO },
  { name: "Services", href: ROUTES.SERVICES },
  { name: "About", href: ROUTES.ABOUT },
  { name: "Experience", href: ROUTES.THE_EXPERIENCE },
] as const;

export const FOOTER_LINKS = [
  { name: "Portfolio", href: ROUTES.PORTFOLIO },
  { name: "About", href: ROUTES.ABOUT },
  { name: "Enquire", href: ROUTES.CONTACT },
] as const;

export const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/the_hue_story",
    /** Solid filled camera glyph */
    iconPath:
      "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m9.45 3.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10m0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/thehuestory",
    iconPath:
      "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
  },
] as const;

/**
 * Logo variants
 * — alt: rose mark
 * — altWhite: cream/white mark for deep base & photo overlays
 * — primary / light: alternate exports
 */
export const LOGOS = {
  primary: "/images/logo/logo-primary.png",
  light: "/images/logo/logo-light.png",
  alt: "/images/logo/logo-alt.png",
  altWhite: "/images/logo/logo-alt-white.png",
  emblem: "/images/logo/logo-emblem.png",
  mainSlate: "/images/logo/logo-primary-blue-slate.png",
  /** Wordmark for photo heroes */
  whiteName: "/images/logo/whiteNamelogo.png",
} as const;

/** Home — Features + Awards press logos */
export const FEATURED_PRESS = [
  {
    name: "Vogue",
    src: "/images/featured/vogue.png",
  },
  {
    name: "Architectural Digest",
    src: "/images/featured/architectural-digest.png",
  },
  {
    name: "Vogue Wedding Book",
    src: "/images/featured/vogue-wedding-book.png",
  },
] as const;

/** Home About band — editorial collage */
export const ABOUT_HOME_IMAGES = {
  couple1: "/images/abouthome/couple1.webp",
  outsideDecor: "/images/abouthome/outsidedecor.webp",
  decorCloseup: "/images/abouthome/decorcloseup.webp",
  couple2: "/images/abouthome/couple2.webp",
  landscape: "/images/abouthome/bgOverlayLandscape.webp",
} as const;

/** Pattern wallpaper for AboutHomeTHS frame */
export const PATTERN_BG = {
  /** Navy vine + pinstripe — primary editorial frame */
  navyVine: "/images/patternsbg/IMG_0515.PNG",
  /** Cream botanical — portfolio marquee band */
  creamBotanical: "/images/patternsbg/IMG_0518.PNG",
  /** Soft stripe — founder panel */
  stripeAlternate: "/images/patternsbg/patternalternate.png",
} as const;

export const FOUNDER = {
  name: "Roshni Kurup",
  image: "/images/founderImages/roshiniImage1.jpeg",
} as const;

/**
 * Home portfolio marquee — verified files in /public/images/portfolioHome
 * Mixed portrait + landscape for editorial rhythm
 */
export const PORTFOLIO_HOME_ROW_A = [
  {
    src: "/images/portfolioHome/013_2048x3078.webp",
    shape: "portrait",
  },
  {
    src: "/images/portfolioHome/001_2048x1484.webp",
    shape: "wide",
  },
  {
    src: "/images/portfolioHome/008_2500x3688.webp",
    shape: "portrait",
  },
  {
    src: "/images/portfolioHome/017_2500x1668.webp",
    shape: "wide",
  },
  {
    src: "/images/portfolioHome/009_2500x3593.webp",
    shape: "portrait",
  },
  {
    src: "/images/portfolioHome/002_1826x1152.webp",
    shape: "wide",
  },
  {
    src: "/images/portfolioHome/011_2048x3078.webp",
    shape: "portrait",
  },
  {
    src: "/images/portfolioHome/006_2500x1207.webp",
    shape: "wide",
  },
] as const;

export const PORTFOLIO_HOME_ROW_B = [
  {
    src: "/images/portfolioHome/014_2048x3078.webp",
    shape: "portrait",
  },
  {
    src: "/images/portfolioHome/022_2500x1667.webp",
    shape: "wide",
  },
  {
    src: "/images/portfolioHome/005_2500x3745.webp",
    shape: "portrait",
  },
  {
    src: "/images/portfolioHome/001_2048x1362.webp",
    shape: "wide",
  },
  {
    src: "/images/portfolioHome/015_2048x3071.webp",
    shape: "portrait",
  },
  {
    src: "/images/portfolioHome/020_2500x3750.webp",
    shape: "portrait",
  },
  {
    src: "/images/portfolioHome/036_2500x3670.webp",
    shape: "portrait",
  },
  {
    src: "/images/portfolioHome/007_1668x2500.webp",
    shape: "portrait",
  },
] as const;

/**
 * Home hero photography — files present in /public/images/home
 * lead-01 / lead-02 are the primary openers (new asset paths bust image cache)
 */
export const HERO_IMAGES = {
  desktop: "/images/home/hero-lead-01.webp",
  mobile: "/images/home/hero-lead-01.webp",
} as const;

export const HOME_STOCK_IMAGES = [
  "/images/home/hero-lead-01.webp",
  "/images/home/hero-lead-02.webp",
  "/images/home/hero-03.webp",
  "/images/home/hero-04.webp",
  "/images/home/hero-10.webp",
  "/images/home/hero-11.webp",
  "/images/home/hero-13.webp",
  "/images/home/hero-14.webp",
  "/images/home/hero-16.webp",
  "/images/home/hero-18.webp",
  "/images/home/hero-19.webp",
  "/images/home/hero-20.webp",
  "/images/home/hero-21.webp",
  "/images/home/hero-23.jpg",
] as const;

/** What We Do / section photography */
export const SECTION_STOCK_IMAGES = [
  "/images/section-images/001_2160x3236.webp",
  "/images/section-images/002_2500x3125.webp",
  "/images/section-images/002_2500x3585.webp",
  "/images/section-images/003_2500x3125.jpg",
  "/images/section-images/003_2500x3766.webp",
  "/images/section-images/004_1638x2048.webp",
  "/images/section-images/008_2500x3688.webp",
  "/images/section-images/008_2500x3750.webp",
  "/images/section-images/009_2500x3593.webp",
  "/images/section-images/009_2500x3750.webp",
  "/images/section-images/010_2500x3610.webp",
  "/images/section-images/010_2500x3750.webp",
  "/images/section-images/013_2048x3078.webp",
  "/images/section-images/013_2500x3333.webp",
  "/images/section-images/014_2500x3333.webp",
  "/images/section-images/017_2500x3125.webp",
  "/images/section-images/017_2500x3333.webp",
  "/images/section-images/017_2500x3687.webp",
  "/images/section-images/017_2500x3750.webp",
  "/images/section-images/018_2500x3125.webp",
  "/images/section-images/018_2500x3841.webp",
  "/images/section-images/020_2477x3647.webp",
  "/images/section-images/026_2500x3693.webp",
  "/images/section-images/027_2048x3078.webp",
  "/images/section-images/036_2500x3670.webp",
  "/images/section-images/039_2500x3559.webp",
  "/images/section-images/041_2500x3945.webp",
  "/images/section-images/047_2048x3078.webp",
] as const;
