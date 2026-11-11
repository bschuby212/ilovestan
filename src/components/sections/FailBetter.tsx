"use client";

import { Feather } from "lucide-react";
import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";
import { stanMedia } from "@/data/media";

const LOCAL_WIN = "/video/stan-highlights.mp4";
const LOCAL_POSTER = "/video/stan-highlights-poster.jpg";
const STILL = stanMedia.heroDepth;

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
    title: "He wore the line before the titles.",
    body: "Beckett inked after heartbreak — a reminder for every fifth set still to come.",
  },
  {
    id: "loss",
    eyebrow: "Melbourne 2013",
    title: "Then the semi ended.",
    body: "Australian Open — the loss that made the tattoo permanent.",
  },
] as const;

const updates = [
  { year: "2014", text: "First Slam — Nadal in the AO final." },
  { year: "2015", text: "Roland-Garros — Djokovic on clay." },
  { year: "2016", text: "US Open — third major, same No. 1." },
] as const;

/**
 * Sticky left winners video (local). Right panel stages through 2 beats,
 * then the loss — then a short updates strip below.
 */
export function FailBetter() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.playsInline = true;
    const tryPlay = () => void video.play().catch(() => undefined);
    video.addEventListener("loadeddata", tryPlay);
    tryPlay();
    return () => video.removeEventListener("loadeddata", tryPlay);
  }, []);

  useEffect(() => {
    const { gsap, ScrollTrigger } = getGsap();
    const root = rootRef.current;
    const pin = pinRef.current;
    if (!root || !pin) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const panels = stageRefs.current.filter(Boolean) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        start: "top 70%",
        end: "bottom 30%",
        onEnter: () => void videoRef.current?.play().catch(() => undefined),
        onEnterBack: () => void videoRef.current?.play().catch(() => undefined),
        onLeave: () => videoRef.current?.pause(),
        onLeaveBack: () => videoRef.current?.pause(),
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
      tl.to({}, { duration: 0.4 });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        id="fail-better"
        ref={rootRef}
        className="relative bg-[#111] text-[#fff]"
        aria-label="Fail better"
      >
        <div ref={pinRef} className="grid min-h-[100svh] grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[45vh] overflow-hidden bg-[#111] lg:min-h-[100svh]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${STILL.src})` }}
            />
            <video
              ref={videoRef}
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={LOCAL_POSTER}
              controls={false}
              disablePictureInPicture
            >
              <source src={LOCAL_WIN} type="video/mp4" />
            </video>
          </div>

          <div className="relative flex min-h-[55vh] items-center px-6 py-16 md:px-10 lg:min-h-[100svh] lg:px-14">
            <div className="relative w-full max-w-md" style={{ color: "#ffffff" }}>
              {stages.map((stage, i) => (
                <div
                  key={stage.id}
                  ref={(el) => {
                    stageRefs.current[i] = el;
                  }}
                  className={i === 0 ? "relative" : "absolute inset-0"}
                  aria-hidden={i !== 0}
                >
                  <p
                    className="flex items-center gap-2 text-[12px] font-medium tracking-[0.18em] uppercase"
                    style={{ color: "#9e9ea0" }}
                  >
                    <Feather className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden />
                    {stage.eyebrow}
                  </p>
                  <p className="mt-6 text-[24px] leading-[1.35] font-medium md:text-[28px]">
                    {stage.title}
                  </p>
                  <p
                    className="mt-5 text-[16px] leading-[1.7]"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    {stage.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="fail-better-updates"
        className="border-t border-white/10 bg-[#111] text-[#fff]"
        aria-label="What came after"
      >
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-6 py-14 md:flex-row md:items-end md:justify-between md:px-10 md:py-16">
          <div>
            <p
              className="text-[12px] font-medium tracking-[0.18em] uppercase"
              style={{ color: "#9e9ea0" }}
            >
              After the loss
            </p>
            <p className="mt-3 max-w-[28ch] text-[22px] font-medium md:text-[26px]">
              Twelve months later, the first Slam.
            </p>
          </div>
          <ul className="flex flex-col gap-4 sm:flex-row sm:gap-10">
            {updates.map((u) => (
              <li key={u.year} className="max-w-[22ch]">
                <p className="text-[13px] tabular-nums" style={{ color: "#9e9ea0" }}>
                  {u.year}
                </p>
                <p
                  className="mt-1 text-[15px] leading-[1.5]"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  {u.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
