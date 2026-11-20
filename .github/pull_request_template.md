## Content & security checklist

- [ ] No real case data, client/agency names or active deployments
- [ ] No operational details that could help an adversary
- [ ] All screenshots and demos use synthetic data
- [ ] Images and PDFs have metadata stripped
- [ ] Partner logos and claims are approved in writing
- [ ] No secrets or personal information in the diff
- [ ] Content approver has reviewed

---

### Additional checks

- [ ] `npm run build` passes with no unexplained warnings
- [ ] `npm run check` (astro check) passes with 0 errors
- [ ] `npm run format:check` passes
- [ ] Playwright + axe tests pass (`npm test`)
- [ ] No CSP violations in browser console on built site
- [ ] No inline `<script>`, `<style>` or `style=""` in `dist/`
- [ ] Keyboard-only walkthrough works; reduced-motion respected
- [ ] Checked at 360, 768 and 1280 px widths — no horizontal scroll
- [ ] Lighthouse 95+ on all four categories (mobile) for changed pages
- [ ] No new third-party requests (check Network panel)
