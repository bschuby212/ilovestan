"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

/** Stan highlight reel — YouTube embed (UI cropped/hidden as much as allowed). */
const YT_ID = "1FD_QiQxrE4";
const YT_TITLE = "Stan Wawrinka's Greatest Shots & Moments — ATP Tour";
const YT_POSTER = `https://i.ytimg.com/vi/${YT_ID}/maxresdefault.jpg`;

function youtubeEmbedSrc(id: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    controls: "0",
    modestbranding: "1",
    rel: "0",
    iv_load_policy: "3",
    fs: "0",
    disablekb: "1",
    playsinline: "1",
    loop: "1",
    playlist: id,
    cc_load_policy: "0",
    enablejsapi: "1",
  });
  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}

/**
 * Full-bleed hero YouTube + Framer-style parallax.
 * Shorter pin so the handoff into metrics feels continuous — not a long empty scrub.
 * YouTube chrome suppressed via params + scale/crop; screen-record local mp4 if it still leaks.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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
      gsap.set(media, { scale: 1.18, yPercent: -4 });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .to(media, { scale: 1.08, yPercent: 0, duration: 2.2, ease: "power2.out" }, 0)
        .to(words, { yPercent: 0, opacity: 1, duration: 1.05, stagger: 0.1 }, 0.35)
        .to(
          copy.querySelectorAll(".hero-fade"),
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          0.95,
        )
        .to(scrollHint, { opacity: 1, duration: 0.5 }, 1.3);

      if (reduce) {
        gsap.set(media, { scale: 1.05, yPercent: 0 });
        return;
      }

      // Compact scrub — leave into metrics on the same dark field
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          pin: pin,
          scrub: 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(media, { yPercent: 14, scale: 1.02, ease: "none", duration: 1 }, 0);
      tl.to(copy, { yPercent: -42, opacity: 0, ease: "none", duration: 1 }, 0);
      tl.to(scrollHint, { opacity: 0, y: -16, ease: "none", duration: 0.2 }, 0);
      // Soft dissolve toward next section (metrics share obsidian)
      tl.to(media, { opacity: 0.35, ease: "none", duration: 0.35 }, 0.65);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative h-[170svh] bg-obsidian text-paper-white"
      aria-label="Cinematic introduction"
    >
      <div ref={pinRef} className="relative h-[100svh] min-h-[640px] overflow-hidden">
        <div ref={mediaRef} className="absolute inset-[-10%] will-change-transform">
          <div
            className="absolute inset-0 overflow-hidden bg-obsidian bg-cover bg-center"
            style={{ backgroundImage: `url(${YT_POSTER})` }}
          >
            <iframe
              title={YT_TITLE}
              src={youtubeEmbedSrc(YT_ID)}
              className="pointer-events-none absolute top-1/2 left-1/2 h-[185%] w-[185%] max-w-none -translate-x-1/2 -translate-y-1/2 border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen={false}
              loading="eager"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(17,17,17,0.5) 0%, rgba(17,17,17,0.18) 38%, rgba(17,17,17,0.88) 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[16%] bg-gradient-to-b from-obsidian via-obsidian/65 to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[24%] bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent"
            aria-hidden
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
            <a href="#titles-overview" className="pill pill--light">
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
