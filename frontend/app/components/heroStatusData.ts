export type HeroStatusCard = {
  href: string;
  musicItemId: string;
  eyebrow: string;
  title: string;
  tone: "release" | "mix";
};

export const HERO_STATUS_CARDS: HeroStatusCard[] = [
  {
    href: "#music",
    musicItemId: "nia",
    eyebrow: "Latest Release",
    title: "Nia",
    tone: "release",
  },
  {
    href: "#music",
    musicItemId: "mums-garage-radio",
    eyebrow: "Latest Mix",
    title: "Mum's Garage Radio",
    tone: "mix",
  },
];
