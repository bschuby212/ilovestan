"use client";

import Image from "next/image";
import { Feather } from "lucide-react";
import { useEffect, useRef } from "react";
import { stanMedia } from "@/data/media";
import { getGsap } from "@/lib/gsap";

/**
 * Side-by-side Fail Better:
 * Left sticky — win / aftermath photo fades in on scroll
 * Right fixed — tattoo close-up + definition that reveals as you scroll
 */
export function FailBetter() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const defRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = getGsap();
    const section = sectionRef.current;
    const pin = pinRef.current;
    const left = leftRef.current;
    const def = defRef.current;
    if (!section || !pin || !left || !def) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      gsap.set(left, { autoAlpha: 0 });
      gsap.set(def.querySelectorAll(".fb-line"), { y: 24, opacity: 0 });

      if (reduce) {
        gsap.set(left, { autoAlpha: 1 });
        gsap.set(def.querySelectorAll(".fb-line"), { y: 0, opacity: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=140%",
          pin: pin,
          scrub: 0.45,
          anticipatePin: 1,
        },
      });

      // Definition lines rise
      tl.to(
        def.querySelectorAll(".fb-line"),
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.55 },
        0.05,
      );
      // Then left win image sticks in
      tl.to(left, { autoAlpha: 1, duration: 0.45 }, 0.55);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="fail-better"
      ref={sectionRef}
      className="relative bg-obsidian text-paper-white"
      aria-label="Fail better"
    >
      <div ref={pinRef} className="relative h-[100svh] min-h-[640px] overflow-hidden">
        <div className="grid h-full grid-cols-1 lg:grid-cols-2">
          {/* Left — sticky win image (reveals on scroll) */}
          <div
            ref={leftRef}
            className="relative hidden min-h-full overflow-hidden bg-obsidian lg:block"
          >
            <Image
              src={stanMedia.serve.src}
              alt={stanMedia.serve.alt}
              fill
              sizes="50vw"
              className="object-cover object-[center_20%]"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(17,17,17,0.15) 0%, rgba(17,17,17,0.55) 100%)",
              }}
            />
            <p className="absolute bottom-6 left-6 text-[12px] text-faint-gray">
              After the ink — first Slam season
            </p>
          </div>

          {/* Right — fixed tattoo + definition */}
          <div className="relative flex h-full flex-col bg-obsidian">
            <div className="relative min-h-[42vh] flex-1 overflow-hidden lg:min-h-0">
              <Image
                src={stanMedia.tattoo.src}
                alt={stanMedia.tattoo.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
                priority
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(17,17,17,0.2) 0%, rgba(17,17,17,0.75) 100%)",
                }}
              />
              <p className="absolute bottom-4 left-6 text-[11px] text-faint-gray md:left-8">
                {stanMedia.tattoo.credit}
              </p>
            </div>

            <div
              ref={defRef}
              className="relative z-10 px-6 py-10 md:px-10 md:py-12 lg:px-12"
            >
              <p className="mb-5 flex items-center gap-2 text-[12px] font-medium tracking-[0.18em] text-faint-gray uppercase">
                <Feather className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden />
                Left forearm
              </p>
              <p className="display-type text-[clamp(22px,3.2vw,36px)] leading-[1.15]">
                <span className="fb-line block">Ever tried. Ever failed.</span>
                <span className="fb-line block">No matter. Try again.</span>
                <span className="fb-line block">Fail again. Fail better.</span>
              </p>
              <p className="fb-line mt-6 max-w-md text-[16px] leading-[1.7] text-paper-white/75">
                Beckett on skin after the 2013 AO heartbreak — then Melbourne
                2014, and the titles that followed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
