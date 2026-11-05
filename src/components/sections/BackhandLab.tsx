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

const maxSpeed = Math.max(...backhandPlayers.map((p) => p.avgSpeedMph));
const maxSpin = Math.max(...backhandPlayers.map((p) => p.spinRpm));

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
        gsap.from(stats.querySelectorAll(".bh-stat-bar"), {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.15,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: stats, start: "top 78%" },
        });
      }

      gsap.from(root.querySelectorAll(".bh-compare-bar"), {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.1,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root.querySelector(".bh-compare"),
          start: "top 75%",
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const stan = backhandPlayers.find((p) => p.id === "stan")!;

  return (
    <section
      id="backhand"
      ref={rootRef}
      className="bg-paper-white text-obsidian"
      aria-label="Backhand comparison"
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

      {/* Side-by-side: Stan media | callouts */}
      <div className="mt-14 grid grid-cols-1 border-y border-concrete-gray lg:grid-cols-2">
        <div className="bh-reveal relative min-h-[70vh] overflow-hidden bg-obsidian lg:min-h-[80vh]">
          <Image
            src={stanMedia.hero.src}
            alt={stanMedia.hero.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-[center_20%]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(17,17,17,0.15) 0%, rgba(17,17,17,0.55) 100%)",
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
          className="flex flex-col justify-between bg-paper-white p-8 md:p-10 lg:p-14"
        >
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
            {backhandCallouts.map((stat, i) => (
              <div key={stat.label} className="border-t border-concrete-gray pt-5">
                <p className="text-[12px] font-medium tracking-[0.16em] text-steel uppercase">
                  {stat.label}
                </p>
                <p className="mt-3 flex items-baseline gap-2">
                  <AnimatedNumber
                    value={stat.value}
                    format={stat.format}
                    delay={i * 0.12}
                    duration={1.4}
                    start="top 82%"
                    className="display-type text-[clamp(40px,5vw,56px)] text-obsidian tabular-nums"
                  />
                  <span className="text-[14px] text-steel">{stat.unit}</span>
                </p>
                <p className="mt-3 text-[14px] leading-[1.6] text-steel">{stat.detail}</p>
                <div className="mt-4 h-px w-full bg-concrete-gray">
                  <div
                    className="bh-stat-bar h-px origin-left bg-obsidian"
                    style={{ width: `${stat.bar}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <ul className="bh-reveal mt-12 space-y-3 border-t border-concrete-gray pt-8">
            {stan.notes.map((note) => (
              <li key={note} className="flex gap-3 text-[16px] leading-[1.6] text-obsidian">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-obsidian" />
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Comparison rows */}
      <div className="bh-compare mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-24">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <h3 className="text-[20px] font-medium md:text-[24px]">
            One-handers, measured
          </h3>
          <p className="max-w-md text-[14px] leading-[1.6] text-steel">
            Average backhand pace (AO Hawk-Eye) and spin RPM (Tennisplayer chart) —
            same era conversation, different weapons.
          </p>
        </div>

        <div className="mt-12 divide-y divide-concrete-gray border-y border-concrete-gray">
          {backhandPlayers.map((player) => (
            <article
              key={player.id}
              className={`grid grid-cols-1 gap-6 py-8 md:grid-cols-12 md:items-center md:gap-8 ${
                player.emphasis ? "bg-soft-mist" : ""
              }`}
            >
              <div className="md:col-span-3 md:px-2">
                <p className="text-[16px] font-medium md:text-[20px]">
                  {player.name}
                </p>
                {player.emphasis && (
                  <span className="pill pill--dark pill--tag mt-3 inline-flex">
                    Featured
                  </span>
                )}
              </div>

              <div className="md:col-span-4">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[12px] tracking-[0.14em] text-steel uppercase">
                    Avg speed
                  </span>
                  <span className="text-[16px] font-medium tabular-nums">
                    <AnimatedNumber
                      value={player.avgSpeedMph}
                      duration={1.2}
                      start="top 85%"
                    />{" "}
                    mph
                  </span>
                </div>
                <div className="mt-2 h-1 w-full bg-concrete-gray">
                  <div
                    className="bh-compare-bar h-1 origin-left bg-obsidian"
                    style={{
                      width: `${(player.avgSpeedMph / maxSpeed) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="md:col-span-4">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[12px] tracking-[0.14em] text-steel uppercase">
                    Spin
                  </span>
                  <span className="text-[16px] font-medium tabular-nums">
                    <AnimatedNumber
                      value={player.spinRpm}
                      format="comma"
                      duration={1.35}
                      start="top 85%"
                    />{" "}
                    RPM
                  </span>
                </div>
                <div className="mt-2 h-1 w-full bg-concrete-gray">
                  <div
                    className="bh-compare-bar h-1 origin-left bg-obsidian"
                    style={{
                      width: `${(player.spinRpm / maxSpin) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <p className="text-[14px] leading-[1.5] text-steel md:col-span-12 md:px-2 lg:col-span-1 lg:sr-only">
                {player.profile}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-2">
          <p className="text-[12px] tracking-[0.14em] text-steel uppercase">Sources</p>
          <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {backhandSources.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] text-steel underline-offset-2 transition-opacity hover:opacity-70 hover:underline"
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
