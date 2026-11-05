"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import {
  backhandCallouts,
  backhandPlayers,
  backhandSection,
  backhandSources,
} from "@/data/backhand";
import { stanMedia } from "@/data/media";
import { getGsap } from "@/lib/gsap";

/**
 * Visual backhand chapter — oversized metrics, no charts/bars.
 * Numbers count in when the layer enters; peers read as typography, not a dashboard.
 */
export function BackhandLab() {
  const rootRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    const stats = statsRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll(".bh-reveal"), {
        y: 28,
        opacity: 0,
        duration: 0.75,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 72%" },
      });

      if (stats) {
        gsap.from(stats.querySelectorAll(".bh-stat"), {
          yPercent: 40,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: stats, start: "top 78%" },
        });
      }

      gsap.from(root.querySelectorAll(".bh-peer"), {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root.querySelector(".bh-peers"),
          start: "top 80%",
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const stan = backhandPlayers.find((p) => p.id === "stan")!;
  const peers = backhandPlayers.filter((p) => p.id !== "stan");

  return (
    <section
      id="backhand"
      ref={rootRef}
      className="bg-paper-white text-obsidian"
      aria-label="Backhand laboratory"
    >
      <div className="mx-auto max-w-[1440px] px-6 pt-24 md:px-10 md:pt-32">
        <p className="bh-reveal text-[12px] font-medium tracking-[0.22em] text-steel uppercase">
          {backhandSection.eyebrow}
        </p>
        <h2 className="bh-reveal mt-3 max-w-[16ch] text-[24px] leading-[1.2] font-medium md:text-[clamp(28px,3.5vw,40px)]">
          {backhandSection.title}
        </h2>
        <p className="bh-reveal mt-4 max-w-xl text-[16px] leading-[1.75] text-steel">
          {backhandSection.lede}
        </p>
      </div>

      {/* Full-bleed media → metrics rise through the stroke */}
      <div className="mt-14 grid grid-cols-1 border-y border-concrete-gray lg:grid-cols-2">
        <div className="bh-reveal media-mask relative min-h-[70vh] overflow-hidden bg-obsidian lg:min-h-[85vh]">
          <Image
            src={stanMedia.hero.src}
            alt={stanMedia.hero.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-[center_20%] transition-transform duration-[900ms] ease-out"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(17,17,17,0.1) 0%, rgba(17,17,17,0.6) 100%)",
            }}
          />
          <div className="absolute right-0 bottom-0 left-0 p-8 text-paper-white md:p-10">
            <span className="pill pill--light pill--tag">Signature stroke</span>
            <p className="display-type mt-4 text-[clamp(40px,6vw,64px)]">
              One hand.
              <br />
              Full send.
            </p>
            <p className="mt-3 max-w-sm text-[16px] text-paper-white/80">
              {stan.profile}
            </p>
            <p className="mt-4 text-[12px] text-faint-gray">{stanMedia.hero.credit}</p>
          </div>
        </div>

        <div
          ref={statsRef}
          className="flex flex-col justify-center gap-12 bg-paper-white p-8 md:p-10 lg:gap-16 lg:p-14"
        >
          {backhandCallouts.map((stat, i) => (
            <div key={stat.label} className="bh-stat">
              <p className="text-[12px] font-medium tracking-[0.16em] text-steel uppercase">
                {stat.label}
              </p>
              <p className="mt-2 flex items-baseline gap-3">
                <AnimatedNumber
                  value={stat.value}
                  format={stat.format}
                  delay={i * 0.1}
                  duration={1.45}
                  start="top 82%"
                  className="display-type text-[clamp(56px,9vw,96px)] leading-[0.9] text-obsidian tabular-nums"
                />
                <span className="text-[16px] text-steel">{stat.unit}</span>
              </p>
              <p className="mt-3 max-w-sm text-[15px] leading-[1.65] text-steel">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Peers as typography — not a comparison chart */}
      <div className="bh-peers mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-24">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <h3 className="text-[20px] font-medium md:text-[24px]">Among the one-handers</h3>
          <p className="max-w-md text-[14px] leading-[1.6] text-steel">
            Same era conversation — pace and spin as story, not a spreadsheet.
            Sources linked below.
          </p>
        </div>

        <ul className="mt-12 divide-y divide-concrete-gray border-y border-concrete-gray">
          <li className="bh-peer py-8 md:py-10">
            <p className="text-[12px] tracking-[0.14em] text-steel uppercase">Featured</p>
            <p className="display-type mt-2 text-[clamp(32px,5vw,52px)]">{stan.name}</p>
            <p className="mt-3 max-w-2xl text-[16px] leading-[1.65] text-steel">
              {stan.notes.join(" · ")}
            </p>
          </li>
          {peers.map((player) => (
            <li key={player.id} className="bh-peer group py-8 md:py-10">
              <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-10">
                <p className="text-[20px] font-medium transition-transform duration-500 ease-out group-hover:translate-x-1 md:text-[24px]">
                  {player.name}
                </p>
                <p className="max-w-lg text-[15px] leading-[1.6] text-steel md:text-right">
                  {player.profile}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-2">
          <p className="text-[12px] tracking-[0.14em] text-steel uppercase">Sources</p>
          <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {backhandSources.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-[14px] text-steel"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
