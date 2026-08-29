"use client";

import {
  type CSSProperties,
  type MouseEvent,
  type TransitionEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { LinktreeIcon, MailIcon } from "./BrandIcons";
import { CONTACT_EMAIL, LINKTREE } from "./contactData";
import { HERO_STATUS_CARDS } from "./heroStatusData";
import styles from "./MobileMenu.module.css";

const NAV_LINKS = [
  { href: "#music", label: "music" },
  { href: "#visuals", label: "visuals" },
  { href: "#booking", label: "booking" },
];

const revealDelay = (delay: number) =>
  ({ "--menu-delay": `${delay}ms` }) as CSSProperties;

export default function MobileMenu({
  onClosed,
}: {
  onClosed: (navigationTarget?: string) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closingRef = useRef(false);
  const navigationTargetRef = useRef<string | undefined>(undefined);
  const [closing, setClosing] = useState(false);
  const [togglePress, setTogglePress] = useState(1);

  const finishClose = useCallback(() => {
    onClosed(navigationTargetRef.current);
  }, [onClosed]);

  const close = useCallback(
    (navigationTarget?: string) => {
      const panel = panelRef.current;
      if (!panel || closingRef.current) return;

      navigationTargetRef.current = navigationTarget;
      closingRef.current = true;
      setClosing(true);
      setTogglePress((press) => press + 1);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        finishClose();
        return;
      }

      panel.dataset.state = "closing";
    },
    [finishClose]
  );

  const navigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    close(href);
  };

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const frame = requestAnimationFrame(() => {
      panel.dataset.state = "open";
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const main = document.querySelector("main");
    const primaryHeader = document.querySelector("[data-primary-header]");
    const savedOverflow = root.style.overflow;
    const mainWasInert = main instanceof HTMLElement ? main.inert : false;
    const headerWasInert =
      primaryHeader instanceof HTMLElement ? primaryHeader.inert : false;

    root.style.overflow = "hidden";
    root.dataset.mobileMenuOpen = "true";
    if (main instanceof HTMLElement) main.inert = true;
    if (primaryHeader instanceof HTMLElement) primaryHeader.inert = true;
    closeButtonRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const desktop = window.matchMedia("(min-width: 768px)");
    const handleDesktop = () => {
      if (desktop.matches) finishClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    desktop.addEventListener("change", handleDesktop);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      desktop.removeEventListener("change", handleDesktop);
      delete root.dataset.mobileMenuOpen;
      root.style.overflow = savedOverflow;
      if (main instanceof HTMLElement) main.inert = mainWasInert;
      if (primaryHeader instanceof HTMLElement) {
        primaryHeader.inert = headerWasInert;
      }
    };
  }, [close, finishClose]);

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (
      event.target === panelRef.current &&
      event.propertyName === "transform" &&
      closingRef.current
    ) {
      finishClose();
    }
  };

  const squash =
    togglePress % 2 === 1 ? styles.pressA : styles.pressB;

  return createPortal(
    <div
      ref={panelRef}
      className={styles.overlay}
      data-state="entering"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      onTransitionEnd={handleTransitionEnd}
    >
      <div className={styles.menu}>
        <div className={styles.topRow}>
          <a
            href="#hero"
            className={`${styles.wordmark} ${styles.reveal}`}
            style={revealDelay(360)}
            onClick={(event) => navigate(event, "#hero")}
          >
            temikaze
          </a>
          <span className={styles.reveal} style={revealDelay(390)}>
            <button
              ref={closeButtonRef}
              type="button"
              className={`${styles.closeButton} ${squash}`}
              data-closing={closing ? "true" : "false"}
              onClick={() => close()}
              aria-label="Close menu"
            >
              <span className={styles.labelMask}>
                <span
                  key={togglePress}
                  className={`${styles.labelRoll} ${styles.rollToggle}`}
                >
                  <span className={styles.label}>
                    {closing ? "close" : "menu"}
                  </span>
                  <span className={styles.label} aria-hidden="true">
                    {closing ? "menu" : "close"}
                  </span>
                </span>
              </span>
            </button>
          </span>
        </div>

        <nav className={styles.navigation} aria-label="Mobile navigation">
          <ul className={styles.navList}>
            {NAV_LINKS.map((link, index) => (
              <li
                key={link.href}
                className={`${styles.navItem} ${styles.reveal}`}
                style={revealDelay(460 + index * 90)}
              >
                <a href={link.href} onClick={(event) => navigate(event, link.href)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.statusList} aria-label="Latest music">
          {HERO_STATUS_CARDS.map((card, index) => (
            <a
              key={card.eyebrow}
              href={card.href}
              className={`${styles.statusCard} ${styles.reveal}`}
              style={revealDelay(760 + index * 100)}
              onClick={(event) => navigate(event, card.href)}
            >
              <span className={styles.cardEyebrow}>
                <span
                  className={`${styles.dot} ${
                    card.tone === "release"
                      ? styles.dotRelease
                      : styles.dotMix
                  }`}
                  aria-hidden="true"
                />
                {card.eyebrow}
              </span>
              <span className={styles.cardTitle}>{card.title}</span>
            </a>
          ))}
        </div>

        <div
          className={`${styles.utilityLinks} ${styles.reveal}`}
          style={revealDelay(980)}
        >
          <a
            href={LINKTREE.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.utilityPill}
          >
            <LinktreeIcon className={styles.utilityIcon} />
            <span>{LINKTREE.label}</span>
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} className={styles.utilityPill}>
            <MailIcon className={styles.utilityIcon} />
            <span>{CONTACT_EMAIL}</span>
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}
