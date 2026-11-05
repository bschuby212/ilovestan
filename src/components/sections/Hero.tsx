"use client";

import { useEffect, useRef, useState } from "react";
import { getGsap } from "@/lib/gsap";

/** Prefer a local screen-record — zero YouTube chrome. */
const LOCAL_SRC = "/video/stan-live.mp4";
const LOCAL_POSTER = "/video/stan-live-poster.jpg";

const YT_ID = "1FD_QiQxrE4";
const YT_TITLE = "Stan Wawrinka";
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
    enablejsapi: "0",
    // No related end-screen UI
    showinfo: "0",
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

/**
 * Hero: name + one line of copy. Video never exposes play/pause —
 * local mp4 if present; otherwise oversized muted YT embed fully masked.
 * Screen-record → public/video/stan-live.mp4 for a clean player-free hero.
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
      gsap.set(media, { scale: 1.14, yPercent: -3 });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .to(media, { scale: 1.06, yPercent: 0, duration: 2.2, ease: "power2.out" }, 0)
        .to(words, { yPercent: 0, opacity: 1, duration: 1.05, stagger: 0.1 }, 0.35)
        .to(copy.querySelector(".hero-line"), { opacity: 1, y: 0, duration: 0.7 }, 0.9);

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
          scrub: 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(media, { yPercent: 12, scale: 1.02, ease: "none", duration: 1 }, 0);
      tl.to(copy, { yPercent: -36, opacity: 0, ease: "none", duration: 1 }, 0);
      tl.to(media, { opacity: 0.35, ease: "none", duration: 0.35 }, 0.65);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative h-[160svh] bg-obsidian text-paper-white"
      aria-label="Stan Wawrinka"
    >
      <div ref={pinRef} className="relative h-[100svh] min-h-[640px] overflow-hidden">
        <div ref={mediaRef} className="absolute inset-[-8%] will-change-transform">
          <div
            className="absolute inset-0 overflow-hidden bg-obsidian bg-cover bg-center"
            style={{ backgroundImage: `url(${useLocal ? LOCAL_POSTER : YT_POSTER})` }}
          >
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
                aria-label={YT_TITLE}
              >
                <source src={LOCAL_SRC} type="video/mp4" />
              </video>
            ) : (
              <iframe
                title={YT_TITLE}
                src={youtubeEmbedSrc(YT_ID)}
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
                loading="eager"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            )}
          </div>

          {/* Full click shield — nothing on the media is interactive */}
          <div className="pointer-events-auto absolute inset-0 z-[1]" aria-hidden />

          <div
            className="pointer-events-none absolute inset-0 z-[2]"
            style={{
              background:
                "linear-gradient(180deg, rgba(17,17,17,0.3) 0%, rgba(17,17,17,0.08) 42%, rgba(17,17,17,0.55) 100%)",
            }}
          />
          {/* Mask residual YT title / logo edges */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[14%] bg-gradient-to-b from-obsidian via-obsidian/70 to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[18%] bg-gradient-to-t from-obsidian/80 to-transparent"
            aria-hidden
          />
        </div>

        {/* Subtle dark wash only behind bottom-left type */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 z-[3] h-[48%] w-full max-w-[920px]"
          style={{
            background:
              "radial-gradient(ellipse 85% 75% at 18% 88%, rgba(17,17,17,0.72) 0%, rgba(17,17,17,0.35) 42%, rgba(17,17,17,0) 72%)",
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
