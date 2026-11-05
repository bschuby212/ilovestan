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

const TYPE_MS = 38;
const LINE_GAP_MS = 220;
const HOLD_BEFORE_MS = 200;

/**
 * Horizontal Fail Better — typewriter quote left, story right.
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
      start: "top 60%",
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
      await sleep(HOLD_BEFORE_MS);
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

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    if (!root || !done) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll(".fb-info > *"), {
        y: 18,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
      });
    }, root);

    return () => ctx.revert();
  }, [done]);

  return (
    <section
      id="fail-better"
      ref={rootRef}
      className="relative overflow-hidden bg-obsidian text-paper-white"
      aria-label="Fail better tattoo"
    >
      <div className="grid min-h-[100svh] grid-cols-1 lg:grid-cols-12">
        {/* Left — typewriter quote */}
        <div className="relative flex flex-col justify-center px-6 py-20 md:px-10 lg:col-span-7 lg:px-14 lg:py-24">
          <p className="text-[12px] font-medium tracking-[0.22em] text-faint-gray uppercase">
            Left forearm · 2013
          </p>

          <blockquote className="mt-10" aria-live="polite">
            <p className="display-type text-[clamp(32px,5vw,56px)] leading-[1.08]">
              {LINES.map((line, i) => (
                <span key={line} className="block min-h-[1.08em]">
                  <span className="inline">
                    {typed[i]}
                    {active && !done && lineIndex === i ? (
                      <span
                        className="ml-[2px] inline-block w-[0.06em] animate-pulse bg-paper-white align-[-0.05em]"
                        style={{ height: "0.85em" }}
                        aria-hidden
                      />
                    ) : null}
                  </span>
                </span>
              ))}
            </p>
            <footer
              className={`mt-8 text-[14px] text-steel transition-opacity duration-500 ${
                done ? "opacity-100" : "opacity-0"
              }`}
            >
              Samuel Beckett — inked after the wound, before the titles
            </footer>
          </blockquote>
        </div>

        {/* Right — photo + story */}
        <div className="relative flex flex-col border-t border-white/10 lg:col-span-5 lg:border-t-0 lg:border-l">
          <div className="media-mask relative min-h-[42vh] flex-1 overflow-hidden lg:min-h-0">
            <Image
              src={stanMedia.portrait.src}
              alt={stanMedia.portrait.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-top"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(17,17,17,0.05) 0%, rgba(17,17,17,0.72) 100%)",
              }}
            />
            <p className="absolute bottom-5 left-6 text-[12px] text-faint-gray md:left-8">
              {stanMedia.portrait.credit}
            </p>
          </div>

          <div
            className={`fb-info px-6 py-10 md:px-10 lg:px-10 lg:py-12 ${
              done ? "opacity-100" : "opacity-40"
            }`}
          >
            <p className="text-[12px] font-medium tracking-[0.18em] text-faint-gray uppercase">
              The arc
            </p>
            <p className="mt-4 text-[16px] leading-[1.75] text-paper-white/85">
              January 2013 — five-set heartbreak vs Djokovic at the Australian
              Open. Months later the Beckett line is on his forearm. Next
              January he beats Nadal in Melbourne for his first Slam.
            </p>
            <p className="mt-5 text-[15px] leading-[1.65] text-steel">
              Loss → ink → AO 2014. Then Roland-Garros 2015. Then the US Open
              2016. Fail better, then don&apos;t fail when it matters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
