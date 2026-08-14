import Image from "next/image";
import styles from "./Hero.module.css";

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
  return (
    <section id="hero" className={styles.hero}>
      <div className={`container ${styles.identity}`}>
        <h1 className={styles.wordmark}>Temikaze</h1>
        <div className={styles.supporting}>
          <p>House / Afro House DJ + Producer</p>
          <p>Nairobi, Kenya</p>
        </div>
      </div>

      <div className={styles.imageBand}>
        <div className={styles.imageClip}>
          <Image
            src="/images/temikaze-hero.png"
            alt="Temikaze standing outside The Leadmill music venue at night."
            fill
            priority
            sizes="100vw"
            className={styles.image}
          />
        </div>

        <div className={styles.cardStack}>
          {STATUS_CARDS.map((card) => (
            <a key={card.eyebrow} href={card.href} className={styles.card}>
              <span className={styles.cardEyebrow}>
                <span className={`${styles.dot} ${card.dot}`} aria-hidden="true" />
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
  );
}
