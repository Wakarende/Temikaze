import Header from "./components/Header";
import Hero from "./components/Hero";
import Music from "./components/Music";
import SectionHeader, {
  type SectionHeaderEntry,
} from "./components/SectionHeader";
import StageVisuals from "./components/StageVisuals";
import styles from "./page.module.css";

// The content run's shared editorial header. One entry per section inside the
// run; the order must match document order. Booking is deliberately absent —
// it is still a Phase 4 placeholder and its header state has not been decided,
// so it sits outside the run until Phase 9 builds it.
const CONTENT_SECTIONS: SectionHeaderEntry[] = [
  { id: "music", title: "Music", descriptor: "Original releases and DJ mixes" },
  { id: "visuals", title: "Visuals" },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        {/* The content run bounds the shared sticky header: it takes over at
            Music, follows through the sections below, and releases at the end
            of the run rather than sticking for the whole page. */}
        <div className={styles.contentRun}>
          <SectionHeader sections={CONTENT_SECTIONS} />
          <Music />
          <StageVisuals />
        </div>

        <section id="booking" className={styles.placeholder}>
          <h2 className={styles.placeholderHeading}>Booking</h2>
        </section>
      </main>
    </>
  );
}
