"use client";

import { Trophy } from "lucide-react";
import { useRef, useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";

type Row = {
  title: string;
  year: string;
  detail: string;
  /** YouTube id for tournament hover preview */
  youtubeId: string;
  start?: number;
};

/** Hover preview clips — tournament / moment highlights on YouTube */
const rows: Row[] = [
  {
    title: "Australian Open",
    year: "2014",
    detail: "d. Nadal",
    youtubeId: "1FD_QiQxrE4",
    start: 12,
  },
  {
    title: "Roland-Garros",
    year: "2015",
    detail: "d. Djokovic",
    youtubeId: "1FD_QiQxrE4",
    start: 95,
  },
  {
    title: "US Open",
    year: "2016",
    detail: "d. Djokovic",
    youtubeId: "1FD_QiQxrE4",
    start: 155,
  },
  {
    title: "Olympic gold",
    year: "2008",
    detail: "Doubles · Federer",
    youtubeId: "1FD_QiQxrE4",
    start: 40,
  },
  {
    title: "Davis Cup",
    year: "2014",
    detail: "Switzerland",
    youtubeId: "1FD_QiQxrE4",
    start: 70,
  },
  {
    title: "Career-high ranking",
    year: "2014",
    detail: "World No. 3",
    youtubeId: "1FD_QiQxrE4",
    start: 5,
  },
  {
    title: "Monte-Carlo Masters",
    year: "2014",
    detail: "d. Federer",
    youtubeId: "kyplW6HyR9c",
    start: 126,
  },
  {
    title: "ATP singles titles",
    year: "16",
    detail: "Tour-level",
    youtubeId: "1FD_QiQxrE4",
    start: 200,
  },
];

function previewSrc(id: string, start = 0) {
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
    cc_load_policy: "0",
    start: String(start),
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

/**
 * Brick-style titles list — hover shows a muted tournament clip (YouTube-style preview).
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

  const row = active !== null ? rows[active] : null;

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

        <ul className="relative z-10 mt-14 md:mt-20">
          {rows.map((item, i) => (
            <li key={`${item.title}-${item.year}`}>
              <button
                type="button"
                className="group flex w-full items-baseline justify-between gap-6 border-b border-concrete-gray py-5 text-left transition-opacity hover:opacity-80 md:py-6"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
              >
                <span className="text-[20px] font-medium md:text-[28px]">{item.title}</span>
                <span className="shrink-0 text-[14px] tabular-nums text-steel md:text-[16px]">
                  {item.detail}
                  <span className="ml-4 font-medium text-obsidian">{item.year}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* YouTube-style hover video preview */}
      <div
        className="pointer-events-none absolute top-0 left-0 z-20 hidden overflow-hidden bg-obsidian shadow-none md:block"
        style={{
          width: 280,
          height: 158,
          opacity: row ? 1 : 0,
          transform: `translate(${Math.min(pos.x + 20, (rootRef.current?.clientWidth ?? 400) - 300)}px, ${pos.y - 90}px)`,
          transition: "opacity 120ms ease",
        }}
        aria-hidden
      >
        {row ? (
          <>
            <iframe
              key={`${row.youtubeId}-${row.start}-${active}`}
              title=""
              src={previewSrc(row.youtubeId, row.start)}
              className="pointer-events-none absolute inset-0 h-full w-full border-0"
              allow="autoplay; encrypted-media"
            />
            <div className="pointer-events-none absolute inset-0" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-obsidian/80 to-transparent" />
          </>
        ) : null}
      </div>
    </section>
  );
}
