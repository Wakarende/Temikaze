export type MusicItem = {
  id: string;
  title: string;
  year: number;
  type: "release" | "mix";
  artwork: string;
  preview: string;
  url: string;
};

// Local static data for Phase 6. Replaced by WordPress REST data in Phase 10 —
// kept in its own file so that swap only touches this module, not Music.tsx.
const MUSIC_ITEMS_SOURCE: MusicItem[] = [
  {
    id: "nia",
    title: "Nia",
    year: 2024,
    type: "release",
    artwork: "/images/music/nia.webp",
    preview: "/audio/previews/nia-preview.mp3",
    url: "https://open.spotify.com/track/30B5p9WgtGmasWgisd7BGf?si=ddc9fdcc6b974c75"
  },
  {
    id: "let-go",
    title: "Let Go",
    year: 2024,
    type: "release",
    artwork: "/images/music/let-go.webp",
    preview: "/audio/previews/let-go-preview.mp3",
    url:"https://open.spotify.com/track/6CGkYKWeTwDG0dP2irkYWM?si=618877c3f5c84ae5"
  },
  {
    id: "gone",
    title: "Gone",
    year: 2023,
    type: "release",
    artwork: "/images/music/gone.webp",
    preview: "/audio/previews/gone-preview.mp3",
    url: "https://open.spotify.com/track/71lajfMt6lAYgFwOtBNgt9?si=dc56a0d610014e83"
  },
  {
    id: "mums-garage-radio",
    title: "Mum's Garage",
    year: 2026,
    type: "mix",
    artwork: "/images/music/mums-garage-radio.jpg",
    preview: "/audio/previews/moms-garage-01-preview.mp3",
    url: "https://youtu.be/73_S0029lsw?si=bVJQG8XijmtiEAFl"
  },
];

// Combined releases and mixes are presented newest first. Modern JavaScript's
// stable sort preserves source order when two items share a year, so Nia stays
// ahead of Let Go until a more precise verified release date exists.
export const MUSIC_ITEMS = [...MUSIC_ITEMS_SOURCE].sort(
  (first, second) => second.year - first.year
);
