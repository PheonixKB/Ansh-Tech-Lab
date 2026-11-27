import { defineConfig } from "@playwright/test";

// Tests run against the production build served by `astro preview`.
export default defineConfig({
  testDir: "tests",
  webServer: {
    command: "npm run build && npm run preview -- --port 4321",
    url: "http://localhost:4321",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  use: {
    baseURL: "http://localhost:4321",
    ...(process.env.PW_CHROMIUM_PATH
      ? { launchOptions: { executablePath: process.env.PW_CHROMIUM_PATH } }
      : {}),
  },
});
