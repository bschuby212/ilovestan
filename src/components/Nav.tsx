"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/data/content";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#top"
          className="font-[family-name:var(--font-ui)] text-[12px] font-medium tracking-[0.18em] uppercase text-paper-white"
          aria-label="Stan Wawrinka tribute — home"
        >
          Stan
        </a>

        <nav
          className={`hidden items-center gap-6 md:flex ${scrolled ? "opacity-90" : ""}`}
          aria-label="Primary"
        >
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

        <a href="#tribute" className="pill pill--light text-[14px] md:text-[16px]">
          Legacy
        </a>
      </div>
    </header>
  );
}
