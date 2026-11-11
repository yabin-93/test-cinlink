import { defineConfig } from "@playwright/test";
import { NO_STORAGE_STATE, optionalStorageState, targets } from "./src/config.js";

// 沿用 cinlink-web-tests 的串行、零重试和系统 Chrome 配置。
export default defineConfig({
  fullyParallel: false,
  workers: 1,
  retries: 0,
  forbidOnly: Boolean(process.env.CI),
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: [
    ["list"],
    ["html", { outputFolder: "reports/html", open: "never" }],
    ["junit", { outputFile: "reports/junit.xml" }],
  ],
  use: {
    baseURL: targets.webBase,
    channel: process.env.CINLINK_BROWSER_CHANNEL || "chrome",
    headless: process.env.CINLINK_HEADLESS !== "0",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "off",
  },
  projects: [
    { name: "unit", testDir: "./tests/unit" },
    { name: "gates", testDir: "./tests/gates" },
    {
      name: "staging",
      testDir: "./tests/staging",
      timeout: 300_000,
      use: { storageState: optionalStorageState() },
    },
    {
      name: "erye237",
      testDir: "./tests/erye237",
      timeout: 300_000,
      use: { storageState: optionalStorageState() },
    },
    {
      name: "auth",
      testDir: "./tools",
      testMatch: "login.spec.ts",
      timeout: 360_000,
      use: { headless: false, storageState: optionalStorageState(), trace: "off" },
    },
    { name: "doctor", testDir: "./tools", testMatch: "credentials-check.spec.ts" },
    {
      name: "annotation",
      testDir: "./tests/annotation",
      testMatch: ["annotation-rules.spec.ts", "video-annotation-ui.spec.ts"],
      timeout: 120_000,
      use: { baseURL: targets.localBase, storageState: NO_STORAGE_STATE },
    },
    {
      name: "annotation-login",
      testDir: "./tools/annotation",
      testMatch: "login-profile.spec.ts",
      timeout: 600_000,
      use: { headless: false, storageState: NO_STORAGE_STATE },
    },
    {
      name: "annotation-staging",
      testDir: "./tests/annotation",
      testMatch: "video-annotation-staging.spec.ts",
      timeout: 600_000,
      use: { baseURL: targets.webBase, storageState: optionalStorageState() },
    },
  ],
});
