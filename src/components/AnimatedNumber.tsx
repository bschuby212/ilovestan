"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

type Props = {
  value: number;
  /** plain | comma (2,500) */
  format?: "plain" | "comma";
  className?: string;
  /** ScrollTrigger start when parent enters view */
  start?: string;
  duration?: number;
  delay?: number;
};

function formatValue(n: number, format: "plain" | "comma") {
  const rounded = Math.round(n);
  if (format === "comma") return rounded.toLocaleString("en-US");
  return String(rounded);
}

/**
 * Counts from 0 → value when the element enters the viewport (layer in view).
 */
export function AnimatedNumber({
  value,
  format = "plain",
  className = "",
  start = "top 80%",
  duration = 1.35,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = getGsap();
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.textContent = formatValue(value, format);
      return;
    }

    const state = { n: 0 };
    el.textContent = formatValue(0, format);

    const tween = gsap.to(state, {
      n: value,
      duration,
      delay,
      ease: "power2.out",
      paused: true,
      onUpdate: () => {
        el.textContent = formatValue(state.n, format);
      },
    });

    const st = ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter: () => tween.play(),
    });

    return () => {
      tween.kill();
      st.kill();
    };
  }, [value, format, start, duration, delay]);

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}
