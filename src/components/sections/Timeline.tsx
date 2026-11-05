"use client";

import Image from "next/image";
import { Clock3 } from "lucide-react";
import { useEffect, useRef } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { timeline } from "@/data/content";
import { stanMedia } from "@/data/media";
import { getGsap } from "@/lib/gsap";

/**
 * Real vertical timeline — year markers on a spine, photo + copy per beat.
 * Scroll moves down the years (not a pinned story scrub).
 */
export function Timeline() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = root.querySelectorAll(".tl-row");
    const ctx = gsap.context(() => {
      items.forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="timeline"
      ref={rootRef}
      className="bg-paper-white text-obsidian"
      aria-label="Career timeline"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28">
        <SectionHeading
          eyebrow="Career timeline"
          title="Follow the years"
          icon={Clock3}
        />

        <ol className="relative mt-16 border-l border-concrete-gray md:mt-20">
          {timeline.map((item) => {
            const photo = stanMedia[item.image];
            return (
              <li
                key={`${item.year}-${item.title}`}
                className="tl-row relative grid grid-cols-1 gap-6 py-10 pl-8 md:grid-cols-12 md:gap-10 md:py-12 md:pl-12"
              >
                <span
                  className="absolute top-12 -left-[5px] h-2.5 w-2.5 rounded-full bg-obsidian md:top-14"
                  aria-hidden
                />

                <div className="md:col-span-2">
                  <p className="display-type text-[clamp(32px,4vw,48px)] leading-none text-obsidian/25">
                    {item.year}
                  </p>
                </div>

                <div className="media-mask relative aspect-[16/10] w-full overflow-hidden bg-soft-mist md:col-span-4">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>

                <div className="md:col-span-6 md:pt-1">
                  <h3 className="text-[20px] leading-[1.35] font-medium md:text-[24px]">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-[16px] leading-[1.7] text-steel">
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
