"use client";

import {
  type ComponentType,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import {
  InstagramIcon,
  LinktreeIcon,
  MailIcon,
  SoundCloudIcon,
  TikTokIcon,
  YouTubeIcon,
} from "./BrandIcons";
import styles from "./BookingContact.module.css";
import { CONTACT_EMAIL, LINKTREE, SOCIAL_LINKS } from "./contactData";

const SOCIAL_ICONS: Record<string, ComponentType<{ className?: string }>> =
  {
    instagram: InstagramIcon,
    tiktok: TikTokIcon,
    youtube: YouTubeIcon,
    soundcloud: SoundCloudIcon,
  };

/**
 * A destination pill.
 *
 * On hover the border, label and icon brighten from muted grey toward white,
 * and the label runs the masked vertical roll reused from the StageVisuals
 * prev/next pills. The pill itself never moves or scales.
 *
 * Where this differs from StageVisuals: there the roll fires on activation and
 * the control has no hover treatment at all; here it fires on hover, because
 * that is the interaction this section calls for. StageVisuals is unchanged.
 *
 * Clicking simply navigates — there is no activation animation and no state.
 *
 * These are real anchors, not buttons — they navigate, and MASTER_SPEC Section
 * 16 requires navigation destinations to be links. A consequence worth knowing:
 * Enter activates a link natively and fires click, so the feedback runs; Space
 * does not activate links at all, and faking it would mean hijacking the key
 * and breaking modifier/middle-click behaviour, so Space is left alone.
 */
function LinkPill({
  href,
  label,
  icon: Icon,
  className,
  external = true,
}: {
  href: string;
  label: string;
  icon?: ComponentType<{ className?: string }>;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className={`${styles.pill} ${className ?? ""}`.trim()}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {Icon ? <Icon className={styles.icon} /> : null}
      {/* The same label structure as the StageVisuals pills: a mask exactly
          one line tall containing two identical labels, so the roll ends on
          the duplicate and the word never appears to change. Booking drives it
          from :hover in CSS rather than from a press counter, so there is no
          state here and nothing to get stuck. */}
      <span className={styles.labelMask}>
        <span className={styles.roll}>
          <span className={styles.label}>{label}</span>
          {/* Hidden from assistive tech so the link announces its label once,
              not twice. */}
          <span className={styles.label} aria-hidden="true">
            {label}
          </span>
        </span>
      </span>
    </a>
  );
}

/**
 * The signature write-on.
 *
 * The visible artwork is always the supplied PNG. An SVG mask stroked along an
 * approximation of the signature's own stroke order — the long opening
 * flourish, back down through the T, left to right across the word, then the
 * closing flourish — progressively exposes it, so the reveal follows the
 * handwriting rather than wiping a rectangle across it.
 *
 * Runs at most once per page lifecycle. Scrolling away and back, reaching the
 * bottom and returning, or moving between sections never replays it; only a
 * reload does.
 */
function Signature() {
  const hasWritten = useRef(false);
  const holderRef = useRef<HTMLDivElement>(null);

  // Driven through data attributes rather than React state: the reveal is
  // purely visual, so there is no reason to re-render for it, and it keeps the
  // "armed" write out of React's render cycle entirely.
  //
  // Arming is what hides the artwork behind the mask. It only ever happens
  // from an effect, so with JavaScript unavailable — or under reduced motion,
  // where it is skipped — the signature simply renders complete. It can never
  // be left invisible.
  useLayoutEffect(() => {
    const node = holderRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    node.dataset.armed = "true";
  }, []);

  useEffect(() => {
    const node = holderRef.current;
    if (!node || node.dataset.armed !== "true" || hasWritten.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || hasWritten.current) continue;
          // The one-shot guard. Set before anything else so a burst of
          // entries cannot start the reveal twice, and never cleared for the
          // life of the page — scrolling away and back, reaching the bottom
          // and returning, or moving between sections all leave it set. Only
          // a reload starts a new lifecycle.
          hasWritten.current = true;
          node.dataset.written = "true";
          observer.disconnect();
        }
      },
      // Fires once Booking has meaningfully arrived rather than on the first
      // pixel of it.
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.signature} ref={holderRef}>
      <svg
        className={styles.signatureSvg}
        viewBox="0 0 2172 724"
        role="img"
        aria-label="Temikaze"
      >
        <defs>
          <mask id="temikaze-signature-mask" maskUnits="userSpaceOnUse">
            <path
              className={styles.maskPath}
              pathLength={1}
              d="M 369 364
                 C 500 250, 700 190, 869 206
                 C 1000 215, 1090 210, 1146 217
                 C 1000 240, 850 252, 760 300
                 C 700 400, 650 480, 614 554
                 C 638 470, 650 440, 652 424
                 C 760 400, 870 420, 977 413
                 C 1150 405, 1280 430, 1412 424
                 C 1520 415, 1580 405, 1629 402
                 C 1720 385, 1850 370, 1944 364"
            />
          </mask>
        </defs>
        <image
          href="/images/branding/temikaze-signature.png"
          x="0"
          y="0"
          width="2172"
          height="724"
          mask="url(#temikaze-signature-mask)"
        />
      </svg>
    </div>
  );
}

export default function BookingContact() {
  return (
    <section id="booking" className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <Signature />
        {/* The section's own heading. There is deliberately no separate
            "Booking" title and no sticky editorial header here — the dark
            composition is the section identity. */}
        <h2 className={styles.headline}>Find me everywhere</h2>

        <div className={styles.primaryRow}>
          <span className={styles.rule} aria-hidden="true" />
          <LinkPill
            href={LINKTREE.href}
            label={LINKTREE.label}
            icon={LinktreeIcon}
            className={styles.primaryPill}
          />
          <span className={styles.rule} aria-hidden="true" />
        </div>

        <div className={styles.footerDirectory}>
          <ul className={styles.socials}>
            {SOCIAL_LINKS.map((link) => (
              <li key={link.id}>
                <LinkPill
                  href={link.href}
                  label={link.label}
                  icon={SOCIAL_ICONS[link.id]}
                />
              </li>
            ))}
          </ul>
          <hr className={styles.divider} />
          <div className={styles.contactRow}>
            <span className={styles.contactLabel}>Contact:</span>
            <LinkPill
              href={`mailto:${CONTACT_EMAIL}`}
              label={CONTACT_EMAIL}
              icon={MailIcon}
              external={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
