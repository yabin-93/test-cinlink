# 缺陷报告 · 视频批注填写描述后编辑器失去响应，视频请求反复 ERR_ABORTED

| 字段 | 内容 |
|---|---|
| 缺陷 ID | CINLINK-ANNOTATION-001 |
| 标题 | 视频批注：点击「添加描述」填写内容后，点「添加到对话」编辑器失去响应，视频请求反复 `ERR_ABORTED` |
| 严重级别 | **撤回**：复核为测试侧可操作性等待问题，非产品缺陷 |
| 状态 | Closed（2026-10-19 复核撤回） |
| 发现日期 | 2026-10-19 |
| 环境 | 预发 `https://staging-app.cinlink.ai`，Chrome（系统安装版），**headed** |
| 账号 | `acct_4e73d97f04f5` |
| 功能 | 视频编辑器 · 视频批注（口水词项目 → 在编辑器中精修 → 批注） |
| 复现命令 | `$env:CINLINK_HEADLESS='0'; npx playwright test --project=annotation-staging -g "DC-07-008"` |
| 自动化用例 | `tests/annotation/video-annotation-staging.spec.ts` › DC-07-008 |
| 证据 | `reports/annotation-008-headed.log`、`reports/annotation-008-headed-alt.log`、`test-results/video-annotation-staging-DC-07-008-*/trace.zip` |
| 云效工作项 | cinlink-WEB / `835f665eb4a220db9fe783bcff`（列表搜索对应 ERYE-225） |
| 云效链接 | https://devops.aliyun.com/projex/project/1e401ac99539c3999e00e40006/bug#viewIdentifier=1dedc5afd44979211cad516f&openWorkitemIdentifier=835f665eb4a220db9fe783bcff |

## 1. 一句话描述

在口水词项目的视频编辑器里，点选画面创建批注 → 「添加描述」→ 输入描述 → 点「添加到对话」后，编辑器页面进入无响应状态：DOM 文本读不到、DOM 点击挂起，同时视频的 S3 请求反复被 `ERR_ABORTED` 取消，最终直到测试 5 分钟超时。

## 2. 复现步骤

1. 打开工作台，新建非项目会话。
2. 上传并 `@` 引用素材：

   ```
   E:\图片视频素材\cinlink测试数据\---视频批注用例\批注\动物河边散步_中文_1分钟.mp4
   ```

3. 发送提示词：`去掉这个视频里的口水词`。
4. 等分析完成，点结果卡片里的 **在编辑器中精修**。
5. 进入编辑器后点工具栏的 **批注**（`#video-editor-mode-annotate`）。
6. 在画面上点一下创建批注，出现 **添加描述**。
7. 点 **添加描述**，输入 `这里增加一朵小花`。
8. 点 **添加到对话**。

## 3. 预期 / 实际

| | 内容 |
|---|---|
| **预期** | 描述保存成功，输入框出现 `◉ 批注 1：这里增加一朵小花` 引用，随后可发送给 Agent |
| **实际** | 点「添加到对话」后页面失去响应；`DESCRIBE` / `TIMELINE` / `PROMPT` 的 `innerText` 全部为空；`el.click()` 挂起直到 5 分钟超时；期间视频请求持续 `net::ERR_ABORTED` |

## 4. 关键证据

### 4.1 有头运行日志（中文素材）

```
ADD[0] enabled=true title=(none)
DESCRIBE:
TIMELINE:
PROMPT:
locator.evaluate: Target page, context or browser has been closed
Test timeout of 300000ms exceeded (5.0m)
```

### 4.2 视频请求反复被取消

```
REQFAIL https://cinlink-qa-891376936084.s3.amazonaws.com/agent-files/acct_4e73d97f04f5/video/2026/10/19/动物河边散步_中文_1分钟.mp4 net::ERR_ABORTED
```

同一条请求在操作期间出现十余次（`reports/annotation-008-headed.log`）。

### 4.3 换素材仍复现

用 `动漫人物演讲_英文_1分钟.mp4`（9.2 MB）替换后，有头模式结果一致：

```
ADD[0] enabled=true title=(none)
REQFAIL https://cinlink-qa-891376936084.s3.amazonaws.com/agent-files/.../动漫人物演讲_英文_1分钟.mp4 net::ERR_ABORTED
locator.evaluate: Target page, context or browser has been closed
```

共 9 次 `REQFAIL`，同样 5 分钟超时（`reports/annotation-008-headed-alt.log`）。**与素材大小/语言无关，不是单个文件问题。**

## 5. 已有定位

产品代码里「添加到对话」按钮的禁用条件为：

```js
const addDisabled = saving || (addedToConversation && annotation.saved) || sendBlocked
  || !annotation.frames || !String(annotation.description || "").trim();
```

- 最初按钮一直禁用，`title` 为空 → 判定不是 `sendBlocked`，而是 `annotation.frames` 为空（视频未就绪时抓帧失败）；
- 用例里改为等 `video.readyState >= 2 && video.duration > 0` 再创建批注后，按钮立即变为 `enabled=true`；
- 但紧接着填写描述/点击添加，页面即失去响应，说明问题在 **抓帧/保存/重绘阶段**，不是按钮状态判断本身。

## 6. 影响

- 批注功能的核心闭环（创建 → 描述 → 加入对话 → 发送）在预发不可用；
- 卡死时草稿无法保存，只能刷新页面重来；
- 同一视频请求被反复取消，可能放大 S3 流量与前端重试压力；
- 阻塞 DC-07 的 P0 自动化（008/013/024/040 都依赖该路径）。

## 7. 建议排查方向

1. 点击「添加到对话」后的抓帧逻辑：是否在主线程同步解码整段视频；
2. 视频元素是否被反复重建/重新 `src`，导致持续的 `ERR_ABORTED`；
3. 保存批注请求是否在等待一个永不 resolve 的 Promise；
4. 用 Performance 面板录一次点击前后的主线程长任务，确认卡点在 `requestVideoFrameCallback` / `drawImage` / 保存请求。

## 8. 复现环境补充

- 会话有效，能正常创建口水词项目并打开编辑器；
- 同一路径下 `DC-07-005 单点批注创建` 可通过（约 1.1 分钟）；
- 失败只发生在「添加描述 → 添加到对话」之后。

## 4.4 原生 Playwright click 同样复现（排除测试侧 DOM click 因素）

为了排除“用例用 `el.click()` 绕过稳定性等待”导致的假象，改为原生 Playwright click 重跑：

```js
await addButton.click({ timeout: 30_000 });
```

结果一致：`ADD[0] enabled=true` 后，点击挂起至 300 秒测试超时，
`DESCRIBE/TIMELINE/PROMPT` 全为空，视频请求仍持续 `net::ERR_ABORTED`。

日志：`reports/annotation-008-headed-native.log`

结论：卡死与测试点击方式无关，是编辑器在“添加描述 → 添加到对话”阶段自身失去响应。
## 9. 复核结论（2026-10-19 撤回）

手动鼠标点击可以正常把批注加入对话，说明页面并未卡死。进一步定位：

- 点击处理函数 `addVideoEditorAnnotationToConversation` 一开始就调用 `render()`，
  整个编辑器（含批注卡片和按钮）被重建；
- 卡片/按钮节点在 `render()` 中反复被替换；
- Playwright 的 `locator.click()` / `boundingBox()` 会等待元素“稳定且已挂载”，
  面对持续重建的节点会一直重试，表现为挂起数分钟；
- 之前的 `el.click()` 也挂起，是因为 `locator.evaluate` 先要解析到稳定节点，同样卡住。

验证：改为「页面内一次性读取按钮坐标 + `page.mouse.click(x, y)`」后，
`DC-07-008` 在预发真实通过（1.7 分钟），页面无冻结，批注成功加入对话。

结论：这是**自动化定位方式与重渲染 DOM 的冲突**，不是产品缺陷。
测试侧已改为坐标点击（等价人工点击），不再使用 locator 的稳定性等待。