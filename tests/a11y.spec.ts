import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const path of [
  "/",
  "/solutions/",
  "/solutions/strotpragna/",
  "/about/",
  "/contact/",
]) {
  test(`no axe violations on ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}
