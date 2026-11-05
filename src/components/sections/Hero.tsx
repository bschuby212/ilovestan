"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getGsap } from "@/lib/gsap";
import { stanMedia } from "@/data/media";

/** Prefer local screen-record — never shows play/pause. */
const LOCAL_SRC = "/video/stan-live.mp4";
const LOCAL_POSTER = "/video/stan-live-poster.jpg";
const STILL = stanMedia.hero;

/**
 * Hero — two-line name lower-left, one supporting line, right-side trophy card.
 * No CTA. Local video if present; otherwise still.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
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
    const section = sectionRef.current;
    const pin = pinRef.current;
    const media = mediaRef.current;
    const copy = copyRef.current;
    if (!section || !pin || !media || !copy) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lines = copy.querySelectorAll(".hero-line-anim");

    const ctx = gsap.context(() => {
      gsap.set(lines, { y: 28, opacity: 0 });
      gsap.set(copy.querySelector(".hero-trophy"), { y: 24, opacity: 0 });
      gsap.set(media, { scale: 1.1 });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .to(media, { scale: 1.04, duration: 2, ease: "power2.out" }, 0)
        .to(lines, { y: 0, opacity: 1, duration: 0.85, stagger: 0.12 }, 0.25)
        .to(copy.querySelector(".hero-trophy"), { y: 0, opacity: 1, duration: 0.7 }, 0.7);

      if (reduce) {
        gsap.set(media, { scale: 1.04 });
        gsap.set(lines, { y: 0, opacity: 1 });
        gsap.set(copy.querySelector(".hero-trophy"), { y: 0, opacity: 1 });
        return;
      }

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          pin: pin,
          scrub: 0.35,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
        .to(media, { yPercent: 8, scale: 1.02, ease: "none", duration: 1 }, 0)
        .to(copy, { yPercent: -18, opacity: 0, ease: "none", duration: 1 }, 0);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative h-[150svh] bg-obsidian text-paper-white"
      aria-label="Stan Wawrinka"
    >
      <div ref={pinRef} className="relative h-[100svh] min-h-[640px] overflow-hidden">
        <div ref={mediaRef} className="absolute inset-[-6%] will-change-transform">
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
              controlsList="nodownload nofullscreen noremoteplayback"
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
              className="object-cover object-[center_20%]"
            />
          )}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(17,17,17,0.25) 0%, rgba(17,17,17,0.08) 40%, rgba(17,17,17,0.78) 100%)",
            }}
          />
        </div>

        <div
          ref={copyRef}
          className="relative z-10 flex h-full flex-col justify-end gap-10 px-6 pb-16 will-change-transform md:flex-row md:items-end md:justify-between md:px-10 md:pb-20 lg:px-14"
        >
          <div className="max-w-[22ch] md:max-w-[28ch]">
            <h1 className="display-type text-[clamp(40px,7vw,72px)] leading-[1.02] text-paper-white">
              <span className="hero-line-anim block">Stan</span>
              <span className="hero-line-anim block">Wawrinka</span>
            </h1>
            <p className="hero-line-anim mt-4 max-w-[34ch] text-[15px] leading-[1.55] text-paper-white/80 md:text-[16px]">
              Three Grand Slams. One backhand. A career that refused to quit.
            </p>
          </div>

          {/* Pseudo trophy count — refine later */}
          <aside
            className="hero-trophy w-full max-w-[220px] rounded-[20px] bg-paper-white p-5 text-obsidian shadow-[0_20px_50px_rgba(0,0,0,0.35)] md:mb-1"
            aria-label="Career highlights"
          >
            <p className="text-[11px] font-medium tracking-[0.14em] text-steel uppercase">
              Career
            </p>
            <ul className="mt-4 space-y-3">
              <li className="flex items-baseline justify-between gap-4">
                <span className="text-[13px] text-steel">Grand Slams</span>
                <span className="display-type text-[28px] leading-none">3</span>
              </li>
              <li className="flex items-baseline justify-between gap-4">
                <span className="text-[13px] text-steel">Olympic gold</span>
                <span className="display-type text-[28px] leading-none">1</span>
              </li>
              <li className="flex items-baseline justify-between gap-4">
                <span className="text-[13px] text-steel">ATP titles</span>
                <span className="display-type text-[28px] leading-none">16</span>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
