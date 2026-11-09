"use client";

import Image from "next/image";
import { ArrowDown, Trophy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getGsap } from "@/lib/gsap";
import { stanMedia } from "@/data/media";

const LOCAL_SRC = "/video/stan-live.mp4";
const LOCAL_POSTER = "/video/stan-live-poster.jpg";
const STILL = stanMedia.hero;

/**
 * Short hero — catchy chip + name, glass scroll cue bottom-right.
 * No section titles, CTAs, or stats cutout.
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
        y: 18,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.1,
      });
      gsap.from(root.querySelector(".hero-media"), {
        scale: 1.05,
        duration: 1.4,
        ease: "power2.out",
      });
      gsap.to(root.querySelector(".hero-scroll-icon"), {
        y: 5,
        duration: 1.1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative h-[min(72svh,680px)] min-h-[420px] overflow-hidden bg-obsidian text-paper-white"
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
            className="object-cover object-[center_22%]"
          />
        )}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(17,17,17,0.35) 0%, rgba(17,17,17,0.12) 40%, rgba(17,17,17,0.55) 100%)",
          }}
        />
      </div>

      {/* Chip + name — top-left */}
      <div className="relative z-10 flex h-full flex-col justify-between px-6 py-8 md:px-10 md:py-10 lg:px-14">
        <div className="pt-14 md:pt-16">
          <p className="hero-anim inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/12 px-3.5 py-1.5 text-[12px] font-medium tracking-[0.04em] text-white backdrop-blur-md md:text-[13px]">
            <Trophy className="size-3.5 text-[#c8f542]" strokeWidth={2} aria-hidden />
            Big 3 · Slam champion
          </p>
          <h1 className="hero-anim display-type mt-5 text-[clamp(44px,8vw,80px)] leading-[0.95] text-white">
            Stan
            <br />
            Wawrinka
          </h1>
        </div>

        {/* Glass scroll-down — bottom right */}
        <div className="flex justify-end">
          <a
            href="#grand-slams"
            className="hero-anim group flex size-14 items-center justify-center rounded-full border border-white/40 bg-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.25)] backdrop-blur-md transition-transform duration-300 hover:scale-105 md:size-16"
            aria-label="Scroll down"
          >
            <ArrowDown
              className="hero-scroll-icon size-5 text-white md:size-6"
              strokeWidth={1.75}
              aria-hidden
            />
          </a>
        </div>
      </div>
    </section>
  );
}
