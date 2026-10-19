# Project Context: Ansh Tech Labs Website

## Overview

Static marketing website for Ansh Tech Labs — digital forensics, OSINT and cyber-intelligence tools for law-enforcement agencies and corporate security teams.

**Status:** In development — build pipeline established, core pages in progress.

**Hosting:** GitHub Pages via GitHub Actions, custom domain `anshtechlabs.com`

**Stack:**

- Framework: Astro 7 (static output)
- Styling: Tailwind CSS 4 via `@tailwindcss/vite`
- Animation: GSAP + ScrollTrigger
- Fonts: `@fontsource-variable/inter`, `@fontsource-variable/jetbrains-mono` (self-hosted)
- SEO: `@astrojs/sitemap`
- Forms: Disabled until provider approved (security.md §7)
- Testing: Playwright + axe-core

## Design Principles (from design.md)

1. **Case-file feel.** Numbered mono eyebrows (`01 / WHO WE SERVE`), figure captions (`FIG. 01`), thin 1px borders, square corners.
2. **One accent.** Cyan marks actions and key labels only. Everything else is navy and grey.
3. **Say what the tool does.** Plain verbs. No buzzwords and no unverifiable superlatives.
4. **Honest visuals.** Diagrams are labelled `CONCEPTUAL WORKFLOW / ILLUSTRATIVE DATA`. Use sanitized or mock data in any screenshot. Never show real case data.
5. **Motion supports meaning.** Animate to explain flow (lines connecting, pipeline lighting up), never to decorate. Respect reduced-motion.

## Design Tokens (from design.md §4)

### Colors

- `--color-ink-950: #060B14` — page background
- `--color-ink-900: #0A1320` — cards
- `--color-ink-800: #0D1B2B` — alternate section bands
- `--color-band: #0F2D3A` — CTA band (teal-tinted)
- `--color-line: #1B2D3F` — 1px borders
- `--color-text: #F2F6FA`
- `--color-muted: #9BA9B8` — body copy on dark
- `--color-faint: #7C8CA0` — small labels (not on --color-band)
- `--color-cyan: #40DFF2` — accent
- `--color-cyan-dim: #1E7F8C` — diagram strokes, subtle accents

### Typography

- **Display (H1):** Inter, `clamp(2.5rem, 5vw, 4rem)`, 400–500, tight leading (1.05–1.1), tracking `-0.02em`
- **Section title (H2):** Inter, `clamp(1.75rem, 3vw, 2.75rem)`, 400
- **Card title (H3):** Inter, 1.25–1.5rem, 400–500
- **Body:** Inter, 1rem–1.125rem, 400, `text-muted`, max width ~65ch
- **Eyebrow / label:** JetBrains Mono, 0.75rem minimum, 400, uppercase, tracking `0.08em`, `text-cyan`
- **Caption / tag:** JetBrains Mono, 0.75rem minimum, 400, `text-faint`

### Layout

- Container: `max-w-[1200px] mx-auto px-6 lg:px-8`
- Section spacing: `py-20 md:py-28`
- Alternate `bg-ink-950` and `bg-ink-800` bands
- Cards: `bg-ink-900 border border-line`, no radius. Hover: border becomes `cyan-dim`, translate up 2px
- Breakpoints: Tailwind defaults (`sm 640`, `md 768`, `lg 1024`, `xl 1280`). Design mobile first.
- Grids: 4-up cards collapse to 2-up at `md`, 1-up below. 2-up audience cards stack below `md`.

### Verified Contrast (WCAG)

| Text    | on `ink-950` | on `ink-900` | on `ink-800` | on `band` |
| ------- | ------------ | ------------ | ------------ | --------- |
| `text`  | 18.2         | 17.2         | 16.0         | 13.3      |
| `muted` | 8.2          | 7.8          | 7.3          | 6.0       |
| `cyan`  | 12.3         | 11.6         | 10.8         | 9.0       |

**Rule:** use `muted`, never `faint`, on the CTA band. Body text 4.5:1 minimum.

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

## Open Items (admins per security.md §12)

- Named content approver
- Form provider and privacy policy text
- Partner logos and public disclosure
- Branch protection, CODEOWNERS, 2FA settings
- Domain registrar and DNS configuration
- `security.txt` contact address
- Public repo vs private hosting decision

**Current focus:** Version 1 launch — home page, solutions overview, 4 product pages, about, contact (form disabled), privacy, 404.
