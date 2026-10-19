# Feature Tickets: Ansh Tech Labs Website

## Version 1 (Launch) - Core Requirements

| ID    | Title                       | Description                                                                                                           | Status    | Priority |
| ----- | --------------------------- | --------------------------------------------------------------------------------------------------------------------- | --------- | -------- |
| FT-01 | Home page design and build  | Implement home page with hero, trust row, partner strip, audience cards, solution portfolio, pipeline steps, CTA band | completed | High     |
| FT-02 | Solutions overview page     | Build /solutions/ page with Law Enforcement and Corporate Security sections                                           | completed | High     |
| FT-03 | Four product detail pages   | Generate from template: STROTPRAGNA, Dronlyzer, Fingerprint Kit, LEA Solutions                                        | completed | High     |
| FT-04 | About page                  | Build /about/ page with mission, expertise, who we serve                                                              | completed | Medium   |
| FT-05 | Contact page                | Build /contact/ page with demo request form (disabled until provider approved)                                        | completed | High     |
| FT-06 | Privacy page                | Build /privacy/ page with policy text and visitor warning                                                             | completed | Medium   |
| FT-07 | 404 page                    | Build /404 error page                                                                                                 | completed | Low      |
| FT-08 | Navigation and layout       | Implement Navbar, Footer, Layout wrapper across all pages                                                             | completed | High     |
| FT-09 | Data file setup             | Create src/data/solutions.ts and src/data/site.ts as single source of truth                                           | completed | High     |
| FT-10 | CSP and security compliance | Ensure build is CSP-clean, no inline scripts/styles, form-action 'none' ✓                                             | completed | High     |

## Version 1.1 (Post-Launch)

| ID    | Title                      | Description                                         | Status  | Priority |
| ----- | -------------------------- | --------------------------------------------------- | ------- | -------- |
| FT-11 | Security & responsible use | Add /security/ page with responsible use guidelines | pending | High     |
| FT-12 | Careers page               | Add /careers/ page (placeholder with admin note)    | pending | Medium   |
| FT-13 | Insights blog section      | Add blog index and first placeholder post           | pending | Medium   |
| FT-14 | Product screenshots/demo   | Replace conceptual diagrams with placeholders       | pending | Low      |
| FT-15 | Second language support    | Optional: add i18n structure if approved            | pending | Low      |

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
