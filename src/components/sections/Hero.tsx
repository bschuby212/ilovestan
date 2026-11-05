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
 * Hero: name + one line. Local video if present; otherwise a sharp still.
 * No YouTube embed (bot walls / play UI break the handoff under the hero).
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
    const words = copy.querySelectorAll(".word");

    const ctx = gsap.context(() => {
      gsap.set(words, { yPercent: 110, opacity: 0 });
      gsap.set(copy.querySelector(".hero-line"), { opacity: 0, y: 12 });
      gsap.set(media, { scale: 1.12, yPercent: -2 });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .to(media, { scale: 1.05, yPercent: 0, duration: 2, ease: "power2.out" }, 0)
        .to(words, { yPercent: 0, opacity: 1, duration: 1, stagger: 0.1 }, 0.3)
        .to(copy.querySelector(".hero-line"), { opacity: 1, y: 0, duration: 0.65 }, 0.85);

      if (reduce) {
        gsap.set(media, { scale: 1.04, yPercent: 0 });
        gsap.set(words, { yPercent: 0, opacity: 1 });
        gsap.set(copy.querySelector(".hero-line"), { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          pin: pin,
          scrub: 0.35,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(media, { yPercent: 10, scale: 1.02, ease: "none", duration: 1 }, 0);
      tl.to(copy, { yPercent: -28, opacity: 0, ease: "none", duration: 1 }, 0);
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
                "linear-gradient(180deg, rgba(17,17,17,0.28) 0%, rgba(17,17,17,0.1) 45%, rgba(17,17,17,0.72) 100%)",
            }}
          />
        </div>

        <div
          className="pointer-events-none absolute bottom-0 left-0 z-[3] h-[46%] w-full max-w-[900px]"
          style={{
            background:
              "radial-gradient(ellipse 85% 75% at 16% 90%, rgba(17,17,17,0.7) 0%, rgba(17,17,17,0.3) 45%, rgba(17,17,17,0) 72%)",
          }}
          aria-hidden
        />

        <div
          ref={copyRef}
          className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 will-change-transform md:px-10 md:pb-24"
        >
          <h1 className="display-type max-w-[12ch] text-paper-white">
            <span className="block overflow-hidden">
              <span className="word inline-block">Stan</span>
            </span>
            <span className="block overflow-hidden">
              <span className="word inline-block">Wawrinka</span>
            </span>
          </h1>
          <p className="hero-line mt-5 max-w-xl text-[20px] leading-[1.5] text-paper-white/85">
            Three Grand Slams. One backhand.
          </p>
        </div>
      </div>
    </section>
  );
}
