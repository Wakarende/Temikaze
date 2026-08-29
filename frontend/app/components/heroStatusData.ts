export type HeroStatusCard = {
  href: string;
  eyebrow: string;
  title: string;
  tone: "release" | "mix";
};

export const HERO_STATUS_CARDS: HeroStatusCard[] = [
  {
    href: "#music",
    eyebrow: "Latest Release",
    title: "Nia",
    tone: "release",
  },
  {
    href: "#music",
    eyebrow: "Latest Mix",
    title: "Mum's Garage Radio",
    tone: "mix",
  },
];
