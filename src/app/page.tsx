import type { Metadata } from "next";
import { HeroSection } from "@/sections/home/_components/hero-section";
import { TechMarquee } from "@/sections/home/_components/tech-marquee";
import { HomeTeasers } from "@/sections/home/_components/home-teasers";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TechMarquee />
      <HomeTeasers />
    </>
  );
}
