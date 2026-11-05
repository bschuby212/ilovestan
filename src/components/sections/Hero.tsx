"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

/**
 * Framer-style layered parallax hero (inspired by prlx.learnframer.site):
 * sticky viewport + layers at different scroll speeds for depth.
 * Video: replace /video/stan-hero.mp4 with licensed Wawrinka footage when available.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.muted = true;
      void video.play().catch(() => {
        /* autoplay may be blocked; poster remains */
      });
    };

    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    return () => video.removeEventListener("loadeddata", tryPlay);
  }, []);

  useEffect(() => {
    const { gsap } = getGsap();
    const section = sectionRef.current;
    const pin = pinRef.current;
    const videoWrap = videoWrapRef.current;
    const mid = midRef.current;
    const copy = copyRef.current;
    const scrollHint = scrollRef.current;
    if (!section || !pin || !videoWrap || !mid || !copy || !scrollHint) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const words = copy.querySelectorAll(".word");

    const ctx = gsap.context(() => {
      gsap.set(words, { yPercent: 110, opacity: 0 });
      gsap.set(copy.querySelector(".hero-sub"), { opacity: 0, y: 20 });
      gsap.set(copy.querySelector(".hero-meta"), { opacity: 0, y: 12 });
      gsap.set(scrollHint, { opacity: 0 });
      gsap.set(videoWrap, { scale: 1.35, yPercent: -8 });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .to(videoWrap, { scale: 1.22, yPercent: 0, duration: 2.6, ease: "power2.out" }, 0)
        .to(words, { yPercent: 0, opacity: 1, duration: 1.05, stagger: 0.1 }, 0.35)
        .to(copy.querySelector(".hero-meta"), { opacity: 1, y: 0, duration: 0.7 }, 0.9)
        .to(copy.querySelector(".hero-sub"), { opacity: 1, y: 0, duration: 0.8 }, 1.05)
        .to(scrollHint, { opacity: 1, duration: 0.55 }, 1.45);

      if (reduce) return;

      // Sticky parallax: different scroll speeds = Framer "Scroll Speed" depth
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          pin: pin,
          scrub: 0.55,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Background video — slowest layer: keeps overscan so edges never show
      tl.to(
        videoWrap,
        {
          yPercent: 22,
          scale: 1.12,
          ease: "none",
          duration: 1,
        },
        0,
      );

      // Mid haze / grain — medium speed
      tl.to(
        mid,
        {
          yPercent: 40,
          opacity: 0.28,
          ease: "none",
          duration: 1,
        },
        0,
      );

      // Copy — Framer ~0.4 scroll-speed float (rises against the video)
      tl.to(
        copy,
        {
          yPercent: -68,
          ease: "none",
          duration: 1,
        },
        0,
      );

      tl.to(
        scrollHint,
        {
          opacity: 0,
          y: -28,
          ease: "none",
          duration: 0.2,
        },
        0,
      );

      // Soft fade of title as next section approaches
      tl.to(
        copy,
        {
          opacity: 0.12,
          ease: "none",
          duration: 0.35,
        },
        0.65,
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative h-[260svh] bg-obsidian text-paper-white"
      aria-label="Cinematic introduction"
    >
      <div ref={pinRef} className="relative h-[100svh] min-h-[640px] overflow-hidden">
        {/* Layer 0 — video (slow parallax) */}
        <div
          ref={videoWrapRef}
          className="absolute inset-[-18%] will-change-transform"
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/video/stan-hero-poster.jpg"
            aria-label="Tennis footage stand-in for Stan Wawrinka hero reel"
          >
            <source src="/video/stan-hero.mp4" type="video/mp4" />
          </video>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(17,17,17,0.35) 0%, rgba(17,17,17,0.15) 35%, rgba(17,17,17,0.55) 70%, rgba(17,17,17,0.92) 100%)",
            }}
          />
        </div>

        {/* Layer 1 — mid depth veil */}
        <div
          ref={midRef}
          className="pointer-events-none absolute inset-0 will-change-transform"
          aria-hidden
        >
          <div
            className="absolute inset-0 opacity-[0.14] mix-blend-overlay"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.035) 2px, rgba(255,255,255,0.035) 4px)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-1/2"
            style={{
              background:
                "radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.45), transparent 70%)",
            }}
          />
        </div>

        {/* Layer 2 — typography (independent scroll speed) */}
        <div
          ref={copyRef}
          className="relative z-10 flex h-full flex-col justify-end px-6 pb-24 will-change-transform md:px-10 md:pb-28"
        >
          <p className="hero-meta mb-4 text-[12px] font-medium tracking-[0.22em] text-paper-white/70 uppercase">
            1985 — 2026
          </p>
          <h1 className="display-type max-w-[12ch] text-paper-white">
            <span className="block overflow-hidden">
              <span className="word inline-block">Stan</span>
            </span>
            <span className="block overflow-hidden">
              <span className="word inline-block">Wawrinka</span>
            </span>
          </h1>
          <p className="hero-sub mt-5 max-w-md text-[16px] leading-[1.75] text-paper-white/80">
            Three majors. One backhand. A career that refused to settle for almost.
          </p>
        </div>

        <div
          ref={scrollRef}
          className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-[12px] tracking-[0.18em] text-paper-white/60 uppercase"
        >
          <span>Scroll</span>
          <span className="block h-8 w-px origin-top bg-paper-white/40" aria-hidden />
        </div>
      </div>
    </section>
  );
}
