"use client";

import { useEffect, useRef, useState } from "react";
import { titlesOverview } from "@/data/titlesOverview";
import { getGsap } from "@/lib/gsap";

const HOLD_MS = 2400;
const FADE_MS = 420;

/**
 * Full-viewport chapters: Grand Slams listed vertically with years,
 * then advance to Masters / Olympics / Davis / Peak — fluid fade, no counters.
 */
export function TitlesOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [active, setActive] = useState(false);

  const chapter = titlesOverview.chapters[index] ?? titlesOverview.chapters[0];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const { ScrollTrigger } = getGsap();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 55%",
      end: "bottom 45%",
      onEnter: () => setActive(true),
      onEnterBack: () => setActive(true),
      onLeave: () => setActive(false),
      onLeaveBack: () => setActive(false),
    });

    if (reduce) setActive(true);

    return () => st.kill();
  }, []);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;

    const tick = async () => {
      await new Promise((r) => setTimeout(r, HOLD_MS));
      if (cancelled) return;
      setVisible(false);
      await new Promise((r) => setTimeout(r, FADE_MS));
      if (cancelled) return;
      setIndex((i) => (i + 1) % titlesOverview.chapters.length);
      setVisible(true);
    };

    void tick();
    return () => {
      cancelled = true;
    };
  }, [active, index]);

  return (
    <section
      id="titles-overview"
      ref={sectionRef}
      className="relative flex h-[100svh] min-h-[640px] items-center bg-obsidian text-paper-white"
      aria-label="Career titles overview"
      aria-live="polite"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10">
        <p className="mb-10 text-[12px] font-medium tracking-[0.22em] text-faint-gray uppercase md:mb-12">
          {titlesOverview.sectionEyebrow}
        </p>

        <div
          className="transition-opacity duration-[420ms] ease-out"
          style={{ opacity: visible ? 1 : 0 }}
        >
          <p className="mb-8 text-[12px] font-medium tracking-[0.18em] text-steel uppercase md:mb-10">
            {chapter.eyebrow}
          </p>

          <ul className="flex flex-col gap-5 md:gap-7">
            {chapter.lines.map((line) => (
              <li
                key={`${chapter.id}-${line.primary}`}
                className="flex flex-wrap items-baseline gap-x-5 gap-y-1"
              >
                <span className="display-type text-[clamp(36px,6.5vw,68px)] leading-[1.05]">
                  {line.primary}
                </span>
                {line.secondary ? (
                  <span className="text-[16px] tracking-[0.08em] text-faint-gray md:text-[18px]">
                    {line.secondary}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-16 flex gap-2 md:mt-20" aria-hidden>
          {titlesOverview.chapters.map((c, i) => (
            <li
              key={c.id}
              className={`h-1 w-7 transition-colors duration-300 ${
                i === index ? "bg-paper-white" : "bg-white/20"
              }`}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
