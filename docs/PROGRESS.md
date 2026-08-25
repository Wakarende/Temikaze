Temikaze Website — Progress

Last updated: 2026-08-25

Current state

Implementation status: Phase 6 accepted in its current state (2026-08-21) after a multi-round repair, and since committed and pushed (3887173, 2026-08-25). Manual browser testing confirmed the core desktop pinned interaction works. See "Phase 6 accepted state" and "Phase 6 repair log" below for what changed, and "Deferred Phase 6 polish" / "Deferred asset/content work" for what is explicitly carried forward, non-blocking.

Current approved phase: Phase 6 accepted, committed, and pushed. Phase 7 — Practice — is next and has not yet been approved to begin. See Next action.

Development machine: moved from macOS to Windows on 2026-08-25. See "Repository housekeeping — macOS to Windows migration" below for what that changed — notably, the WordPress installation on this machine holds no sample records (re-seeding deferred to Phase 10), and the reference .mov recordings are not present locally.

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

Confirmed (2026-08-25): remote is https://github.com/Wakarende/Temikaze.git; branch master is in sync with origin/master at commit 3887173.

Confirmed: CLAUDE.md and all docs/ files are present in the repo.

Phase checklist

Phase 1 — Next.js Project Setup — Complete (2026-08-13)

Phase 2 — Verify Typography & Design Tokens — Complete (2026-08-13)

Phase 3 — WordPress Content Types & Sample Data — Complete (2026-08-13)

Phase 4 — Global Static Layout & Navigation — Complete (2026-08-14)

Phase 5 — Hero — Complete (2026-08-14)

Phase 6 — Music & Mixes — Accepted (2026-08-21): originally marked complete 2026-08-14, reopened the same day after manual browser verification found the pinned horizontal scroll broken, repaired across several rounds, then re-verified by manual browser testing and accepted in its current state. See "Phase 6 accepted state" below.

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

Next approved phase (superseded — see Phase 3 log below): Phase 3 was approved and completed 2026-08-13.

Phase 3 log — WordPress Content Types & Sample Data (2026-08-13)

Status: Complete.

Files created:

wordpress/temikaze-cms/temikaze-cms.php — plugin header (Plugin Name: Temikaze CMS) and loader that requires the four includes below, in order.

wordpress/temikaze-cms/includes/field-schema.php — single source of truth for every custom field across all five post types (label, admin input type, register_post_meta 'type', sanitize callback). Both the REST registration and the admin meta boxes read from this one function, so the two can't drift out of sync.

wordpress/temikaze-cms/includes/post-types.php — register_post_type() for artist_profile, releases, mixes, events, gallery, plus a small label-generator helper to avoid repeating the ~10-key WP labels array five times.

wordpress/temikaze-cms/includes/meta-fields.php — loops the field schema and calls register_post_meta() for every field with show_in_rest => true.

wordpress/temikaze-cms/includes/meta-boxes.php — one native admin meta box per post type (render + save), a save_post handler with nonce/autosave/capability checks that re-sanitizes every submitted value before update_post_meta()/delete_post_meta(), and a small wp.media()-based picker for the one attachment field (tg_frenz_logo_id).

No files outside wordpress/temikaze-cms/ were created or modified. The Next.js frontend was not touched.

Plugin architecture:

Procedural, no classes/OOP framework — five small files split by concern (schema / post types / REST meta / admin UI), each under ~200 lines. No third-party plugin, no Composer dependency, no ACF. All functionality is native WordPress core (register_post_type, register_post_meta, add_meta_box, save_post, wp_enqueue_media).

CPTs registered (confirmed via `studio wp post-type list`): artist_profile, releases, mixes, events, gallery — all public => true, show_in_rest => true, explicit rest_base matching the slug, supports per the locked content model (artist_profile: title/thumbnail/custom-fields; releases, mixes, gallery: + excerpt; events: title/thumbnail/custom-fields only, no excerpt).

Custom fields registered (all via register_post_meta, single => true, show_in_rest => true, a real sanitize_callback per field, and an auth_callback gating writes to logged-in editors):

artist_profile (13): tagline, location, dj_description, producer_description, curator_description, booking_email, spotify_url, youtube_url, instagram_url, tiktok_url, linktree_url, tg_frenz_url, tg_frenz_logo_id (integer).

releases (6): release_date, release_type, genre, spotify_url, youtube_url, other_streaming_url.

mixes (4): publish_date, youtube_url, soundcloud_url, tracklist.

events (4): event_date, venue, location, external_url.

gallery (4): alt_text, category, event_date, event_name.

All CPTs support custom-fields per the CLAUDE.md REST rule.

Sample content created (via `studio wp post create` / `post meta update`, run manually against the local Studio site — not wired into plugin activation, per instruction):

artist_profile #5 "Temikaze" — tagline "House / Afro House DJ + Producer", location "Nairobi, Kenya". All other fields (descriptions, booking email, social URLs, TG & fRenz fields) left empty — none of that content is verified in docs/CONTENT_INVENTORY.md yet.

releases #6 "Nia" — title only. No release_date/type/genre/URLs set — CONTENT_INVENTORY.md lists "Nia" as a known title but explicitly flags every other release field as still-to-verify, so none were invented.

mixes #7 "Mum's Garage Radio" — title only, representing the known series (no individual episode title/date is documented). No other fields set.

events — no sample entry currently exists. A sample event ("TG & fRenz — Jal Gua", venue "Jal Gua", event_date 2026-08-09) was initially created here but was deleted in a 2026-08-13 content-integrity cleanup (see below) because the title/venue/date combination was not explicitly verified in docs/CONTENT_INVENTORY.md — the document names "Jal Gua" as known venue material and separately lists two past dates without pairing either to that venue, and gives no verified event title. Combining those separately-known facts into one assumed event record was against project rules. No replacement sample event was created.

gallery — no entry created. assets-source/{photos,artwork,flyers,logos} are all still empty, and the instructions explicitly permit skipping the gallery sample for that reason.

REST endpoints tested — all five returned HTTP 200 via curl against http://localhost:8881/wp-json/wp/v2/{slug}:

/artist_profile, /releases, /mixes all returned a one-item array containing the seeded post. /events returned a one-item array at the time of this initial testing (before the sample event was deleted in the cleanup below — see that section for the reverified empty-collection result). /gallery correctly returned [] (empty array, no entries).

Examples of REST-visible custom metadata (proving registration, not just assumption):

artist_profile #5 → "meta":{"tagline":"House / Afro House DJ + Producer","location":"Nairobi, Kenya","dj_description":"","producer_description":"","curator_description":"","booking_email":"","spotify_url":"","youtube_url":"","instagram_url":"","tiktok_url":"","linktree_url":"","tg_frenz_url":"","tg_frenz_logo_id":0} — every registered field is present; populated ones show the real value, unpopulated ones show as empty string/0 rather than being missing.

events #8 (post since deleted, see cleanup below) → "meta":{"event_date":"2026-08-09","venue":"Jal Gua","location":"","external_url":""} — retained here only as evidence that register_post_meta correctly exposed populated and empty event fields via REST; the underlying post no longer exists.

releases #6 and mixes #7 both show all their registered meta keys present as empty strings, confirming registration for fields with no sample data yet.

Admin editing verification:

Plugin activated via `studio wp plugin activate temikaze-cms --path /Users/joyki/Studio/temikaze-cms` with no PHP errors/warnings ("Plugin 'temikaze-cms' activated. Success: Activated 1 of 1 plugins.").

A headless-Chrome screenshot of the wp-admin dashboard (after logging in via Studio's auto-login URL) visually confirms Artist Profile, Releases, Mixes, Events, and Gallery all appear as top-level admin menu items with icons — proving show_ui/show_in_menu registration.

Headless-Chrome screenshots of the individual post edit screens repeatedly hung (the Chrome process wrote its screenshot file successfully but then never exited, appearing to wait indefinitely on a network-idle signal — likely a WP heartbeat/update-check request that can't resolve in this sandboxed environment). After the process was killed, I switched to calling `temikaze_cms_render_meta_box()` directly via `studio wp eval` against the real post objects — this exercises the exact same PHP render code the browser would call, deterministically and without any network dependency. Output confirmed: for artist_profile #5, all 13 fields render with correct labels/input types (text/textarea/email/url/attachment-picker), a valid nonce, tagline and location correctly pre-filled, and every other field correctly empty. For events #8 (post since deleted, see cleanup below), event_date rendered as a native date input pre-filled "2026-08-09", venue pre-filled "Jal Gua", location and external_url correctly empty. This confirmed the admin UI renders correctly for two different CPT schemas; it does not, on its own, prove the browser-side layout/visual appearance, which is the one thing left unverified (see below).

Manual wp-admin save-path test (reported by the user, performed 2026-08-13, after the above): opened Artist Profiles → Temikaze in wp-admin, entered `Phase 3 save test` into the DJ Description field, clicked Update, refreshed the edit page, and confirmed the saved value persisted. Then cleared the field again, clicked Update, refreshed, and confirmed the field was empty. This exercises the real save_post handler — nonce check, capability check, and sanitize-then-update_post_meta()/delete_post_meta() logic — through an actual browser form submission, not just the WP-CLI update_post_meta() writes used for the original sample data. Confirms both the save and the clear round-trip correctly.

Tests/checks run:

php -l on all five plugin files — no syntax errors.

studio wp plugin activate — clean activation, no errors.

studio wp post-type list — all 5 CPTs present with public=1.

curl to all 5 REST routes — all HTTP 200, JSON inspected directly (see examples above).

Direct invocation of temikaze_cms_render_meta_box() via studio wp eval for two different post types — confirmed correct HTML, correct pre-filled values, correct empty values.

Manual wp-admin save-path test on artist_profile #5's DJ Description field (set value → Update → refresh → confirm persisted; clear value → Update → refresh → confirm empty) — confirms the real admin form save handler works end-to-end through an actual browser submission, not just WP-CLI writes.

Anything not verified:

The visual/browser appearance of the post edit screen (spacing, WordPress admin styling around the meta box) was not confirmed via screenshot — only the server-rendered HTML was verified directly, plus the manual save-path test above. Whether the media-picker button/JS actually opens the WordPress media library in a live browser click remains unverified — the manual save test exercised a plain text field (DJ Description), not the one attachment field (tg_frenz_logo_id).

Known issues:

Headless Chrome (installed system browser, not a project dependency) reliably hung when screenshotting the post-edit screen in this sandbox — the process wrote its output file but never exited, most likely because WP admin pages issue a background heartbeat/update-check request that never resolves without outbound internet access. This is an environment/tooling limitation, not a defect in the plugin; the admin UI's actual HTML output was independently verified via direct PHP invocation instead. Worth knowing if browser-based UI verification is needed again in a later phase.

Phase 3 cleanup (2026-08-13):

Deleted the sample events post #8 ("TG & fRenz — Jal Gua") via `studio wp post delete 8 --force --path=/Users/joyki/Studio/temikaze-cms`. Reason: the title/venue/date combination combined two separately-documented facts from docs/CONTENT_INVENTORY.md (the "Jal Gua" venue reference and one of two dates not paired to any specific venue) into a single assumed event record. CONTENT_INVENTORY.md never explicitly links that date to that venue or gives a verified event title, so this violated the project's content-integrity rule against combining known facts into an assumed record.

No replacement sample event was created. events currently contains no seeded sample data because no event record is sufficiently verified against docs/CONTENT_INVENTORY.md.

Reverified /wp-json/wp/v2/events after deletion: HTTP 200, response body [] — confirms the endpoint remains correctly functional with zero entries.

No plugin code was changed for this cleanup — only the one WordPress post was deleted. artist_profile #5, releases #6, and mixes #7 were not touched and remain as originally seeded.

Phase 4 log — Global Static Layout & Navigation (2026-08-14)

Status: Complete.

Files created:

frontend/app/components/Header.tsx — sticky header: TEMIKAZE wordmark (links to #hero), nav (music/practice/visuals/booking, lowercase, links to #music/#practice/#visuals/#booking), and a "book artist" pill CTA linking to #booking. All native anchor links, no scroll library.

frontend/app/components/Header.module.css — header styling: sticky positioning, solid cream background, 1px dotted bottom divider (reusing the existing --divider token), Barlow Condensed 900 wordmark at a smaller header-appropriate size (not the --text-hero token, which stays reserved for the real Hero H1 in Phase 5), nav/CTA text using the existing Button typography token (Inter 600, lowercase, +0.03em tracking — no text-transform applied, content is written lowercase directly), outlined pill CTA that inverts to solid black/white on hover/:focus-visible (same pattern already verified in Phase 2). No audio-toggle icon and no decorative replacement for it.

frontend/app/page.module.css — minimal placeholder-section styling (min-height: 100vh, centered content, dotted bottom divider, Barlow Condensed Section-H2-scale heading applied directly to the heading element, not just inherited from the parent, since the browser's UA stylesheet sets explicit font-size/weight on h1–h6 that would otherwise override an inherited value from the section wrapper).

Files modified:

frontend/app/page.tsx — rewritten to render `<Header />` plus five section placeholders in the locked order (hero, music, practice, visuals, booking), each containing only its section name. hero uses `<h1>` (the page's one semantic H1, satisfying the accessibility rule now rather than deferring it); music/practice/visuals/booking use `<h2>`. Each section carries its real id so the header's anchor links are already testable.

frontend/app/globals.css — added a global .container utility class (max-width: var(--content-max-width); margin-inline: auto; padding-inline: var(--gutter)) implementing the locked max-width/gutter system as a reusable primitive for the header and every future section. No new colors or typography rules were introduced; only the already-locked Phase 2 tokens were referenced.

Files deleted:

frontend/app/style-check/page.tsx and page.module.css (and the now-empty style-check/ directory) — the temporary Phase 2 verification route, removed per its own on-page notice. Nothing else referenced it.

Build cache note: the first post-deletion build failed with a stale TypeScript error (TS2307, "Cannot find module '../../../app/style-check/page.js'") coming from a generated route-type file in .next/dev/types/ left over from when the route still existed. This was not a real code defect — clearing frontend/.next and rebuilding resolved it immediately.

Mobile overflow bug found and fixed: the first mobile screenshot (375px width) showed the "book artist" pill CTA clipped off the right edge of the viewport, and a second attempt showed the nav links themselves ("visuals"/"booking") clipped. Root cause: nested flex containers (.inner > .nav > .navList) default to sizing themselves by their own content's minimum width even when an ancestor has flex-wrap set, so flex-wrap alone doesn't reliably trigger without the wrapping container itself being width-constrained. Fix: at the <768px breakpoint, .nav switches to flex-direction: column with width: 100%, and .navList gets flex-wrap: wrap plus width: 100%, so both are constrained to the actual available width and wrap correctly — links row on top, pill CTA on its own line below, both fully visible with no clipping. Reverified via a third mobile screenshot after the fix.

Tests/checks run:

npm run lint — passed clean (run after initial implementation and again after the mobile-overflow CSS fix).

npm run build — failed once (stale .next cache, see above), then passed clean twice after clearing the cache and after the mobile fix; only expected routes (/, /_not-found) are generated — /style-check is gone.

npm run dev + curl http://localhost:3000/ — HTTP 200. Grepped the returned HTML directly: all five section ids (hero, music, practice, visuals, booking) present; all anchor hrefs present and correctly targeted (#hero, #music, #practice, #visuals, #booking, plus a second #booking for the CTA).

Three rounds of headless-Chrome screenshots (desktop 1440×900, mobile 375×800 ×2 before/after the fix) — viewed directly to check for overflow and compare against references/screenshots/hero-default.png.

Visually checked against references/screenshots/hero-default.png:

Desktop (1440px): cream canvas tone matches; header height/proportion reads close to the reference's compact header band; horizontal gutters look consistent with the reference's left/right margins; TEMIKAZE wordmark renders in the same bold condensed uppercase treatment as the reference logo, appropriately smaller than the Hero-scale wordmark; nav link spacing (music / practice / visuals / booking) closely mirrors the reference's lowercase "audio writing visual" nav rhythm; the dotted divider beneath the header matches the reference's dotted rule; the "book artist" pill matches the reference's outlined-pill shape and density. No horizontal overflow.

Mobile (375px): after the fix, wordmark sits top-left, nav links wrap to their own full-width row, and the CTA pill sits cleanly below on its own row — no clipping, no horizontal overflow, no invented hamburger menu (four short lowercase words plus one pill did not require one).

Mismatch remaining: none from this phase's own scope. The one previously-documented, already-accepted gap carries forward unchanged: Barlow Condensed 900's letterforms remain visually rounder/more open than Druk's more geometric shapes (see Phase 2 log and the "Display font tuning" decision) — this is a font-family-level difference, not something Phase 4's layout work could or should address.

Anything not verified: real mouse-hover/keyboard-tab interaction was not exercised live (no interactive browser session, only static screenshots and HTML/CSS inspection) — the :focus-visible outline and pill hover-invert are the same CSS mechanism already visually verified working in Phase 2, but weren't re-screenshotted mid-interaction this phase. Sticky behavior while actively scrolling was not captured as a scroll-in-progress screenshot; position: sticky is a well-established native CSS behavior and the header markup/CSS were reviewed for correctness, but a live scroll-and-observe check wasn't performed.

Phase 5 log — Hero (2026-08-14)

Status: Complete.

Files created:

frontend/app/components/Hero.tsx — the Hero section: a full-width identity band (TEMIKAZE h1 wordmark + supporting tagline/location) stacked above a full-width image band, with two dark floating status card links, per the corrected Hero structure in MASTER_SPEC.md Section 10 (not the old 42/58 column layout).

frontend/app/components/Hero.module.css — all Hero styling: identity band layout, image crop/zoom treatment, sticky floating card stack, card interaction states, initial-reveal keyframe, and reduced-motion overrides.

frontend/public/images/temikaze-hero.png — a byte-for-byte copy (verified via matching md5 hashes) of assets-source/photos/temikaze-hero.png, placed where next/image can serve it. The source file in assets-source/ was not modified, moved, or re-encoded.

Files modified:

frontend/app/page.tsx — the Hero placeholder `<section>` replaced with `<Hero />`. Music/Practice/Visuals/Booking placeholders were left untouched, still Phase 4's minimal `<h2>` sections.

Source asset finding: the source photo (assets-source/photos/temikaze-hero.png) is 1257×1277px — nearly square, not landscape, so the landscape band comes entirely from a CSS crop. More significantly, the file has carousel UI chrome baked into the pixels (left/right arrow icons, pagination dots), consistent with being a raw screenshot export of an Instagram carousel post rather than a clean photo export. A plain object-fit: cover landscape crop would still show both arrow icons at the edges, since that crop only trims top/bottom on a near-square source, not sides. Applied transform: scale(1.15) on the image inside an overflow: hidden wrapper to crop the artifacts out of the visible frame while keeping the subject (matches CONTENT_INVENTORY.md's documented "outdoor portrait near The Leadmill" category — the venue signage is legible in the shot) in frame; object-position: center 30% biases the crop toward the upper-body/head area. This is a display-time CSS crop only — the source file is untouched. Recommend replacing this asset with a clean (non-carousel-screenshot) export before production.

Content used (all from the explicit content given this phase, nothing invented): wordmark "Temikaze", tagline "House / Afro House DJ + Producer", location "Nairobi, Kenya". Status cards: Latest Release → "Nia" (href="#music"), Latest Mix → "Mum's Garage Radio" (href="#music"). No Next Event card — none is sufficiently verified, and none was fabricated. No streaming URLs were invented; cards link to #music only, per instruction.

Status card treatment: --card-dark background, --card-border outline, small corner radius (10px — a concrete value chosen and visually tuned this phase, resolving the "exact radius deferred to Phase 5" note from the Phase 2 log), white primary text (--foreground-light), the Eyebrow/Status Label typography role (Newsreader 400 italic) for "Latest Release"/"Latest Mix", Inter 600 for the card title. Status dots reuse two of the three already-locked tokens (--status-dot-red for Release, --status-dot-blue for Mix) — no new colors introduced, no broader color system created. Cards are real `<a>` elements (not clickable divs) since they have a real destination (#music).

Card interaction: horizontal translateX(10px) + arrow (→) reveal on both :hover and :focus-visible, no vertical lift. Cards float over the image via position: sticky (not absolute) inside the image band, so they visually sit over the image's upper-left and remain pinned during the Hero's own scroll range, releasing naturally once the image band's box ends — before Music, per the locked "unpin before they overlap the next section" behaviour — achieved with plain CSS, no GSAP, no scroll library.

Motion: a restrained CSS @keyframes fade+rise reveal (opacity 0→1, translateY 12px→0, ~0.7s) on the identity band and image on load, staggered slightly. @media (prefers-reduced-motion: reduce) disables that animation entirely (content renders at its normal static state immediately, never stuck invisible) and removes the card translateX/arrow transitions, per MASTER_SPEC's "static cards, no translation requirement" wording — verified by screenshot with Chrome's --force-prefers-reduced-motion flag.

Extended mobile CSS investigation: the tagline "House / Afro House DJ + Producer" was clipped at the 375px breakpoint, cut off mid-word ("Produce|r") rather than wrapping — the signature of a box overflowing its container rather than a text-wrap failure. Several plausible fixes were tried and each was verified empirically (not assumed) against the actual compiled CSS bundle, the actual rendered HTML class attributes, and repeated screenshots: align-items: stretch on the flex-column identity band did not resolve it; neither did an explicit width: 100% on the tagline element alone. Adding a debug outline directly to the identity band's own box revealed that it — not the tagline — was the element failing to constrain: display: block does control how an element lays out its own children, but it does not change how that element itself is sized by ITS OWN parent flex container. .identity remained a flex item of .hero (which keeps display: flex; flex-direction: column at all breakpoints, with no mobile override), so its width kept following flexbox sizing rules regardless of its own display value. The real fix was adding an explicit width: 100% directly to .identity itself inside the mobile media query, alongside display: block. Verified clean afterward with no debug artifacts left in the CSS, confirmed desktop was unaffected (the fix is scoped inside @media (max-width: 767px)).

Tests/checks run:

npm run lint — passed clean (multiple times through the investigation, and on the final code).

npm run build — passed clean on the final code; only expected routes (/, /_not-found) generated.

npm run dev + curl http://localhost:3000/ — HTTP 200; grepped HTML directly for the wordmark, tagline, location, hero image path, both status card links, and their #music targets — all present.

Multiple rounds of headless-Chrome screenshots at desktop (1440px) and mobile (375px), including several debug-instrumented rounds specifically to isolate the mobile CSS bug described above, concluding with a clean final round at both widths showing no clipping or overflow.

Hover/focus interaction verified via a temporarily-added autoFocus prop on the first status card (reverted immediately after): screenshot confirmed the card shifts right and the arrow becomes visible, matching the locked interaction; compared against references/screenshots/hero-card-hover.png.

Reduced-motion fallback verified via Chrome's --force-prefers-reduced-motion flag: Hero renders fully and correctly, content is not stuck invisible, matching the default state.

Visually checked against references/screenshots/hero-default.png and hero-card-hover.png:

Desktop: identity-band proportions, wordmark scale/tracking (TEMIKAZE at hero scale reads as tight as the reference wordmark, consistent with the Phase 2 finding — no further tuning needed), tagline/location placement (upper-right, editorial serif, matching the reference's tagline position), image-band height/crop (the carousel-artifact cropping worked — no arrow icons visible in the rendered crop), floating-card placement (upper-left over the image), card size/radius, dotted/header relationship, whitespace/gutters, and overall density were all compared directly and found closely consistent with the reference.

Mobile: Hero adapts cleanly — wordmark scales down, tagline/location stack below it, image band remains full-width, cards stack vertically and remain fully legible with no overlap or collision, no horizontal overflow after the fix above.

Remaining known mismatches: (1) the already-accepted Barlow Condensed vs Druk letterform gap, unchanged from Phase 2/4. (2) The source hero photo is a carousel-screenshot export with baked-in UI chrome — successfully cropped out visually this phase, but a cleaner source export is recommended before production so the crop doesn't have to compensate for it. (3) The exact reason plain (non-!important) width constraints failed on a flex item that had itself been switched to display: block, while an explicit width directly on that same element (also non-!important) succeeded, was identified and understood by isolating the actual oversized element via debug outlines — not left as an unexplained !important workaround.

Phase 6 log — Music & Mixes (2026-08-14)

Status: Complete.

Files created:

frontend/app/components/musicData.ts — small typed local data array (id, title, type: "release"|"mix", artwork path) for the 4 known items. Kept separate from Music.tsx specifically so Phase 10's swap to real WordPress REST data only touches this one file.

frontend/app/components/Music.tsx — "use client" component (required for GSAP/DOM/matchMedia access). Renders the Music section: header row (heading + descriptor), a wrapper/track pair of divs holding one `<li data-card>` per item, and the GSAP setup in a useLayoutEffect.

frontend/app/components/Music.module.css — all Music styling: header row with top/bottom dotted framing, a CSS ruler/tick strip (repeating-linear-gradient), a circular vinyl-disc treatment (repeating-radial-gradient rings) with a circular artwork label clipped inside via next/image, active/inactive card states, native horizontal scroll-snap as the default/base behaviour, and a `[data-pinned]`-gated set of rules for the desktop pinned mode.

frontend/public/images/music/{nia,let-go,gone}.webp and mums-garage-radio.jpg — byte-for-byte copies (verified via matching md5 hashes) of the 4 files in assets-source/artwork/. The source files were not modified, moved, or re-encoded.

Files modified:

frontend/app/page.tsx — the Music placeholder `<section>` replaced with `<Music />`. Practice/Visuals/Booking placeholders untouched, still Phase 4's minimal `<h2>` sections.

frontend/app/globals.css — two small global fixes, both discovered via this phase's own testing (see "Bugs found and fixed" below): a `section[id] { scroll-margin-top: var(--header-height); }` rule so anchor navigation to any section never lands with its heading hidden behind the sticky header, and a mobile-breakpoint override raising `--header-height` to 140px inside the existing `<768px` media query, since the header wraps into a taller multi-row layout at that width (this token is also read by Hero's sticky card offset and, at desktop widths only, by Music's own GSAP pin-start calculation — verified neither was affected by the mobile-only override).

frontend/package.json / package-lock.json — added `gsap` (already approved in MASTER_SPEC.md Section 3 and explicitly required by this phase's instructions; no other dependency added).

Content-accuracy finding (flagged before implementation, proceeded per explicit instruction): assets-source/artwork/nia.webp and let-go.webp are not two different covers — both are the same "PENDO EP" template artwork with "TRACK 2: LET GO" baked into the image text, just on different background colors (purple vs blue). No file anywhere in assets-source/artwork/ actually depicts "Nia". gone.webp and mums-garage-radio.jpg are correctly labelled. Per the task's explicit 1:1 filename→title mapping, nia.webp was wired to the "Nia" card as instructed, meaning the "Nia" card currently displays "Let Go" cover art. This needs a corrected source file before production; it is not something the frontend code can fix on its own.

Content used (all from the explicit content given this phase, nothing invented): 3 releases (Nia, Let Go, Gone) and 1 mix (Mum's Garage Radio), each with only title, type ("release"/"mix"), and artwork — no dates, genres, descriptions, or streaming URLs, none of which are verified in docs/CONTENT_INVENTORY.md for any of these 4 items. No CTA/"listen" button anywhere in the cards, and no "view all" link in the section header (would point to the not-yet-built /music archive) — both omitted per this phase's explicit instruction rather than built as dead controls.

Card architecture decision: the two reference screenshots (audio-initial.png, audio-active-item.png) show a circular vinyl-groove disc with artwork inset as a round label, not a square sleeve with a disc "protruding" from it (the phrasing in the original MASTER_SPEC Section 11 text, written before these screenshots were available). Per this phase's explicit instruction to trust the screenshots over that older phrasing, implemented: repeating-radial-gradient rings for the groove texture, a circular next/image-clipped artwork label in the center, applied identically to every item (active and inactive differ only by scale/opacity, not by a different composition) — this was the only composition actually evidenced by the screenshots, so it was used uniformly rather than inventing an unobserved second "sleeve" treatment for inactive items.

GSAP implementation approach: `gsap.matchMedia()` with two named conditions (`isDesktop: "(min-width: 1024px)"`, `reducedMotion: "(prefers-reduced-motion: reduce)"`). The pin/scrub tween is only created when `isDesktop && !reducedMotion`; otherwise the callback returns immediately and the section relies entirely on plain CSS (native `overflow-x: auto` + `scroll-snap-type: x mandatory` on the track) with zero GSAP involvement. This means tablet (768–1023px) gets the same native-scroll fallback as mobile, per MASTER_SPEC's own hedge against forcing desktop pinning where it "harms usability." Scroll distance is calculated as `track.scrollWidth - wrapper.clientWidth`, read live (not hard-coded) both at setup and inside the ScrollTrigger's `end` callback with `invalidateOnRefresh: true`, and `document.fonts.ready` triggers a `ScrollTrigger.refresh()` so a webfont swap after first paint can't leave a stale distance cached. Architecture note worth recording: rather than duplicating the `min-width: 1024px` breakpoint independently in CSS (which caused real bugs in Phase 4/5), the wrapper element gets a single `data-pinned="true"/"false"` attribute set only by the JS at the moment GSAP actually activates pinning; every pin-specific CSS rule (hidden overflow, disabled scroll-snap, active/inactive scale+opacity, the active-disc rotation) is scoped behind `[data-pinned="true"]` rather than a separate width media query, so there is exactly one source of truth for "is the pinned interaction currently running," not two that can drift out of sync.

Active-card detection: on every scrub `onUpdate` (and on `onRefresh`), the closest card to the wrapper's horizontal center is found via live `getBoundingClientRect()` comparison across all 4 cards, and every card's `data-active` attribute is explicitly set to "true"/"false" accordingly (see bug #1 below for why "explicitly set every card" rather than "only touch the previous/next pair" matters).

Cleanup strategy: the `gsap.matchMedia()` breakpoint callback returns its own cleanup function, which kills the ScrollTrigger and the tween and resets `data-pinned` to "false" — this runs automatically whenever the matched breakpoint stops matching (e.g. resizing from desktop to mobile) or when the whole matchMedia instance is reverted. The `useLayoutEffect`'s own cleanup calls `mm.revert()` unconditionally on unmount, which reverts every currently-matched breakpoint's animations and tears down the matchMedia listeners. No global GSAP usage outside this one component.

Bugs found and fixed via visual verification (all three found by actually looking at screenshots, not assumed correct from code review alone):

1. Double-active-card bug: the very first screenshot of the Music section showed two cards ("Nia" and "Let Go") both rendered at full opacity/scale simultaneously, instead of one. Root cause: the `setActiveCard` closure's `activeCard` variable started as `null` in JS memory, but the JSX's static server-rendered default (`data-active` = "true" on index 0, for the pre-hydration/reduced-motion/mobile render) meant the DOM's actual initial state didn't match that `null`. The old logic only cleared the *previous tracked* active card before setting a new one (`activeCard?.setAttribute(...)`), so on the very first update it set the new closest card active without ever clearing Nia's static default. Fixed by rewriting `setActiveCard` to explicitly write `data-active` on every card each time the closest one changes, rather than only touching a diff pair.

2. Track-centering bug: after fixing #1, a screenshot at the pin's start position showed "Let Go" (the second item) active, not "Nia" (the first) — meaning the first card could never be centered, since the track's leading space was only the regular `--gutter` value, nowhere near enough to bring the first card to the wrapper's horizontal center at zero scroll. Fixed by changing the track's `padding-inline` to `max(var(--gutter), calc(50% - 160px))`, which gives enough leading/trailing space for the first and last cards to each reach true center at the two ends of the scroll range — verified afterward: at the pin's start, "Nia" is correctly centered/active with nothing to its left. This also incidentally fixed an earlier concern that the calculated scroll distance felt too short for 4 items, since the added padding is itself part of `track.scrollWidth`.

3. Anchor-scroll header-clipping bug: navigating to `/#music` (the same action the header's "music" nav link performs) landed with the "MUSIC" heading partially or, after an overcorrection with `scroll-padding-top` on `html` (found not to be reliably honored for hash-fragment navigation and reverted), completely hidden behind or above the sticky header. Fixed with `scroll-margin-top: var(--header-height)` applied directly to `section[id]` (the more consistently-supported mechanism for this exact case), plus a mobile-specific `--header-height: 140px` override, since the header's real height at <768px (wordmark + wrapped nav + CTA rows) is significantly taller than the 70px desktop target the token otherwise holds. Verified at both breakpoints afterward with no clipping remaining.

Tests/checks run:

npm run lint — passed clean (multiple times through the investigation, and on the final code).

npm run build — passed clean on the final code, including full TypeScript checking of the GSAP/matchMedia code; only expected routes (/, /_not-found) generated.

npm run dev + curl http://localhost:3000/ — HTTP 200; grepped HTML directly for id="music", the Music heading, and all 4 item titles — all present.

Multiple rounds of headless-Chrome screenshots at desktop (1440px, via the #music anchor) and mobile (375px), including debug-instrumented rounds (a visible outline temporarily added to isolate exactly which element was oversized) specifically to isolate bugs #1–#3 above, concluding with clean final rounds at both widths.

Reduced-motion fallback verified via Chrome's --force-prefers-reduced-motion flag: all 4 cards render at equal, full opacity/scale (the dimming/active-state CSS never applies, since `data-pinned` is never set in that branch), and a native horizontal scrollbar is visible, confirming the section falls back to plain scrollable content rather than attempting to pin.

Visually checked against references/screenshots/audio-initial.png and audio-active-item.png:

Heading/descriptor row: "MUSIC" in the same oversized condensed treatment as other section headings, right-aligned serif descriptor ("Original releases and DJ mixes"), dotted rules above and below the row — matches the reference's AUDIO row structure.

Ruler/tick motif: present as a horizontal strip of evenly-spaced ticks at the disc's vertical center, matching the reference's ruler treatment — confirms the "only if clearly supported by reference analysis" condition from MASTER_SPEC Section 11 was correctly satisfied.

Vinyl/artwork composition: circular grooved disc with the release/mix artwork inset as a round label — closely matches the reference's disc treatment for the active item; confirmed working for all 4 items, not just one.

Active/inactive relationship: centered item at full scale/opacity/contrast, flanking items visibly de-emphasized (opacity 0.35, scale 0.8 — tuned by eye against the reference rather than reused from Gallery's 0.75/0.4 values, per this phase's explicit instruction) but still legible enough to establish horizontal progression — matches the reference's active/inactive contrast.

Pin-start state: directly confirmed via screenshot — "Nia" (the first item) is correctly centered and active with nothing visible to its left, matching the expected entry state of a pinned horizontal carousel.

What could not be verified: live mid-scroll and gesture-based forward/backward scrolling could not be captured with the tools available in this sandbox. Two different techniques were attempted — a delayed JS `scrollTo()` inside an iframe test harness, and the same approach combined with Chrome's `--virtual-time-budget` flag to advance the page's timers before capture — and both produced the page's initial unscrolled state rather than the intended scrolled position; headless Chrome's `--screenshot` flag does not reliably wait for asynchronous script-driven scrolling regardless of technique tried. Rather than continue spending effort on tooling workarounds, verification for the mid/end of the scroll range and for backward-scroll behaviour rests on: (a) direct confirmation that the pin-start state and the active-card detection algorithm are both correct (including finding and fixing a real bug in the latter), and (b) the fact that GSAP's `scrub` mode ties the track's `x` position deterministically and reversibly to the scroll offset via a continuous function, not a stateful step-by-step trigger — there is no separate code path for "scrolling backward" that could diverge from "scrolling forward" once the position-to-transform mapping itself is verified correct, which it is (the distance calculation and centering math were both directly confirmed via the fixes above).

Known cross-section issue (not fixed, out of this phase's scope): at the exact scroll position where Music's heading first becomes visible, a fragment of Hero's sticky "Latest Mix" status card is still visible overlapping the top of the Music section, at both mobile and desktop widths. This is rooted in Hero's own sticky-positioning boundary (Phase 5's `.cardStack`/`.imageBand`), not in anything in Music's files, and fixing it would mean modifying Hero.module.css — explicitly out of scope for this phase's "do not redesign other sections while visually tuning Music" instruction. Flagged here for a future phase or polish pass rather than fixed silently or left undocumented.

Next approved phase (superseded — see Phase 6 log below): Phase 6 was approved and completed 2026-08-14.

Phase 6 manual browser verification — FAILED (2026-08-21)

Status: Phase 6 reopened. Not complete. Uncommitted.

The Phase 6 log above (2026-08-14) directly verified the pin-start state and the active-card detection algorithm by screenshot, but explicitly disclosed that live mid-scroll and backward-scroll behavior could not be captured with the headless-Chrome screenshot tooling available in this sandbox, and rested verification of that behavior on code-level reasoning about GSAP's scrub mechanism (a continuous, deterministic position-to-transform mapping) rather than on direct observation. The user has since manually tested the current implementation in a real browser, and that manual test failed.

Observed failures, as reported by the user:

Scrolling from Nia toward Let Go sometimes works initially and then becomes stuck.

Horizontal progression sometimes stops after the first item.

Scrolling upward does not reliably reverse the horizontal track toward earlier items.

Conclusion: the core pinned horizontal interaction is broken. The prior reasoning that GSAP's scrub mode should be inherently reversible was not sufficient verification on its own — actual browser behavior takes precedence over that code-level reasoning. Phase 6 is reopened and remains incomplete. Nothing from the original Phase 6 log's scroll-mechanics claims should be treated as verified until the underlying bug is diagnosed, fixed, and reverified by actual manual browser testing, not screenshot evidence alone.

Visual mismatch (defer fix until after scroll mechanics are repaired):

Manual comparison against the Radical Face AUDIO reference shows the ruler/tick axis in the Temikaze implementation is positioned too high — it currently cuts through the vinyl disc area. In the reference, the ruler/tick axis sits substantially lower, around the title/year region of the active item. This is a visual tuning fix, not a mechanics fix, and is explicitly deferred until the scroll bug above is resolved.

Reference audio behaviour newly confirmed (open specification question, not yet actioned):

Further video analysis of the Radical Face AUDIO section shows the reference has an explicit "enable audio" control; playback begins only after that user opt-in; whichever album/mix is centered/active determines the audible snippet; moving between items changes/crossfades the audio; and the active vinyl's rotation is tied to that actual audio playback, not decoration alone. The current Temikaze implementation has no audio because Phase 6's original instructions explicitly excluded it this phase. This is recorded as an open Phase 6 specification question/change to address only after the scroll bug is repaired. Audio must not be implemented yet, and this note is not an approval to add it.

Existing known issues (carried forward, unchanged):

assets-source/artwork/nia.webp still appears incorrect — it duplicates the let-go.webp "PENDO EP" artwork rather than depicting "Nia" (see Phase 6 log and "Known content/asset gaps" below).

The Hero sticky-card fragment overlapping the Hero → Music transition, documented in the Phase 6 log above, is still unfixed and still out of scope for this repair.

Phase 6 changes remain uncommitted: frontend/app/globals.css, frontend/app/page.tsx, frontend/package.json, frontend/package-lock.json modified; frontend/app/components/Music.tsx, Music.module.css, musicData.ts and frontend/public/images/music/ untracked.

Superseded (2026-08-25): the sentence above was accurate on 2026-08-21 and is left as written. All Phase 5 and Phase 6 work was subsequently committed as 3887173 and pushed; master is in sync with origin/master. See "Repository housekeeping — macOS to Windows migration" below.

Phase 6 repair log (2026-08-21)

Status: repair complete. Superseded by "Phase 6 accepted state" below.

Diagnosis (code-review only, no changes): traced the ScrollTrigger architecture in detail and ranked candidate root causes for the reported forward-stuck/no-reverse behaviour. Highest-confidence finding: an uncancelled `document.fonts.ready.then(() => ScrollTrigger.refresh())` call (registered fresh on every effect run, doubled under React Strict Mode since `reactStrictMode` is unset in next.config.ts, which Next.js's App Router treats as enabled by default) could fire a global refresh mid-pin, desyncing trigger progress from actual scroll position. Second finding: `setActiveCard` used `getBoundingClientRect()` on cards whose own CSS transform was itself driven by that same active state, creating a feedback loop. Diagnosis was verified by adding temporary console/marker instrumentation (instance IDs, refresh-event logging, throttled progress logs) and observing real browser output before any fix was written; instrumentation was fully removed afterward (verified via grep — no TEMP DIAG/console.log/markers remain).

Mechanics rewrite: removed the `document.fonts.ready` refresh call entirely (unnecessary here — no dimension in Music.tsx is font-metric-dependent, only viewport-relative or fixed). Replaced `getBoundingClientRect()`-based active-card detection with a deterministic calculation driven by scroll progress and, later, by each card's stable `offsetLeft`-based center (never affected by the card's own transform, so no feedback loop). Added `anticipatePin: 1` and tuned `scrub` from `1` to `0.5`. Added `SCROLL_PACE_MULTIPLIER` (1.6) applied to the real measured track distance, after manual testing showed a strict 1:1 scroll-to-travel mapping consumed the whole pin range in one ordinary scroll gesture.

Header composition fix: the pinned element was originally just the record-stage wrapper, so the "MUSIC" heading/descriptor (outside that element) scrolled out of view before pinning engaged, leaving a blank gap. Fixed by introducing a `pinStage` wrapper containing both the header row and the record stage, and pointing GSAP's `trigger`/`pin` at `pinStage` instead — the header now rides along as part of the pinned composition. No change to mobile/tablet, which never runs this code path.

Entrance/exit choreography: the original distance calculation only spanned "first card centered" to "last card centered." Added a geometry-derived "edge roll" (`wrapper.clientWidth / 2`, not an arbitrary constant) to both ends via `gsap.fromTo`, so Nia now visibly travels in from the entering edge when the section pins, and Mum's Garage Radio visibly travels out past the exiting edge before the section releases — reversible in both directions since it's a pure function of scroll progress.

Composition/typography scale-up: desktop-only (`@media (min-width: 1024px)`, matching the JS pin breakpoint) increase to `--music-card-width`, `.track` gap, and `.title` font-size/max-width, so the active release dominates the viewport more the way the Radical Face reference does. Card-width/gap changes required no changes to the distance math, since `getEdgeRoll`/`getCenterDistance`/`getTotalDistance` all read live DOM measurements rather than referencing any card dimension directly. Disc size and mobile/tablet geometry were deliberately left unchanged.

Active/inactive emphasis model — two iterations: the first continuous model used a single quadratic falloff across the entire card-to-card spacing, which put both cards at a mediocre ~0.62 scale / ~0.36 opacity exactly halfway between two centers (a visible "valley," confirmed by direct code-review Q&A before any fix). Replaced with a two-state model (`CARD_MUTED_SCALE` 0.7 / `CARD_MUTED_OPACITY` 0.35 vs `CARD_ACTIVE_SCALE`/`CARD_ACTIVE_OPACITY` both 1) that stays flat at one of the two states across most of a card's territory and only transitions through a narrow band (`CARD_HANDOFF_FRACTION` 0.22 of the card-to-card spacing) around the crossover point, smoothstep-eased. At the same exact-midpoint case, both cards now compute to scale 0.85 / opacity 0.675 — both still substantial, and only for a brief part of the journey rather than the whole distance. Vinyl rotation was not touched — it is still driven by the same discrete "closest card" marker as before, so only the genuinely active record spins.

Ruler: rebuilt from a single CSS `repeating-linear-gradient` (unable to be animated per-tick) into individually-styled DOM tick elements, driven by the same scroll progress already powering the active-card logic, with a graduated multi-tick falloff (studied from paused frames of references/LandingPage-Desktop.mov) rather than a single isolated tick or a full-width wave. Repositioned to the title/year row instead of cutting through the vinyl disc, matching audio-active-item.png. Accepted as close-but-not-exact — see deferred polish below.

What was and wasn't verified directly: lint and build were run clean after every round. Static geometry (card sizes, ruler position, entrance-state composition, mobile/reduced-motion fallback) was repeatedly confirmed via headless-Chrome screenshots at the #music anchor. The live pinned scroll interaction itself — forward progression, reverse progression, and the entrance/exit choreography in motion — could not be simulated by any tooling available in this sandbox (documented, repeated limitation across every phase of this project); it was verified exclusively through the user's own manual browser testing, which is what ultimately confirmed the repair and is recorded in "Phase 6 accepted state" below.

Phase 6 accepted state (2026-08-21)

Working and accepted, confirmed by manual browser testing of the core desktop interaction:

Desktop pinned vertical-to-horizontal scroll.

Forward and reverse scrolling.

First-record entrance and final-record exit choreography.

Pinned Music header composition (heading, descriptor, divider stay part of the pinned composition).

Active/inactive release states (two-state muted/active model with a narrow crossover handoff).

Large editorial active-release composition (card width/gap/title scale matched against the reference).

Rotating active vinyl.

Scroll-linked animated ruler.

Mobile native horizontal-scroll fallback (unmodified throughout every repair round).

Reduced-motion fallback (unmodified throughout every repair round).

Deferred Phase 6 polish

Recorded as deferred, not blockers to Phase 7:

1. Active/inactive handoff timing — current handoff (CARD_HANDOFF_FRACTION = 0.22) is acceptable. Later polish should make the transition between releases slightly faster/sharper to more closely match the Radical Face reference.

2. Ruler animation — current implementation is accepted. It is not an exact replica of the reference's tick-emphasis profile (the reference's own falloff read as asymmetric/direction-trailing on close inspection of paused video frames; the implementation uses a symmetric falloff instead, deliberately, so reverse scroll is guaranteed to mirror forward scroll). Optional later polish only.

3. Exact visual calibration — final spacing/scale/typography comparison against the Radical Face AUDIO section can happen during the final homepage polish pass.

Deferred asset/content work

1. Nia artwork — the currently supplied `nia.webp` appears incorrect: it and `let-go.webp` are the same "PENDO EP" template artwork (with "TRACK 2: LET GO" baked into the image text) on different background colors, not two distinct covers. The live "Nia" card currently shows this mismatched artwork, per Phase 6's explicit filename→title mapping instruction. Replace when the correct source asset is available. Do not fabricate replacement artwork.

2. Audio interaction — reference behaviour has been confirmed (via video analysis): an explicit "enable audio" control, playback beginning only after that opt-in, the active/centered release determining the audible snippet, crossfade as the active release changes, and vinyl rotation tied to actual playback. Temikaze audio assets have not yet been supplied. Implementation is deferred until appropriate audio files are available. Not implemented this phase.

These deferred items do not block proceeding to Phase 7.

Known content/asset gaps

Booking email is not yet confirmed.

A future event after 2026-08-13 is not currently documented.

Some high-resolution release/mix artwork may still need collecting.

Additional performance photography would strengthen the gallery.

Final DJ / Producer / Curator copy needs to be approved.

Exact production URLs for all social/streaming destinations should be verified.

The hero photo (assets-source/photos/temikaze-hero.png) is a raw Instagram-carousel screenshot export with baked-in UI chrome (arrow icons, pagination dots), not a clean photo export. It's usable as-is (the Phase 5 CSS crop hides the chrome), but a clean re-export would remove the need for that compensating crop.

assets-source/artwork/nia.webp does not depict "Nia" — it and let-go.webp are the same "PENDO EP" template artwork (with "TRACK 2: LET GO" baked into the image text) on different background colors. The live Music section's "Nia" card currently shows this mismatched Let Go artwork, per this phase's explicit filename→title mapping instruction. Needs a corrected nia.webp before production.

Known technical verification tasks

Phase 2 (complete — see Phase 2 log above)

Verified current reference-derived HEX values visually before locking CSS tokens (Phase 2 style-check route, screenshots reviewed against references/screenshots/).

Confirmed Barlow Condensed 900 is loaded via next/font, not League Gothic 900.

Phase 3 (complete — see Phase 3 log above)

Confirmed all 5 CPTs use show_in_rest: true (verified via REST — all 5 endpoints return 200).

Confirmed all frontend-facing custom fields/meta are exposed through REST (verified in REST JSON output for populated and empty fields alike, across artist_profile, releases, mixes, events).

Confirmed all 5 CPTs support custom-fields.

Phase 4 (complete — see Phase 4 log above)

Confirmed the temporary /style-check route (Phase 2) was deleted.

Confirmed no horizontal overflow at desktop (1440px) or mobile (375px) — a mobile overflow bug was found and fixed during this phase (see Phase 4 log).

Phase 5 (complete — see Phase 5 log above)

Confirmed the Hero card corner radius (deferred from Phase 2) is now set: 10px, visually tuned this phase.

Confirmed no horizontal overflow at desktop (1440px) or mobile (375px) — a mobile overflow bug was found, fully root-caused, and fixed during this phase (see Phase 5 log).

Confirmed hover/focus card interaction and the reduced-motion fallback both work as specified.

Phase 6 (complete — see Phase 6 log above)

Confirmed releases and mixes populate from local data with one shared card grammar, no color-coding.

Confirmed desktop pin/scrub distance is calculated live from track dimensions, not hard-coded (verified via code review of the distance-calculation logic plus direct confirmation of the pin-start state).

Confirmed mobile/tablet use native horizontal scroll-snap with no pinning attempted, and reduced-motion gets the same native fallback regardless of viewport width.

Confirmed no horizontal overflow at desktop (1440px) or mobile (375px).

Three real bugs found and fixed via visual verification this phase (double-active-card state, track-centering math, anchor-scroll header clipping) — see Phase 6 log for root causes.

Superseded (2026-08-21): manual browser verification found the core pinned/scrub interaction itself unreliable — forward scroll sometimes sticks after the first item, and backward scroll does not reliably reverse the track. This was not caught by the verification methods above (screenshot evidence plus code-level reasoning about GSAP's scrub mechanism), which is no longer treated as sufficient. See "Phase 6 manual browser verification — FAILED" above.

Superseded again (2026-08-21): repaired across several rounds (see "Phase 6 repair log") and reverified by manual browser testing, which confirmed the core desktop interaction — forward/reverse scroll, entrance/exit choreography, pinned header, active/inactive states, ruler — now works. See "Phase 6 accepted state." Remaining polish items are recorded as deferred, non-blocking (see "Deferred Phase 6 polish" and "Deferred asset/content work").

Repository housekeeping — macOS to Windows migration (2026-08-25)

Status: complete. Documentation-only. No frontend implementation file was changed.

Development moved from the original macOS machine to a Windows machine. This pass reconciled the checked-out repository with the accepted project state. Nothing in the implementation was altered — only documentation, plus reverting three unintentional tooling changes.

Commit and push state (corrects the stale "Phase 6 changes remain uncommitted" note in the FAILED section above):

Phase 5 and Phase 6 work was committed as 3887173 "work on audio section" (2026-08-25), which also committed the Phase 6 FAILED, repair, and accepted-state records into this file.

Branch master is in sync with origin/master (https://github.com/Wakarende/Temikaze.git) at 3887173 — verified, HEAD and origin/master resolve to the same commit. This also settles the previously open "Confirm remote push status" item in "Repository checks still required before coding" above.

Tooling changes reverted (git restore; no dependency was added, removed, or upgraded):

frontend/package.json — the TypeScript specifier had been rewritten from "^5" to "5.9.3". Restored to "^5". The TypeScript already installed in node_modules is 5.9.3, which satisfies "^5", so nothing needed reinstalling.

frontend/package-lock.json — the matching specifier change, plus an added "license": "Apache-2.0" field on the typescript entry. Restored.

frontend/tsconfig.json — formatting only (arrays expanded to multi-line by an editor formatter). Restored.

None of these were project decisions; they were side effects of setting the project up on Windows. Worth watching: Next.js pins an exact TypeScript version when it auto-installs TypeScript, so the package.json specifier may be rewritten again if node_modules is ever cleared.

Local environment on the Windows machine:

Node is v22.21.1, npm 10.8.2. This retires the Phase 1 EBADENGINE warning (eslint-visitor-keys@5.0.1 requesting Node ^20.19.0 || ^22.13.0 || >=24 against the old machine's Node v20.11.1). It is no longer an active local-development issue. Node version for CI/deployment should still be set deliberately at Phase 14, but not because of this warning.

npm run lint passes clean on this machine.

WordPress: a Studio site exists at C:\Users\joyki\Studio\temikaze-cms and is running on http://localhost:8881. The temikaze-cms plugin is present as a native Windows directory junction pointing at wordpress/temikaze-cms in this repo, and is activated.

All five REST endpoints (/wp-json/wp/v2/artist_profile, /releases, /mixes, /events, /gallery) return HTTP 200 — so the plugin registers correctly on this machine — but every one returns an empty array. The Phase 3 sample records (artist_profile #5 "Temikaze", releases #6 "Nia", mixes #7 "Mum's Garage Radio") do not exist in this installation's database, and wp-content/uploads contains no files.

Re-seeding is deliberately deferred to Phase 10. The frontend still uses static local data (frontend/app/components/musicData.ts, plus hard-coded Hero content) and does not read from WordPress at all, so the empty CMS blocks nothing between here and Phase 10. Phase 10 will need the sample content recreated before it can wire real REST data.

Reference videos are not present on this machine:

references/ contains only the six PNG screenshots. No .mov files exist anywhere in the working tree. The reference recordings are git-ignored (references/*.mov in the root .gitignore) and were local-only to the original macOS machine.

This matters because some accepted work cites them as its evidence: the Phase 6 repair log's ruler falloff analysis, the tick-geometry comment in Music.tsx citing references/LandingPage-Desktop.mov at roughly t=32-46s, and the 2026-08-13 decision deferring Music card proportions "to be verified against both the reference video analysis and the screenshots."

Nothing already accepted needs re-verification because of this. But future work that would need to re-check motion timing or falloff against the video — including the deferred ruler polish — cannot be evidenced on this machine until the recordings are restored.

Documentation corrected in this pass:

docs/MASTER_SPEC.md Section 11 — the "square 1:1 artwork sleeve / protruding vinyl-disc treatment for active item" card architecture, which contradicted both the accepted implementation and the screenshot evidence, was replaced with the circular vinyl-disc composition. Scoped to that block only; the rest of Section 11, and the rest of the spec, are untouched.

docs/DECISIONS.md — seven Phase 5/6 implementation decisions that until now existed only in this file were transferred into the decision log under the dates they were actually made (2026-08-14 and 2026-08-21), with a preamble noting the retroactive recording. Purely additive; no existing entry was rewritten.

Not addressed in this pass, by instruction: WordPress sample content, audio implementation, the Nia artwork, Hero source-asset quality, the Hero to Music sticky-card overlap, and Phase 7 itself.

Next action

Phase 6 is accepted, committed (3887173), and pushed; master and origin/master are in sync.

Phase 7 — Practice — is next. It must not begin without explicit approval, per the working method in CLAUDE.md.

Not blocking Phase 7: deferred Phase 6 polish (handoff timing, ruler falloff, final visual calibration), deferred asset/content work (Nia artwork, audio), the Hero to Music sticky-card overlap, and the empty WordPress installation on this machine (deferred to Phase 10).

Uncommitted as of this entry: the documentation changes from the 2026-08-25 housekeeping pass (this file, docs/DECISIONS.md, docs/MASTER_SPEC.md). No frontend implementation file is modified.
