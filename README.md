# The Hue Story Web (`huestoryweb`)

Luxury editorial wedding & event planning site — Motif Studios design direction locked (Sep 2026).

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** + design tokens in `src/styles/globals.css`
- **Fonts:** Silk Serif + Fresh Script (local) · Raleway (Google via `next/font`)
- Motion: `framer-motion` · Gallery: `react-photo-view`, `react-masonry-css`
- Analytics: `@vercel/analytics`, `@vercel/speed-insights`
- **Sanity CMS**: planned — see `src/lib/sanity/README.md`

## Design tokens (Round 04 — Deep Editorial)

**Active base: Slate Blue** (first preference). Warm white `#FCFBF6` is not the site canvas.

| Token | Hex | Role |
|-------|-----|------|
| Slate Blue | `#5C6E73` | Default page ground (~75–80%) |
| Warm Cream | `#F1EDE7` | Type + filled/outlined buttons |
| Cool Mist | `#E2E9F5` | Light section bands (1–2×) |
| Soft Blush | `#D8A2A6` | Active nav, links, script only |
| Bare Blush | `#E0CDC9` | Muted captions |
| Soft Ink | `#2C2723` | Type on light section bands |

Alt bases (swap when locked): Forest `#2D3A31` · Taupe `#A2968E` · Burgundy `#4A1624`

**Type:** Silk Serif (titles) · Raleway Light/Regular/Medium (body/UI) · Fresh Script (rare accents)

## Routes

| Page | Path |
|------|------|
| Home | `/` |
| Portfolio | `/portfolio` |
| About | `/about` |
| Services | `/services` |
| The Experience | `/the-experience` |
| Enquire | `/get-in-touch` |

## Structure

```
src/
├── app/                      # Thin route pages + metadata
├── components/
│   ├── layout/               # Navbar, MobileMenu
│   ├── sections/             # Hero, Footer, reusable blocks
│   ├── pages/                # Page-specific modules
│   ├── common/               # Logo, PageHeader, Container
│   ├── ui/                   # Button + future primitives
│   └── seo/
├── lib/
│   ├── constants.ts          # Routes, nav, logos
│   ├── fonts.ts              # next/font setup
│   └── theme.ts              # Colour / type reference
└── styles/globals.css        # @theme tokens
public/
├── fonts/                    # Silk Serif, Fresh Script
└── images/logo/              # logo-primary, logo-light, logo-alt
```

## Commands

```bash
npm run dev
npm run build
npm run lint
npm run compress-images
```

## Next steps

1. Add hero photography to `public/images/home/` (`hero.jpg`, `hero-mobile.jpg`)
2. Wire full-bleed image into `HeroSection`
3. Build remaining home sections + portfolio gallery
4. Wire Sanity when ready
