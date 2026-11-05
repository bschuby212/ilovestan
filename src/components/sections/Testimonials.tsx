"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  testimonials,
  testimonialsSection,
  type Testimonial,
} from "@/data/testimonials";
import { getGsap } from "@/lib/gsap";

/**
 * Framer-style testimonials carousel (testi-car.learnframer.site):
 * stacked preview marks + animated quote panel + prev/next.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const animating = useRef(false);

  const active = testimonials[index]!;
  const count = testimonials.length;

  const go = useCallback(
    (next: number) => {
      if (animating.current) return;
      const { gsap } = getGsap();
      const quote = quoteRef.current;
      const meta = metaRef.current;
      if (!quote || !meta) {
        setIndex((next + count) % count);
        return;
      }

      animating.current = true;
      const tl = gsap.timeline({
        onComplete: () => {
          setIndex((next + count) % count);
          gsap.fromTo(
            [quote, meta],
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              ease: "power2.out",
              onComplete: () => {
                animating.current = false;
              },
            },
          );
        },
      });
      tl.to([quote, meta], {
        opacity: 0,
        y: -14,
        duration: 0.28,
        ease: "power1.in",
      });
    },
    [count],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(index + 1);
      if (e.key === "ArrowLeft") go(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index]);

  return (
    <section
      id="testimonials"
      className="bg-paper-white text-obsidian"
      aria-label="Player testimonials"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28">
        <p className="text-[12px] font-medium tracking-[0.22em] text-steel uppercase">
          {testimonialsSection.eyebrow}
        </p>
        <h2 className="mt-3 text-[24px] leading-[1.2] font-medium md:text-[clamp(28px,3.5vw,40px)]">
          {testimonialsSection.title}
        </h2>

        <div
          ref={stageRef}
          className="mt-14 grid grid-cols-1 items-stretch gap-10 border-t border-concrete-gray pt-10 lg:grid-cols-12 lg:gap-0"
        >
          {/* Preview stack — Framer carousel thumbs */}
          <div className="relative flex items-center gap-3 lg:col-span-4 lg:flex-col lg:items-start lg:gap-4 lg:pr-10">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show quote from ${t.name}`}
                aria-current={i === index ? "true" : undefined}
                className={`relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden transition-opacity duration-300 md:h-20 md:w-20 ${
                  i === index
                    ? "bg-obsidian text-paper-white opacity-100"
                    : "bg-soft-mist text-obsidian opacity-55 hover:opacity-80"
                }`}
              >
                <span className="text-[16px] font-medium tracking-[0.06em] md:text-[20px]">
                  {t.mark}
                </span>
              </button>
            ))}
          </div>

          {/* Quote panel */}
          <div className="flex flex-col justify-between border-t border-concrete-gray pt-8 lg:col-span-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
            <blockquote ref={quoteRef} className="max-w-3xl">
              <p className="display-type text-[clamp(24px,3.8vw,40px)] leading-[1.15] text-obsidian">
                “{active.quote}”
              </p>
            </blockquote>

            <div ref={metaRef} className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[20px] font-medium">{active.name}</p>
                <p className="mt-1 text-[14px] text-steel">{active.role}</p>
                <a
                  href={active.sourceHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-[12px] text-steel underline-offset-2 hover:underline"
                >
                  {active.source}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  className="flex h-11 w-11 items-center justify-center rounded-[30px] border border-concrete-gray text-obsidian transition-opacity hover:opacity-70"
                  aria-label="Previous testimonial"
                >
                  <Arrow dir="left" />
                </button>
                <span className="min-w-[4ch] text-center text-[14px] tabular-nums text-steel">
                  {index + 1} / {count}
                </span>
                <button
                  type="button"
                  onClick={() => go(index + 1)}
                  className="flex h-11 w-11 items-center justify-center rounded-[30px] border border-concrete-gray text-obsidian transition-opacity hover:opacity-70"
                  aria-label="Next testimonial"
                >
                  <Arrow dir="right" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      {dir === "left" ? (
        <path
          d="M15 6L9 12l6 6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M9 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

// silence unused type export lint if needed
export type { Testimonial };
