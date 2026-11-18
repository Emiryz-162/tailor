# Tell catalog — what unchosen defaults look like

A *tell* is a pattern that shows up because nobody decided otherwise. It is evidence of a default,
not proof of AI authorship, and not forbidden: anything listed as allowed in STYLE-DNA.md's
"Deliberately not" section with a reason is fine. Everything else here needs a fix.

Merged and deduplicated from public anti-slop work (Anthropic's frontend-design skill, impeccable's
craft floor, avoid-ai-design's tell catalog, taste-skill's house rules) plus our own additions.
Each entry: the tell → what to do instead.

## Contents
1. First-order defaults (the classic AI look)
2. Second-order defaults (the "tasteful" escape routes that became defaults)
3. Layout and structure
4. Components
5. Typography details
6. Motion
7. Imagery and icons
8. Copy and content
9. Craft floor (always required)

## 1. First-order defaults

- Purple/indigo/violet-to-blue gradients, especially on hero backgrounds → a palette derived from the brand's world; flat colour fields.
- Gradient text (`background-clip: text`) on headlines → solid colour; get emphasis from scale, weight or position.
- Inter / Roboto / Arial / Open Sans / system UI as the voice of the brand → a face with character tied to the DNA. (System stacks are fine for utility text when chosen on purpose.)
- Untouched framework palettes (Tailwind slate/indigo, shadcn zinc) → custom properties from the DNA.
- `rounded-2xl` + soft grey shadow on every surface → one shape language from the DNA; often no shadow at all.
- Glassmorphism / frosted blur as decoration → only if the brand world is literally glass/air.
- Neon glow, blurred colour blobs, aurora backgrounds → a texture or ground that comes from a reference.
- Dark mode with a single electric accent "because it looks techy" → choose light/dark from the story.

## 2. Second-order defaults

These look "designed" but are now as common as the purple gradient. Using one needs a DNA reason.

- Cream/beige ground + terracotta or burnt-orange accent (e.g. #D97757 family).
- Near-black (#0B0B0B / #111) + acid green, lime or vermilion accent.
- Editorial broadsheet look: hairline rules, zero radius, serif display + mono labels.
- Tracked ALL-CAPS mono "eyebrow" labels above every heading.
- One accented word in each headline (colour or italic serif).
- Italic serif display headline as instant "elegance".
- Numbered section markers 01 / 02 / 03 when nothing is a sequence.
- Middle-dot meta strings ("Design · Code · Strategy") and "WORD — fragment" labels with spaced dashes.
- Fake browser/window chrome (three dots) around screenshots.
- Grain/noise overlay on everything; decorative grid or graph-paper background.
- Emerald/teal as the "safe non-purple" accent.
- Pulsing status dot ("Available for work"), blinking cursor.
- Trailing arrows on every link (→).

## 3. Layout and structure

- The stock sequence: centred hero → logo strip → 3 feature cards → testimonials → pricing → CTA → footer → derive sections from the content and main action in the story.
- Pill badge above a centred hero headline ("✨ New: …") → if there is news, give it a real place.
- Everything centred → choose an alignment logic in the DNA (left edge, asymmetric, a strong axis).
- Identical rhythm: every section same height, same padding, same layout → vary density with purpose; let one section be the loud one.
- Bento grid because it's trendy → only when content really is many small equal-weight items.
- Hero split 50/50 text-left image-right by habit → decide what the first screen must say.
- Nested cards (card inside card inside section card) → at most one container level; use space and rules.
- Hero metric template ("10k+ users · 99.9% uptime · 24/7 support") → only real numbers that matter to this audience.

## 4. Components

- Icon in a rounded square + heading + two lines, repeated ×3/×6 → show the actual thing (photo, example, list, number) or write it as prose.
- Coloured left border (> 1px) on cards/callouts as decoration.
- Hard offset shadows (`4px 4px 0 #000`) outside a deliberately neo-brutalist DNA.
- Testimonial carousel, auto-rotating tabs, sliders → static, readable content; only real quotes.
- Three-column pricing table with a "Most popular" ribbon when there are no plans → only if pricing exists.
- Modal pop-ups for things that don't need interruption.
- Default form styling or the same rounded input from every UI kit → style forms in the DNA's shape language.
- Generic "Get started" / "Learn more" buttons → verbs from the main action ("Call the shop", "See tour dates").

## 5. Typography details

- Very tight negative tracking on everything (< −0.04em).
- Display text set in Impact / Arial Black / system bold as "bold".
- Three or more fonts without reasons.
- All text the same weight range (400–600) so nothing has contrast.
- Body text under 16 px, or lines longer than ~80 characters.
- Unnecessary small labels above every block.

## 6. Motion

- Fade-and-slide-up on every section and card as you scroll → one orchestrated moment (often on load) or motion that means something.
- Hover lift + shadow on every card.
- Count-up number animations; bouncy/elastic easing by default.
- Parallax on text, scroll-jacking, auto-playing marquees with no purpose.
- Ignoring `prefers-reduced-motion`.

## 7. Imagery and icons

- Emoji or Unicode glyphs used as icons (✨🚀⚡).
- The default Lucide/Heroicons set in every slot → fewer icons; or a set that matches the DNA's line weight; or none.
- Abstract 3D blobs, isometric illustrations, generic AI-generated people → the person's real photos, typographic treatments, or clearly marked placeholders.
- Stock photos of handshakes, laptops, people pointing at screens.
- Sketchy/hand-drawn SVG scenes faked with filters (feTurbulence) when the brand isn't hand-made.
- Drawn look-alikes of real logos; initials in a circle as a fake logo.

## 8. Copy and content

- "Elevate", "Seamless", "Unlock", "Empower", "Revolutionize", "Next-level", "Supercharge", "In today's fast-paced world".
- Forced contrast slogans: "Not a feature. A platform." / "Less X. More Y."
- Em-dash overuse; every sentence a fragment.
- Invented testimonials, customer counts, ratings, awards, "Trusted by" logos → only real ones; otherwise a marked placeholder.
- Copy that would fit any company → copy in the person's voice with their specifics (place, year, product, people).

## 9. Craft floor (always required)

Not tells — the minimum quality every page must reach regardless of style.

- Text contrast ≥ 4.5:1 (≥ 3:1 for large text and UI boundaries).
- Visible `:focus-visible` styles; keyboard reachable; real `<a>`/`<button>` elements.
- No horizontal scroll at 360 px; tap targets ≥ 44 px.
- `prefers-reduced-motion` honoured.
- Hover, focus, active, disabled, empty and error states exist where relevant.
- Fonts load with a fallback that doesn't wreck the layout (`font-display: swap`, matching fallback).
- Images have dimensions and `alt`; page has a `<title>`, meta description, `lang`, favicon.
- Selection colour, scrollbars and form controls themed or deliberately left native — not forgotten.
