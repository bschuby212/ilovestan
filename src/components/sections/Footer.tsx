import { site, socialLinks } from "@/data/content";

/** Minimal footer — name, socials, credit. */
export function Footer() {
  return (
    <footer className="border-t border-concrete-gray bg-paper-white text-obsidian">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10 md:py-12">
        <div>
          <p className="text-[18px] font-medium">Stan Wawrinka</p>
          <p className="mt-1 text-[13px] text-steel">{site.credit}</p>
        </div>
        <ul className="flex flex-wrap items-center gap-5">
          {socialLinks.map((s) => (
            <li key={s.id}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-steel transition-opacity hover:opacity-70"
              >
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="https://www.atptour.com/en/players/stan-wawrinka/w367/overview"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] text-steel transition-opacity hover:opacity-70"
            >
              ATP
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
