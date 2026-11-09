"use client";

import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { FailBetter } from "@/components/sections/FailBetter";
import { MajorTitles } from "@/components/sections/MajorTitles";
import { BackhandLab } from "@/components/sections/BackhandLab";
import { TourTitles } from "@/components/sections/TourTitles";
import { Testimonials } from "@/components/sections/Testimonials";
import { BeyondCourt } from "@/components/sections/BeyondCourt";
import { Footer } from "@/components/sections/Footer";

/**
 * Story order (no pinned photo carousel spam):
 * Hero → Fail Better (origin) → 3 Slams + CTA → Backhand →
 * Career trophies → Voices → Beyond
 */
export function Experience() {
  return (
    <SmoothScroll>
      <Nav />
      <main>
        <Hero />
        <FailBetter />
        <MajorTitles />
        <BackhandLab />
        <TourTitles />
        <Testimonials />
        <BeyondCourt />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
