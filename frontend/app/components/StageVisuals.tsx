"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import styles from "./StageVisuals.module.css";
import { GALLERY_ITEMS } from "./galleryData";

// ---------------------------------------------------------------------------
// Settled-state geometry, measured off the reference VISUAL section
// (references/screenshots/visual-active-gallery.png plus frames extracted from
// references/LandingPage-Desktop.mov).
//
// Active box ~798x838 device px, flanking boxes ~418x420 — flanking items sit
// at ~0.50 of the active box. Gap between adjacent boxes ~29px against a 798px
// active box, i.e. ~4% of the active box width.
// ---------------------------------------------------------------------------
const INACTIVE_SCALE = 0.5;
const INACTIVE_OPACITY = 0.4;
const INACTIVE_GRAYSCALE = 0.8;
const GAP_RATIO = 0.04;

// The gallery is continuous: the item list is rendered REPEATS times so there
// are always real elements to place on both sides of the active item, and the
// index at which a slot wraps to the far side sits well outside the viewport.
// Nothing "resets" visibly because the wrap happens off-screen.
const REPEATS = 3;
const TOTAL_SLOTS = GALLERY_ITEMS.length * REPEATS;
const HALF_SLOTS = TOTAL_SLOTS / 2;

const NAV_DURATION = 0.5;
const NAV_EASE = "power3.out";

const SWIPE_THRESHOLD_PX = 45;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * A prev/next pill with its activation micro-interaction.
 *
 * Two restart mechanisms, deliberately different:
 *
 * The squash alternates between two identical keyframe sets (pressA/pressB) on
 * each press. Changing the animation-name is what restarts a CSS animation
 * without a remount — and the button must not remount, or a keyboard user who
 * pressed Enter would lose focus mid-interaction.
 *
 * The label roll instead remounts via `key={press}`. It sits inside the button
 * and is not focusable, so remounting it costs nothing and guarantees a clean
 * restart with no half-finished or stuck label, however fast the clicks come.
 *
 * Both labels read the same word, so the roll ending on the duplicate and the
 * next press resetting to the original is invisible.
 */
function Pill({
  label,
  direction,
  press,
  onActivate,
}: {
  label: string;
  direction: "prev" | "next";
  press: number;
  onActivate: () => void;
}) {
  const squash = press === 0 ? "" : press % 2 === 1 ? styles.pressA : styles.pressB;
  const roll =
    press === 0
      ? ""
      : direction === "next"
        ? styles.rollNext
        : styles.rollPrev;

  return (
    <button
      type="button"
      className={`${styles.pill} ${squash}`.trim()}
      onClick={onActivate}
    >
      <span className={styles.labelMask}>
        <span key={press} className={`${styles.roll} ${roll}`.trim()}>
          <span className={styles.label}>{label}</span>
          {/* The duplicate is what rolls into place. Hidden from assistive
              tech so the button announces its label once, not twice. */}
          <span className={styles.label} aria-hidden="true">
            {label}
          </span>
        </span>
      </span>
    </button>
  );
}

export default function StageVisuals() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLLIElement | null)[]>([]);

  // `position` is a continuous active index. Navigation tweens it, so the
  // outgoing item slides away, scales down and desaturates while the incoming
  // one slides in, scales up and regains colour — all driven by the same
  // number, in one continuous movement rather than a fade/jump/fade. It is a
  // ref, not state, because it is written every animation frame.
  const position = useRef(0);
  // The logical active index, always a whole number. Kept separate from
  // `position` because `position` is mid-flight whenever a tween is running:
  // deriving the next target from it made rapid activations compound into
  // fractional targets (0 -> 1.5 -> 2.1), so no item ever landed centred and
  // activeIndex stopped matching any real item.
  const targetIndex = useRef(0);
  const dragStart = useRef<{ x: number; y: number } | null>(null);

  // Mirrors `position` for the parts of the UI that re-render (aria-current).
  const [activeIndex, setActiveIndex] = useState(0);
  const [ready, setReady] = useState(false);

  // Press counters for the pill micro-interaction. They only ever increment on
  // a real activation of that control — click, Enter or Space, all of which a
  // native button reports through onClick. Arrow-key gallery navigation is
  // handled on the viewport, so it never touches these and never animates a
  // control the user did not press.
  const [prevPress, setPrevPress] = useState(0);
  const [nextPress, setNextPress] = useState(0);

  // -------------------------------------------------------------------------
  // The single place that writes layout. The navigation tween calls this on
  // every frame; nothing else positions the slots.
  // -------------------------------------------------------------------------
  const render = useCallback(() => {
    const probe = measureRef.current;
    const viewport = viewportRef.current;
    if (!probe || !viewport) return;

    const boxW = probe.getBoundingClientRect().width;
    if (boxW === 0) return;

    const viewportW = viewport.clientWidth;
    const gap = boxW * GAP_RATIO;
    const inactiveVisualW = boxW * INACTIVE_SCALE;
    // Centre-to-centre from the active item to its immediate neighbour, and
    // then between two flanking items further out. The first step is larger
    // because the active item is twice the width of its neighbours.
    const firstStep = boxW / 2 + gap + inactiveVisualW / 2;
    const outerStep = inactiveVisualW + gap;
    // Anything this far out is clipped by the viewport anyway; hiding it keeps
    // it out of the tab order and off the compositor.
    const cullDistance = viewportW / 2 + boxW;

    const centre = position.current + GALLERY_ITEMS.length; // middle repeat

    for (let slot = 0; slot < TOTAL_SLOTS; slot++) {
      const el = slotRefs.current[slot];
      if (!el) continue;

      // Signed circular distance from the active slot, wrapped into
      // [-HALF_SLOTS, HALF_SLOTS). Slots crossing that boundary jump, but the
      // boundary is many slots outside the viewport, so it is never seen.
      let d = slot - centre;
      d = (((d + HALF_SLOTS) % TOTAL_SLOTS) + TOTAL_SLOTS) % TOTAL_SLOTS - HALF_SLOTS;

      const dist = Math.abs(d);
      const t = dist < 1 ? dist : 1;

      // Piecewise but continuous at dist = 1: both branches give firstStep
      // there, so an item sliding between the centre and the flanking row
      // moves without a kink.
      const offsetX =
        dist < 1
          ? d * firstStep
          : Math.sign(d) * (firstStep + (dist - 1) * outerStep);

      const scale = lerp(1, INACTIVE_SCALE, t);
      const opacity = lerp(1, INACTIVE_OPACITY, t);
      const grayscale = lerp(0, INACTIVE_GRAYSCALE, t);

      el.style.transform =
        "translate(calc(-50% + " + offsetX + "px), -50%) scale(" + scale + ")";
      el.style.opacity = String(opacity);
      el.style.filter = "grayscale(" + grayscale + ")";
      el.style.zIndex = String(dist < 0.5 ? 2 : 1);
      // Written here rather than in CSS so that a slot which is fully faded or
      // parked off-screen is also out of the tab order and the accessibility
      // tree, with no invisible focus targets left behind.
      el.style.visibility =
        opacity < 0.02 || Math.abs(offsetX) > cullDistance ? "hidden" : "visible";
    }
  }, []);

  // -------------------------------------------------------------------------
  // Measurement. The gallery sits in normal document flow and starts settled —
  // there is no scroll-driven entrance and no ScrollTrigger in this section.
  // -------------------------------------------------------------------------
  useLayoutEffect(() => {
    const probe = measureRef.current;
    if (!probe) return;

    const measure = () => {
      if (probe.getBoundingClientRect().width > 0) {
        setReady(true);
        render();
      }
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(probe);
    return () => observer.disconnect();
  }, [render]);

  // -------------------------------------------------------------------------
  // Navigation. Loops in both directions; there is no first or last item.
  // -------------------------------------------------------------------------
  const goTo = useCallback(
    (target: number) => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      targetIndex.current = target;
      gsap.killTweensOf(position);

      if (reduced) {
        position.current = target;
        render();
      } else {
        gsap.to(position, {
          current: target,
          duration: NAV_DURATION,
          ease: NAV_EASE,
          onUpdate: render,
        });
      }

      const count = GALLERY_ITEMS.length;
      setActiveIndex(((target % count) + count) % count);
    },
    [render]
  );

  const goNext = useCallback(() => goTo(targetIndex.current + 1), [goTo]);
  const goPrev = useCallback(() => goTo(targetIndex.current - 1), [goTo]);

  // Selecting a flanking image moves by its shortest circular distance, so a
  // click never sends the row the long way round.
  const goToItem = useCallback(
    (itemIndex: number) => {
      const count = GALLERY_ITEMS.length;
      const current = targetIndex.current;
      const currentItem = ((current % count) + count) % count;
      let delta = itemIndex - currentItem;
      if (delta > count / 2) delta -= count;
      if (delta < -count / 2) delta += count;
      goTo(current + delta);
    },
    [goTo]
  );

  // Arrow keys are bound to the gallery region, not to window/document, so
  // they never fire while focus is elsewhere on the page.
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragStart.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const start = dragStart.current;
    dragStart.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    // Vertical page scrolling is left to the browser via touch-action: pan-y;
    // only a dominantly horizontal gesture counts as a swipe.
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX || Math.abs(dx) <= Math.abs(dy)) return;
    if (dx < 0) goNext();
    else goPrev();
  };

  return (
    <section id="visuals" className={styles.section}>
      {/* Header row carries the heading only. The reference also has a serif
          descriptor and a "view all" link; both stay omitted — no descriptor
          copy is approved and there is no archive to link to. */}
      {/* The visible "VISUALS" title now lives in the shared content-run
          header (SectionHeader), sticky above this section. This heading stays
          for the document outline and is visually hidden; the shared header is
          aria-hidden so the title is announced once. */}
      <h2 className="visually-hidden">Visuals</h2>

      <div
        className={`content-stage ${styles.viewport}`}
        ref={viewportRef}
        role="group"
        aria-label="Stage and visuals gallery"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (dragStart.current = null)}
      >
        <div ref={measureRef} className={styles.measure} aria-hidden="true" />

        <ul className={styles.track} data-ready={ready ? "true" : "false"}>
          {Array.from({ length: TOTAL_SLOTS }, (_, slot) => {
            const itemIndex = slot % GALLERY_ITEMS.length;
            const item = GALLERY_ITEMS[itemIndex];
            const repeat = Math.floor(slot / GALLERY_ITEMS.length);
            const isActive = itemIndex === activeIndex;
            return (
              <li
                key={`${item.id}-${repeat}`}
                ref={(el) => {
                  slotRefs.current[slot] = el;
                }}
                className={styles.item}
              >
                <button
                  type="button"
                  className={styles.itemButton}
                  onClick={() => goToItem(itemIndex)}
                  aria-current={isActive ? "true" : undefined}
                  // Only the middle repeat is exposed to assistive tech and the
                  // tab order; the other copies exist purely so the row reads
                  // as endless and would otherwise be duplicate announcements
                  // of the same six images.
                  {...(repeat === 1 ? {} : { tabIndex: -1, "aria-hidden": true })}
                >
                  <Image
                    src={item.src}
                    alt={repeat === 1 ? item.alt : ""}
                    fill
                    sizes="(min-width: 1024px) 30vw, 80vw"
                    className={styles.image}
                    priority={slot === GALLERY_ITEMS.length}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={`content-stage ${styles.controls}`}>
        <Pill
          label="prev"
          direction="prev"
          press={prevPress}
          onActivate={() => {
            setPrevPress((n) => n + 1);
            goPrev();
          }}
        />
        <Pill
          label="next"
          direction="next"
          press={nextPress}
          onActivate={() => {
            setNextPress((n) => n + 1);
            goNext();
          }}
        />
      </div>
    </section>
  );
}
