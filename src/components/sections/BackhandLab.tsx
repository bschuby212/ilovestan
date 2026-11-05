"use client";

import { useEffect, useRef } from "react";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { backhandCallouts, backhandSection } from "@/data/backhand";
import { getGsap } from "@/lib/gsap";

const BH_YT_ID = "kyplW6HyR9c";
const BH_YT_START = 126;
const BH_POSTER = `https://i.ytimg.com/vi/${BH_YT_ID}/maxresdefault.jpg`;

function backhandEmbedSrc(playing: boolean) {
  const params = new URLSearchParams({
    autoplay: playing ? "1" : "0",
    mute: "1",
    controls: "0",
    modestbranding: "1",
    rel: "0",
    iv_load_policy: "3",
    fs: "0",
    disablekb: "1",
    playsinline: "1",
    loop: "1",
    playlist: BH_YT_ID,
    start: String(BH_YT_START),
    cc_load_policy: "0",
    enablejsapi: "1",
    vq: "hd1080",
  });
  return `https://www.youtube.com/embed/${BH_YT_ID}?${params.toString()}`;
}

/**
 * Side-by-side: backhand winners video (plays in view) | title + stats.
 * No peer list, no sources, no extra headlines on the media.
 */
export function BackhandLab() {
  const rootRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playingRef = useRef(false);

  useEffect(() => {
    const { gsap, ScrollTrigger } = getGsap();
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const post = (command: "playVideo" | "pauseVideo") => {
      const win = iframeRef.current?.contentWindow;
      if (!win) return;
      win.postMessage(
        JSON.stringify({ event: "command", func: command, args: [] }),
        "*",
      );
    };

    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap.from(root.querySelectorAll(".bh-stat, .bh-head"), {
          y: 28,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 70%" },
        });
      }

      ScrollTrigger.create({
        trigger: root,
        start: "top 70%",
        end: "bottom 30%",
        onEnter: () => {
          playingRef.current = true;
          post("playVideo");
        },
        onEnterBack: () => {
          playingRef.current = true;
          post("playVideo");
        },
        onLeave: () => {
          playingRef.current = false;
          post("pauseVideo");
        },
        onLeaveBack: () => {
          playingRef.current = false;
          post("pauseVideo");
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="backhand"
      ref={rootRef}
      className="bg-paper-white text-obsidian"
      aria-label="Backhand"
    >
      <div className="grid grid-cols-1 border-y border-concrete-gray lg:grid-cols-2">
        {/* Left — backhand winners clip */}
        <div className="relative min-h-[55vh] overflow-hidden bg-obsidian lg:min-h-[100svh]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${BH_POSTER})` }}
          />
          <iframe
            ref={iframeRef}
            title="Stan Wawrinka backhand winners"
            src={backhandEmbedSrc(false)}
            width={1920}
            height={1080}
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-0"
            style={{
              width: "max(100%, 177.78vh)",
              height: "max(100%, 56.25vw)",
              minWidth: 1280,
              minHeight: 720,
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(17,17,17,0.15) 0%, rgba(17,17,17,0.05) 100%)",
            }}
          />
        </div>

        {/* Right — title + stats together */}
        <div className="flex flex-col justify-center gap-12 px-6 py-16 md:px-10 md:py-20 lg:gap-14 lg:px-14 lg:py-24">
          <header className="bh-head max-w-md">
            <p className="text-[12px] font-medium tracking-[0.22em] text-steel uppercase">
              {backhandSection.eyebrow}
            </p>
            <h2 className="mt-3 text-[24px] leading-[1.2] font-medium md:text-[clamp(28px,3.2vw,40px)]">
              {backhandSection.title}
            </h2>
            <p className="mt-4 text-[16px] leading-[1.75] text-steel">
              {backhandSection.lede}
            </p>
          </header>

          <div className="flex flex-col gap-10 lg:gap-12">
            {backhandCallouts.map((stat, i) => (
              <div key={stat.label} className="bh-stat">
                <p className="flex items-baseline gap-3">
                  <AnimatedNumber
                    value={stat.value}
                    format={stat.format}
                    delay={i * 0.1}
                    duration={1.4}
                    start="top 85%"
                    className="display-type text-[clamp(48px,8vw,80px)] leading-[0.9] text-obsidian tabular-nums"
                  />
                  <span className="text-[14px] tracking-[0.08em] text-steel uppercase">
                    {stat.unit}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
