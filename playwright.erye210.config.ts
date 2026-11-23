import { defineConfig } from '@playwright/test';
import './src/config.js';
import path from 'node:path';

process.env.CINLINK_ERYE210_BATCH ||= new Date().toISOString().replace(/[:.]/g, '-');
// Some production font requests never settle. Capture the actual rendered page without waiting
// for unrelated font downloads; do not change page content, styles, or navigation assertions.
process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY = '1';
const output = path.join('reports/editor-210', process.env.CINLINK_ERYE210_BATCH);
export default defineConfig({
  testDir: './tests/editor', testMatch: ['erye210-navigation.spec.ts', 'erye210-fields.spec.ts', 'erye210-capabilities.spec.ts', 'erye210-completion.spec.ts', 'erye210-current-five.spec.ts', 'erye210-restored-eight.spec.ts', 'erye210-restored-five.spec.ts', 'erye210-watermark-toggle.spec.ts'],
  fullyParallel: false, workers: 1, retries: 0, timeout: 600_000,
  expect: { timeout: 20_000 }, outputDir: path.join(output, 'artifacts'),
  reporter: [['list'], ['json', { outputFile: path.join(output, 'playwright.json') }],
    ['html', { outputFolder: path.join(output, 'html'), open: 'never' }]],
  use: { channel: 'chrome', headless: false, viewport: { width: 1800, height: 1000 },
    screenshot: 'only-on-failure', trace: 'off' },
});
