"use client";

import { useEffect, useRef } from "react";
import { titlesOverview } from "@/data/titlesOverview";
import { getGsap } from "@/lib/gsap";

/**
 * Title-by-title Grand Slams — same typographic format as the numbers reference:
 * huge year, tournament label, note, score line. Scroll-scrubbed, no court gimmick.
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

    const ctx = gsap.context(() => {
      gsap.set(panels, { autoAlpha: 0, y: 40 });
      gsap.set(panels[0], { autoAlpha: 1, y: 0 });

      if (reduce) {
        gsap.set(panels, { autoAlpha: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=140%",
          pin: pin,
          scrub: 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      panels.forEach((panel, i) => {
        if (i === 0) return;
        const prev = panels[i - 1]!;
        const at = (i - 1) * 1;

        tl.to(prev.querySelectorAll(".metric-num"), { yPercent: -30, opacity: 0, duration: 0.4 }, at)
          .to(prev.querySelectorAll(".metric-copy"), { y: -16, opacity: 0, duration: 0.3 }, at)
          .to(prev, { autoAlpha: 0, duration: 0.2 }, at + 0.15)
          .fromTo(panel, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.3 }, at + 0.12)
          .fromTo(
            panel.querySelectorAll(".metric-num"),
            { yPercent: 45, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.5 },
            at + 0.18,
          )
          .fromTo(
            panel.querySelectorAll(".metric-copy"),
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.35 },
            at + 0.3,
          );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="grand-slams"
      ref={sectionRef}
      className="relative bg-obsidian text-paper-white"
      aria-label="Grand Slam titles"
    >
      <div
        ref={pinRef}
        className="relative flex h-[100svh] min-h-[640px] items-center overflow-hidden"
      >
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10">
          <p className="mb-10 text-[12px] font-medium tracking-[0.22em] text-faint-gray uppercase md:mb-14">
            {titlesOverview.sectionEyebrow}
          </p>

          <div ref={stagesRef} className="relative min-h-[48vh]">
            {titlesOverview.metrics.map((metric, i) => (
              <article
                key={metric.id}
                className={`metric-panel ${i === 0 ? "relative" : "absolute inset-0"}`}
              >
                <p className="metric-num display-type text-[clamp(72px,18vw,200px)] leading-[0.85] tracking-[-0.04em]">
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
                    <p className="mt-4 text-[14px] tracking-[0.06em] text-faint-gray">
                      {metric.aside}
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          <ul className="mt-16 flex gap-2 md:mt-20" aria-hidden>
            {titlesOverview.metrics.map((m, i) => (
              <li key={m.id} className="h-1 w-8 bg-white/20" data-metric-dot={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
