"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import ArtistBioOverlay from "./ArtistBioOverlay";
import styles from "./Hero.module.css";
import { navigateToSection } from "./siteNavigation";

const STATUS_CARDS = [
  {
    href: "#music",
    eyebrow: "Latest Release",
    title: "Nia",
    dot: styles.dotRelease,
  },
  {
    href: "#music",
    eyebrow: "Latest Mix",
    title: "Mum's Garage Radio",
    dot: styles.dotMix,
  },
];

export default function Hero() {
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
          <h1 className={styles.wordmark}>Temikaze</h1>
          <div className={styles.supporting}>
            <p>DJ & Producer</p>
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
              src="/images/hero.png"
              alt="Temikaze standing outside The Leadmill music venue at night."
              width={1254}
              height={1254}
              priority
              sizes="100vw"
              className={styles.image}
            />
          </div>

          <div className={styles.cardStack}>
            {STATUS_CARDS.map((card) => (
              <a key={card.eyebrow} href={card.href} className={styles.card}>
                <span className={styles.cardEyebrow}>
                  <span
                    className={`${styles.dot} ${card.dot}`}
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
      {bioMounted ? <ArtistBioOverlay onClosed={closeBio} /> : null}
    </>
  );
}
