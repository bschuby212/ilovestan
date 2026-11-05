"use client";

import { useEffect, useRef } from "react";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { getGsap } from "@/lib/gsap";
import { stanMedia } from "@/data/media";

const LOCAL_BH = "/video/stan-highlights.mp4";
const LOCAL_POSTER = "/video/stan-highlights-poster.jpg";
const STILL = stanMedia.hero;

const stats = [
  {
    label: "Average pace",
    value: 75,
    unit: "mph",
    detail: "Hawk-Eye · AO 2014–16",
    format: "plain" as const,
  },
  {
    label: "Average spin",
    value: 2500,
    unit: "RPM",
    detail: "One-hand drive",
    format: "comma" as const,
  },
  {
    label: "Final winners",
    value: 60,
    unit: "RG ’15",
    detail: "Roland-Garros final",
    format: "plain" as const,
  },
];

/**
 * Backhand only — local winners video + three clear stats.
 */
export function BackhandLab() {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.playsInline = true;
    const tryPlay = () => void video.play().catch(() => undefined);
    video.addEventListener("loadeddata", tryPlay);
    tryPlay();
    return () => video.removeEventListener("loadeddata", tryPlay);
  }, []);

  useEffect(() => {
    const { gsap, ScrollTrigger } = getGsap();
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap.from(root.querySelectorAll(".bh-fade"), {
          y: 22,
          opacity: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 70%" },
        });
      }

      ScrollTrigger.create({
        trigger: root,
        start: "top 65%",
        end: "bottom 35%",
        onEnter: () => void videoRef.current?.play().catch(() => undefined),
        onEnterBack: () => void videoRef.current?.play().catch(() => undefined),
        onLeave: () => videoRef.current?.pause(),
        onLeaveBack: () => videoRef.current?.pause(),
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="backhand"
      ref={rootRef}
      className="relative min-h-[100svh] overflow-hidden bg-[#111] text-[#fff]"
      aria-label="One-handed backhand"
    >
      <video
        ref={videoRef}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={LOCAL_POSTER}
        controls={false}
        disablePictureInPicture
      >
        <source src={LOCAL_BH} type="video/mp4" />
      </video>
      {/* Fallback still if video fails */}
      <div
        className="absolute inset-0 -z-[1] bg-cover bg-center"
        style={{ backgroundImage: `url(${STILL.src})` }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(90deg, rgba(17,17,17,0.25) 0%, rgba(17,17,17,0.5) 45%, rgba(17,17,17,0.82) 100%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[100svh] items-center justify-end px-6 py-20 md:px-10 lg:px-14">
        <div className="w-full max-w-[480px]">
          <h2
            className="bh-fade display-type text-[clamp(32px,4.5vw,48px)] leading-[1.05]"
            style={{ color: "#ffffff" }}
          >
            One-handed
            <br />
            backhand
          </h2>

          <div
            className="bh-fade mt-10 grid grid-cols-1 border border-white/30 bg-black/55 backdrop-blur-[1px] sm:grid-cols-3"
            style={{ color: "#ffffff" }}
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`px-5 py-6 ${
                  i < stats.length - 1
                    ? "border-b border-white/25 sm:border-r sm:border-b-0"
                    : ""
                }`}
              >
                <p
                  className="text-[10px] font-medium tracking-[0.16em] uppercase"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  {stat.label}
                </p>
                <p className="mt-3 flex flex-col gap-1">
                  <AnimatedNumber
                    value={stat.value}
                    format={stat.format}
                    delay={i * 0.08}
                    duration={1.2}
                    start="top 80%"
                    className="display-type block text-[40px] leading-none tabular-nums"
                  />
                  <span
                    className="text-[12px] tracking-[0.06em] uppercase"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {stat.unit}
                  </span>
                </p>
                <p
                  className="mt-2 text-[12px]"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {stat.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
