# Sanity CMS (later)

When ready, mirror the Jackson portfolio setup:

1. `npx sanity@latest init` in a `studio/` folder at repo root
2. Add `@sanity/client`, `next-sanity`, `@sanity/image-url`
3. Add `src/lib/sanity.client.ts`, `queries.ts`, `sanity.image.ts`
4. Embed studio at `src/app/studio/[[...index]]/page.tsx`
5. Copy env vars from `.env.example`

Schema ideas for decor: `project`, `service`, `testimonial`.
