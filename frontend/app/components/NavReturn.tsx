"use client";

import { useEffect } from "react";

/**
 * Scroll-direction visibility for the primary navigation.
 *
 * The whole behaviour:
 *
 *   at the top          -> visible, in its normal flow position
 *   scrolling down      -> slides up out of the viewport
 *   scrolling up        -> slides back down, pinned to the top
 *
 * Upward scrolling reveals it anywhere on the page. There is no precondition:
 * the reader does not have to reach the bottom, or any particular section,
 * first. Reversing direction again hides it.
 *
 * Inside the Music/Visuals run the returning navigation takes the topmost
 * position and the shared editorial header drops beneath it by exactly the
 * measured navigation height, so the two stack rather than overlap. Booking
 * sits outside that run and has no shared header, so upward scrolling there
 * reveals the navigation alone.
 *
 * Renders nothing. It sets one attribute and one custom property on the
 * document element, and both headers respond to those in CSS — so scrolling
 * never triggers a React re-render, and the sliding is done by the compositor
 * rather than by React.
 *
 * The attribute marks the HIDDEN state rather than the visible one, so the
 * navigation shows by default: on first paint, with JavaScript unavailable, or
 * if this effect never runs, the reader still gets a navigation bar.
 */

// Sub-pixel scroll deltas (momentum tails, trackpad jitter, fractional device
// pixels) must not count as a direction change, or the navigation would slide
// in and out while the reader is holding still. Deltas below this are ignored
// and left to accumulate, so a slow deliberate scroll still registers once it
// has actually moved.
const DIRECTION_THRESHOLD_PX = 4;

// Within this distance of the top the navigation is already on screen at its
// normal flow position, so there is nothing to hide.
const TOP_ZONE_PX = 8;

export default function NavReturn() {
  useEffect(() => {
    const root = document.documentElement;
    const primary = document.querySelector("header");
    if (!primary) return;

    // This page's scroll container is <body> rather than the viewport
    // (globals.css sets overflow-x on body), so window.scrollY reads 0 while
    // body.scrollTop carries the real offset. Take whichever is reporting.
    const getScrollTop = () =>
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    let hidden = false;
    let overlayOpen = false;
    let lastScrollTop = getScrollTop();

    const publishHeight = () =>
      root.style.setProperty(
        "--primary-header-height",
        `${primary.getBoundingClientRect().height}px`
      );

    const setHidden = (next: boolean) => {
      if (hidden === next) return;
      hidden = next;
      if (next) root.setAttribute("data-nav-hidden", "true");
      else root.removeAttribute("data-nav-hidden");
    };

    const evaluate = () => {
      if (overlayOpen) return;
      const scrollTop = getScrollTop();

      // At the top the navigation is at its natural position and must always
      // be showing. This also returns the shared section header to its offset
      // resting place, so every journey down starts from the same state.
      if (scrollTop <= TOP_ZONE_PX) {
        lastScrollTop = scrollTop;
        setHidden(false);
        return;
      }

      const delta = scrollTop - lastScrollTop;
      // Deliberately does not update lastScrollTop below the threshold, so
      // small movements accumulate rather than being discarded.
      if (Math.abs(delta) < DIRECTION_THRESHOLD_PX) return;

      lastScrollTop = scrollTop;
      setHidden(delta > 0);
    };

    publishHeight();
    evaluate();

    const handleOverlay = (event: Event) => {
      const detail = (event as CustomEvent<{ open: boolean }>).detail;
      overlayOpen = detail.open;
      lastScrollTop = getScrollTop();
      if (overlayOpen) setHidden(false);
    };

    const resizeObserver = new ResizeObserver(publishHeight);
    resizeObserver.observe(primary);

    // Capture phase on the document catches the scroll event whichever element
    // actually scrolls, which on this page is <body>.
    document.addEventListener("scroll", evaluate, {
      passive: true,
      capture: true,
    });
    window.addEventListener("temikaze:artist-bio-overlay", handleOverlay);
    window.addEventListener("resize", evaluate);

    return () => {
      resizeObserver.disconnect();
      document.removeEventListener("scroll", evaluate, true);
      window.removeEventListener("temikaze:artist-bio-overlay", handleOverlay);
      window.removeEventListener("resize", evaluate);
      root.removeAttribute("data-nav-hidden");
      root.style.removeProperty("--primary-header-height");
    };
  }, []);

  return null;
}
