"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MUSIC_ITEMS } from "./musicData";
import styles from "./Music.module.css";

gsap.registerPlugin(ScrollTrigger);

// Manual browser testing (2026-08-21) showed a 1:1 vertical-scroll-to-
// horizontal-travel mapping consumes the entire track in a single ordinary
// scroll gesture (trackpad/wheel), so the section flew straight past into
// Practice instead of pausing on each record. This multiplier paces the
// interaction by reserving more vertical scroll than the raw horizontal
// distance requires — it's applied to the real, measured content distance
// (see getTotalDistance below), not a hard-coded pixel count, so it still
// scales correctly if the track's content changes.
const SCROLL_PACE_MULTIPLIER = 1.6;

// Ruler/tick geometry, measured against references/LandingPage-Desktop.mov
// (the AUDIO section, ~t=32–46s): ticks sit ~14px apart; the emphasised
// position is a single peak with a graduated trail of about 5–6 neighbouring
// ticks growing taller/darker approaching it, dropping straight back to the
// resting height immediately past it. The video's falloff reads as
// asymmetric (a trailing tail behind the currently-passed position), but
// that shape is ambiguous from footage alone as to whether it's a fixed
// spatial pattern or genuinely direction-locked — and a direction-locked
// trail would need scroll-velocity tracking layered onto the now-working
// pin/scrub trigger. A symmetric falloff of the same width/character is
// used instead so reverse scroll is guaranteed to mirror forward scroll
// exactly, per the required behavior.
const TICK_SPACING_PX = 14;
const TICK_FALLOFF_RADIUS = 6;
const TICK_BASE_HEIGHT = 10;
const TICK_PEAK_HEIGHT = 32;
const TICK_BASE_OPACITY = 0.3;
const TICK_PEAK_OPACITY = 1;

// Card emphasis model (2026-08-21 revision): a full-spacing quadratic
// falloff meant every card sat at ~0.62 scale / ~0.36 opacity exactly
// halfway between two centers — a long, faint "valley" with no substantial
// release visible. The reference instead holds each card at a strong
// MUTED state (still large, still legible) across most of its territory,
// and only transitions through a comparatively narrow band around the
// crossover — the point exactly between two adjacent card centers, where
// "closest" flips from one card to the next. See updateCardEmphasis below.
const CARD_MUTED_OPACITY = 0.35;
const CARD_ACTIVE_OPACITY = 1;
const CARD_MUTED_SCALE = 0.7;
const CARD_ACTIVE_SCALE = 1;
// Width of the crossover transition zone, as a fraction of the full
// spacing between two adjacent card centers. Small = a quick handoff with
// a wide stable-muted plateau on either side, matching "outside the
// handoff region, remain at the stable muted state" rather than fading
// further the more distant a card is.
const CARD_HANDOFF_FRACTION = 0.22;

export default function Music() {
  const pinStageRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const rulerTicksRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const pinStage = pinStageRef.current;
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    const rulerTicks = rulerTicksRef.current;
    if (!pinStage || !wrapper || !track || !rulerTicks) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        reducedMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isDesktop, reducedMotion } = context.conditions as {
          isDesktop: boolean;
          reducedMotion: boolean;
        };

        // Below desktop, or with reduced motion requested, the track stays
        // a plain native horizontal scroller (see Music.module.css) — no
        // GSAP involvement at all.
        if (!isDesktop || reducedMotion) {
          return;
        }

        const cards = Array.from(
          track.querySelectorAll<HTMLElement>("[data-card]")
        );

        // Each card's emphasis (opacity/scale) is driven continuously by its
        // distance from the current focal position, not by a discrete
        // index — reproduces the reference's gradual approach/recede rather
        // than an instant jump. Card centers are read once here (and again
        // on refresh) via offsetLeft/offsetWidth, which reflect each card's
        // stable, untransformed position in the track's own layout — unlike
        // getBoundingClientRect, they are NOT affected by the transform the
        // emphasis itself applies, so there is no feedback loop between
        // "how a card currently looks" and "where the math thinks it is".
        let cardCenters: number[] = [];
        let cardSpacing = 1;
        let activeIndex = 0;
        const buildCardGeometry = () => {
          cardCenters = cards.map(
            (card) => card.offsetLeft + card.offsetWidth / 2
          );
          // Spacing between two consecutive card centers — derived from the
          // real card/gap geometry rather than a guessed constant. Used
          // below to find the crossover point (halfway between two cards)
          // that the handoff transition is centered on.
          cardSpacing =
            cardCenters.length > 1
              ? cardCenters[1] - cardCenters[0]
              : wrapper.clientWidth;
        };

        const updateCardEmphasis = () => {
          const currentX = (gsap.getProperty(track, "x") as number) || 0;
          // The track-local coordinate currently sitting at the wrapper's
          // visual center — screen_x = track_local + x, so solving for the
          // track_local that lands on screen_x = clientWidth / 2.
          const focal = wrapper.clientWidth / 2 - currentX;

          // Crossover: the distance from a card's own center at which it is
          // exactly as close to focal as its neighbour is — i.e. the point
          // "closest" flips between two adjacent cards. The handoff only
          // happens in a narrow band around that point; inside it a card is
          // fully active, and past it a card is immediately at the stable
          // muted resting state — it does not keep fading the further away
          // focal gets, so two-cards-away looks the same as one-card-away.
          const crossover = cardSpacing / 2;
          const handoffWidth = cardSpacing * CARD_HANDOFF_FRACTION;
          const rampStart = crossover - handoffWidth / 2;
          const rampEnd = crossover + handoffWidth / 2;

          let closestIndex = 0;
          let closestDistance = Infinity;

          cards.forEach((card, i) => {
            const distance = Math.abs(cardCenters[i] - focal);
            if (distance < closestDistance) {
              closestDistance = distance;
              closestIndex = i;
            }

            let activeAmount: number;
            if (distance <= rampStart) {
              activeAmount = 1;
            } else if (distance >= rampEnd) {
              activeAmount = 0;
            } else {
              activeAmount = 1 - (distance - rampStart) / (rampEnd - rampStart);
            }
            // Smoothstep — eases the handoff in/out instead of a linear
            // ramp/snap. Still a pure function of distance, so it remains
            // fully reversible with no direction-dependent state.
            const eased = activeAmount * activeAmount * (3 - 2 * activeAmount);

            card.style.opacity = `${
              CARD_MUTED_OPACITY + eased * (CARD_ACTIVE_OPACITY - CARD_MUTED_OPACITY)
            }`;
            card.style.transform = `scale(${
              CARD_MUTED_SCALE + eased * (CARD_ACTIVE_SCALE - CARD_MUTED_SCALE)
            })`;
          });

          // Kept as a semantic/discrete marker (drives the vinyl-rotation
          // CSS and could back aria-current later) — the visual emphasis
          // above no longer depends on it.
          activeIndex = closestIndex;
          cards.forEach((card, i) => {
            card.setAttribute("data-active", i === activeIndex ? "true" : "false");
          });
        };

        // Ruler ticks are plain DOM elements, built once (and rebuilt on
        // refresh, since wrapper width can change) rather than through
        // React state — nothing here re-renders per scroll frame, and
        // direct style writes on a handful of elements are cheap enough
        // to run on every scrub update.
        let ticks: HTMLDivElement[] = [];
        const buildTicks = () => {
          rulerTicks.innerHTML = "";
          const count = Math.max(
            2,
            Math.round(wrapper.clientWidth / TICK_SPACING_PX)
          );
          ticks = Array.from({ length: count }, () => {
            const tick = document.createElement("div");
            tick.className = styles.rulerTick;
            rulerTicks.appendChild(tick);
            return tick;
          });
        };

        const updateRulerTicks = (progress: number) => {
          if (ticks.length === 0) return;
          const headPosition = progress * (ticks.length - 1);
          for (let i = 0; i < ticks.length; i++) {
            const distance = Math.abs(i - headPosition);
            const intensity = Math.max(0, 1 - distance / TICK_FALLOFF_RADIUS);
            const eased = intensity * intensity;
            const tick = ticks[i];
            tick.style.height = `${
              TICK_BASE_HEIGHT + eased * (TICK_PEAK_HEIGHT - TICK_BASE_HEIGHT)
            }px`;
            tick.style.opacity = `${
              TICK_BASE_OPACITY + eased * (TICK_PEAK_OPACITY - TICK_BASE_OPACITY)
            }`;
          }
        };

        buildTicks();
        buildCardGeometry();

        wrapper.setAttribute("data-pinned", "true");

        // Offset the pin against the shared content-run header, which is what
        // is actually stuck above this section now. The global navigation no
        // longer sticks, so --header-height is the wrong reference. The
        // SectionHeader publishes --section-header-height from its measured
        // box; the fallback only matters for the frame before it does.
        const headerHeight =
          parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--section-header-height"
            )
          ) || 0;

        // Centering the first/last card alone isn't the reference's full
        // journey — Nia needs room to travel in from the entering edge, and
        // Mum's Garage Radio needs room to travel out past the exiting edge,
        // before the section releases. That extra room ("edge roll") is
        // derived from the wrapper's own viewport width, not a fixed guess:
        // half a viewport-width of travel puts a card's center exactly at
        // the wrapper's edge at the start/end of the journey — a card fully
        // outside the wrapper the instant before/after that. Total distance
        // (edge roll + centre-to-centre + edge roll) is what the vertical
        // scroll range is paced against below, same as before.
        const getEdgeRoll = () => wrapper.clientWidth / 2;
        const getCenterDistance = () => track.scrollWidth - wrapper.clientWidth;
        const getTotalDistance = () =>
          getEdgeRoll() * 2 + getCenterDistance();

        const tween = gsap.fromTo(
          track,
          { x: () => getEdgeRoll() },
          {
            x: () => -(getCenterDistance() + getEdgeRoll()),
            ease: "none",
            scrollTrigger: {
              trigger: pinStage,
              start: `top top+=${headerHeight}`,
              end: () => `+=${getTotalDistance() * SCROLL_PACE_MULTIPLIER}`,
              scrub: 0.5,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                updateCardEmphasis();
                updateRulerTicks(self.progress);
              },
              onRefresh: (self) => {
                buildTicks();
                buildCardGeometry();
                updateCardEmphasis();
                updateRulerTicks(self.progress);
              },
            },
          }
        );

        updateCardEmphasis();
        updateRulerTicks(0);

        return () => {
          wrapper.setAttribute("data-pinned", "false");
          tween.scrollTrigger?.kill();
          tween.kill();
          rulerTicks.innerHTML = "";
        };
      }
    );

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section id="music" className={styles.music}>
      {/* The visible "MUSIC" title and its descriptor now live in the shared
          content-run header (SectionHeader), which is sticky above this
          section — rendering them here as well produced two competing
          headings. This heading stays for the document outline and is
          visually hidden; the shared header is aria-hidden so the title is
          announced once. */}
      <h2 className="visually-hidden">Music</h2>

      {/* pinStage is what GSAP pins. It no longer needs to carry the header,
          only the record stage; the pin now starts below the shared sticky
          header instead. */}
      <div className={styles.pinStage} ref={pinStageRef}>
        <div className={styles.wrapper} ref={wrapperRef}>
          <div className={styles.ruler} aria-hidden="true" />
          <div className={styles.rulerTicks} ref={rulerTicksRef} aria-hidden="true" />
          <ul className={styles.track} ref={trackRef}>
            {MUSIC_ITEMS.map((item, index) => (
              <li
                key={item.id}
                data-card
                data-active={index === 0 ? "true" : "false"}
                className={styles.card}
              >
                <div className={styles.disc}>
                  <div className={styles.artwork}>
                    <Image
                      src={item.artwork}
                      alt={`${item.title} artwork`}
                      fill
                      sizes="(min-width: 1024px) 20vw, 60vw"
                    />
                  </div>
                </div>
                <p className={styles.metadata}>{item.type}</p>
                <h3 className={styles.title}>{item.title}</h3>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
