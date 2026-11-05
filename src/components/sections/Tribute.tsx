"use client";

import { useEffect, useRef } from "react";
import { site } from "@/data/content";
import { getGsap } from "@/lib/gsap";

export function Tribute() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const words = root.querySelectorAll(".tribute-word");
      gsap.from(words, {
        yPercent: 120,
        opacity: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 60%",
        },
      });

      gsap.from(root.querySelector(".tribute-visual"), {
        scale: 1.08,
        opacity: 0.4,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="tribute"
      ref={rootRef}
      className="relative min-h-[100svh] overflow-hidden bg-obsidian text-paper-white"
      aria-label="Final tribute"
    >
      <div
        className="tribute-visual absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 35%, #2c2c2c 0%, #111111 50%, #050505 100%)",
        }}
      >
        <div className="media-placeholder absolute inset-x-8 top-24 bottom-48 border border-white/10 bg-transparent text-faint-gray md:inset-x-20 md:top-28 md:bottom-56">
          <span className="max-w-sm px-6">
            Photo placeholder — Stan walking from the court / signature backhand
          </span>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent" />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 pb-20 md:px-10 md:pb-24">
        <p className="mb-5 text-[12px] font-medium tracking-[0.22em] text-paper-white/60 uppercase">
          Final point
        </p>
        <h2 className="display-type max-w-[14ch] text-paper-white">
          <span className="block overflow-hidden">
            <span className="tribute-word inline-block">Fail better.</span>
          </span>
          <span className="block overflow-hidden">
            <span className="tribute-word inline-block">Win forever.</span>
          </span>
        </h2>
        <p className="mt-6 max-w-md text-[16px] leading-[1.75] text-paper-white/75">
          For the one-handed backhand, the late bloom, and every fight that looked
          finished until it wasn&apos;t.
        </p>
        <p className="mt-10 max-w-lg text-[12px] leading-[1.6] text-faint-gray">
          {site.credit}
        </p>
      </div>
    </section>
  );
}
