# Design: Webflow template theme and animations

_Written 5 November 2026 for branch `redesign/webflow-template-theme`. Describes what is built in `src/`, not a wish list._

## 0. How this file relates to `design.md`

`design.md` is still the spec for **content, page structure and data** (sections 6, 7, 11, 12). This file replaces its **visual layer** wherever they disagree:

| `design.md` section                         | Status                                                                                                                                                                                    |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 3, 4 (principles, tokens, type, layout)     | Replaced by sections 2 to 4 below. Palette, type and shapes changed.                                                                                                                      |
| 5 (components)                              | Partly replaced by section 5 below.                                                                                                                                                       |
| 8 (animation spec)                          | Replaced by section 6 below. The template's scroll sequence is used instead of `data-reveal`, `data-stagger` and `data-hero`. Count-up and diagram draw-in are **not built** (section 9). |
| `AGENTS.md` "case-file look, mono eyebrows" | No longer true. Eyebrows are Inter. `@fontsource-variable/jetbrains-mono` is still in `package.json` but unused.                                                                          |

**Decision needed from admins:** merge this file into `design.md` (and update `AGENTS.md` sections 4 and 7.2), or keep it as a separate file. It was not merged automatically because `design.md` outranks everything except `security.md`.

## 1. Source of the design

The look comes from the Webflow template project "Ansh Tech Labs" (site id `6ad33c3aa34359e751994a59`), read through the Webflow connector: its **Colors**, **Typography**, **Sizes** and **Interactions** variable collections, plus two interaction timelines ("Nav on page load", "All sections on scroll").

Not available to the build: the template's page layouts (the preview URL blocks automated access). Section layouts follow `design.md` section 7. Where the template's own values were not readable, this file says so.

## 2. Colour tokens

Defined in `src/styles/global.css` under `@theme`. Token names from the old theme are kept (so existing classes still work); only the values changed. **No hex values in components.**

| Token                     | Value                    | Template variable        | Use                                     |
| ------------------------- | ------------------------ | ------------------------ | --------------------------------------- |
| `ink-950`                 | `#09090B`                | Neutral Primary          | Page background                         |
| `ink-900`                 | `#101013`                | Neutral Secondary        | Cards, nav surface                      |
| `ink-800`                 | `#101013`                | Neutral Secondary        | Alternate section bands                 |
| `band`                    | `rgb(40 178 191 / 10%)`  | Accent Primary A10       | CTA band                                |
| `line`                    | `rgb(243 243 243 / 10%)` | Border Primary           | Default 1px borders, dividers           |
| `line-strong`             | `rgb(243 243 243 / 20%)` | Border Secondary         | Tag borders                             |
| `text`                    | `#F3F3F3`                | Neutral Inverse          | Headings, primary text                  |
| `muted`                   | `#F3F3F3` at 60%         | Text Secondary           | Body copy. **Use this on the band.**    |
| `faint`                   | `#F3F3F3` at 50%         | Neutral Inverse A50      | Small index numbers                     |
| `cyan`                    | `#28B2BF`                | Accent Primary           | Primary button fill                     |
| `cyan-hover`              | `#4BCDD9`                | Accent Primary Hover     | Button hover, focus ring, link hover    |
| `cyan-text`               | `#46BBC7`                | Text Accent On Primary   | Eyebrows, active nav link, card labels  |
| `cyan-dim`                | `rgb(40 178 191 / 40%)`  | Accent Primary A40       | Card hover border, lit pipeline step    |
| `accent-10` / `accent-20` | accent at 10% / 20%      | Accent Primary A10 / A20 | Secondary button fill (default / hover) |

The template's secondary and tertiary accents are `transparent`, so the site has **one** accent colour.

### Contrast (computed, WCAG 2.1)

| Text        | on `ink-950` | on `ink-900` | on `band` |
| ----------- | ------------ | ------------ | --------- |
| `text`      | 17.9         | 17.1         | 16.0      |
| `muted`     | 6.7          | 6.6          | 6.4       |
| `faint`     | 4.9          | 4.9          | 4.8       |
| `cyan-text` | 8.7          | 8.3          | 7.8       |

Buttons: dark text (`ink-950`) on `cyan` is **7.8:1** and on `cyan-hover` **10.5:1**. Secondary button text is 13.5:1.

**Deviation from the template:** the template sets button text to `#F3F3F3` on `#28B2BF`, which is only **2.3:1** and fails AA. The build uses dark text on the primary button instead.

## 3. Typography

One family: **Inter Variable**, self-hosted via Fontsource. No monospace.

| Role           | Size                            | Weight | Line height | Tracking | Template value |
| -------------- | ------------------------------- | ------ | ----------- | -------- | -------------- |
| `h1`           | `clamp(2.5rem, 7vw, 5.65rem)`   | 500    | 1.04        | -0.01em  | H1 5.65rem     |
| `h2`           | `clamp(1.875rem, 4vw, 2.83rem)` | 500    | 1.04        | -0.01em  | H2 2.83rem     |
| `h3`           | `clamp(1.375rem, 2.5vw, 2rem)`  | 500    | 1.04        | -0.01em  | H3 2rem        |
| `h4`           | `1.41rem`                       | 500    | 1.3         | -0.01em  | H4 1.41rem     |
| Body           | `1rem`                          | 400    | 1.6         | 0        | Base           |
| Lead paragraph | `text-lg` / `text-xl`           | 400    | 1.6         | 0        | Text LG / XL   |
| `.eyebrow`     | `0.9rem`                        | 400    | 1.3         | 0.01em   | Eyebrow        |
| `.tag`         | `0.75rem`                       | 400    | n/a         | 0        | Tag            |

The clamps on `h1` to `h3` are mine: the template has fixed sizes with Tablet and Mobile modes whose values were not read. Card titles override the size with `text-2xl`.

## 4. Layout, shape and spacing

| Item                | Value                                                      | Notes                                       |
| ------------------- | ---------------------------------------------------------- | ------------------------------------------- |
| `.container-site`   | max 1280px, side padding 1rem (1.5rem from `lg`)           | Template container 1280px                   |
| `.section`          | 4rem vertical, 6rem from `md`, 8rem from `xl`              | Template section padding 8rem               |
| Card radius         | 1rem (`radius-xl`)                                         | Padding 1.5rem, 2rem from `md`              |
| Button / tag radius | 0.75rem (`radius-lg`)                                      | Button padding `1em 1.5em`, min height 44px |
| Nav                 | Floating, `rounded-xl`, 4rem high, 10% border, blurred bg  | Sticky at top with 0.75rem (1rem) offset    |
| Grids               | 4-up collapses to 2-up at `md`, 1-up below; 3-up to 1-up   | 1.5rem gap                                  |
| Section alternation | `ink-950` and `ink-800` bands                              | Near-identical colours, so a subtle step    |
| Hero glow           | `.hero-glow`: radial accent gradient at 20% to transparent | Behind the hero on every inner page         |

## 5. Components

| Component / class     | Where                          | Behaviour                                                                                                                                                                                                                                              |
| --------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Navbar**            | `components/Navbar.astro`      | Wordmark text "Ansh Tech Labs", four links (from `site.nav`), primary "Request a Demo" button. Active link `text-cyan-text` with `aria-current="page"`. Below `md`, a 44px menu button (`aria-expanded`, `aria-controls="mobile-menu"`) opens a panel. |
| Mobile menu logic     | `scripts/nav.ts`               | Toggle on click. **Escape** closes and returns focus to the button. Clicking a link closes it.                                                                                                                                                         |
| **Footer**            | `components/Footer.astro`      | Brand and tagline, Solutions (from `solutions.ts`), Company (About, Contact, Privacy), divider, copyright and motto. Column titles are `h2` (not `h4`) so heading order passes axe.                                                                    |
| **ProductCard**       | `components/ProductCard.astro` | Whole card is the link (the title link stretches with `after:absolute after:inset-0`). Shows category, `01` to `04` index, name, blurb, "Explore solution ↗".                                                                                          |
| `.btn` `.btn-primary` | global                         | Teal fill, dark text, hover `cyan-hover`.                                                                                                                                                                                                              |
| `.btn-secondary`      | global                         | `accent-20` fill, light text, hover `accent-10`.                                                                                                                                                                                                       |
| `.card`               | global                         | Hover **and** `:focus-within`: border to `cyan-dim`, lift 2px. Lift is removed under reduced motion.                                                                                                                                                   |
| `.tag`                | global                         | 0.75rem pill-ish label, 20% border.                                                                                                                                                                                                                    |
| `.divider`            | global                         | 1px line in `line`.                                                                                                                                                                                                                                    |
| `[data-step]`         | global                         | Pipeline card; `.is-lit` swaps its border to `cyan-dim` (0.4s transition).                                                                                                                                                                             |
| CTA band              | inline in Home and Solutions   | `rounded-xl border border-line bg-band`, text left, buttons right from `lg`.                                                                                                                                                                           |
| Skip link             | `layouts/Layout.astro`         | "Skip to content" shown on focus, targets `#main`.                                                                                                                                                                                                     |

## 6. Animation system

All animation is in `src/scripts/animations.ts`, loaded once from `Layout.astro`, using GSAP, ScrollTrigger and SplitText inside `gsap.matchMedia()`. Only `transform`, `opacity` and `visibility` are animated.

### 6.1 Hooks (put these attributes on elements)

| Attribute                     | Meaning                                                                             | Animation                            |
| ----------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------ |
| `data-nav`                    | The nav bar                                                                         | Load scale-in                        |
| `data-ix="eyebrow"`           | Small label above a heading, breadcrumb                                             | Fade and scale 0.9 to 1              |
| `h1`, `h2`, `data-ix="lead"`  | Headings and lead paragraphs that are **not** inside a card or `large`/`small` item | Word-by-word fade and scale 0.9 to 1 |
| `data-ix="large"`             | Cards, grids, footer columns, CTA band, paragraphs                                  | Fade and scale 0.9 to 1, staggered   |
| `data-ix="small"`             | Button groups, trust-row items, inline links                                        | Fade and scale 0.8 to 1, staggered   |
| `data-ix="divider"`           | Rules                                                                               | Fade                                 |
| `data-pipeline` + `data-step` | A row of numbered steps                                                             | Steps light up one after another     |

Scope: every `.section` and the footer (`.footer-section`) gets its own timeline.

### 6.2 Timings (taken from the template's "All sections on scroll")

| Step               | Start              | Duration      | Stagger     | From                        | Ease         |
| ------------------ | ------------------ | ------------- | ----------- | --------------------------- | ------------ |
| Eyebrows           | 0 s                | 0.8 s         | 0.8 s total | opacity 0, scale 0.9        | `power2.out` |
| Headings and leads | 0 s                | 0.8 s         | 0.8 s total | opacity 0, scale 0.9        | `power2.out` |
| Large elements     | 0.6 s              | 0.7 s         | 0.15 s each | opacity 0, scale 0.9        | `power2.out` |
| Small elements     | 0.6 s              | 0.7 s         | 0.15 s each | opacity 0, scale 0.8        | `power2.out` |
| Dividers           | 1.2 s              | 0.75 s        | none        | opacity 0                   | `power1.out` |
| Pipeline step _n_  | 1 s + _n_ × 0.35 s | instant class | n/a         | n/a (border colour via CSS) | n/a          |

- **Trigger:** section top reaches 80% of the viewport (pipeline rows: 75%). Plays **once**, never reverses.
- **Nav on load:** opacity 0 and scale 0.9 to 1, 0.6 s, **0.3 s delay**. The template waits 1.2 s because its hero intro plays first; that was shortened so the navigation is not invisible for over a second.
- After a large or small element finishes, GSAP's inline styles are cleared (`clearProps`) so the CSS card hover lift keeps working.

### 6.3 Safety rules

- **Reduced motion:** the whole system is inside `(prefers-reduced-motion: no-preference)`. Otherwise nothing runs and everything is shown in its final state. If the preference flips on, the word wrappers are reverted.
- **No JavaScript:** GSAP only sets the hidden start state when it runs (`gsap.from`), so content is visible without JS.
- **Screen readers:** SplitText keeps an `aria-label` on real headings; for `<p>` leads the label is switched off, because `aria-label` on a paragraph is invalid.
- **CSP:** the script is bundled as an external module. No inline script, handler or style is emitted.

## 7. Per-page design and animation

Every page ends with the footer, which animates as: three columns (`large`, staggered), then the divider.

### 7.1 Home `/`

| #   | Section                           | Contents                                                      | Animation order                                                               |
| --- | --------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| 1   | Hero (`hero-glow`)                | Eyebrow, h1, lead, two buttons                                | Eyebrow, then h1 and lead word by word, buttons at 0.6 s                      |
| 2   | Trust row                         | Divider, three items, divider                                 | Three items stagger at 0.6 s, dividers fade at 1.2 s                          |
| 3   | 01 Who we serve                   | Eyebrow, h2, lead, two audience cards with tags               | Eyebrow, h2 and lead words, cards stagger at 0.6 s                            |
| 4   | 02 Solution portfolio (`ink-800`) | Eyebrow, h2, four `ProductCard`s                              | Eyebrow, h2 words, four cards stagger                                         |
| 5   | 03 Signal to evidence             | Eyebrow, h2, lead, four numbered step cards (`data-pipeline`) | Eyebrow, h2 and lead, cards stagger, then each lights teal 0.35 s apart       |
| 6   | CTA band                          | Eyebrow, h2, body, two buttons, as one `large` block          | Block scales in (its h2 is **not** word-split because it sits inside `large`) |

### 7.2 Solutions `/solutions/`

| #   | Section                           | Contents                                                     | Animation order                |
| --- | --------------------------------- | ------------------------------------------------------------ | ------------------------------ |
| 1   | Hero                              | Eyebrow, h1, lead                                            | Eyebrow, then words            |
| 2   | `#law-enforcement`                | h2 "For Law Enforcement", cards filtered by audience         | h2 words, cards stagger        |
| 3   | `#corporate-security` (`ink-800`) | h2, cards filtered by audience, "Talk to us." line (`small`) | h2 words, cards, then the line |
| 4   | CTA band                          | h2 and primary button                                        | Block scales in                |

The two anchors use `scroll-mt-24` so the sticky nav does not cover the heading. Home links to them.

### 7.3 Solution detail `/solutions/[slug]/` (four pages, one template)

| #   | Section                  | Contents                                                      | Animation order                                    |
| --- | ------------------------ | ------------------------------------------------------------- | -------------------------------------------------- |
| 1   | Hero                     | Breadcrumb link, eyebrow, h1 (product name), sub, two buttons | Breadcrumb and eyebrow, h1 and lead words, buttons |
| 2   | Challenge / Core focus   | Two cards                                                     | Cards stagger                                      |
| 3   | Capabilities (`ink-800`) | h2, one card per capability (from `solutions.ts`)             | h2 words, cards stagger                            |
| 4   | Workflow                 | h2, one numbered card per step (`data-pipeline`)              | h2 words, cards stagger, steps light up            |

### 7.4 About `/about/`

| #   | Section                     | Contents                        | Animation order                            |
| --- | --------------------------- | ------------------------------- | ------------------------------------------ |
| 1   | Hero                        | Eyebrow, h1, lead               | Eyebrow, then words                        |
| 2   | 01 Our mission (`ink-800`)  | Eyebrow, h2, large lead         | Eyebrow, h2 and lead words                 |
| 3   | 02 Expertise                | Eyebrow, h2, three cards        | Eyebrow, h2 words, cards                   |
| 4   | 03 Who we serve (`ink-800`) | Eyebrow, h2, two cards          | Eyebrow, h2 words, cards                   |
| 5   | 04 How we work              | Eyebrow, h2, lead, closing note | Eyebrow, h2 and lead words, note scales in |

### 7.5 Contact `/contact/`

Hero (eyebrow, h1, lead), then one card holding the "form disabled" note, Email and Location. The form itself stays disconnected (`AGENTS.md` rule 4). Animation: eyebrow, h1 and lead words, then the card scales in.

### 7.6 Privacy `/privacy/`

Hero (eyebrow "Legal", h1, "Last updated" line), then five text blocks in a 56rem column. Each block is one `large` item, so they scale in one after another; their h2s are not word-split.

### 7.7 404

Eyebrow "404", h1 "Page not found", one "Go to Home" button (`small`). Plays on load because the section is already in view.

## 8. Accessibility behaviour

- One `h1` per page; heading levels do not skip (footer titles and Contact labels are `h2`).
- Skip link, `aria-current` on the active nav link, 44px touch targets on buttons and the menu toggle.
- Visible focus: 2px `cyan-hover` outline, 3px offset, on every focusable element.
- Mobile menu is keyboard-operable: button, Escape to close, focus returns to the button.
- Reduced motion removes all animation and the card hover lift; smooth scrolling is also turned off.

## 9. Not built (still in `design.md`, deliberately left out)

| Item                                              | Why                                                                        |
| ------------------------------------------------- | -------------------------------------------------------------------------- |
| Home hero diagram, SVG draw-in, centre-node pulse | Needs the diagram artwork. Spec in `design.md` 8.4.                        |
| Count-up stats row                                | Spec says only verifiable figures may be shown; none supplied yet.         |
| Partner strip                                     | Verified logos with written permission only (`AGENTS.md` rule 1).          |
| Demo form UI and states                           | Phase 4 of `design.md` 11; provider not approved.                          |
| Per-product diagrams on `[slug]`                  | `solutions.ts` has a `diagram` field, but no diagram components exist yet. |
| Template icons and imagery                        | Not read from the template; the site uses text and borders only.           |

## 10. Verification status

**Run** (against the built site, Chromium, 5 November 2026):

- `npm run build`, `astro check` (0 errors, 0 warnings) and `prettier --check` pass.
- Home, Solutions, a product page, About, Contact, Privacy and 404: axe-core reports **no violations** at 1280px; no console errors; no requests outside the site; no horizontal scroll at 1280px and 390px.
- After scrolling a whole page, no animated element is left hidden. With reduced motion on, nothing is hidden and no word wrappers exist.
- Mobile menu opens and closes with Escape.
- No inline `<script>`, `<style>` or `style=` in the built HTML.
- Screenshots were reviewed for Home only (desktop and mobile).

**Not run:**

- Lighthouse (the `AGENTS.md` target is 95+).
- The repo's own Playwright suite.
- A build with the CSP meta tag (the layout does not have one yet).
- The 360px and 768px width checks, and a full keyboard-only walkthrough.
- A visual side-by-side with the template. Timings were copied from the template's interaction data; the ease is an assumption (the template stores it as `ease: 2`, mapped here to `power2.out`; its second timeline uses `ease: 1`, mapped to `power1.out`).

## 11. Open items

1. Merge this file into `design.md`, or keep it separate (section 0).
2. Update `AGENTS.md` sections 4 and 7.2, which still describe the old mono "case-file" look.
3. Read the template's Tablet and Mobile type modes and replace the `clamp()` values with them.
4. Supply diagram artwork, verified stats and partner permissions to unlock section 9.
5. Run the "Not run" checks above before the pull request is approved.
