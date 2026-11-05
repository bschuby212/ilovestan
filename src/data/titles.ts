import type { StanMediaKey } from "@/data/media";

/** Grand Slam / Olympic / Davis Cup / Masters — big titles */
export const bigTitles = [
  {
    id: "ao-2014",
    label: "Australian Open",
    year: "2014",
    meta: "d. Nadal",
    tier: "Grand Slam",
    image: "serve" as StanMediaKey,
  },
  {
    id: "rg-2015",
    label: "Roland-Garros",
    year: "2015",
    meta: "d. Djokovic",
    tier: "Grand Slam",
    image: "queens" as StanMediaKey,
  },
  {
    id: "uso-2016",
    label: "US Open",
    year: "2016",
    meta: "d. Djokovic",
    tier: "Grand Slam",
    image: "usOpen" as StanMediaKey,
  },
  {
    id: "oly-2008",
    label: "Olympic gold",
    year: "2008",
    meta: "Doubles · Federer",
    tier: "Olympics",
    image: "wimbledon" as StanMediaKey,
  },
  {
    id: "dc-2014",
    label: "Davis Cup",
    year: "2014",
    meta: "Switzerland",
    tier: "Team",
    image: "heroDepth" as StanMediaKey,
  },
  {
    id: "mc-2014",
    label: "Monte-Carlo",
    year: "2014",
    meta: "Masters · d. Federer",
    tier: "Masters 1000",
    image: "basel" as StanMediaKey,
  },
] as const;

/**
 * Biggest titles below Masters 1000 (ATP 500 / standout 250s).
 * Card row + CTA to full ATP titles page.
 */
export const subThousandTitles = [
  {
    id: "rotterdam-2015",
    label: "Rotterdam",
    year: "2015",
    meta: "ATP 500",
    image: "heroDepth" as StanMediaKey,
  },
  {
    id: "chennai",
    label: "Chennai",
    year: "4×",
    meta: "ATP 250",
    image: "serve" as StanMediaKey,
  },
  {
    id: "geneva",
    label: "Geneva",
    year: "Home",
    meta: "ATP 250",
    image: "portrait" as StanMediaKey,
  },
] as const;

export const atpTitlesUrl =
  "https://www.atptour.com/en/players/stan-wawrinka/w367/titles-and-finals";
