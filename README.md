# Tailor

**Tailor-made websites instead of off-the-rack AI templates.**

AI-built sites look alike because every design question nobody answers gets the most likely answer:
Inter, a purple gradient, a centred hero, three feature cards. Ban those and you get the next
default — cream + terracotta, black + acid green, mono all-caps labels.

Tailor doesn't fight this with randomness. It starts from **you**:

1. **Fitting** — you tell the story of your site the way you'd tell a friend. Optionally add images
   you like (a poster, a banner, an album cover, any site) and things you don't want.
2. **Pattern** — Tailor turns that into a `STYLE-DNA.md`: concept, colours, type, composition,
   voice and a signature, each with a *because*.
3. **Cut** — every visual decision must point back to a line in the DNA. A decision with no reason
   is a default, and gets replaced.
4. **Sew** — the site is built (plain HTML/CSS by default, or your existing stack).
5. **Try-on** — full-page screenshots at phone/tablet/desktop width, checked against the DNA, a
   merged catalog of AI "tells", the swap-the-logo test and accessibility basics. Up to three fix rounds.

> **Slop is an unchosen default.** A pattern isn't wrong because it's on a list — it's wrong when
> nothing about your brand asked for it.

## Install

**Claude Code (plugin):**

```
/plugin marketplace add Emiryz-162/tailor
/plugin install tailor@tailor
```

**Manual:** copy `skills/tailor` into `~/.claude/skills/tailor` (all projects) or
`.claude/skills/tailor` (one project).

**Claude.ai:** zip the `skills/tailor` folder and upload it under Settings → Capabilities → Skills.

## Use

```
/tailor                      start a new site
/tailor audit ./index.html   review an existing page
```

Or just say "I need a website for …" — the skill triggers on its own.

Screenshots need Node 22+ and an installed Chrome, Edge or Chromium (no npm install).

## What's inside

```
skills/tailor/
├── SKILL.md                        the workflow
├── references/
│   ├── intake.md                   how to ask for the story + example stories
│   ├── reading-references.md       extracting DNA from images, poster → web translation
│   ├── style-dna-template.md       the STYLE-DNA.md structure
│   ├── tells.md                    merged catalog of AI-design tells + craft floor
│   └── critique.md                 the try-on checks
└── scripts/
    └── shoot.mjs                   zero-dependency full-page screenshots
```

## Credits

The tell catalog builds on public work by Anthropic (frontend-design), Paul Bakaus (impeccable),
avoid-ai-design and taste-skill. Tailor's own additions: story-first intake, reference-image DNA,
DNA-aware slop checks and decision traceability.

## License

MIT
