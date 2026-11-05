import { defineConfig } from "@playwright/test";
import base from "./playwright.config.js";
import { optionalStorageState } from "./src/config.js";

// Explicit opt-in suite; existing staging/default multi-workflow commands retain their scope.
export default defineConfig({
  ...base,
  projects: [{
    name: "multi-material",
    testDir: "./tests/multi-material",
    timeout: 30 * 60_000,
    use: { storageState: optionalStorageState() },
  }],
});
