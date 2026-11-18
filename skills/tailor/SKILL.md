---
name: tailor
description: Tailor-made websites instead of off-the-rack AI templates. Takes the person's own story about the site, optional reference images (posters, banners, screenshots, photos) and the things they dislike, distills them into a STYLE-DNA.md, then builds the site from that file and checks it for AI slop with screenshots. Use this whenever someone wants to design, build or redesign a website, landing page, portfolio, shop or product page and cares that it feels unique, on-brand, "not AI-made" or "not a template" — and whenever they bring a poster, banner, moodboard or a site they like and want a website in that spirit, even if they never say "design system". Also use for "/tailor audit <path or url>" to review an existing site that looks generic.
---

# Tailor

Off-the-rack AI websites look alike because every unanswered design question gets the statistically
most likely answer: Inter, a purple gradient, a centred hero, three feature cards. Banning those
defaults is not enough — the "tasteful" escape routes (cream + terracotta, black + acid green, mono
all-caps labels) have become defaults too.

Tailor works like a tailor, not a shop with S/M/L:

1. **Fitting** — listen to the person's story, look at what they bring, hear what they hate.
2. **Pattern** — write it all into `STYLE-DNA.md`, the single source of every design decision.
3. **Cut** — plan the page so every visual decision points back to a line in the DNA.
4. **Sew** — build it.
5. **Try-on** — screenshot it, check it against the DNA and the slop catalog, fix, repeat.

The core idea that makes this work: **slop is an unchosen default.** A pattern is not wrong because it
appears on a list; it is wrong when nothing in the DNA asked for it. A one-word red accent in a
headline is a cliché on a random SaaS page and a signature on a brand that chose it on purpose.

## Modes

- `/tailor` or any request to make a site → full flow below.
- `/tailor audit <path|url>` → skip to step 5 on an existing site. If there is no STYLE-DNA.md, write
  a short "found DNA" from what the site already does, then judge against it and the catalog.
- If a `STYLE-DNA.md` already exists in the project, read it and continue from wherever the work is
  (new page, revision). Every page of one site shares one DNA; do not write a second one.

Talk to the person in their language. Files you write for the site (DNA, code comments) can be in
English unless they prefer otherwise.

## 1. Fitting — collect the story

Read `references/intake.md` and send the intake message described there. In short: ask for a free,
spoken-style story of the site (with 2–3 short example stories so they know what "a story" means),
and mention two optional extras: reference images and things they dislike.

Why a story and not a questionnaire: five multiple-choice questions produce a few hundred
combinations, and sites made from them converge again. A person's own story — "my father has run
this hardware shop since 1985, it should feel trustworthy, wooden shelves, hand-written labels" — is
different every time, and it carries the facts, the audience and the mood in one go.

After the story arrives, ask **only about real gaps** (at most three short questions, in one
message): typically the main action a visitor should take, the real content that exists (menu,
prices, projects, photos) and anything the story left ambiguous. If the story already covers it,
ask nothing and move on.

If there is a logo, ask for the best version that exists (SVG/PDF, or at least a large PNG) in the
same message. Tracing a mark from a small JPG goes wrong easily, and the logo is the one thing the
client will check pixel by pixel.

If the person has an existing site, read all of it: it is the content source (and a useful "before"
picture), not a design reference.

## 2. Read the references

If they sent images or links, read `references/reading-references.md` before looking at them. Take
the **DNA, not the surface**: colour roles and proportions, type character, composition, texture,
shape language, era and mood. Several references → what repeats across them is the taste, what
differs is noise. A poster is a starting point, not a mock-up: its colours and attitude survive, its
layout gets translated for a scrolling, phone-sized, readable page (the file has the translation
rules). Never copy a reference's artwork, logo, copy or exact layout.

No references? Fine — the story and cultural comparisons ("feels like an old pharmacy",
"a Wes Anderson film", "80s city-pop album cover") are enough. The same file explains how to turn
those into concrete choices.

### Look at the neighbours (recommended for business sites)

Skim 3–6 sites from the same industry, local and global. You are not looking for a style to borrow —
you are looking for (a) the page set and content visitors of this industry expect, (b) the
industry's own clichés (every sector has them: the "20+ years experience" counter, the stock
handshake, the logo wall), and (c) one or two ideas worth adapting. Write the findings into the DNA
so they are traceable like everything else.

## 3. Write STYLE-DNA.md

Copy the structure of `references/style-dna-template.md` into the project root as `STYLE-DNA.md` and
fill it in. Every choice gets a short *because* that points to the story, a reference or a dislike.

Choosing type and colour: derive them from the brand's world, not from your favourites. Before you
settle, read the "second-order defaults" section of `references/tells.md` — if your pick is on it,
you need a reason from the DNA, otherwise choose again. Prefer typefaces that are free to use on the
web (Google Fonts, Fontshare, or system stacks chosen on purpose) and name a fallback.

Then **show the person a short summary** (concept sentence, palette, type, 3–4 rules, what is
deliberately avoided) and ask whether it feels like them. This is the one checkpoint worth a pause:
fixing a wrong direction here costs a minute, after the build it costs the whole page. Adjust the
DNA with their answer before building.

## 4. Cut — plan with traceability

Read `references/tells.md` in full now. Then write a short build plan (in the conversation or at the
bottom of STYLE-DNA.md under "Build notes"):

- the site map: one page or several. Don't default to a single long page. A business with distinct
  audiences or content (products, services, team, contact) usually needs separate pages, and its
  visitors expect them; a one-off event or a personal card may be one page. Decide from the content
  and the industry, and write down why;
- the sections of each page, in order, each with its job — derived from the story's content and main
  action, not from the standard hero → features → testimonials → pricing → CTA sequence;
- a decision table: each visual decision (layout of each section, type sizes, colour use, imagery,
  motion, components) with the DNA line it comes from.

Any decision you cannot trace to the DNA is a default. Replace it with something the DNA supports,
or add the reason to the DNA if the person's material really implies it. This step is where most
slop is prevented, so do it honestly rather than filling the column with vague sources like "modern".

## 5. Sew — build

- Use the project's existing stack if there is one. In an empty folder, build plain HTML + CSS + a
  little JS: no build step, easy to read, and free of framework defaults (Tailwind/shadcn defaults
  are a big source of sameness). Put DNA values in CSS custom properties at the top of the stylesheet.
- Content must be true. Use the person's real text, names and facts. Where something is missing,
  write a clearly marked placeholder (`[menu prices — to be filled]`) instead of inventing reviews,
  customer counts, awards or quotes. Invented social proof is both dishonest and a strong slop tell.
- Images: use what the person gave you. Otherwise prefer typographic, illustrative-by-CSS or clearly
  marked placeholder treatments over random stock photos; never fake a product photo.
- Accessibility is part of the craft, not a later pass: text contrast ≥ 4.5:1 (3:1 for large text),
  visible `:focus-visible`, real buttons and links, `prefers-reduced-motion` respected, body text
  ~60–75 characters per line, works at 360 px wide without horizontal scroll.

## 6. Try-on — check and fix

Read `references/critique.md` and follow it. In short:

1. Screenshot the page at phone, tablet and desktop widths. Use
   `node <this skill's folder>/scripts/shoot.mjs <file-or-url> <output-folder>` (zero dependencies,
   uses an installed Chrome or Edge), or a browser tool if one is available in the session.
2. Look at the screenshots yourself — do not judge the page from its source code alone.
3. Run the checks in critique.md: DNA fidelity, the swap-the-logo test, the silhouette test, the tell
   scan, the reference side-by-side, and the craft basics.
4. Fix what fails and shoot again. Stop after three rounds; whatever is still open goes into the
   report rather than being hidden.

## 7. Report

Tell the person, briefly and in their language:
- where the files are and how to open the page;
- the concept in one sentence and the 3–4 decisions that make this site theirs;
- placeholders they need to fill and any assumptions you made;
- anything from the try-on that is still open.

Then invite them to react to what they see — the next round of the fitting usually comes from
"this part doesn't feel like me", and the DNA is the place to record what they say.
