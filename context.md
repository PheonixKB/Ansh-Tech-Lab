# Project Context: Ansh Tech Labs Website

## Overview

Static marketing website for Ansh Tech Labs â€” digital forensics, OSINT and cyber-intelligence tools for law-enforcement agencies and corporate security teams.

**Status:** In development â€” build pipeline established, core pages in progress.

**Hosting:** GitHub Pages via GitHub Actions, custom domain `anshtechlabs.com`

**Stack:**

- Framework: Astro 7 (static output)
- Styling: Tailwind CSS 4 via `@tailwindcss/vite`
- Animation: GSAP + ScrollTrigger
- Fonts: `@fontsource-variable/jetbrains-mono` (self-hosted)
- SEO: `@astrojs/sitemap`
- Forms: Disabled until provider approved (security.md Â§7)
- Testing: Playwright + axe-core

## Design Principles (from design.md)

1. **Plain and technical.** Monospace type, square corners, no cards or shadows, thin rules, numbered eyebrows (`01 / Who we serve`).
2. **One accent.** IVPN-style sky blue marks actions and key labels only, on a white and grey page with a dark footer. Light theme only.
3. **Say what the tool does.** Plain verbs. No buzzwords and no unverifiable superlatives.
4. **Honest visuals.** Diagrams are labelled `CONCEPTUAL WORKFLOW / ILLUSTRATIVE DATA`. Use sanitized or mock data in any screenshot. Never show real case data.
5. **Motion supports meaning.** Animate to explain flow (lines connecting, pipeline lighting up), never to decorate. Respect reduced-motion.

## Design Tokens (from design.md Â§4)

### Colors

Light theme sampled from ivpn.net (see `design-ivpn-light-theme.md`). Source of truth: `src/styles/global.css`.

- `page` / `surface` `#FFFFFF`; `alt` / `band` `#F2F2F2`; `footer` `#222226`; `footer-text` `#C8C8CC`
- `line` `#E3E3E3`; `line-strong` `#D7D7D8`
- `heading` `#000000`; `text` `#222226`; `muted` `#3F3F44`; `faint` `#6B6B72`
- `accent` `#449CF8` (fill); `accent-hover` `#5BA8F8`; `accent-text` `#1764C0`; `accent-dim` `#BDDCFC`; `on-accent` `#222226`

### Typography

| Role            | Font           | Size                          | Weight | Notes                              |
| --------------- | -------------- | ----------------------------- | ------ | ---------------------------------- |
| Display (H1)    | JetBrains Mono | `clamp(2rem, 4.5vw, 3.25rem)` | 700    | black, tracking `-0.02em`          |
| Section (H2)    | JetBrains Mono | `clamp(1.5rem, 3vw, 2rem)`    | 700    | black                              |
| Card title (H3) | JetBrains Mono | 1.0625rem                     | 700    | turns `accent-text` on hover       |
| Body            | JetBrains Mono | 0.9375rem / 1.8               | 400    | `text-muted`, max width ~65ch      |
| Eyebrow / label | JetBrains Mono | 0.8125rem                     | 500    | sentence case, `text-accent-text`  |
| Tag             | JetBrains Mono | 0.75rem minimum               | 400    | grey `alt` fill, no border, square |

### Layout

- Container: max 1100px, `px-4 lg:px-6`.
- Section spacing: `py-16 md:py-20`. Alternate `bg-page` and `bg-alt` bands. Hero is plain white.
- "Cards" are plain blocks: no border, fill or radius. A 4.5rem `line-strong` rule sits above and turns `accent` on hover; the H3 turns `accent-text`. Class: `.card`.
- Buttons: square, bold, min height 44px. Primary `bg-accent text-on-accent`; secondary `bg-alt text-accent-text`.
- Footer: `bg-footer`, light text, white on hover.
- Breakpoints: Tailwind defaults (`sm 640`, `md 768`, `lg 1024`, `xl 1280`). Design mobile first.
- Grids: 4-up collapse to 2-up at `md`, 1-up below. 2-up audience blocks stack below `md`.

### Verified Contrast (WCAG)

| Text          | on `page` | on `alt` / `band` |
| ------------- | --------- | ----------------- |
| `heading`     | 21.0      | 18.8              |
| `text`        | 15.9      | 14.2              |
| `muted`       | 10.5      | 9.4               |
| `faint`       | 5.3       | 4.7               |
| `accent-text` | 5.8       | 5.2               |

- `on-accent` (`#222226`) on the blue `accent` fill: **5.6:1** (6.3 on hover). **White on `#449CF8` is 2.85:1 and fails; never use it.** `#449CF8` as text on white also fails, so use `accent-text`.
- Footer: `footer-text` on `footer` 9.5:1, white 15.9:1, `accent` on `footer` 5.6:1.
- Body text 4.5:1 minimum.

## Project Structure

```
src/
  data/              # Single source of truth
    site.ts          # Site metadata, nav, contact details
    solutions.ts     # All 4 products (populated)
  layouts/           # Page layouts
    Layout.astro     # <head>, SEO, nav, footer, scripts
  pages/             # Astro pages (routes)
    index.astro      # Home
    about.astro
    contact.astro
    privacy.astro
    404.astro
    solutions/index.astro
    solutions/[slug].astro  # 4 product pages from template
  styles/            # Global CSS with @theme tokens
    global.css
  components/        # Shared components
    Navbar.astro
    Footer.astro
    Button.astro
    SectionHeader.astro
    AudienceCard.astro
    SolutionCard.astro
    PipelineStep.astro
    CapabilityCard.astro
    CTABand.astro
    ProductHero.astro
    DemoForm.astro
scripts/
  animations.ts      # GSAP setup
astro.config.mjs     # Vite + Tailwind + sitemap integration
package.json         # Dependencies and scripts
```

## Open Items (admins per security.md Â§12)

- Named content approver
- Form provider and privacy policy text
- Partner logos and public disclosure
- Branch protection, CODEOWNERS, 2FA settings
- Domain registrar and DNS configuration
- `security.txt` contact address
- Public repo vs private hosting decision

**Current focus:** Version 1 launch â€” home page, solutions overview, 4 product pages, about, contact (form disabled), privacy, 404.
