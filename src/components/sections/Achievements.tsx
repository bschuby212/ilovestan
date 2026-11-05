"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { achievements } from "@/data/content";
import { stanMedia } from "@/data/media";
import { getGsap } from "@/lib/gsap";

const featuredVisuals = [
  { ...achievements[0], image: stanMedia.serve, href: "#grand-slams" },
  { ...achievements[1], image: stanMedia.queens, href: "#grand-slams" },
  { ...achievements[2], image: stanMedia.usOpen, href: "#grand-slams" },
  { ...achievements[3], image: stanMedia.wimbledon, href: "#timeline" },
] as const;

const productStrip = [
  { label: "AO 2014", image: stanMedia.serve },
  { label: "RG 2015", image: stanMedia.queens },
  { label: "USO 2016", image: stanMedia.usOpen },
  { label: "Olympic gold", image: stanMedia.wimbledon },
  { label: "Davis Cup", image: stanMedia.portrait },
  { label: "No. 3", image: stanMedia.heroDepth },
] as const;

export function Achievements() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll(".cat-tile"), {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 70%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const archive = achievements.filter((a) => !a.featured);

  return (
    <section
      id="achievements"
      ref={rootRef}
      className="bg-paper-white text-obsidian"
      aria-label="Career titles and achievements"
    >
      <div className="mx-auto max-w-[1440px] px-6 pt-24 pb-10 md:px-10 md:pt-32">
        <p className="text-[12px] font-medium tracking-[0.22em] text-steel uppercase">
          Exhibition
        </p>
        <h2 className="mt-3 max-w-[14ch] text-[24px] leading-[1.2] font-medium md:text-[clamp(28px,3.5vw,40px)]">
          Titles hung like art
        </h2>
      </div>

      {/* 2×2 category hero cards — Nike MD */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {featuredVisuals.map((item) => (
          <article
            key={`${item.title}-${item.year}`}
            className="cat-tile relative min-h-[50vh] overflow-hidden"
          >
            <Image
              src={item.image.src}
              alt={item.image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(17,17,17,0.05) 0%, rgba(17,17,17,0.55) 100%)",
              }}
            />
            <div className="absolute right-0 bottom-0 left-0 p-8 text-paper-white md:p-10">
              <p className="text-[16px]">{item.kind}</p>
              <h3 className="mt-1 text-[20px] leading-[1.5] font-medium md:text-[24px]">
                {item.title}
                <span className="text-paper-white/70"> · {item.year}</span>
              </h3>
              <p className="mt-2 max-w-sm text-[16px] text-paper-white/80">{item.detail}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <a href={item.href} className="pill pill--light">
                  View moment
                </a>
                <a href="#timeline" className="pill pill--light">
                  On the timeline
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Horizontal product-card strip — Nike MD */}
      <div className="border-t border-concrete-gray bg-paper-white">
        <div className="mx-auto max-w-[1440px] px-6 py-12 md:px-10">
          <p className="text-[12px] font-medium tracking-[0.18em] text-steel uppercase">
            Collection
          </p>
        </div>
        <div className="flex gap-0 overflow-x-auto pb-12">
          {productStrip.map((card) => (
            <article
              key={card.label}
              className="relative w-[33.333vw] min-w-[240px] shrink-0 bg-paper-white"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-soft-mist">
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  fill
                  sizes="33vw"
                  className="object-cover"
                />
                <span className="pill pill--dark pill--tag absolute bottom-4 left-4">
                  {card.label}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 pb-24 md:px-10 md:pb-32">
        <h3 className="text-[16px] font-medium tracking-[0.16em] text-steel uppercase">
          Archive
        </h3>
        <ul className="mt-6 divide-y divide-concrete-gray border-y border-concrete-gray">
          {archive.map((item) => (
            <li
              key={`${item.title}-${item.year}`}
              className="flex flex-col gap-2 py-5 md:flex-row md:items-baseline md:justify-between md:gap-8"
            >
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="text-[16px] font-medium">{item.title}</span>
                <span className="text-[14px] text-steel">{item.kind}</span>
              </div>
              <div className="flex items-baseline gap-6 text-[16px]">
                <span className="text-steel">{item.detail}</span>
                <span className="font-medium tabular-nums">{item.year}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
