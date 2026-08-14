import Header from "./components/Header";
import Hero from "./components/Hero";
import styles from "./page.module.css";

const SECTIONS = [
  { id: "music", label: "Music" },
  { id: "practice", label: "Practice" },
  { id: "visuals", label: "Visuals" },
  { id: "booking", label: "Booking" },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {SECTIONS.map(({ id, label }) => (
          <section key={id} id={id} className={styles.placeholder}>
            <h2 className={styles.placeholderHeading}>{label}</h2>
          </section>
        ))}
      </main>
    </>
  );
}
