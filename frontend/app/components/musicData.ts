export type MusicItem = {
  id: string;
  title: string;
  year: number;
  type: "release" | "mix";
  artwork: string;
};

// Local static data for Phase 6. Replaced by WordPress REST data in Phase 10 —
// kept in its own file so that swap only touches this module, not Music.tsx.
export const MUSIC_ITEMS: MusicItem[] = [
  {
    id: "nia",
    title: "Nia",
    year: 2024,
    type: "release",
    artwork: "/images/music/nia.webp",
  },
  {
    id: "let-go",
    title: "Let Go",
    year: 2024,
    type: "release",
    artwork: "/images/music/let-go.webp",
  },
  {
    id: "gone",
    title: "Gone",
    year: 2023,
    type: "release",
    artwork: "/images/music/gone.webp",
  },
  {
    id: "mums-garage-radio",
    title: "Mum's Garage",
    year: 2026,
    type: "mix",
    artwork: "/images/music/mums-garage-radio.jpg",
  },
];
