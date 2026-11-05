"use client";

import { useEffect, useRef } from "react";
import { titlesOverview } from "@/data/titlesOverview";
import { getGsap } from "@/lib/gsap";

/**
 * Scroll-driven metrics parade — continuous with the hero (shared obsidian).
 * Oversized numbers scrub in sequence; no timer carousel, no charts.
 */
export function TitlesOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = getGsap();
    const section = sectionRef.current;
    const pin = pinRef.current;
    const stages = stagesRef.current;
    if (!section || !pin || !stages) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const panels = Array.from(stages.querySelectorAll<HTMLElement>(".metric-panel"));
    const years = Array.from(stages.querySelectorAll<HTMLElement>(".metric-year"));

    const ctx = gsap.context(() => {
      gsap.set(panels, { autoAlpha: 0, y: 48 });
      gsap.set(panels[0], { autoAlpha: 1, y: 0 });
      gsap.set(
        panels[0].querySelectorAll(".metric-num, .metric-copy"),
        { y: 0, opacity: 1 },
      );

      if (reduce) {
        gsap.set(panels, { autoAlpha: 1, y: 0, clearProps: "transform" });
        return;
      }

      // Compact pin — ~1.6 viewports of scroll for all metrics (not a slide deck)
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=160%",
          pin: pin,
          scrub: 0.45,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      panels.forEach((panel, i) => {
        if (i === 0) return;
        const prev = panels[i - 1]!;
        const at = (i - 1) * 1;

        tl.to(
          prev.querySelectorAll(".metric-num"),
          { yPercent: -35, opacity: 0, duration: 0.45 },
          at,
        )
          .to(
            prev.querySelectorAll(".metric-copy"),
            { y: -18, opacity: 0, duration: 0.35 },
            at,
          )
          .to(prev, { autoAlpha: 0, duration: 0.25 }, at + 0.2)
          .fromTo(
            panel,
            { autoAlpha: 0, y: 36 },
            { autoAlpha: 1, y: 0, duration: 0.35 },
            at + 0.15,
          )
          .fromTo(
            panel.querySelectorAll(".metric-num"),
            { yPercent: 55, opacity: 0, scale: 0.92 },
            { yPercent: 0, opacity: 1, scale: 1, duration: 0.55 },
            at + 0.2,
          )
          .fromTo(
            panel.querySelectorAll(".metric-copy"),
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4 },
            at + 0.35,
          );
      });

      // Championship years float in on the final beat
      if (years.length) {
        tl.fromTo(
          years,
          { yPercent: 40, opacity: 0 },
          { yPercent: 0, opacity: 1, stagger: 0.08, duration: 0.5 },
          (panels.length - 1) * 1 + 0.15,
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="titles-overview"
      ref={sectionRef}
      className="relative bg-obsidian text-paper-white"
      aria-label="Career metrics"
    >
      <div ref={pinRef} className="relative flex h-[100svh] min-h-[640px] items-center overflow-hidden">
        {/* Soft continuity from hero — same field, slight grain of light */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 20% 30%, rgba(255,255,255,0.08), transparent 55%)",
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10">
          <p className="mb-10 text-[12px] font-medium tracking-[0.22em] text-faint-gray uppercase md:mb-14">
            {titlesOverview.sectionEyebrow}
          </p>

          <div ref={stagesRef} className="relative min-h-[52vh]">
            {titlesOverview.metrics.map((metric, i) => (
              <article
                key={metric.id}
                className={`metric-panel ${i === 0 ? "relative" : "absolute inset-0"}`}
              >
                <p
                  className="metric-num display-type overflow-hidden text-[clamp(72px,18vw,200px)] leading-[0.85] tracking-[-0.04em]"
                  aria-hidden={false}
                >
                  {metric.value}
                </p>
                <div className="metric-copy mt-6 max-w-xl md:mt-8">
                  <p className="text-[12px] font-medium tracking-[0.18em] text-steel uppercase">
                    {metric.label}
                  </p>
                  <p className="mt-3 text-[16px] leading-[1.75] text-paper-white/80 md:text-[18px]">
                    {metric.detail}
                  </p>
                  {metric.aside ? (
                    <p className="mt-4 text-[14px] tracking-[0.12em] text-faint-gray uppercase">
                      {metric.aside}
                    </p>
                  ) : null}
                </div>

                {metric.id === "years" ? (
                  <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 md:mt-14">
                    {["2014", "2015", "2016"].map((y) => (
                      <li
                        key={y}
                        className="metric-year display-type text-[clamp(28px,5vw,48px)] text-paper-white/90"
                      >
                        {y}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
