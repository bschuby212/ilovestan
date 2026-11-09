import type { StanMediaKey } from "@/data/media";

/**
 * Career / tour depth after the three Slams CTA.
 * Chronological-ish tour highlights below Masters 1000 + home soil.
 */
export const subThousandTitles = [
  {
    id: "oly-2008",
    label: "Olympic gold",
    year: "2008",
    meta: "Beijing · Federer",
    image: "wimbledon" as StanMediaKey,
  },
  {
    id: "mc-2014",
    label: "Monte-Carlo",
    year: "2014",
    meta: "Masters · d. Federer",
    image: "basel" as StanMediaKey,
  },
  {
    id: "rotterdam-2015",
    label: "Rotterdam",
    year: "2015",
    meta: "ATP 500",
    image: "heroDepth" as StanMediaKey,
  },
] as const;

export const atpTitlesUrl =
  "https://www.atptour.com/en/players/stan-wawrinka/w367/titles-and-finals";
