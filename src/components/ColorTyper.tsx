"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

type Props = {
  text: string;
  className?: string;
  from?: string;
  to?: string;
  split?: "word" | "char";
  /** Delay before cascade starts (seconds) */
  delay?: number;
  /** Duration of each part’s color change */
  colorTime?: number;
  /** Stagger between parts */
  stagger?: number;
  /** Replay when leaving / re-entering view */
  replay?: boolean;
};

/**
 * Framer Color Typer — in-view animation (not scroll-scrubbed).
 * Muted Color 1 → active Color 2, fast staggered cascade.
 */
export function ColorTyper({
  text,
  className = "",
  from = "var(--color-faint-gray)",
  to = "var(--color-paper-white)",
  split = "word",
  delay = 0.05,
  colorTime = 0.18,
  stagger = 0.045,
  replay = true,
}: Props) {
  const rootRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = getGsap();
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const parts = root.querySelectorAll<HTMLElement>(".ct-part");

    const ctx = gsap.context(() => {
      gsap.set(parts, { color: from });

      if (reduce) {
        gsap.set(parts, { color: to });
        return;
      }

      const tween = gsap.fromTo(
        parts,
        { color: from },
        {
          color: to,
          duration: colorTime,
          ease: "power1.out",
          stagger,
          delay,
          paused: true,
        },
      );

      ScrollTrigger.create({
        trigger: root,
        start: "top 82%",
        onEnter: () => tween.restart(),
        onEnterBack: () => {
          if (replay) tween.restart();
        },
        onLeaveBack: () => {
          if (replay) {
            tween.pause(0);
            gsap.set(parts, { color: from });
          }
        },
      });
    }, root);

    return () => ctx.revert();
  }, [from, to, delay, colorTime, stagger, replay]);

  const tokens = split === "char" ? Array.from(text) : text.split(/(\s+)/);

  return (
    <p ref={rootRef} className={className} aria-label={text}>
      {tokens.map((token, i) => {
        if (split === "word" && /^\s+$/.test(token)) {
          return <span key={`s-${i}`}>{token}</span>;
        }
        if (split === "char" && token === " ") {
          return <span key={`s-${i}`}>{"\u00A0"}</span>;
        }
        return (
          <span key={`${i}-${token}`} className="ct-part inline">
            {token}
          </span>
        );
      })}
    </p>
  );
}
