"use client";

import { Clock3 } from "lucide-react";
import { useEffect, useRef } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { timeline } from "@/data/content";
import { getGsap } from "@/lib/gsap";

/**
 * Compact career timeline — year + title + one line. No photos.
 */
export function Timeline() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll(".tl-row"), {
        y: 16,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: { trigger: root.querySelector(".tl-list"), start: "top 80%" },
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
      <div className="mx-auto max-w-[900px] px-6 py-16 md:px-10 md:py-20">
        <SectionHeading
          eyebrow="Career timeline"
          title="The years that mattered"
          icon={Clock3}
        />

        <ol className="tl-list mt-12 space-y-0 md:mt-14">
          {timeline.map((item) => (
            <li
              key={`${item.year}-${item.title}`}
              className="tl-row grid grid-cols-[4.75rem_minmax(0,1fr)] items-baseline gap-x-5 gap-y-1 border-t border-concrete-gray py-5 md:grid-cols-[5.5rem_minmax(12rem,0.9fr)_minmax(0,1.1fr)] md:gap-x-8 md:py-6"
            >
              <p className="text-[14px] font-medium tabular-nums text-steel">{item.year}</p>
              <h3 className="text-[16px] font-medium md:text-[17px]">{item.title}</h3>
              <p className="col-start-2 text-[14px] leading-[1.55] text-steel md:col-start-3 md:text-[15px]">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
