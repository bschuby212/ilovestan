"use client";

import { Clock3 } from "lucide-react";
import { useEffect, useRef } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { timeline } from "@/data/content";
import { getGsap } from "@/lib/gsap";

/**
 * Compact vertical timeline — year spine + title/body only. No per-item photos.
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
          y: 18,
          opacity: 0,
          duration: 0.55,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
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
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 md:py-20">
        <SectionHeading
          eyebrow="Career timeline"
          title="Follow the years"
          icon={Clock3}
        />

        <ol className="relative mt-12 border-l border-concrete-gray md:mt-14">
          {timeline.map((item) => (
            <li
              key={`${item.year}-${item.title}`}
              className="tl-row relative flex flex-col gap-1 py-5 pl-7 md:flex-row md:items-baseline md:gap-8 md:py-6 md:pl-10"
            >
              <span
                className="absolute top-7 -left-[4px] h-2 w-2 rounded-full bg-obsidian md:top-8"
                aria-hidden
              />
              <p className="w-[4.5rem] shrink-0 text-[14px] font-medium tabular-nums text-steel md:w-16">
                {item.year}
              </p>
              <div className="min-w-0 flex-1 md:flex md:items-baseline md:justify-between md:gap-10">
                <h3 className="text-[16px] font-medium md:text-[18px]">{item.title}</h3>
                <p className="mt-1 max-w-xl text-[15px] leading-[1.55] text-steel md:mt-0 md:text-right">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
