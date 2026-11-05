/**
 * Career metrics for the scroll-driven numbers parade after the hero.
 * Verified against ATP Tour bio / tribute sources (singles titles, ranking, Olympics).
 */

export type CareerMetric = {
  id: string;
  /** Large display — can be "3", "16", "No. 3", "2014" */
  value: string;
  label: string;
  detail: string;
  /** Optional years / secondary type line */
  aside?: string;
};

export const titlesOverview = {
  sectionEyebrow: "By the numbers",
  /** Scroll-scrubbed beats — not a chart, not a timer carousel */
  metrics: [
    {
      id: "slams",
      value: "3",
      label: "Grand Slam singles titles",
      detail: "Three majors — each against the world No. 1 in the final.",
      aside: "AO · RG · USO",
    },
    {
      id: "tour",
      value: "16",
      label: "ATP singles titles",
      detail: "Tour-level crowns across hard, clay, and the long grind.",
      aside: "2006 — 2024",
    },
    {
      id: "olympic",
      value: "1",
      label: "Olympic doubles gold",
      detail: "Beijing 2008 — with Roger Federer for Switzerland.",
      aside: "2008",
    },
    {
      id: "rank",
      value: "No. 3",
      label: "Career-high singles ranking",
      detail: "Reached 27 January 2014 — the week after Melbourne.",
      aside: "Peak",
    },
    {
      id: "years",
      value: "’14–’16",
      label: "The championship years",
      detail: "Three consecutive seasons. Three different majors.",
      aside: "AO · RG · US Open",
    },
  ] satisfies CareerMetric[],
} as const;
