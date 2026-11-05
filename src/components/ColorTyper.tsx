"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { getGsap } from "@/lib/gsap";

type TweenLike = {
  eventCallback: (name: string, cb: () => void) => void;
  totalDuration: () => number;
};

export type ColorTyperHandle = {
  typeIn: () => TweenLike;
  typeOut: () => TweenLike;
  reset: () => void;
};

type Props = {
  text: string;
  className?: string;
  from?: string;
  to?: string;
  split?: "word" | "char";
  colorTime?: number;
  stagger?: number;
};

/**
 * Framer Color Typer primitives — typeIn / typeOut via ref.
 * Not scroll-scrubbed; parent drives the sequence.
 */
export const ColorTyper = forwardRef<ColorTyperHandle, Props>(
  function ColorTyper(
    {
      text,
      className = "",
      from = "var(--color-faint-gray)",
      to = "var(--color-paper-white)",
      split = "word",
      colorTime = 0.14,
      stagger = 0.035,
    },
    ref,
  ) {
    const rootRef = useRef<HTMLParagraphElement>(null);
    const fromRef = useRef(from);
    const toRef = useRef(to);
    fromRef.current = from;
    toRef.current = to;

    useImperativeHandle(ref, () => {
      const { gsap } = getGsap();
      const parts = () =>
        rootRef.current?.querySelectorAll<HTMLElement>(".ct-part") ?? [];

      return {
        reset: () => {
          gsap.set(parts(), { color: fromRef.current });
        },
        typeIn: () =>
          gsap.fromTo(
            parts(),
            { color: fromRef.current },
            {
              color: toRef.current,
              duration: colorTime,
              ease: "power1.out",
              stagger,
            },
          ) as unknown as TweenLike,
        typeOut: () =>
          gsap.to(parts(), {
            color: fromRef.current,
            duration: colorTime * 0.85,
            ease: "power1.in",
            stagger: { each: stagger * 0.7, from: "end" },
          }) as unknown as TweenLike,
      };
    }, [colorTime, stagger]);

    useEffect(() => {
      const { gsap } = getGsap();
      const root = rootRef.current;
      if (!root) return;
      gsap.set(root.querySelectorAll(".ct-part"), { color: from });
    }, [text, from]);

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
            <span key={`${text}-${i}-${token}`} className="ct-part inline">
              {token}
            </span>
          );
        })}
      </p>
    );
  },
);
