import Header from "./components/Header";
import Hero from "./components/Hero";
import Music from "./components/Music";
import styles from "./page.module.css";

const PLACEHOLDER_SECTIONS = [
  { id: "visuals", label: "Visuals" },
  { id: "booking", label: "Booking" },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Music />
        {PLACEHOLDER_SECTIONS.map(({ id, label }) => (
          <section key={id} id={id} className={styles.placeholder}>
            <h2 className={styles.placeholderHeading}>{label}</h2>
          </section>
        ))}
      </main>
    </>
  );
}
