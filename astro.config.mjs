// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// SITE_URL and BASE_PATH are set only by the GitHub Pages staging deploy
// (.github/workflows/deploy.yml). Locally and on the custom domain they are
// unset, so the site builds for https://anshtechlabs.com with no base path.
const site = process.env.SITE_URL || "https://anshtechlabs.com";
const base = process.env.BASE_PATH || "/";

// https://astro.build/config
export default defineConfig({
  site,
  base,
  vite: {
    plugins: [tailwindcss()],
  },
});
