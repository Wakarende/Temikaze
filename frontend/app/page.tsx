import Header from "./components/Header";
import Hero from "./components/Hero";
import Music from "./components/Music";
import StageVisuals from "./components/StageVisuals";
import styles from "./page.module.css";

const PLACEHOLDER_SECTIONS = [{ id: "booking", label: "Booking" }];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Music />
        <StageVisuals />
        {PLACEHOLDER_SECTIONS.map(({ id, label }) => (
          <section key={id} id={id} className={styles.placeholder}>
            <h2 className={styles.placeholderHeading}>{label}</h2>
          </section>
        ))}
      </main>
    </>
  );
}
