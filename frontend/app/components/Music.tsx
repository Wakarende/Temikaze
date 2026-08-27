"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MUSIC_ITEMS } from "./musicData";
import styles from "./Music.module.css";

gsap.registerPlugin(ScrollTrigger);

// Mobile browsers fire resize when the address bar collapses or expands during
// scrolling. Left alone, that triggers a ScrollTrigger refresh mid-gesture,
// which re-measures the pin and makes the record track jump. This tells
// ScrollTrigger to ignore vertical-only resizes on touch devices; genuine
// orientation changes still refresh normally.
ScrollTrigger.config({ ignoreMobileResize: true });

// Manual browser testing (2026-08-21) showed a 1:1 vertical-scroll-to-
// horizontal-travel mapping consumes the entire track in a single ordinary
// scroll gesture (trackpad/wheel), so the section flew straight past into
// Practice instead of pausing on each record. This multiplier paces the
// interaction by reserving more vertical scroll than the raw horizontal
// distance requires — it's applied to the real, measured content distance
// (see getTotalDistance below), not a hard-coded pixel count, so it still
// scales correctly if the track's content changes.
const SCROLL_PACE_MULTIPLIER = 1.6;

// Touch layouts need a longer vertical run than desktop wheel input for the
// same horizontal travel. This is the tablet baseline; phones receive their
// own feedback-tuned value below. Both only pace measured geometry and never
// replace it.
const SCROLL_PACE_MULTIPLIER_TOUCH = 2.2;
// Phone feedback showed that a one-viewport card pitch still crossed the focal
// area too quickly during an ordinary finger scroll. Keep tablet pacing as-is
// and give the narrower phone composition a longer, more readable dwell.
const SCROLL_PACE_MULTIPLIER_MOBILE = 3.2;

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
// Emphasis is carried entirely by opacity. There is deliberately no scale
// pair here any more: a muted card used to sit at 0.7 and grow to 1 as it
// became active, which read as the record popping toward the reader. Every
// record now holds the size the active one had, and the handoff is purely a
// change in emphasis.
const CARD_MUTED_OPACITY = 0.35;
const CARD_ACTIVE_OPACITY = 1;
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

    const cards = Array.from(
      track.querySelectorAll<HTMLElement>("[data-card]")
    );
    const discs = cards
      .map((card) => card.querySelector<HTMLElement>(`.${styles.disc}`))
      .filter((disc): disc is HTMLElement => disc !== null);
    if (discs.length !== cards.length) return;

    // Desktop writes transforms/opacity directly for every scrub frame. Those
    // values must not survive a breakpoint or reduced-motion change and leak
    // into the normal vertical fallback.
    const resetToDocumentFlow = () => {
      wrapper.removeAttribute("data-pinned");
      track.style.removeProperty("transform");
      cards.forEach((card, index) => {
        card.style.removeProperty("opacity");
        card.setAttribute("data-active", index === 0 ? "true" : "false");
      });
      rulerTicks.replaceChildren();
    };

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        // Never read. It exists so the context ACTIVATES below 1024px.
        // gsap.matchMedia only runs the callback while at least one declared
        // condition matches: with just isDesktop and reducedMotion, a phone
        // matched neither, so this callback never ran at all and Music silently
        // had no interaction — the vertical list was only the CSS default
        // showing through. The complementary query is what makes the mobile
        // branch reachable.
        isTouch: "(max-width: 1023px)",
        isMobile: "(max-width: 767px)",
        reducedMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isDesktop, isMobile, reducedMotion } = context.conditions as {
          isDesktop: boolean;
          isMobile: boolean;
          reducedMotion: boolean;
        };

        // Reduced motion is the only mode that opts out of the interaction
        // entirely: items stay in normal vertical document flow with no pin and
        // no GSAP involvement.
        //
        // Every other width — phone, tablet, desktop — builds the SAME system:
        // vertical scroll pins the stage and drives the track horizontally.
        // isDesktop no longer decides whether the interaction exists, only how
        // it is paced; the geometry differences are entirely in CSS, and are
        // picked up automatically because every distance below is measured from
        // the live layout rather than assumed.
        if (reducedMotion) {
          resetToDocumentFlow();
          return;
        }

        // Crossing 768px or 1024px changes the responsive card geometry and/or
        // emphasis lifecycle. Keeping those states as matchMedia conditions
        // makes GSAP rebuild from the live layout rather than retain stale
        // measurements from the previous mode.
        const pace = isDesktop
          ? SCROLL_PACE_MULTIPLIER
          : isMobile
            ? SCROLL_PACE_MULTIPLIER_MOBILE
            : SCROLL_PACE_MULTIPLIER_TOUCH;

        // Tablet/desktop emphasis is driven continuously by distance from the
        // focal position; phones use the viewport-edge lifecycle below. Both
        // read stable card centres from offsetLeft/offsetWidth, which are not
        // affected by the translated track's rendered position.
        let cardCenters: number[] = [];
        let cardSpacing = 1;
        let activeIndex = 0;
        let scrollDirection: 1 | -1 = 1;
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

          /* Phones use a viewport lifecycle rather than the wider-screen
             centre-distance crossfade. This is calculated directly from the
             current position on every frame, so a fast inertial scroll cannot
             skip a narrow "fully visible" observation and leave later cards
             muted. The measured cardSpacing keeps adjacent state intervals
             contiguous even if 100vw and clientWidth differ by a pixel. */
          if (isMobile) {
            const edgeTolerance = 1;
            activeIndex = cards.findIndex((card, index) => {
              const halfWidth = card.offsetWidth / 2;
              const screenCenter = cardCenters[index] + currentX;
              const leftEdge = screenCenter - halfWidth;
              const rightEdge = screenCenter + halfWidth;

              if (scrollDirection > 0) {
                return (
                  rightEdge >
                    wrapper.clientWidth - cardSpacing - edgeTolerance &&
                  rightEdge <= wrapper.clientWidth + edgeTolerance
                );
              }

              return (
                leftEdge >= -edgeTolerance &&
                leftEdge < cardSpacing + edgeTolerance
              );
            });

            cards.forEach((card, index) => {
              const isActive = index === activeIndex;
              card.style.opacity = `${
                isActive ? CARD_ACTIVE_OPACITY : CARD_MUTED_OPACITY
              }`;
              card.setAttribute("data-active", isActive ? "true" : "false");
            });
            return;
          }

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

        // Switch into the desktop horizontal layout before measuring it so
        // every center and distance belongs to the mode GSAP will animate.
        wrapper.setAttribute("data-pinned", "true");
        buildTicks();
        buildCardGeometry();

        // Offset the pin against the shared content-run header, which is what
        // is actually stuck above this section now. The global navigation no
        // longer sticks, so --header-height is the wrong reference. The
        // SectionHeader publishes --section-header-height from its measured
        // box; the fallback only matters for the frame before it does. Keep
        // this function-based so every ScrollTrigger refresh rereads the
        // current responsive measurement instead of retaining a stale value.
        const getSectionHeaderHeight = () =>
          parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--section-header-height"
            )
          ) || 0;

        // The horizontal motion has one reversible range, but the pin occupies
        // only its established middle. Before the pin, the first vinyl enters
        // while Music approaches. After the pin, the last vinyl finishes
        // leaving while Visuals rises into view. Using one scrubbed tween for
        // all three phases makes reverse scroll mirror the same geometry.
        const ENTRY_POSITION_AT_PIN_FRACTION = 0.286;
        const EXIT_OUTSIDE_FRACTION_AT_RELEASE = 0.6;

        // getBoundingClientRect measures the rendered vinyl rather than its
        // much wider card slot. With scaling removed, this width is stable even
        // while the parent track is translated.
        const getDiscWidth = (disc: HTMLElement) =>
          disc.getBoundingClientRect().width;

        // At the motion boundary the vinyl's nearest edge is exactly at the
        // viewport edge. At the pin boundary it retains the accepted 0.286w
        // offset, so the section becomes established while it is still moving.
        const getEntryStartRoll = () =>
          wrapper.clientWidth / 2 + getDiscWidth(discs[0]) / 2;
        const getEntryRollAtPin = () =>
          wrapper.clientWidth * ENTRY_POSITION_AT_PIN_FRACTION;

        // A disc is 60% outside the left edge when its centre is 10% of its
        // width beyond that edge. The pin releases there; the remaining 40%
        // continues through the same tween until the disc is fully outside.
        const getExitRollAtRelease = () =>
          wrapper.clientWidth / 2 +
          getDiscWidth(discs[discs.length - 1]) *
            (EXIT_OUTSIDE_FRACTION_AT_RELEASE - 0.5);
        const getExitEndRoll = () =>
          wrapper.clientWidth / 2 +
          getDiscWidth(discs[discs.length - 1]) / 2;

        // --- MAIN SEQUENCE -------------------------------------------------
        // The centre-to-centre span: how far the track travels between the
        // first record sitting centred and the last one sitting centred.
        //
        // Measured from the cards themselves. It used to be
        // track.scrollWidth - wrapper.clientWidth, which is NOT that distance:
        // scrollWidth omits the track's trailing padding, so at 1600 it read
        // 1430 against a true span of 3 x 680 = 2040. The sequence was 610px
        // short of ever bringing the last record to centre, which is why no
        // amount of exit roll could push it off screen — the roll was being
        // spent making up the shortfall instead of clearing the record.
        //
        // Record-to-record pitch is untouched by this: the span is literally
        // the sum of the accepted pitches, just measured correctly.
        const getCenterDistance = () =>
          cards.length > 1
            ? cards[cards.length - 1].offsetLeft - cards[0].offsetLeft
            : 0;

        // Convert each outer overlap from measured horizontal travel to the
        // existing vertical pace. The pin range is only the travel between the
        // accepted entry position and the 60%-outside exit position; the full
        // tween range includes the offscreen entrance and exit as well.
        const getEntryOverlapScrollDistance = () =>
          (getEntryStartRoll() - getEntryRollAtPin()) * pace;
        const getExitOverlapScrollDistance = () =>
          (getExitEndRoll() - getExitRollAtRelease()) * pace;
        const getTotalDistance = () =>
          getEntryStartRoll() + getCenterDistance() + getExitEndRoll();
        const getPinnedScrollDistance = () =>
          getTotalDistance() * pace -
          getEntryOverlapScrollDistance() -
          getExitOverlapScrollDistance();

        // Keep the stage fixed only for the central Music sequence. This starts
        // at the same established boundary as before, but releases before the
        // horizontal motion ends so Visuals and the remaining vinyl exit can
        // coexist. Refresh this first so the motion trigger can safely derive
        // its numeric boundaries from the pin's current measured positions.
        const pinTrigger = ScrollTrigger.create({
          trigger: pinStage,
          start: () => `top top+=${getSectionHeaderHeight()}`,
          end: () => `+=${getPinnedScrollDistance()}`,
          pin: true,
          anticipatePin: 1,
          refreshPriority: 1,
        });

        const tween = gsap.fromTo(
          track,
          { x: () => getEntryStartRoll() },
          {
            x: () => -(getCenterDistance() + getExitEndRoll()),
            ease: "none",
            scrollTrigger: {
              trigger: pinStage,
              start: () =>
                pinTrigger.start - getEntryOverlapScrollDistance(),
              end: () => pinTrigger.end + getExitOverlapScrollDistance(),
              scrub: 0.5,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                scrollDirection = self.direction < 0 ? -1 : 1;
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
          tween.scrollTrigger?.kill();
          tween.kill();
          pinTrigger.kill();
          resetToDocumentFlow();
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
            {MUSIC_ITEMS.map((item, index) => {
              const viewLabel = item.type === "mix" ? "view mix" : "view release";

              return (
                <li
                  key={item.id}
                  data-card
                  data-active={index === 0 ? "true" : "false"}
                  className={styles.card}
                >
                  <div className={styles.disc}>
                    <div className={styles.discVisual}>
                      <div className={styles.artwork}>
                        <Image
                          src={item.artwork}
                          alt={`${item.title} artwork`}
                          fill
                          sizes="(min-width: 1024px) 20vw, 60vw"
                        />
                      </div>
                    </div>
                  </div>
                  <p className={styles.metadata}>{item.type}</p>
                  <div className={styles.titleGroup}>
                    <h3 className={styles.title}>{item.title}</h3>
                    <p className={styles.year}>({item.year})</p>
                  </div>
                  <button type="button" className={styles.viewControl}>
                    <span className={styles.viewLabelMask}>
                      <span className={styles.viewLabelRoll}>
                        <span className={styles.viewLabel}>{viewLabel}</span>
                        <span className={styles.viewLabel} aria-hidden="true">
                          {viewLabel}
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
