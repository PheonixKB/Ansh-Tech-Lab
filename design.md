# Ansh Tech Labs: Website Design & Build Spec

A static marketing site for Ansh Tech Labs, built with **Astro + Tailwind CSS + GSAP** and hosted on **GitHub Pages**. This file is the single reference for building every page. It follows the approved Figma screens (Home, four solution pages, Contact) and adds the improvements from the design review.

> **Status of the numbers and colors.** Hex values below were estimated from screenshots. Sample the exact values from the Figma file and update `src/styles/global.css`. Contrast ratios were computed for these estimates.

---

## 1. Goals

- Build trust with two audiences: **Law Enforcement Agencies (LEA)** and **Corporate Security teams**.
- Convert visitors into **demo requests**. Every page ends in a "Request a Demo" action.
- Look precise and serious, like case documentation, not like a generic "hacker" site.
- Make no claim the company can't verify (no invented stats, testimonials, logos or certifications).

**Pages (routes)**

| Route | Page | Status in design |
|---|---|---|
| `/` | Home | Designed |
| `/solutions/` | Solutions overview (audience sections) | **To design** |
| `/solutions/strotpragna/` | STROTPRAGNA | Designed |
| `/solutions/dronlyzer/` | Dronlyzer | Designed |
| `/solutions/fingerprint-kit/` | Fingerprint Kit | Designed |
| `/solutions/lea-solutions/` | LEA Solutions | Designed |
| `/about/` | About | **To design** |
| `/contact/` | Contact / Request a Demo | Designed |
| `/privacy/` | Privacy policy | **To write** |
| `/404` | Not found | **To design** |

---

## 2. Tech stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | **Astro** (static output) | Components, layouts, dynamic routes; ships almost no JS by default |
| Styling | **Tailwind CSS** (v4, via `@tailwindcss/vite`) | Tokens defined in CSS with `@theme` |
| Animation | **GSAP** + ScrollTrigger | Scroll reveals, count-up, SVG drawing. Optional: Lenis for smooth scroll |
| Fonts | `@fontsource-variable/inter`, `@fontsource-variable/jetbrains-mono` | Self-hosted, no third-party font requests |
| Sitemap | `@astrojs/sitemap` | Needs `site` set in config |
| Forms | Formspree or Web3Forms | Static site has no backend. Use the provider's spam protection |
| Hosting | **GitHub Pages** via GitHub Actions | Custom domain `anshtechlabs.com` |

### 2.1 Setup

```bash
node -v                                   # use a current LTS version
npm create astro@latest ansh-tech-labs    # choose: Empty template, install deps, init git
cd ansh-tech-labs
npx astro add tailwind                    # adds Tailwind + the Vite plugin
npx astro add sitemap
npm install gsap @fontsource-variable/inter @fontsource-variable/jetbrains-mono
npm run dev                               # http://localhost:4321
```

Tailwind's setup has changed between versions. If `astro add tailwind` behaves differently, follow the Tailwind section of the Astro docs and keep the `@import "tailwindcss";` + `@theme` approach in section 4.

### 2.2 `astro.config.mjs`

```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://anshtechlabs.com',
  // No `base` needed with a custom domain.
  // If testing on username.github.io/repo-name, add: base: '/repo-name'
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
```

### 2.3 Folder structure

```
public/
  CNAME                      anshtechlabs.com
  favicon.svg
  robots.txt
  images/partners/           verified partner logos only (SVG/PNG)
  images/og-default.png      1200x630 social share image
src/
  styles/global.css          Tailwind import, tokens, base styles
  layouts/Layout.astro       <head>, SEO, nav, footer, scripts
  components/
    Navbar.astro  Footer.astro  Button.astro  SectionHeader.astro
    AudienceCard.astro  SolutionCard.astro  PipelineStep.astro
    CapabilityCard.astro  StatItem.astro  PartnerStrip.astro
    CTABand.astro  ProductHero.astro  DemoForm.astro
    diagrams/ SignalDiagram.astro  FlightDiagram.astro
              FingerprintDiagram.astro  TransactionDiagram.astro
  data/
    site.ts                  name, nav links, contact details, footer text
    solutions.ts             all four products (single source of truth)
  scripts/
    animations.ts            GSAP setup (section 8)
  pages/
    index.astro  about.astro  contact.astro  privacy.astro  404.astro
    solutions/index.astro
    solutions/[slug].astro   generates the four product pages
.github/workflows/deploy.yml
```

---

## 3. Design principles

1. **Case-file feel.** Numbered mono eyebrows (`01 / WHO WE SERVE`), figure captions (`FIG. 01`), thin 1px borders, square corners.
2. **One accent.** Cyan marks actions and key labels only. Everything else is navy and grey.
3. **Say what the tool does.** Plain verbs. No buzzwords and no unverifiable superlatives.
4. **Honest visuals.** Diagrams are labelled `CONCEPTUAL WORKFLOW / ILLUSTRATIVE DATA`. Use sanitized or mock data in any screenshot. Never show real case data.
5. **Motion supports meaning.** Animate to explain flow (lines connecting, pipeline lighting up), never to decorate. Respect reduced-motion.

---

## 4. Design tokens

### 4.1 `src/styles/global.css`

```css
@import "tailwindcss";
@import "@fontsource-variable/inter";
@import "@fontsource-variable/jetbrains-mono";

@theme {
  /* Surfaces */
  --color-ink-950: #060B14;   /* page background */
  --color-ink-900: #0A1320;   /* cards */
  --color-ink-800: #0D1B2B;   /* alternate section bands */
  --color-band:    #0F2D3A;   /* CTA band (teal-tinted) */
  --color-line:    #1B2D3F;   /* 1px borders */

  /* Text */
  --color-text:    #F2F6FA;
  --color-muted:   #9BA9B8;   /* body copy on dark */
  --color-faint:   #7C8CA0;   /* small labels (not on --color-band) */

  /* Accent */
  --color-cyan:    #40DFF2;
  --color-cyan-dim:#1E7F8C;   /* diagram strokes, subtle accents */

  --font-sans: "Inter Variable", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono Variable", ui-monospace, monospace;
}

@layer base {
  html { background: var(--color-ink-950); color: var(--color-text); scroll-behavior: smooth; }
  body { font-family: var(--font-sans); -webkit-font-smoothing: antialiased; }
  :focus-visible { outline: 2px solid var(--color-cyan); outline-offset: 3px; }
  @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
}
```

### 4.2 Verified contrast (WCAG)

| Text | on `ink-950` | on `ink-900` | on `ink-800` | on `band` |
|---|---|---|---|---|
| `text` | 18.2 | 17.2 | 16.0 | 13.3 |
| `muted` | 8.2 | 7.8 | 7.3 | 6.0 |
| `faint` | 5.7 | 5.4 | 5.1 | **4.2 (fails)** |
| `cyan` | 12.3 | 11.6 | 10.8 | 9.0 |

- Dark text (`ink-950`) on a cyan button: **12.3:1**.
- **Rule:** use `muted`, never `faint`, on the CTA band. Body text 4.5:1 minimum.
- The small mono labels and tag lines in the mockups look dimmer than `faint`. A darker grey such as `#5F6F80` would fall to about 3.4–3.8:1 on these backgrounds, so `faint` is deliberately lighter. Check the real Figma values against this table.

### 4.3 Typography

| Role | Font | Size (desktop / mobile) | Weight | Notes |
|---|---|---|---|---|
| Display (H1) | Inter | `clamp(2.5rem, 5vw, 4rem)` | 400–500 | tight leading (1.05–1.1), tracking `-0.02em` |
| Section title (H2) | Inter | `clamp(1.75rem, 3vw, 2.75rem)` | 400 | |
| Card title (H3) | Inter | 1.25–1.5rem | 400–500 | |
| Body | Inter | 1rem–1.125rem | 400 | `text-muted`, max width ~65ch |
| Eyebrow / label | JetBrains Mono | **0.75rem minimum** | 400 | uppercase, tracking `0.08em`, `text-cyan` |
| Caption / tag | JetBrains Mono | **0.75rem minimum** | 400 | `text-faint` |

### 4.4 Layout

- Container: `max-w-[1200px] mx-auto px-6 lg:px-8`.
- Section spacing: `py-20 md:py-28`. Alternate `bg-ink-950` and `bg-ink-800` bands.
- Cards: `bg-ink-900 border border-line`, no radius. Hover: border becomes `cyan-dim`, translate up 2px.
- Breakpoints: Tailwind defaults (`sm 640`, `md 768`, `lg 1024`, `xl 1280`). Design mobile first.
- Grids: 4-up cards collapse to 2-up at `md`, 1-up below. 2-up audience cards stack below `md`.

---

## 5. Shared layout and components

### 5.1 `Layout.astro` (skeleton)

```astro
---
import '../styles/global.css';
import Navbar from '../components/Navbar.astro';
import Footer from '../components/Footer.astro';
const { title, description, image = '/images/og-default.png' } = Astro.props;
const canonical = new URL(Astro.url.pathname, Astro.site);
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title} | Ansh Tech Labs</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={new URL(image, Astro.site)} />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
  </head>
  <body class="min-h-screen bg-ink-950 text-text">
    <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 bg-cyan text-ink-950 px-4 py-2">Skip to content</a>
    <Navbar currentPath={Astro.url.pathname} />
    <main id="main"><slot /></main>
    <Footer />
    <script>import '../scripts/animations.ts';</script>
  </body>
</html>
```

### 5.2 Component specs

| Component | Props | Spec |
|---|---|---|
| **Navbar** | `currentPath` | Logo (mark + "ANSH / TECH LABS" wordmark), links Home, Solutions, About, Contact, cyan "Request a Demo" button. 1px bottom border. Active link in `text-cyan`. **Mobile:** hamburger `<button aria-expanded aria-controls>` toggles a full-width panel; close on Escape and on link click. Solutions can stay a single link (the page lists all four). |
| **Button** | `variant: primary \| secondary \| link`, `href`, `arrow?` | Primary: `bg-cyan text-ink-950 font-medium px-6 py-3`, trailing ↗ icon. Secondary: 1px `line` border, `text-text`, hover border cyan. Link: cyan text with arrow. Min height 44px. |
| **SectionHeader** | `index`, `label`, `title`, `intro?` | Mono eyebrow `01 / LABEL`, H2, optional right-aligned intro paragraph (2-col at `lg`). |
| **AudienceCard** | `icon`, `title`, `body`, `tags[]`, `href`, `cta` | Large card, icon top-left, title, body, mono tags row, link CTA. |
| **SolutionCard** | `index`, `category`, `name`, `blurb`, `href`, `icon` | Mono index top-right (`01`), category eyebrow, name, one-line blurb, "Explore solution ↗". Whole card is the link. |
| **PipelineStep** | `index`, `title`, `body` | Number + arrow top row, title, body. Used 4-up for pipelines. |
| **CapabilityCard** | `icon`, `title`, `body` | Icon, title, body. 3-up. |
| **StatItem** | `value`, `suffix?`, `label` | Large number (count-up), small label, 1px top border. |
| **PartnerStrip** | `partners[]` | Row of grayscale logos, hover to full color. Caption "Partners & contributors". **Renders only verified entries.** |
| **CTABand** | `eyebrow`, `title`, `body`, `primary`, `secondary?` | `bg-band` band, text left, primary button right. Body text uses `text-muted` (not `faint`). |
| **ProductHero** | `solution` | Breadcrumb, eyebrow, product name, H1, sub, two buttons, diagram on right. |
| **DemoForm** | none | See section 7.6 and section 9. |
| **Footer** | none | 4 columns: brand + tagline; Solutions (4 links); Company (About, Contact, Request a Demo, **Privacy**); Our focus. Add contact details (email, location) and LinkedIn. Bottom row: © 2026 + `PRECISION IN DATA. CLARITY IN EVIDENCE.` |

---

## 6. Content data (single source of truth)

### 6.1 `src/data/solutions.ts`

```ts
export type Solution = {
  slug: string; name: string; category: string; blurb: string;
  eyebrow: string; headline: string[]; sub: string;
  designedFor: string; coreFocus: string;
  challenge: { title: string; body: string };
  capabilities: { icon: string; title: string; body: string }[];
  workflow: { title: string; body: string }[];
  diagram: 'signal' | 'flight' | 'fingerprint' | 'transaction';
  audiences: ('law-enforcement' | 'corporate-security')[];
};

export const solutions: Solution[] = [
  {
    slug: 'strotpragna',
    name: 'STROTPRAGNA',
    category: 'OSINT PLATFORM',
    blurb: 'Find the connections hidden across open sources and the deep web.',
    eyebrow: 'OSINT / DEEP WEB INTELLIGENCE',
    headline: ['Surface the signals.', 'Connect the intelligence.'],
    sub: 'An OSINT platform for deep web monitoring and correlation. Bring fragmented open-source information into a clearer investigative context.',
    designedFor: 'Law enforcement investigators & corporate security teams',
    coreFocus: 'Deep web monitoring · Open-source correlation',
    challenge: {
      title: 'Scattered sources can hide the bigger picture.',
      body: 'Relevant information rarely lives in one place. Investigators and security teams need to move beyond isolated signals to understand how sources, entities and activity connect.',
    },
    capabilities: [
      { icon: 'radar', title: 'Deep web monitoring', body: 'Explore relevant deep web signals as part of an open-source intelligence workflow.' },
      { icon: 'network', title: 'Intelligence correlation', body: 'Connect related information and examine relationships across fragmented source material.' },
      { icon: 'eye', title: 'Investigative context', body: 'Turn collected signals into a more coherent view for investigation and threat assessment.' },
    ],
    workflow: [
      { title: 'Define', body: 'Set the investigative question and relevant scope.' },
      { title: 'Monitor', body: 'Collect relevant open-source and deep web signals.' },
      { title: 'Correlate', body: 'Examine connected entities and activity.' },
      { title: 'Review', body: 'Assess findings within the investigation.' },
    ],
    diagram: 'signal',
    audiences: ['law-enforcement', 'corporate-security'],
  },
  {
    slug: 'dronlyzer',
    name: 'Dronlyzer',
    category: 'UAV FORENSICS',
    blurb: 'Extract drone data and reconstruct the story behind a flight.',
    eyebrow: 'DIGITAL FORENSICS / UAV EVIDENCE',
    headline: ['Reconstruct the flight.', 'Understand the evidence.'],
    sub: 'A drone forensics kit for UAV data extraction and flight path reconstruction. Bring the digital traces of a flight into the investigative picture.',
    designedFor: 'Police, forensic laboratories & government investigators',
    coreFocus: 'UAV data extraction · Flight path reconstruction',
    challenge: {
      title: 'A recovered drone is only the starting point.',
      body: 'The investigative value lies in its data. Extracting relevant information and reconstructing flight activity helps investigators understand where a UAV has been and how it relates to a case.',
    },
    capabilities: [
      { icon: 'download', title: 'UAV data extraction', body: 'Focus the forensic workflow on recovering relevant digital information from drone evidence.' },
      { icon: 'route', title: 'Flight reconstruction', body: 'Reconstruct flight paths to examine movement and understand operational context.' },
      { icon: 'scan', title: 'Evidence analysis', body: 'Bring extracted data and reconstructed activity together for investigative review.' },
    ],
    workflow: [
      { title: 'Assess', body: 'Identify the UAV and scope the examination.' },
      { title: 'Extract', body: 'Recover relevant drone data for analysis.' },
      { title: 'Reconstruct', body: 'Build a view of the recorded flight path.' },
      { title: 'Interpret', body: 'Review flight activity against the case context.' },
    ],
    diagram: 'flight',
    audiences: ['law-enforcement'],
  },
  {
    slug: 'fingerprint-kit',
    name: 'Fingerprint Kit',
    category: 'FIELD BIOMETRICS',
    blurb: 'Expert-grade biometric capture for field investigation units.',
    eyebrow: 'FIELD INVESTIGATION / BIOMETRICS',
    headline: ['Biometric capture, where', 'the investigation begins.'],
    sub: 'Expert-grade biometric capture tools for field investigation units. Equip the point of collection with a focused fingerprint capture workflow.',
    designedFor: 'Field investigation units & law enforcement teams',
    coreFocus: 'Fingerprint collection · Field biometric capture',
    challenge: {
      title: 'Critical evidence starts at the point of capture.',
      body: 'Field investigators need specialized tools to collect biometric evidence as part of a structured evidence workflow. The quality and context of collection matter long before analysis begins.',
    },
    capabilities: [
      { icon: 'fingerprint', title: 'Biometric capture', body: 'Specialized tools focused on capturing fingerprint evidence during an investigation.' },
      { icon: 'toolbox', title: 'Field-focused toolkit', body: 'An expert-grade kit intended for the practical needs of field investigation units.' },
      { icon: 'clipboard', title: 'Collection workflow', body: 'Support a deliberate approach to biometric collection and subsequent investigative review.' },
    ],
    workflow: [
      { title: 'Prepare', body: 'Establish the collection context and equipment.' },
      { title: 'Capture', body: 'Collect fingerprint information in the field.' },
      { title: 'Review', body: 'Examine the captured biometric material.' },
      { title: 'Document', body: 'Place collection findings in the case workflow.' },
    ],
    diagram: 'fingerprint',
    audiences: ['law-enforcement'],
  },
  {
    slug: 'lea-solutions',
    name: 'LEA Solutions',
    category: 'CUSTOM INTELLIGENCE',
    blurb: 'Purpose-built intelligence and crypto-tracking modules for law enforcement.',
    eyebrow: 'LAW ENFORCEMENT / CUSTOM INTELLIGENCE',
    headline: ['Your investigative mandate.', 'A tailored intelligence workflow.'],
    sub: 'Custom intelligence and crypto-tracking modules for law enforcement. Shape the solution around the questions your agency needs to answer.',
    designedFor: 'Police, government investigators & forensic laboratories',
    coreFocus: 'Custom intelligence modules · Crypto tracking',
    challenge: {
      title: 'Specialized cases need more than generic tooling.',
      body: 'Different agencies work with different data, priorities and investigative processes. Custom intelligence modules help align technical capability with the operational questions at hand.',
    },
    capabilities: [
      { icon: 'modules', title: 'Custom intelligence', body: "Scope purpose-built modules around the agency's investigative requirements." },
      { icon: 'wallet', title: 'Crypto tracking', body: 'Explore crypto-tracking modules for investigations involving digital-asset activity.' },
      { icon: 'flow', title: 'Workflow alignment', body: "Define how intelligence capabilities should fit the agency's collection and analysis process." },
    ],
    workflow: [
      { title: 'Scope', body: "Define the agency's use case and requirements." },
      { title: 'Design', body: 'Map the intelligence workflow and module scope.' },
      { title: 'Configure', body: 'Shape capabilities around agreed requirements.' },
      { title: 'Review', body: 'Evaluate the workflow with your investigative team.' },
    ],
    diagram: 'transaction',
    audiences: ['law-enforcement'],
  },
];
```

### 6.2 `src/data/site.ts` (excerpt)

```ts
export const site = {
  name: 'Ansh Tech Labs',
  tagline: 'Advanced digital forensics, OSINT and cyber-intelligence. Built for the work of investigation.',
  footerMotto: 'PRECISION IN DATA. CLARITY IN EVIDENCE.',
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Solutions', href: '/solutions/' },
    { label: 'About', href: '/about/' },
    { label: 'Contact', href: '/contact/' },
  ],
  // TODO(client): confirm all of these before launch
  contact: { email: 'TBD', location: 'Gandhinagar, Gujarat, India (confirm address)', linkedin: 'TBD' },
};
```

### 6.3 Partner logos (verified-only)

The current site lists NFSU, COEDF, CCoE, i-hub, SIIC, DSCIwN, n-coe and INTERPOL. Put each in `public/images/partners/` and in an array **only after the company confirms it has permission to show it**. This matters most for INTERPOL. Until then the strip should not render (or render the "to be added" placeholder in staging only, never on production).

---

## 7. Pages

### 7.1 Home: `/`

**Meta:** title "Digital forensics & OSINT platforms"; description "Intelligence platforms and forensic tools for law enforcement and corporate security teams."

| # | Section | Layout | Content |
|---|---|---|---|
| 1 | **Hero** | 2-col at `lg` (text left, diagram right); stacked on mobile | Eyebrow `DIGITAL FORENSICS / OSINT / CYBER-INTELLIGENCE`. H1 **"From complex digital data to actionable legal evidence"**. Sub: "Intelligence platforms and forensic tools for the teams that turn fragmented digital traces into meaningful investigative insight." Buttons: **Request a Demo** (primary), **Explore Solutions** (secondary). Diagram caption `FIG. 01 · FRAGMENTED SIGNALS → CONNECTED EVIDENCE`. |
| 2 | **Trust row** | 3 items, top/bottom border | "10+ years in cyber forensics" · "Built for investigative workflows" · "Law enforcement & corporate security" |
| 3 | **Partner strip** | 4–8 logos | Caption "Partners & contributors". Verified logos only (6.3). |
| 4 | **01 / WHO WE SERVE** | 2 AudienceCards | H2 "Different mandates. Shared need for clarity." Intro: "From public-sector investigations to enterprise threat monitoring, put the right intelligence in the right hands." **For Law Enforcement:** "Connect evidence collection and analysis across police, forensic labs and government investigations." Tags: Digital evidence / UAV forensics / Biometrics → `/solutions/#law-enforcement`. **For Corporate Security:** "Monitor open-source signals and threat intelligence to identify exposure and help prevent data breaches." Tags: OSINT / Deep web monitoring / Threat intelligence → `/solutions/#corporate-security`. |
| 5 | **02 / THE SOLUTION PORTFOLIO** (`bg-ink-800`) | 4 SolutionCards from `solutions.ts` | H2 "Specialized tools. One investigative purpose." |
| 6 | **03 / FROM SIGNAL TO EVIDENCE** | 4 PipelineSteps | H2 "A clear path through complex data." Intro: "A common investigative framework connects collection, context, analysis and reporting across our solutions." Steps: **Collect** "Gather relevant digital, open-source or field evidence." · **Correlate** "Connect entities, events and data points in context." · **Analyze** "Examine relationships and reconstruct activity." · **Report** "Organize findings for investigative and legal review." |
| 7 | **04 / BUILT ON SPECIALIST EXPERIENCE** | Stats row + short paragraph | **Change from design:** the old row ("10+ years / 4 solutions / 2 focus audiences / 4 pipeline stages") counted the company's own sections. Keep **10+ years in cyber forensics** and add only figures the company can verify (e.g. agencies served, officers trained). If there are none yet, replace the row with one sentence and a link to About: "Our team brings together white-hat hackers, forensic analysts and software engineers." |
| 8 | **CTA band** | `CTABand` | Eyebrow `START A CONVERSATION`. "Bring clarity to your next investigation." Body: "Talk to our team about your evidence workflow, intelligence needs and the right solution for your organization." Primary: Request a Demo → `/contact/`. Link: "Or Contact Us" → `/contact/`. |

**Home hero diagram:** the home page and the STROTPRAGNA page currently share the same diagram. Give the home hero its own animated version (see 8.4) so the two pages feel different.

### 7.2 Solutions overview: `/solutions/` (new)

Purpose: one place to compare the four solutions and serve both audiences. This page also fixes the missing "corporate security" path.

| # | Section | Content |
|---|---|---|
| 1 | Hero (short) | Eyebrow `SOLUTIONS`. H1 "Specialized tools. One investigative purpose." Sub: "Four solutions across collection, correlation and analysis, built for investigation teams." |
| 2 | **`#law-enforcement`** section | H2 "For Law Enforcement". Short intro. SolutionCards filtered by `audiences.includes('law-enforcement')`: all four. |
| 3 | **`#corporate-security`** section | H2 "For Corporate Security". Short intro. SolutionCards filtered by `corporate-security`: currently only STROTPRAGNA. *Open item:* ask the company whether other offerings serve corporate teams. If not, add a line: "Need something specific to your organization? Talk to us." |
| 4 | Pipeline strip | Reuse the Collect → Correlate → Analyze → Report steps |
| 5 | CTA band | "Not sure which solution fits? Tell us your challenge." → Request a Demo |

Static anchors (`#law-enforcement`, `#corporate-security`) mean no client-side filtering is needed.

### 7.3 Solution detail: `/solutions/[slug]/` (4 pages from one template)

```astro
---
// src/pages/solutions/[slug].astro
import Layout from '../../layouts/Layout.astro';
import ProductHero from '../../components/ProductHero.astro';
import CapabilityCard from '../../components/CapabilityCard.astro';
import PipelineStep from '../../components/PipelineStep.astro';
import CTABand from '../../components/CTABand.astro';
import { solutions } from '../../data/solutions';

export function getStaticPaths() {
  return solutions.map((s) => ({ params: { slug: s.slug }, props: { s } }));
}
const { s } = Astro.props;
---
<Layout title={s.name} description={s.sub}>
  <ProductHero solution={s} />
  <!-- Designed for / Core focus strip -->
  <!-- 01 / THE CHALLENGE: s.challenge -->
  <!-- 02 / KEY CAPABILITIES: s.capabilities (3-up) -->
  <!-- 03 / WORKFLOW: s.workflow (4-up) -->
  <!-- NEW sections, see below -->
  <CTABand eyebrow="START A CONVERSATION" title={`See ${s.name} in context.`}
    body="Bring your use case. We'll discuss the investigative workflow, relevant capabilities and the next step for your team." />
</Layout>
```

**Section order (all four pages):**

1. **ProductHero**: breadcrumb `SOLUTIONS / {NAME}`, eyebrow, product name (cyan), H1 from `headline` (one line per array item), `sub`, buttons Request a Demo + Contact Us, diagram chosen by `diagram`.
2. **Info strip** (`bg-ink-800`, 2-col): `DESIGNED FOR` / `CORE FOCUS`.
3. **01 / THE CHALLENGE**: `challenge.title` + `challenge.body` (2-col).
4. **02 / KEY CAPABILITIES**: H2 "Focused on the work that matters." Three `CapabilityCard`s.
5. **03 / WORKFLOW**: H2 "From input to investigative context." Note: "A conceptual view of the process. Discuss supported sources, operational scope and your team's requirements in a demo." Four `PipelineStep`s.
6. **NEW: 04 / WHAT TO EXPECT** (improvement from review). Add to `Solution` type: `deployment`, `outputs`, `support` strings. Three small cards: **Deployment** (e.g. on-premise / air-gapped, *confirm*), **Outputs** (report types, *confirm*), **Training & support** (*confirm*). Procurement teams look for this. Do not publish until the company supplies the facts.
7. **NEW: Product visual.** Replace or sit beside the abstract diagram with a sanitized screenshot or short looping demo of the real product, once available.
8. **CTA band**: "See {name} in context." plus the body text above.

**Diagram labels (one component each, SVG):**

| Product | Header label | Node labels |
|---|---|---|
| STROTPRAGNA | `OSINT / SIGNAL CORRELATION` | OPEN SOURCE, DEEP WEB, ENTITY CORRELATION, CONNECTED SIGNALS |
| Dronlyzer | `UAV / FLIGHT RECONSTRUCTION` | DEPARTURE, WAYPOINT, FLIGHT CONTEXT, RECORDED PATH |
| Fingerprint Kit | `BIOMETRICS / FIELD CAPTURE` | CAPTURE REGION, RIDGE DETAIL, BIOMETRIC CAPTURE, FIELD WORKFLOW |
| LEA Solutions | `INTELLIGENCE / TRANSACTION LINKS` | WALLET A, WALLET B, TRANSACTION LINKS, INVESTIGATIVE CONTEXT |

Footer of each diagram: `● CONCEPTUAL WORKFLOW / ILLUSTRATIVE DATA`.

### 7.4 About: `/about/` (new, content proposed from the company brief)

| # | Section | Content |
|---|---|---|
| 1 | Hero | Eyebrow `ABOUT ANSH TECH LABS`. H1 "A specialized technology hub for digital investigation." Sub: "We develop advanced forensic tools and cyber intelligence platforms that bridge the gap between complex digital data and actionable legal evidence." |
| 2 | **01 / OUR MISSION** | Short paragraph expanding the sub. Keep it to claims the company stands behind. |
| 3 | **02 / EXPERTISE** | "With over a decade of experience in the cyber-forensic domain" + three discipline cards: **White-hat hackers**, **Forensic analysts**, **Software engineers** (one honest line each, written with the company). |
| 4 | **03 / WHO WE SERVE** | Two cards. **Law Enforcement Agencies (LEA):** "End-to-end evidence collection and analysis pipelines." **Corporate Security Teams:** "Monitoring OSINT and threat intelligence to prevent data breaches." |
| 5 | **04 / PARTNERS & CONTRIBUTORS** | Verified logos with one line on each relationship (only what is true). |
| 6 | **05 / HOW WE WORK** | Principles from the motto: *Precision in data. Clarity in evidence.* Plus a note on responsible handling of data. |
| 7 | **Company details** | Location, email, LinkedIn. Optional: team photos or leadership, **only with consent**. |
| 8 | CTA band | Same as Home |

### 7.5 Contact: `/contact/`

Layout: 2-col at `lg` (form 60%, side column 40%).

- Eyebrow `CONTACT / REQUEST A DEMO`. H1 **"Start with your challenge."** Sub: "Tell us what your team needs to collect, connect or investigate. We'll help you explore the right solution and shape a relevant demo."
- **Form card:** see 7.6.
- **Side column:**
  - `WHAT HAPPENS NEXT` → "A focused conversation, not a generic pitch." Steps: **01 Share your context** "Give us a high-level view of your team and challenge." · **02 Identify the right fit** "Discuss relevant solutions and the workflow you need." · **03 Explore a tailored demo** "See the capabilities in the context of your use case."
  - `NOT READY FOR A DEMO?` → "Contact Us": "Use the same form for product questions, partnership conversations or an initial discussion. Let us know how we can help."
  - **NEW:** direct email, location and LinkedIn from `site.ts` (fills the empty space under the side column).

### 7.6 `DemoForm` fields

| Field | Type | Required | Notes |
|---|---|---|---|
| I represent | radio: Law Enforcement / Corporate Security | yes | default Law Enforcement; styled as selectable boxes |
| Full name | text | yes | `autocomplete="name"` |
| Work email | email | yes | `autocomplete="email"`, placeholder `you@organization.com` |
| Organization / Agency | text | yes | `autocomplete="organization"` |
| Solution of interest | select | no | "Select a solution, or help me choose" + the four product names (built from `solutions.ts`) |
| What would you like to explore? | textarea | no | placeholder "Briefly describe your use case or investigative needs." |
| *(hidden)* honeypot | text | n/a | spam trap |

- **Notice (keep):** "Please do not include case evidence, personal identifiers or sensitive operational details in this form."
- **Consent line (keep):** "By submitting, you agree to be contacted by Ansh Tech Labs about your request." **Add** a link to `/privacy/`.
- **States to design and build:** default, focus, inline field error (text + icon, not color alone), submitting (button disabled + "Sending..."), success panel ("Thank you. We'll be in touch."), and failure ("Something went wrong. Please email us at ...").
- Submit with `fetch` to the provider endpoint and update the UI without a page reload. Add `<noscript>` text with the direct email.
- The provider's access key or form ID is public in a static site. Keep it in `PUBLIC_FORM_ID` (`.env`) so it is easy to rotate, and rely on the provider's spam protection and rate limits.
- Tell visitors where submissions go (the form provider) in the privacy policy.

### 7.7 Privacy: `/privacy/` and 404

- **Privacy:** plain-language page covering what the form collects, who processes it (the form provider), how long it is kept, and a contact address. **Have the company or its counsel approve the text.** This file does not provide legal text.
- **404:** eyebrow `ERROR 404`, H1 "This page isn't in the case file.", links back to Home and Solutions.

---

## 8. Animation spec (GSAP)

Rules: subtle, short (0.5–0.9 s), `power2.out` easing, once per element, never block reading. All motion is wrapped so **reduced-motion users get final states instantly**.

### 8.1 `src/scripts/animations.ts`

```ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();

mm.add('(prefers-reduced-motion: no-preference)', () => {
  // 1. Scroll reveal: add data-reveal to any element
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: 24, opacity: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });

  // 2. Staggered groups: parent has data-stagger, children have data-stagger-item
  gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => {
    gsap.from(group.querySelectorAll('[data-stagger-item]'), {
      y: 20, opacity: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1,
      scrollTrigger: { trigger: group, start: 'top 85%', once: true },
    });
  });

  // 3. Count-up: <span data-count="10" data-suffix="+">0</span>
  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const suffix = el.dataset.suffix ?? '';
    const state = { v: 0 };
    el.textContent = '0' + suffix; // only reached when motion is allowed
    gsap.to(state, {
      v: end, duration: 1.4, ease: 'power1.out',
      onUpdate: () => { el.textContent = Math.round(state.v) + suffix; },
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });

  // 4. Diagram draw-in: lines inside [data-diagram] have class "draw"
  gsap.utils.toArray<SVGElement>('[data-diagram]').forEach((svg) => {
    const paths = svg.querySelectorAll<SVGGeometryElement>('.draw');
    paths.forEach((p) => {
      const len = p.getTotalLength();
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
    });
    const tl = gsap.timeline({ scrollTrigger: { trigger: svg, start: 'top 80%', once: true } });
    tl.to(paths, { strokeDashoffset: 0, duration: 1.2, ease: 'power1.inOut', stagger: 0.15 })
      .from(svg.querySelectorAll('.node'), { scale: 0, transformOrigin: '50% 50%', duration: 0.4, stagger: 0.1 }, '-=0.6')
      .from(svg.querySelectorAll('.label'), { opacity: 0, duration: 0.4, stagger: 0.08 }, '-=0.3');
  });

  // 5. Pipeline: steps light up in sequence as the row scrolls in
  gsap.utils.toArray<HTMLElement>('[data-pipeline]').forEach((row) => {
    // CSS: [data-step]{transition:border-color .4s} [data-step].is-lit{border-color:var(--color-cyan-dim)}
    const steps = row.querySelectorAll<HTMLElement>('[data-step]');
    const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 75%', once: true } });
    steps.forEach((step, i) => tl.add(() => step.classList.add('is-lit'), i * 0.35));
  });

  // 6. Hero intro (runs on load, not scroll)
  gsap.from('[data-hero] > *', { y: 20, opacity: 0, duration: 0.8, ease: 'power2.out', stagger: 0.12 });
});

// Reduced motion: show everything, and show final numbers
mm.add('(prefers-reduced-motion: reduce)', () => {
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    el.textContent = (el.dataset.count ?? '') + (el.dataset.suffix ?? '');
  });
});
```

Important details:

- `[data-count]` elements should contain their **final value in the HTML** (and be rewritten to `0` only by the script when animation is allowed), so the page is correct with JavaScript disabled.
- Elements that start hidden by CSS can flash. Prefer `gsap.from` (as above), which sets the start state only when the script runs.
- Use `ScrollTrigger.refresh()` after images load if layout shifts. Give images explicit `width` and `height`.

### 8.2 Where each effect applies

| Effect | Used on |
|---|---|
| `data-hero` intro | Hero text block on every page |
| `data-reveal` | Section headers, intro paragraphs, CTA band |
| `data-stagger` | Card grids (solutions, audience, capabilities) |
| `data-count` | StatItem values |
| `data-diagram` | Hero and product diagrams |
| `data-pipeline` | Collect/Correlate/Analyze/Report row and each product workflow |

### 8.3 Hover and focus (CSS only, no JS)

- Cards: `transition-colors duration-200 hover:border-cyan-dim` and `hover:-translate-y-0.5`.
- Buttons: arrow icon slides 2px up-right on hover.
- Links: underline offset animation.
- Focus-visible ring is global (4.1).

### 8.4 Home hero diagram

Make the home hero distinctive: three source nodes (Open source, Deep web, Field) with lines converging on one "Entity correlation" node, then a final "Evidence" node. The draw-in sequence (8.1 #4) shows signals connecting. After the intro, add a very slow `repeat: -1, yoyo: true` pulse (opacity 0.6 to 1) on the center node only. Pause it with `ScrollTrigger` when off-screen.

### 8.5 Optional

Smooth scrolling with **Lenis** is optional. If added, connect it to ScrollTrigger and disable it for reduced-motion users. Start without it.

---

## 9. Accessibility, performance, SEO, security

**Accessibility**

- One `<h1>` per page, headings in order. Landmarks: `header`, `nav`, `main`, `footer`.
- Skip link (in Layout). Visible focus ring. Touch targets at least 44px.
- Diagrams: `role="img"` with a short `aria-label`, or `aria-hidden="true"` if purely decorative; the text they illustrate is in the page.
- Form: every field has a `<label>`; errors are announced (`aria-live="polite"`) and tied with `aria-describedby`; radio group uses `<fieldset><legend>`.
- No information by color alone. Minimum text size 12px (`0.75rem`) for mono labels.
- Test: keyboard-only pass, a screen reader pass, and Lighthouse/axe on each page.

**Performance**

- Targets: Lighthouse 95+ on Performance, Accessibility, Best Practices and SEO.
- Use `astro:assets` `<Image />` for raster images (AVIF/WebP, sized). SVG for diagrams and icons.
- Self-hosted fonts; only load the weights used. Add `font-display: swap`.
- GSAP is the only meaningful JS. Do not add React unless a feature needs it.

**SEO**

- Unique `title` and `description` per page (via `Layout` props). Canonical URL. Open Graph image.
- `sitemap-index.xml` from the integration and `public/robots.txt`:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://anshtechlabs.com/sitemap-index.xml
  ```
- Add `Organization` JSON-LD on Home (name, url, logo, contact).

**Security (static host limits)**

- GitHub Pages cannot set custom HTTP headers. Add a CSP through a `<meta http-equiv="Content-Security-Policy">` tag in the layout (allow `self`, the form provider's domain in `connect-src`, no remote scripts). Some directives (such as `frame-ancestors`) do not work in a meta tag.
- If strong headers (HSTS, full CSP, frame protection) are a requirement for a forensics brand, keep the code on GitHub but host on **Cloudflare Pages or Netlify**. The Astro project does not change.
- No third-party trackers by default. If analytics are added later, use a privacy-friendly option and disclose it on `/privacy/`.
- Self-host everything. **Remove the Unsplash image** used on the current site.

---

## 10. Deployment (GitHub Pages)

`.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: withastro/action@v3
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

1. Push to GitHub. In **Settings → Pages → Source**, choose **GitHub Actions**. Free plans need a **public** repo.
2. Put `anshtechlabs.com` in `public/CNAME` and set the custom domain in Pages settings.
3. DNS: add the apex A records and a `www` CNAME. **Copy the current values from GitHub's Pages documentation.**
4. Enable **Enforce HTTPS** once the certificate is issued.
5. **Do not change DNS until the new site is ready.** The live site uses this domain. Test on the `github.io` URL first (with the temporary `base` setting).

---

## 11. Build order and checklist

**Phase 1: Foundation**
- [ ] Create the project, add Tailwind, GSAP, fonts, sitemap (2.1)
- [ ] Tokens in `global.css` (4.1) and sampled colors from Figma
- [ ] `Layout`, `Navbar` (with mobile menu), `Footer`, `Button`, `SectionHeader`
- [ ] Deploy an empty "Coming soon" page to GitHub Pages to prove the pipeline

**Phase 2: Core pages**
- [ ] Shared components (cards, pipeline, CTA band, stats)
- [ ] Home (7.1) with placeholder diagrams
- [ ] `solutions.ts` + `[slug].astro` → four product pages (7.3)
- [ ] Contact + `DemoForm` with all states (7.5, 7.6)

**Phase 3: New pages**
- [ ] Design, then build, Solutions overview (7.2) and About (7.4)
- [ ] Privacy and 404 (7.7)

**Phase 4: Motion and polish**
- [ ] `animations.ts` (8.1), diagrams (8.4), hover states
- [ ] Reduced-motion check; layout-shift check

**Phase 5: Quality and launch**
- [ ] Keyboard, screen reader and contrast checks (section 9)
- [ ] Lighthouse on every page; fix below 95
- [ ] Mobile pass at 360, 390, 768, 1024, 1440 px
- [ ] Real content, logos and contact details confirmed (section 12)
- [ ] Test on the `github.io` URL, then switch DNS, then enforce HTTPS

---

## 12. Open items (need the company's input)

1. **Partner logos:** written permission to display each (especially INTERPOL).
2. **Stats:** which numbers are verifiable (agencies served, officers trained, years).
3. **Contact details:** public email, address/location, LinkedIn, phone if any.
4. **Corporate Security:** are there offerings beyond STROTPRAGNA?
5. **Product facts** for the "What to expect" cards: deployment options, outputs/report types, training and support.
6. **Product visuals:** sanitized screenshots or short demo videos (never real case data).
7. **About page:** approved team description, optional leadership photos with consent.
8. **Privacy policy:** approved text; confirm the form provider and data retention.
9. **Logo files:** final SVG of the Ansh mark and wordmark, favicon, and the social share image.
10. **Mobile and tablet designs** for each page, and the hover/error/success states.
