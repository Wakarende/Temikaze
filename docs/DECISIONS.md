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

Superseded (2026-08-25) — the Practice section was removed from the homepage by product decision. The DJ / Producer / Curator structure is no longer a homepage requirement. The artist bio will be introduced elsewhere once its location is specified. See the 2026-08-25 removal entry at the end of this file.

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

Superseded (2026-08-25) — Practice was removed from the homepage. This alignment rule is no longer an active requirement.

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

Superseded (2026-08-25) — Practice was removed from the homepage, so the sticky-versus-static question is moot: there is no Practice section to apply it to. The reference observation itself remains factually accurate and may be useful if a comparable two-column editorial layout is ever built elsewhere in the site.

2026-08-25 — Practice featured role title is scaled above the Role H3 token

MASTER_SPEC.md Section 5 assigns "Item / Role H3" to Newsreader at clamp(1.5rem, 2.5vw, 2.2rem). Applied uniformly, that token would render DJ, Producer and Curator at identical size and flatten the reference's featured-versus-list hierarchy, in which the featured title reads at roughly 0.9x the section heading while the list titles sit well below it.

Accepted: the right-column role titles (Producer, Curator) use the Role H3 token unchanged. The left featured title (DJ) uses a component-local clamp(2.5rem, 5vw, 4.5rem).

This is a component-local size in Practice.module.css. No global typography token was added or changed. The precedent is Header.module.css, which already sets a component-local wordmark size rather than reusing --text-hero.

Known consequence, accepted for now: our featured-title-to-list-title ratio is roughly 0.49, against roughly 0.70 in the reference, because the Role H3 cap holds the list titles down. Closing that gap would require raising a locked global token and is left to a later decision rather than taken unilaterally during Phase 7.

Superseded (2026-08-25) — Practice was removed from the homepage and Practice.module.css was deleted, so this component-local size no longer exists anywhere in the codebase. The underlying observation — that applying the Role H3 token uniformly flattens a featured-versus-list hierarchy — remains relevant if a similar editorial layout is built elsewhere.

2026-08-25 — Practice section removed from the homepage

Product decision by the user. Not a technical or visual problem with the implementation — Phase 7 had been built, verified, and accepted the same day.

The Practice section is removed from homepage v1. The homepage section order is now:

1. Hero

2. Music & Mixes

3. Stage & Visuals

4. Booking / Contact

The DJ / Producer / Curator structure is no longer part of the current homepage and is not a requirement anywhere else at present.

The artist bio belongs elsewhere in the site. Its location and structure are pending user direction and have not been specified. Until they are:

do not rebuild Practice,

do not add an About or Bio section to the homepage in its place,

do not add a placeholder for it,

and do not relocate or invent the bio copy.

What was actually removed: frontend/app/components/Practice.tsx and Practice.module.css were deleted; the Practice import, the rendered component, and the "practice" entry in the homepage placeholder list were removed from frontend/app/page.tsx; and the "#practice" link was removed from NAV_LINKS in frontend/app/components/Header.tsx. No other navigation item was touched.

MASTER_SPEC.md Section 2 now specifies four homepage sections. Section 12 is retained as a numbered stub marking the removal, so that existing cross-references to MASTER_SPEC section numbers elsewhere in this file remain valid — Sections 5, 10, 11, 12 and 13 are all cited by number in entries above.

Phase numbering is unchanged. Phase 7 remains the Practice phase, documented as implemented and then removed. Phases were not renumbered. The next implementation work is the existing Phase 8 — Stage & Visuals.

The four earlier Practice-specific decisions in this file (the 2026-08-13 Practice section definition, the 2026-08-13 center-alignment rule, and the two 2026-08-25 layout decisions) are each annotated as superseded in place rather than deleted, so the history of what was decided and why remains readable.

2026-08-26 — Gallery inactive scale corrected to 0.50 from measured reference evidence

MASTER_SPEC.md Section 13 carries "Inactive target: scale 0.75, opacity 0.4, grayscale 80%". The 0.75 was an approximate pre-audit value.

Direct measurement of the reference VISUAL section (references/screenshots/visual-active-gallery.png plus frames extracted from references/LandingPage-Desktop.mov) gives an active box of ~798x838 device px and flanking boxes of ~418x420 — a ratio of 0.52 on width and 0.50 on height.

Accepted: the flanking items render at 0.50 of the active box. Opacity 0.4 and grayscale 80% are unchanged; both matched the reference.

This follows the standing instruction that reference visual evidence takes precedence over approximate legacy values.

Not yet actioned: the 0.75 figure in MASTER_SPEC.md Section 13 has NOT been amended, because editing MASTER_SPEC was outside the stated file scope of Phase 8. The spec text and the implementation therefore currently disagree. Section 13 should be corrected to 0.50 so a later reader does not "fix" the implementation back to the superseded value.

2026-08-26 — Gallery preserves natural aspect ratios with contain fitting; no uniform crop

MASTER_SPEC.md Section 13 does not specify cropping behaviour for the gallery. The reference establishes it clearly.

In the reference each work is fitted inside a shared box preserving its own aspect ratio. Confirmed two ways: in one frame all four flanking items share height 292px with widths 230-261px (all portrait, so height-limited), while in the screenshot a 1.7:1 landscape item renders 290x170 (width-limited) next to a 0.78 portrait at 233x297 (height-limited). Same box, different limiting edge — that is contain behaviour, not a crop.

Accepted: object-fit: contain inside a shared box, never cover, and no uniform aspect-ratio crop.

This matters for real content. The approved Temikaze set mixes 3:4 photography and posters with 1:1 release artwork; contain fitting handles that mix natively, whereas a uniform crop would cut the headline or footer bar off the event posters.

2026-08-26 — Gallery navigation is bounded, not wrapping

The reference does not establish wrapping. The available footage shows repeated forward navigation but never enough of a cycle to demonstrate whether the gallery wraps at either end, and inventing the behaviour was not warranted.

Accepted: bounded navigation. prev is disabled at the first item, next at the last, both as genuinely disabled buttons rather than inert controls.

Revisit only if reference evidence for wrapping appears.

Superseded (2026-08-26, same day) — the entrance screenshots supplied later that day show the settled gallery has items on both sides of the initial active item, with partials cropped by both viewport edges. There is no visible first or last item. Navigation now loops in both directions and the disabled endpoint states were removed. The reasoning above was sound on the evidence then available; the evidence changed. See "The settled gallery is continuous, with no beginning or end" at the end of this file.

2026-08-26 — Two supplied gallery assets excluded

temikaze-cover-01.jpg is excluded. It is not a Temikaze release: it is the credits sleeve of another artist's record, listing roughly thirty third-party names, and it displays Temikaze's legal name in legible type. Including it would breach the standing rule in docs/CONTENT_INVENTORY.md against surfacing that name without explicit approval, and it also reads as a dense text block rather than a visual work.

temikaze-event-03.webp is excluded. It bills a different artist rather than Temikaze, and it is largely black, so under the flanking treatment (0.4 opacity over cream, 80% grayscale) it would reduce to a faint grey rectangle.

Neither file was copied into frontend/public. The originals remain untouched in assets-source/gallery/.

Related content rules applied in the same phase: no captions are rendered anywhere in the gallery, and no poster text — event dates, times, venue, or billing, all of which are legible inside the supplied artwork — is transcribed into alt text or any other rendered copy.

2026-08-26 — The VISUAL section's entrance is scroll-scrubbed, not a settled gallery alone

Supersedes the implicit assumption in the first Phase 8 implementation, which reproduced only the settled gallery and treated the section as static until the controls were used.

The reference VISUAL section has two connected states driven by vertical scroll position: an oversized, effectively full-bleed introductory image, resolving into the settled horizontal gallery. Established from three user-supplied entrance screenshots and from frames extracted across t=59.2-61.8s of references/LandingPage-Desktop.mov.

Accepted behaviour:

The section header pins with dotted rules above and below it and stays in place while the image resolves. The earlier single bottom rule was wrong.

At scroll progress 0 the active image is scaled to the full viewport width and top-aligned under the pinned header, overflowing the bottom of the stage.

The flanking items hold their muted treatment throughout. They are pushed outside the viewport by the oversized active image and slide inward as it shrinks. They do not fade in from nothing — the extracted frames show them at the extreme viewport edges while the active image is still very large.

The transformation is scrubbed, not time-based: stopping mid-scroll must hold the intermediate composition, and scrolling up must reverse it.

Implemented with a scoped GSAP ScrollTrigger inside its own gsap.matchMedia context, desktop-only and skipped under reduced motion. Music's trigger is untouched.

This decision records the behaviour, not its verification. The scroll choreography could not be exercised in the development sandbox and was pending manual browser testing when this entry was written.

SUPERSEDED (2026-08-26, later the same day) — the oversized scroll-driven entrance was deliberately DROPPED by product decision before it was ever manually verified. Stage & Visuals now begins directly in its settled carousel state, in normal document flow, and StageVisuals has no ScrollTrigger of its own. The reference analysis recorded above remains accurate and is kept because the entrance may be revisited during a later polish pass — but none of it describes the current implementation. The one part that survived into the accepted build is the header row's dotted rules above and below. See "Stage & Visuals accepted state" at the end of this file.

2026-08-26 — The settled gallery is continuous, with no beginning or end

Supersedes "2026-08-26 — Gallery navigation is bounded, not wrapping" recorded earlier the same day. That entry reasoned that the reference never demonstrated wrapping, so bounded navigation with disabled endpoints was the conservative choice.

The supplied entrance screenshots settle it: at the settled state the initial active item has items on both sides, with partials cropped by both viewport edges. There is no visible first item and no visible last item.

Accepted: the gallery is continuous. The first approved asset remains the initial active image, but it sits inside an endless sequence — the arrangement reads ... 5 6 [1 ACTIVE] 2 3 ... rather than [1 ACTIVE] 2 3 4 ...

Navigation loops in both directions. There are no disabled prev/next states.

Implemented by rendering the six items three times and placing each slot by its signed circular distance from the active item, wrapped nine slots out — far outside the viewport, so no slot is ever seen jumping. This is also why the items carry no CSS transitions: a transition would animate a wrapping slot straight across the screen. All positioning is written imperatively instead, by the same render pass that the scroll scrub drives.

Only the middle repeat is exposed to assistive technology; the duplicate copies carry aria-hidden, tabIndex -1 and empty alt so the six images are announced once, not three times.

2026-08-26 — Stage & Visuals accepted state

This entry records what Phase 8 actually ships, after the section was built, reopened twice, and narrowed by product decision. Where earlier entries in this file conflict with it, this one is current. Each of those has been annotated superseded in place rather than deleted.

No scroll-driven entrance. The section enters normal document flow already showing the settled carousel. StageVisuals creates no ScrollTrigger and does no pinning or scrubbing of its own; the only ScrollTrigger in the project remains Music's, which was not touched. GSAP is still used here, but only to tween the carousel's own navigation.

The gallery is continuous in both directions. The initial active item sits inside the sequence with muted items on both sides and partials cropped by both viewport edges. next runs 1-2-3-4-5-6-1 and prev runs 1-6-5-4-3-2-1. There are no disabled endpoints, no blank edge, and no visible reset.

Visual treatment as measured from the reference: active at full scale, opacity 1 and full colour; inactive at approximately 0.50 scale, 0.40 opacity and 80% grayscale. Natural aspect ratios preserved with contain-style fitting, never a uniform crop. No captions. The six approved assets only.

All five navigation methods share the same circular logic and the same tween: the prev and next pills, clicking an inactive image, ArrowLeft and ArrowRight while the gallery has focus, and mobile swipe. Mobile shows one primary image and loops the same way.

Reduced motion keeps every navigation method functional and drops the decorative movement.

2026-08-26 — Carousel navigation targets a whole-number index, not the animated position

Found while verifying the button micro-interaction, not designed up front.

Navigation originally derived its next target from the live animated position value. Because that value is mid-flight whenever a tween is running, rapid activations compounded into fractional targets — 0, then 1.5, then 2.1 — so no item ever landed centred and the active index stopped matching any real item, which silently removed aria-current from the whole gallery.

Accepted: a separate whole-number target index is the source of truth for navigation. The animated value is for rendering only. Every activation advances exactly one item, however fast the input arrives.

2026-08-26 — Prev/next pill activation micro-interaction

Accepted behaviour, triggered only by genuine activation of the control — mouse click, Enter or Space, all of which a native button reports through one click handler. Arrow-key gallery navigation is handled on the gallery region and deliberately does not animate a pill the user did not press.

Two effects run together, both pure CSS, no new dependency:

A slight squash of the pill — compress, small overshoot, settle — over 340ms.

A masked vertical label roll over 340ms. For next the label exits upward and its replacement enters from below; for prev it exits downward and the replacement enters from above. The label sits in an overflow-hidden mask exactly one line tall, so it can never be seen outside the black pill.

Two different restart mechanisms, deliberately. The squash alternates between two identical keyframe sets, because changing animation-name restarts a CSS animation without a remount — and the button must not remount, or a keyboard user who pressed Enter would lose focus mid-press. The label roll instead remounts by key; it is not focusable, so remounting is free and guarantees a clean restart with no stuck or duplicated label however fast the clicks come.

Both labels carry the same word and the duplicate is aria-hidden, so the button announces its label once and the roll's reset between presses is invisible.

The pill's resting height was preserved when the label mask was introduced: line-height moved from 1 to 1.25 so the descender in "prev" is not clipped, with padding-block reduced to compensate. Measured 38.19px against the previous 38px.

Under reduced motion both animations are dropped; the button keeps its focus treatment and activation still moves the gallery.

2026-08-26 — Prev/next pills have no hover state

The reference has no hover treatment on these controls.

Accepted: the pills are visually identical at rest and under the pointer — same background, text, border, scale, position, opacity and label placement. No lightening, inversion, translation, scaling, underline or glow. The pointer cursor is retained.

The only visual change comes from actually activating the control.

:focus-visible is unchanged and still provides visible keyboard focus indication. Note that its treatment was originally authored as a shared hover-and-focus rule; with hover removed it now applies to focus alone, which is intentional and leaves the focus state visibly distinct.
