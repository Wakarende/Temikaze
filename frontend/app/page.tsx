import BookingContact from "./components/BookingContact";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Music from "./components/Music";
import NavReturn from "./components/NavReturn";
import SectionHeader, {
  type SectionHeaderEntry,
} from "./components/SectionHeader";
import StageVisuals from "./components/StageVisuals";
import { getSiteContent } from "./lib/wordpress";
import styles from "./page.module.css";

// The content run's shared editorial header. One entry per section inside the
// run; the order must match document order.
//
// Booking is deliberately NOT a state here, and must not become one. The
// shared editorial header belongs to the Music -> Visuals run only: it ends
// where Booking begins. Booking is its own dark full-width closing section
// whose composition is its identity — handwritten wordmark, FIND ME
// EVERYWHERE, Linktree, socials, divider, contact — so it needs no sticky
// title above it, and the Visuals header must never float over it.
//
// This is why #booking sits outside the content run below: the header's
// sticky range is bounded by that wrapper, so it releases exactly at the
// Visuals/Booking boundary. Phase 9 should build Booking in place, outside
// the run, and add nothing to this array.
const CONTENT_SECTIONS: SectionHeaderEntry[] = [
  { id: "music", title: "Music", descriptor: "Original releases and DJ mixes" },
  { id: "visuals", title: "Visuals" },
];

export default async function Home() {
  const content = await getSiteContent();

  return (
    <>
      <Header
        artistName={content.artist.title}
        contact={content.contact}
        heroStatusCards={content.heroStatusCards}
      />
      <main>
        <Hero
          artist={content.artist}
          contact={content.contact}
          heroStatusCards={content.heroStatusCards}
        />

        {/* The content run bounds the shared sticky header: it takes over at
            Music, follows through the sections below, and releases at the end
            of the run rather than sticking for the whole page. */}
        <div className={styles.contentRun} data-content-run>
          <SectionHeader sections={CONTENT_SECTIONS} />
          <Music items={content.musicItems} />
          <StageVisuals items={content.galleryItems} />
        </div>

        {/* Outside the content run on purpose — see the note on
            CONTENT_SECTIONS above. */}
        <BookingContact contact={content.contact} />
      </main>
      {/* Renders nothing; drives the scroll-direction visibility of the
          primary navigation through one attribute on the document element. */}
      <NavReturn />
    </>
  );
}
