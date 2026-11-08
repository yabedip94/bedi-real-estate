import { HeroSection } from "@/components/home/HeroSection";
import { BrandManifestoSection } from "@/components/home/BrandManifestoSection";
import { CuratedPropertiesSection } from "@/components/home/CuratedPropertiesSection";
import { FeaturedLocationsSection } from "@/components/home/FeaturedLocationsSection";
import { ArchitectureLivingSection } from "@/components/home/ArchitectureLivingSection";
import { TheNaraApproachSection } from "@/components/home/TheNaraApproachSection";
import { ClosingCtaSection } from "@/components/home/ClosingCtaSection";

export default function HomePage() {
  return (
    <main className="w-full">
      {/* 02. Hero — Find Your Place (Visual Monograph & Quick Search Dock) */}
      <HeroSection />

      {/* 03. Brand Manifesto — More Than a Property (Curatorial Note & 4 Statements) */}
      <BrandManifestoSection />

      {/* 04. Curated Properties — Selected for Living (Featured Grid) */}
      <CuratedPropertiesSection />

      {/* 05. Featured Locations — Places with Character (4-Card Asymmetric Mosaic) */}
      <FeaturedLocationsSection />

      {/* 06. Architecture & Living — A Different Perspective (Essay & Triptych) */}
      <ArchitectureLivingSection />

      {/* 07. The NARA Approach — Curated with Intention (4 Editorial Principles) */}
      <TheNaraApproachSection />

      {/* 08. Closing CTA — Begin Your Next Chapter (Private Inquire & Demo WhatsApp) */}
      <ClosingCtaSection />
    </main>
  );
}
