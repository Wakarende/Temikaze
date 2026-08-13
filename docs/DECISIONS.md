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