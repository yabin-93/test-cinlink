import { defineConfig } from "@playwright/test";
import base from "./playwright.config.js";

// UI-only, no real auth state and no live backend calls; not the server MW-22 gate.
export default defineConfig({
  ...base,
  projects: [{ name: "multi-material-ui", testDir: "./tests/multi-material", testMatch: "multi-material.spec.ts", grep: /MW-22\b/,
    timeout: 120_000, use: { storageState: { cookies: [], origins: [] }, serviceWorkers: "block" } }],
});
