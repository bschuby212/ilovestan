"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks, socialLinks } from "@/data/content";
import { getGsap } from "@/lib/gsap";

/**
 * Secondary fun-tab style pill — top left.
 * Filler logo · section dropdown (updates on scroll) · socials.
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>(navLinks[0].id);
  const rootRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const active = navLinks.find((l) => l.id === activeId) ?? navLinks[0];

  useEffect(() => {
    const { ScrollTrigger } = getGsap();
    const triggers: ScrollTrigger[] = [];

    navLinks.forEach((link) => {
      const el = document.getElementById(link.id);
      if (!el) return;
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveId(link.id),
        onEnterBack: () => setActiveId(link.id),
      });
      triggers.push(st);
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      const root = rootRef.current;
      if (root && !root.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const goTo = (href: string, id: string) => {
    setActiveId(id);
    setOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.hash = href;
    }
  };

  return (
    <header
      ref={rootRef}
      className="pointer-events-none fixed top-4 left-4 z-50 md:top-6 md:left-6"
      aria-label="Secondary"
    >
      <div className="pointer-events-auto relative">
        <div
          className="flex items-center gap-1 rounded-[24px] border border-white/15 bg-obsidian/90 p-1 text-paper-white backdrop-blur-md"
          role="navigation"
        >
          {/* Filler logo — swap for real mark later */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              goTo("#top", "top");
            }}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper-white text-obsidian transition-opacity hover:opacity-80"
            aria-label="Stan — home"
          >
            <span className="text-[11px] font-medium tracking-[0.04em]">SW</span>
          </a>

          {/* Section dropdown — label tracks scroll */}
          <div className="relative">
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={open}
              aria-controls="nav-section-menu"
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 items-center gap-2 rounded-[20px] bg-white/10 px-3 text-[12px] font-medium tracking-[0.14em] uppercase transition-colors hover:bg-white/15"
            >
              <span className="max-w-[11ch] truncate">{active.label}</span>
              <Chevron open={open} />
            </button>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-0.5 pr-0.5">
            {socialLinks.map((s) => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full text-paper-white/85 transition-opacity hover:opacity-70"
                aria-label={s.label}
              >
                {s.id === "instagram" ? <InstagramIcon /> : <XIcon />}
              </a>
            ))}
          </div>
        </div>

        {open ? (
          <div
            ref={menuRef}
            id="nav-section-menu"
            role="listbox"
            aria-label="Sections"
            className="absolute top-[calc(100%+8px)] left-0 min-w-[200px] overflow-hidden rounded-[16px] border border-white/15 bg-obsidian/95 py-1.5 text-paper-white backdrop-blur-md"
          >
            {navLinks.map((link) => {
              const isActive = link.id === activeId;
              return (
                <button
                  key={link.id}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => goTo(link.href, link.id)}
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-[13px] font-medium tracking-[0.04em] transition-colors hover:bg-white/10 ${
                    isActive ? "bg-white/10 text-paper-white" : "text-paper-white/75"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive ? (
                    <span className="h-1.5 w-1.5 rounded-full bg-paper-white" aria-hidden />
                  ) : null}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </header>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M2 3.5L5 6.5L8 3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L2.25 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}
