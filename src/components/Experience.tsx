"use client";

import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { TitlesOverview } from "@/components/sections/TitlesOverview";
import { FailBetter } from "@/components/sections/FailBetter";
import { BackhandLab } from "@/components/sections/BackhandLab";
import { Testimonials } from "@/components/sections/Testimonials";
import { TourTitles } from "@/components/sections/TourTitles";
import { BeyondCourt } from "@/components/sections/BeyondCourt";
import { Timeline } from "@/components/sections/Timeline";
import { Footer } from "@/components/sections/Footer";

export function Experience() {
  return (
    <SmoothScroll>
      <Nav />
      <main>
        <Hero />
        <TitlesOverview />
        <FailBetter />
        <BackhandLab />
        <Testimonials />
        <TourTitles />
        <BeyondCourt />
        <Timeline />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
