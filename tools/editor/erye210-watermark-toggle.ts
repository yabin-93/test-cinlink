import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { expect } from '@playwright/test';
import { Navigation210, rails210 } from './erye210.js';
import { block210, fixture210, workspace210 } from './erye210-runner.js';

type Json = Record<string, any>;
export const watermarkToggle014Version = 'v2-watermark-toggle-navigation-20261116';
const saved = async (n: Navigation210) => expect(n.page.locator('.ed-save-status')).toHaveText('已同步');
const watermarksWithoutEnabled = (p: Json) => { const w = structuredClone(p.content.watermarks); delete w.enabled; return w; };
const unchangedContent = (p: Json) => { const c = structuredClone(p.content); delete c.watermarks; delete c.media_context; return c; };

export async function watermarkToggle014(n: Navigation210) {
  if (existsSync(path.join(n.out, 'checkpoint.json'))) block210('本批次014已有工程检查点，先核对原现场，不自动重放');
  const resume = process.env.CINLINK_ERYE210_014_RESUME_DIR;
  const previous = resume ? JSON.parse(await readFile(path.join(resume, 'checkpoint.json'), 'utf8')) : null;
  if (previous && (previous.caseVersion !== watermarkToggle014Version || previous.id !== '014' || previous.phase !== 'baseline-ready')) block210('014续验检查点不匹配，未重复目标操作');
  const f = previous?.f || await fixture210(n, '014', 'WATERMARK');
  if (previous) { n.prepared['014'] = f; await n.enterConversation(f.cid); await n.open(f.name); }
  const s: Json = previous || { id: '014', caseVersion: watermarkToggle014Version, workspaceId: workspace210(), f, phase: 'new-project-created' };
  const checkpoint = async () => { s.checks = structuredClone(n.checks); await n.record('checkpoint', s); };
  await checkpoint();
  const toggle = n.page.getByRole('switch', { name: '启用水印', exact: true });
  const panel = n.page.locator('.ed-watermark-panel');
  const text = panel.locator('textarea');
  const imageWidth = panel.getByRole('slider', { name: '图片宽度', exact: true });
  const opacity = panel.getByRole('slider', { name: '水印不透明度', exact: true });
  // A saved image exposes Replace; the upload-empty-state control is absent.
  const imagePicker = panel.getByRole('button', { name: /^(替换|Replace)$/ });
  const preview = n.page.locator('[aria-label="工程实时预览"]');
  const previewText = (value: string) => preview.getByText(value, { exact: true });
  const previewImage = preview.getByRole('img', { name: '图片水印', exact: true });
  await n.choose('水印');
  if (!s.before) {
  await toggle.check(); await saved(n);
  await n.sub('文字水印'); await text.fill('WM014_BASE'); await text.blur(); await saved(n);
  await expect(text).toBeEnabled(); await expect(previewText('WM014_BASE')).toBeVisible();
  await n.sub('图片水印'); await expect(imageWidth).toBeEnabled(); await expect(opacity).toBeEnabled();
  await expect(panel.getByRole('img', { name: '图片水印预览', exact: true })).toBeVisible();
  await expect(previewImage).toBeVisible();
  s.before = await n.get(f.pid); s.beforeMessages = (await n.messages(f.cid)).messages?.length || 0;
  s.imageWidth = await imageWidth.inputValue(); s.imageOpacity = await opacity.inputValue();
  s.phase = 'baseline-ready'; await checkpoint(); await n.shot('014-01-enabled-baseline');
  }

  await n.sub('图片水印');
  await toggle.uncheck(); await saved(n); await expect(toggle).not.toBeChecked();
  await expect(imageWidth).toBeDisabled(); await expect(opacity).toBeDisabled(); await expect(imagePicker).toBeDisabled();
  await expect(previewImage).toHaveCount(0); await expect(previewText('WM014_BASE')).toHaveCount(0);
  await n.sub('文字水印'); await expect(text).toBeDisabled(); await expect(text).toHaveValue('WM014_BASE');
  n.checks.push({ stage: 'disabled-controls-and-hidden-overlays', textDisabled: true, imageControlsDisabled: true, previewOverlaysHidden: true });
  s.phase = 'off-checked'; await checkpoint(); await n.shot('014-02-off-text-disabled');
  const off = await n.get(f.pid); expect(watermarksWithoutEnabled(off)).toEqual(watermarksWithoutEnabled(s.before)); expect(unchangedContent(off)).toEqual(unchangedContent(s.before));
  for (const module of rails210) { await n.choose(module); await expect(n.page.locator('.ed-project-name')).toHaveText(f.name); }
  await expect(toggle).not.toBeChecked(); await n.sub('文字水印'); await expect(text).toBeDisabled(); await expect(text).toHaveValue('WM014_BASE');
  await n.sub('图片水印'); await expect(imageWidth).toBeDisabled(); await expect(opacity).toBeDisabled(); await expect(imagePicker).toBeDisabled();
  await expect(imageWidth).toHaveValue(s.imageWidth); await expect(opacity).toHaveValue(s.imageOpacity);
  expect((await n.get(f.pid)).content).toEqual(off.content);
  n.checks.push({ stage: 'off-after-five-tabs', sameProject: true, controlsRemainDisabled: true, watermarkSettingsPreserved: true });
  s.phase = 'off-tabs-checked'; await checkpoint(); await n.shot('014-03-off-image-after-tabs');

  await toggle.check(); await saved(n); await expect(toggle).toBeChecked();
  await expect(imageWidth).toBeEnabled(); await expect(opacity).toBeEnabled(); await expect(imagePicker).toBeEnabled();
  await expect(imageWidth).toHaveValue(s.imageWidth); await expect(opacity).toHaveValue(s.imageOpacity); await expect(previewImage).toBeVisible(); await expect(previewText('WM014_BASE')).toBeVisible();
  await n.sub('文字水印'); await expect(text).toBeEnabled(); await expect(text).toHaveValue('WM014_BASE');
  const on = await n.get(f.pid); expect(watermarksWithoutEnabled(on)).toEqual(watermarksWithoutEnabled(s.before)); expect(unchangedContent(on)).toEqual(unchangedContent(s.before));
  n.checks.push({ stage: 'enabled-again', originalOverlaysRestored: true, parametersRestored: true, controlsEnabled: true });
  await n.shot('014-04-enabled-settings-restored');
  await text.fill('WM014_EDITED'); await text.blur(); await saved(n);
  await n.choose('字幕'); await n.choose('水印'); await n.sub('文字水印'); await expect(text).toHaveValue('WM014_EDITED');
  const edited = await n.get(f.pid); expect(edited.content.watermarks.image).toEqual(s.before.content.watermarks.image); expect(unchangedContent(edited)).toEqual(unchangedContent(s.before));
  s.phase = 'edited-and-returned'; await checkpoint(); await n.shot('014-05-edited-returned');

  await n.page.reload({ waitUntil: 'domcontentloaded' }); await n.page.locator('#workspace-prompt').waitFor(); await n.open(f.name);
  await n.choose('水印'); await expect(toggle).toBeChecked(); await n.sub('文字水印'); await expect(text).toBeEnabled(); await expect(text).toHaveValue('WM014_EDITED');
  await expect(previewText('WM014_EDITED')).toBeVisible(); await expect(previewImage).toBeVisible();
  await n.sub('图片水印'); await expect(imageWidth).toBeEnabled(); await expect(imageWidth).toHaveValue(s.imageWidth); await expect(opacity).toHaveValue(s.imageOpacity);
  await expect(panel.getByRole('img', { name: '图片水印预览', exact: true })).toBeVisible();
  s.after = await n.get(f.pid); expect(s.after.content).toEqual(edited.content); expect(s.after.content.watermarks.image).toEqual(s.before.content.watermarks.image);
  const afterMessages = (await n.messages(f.cid)).messages?.length || 0; expect(afterMessages).toBe(s.beforeMessages);
  await expect(n.page.getByRole('alert')).toHaveCount(0);
  n.checks.push({ stage: 'edited-refresh-persisted', finalText: 'WM014_EDITED', watermarkEnabled: true, imageUnchanged: true, mediaAndCaptionsUnchanged: true, messageCountBefore: s.beforeMessages, messageCountAfter: afterMessages, noAgentOrExport: true });
  s.phase = 'completed'; await checkpoint(); await n.shot('014-06-final-refresh');
}
