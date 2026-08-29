export const ARTIST_BIO_NAVIGATION_EVENT =
  "temikaze:artist-bio-navigation";
export const RETURN_HOME_EVENT = "temikaze:return-home";

export type ArtistBioNavigationDetail = {
  href: string;
};

const getScrollTop = () =>
  window.scrollY ||
  document.documentElement.scrollTop ||
  document.body.scrollTop ||
  0;

export const navigateToSection = (href: string) => {
  const target = document.querySelector<HTMLElement>(href);
  if (!target) return;

  if (href === "#hero") {
    window.history.pushState(null, "", href);
    window.scrollTo({ top: 0, behavior: "auto" });
    window.dispatchEvent(new Event(RETURN_HOME_EVENT));
    return;
  }

  const currentScrollTop = getScrollTop();
  const targetTop = currentScrollTop + target.getBoundingClientRect().top;
  const sectionHeaderHeight = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--section-header-height"
    ) || "0"
  );
  const offset = href === "#music" || href === "#visuals"
    ? sectionHeaderHeight
    : 0;

  window.history.pushState(null, "", href);
  window.scrollTo({ top: Math.max(0, targetTop - offset), behavior: "auto" });
};
