"use client";

import Image from "next/image";
import { ArrowDownRight, Medal } from "lucide-react";
import { useEffect, useRef } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { stanMedia, type StanMediaKey } from "@/data/media";
import { getGsap } from "@/lib/gsap";

/** Three Slams only — one card each + CTA into full career titles. */
const slams: Array<{
  id: string;
  label: string;
  year: string;
  meta: string;
  image: StanMediaKey;
}> = [
  {
    id: "ao-2014",
    label: "Australian Open",
    year: "2014",
    meta: "d. Nadal",
    image: "serve",
  },
  {
    id: "rg-2015",
    label: "Roland-Garros",
    year: "2015",
    meta: "d. Djokovic",
    image: "queens",
  },
  {
    id: "uso-2016",
    label: "US Open",
    year: "2016",
    meta: "d. Djokovic",
    image: "usOpen",
  },
];

/**
 * Trophy strip — 3 Slam cards + black CTA to the full tour/career titles.
 * (Testimonial-row format; swap in real trophy-lift stills when available.)
 */
export function MajorTitles() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll(".slam-card"), {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 72%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="grand-slams"
      ref={rootRef}
      className="bg-paper-white text-obsidian"
      aria-label="Grand Slam trophies"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="max-w-[36ch]">
            <SectionHeading
              eyebrow="The majors"
              title="Three times he beat the best"
              icon={Medal}
            />
          </div>
          <p className="max-w-[34ch] text-[14px] leading-[1.7] text-steel md:pb-1 md:text-[15px]">
            Melbourne, Paris, New York — each final against a world No. 1. Then
            the rest of the cabinet.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-4">
          {slams.map((slam) => {
            const photo = stanMedia[slam.image];
            return (
              <article
                key={slam.id}
                className="slam-card group relative aspect-[3/4] overflow-hidden bg-obsidian"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 45%, rgba(17,17,17,0.88) 100%)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <p className="text-[18px] font-medium text-paper-white md:text-[20px]">
                    {slam.label}
                  </p>
                  <p className="mt-1 text-[13px] text-paper-white/70">
                    {slam.year} · {slam.meta}
                  </p>
                </div>
              </article>
            );
          })}

          <a
            href="#achievements"
            className="slam-card group relative flex aspect-[3/4] flex-col justify-between bg-[#111] p-5 md:p-6"
            style={{ color: "#ffffff" }}
          >
            <p
              className="display-type max-w-[11ch] text-[clamp(26px,2.4vw,34px)] leading-[1.05]"
              style={{ color: "#ffffff" }}
            >
              See the full cabinet
            </p>
            <ArrowDownRight
              className="ml-auto size-14 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1 md:size-16"
              style={{ color: "#c8f542" }}
              strokeWidth={1.25}
              aria-hidden
            />
          </a>
        </div>
      </div>
    </section>
  );
}
