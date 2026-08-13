Temikaze Website — Decision Log

This file records meaningful decisions that are already made.
Do not rewrite old decisions after the fact. Add new dated entries when decisions change.

2026-08-13 — Homepage architecture locked

Homepage v1 contains:

Hero

Music & Mixes

Practice

Stage & Visuals

Booking / Contact

A separate /music archive is future scope.

2026-08-13 — Reference site is the visual system

The Radical Face reference design is being adapted/reskinned.

Do not create a separate Temikaze-specific visual identity for v1.

Temikaze differentiation comes from:

content,

photography,

music,

copy,

event data,

information architecture.

2026-08-13 — Free font substitutes

Reference roles:

Druk

Suisse Int’l

Times Now

Production substitutes:

Druk → Barlow Condensed 900

Suisse Int’l → Inter

Times Now → Newsreader

Do not use League Gothic 900.

No fourth mono font unless later reference verification requires one.

2026-08-13 — Color direction

Use the reference-derived cream / near-black / monochrome interaction system.

The three colored dots are limited to hero status markers.

No invented release-vs-mix color system.

Exact working tokens are documented in MASTER_SPEC.md and must be visually verified during Phase 2.

2026-08-13 — CMS architecture

Use headless WordPress with the standard WordPress REST API.

Content types:

artist_profile

releases

mixes

events

gallery

Do not create a custom API namespace unless a real technical need appears.

Custom fields required by the frontend must be explicitly exposed through REST.

2026-08-13 — Music behaviour

Desktop:

pinned horizontal scroll interaction inspired by the reference Audio section.

Mobile:

native horizontal scroll + scroll snap.

no aggressive scroll hijacking.

Audio:

no autoplay.

listening requires explicit user action.

2026-08-13 — Music card language

Releases and mixes share the same reference-derived square artwork/card grammar.

Do not introduce a cassette motif.

Distinguish content types through metadata/copy/artwork, not a new palette.

2026-08-13 — Practice section

Practice replaces the reference Written section.

It contains only:

DJ

Producer

Curator / TG & fRenz

No blog or fabricated editorial content.

2026-08-13 — Content integrity

Never fabricate:

gigs,

awards,

reviews,

testimonials,

release information,

audience numbers,

press,

next-event data.

If no future event exists, the Hero must not show a past event as “Next Event.”

2026-08-13 — Build control

Implementation is phase-based.

Claude Code works on one approved phase at a time and stops after verification.

The repo documentation is the source of truth, not Claude's conversation memory.

2026-08-13 — Phase 2 visual audit findings locked

references/screenshots/ (six PNGs of the Radical Face reference) were directly inspected before Phase 2 implementation began.

The following ten entries record the decisions made from that audit. Each updates MASTER_SPEC.md unless noted otherwise.

2026-08-13 — Button/pill/link casing corrected to lowercase

Phase 2 visual audit showed reference buttons, pills, and small action links ("artist bio", "enable audio", "view album", "view all", "read more", "prev", "next") are lowercase, not uppercase.

The Button typography token in MASTER_SPEC.md Section 5 is changed from Uppercase to lowercase/normal casing.

This supersedes the original Button case value recorded in MASTER_SPEC.md before this date.

2026-08-13 — New Eyebrow / Status Label typography role

Phase 2 visual audit showed dot-prefixed category/status labels (e.g. "Latest Release", "Latest Blog") use italic serif (Newsreader 400 italic), sentence/lowercase case — not the existing Inter/uppercase Metadata role.

A new Eyebrow / Status Label typography role is added to MASTER_SPEC.md Section 5, and referenced from the Hero card spec in Section 10.

Ordinary dates and technical metadata are unaffected and remain the Inter Metadata role.

2026-08-13 — Hero desktop structure corrected

Phase 2 visual audit showed the reference desktop Hero is not a 42% / 58% side-by-side column split.

Corrected structure: full-width identity/text band (wordmark + tagline) near the top, full-width landscape performance image underneath, dark status cards floating over the image's upper-left, header above the whole composition.

MASTER_SPEC.md Section 10 is updated accordingly. The prior two-column description was inaccurate and is replaced, not layered on top of. The image is not a right-hand column.

2026-08-13 — Hero card corner radius

Phase 2 visual audit showed the reference dark status cards use a small, subtle corner radius — not sharp corners, not a full pill.

MASTER_SPEC.md Section 10 now notes this qualitatively. No exact pixel value is locked; it will be visually tuned during Phase 5 Hero implementation.

2026-08-13 — Gallery Prev/Next control corrected to two pills

Phase 2 visual audit showed the reference Stage & Visuals gallery uses two separate, adjacent solid-black pill buttons (prev, next), not one combined control pill.

MASTER_SPEC.md Section 13 is updated accordingly.

2026-08-13 — Header audio-state control excluded

The reference site's header includes a persistent circular audio-state toggle icon.

Temikaze has no sitewide audio-control feature for this to represent.

MASTER_SPEC.md Section 10 now explicitly states this icon is not reproduced, functionally or decoratively, for Temikaze homepage v1. Do not add a decorative or nonfunctional replacement.

2026-08-13 — Display font tuning note

Barlow Condensed 900 remains the approved Druk substitute; no change to font family.

Phase 2 visual audit showed Barlow Condensed 900 is visually less extremely condensed than Druk.

MASTER_SPEC.md Section 5 now notes that final wordmark/section-heading letter-spacing and sizing must be visually tuned against reference screenshots during implementation.

2026-08-13 — Practice primary block center-aligned

Phase 2 visual audit showed the reference's featured Written block (left column) is center-aligned, not left-aligned.

MASTER_SPEC.md Section 12 now specifies the Practice DJ block (left side, desktop) is center-aligned. Producer and Curator blocks (right side) are unchanged.

2026-08-13 — Hero card hover interaction retained

The Phase 2 hover screenshot (hero-card-hover.png) did not capture a visibly changed hover state on the status cards — card position, size, and text were identical to the non-hover screenshot.

The existing translateX(10px) + arrow-reveal hover interaction in MASTER_SPEC.md Section 10 is retained as-is; no spec change.

This interaction remains supported by the previously documented reference landing-page motion analysis (see docs/PROGRESS.md — "Reference landing-page motion analysed"), not by the static hover screenshot alone.

2026-08-13 — Music card architecture retained pending Phase 6

Phase 2 visual audit could not confirm the inactive/idle square-sleeve state of music cards from the available screenshots — only the active vinyl-disc state was visible; neighboring inactive items showed faded text only, not a visible thumbnail.

The existing vinyl/sleeve card architecture in MASTER_SPEC.md Section 11 is retained unchanged; it is not revised on the basis of this screenshot ambiguity alone.

Exact visual proportions are deferred to Phase 6 implementation, to be verified against both the reference video analysis and the screenshots.
