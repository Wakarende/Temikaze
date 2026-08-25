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

2026-08-25 — Phase 5 and Phase 6 implementation decisions recorded retroactively

The seven entries below were decided during Phase 5 and Phase 6 implementation (2026-08-14 and 2026-08-21) and were logged in docs/PROGRESS.md at the time, but were never transferred into this decision log. They are recorded here now, during the macOS-to-Windows repository housekeeping pass, under the dates they were actually made — not under today's date.

Nothing here is a new decision. Each entry restates an already-accepted implementation choice that is live in the checked-out code.

2026-08-14 — Hero status card corner radius set to 10px

Resolves the "2026-08-13 — Hero card corner radius" deferral, which locked the radius qualitatively (small/subtle, not sharp, not a full pill) and deferred the exact value to Phase 5.

Phase 5 visually tuned it against references/screenshots/hero-default.png and settled on 10px.

Live in frontend/app/components/Hero.module.css.

2026-08-14 — Music card composition corrected to circular vinyl disc

Supersedes "2026-08-13 — Music card architecture retained pending Phase 6", which retained the square-sleeve wording specifically because the screenshots then available could not confirm the inactive/idle state.

references/screenshots/audio-initial.png and audio-active-item.png show a circular grooved disc with the artwork inset as a round label. They do not show a square 1:1 sleeve, and they do not show a disc "protruding" from a sleeve. That phrasing in MASTER_SPEC.md Section 11 predated these screenshots.

Accepted composition: repeating-radial-gradient groove rings forming a circular disc, with a circular artwork label clipped into the center.

This one composition is applied identically to every item. Active and inactive items differ only in scale, opacity, and rotation state — never in composition. No second, unobserved "sleeve" treatment was invented for inactive items.

Exact disc/label proportions remain subject to later visual polish.

MASTER_SPEC.md Section 11 was corrected to match on 2026-08-25.

2026-08-14 — Desktop Music pinning begins at 1024px; tablet and mobile use native horizontal scrolling

The GSAP pin/scrub tween is created only when (min-width: 1024px) matches AND prefers-reduced-motion does not.

Tablet (768–1023px) therefore gets the same native overflow-x + scroll-snap fallback as mobile, rather than inheriting desktop pinning. This follows MASTER_SPEC.md Section 8's own instruction not to preserve desktop pinning at tablet widths if it harms usability.

Reduced-motion gets the native fallback at every viewport width, desktop included.

The breakpoint is not duplicated in CSS. A single data-pinned attribute, set by the JS only at the moment GSAP actually activates pinning, gates every pin-specific CSS rule — so there is one source of truth for "is the pinned interaction running", not two that can drift.

2026-08-21 — Music active/inactive emphasis uses a two-state model

Supersedes the continuous quadratic falloff used in the original 2026-08-14 Phase 6 implementation, which put both cards at roughly 0.62 scale / 0.36 opacity at the exact midpoint between two centers — a long, faint valley with no substantial release on screen.

Accepted model: a card holds a stable muted state (scale 0.7, opacity 0.35) across most of its territory, and transitions to the active state (scale 1, opacity 1) only through a narrow smoothstep-eased band around the crossover point, sized at 0.22 of the spacing between adjacent card centers.

These values are specific to the Music section. They deliberately do not reuse the gallery's 0.75 scale / 0.4 opacity figures; those remain the Stage & Visuals values in MASTER_SPEC.md Section 13 and are unaffected.

Vinyl rotation is not part of this model — it stays driven by the discrete "closest card" marker, so only the genuinely active record spins.

Deferred, non-blocking: later polish may sharpen the handoff slightly to sit closer to the reference.

2026-08-21 — Music ruler positioned at the title/year row

The ruler/tick axis originally cut through the vinyl disc area. Manual comparison against the reference showed the axis sits substantially lower, around the title/year region of the active item, matching references/screenshots/audio-active-item.png.

The ruler was also rebuilt from a single CSS repeating-linear-gradient into individually-styled DOM tick elements, because per-tick emphasis cannot be animated out of a gradient.

2026-08-21 — Music ruler falloff accepted as symmetric; exact reference profile deferred

The reference's own tick-emphasis falloff read as asymmetric — a trailing tail behind the currently-passed position — on close inspection of paused video frames.

A symmetric falloff of the same width and character is used instead, deliberately, so reverse scroll is guaranteed to mirror forward scroll exactly. A genuinely direction-locked trail would require layering scroll-velocity tracking onto the pin/scrub trigger, and the footage alone is ambiguous as to whether the reference's shape is direction-locked or a fixed spatial pattern.

Accepted as-is. Matching the reference profile more exactly is optional later polish, not a blocker.

2026-08-21 — Music scroll pace uses a 1.6 multiplier over the measured track distance

Manual browser testing showed a strict 1:1 mapping between scroll distance and horizontal travel consumed the entire pin range in a single ordinary scroll gesture, skipping past the records rather than moving through them.

Accepted: a 1.6 multiplier applied to the real, measured track distance when computing the trigger's end.

The multiplier scales the measured distance; it does not replace it. The underlying distance is still read live from the DOM, never hard-coded to a pixel count, so the pacing stays correct if the track's content changes.

Also settled in the same repair: scrub tuned from 1 to 0.5, and anticipatePin: 1 added.

2026-08-25 — Practice does not reproduce the reference's sticky-left / scrolling-right interaction

Direct inspection of references/LandingPage-Desktop.mov (the WRITTEN section, roughly t=50-59 s) confirmed a behaviour not previously recorded in the spec: in the reference, the section header row and the entire left featured block hold position while the right-hand column scrolls independently beneath them. Two frames roughly seven seconds apart show the header and left block pixel-identical while the right column has advanced by two items. This is the reference section's signature interaction.

It is deliberately not reproduced in Temikaze's Practice section.

Reason: the reference's right column carries four or more entries, which gives the sticky range something to travel through. Practice has exactly two — Producer and Curator. With two items the right column is barely taller than the left block, so the interaction would have no meaningful range, and manufacturing range would mean inventing Temikaze content, which project rules forbid.

Practice is therefore a static editorial layout. No sticky section-header system was introduced either.

This can be reconsidered during final homepage polish if the Practice content grows enough to give the interaction real range. It is recorded here so a later reader does not mistake its absence for an oversight.

2026-08-25 — Practice featured role title is scaled above the Role H3 token

MASTER_SPEC.md Section 5 assigns "Item / Role H3" to Newsreader at clamp(1.5rem, 2.5vw, 2.2rem). Applied uniformly, that token would render DJ, Producer and Curator at identical size and flatten the reference's featured-versus-list hierarchy, in which the featured title reads at roughly 0.9x the section heading while the list titles sit well below it.

Accepted: the right-column role titles (Producer, Curator) use the Role H3 token unchanged. The left featured title (DJ) uses a component-local clamp(2.5rem, 5vw, 4.5rem).

This is a component-local size in Practice.module.css. No global typography token was added or changed. The precedent is Header.module.css, which already sets a component-local wordmark size rather than reusing --text-hero.

Known consequence, accepted for now: our featured-title-to-list-title ratio is roughly 0.49, against roughly 0.70 in the reference, because the Role H3 cap holds the list titles down. Closing that gap would require raising a locked global token and is left to a later decision rather than taken unilaterally during Phase 7.
