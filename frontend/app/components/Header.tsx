"use client";

import { type MouseEvent, useRef, useState } from "react";
import styles from "./Header.module.css";
import MobileMenu from "./MobileMenu";
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
  const [menuMounted, setMenuMounted] = useState(false);
  const [menuPress, setMenuPress] = useState(0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const navigateToHref = (href: string) => {
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

  const navigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    navigateToHref(href);
  };

  const openMenu = () => {
    setMenuPress((press) => press + 1);
    setMenuMounted(true);
  };

  const finishMenuClose = (navigationTarget?: string) => {
    setMenuMounted(false);
    requestAnimationFrame(() => {
      if (navigationTarget) navigateToHref(navigationTarget);
      else menuButtonRef.current?.focus();
    });
  };

  const squash =
    menuPress === 0
      ? ""
      : menuPress % 2 === 1
        ? styles.pressA
        : styles.pressB;

  return (
    <>
      <header className={styles.header} data-primary-header>
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
          <button
            ref={menuButtonRef}
            type="button"
            className={`${styles.mobileMenuButton} ${squash}`.trim()}
            aria-expanded={menuMounted}
            aria-haspopup="dialog"
            onClick={openMenu}
          >
            <span className={styles.labelMask}>
              <span
                key={menuPress}
                className={`${styles.labelRoll} ${
                  menuMounted ? styles.rollToggle : ""
                }`.trim()}
              >
                <span className={styles.label}>menu</span>
                <span className={styles.label} aria-hidden="true">
                  {menuMounted ? "close" : "menu"}
                </span>
              </span>
            </span>
          </button>
        </div>
      </header>
      {menuMounted ? <MobileMenu onClosed={finishMenuClose} /> : null}
    </>
  );
}
