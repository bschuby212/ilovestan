"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { timeline } from "@/data/content";
import { stanMedia } from "@/data/media";
import { getGsap } from "@/lib/gsap";

const HIGHLIGHTS = "/video/stan-highlights.mp4";
const HIGHLIGHTS_POSTER = "/video/stan-highlights-poster.jpg";

/**
 * Homeday-style career timeline — sticky left copy, numbered right milestones
 * with media thumbs, scroll-linked reveals + intro animation.
 */
export function Timeline() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap.from(root.querySelectorAll(".tl-intro"), {
          y: 28,
          opacity: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 75%" },
        });
      }

      root.querySelectorAll<HTMLElement>(".tl-step").forEach((step) => {
        if (reduce) {
          gsap.set(step, { clearProps: "all" });
          return;
        }
        gsap.from(step, {
          y: 40,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
        const media = step.querySelector(".tl-media");
        if (media) {
          gsap.from(media, {
            scale: 0.92,
            opacity: 0,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="timeline"
      ref={rootRef}
      className="bg-[#111] text-white"
      aria-label="Career timeline"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-16 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-12 lg:gap-x-24 xl:gap-x-32">
        {/* Left — sticky intro */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28 lg:pr-6">
            <h2 className="tl-intro display-type max-w-[14ch] text-[clamp(32px,4.2vw,52px)] leading-[1.05] text-white">
              From first tour to the last point.
            </h2>
            <p className="tl-intro mt-5 max-w-[36ch] text-[15px] leading-[1.7] text-white/60 md:text-[16px]">
              The climb in order — ATP start, first title, the Slams, his Masters
              1000, home farewell, retirement.
            </p>
            <a
              href="https://www.atptour.com/en/players/stan-wawrinka/w367/overview"
              target="_blank"
              rel="noopener noreferrer"
              className="tl-intro mt-8 inline-flex items-center gap-2 rounded-full bg-[#c8f542] px-5 py-2.5 text-[14px] font-medium text-[#111] transition-opacity hover:opacity-90"
            >
              Full ATP career
              <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden />
            </a>
          </div>
        </div>

        {/* Right — numbered steps */}
        <ol className="lg:col-span-7 lg:pl-4 xl:pl-8">
          {timeline.map((item, i) => {
            const photo = stanMedia[item.image];
            const n = String(i + 1).padStart(2, "0");
            const useVideo = item.media === "video";

            return (
              <li
                key={`${item.year}-${item.title}`}
                className="tl-step grid grid-cols-[auto_1fr_auto] items-center gap-4 border-t border-white/15 py-8 md:gap-6 md:py-10"
              >
                <p
                  className="display-type w-[2.6ch] text-[clamp(28px,3vw,40px)] leading-none tabular-nums"
                  style={{ color: "#c8f542" }}
                >
                  {n}
                </p>

                <div className="min-w-0 pr-2">
                  <p className="text-[12px] font-medium tracking-[0.14em] text-white/45 uppercase">
                    {item.year}
                  </p>
                  <h3 className="mt-1.5 text-[17px] leading-[1.3] font-medium text-white md:text-[20px]">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-[40ch] text-[13px] leading-[1.55] text-white/55 md:text-[14px]">
                    {item.body}
                  </p>
                </div>

                <div className="tl-media relative h-[72px] w-[96px] shrink-0 overflow-hidden rounded-[14px] bg-white/10 md:h-[96px] md:w-[128px] md:rounded-[18px]">
                  {useVideo ? (
                    <video
                      className="absolute inset-0 h-full w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster={HIGHLIGHTS_POSTER}
                      controls={false}
                      disablePictureInPicture
                    >
                      <source src={HIGHLIGHTS} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
