/**
 * Verified player / legend quotes about Stan.
 * Sources linked — do not invent attributions.
 */

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  source: string;
  sourceHref: string;
  /** Single letter / initials for avatar tile (no fake portraits) */
  mark: string;
};

export const testimonialsSection = {
  eyebrow: "From the locker room",
  title: "What they said",
} as const;

export const testimonials: Testimonial[] = [
  {
    id: "federer",
    name: "Roger Federer",
    role: "20× Grand Slam champion · teammate",
    mark: "RF",
    quote:
      "I want to thank you from the bottom of my heart for your absolutely incredible career. It’s wonderful that we’ve been able to experience so much together — Davis Cup in Lille, the Olympic Games in Beijing. These are things I will never forget.",
    source: "ATP Tour — player tributes, 2026",
    sourceHref:
      "https://www.atptour.com/en/news/wawrinka-retirement-2026-player-messages",
  },
  {
    id: "djokovic",
    name: "Novak Djokovic",
    role: "24× Grand Slam champion",
    mark: "ND",
    quote:
      "Stan primarily is a great person. Someone I truly appreciate and respect. One of the best players we had in the last 20, 30 years of tennis. He should be celebrated. He definitely deserves all of his flowers.",
    source: "ATP Tour — player tributes, 2026",
    sourceHref:
      "https://www.atptour.com/en/news/wawrinka-retirement-2026-player-messages",
  },
  {
    id: "murray",
    name: "Andy Murray",
    role: "3× Grand Slam champion",
    mark: "AM",
    quote:
      "Three Grand Slams, one of the best backhands of all time, and a good guy as well. All the best with whatever is next — the sport will miss you.",
    source: "ATP Tour — player tributes, 2026",
    sourceHref:
      "https://www.atptour.com/en/news/wawrinka-retirement-2026-player-messages",
  },
  {
    id: "wilander",
    name: "Mats Wilander",
    role: "7× Grand Slam champion",
    mark: "MW",
    quote:
      "I think no-one compares to Wawrinka’s backhand. No-one was able to hit it as hard as he was able to hit it. To me, his backhand is easily the best one-handed backhand.",
    source: "TNT Sports / Wilander, 2026",
    sourceHref:
      "https://www.tntsports.co.uk/tennis/roland-garros/2026/stan-wawrinka-one-handed-backhand-roger-federer-dominic-thiem-grand-slam_sto23303966/story.shtml",
  },
  {
    id: "thiem",
    name: "Dominic Thiem",
    role: "US Open champion",
    mark: "DT",
    quote:
      "For me, Stan is number one — then Gasquet, then Roger — among the one-handed backhands of all time.",
    source: "More Than A Name podcast / The Tennis Gazette",
    sourceHref:
      "https://www.thetennisgazette.com/news/dominic-thiem-names-his-top-five-one-handed-backhand-players-of-all-time/",
  },
];
