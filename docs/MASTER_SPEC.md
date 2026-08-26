Temikaze Website — Master Specification

STATUS: LOCKED FOR HOMEPAGE V1

This document is the authoritative source of truth for the Temikaze website.
Do not redesign, reinterpret, or expand the product without an explicit decision recorded in docs/DECISIONS.md.

1. Project Goal

Build a real production website for Temikaze, an emerging Nairobi-based House / Afro House DJ and producer.

This is not a portfolio mockup. The site should function as Temikaze's actual artist website and should be capable of growing with new releases, mixes, events, images, and booking information.

Primary goals:

Establish an authoritative web presence for the artist name Temikaze.

Present Temikaze professionally to listeners, promoters, venues, and bookers.

Make music and DJ mixes immediately discoverable.

Make booking/contact straightforward.

Provide a CMS so content can be updated without editing frontend code.

Provide a real environment for learning and measuring SEO and analytics.

Demonstrate production-quality frontend engineering, animation, CMS integration, accessibility, performance, and deployment.

2. Locked Homepage Architecture

Homepage v1 contains exactly four sections:

Hero

Music & Mixes

Stage & Visuals

Booking / Contact

Do not add additional homepage sections without an explicit decision.

Artist bio: a Practice section (DJ / Producer / Curator) was previously specified as a fifth homepage section and was built, then removed by product decision on 2026-08-25. The artist bio is not part of the homepage. It will be placed elsewhere in the site; its final location and structure are pending user direction. Do not rebuild Practice, and do not add an About or Bio section to the homepage in its place. See Section 12 and docs/DECISIONS.md.

A full /music archive and individual release/mix pages are future Phase 2, not homepage-v1 scope.

3. Locked Technical Direction

Frontend:

Next.js

App Router

TypeScript

Vercel deployment

CMS:

Headless WordPress

Standard WordPress REST API

Animation:

GSAP ScrollTrigger where pinned/scrubbed scroll behaviour is required

Motion or CSS for component/state transitions where appropriate

Measurement:

Google Analytics 4

Google Search Console

Styling implementation:

Not locked to a third-party UI framework.

Do not add a UI component framework.

Prefer normal CSS/CSS Modules/global CSS variables unless a different approach is explicitly approved.

4. Visual Direction — Reference Site Reskin

The Radical Face reference website supplies the visual design system.

Do not create a new Temikaze visual identity for homepage v1.

The site should feel like the reference site's visual language has been faithfully reskinned around:

Temikaze's photography,

Temikaze's music,

Temikaze's content,

Temikaze's events,

and the locked five-section information architecture.

Preserve as closely as practical:

palette,

typography hierarchy,

typography scale,

editorial layout philosophy,

dotted rules/dividers,

restrained pill buttons,

dark floating cards,

hover language,

image treatment,

header treatment,

footer treatment,

active/inactive media states,

scroll behaviour,

motion timing/character,

light-to-dark terminal transition.

Do not introduce:

neon DJ branding,

cyberpunk effects,

excessive gradients,

equalizer/waveform decoration,

Spotify-style green-on-black design,

stereotypical African motifs,

a separate site-wide TG & fRenz visual system,

arbitrary new accent colors.

Reference content must not be copied. Only the design system, interaction language, and layout principles are being adapted.

5. Reference-Derived Typography

Reference typography roles:

Druk — heavy condensed display

Suisse Int’l — neutral grotesque UI/body

Times Now — editorial serif

Free production substitutes:

Display / Headline

Barlow Condensed

Weight: 900

Used for:

TEMIKAZE wordmark

section headings

large music item titles where appropriate

Uppercase for wordmark and major section headings

Tight tracking

Barlow Condensed 900 is visually less extremely condensed than Druk (the reference display face). Final wordmark and section-heading letter-spacing and sizing must be visually tuned against the reference screenshots during implementation — do not treat the tracking values in the typography token table below as final without that visual verification. Font family does not change.

UI / Body

Inter

Weights: 400, 500, 600

Used for:

navigation

metadata

buttons

card copy

form fields

body copy where a sans treatment is required

Editorial Serif

Newsreader

Weights: 400, 600

Italic where needed

Used for:

descriptive subheads

editorial role titles/body where reference uses serif contrast

track/release descriptive copy where appropriate

No fourth font

Do not introduce a separate monospaced font unless later reference verification proves it is required.

Typography tokens

Role

Font

Desktop

Mobile

Weight

Line Height

Tracking

Case

Hero wordmark

Barlow Condensed

clamp(3.5rem, 12vw, 11rem)

clamp(3rem, 14vw, 5rem)

900

0.85

-0.02em

Uppercase

Section H2

Barlow Condensed

clamp(2.5rem, 6vw, 5rem)

clamp(2rem, 8vw, 3.2rem)

900

0.95

-0.01em

Uppercase

Item / Role H3

Newsreader

clamp(1.5rem, 2.5vw, 2.2rem)

clamp(1.2rem, 4vw, 1.6rem)

600

1.2

normal

Sentence

Body

Inter

1rem

0.95rem

400

1.65

normal

Normal

Small body

Inter

0.875rem

0.825rem

400

1.5

normal

Normal

UI label

Inter

0.9rem

0.85rem

600

1.0

normal

Title

Metadata

Inter

0.8rem

0.75rem

500

1.0

+0.05em

Uppercase

Eyebrow / Status Label

Newsreader

0.85rem

0.8rem

400 italic

1.1

normal

Sentence case / lowercase per content

Used for dot-prefixed category/status labels (e.g. "Latest Release", "Latest Blog", "Latest Fiction"). Does not replace ordinary dates or technical metadata — those remain the Inter Metadata role above.

Button

Inter

0.85rem

0.8rem

600

1.0

+0.03em

Lowercase (reference-derived; do not force text-transform: uppercase on buttons, pills, or small action links)

Wordmark

TEMIKAZE

Barlow Condensed 900

Uppercase

tight tracking

functions as the visual wordmark

no illustrated logo required for v1

Favicon concept:

T or TK

same condensed display treatment

6. Reference-Derived Color System

These are the current reference-derived working values.

Phase 2 must visually verify these values against the supplied reference material before final CSS tokens are considered locked.
Do not invent replacement colors during that verification.

:root {
  --background: #F2F0E9;
  --background-dark: #0D0D0D;

  --foreground: #111111;
  --foreground-muted: #666666;
  --foreground-light: #FFFFFF;
  --foreground-light-muted: #A0A0A0;

  --rule: #888888;
  --card-border: #262626;
  --card-dark: #121212;
  --button-border: #111111;

  /* Hero status markers only */
  --status-dot-red: #E53E3E;
  --status-dot-blue: #4C51BF;
  --status-dot-green: #38A169;

  /* Functional states */
  --focus-light: #111111;
  --focus-dark: #FFFFFF;
  --error: #E53E3E;
}

Rules:

Interactions remain primarily monochrome.

Do not use green/orange release-vs-mix color coding.

Do not use colored hover states in the gallery/footer.

The three colored hero dots are status markers only.

Release artwork may naturally contain its own colors.

7. Global Visual Devices

Carry these consistently through the site:

1px dotted horizontal and vertical rules.

Oversized condensed display headings.

Restrained pill buttons.

Dark floating hero cards.

Asymmetric editorial grids.

Precise metadata positioning.

Active/inactive media contrast.

Cream body canvas.

Strong near-black terminal footer.

Minimal decorative effects.

Photography:

rigid rectangular/square crops

no decorative rounded photography masks

no unnecessary shadows

no gradient overlays unless required by a real reference treatment

active gallery image: full color/full opacity

inactive gallery images: reduced scale, opacity, and grayscale

8. Global Layout System

Working layout targets:

Maximum content width: 1440px

Horizontal gutters: clamp(1.5rem, 4vw, 4rem)

Header height target: approximately 70px

Desktop section spacing: clamp(4rem, 8vw, 8rem)

Mobile section spacing: clamp(3rem, 6vw, 5rem)

Major structural dividers: 1px dotted --rule

Header: sticky/fixed visual behaviour consistent with reference

Header background: solid cream; no speculative blur/backdrop filter

Breakpoints:

Desktop — >= 1024px

full multi-column layouts

pinned desktop Music interaction

floating/sticky hero cards

full active-focus gallery

Tablet — 768px–1023px

intermediate typography/layout scaling

do not preserve desktop pinning if it harms usability

test interaction rather than assuming desktop behaviour transfers

Mobile — <768px

single-column structural layouts

native touch interaction

no aggressive scroll hijacking

horizontal scroll-snap where specified

9. Global Motion Language

Micro-interactions:

approximately 0.2–0.3s

restrained transforms

monochrome inversion

Larger transitions:

approximately 0.5–0.8s

smooth easing such as cubic-bezier(0.25, 1, 0.5, 1)

Status-card hover:

horizontal translateX(10px)

arrow reveal

no extra vertical lift

Gallery:

active scale: 1

inactive scale target: 0.75

active opacity: 1

inactive opacity target: 0.4

inactive grayscale target: 80%

Music:

desktop pinned horizontal scroll

mobile native horizontal scroll-snap

Reduced motion:

disable scrubbed/pinned animation where needed

disable continuous decorative rotation

provide a usable static/native layout

never make content inaccessible when motion is reduced

Do not add motion not justified by the reference or functional adaptation.

10. SECTION 1 — HERO

Purpose

Immediately establish:

Temikaze

DJ + producer identity

Nairobi location

latest release

latest mix

next future event when one exists

booking path

Content

Required:

TEMIKAZE

House / Afro House DJ + Producer

Nairobi, Kenya

primary performance photograph

sticky/fixed header

Latest Release card

Latest Mix card

Next Event card when future event data exists

Book Artist CTA

No-future-event behaviour

If there is no future event in the CMS:

do not fabricate one,

do not show a past event as “Next Event,”

either omit that card or render the layout cleanly with the remaining status cards.

Header audio control

The reference site's header includes a persistent circular audio-state toggle icon.

Temikaze has no equivalent sitewide audio-control feature.

Do not reproduce that icon, functionally or decoratively.

Do not add a placeholder/nonfunctional icon in its place.

Desktop layout

Working target (corrected against reference screenshots — see docs/DECISIONS.md):

full-width hero

minimum approximately 100vh

full-width identity/text band near the top of the hero: oversized TEMIKAZE wordmark plus supporting serif tagline/content positioned within that same editorial band, not in a separate side column

full-width landscape performance image directly beneath the identity/text band — the image is a stacked band under the text, not a right-hand column beside it

hero image approximately 80vh, object-fit: cover

dark status-card stack floats over the upper-left portion of the hero image

header remains fixed above this entire composition

solid cream header with dotted lower divider

Typography

H1:

Barlow Condensed 900

uppercase

clamp(3.5rem, 12vw, 11rem)

line-height 0.85

Supporting text:

Newsreader and/or Inter according to the reference hierarchy

Cards

Background:

--card-dark

Corners:

small/subtle corner radius (not sharp rectangle, not full pill)

exact radius value not yet locked; visually tune against reference screenshots during Hero implementation (Phase 5)

Text:

white primary

muted light secondary

Eyebrow/status label text (e.g. "Latest Release", "Latest Blog"):

uses the Eyebrow / Status Label typography role (Newsreader 400 italic, sentence case per content — see Section 5)

Status marker dots:

reference red / blue / green markers only

Interaction:

hover: translateX(10px)

arrow reveal

no invented vertical lift

Motion

Initial reveal:

restrained fade/clip/position reveal consistent with reference

Sticky cards:

remain visually pinned during the relevant hero scroll range

unpin before they overlap the next section incorrectly

Reduced motion:

static cards

no translation requirement

Mobile

single-column layout

scaled wordmark

hero image

status cards become a touch-friendly horizontal deck or clean vertical stack depending on actual reference-fit testing

no sticky overlap that creates viewport clutter

no desktop scroll behaviour forced onto touch devices

CMS dependencies

artist_profile

artist name

tagline

location

hero image

booking destination

releases

latest release by date

mixes

latest mix by date

events

closest event with date greater than or equal to current date

Acceptance criteria

Wordmark and visual hierarchy match locked typography.

Hero uses reference-derived palette.

Status cards use CMS/sample data correctly.

Latest Release logic is date-driven.

Latest Mix logic is date-driven.

Next Event never displays a past event as upcoming.

Desktop sticky behaviour does not overlap Section 2.

Mobile has no horizontal page overflow.

All interactive elements are keyboard accessible.

11. SECTION 2 — MUSIC & MIXES

Purpose

Make Temikaze's music immediately discoverable and preserve the reference homepage's signature horizontal audio interaction.

Content types

One combined carousel:

original releases

DJ mixes / Mum's Garage Radio

Differentiate using:

metadata text

RELEASE vs MIX

title

year/date

description

real artwork

Do not differentiate with an invented color palette.

Card architecture

All items use the same reference-derived card grammar.

Default:

circular vinyl-disc composition — a grooved disc is the card's primary form

circular artwork label centered within the disc

metadata below

reference-style pill action

Every item uses this same composition. Active and inactive items differ only in scale, opacity, and rotation state — never in composition. There is no separate square-sleeve treatment for inactive items.

Exact disc/label proportions, card width, and card gap remain subject to later visual polish against the reference.

Corrected 2026-08-25 — see docs/DECISIONS.md "Music card composition corrected to circular vinyl disc". The prior "square 1:1 artwork sleeve / protruding vinyl-disc treatment for active item" wording predated references/screenshots/audio-initial.png and audio-active-item.png, which show a circular grooved disc with an inset round artwork label and no square sleeve.

Do not introduce a cassette motif.

If a real asset has a different source ratio, crop/frame it into the shared system rather than inventing a second design language unless an explicit future decision changes this.

Desktop layout

full-width section

top/bottom dotted framing

oversized section heading

descriptor copy aligned in reference style

horizontal track

generous card gap

reference tick/ruler motif only if clearly supported by reference analysis

Desktop motion

GSAP ScrollTrigger:

pin section while horizontal track traverses

map vertical scrolling to horizontal translation

active card determined by proximity to viewport center

active card gains focus

inactive cards reduce scale/opacity

active vinyl may rotate if consistent with reference

no audio autoplay

Exact scroll distance must be calculated from real track width, not hard-coded blindly to 2000px.

Audio behaviour

no autoplay

user explicitly clicks Listen/Watch

outbound links may open Spotify/YouTube

analytics tracks outbound actions

Mobile

disable pinned scroll-scrubbing

normal vertical page flow

horizontal overflow-x

scroll snapping

touch-friendly cards and controls

no scroll hijacking

CMS dependencies

releases

title

release date

artwork

type

genre if factual

short description

Spotify URL

YouTube/other URLs

mixes

title

publish date

artwork

short description

YouTube/SoundCloud URL

optional tracklist

Acceptance criteria

Releases and mixes populate from data.

All cards follow one visual grammar.

No invented release/mix color coding.

Desktop pinning is smooth and calculable from content width.

Backward scrolling behaves correctly.

Mobile uses native touch scrolling.

No audio begins without user action.

Reduced-motion mode remains usable.

External music actions can be tracked.

12. SECTION 3 — PRACTICE (REMOVED 2026-08-25)

Removed from homepage v1 by product decision.

This section previously specified a three-role editorial grid (DJ / Producer / Curator) adapted from the reference WRITTEN section. It was implemented in Phase 7 and then removed. The homepage no longer contains it, and the global navigation no longer links to it.

The DJ / Producer / Curator structure is not a current requirement.

The artist bio will be introduced elsewhere in the site once its location and structure are specified. That direction has not been given yet.

Do not rebuild this section. Do not substitute an About or Bio section on the homepage in its place. Do not add a placeholder for it.

The section number is retained deliberately so that existing cross-references to MASTER_SPEC section numbers elsewhere in the documentation remain valid. The removed specification text is preserved in Git history, and the build-then-remove sequence is recorded in docs/PROGRESS.md and docs/DECISIONS.md.

13. SECTION 4 — STAGE & VISUALS

Purpose

Show:

live performance energy

professional DJ imagery

artist portraits

selected event imagery/flyers

Desktop layout

Adapt reference VISUAL carousel:

section heading

horizontal gallery

large active center item

smaller flanking inactive items

two separate, adjacent solid-black pill buttons: prev and next (not one combined control pill)

Active:

scale 1

opacity 1

grayscale 0%

Inactive target:

scale 0.50

opacity 0.4

grayscale 80%

Corrected 2026-08-26 — see docs/DECISIONS.md "Gallery inactive scale corrected to 0.50 from measured reference evidence". The previous 0.75 was an approximate pre-audit figure. Direct measurement of the reference gives an active box of ~798x838 device px against flanking boxes of ~418x420, a ratio of 0.52 on width and 0.50 on height. The implemented and accepted value is 0.50. Do not restore 0.75.

No colored gallery hover accents.

Motion

On Prev/Next:

horizontal focus change

incoming item scales toward 1

opacity increases

grayscale resolves to color

outgoing item reverses those states

Keep motion around the reference-derived 0.5s range unless visual comparison indicates otherwise.

Mobile

one primary active image

touch swipe

Prev/Next controls remain accessible

no desktop-only flanking composition if it causes overflow

CMS dependencies

gallery

image

caption

alt text

category

date/event metadata where relevant

Acceptance criteria

Active/inactive states are visually clear.

Keyboard controls work.

Touch interaction works on mobile.

No horizontal page overflow.

Images have meaningful alt text.

Gallery uses the reference monochrome interaction system.

14. SECTION 5 — BOOKING / CONTACT

Purpose

Convert interest into contact and provide direct artist/social destinations.

Visual treatment

Abrupt light-to-dark terminal transition.

Background:

--background-dark

Text:

white / muted light

Preserve:

oversized footer heading

restrained fields

reference-style pills

horizontal rules

bottom contact/social directory

Content

BOOKINGS & INQUIRIES

booking/contact email

booking form

Nairobi, Kenya

Spotify

YouTube

Instagram

TikTok

TG & fRenz link where appropriate

Linktree if still useful

Do not create an EPK unless real EPK content exists.

Form fields

Initial v1:

Name

Email

Event date/location

Message

Exact field UX can be refined during implementation without changing section purpose.

Interaction

Focus:

white/high-contrast focus treatment on dark background

no green accent

Submit:

clear loading/success/error states

do not claim "management will respond" unless that wording is approved

Spam:

basic honeypot

server-side rate limiting before public production launch

CMS dependencies

artist_profile

booking email

location

social URLs

Linktree URL if retained

Acceptance criteria

Form is keyboard accessible.

Inputs have real labels.

Success/error states are clear.

Spam protections are present before launch.

Social/music links are correct.

Dark footer visually matches reference language.

15. Headless WordPress CMS Model

Use standard WordPress REST endpoints.

Content groups:

artist_profile

releases

mixes

events

gallery

Do not create a custom /temikaze/v1/profile endpoint unless a real technical need is approved.

Critical REST implementation rule

Register every custom post type with:

show_in_rest: true

Custom fields/meta required by the frontend must also be deliberately exposed.

If native post meta is used:

register each frontend-facing field,

set show_in_rest: true,

ensure the CPT supports custom-fields.

Do not assume arbitrary custom fields automatically appear in /wp-json/wp/v2/....

artist_profile

Global artist data:

artist name

tagline

location

DJ description

producer description

curator description

hero image

booking email

Spotify URL

YouTube URL

Instagram URL

TikTok URL

Linktree URL

TG & fRenz link/logo where required

Expected REST route:
/wp-json/wp/v2/artist_profile

releases

Fields:

title

release date

artwork

release type

genre if factual

short description

Spotify URL

YouTube URL

other streaming URLs

Expected REST route:
/wp-json/wp/v2/releases

mixes

Fields:

title

publish date

artwork

short description

YouTube/SoundCloud URL

optional tracklist

Expected REST route:
/wp-json/wp/v2/mixes

events

Fields:

title

event date

venue

location

flyer

external link

status if needed

Expected REST route:
/wp-json/wp/v2/events

Upcoming logic must be computed using the actual event date.
Past events may never be presented as the "Next Event."

gallery

Fields:

image

caption

alt text

category

date/event metadata when relevant

Expected REST route:
/wp-json/wp/v2/gallery

16. Accessibility Requirements

One page-level H1.

H2 for section headings.

H3 for item/role headings where appropriate.

Keyboard access for all interactive elements.

Visible focus states.

Buttons must be buttons; navigation destinations should be links.

Form fields require labels.

Gallery controls require accessible names.

Respect prefers-reduced-motion.

Do not rely on color alone to communicate content type/state.

Provide meaningful alt text.

Maintain WCAG AA contrast where feasible without changing the reference visual system.

17. Performance Requirements

Images:

use Next.js image optimization where appropriate

explicit dimensions/aspect ratios

responsive sizes

hero image optimized for LCP

gallery images lazy-loaded where appropriate

do not ship original huge source photography to visitors

Animation:

prefer transform and opacity

avoid layout-thrashing animation

clean up GSAP ScrollTriggers on component teardown

do not create multiple competing animation loops

Embeds:

do not eagerly load heavy Spotify/YouTube embeds if a lightweight link/preview can preserve UX

lazy-load third-party embeds when introduced

Fonts:

use next/font

only required weights

avoid unnecessary font families

Targets:

no preventable CLS

no horizontal overflow

reasonable Core Web Vitals

Lighthouse is a diagnostic, not a requirement to fake a score

18. SEO & Analytics

Initial SEO objective:

Establish an authoritative indexed presence for the artist name Temikaze.

No keyword stuffing.
No fake SEO articles.
No ranking guarantees.

Homepage working metadata:

Title:
Temikaze | House & Afro House DJ + Producer — Nairobi, Kenya

Meta description:
Official website for Temikaze, House and Afro House DJ and producer from Nairobi, Kenya. Listen to original tracks, DJ mixes, and show updates.

Requirements:

canonical URL

Open Graph metadata

social preview image

sitemap

robots configuration

structured data validated before launch

natural semantic headings

descriptive image alt text

Google Search Console verification

Structured data:

use Person for the artist identity

add music/release structured data where valid

do not add schema types that cannot be truthfully supported

GA4 events:

outbound Spotify click

outbound YouTube click

booking CTA click

booking form submission

TG & fRenz outbound click where useful

Measure:

impressions

organic clicks

branded searches

traffic sources

streaming outbound clicks

booking interactions

19. Future Phase 2 — /music

Not part of homepage v1.

Possible future scope:

/music

All / Releases / Mixes filters

full catalog

individual release/mix pages

longer descriptions

streaming links

tracklists where available

reference-derived release detail transitions

Do not build this during homepage v1.

20. Implementation Sequence

Phase 1 — Next.js Project Setup

initialize frontend application

App Router

TypeScript

lint/build baseline

no homepage implementation

Phase 2 — Verify Reference Typography & Design Tokens

load Barlow Condensed 900, Inter, Newsreader

visually verify reference-derived colors

define global tokens

do not redesign palette

Phase 3 — WordPress Content Types & Sample Data

create CPTs:

artist_profile

releases

mixes

events

gallery

expose CPTs through REST

expose required custom fields/meta through REST

seed representative sample content

Phase 4 — Global Static Layout & Navigation

page shell

header

containers

divider system

typography hierarchy

Phase 5 — Hero

static hero

status cards

hero image

sticky behaviour

responsive behaviour

Phase 6 — Music & Mixes

static carousel

data shape

GSAP desktop pin/scrub

active states

mobile native scroll-snap

Phase 7 — Practice (implemented, then removed)

built 2026-08-25, removed the same day by product decision

phase number retained; not current functionality — see docs/PROGRESS.md

Phase 8 — Stage & Visuals

focus gallery

keyboard/touch controls

active/inactive transitions

Phase 9 — Booking / Contact

dark footer

form UI

social directory

form state

spam protection planning/implementation appropriate to launch stage

Phase 10 — Wire Real CMS Data

replace sample frontend data with WordPress REST data

validate empty/missing states

validate upcoming event logic

Phase 11 — Responsive & Accessibility Pass

breakpoints

keyboard navigation

focus states

reduced motion

overflow audit

semantics

Phase 12 — Performance

image optimization

animation profiling

third-party embed strategy

bundle review

Core Web Vitals audit

Phase 13 — SEO & Analytics

metadata

structured data

sitemap/robots

GA4 events

Search Console setup

Phase 14 — Deployment

Vercel production deployment

production environment variables

smoke testing

verify live analytics/SEO configuration

21. Explicit Out-of-Scope Items for Homepage V1

Do not build unless separately approved:

full /music archive

release detail pages

mix detail pages

blog/journal

editorial SEO articles

EPK generator/download system

user accounts

custom admin dashboard

autoplay music

mobile app

complex custom WordPress API namespace

additional homepage sections

invented Temikaze achievements/content

major new visual identity

22. Definition of Success

Homepage v1 is successful when:

it looks and feels like a faithful adaptation of the locked reference visual system,

it clearly communicates who Temikaze is,

real music/mix/event/gallery data is CMS-driven,

new content can be added through WordPress without frontend code edits,

the site works on desktop and mobile,

animations enhance rather than block usability,

accessibility fundamentals are present,

booking/contact works,

analytics is measurable,

the site is indexable,

and the production deployment is stable.