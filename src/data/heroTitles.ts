/** Hero right-rail title tally — Stan’s major crowns only. */
export const heroTitleRows = [
  { id: "ao", label: "Australian Open", short: "AO", count: 1, year: "2014" },
  { id: "rg", label: "Roland-Garros", short: "RG", count: 1, year: "2015" },
  { id: "uso", label: "US Open", short: "USO", count: 1, year: "2016" },
  { id: "mc", label: "Monte-Carlo", short: "M1000", count: 1, year: "2014" },
  { id: "oly", label: "Olympic gold", short: "OG", count: 1, year: "2008" },
] as const;

export const heroTitleHeader = {
  eyebrow: "Major titles",
  mark: "3× Slam",
  note: "Plus Masters & Olympic gold",
} as const;
