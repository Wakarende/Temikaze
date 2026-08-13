import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Style Check (temporary) — Temikaze",
};

export default function StyleCheckPage() {
  return (
    <main
      style={{
        padding: "3rem clamp(1.5rem, 4vw, 4rem)",
        display: "flex",
        flexDirection: "column",
        gap: "2.5rem",
      }}
    >
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem" }}>
        Temporary Phase 2 token verification surface. Not homepage content —
        remove before Phase 4.
      </p>

      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: "var(--weight-hero)",
          fontSize: "var(--text-hero)",
          lineHeight: "var(--leading-hero)",
          letterSpacing: "var(--tracking-hero)",
          textTransform: "uppercase",
        }}
      >
        Temikaze
      </h1>

      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 400,
          fontSize: "var(--text-h3)",
        }}
      >
        Newsreader 400 — regular editorial serif copy.
      </p>

      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 600,
          fontStyle: "italic",
          fontSize: "var(--text-h3)",
        }}
      >
        Newsreader 600 italic — eyebrow/status label style.
      </p>

      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 400,
          fontSize: "var(--text-body)",
        }}
      >
        Inter 400 body copy. The quick brown fox jumps over the lazy dog.
      </p>

      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 600,
          fontSize: "var(--text-ui-label)",
        }}
      >
        Inter 600 — UI label weight.
      </p>

      <div style={{ borderBottom: "var(--divider)" }} />

      <div
        style={{
          background: "var(--card-dark)",
          border: "1px solid var(--card-border)",
          color: "var(--foreground-light)",
          padding: "1.5rem",
          maxWidth: "20rem",
        }}
      >
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem" }}>
          --card-dark background, --card-border outline, --foreground-light
          text.
        </p>
      </div>

      <button
        type="button"
        className={styles.pill}
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: "var(--weight-button)",
          fontSize: "var(--text-button)",
          letterSpacing: "var(--tracking-button)",
        }}
      >
        pill button
      </button>
    </main>
  );
}
