import { HeroSection } from "@/components/sections/hero";
import { WhoWeAreSection } from "@/components/sections/who-we-are";
import { TeamSection } from "@/components/sections/team";
import { FeaturesSectionWithBentoGrid } from "@/components/blocks/feature-section-with-bento-grid";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center pb-16 sm:pb-0">
      <HeroSection />
      <FeaturesSectionWithBentoGrid />
      <WhoWeAreSection />
      <TeamSection />
    </main>
  );
}
