/**
 * Verified one-handed backhand comparison data.
 * Speeds: Hawk-Eye AO 2014–2016 groundstroke averages (on-the-t).
 * RPM: Tennisplayer / Yandell–Fawcette compiled chart (~2021).
 * Winners note: 2015 Roland-Garros final (ATP / match reports).
 */

export const backhandSection = {
  eyebrow: "The weapon",
  title: "One-handed backhand",
  lede: "Heavy through contact — the stroke that ended rallies and defined a career.",
} as const;

export const backhandPlayers = [
  {
    id: "stan",
    name: "Stan Wawrinka",
    short: "Stan",
    emphasis: true,
    media: "hero" as const,
    avgSpeedMph: 75,
    spinRpm: 2500,
    profile: "Heavy drive — top average pace among tracked one-handers",
    notes: [
      "AO Hawk-Eye avg ~75 mph at impact (2014–2016)",
      "Spin ~2,500 RPM — matches his forehand RPM",
      "Flat-to-heavy trajectory that finishes points DTL & cross",
    ],
  },
  {
    id: "federer",
    name: "Roger Federer",
    short: "Federer",
    emphasis: false,
    media: "wimbledon" as const,
    avgSpeedMph: 68,
    spinRpm: 2260,
    profile: "Heavier roll, less raw pace — buys time to run around",
    notes: [
      "AO Hawk-Eye group under ~70 mph average",
      "Spin ~2,260 RPM — classic looping one-hander",
      "More variation; historically less stable under pressure",
    ],
  },
  {
    id: "gasquet",
    name: "Richard Gasquet",
    short: "Gasquet",
    emphasis: false,
    media: "queens" as const,
    avgSpeedMph: 72,
    spinRpm: 2910,
    profile: "Highest spin ceiling — pace and shape on demand",
    notes: [
      "Top recorded BH spin among peers (~2,910 RPM)",
      "Can flatten up for pace or load for shape",
      "Widest “top end” toolkit of the classic one-handers",
    ],
  },
] as const;

export const backhandCallouts = [
  {
    label: "Average backhand",
    value: 75,
    format: "plain" as const,
    unit: "mph",
  },
  {
    label: "Average spin",
    value: 2500,
    format: "comma" as const,
    unit: "RPM",
  },
  {
    label: "Total winners",
    value: 60,
    format: "plain" as const,
    unit: "RG ’15",
  },
] as const;

export const backhandSources = [
  {
    label: "AO backhand speeds (Hawk-Eye 2014–2016)",
    href: "https://on-the-t.github.io/2016/10/22/AOLeaderboard-Backhand-Speed/",
  },
  {
    label: "Tennisplayer — heavy ball / RPM chart",
    href: "https://old.tennisplayer.net/members/mystheavyball/john_yandell/modern_heavy_ball/",
  },
  {
    label: "Dominating Tennis — Wawrinka backhand notes",
    href: "https://www.dominatingtennis.com/pros/wawrinka/backhand",
  },
] as const;
