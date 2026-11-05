"use client";

import { ColorTyper } from "@/components/ColorTyper";
import { titlesOverview } from "@/data/titlesOverview";

/**
 * Condensed post-hero beat: one line, Framer Color Typer animation
 * (in-view, fast stagger — not scroll-scrubbed).
 */
export function TitlesOverview() {
  return (
    <section
      id="titles-overview"
      className="bg-obsidian text-paper-white"
      aria-label="Career titles overview"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col justify-center px-6 py-20 md:px-10 md:py-28">
        <p className="mb-6 text-[12px] font-medium tracking-[0.22em] text-faint-gray uppercase">
          {titlesOverview.eyebrow}
        </p>
        <ColorTyper
          text={titlesOverview.line}
          split="word"
          from="var(--color-faint-gray)"
          to="var(--color-paper-white)"
          delay={0.08}
          colorTime={0.16}
          stagger={0.04}
          replay
          className="display-type max-w-[22ch] text-[clamp(28px,5.5vw,56px)] leading-[1.08]"
        />
      </div>
    </section>
  );
}
