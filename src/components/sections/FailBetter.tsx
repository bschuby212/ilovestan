"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { stanMedia } from "@/data/media";
import { getGsap } from "@/lib/gsap";

const LINES = [
  "Ever tried.",
  "Ever failed.",
  "No matter.",
  "Try again.",
  "Fail again.",
  "Fail better.",
] as const;

const TYPE_MS = 36;
const LINE_GAP_MS = 180;

/**
 * Full-bleed Fail Better — photo behind, typewriter quote, one short story.
 * No split-panel mess, no redundant headlines.
 */
export function FailBetter() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  const [typed, setTyped] = useState<string[]>(() => LINES.map(() => ""));
  const [lineIndex, setLineIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const { ScrollTrigger } = getGsap();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const st = ScrollTrigger.create({
      trigger: root,
      start: "top 55%",
      once: true,
      onEnter: () => setActive(true),
    });

    if (reduce) {
      setTyped([...LINES]);
      setDone(true);
      setActive(true);
    }

    return () => st.kill();
  }, []);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    const sleep = (ms: number) =>
      new Promise<void>((r) => {
        const t = window.setTimeout(r, ms);
        if (cancelled) window.clearTimeout(t);
      });

    const run = async () => {
      await sleep(180);
      const next = LINES.map(() => "");
      for (let li = 0; li < LINES.length; li++) {
        if (cancelled) return;
        setLineIndex(li);
        const full = LINES[li]!;
        for (let c = 1; c <= full.length; c++) {
          if (cancelled) return;
          next[li] = full.slice(0, c);
          setTyped([...next]);
          await sleep(TYPE_MS);
        }
        await sleep(LINE_GAP_MS);
      }
      if (!cancelled) setDone(true);
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [active]);

  return (
    <section
      id="fail-better"
      ref={rootRef}
      className="relative min-h-[100svh] overflow-hidden bg-obsidian text-paper-white"
      aria-label="Fail better"
    >
      <div className="absolute inset-0">
        <Image
          src={stanMedia.portrait.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_20%]"
          priority={false}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(17,17,17,0.88) 0%, rgba(17,17,17,0.55) 48%, rgba(17,17,17,0.4) 100%), linear-gradient(180deg, rgba(17,17,17,0.25) 0%, rgba(17,17,17,0.15) 40%, rgba(17,17,17,0.85) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-6 py-20 md:px-10 md:py-24 lg:justify-center">
        <blockquote className="max-w-[18ch]" aria-live="polite">
          <p className="display-type text-[clamp(36px,6vw,68px)] leading-[1.05]">
            {LINES.map((line, i) => (
              <span key={line} className="block min-h-[1.05em]">
                {typed[i]}
                {active && !done && lineIndex === i ? (
                  <span
                    className="ml-[2px] inline-block w-[0.06em] animate-pulse bg-paper-white align-[-0.05em]"
                    style={{ height: "0.85em" }}
                    aria-hidden
                  />
                ) : null}
              </span>
            ))}
          </p>
          <footer
            className={`mt-6 text-[14px] text-paper-white/55 transition-opacity duration-500 ${
              done ? "opacity-100" : "opacity-0"
            }`}
          >
            Samuel Beckett
          </footer>
        </blockquote>

        <p
          className={`mt-12 max-w-lg text-[18px] leading-[1.65] text-paper-white/80 transition-opacity duration-700 md:mt-14 md:text-[20px] ${
            done ? "opacity-100" : "opacity-0"
          }`}
        >
          2013 AO heartbreak. Ink on the forearm. 2014 — first Slam.
        </p>
      </div>
    </section>
  );
}
