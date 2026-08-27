export type ContactLink = {
  id: string;
  label: string;
  href: string;
};

// Verified production destinations. Kept in their own module so Phase 10's
// swap to WordPress REST data touches only this file, matching the
// musicData.ts / galleryData.ts pattern.
//
// No tracking parameters are appended to any destination.

export const LINKTREE: ContactLink = {
  id: "linktree",
  label: "linktree",
  href: "https://linktr.ee/temikaze",
};

export const SOCIAL_LINKS: ContactLink[] = [
  {
    id: "instagram",
    label: "instagram",
    href: "https://www.instagram.com/yvonnemutemi/",
  },
  { id: "tiktok", label: "tiktok", href: "https://www.tiktok.com/@temikaze" },
  { id: "youtube", label: "youtube", href: "https://www.youtube.com/@Temikaze" },
  {
    id: "soundcloud",
    label: "soundcloud",
    href: "https://soundcloud.com/temikaze",
  },
];

// The verified production booking address. The hello@temikaze.com shown in the
// design mockup was placeholder artwork only and is deliberately not used.
export const CONTACT_EMAIL = "temipromo@gmail.com";
