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
      <div className={`page-shell ${styles.identity}`}>
        <h1 className={styles.wordmark}>Temikaze</h1>
        <div className={styles.supporting}>
          <p>DJ & Producer</p>
          {/* The Artist Bio experience does not exist yet, so this is
              deliberately a button rather than a link: there is no route to
              point at, and a link to a fake destination would announce itself
              to assistive tech as navigable when it is not. It carries no
              handler yet — wiring it up is the whole of the future work. */}
          <button type="button" className={styles.bioButton}>
            {/* Same label structure as the Booking pills: a mask exactly one
                line tall over two identical labels, so the roll lands on the
                duplicate and the word never appears to change. */}
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
          {/* Explicit intrinsic dimensions rather than `fill`. With `fill` the
              image is absolutely positioned and takes its size from the
              container, which means the container must be given a height from
              somewhere else — and whatever that height was, object-fit had to
              crop the photograph to reach it. Sized from its own intrinsic
              ratio instead, the image is what gives the band its height.

              1254x1254 are the asset's real pixel dimensions. They only
              reserve layout space before load (the rendered height comes from
              height: auto), but keep them in step if the photo is replaced.*/}
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
