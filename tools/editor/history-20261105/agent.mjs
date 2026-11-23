export async function run({page,context,fs,path}) {
 const s=globalThis.e196;
 s.shot=async(name,p=page)=>{await p.screenshot({path:path.join(s.out,name+'.png'),timeout:15000});};
 s.editorText=async(p=page)=>await p.locator('body').innerText();
 s.submit=async(caseId,prompt,p=page)=>{
  const record={caseId,prompt,at:new Date().toISOString(),projectName:await p.locator('.ed-project-name').innerText()};
  s.prompts.push(record);await fs.writeFile(path.join(s.out,'prompts.json'),JSON.stringify(s.prompts,null,2));
  await p.locator('#workspace-prompt').fill(prompt);await s.shot('case-'+caseId+'-prompt',p);
  const promise=p.waitForResponse(r=>r.request().method()==='POST'&&/\/runtime-api\/v1\/conversations\/[^/]+\/turns$/.test(new URL(r.url()).pathname),{timeout:30000});
  await p.locator('#workspace-send').click();
  const response=await promise;const raw=await response.json();record.response={status:response.status(),body:raw};
  await fs.writeFile(path.join(s.out,'case-'+caseId+'-submission.json'),JSON.stringify(record,null,2));
  return {caseId,http:response.status(),body:raw};
 };
 s.check=async(caseId,p=page)=>{
  const c=s.cases[caseId],actual=await s.getProject(c.id);
  await fs.writeFile(path.join(s.out,'case-'+caseId+'-after.json'),JSON.stringify(actual,null,2));
  return {revision:actual.body.revision,projectName:actual.body.content?.name,contentChanged:JSON.stringify(actual.body.content)!==JSON.stringify(c.before.content),text:(await p.locator('body').innerText()).slice(-4100),buttons:await p.locator('button[aria-label]').evaluateAll(es=>es.map(e=>e.getAttribute('aria-label')).filter(x=>/停止|发送|确认|取消/.test(x)))};
 };
 await page.keyboard.press('Escape');await s.shot('case-005-before');
 return await s.submit('005','只把当前工程“E196-005-20261105”中6.64～7.12秒、原文为“solution.”的这一条字幕原文改为“欢迎使用 CinLink”，译文、其他字幕、声音和视频不改。');
}
