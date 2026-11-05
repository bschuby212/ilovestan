"use client";

import { useEffect, useRef, useState } from "react";
import { titlesOverview } from "@/data/titlesOverview";
import { getGsap } from "@/lib/gsap";

const TYPE_MS = 42;
const DELETE_MS = 28;
const HOLD_MS = 900;
const GAP_MS = 280;

/**
 * Full-viewport typewriter: one line types each title in,
 * holds, deletes, then the next — classic writer cascade.
 */
export function TitlesOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [active, setActive] = useState(false);
  const [typing, setTyping] = useState(false);

  const full = titlesOverview.titles[index] ?? titlesOverview.titles[0];

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

    if (reduce) {
      setActive(true);
      setDisplay(full);
    }

    return () => st.kill();
  }, [full]);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(full);
      return;
    }

    let cancelled = false;
    setTyping(true);

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        const t = window.setTimeout(resolve, ms);
        if (cancelled) window.clearTimeout(t);
      });

    const run = async () => {
      setDisplay("");
      // type in
      for (let i = 1; i <= full.length; i++) {
        if (cancelled) return;
        setDisplay(full.slice(0, i));
        await sleep(TYPE_MS);
      }
      if (cancelled) return;
      setTyping(false);
      await sleep(HOLD_MS);
      if (cancelled) return;
      setTyping(true);
      // delete out
      for (let i = full.length - 1; i >= 0; i--) {
        if (cancelled) return;
        setDisplay(full.slice(0, i));
        await sleep(DELETE_MS);
      }
      if (cancelled) return;
      await sleep(GAP_MS);
      if (cancelled) return;
      setIndex((i) => (i + 1) % titlesOverview.titles.length);
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [active, index, full]);

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

        <p className="display-type min-h-[1.15em] text-[clamp(40px,7.5vw,76px)] leading-[1.0]">
          <span>{display}</span>
          <span
            className={`ml-[2px] inline-block w-[0.08em] bg-paper-white align-[-0.05em] ${
              typing ? "animate-pulse" : "opacity-100"
            }`}
            style={{ height: "0.85em" }}
            aria-hidden
          />
        </p>

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
