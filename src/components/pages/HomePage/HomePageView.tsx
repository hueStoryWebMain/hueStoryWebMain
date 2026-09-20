import HomeHero from "@/components/sections/HomeHero/HomeHero";
import MistBar from "@/components/sections/MistBar/MistBar";
import AboutHomeTHS from "@/components/sections/AboutHomeTHS/AboutHomeTHS";
import FeaturesAwards from "@/components/sections/FeaturesAwards/FeaturesAwards";
import WhatWeDoTHS from "@/components/sections/WhatWeDoTHS/WhatWeDoTHS";
import HomePortfolioTHS from "@/components/sections/HomePortfolioTHS/HomePortfolioTHS";
import MeetTHS from "@/components/sections/MeetTHS/MeetTHS";
import AboutFounderHomeTHS from "@/components/sections/AboutFounderHomeTHS/AboutFounderHomeTHS";
import IntentionalHomeTHS from "@/components/sections/IntentionalHomeTHS/IntentionalHomeTHS";
import PhilosophyHomeTHS from "@/components/sections/PhilosophyHomeTHS/PhilosophyHomeTHS";
import TestimonialHomeTHS from "@/components/sections/TestimonialHomeTHS/TestimonialHomeTHS";
import StructuredData from "@/components/seo/StructuredData";
import { cn } from "@/lib/utils";

export type FontPairing = 1 | 2 | 3;

type HomePageViewProps = {
  pairing: FontPairing;
};

const PAIRING_CLASS: Record<FontPairing, string> = {
  1: "pairing-1",
  2: "pairing-2",
  3: "pairing-3",
};

/**
 * Shared home composition — pairing scopes for client font tests.
 */
export default function HomePageView({ pairing }: HomePageViewProps) {
  return (
    <div className={cn(PAIRING_CLASS[pairing])}>
      <StructuredData />
      <HomeHero />
      <div className="relative z-10 bg-base" style={{ marginTop: "-100svh" }}>
        <MistBar />
        <AboutHomeTHS />
        <FeaturesAwards />
        <WhatWeDoTHS />
        <HomePortfolioTHS />
        <MeetTHS />
        <AboutFounderHomeTHS />
        <IntentionalHomeTHS />
        <PhilosophyHomeTHS />
        <TestimonialHomeTHS />
      </div>
    </div>
  );
}
