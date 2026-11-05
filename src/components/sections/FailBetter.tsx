"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { stanMedia } from "@/data/media";
import { getGsap } from "@/lib/gsap";

/**
 * Callout: Beckett tattoo after the 2013 AO five-set loss to Djokovic,
 * then Australian Open champion the following year.
 */
export function FailBetter() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const lines = root.querySelectorAll(".fb-line");
      gsap.from(lines, {
        yPercent: 110,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 70%" },
      });
      gsap.from(root.querySelector(".fb-story"), {
        y: 24,
        opacity: 0,
        duration: 0.8,
        delay: 0.25,
        ease: "power2.out",
        scrollTrigger: { trigger: root, start: "top 70%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="fail-better"
      ref={rootRef}
      className="relative overflow-hidden bg-obsidian text-paper-white"
      aria-label="Fail better tattoo"
    >
      <div className="grid min-h-[85svh] grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[50vh] lg:min-h-full">
          <Image
            src={stanMedia.portrait.src}
            alt={stanMedia.portrait.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(17,17,17,0.15) 0%, rgba(17,17,17,0.55) 100%)",
            }}
          />
          <p className="absolute bottom-6 left-6 text-[12px] text-faint-gray md:left-10">
            {stanMedia.portrait.credit}
          </p>
        </div>

        <div className="flex flex-col justify-center px-6 py-16 md:px-10 md:py-24 lg:px-14">
          <p className="text-[12px] font-medium tracking-[0.22em] text-faint-gray uppercase">
            Left forearm · 2013
          </p>

          <blockquote className="mt-8">
            <p className="display-type text-[clamp(28px,4.5vw,52px)] leading-[1.05]">
              <span className="block overflow-hidden">
                <span className="fb-line inline-block">Ever tried.</span>
              </span>
              <span className="block overflow-hidden">
                <span className="fb-line inline-block">Ever failed.</span>
              </span>
              <span className="block overflow-hidden">
                <span className="fb-line inline-block">No matter.</span>
              </span>
              <span className="block overflow-hidden">
                <span className="fb-line inline-block">Try again.</span>
              </span>
              <span className="block overflow-hidden">
                <span className="fb-line inline-block">Fail again.</span>
              </span>
              <span className="block overflow-hidden">
                <span className="fb-line inline-block">Fail better.</span>
              </span>
            </p>
            <footer className="mt-6 text-[14px] text-steel">
              Samuel Beckett — inked after the wound, before the titles
            </footer>
          </blockquote>

          <div className="fb-story mt-12 max-w-md border-t border-white/15 pt-8">
            <p className="text-[16px] leading-[1.75] text-paper-white/85">
              January 2013 — five-set heartbreak vs Djokovic at the Australian
              Open. Months later the Beckett line is on his forearm. Next
              January he beats Nadal in Melbourne for his first Slam.
            </p>
            <p className="mt-4 text-[14px] leading-[1.6] text-steel">
              Loss → ink → AO 2014. Then Roland-Garros 2015. Then the US Open
              2016. Fail better, then don&apos;t fail when it matters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
