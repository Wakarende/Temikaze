"use client";

import type { MouseEvent } from "react";
import styles from "./Header.module.css";
import {
  ARTIST_BIO_NAVIGATION_EVENT,
  navigateToSection,
} from "./siteNavigation";

const NAV_LINKS = [
  { href: "#music", label: "music" },
  { href: "#visuals", label: "visuals" },
  { href: "#booking", label: "booking" },
];

export default function Header() {
  const navigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();

    if (document.documentElement.dataset.artistBioOpen === "true") {
      window.dispatchEvent(
        new CustomEvent(ARTIST_BIO_NAVIGATION_EVENT, {
          detail: { href },
        })
      );
      return;
    }

    navigateToSection(href);
  };

  return (
    <header className={styles.header}>
      <div className={`page-shell ${styles.inner}`}>
        <a
          href="#hero"
          className={styles.wordmark}
          onClick={(event) => navigate(event, "#hero")}
        >
          Temikaze
        </a>
        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.navList}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(event) => navigate(event, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
