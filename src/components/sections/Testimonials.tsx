"use client";

import { MessagesSquare } from "lucide-react";
import { useCallback, useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { testimonials, testimonialsSection } from "@/data/testimonials";

/** Compact quote block — less empty air, clearer controls. */
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
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 md:py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={testimonialsSection.eyebrow}
            title={testimonialsSection.title}
            icon={MessagesSquare}
          />
          <div className="flex items-center gap-3 md:pb-1">
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-concrete-gray text-[14px] transition-opacity hover:opacity-70"
              aria-label="Previous quote"
            >
              ←
            </button>
            <span className="min-w-[4ch] text-center text-[13px] tabular-nums text-steel">
              {index + 1} / {count}
            </span>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-concrete-gray text-[14px] transition-opacity hover:opacity-70"
              aria-label="Next quote"
            >
              →
            </button>
          </div>
        </div>

        <blockquote className="mt-10 max-w-3xl border-t border-concrete-gray pt-8 md:mt-12">
          <p className="text-[20px] leading-[1.5] font-medium md:text-[24px] md:leading-[1.45]">
            “{active.quote}”
          </p>
          <footer className="mt-6">
            <p className="text-[15px] font-medium">{active.name}</p>
            <p className="mt-1 text-[13px] text-steel">{active.role}</p>
          </footer>
        </blockquote>

        <ul className="mt-8 flex flex-wrap gap-2">
          {testimonials.map((t, i) => (
            <li key={t.id}>
              <button
                type="button"
                onClick={() => go(i)}
                className={`rounded-full px-3 py-1.5 text-[12px] font-medium tracking-[0.04em] transition-colors ${
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
    </section>
  );
}
