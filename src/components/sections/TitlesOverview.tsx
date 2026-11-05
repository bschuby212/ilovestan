"use client";

import { useEffect, useRef } from "react";
import { titlesOverview } from "@/data/titlesOverview";
import { getGsap } from "@/lib/gsap";

/**
 * Post-hero Color Typer chapter (Framer Uni / Apple-store style):
 * high-level title counts type from muted → white on scroll, then
 * release into Grand Slams and the rest of the site.
 */
export function TitlesOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = getGsap();
    const section = sectionRef.current;
    const pin = pinRef.current;
    const stack = stackRef.current;
    if (!section || !pin || !stack) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const words = Array.from(stack.querySelectorAll<HTMLElement>(".ct-word"));
    const details = Array.from(stack.querySelectorAll<HTMLElement>(".ct-detail"));

    const ctx = gsap.context(() => {
      gsap.set(words, { color: "var(--color-faint-gray)" });
      gsap.set(details, { opacity: 0.2 });

      if (reduce) {
        gsap.set(words, { color: "var(--color-paper-white)" });
        gsap.set(details, { opacity: 1 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=240%",
          pin: pin,
          scrub: 0.55,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Color-type every word left → right, top → bottom
      tl.to(
        words,
        {
          color: "var(--color-paper-white)",
          ease: "none",
          stagger: 0.08,
          duration: 0.2,
        },
        0.1,
      );

      // Details brighten in step with their line (approx by groups)
      tl.to(
        details,
        {
          opacity: 1,
          ease: "none",
          stagger: 0.35,
          duration: 0.25,
        },
        0.15,
      );

      // Soft exit into next chapter
      tl.to(stack, { opacity: 0.2, y: -36, ease: "none", duration: 0.4 }, "+=0.15");
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="titles-overview"
      ref={sectionRef}
      className="relative bg-obsidian text-paper-white"
      aria-label="Career titles overview"
    >
      <div
        ref={pinRef}
        className="relative flex h-[100svh] min-h-[640px] items-center overflow-hidden"
      >
        <div className="mx-auto w-full max-w-[1100px] px-6 md:px-10">
          <p className="mb-10 text-[12px] font-medium tracking-[0.22em] text-faint-gray uppercase md:mb-14">
            {titlesOverview.eyebrow}
          </p>

          <div ref={stackRef} className="flex flex-col gap-7 will-change-transform md:gap-9">
            {titlesOverview.lines.map((line) => {
              const tokens = line.text.split(/(\s+)/);
              return (
                <div key={line.id}>
                  <p
                    className="display-type max-w-[20ch] text-[clamp(28px,5.8vw,64px)] leading-[1.05]"
                    aria-label={line.text}
                  >
                    {tokens.map((token, i) =>
                      /^\s+$/.test(token) ? (
                        <span key={`s-${line.id}-${i}`}>{token}</span>
                      ) : (
                        <span
                          key={`${line.id}-${token}-${i}`}
                          className="ct-word inline"
                        >
                          {token}
                        </span>
                      ),
                    )}
                  </p>
                  <p className="ct-detail mt-2 max-w-xl text-[16px] leading-[1.6] text-steel md:mt-3">
                    {line.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
