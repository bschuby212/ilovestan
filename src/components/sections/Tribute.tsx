"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { site } from "@/data/content";
import { stanMedia } from "@/data/media";
import { getGsap } from "@/lib/gsap";

export function Tribute() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll(".tribute-word"), {
        yPercent: 120,
        opacity: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 60%" },
      });
      gsap.from(root.querySelector(".tribute-visual"), {
        scale: 1.08,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: root, start: "top 70%" },
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
      <div className="tribute-visual absolute inset-0">
        <Image
          src={stanMedia.basel.src}
          alt={stanMedia.basel.alt}
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority={false}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(17,17,17,0.35) 0%, rgba(17,17,17,0.55) 45%, rgba(17,17,17,0.92) 100%)",
          }}
        />
      </div>

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
        <p className="mt-6 text-[12px] text-faint-gray">{stanMedia.basel.credit}</p>
        <p className="mt-4 max-w-lg text-[12px] leading-[1.6] text-faint-gray">
          {site.credit}
        </p>
      </div>
    </section>
  );
}
