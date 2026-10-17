# Ansh Tech Labs Website: Tech Stack

*Draft: 17 October 2026. Companion to [`idea.md`](./idea.md) (what and why) and [`design.md`](./design.md) (pages, components, copy).*

## 1. Stack at a glance

| Layer | Choice | Version checked* | Why |
|---|---|---|---|
| Framework | **Astro** | 7.4.0 | Builds to plain static HTML, ships almost no JavaScript, reusable components and layouts, dynamic routes for the four product pages |
| Styling | **Tailwind CSS** + `@tailwindcss/vite` | 4.3.3 | Design tokens in CSS (`@theme`), fast to build a custom dark UI. Astro's docs now recommend Tailwind's Vite plugin |
| Animation | **GSAP** + ScrollTrigger | 3.15.0 | Scroll reveals, count-up numbers, SVG line drawing, timelines |
| Fonts | **Fontsource** (Inter, JetBrains Mono) | 5.3.0 each | Self-hosted, so no third-party font requests |
| SEO | `@astrojs/sitemap` | 3.7.4 | Generates `sitemap-index.xml` |
| Formatting | Prettier + Astro and Tailwind plugins | 3.9.10 / 1.1.1 / 0.8.1 | One consistent code style |
| Type check | `@astrojs/check` | 0.9.10 | Catches errors in `.astro` files |
| Tests (light) | Playwright + axe-core | 1.64.1 / 4.14.0 | Automated accessibility check on key pages |
| Hosting | **GitHub Pages** (GitHub Actions deploy) | n/a | Free static hosting from the repo, custom domain `anshtechlabs.com` |
| Forms | Formspree or Web3Forms | n/a | A static site has no backend |

\* Latest versions on the npm registry, checked on 17 Oct 2026. Run `npm view <package> version` to see the current one. The lockfile is what actually pins versions.

**Runtime language:** JavaScript/TypeScript, HTML, CSS. No React, Vue or other UI framework.

## 2. Requirements

| Tool | Requirement | Notes |
|---|---|---|
| **Node.js** | **24 recommended**, minimum 22.22.0 | Astro 7.4.0 declares `>=22.22.0`. `eslint-plugin-astro` (optional) needs 22.22.3+ or 24.16+, and the deploy action defaults to Node 24, so 24 keeps everything aligned |
| npm | Comes with Node | |
| Git + GitHub account | | |
| Editor | VS Code | Extensions: **Astro** (`astro-build.astro-vscode`), **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`), **Prettier** (`esbenp.prettier-vscode`) |
| Browser | Chrome or Edge + Firefox | DevTools, Lighthouse |

Check: `node -v` and `npm -v`. To manage Node versions, use `nvm` or a similar tool and commit a `.nvmrc` file containing `24`.

## 3. Why these choices

### Framework: Astro

- Output is plain HTML, CSS and a little JavaScript, which is ideal for a content site: fast, SEO-friendly, hostable anywhere.
- Components fix the biggest weakness of a hand-written HTML site: the navbar, footer and cards live in one file each, not copied onto every page.
- One template plus one data file (`solutions.ts`) generates all four product pages.
- It is close to plain HTML/CSS/JS, so it is quick to learn.

| Alternative | Why not (for now) |
|---|---|
| Plain HTML/CSS/JS | Repeats the navbar and footer on every page; gets messy past a few pages |
| Vite + React | Fine, but ships more JavaScript than a marketing site needs and needs pre-rendering for good SEO |
| Next.js (static export) | Heavier than needed. Worth considering only if the site later becomes an app with logins |
| Eleventy / Hugo | Good for content-heavy sites, less ergonomic for component-style UI and rich animation |

### Styling: Tailwind CSS

- Design tokens (colors, fonts) are defined once in `global.css` and become utility classes like `bg-ink-900` and `text-cyan`.
- Utility classes keep styles next to the markup, which speeds up building the page designs.
- Alternative: hand-written CSS or scoped Astro `<style>` blocks. Valid, but slower for a design-heavy site and harder to keep consistent.

### Animation: GSAP

- Handles scroll-triggered animation reliably (ScrollTrigger), SVG path drawing, and timelines for the hero.
- It is free to use, including ScrollTrigger, under GSAP's standard license. Read the license terms before launch.
- Installed through npm and bundled with the site. No CDN script.
- **Fallback:** if we ever want zero animation JavaScript, simple reveals can use CSS and `IntersectionObserver`. We would lose the diagram draw-in and timeline control.
- Lenis (smooth scrolling, `lenis` 1.3.27) is **optional** and not part of the first build.

### Hosting: GitHub Pages

| Option | Good | Limits |
|---|---|---|
| **GitHub Pages** (chosen) | Free, code and hosting in one place, simple Actions deploy | **Free plans need a public repo.** No custom HTTP headers (no real CSP, HSTS control, etc.). No server code |
| Cloudflare Pages | Free, supports custom headers, can run small server functions | One more account and service |
| Netlify | Free tier, headers and form handling built in | One more account and service |

The Astro project is identical on all three. If strong security headers become a requirement for a forensics brand, only the deploy step changes.

### Forms: Formspree or Web3Forms

- External services that receive the form POST and email it to the team. Both have free tiers. **Check each one's current free limits and data handling before choosing.**
- The form endpoint or key is visible in a static site's code. Keep it in `PUBLIC_FORM_ENDPOINT` so it is easy to rotate, and rely on the provider's spam protection (honeypot field, captcha options) and rate limits.
- Name the provider in the privacy policy.

### Fonts and icons

- **Fonts:** `@fontsource-variable/inter` and `@fontsource-variable/jetbrains-mono`, imported in `global.css`. No requests to Google Fonts, which is better for privacy and speed.
- **Icons:** inline SVG components (copy from an open-source set such as Lucide or Tabler). No icon library dependency.

## 4. Dependencies

Install commands (from `design.md`):

```bash
npm create astro@latest ansh-tech-labs     # Empty template, install deps, init git
cd ansh-tech-labs
npm install tailwindcss @tailwindcss/vite
npx astro add sitemap
npm install gsap @fontsource-variable/inter @fontsource-variable/jetbrains-mono
```

Dev tools:

```bash
npm install -D prettier prettier-plugin-astro prettier-plugin-tailwindcss
npm install -D @astrojs/check
npm install -D @playwright/test @axe-core/playwright
npx playwright install chromium            # downloads the test browser
```

**Reference `package.json` (versions as checked; let npm choose and keep the lockfile):**

```json
{
  "name": "ansh-tech-labs",
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "check": "astro check",
    "format": "prettier --write .",
    "test:a11y": "playwright test"
  },
  "dependencies": {
    "astro": "^7.4.0",
    "@astrojs/sitemap": "^3.7.4",
    "tailwindcss": "^4.3.3",
    "@tailwindcss/vite": "^4.3.3",
    "gsap": "^3.15.0",
    "@fontsource-variable/inter": "^5.3.0",
    "@fontsource-variable/jetbrains-mono": "^5.3.0"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.10",
    "prettier": "^3.9.10",
    "prettier-plugin-astro": "^1.1.1",
    "prettier-plugin-tailwindcss": "^0.8.1",
    "@playwright/test": "^1.64.1",
    "@axe-core/playwright": "^4.14.0"
  }
}
```

`npm create astro` adds its own TypeScript setup. Keep whatever it installs rather than adding TypeScript by hand.

**Not installed on purpose:** React/Vue/Svelte, a CMS, a database, an SSR adapter, a UI component library, animation libraries other than GSAP, analytics or tracking scripts.

## 5. Project configuration

**`astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://anshtechlabs.com',
  // With a custom domain, do NOT set `base`.
  // For testing on username.github.io/repo-name, temporarily add: base: '/repo-name'
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
```

**`.prettierrc`** (the Tailwind plugin must be listed last)

```json
{
  "plugins": ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  "overrides": [{ "files": "*.astro", "options": { "parser": "astro" } }],
  "singleQuote": true
}
```

**`.env.example`** (commit this; never commit `.env` with real values)

```
PUBLIC_FORM_ENDPOINT=https://example.invalid/replace-me
```

**`.gitignore`** (create-astro generates one) must include `node_modules/`, `dist/`, `.astro/`, `.env`.

**`playwright.config.ts`** (minimal)

```ts
import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: 'tests',
  webServer: { command: 'npm run build && npm run preview', url: 'http://localhost:4321', reuseExistingServer: true },
  use: { baseURL: 'http://localhost:4321' },
});
```

**`tests/a11y.spec.ts`**

```ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const path of ['/', '/solutions/', '/solutions/strotpragna/', '/about/', '/contact/']) {
  test(`no axe violations on ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}
```

Automated checks catch only some accessibility problems. Keyboard and screen-reader passes are still required (see `design.md`, section 9).

## 6. Working process

- **Branches:** `main` deploys to production. Do work on short branches (`feature/home-page`) and merge through pull requests.
- **Before every merge:** `npm run format`, `npm run build` (includes the type check), `npm run test:a11y`.
- **Commits:** small and descriptive ("Add solution card component").
- **Local preview of the production build:** `npm run build && npm run preview`.
- **Performance check:** run Lighthouse in Chrome DevTools on each page. Target 95+ in all four categories.
- **Upgrading Astro:** use `npx @astrojs/upgrade`, read the release notes, test locally, then merge.
- **Content changes:** product copy lives in `src/data/solutions.ts` and `src/data/site.ts`. Editing those files updates every page that uses them.

## 7. Build and deploy

Workflow `.github/workflows/deploy.yml` (action versions per Astro's GitHub Pages deploy guide on 17 Oct 2026; re-check the guide before the first deploy):

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
      - uses: actions/checkout@v7
      - uses: withastro/action@v6
        # env:
        #   PUBLIC_FORM_ENDPOINT: https://...   # public values only
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v5
```

Notes from the guide:

- `withastro/action` takes optional inputs: `path`, `node-version` (default **24**), `package-manager`, `build-cmd`. It reads your **lockfile** to detect the package manager, so commit `package-lock.json`.
- Public environment variables go under `env:` on the action step. Do not put secrets there. Anything in the built site is public.
- **Custom domain:** put `anshtechlabs.com` in `public/CNAME`, set `site` to the custom domain, and do not set `base`.
- In the repo: **Settings → Pages → Source → GitHub Actions**. Then add the custom domain, set DNS (copy the current records from GitHub's Pages documentation), and tick **Enforce HTTPS** once the certificate is issued.
- **Do not change DNS until the new site is ready.** Test on the `github.io` address first.

## 8. Security and maintenance

- **Public repo means public code.** Never commit secrets, internal documents, real case data, or unreleased product details.
- **Dependabot:** add `.github/dependabot.yml` to get update pull requests for npm packages and GitHub Actions.

  ```yaml
  version: 2
  updates:
    - package-ecosystem: "npm"
      directory: "/"
      schedule: { interval: "weekly" }
    - package-ecosystem: "github-actions"
      directory: "/"
      schedule: { interval: "monthly" }
  ```
- Run `npm audit` before releases and review what it reports.
- **Headers:** GitHub Pages cannot set HTTP headers. Use a CSP `<meta>` tag (see `design.md`), knowing some directives do not work that way. Move hosting if full headers are required.
- **No third-party scripts.** Everything (fonts, GSAP, icons) is bundled and served from the same origin. That keeps the CSP simple and avoids tracker-related cookie banners.
- **Privacy:** the form provider processes submissions. State this in the privacy policy.

## 9. When to revisit the stack

| If this happens | Consider |
|---|---|
| Strong security headers become mandatory | Host on Cloudflare Pages or Netlify |
| The repo must be private | A host that supports private repos on its free plan, or a paid GitHub plan |
| Non-developers need to edit articles | A Git-based CMS (such as Decap or Keystatic) on top of Astro content collections |
| The site needs logins, dashboards or a database | A separate application (Astro SSR or another framework) beside this static site |
| Animation bundle size matters more than polish | CSS and `IntersectionObserver` for simple reveals |

## 10. What was and was not verified

| Item | Status |
|---|---|
| Package versions and Node minimums | Read from the npm registry on 17 Oct 2026 (`npm view`) |
| Deploy workflow and action versions | From Astro's GitHub Pages deploy guide. Could not be cross-checked against each action's GitHub releases from the build environment |
| Tailwind setup (Vite plugin) | Astro's Tailwind integration page marks the old integration deprecated and recommends the Vite plugin |
| Formspree/Web3Forms free limits and data terms | **Not checked.** Confirm before choosing |
| GitHub Pages size, bandwidth and build limits | **Not checked.** A small marketing site is far below the documented limits, but confirm in GitHub's docs |
| Nothing has been built or run yet | The commands and configs here are untested until the project is scaffolded |

## 11. Learning resources

- Astro docs and tutorial: <https://docs.astro.build>
- Tailwind CSS docs: <https://tailwindcss.com/docs>
- GSAP docs (ScrollTrigger): <https://gsap.com/docs>
- web.dev (performance and accessibility): <https://web.dev>
- MDN Web Docs: <https://developer.mozilla.org>
