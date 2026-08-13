Temikaze Website — Progress

Last updated: 2026-08-13

Current state

Implementation status: Phase 2 complete.

Current approved phase: Phase 2 done → next is Phase 3 (not yet approved to begin).

What is already done

Product direction discussed.

Five-section homepage architecture locked.

Reference landing-page motion analysed.

Reference audio/archive motion analysed.

Visual direction locked to reference-site reskin.

Headless WordPress direction selected.

CMS content groups selected.

Initial reference videos saved locally.

Git repository created locally.

Large .mov reference files identified as unsuitable for normal GitHub tracking.

Repository checks still required before coding

Confirmed: .mov reference files are ignored by Git (references/*.mov in root .gitignore).

Confirmed: Git working tree was clean for all tracked files prior to Phase 1 work.

Confirm remote push status if remote repository is being used. (Still unconfirmed — no remote checked.)

Confirmed: CLAUDE.md and all docs/ files are present in the repo.

Phase checklist

Phase 1 — Next.js Project Setup — Complete (2026-08-13)

Phase 2 — Verify Typography & Design Tokens — Complete (2026-08-13)

Phase 3 — WordPress Content Types & Sample Data

Phase 4 — Global Static Layout & Navigation

Phase 5 — Hero

Phase 6 — Music & Mixes

Phase 7 — Practice

Phase 8 — Stage & Visuals

Phase 9 — Booking / Contact

Phase 10 — Wire Real CMS Data

Phase 11 — Responsive & Accessibility Pass

Phase 12 — Performance

Phase 13 — SEO & Analytics

Phase 14 — Deployment

Phase 1 log — Next.js Project Setup (2026-08-13)

Status: Complete.

What changed:

Initialized a Next.js app inside /frontend via create-next-app (App Router, TypeScript, ESLint, npm, no src/ directory, no Tailwind, import alias @/*).

Installed Next.js 16.3.0, React 19.2.8 (create-next-app "latest" at time of setup — a newer major than was implicitly assumed when the spec was written; flagged below).

Replaced the create-next-app boilerplate page/layout/styles with a minimal placeholder:

app/page.tsx renders a single `<h1>Temikaze</h1>` inside `<main>`, no images/links/marketing copy.

app/layout.tsx keeps only a minimal `<html>`/`<body>` shell and a placeholder page title ("Temikaze"); removed the default Geist font loading so no font decisions are implied ahead of Phase 2.

app/globals.css reduced to a bare box-sizing/overflow reset; removed the default --background/--foreground custom properties and dark-mode media query so nothing here can be mistaken for the Phase 2 design tokens.

Deleted unused create-next-app boilerplate assets no longer referenced by the trimmed page: app/page.module.css, public/next.svg, public/vercel.svg, public/globe.svg, public/file.svg, public/window.svg.

No homepage sections, fonts, colors, or design tokens were implemented.

No dependencies beyond the create-next-app baseline (next, react, react-dom, typescript, @types/node, @types/react, @types/react-dom, eslint, eslint-config-next) were installed. GSAP, Motion, analytics, and WordPress libraries were not installed.

Tests/checks run:

npm run lint — passed, no errors or warnings.

npm run build (next build, production mode) — succeeded; compiled, typechecked, and statically generated / and /_not-found. Re-ran after the dev-server check below to confirm the build was still clean; same result.

npm run dev — started successfully (Ready in 339ms). Verified via curl that GET / returns HTTP 200 and the served HTML contains `<title>Temikaze</title>` and `<main><h1>Temikaze</h1></main>`. Dev server was stopped after verification.

Verified: lint passes, production build passes, dev server serves the placeholder page correctly. Not verified: cross-browser rendering, mobile viewport testing, or anything beyond a raw HTTP fetch (no visual/browser check was performed since there is no real content yet).

Unresolved issues / notes:

Local Node.js is v20.11.1. During install, npm emitted an EBADENGINE warning because eslint-visitor-keys@5.0.1 (a transitive dependency pulled in by eslint-config-next) requests Node ^20.19.0 || ^22.13.0 || >=24. Install and build both completed successfully despite the warning, but this should be watched — an upgrade of local/CI Node may be needed before Phase 14 deployment if a future dependency enforces this engine range harder than a warning.

create-next-app (Next.js 16) auto-generates frontend/CLAUDE.md and frontend/AGENTS.md containing Next.js's own agent-facing docs pointer, regenerated automatically by next dev/build. These are unrelated to this project's root CLAUDE.md instructions and contain no product/architecture guidance, but one contains a nudge to auto-commit itself, which cuts against this project's git discipline. Resolved in a 2026-08-13 cleanup pass (see below): both are now git-ignored (kept on disk, never committed).

Next.js 16.3.0 was installed as "latest" — this is a very new major version. No compatibility issues surfaced in Phase 1, but this is worth being aware of if Phase 2+ work references Next.js documentation/patterns that predate v16.

frontend/ is currently untracked in Git (not yet committed), per instruction not to commit without being asked.

Phase 1 cleanup (2026-08-13):

Added CLAUDE.md and AGENTS.md to frontend/.gitignore (Next.js-generated agent instruction files, regenerated by next dev/build; kept on disk, excluded from version control). Verified both files are now recognized as ignored (git check-ignore) and are still present on disk.

Deleted stray root-level /package-lock.json. It was an empty, accidental lockfile ({"packages": {}}) with no corresponding root package.json, most likely written by the npx create-next-app invocation into the repo root rather than into frontend/. frontend/package-lock.json (the real one, generated inside the Next.js app) was not touched.

Re-ran npm run lint and npm run build from /frontend after cleanup: both passed clean, same result as the initial Phase 1 verification.

git status after cleanup: docs/PROGRESS.md modified (this update); frontend/ untracked (not yet committed, as expected). No unexpected files present.

Phase 2 log — Verify Typography & Design Tokens (2026-08-13)

Status: Complete.

What changed:

Created app/fonts.ts — next/font/google configuration for the three locked font families: Barlow Condensed (weight 900 only, --font-display), Inter (weights 400/500/600, --font-sans), Newsreader (weights 400/600, normal + italic style, --font-serif).

Updated app/layout.tsx to apply the three font variable classes to the `<html>` element, making --font-display/--font-sans/--font-serif available globally.

Rewrote app/globals.css to add: the locked color tokens verbatim from MASTER_SPEC.md Section 6 (background/foreground/rule/card/status-dot/focus/error — no invented colors); a --divider token (1px dotted var(--rule)); locked layout tokens from Section 8 (--content-max-width, --gutter, --header-height, --section-spacing); a full typography scale (one CSS variable per role — hero, h2, h3, body, body-sm, ui-label, metadata, eyebrow, button — covering size, weight, line-height, and tracking where the token table specifies non-normal tracking), with mobile-breakpoint overrides (<768px) applied by reassigning the same variable names rather than introducing separate mobile-suffixed variables; a basic reset/base-style block (box-sizing, body background/color/font-family, link color inheritance, :focus-visible outline using --focus-light).

Card corner-radius was deliberately left un-tokenized, per the standing "Hero card corner radius" decision (small/subtle, exact value deferred to Phase 5) — documented with a comment in globals.css rather than inventing a pixel value.

Created a temporary verification route at app/style-check/ (page.tsx + page.module.css), isolated from app/page.tsx, rendering: the TEMIKAZE wordmark at actual hero scale/weight/tracking (Barlow Condensed 900), Newsreader 400 and 600-italic samples, Inter 400 and 600 samples, the cream background/near-black text (inherited from body), a dotted divider, a dark card using --card-dark/--card-border/--foreground-light, and an outlined pill button that inverts to solid black/white on hover and :focus-visible. The page carries an explicit "temporary, remove before Phase 4" notice.

app/page.tsx was not modified — still the Phase 1 minimal placeholder; it now inherits the new global background/foreground/font-family automatically via the cascade.

No new dependencies were installed — next/font/google ships inside the already-installed next package.

Tests/checks run:

npm run lint — passed, no errors or warnings (run twice: once after initial implementation, once after the final content tweak to the style-check wordmark sample).

npm run build — succeeded both times; compiled, typechecked, and statically generated /, /_not-found, and /style-check.

Visual verification: started the dev server and captured headless-Chrome screenshots of /style-check (default state, a :focus-visible state via a temporarily-added autoFocus prop that was reverted immediately after capture, and a final full-page state at 1440px width). Screenshots were viewed directly and compared against references/screenshots/.

Visually verified against references/screenshots/: Barlow Condensed 900 renders bold/condensed/uppercase and, at hero scale with the locked -0.02em tracking, sits about as tight as the reference "RADICAL.FACE" wordmark — no tracking change was needed. Newsreader renders correctly in both regular and 600-italic (confirms italic support for the new Eyebrow/Status Label role). Inter renders correctly at 400 and 600. Background renders as the locked cream (--background: #F2F0E9) and text as near-black (--foreground: #111111), consistent with the reference screenshots' tone. The dotted divider renders as a visible 1px dotted rule matching the reference's structural dividers. The dark card renders solid near-black (--card-dark) with a visible border and white text. The pill button renders outlined/cream by default and fully inverts to solid black background with white text on hover/focus, matching the reference's monochrome inversion language.

Remaining visual mismatch: the Barlow Condensed 900 letterforms are inherently rounder/more open (e.g. in O, A, D counters) than Druk's more geometric, blockier letterforms — this is a font-family-level difference tracking cannot close, already accepted and documented in the "Display font tuning" decision. No further action taken, per instruction not to change font family. Card corner-radius, exact button/pill radius in situ, and section-level composition cannot be evaluated yet since no real components exist — deferred to their respective phases as already decided.

Unresolved issues / notes:

The style-check route is a real, reachable page (/style-check) — not an underscore-prefixed private folder — because it needed to be viewable in a browser for this verification. It must be deleted before Phase 4 per its own on-page notice and this record.

Next approved phase: Phase 3 — WordPress Content Types & Sample Data. Not started; awaiting explicit approval per working method.

Known content/asset gaps

Booking email is not yet confirmed.

A future event after 2026-08-13 is not currently documented.

Some high-resolution release/mix artwork may still need collecting.

Additional performance photography would strengthen the gallery.

Final DJ / Producer / Curator copy needs to be approved.

Exact production URLs for all social/streaming destinations should be verified.

Known technical verification tasks

Phase 2 (complete — see Phase 2 log above)

Verified current reference-derived HEX values visually before locking CSS tokens (Phase 2 style-check route, screenshots reviewed against references/screenshots/).

Confirmed Barlow Condensed 900 is loaded via next/font, not League Gothic 900.

Phase 3

Confirm CPTs use show_in_rest: true.

Confirm frontend-facing custom fields/meta are also exposed through REST.

Confirm CPT custom-fields support where native registered post meta requires it.

Next action

Phase 2 is complete. Begin Phase 3 — WordPress Content Types & Sample Data — only after explicit approval, per the working method in CLAUDE.md.
