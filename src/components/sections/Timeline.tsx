"use client";

import { useEffect, useRef } from "react";
import { timeline } from "@/data/content";
import { getGsap } from "@/lib/gsap";

export function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = getGsap();
    const section = sectionRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    const ball = ballRef.current;
    const line = lineRef.current;
    if (!section || !pin || !track || !ball || !line) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const markers = Array.from(track.querySelectorAll<HTMLElement>(".tl-item"));

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(markers, { opacity: 1 });
        return;
      }

      gsap.set(markers, { opacity: 0.25 });
      gsap.set(markers[0], { opacity: 1 });

      const distance = () => Math.max(track.scrollWidth - window.innerWidth, 1);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance() * 0.85}`,
          pin: pin,
          scrub: 0.45,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(track, { x: () => -distance(), ease: "none", duration: 1 }, 0)
        .to(
          line,
          { scaleX: 1, transformOrigin: "left center", ease: "none", duration: 1 },
          0,
        )
        .to(
          ball,
          {
            x: () => distance() * 0.92,
            ease: "none",
            duration: 1,
          },
          0,
        );

      markers.forEach((marker, i) => {
        const start = i / Math.max(markers.length - 1, 1);
        tl.to(
          marker,
          {
            opacity: 1,
            duration: 0.08,
          },
          Math.max(start - 0.04, 0),
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative bg-paper-white text-obsidian"
      aria-label="Interactive career timeline"
    >
      <div ref={pinRef} className="relative h-[100svh] overflow-hidden">
        <div className="absolute top-8 left-6 z-20 md:left-10">
          <p className="text-[12px] font-medium tracking-[0.22em] text-steel uppercase">
            Career timeline
          </p>
          <h2 className="mt-2 text-[24px] leading-[1.2] font-medium md:text-[clamp(28px,3.5vw,40px)]">
            Follow the baseline
          </h2>
        </div>

        <div className="absolute top-[42%] right-0 left-0">
          <div
            ref={lineRef}
            className="absolute top-1/2 left-6 h-px w-[calc(100%-3rem)] origin-left scale-x-0 bg-concrete-gray md:left-10 md:w-[calc(100%-5rem)]"
            aria-hidden
          />
          <div
            className="absolute top-1/2 left-6 h-px w-[calc(100%-3rem)] -translate-y-1/2 bg-obsidian/15 md:left-10 md:w-[calc(100%-5rem)]"
            aria-hidden
          />

          <div
            ref={ballRef}
            className="absolute top-1/2 left-6 z-10 h-5 w-5 -translate-y-1/2 will-change-transform md:left-10"
            aria-hidden
          >
            <span className="block h-full w-full rounded-full bg-[#d4ff00] shadow-[0_0_0_2px_#111]" />
          </div>

          <div
            ref={trackRef}
            className="flex w-max gap-0 will-change-transform pt-16 pb-8 pl-6 md:pl-10"
          >
            {timeline.map((item, i) => (
              <article
                key={`${item.year}-${item.title}`}
                className={`tl-item w-[min(78vw,360px)] shrink-0 border-l border-concrete-gray px-6 md:w-[400px] md:px-8 ${
                  i % 2 === 0 ? "-mt-28" : "mt-8"
                }`}
              >
                <p className="display-type text-[48px] text-obsidian/15 md:text-[64px]">
                  {item.year}
                </p>
                <h3 className="mt-2 text-[20px] leading-[1.4] font-medium">
                  {item.title}
                </h3>
                <p className="mt-3 text-[16px] leading-[1.75] text-steel">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>

        <p className="absolute bottom-8 left-6 text-[12px] tracking-[0.16em] text-steel uppercase md:left-10">
          Scroll to travel the years
        </p>
      </div>
    </section>
  );
}
