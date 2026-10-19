# Feature Tickets: Ansh Tech Labs Website

## Version 1 (Launch) - Core Requirements

| ID    | Title                       | Description                                                                                                           | Status      | Priority |
| ----- | --------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----------- | -------- |
| FT-01 | Home page design and build  | Implement home page with hero, trust row, partner strip, audience cards, solution portfolio, pipeline steps, CTA band | pending     | High     |
| FT-02 | Solutions overview page     | Build /solutions/ page with Law Enforcement and Corporate Security sections                                           | pending     | High     |
| FT-03 | Four product detail pages   | Generate from template: STROTPRAGNA, Dronlyzer, Fingerprint Kit, LEA Solutions                                        | pending     | High     |
| FT-04 | About page                  | Build /about/ page with mission, expertise, who we serve                                                              | pending     | Medium   |
| FT-05 | Contact page                | Build /contact/ page with demo request form (disabled until provider approved)                                        | pending     | High     |
| FT-06 | Privacy page                | Build /privacy/ page with policy text and visitor warning                                                             | pending     | Medium   |
| FT-07 | 404 page                    | Build /404 error page                                                                                                 | pending     | Low      |
| FT-08 | Navigation and layout       | Implement Navbar, Footer, Layout wrapper across all pages                                                             | pending     | High     |
| FT-09 | Data file setup             | Create src/data/solutions.ts and src/data/site.ts as single source of truth                                           | pending     | High     |
| FT-10 | CSP and security compliance | Ensure build is CSP-clean, no inline scripts/styles, form-action 'none' ✓                                             | in_progress | High     |

## Version 1.1 (Post-Launch)

- Security & responsible use page
- Careers page
- Insights blog section
- Real product screenshots/demo loops
- Second language support (optional)

## Version 2 (Needs Content)

- Case studies (sanitized, with permission)
- Webinars and events
- Training / Academy
- Documentation and support portal
- Possibly second language for Indian agencies

## Ongoing / Open Items

- Form provider selection and privacy policy text (admins to decide)
- Partner logos: which can be shown, written permission needed
- Named content approver and exception process
- Branch protection, CODEOWNERS, 2FA settings (admins to approve)
- Domain registrar and DNS configuration
- Whether repo can be public or needs private hosting
- Second language requirement validation

## Definition of Done (per PR)

- [ ] `npm run build` passes with no warnings
- [ ] `astro check` and Prettier pass
- [ ] Playwright and axe tests pass (no serious/critical issues)
- [ ] No CSP violations in browser console
- [ ] Keyboard-only walkthrough works; reduced-motion respected
- [ ] Checked at 360, 768 and 1280 px widths, no horizontal scroll
- [ ] Lighthouse target 95+ on all four categories (mobile)
- [ ] No new third-party requests
- [ ] Content & security checklist from security.md section 6 completed
- [ ] No staff addresses, secrets, real case data or unapproved names in the diff
