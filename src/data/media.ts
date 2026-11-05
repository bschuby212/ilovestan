/** Real Stan Wawrinka photography — Wikimedia Commons CC licenses. See mediaCredits. */

export const stanMedia = {
  hero: {
    src: "/media/stan/backhand-wimbledon-2023.jpg",
    alt: "Stan Wawrinka hitting a one-handed backhand at Wimbledon 2023",
    credit: "LHC88 / Wikimedia Commons (CC BY 4.0)",
  },
  heroDepth: {
    src: "/media/stan/groundstroke-2015.jpg",
    alt: "Stan Wawrinka groundstroke, Rotterdam 2015",
    credit: "Wikimedia Commons",
  },
  basel: {
    src: "/media/stan/basel-2024.jpg",
    alt: "Stan Wawrinka at Basel",
    credit: "Skyscraper2010 / Wikimedia Commons (CC BY-SA 4.0)",
  },
  queens: {
    src: "/media/stan/queens-2015.jpg",
    alt: "Stan Wawrinka practicing at Queen's Club, 2015",
    credit: "Carine06 / Wikimedia Commons (CC BY-SA 2.0)",
  },
  wimbledon: {
    src: "/media/stan/wimbledon-2013.jpg",
    alt: "Stanislas Wawrinka at Wimbledon 2013",
    credit: "si.robi / Wikimedia Commons (CC BY-SA 2.0)",
  },
  usOpen: {
    src: "/media/stan/us-open-2013.jpg",
    alt: "Stan Wawrinka vs Marcos Baghdatis, US Open 2013",
    credit: "karlnorling / Wikimedia Commons (CC BY 2.0)",
  },
  serve: {
    src: "/media/stan/serve-chennai.jpg",
    alt: "Stan Wawrinka serve, Chennai Open",
    credit: "Wikimedia Commons (CC BY 4.0)",
  },
  portrait: {
    src: "/media/stan/portrait-2019.jpg",
    alt: "Stan Wawrinka portrait",
    credit: "Carine06 / Wikimedia Commons (CC BY-SA 2.0)",
  },
} as const;

export type StanMediaKey = keyof typeof stanMedia;
