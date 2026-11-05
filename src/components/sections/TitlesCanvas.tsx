"use client";

import Image from "next/image";
import { Layers } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { stanMedia, type StanMediaKey } from "@/data/media";

type TitleCard = {
  id: string;
  label: string;
  year: string;
  meta: string;
  image: StanMediaKey;
  x: number;
  y: number;
  rotate: number;
  z: number;
};

/** Scattered title cards for the infinite 3D canvas */
const cards: TitleCard[] = [
  { id: "ao", label: "Australian Open", year: "2014", meta: "d. Nadal", image: "serve", x: -420, y: -180, rotate: -6, z: 40 },
  { id: "rg", label: "Roland-Garros", year: "2015", meta: "d. Djokovic", image: "queens", x: 80, y: -220, rotate: 4, z: 80 },
  { id: "uso", label: "US Open", year: "2016", meta: "d. Djokovic", image: "usOpen", x: 480, y: -80, rotate: -3, z: 20 },
  { id: "oly", label: "Olympic gold", year: "2008", meta: "Doubles · Federer", image: "wimbledon", x: -520, y: 160, rotate: 5, z: 60 },
  { id: "dc", label: "Davis Cup", year: "2014", meta: "Switzerland", image: "heroDepth", x: -60, y: 140, rotate: -4, z: 100 },
  { id: "mc", label: "Monte-Carlo", year: "2014", meta: "Masters · d. Federer", image: "basel", x: 420, y: 200, rotate: 7, z: 30 },
  { id: "rank", label: "World No. 3", year: "2014", meta: "Career high", image: "portrait", x: -280, y: 380, rotate: -2, z: 50 },
  { id: "titles", label: "16 ATP titles", year: "Career", meta: "Tour-level", image: "hero", x: 220, y: 360, rotate: 3, z: 70 },
  { id: "bh", label: "The backhand", year: "—", meta: "Signature", image: "hero", x: 560, y: -320, rotate: -8, z: 10 },
  { id: "fail", label: "Fail better", year: "2013", meta: "Ink → Slam", image: "tattoo", x: -620, y: -360, rotate: 6, z: 90 },
];

/**
 * Infinite 3D titles canvas — drag to pan, cursor tilts the plane (3dlook-style).
 */
export function TitlesCanvas() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const drag = useRef({
    active: false,
    x: 0,
    y: 0,
    ox: 0,
    oy: 0,
    tx: 0,
    ty: 0,
    rx: 0,
    ry: 0,
  });
  const raf = useRef(0);

  const render = useCallback(() => {
    const plane = planeRef.current;
    if (!plane) return;
    const d = drag.current;
    plane.style.transform = `translate3d(${d.tx}px, ${d.ty}px, 0) rotateX(${d.rx}deg) rotateY(${d.ry}deg)`;
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const onPointerDown = (e: PointerEvent) => {
      drag.current.active = true;
      drag.current.x = e.clientX;
      drag.current.y = e.clientY;
      drag.current.ox = drag.current.tx;
      drag.current.oy = drag.current.ty;
      stage.setPointerCapture(e.pointerId);
      stage.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      const d = drag.current;
      const rect = stage.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      // Soft 3D look toward cursor
      d.ry = nx * 8;
      d.rx = -ny * 6;

      if (d.active) {
        d.tx = d.ox + (e.clientX - d.x);
        d.ty = d.oy + (e.clientY - d.y);
      }

      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(render);
    };

    const onPointerUp = (e: PointerEvent) => {
      drag.current.active = false;
      try {
        stage.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      stage.style.cursor = "grab";
    };

    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", onPointerUp);
    stage.addEventListener("pointercancel", onPointerUp);

    render();

    return () => {
      cancelAnimationFrame(raf.current);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", onPointerUp);
      stage.removeEventListener("pointercancel", onPointerUp);
    };
  }, [render]);

  return (
    <section
      id="achievements"
      ref={rootRef}
      className="relative bg-obsidian text-paper-white"
      aria-label="Titles canvas"
    >
      <div className="pointer-events-none absolute top-8 left-6 z-20 md:left-10">
        <SectionHeading
          eyebrow="Titles"
          title="Drag the court"
          icon={Layers}
          tone="dark"
        />
        <p className="mt-3 text-[14px] text-faint-gray">
          Infinite board — drag to explore every title.
        </p>
      </div>

      <div
        ref={stageRef}
        className="relative h-[100svh] min-h-[700px] cursor-grab overflow-hidden touch-none select-none"
        style={{ perspective: "1400px", perspectiveOrigin: "50% 45%" }}
      >
        {/* Floor fade */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, transparent 20%, rgba(17,17,17,0.55) 75%), linear-gradient(180deg, rgba(17,17,17,0.35) 0%, transparent 25%, transparent 70%, rgba(17,17,17,0.7) 100%)",
          }}
        />

        <div
          ref={planeRef}
          className="absolute top-1/2 left-1/2 h-0 w-0 will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
        >
          {cards.map((card) => {
            const photo = stanMedia[card.image];
            return (
              <article
                key={card.id}
                className="absolute overflow-hidden bg-soft-mist"
                style={{
                  width: 240,
                  height: 300,
                  transform: `translate3d(${card.x}px, ${card.y}px, ${card.z}px) rotateZ(${card.rotate}deg)`,
                  transformStyle: "preserve-3d",
                  marginLeft: -120,
                  marginTop: -150,
                }}
              >
                <div className="relative h-[68%] w-full overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="240px"
                    className="object-cover"
                    draggable={false}
                  />
                </div>
                <div className="bg-paper-white px-4 py-3 text-obsidian">
                  <p className="text-[11px] tracking-[0.14em] text-steel uppercase">
                    {card.year}
                  </p>
                  <p className="mt-1 text-[16px] leading-[1.25] font-medium">{card.label}</p>
                  <p className="mt-1 text-[13px] text-steel">{card.meta}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
