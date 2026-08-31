"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import ArtistBioOverlay from "./ArtistBioOverlay";
import type {
  ArtistContent,
  ContactContent,
  HeroStatusCard,
} from "../lib/siteContent";
import styles from "./Hero.module.css";
import { navigateToMusicItem, navigateToSection } from "./siteNavigation";

export default function Hero({
  artist,
  contact,
  heroStatusCards,
}: {
  artist: ArtistContent;
  contact: ContactContent;
  heroStatusCards: HeroStatusCard[];
}) {
  const [bioMounted, setBioMounted] = useState(false);
  const bioButtonRef = useRef<HTMLButtonElement>(null);

  const closeBio = (navigationTarget?: string) => {
    setBioMounted(false);
    requestAnimationFrame(() => {
      if (navigationTarget) navigateToSection(navigationTarget);
      else bioButtonRef.current?.focus();
    });
  };

  return (
    <>
      <section id="hero" className={styles.hero}>
        <div className={`page-shell ${styles.identity}`}>
          <h1 className={styles.wordmark}>{artist.title}</h1>
          <div className={styles.supporting}>
            <p>{artist.tagline}</p>
            <button
              ref={bioButtonRef}
              type="button"
              className={styles.bioButton}
              aria-haspopup="dialog"
              aria-expanded={bioMounted}
              onClick={() => setBioMounted(true)}
            >
              <span className={styles.labelMask}>
                <span className={styles.roll}>
                  <span className={styles.label}>artist bio</span>
                  <span className={styles.label} aria-hidden="true">
                    artist bio
                  </span>
                </span>
              </span>
            </button>
          </div>
        </div>

        <div className={styles.imageBand}>
          <div className={styles.imageClip}>
            <Image
              src={artist.heroImage.src}
              alt={artist.heroImage.alt}
              width={artist.heroImage.width}
              height={artist.heroImage.height}
              priority
              sizes="100vw"
              className={styles.image}
            />
          </div>

          <div className={styles.cardStack}>
            {heroStatusCards.map((card) => (
              <a
                key={card.eyebrow}
                href={card.href}
                className={styles.card}
                onClick={(event) => {
                  event.preventDefault();
                  navigateToMusicItem(card.musicItemId);
                }}
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
                <span className={styles.cardArrow} aria-hidden="true">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
      {bioMounted ? (
        <ArtistBioOverlay
          artist={artist}
          contact={contact}
          onClosed={closeBio}
        />
      ) : null}
    </>
  );
}
