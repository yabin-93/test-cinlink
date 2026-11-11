/** ERYE237-002 有头执行器。只通过已绑定的 cua App 操作当前登录浏览器。
 * 在 cua_repl 中 import 本模块，传入 app、fs、outputDir、三张有序素材。
 * 不启动第二个浏览器、不读取登录令牌、不自动重试提交。
 * 原生文件框是独立步骤，文件路径栏/打开按钮均从当前AX状态重新定位。
 */
export const TARGET_PROMPT = '打开本会话第2张图片，仅查看，不修改';
export function createCase002({ app, fs, outputDir, images }) {
  if (images.length !== 3 || new Set(images.map(x => x.name)).size !== 3)
    throw new Error('需要三张名称不同、顺序已确认的真实图片');
  let sent = false;
  let baseline;
  const index = (state, pattern) => {
    const found = state.split('\n').filter(line => /^\s*\d+ /.test(line) && pattern.test(line));
    if (found.length !== 1) throw new Error(`AX锚点应唯一，实际${found.length}：${pattern}`);
    return Number(found[0].trim().match(/^\d+/)[0]);
  };
  const state = () => app.getAXState({ disableDiffing: true, emit: false });
  const save = async (name, ax) => {
    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(`${outputDir}/${name}.txt`, ax);
    await fs.writeFile(`${outputDir}/${name}.png`, await app.getScreenshot({ emit: false }));
  };
  return {
    async pickFile(path) {
      let ax = await state();
      if (!ax.includes('open-panel')) throw new Error('前置：当前必须已经打开原生文件选择框');
      await app.pressKey('super+shift+g');
      ax = await state();
      await app.setValue(index(ax, /文本栏.*ID: PathTextField/), path);
      await app.pressKey('Return');
      ax = await state();
      for (let check = 0; check < 4 && !/按钮 打开, ID: OKButton/.test(ax); check++) ax = await state();
      await app.click(index(ax, /按钮 打开, ID: OKButton/));
      return state();
    },
    async openUpload() {
      const ax = await state();
      if (/按钮 停止任务/.test(ax)) throw new Error('当前有运行任务，不能并发准备素材');
      await app.click(index(ax, /\d+ 按钮 添加素材$/));
      return state();
    },
    async captureBaseline() {
      const ax = await state();
      if (/按钮 停止任务/.test(ax)) throw new Error('当前存在运行任务');
      // 首屏待发送附件必须与独立登记答案同序；禁止从模型回答推导正确答案。
      const lines = ax.split('\n');
      const start = lines.findIndex(x => /内容列表 添加素材/.test(x));
      const composer = lines.slice(start).join('\n');
      let last = -1;
      for (const image of images) {
        const pos = composer.indexOf(image.name);
        if (pos <= last) throw new Error(`素材未就绪或顺序不符：${image.name}`);
        last = pos;
      }
      if (/正在上传|上传失败/.test(composer)) throw new Error('素材上传尚未成功');
      baseline = { images, expected: images[1].name, prompt: TARGET_PROMPT, recordedAt: new Date().toISOString() };
      await save('01-ordered-baseline', ax);
      await fs.writeFile(`${outputDir}/baseline.json`, JSON.stringify(baseline, null, 2));
      return baseline;
    },
    async submit() {
      if (sent || !baseline) throw new Error('必须先登记三图基线，且每个执行器只允许发送一次');
      let ax = await state();
      const field = index(ax, /文本输入区 \(settable\).*描述你想创作或编辑的内容/);
      await app.click(field);
      await app.paste(TARGET_PROMPT, { format: 'text' });
      ax = await state();
      if (!ax.includes(TARGET_PROMPT)) throw new Error('目标指令未进入输入框');
      const send = index(ax, /\d+ 按钮 发送$/);
      sent = true; // 即使点击结果不确定，也不得自动重发。
      await app.click(send);
      ax = await state();
      await save('02-submitted', ax);
      return ax;
    },
    async observe() {
      if (!sent) throw new Error('目标尚未提交');
      const ax = await state();
      const position = ax.indexOf(`文本 ${TARGET_PROMPT}`);
      if (position < 0) throw new Error('没有在当前会话找到本次目标消息');
      const tail = ax.slice(position);
      const running = /按钮 停止任务|文本 思考中/.test(tail);
      const failed = /文本 失败|参数不匹配|do not match its schema|missing session_id/.test(tail);
      const completed = /已完成 总耗时/.test(tail);
      const result = { caseId: 'ERYE237-002', status: running ? 'Running' : failed ? 'Failed' : completed ? 'NeedsVerification' : 'Pending', expected: baseline.expected };
      // 完成标记不能证明开对图片。成功还需要独立导出/画布及其他两图前后对照。
      if (!running && (failed || completed)) {
        await save('03-terminal', ax);
        await fs.writeFile(`${outputDir}/result.json`, JSON.stringify(result, null, 2));
      }
      return { ...result, ax };
    },
  };
}
