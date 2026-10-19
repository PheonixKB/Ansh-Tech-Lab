# Ansh Tech Labs Website: Security Plan

_Draft: 17 October 2026. Companion to [`idea.md`](./idea.md), [`design.md`](./design.md) and [`tech-stack.md`](./tech-stack.md)._

This document records the security decisions made for the website, the rules developers follow, and the items that still need an owner. Nothing in it is a guarantee. It is a plan to review with the company admins before coding starts.

---

## 1. Decisions log

| #   | Topic                                | Decision                                                                                                                                                                                                                                                    | Status                                                     |
| --- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| 1   | Hosting and security headers         | Host on **GitHub Pages**. **Accept its limits and use meta tags** (CSP, referrer policy) instead of HTTP headers                                                                                                                                            | **Decided**                                                |
| 2   | Repository ownership                 | The repo **belongs to Ansh Tech Labs Pvt. Ltd.** Admins: **Harsh Panchal** ([harshp2035](https://github.com/harshp2035)) and **Jay Makwana** ([Jay04Makwana](https://github.com/Jay04Makwana)). The website is company property. The developer is an intern | **Decided**                                                |
| 3   | What we never publish                | Real case data, client or agency names, active deployments; operational details that help adversaries; sanitized demo data only; screenshots and PDFs stripped of metadata; a named person approves content                                                 | **Decided** (approver's name still needed, see section 12) |
| 4   | Contact form and data handling       | Submissions are emailed to **jay@anshtechlabs.com** and **hp@anshtechlabs.com**. Provider, retention and privacy policy still to be decided                                                                                                                 | **Partly decided** (section 7)                             |
| 5   | Domain, DNS and email authentication | Proposed in section 9                                                                                                                                                                                                                                       | Needs admin approval                                       |
| 6   | GitHub account and branch rules      | Proposed in section 5                                                                                                                                                                                                                                       | Needs admin approval                                       |
| 7   | Supply chain rules                   | Proposed in section 8                                                                                                                                                                                                                                       | Needs admin approval                                       |
| 8   | `security.txt` and incident plan     | Proposed in sections 11 and 13                                                                                                                                                                                                                              | Needs admin approval                                       |

---

## 2. What we are protecting, and from whom

**Assets**

- The domain `anshtechlabs.com` and its DNS
- The company's GitHub organization and this repository
- The live website and the company's reputation with law-enforcement buyers
- The company's unpublished product and customer information (it must never reach the repo)

**Who might attack**

- **Automated and opportunistic attackers:** defacement, spam, credential stuffing against accounts.
- **Impersonators:** lookalike domains and fake copies of the site to phish agencies. Security vendors are common targets.
- **Targeted adversaries:** criminals or hostile groups interested in the company's tools, customers or staff.
- **Mistakes:** an accidental commit of a secret, a screenshot with real data, a photo with GPS metadata.

**What this means.** A static site has no server code and no database, so classic attacks (SQL injection, server compromise) mostly do not apply. The realistic risks are **account takeover** (GitHub, registrar, DNS), **poisoned dependencies**, **impersonation**, **accidental disclosure** and **defacement**. The controls below are aimed there.

---

## 3. Hosting and headers (Decision 1)

GitHub Pages cannot set custom HTTP response headers, so we use `<meta>` tags in `Layout.astro`.

### 3.1 What meta tags can and cannot do

| Control                                                     | Via meta tag?                  | Plan                                                                                                                                                      |
| ----------------------------------------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Content-Security-Policy (most directives)                   | Yes                            | Set in `<head>` (section 3.2)                                                                                                                             |
| `frame-ancestors` (clickjacking protection)                 | **No**, ignored in meta        | Not available. See risk note below                                                                                                                        |
| CSP `report-uri` / `sandbox`                                | **No**                         | Not available                                                                                                                                             |
| Referrer policy                                             | Yes (`<meta name="referrer">`) | `strict-origin-when-cross-origin`                                                                                                                         |
| X-Frame-Options, X-Content-Type-Options, Permissions-Policy | **No**                         | Not available                                                                                                                                             |
| HSTS                                                        | No                             | Not controllable by us. Enable **Enforce HTTPS** in Pages settings and **check after launch** whether the host sends HSTS. Do not claim it until verified |

**Accepted risk: clickjacking.** The site could be framed by another site. Impact is low, because the site has no logins and no sensitive actions. The only thing a framing attacker could do with the contact form is trick someone into sending a message. The real concern is impersonation, handled in section 9. Revisit this if any feature beyond the contact form is added.

### 3.2 Starting CSP (meta tag)

```html
<meta
  http-equiv="Content-Security-Policy"
  content="
  default-src 'self';
  script-src 'self';
  style-src 'self';
  img-src 'self' data:;
  font-src 'self';
  connect-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'none';
"
/>
<meta name="referrer" content="strict-origin-when-cross-origin" />
```

Notes:

- `form-action 'none'` and `connect-src 'self'` are the **no-form** values and stay until the form provider is approved. Then change them to allow only that provider's endpoint, and nothing else (section 7.4).
- This policy forbids inline scripts, inline `<style>` blocks and `style=""` attributes. **Astro may inline small scripts or styles.** To keep the policy strict:
  - Set `build.inlineStylesheets: 'never'` in `astro.config.mjs` so CSS stays in external files.
  - Check the built HTML (`dist/`) for inline `<script>` content. If some exist, either bundle them as external files or allow them by hash. Astro has built-in support for generating CSP hashes (it began as an experimental option). **Verify the current option name in the Astro docs** before relying on it.
- GSAP changes styles from JavaScript through the style API, which CSP generally allows. **Test every animation with the policy active** and fix violations in the browser console.
- Everything (fonts, GSAP, icons) is self-hosted, so no external domains appear in the policy. Adding any external domain later is a security decision, not just a code change.
- A CSP delivered by meta tag only applies to content that appears after the tag, so it must be the **first element after `<meta charset>`** in `<head>`.

### 3.3 When to revisit hosting

Move the same Astro project to Cloudflare Pages or Netlify (which support real headers) if any of these become true: the contact form or another interactive feature turns out to need protections meta tags cannot give (such as frame protection); the company is asked for header-level controls by a customer security review; a scan shows missing headers matter for a deal.

---

## 4. Threats and controls at a glance

| Threat                                                           | Likelihood / impact (qualitative) | Main controls                                                                                                         |
| ---------------------------------------------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| GitHub account takeover, malicious commit                        | Medium / High                     | Mandatory 2FA, branch protection, code owner review, least privilege (section 5)                                      |
| Registrar or DNS hijack                                          | Low-Medium / **Very high**        | Registrar 2FA and transfer lock, restricted access, CAA (section 9)                                                   |
| Poisoned npm package or GitHub Action                            | Medium / High                     | Lockfile, `npm ci`, pinned actions, Dependabot, small dependency list (section 8)                                     |
| Lookalike domain / fake site                                     | Medium / High                     | Defensive domains, brand monitoring, email authentication (section 9)                                                 |
| Accidental disclosure (data, metadata, secrets)                  | Medium / High                     | Content policy, asset hygiene, secret scanning, review (sections 5, 6)                                                |
| Defacement through a bad merge                                   | Low / High                        | PR review, protected `main`, fast rollback (section 13)                                                               |
| XSS via our own code                                             | Low / Medium                      | Strict CSP, coding rules, no third-party scripts (sections 3, 10)                                                     |
| Clickjacking                                                     | Low / Low                         | Accepted for now (section 3.1)                                                                                        |
| Form abuse, spam floods, data leakage, impersonation of agencies | Medium / Medium                   | Provider spam controls, recipients kept out of the repo, minimal fields, submissions treated as untrusted (section 7) |

---

## 5. Repository ownership and access (Decision 2)

### 5.1 Ownership

- The repository lives under the **company's GitHub organization** (not a personal account). _Organization and repository names: to be filled in by the admins._
- Admins: **Harsh Panchal** (`harshp2035`) and **Jay Makwana** (`Jay04Makwana`). Two admins avoids a single point of failure.
- The intern developer is a **contributor with Write access, not Admin**. They work on branches and open pull requests. An admin merges.
- **Free GitHub Pages needs a public repository.** Treat everything in it, including history, as public forever.

### 5.2 Proposed settings (admins to approve)

| Setting                                                         | Value                                                                                                                          |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Organization: require two-factor authentication for all members | **On**                                                                                                                         |
| Branch protection (or ruleset) on `main`                        | Require a pull request, **at least 1 approval**, require status checks (build + tests), block force-pushes and branch deletion |
| `.github/CODEOWNERS`                                            | Admins own everything, so their approval is required on every change (below)                                                   |
| Secret scanning and push protection                             | **On**                                                                                                                         |
| Dependabot alerts and updates                                   | **On** (section 8)                                                                                                             |
| Actions: default `GITHUB_TOKEN` permissions                     | Read-only; the deploy workflow requests only what it needs                                                                     |
| Pages: Enforce HTTPS                                            | **On** after the certificate is issued                                                                                         |
| Member list review                                              | Quarterly, and when anyone leaves (including the end of the internship)                                                        |

`.github/CODEOWNERS`:

```
# Every file needs approval from a company admin
*  @harshp2035 @Jay04Makwana
```

(For this to enforce review, turn on "Require review from Code Owners" in the branch rule.)

### 5.3 Developer account hygiene

- Use 2FA on your GitHub account (an authenticator app or a passkey is stronger than SMS).
- **Commit with your GitHub no-reply email**, not a personal address, since commit authorship is public in a public repo. In GitHub settings: _Emails_ → "Keep my email addresses private" and "Block command line pushes that expose my email". Then set `git config user.email` to the no-reply address GitHub shows.
- Never paste tokens or keys into the repo, issues, pull requests or chat. If one leaks, **rotate it immediately**. Deleting a commit does not make a public leak safe.
- Do your work on branches and never push straight to `main`.

---

## 6. Content disclosure policy (Decision 3)

### 6.1 Never publish

1. **Real case data**: anything from a real investigation (names, numbers, dates, photos, documents, extracted data).
2. **Client or agency names, and active deployments**: no statements such as "deployed at [agency]" or "used in [case]".
3. **Operational details that help adversaries** (section 6.2).
4. **Anything not sanitized**: screenshots, videos and diagrams use **synthetic data only**.
5. **Hidden metadata** in files (section 6.4).

### 6.2 What counts as helping an adversary

Test before writing or approving a sentence or image: _"Would this help someone evade, counter or attack the tool, or identify who uses it?"_ If yes, do not publish. Examples:

- Exact data sources, forums or collection methods the OSINT platform monitors
- Supported-device lists or extraction techniques at a level that reveals limits or weaknesses
- Known limitations, failure modes or detection gaps of any product
- Deployment architecture, hostnames, IP ranges, internal tool names or version numbers
- Names, roles and photos of staff beyond what the company has approved
- Details of how agencies use the tools, or who the customers are

### 6.3 Synthetic data rules for visuals and demos

- No real fingerprints, faces, license plates, phone numbers, IMEIs, MAC addresses, IP addresses, email addresses, crypto wallet addresses or transaction hashes. Use obviously fake placeholders (the designs already use labels like "WALLET A").
- No real flight paths or coordinates for the drone page. Use abstract paths.
- Label illustrative visuals (`CONCEPTUAL WORKFLOW / ILLUSTRATIVE DATA`), as in the approved designs.
- Stock and AI-generated images: confirm the license and strip their metadata too.

### 6.4 Asset hygiene (before any file enters the repo)

Images and PDFs often carry hidden data: GPS coordinates, camera model, author name, editing software, document properties.

- Files in `public/` are copied **as-is**, so strip them yourself. Images processed by Astro's image tooling are re-encoded, but do not rely on that for files in `public/`.
- With ExifTool (untested here; try it on a copy first):
  ```bash
  exiftool -all= -overwrite_original image.jpg      # strip an image
  exiftool -all= -overwrite_original brochure.pdf   # PDFs: then rewrite the file so old data is gone
  qpdf --linearize brochure.pdf brochure-clean.pdf
  ```
- To report what a folder still contains (for review):
  ```bash
  exiftool -r -Author -Creator -Artist -Producer -Software -GPSPosition -Make -Model public/
  ```
- Check SVG source by eye for comments, local file paths and author fields.
- Keep original working files **outside** the repo.

### 6.5 Approval process

- **Named content approver: to be confirmed by the admins** (see section 12). They approve all copy, images, logos and demo content.
- Every pull request that changes copy or assets includes this checklist (add it as `.github/pull_request_template.md`):

```markdown
## Content & security checklist

- [ ] No real case data, client/agency names or active deployments
- [ ] No operational details that could help an adversary
- [ ] All screenshots and demos use synthetic data
- [ ] Images and PDFs have metadata stripped
- [ ] Partner logos and claims are approved in writing
- [ ] No secrets or personal information in the diff
- [ ] Content approver has reviewed
```

### 6.6 Partner logos: a rule conflict to resolve

The current site shows partner logos (including NFSU and INTERPOL). Rule 2 above says "no agency names". Decide explicitly whether **named partners** are allowed as an exception. Proposed answer: **yes, only with written permission and the approver's sign-off, listed as "partners and contributors", never as customers or deployments.** Until decided, the partner strip stays out of production.

---

## 7. Contact form and data handling (Decision 4)

**Status: recipients decided; provider, retention and privacy text still open.** The form was skipped earlier. The company has now named who receives submissions, so the form is back in scope. Build the form UI and its states, but **do not connect submission to any provider until the admins approve the provider and the privacy text** (open items 5 and 8).

### 7.1 Recipients (decided)

Submissions are emailed to:

- `jay@anshtechlabs.com`
- `hp@anshtechlabs.com`

Rules for handling these addresses:

1. **Keep them out of the repo.** This repository is public. Configure the recipients in the **form provider's dashboard**, never in code, HTML, config files or workflow files. Two staff addresses in public code invite spam and phishing aimed at those people, and if they belong to the repository admins, their inboxes are exactly the accounts an attacker wants. **Do not paste these addresses into any file that is committed to the website repo, including copies of this document.**
2. **Consider one shared alias instead (recommended, admins to decide).** Create a role address such as `contact@anshtechlabs.com` at the company's mail host that forwards to both mailboxes, and give the provider only the alias. Recipients can then change without touching the form setup, nobody's personal mailbox is exposed to the provider, and a departure does not break delivery.
3. **Check that the provider can send to two recipients on the plan chosen.** Not verified here.
4. **Treat every submission as untrusted.** Anyone can write anything. Do not open links or attachments from submissions casually, and verify who someone is before sharing anything. Because the site serves law-enforcement buyers, expect attempts to impersonate an agency.
5. **Deliverability:** emails come from the provider's sending domain. After setup, confirm they reach **both** inboxes and not spam, and add the sender to an allow list. Set Reply-To to the visitor's email so replying works.
6. **Retention:** submissions will sit in two inboxes and in the provider's logs. Agree how long they are kept and who may access them.

### 7.2 Behavior until the provider is approved

- The form UI and its states are built, but **submit is disabled** (or shows "coming soon").
- **Nothing is posted anywhere.** The CSP keeps `form-action 'none'` and `connect-src 'self'` (section 3.2).
- Do not show the two recipient addresses on the page. If a public email is needed, use a role address such as `contact@` (open item 5).

### 7.3 Still to decide

- **Which provider.** Check each one's free limits, number of recipients and data terms. The account must be **company-owned**, not personal.
- **Which fields are collected.** The design has audience, name, work email, organization, solution and message. Collect the minimum.
- **Spam controls** (honeypot, captcha, rate limits, as the provider offers).
- **Privacy policy text**, reviewed by counsel (India's data-protection law, the DPDP Act, should be checked). The visitor warning stays: "Please do not include case evidence, personal identifiers or sensitive operational details."
- **Alias or two direct addresses** (7.1, rule 2).

### 7.4 Checklist when connecting the form

- [ ] Provider approved by the admins and the account owned by the company
- [ ] Recipients configured in the provider's dashboard, none in the repo
- [ ] CSP changed from the no-form values to allow only the provider's endpoint, nothing else
- [ ] Test submission arrives in **both** inboxes and not in spam
- [ ] Spam test (honeypot and rate limits behave)
- [ ] Privacy page published and linked from the form
- [ ] Retention rule written down
- [ ] Incident runbook (section 13) updated with how to rotate the form key and disable the form

---

## 8. Supply chain and build security

- **Keep dependencies few.** The planned list is in `tech-stack.md`. Adding a package needs a reason and a review.
- **Commit `package-lock.json`.** CI uses `npm ci`, which installs exactly what the lockfile says.
- **Dependabot** for npm (weekly) and GitHub Actions (monthly) via `.github/dependabot.yml` (example in `tech-stack.md`). Review every update pull request. Do not auto-merge.
- **Run `npm audit`** before releases and read what it reports.
- **Pin third-party GitHub Actions to a full commit SHA**, not a version tag, because tags can be moved. Add a comment with the version, for example:
  ```yaml
  - uses: withastro/action@<full-40-character-commit-sha> # v6
  ```
  Look up the SHA for the version listed in Astro's deploy guide. Dependabot can keep pinned SHAs updated.
- **Workflow permissions:** only `contents: read`, `pages: write`, `id-token: write`, as in the deploy workflow. No other secrets are needed, since the site has no form.
- **No third-party scripts, fonts or embeds.** Everything is bundled and served from our own domain. Videos, if added, are self-hosted files, not embedded players.
- Treat `npm install` scripts and new maintainers of a package as warning signs during dependency review.

---

## 9. Domain, DNS and email (proposed; admins to approve)

The domain is the single most valuable asset. Whoever controls DNS can send visitors anywhere.

| Control              | Proposal                                                                                                                                                                                 |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Registrar account    | Owned by the **company**, not an individual. 2FA on, recovery email and phone are company-controlled                                                                                     |
| Domain lock          | Registrar/transfer lock on. Auto-renew on, with renewal reminders to two people                                                                                                          |
| Who can change DNS   | Admins only. Log who has access                                                                                                                                                          |
| CAA record           | Restrict which certificate authorities may issue certificates for the domain                                                                                                             |
| DNSSEC               | Enable if the registrar supports it                                                                                                                                                      |
| Dangling records     | Remove DNS records that point to services the company no longer uses (prevents subdomain takeover)                                                                                       |
| Email authentication | Set **SPF, DKIM and DMARC** for the domain so attackers cannot easily send mail pretending to be the company                                                                             |
| Lookalike domains    | Consider registering obvious variants (other extensions, common misspellings) and periodically search for fake copies of the site                                                        |
| DNS cutover          | The live site uses this domain today. **Do not change DNS until the new site has been tested on its `github.io` address and approved.** Change it in a quiet window with a rollback plan |

---

## 10. Developer coding rules

These keep the strict CSP valid and the code safe:

1. **No inline scripts, no inline event handlers** (`onclick=...`) and no `style=""` attributes. Use classes and bundled scripts.
2. **Never build HTML from untrusted strings.** Avoid `innerHTML` and Astro's `set:html` unless the content is a trusted, reviewed literal.
3. **No `eval`, `new Function`, or string-based `setTimeout`.**
4. **No third-party scripts, styles, fonts or iframes.** If one is truly needed, it requires admin approval and a CSP change.
5. **External links** that open a new tab use `rel="noopener noreferrer"`.
6. **No secrets in code, config or commit history.** The site has no secrets to hold. If something looks like one, ask.
7. **No real data in code or comments**: no real names, emails, IPs, wallet addresses or case references, even as test values.
8. **Check `dist/` after building** for unexpected inline scripts or external requests, and test pages with the browser console open for CSP errors.
9. **Review the Network tab** on each page: only requests to our own domain should appear.

---

## 11. `security.txt`

A short file that tells researchers how to report a problem. Place it at `public/.well-known/security.txt` (and add an empty `public/.nojekyll` so dot-folders are never dropped by the host. Confirm after deploy that `https://anshtechlabs.com/.well-known/security.txt` loads).

```
Contact: mailto:TBD@anshtechlabs.com
Expires: 2027-10-17T00:00:00.000Z
Preferred-Languages: en
Canonical: https://anshtechlabs.com/.well-known/security.txt
```

The contact address is **to be provided by the admins**. It must be monitored. Update `Expires` at least yearly, and put a calendar reminder on it.

---

## 12. Open items for the admins

| #   | Question                                                                                                                                                | Owner  |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 1   | **Who is the named content approver**, and who covers when they are away?                                                                               | Admins |
| 2   | GitHub **organization and repository names**; confirm the repo sits under the company organization                                                      | Admins |
| 3   | Approve the proposed branch protection, CODEOWNERS, 2FA and secret-scanning settings (section 5.2)                                                      | Admins |
| 4   | Partner logos: allowed as an exception to "no agency names"? Written permission on file? (section 6.6)                                                  | Admins |
| 5   | Contact page: show any public email? Prefer a role address such as `contact@` over the two recipient addresses (section 7)                              | Admins |
| 6   | Who owns the domain registrar account and DNS? Are the section 9 controls in place?                                                                     | Admins |
| 7   | Email for `security.txt`, and who monitors it                                                                                                           | Admins |
| 8   | Who decides the **form provider** and approves the privacy policy? One shared alias or two direct addresses? Who owns the provider account? (section 7) | Admins |
| 9   | Does anyone on the team need Write access besides the intern? Who reviews access when the internship ends?                                              | Admins |

---

## 13. Incident response (short runbook)

**Examples:** defaced or unexpected content on the live site; a leaked secret or sensitive file in the repo; a suspicious commit; DNS or domain changes nobody made; a fake copy of the site.

1. **Detect and tell:** whoever notices tells both admins immediately (phone, not only email). Record the time and what was seen.
2. **Contain:**
   - Bad content live: **revert the commit** (`git revert`) and push, or re-run the deploy on the last good commit. For a serious case, unpublish the site (repo _Settings → Pages_) until it is fixed.
   - Leaked secret or file: **rotate** the secret first, then remove the file. Assume anything pushed to a public repo has already been copied.
   - Account takeover suspected: remove the account from the organization, reset credentials, review the organization **audit log** and recent commits.
   - DNS or domain tampering: contact the registrar at once, lock the domain, restore records.
3. **Investigate:** which commit, which account, how it got in. Check other accounts and repositories of the same person.
4. **Recover:** redeploy from a verified clean commit. Check the live site, headers and DNS afterwards.
5. **Communicate:** the admins decide who is told (customers, partners, the public). One person speaks for the company.
6. **Learn:** write a short blameless review. Change the controls that failed.

Contacts (to be filled in): admin phone numbers, registrar support, GitHub organization owners.

---

## 14. Monitoring and maintenance

- **Uptime check** on the home page, alerting both admins.
- **Expiry reminders:** domain, certificate (if managed separately), `security.txt`.
- **Header and TLS scans** after launch and after hosting changes: Mozilla Observatory, securityheaders.com, SSL Labs. Expect some missing headers on GitHub Pages. Record the result and compare it to this plan.
- **Dependabot reviews** weekly.
- **Access review** quarterly, and whenever someone joins or leaves.
- **Content review:** re-check the live site against section 6 whenever products or partners change.

---

## 15. Pre-coding and pre-launch checklist

**Before coding starts**

- [ ] Admins have read this document and answered the open items that block work (12.1, 12.2, 12.5)
- [ ] Repository exists under the company organization with the section 5.2 settings
- [ ] Developer has 2FA and the no-reply commit email configured
- [ ] Contact page approach agreed (form UI built; submission connected only after provider approval)
- [ ] Content approver named

**Before launch**

- [ ] CSP meta tag in place, tested on every page with no console violations
- [ ] `dist/` checked for inline scripts and external requests
- [ ] No secrets, personal data or case data in the repo or its history
- [ ] All images and PDFs metadata-stripped and reviewed
- [ ] Partner logos approved in writing (or removed)
- [ ] `npm audit` reviewed. Lockfile committed. Actions pinned
- [ ] Branch protection, CODEOWNERS and secret scanning confirmed on
- [ ] Domain, DNS and email authentication reviewed (section 9)
- [ ] `security.txt` published with a monitored contact
- [ ] If the form is live: a test message reaches both recipient inboxes, spam controls are on, privacy page is linked (section 7.4)
- [ ] Rollback tested once on the `github.io` address
- [ ] Header and TLS scans run and recorded
- [ ] Approver has signed off on all content
- [ ] DNS cut over in a quiet window, then Enforce HTTPS confirmed

---

## 16. What has and has not been verified

- **From browser standards (general knowledge, not re-checked here):** which CSP directives work in a meta tag, and that `frame-ancestors`, `report-uri` and `sandbox` do not.
- **Not verified:** Astro's current CSP option name, how Astro 7 inlines scripts and styles in your build, whether GitHub Pages sends HSTS, which branch-protection and secret-scanning features are available on the company's GitHub plan, and whether the ExifTool and qpdf commands behave as written.
- **Nothing has been built or tested yet.** Treat the CSP and commands as a starting point to verify in the real project.
- This plan is not legal advice. Privacy and data-protection obligations should be confirmed with counsel before any form or analytics are added.
