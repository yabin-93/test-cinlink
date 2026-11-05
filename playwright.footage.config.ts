import { defineConfig } from "@playwright/test";
import base from "./playwright.config.js";

// Explicit, headed run; not part of the default staging suite.
const batch = process.env.CINLINK_FOOTAGE_REPORT_DIR ||= `reports/local-footage-${new Date().toISOString().replace(/[:.]/g, "-")}`;
export default defineConfig({
  ...base,
  outputDir: `${batch}/test-results`,
  reporter: [["list"], ["html", { outputFolder: `${batch}/html`, open: "never" }],
    ["junit", { outputFile: `${batch}/junit.xml` }]],
  projects: [{ name: "local-footage", testDir: "./tests/local-footage", timeout: 30 * 60_000,
    use: { headless: false, trace: "on" } }],
});
