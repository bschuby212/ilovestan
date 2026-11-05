"use client";

import { Feather } from "lucide-react";
import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

const WIN_YT = "1FD_QiQxrE4";
const WIN_POSTER = `https://i.ytimg.com/vi/${WIN_YT}/maxresdefault.jpg`;

function winEmbedSrc() {
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
    playlist: WIN_YT,
    cc_load_policy: "0",
    enablejsapi: "1",
  });
  return `https://www.youtube-nocookie.com/embed/${WIN_YT}?${params.toString()}`;
}

const stages = [
  {
    id: "ink",
    eyebrow: "Left forearm",
    title: "Ever tried. Ever failed. No matter.",
    body: "Try again. Fail again. Fail better.",
  },
  {
    id: "vow",
    eyebrow: "The vow",
    title: "Ink before the climb.",
    body: "Beckett on skin — a private line he carried into every fifth set.",
  },
  {
    id: "loss",
    eyebrow: "Melbourne 2013",
    title: "Then he lost.",
    body: "Australian Open semi — heartbreak that made the tattoo mean something.",
  },
] as const;

const updates = [
  { year: "2014", text: "Australian Open champion — first Slam." },
  { year: "2015", text: "Roland-Garros — the clay crown." },
  { year: "2016", text: "US Open — third major, again vs No. 1." },
] as const;

/**
 * Sticky left winners video. Right panel crossfades through 2 stages,
 * then the loss — then a short updates strip below.
 */
export function FailBetter() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const { gsap, ScrollTrigger } = getGsap();
    const root = rootRef.current;
    const pin = pinRef.current;
    if (!root || !pin) return;

    const post = (command: "playVideo" | "pauseVideo") => {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: command, args: [] }),
        "*",
      );
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const panels = stageRefs.current.filter(Boolean) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        start: "top 70%",
        end: "bottom 30%",
        onEnter: () => post("playVideo"),
        onEnterBack: () => post("playVideo"),
        onLeave: () => post("pauseVideo"),
        onLeaveBack: () => post("pauseVideo"),
      });

      if (reduce || panels.length === 0) {
        panels.forEach((p, i) => gsap.set(p, { opacity: i === 0 ? 1 : 0 }));
        return;
      }

      gsap.set(panels, { opacity: 0 });
      gsap.set(panels[0], { opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=220%",
          pin: pin,
          scrub: 0.45,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      panels.forEach((panel, i) => {
        if (i === 0) return;
        const prev = panels[i - 1]!;
        tl.to(prev, { opacity: 0, duration: 0.35, ease: "none" }, i - 0.15);
        tl.fromTo(
          panel,
          { opacity: 0 },
          { opacity: 1, duration: 0.35, ease: "none" },
          i - 0.15,
        );
      });
      // Hold final stage briefly
      tl.to({}, { duration: 0.4 });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        id="fail-better"
        ref={rootRef}
        className="relative bg-obsidian text-paper-white"
        aria-label="Fail better"
      >
        <div ref={pinRef} className="grid min-h-[100svh] grid-cols-1 lg:grid-cols-2">
          {/* Left — sticky media, no internal scroll */}
          <div className="relative min-h-[45vh] overflow-hidden bg-obsidian lg:min-h-[100svh]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${WIN_POSTER})` }}
            />
            <iframe
              ref={iframeRef}
              title="Stan Wawrinka winning moments"
              src={winEmbedSrc()}
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
            />
            <div className="pointer-events-auto absolute inset-0 z-[1]" aria-hidden />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[16%] bg-gradient-to-b from-obsidian/80 to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[26%] bg-gradient-to-t from-obsidian via-obsidian/75 to-transparent"
              aria-hidden
            />
          </div>

          {/* Right — staged copy */}
          <div className="relative flex min-h-[55vh] items-center px-6 py-16 md:px-10 lg:min-h-[100svh] lg:px-14">
            <div className="relative w-full max-w-md">
              {stages.map((stage, i) => (
                <div
                  key={stage.id}
                  ref={(el) => {
                    stageRefs.current[i] = el;
                  }}
                  className={i === 0 ? "relative" : "absolute inset-0"}
                  aria-hidden={i !== 0}
                >
                  <p className="flex items-center gap-2 text-[12px] font-medium tracking-[0.18em] text-faint-gray uppercase">
                    <Feather className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden />
                    {stage.eyebrow}
                  </p>
                  <p className="mt-6 text-[24px] leading-[1.35] font-medium md:text-[28px]">
                    {stage.title}
                  </p>
                  <p className="mt-5 text-[16px] leading-[1.7] text-paper-white/70">
                    {stage.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mini updates after the loss */}
      <section
        id="fail-better-updates"
        className="border-t border-white/10 bg-obsidian text-paper-white"
        aria-label="What came after"
      >
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-6 py-14 md:flex-row md:items-end md:justify-between md:px-10 md:py-16">
          <div>
            <p className="text-[12px] font-medium tracking-[0.18em] text-faint-gray uppercase">
              After the loss
            </p>
            <p className="mt-3 max-w-[28ch] text-[22px] font-medium md:text-[26px]">
              Then the majors arrived.
            </p>
          </div>
          <ul className="flex flex-col gap-4 sm:flex-row sm:gap-10">
            {updates.map((u) => (
              <li key={u.year} className="max-w-[22ch]">
                <p className="text-[13px] tabular-nums text-faint-gray">{u.year}</p>
                <p className="mt-1 text-[15px] leading-[1.5] text-paper-white/80">{u.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
