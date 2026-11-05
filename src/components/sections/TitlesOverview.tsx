"use client";

import Image from "next/image";
import { Medal } from "lucide-react";
import { useEffect, useRef } from "react";
import { stanMedia } from "@/data/media";
import { titlesOverview } from "@/data/titlesOverview";
import { getGsap } from "@/lib/gsap";

/**
 * Grand Slams title-by-title — always paints the first slam solidly,
 * then crossfades photo + copy on a short scrub (no blank handoff from hero).
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
      // First beat always visible — never start blank under the hero
      gsap.set(panels, { autoAlpha: 0, y: 24 });
      gsap.set(panels[0], { autoAlpha: 1, y: 0, clearProps: "transform" });
      gsap.set(slides, { autoAlpha: 0 });
      gsap.set(slides[0], { autoAlpha: 1 });

      if (reduce) {
        gsap.set(panels, { autoAlpha: 1, y: 0 });
        gsap.set(slides, { autoAlpha: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=120%",
          pin: pin,
          scrub: 0.35,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      panels.forEach((panel, i) => {
        if (i === 0) return;
        const prev = panels[i - 1]!;
        const prevBg = slides[i - 1]!;
        const nextBg = slides[i]!;
        const at = (i - 1) * 1;

        tl.to(prev, { autoAlpha: 0, y: -20, duration: 0.35 }, at)
          .to(prevBg, { autoAlpha: 0, duration: 0.4 }, at)
          .fromTo(nextBg, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, at + 0.05)
          .fromTo(
            panel,
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.4 },
            at + 0.1,
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
        className="relative flex h-[100svh] min-h-[640px] items-end overflow-hidden pb-16 md:items-center md:pb-0"
      >
        <div ref={bgsRef} className="absolute inset-0" aria-hidden>
          {titlesOverview.metrics.map((metric, i) => {
            const photo = stanMedia[metric.image];
            return (
              <div key={metric.id} className="slam-bg absolute inset-0" style={{ zIndex: i }}>
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
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(90deg, rgba(17,17,17,0.78) 0%, rgba(17,17,17,0.45) 50%, rgba(17,17,17,0.3) 100%), linear-gradient(180deg, rgba(17,17,17,0.25) 0%, rgba(17,17,17,0.15) 40%, rgba(17,17,17,0.65) 100%)",
            }}
          />
        </div>

        <div className="relative z-20 mx-auto w-full max-w-[1440px] px-6 md:px-10">
          <p className="mb-8 flex items-center gap-2 text-[12px] font-medium tracking-[0.22em] text-faint-gray uppercase md:mb-12">
            <Medal className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden />
            {titlesOverview.sectionEyebrow}
          </p>

          <div ref={stagesRef} className="relative min-h-[42vh]">
            {titlesOverview.metrics.map((metric, i) => (
              <article
                key={metric.id}
                className={`metric-panel ${i === 0 ? "relative" : "absolute inset-0"}`}
              >
                <p className="metric-num display-type text-[clamp(64px,14vw,160px)] leading-[0.9] tracking-[-0.04em]">
                  {metric.value}
                </p>
                <div className="metric-copy mt-5 max-w-xl md:mt-6">
                  <p className="text-[12px] font-medium tracking-[0.18em] text-paper-white/70 uppercase">
                    {metric.label}
                  </p>
                  <p className="mt-3 text-[16px] leading-[1.7] text-paper-white/85 md:text-[18px]">
                    {metric.detail}
                  </p>
                  {metric.aside ? (
                    <p className="mt-3 text-[14px] text-faint-gray">{metric.aside}</p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          <ul className="mt-12 flex gap-2 md:mt-14" aria-hidden>
            {titlesOverview.metrics.map((m) => (
              <li key={m.id} className="h-1 w-7 bg-white/25" />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
