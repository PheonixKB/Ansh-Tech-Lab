# Ansh Tech Labs Website: Project Idea

_Draft: 17 October 2026. Companion to [`design.md`](./design.md), which holds the build details._

## 1. The idea in one paragraph

Rebuild [anshtechlabs.com](https://anshtechlabs.com/) as a fast, static, trust-first website that explains what Ansh Tech Labs builds, who it is for, and how a team can start a conversation. Learn from established forensics and OSINT vendors, adopt only the patterns that suit a demo-led, law-enforcement-focused company, and ship a modern dark design with restrained motion. The site is built with Astro, Tailwind CSS and GSAP, and hosted from GitHub.

## 2. Why rebuild

What the current site does (checked on 16 Oct 2026):

- Four pages: Home, Our Solutions, About, Contact.
- Home shows four product cards (STROTPRAGNA, Dronlyzer, Fingerprint Kit, LEA Solutions) and a scrolling partner-logo strip.
- Gaps:
  - Products have no pages of their own with features, workflow or outputs.
  - The company's mission and expertise copy is not on the home page.
  - One card still uses a stock photo from Unsplash.
  - There is a single generic call to action ("Let's Connect").
  - No explanation of how the tools fit together, and no clear paths for the two audiences.

The buyers (police, forensic labs, government investigators, corporate security teams) are cautious. The site has to look credible and precise before anyone books a demo.

## 3. Goals

| Goal                                 | How we will know                                                                                |
| ------------------------------------ | ----------------------------------------------------------------------------------------------- |
| **Earn trust quickly**               | Clear product explanations, honest visuals, verified partners only, a responsible-use statement |
| **Generate qualified demo requests** | Number of demo-form submissions, and how many name an audience and a solution                   |
| **Be easy to maintain**              | Add a product by adding one data entry, not a new hand-built page                               |
| **Be fast and accessible**           | Lighthouse 95+ on all four categories, keyboard and screen-reader pass                          |
| **Stay safe to host**                | No secrets in the public repo, no third-party trackers, form data handled openly                |

These are proposed targets. The team should confirm them.

## 4. Audience

|                     | **Law Enforcement Agencies (LEA)**                                                                 | **Corporate Security teams**                                                    |
| ------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Who                 | Police, forensic laboratories, government investigators, field units                               | Security, threat-intelligence and risk teams                                    |
| Need                | End-to-end evidence collection and analysis pipelines                                              | Monitoring open-source signals and threat intelligence to prevent data breaches |
| Relevant solutions  | All four                                                                                           | STROTPRAGNA today (confirm others)                                              |
| What convinces them | Specific capabilities, workflow, deployment and outputs, proof of experience, a human conversation | Same, plus clarity on how it fits an existing security process                  |

## 5. Positioning and tone

- **Promise:** "From complex digital data to actionable legal evidence."
- **Three pillars:** Collect · Correlate · Analyze/Report, used consistently across every page.
- **Tone:** confident, plain and precise. Describe what the tool does. No buzzwords, no "hacker" clichés (no matrix text, no hooded figures).
- **Honesty rule:** nothing goes on the site that the company cannot verify. That means no invented statistics, testimonials, logos or certifications, and every illustrative visual is labelled as illustrative.

## 6. What we learned from reference sites

We checked the navigation and page types of **Magnet Forensics** and **Maltego** directly. Cellebrite's page could not be fetched, so nothing here is claimed about it. Recorded Future, Flashpoint and Palantir came up earlier as visual references and were not re-checked for this section.

| Pattern                                                                                                                                                                                            | Seen on                                                                 | Decision for Ansh Tech Labs                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Navigation organised by **audience or industry** (Magnet: public safety, federal, military and intelligence, enterprise; Maltego: government, law enforcement, cyber threat intelligence, banking) | Magnet, Maltego                                                         | **Adopt.** Solutions page with Law Enforcement and Corporate Security sections                                      |
| **One page per product**                                                                                                                                                                           | Magnet, Maltego                                                         | **Adopt.** Four product pages from one template                                                                     |
| **Demo-led conversion** ("Get a Demo", contact CTAs repeated down the page)                                                                                                                        | Magnet, Maltego                                                         | **Adopt.** Demo form is the primary goal                                                                            |
| **Partner pages / data partners**                                                                                                                                                                  | Magnet, Maltego                                                         | **Adopt, verified only.** Partners section on About                                                                 |
| **Trust & security centre**                                                                                                                                                                        | Magnet, Maltego (also shows an ISO 27001 certification on its homepage) | **Adopt a light version:** "Security & responsible use" page. Mention certifications only if the company holds them |
| **Resources hub** (blog, case studies, white papers, webinars, events)                                                                                                                             | Magnet, Maltego                                                         | **Later (v1.1/v2).** Needs real content and an owner                                                                |
| **Training / Academy**                                                                                                                                                                             | Magnet, Maltego                                                         | **Later**, if the company offers training                                                                           |
| **Documentation and support portal / sign-in**                                                                                                                                                     | Maltego, Magnet (customer portal)                                       | **Link out later.** A static site cannot host logins                                                                |
| **Customer logos, video testimonials, headline stats**                                                                                                                                             | Magnet, Maltego                                                         | **Only with permission and real data.** Skip until available                                                        |
| **Product video or demo loop on the homepage**                                                                                                                                                     | Magnet (hero video), Maltego (product video)                            | **Consider.** Short, sanitized demo loop once available                                                             |
| **Pricing page and free trial / buy online**                                                                                                                                                       | Maltego, Magnet                                                         | **Skip.** Sales here are demo-led for agencies                                                                      |
| **Sales pop-up and cookie banner**                                                                                                                                                                 | Magnet                                                                  | **Avoid.** Pop-ups hurt trust. No trackers means no cookie banner is needed                                         |
| **Community, wellness and scholarship programmes**                                                                                                                                                 | Magnet                                                                  | **Skip** for now                                                                                                    |
| **Careers page**                                                                                                                                                                                   | Magnet (Company), Maltego (About Us)                                    | **Later.** Small Careers page when hiring                                                                           |

## 7. Scope

**Version 1 (launch)**

- Home
- Solutions overview (Law Enforcement and Corporate Security sections)
- Four product pages: STROTPRAGNA, Dronlyzer, Fingerprint Kit, LEA Solutions
- About
- Contact / Request a Demo (with audience selector and clear form states)
- Privacy
- 404

**Version 1.1**

- Security & responsible use
- Careers
- Insights: short articles written by the team (Astro content collections, Markdown files)
- Real product screenshots or a short demo loop (sanitized data only)

**Version 2 (needs content and decisions)**

- Case studies (sanitized, with permission)
- Webinars and events
- Training / Academy, if offered
- Documentation and support, linked out to wherever it lives
- Possibly a second language for Indian agencies (idea to validate, not a commitment)

**Not planned**

- Pricing, free trials, accounts and sign-in, live chat, third-party tracking.

## 8. Experience ideas

- **Hero diagram that explains the product:** lines connect signals to an entity, then to evidence. Subtle draw-in animation.
- **Interactive pipeline:** Collect → Correlate → Analyze → Report. Each step lights up on scroll and can expand to show what happens (v1.1).
- **Audience-aware demo form:** choosing Law Enforcement or Corporate Security changes the suggested solutions.
- **Case-file visual language:** numbered mono eyebrows, figure captions, thin borders. It makes the site feel like documentation, which suits the subject.
- **Responsible-use note on the contact form:** "Please do not include case evidence, personal identifiers or sensitive operational details." This is already in the approved design and should stay.

## 9. How we will build it (summary)

- **Astro** (static pages, reusable components, dynamic routes), **Tailwind CSS**, **GSAP** (scroll animation), self-hosted fonts.
- Product pages generated from one data file (`solutions.ts`), so adding a product is a data change.
- **GitHub Pages** via GitHub Actions, with the `anshtechlabs.com` custom domain.
- Forms through an external service (Formspree or Web3Forms), since a static site has no backend.
- Full detail, tokens, components, page copy and animation code are in `design.md`.

## 10. Risks and how we handle them

| Risk                                                                 | Mitigation                                                                                                                                                |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Claims, stats or logos the company cannot back up damage credibility | Verified-only rule. Placeholders never go to production. Get written permission for logos, especially INTERPOL                                            |
| GitHub Pages cannot set security headers (CSP, HSTS and others)      | Use a CSP meta tag now. If strong headers are a requirement, keep the repo on GitHub but host on Cloudflare Pages or Netlify. The project does not change |
| Free GitHub Pages requires a **public repo**                         | Never commit secrets, internal documents, real case data or unreleased product details. Review every commit                                               |
| Form submissions pass through a third party                          | Say so in the privacy policy. Warn visitors not to submit case data. Choose a provider the company approves                                               |
| Switching DNS takes the live site offline                            | Test on the `github.io` address first. Change DNS only when the new site is ready, outside business hours                                                 |
| Content is not ready (copy, screenshots, contact details)            | Section 12 of `design.md` lists what is needed. Build with clearly marked placeholders in staging only                                                    |
| Scope grows                                                          | Hold to the v1 list. Move everything else to v1.1 or v2                                                                                                   |
| Small team, limited time                                             | Build in phases. Each phase ends in something deployable                                                                                                  |

## 11. Suggested order of work

1. Project setup, tokens, layout, navbar and footer. Deploy an empty page to prove the pipeline.
2. Shared components, then Home.
3. Product data file and the four product pages.
4. Contact page and form, with all states.
5. Design and build Solutions overview and About. Write Privacy and 404.
6. Animations, accessibility and performance pass, mobile pass.
7. Confirm content with the company, then launch (DNS switch last).
8. After launch: v1.1 items.

## 12. Open questions for the team

1. Which partners and contributors may be shown publicly, and in what form?
2. Which numbers can we state (years, agencies served, officers trained)?
3. Does the company have offerings for corporate security beyond STROTPRAGNA?
4. Do any certifications or accreditations exist that can be shown?
5. Where should submissions go (which inbox) and who replies?
6. Can we have sanitized screenshots or a short demo recording for each product?
7. Is the repo allowed to be public, or should hosting move to a platform that supports private repos?
8. Is a second language wanted?
9. Who owns content updates after launch?

## 13. Related documents

- `design.md`: setup, design tokens, components, every page, animation code, deployment and checklist.
- Figma screens: Home, four product pages, Contact (approved). Solutions overview and About are still to be designed.
