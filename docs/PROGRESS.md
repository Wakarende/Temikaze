Temikaze Website — Progress

Last updated: 2026-08-13

Current state

Implementation status: Phase 3 complete.

Current approved phase: Phase 3 done → next is Phase 4 (not yet approved to begin).

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

Phase 3 — WordPress Content Types & Sample Data — Complete (2026-08-13)

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

Phase 3 (complete — see Phase 3 log above)

Confirmed all 5 CPTs use show_in_rest: true (verified via REST — all 5 endpoints return 200).

Confirmed all frontend-facing custom fields/meta are exposed through REST (verified in REST JSON output for populated and empty fields alike, across artist_profile, releases, mixes, events).

Confirmed all 5 CPTs support custom-fields.

Next action

Phase 3 is complete. Begin Phase 4 — Global Static Layout & Navigation — only after explicit approval, per the working method in CLAUDE.md. Note: the temporary /style-check route from Phase 2 still needs to be deleted as part of Phase 4 per its own on-page notice.
