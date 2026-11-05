"use client";

import type { LucideIcon } from "lucide-react";

type Props = {
  eyebrow?: string;
  title: string;
  icon: LucideIcon;
  tone?: "light" | "dark";
  className?: string;
};

/** Shared section title — Lucide icon left of the headline. */
export function SectionHeading({
  eyebrow,
  title,
  icon: Icon,
  tone = "light",
  className = "",
}: Props) {
  const muted = tone === "dark" ? "text-faint-gray" : "text-steel";
  const ink = tone === "dark" ? "text-paper-white" : "text-obsidian";

  return (
    <div className={className}>
      {eyebrow ? (
        <p
          className={`flex items-center gap-2 text-[12px] font-medium tracking-[0.22em] uppercase ${muted}`}
        >
          <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.6} aria-hidden />
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`mt-3 flex items-start gap-3 text-[24px] leading-[1.2] font-medium md:text-[clamp(28px,3.2vw,40px)] ${ink} ${
          eyebrow ? "" : ""
        }`}
      >
        {!eyebrow ? (
          <Icon
            className={`mt-1 h-6 w-6 shrink-0 md:mt-1.5 md:h-7 md:w-7 ${muted}`}
            strokeWidth={1.5}
            aria-hidden
          />
        ) : null}
        <span>{title}</span>
      </h2>
    </div>
  );
}
