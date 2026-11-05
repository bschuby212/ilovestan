"use client";

import Image from "next/image";
import { Trophy } from "lucide-react";
import { useRef, useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { achievements } from "@/data/content";
import { stanMedia, type StanMediaKey } from "@/data/media";

const rows: {
  title: string;
  year: string;
  kind: string;
  detail: string;
  image: StanMediaKey;
}[] = [
  { ...achievements[0], image: "serve" },
  { ...achievements[1], image: "queens" },
  { ...achievements[2], image: "usOpen" },
  { ...achievements[3], image: "wimbledon" },
  { ...achievements[4], image: "heroDepth" },
  {
    title: "Career-high ranking",
    year: "2014",
    kind: "ATP",
    detail: "World No. 3",
    image: "portrait",
  },
  {
    title: "ATP singles titles",
    year: "16",
    kind: "Tour",
    detail: "Tour-level crowns",
    image: "basel",
  },
  {
    title: "Monte-Carlo Masters",
    year: "2014",
    kind: "Masters 1000",
    detail: "d. Federer",
    image: "queens",
  },
];

/**
 * Project Brick–style list — titles as type; image floats in on hover.
 * No card grid, no archive dump.
 */
export function Achievements() {
  const [active, setActive] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const rootRef = useRef<HTMLElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const root = rootRef.current;
    if (!root) return;
    const r = root.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <section
      id="achievements"
      ref={rootRef}
      onMouseMove={onMove}
      className="relative overflow-hidden bg-paper-white text-obsidian"
      aria-label="Titles"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28">
        <SectionHeading eyebrow="Titles" title="What he won" icon={Trophy} />

        <ul className="relative z-10 mt-14 border-t border-concrete-gray md:mt-20">
          {rows.map((row, i) => (
            <li key={`${row.title}-${row.year}`}>
              <a
                href="#grand-slams"
                className="group flex items-baseline justify-between gap-6 border-b border-concrete-gray py-6 transition-opacity md:py-7"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                <span className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                  <span className="text-[20px] font-medium md:text-[28px]">
                    {row.title}
                  </span>
                  <span className="text-[14px] text-steel">{row.kind}</span>
                </span>
                <span className="shrink-0 text-[14px] tabular-nums text-steel md:text-[16px]">
                  {row.detail}
                  <span className="ml-4 font-medium text-obsidian">{row.year}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Hover preview — follows cursor */}
      <div
        className="pointer-events-none absolute top-0 left-0 z-20 hidden h-56 w-44 overflow-hidden bg-obsidian transition-opacity duration-200 md:block"
        style={{
          opacity: active === null ? 0 : 1,
          transform: `translate(${pos.x + 24}px, ${pos.y - 120}px)`,
        }}
        aria-hidden
      >
        {active !== null ? (
          <Image
            src={stanMedia[rows[active]!.image].src}
            alt=""
            fill
            sizes="176px"
            className="object-cover"
          />
        ) : null}
      </div>
    </section>
  );
}
