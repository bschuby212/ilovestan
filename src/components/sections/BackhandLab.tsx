"use client";

import { useEffect, useRef } from "react";
import { AnimatedNumber } from "@/components/AnimatedNumber";
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

const stats = [
  {
    label: "Average pace",
    value: 75,
    unit: "mph",
    detail: "Hawk-Eye · AO 2014–16",
    format: "plain" as const,
  },
  {
    label: "Average spin",
    value: 2500,
    unit: "RPM",
    detail: "One-hand drive",
    format: "comma" as const,
  },
  {
    label: "Final winners",
    value: 60,
    unit: "RG ’15",
    detail: "Roland-Garros final",
    format: "plain" as const,
  },
];

/**
 * Backhand only — winners video + three clear stats. No career clutter.
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
        gsap.from(root.querySelectorAll(".bh-fade"), {
          y: 22,
          opacity: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 70%" },
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
      className="relative min-h-[100svh] overflow-hidden bg-obsidian text-paper-white"
      aria-label="One-handed backhand"
    >
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
      />
      <div className="pointer-events-auto absolute inset-0 z-[1]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(90deg, rgba(17,17,17,0.2) 0%, rgba(17,17,17,0.45) 48%, rgba(17,17,17,0.78) 100%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[30%] bg-gradient-to-t from-obsidian via-obsidian/70 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[100svh] items-center justify-end px-6 py-20 md:px-10 lg:px-14">
        <div className="w-full max-w-[480px]">
          <h2 className="bh-fade display-type text-[clamp(32px,4.5vw,48px)] leading-[1.05] text-paper-white">
            One-handed
            <br />
            backhand
          </h2>

          <div className="bh-fade mt-10 grid grid-cols-1 border border-white/30 bg-obsidian/50 backdrop-blur-[1px] sm:grid-cols-3">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`px-5 py-6 ${
                  i < stats.length - 1
                    ? "border-b border-white/25 sm:border-r sm:border-b-0"
                    : ""
                }`}
              >
                <p className="text-[10px] font-medium tracking-[0.16em] text-paper-white/65 uppercase">
                  {stat.label}
                </p>
                <p className="mt-3 flex items-baseline gap-2">
                  <AnimatedNumber
                    value={stat.value}
                    format={stat.format}
                    delay={i * 0.08}
                    duration={1.2}
                    start="top 80%"
                    className="display-type text-[40px] leading-none tabular-nums text-paper-white"
                  />
                  <span className="text-[12px] tracking-[0.06em] text-paper-white/60 uppercase">
                    {stat.unit}
                  </span>
                </p>
                <p className="mt-2 text-[12px] text-paper-white/55">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
