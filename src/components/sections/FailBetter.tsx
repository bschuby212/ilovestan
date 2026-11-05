"use client";

import { Feather } from "lucide-react";
import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

const WIN_YT = "1FD_QiQxrE4";
const WIN_POSTER = `https://i.ytimg.com/vi/${WIN_YT}/maxresdefault.jpg`;
const LOCAL_WIN = "/video/stan-live.mp4";

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

/**
 * Fail Better — left: winner video (no chrome/captions).
 * Right: Beckett definition in normal type — no tattoo photo, no giant display font.
 */
export function FailBetter() {
  const rootRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = getGsap();
    const root = rootRef.current;
    if (!root) return;

    const post = (command: "playVideo" | "pauseVideo") => {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: command, args: [] }),
        "*",
      );
    };

    let useLocal = false;
    fetch(LOCAL_WIN, { method: "HEAD" })
      .then((r) => {
        if (r.ok) useLocal = true;
      })
      .catch(() => undefined);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        start: "top 70%",
        end: "bottom 30%",
        onEnter: () => {
          post("playVideo");
          if (useLocal) void videoRef.current?.play().catch(() => undefined);
        },
        onEnterBack: () => {
          post("playVideo");
          if (useLocal) void videoRef.current?.play().catch(() => undefined);
        },
        onLeave: () => {
          post("pauseVideo");
          videoRef.current?.pause();
        },
        onLeaveBack: () => {
          post("pauseVideo");
          videoRef.current?.pause();
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="fail-better"
      ref={rootRef}
      className="relative bg-obsidian text-paper-white"
      aria-label="Fail better"
    >
      <div className="grid min-h-[90svh] grid-cols-1 lg:grid-cols-2">
        {/* Left — winner clip, chrome + captions masked */}
        <div className="relative min-h-[50vh] overflow-hidden bg-obsidian lg:min-h-full">
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
            className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[18%] bg-gradient-to-b from-obsidian via-obsidian/70 to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[28%] bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent"
            aria-hidden
          />
        </div>

        {/* Right — definition only */}
        <div className="flex flex-col justify-center px-6 py-16 md:px-10 md:py-20 lg:px-14">
          <p className="flex items-center gap-2 text-[12px] font-medium tracking-[0.18em] text-faint-gray uppercase">
            <Feather className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden />
            Left forearm
          </p>
          <p className="mt-6 max-w-md text-[22px] leading-[1.45] font-medium md:text-[26px]">
            Ever tried. Ever failed. No matter.
            <br />
            Try again. Fail again. Fail better.
          </p>
          <p className="mt-6 max-w-md text-[16px] leading-[1.7] text-paper-white/70">
            Beckett, inked after the 2013 Australian Open heartbreak — then the
            first Slam in 2014.
          </p>
        </div>
      </div>
    </section>
  );
}
