"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./SectionHeader.module.css";

export type SectionHeaderEntry = {
  /** Must match the id of the corresponding <section> element. */
  id: string;
  title: string;
  /** Optional. Visuals has no approved descriptor; its right side stays empty. */
  descriptor?: string;
};

type RollState = {
  previous: SectionHeaderEntry;
  current: SectionHeaderEntry;
  /** Bumped on every change so the roll remounts and restarts cleanly. */
  key: number;
};

/**
 * The one editorial header shared by every content section below Hero.
 *
 * It is sticky within the content run rather than the whole page, so it takes
 * over when Music arrives, follows through the sections below it, and releases
 * at the end of the run — matching the reference, where a section title holds
 * at the top of the viewport until the next section replaces it and the global
 * navigation is nowhere in sight.
 *
 * Adding Booking later means adding one entry to `sections` and moving that
 * section inside the content run. No new sticky logic anywhere.
 */
export default function SectionHeader({
  sections,
}: {
  sections: SectionHeaderEntry[];
}) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [roll, setRoll] = useState<RollState>(() => ({
    previous: sections[0],
    current: sections[0],
    key: 0,
  }));

  // Publish the header's height so Music's existing ScrollTrigger can offset
  // its pin against it, instead of against the global navigation that no
  // longer sticks. Set on the document element rather than declared in
  // globals.css so this component owns the value and cleans it up.
  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const publish = () =>
      document.documentElement.style.setProperty(
        "--section-header-height",
        `${el.offsetHeight}px`
      );

    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(el);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--section-header-height");
    };
  }, []);

  // The active section is the last one whose top edge has passed under the
  // sticky header's lower edge — the same line the reader perceives as the
  // boundary. The title therefore does not flip when a sliver of the next
  // section appears, and it reverses correctly on the way back up because the
  // same comparison simply stops being true.
  //
  // Measured rather than observed on purpose. An IntersectionObserver band
  // sitting immediately below the header fails exactly at a boundary: when a
  // section's top lands precisely on the band edge the two rects only touch,
  // the intersection has zero area, and no entry reports as intersecting — so
  // the title sticks on the previous section. Anchor navigation lands on that
  // case every time, because scroll-margin-top aligns the section to the
  // header height precisely.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    // Evaluated directly on scroll rather than throttled through
    // requestAnimationFrame: this reads two or three cached rects, which is
    // cheap enough not to need a frame gate, and it keeps the section title in
    // step with the scroll position with no extra machinery.
    const evaluate = () => {
      const headerHeight = el.offsetHeight;

      let next = sections[0];
      for (const section of sections) {
        const node = document.getElementById(section.id);
        if (!node) continue;
        if (node.getBoundingClientRect().top <= headerHeight + 1) next = section;
      }

      setRoll((state) =>
        state.current.id === next.id
          ? state
          : { previous: state.current, current: next, key: state.key + 1 }
      );
    };

    evaluate();
    // Capture phase, on the document: this page's scroll container is <body>
    // rather than the viewport (globals.css sets overflow-x on body), so a
    // plain window scroll listener would never fire. Capture catches the event
    // whichever element actually scrolls.
    document.addEventListener("scroll", evaluate, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", evaluate);
    return () => {
      document.removeEventListener("scroll", evaluate, true);
      window.removeEventListener("resize", evaluate);
    };
  }, [sections]);

  const rolling = roll.key > 0;

  return (
    <div
      className={styles.header}
      ref={headerRef}
      aria-hidden="true"
      data-section-header
      data-active-section={roll.current.id}
    >
      {/* aria-hidden: this band is a visual restatement of the section
          heading. Each section keeps its own real <h2> in the document, so the
          heading outline and anchor navigation are unaffected and the title is
          not announced twice. */}
      <div className={`container ${styles.inner}`}>
        <div className={styles.titleMask}>
          <span
            key={roll.key}
            className={`${styles.roll} ${rolling ? styles.rollUp : ""}`.trim()}
          >
            <span className={styles.title}>{roll.previous.title}</span>
            <span className={styles.title}>{roll.current.title}</span>
          </span>
        </div>

        <div className={styles.descriptorMask}>
          <span
            key={roll.key}
            className={`${styles.roll} ${rolling ? styles.rollUp : ""}`.trim()}
          >
            <span className={styles.descriptor}>
              {roll.previous.descriptor ?? ""}
            </span>
            <span className={styles.descriptor}>
              {roll.current.descriptor ?? ""}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
