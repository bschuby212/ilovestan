"use client";

import Image from "next/image";
import { ArrowUpRight, Trophy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getGsap } from "@/lib/gsap";
import { stanMedia } from "@/data/media";

const LOCAL_SRC = "/video/stan-live.mp4";
const LOCAL_POSTER = "/video/stan-live-poster.jpg";
const STILL = stanMedia.hero;

/**
 * Short full-bleed hero (SwiftContainers composition):
 * - Top-left: catchy chip + two-line name
 * - Bottom-left: one short line
 * - Bottom-right: glassmorphism ↗ scroll
 * No section titles, CTAs, or stats panels.
 */
export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useLocal, setUseLocal] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(LOCAL_SRC, { method: "HEAD" })
      .then((res) => {
        if (!cancelled && res.ok) setUseLocal(true);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!useLocal) return;
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.playsInline = true;
    const tryPlay = () => void video.play().catch(() => undefined);
    video.addEventListener("loadeddata", tryPlay);
    tryPlay();
    return () => video.removeEventListener("loadeddata", tryPlay);
  }, [useLocal]);

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll(".hero-anim"), {
        y: 16,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.08,
      });
      gsap.from(root.querySelector(".hero-media"), {
        scale: 1.04,
        duration: 1.35,
        ease: "power2.out",
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative h-[min(68svh,620px)] min-h-[380px] overflow-hidden bg-[#111] text-white"
      aria-label="Stan Wawrinka"
    >
      <div className="hero-media absolute inset-0">
        {useLocal ? (
          <video
            ref={videoRef}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={LOCAL_POSTER}
            controls={false}
            disablePictureInPicture
          >
            <source src={LOCAL_SRC} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={STILL.src}
            alt={STILL.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_28%]"
          />
        )}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.08) 45%, rgba(0,0,0,0.45) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between px-6 py-7 md:px-10 md:py-9 lg:px-12">
        {/* Top-left — chip + name (like “Global Freight. Done Right.”) */}
        <div className="pt-12 md:pt-14">
          <p className="hero-anim inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-3 py-1 text-[12px] font-medium text-white backdrop-blur-md">
            <Trophy className="size-3.5" strokeWidth={2} aria-hidden />
            Big 5
          </p>
          <h1 className="hero-anim mt-4 max-w-[10ch] text-[clamp(40px,7vw,68px)] leading-[1.02] font-semibold tracking-[-0.02em] text-white">
            Stan
            <br />
            Wawrinka.
          </h1>
        </div>

        {/* Bottom row — tagline left, glass scroll right */}
        <div className="flex items-end justify-between gap-6">
          <p className="hero-anim max-w-[28ch] text-[14px] leading-[1.5] text-white/90 md:max-w-[36ch] md:text-[16px]">
            Three Grand Slams. One backhand. A career that refused to{" "}
            <span className="font-semibold text-white">quit</span>.
          </p>

          <a
            href="#grand-slams"
            className="hero-anim group flex size-12 shrink-0 items-center justify-center rounded-full border border-white/50 bg-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-md transition-transform duration-300 hover:scale-105 md:size-14"
            aria-label="Scroll to titles"
          >
            <ArrowUpRight
              className="size-5 text-[#1a1a1a] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:size-6"
              strokeWidth={1.75}
              aria-hidden
            />
          </a>
        </div>
      </div>
    </section>
  );
}
