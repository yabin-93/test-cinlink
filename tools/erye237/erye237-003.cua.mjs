/** ERYE237-003：当前人工登录Chrome的分阶段CUA执行器，串行、零重试。
 * UI空白不能证明服务端context为空；confirmEmpty必须引用实际工具回读或人工明确确认。
 * 文档身份、版本及其他窗口内容仍需人工核验，因此为部分脚本。
 */
export const BEFORE_PROMPT = 'ERYE237-003前置检查：只读取当前会话的图片编辑器上下文，报告当前是否有打开的图片文档及其身份。不要打开、创建、修改、生成、导出任何图片；不要使用其他窗口当前图片作为本会话目标。';
export const TARGET_PROMPT = '打开本项目图片“11.png”的原始版本（V1），仅查看，不修改、不生成、不导出。';
export const AFTER_PROMPT = 'ERYE237-003结果检查：只读取当前会话的图片编辑器上下文，报告当前打开的图片文档、源文件及版本；没有打开文档则如实报告为空。不要打开、创建、修改、生成、导出任何图片，不要重试此前打开任务。';
export function createCase003({app, fs, outputDir}) {
  const sent = new Set();
  let emptyEvidence;
  const state = () => app.getAXState({disableDiffing:true, emit:false});
  const index = (ax, re) => {
    const rows = ax.split('\n').filter(x => /^\s*\d+ /.test(x) && re.test(x));
    if(rows.length !== 1) throw new Error(`AX锚点不唯一：${re} (${rows.length})`);
    return Number(rows[0].trim().match(/^\d+/)[0]);
  };
  async function capture(name, ax) {
    await fs.mkdir(outputDir,{recursive:true});
    await fs.writeFile(`${outputDir}/${name}.txt`,ax);
    await fs.writeFile(`${outputDir}/${name}.png`,await app.getScreenshot({emit:false}));
  }
  return {
    async capture(name) {const ax=await state(); await capture(name,ax); return ax;},
    async confirmEmpty(evidence) {
      if(!(evidence?.toolReadback || (evidence?.source === 'user_confirmation' && evidence?.confirmation)) || evidence.hasOpenDocument !== false)
        throw new Error('需要工具回读或人工明确确认无打开文档，收起面板不满足前置');
      emptyEvidence=evidence;
      await fs.writeFile(`${outputDir}/empty-context.json`,JSON.stringify(evidence,null,2));
    },
    async submit(phase) {
      const prompt={before:BEFORE_PROMPT,target:TARGET_PROMPT,after:AFTER_PROMPT}[phase];
      if(!prompt || sent.has(phase)) throw new Error('阶段无效或已发送，禁止重发');
      if(phase==='target' && !emptyEvidence) throw new Error('尚未确认空上下文');
      let ax=await state();
      if(/按钮 停止任务/.test(ax)) throw new Error('已有运行任务');
      await app.click(index(ax,/文本输入区 \(settable\).*描述你想创作或编辑的内容/));
      await app.paste(prompt,{format:'text'});
      ax=await state();
      if(!ax.includes(prompt)) throw new Error('输入框中未找到指令');
      const button=index(ax,/\d+ 按钮 发送$/);
      sent.add(phase);
      await fs.mkdir(outputDir,{recursive:true});
      await fs.writeFile(`${outputDir}/${phase}-submission.json`,JSON.stringify({phase,prompt,sentAt:new Date().toISOString()}));
      await app.click(button);
      ax=await state(); await capture(`${phase}-submitted`,ax); return ax;
    },
    async observe(phase) {
      if(!sent.has(phase)) throw new Error('尚未发送');
      const ax=await state(); await capture(`${phase}-observed`,ax); return ax;
    }
  };
}
