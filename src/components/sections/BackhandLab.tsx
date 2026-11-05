"use client";

import { Crosshair } from "lucide-react";
import { useEffect, useRef } from "react";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { SectionHeading } from "@/components/SectionHeading";
import { backhandCallouts, backhandSection } from "@/data/backhand";
import { getGsap } from "@/lib/gsap";

const BH_YT_ID = "kyplW6HyR9c";
const BH_YT_START = 126;
const BH_POSTER = `https://i.ytimg.com/vi/${BH_YT_ID}/maxresdefault.jpg`;

function backhandEmbedSrc() {
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
    playlist: BH_YT_ID,
    start: String(BH_YT_START),
    cc_load_policy: "0",
    enablejsapi: "1",
  });
  return `https://www.youtube-nocookie.com/embed/${BH_YT_ID}?${params.toString()}`;
}

/**
 * Video (autoplay in view, no chrome) | title + stacked metrics with explanations.
 */
export function BackhandLab() {
  const rootRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = getGsap();
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const post = (command: "playVideo" | "pauseVideo") => {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: command, args: [] }),
        "*",
      );
    };

    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap.from(root.querySelectorAll(".bh-stat, .bh-head"), {
          y: 24,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 72%" },
        });
      }

      ScrollTrigger.create({
        trigger: root,
        start: "top 65%",
        end: "bottom 35%",
        onEnter: () => post("playVideo"),
        onEnterBack: () => post("playVideo"),
        onLeave: () => post("pauseVideo"),
        onLeaveBack: () => post("pauseVideo"),
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
        <div className="relative min-h-[55vh] overflow-hidden bg-obsidian lg:min-h-[100svh]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${BH_POSTER})` }}
          />
          <iframe
            ref={iframeRef}
            title="Stan Wawrinka backhand winners"
            src={backhandEmbedSrc()}
            width={1920}
            height={1080}
            tabIndex={-1}
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-0"
            style={{
              width: "max(100%, 177.78vh)",
              height: "max(100%, 56.25vw)",
              minWidth: 1280,
              minHeight: 720,
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
          {/* Kill YT chrome / play button / captions */}
          <div className="pointer-events-auto absolute inset-0 z-[1]" aria-hidden />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[16%] bg-gradient-to-b from-obsidian via-obsidian/60 to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[22%] bg-gradient-to-t from-obsidian via-obsidian/70 to-transparent"
            aria-hidden
          />
        </div>

        <div className="flex flex-col justify-center px-6 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24">
          <div className="bh-head">
            <SectionHeading
              eyebrow={backhandSection.eyebrow}
              title={backhandSection.title}
              icon={Crosshair}
            />
            <p className="mt-4 max-w-md text-[16px] leading-[1.75] text-steel">
              {backhandSection.lede}
            </p>
          </div>

          <div className="mt-14 flex flex-col gap-14 md:mt-16 md:gap-16">
            {backhandCallouts.map((stat, i) => (
              <div key={stat.label} className="bh-stat border-t border-concrete-gray pt-6">
                <p className="text-[12px] font-medium tracking-[0.16em] text-steel uppercase">
                  {stat.label}
                </p>
                <p className="mt-3 flex items-baseline gap-3">
                  <AnimatedNumber
                    value={stat.value}
                    format={stat.format}
                    delay={i * 0.1}
                    duration={1.4}
                    start="top 85%"
                    className="display-type text-[clamp(48px,7vw,80px)] leading-[0.9] text-obsidian tabular-nums"
                  />
                  <span className="text-[14px] tracking-[0.06em] text-steel uppercase">
                    {stat.unit}
                  </span>
                </p>
                <p className="mt-4 max-w-sm text-[15px] leading-[1.65] text-steel">
                  {stat.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
