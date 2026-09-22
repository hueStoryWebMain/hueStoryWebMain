import AboutHeroTHS from "@/components/sections/AboutHeroTHS/AboutHeroTHS";
import AboutHeroLegacy from "@/components/sections/AboutHeroLegacy/AboutHeroLegacy";
import AboutFounderTHS from "@/components/sections/AboutFounderTHS/AboutFounderTHS";
import AboutProcessTHS from "@/components/sections/AboutProcessTHS/AboutProcessTHS";
import FeaturesAwards from "@/components/sections/FeaturesAwards/FeaturesAwards";

/**
 * About page — pattern hero · atelier · founder · process · awards
 */
export default function AboutPageView() {
  return (
    <main>
      <AboutHeroTHS />
      <AboutHeroLegacy />
      <AboutFounderTHS />
      <AboutProcessTHS />
      <FeaturesAwards />
    </main>
  );
}
