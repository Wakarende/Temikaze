export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
};

// Local static data for Phase 8. Replaced by WordPress REST data in Phase 10 —
// kept in its own file so that swap only touches this module, not StageVisuals.tsx.
//
// Order is the approved gallery order: photography and event graphics alternate
// so neighbouring items read as visually distinct at the muted flanking size.
// Alt text is the approved wording. It deliberately does not transcribe the
// event dates, times, venue or billing that are legible inside the posters, and
// does not name anyone.
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "performance-01",
    src: "/images/gallery/temikaze-performance-01.webp",
    alt: "Temikaze performing behind a Pioneer DJ mixer under purple, red and green lighting.",
  },
  {
    id: "event-02",
    src: "/images/gallery/temikaze-event-02.webp",
    alt: "TG & fRenz event poster featuring Temikaze performing in a crowd.",
  },
  {
    id: "booth-01",
    src: "/images/gallery/temikaze-booth-01.webp",
    alt: "Temikaze cueing a track with headphones beside DJ equipment under red and green lighting.",
  },
  {
    id: "event-01",
    src: "/images/gallery/temikaze-event-01.webp",
    alt: "TG & fRenz event poster with a DJ mixer photograph and event branding.",
  },
  {
    id: "performance-02",
    src: "/images/gallery/temikaze-performance-02.webp",
    alt: "Temikaze performing alongside another DJ at a Pioneer DJ setup under red and green lighting.",
  },
  {
    id: "cover-let-go",
    src: "/images/gallery/temikaze-cover-let-go.jpg",
    alt: "Blue Pendo EP artwork for Let Go by Temikaze and Musa.",
  },
];
