"use client";

import Image from "next/image";
import {
  type TransitionEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import BookingContact from "./BookingContact";
import styles from "./ArtistBioOverlay.module.css";
import {
  ARTIST_BIO_NAVIGATION_EVENT,
  type ArtistBioNavigationDetail,
} from "./siteNavigation";

const BIO_PARAGRAPHS = [
  "I’m Temikaze, a Nairobi-based DJ, producer and music educator.",
  "Music has always been a way for me to create, perform and connect with people. I started out playing guitar and cello, eventually finding my way into songwriting and music production. I always knew I wanted to perform, and DJing became a natural extension of that. It gives me the freedom to create a track, take it straight to an audience and build a performance entirely on my own terms.",
  "My sound is driven by bass, groove and rhythm. I’m naturally drawn to heavy, driving basslines, groovy percussion and vocals that add another layer of emotion to a track. Behind the decks, I move through Afro House, Deep House and Amapiano, always looking for that balance between energy and atmosphere.",
  "More than anything, I want my sets to feel like an escape. For a little while, I want people to forget about everything happening outside the room, feel excited, feel at peace and be completely present in the music.",
  "Alongside performing and producing, education remains an important part of my work. I hold a Master’s degree in Music Production and continue to teach music, while also advocating for more women to take up space in areas of the Kenyan music industry that remain male-dominated.",
  "Whether I’m producing, teaching or behind the decks, the goal is the same: to create something people can feel.",
];

const OVERLAY_EVENT = "temikaze:artist-bio-overlay";

export default function ArtistBioOverlay({
  onClosed,
}: {
  onClosed: (navigationTarget?: string) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closingRef = useRef(false);
  const navigationTargetRef = useRef<string | undefined>(undefined);

  const finishClose = useCallback(() => {
    window.dispatchEvent(
      new CustomEvent(OVERLAY_EVENT, { detail: { open: false } })
    );
    onClosed(navigationTargetRef.current);
  }, [onClosed]);

  const close = useCallback(() => {
    const panel = panelRef.current;
    if (!panel || closingRef.current) return;
    closingRef.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finishClose();
      return;
    }

    panel.dataset.state = "closing";
  }, [finishClose]);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const frame = requestAnimationFrame(() => {
      panel.dataset.state = "open";
      closeButtonRef.current?.focus({ preventScroll: true });
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const main = document.querySelector("main");
    const savedOverflow = root.style.overflow;
    const savedScrollTop =
      window.scrollY || root.scrollTop || document.body.scrollTop || 0;

    root.style.overflow = "hidden";
    root.dataset.artistBioOpen = "true";
    if (main instanceof HTMLElement) main.inert = true;
    window.dispatchEvent(
      new CustomEvent(OVERLAY_EVENT, { detail: { open: true } })
    );

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    const handleNavigation = (event: Event) => {
      const detail = (event as CustomEvent<ArtistBioNavigationDetail>).detail;
      navigationTargetRef.current = detail.href;
      close();
    };

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener(ARTIST_BIO_NAVIGATION_EVENT, handleNavigation);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener(
        ARTIST_BIO_NAVIGATION_EVENT,
        handleNavigation
      );
      if (main instanceof HTMLElement) main.inert = false;
      delete root.dataset.artistBioOpen;
      root.style.overflow = savedOverflow;
      window.scrollTo({ top: savedScrollTop, behavior: "instant" });
    };
  }, [close]);

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (
      event.target === panelRef.current &&
      event.propertyName === "transform" &&
      closingRef.current
    ) {
      finishClose();
    }
  };

  return createPortal(
    <div
      ref={panelRef}
      className={styles.overlay}
      data-state="entering"
      role="dialog"
      aria-modal="true"
      aria-labelledby="artist-bio-title"
      onTransitionEnd={handleTransitionEnd}
    >
      <div className={styles.document}>
        <section className={`page-shell ${styles.bioSection}`}>
          <div className={styles.closeRow}>
            <button
              ref={closeButtonRef}
              type="button"
              className={styles.closeButton}
              onClick={close}
            >
              <span className={styles.labelMask}>
                <span className={styles.labelRoll}>
                  <span className={styles.label}>close</span>
                  <span className={styles.label} aria-hidden="true">
                    close
                  </span>
                </span>
              </span>
            </button>
          </div>

          <div className={styles.editorialGrid}>
            <div className={styles.imageColumn}>
              <Image
                src="/images/artist-bio/temikaze-artist-bio.webp"
                alt="Temikaze smiling behind a DJ mixer with one arm raised under purple and blue lighting."
                width={1086}
                height={1448}
                sizes="(max-width: 767px) calc(100vw - 2.5rem), 46vw"
                className={styles.image}
              />
            </div>

            <article className={styles.copyColumn}>
              <h2 id="artist-bio-title" className={styles.heading}>
                Artist Bio
              </h2>
              <div className={styles.rule} aria-hidden="true" />
              <div className={styles.copy}>
                {BIO_PARAGRAPHS.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          </div>
        </section>

        <BookingContact sectionId={null} />
      </div>
    </div>,
    document.body
  );
}
