# 07 视频批注 · 可执行用例说明

对应设计用例：[07-video-annotation.md](07-video-annotation.md) 的 P0 部分。代码在 `tests/annotation/`，分两套：

| 套件 | 命令 | 目标 |
|---|---|---|
| 规则层 + 本地 UI | `npm run test:annotation` | 不依赖预发，24 条（18 规则 + 6 UI） |
| 预发真实链路 | `npm run test:annotation:staging` | 真实建口水词项目 → 打开编辑器 → 批注 |

> 最近执行：2026-10-20
> 本地 `18 passed · 6 skipped`；预发持久 profile 下整套 `11 passed · 1 failed · 1 skipped · 3 did not run`（失败为 016 刷新恢复断言，另 020/021/022 未执行）。

## 预发前置：批注入口只在口水词项目里出现

1. 新建非项目会话，上传并 `@` 引用视频；
2. 发送「去掉这个视频里的口水词」；
3. 等分析完成，点结果卡片的 **在编辑器中精修**；
4. 编辑器工具栏才会出现 `#video-editor-mode-annotate`。

预发套件每条用例都会先走一遍这个流程（约 40–60 秒），再执行断言。

## 会话：单持久 profile

预发套件不再每条用例 new context + 写回 storageState，而是复用同一个 Chrome profile：

- profile 目录：`.auth/chrome-profile`
- 整套只 launch 一次：`chromium.launchPersistentContext(PROFILE_DIR, { channel: "chrome" })`
- 登录一次后，后续 page 都复用同一份 cookie，不会因为 refresh token 轮转而互相踢下线

首次登录（每天/会话过期时一次）：

```powershell
$env:CINLINK_HEADLESS='0'
npx playwright test --project=annotation-staging -g "DC-07-002"
```

窗口打开后人工登录；脚本会等待工作台就绪，然后继续跑 002。之后整套可以直接：

```powershell
npm run test:annotation:staging
```

如果 profile 未登录且以 headless 运行，`beforeAll` 会直接报「持久会话未登录」，不会把登录页当成用例失败。
## 素材

| 素材 | 用途 |
|---|---|
| `动物河边散步_中文_1分钟.mp4` | 005/008/013/024 默认素材 |
| `测试视频_003_12秒.mp4` | 003（拖拽留白）、037（跨源）的第一段，12 秒中文口播 |
| `动物切换_3秒.mp4` | 037 在编辑器内导入的第二段 |

默认目录：`E:\图片视频素材\cinlink测试数据\---视频批注用例\批注\`
可用 `CINLINK_ANNOTATION_ASSET` 覆盖默认素材。

## 本地准备（规则层与 preview）

```powershell
powershell -File tools/annotation/setup.ps1              # 准备 worktree（origin/dev）
powershell -File tools/annotation/setup.ps1 -StartServer # 同时启动 4173
```

缺少 worktree 或 dev server 时，本地 UI 用例会跳过并说明原因。

## 覆盖情况

### 本地 24 条

| 类型 | 条数 | 覆盖 |
|---|---|---|
| 规则层 | 18 | 005/006/007/008/011/014/016/017/018/021/022/030/038/051/052/058/059 |
| 编辑器 UI | 6 | 001/051（2026-10-20 本地 preview 未装载编辑器，6 条 skip） |

### 预发 11 条已实现

| 用例 | 断言要点 |
|---|---|
| DC-07-001 | 入口可见、`aria-label` 含「批注」、默认非批注模式；点击后三种工具出现，切回选择模式退出 |
| DC-07-003 | 拖拽 V1 片段产生「视频前空白 3.6 秒」，播放头在空白区时批注发送被拦 |
| DC-07-005 | 点选画面后批注轨 +1，出现「添加描述」 |
| DC-07-008 | 描述 `maxlength=2000`，加入对话后输入框出现 `◉ 批注` |
| DC-07-009 | 拦截批注保存 500，出现「保存失败/重试」，run 数 = 0 |
| DC-07-013 | 引用标签可单独移除，引用容器清空 |
| DC-07-015 | 已有引用时再添加第二个批注，引用数 ≥1 且仍含「批注」 |
| DC-07-024 | 发送只创建一次 Agent run |
| DC-07-029 | 发送后把源片入点改到 8 秒，引用出现不可用提示 |
| DC-07-037 | 编辑器内导入第二段视频并追加；拼接点批注「添加到对话」被禁用，提示跨源/覆盖问题 |

### 仍为 fixme

| 用例 | 原因 |
|---|---|
| 040 | 注入 run 创建 500 后页面没有「重试」按钮，需先确认失败态 UI 文案 |

## 关键实现（踩坑记录）

### 1. 不要用 locator 点「添加到对话」

产品在点击处理开头就 `render()`，批注卡片和按钮会被重建。`locator.click()`、`click({force:true})`、`boundingBox()`、`evaluate(el.click())` 都会一直等稳定节点而挂起。

正确做法：页面内一次性读坐标，再发真实鼠标事件：

```ts
const point = await page.evaluate(() => {
  const button = Array.from(document.querySelectorAll("[data-video-annotation-add]"))
    .find((el) => el.offsetParent !== null);
  if (!button) return null;
  const rect = button.getBoundingClientRect();
  return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
});
await page.mouse.click(point.x, point.y);
```

### 2. 拖拽视频片段要绕开 setPointerCapture

片段拖拽依赖 `setPointerCapture`，合成 `PointerEvent` 时直接抛错会让 handler 中断。003 里的做法：

```ts
const original = Element.prototype.setPointerCapture;
Element.prototype.setPointerCapture = () => undefined;
clip.dispatchEvent(pointer("pointerdown", startX, 1));
clip.dispatchEvent(pointer("pointermove", startX + dx, 1));
clip.dispatchEvent(pointer("pointerup", startX + dx, 0));
Element.prototype.setPointerCapture = original;
```

成功后时间线出现 `.video-editor-track-gap`（`aria-label="视频前空白 3.6 秒"`）。

### 3. 第二个视频在编辑器内导入

不要提前在工作台上传第二段（会让口水词分析拿不到精修卡片）。正确顺序：

```ts
await clickBySelector(page, '[data-video-editor-module="media"]'); // 资产
await page.locator("#video-editor-asset-import").setInputFiles(secondVideo);
await page.waitForTimeout(8_000);
// 再点素材卡片，追加到工程末尾
```

### 4. 裁剪用 input/change 事件

`fill()` + Enter 不可靠，改为直接设值并派发事件：

```ts
await page.locator('[data-video-clip-time="start"]').first().evaluate((element, value) => {
  const input = element as HTMLInputElement;
  input.value = String(value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
}, 8);
```

### 5. 视频就绪再建批注

否则 `annotation.frames` 为空，「添加到对话」永久禁用：

```ts
await page.waitForFunction(() => {
  const video = document.getElementById("video-editor-preview");
  return Boolean(video && video.readyState >= 2 && Number(video.duration) > 0);
});
```

## 实测结果（2026-10-20）

### 本地

```text
18 passed · 6 skipped · 21.6s
```

- 规则层 18 条全绿；
- 6 条 UI 跳过：最新 `dev` 的本地 preview 不再自动装载编辑器（页面只有空工作台），按设计 skip，不算失败。

### 预发

整套最近一次（2026-10-20，持久 profile）：

```text
11 passed · 1 failed · 1 skipped · 3 did not run · 15.8m
```

- 通过：001 / 002 / 003 / 005 / 008 / 009 / 013 / 015 / 024 / 029 / 037
- 失败：016（刷新后引用恢复断言 `toContain("批注")` 未命中）
- 跳过：040（fixme）
- 未执行：020 / 021 / 022（016 失败后串行中断）

此前各用例单独运行的记录：

```text
001 passed 1.4m    003 passed 1.3m    009 passed 1.2m
015 passed 1.3m    029 passed 1.4m    037 passed 1.6m
```

日志：`reports/p0-local.log`、`reports/p0-staging.log`。

## 环境变量

| 变量 | 默认 | 作用 |
|---|---|---|
| `CINLINK_ANNOTATION_MODULE` | worktree 里的 `editor-video-annotations.js` | 规则模块路径 |
| `CINLINK_ANNOTATION_URL` | `http://127.0.0.1:4173/?workspace-preview=editor` | 本地 UI 用例目标页 |
| `CINLINK_ANNOTATION_ASSET` | 中文 1 分钟视频 | 预发默认素材 |
| `CINLINK_ANNOTATION_SKIP=1` | 未设置 | 跳过本地 UI 用例 |
| `CINLINK_HEADLESS=0` | 未设置 | 有头运行 |

## 常见问题

| 现象 | 原因 | 处理 |
|---|---|---|
| 打开就是登录页 | 持久 profile 未登录 | 用 `CINLINK_HEADLESS=0` 跑一次 DC-07-002 并人工登录 |
| 批注入口不存在 | 没走「口水词 → 在编辑器中精修」 | 按前置步骤走 |
| 「添加到对话」一直禁用 | 视频未就绪，frames 为空 | 等 `readyState>=2` |
| 点击挂起数分钟 | locator 点在重渲染节点上 | 改坐标点击 |
| 拖拽后没有空白块 | 合成 pointer 未绕过 setPointerCapture | 按 003 的 PointerEvent 写法 |
| 040 找不到「重试」 | 失败态 UI 与预期不一致 | 先确认文案再改断言 |
