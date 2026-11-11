# ERYE237-002 有头执行脚本

当前用例版本：2026-11-06-project-baseline。002/003脚本仍为历史批次的**部分执行器**，不自行建立/校验B-IMG或B-MULTI，不能直接按旧素材重跑并判整例。执行前人工完成新版工程/版本登记；003现有TARGET_PROMPT硬编码11.png原始V1，须先按实际工程及版本替换后再运行。003人工空文档门禁不等于目标工程门禁。此次只优化用例，未运行这些脚本或新增处理任务。

`erye237-002.cua.mjs`通过`mcp__cua_repl`已绑定的Chrome App运行，复用人工登录窗口。它不由Playwright项目发现，不启动第二个浏览器。原`tests/erye237/erye237-001-005.spec.ts`中的fixme不代表本脚本已运行。

前置：在独立空会话草稿内，按固定顺序上传三张可区分的授权图片。第二张是独立登记答案，不能从模型答复推导；第三张应与第二张不同。准备三个可打开的图片工程并记录每张图的标题、历史项、画布与源文件。开始目标前停留在第三张，且无未保存草稿/运行任务。

在`cua_repl`中加载模块并分阶段执行（用实际绝对路径替换示例配置）：

```javascript
var module002 = await import('/项目绝对路径/tools/erye237/erye237-002.cua.mjs');
var app002 = await cua.getApp('Google Chrome');
var fs002 = await import('node:fs/promises');
var runner002 = module002.createCase002({
  app: app002,
  fs: fs002,
  outputDir: '/项目绝对路径/reports/本次独立目录',
  images: [
    { name: '第一张文件名', path: '/授权素材路径/第一张' },
    { name: '第二张文件名', path: '/授权素材路径/第二张' },
    { name: '第三张文件名', path: '/授权素材路径/第三张' },
  ],
});
// 每张图均先 openUpload()，随后 pickFile(对应路径)。
// 首张已打开原生选择框时，直接调用pickFile即可。
await runner002.openUpload();
await runner002.pickFile('/授权素材路径/第一张');
// 按相同方式完成第二、第三张，然后验证附件顺序并保存独立答案：
await runner002.captureBaseline();
// 用一条明确标注“准备”的消息登记附件顺序，等结束；通过UI建立三图文档，
// 保存前置证据，停留第三张。不要重新创建runner或再次captureBaseline。
await runner002.submit();
var observed002 = await runner002.observe();
```

在调用之间读取返回状态；异步任务等待后重复`observe()`，不重复`submit()`。已发送的执行器实例不可丢弃后重建来绕过单次提交保护。若浏览器用户切走、锚点不存在/重复或文件框未准备就绪，先检查当前UI再修正，不盲点。执行器不自行导航到其他会话。

输出：有序基线截图/AX、提交后截图/AX、终态截图/AX、`baseline.json`和`result.json`。`Failed`表示看到本次任务的明确失败；`NeedsVerification`只表示完成，必须核对实际编辑器标题、目标画布/文件及I1/I3内容与版本，才能人工判整例通过。`Running/Pending`不是通过；长时间无终态应记受阻并保存当前证据，不自动重发。账务/远端文件哈希未覆盖时须明确记录。

覆盖范围：三图上传与顺序校验、自然指代的原始目标指令、单次提交、任务观察和原始证据保存。文档基线准备、成功结果的文件/画布与非目标文档对照仍需人工，因此当前登记保持PLAN（部分脚本），不伪称完整AUTO。

脚本语法检查：`node --check tools/erye237/erye237-002.cua.mjs`。本机实测记录：`docs/cases/requirements/ERYE-237/results-002-prod-20261106.md`。

## ERYE237-003 无打开文档时明确资源打开

`erye237-003.cua.mjs`同样在CUA中import，调用`createCase003({app,fs,outputDir})`。先capture基线、submit('before')及observe('before')；仅实际回执确认无打开文档后，调用confirmEmpty({toolReadback:'实际证据位置',hasOpenDocument:false})。补齐资源原始版本身份后submit('target')，等待终态并人工核对目标，最后submit('after')/observe('after')读取身份。每阶段仅一次，不能重建实例绕过保护。UI面板未显示、规划文字或任务完成不算空context证据。人工核验未覆盖时不得判Passed。

首次运行至前置受阻；随后用户人工确认无打开文档，confirmEmpty可接受source=user_confirmation、confirmation原文、hasOpenDocument=false。续执行已发送正式目标及后置检查，结果Failed；见[003报告](../../docs/cases/requirements/ERYE-237/results-003-prod-20261106.md)。语法检查：`node --check tools/erye237/erye237-003.cua.mjs`。

003目标前置修正：用户确认上传图片须处理一次才建图片工程，提示词生成图自动建工程。必须先验证目标工程已存在及确切版本；人工确认空文档只覆盖当前文档状态。11.png此次未确认工程已建立，最终判定Blocked，撤销此前Failed；详见报告最新段落。
