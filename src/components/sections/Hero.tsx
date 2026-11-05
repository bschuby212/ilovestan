"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { stanMedia } from "@/data/media";
import { getGsap } from "@/lib/gsap";

/**
 * Framer-style multi-speed parallax (prlx.learnframer.site pattern)
 * using authentic Stan photography. Drop licensed match film at
 * /public/video/stan-hero.mp4 to replace the still stack.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const videoSlotRef = useRef<HTMLVideoElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoSlotRef.current;
    if (!video) return;
    // Only play if a real authorized file is present (source resolves)
    const source = video.querySelector("source");
    if (!source?.getAttribute("src")) return;

    fetch(source.getAttribute("src")!, { method: "HEAD" })
      .then((res) => {
        if (!res.ok) return;
        video.dataset.ready = "true";
        video.muted = true;
        void video.play().catch(() => undefined);
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    const { gsap } = getGsap();
    const section = sectionRef.current;
    const pin = pinRef.current;
    const back = backRef.current;
    const mid = midRef.current;
    const copy = copyRef.current;
    const scrollHint = scrollRef.current;
    if (!section || !pin || !back || !mid || !copy || !scrollHint) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const words = copy.querySelectorAll(".word");

    const ctx = gsap.context(() => {
      gsap.set(words, { yPercent: 110, opacity: 0 });
      gsap.set(copy.querySelectorAll(".hero-fade"), { opacity: 0, y: 16 });
      gsap.set(scrollHint, { opacity: 0 });
      gsap.set(back, { scale: 1.28, yPercent: -8 });
      gsap.set(mid, { scale: 1.18, yPercent: 6 });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .to(back, { scale: 1.14, yPercent: 0, duration: 2.5, ease: "power2.out" }, 0)
        .to(mid, { scale: 1.08, yPercent: 0, duration: 2.5, ease: "power2.out" }, 0)
        .to(words, { yPercent: 0, opacity: 1, duration: 1.05, stagger: 0.1 }, 0.4)
        .to(copy.querySelectorAll(".hero-fade"), { opacity: 1, y: 0, duration: 0.75, stagger: 0.08 }, 1.0)
        .to(scrollHint, { opacity: 1, duration: 0.5 }, 1.4);

      if (reduce) return;

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

      // Slowest layer — primary Stan backhand
      tl.to(back, { yPercent: 24, scale: 1.06, ease: "none", duration: 1 }, 0);
      // Mid depth — second Stan still (faster)
      tl.to(mid, { yPercent: -18, scale: 1.16, ease: "none", duration: 1 }, 0);
      // Copy — Framer ~0.4 scroll speed float
      tl.to(copy, { yPercent: -62, ease: "none", duration: 1 }, 0);
      tl.to(scrollHint, { opacity: 0, y: -20, ease: "none", duration: 0.2 }, 0);
      tl.to(copy, { opacity: 0.12, ease: "none", duration: 0.3 }, 0.7);
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
        {/* Layer 0 — authentic Stan backhand (slow) */}
        <div ref={backRef} className="absolute inset-[-14%] will-change-transform">
          <Image
            src={stanMedia.hero.src}
            alt={stanMedia.hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_30%]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(17,17,17,0.45) 0%, rgba(17,17,17,0.2) 40%, rgba(17,17,17,0.72) 100%)",
            }}
          />
        </div>

        {/* Layer 1 — depth still (masked, faster parallax) */}
        <div
          ref={midRef}
          className="pointer-events-none absolute inset-y-[12%] right-[-8%] left-[42%] overflow-hidden opacity-55 will-change-transform mix-blend-luminosity max-md:hidden"
          aria-hidden
        >
          <Image
            src={stanMedia.heroDepth.src}
            alt=""
            fill
            sizes="55vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-obsidian/30" />
        </div>

        {/* Optional authorized video slot — only visible when file exists */}
        <video
          ref={videoSlotRef}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 data-[ready=true]:opacity-100"
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
        >
          <source src="/video/stan-hero.mp4" type="video/mp4" />
        </video>

        {/* Typography layer */}
        <div
          ref={copyRef}
          className="relative z-10 flex h-full flex-col justify-end px-6 pb-24 will-change-transform md:px-10 md:pb-28"
        >
          <p className="hero-fade mb-4 text-[12px] font-medium tracking-[0.22em] text-paper-white/70 uppercase">
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
          <p className="hero-fade mt-5 max-w-md text-[16px] leading-[1.75] text-paper-white/80">
            Three majors. One backhand. A career that refused to settle for almost.
          </p>
          <div className="hero-fade mt-8">
            <a href="#grand-slams" className="pill pill--light">
              Enter the journey
            </a>
          </div>
          <p className="hero-fade mt-6 max-w-md text-[12px] leading-[1.5] text-faint-gray">
            {stanMedia.hero.credit}. Authorized match video pending —
            drop it in as <span className="text-paper-white/75">/video/stan-hero.mp4</span>.
          </p>
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
