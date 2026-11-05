/**
 * Photos Folder content — Grand Slams, Masters 1000s, Olympics only.
 * Swap `photos[].src` for licensed match / trophy shots when ready.
 * Framer source reference: https://framer.com/m/Photos-Folder-yBkU.js
 */

export type FolderPhoto = {
  src: string;
  alt: string;
  caption: string;
};

export type TournamentFolder = {
  id: string;
  label: string;
  subtitle: string;
  year: string;
  sticker?: string;
  photos: FolderPhoto[];
};

export const tournamentFoldersSection = {
  eyebrow: "The cabinet",
  title: "Trophy folders",
  lede: "Grand Slams, Masters 1000, Olympics — hover a folder to peek inside.",
  framerNote:
    "Interaction patterned on Framer Photos Folder (yBkU). Drop final photos anytime.",
} as const;

export const tournamentFolders: TournamentFolder[] = [
  {
    id: "grand-slams",
    label: "Grand Slams",
    subtitle: "3 singles majors",
    year: "2014–16",
    sticker: "Majors",
    photos: [
      {
        src: "/media/stan/serve-chennai.jpg",
        alt: "Stan Wawrinka — Australian Open era",
        caption: "Australian Open 2014 · d. Nadal",
      },
      {
        src: "/media/stan/queens-2015.jpg",
        alt: "Stan Wawrinka — Roland-Garros era",
        caption: "Roland-Garros 2015 · d. Djokovic",
      },
      {
        src: "/media/stan/us-open-2013.jpg",
        alt: "Stan Wawrinka — US Open era",
        caption: "US Open 2016 · d. Djokovic",
      },
      {
        src: "/media/stan/backhand-wimbledon-2023.jpg",
        alt: "Stan Wawrinka one-handed backhand",
        caption: "The stroke behind three majors",
      },
    ],
  },
  {
    id: "masters-1000",
    label: "Masters 1000",
    subtitle: "1 crown",
    year: "2014",
    sticker: "M1000",
    photos: [
      {
        src: "/media/stan/groundstroke-2015.jpg",
        alt: "Stan Wawrinka groundstroke",
        caption: "Monte-Carlo 2014 · d. Federer",
      },
      {
        src: "/media/stan/portrait-2019.jpg",
        alt: "Stan Wawrinka portrait",
        caption: "Lone Masters title on clay",
      },
      {
        src: "/media/stan/queens-2015.jpg",
        alt: "Stan Wawrinka at Queen's",
        caption: "Rolex Monte-Carlo Masters",
      },
      {
        src: "/media/stan/basel-2024.jpg",
        alt: "Stan Wawrinka Basel",
        caption: "Big Title · Monaco",
      },
    ],
  },
  {
    id: "olympics",
    label: "Olympics",
    subtitle: "Doubles gold",
    year: "2008",
    sticker: "Gold",
    photos: [
      {
        src: "/media/stan/wimbledon-2013.jpg",
        alt: "Stan Wawrinka Wimbledon",
        caption: "Beijing 2008 · w/ Federer",
      },
      {
        src: "/media/stan/portrait-2019.jpg",
        alt: "Stan Wawrinka",
        caption: "Men's doubles gold medal",
      },
      {
        src: "/media/stan/backhand-wimbledon-2023.jpg",
        alt: "Stan Wawrinka backhand",
        caption: "Switzerland · Olympic champions",
      },
      {
        src: "/media/stan/serve-chennai.jpg",
        alt: "Stan Wawrinka serve",
        caption: "Aspelin / Johansson in the final",
      },
    ],
  },
];
