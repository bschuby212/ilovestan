"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

const HIGHLIGHTS_SRC = "/video/stan-highlights.mp4";
const HIGHLIGHTS_POSTER = "/video/stan-highlights-poster.jpg";

/**
 * Full-bleed career-highlights video background + Framer-style parallax.
 * Reel is built from authentic Stan Wikimedia stills (Ken Burns montage)
 * until licensed match film replaces /video/stan-highlights.mp4.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.muted = true;
      video.playsInline = true;
      void video.play().catch(() => undefined);
    };

    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);

    const onVisibility = () => {
      if (document.hidden) video.pause();
      else tryPlay();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    const { gsap } = getGsap();
    const section = sectionRef.current;
    const pin = pinRef.current;
    const media = mediaRef.current;
    const copy = copyRef.current;
    const scrollHint = scrollRef.current;
    if (!section || !pin || !media || !copy || !scrollHint) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const words = copy.querySelectorAll(".word");

    const ctx = gsap.context(() => {
      gsap.set(words, { yPercent: 110, opacity: 0 });
      gsap.set(copy.querySelectorAll(".hero-fade"), { opacity: 0, y: 16 });
      gsap.set(scrollHint, { opacity: 0 });
      gsap.set(media, { scale: 1.24, yPercent: -6 });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .to(media, { scale: 1.12, yPercent: 0, duration: 2.4, ease: "power2.out" }, 0)
        .to(words, { yPercent: 0, opacity: 1, duration: 1.05, stagger: 0.1 }, 0.35)
        .to(
          copy.querySelectorAll(".hero-fade"),
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          0.95,
        )
        .to(scrollHint, { opacity: 1, duration: 0.5 }, 1.35);

      if (reduce) {
        gsap.set(media, { scale: 1.08, yPercent: 0 });
        return;
      }

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

      tl.to(media, { yPercent: 22, scale: 1.04, ease: "none", duration: 1 }, 0);
      tl.to(copy, { yPercent: -58, ease: "none", duration: 1 }, 0);
      tl.to(scrollHint, { opacity: 0, y: -20, ease: "none", duration: 0.2 }, 0);
      tl.to(copy, { opacity: 0.15, ease: "none", duration: 0.3 }, 0.7);
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
        <div ref={mediaRef} className="absolute inset-[-14%] will-change-transform">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={HIGHLIGHTS_POSTER}
            aria-label="Stan Wawrinka career highlights reel"
          >
            <source src={HIGHLIGHTS_SRC} type="video/mp4" />
          </video>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(17,17,17,0.52) 0%, rgba(17,17,17,0.18) 40%, rgba(17,17,17,0.82) 100%)",
            }}
          />
        </div>

        <div
          ref={copyRef}
          className="relative z-10 flex h-full flex-col justify-end px-6 pb-24 will-change-transform md:px-10 md:pb-28"
        >
          <p className="hero-fade mb-4 text-[12px] font-medium tracking-[0.22em] text-paper-white/70 uppercase">
            Career highlights · 1985 — 2026
          </p>
          <h1 className="display-type max-w-[12ch] text-paper-white">
            <span className="block overflow-hidden">
              <span className="word inline-block">Stan</span>
            </span>
            <span className="block overflow-hidden">
              <span className="word inline-block">Wawrinka</span>
            </span>
          </h1>
          <p className="hero-fade mt-5 max-w-md text-[16px] leading-[1.75] text-paper-white/80">
            Three majors. One backhand. A career that refused to settle for almost.
          </p>
          <div className="hero-fade mt-8">
            <a href="#grand-slams" className="pill pill--light">
              Enter the journey
            </a>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-[12px] tracking-[0.18em] text-paper-white/60 uppercase"
        >
          <span>Scroll</span>
          <span className="block h-8 w-px bg-paper-white/40" aria-hidden />
        </div>
      </div>
    </section>
  );
}
