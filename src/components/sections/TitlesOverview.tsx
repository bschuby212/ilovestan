"use client";

import { useEffect, useRef, useState } from "react";
import { ColorTyper, type ColorTyperHandle } from "@/components/ColorTyper";
import { titlesOverview } from "@/data/titlesOverview";
import { getGsap } from "@/lib/gsap";

const HOLD_MS = 750;

function waitTween(tween: { eventCallback: (name: string, cb: () => void) => void; totalDuration: () => number }) {
  return new Promise<void>((resolve) => {
    if (!tween || tween.totalDuration() === 0) {
      resolve();
      return;
    }
    tween.eventCallback("onComplete", () => resolve());
  });
}

/**
 * Full-viewport Color Typer: one text line cycles his titles
 * in → hold → out (time-based animation, not scroll-scrubbed).
 */
export function TitlesOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const typerRef = useRef<ColorTyperHandle>(null);
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);

  const title = titlesOverview.titles[index] ?? titlesOverview.titles[0];

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

    const run = async () => {
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      if (cancelled || !typerRef.current) return;

      typerRef.current.reset();
      await waitTween(typerRef.current.typeIn());
      if (cancelled) return;

      await new Promise((r) => setTimeout(r, HOLD_MS));
      if (cancelled || !typerRef.current) return;

      await waitTween(typerRef.current.typeOut());
      if (cancelled) return;

      setIndex((i) => (i + 1) % titlesOverview.titles.length);
    };

    void run();
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
        <p className="mb-8 text-[12px] font-medium tracking-[0.22em] text-faint-gray uppercase md:mb-10">
          {titlesOverview.eyebrow}
        </p>

        <div className="relative flex min-h-[1.2em] items-center">
          <ColorTyper
            key={title}
            ref={typerRef}
            text={title}
            split="word"
            from="var(--color-faint-gray)"
            to="var(--color-paper-white)"
            colorTime={0.14}
            stagger={0.04}
            className="display-type text-[clamp(40px,7.5vw,76px)] leading-[1.0]"
          />
        </div>

        <ul className="mt-14 flex gap-2" aria-hidden>
          {titlesOverview.titles.map((t, i) => (
            <li
              key={t}
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
