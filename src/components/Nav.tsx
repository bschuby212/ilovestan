"use client";

import { navLinks } from "@/data/content";

export function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 text-paper-white">
      {/* Utility tier — Nike MD: 12px Obsidian-on-white; here inverted for dark hero */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-[1440px] items-center justify-end gap-5 px-6 py-2 md:px-10">
          <a href="#beyond" className="text-[12px] font-medium tracking-[0.02em] text-paper-white/80 hover:opacity-70">
            Find help
          </a>
          <a href="#tribute" className="text-[12px] font-medium tracking-[0.02em] text-paper-white/80 hover:opacity-70">
            About this tribute
          </a>
        </div>
      </div>

      {/* Main tier */}
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-6 py-3 md:px-10">
        <a
          href="#top"
          className="text-[16px] font-medium tracking-[0.14em] uppercase"
          aria-label="Stan Wawrinka — home"
        >
          Stan
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[16px] font-medium text-paper-white/90 transition-opacity hover:opacity-70"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <label className="relative hidden sm:block">
            <span className="sr-only">Search</span>
            <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-steel">
              <SearchIcon />
            </span>
            <input
              type="search"
              placeholder="Search"
              className="w-[160px] rounded-[24px] border-0 bg-soft-mist py-[6px] pr-3 pl-9 text-[16px] text-obsidian placeholder:text-steel outline-none md:w-[200px]"
            />
          </label>
          <a href="#achievements" className="pill pill--light text-[14px] md:text-[16px]">
            Titles
          </a>
        </div>
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
