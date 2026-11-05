"use client";

import { MessagesSquare } from "lucide-react";
import { useCallback, useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { testimonials, testimonialsSection } from "@/data/testimonials";

/**
 * Clean quote carousel — paper surface, restrained type, no full-bleed wash.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const count = testimonials.length;
  const active = testimonials[index]!;

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  return (
    <section
      id="testimonials"
      className="bg-paper-white text-obsidian"
      aria-label="What they said"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28">
        <SectionHeading
          eyebrow={testimonialsSection.eyebrow}
          title={testimonialsSection.title}
          icon={MessagesSquare}
        />

        <div className="mt-14 max-w-3xl md:mt-16">
          <blockquote>
            <p className="text-[20px] leading-[1.55] font-medium md:text-[24px] md:leading-[1.5]">
              “{active.quote}”
            </p>
          </blockquote>

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[16px] font-medium">{active.name}</p>
              <p className="mt-1 text-[14px] text-steel">{active.role}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(index - 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-concrete-gray transition-opacity hover:opacity-70"
                aria-label="Previous"
              >
                ←
              </button>
              <span className="min-w-[4ch] text-center text-[13px] tabular-nums text-steel">
                {index + 1} / {count}
              </span>
              <button
                type="button"
                onClick={() => go(index + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-concrete-gray transition-opacity hover:opacity-70"
                aria-label="Next"
              >
                →
              </button>
            </div>
          </div>

          <ul className="mt-10 flex flex-wrap gap-2">
            {testimonials.map((t, i) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  className={`rounded-[30px] px-3 py-1.5 text-[12px] font-medium tracking-[0.04em] transition-colors ${
                    i === index
                      ? "bg-obsidian text-paper-white"
                      : "bg-soft-mist text-steel hover:text-obsidian"
                  }`}
                >
                  {t.mark}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
