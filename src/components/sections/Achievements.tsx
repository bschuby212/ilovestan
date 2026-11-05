"use client";

import { useEffect, useRef } from "react";
import { achievements } from "@/data/content";
import { getGsap } from "@/lib/gsap";

export function Achievements() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const featured = root.querySelectorAll(".ach-featured");
      const archive = root.querySelectorAll(".ach-archive-item");

      gsap.from(featured, {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
        },
      });

      gsap.from(archive, {
        x: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root.querySelector(".ach-archive"),
          start: "top 80%",
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const featured = achievements.filter((a) => a.featured);
  const archive = achievements.filter((a) => !a.featured);

  return (
    <section
      id="achievements"
      ref={rootRef}
      className="bg-paper-white text-obsidian"
      aria-label="Career titles and achievements"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[12px] font-medium tracking-[0.22em] text-steel uppercase">
              Exhibition
            </p>
            <h2 className="mt-3 max-w-[14ch] text-[24px] leading-[1.2] font-medium md:text-[clamp(28px,3.5vw,40px)]">
              Titles hung like art
            </h2>
          </div>
          <p className="max-w-sm text-[16px] leading-[1.75] text-steel">
            A curated wall of defining victories — not a spreadsheet of results.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-0 border-t border-concrete-gray md:grid-cols-2">
          {featured.map((item, i) => (
            <article
              key={`${item.title}-${item.year}`}
              className={`ach-featured group relative min-h-[280px] overflow-hidden border-b border-concrete-gray p-8 md:min-h-[340px] md:p-10 ${
                i % 2 === 0 ? "md:border-r" : ""
              }`}
            >
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    i % 2 === 0
                      ? "linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)"
                      : "linear-gradient(225deg, #f5f5f5 0%, #ffffff 100%)",
                }}
              />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <span className="pill pill--dark pill--tag">{item.kind}</span>
                  <span className="display-type text-[clamp(48px,6vw,72px)] text-obsidian/10 transition-colors group-hover:text-obsidian/20">
                    {item.year}
                  </span>
                </div>
                <div>
                  <h3 className="text-[20px] leading-[1.5] font-medium md:text-[24px]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[16px] text-steel">{item.detail}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="ach-archive mt-20">
          <h3 className="text-[16px] font-medium tracking-[0.16em] text-steel uppercase">
            Archive
          </h3>
          <ul className="mt-6 divide-y divide-concrete-gray border-y border-concrete-gray">
            {archive.map((item) => (
              <li
                key={`${item.title}-${item.year}`}
                className="ach-archive-item flex flex-col gap-2 py-5 md:flex-row md:items-baseline md:justify-between md:gap-8"
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
      </div>
    </section>
  );
}
