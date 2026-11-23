# Design: IVPN-style light theme

_Written 23 November 2026 for branch `redesign/ivpn-light-theme`. Describes what is built in `src/`._

## 0. How this file relates to the others

`design.md` is still the spec for **content, page structure and data**. `design-webflow-theme.md` described the dark Webflow-template look. **This file replaces that visual layer** (colours, type scale, radii, nav, footer, hero background). The animation system in `design-webflow-theme.md` section 6 is unchanged, except the nav now fades in without scaling (it is a full-width bar).

**Decision needed from admins:** merge this into `design.md` and update `AGENTS.md` sections 4 and 7.2, or keep it separate. Not merged automatically because `design.md` outranks everything except `security.md`.

## 1. What was taken from the reference (ivpn.net)

Read on 23 Nov 2026 as page text only. The site's stylesheet, screenshots and images could not be fetched (shell requests to ivpn.net are blocked and the open-source repo was not reachable), so **no colour or font value was sampled from IVPN**. What was copied is the structure and character of the page:

| Observed on ivpn.net                                                           | Applied here                                                      |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| Plain top bar with logo left, text links, one call to action; no floating card | Full-width sticky bar, thin bottom border, white with slight blur |
| Left-aligned hero: short heading, one paragraph, one main button               | Same. Heading is smaller than the dark theme (max 3.75rem)        |
| Content-first sections, long plain-text blocks, few decorations                | Flat white cards, thin borders, no shadows, no glow orbs          |
| Light and dark variants of every image                                         | Light only for now (section 6)                                    |
| Dense multi-column footer on a pale band                                       | Footer on `alt` band, same three columns                          |
| One accent colour for links and buttons                                        | One blue                                                          |

The blue accent, greys and radii are **my estimates of a light IVPN-like look, not IVPN's brand values**. Replace them if the company has a brand colour.

## 2. Colour tokens (`src/styles/global.css`, `@theme`)

Token names changed from the dark theme because `ink-*` and `cyan` no longer describe the values. **No hex values in components.**

| Token                     | Value                 | Use                                    | Old name                   |
| ------------------------- | --------------------- | -------------------------------------- | -------------------------- |
| `page`                    | `#FFFFFF`             | Page background                        | `ink-950`                  |
| `surface`                 | `#FFFFFF`             | Cards, nav                             | `ink-900`                  |
| `alt`                     | `#F3F6FA`             | Alternate section bands, footer        | `ink-800`                  |
| `band`                    | `#E8F0FD`             | CTA band                               | `band`                     |
| `line`                    | `#E3E8EF`             | 1px borders, dividers                  | `line`                     |
| `line-strong`             | `#CDD5E0`             | Tag and secondary-button borders       | `line-strong`              |
| `text`                    | `#101828`             | Headings, primary text                 | `text`                     |
| `muted`                   | `#475467`             | Body copy. **Use this on the band**    | `muted`                    |
| `faint`                   | `#667085`             | Small index numbers                    | `faint`                    |
| `accent`                  | `#1D63D6`             | Primary button fill, focus ring        | `cyan`                     |
| `accent-hover`            | `#174FAE`             | Button hover                           | `cyan-hover`               |
| `accent-text`             | `#1456B8`             | Eyebrows, active nav link, card labels | `cyan-text`                |
| `accent-dim`              | `#9DB9EA`             | Card hover border, lit pipeline step   | `cyan-dim`                 |
| `accent-10` / `accent-20` | `#E8F0FD` / `#D6E4FB` | Hero wash, tints                       | same                       |
| `on-accent`               | `#FFFFFF`             | Text on the accent fill                | `ink-950` (as button text) |

### Contrast (computed, WCAG 2.1)

| Text          | on `page` | on `alt` | on `band`       |
| ------------- | --------- | -------- | --------------- |
| `text`        | 17.8      | 16.4     | 15.5            |
| `muted`       | 7.7       | 7.1      | 6.7             |
| `faint`       | 5.0       | 4.6      | **4.3 (fails)** |
| `accent-text` | 6.9       | 6.4      | 6.0             |

Buttons: white on `accent` is **5.5:1**, on `accent-hover` **7.6:1**. Rule kept from before: never use `faint` on the band.

## 3. Typography

One family, **Inter Variable** (self-hosted). Headings are weight 600 (was 500), tracking `-0.02em`, line height 1.1.

| Role       | Size                                | Notes             |
| ---------- | ----------------------------------- | ----------------- |
| `h1`       | `clamp(2.25rem, 5vw, 3.75rem)`      | Was up to 5.65rem |
| `h2`       | `clamp(1.75rem, 3.5vw, 2.5rem)`     |                   |
| `h3`       | `clamp(1.25rem, 2vw, 1.5rem)`       |                   |
| `h4`       | `1.125rem`                          |                   |
| Body       | `1rem` / 1.6                        |                   |
| `.eyebrow` | `0.875rem`, weight 500, accent text |                   |
| `.tag`     | `0.75rem`, on `alt` fill            |                   |

## 4. Shape and layout

| Item                        | Value                                                                                |
| --------------------------- | ------------------------------------------------------------------------------------ |
| Container                   | max 1200px, side padding 1rem (1.5rem from `lg`)                                     |
| Section padding             | 4rem, 5rem from `md`, 6rem from `xl`                                                 |
| Card                        | white, 1px `line` border, radius 0.75rem, padding 1.5rem (2rem from `md`), no shadow |
| Button / tag / input radius | 0.5rem; button min height 44px                                                       |
| Primary button              | `accent` fill, white text                                                            |
| Secondary button            | white fill, `line-strong` border, hover `alt` fill and `accent-dim` border           |
| Nav                         | full width, sticky, white at 90% with blur, bottom border, 4rem high                 |
| Hero (`hero-glow`)          | vertical wash from `accent-10` to white                                              |
| Alternation                 | `page` and `alt` bands                                                               |

## 5. Components touched

`Navbar` (flat bar, no rounded floating card), `Footer` (`alt` band), `ProductCard` and all pages (token renames only), `Layout` (skip link uses `on-accent`), `animations.ts` (nav fades, no scale). Markup and content are otherwise unchanged.

## 6. Not done

| Item                           | Why                                                                                                                                      |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Dark mode toggle               | IVPN ships light and dark; the request was light only. Tokens are semantic now, so a dark set can be added under `prefers-color-scheme`. |
| Hero product image             | Like IVPN's hero screenshot. Needs sanitized artwork (`AGENTS.md` rule 1).                                                               |
| IVPN-style "transparency" grid | Plain heading plus text blocks for each commitment. Needs approved copy; no claims were invented.                                        |
| Sampled IVPN colours and fonts | Not obtainable from this environment (section 1).                                                                                        |

## 7. Verification status

**Run** (built site, Google Chrome, 23 Nov 2026):

- `astro build` and `astro check` (0 errors, 0 warnings); Prettier applied to `src/`.
- axe-core on Home, Solutions, a product page, About, Contact, Privacy and 404: **no violations** with reduced motion on. With motion on, axe reported contrast hits on Home, Solutions and About when run right after load; these disappeared in the final state, so they are most likely elements caught mid-fade, but this was not isolated further.
- No console errors at 1280px and 390px. Screenshots of Home reviewed at both widths.

**Not run:** Lighthouse, the repo Playwright suite, a keyboard-only walkthrough, a CSP build (the layout has no CSP meta tag yet), the other pages' screenshots, 768px.
