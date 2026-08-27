"use client";

import { useEffect } from "react";

/**
 * Bottom-triggered return of the primary navigation.
 *
 * The observed lifecycle, and nothing beyond it:
 *
 *   top -> scroll down -> primary navigation leaves -> MUSIC -> VISUALS
 *   -> reach the bottom -> scroll UP -> primary navigation returns and sits
 *   above the shared section header, both visible -> continue up to Hero
 *   -> state resets, so the next downward journey behaves like the first.
 *
 * Deliberately not generalised into "scroll up anywhere reveals the nav": the
 * return only becomes available once the document bottom has genuinely been
 * reached, and once armed it stays armed until Hero, rather than flickering on
 * every small direction reversal.
 *
 * Renders nothing. It sets one attribute and one custom property on the
 * document element, and both headers respond to those in CSS — so scrolling
 * never triggers a React re-render.
 */

// Scroll positions do not always land on an exact pixel (zoom, fractional
// device pixels, sub-pixel layout), so the bottom is treated as reached a
// couple of pixels early.
const BOTTOM_TOLERANCE_PX = 2;

export default function NavReturn() {
  useEffect(() => {
    const root = document.documentElement;
    const primary = document.querySelector("header");
    const contentRun = document.querySelector<HTMLElement>("[data-content-run]");
    if (!primary || !contentRun) return;

    // This page's scroll container is <body> rather than the viewport
    // (globals.css sets overflow-x on body), so window.scrollY reads 0 while
    // body.scrollTop carries the real offset. Take whichever is reporting.
    const getScrollTop = () =>
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    const getScrollHeight = () =>
      Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );

    let reachedBottom = false;
    let armed = false;
    let lastScrollTop = getScrollTop();

    const publishHeight = () =>
      root.style.setProperty(
        "--primary-header-height",
        `${primary.getBoundingClientRect().height}px`
      );

    const setArmed = (next: boolean) => {
      if (armed === next) return;
      armed = next;
      if (next) root.setAttribute("data-nav-return", "true");
      else root.removeAttribute("data-nav-return");
    };

    const evaluate = () => {
      const scrollTop = getScrollTop();
      const direction = scrollTop - lastScrollTop;
      lastScrollTop = scrollTop;

      // Returning to Hero resets everything, so the next downward journey is
      // indistinguishable from the first. Measured against the content run
      // rather than a scroll number: once the run's top has dropped back below
      // the viewport top, Hero is what the reader is in.
      if (contentRun.getBoundingClientRect().top > 0) {
        reachedBottom = false;
        setArmed(false);
        return;
      }

      if (
        scrollTop + window.innerHeight >=
        getScrollHeight() - BOTTOM_TOLERANCE_PX
      ) {
        reachedBottom = true;
      }

      // Arm on the first upward movement after the bottom has been reached,
      // then leave it armed until the reset above. Re-checking direction on
      // every event would make the navigation flicker in and out on ordinary
      // scroll jitter.
      if (reachedBottom && direction < 0) setArmed(true);
    };

    publishHeight();
    evaluate();

    const resizeObserver = new ResizeObserver(publishHeight);
    resizeObserver.observe(primary);

    // Capture phase on the document catches the scroll event whichever element
    // actually scrolls, which on this page is <body>.
    document.addEventListener("scroll", evaluate, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", evaluate);

    return () => {
      resizeObserver.disconnect();
      document.removeEventListener("scroll", evaluate, true);
      window.removeEventListener("resize", evaluate);
      root.removeAttribute("data-nav-return");
      root.style.removeProperty("--primary-header-height");
    };
  }, []);

  return null;
}
