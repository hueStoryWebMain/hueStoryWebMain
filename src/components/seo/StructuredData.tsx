import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/constants";

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_TAGLINE,
    image: `${SITE_URL}/images/og-share.jpg`,
    email: "hello@thehuestory.com",
    address: {
      "@type": "PostalAddress",
      addressRegion: "CA",
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "Place", name: "San Francisco Bay Area" },
      { "@type": "State", name: "California" },
      { "@type": "Place", name: "Worldwide" },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
