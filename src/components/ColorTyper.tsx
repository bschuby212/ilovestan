"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

type Props = {
  text: string;
  className?: string;
  /** Muted start color */
  from?: string;
  /** Active end color */
  to?: string;
  /** Split by word or character */
  split?: "word" | "char";
  /** ScrollTrigger scrub (number) or true */
  scrub?: number | boolean;
  /** Optional start/end for ScrollTrigger */
  start?: string;
  end?: string;
};

/**
 * Framer Color Typer–style effect: muted → active color cascade,
 * scrubbed by scroll (Apple-store typed highlight).
 */
export function ColorTyper({
  text,
  className = "",
  from = "var(--color-faint-gray)",
  to = "var(--color-paper-white)",
  split = "word",
  scrub = 0.6,
  start = "top 75%",
  end = "center 35%",
}: Props) {
  const rootRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const { gsap } = getGsap();
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

      gsap.to(parts, {
        color: to,
        ease: "none",
        stagger: 0.05,
        scrollTrigger: {
          trigger: root,
          start,
          end,
          scrub,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [from, to, scrub, start, end]);

  const tokens =
    split === "char"
      ? Array.from(text)
      : text.split(/(\s+)/);

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
          <span key={`${token}-${i}`} className="ct-part inline">
            {token}
          </span>
        );
      })}
    </p>
  );
}
