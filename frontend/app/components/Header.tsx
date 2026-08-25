import styles from "./Header.module.css";

const NAV_LINKS = [
  { href: "#music", label: "music" },
  { href: "#visuals", label: "visuals" },
  { href: "#booking", label: "booking" },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#hero" className={styles.wordmark}>
          Temikaze
        </a>
        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.navList}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <a href="#booking" className={styles.cta}>
            book artist
          </a>
        </nav>
      </div>
    </header>
  );
}
