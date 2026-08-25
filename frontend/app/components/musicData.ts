export type MusicItem = {
  id: string;
  title: string;
  type: "release" | "mix";
  artwork: string;
};

// Local static data for Phase 6. Replaced by WordPress REST data in Phase 10 —
// kept in its own file so that swap only touches this module, not Music.tsx.
export const MUSIC_ITEMS: MusicItem[] = [
  {
    id: "nia",
    title: "Nia",
    type: "release",
    artwork: "/images/music/nia.webp",
  },
  {
    id: "let-go",
    title: "Let Go",
    type: "release",
    artwork: "/images/music/let-go.webp",
  },
  {
    id: "gone",
    title: "Gone",
    type: "release",
    artwork: "/images/music/gone.webp",
  },
  {
    id: "mums-garage-radio",
    title: "Mum's Garage Radio",
    type: "mix",
    artwork: "/images/music/mums-garage-radio.jpg",
  },
];
