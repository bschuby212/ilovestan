export const site = {
  title: "Stan Wawrinka — A Digital Tribute",
  description:
    "An independent cinematic tribute to Stanislas Wawrinka: three Grand Slams, Olympic gold, and a career defined by heart.",
  credit: "Independent, unofficial fan tribute. Not affiliated with Stan Wawrinka or the ATP.",
};

/** Primary section anchors — dropdown label tracks the active one on scroll */
export const navLinks = [
  { href: "#top", label: "Home", id: "top" },
  { href: "#grand-slams", label: "Grand Slams", id: "grand-slams" },
  { href: "#fail-better", label: "Fail Better", id: "fail-better" },
  { href: "#backhand", label: "Backhand", id: "backhand" },
  { href: "#testimonials", label: "Voices", id: "testimonials" },
  { href: "#achievements", label: "Record", id: "achievements" },
  { href: "#beyond", label: "Beyond", id: "beyond" },
  { href: "#timeline", label: "Timeline", id: "timeline" },
  { href: "#tribute", label: "Legacy", id: "tribute" },
] as const;

/** Official Stan socials — filler logo for now; real mark later */
export const socialLinks = [
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/stanwawrinka/",
  },
  {
    id: "x",
    label: "X",
    href: "https://x.com/stanwawrinka",
  },
] as const;

export const grandSlams = [
  {
    id: "ao-2014",
    year: "2014",
    tournament: "Australian Open",
    surface: "Hard court",
    courtColor: "ao" as const,
    opponent: "Rafael Nadal",
    score: "6–3, 6–2, 3–6, 6–3",
    note: "Defeated the world No. 1 in the final for his first major.",
    stat: "First Slam",
    image: "serve" as const,
  },
  {
    id: "rg-2015",
    year: "2015",
    tournament: "Roland-Garros",
    surface: "Clay",
    courtColor: "rg" as const,
    opponent: "Novak Djokovic",
    score: "4–6, 6–4, 6–3, 6–4",
    note: "Claimed the Coupe des Mousquetaires on his favorite surface.",
    stat: "Clay crown",
    image: "queens" as const,
  },
  {
    id: "uso-2016",
    year: "2016",
    tournament: "US Open",
    surface: "Hard court",
    courtColor: "uso" as const,
    opponent: "Novak Djokovic",
    score: "6–7, 6–4, 7–5, 6–3",
    note: "Third major — again beating the reigning world No. 1 in a Slam final.",
    stat: "Third major",
    image: "usOpen" as const,
  },
] as const;

export const achievements = [
  {
    title: "Australian Open",
    year: "2014",
    kind: "Grand Slam",
    detail: "Singles champion — d. Nadal",
    featured: true,
  },
  {
    title: "Roland-Garros",
    year: "2015",
    kind: "Grand Slam",
    detail: "Singles champion — d. Djokovic",
    featured: true,
  },
  {
    title: "US Open",
    year: "2016",
    kind: "Grand Slam",
    detail: "Singles champion — d. Djokovic",
    featured: true,
  },
  {
    title: "Olympic gold",
    year: "2008",
    kind: "Beijing",
    detail: "Men's doubles with Roger Federer",
    featured: true,
  },
  {
    title: "Davis Cup",
    year: "2014",
    kind: "Team",
    detail: "Switzerland's first Davis Cup title",
    featured: true,
  },
  {
    title: "Career-high ranking",
    year: "2014",
    kind: "ATP",
    detail: "World No. 3 — 27 January 2014",
    featured: false,
  },
  {
    title: "ATP singles titles",
    year: "2002–2026",
    kind: "Tour",
    detail: "16 tour-level singles titles",
    featured: false,
  },
  {
    title: "Monte-Carlo Masters",
    year: "2014",
    kind: "Masters 1000",
    detail: "Lone Masters crown — d. Federer",
    featured: false,
  },
  {
    title: "Tour-level wins",
    year: "Career",
    kind: "Record",
    detail: "590 match wins",
    featured: false,
  },
] as const;

export const beyondStories = [
  {
    title: "Let It Beat",
    eyebrow: "Philanthropy",
    summary:
      "Stan supports Let It Beat, a Swiss nonprofit funding humanitarian pediatric heart surgery for disadvantaged children.",
    href: "https://letitbeat.org/",
    cta: "Visit Let It Beat",
  },
  {
    title: "Everest on his forearm",
    eyebrow: "Mentality",
    summary:
      "The tattooed Samuel Beckett line — “Ever tried. Ever failed. No matter. Try again. Fail again. Fail better.” — became shorthand for his competitive identity.",
    href: "https://www.atptour.com/en/players/stan-wawrinka/w367/bio",
    cta: "ATP biography",
  },
  {
    title: "Parents' organic farm",
    eyebrow: "Roots",
    summary:
      "Raised in Switzerland by parents who run an organic farm employing and supporting people with disabilities — a foundation of humility behind the firepower.",
    href: "https://www.atptour.com/en/players/stan-wawrinka/w367/bio",
    cta: "Read the bio",
  },
  {
    title: "Retirement in Basel",
    eyebrow: "2026",
    summary:
      "At 41, Wawrinka closed his career at home in Basel — a fans' favourite remembered for the one-handed backhand and for beating No. 1s when it mattered most.",
    href: "https://www.atptour.com/en/news/wawrinka-retirement-basel-2026",
    cta: "ATP farewell",
  },
] as const;

export const timeline = [
  {
    year: "2002",
    title: "Turns professional",
    body: "Begins the ATP journey from Lausanne.",
    image: "portrait" as const,
  },
  {
    year: "2008",
    title: "Olympic gold — Beijing",
    body: "Men's doubles champion with Roger Federer.",
    image: "wimbledon" as const,
  },
  {
    year: "2013",
    title: "Breakthrough season",
    body: "First Masters final in Madrid; Swiss of the Year.",
    image: "usOpen" as const,
  },
  {
    year: "2014",
    title: "Australian Open champion",
    body: "First major — defeats world No. 1 Nadal in the final.",
    image: "serve" as const,
  },
  {
    year: "2014",
    title: "Davis Cup & Monte-Carlo",
    body: "Switzerland's first Davis Cup; Masters title over Federer.",
    image: "heroDepth" as const,
  },
  {
    year: "2015",
    title: "Roland-Garros champion",
    body: "Second Slam — defeats Djokovic on clay in Paris.",
    image: "queens" as const,
  },
  {
    year: "2016",
    title: "US Open champion",
    body: "Third Slam — again beats Djokovic in a major final.",
    image: "usOpen" as const,
  },
  {
    year: "2017",
    title: "Knee surgeries",
    body: "Two left-knee operations interrupt a streak of 50 straight Slams.",
    image: "portrait" as const,
  },
  {
    year: "2021",
    title: "Foot surgeries & return",
    body: "Further setbacks; keeps fighting back onto tour.",
    image: "hero" as const,
  },
  {
    year: "2026",
    title: "Final season",
    body: "Retires at Swiss Indoors Basel after a career of 590 wins.",
    image: "basel" as const,
  },
] as const;

export const quote = {
  text: "Ever tried. Ever failed. No matter. Try again. Fail again. Fail better.",
  attribution: "Samuel Beckett — inked on Stan's forearm",
};
