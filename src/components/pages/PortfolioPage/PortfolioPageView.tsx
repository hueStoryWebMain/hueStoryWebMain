import PortfolioHeroTHS from "@/components/sections/PortfolioHeroTHS/PortfolioHeroTHS";
import PortfolioIntroTHS from "@/components/sections/PortfolioIntroTHS/PortfolioIntroTHS";
import PortfolioEventsTHS from "@/components/sections/PortfolioEventsTHS/PortfolioEventsTHS";

/**
 * Portfolio page — pattern hero · intro collage · event covers
 */
export default function PortfolioPageView() {
  return (
    <main>
      <PortfolioHeroTHS />
      <PortfolioIntroTHS />
      <PortfolioEventsTHS />
    </main>
  );
}
