"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { timeline } from "@/data/content";
import { stanMedia } from "@/data/media";
import { getGsap } from "@/lib/gsap";

/**
 * Vertical career timeline — scroll = time.
 * Full-bleed background crossfades per beat; year + copy stay readable over a wash.
 */
export function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const bgsRef = useRef<HTMLDivElement>(null);
  const stagesRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const { gsap } = getGsap();
    const section = sectionRef.current;
    const pin = pinRef.current;
    const bgs = bgsRef.current;
    const stages = stagesRef.current;
    const yearEl = yearRef.current;
    if (!section || !pin || !bgs || !stages || !yearEl) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const panels = Array.from(stages.querySelectorAll<HTMLElement>(".tl-panel"));
    const slides = Array.from(bgs.querySelectorAll<HTMLElement>(".tl-bg"));
    const n = panels.length;

    const ctx = gsap.context(() => {
      gsap.set(panels, { autoAlpha: 0, y: 36 });
      gsap.set(panels[0], { autoAlpha: 1, y: 0 });
      gsap.set(slides, { autoAlpha: 0, scale: 1.08 });
      gsap.set(slides[0], { autoAlpha: 1, scale: 1.04 });
      yearEl.textContent = timeline[0]!.year;

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
          end: () => `+=${Math.max(n, 1) * 85}%`,
          pin: pin,
          scrub: 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(slides[0], { scale: 1.0, duration: 0.7 }, 0);

      panels.forEach((panel, i) => {
        if (i === 0) return;
        const prev = panels[i - 1]!;
        const prevBg = slides[i - 1]!;
        const nextBg = slides[i]!;
        const at = (i - 1) * 1;
        const year = timeline[i]!.year;

        tl.to(prev, { autoAlpha: 0, y: -28, duration: 0.35 }, at)
          .to(prevBg, { autoAlpha: 0, scale: 1.06, duration: 0.5 }, at)
          .fromTo(
            nextBg,
            { autoAlpha: 0, scale: 1.1 },
            { autoAlpha: 1, scale: 1.02, duration: 0.55 },
            at + 0.05,
          )
          .fromTo(
            panel,
            { autoAlpha: 0, y: 32 },
            { autoAlpha: 1, y: 0, duration: 0.4 },
            at + 0.12,
          )
          .to(nextBg, { scale: 1.0, duration: 0.45 }, at + 0.4)
          .call(
            () => {
              yearEl.textContent = year;
            },
            undefined,
            at + 0.15,
          );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative bg-obsidian text-paper-white"
      aria-label="Career timeline"
    >
      <div ref={pinRef} className="relative h-[100svh] min-h-[640px] overflow-hidden">
        <div ref={bgsRef} className="absolute inset-0" aria-hidden>
          {timeline.map((item, i) => {
            const photo = stanMedia[item.image];
            return (
              <div key={`${item.year}-${item.title}`} className="tl-bg absolute inset-0" style={{ zIndex: i }}>
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
            className="absolute inset-0 z-20"
            style={{
              background:
                "linear-gradient(90deg, rgba(17,17,17,0.82) 0%, rgba(17,17,17,0.5) 50%, rgba(17,17,17,0.35) 100%), linear-gradient(180deg, rgba(17,17,17,0.4) 0%, rgba(17,17,17,0.15) 45%, rgba(17,17,17,0.75) 100%)",
            }}
          />
        </div>

        <div className="relative z-30 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-6 pb-16 md:px-10 md:pb-20 lg:justify-center lg:pb-0">
          <p className="mb-6 text-[12px] font-medium tracking-[0.22em] text-faint-gray uppercase md:mb-8">
            Career timeline
          </p>

          <p
            ref={yearRef}
            className="display-type text-[clamp(64px,14vw,160px)] leading-[0.85] tracking-[-0.04em] text-paper-white/90"
            aria-hidden
          >
            {timeline[0]!.year}
          </p>

          <div ref={stagesRef} className="relative mt-6 min-h-[8rem] max-w-xl md:mt-8">
            {timeline.map((item, i) => (
              <article
                key={`${item.year}-${item.title}`}
                className={`tl-panel ${i === 0 ? "relative" : "absolute inset-0"}`}
              >
                <h3 className="text-[20px] leading-[1.35] font-medium md:text-[24px]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[16px] leading-[1.7] text-paper-white/75 md:text-[18px]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>

          <ul className="mt-12 flex gap-1.5 md:mt-16" aria-hidden>
            {timeline.map((item) => (
              <li key={`${item.year}-${item.title}`} className="h-1 w-5 bg-white/25" />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
