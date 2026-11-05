import { defineConfig } from "@playwright/test";
import base from "./playwright.config.js";

// Independent, explicitly requested suite. One headed browser window, serial, no retries.
export default defineConfig({
  ...base,
  ...(process.env.CINLINK_SSO_REPORT_DIR ? {
    outputDir: `${process.env.CINLINK_SSO_REPORT_DIR}/test-results`,
    reporter: [["list"], ["html", { outputFolder: `${process.env.CINLINK_SSO_REPORT_DIR}/html`, open: "never" }],
      ["junit", { outputFile: `${process.env.CINLINK_SSO_REPORT_DIR}/junit.xml` }]],
  } : {}),
  projects: [{ name: "sso", testDir: "./tests/sso", timeout: 50 * 60_000,
    use: { headless: false, trace: "on", ...(process.env.CINLINK_SSO_CHROME ? {
      launchOptions: { executablePath: process.env.CINLINK_SSO_CHROME },
    } : {}) } }],
});
