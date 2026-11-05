"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { stanMedia } from "@/data/media";
import { titlesOverview } from "@/data/titlesOverview";
import { getGsap } from "@/lib/gsap";

/**
 * Title-by-title Grand Slams — huge year + copy over a full-bleed
 * tournament photo that crossfades as you scrub.
 */
export function TitlesOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stagesRef = useRef<HTMLDivElement>(null);
  const bgsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = getGsap();
    const section = sectionRef.current;
    const pin = pinRef.current;
    const stages = stagesRef.current;
    const bgs = bgsRef.current;
    if (!section || !pin || !stages || !bgs) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const panels = Array.from(stages.querySelectorAll<HTMLElement>(".metric-panel"));
    const slides = Array.from(bgs.querySelectorAll<HTMLElement>(".slam-bg"));

    const ctx = gsap.context(() => {
      gsap.set(panels, { autoAlpha: 0, y: 40 });
      gsap.set(panels[0], { autoAlpha: 1, y: 0 });
      gsap.set(slides, { autoAlpha: 0, scale: 1.08 });
      gsap.set(slides[0], { autoAlpha: 1, scale: 1.04 });

      if (reduce) {
        gsap.set(panels, { autoAlpha: 1, y: 0 });
        gsap.set(slides, { autoAlpha: 1, scale: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=150%",
          pin: pin,
          scrub: 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Slow Ken Burns on the active first frame
      tl.to(slides[0], { scale: 1.0, duration: 0.85 }, 0);

      panels.forEach((panel, i) => {
        if (i === 0) return;
        const prev = panels[i - 1]!;
        const prevBg = slides[i - 1]!;
        const nextBg = slides[i]!;
        const at = (i - 1) * 1;

        tl.to(prev.querySelectorAll(".metric-num"), { yPercent: -30, opacity: 0, duration: 0.4 }, at)
          .to(prev.querySelectorAll(".metric-copy"), { y: -16, opacity: 0, duration: 0.3 }, at)
          .to(prev, { autoAlpha: 0, duration: 0.2 }, at + 0.15)
          .to(prevBg, { autoAlpha: 0, scale: 1.06, duration: 0.55 }, at)
          .fromTo(
            nextBg,
            { autoAlpha: 0, scale: 1.1 },
            { autoAlpha: 1, scale: 1.02, duration: 0.65 },
            at + 0.05,
          )
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
          )
          .to(nextBg, { scale: 1.0, duration: 0.5 }, at + 0.5);
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
        {/* Tournament photos — crossfade behind type */}
        <div ref={bgsRef} className="absolute inset-0" aria-hidden>
          {titlesOverview.metrics.map((metric, i) => {
            const photo = stanMedia[metric.image];
            return (
              <div
                key={metric.id}
                className="slam-bg absolute inset-0"
                style={{ zIndex: i }}
              >
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  sizes="100vw"
                  priority={i === 0}
                  className="object-cover object-center"
                />
              </div>
            );
          })}
          {/* Keep type readable */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(90deg, rgba(17,17,17,0.82) 0%, rgba(17,17,17,0.55) 42%, rgba(17,17,17,0.35) 100%), linear-gradient(180deg, rgba(17,17,17,0.35) 0%, rgba(17,17,17,0.15) 40%, rgba(17,17,17,0.7) 100%)",
            }}
          />
        </div>

        <div className="relative z-20 mx-auto w-full max-w-[1440px] px-6 md:px-10">
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
                  <p className="text-[12px] font-medium tracking-[0.18em] text-paper-white/70 uppercase">
                    {metric.label}
                  </p>
                  <p className="mt-3 text-[16px] leading-[1.75] text-paper-white/85 md:text-[18px]">
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
            {titlesOverview.metrics.map((m) => (
              <li key={m.id} className="h-1 w-8 bg-white/25" />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
