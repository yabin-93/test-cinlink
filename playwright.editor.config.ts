import { defineConfig } from '@playwright/test';
import { targets } from './src/config.js';
import path from 'node:path';

process.env.CINLINK_EDITOR_BATCH ||= new Date().toISOString().replace(/[:.]/g, '-');
const batch = path.join('reports/editor-196', process.env.CINLINK_EDITOR_BATCH);
const invocation = Date.now().toString();

export default defineConfig({
  testDir: './tests/editor',
  testMatch: 'erye196-editing.spec.ts',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 600_000,
  expect: { timeout: 20_000 },
  outputDir: 'test-results/editor-196',
  reporter: [['list'], ['json', { outputFile: path.join(batch, `playwright-${invocation}.json`) }],
    ['html', { outputFolder: path.join(batch, `html-${invocation}`), open: 'never' }]],
  use: { baseURL: targets.webBase, channel: 'chrome', headless: false, viewport: { width: 1600, height: 1000 } },
});
