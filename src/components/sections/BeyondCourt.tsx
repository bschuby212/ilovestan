"use client";

import Image from "next/image";
import { ArrowUpRight, Heart } from "lucide-react";
import { useEffect, useRef } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { beyondStories } from "@/data/content";
import { stanMedia } from "@/data/media";
import { getGsap } from "@/lib/gsap";

/**
 * Beyond the court — Louvre-style bento. No Beckett quote (lives in Fail Better).
 */
export function BeyondCourt() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll(".bx-tile"), {
        y: 32,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.querySelector(".bx-grid"), start: "top 75%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const [first, second, third] = beyondStories;

  return (
    <section
      id="beyond"
      ref={rootRef}
      className="bg-soft-mist text-obsidian"
      aria-label="Beyond the court"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28">
        <SectionHeading
          eyebrow="Off court"
          title="What he carried besides the racket"
          icon={Heart}
        />

        <div className="bx-grid mt-12 grid grid-cols-1 gap-3 md:mt-16 md:grid-cols-2 md:grid-rows-2 md:gap-4 md:auto-rows-[minmax(260px,1fr)]">
          {/* Tall feature — philanthropy */}
          <article className="bx-tile relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-[16px] bg-obsidian p-7 text-paper-white md:row-span-2 md:min-h-0 md:p-9">
            <div>
              <p className="text-[12px] font-medium tracking-[0.16em] text-faint-gray uppercase">
                {first?.eyebrow}
              </p>
              <h3 className="mt-4 max-w-[12ch] text-[28px] leading-[1.15] font-medium md:text-[36px]">
                {first?.title}
              </h3>
              <p className="mt-5 max-w-[36ch] text-[15px] leading-[1.65] text-paper-white/70">
                {first?.summary}
              </p>
            </div>
            {first ? (
              <a
                href={first.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#ffffff] px-5 py-2.5 text-[14px] font-medium transition-opacity hover:opacity-85"
                style={{ color: "#111111" }}
              >
                {first.cta}
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            ) : null}
            <div
              className="pointer-events-none absolute -right-8 -bottom-10 size-48 rounded-full border border-white/15"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-2 bottom-16 size-28 rounded-full border border-white/10"
              aria-hidden
            />
          </article>

          {/* Image story */}
          <article className="bx-tile relative min-h-[260px] overflow-hidden rounded-[16px]">
            <Image
              src={stanMedia.portrait.src}
              alt={stanMedia.portrait.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 30%, rgba(17,17,17,0.88) 100%)",
              }}
            />
            <div className="absolute inset-x-0 bottom-0 p-7 md:p-8">
              <p className="text-[12px] font-medium tracking-[0.16em] text-paper-white/65 uppercase">
                {second?.eyebrow}
              </p>
              <h3 className="mt-2 text-[22px] font-medium text-paper-white md:text-[24px]">
                {second?.title}
              </h3>
              <p className="mt-2 max-w-[40ch] text-[14px] leading-[1.55] text-paper-white/75">
                {second?.summary}
              </p>
              {second ? (
                <a
                  href={second.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#c8f542] px-4 py-2 text-[13px] font-medium text-obsidian"
                >
                  {second.cta}
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
              ) : null}
            </div>
          </article>

          {/* Retirement */}
          <article className="bx-tile flex min-h-[240px] flex-col justify-between rounded-[16px] bg-paper-white p-7 md:p-8">
            <div>
              <p className="text-[12px] font-medium tracking-[0.16em] text-steel uppercase">
                {third?.eyebrow}
              </p>
              <h3 className="mt-3 text-[22px] font-medium md:text-[24px]">{third?.title}</h3>
              <p className="mt-3 max-w-[40ch] text-[14px] leading-[1.6] text-steel">
                {third?.summary}
              </p>
            </div>
            {third ? (
              <a
                href={third.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-obsidian px-4 py-2 text-[13px] font-medium transition-colors hover:bg-obsidian hover:text-paper-white"
              >
                {third.cta}
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            ) : null}
          </article>
        </div>
      </div>
    </section>
  );
}
