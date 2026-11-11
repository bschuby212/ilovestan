"use client";

import Image from "next/image";
import { ArrowUpRight, Medal, Trophy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getGsap } from "@/lib/gsap";
import { stanMedia } from "@/data/media";
import { heroTitleHeader, heroTitleRows } from "@/data/heroTitles";

const LOCAL_SRC = "/video/stan-live.mp4";
const LOCAL_POSTER = "/video/stan-live-poster.jpg";
const STILL = stanMedia.hero;

function TrophyGlyph({ className = "" }: { className?: string }) {
  return (
    <Trophy
      className={className}
      strokeWidth={1.5}
      aria-hidden
    />
  );
}

/**
 * Full-viewport hero — left brand + line, right title tally (Stan’s crowns).
 * No chip above the name.
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
        y: 20,
        opacity: 0,
        duration: 0.75,
        stagger: 0.07,
        ease: "power3.out",
        delay: 0.1,
      });
      gsap.from(root.querySelector(".hero-media"), {
        scale: 1.05,
        duration: 1.5,
        ease: "power2.out",
      });
      gsap.from(root.querySelectorAll(".hero-tally-row"), {
        x: 24,
        opacity: 0,
        duration: 0.55,
        stagger: 0.06,
        ease: "power2.out",
        delay: 0.35,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-[#0a1628] text-white"
      aria-label="Stan Wawrinka"
    >
      {/* Full-bleed media */}
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
            className="object-cover object-[center_24%]"
          />
        )}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(8,14,28,0.72) 0%, rgba(8,14,28,0.35) 48%, rgba(8,14,28,0.82) 100%), linear-gradient(180deg, rgba(8,14,28,0.35) 0%, transparent 40%, rgba(8,14,28,0.55) 100%)",
          }}
        />
        {/* Subtle arc texture on the right rail */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-full max-w-[520px] opacity-40 md:w-[46%]"
          style={{
            backgroundImage:
              "repeating-radial-gradient(circle at 120% 50%, transparent 0, transparent 28px, rgba(120,160,220,0.07) 29px, transparent 30px)",
          }}
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-between px-6 py-8 md:px-10 md:py-10 lg:flex-row lg:items-stretch lg:gap-10 lg:px-12 lg:py-12">
        {/* Left — name + line + scroll */}
        <div className="flex flex-1 flex-col justify-between pt-14 md:pt-16 lg:max-w-[52%] lg:pt-20">
          <div>
            <h1 className="hero-anim max-w-[10ch] text-[clamp(48px,8vw,84px)] leading-[0.98] font-semibold tracking-[-0.03em] text-white">
              Stan
              <br />
              Wawrinka.
            </h1>
            <p className="hero-anim mt-5 max-w-[32ch] text-[16px] leading-[1.55] text-white/85 md:text-[18px]">
              The late bloom that beat No. 1s when it mattered — three majors,
              one signature backhand.
            </p>
          </div>

          <div className="mt-10 flex items-end justify-between gap-6 lg:mt-0">
            <p className="hero-anim max-w-[28ch] text-[13px] leading-[1.5] text-white/65 md:text-[14px]">
              An independent tribute to a career written in fifth sets.
            </p>
            <a
              href="#grand-slams"
              className="hero-anim group flex size-12 shrink-0 items-center justify-center rounded-full border border-white/45 bg-white/18 backdrop-blur-md transition-transform duration-300 hover:scale-105 md:size-14"
              aria-label="Scroll to titles"
            >
              <ArrowUpRight
                className="size-5 text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:size-6"
                strokeWidth={1.75}
                aria-hidden
              />
            </a>
          </div>
        </div>

        {/* Right — glass titles tally (no solid card) */}
        <aside
          className="hero-anim mt-8 flex w-full flex-col justify-center lg:mt-0 lg:w-[min(100%,400px)] lg:shrink-0 lg:pl-4"
          aria-label="Title tally"
        >
          <div className="mb-7 flex items-center justify-between gap-3">
            <p className="text-[13px] font-semibold tracking-[0.18em] text-white/90 uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
              {heroTitleHeader.eyebrow}
            </p>
            <div className="flex items-center gap-2.5">
              <span className="flex size-10 items-center justify-center rounded-full border border-white/35 bg-white/15 text-[#f0d78c] shadow-[0_8px_28px_rgba(0,0,0,0.25)] backdrop-blur-md">
                <Medal className="size-5" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="text-[12px] font-medium tracking-[0.08em] text-white/80 uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
                {heroTitleHeader.mark}
              </span>
            </div>
          </div>

          <ul className="flex flex-col gap-3 md:gap-3.5">
            {heroTitleRows.map((row) => (
              <li
                key={row.id}
                className="hero-tally-row flex items-center justify-between gap-3 rounded-full border border-white/25 bg-white/10 px-3.5 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-md md:px-4 md:py-3"
              >
                <div className="flex flex-1 items-center justify-end gap-1.5 pr-2">
                  {Array.from({ length: row.count }).map((_, i) => (
                    <TrophyGlyph
                      key={i}
                      className="size-5 text-white/90 md:size-[22px]"
                    />
                  ))}
                </div>
                <div className="flex min-w-[7.25rem] items-center justify-end gap-2 border-l border-white/25 pl-3 md:min-w-[8rem]">
                  <span className="text-right text-[12px] font-medium tracking-[0.06em] text-white uppercase md:text-[13px]">
                    {row.short}
                  </span>
                  <span className="text-[11px] tabular-nums text-white/55">
                    {row.year}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-right text-[12px] text-white/50 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
            {heroTitleHeader.note}
          </p>
        </aside>
      </div>
    </section>
  );
}
