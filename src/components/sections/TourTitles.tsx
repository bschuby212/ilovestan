"use client";

import Image from "next/image";
import { ArrowDownRight, Trophy } from "lucide-react";
import { useEffect, useRef } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { stanMedia } from "@/data/media";
import { atpTitlesUrl, subThousandTitles } from "@/data/titles";
import { getGsap } from "@/lib/gsap";

/**
 * Full career / trophy depth — reached from the Slams CTA.
 * Portrait cards + ATP titles link.
 */
export function TourTitles() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll(".tt-card"), {
        y: 36,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 72%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="achievements"
      ref={rootRef}
      className="bg-paper-white text-obsidian"
      aria-label="Career trophies"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="max-w-[34ch]">
            <SectionHeading
              eyebrow="Career"
              title="More of the record"
              icon={Trophy}
            />
          </div>
          <p className="max-w-[36ch] text-[14px] leading-[1.7] text-steel md:pb-1 md:text-[15px]">
            Olympics, Masters, and tour crowns — then the complete list on ATP.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-4">
          {subThousandTitles.map((title) => {
            const photo = stanMedia[title.image];
            return (
              <article
                key={title.id}
                className="tt-card group relative aspect-[3/4] overflow-hidden bg-obsidian"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 45%, rgba(17,17,17,0.85) 100%)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <p className="text-[18px] font-medium text-paper-white md:text-[20px]">
                    {title.label}
                  </p>
                  <p className="mt-1 text-[13px] text-paper-white/70">
                    {title.year} · {title.meta}
                  </p>
                </div>
              </article>
            );
          })}

          <a
            href={atpTitlesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="tt-card group relative flex aspect-[3/4] flex-col justify-between bg-[#111] p-5 md:p-6"
            style={{ color: "#ffffff" }}
          >
            <p
              className="display-type max-w-[11ch] text-[clamp(26px,2.4vw,34px)] leading-[1.05]"
              style={{ color: "#ffffff" }}
            >
              See all titles on ATP Tour
            </p>
            <ArrowDownRight
              className="ml-auto size-14 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1 md:size-16"
              style={{ color: "#c8f542" }}
              strokeWidth={1.25}
              aria-hidden
            />
            <span className="sr-only">Opens Stan Wawrinka ATP titles page</span>
          </a>
        </div>
      </div>
    </section>
  );
}
