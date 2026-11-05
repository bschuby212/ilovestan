"use client";

import { socialLinks } from "@/data/content";

/**
 * Minimal secondary chrome — filler logo + socials only.
 * Section dropdown removed; scroll does the navigating.
 */
export function Nav() {
  return (
    <header
      className="pointer-events-none fixed top-4 left-4 z-50 md:top-6 md:left-6"
      aria-label="Site"
    >
      <div className="pointer-events-auto flex items-center gap-1 rounded-[24px] border border-white/15 bg-obsidian/90 p-1 text-paper-white backdrop-blur-md">
        <a
          href="#top"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper-white text-obsidian transition-opacity hover:opacity-80"
          aria-label="Stan — home"
        >
          <span className="text-[11px] font-medium tracking-[0.04em]">SW</span>
        </a>

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
          {/* Menu action TBD — icon only for now */}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full text-paper-white/90 transition-opacity hover:opacity-70"
            aria-label="Menu"
          >
            <HamburgerIcon />
          </button>
        </div>
      </div>
    </header>
  );
}

function HamburgerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
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
