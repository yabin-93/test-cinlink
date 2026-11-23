import { expect } from '@playwright/test';
import { rails210 } from '../../tools/editor/erye210.js';
import { test210 as test, guarded210, block210, coverage210, fixture210, seed210, workspace210, c1English210, editCaption210, reopen210 } from '../../tools/editor/erye210-runner.js';
type Json = Record<string, any>;

test('ERYE210-021 v2 字幕水印切页及手工还原字段隔离 @ERYE-210', async ({ nav210:n }) => guarded210(async()=>{
  const f=await fixture210(n,'021','WATERMARK'); const before=await n.get(f.pid);
  let input=await editCaption210(n,c1English210);await input.fill('CAPTION_021');await input.press('Enter');
  await n.choose('水印');await n.sub('文字水印');const wm=n.page.locator('.ed-watermark-panel textarea');
  await wm.fill('WATERMARK_021');await wm.blur();await expect.poll(async()=>(await n.get(f.pid)).content.watermarks.text.text).toBe('WATERMARK_021');
  await n.choose('字幕');await expect(n.page.locator('.ed-caption-text').filter({hasText:'CAPTION_021'})).toBeVisible();
  input=await editCaption210(n,'CAPTION_021');await input.fill(c1English210);await input.press('Enter');
  await n.choose('水印');await n.sub('文字水印');await expect(wm).toHaveValue('WATERMARK_021');
  await reopen210(n,f,'字幕');await expect(n.page.locator('.ed-caption-text').filter({hasText:c1English210})).toBeVisible();
  await n.choose('水印');await n.sub('文字水印');await expect(wm).toHaveValue('WATERMARK_021');
  const after=await n.get(f.pid);expect(after.content.tracks.filter((t:Json)=>t.type!=='subtitle')).toEqual(before.content.tracks.filter((t:Json)=>t.type!=='subtitle'));
  n.checks.push({stage:'v2-manual-restore',caption:c1English210,watermark:'WATERMARK_021',scope:'已保存字段手工还原；无Esc/草稿放弃契约'});
}));

test('ERYE210-022 非法水印数值切页及修正 @ERYE-210', async ({ nav210: n }) => guarded210(async () => {
  const f = await fixture210(n, '022', 'WATERMARK'); await n.choose('水印'); await n.sub('文字水印');
  const panel = n.page.locator('.ed-watermark-panel'); const more = panel.getByLabel('更多水印文字设置', { exact: true });
  const input = panel.getByRole('spinbutton', { name: '字号', exact: true });
  if (!(await input.isVisible())) await more.click(); const baseline = (await n.get(f.pid)).content.watermarks.text.font_size;
  const max = Number(await input.getAttribute('max'));
  for (const [label, value] of [['abc','abc'],['empty',''],['over-max',String(max + 1)]]) {
    await input.fill(''); if (label === 'abc') await input.pressSequentially(value); else await input.fill(value);
    const typed = await input.inputValue(); await n.choose('字幕'); await n.choose('水印'); await n.sub('文字水印');
    if (!(await input.isVisible())) await more.click();
    const p = await n.get(f.pid); n.checks.push({ label, typed, savedFontSize: p.content.watermarks.text.font_size,
      alerts: await n.page.getByRole('alert').allTextContents(), min: await input.getAttribute('min'), max });
    expect.soft(p.content.watermarks.text.font_size, `${label}不得自动保存为0或被截断`).toBe(baseline);
    await n.shot('022-' + label); await input.fill(String(baseline)); await input.press('Enter'); await input.blur();
  }
  await input.fill('36'); await input.press('Enter'); await input.blur();
  await expect.poll(async () => (await n.get(f.pid)).content.watermarks.text.font_size).toBe(36);
  await reopen210(n, f, '水印'); await n.sub('文字水印'); await expect(n.page.locator('.ed-watermark-panel').getByRole('combobox', { name: '水印字号', exact: true })).toHaveText('36px');
  coverage210('本例覆盖当前可文本输入的水印字号，范围取自真实控件；不以浏览器拒绝abc键入判缺陷，不声称音量输入专项通过。');
}));

test('ERYE210-023 水印滑杆拖动保存及一次撤销 @ERYE-210', async ({ nav210: n }) => guarded210(async () => {
  const f = await fixture210(n, '023', 'WATERMARK'); await n.choose('水印'); await n.sub('文字水印');
  const slider = n.page.getByRole('slider', { name: '水印不透明度', exact: true }); const original = Number(await slider.inputValue());
  const box = await slider.boundingBox(); if (!box) block210('透明度滑杆不可见，未执行拖动');
  await n.page.mouse.move(box.x + box.width * original, box.y + box.height / 2); await n.page.mouse.down();
  await n.page.mouse.move(box.x + box.width * .35, box.y + box.height / 2, { steps: 8 }); await n.page.mouse.up();
  const final = Number(await slider.inputValue()); expect(final).toBeGreaterThan(.2); expect(final).toBeLessThan(.5);
  await expect.poll(async () => (await n.get(f.pid)).content.watermarks.text.opacity).toBe(final);
  n.checks.push({ stage: 'dragged', original, final, saved: (await n.get(f.pid)).content.watermarks.text }); await n.shot('023-dragged');
  await n.page.getByRole('button', { name: '撤销', exact: true }).click(); await expect(slider).toHaveValue(String(original));
  await expect.poll(async () => (await n.get(f.pid)).content.watermarks.text.opacity).toBe(original);
  await n.choose('字幕'); await n.choose('水印'); await expect(slider).toHaveValue(String(original));
  coverage210('使用真实鼠标连续拖动；页面未提供Esc取消说明，未将该快捷键作为硬条件，不声称支持Esc拖动取消。');
}));

test('ERYE210-024 水印开关切页及一次撤销 @ERYE-210', async ({ nav210: n }) => guarded210(async () => {
  const f = await fixture210(n, '024', 'WATERMARK'); await n.choose('水印'); const before = await n.get(f.pid);
  const toggle = n.page.getByRole('switch', { name: '启用水印', exact: true }); await expect(toggle).toBeChecked(); await toggle.uncheck();
  await n.choose('字幕'); await n.choose('水印'); await expect(toggle).not.toBeChecked();
  const off = await n.get(f.pid); n.checks.push({ stage: 'off', watermarks: off.content.watermarks, revision: off.revision }); await n.shot('024-off-after-navigation');
  await n.page.getByRole('button', { name: '撤销', exact: true }).click(); await expect(toggle).toBeChecked();
  await expect.poll(async () => JSON.stringify((await n.get(f.pid)).content.watermarks)).toBe(JSON.stringify(before.content.watermarks));
  n.checks.push({ stage: 'undo', watermarks: (await n.get(f.pid)).content.watermarks });
}));

test('ERYE210-025 v2 未发送Agent输入切页保留与清空不执行 @ERYE-210', async ({nav210:n})=>guarded210(async()=>{
  const f=await fixture210(n,'025');const before=await n.get(f.pid);const messages=await n.messages(f.cid);
  const prompt=n.page.locator('#workspace-prompt'),text='仅保留未发送输入025，不执行任何处理。';await prompt.fill(text);
  for(const module of rails210) await n.choose(module);
  await expect(prompt).toHaveText(text);const pb=await n.copy(workspace210(),'025-PB',await seed210(n),f.cid);const beforePB=await n.get(pb.pid);
  await expect(prompt).toHaveText(text);await prompt.fill('');await expect(prompt).toBeEmpty();
  await n.unchanged(f.pid,before);await n.unchanged(pb.pid,beforePB);expect((await n.messages(f.cid)).messages?.length).toBe(messages.messages?.length);
  n.checks.push({stage:'v2-unsent-cleared',text,agentSubmitted:false,scope:'输入属于同一会话；切工程保留不是将文本写入工程'});
}));

test('ERYE210-026 v2 已保存字幕刷新恢复同一工程 @ERYE-210',async({nav210:n})=>guarded210(async()=>{
  const f=await fixture210(n,'026');await n.choose('字幕');const before=await n.get(f.pid);
  const original=await n.page.locator('.ed-caption-text').allTextContents();const input=await editCaption210(n,c1English210);await input.fill('已保存字幕026');await input.press('Enter');
  await expect(n.page.locator('.ed-caption-text').filter({hasText:'已保存字幕026'})).toBeVisible();
  await n.choose('水印');await n.choose('字幕');const saved=await n.get(f.pid);const messages=await n.messages(f.cid);
  await reopen210(n,f,'字幕');await expect(n.page.locator('.ed-caption-text').filter({hasText:'已保存字幕026'})).toBeVisible();
  const restored=await n.get(f.pid);expect(restored.content).toEqual(saved.content);expect(restored.revision).toBe(saved.revision);
  expect((await n.page.locator('.ed-caption-text').allTextContents()).slice(1)).toEqual(original.slice(1));
  expect(restored.content.tracks.filter((t:Json)=>t.type!=='subtitle')).toEqual(before.content.tracks.filter((t:Json)=>t.type!=='subtitle'));
  expect((await n.messages(f.cid)).messages?.length).toBe(messages.messages?.length);
  n.checks.push({stage:'v2-saved-refresh',sameProject:f.pid,savedRevision:saved.revision,scope:'不含未提交草稿恢复或双标签冲突'});
}));

test('ERYE210-027 v2 同账号同会话PA/PB水印字段隔离 @ERYE-210',async({nav210:n})=>guarded210(async()=>{
  const pa=await fixture210(n,'027-PA','WATERMARK');await n.choose('水印');await n.sub('文字水印');
  const input=n.page.locator('.ed-watermark-panel textarea');await input.fill('PA_TEXT_027');await input.blur();
  await expect.poll(async()=>(await n.get(pa.pid)).content.watermarks.text.text).toBe('PA_TEXT_027');
  const pb=await n.copy(workspace210(),'027-PB',await seed210(n,'WATERMARK'),pa.cid);await n.choose('水印');await n.sub('文字水印');await input.fill('PB_TEXT_027');await input.blur();
  await expect.poll(async()=>(await n.get(pb.pid)).content.watermarks.text.text).toBe('PB_TEXT_027');
  await n.selectProject(pa.name);await n.choose('水印');await n.sub('文字水印');await expect(input).toHaveValue('PA_TEXT_027');
  await input.fill('PA_UPDATED_027');await input.blur();await expect.poll(async()=>(await n.get(pa.pid)).content.watermarks.text.text).toBe('PA_UPDATED_027');
  await n.selectProject(pb.name);await n.choose('水印');await n.sub('文字水印');await expect(input).toHaveValue('PB_TEXT_027');await reopen210(n,pb,'水印');await n.sub('文字水印');await expect(input).toHaveValue('PB_TEXT_027');
  n.checks.push({stage:'v2-project-isolation',pa:(await n.get(pa.pid)).content.watermarks.text,pb:(await n.get(pb.pid)).content.watermarks.text,scope:'仅同账号同设备；跨账号单独保留待环境'});
}));

// 011 v3 is registered in erye210-completion.spec.ts.
