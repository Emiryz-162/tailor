# Try-on — checking the built page

Judge the page from screenshots, the way a person meets it, not from the source code. Code review
misses what matters most here: proportions, rhythm, whether it *feels* like the story.

## 1. Shoot

```
node <skill-folder>/scripts/shoot.mjs <index.html or http://url> <output-folder>
```

Produces full-page PNGs at 390 (phone), 768 (tablet) and 1440 (desktop) wide. Options:
`--widths 360,1024` to change widths, `--wait 1500` to give fonts/animations more time (ms).
If the script can't find a browser, set `BROWSER_PATH` to a Chrome/Edge/Chromium executable, or use
a browser/screenshot tool available in the session instead.

Open and look at every screenshot. Write down what you actually see before checking anything.

## 2. Checks

Run all six. For each, note PASS / FIX with a one-line reason.

1. **DNA fidelity** — reread STYLE-DNA.md. Is each colour used in its role and roughly its share? The
   fonts as specified? The composition rules visible? Is the Signature actually present and noticeable
   on the first screen or close to it?
2. **Swap-the-logo test** — mentally replace the name and logo with a different business in the same
   industry. If the page still works unchanged, it is generic. The fix lives in the story's specifics:
   facts, sensory details, voice, the signature.
3. **Silhouette test** — squint (or imagine every block as a grey rectangle). Is the layout shape the
   stock template (centred hero, three equal cards, repeat)? A tailored page has a silhouette shaped
   by its content.
4. **Tell scan** — go through `tells.md` sections 1–8 against the screenshots *and* the CSS. Ignore
   items the DNA explicitly allows. Also grep the code for quick hits: `background-clip: text`,
   `backdrop-filter`, `Inter`, `rounded-2xl`, `shadow-lg`, gradient stops in violet/indigo, emoji in
   headings/buttons, and the copy words in section 8.
5. **Reference side-by-side** — if there were reference images, put them next to the desktop shot.
   Does the page carry the hook the person fell for? Does it accidentally copy layout or artwork?
6. **Craft floor** — tells.md section 9. Check contrast with real values, check the 390 px shot for
   overflow, cramped text, tiny tap targets, broken wrapping of the big headline.

## 3. Fix loop

Fix the FIX items, highest impact first (things a layperson would notice before things only a
designer would). Shoot again and recheck. Stop after three rounds. If something stays open, it goes
into the report with the reason — an honest "the hero headline still wraps awkwardly on small
phones" is worth more than a silent compromise.

If a fix changes a design decision, record it under "Build notes" in STYLE-DNA.md with the date and why.

## 4. Score for the report (optional but useful)

Give a short scorecard the person can understand:

| Check | Result |
|---|---|
| Feels like your story | ✓ / partly / ✗ + one line |
| Could be anyone's site (swap test) | no / somewhat / yes |
| AI tells found | n (list the remaining ones) |
| Works on phone | ✓ / issues |
| Accessibility basics | ✓ / issues |
