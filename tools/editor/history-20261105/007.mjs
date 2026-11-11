export async function run({page,context,fs,path}) {
 const s=globalThis.e196;
 await s.open(s.cases['007'].name);if(await page.locator('button[data-tab="captions"]').getAttribute('aria-expanded')!=='true')await page.locator('button[data-tab="captions"]').click();
 await page.getByRole('button',{name:'原文字幕 solution. 00:06.64–00:07.12',exact:true}).waitFor();
 await s.shot('case-007-t1-target-before-delete');
 s.t2=await context.newPage();await s.t2.goto(page.url(),{waitUntil:'domcontentloaded'});await s.t2.locator('#workspace-prompt').waitFor({timeout:25000});
 await s.open(s.cases['007'].name,s.t2);
 const clip=s.t2.getByRole('button',{name:'原文字幕 solution. 00:06.64–00:07.12',exact:true});await clip.click();await clip.focus();
 await s.shot('case-007-t2-selected-target',s.t2);
 await s.t2.keyboard.press('Delete');
 return {text:(await s.t2.locator('body').innerText()).slice(-1500),dialogs:await s.t2.getByRole('dialog').count(),remainingTarget:await s.t2.getByRole('button',{name:'原文字幕 solution. 00:06.64–00:07.12',exact:true}).count()};
}
