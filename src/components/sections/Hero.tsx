"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getGsap } from "@/lib/gsap";
import { stanMedia } from "@/data/media";

const LOCAL_SRC = "/video/stan-live.mp4";
const LOCAL_POSTER = "/video/stan-live-poster.jpg";
const STILL = stanMedia.hero;
const CARD_STILL = stanMedia.portrait;

const stats = [
  { value: "3", label: "Grand Slam singles titles" },
  { value: "1", label: "Olympic gold — Beijing doubles" },
  { value: "16", label: "ATP tour-level singles titles" },
] as const;

/**
 * Xurya-style hero — rounded media frame, glass project card,
 * L-cutout stats panel. Brand name is the headline.
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
        y: 24,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.15,
      });
      gsap.from(root.querySelector(".hero-media-scale"), {
        scale: 1.06,
        duration: 1.6,
        ease: "power2.out",
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="bg-[#f3f4f6] text-obsidian"
      aria-label="Stan Wawrinka"
    >
      <div className="mx-auto max-w-[1440px] px-4 pt-20 pb-8 md:px-8 md:pt-24 md:pb-12 lg:px-10">
        {/* Frame: media + bottom-right stats cutout */}
        <div className="relative">
          <div className="relative isolate overflow-hidden rounded-[28px] md:rounded-[40px] lg:rounded-[48px]">
            {/* Media */}
            <div className="hero-media-scale relative min-h-[min(78svh,820px)] w-full overflow-hidden">
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
                    "linear-gradient(115deg, rgba(17,17,17,0.55) 0%, rgba(17,17,17,0.2) 42%, rgba(17,17,17,0.15) 100%), linear-gradient(180deg, rgba(17,17,17,0.2) 0%, transparent 35%, rgba(17,17,17,0.35) 100%)",
                }}
              />
            </div>

            {/* Copy — left */}
            <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 pb-28 md:justify-center md:p-10 md:pb-10 lg:p-14">
              <div className="max-w-[18ch] md:max-w-[20ch]">
                <p className="hero-anim text-[13px] font-medium tracking-[0.04em] text-white/75 md:text-[14px]">
                  Three-time Grand Slam champion
                </p>
                <h1 className="hero-anim display-type mt-3 text-[clamp(40px,6.5vw,72px)] leading-[1.02] text-white">
                  Stan
                  <br />
                  Wawrinka
                </h1>
                <div className="hero-anim mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
                  <a
                    href="#fail-better"
                    className="inline-flex items-center gap-1.5 border-b border-white/80 pb-0.5 text-[14px] font-medium text-white transition-opacity hover:opacity-75"
                  >
                    Fail better
                    <ArrowUpRight className="size-3.5" strokeWidth={2} aria-hidden />
                  </a>
                  <a
                    href="#grand-slams"
                    className="inline-flex items-center gap-1.5 border-b border-white/80 pb-0.5 text-[14px] font-medium text-white transition-opacity hover:opacity-75"
                  >
                    The trophies
                    <ArrowUpRight className="size-3.5" strokeWidth={2} aria-hidden />
                  </a>
                </div>
              </div>
            </div>

            {/* Glass project card — right */}
            <a
              href="#backhand"
              className="hero-anim absolute top-[18%] right-5 z-20 hidden w-[200px] overflow-hidden rounded-[22px] border border-white/35 bg-white/18 shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-md transition-transform duration-500 hover:-translate-y-1 md:right-8 md:block lg:right-12 lg:w-[220px]"
            >
              <div className="relative aspect-[4/3] m-2.5 overflow-hidden rounded-[16px]">
                <Image
                  src={CARD_STILL.src}
                  alt={CARD_STILL.alt}
                  fill
                  sizes="220px"
                  className="object-cover object-top"
                />
                <span className="absolute bottom-2 left-2 flex size-8 items-center justify-center rounded-full bg-white/90 text-obsidian">
                  <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden />
                </span>
              </div>
              <p className="px-3.5 pt-1 pb-4 text-[14px] leading-[1.35] font-medium text-white">
                Discover the one-handed backhand
              </p>
            </a>

            {/* Bottom-right notch filler so media doesn't show under stats on mobile stack */}
            <div
              className="pointer-events-none absolute right-0 bottom-0 z-[5] hidden h-[132px] w-[min(100%,560px)] bg-[#f3f4f6] md:block"
              aria-hidden
            />
            {/* Concave corner accents */}
            <div
              className="pointer-events-none absolute bottom-[132px] right-0 z-[6] hidden h-8 w-8 bg-[#f3f4f6] md:block"
              style={{
                maskImage: "radial-gradient(circle at 0 0, transparent 32px, #000 32.5px)",
                WebkitMaskImage:
                  "radial-gradient(circle at 0 0, transparent 32px, #000 32.5px)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute right-[min(100%,560px)] bottom-0 z-[6] hidden h-8 w-8 bg-[#f3f4f6] md:block"
              style={{
                maskImage: "radial-gradient(circle at 0 0, transparent 32px, #000 32.5px)",
                WebkitMaskImage:
                  "radial-gradient(circle at 0 0, transparent 32px, #000 32.5px)",
              }}
              aria-hidden
            />
          </div>

          {/* Stats cutout */}
          <div className="hero-anim relative z-10 mt-4 rounded-[24px] bg-white p-6 md:absolute md:right-0 md:bottom-0 md:mt-0 md:w-[min(100%,560px)] md:rounded-tl-[32px] md:rounded-tr-none md:rounded-br-[40px] md:rounded-bl-none md:p-8 lg:p-9">
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="display-type text-[clamp(28px,3.2vw,40px)] leading-none text-obsidian">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[11px] leading-[1.4] text-steel md:text-[12px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
