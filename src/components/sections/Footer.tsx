import { navLinks, site } from "@/data/content";

const columns = [
  {
    title: "Explore",
    links: navLinks.map((l) => ({ label: l.label, href: l.href })),
  },
  {
    title: "Sources",
    links: [
      { label: "ATP Tour bio", href: "https://www.atptour.com/en/players/stan-wawrinka/w367/bio" },
      {
        label: "Retirement note",
        href: "https://www.atptour.com/en/news/wawrinka-retirement-basel-2026",
      },
      { label: "Let It Beat", href: "https://letitbeat.org/" },
      { label: "stanwawrinka.com", href: "https://www.stanwawrinka.com/" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Unofficial tribute", href: "#tribute" },
      { label: "Media placeholders", href: "#top" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-concrete-gray bg-paper-white text-obsidian">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-[20px] font-medium">Stan Wawrinka</p>
            <p className="mt-2 max-w-sm text-[16px] text-steel">{site.description}</p>
          </div>
          <p className="text-[16px] text-steel">Switzerland</p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-10 md:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-[16px] font-medium md:text-[20px]">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[16px] text-steel transition-opacity hover:opacity-70"
                      {...(link.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="hairline mt-14" />
        <p className="mt-6 text-[12px] text-steel">{site.credit}</p>
      </div>
    </footer>
  );
}
