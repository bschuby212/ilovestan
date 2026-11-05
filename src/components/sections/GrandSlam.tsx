"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { grandSlams } from "@/data/content";
import { stanMedia } from "@/data/media";
import { getGsap } from "@/lib/gsap";

const COURT_RGB = {
  ao: { r: 11, g: 61, b: 145 },
  rg: { r: 196, g: 92, b: 38 },
  uso: { r: 26, g: 26, b: 46 },
} as const;

export function GrandSlam() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const courtRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = getGsap();
    const section = sectionRef.current;
    const pin = pinRef.current;
    const court = courtRef.current;
    const ball = ballRef.current;
    const shadow = shadowRef.current;
    const dust = dustRef.current;
    const panels = panelsRef.current;
    if (!section || !pin || !court || !ball || !shadow || !dust || !panels)
      return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = Array.from(panels.querySelectorAll<HTMLElement>(".slam-card"));

    const ctx = gsap.context(() => {
      gsap.set(cards, { autoAlpha: 0, y: 40 });
      gsap.set(cards[0], { autoAlpha: 1, y: 0 });
      gsap.set(dust, { opacity: 0, scale: 0.4 });

      court.dataset.surface = "ao";

      if (reduce) {
        gsap.set(cards, { autoAlpha: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=320%",
          pin: pin,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // AO arc
      tl.to(
        ball,
        {
          keyframes: [
            { xPercent: -10, yPercent: -8, scaleX: 1, scaleY: 1, rotate: 0 },
            { xPercent: 18, yPercent: 22, scaleX: 1.15, scaleY: 0.85, rotate: 120 },
            { xPercent: 8, yPercent: -18, scaleX: 0.92, scaleY: 1.08, rotate: 220 },
            { xPercent: 28, yPercent: 28, scaleX: 1.2, scaleY: 0.8, rotate: 360 },
          ],
          duration: 2,
        },
        0,
      )
        .to(
          shadow,
          {
            keyframes: [
              { xPercent: -10, scale: 0.9, opacity: 0.35 },
              { xPercent: 18, scale: 1.2, opacity: 0.5 },
              { xPercent: 8, scale: 0.7, opacity: 0.25 },
              { xPercent: 28, scale: 1.35, opacity: 0.55 },
            ],
            duration: 2,
          },
          0,
        )
        .to(cards[0], { autoAlpha: 1, y: 0, duration: 0.4 }, 0.2)
        .to(cards[0], { autoAlpha: 0, y: -30, duration: 0.35 }, 1.7);

      // Transition AO → RG
      tl.to(
        court,
        {
          backgroundColor: `rgb(${COURT_RGB.rg.r},${COURT_RGB.rg.g},${COURT_RGB.rg.b})`,
          duration: 0.8,
        },
        1.9,
      )
        .to(
          ball,
          {
            keyframes: [
              { xPercent: 10, yPercent: -10, scaleX: 1, scaleY: 1, rotate: 420 },
              { xPercent: -5, yPercent: 34, scaleX: 1.25, scaleY: 0.75, rotate: 520 },
              { xPercent: 20, yPercent: -6, scaleX: 0.9, scaleY: 1.1, rotate: 640 },
              { xPercent: 5, yPercent: 30, scaleX: 1.18, scaleY: 0.82, rotate: 780 },
            ],
            duration: 2.2,
          },
          1.9,
        )
        .to(
          shadow,
          {
            keyframes: [
              { xPercent: 10, scale: 0.85, opacity: 0.3 },
              { xPercent: -5, scale: 1.4, opacity: 0.55 },
              { xPercent: 20, scale: 0.75, opacity: 0.28 },
              { xPercent: 5, scale: 1.3, opacity: 0.5 },
            ],
            duration: 2.2,
          },
          1.9,
        )
        .fromTo(
          dust,
          { opacity: 0, scale: 0.3, xPercent: -5, yPercent: 20 },
          { opacity: 0.85, scale: 1.4, duration: 0.25 },
          2.35,
        )
        .to(dust, { opacity: 0, scale: 1.8, duration: 0.6 }, 2.55)
        .to(
          ball,
          {
            filter: "sepia(0.55) saturate(1.4) hue-rotate(-15deg)",
            duration: 0.6,
          },
          2.4,
        )
        .to(cards[1], { autoAlpha: 1, y: 0, duration: 0.4 }, 2.5)
        .to(cards[1], { autoAlpha: 0, y: -30, duration: 0.35 }, 3.7);

      // Transition RG → USO
      tl.to(
        court,
        {
          backgroundColor: `rgb(${COURT_RGB.uso.r},${COURT_RGB.uso.g},${COURT_RGB.uso.b})`,
          duration: 0.8,
        },
        3.9,
      )
        .to(
          ball,
          {
            keyframes: [
              { xPercent: 15, yPercent: -14, scaleX: 1, scaleY: 1, rotate: 860 },
              { xPercent: 35, yPercent: 26, scaleX: 1.2, scaleY: 0.82, rotate: 980 },
              { xPercent: 22, yPercent: -20, scaleX: 0.9, scaleY: 1.12, rotate: 1100 },
              { xPercent: 40, yPercent: 18, scaleX: 1.1, scaleY: 0.9, rotate: 1220 },
            ],
            duration: 2.2,
            filter: "sepia(0.15) saturate(1.1)",
          },
          3.9,
        )
        .to(
          shadow,
          {
            keyframes: [
              { xPercent: 15, scale: 0.8, opacity: 0.28 },
              { xPercent: 35, scale: 1.25, opacity: 0.5 },
              { xPercent: 22, scale: 0.7, opacity: 0.22 },
              { xPercent: 40, scale: 1.15, opacity: 0.45 },
            ],
            duration: 2.2,
          },
          3.9,
        )
        .to(cards[2], { autoAlpha: 1, y: 0, duration: 0.45 }, 4.4);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="grand-slams"
      ref={sectionRef}
      className="relative bg-obsidian text-paper-white"
      aria-label="The Grand Slam journey"
    >
      <div ref={pinRef} className="relative h-[100svh] overflow-hidden">
        <div
          ref={courtRef}
          data-surface="ao"
          className="absolute inset-0 transition-colors"
          style={{ backgroundColor: "rgb(11,61,145)" }}
        >
          <CourtLines />
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.18), transparent 55%)",
            }}
          />
        </div>

        <div className="absolute top-8 left-6 z-20 md:left-10">
          <p className="text-[12px] font-medium tracking-[0.22em] text-paper-white/70 uppercase">
            The Grand Slam journey
          </p>
          <h2 className="mt-2 max-w-[10ch] text-[24px] leading-[1.2] font-medium md:text-[clamp(28px,4vw,40px)]">
            Three finals. Three world No. 1s.
          </h2>
        </div>

        <div
          ref={dustRef}
          className="pointer-events-none absolute top-[58%] left-[42%] z-10 h-24 w-40 -translate-x-1/2 -translate-y-1/2"
          aria-hidden
        >
          <div
            className="h-full w-full rounded-[100%] opacity-80"
            style={{
              background:
                "radial-gradient(circle, rgba(212,165,116,0.85) 0%, rgba(196,92,38,0.35) 45%, transparent 70%)",
              filter: "blur(2px)",
            }}
          />
        </div>

        <div
          ref={shadowRef}
          className="absolute top-[62%] left-[48%] z-10 h-4 w-16 -translate-x-1/2 rounded-[100%] bg-black/50 blur-[2px] will-change-transform"
          aria-hidden
        />

        <div
          ref={ballRef}
          className="absolute top-[48%] left-[48%] z-20 h-14 w-14 -translate-x-1/2 -translate-y-1/2 will-change-transform md:h-16 md:w-16"
          aria-hidden
        >
          <TennisBall />
        </div>

        <div
          ref={panelsRef}
          className="absolute inset-x-0 bottom-0 z-20 px-6 pb-10 md:px-10 md:pb-14"
        >
          {grandSlams.map((slam) => {
            const photo = stanMedia[slam.image];
            return (
              <article
                key={slam.id}
                className="slam-card absolute inset-x-6 bottom-10 flex max-w-4xl flex-col gap-6 md:inset-x-10 md:bottom-14 md:flex-row md:items-end"
              >
                <div className="relative hidden h-48 w-36 shrink-0 overflow-hidden md:block md:h-56 md:w-44">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="176px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-[12px] font-medium tracking-[0.2em] text-paper-white/70 uppercase">
                    {slam.surface} · {slam.stat}
                  </p>
                  <p className="display-type mt-2 text-[clamp(40px,7vw,72px)] text-paper-white">
                    {slam.year}
                  </p>
                  <h3 className="mt-1 text-[20px] leading-[1.5] font-medium md:text-[24px]">
                    {slam.tournament}
                  </h3>
                  <p className="mt-3 max-w-md text-[16px] leading-[1.75] text-paper-white/85">
                    {slam.note}
                  </p>
                  <p className="mt-2 text-[14px] text-paper-white/65">
                    Final · {slam.opponent} · {slam.score}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CourtLines() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-40"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <g
        fill="none"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="3"
        transform="translate(250 80) scale(1.1)"
      >
        <rect x="0" y="0" width="1000" height="660" />
        <line x1="500" y1="0" x2="500" y2="660" />
        <rect x="160" y="0" width="680" height="660" />
        <rect x="340" y="180" width="320" height="300" />
        <line x1="0" y1="330" x2="1000" y2="330" strokeWidth="4" />
      </g>
    </svg>
  );
}

function TennisBall() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full drop-shadow-sm" aria-hidden>
      <circle cx="32" cy="32" r="30" fill="#d4ff00" />
      <circle cx="32" cy="32" r="30" fill="url(#ballLight)" />
      <path
        d="M8 22c10 8 10 28 0 36"
        fill="none"
        stroke="#111"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.35"
      />
      <path
        d="M56 22c-10 8-10 28 0 36"
        fill="none"
        stroke="#111"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.35"
      />
      <defs>
        <radialGradient id="ballLight" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
          <stop offset="55%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
    </svg>
  );
}
