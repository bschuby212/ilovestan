"use client";

import Image from "next/image";
import { MessagesSquare } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { stanMedia } from "@/data/media";
import {
  testimonials,
  testimonialsSection,
} from "@/data/testimonials";

/** Atmospheric full-bleed backs — Stan media as stand-in until peer photos are licensed */
const backs = [
  stanMedia.serve,
  stanMedia.queens,
  stanMedia.usOpen,
  stanMedia.hero,
  stanMedia.basel,
] as const;

/**
 * Full-bleed quote carousel — dark wash over photo, prev/next people.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const count = testimonials.length;
  const active = testimonials[index]!;
  const bg = backs[index % backs.length]!;

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
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
      className="relative min-h-[100svh] overflow-hidden bg-obsidian text-paper-white"
      aria-label="What they said"
    >
      <div className="absolute inset-0">
        <Image
          key={bg.src}
          src={bg.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority={index === 0}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(17,17,17,0.88) 0%, rgba(17,17,17,0.55) 55%, rgba(17,17,17,0.45) 100%), linear-gradient(180deg, rgba(17,17,17,0.35) 0%, rgba(17,17,17,0.2) 40%, rgba(17,17,17,0.8) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-6 py-16 md:px-10 md:py-20 lg:justify-center">
        <SectionHeading
          eyebrow={testimonialsSection.eyebrow}
          title={testimonialsSection.title}
          icon={MessagesSquare}
          tone="dark"
        />

        <blockquote className="mt-12 max-w-3xl md:mt-16">
          <p className="text-[clamp(22px,3.6vw,40px)] leading-[1.25] font-medium text-paper-white">
            “{active.quote}”
          </p>
        </blockquote>

        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[18px] font-medium md:text-[20px]">{active.name}</p>
            <p className="mt-1 text-[14px] text-faint-gray">{active.role}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition-opacity hover:opacity-70"
              aria-label="Previous"
            >
              ←
            </button>
            <span className="min-w-[4ch] text-center text-[13px] tabular-nums text-faint-gray">
              {index + 1} / {count}
            </span>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition-opacity hover:opacity-70"
              aria-label="Next"
            >
              →
            </button>
          </div>
        </div>

        <ul className="mt-10 flex gap-2" aria-hidden>
          {testimonials.map((t, i) => (
            <li key={t.id}>
              <button
                type="button"
                onClick={() => go(i)}
                className={`h-1 w-7 transition-colors ${
                  i === index ? "bg-paper-white" : "bg-white/25"
                }`}
                aria-label={t.name}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
