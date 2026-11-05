/**
 * Title-by-title Grand Slam parade — typography format (year → tournament → note).
 * Verified finals / scores from ATP Tour records.
 */

export type CareerMetric = {
  id: string;
  value: string;
  label: string;
  detail: string;
  aside?: string;
};

export const titlesOverview = {
  sectionEyebrow: "Grand Slams",
  metrics: [
    {
      id: "ao-2014",
      value: "2014",
      label: "Australian Open",
      detail: "Defeated the world No. 1 in the final for his first major.",
      aside: "Final · Rafael Nadal · 6–3, 6–2, 3–6, 6–3",
    },
    {
      id: "rg-2015",
      value: "2015",
      label: "Roland-Garros",
      detail: "Claimed the Coupe des Mousquetaires on his favorite surface.",
      aside: "Final · Novak Djokovic · 4–6, 6–4, 6–3, 6–4",
    },
    {
      id: "uso-2016",
      value: "2016",
      label: "US Open",
      detail: "Third major — again beating the reigning world No. 1 in a Slam final.",
      aside: "Final · Novak Djokovic · 6–7, 6–4, 7–5, 6–3",
    },
  ] satisfies CareerMetric[],
} as const;
