"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { timeline } from "@/data/content";
import { stanMedia } from "@/data/media";
import { getGsap } from "@/lib/gsap";

const HIGHLIGHTS = "/video/stan-highlights.mp4";
const HIGHLIGHTS_POSTER = "/video/stan-highlights-poster.jpg";

/**
 * Career timeline — sticky intro + larger image/text step cards
 * (tenpoints-style rows) with scroll reveals.
 */
export function Timeline() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap.from(root.querySelectorAll(".tl-intro"), {
          y: 28,
          opacity: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 75%" },
        });
      }

      root.querySelectorAll<HTMLElement>(".tl-step").forEach((step) => {
        if (reduce) return;
        gsap.from(step, {
          y: 48,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="timeline"
      ref={rootRef}
      className="bg-[#111] text-white"
      aria-label="Career timeline"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-14 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 className="tl-intro display-type max-w-[12ch] text-[clamp(32px,4vw,48px)] leading-[1.05] text-white">
              From first tour to the last point.
            </h2>
            <p className="tl-intro mt-5 max-w-[34ch] text-[15px] leading-[1.7] text-white/55">
              ATP start, first title, the Slams, his Masters 1000, home farewell,
              retirement — each beat as a card.
            </p>
            <a
              href="https://www.atptour.com/en/players/stan-wawrinka/w367/overview"
              target="_blank"
              rel="noopener noreferrer"
              className="tl-intro mt-8 inline-flex items-center gap-2 rounded-full bg-[#c8f542] px-5 py-2.5 text-[14px] font-medium text-[#111] transition-opacity hover:opacity-90"
            >
              Full ATP career
              <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden />
            </a>
          </div>
        </div>

        <ol className="flex flex-col gap-5 lg:col-span-8 md:gap-6">
          {timeline.map((item, i) => {
            const photo = stanMedia[item.image];
            const n = String(i + 1).padStart(2, "0");
            const useVideo = item.media === "video";

            return (
              <li
                key={`${item.year}-${item.title}`}
                className="tl-step grid grid-cols-1 overflow-hidden rounded-[20px] bg-[#1a1a1a] md:grid-cols-[minmax(200px,0.42fr)_1fr] md:rounded-[24px]"
              >
                <div className="relative min-h-[200px] overflow-hidden md:min-h-[240px]">
                  {useVideo ? (
                    <video
                      className="absolute inset-0 h-full w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster={HIGHLIGHTS_POSTER}
                      controls={false}
                      disablePictureInPicture
                    >
                      <source src={HIGHLIGHTS} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="flex flex-col justify-center gap-4 p-6 md:p-8 lg:p-9">
                  <p className="inline-flex w-fit items-center gap-2 rounded-full border border-[#c8f542]/45 px-3 py-1 text-[12px] font-medium tracking-[0.12em] text-[#c8f542] uppercase">
                    <span className="tabular-nums">{n}</span>
                    <span className="text-white/35">·</span>
                    <span>{item.year}</span>
                  </p>

                  <h3 className="max-w-[18ch] text-[22px] leading-[1.2] font-medium text-white md:text-[26px]">
                    {item.title}
                  </h3>

                  <p className="max-w-[42ch] text-[14px] leading-[1.65] text-white/55 md:text-[15px]">
                    {item.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
