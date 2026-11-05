/** Full-viewport title chapters — vertical lists, fluid cycle */

export type TitleChapter = {
  id: string;
  eyebrow: string;
  lines: { primary: string; secondary?: string }[];
};

export const titlesOverview = {
  sectionEyebrow: "By the numbers",
  chapters: [
    {
      id: "slams",
      eyebrow: "Grand Slams",
      lines: [
        { primary: "Australian Open", secondary: "2014" },
        { primary: "Roland-Garros", secondary: "2015" },
        { primary: "US Open", secondary: "2016" },
      ],
    },
    {
      id: "masters",
      eyebrow: "Masters 1000",
      lines: [{ primary: "Monte-Carlo", secondary: "2014" }],
    },
    {
      id: "olympics",
      eyebrow: "Olympics",
      lines: [{ primary: "Beijing doubles gold", secondary: "2008" }],
    },
    {
      id: "davis",
      eyebrow: "Davis Cup",
      lines: [{ primary: "Switzerland", secondary: "2014" }],
    },
    {
      id: "rank",
      eyebrow: "Peak",
      lines: [{ primary: "Career-high No. 3", secondary: "2014" }],
    },
  ] satisfies TitleChapter[],
} as const;
