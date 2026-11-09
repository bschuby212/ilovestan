"use client";

import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { MajorTitles } from "@/components/sections/MajorTitles";
import { BackhandLab } from "@/components/sections/BackhandLab";
import { FailBetter } from "@/components/sections/FailBetter";
import { TourTitles } from "@/components/sections/TourTitles";
import { Testimonials } from "@/components/sections/Testimonials";
import { BeyondCourt } from "@/components/sections/BeyondCourt";
import { Footer } from "@/components/sections/Footer";

/**
 * Hero → Slam metrics → Backhand stats → Fail Better → career → voices → beyond
 */
export function Experience() {
  return (
    <SmoothScroll>
      <Nav />
      <main>
        <Hero />
        <MajorTitles />
        <BackhandLab />
        <FailBetter />
        <TourTitles />
        <Testimonials />
        <BeyondCourt />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
