export type MediaAsset = {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ArtistContent = {
  title: string;
  tagline: string;
  biography: string[];
  heroImage: MediaAsset;
  bioImage: MediaAsset;
};

export type ContactLink = {
  id: string;
  label: string;
  href: string;
};

export type ContactContent = {
  email: string;
  linktree: ContactLink;
  socialLinks: ContactLink[];
};

export type HeroStatusCard = {
  href: string;
  musicItemId: string;
  eyebrow: string;
  title: string;
  tone: "release" | "mix";
};

export type MusicItem = {
  id: string;
  title: string;
  year: number;
  date: string;
  type: "release" | "mix";
  artwork: string;
  artworkAlt: string;
  preview: string;
  url: string;
};

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
};

export type SiteContent = {
  artist: ArtistContent;
  contact: ContactContent;
  heroStatusCards: HeroStatusCard[];
  musicItems: MusicItem[];
  galleryItems: GalleryItem[];
};
