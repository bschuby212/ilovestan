"use client";

import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { TitlesOverview } from "@/components/sections/TitlesOverview";
import { GrandSlam } from "@/components/sections/GrandSlam";
import { FailBetter } from "@/components/sections/FailBetter";
import { BackhandLab } from "@/components/sections/BackhandLab";
import { Testimonials } from "@/components/sections/Testimonials";
import { Achievements } from "@/components/sections/Achievements";
import { BeyondCourt } from "@/components/sections/BeyondCourt";
import { Timeline } from "@/components/sections/Timeline";
import { Tribute } from "@/components/sections/Tribute";
import { Footer } from "@/components/sections/Footer";

export function Experience() {
  return (
    <SmoothScroll>
      <Nav />
      <main>
        <Hero />
        <TitlesOverview />
        <GrandSlam />
        <FailBetter />
        <BackhandLab />
        <Testimonials />
        <Achievements />
        <BeyondCourt />
        <Timeline />
        <Tribute />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
