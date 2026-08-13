Temikaze Website — Claude Code Instructions

Source of truth

Before doing any implementation work, read:

docs/MASTER_SPEC.md

docs/DECISIONS.md

docs/PROGRESS.md

docs/CONTENT_INVENTORY.md

docs/MASTER_SPEC.md is the authoritative product, visual, interaction, CMS, SEO, accessibility, and implementation specification.

If anything in prior Claude conversations, comments, generated code, assumptions, reference analysis, or other documentation conflicts with docs/MASTER_SPEC.md, follow docs/MASTER_SPEC.md.

Do not silently reinterpret locked decisions.

Working method

Work on one implementation phase at a time.

Before changing code for a phase, report:

The phase being implemented.

The exact acceptance criteria for that phase.

The files/directories you expect to create or modify.

Dependencies you expect to add, if any.

Assumptions you are making.

Any ambiguity or blocker you see.

Wait for explicit approval if:

the requested phase requires a new dependency that is not already approved,

the master spec is ambiguous,

a decision would change architecture or visual direction,

or the implementation would expand scope.

Do not automatically continue to the next phase.

Scope control

Do not:

redesign the product,

invent new homepage sections,

invent Temikaze content,

introduce a new visual identity,

introduce a new color palette,

add features because they seem useful,

add a blog,

build the future /music archive during homepage v1,

add an EPK unless explicitly requested,

add autoplay audio,

add a custom WordPress API namespace unless a concrete technical need is approved,

introduce a UI component library unless explicitly approved,

replace the chosen stack without explicit approval,

refactor unrelated files while working on a scoped phase.

The homepage architecture is locked to:

Hero

Music & Mixes

Practice

Stage & Visuals

Booking / Contact

Reference-site fidelity

The Radical Face reference supplies the visual language.

The Temikaze website should adapt that design system around different content and information architecture.

Preserve the reference-derived:

condensed display typography,

editorial serif/sans hierarchy,

cream/near-black palette,

dotted divider system,

pill-button language,

floating dark cards,

asymmetric editorial grids,

active/inactive image treatment,

pinned horizontal music interaction on desktop,

restrained hover motion,

light-to-dark footer transition.

Do not create additional “DJ-style” branding such as:

neon gradients,

cyberpunk styling,

equalizer decorations,

waveform decoration,

generic nightclub visuals,

Spotify-inspired green-on-black styling,

invented release/mix color coding.

Reference videos in references/ are visual evidence. Written specifications in docs/MASTER_SPEC.md remain the implementation authority.

If visual evidence and written specification appear to conflict, stop and report the conflict.

Typography rule

The free production substitutes are:

Druk role → Barlow Condensed weight 900

Suisse Int’l role → Inter

Times Now role → Newsreader

Do not use League Gothic 900. League Gothic does not provide that weight.

Do not introduce a fourth monospaced font unless explicitly approved.

WordPress REST rule

Custom post types must be registered with show_in_rest: true.

Custom fields/meta used by the frontend must also be explicitly exposed through REST.

If native post meta is used:

register it deliberately,

use show_in_rest: true,

and ensure the relevant CPT supports custom-fields.

Do not assume custom fields automatically appear in REST responses.

Implementation discipline

Prefer small, understandable changes.

Do not generate an entire architecture in one pass when the current phase needs only a small part.

Avoid premature abstraction.

Do not hide important behaviour behind unnecessary helper layers.

When introducing non-trivial logic:

explain what it does,

explain why it exists,

and identify where it is called.

For animation:

prefer transform and opacity,

avoid expensive layout animation,

respect prefers-reduced-motion,

and do not add animations not specified in the master spec.

Verification

Never report planned functionality as implemented functionality.

Before declaring a phase complete:

run the relevant build/lint/test checks,

manually verify acceptance criteria where appropriate,

state what was actually verified,

state what remains unverified,

report any known defects or compromises.

Visual fidelity must be checked against the supplied reference material/specification, not assumed.

Documentation

After each completed phase:

Update docs/PROGRESS.md

Record:

phase status,

what changed,

tests/checks run,

unresolved issues,

next approved phase.

Update docs/DECISIONS.md

Only when a meaningful technical/product decision was explicitly made.

Do not rewrite historical decisions to make later implementation look cleaner.

Git

Keep changes scoped to the current phase.

Do not:

commit,

push,

rewrite Git history,

delete local reference videos,

or modify .gitignore

unless explicitly asked.

Reference .mov files are intentionally local-only and should remain ignored by Git.

Communication

Keep implementation explanations concrete.

When you finish a task, summarize:

Files changed.

What each change does.

What was tested.

Any issue that still exists.

Whether the phase acceptance criteria passed.