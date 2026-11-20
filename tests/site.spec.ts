import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const paths = [
  "/",
  "/solutions/",
  "/solutions/strotpragna/",
  "/solutions/dronlyzer/",
  "/solutions/fingerprint-kit/",
  "/solutions/lea-solutions/",
  "/about/",
  "/contact/",
  "/privacy/",
];

for (const path of paths) {
  test.describe(path, () => {
    // Reduced motion = every element in its final state, so axe never measures a half-faded frame.
    test("no axe violations", async ({ browser }) => {
      const ctx = await browser.newContext({ reducedMotion: "reduce" });
      const page = await ctx.newPage();
      await page.goto(path);
      const results = await new AxeBuilder({ page }).analyze();
      await ctx.close();
      expect(results.violations).toEqual([]);
    });

    test("no console errors (incl. CSP) and no external requests", async ({
      page,
    }) => {
      const problems: string[] = [];
      page.on("console", (m) => {
        if (m.type() === "error") problems.push(`console: ${m.text()}`);
      });
      page.on("pageerror", (e) => problems.push(`pageerror: ${e.message}`));
      page.on("request", (r) => {
        if (!r.url().startsWith("http://localhost:4321"))
          problems.push(`external: ${r.url()}`);
      });
      await page.goto(path, { waitUntil: "networkidle" });
      expect(problems).toEqual([]);
    });

    test("has one h1 and no horizontal scroll at 360px", async ({ page }) => {
      await page.setViewportSize({ width: 360, height: 800 });
      await page.goto(path);
      await expect(page.locator("h1")).toHaveCount(1);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      );
      expect(overflow).toBe(false);
    });
  });
}

test("CSP meta tag is present and the contact form cannot post", async ({
  page,
}) => {
  await page.goto("/");
  const csp = await page
    .locator('meta[http-equiv="Content-Security-Policy"]')
    .getAttribute("content");
  expect(csp).toContain("script-src 'self'");
  expect(csp).toContain("form-action 'none'");
});

test("mobile menu opens and closes with Escape", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto("/");
  const toggle = page.locator("[data-nav-toggle]");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("reduced motion leaves all content visible", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/");
  const hidden = await page.evaluate(
    () =>
      [...document.querySelectorAll("[data-ix], h1, h2")].filter(
        (e) => getComputedStyle(e).opacity === "0",
      ).length,
  );
  expect(hidden).toBe(0);
  await ctx.close();
});
