# Design: IVPN-style light theme

_Written 23 November 2026 for branch `redesign/ivpn-light-theme`. Describes what is built in `src/`. Values sampled from a screenshot of the ivpn.net home page supplied by the team._

## 0. How this file relates to the others

`design.md` is still the spec for **content, page structure and data**. `design-webflow-theme.md` described the dark Webflow-template look. **This file replaces that visual layer** (colours, type scale, radii, nav, footer, hero background). The animation system in `design-webflow-theme.md` section 6 is unchanged, except the nav now fades in without scaling (it is a full-width bar).

**Decision needed from admins:** merge this into `design.md` and update `AGENTS.md` sections 4 and 7.2, or keep it separate. Not merged automatically because `design.md` outranks everything except `security.md`.

## 1. What was taken from the reference (ivpn.net home page)

Colours were sampled from the supplied PDF screenshot. IVPN's CSS was not reachable.

| Observed on ivpn.net                                                  | Applied here                                                             |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| White page, `#F2F2F2` grey bands, `#222226` text, black bold headings | Same values (`page`, `alt`, `text`, `heading`)                           |
| Monospace type everywhere                                             | JetBrains Mono Variable (already a dependency; no new font added)        |
| Square corners on buttons and tags                                    | All radius tokens are 0                                                  |
| No cards: text blocks under a short rule                              | `.card` is a plain block with a 4.5rem top rule that turns blue on hover |
| Sky-blue `#449CF8` primary button, grey secondary button              | `btn-primary` blue fill, `btn-secondary` `#F2F2F2` fill                  |
| Plain white top bar, logo left, links, one button                     | Full-width sticky bar, thin bottom border                                |
| Dark charcoal footer `#222226` with blue links                        | `footer` token, light grey text, white on hover                          |

## 2. Accessibility adaptations (where IVPN's own values fail WCAG AA)

| Pair                    | Ratio | Decision                                                                     |
| ----------------------- | ----- | ---------------------------------------------------------------------------- |
| White on `#449CF8`      | 2.85  | Not used. Button text is `#222226` on `#449CF8` (5.55)                       |
| `#449CF8` text on white | 2.85  | Not used for text. `accent-text` `#1764C0` (5.8 on white, 5.18 on `#F2F2F2`) |
| `#449CF8` on `#222226`  | 5.55  | Fine, used for footer-style accents                                          |

## 3. Tokens (`src/styles/global.css`, `@theme`)

`page`/`surface` `#FFFFFF`; `alt`/`band` `#F2F2F2`; `footer` `#222226`; `footer-text` `#C8C8CC`; `line` `#E3E3E3`; `line-strong` `#D7D7D8`; `heading` `#000000`; `text` `#222226`; `muted` `#3F3F44`; `faint` `#6B6B72`; `accent` `#449CF8`; `accent-hover` `#5BA8F8`; `accent-text` `#1764C0`; `accent-dim` `#BDDCFC`; `accent-10` `#E8F1FD`; `accent-20` `#DCE7F2`; `on-accent` `#222226`. No hex values in components.

## 4. Typography and shape

Body 0.9375rem / 1.8, weight 400. Headings bold, `-0.02em` tracking: h1 `clamp(2rem, 4.5vw, 3.25rem)`, h2 `clamp(1.5rem, 3vw, 2rem)`, h3 1.0625rem, h4 1rem. Container max 1100px. Buttons min height 44px, bold, square. CTA block is a flat grey band. Hero has no gradient.

## 5. Components touched

`global.css`, `Navbar` (flat bar), `Footer` (dark), `ProductCard` and pages (token renames, removal of rounded/bordered boxes), `Layout` (skip link), `animations.ts` (nav fades, no scale).

## 6. Not done

| Item                                                            | Why                                                                                     |
| --------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Dark mode toggle                                                | Light only requested; tokens are semantic so a dark set can be added                    |
| Hero product image, IVPN-specific widgets (IP status bar, etc.) | No approved artwork or content; nothing invented                                        |
| Blue round bullet lists, centred section titles                 | Current content has no bullet lists; section titles remain left-aligned. Easy follow-up |

## 7. Verification status

**Run** (built site, Google Chrome, 23 Nov 2026): `astro build`, `astro check` (0 errors, 0 warnings), Prettier on `src/`; axe-core on Home, Solutions and About with reduced motion: no violations (with motion on, axe reports contrast hits that are most likely mid-fade, not isolated); no console errors at 1280px and 390px; Home screenshot reviewed at desktop.

**Not run:** Lighthouse, repo Playwright suite, keyboard walkthrough, CSP build, 768px, screenshots of other pages.
