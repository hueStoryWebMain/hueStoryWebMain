import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PortfolioEventView from "@/components/pages/PortfolioEventPage/PortfolioEventView";
import { PORTFOLIO_EVENTS } from "@/lib/constants";

export function generateStaticParams() {
  return PORTFOLIO_EVENTS.map((event) => ({ slug: event.slug }));
}

export const dynamicParams = false;

function findEvent(slug: string) {
  const index = PORTFOLIO_EVENTS.findIndex((event) => event.slug === slug);
  if (index === -1) return null;
  return {
    event: PORTFOLIO_EVENTS[index],
    next: PORTFOLIO_EVENTS[(index + 1) % PORTFOLIO_EVENTS.length],
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = findEvent(slug);
  if (!found) return {};
  return {
    title: `${found.event.title} — Portfolio`,
    description: `${found.event.title} — The Hue Story portfolio.`,
  };
}

export default async function PortfolioEventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = findEvent(slug);
  if (!found) notFound();

  return <PortfolioEventView event={found.event} next={found.next} />;
}
