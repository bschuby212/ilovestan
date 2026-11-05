"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { useEffect, useRef } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { beyondStories, quote } from "@/data/content";
import { stanMedia } from "@/data/media";
import { getGsap } from "@/lib/gsap";

export function BeyondCourt() {
  const rootRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    const q = quoteRef.current;
    if (!root || !q) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const lines = q.querySelectorAll(".q-line");
      gsap.from(lines, {
        yPercent: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q,
          start: "top 75%",
        },
      });

      gsap.from(root.querySelectorAll(".story"), {
        y: 48,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root.querySelector(".stories"),
          start: "top 75%",
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="beyond"
      ref={rootRef}
      className="bg-obsidian text-paper-white"
      aria-label="Beyond the court"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
        <SectionHeading
          eyebrow="Beyond the court"
          title="Heart, ink, and the long game"
          icon={Heart}
          tone="dark"
        />

        <div className="mt-16 grid grid-cols-1 items-end gap-10 md:mt-24 md:grid-cols-12">
          <blockquote ref={quoteRef} className="md:col-span-7">
            <p className="display-type text-[clamp(32px,5.5vw,64px)] leading-[1.05] text-paper-white">
              {quote.text.split(". ").map((chunk, i, arr) => (
                <span key={chunk} className="block overflow-hidden">
                  <span className="q-line inline-block">
                    {chunk}
                    {i < arr.length - 1 ? "." : ""}
                  </span>
                </span>
              ))}
            </p>
            <footer className="mt-8 text-[14px] text-faint-gray">
              {quote.attribution}
            </footer>
          </blockquote>
          <div className="media-mask relative aspect-[3/4] w-full overflow-hidden md:col-span-5">
            <Image
              src={stanMedia.portrait.src}
              alt={stanMedia.portrait.alt}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover object-top"
            />
          </div>
        </div>

        <div className="stories mt-20 grid grid-cols-1 gap-0 border-t border-white/15 md:mt-28 md:grid-cols-2">
          {beyondStories.map((story, i) => (
            <article
              key={story.title}
              className={`story border-b border-white/15 p-8 md:p-10 ${
                i % 2 === 0 ? "md:border-r" : ""
              }`}
            >
              <p className="text-[12px] font-medium tracking-[0.18em] text-faint-gray uppercase">
                {story.eyebrow}
              </p>
              <h3 className="mt-4 text-[20px] leading-[1.5] font-medium md:text-[24px]">
                {story.title}
              </h3>
              <p className="mt-4 text-[16px] leading-[1.75] text-paper-white/75">
                {story.summary}
              </p>
              <a
                href={story.href}
                target="_blank"
                rel="noopener noreferrer"
                className="pill pill--light mt-8 inline-flex"
              >
                {story.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
