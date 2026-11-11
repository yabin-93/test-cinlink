import { copyFileSync, readFileSync, rmSync } from "node:fs";
import { createHash } from "node:crypto";
import os from "node:os";
import path from "node:path";

import type { Page } from "@playwright/test";

import type { TestAsset } from "./assets.js";
import { targets } from "./config.js";
import { extractPools, sumPoolMetric, type StatusSample, type WorkerPools } from "./assertions/job.js";
import { assertWorkspaceOpened } from "./staging.js";

/**
 * 工作台操作封装：G1（上传）与 G2（提交）的「手」。
 *
 * ## 设计原则：操作走 UI，数据从网络响应取
 *
 * 这里所有函数都**通过真实 UI 操作**触发（点按钮、按回车、走 filechooser），
 * 但返回值一律从**网络响应**里解析 —— 不去 DOM 里找 `run_id` / `cloud_file_id`。
 * 原因：DOM 上的这些值可能被截断、隐藏或根本没渲染，而响应是权威数据。
 *
 * ## 端点依据（源码实测，非猜测）
 *
 * ```
 * api.js:1073  ≤5 MiB  POST /v1/agent/files/presign        → PUT upload_url → POST /complete
 * api.js:1089  >5 MiB  POST /v1/agent/files/multipart/start
 * api.js:1108          POST /v1/agent/files/multipart/part   （逐片，每片最多重试 3 次）
 * api.js:1314          POST /v1/agent/runs（输入框提交；mode 由产品决定）
 * app.js:14197         #workspace-send 的 click → submitWorkspacePrompt
 * app.js:14301         在 #workspace-prompt 按 Enter（非 Shift）→ submitWorkspacePrompt
 * ```
 *
 * ⚠️ `#workspace-send` 用的是 **id 而不是 data-* 锚点**，所以锚点地图里没有它。
 * 这是本工程唯一允许使用 id 选择器的地方，已在注释中标注来源行号。
 */

export const UPLOAD_ENDPOINTS = {
  presign: "/v1/agent/files/presign",
  complete: "/v1/agent/files/complete",
  multipartStart: "/v1/agent/files/multipart/start",
  multipartPart: "/v1/agent/files/multipart/part",
  multipartComplete: "/v1/agent/files/multipart/complete",
} as const;

export const RUNS_ENDPOINT = "/v1/agent/runs";

/** 只计创建 Run，不把取消、事件流或查询请求混入提交数。 */
export function isRunSubmission(url: string, method: string): boolean {
  if (method !== "POST") return false;
  const pathname = new URL(url).pathname;
  return (
    /\/(?:studio-api\/)?v1\/agent\/runs$/.test(pathname) ||
    /\/runtime-api\/v1\/conversations\/[^/]+\/turns$/.test(pathname)
  );
}

/** 在任意嵌套结构里找第一个非空字符串字段（应对后端字段位置变化） */
export function findStringField(
  payload: unknown,
  key: string,
  depth = 0,
): string | undefined {
  if (depth > 6 || payload === null || typeof payload !== "object") return undefined;

  if (Array.isArray(payload)) {
    for (const item of payload) {
      const found = findStringField(item, key, depth + 1);
      if (found) return found;
    }
    return undefined;
  }

  const record = payload as Record<string, unknown>;
  const direct = record[key];
  if (typeof direct === "string" && direct.trim()) return direct.trim();

  for (const value of Object.values(record)) {
    const found = findStringField(value, key, depth + 1);
    if (found) return found;
  }
  return undefined;
}

/**
 * 在任意嵌套结构里找第一个数值字段。
 *
 * 与 `findStringField` 分开的理由：`balance_cents` 是数字，
 * 用字符串版会永远找不到（返回 undefined），而调用方若把 undefined 当 0 处理，
 * 就会得到"余额为 0"这种假结论。
 */
export function findNumberField(payload: unknown, key: string, depth = 0): number | undefined {
  if (depth > 6 || payload === null || typeof payload !== "object") return undefined;

  if (Array.isArray(payload)) {
    for (const item of payload) {
      const found = findNumberField(item, key, depth + 1);
      if (found !== undefined) return found;
    }
    return undefined;
  }

  const record = payload as Record<string, unknown>;
  const direct = record[key];
  if (typeof direct === "number" && Number.isFinite(direct)) return direct;

  for (const value of Object.values(record)) {
    const found = findNumberField(value, key, depth + 1);
    if (found !== undefined) return found;
  }
  return undefined;
}

/**
 * 打开工作台并进入一个可操作的会话界面。
 *
 * ## 默认新建会话，而不是复用旧会话
 *
 * 这是踩过坑之后的硬性约定。实测（2026-10-16）：
 *
 * ```
 * 同一会话里累积了两个同名 7MB.mp4 →
 *   context_files: [ {file_48a0..., name:"7MB.mp4"}, {file_72c8..., name:"7MB.mp4"} ]
 *   conversation_state.nlu_video_candidate_count = "0"
 *   AI 回复：「要给本次提交的哪一个视频加中文字幕？」
 *   任务 status = requires_user_input，resolution = canceled，plan = []
 * ```
 *
 * 也就是说：**同会话内重复上传同名素材会让 AI 无法消歧，任务直接不执行**。
 * 这不属于产品缺陷，而是测试数据管理问题——每次跑用例都往同一会话堆素材必然撞上。
 *
 * 对策：默认新建会话（干净的上下文）。需要复用历史会话时显式传 `{ fresh: false }`。
 *
 * ⚠️ 仍建议后续补上"上传后清理云端素材"（`api.js` 的 `deleteAgentFile`），
 * 否则云端同名文件会持续累积。
 */
export async function openWorkspaceSession(
  page: Page,
  options: { fresh?: boolean } = {},
): Promise<void> {
  await assertWorkspaceOpened(page);

  const useFresh = options.fresh !== false;

  if (useFresh) {
    // 新版工作台（/studio/workspace）用 aria-label 标识「新建非项目会话」，
    // 旧版用 data-workspace-new-session；两套都保留以便回滚。
    const selector = '[data-workspace-new-session="non-project"], [data-react-new-session="non-project"], [aria-label="New no-project session"]';
    const newSession = page.locator(selector).first();
    await newSession.waitFor({ state: "attached", timeout: 30_000 }).catch(() => {
      throw new Error("未找到新建非项目会话入口，停止而不复用旧项目");
    });
    if (!(await newSession.isVisible())) {
      console.warn("[workspace] 新建会话按钮不可见，回退 DOM click（新版侧栏悬停样式）");
      await newSession.evaluate((element: HTMLElement) => element.click());
      await page.waitForTimeout(800);
    } else {
      await newSession.click({ timeout: 10_000 });
    }
  } else {
    const existing = page.locator("[data-workspace-project-id]:visible").first();
    if (await existing.isVisible().catch(() => false)) {
      await existing.click({ timeout: 10_000 });
    }
  }

  // 无论走哪条路，等到 composer 真正可用为止 —— 这是本函数的前置契约
  await page.locator("#workspace-prompt").waitFor({ state: "visible", timeout: 45_000 });
}

/** 确认 composer 已就绪（可见且可编辑） */
export async function waitForComposer(page: Page): Promise<void> {
  await page.waitForSelector("#workspace-prompt", { state: "attached", timeout: 45_000 });
  // 旧版有 data-workspace-upload 按钮；新版只保留一个隐藏的 input[type=file]
  await page
    .locator("[data-workspace-upload], input[type=file]")
    .first()
    .waitFor({ state: "attached", timeout: 45_000 });
}

export interface UploadOutcome {
  httpStatus: number;
  /** 服务端登记的云端素材 ID */
  cloudFileId: string;
  /** 服务端登记的文件名（使用唯一名策略时会带时间戳后缀） */
  name: string;
  /** 本次实际用于上传的本地路径（唯一名策略下是临时文件，已删除） */
  uploadedAs: string;
  /** 服务端登记的字节数 */
  sizeBytes: number;
  /** 服务端登记的 MIME 类型 */
  mimeType: string;
  /** 预签名下载 URL（有效期短，仅可在同一用例内立即使用） */
  downloadUrl: string;
  /** 实际发出的分片请求数（0 表示走了单段上传） */
  partRequests: number;
  /** 是否走了分片上传 */
  multipart: boolean;
  /** complete 端点的原始响应，便于排查 */
  raw: unknown;
}

export interface UploadOptions {
  /**
   * 是否给文件名加时间戳后缀（默认 **true**）。
   *
   * ## 为什么默认开
   *
   * 实测（2026-10-16）：**项目素材库里累积同名文件会让 AI 无法消歧，任务直接不执行**。
   * 连续两次上传 `7MB.mp4` 后，每次提交的 `context_files` 都会带上全部同名文件，
   * `nlu_video_candidate_count` 为 0，AI 回复「要给哪一个视频加中文字幕？」，
   * `status = requires_user_input`、`plan = []`，任务根本没跑。
   *
   * 新建**会话**解决不了——素材挂在**项目**层面，新会话照样带上。
   * 唯一名是当前唯一可靠且不依赖额外接口的解法。
   *
   * 需要断言原始文件名时（例如校验 `name` 回显）传 `{ uniqueName: false }`，
   * 但要自行确保该项目里没有同名遗留素材。
   */
  uniqueName?: boolean;
}

/**
 * 上传素材。
 *
 * ## ⚠️ 测试盲区（必须知晓）
 *
 * 产品在 Chrome 上的上传入口长这样（`app.js:12968`）：
 *
 * ```js
 * button.addEventListener("click", async () => {
 *   if (typeof window.showOpenFilePicker !== "function") {
 *     workspaceInput?.click();                    // ← 回退分支
 *     return;
 *   }
 *   const handles = await window.showOpenFilePicker({ multiple: true });  // ← Chrome 主路径
 * });
 * ```
 *
 * `showOpenFilePicker` 是 **File System Access API**，由浏览器以**系统级对话框**呈现，
 * Playwright 的 `filechooser` 事件**捕获不到它**（已实测：点击按钮后 30 秒内无 filechooser 事件）。
 *
 * 因此这里改为直接向 `#workspace-file-input` 注入文件 —— 这正是产品回退分支使用的同一个
 * input，其 `change` listeners 会调 `selectWorkspaceFiles()`，**上传链路
 * （presign → 分片 → complete）完整被覆盖**。
 *
 * **未被覆盖的部分**：`showOpenFilePicker` 返回 handles 后经
 * `workspaceSelectionsFromFileHandles()` 的转换逻辑。这一段只能在人工测试中验证，
 * 是本工程已知且已记录的盲区，不要当成"已测过"。
 */
export async function uploadAsset(
  page: Page,
  asset: TestAsset,
  options: UploadOptions = {},
): Promise<UploadOutcome> {
  const useUnique = options.uniqueName !== false;

  // 唯一名策略：复制到临时目录并改名，上传后删掉临时文件。
  // 这样项目素材库里永远只有"本次这一个"匹配本次名字的文件，AI 不会消歧失败。
  let uploadPath = asset.path;
  let tempPath: string | null = null;

  if (useUnique) {
    const ext = path.extname(asset.name);
    const stem = path.basename(asset.name, ext);
    const uniqueName = `${stem}-${Date.now()}${ext}`;
    tempPath = path.join(os.tmpdir(), uniqueName);
    copyFileSync(asset.path, tempPath);
    uploadPath = tempPath;
  }

  let partRequests = 0;
  let sawMultipartStart = false;

  const onRequest = (request: { url: () => string }) => {
    const url = request.url();
    if (url.includes(UPLOAD_ENDPOINTS.multipartPart)) partRequests += 1;
    if (url.includes(UPLOAD_ENDPOINTS.multipartStart)) sawMultipartStart = true;
  };
  page.on("request", onRequest);

  // complete 有两个变体：单段 /v1/agent/files/complete 与分片 /v1/agent/files/multipart/complete
  const completePromise = page.waitForResponse(
    (response) =>
      /\/v1\/agent\/files\/(multipart\/)?complete/.test(response.url()) &&
      response.request().method() === "POST",
    { timeout: 180_000 },
  );

  try {
    await page.locator("#workspace-file-input, input[type=file]").first().setInputFiles(uploadPath);

    const response = await completePromise;
    const raw = await response.json().catch(() => null);

    return {
      httpStatus: response.status(),
      cloudFileId: findStringField(raw, "cloud_file_id") ?? "",
      name: findStringField(raw, "name") ?? "",
      uploadedAs: path.basename(uploadPath),
      sizeBytes: findNumberField(raw, "size_bytes") ?? Number.NaN,
      mimeType: findStringField(raw, "mime_type") ?? "",
      downloadUrl: findStringField(raw, "url") ?? "",
      partRequests,
      multipart: sawMultipartStart || partRequests > 0,
      raw,
    };
  } finally {
    page.off("request", onRequest);
    if (tempPath) rmSync(tempPath, { force: true });
  }
}

/** 新版工作台「附件」：只挂到 composer，不立即上传（实测上传发生在发送时） */
export interface AttachedAsset {
  /** 实际使用的文件名（唯一名策略下带时间戳） */
  uploadedAs: string;
  sizeBytes: number;
  mimeType: string;
  /** 唯一名策略下的临时文件；上传发生在发送时，必须等发送结束再删除 */
  tempPath: string | null;
}

/** 发送完成后清理 attachAsset 的临时文件 */
export function disposeAttached(asset: AttachedAsset): void {
  if (asset.tempPath) rmSync(asset.tempPath, { force: true });
}

/**
 * 把素材挂到 composer（新版 `/studio/workspace`）。
 *
 * 新版把上传推迟到发送时（i18n: "Ready; uploads when sent"），
 * 所以这里不再等待 presign/complete；真正的上传事实由 `submitAttachedPrompt` 捕获。
 */
export async function attachAsset(
  page: Page,
  asset: TestAsset,
  options: UploadOptions = {},
): Promise<AttachedAsset> {
  const useUnique = options.uniqueName !== false;
  let uploadPath = asset.path;
  let tempPath: string | null = null;

  if (useUnique) {
    const ext = path.extname(asset.name);
    const stem = path.basename(asset.name, ext);
    const uniqueName = `${stem}-${Date.now()}${ext}`;
    tempPath = path.join(os.tmpdir(), uniqueName);
    copyFileSync(asset.path, tempPath);
    uploadPath = tempPath;
  }

  const uploadedAs = path.basename(uploadPath);

  await page.locator("#workspace-file-input, input[type=file]").first().setInputFiles(uploadPath);
  await page.locator("#workspace-prompt").waitFor({ state: "visible", timeout: 30_000 });
  await page
    .waitForFunction((name) => (document.body?.innerText || "").includes(name), uploadedAs, {
      timeout: 30_000,
    })
    .catch(() => undefined);

  // 注意：不能在这里删临时文件。新版上传发生在“发送”时，提前删除会让 PUT 失败。
  return { uploadedAs, sizeBytes: asset.sizeBytes, mimeType: asset.mimeType, tempPath };
}

/**
 * 一次挂多个附件（新版 composer 支持多文件输入）。
 * 返回顺序与传入 assets 一致，供 @ 引用时按名字匹配。
 */
export async function attachAssets(page: Page, assets: TestAsset[]): Promise<AttachedAsset[]> {
  const staged = assets.map((asset) => {
    const extension = path.extname(asset.name);
    const stem = path.basename(asset.name, extension);
    const uniqueName = `${stem}-${Date.now()}${extension}`;
    const tempPath = path.join(os.tmpdir(), uniqueName);
    copyFileSync(asset.path, tempPath);
    return { asset, uploadedAs: uniqueName, tempPath };
  });

  await page
    .locator("#workspace-file-input, input[type=file]")
    .first()
    .setInputFiles(staged.map((item) => item.tempPath));
  await page.locator("#workspace-prompt").waitFor({ state: "visible", timeout: 30_000 });
  for (const item of staged) {
    await page
      .waitForFunction((name) => (document.body?.innerText || "").includes(name), item.uploadedAs, {
        timeout: 30_000,
      })
      .catch(() => undefined);
  }

  return staged.map((item) => ({
    uploadedAs: item.uploadedAs,
    sizeBytes: item.asset.sizeBytes,
    mimeType: item.asset.mimeType,
    tempPath: item.tempPath,
  }));
}

export interface UploadedFacts {
  httpStatus: number;
  fileId: string;
  name: string;
  sizeBytes: number;
  mimeType: string;
  partRequests: number;
  multipart: boolean;
  downloadUrl: string;
}

/**
 * 发送 composer 里已挂好的附件与提示词，并在发送过程中捕获上传事实。
 *
 * 新版上传流程（实测）：
 *   POST /studio-api/v1/agent/files/presign → PUT S3 → POST .../complete
 *   complete 返回 file_id / name / size_bytes / mime_type（不再是 cloud_file_id）
 * 分片文件则走 .../multipart/start + .../multipart/part。
 */
export async function submitAttachedPrompt(
  page: Page,
  prompt: string,
): Promise<{ upload: UploadedFacts }> {
  await appendPromptText(page, prompt);

  let partRequests = 0;
  let sawMultipartStart = false;
  const onRequest = (request: { url: () => string }) => {
    const url = request.url();
    if (url.includes(UPLOAD_ENDPOINTS.multipartPart)) partRequests += 1;
    if (url.includes(UPLOAD_ENDPOINTS.multipartStart)) sawMultipartStart = true;
  };
  page.on("request", onRequest);

  const completePromise = page.waitForResponse(
    (response) =>
      response.request().method() === "POST" &&
      /\/agent\/files\/(multipart\/)?complete/.test(response.url()),
    { timeout: 180_000 },
  );

  try {
    await page.locator("#workspace-send").first().click({ timeout: 20_000 });
    const response = await completePromise;
    const raw = await response.json().catch(() => null);

    const fileId =
      findStringField(raw, "cloud_file_id") ?? findStringField(raw, "file_id") ?? "";
    let downloadUrl = findStringField(raw, "url") ?? "";
    if (!downloadUrl && fileId) {
      const urlResponse = await page.request
        .get(
          `${targets.studioBase}/studio-api/v1/agent/files/${encodeURIComponent(fileId)}/url?disposition=inline`,
          { timeout: 30_000 },
        )
        .catch(() => null);
      if (urlResponse?.ok()) {
        const body = await urlResponse.json().catch(() => null);
        downloadUrl = findStringField(body, "url") ?? "";
      }
    }

    return {
      upload: {
        httpStatus: response.status(),
        fileId,
        name: findStringField(raw, "name") ?? "",
        sizeBytes: findNumberField(raw, "size_bytes") ?? Number.NaN,
        mimeType: findStringField(raw, "mime_type") ?? "",
        partRequests,
        multipart: sawMultipartStart || partRequests > 0,
        downloadUrl,
      },
    };
  } finally {
    page.off("request", onRequest);
  }
}

/** 新版上传合同（与前端 bundle 的 uploadAgentFile 一致，直接走 API） */
export interface ApiUploadOutcome extends UploadedFacts {}

const AGENT_FILES_BASE = process.env.CINLINK_FILES_API_BASE || "/studio-api/v1/agent/files";
const MULTIPART_CHUNK_BYTES = 5 * 1024 * 1024;

/**
 * 按产品前端的同一套合同上传素材（不经过 UI）。
 *
 * 新版 composer 把上传推迟、且是否上传不稳定，无法用 UI 稳定断言上传链路；
 * 这里复用 bundle 实测的请求形状：
 *   小文件：presign → PUT → complete
 *   >5MiB：multipart/start → multipart/part（逐片 PUT）→ multipart/complete
 * UI 侧另有 attachAsset 验证“附件出现在 media thumb / 可被 @ 引用”。
 */
export async function uploadAssetViaApi(page: Page, asset: TestAsset): Promise<ApiUploadOutcome> {
  const extension = path.extname(asset.name);
  const stem = path.basename(asset.name, extension);
  const uniqueName = `${stem}-${Date.now()}${extension}`;
  const buffer = readFileSync(asset.path);
  const checksum = createHash("sha256").update(buffer).digest("base64");
  const base = `${targets.studioBase}${AGENT_FILES_BASE}`;

  const descriptor = {
    filename: uniqueName,
    kind: asset.mimeType.startsWith("video") ? "video" : asset.mimeType.startsWith("image") ? "image" : "audio",
    mime_type: asset.mimeType,
    size_bytes: buffer.byteLength,
    checksum_sha256: checksum,
  };

  let partRequests = 0;
  let multipart = false;
  let completeBody: Record<string, unknown> | null = null;

  if (buffer.byteLength <= MULTIPART_CHUNK_BYTES) {
    const presign = await page.request.post(`${base}/presign`, { data: descriptor, timeout: 60_000 });
    if (!presign.ok()) throw new Error(`presign ${presign.status()}: ${(await presign.text()).slice(0, 200)}`);
    const signed = await presign.json();

    const put = await page.request.put(signed.upload_url, {
      data: buffer,
      headers: signed.upload_headers || {},
      timeout: 180_000,
    });
    if (!put.ok()) throw new Error(`S3 PUT ${put.status()}`);

    const complete = await page.request.post(`${base}/complete`, {
      data: { ...descriptor, bucket: signed.bucket, object_key: signed.object_key },
      timeout: 60_000,
    });
    if (!complete.ok()) throw new Error(`complete ${complete.status()}: ${(await complete.text()).slice(0, 200)}`);
    completeBody = await complete.json();
  } else {
    multipart = true;
    const start = await page.request.post(`${base}/multipart/start`, { data: descriptor, timeout: 60_000 });
    if (!start.ok()) throw new Error(`multipart/start ${start.status()}: ${(await start.text()).slice(0, 200)}`);
    const session = await start.json();
    const total = Math.ceil(buffer.byteLength / MULTIPART_CHUNK_BYTES);
    const parts: Array<{ part_number: number; etag: string }> = [];

    for (let partNumber = 1; partNumber <= total; partNumber += 1) {
      const from = (partNumber - 1) * MULTIPART_CHUNK_BYTES;
      const chunk = buffer.subarray(from, Math.min(buffer.byteLength, from + MULTIPART_CHUNK_BYTES));
      const part = await page.request.post(`${base}/multipart/part`, {
        data: {
          bucket: session.bucket,
          object_key: session.object_key,
          upload_id: session.upload_id,
          part_number: partNumber,
        },
        timeout: 60_000,
      });
      if (!part.ok()) throw new Error(`multipart/part ${partNumber} ${part.status()}`);
      const signedPart = await part.json();
      const put = await page.request.put(signedPart.upload_url, {
        data: chunk,
        headers: signedPart.upload_headers || {},
        timeout: 180_000,
      });
      if (!put.ok()) throw new Error(`part ${partNumber} PUT ${put.status()}`);
      parts.push({ part_number: partNumber, etag: put.headers()["etag"] || "" });
      partRequests += 1;
    }

    const complete = await page.request.post(`${base}/multipart/complete`, {
      data: {
        ...descriptor,
        bucket: session.bucket,
        object_key: session.object_key,
        upload_id: session.upload_id,
        parts,
      },
      timeout: 120_000,
    });
    if (!complete.ok()) throw new Error(`multipart/complete ${complete.status()}: ${(await complete.text()).slice(0, 200)}`);
    completeBody = await complete.json();
  }

  const raw = completeBody ?? {};
  const fileId =
    String(raw.cloud_file_id || raw.file_id || raw.resource_id || "");
  const downloadResponse = await page.request.get(
    `${base}/${encodeURIComponent(fileId)}/url?disposition=inline`,
    { timeout: 30_000 },
  );
  const downloadBody = downloadResponse.ok() ? await downloadResponse.json().catch(() => null) : null;

  return {
    httpStatus: 200,
    fileId,
    name: String(raw.name || uniqueName),
    sizeBytes: Number(raw.size_bytes ?? buffer.byteLength),
    mimeType: String(raw.mime_type || asset.mimeType),
    partRequests,
    multipart,
    downloadUrl: String(downloadBody?.url || raw.url || ""),
  };
}

/** 在已有 @ 引用的 composer 末尾追加指令；新版 composer 在聚焦/重建后光标不可靠，这里显式折叠选区 */
export async function appendPromptText(page: Page, prompt: string): Promise<void> {
  const editor = page.locator("#workspace-prompt");
  await editor.click({ timeout: 20_000 });
  await editor.evaluate((el) => {
    el.focus();
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  });
  await page.keyboard.insertText(` ${prompt}`);

  const composed = await editor.innerText();
  if (!composed.includes(prompt)) {
    throw new Error(`composer 未包含指令文本，实际内容：${composed.replace(/\s+/g, " ").slice(0, 120)}`);
  }
}

export interface SubmitOutcome {
  httpStatus: number;
  runId: string;
  status: string;
  /** 本次提交实际发出的 /v1/agent/runs 请求数 —— 幂等断言的关键 */
  submitRequests: number;
  raw: unknown;
}

/**
 * 在 composer 里输入 prompt 并提交。
 *
 * 提交方式选**点击 `#workspace-send`** 而不是按 Enter：
 * Enter 在 @ 候选或场景面板打开时会变成「选中候选项」，而不是提交。
 * 点击发送按钮语义明确，不会误触发。
 *
 * ⚠️ 本函数会**先 `fill()` 清空** composer，因此会**抹掉已插入的 `@` 引用**。
 * 需要"引用素材 + 追加指令"的场景请改用 `referenceAssetInPrompt()` +
 * `submitCurrentPrompt()` 的组合。
 */
export async function submitPrompt(page: Page, prompt: string): Promise<SubmitOutcome> {
  const editor = page.locator("#workspace-prompt");
  await editor.click({ timeout: 20_000 });
  await editor.fill(prompt);
  return submitCurrentPrompt(page);
}

/**
 * 直接提交 composer 里**当前已有**的内容（不清空、不重填）。
 *
 * 用于「@ 引用素材 + 追加自然语言指令」的组合场景 —— 那种情况下
 * 任何 `fill()` 都会把引用元素一起抹掉。
 */
export async function submitCurrentPrompt(page: Page): Promise<SubmitOutcome> {
  let submitRequests = 0;
  const onRequest = (request: { url: () => string; method: () => string }) => {
    if (isRunSubmission(request.url(), request.method())) submitRequests += 1;
  };
  page.on("request", onRequest);

  try {
    const responsePromise = page.waitForResponse(
      (response) =>
        isRunSubmission(response.url(), response.request().method()),
      { timeout: 120_000 },
    );

    const send = page.locator("#workspace-send").first();
    await send.waitFor({ state: "visible", timeout: 20_000 });

    // 新版 composer 的发送按钮会因输入事件/焦点重建短暂保持 disabled；
    // 这里最多等 10 秒，并用一次空格+退格触发输入事件，避免误判为“不可发送”。
    let enabled = await send.isEnabled().catch(() => false);
    if (!enabled) {
      await page.locator("#workspace-prompt").click({ timeout: 10_000 }).catch(() => undefined);
      await page.keyboard.press("Space").catch(() => undefined);
      await page.keyboard.press("Backspace").catch(() => undefined);
      for (let i = 0; i < 20; i += 1) {
        enabled = await send.isEnabled().catch(() => false);
        if (enabled) break;
        await page.waitForTimeout(500);
      }
    }
    if (!enabled) {
      const composed = await page.locator("#workspace-prompt").innerText().catch(() => "");
      throw new Error(`发送按钮不可用，composer 内容：${composed.replace(/\s+/g, " ").slice(0, 120)}`);
    }
    await send.click({ timeout: 20_000 });

    const response = await responsePromise;
    const raw = await response.json().catch(() => null);
    const runId = findStringField(raw, "run_id") ?? "";

    // 记录 run → 会话，供后续状态/产物读取
    const conversation = response.url().match(/\/runtime-api\/v1\/conversations\/([^/]+)\/turns/);
    if (runId && conversation) runConversations.set(runId, conversation[1]);

    return {
      httpStatus: response.status(),
      runId,
      status: findStringField(raw, "status") ?? "",
      submitRequests,
      raw,
    };
  } finally {
    page.off("request", onRequest);
  }
}

/** 读取 Runtime 的健康检查（含 worker 池指标）—— 观测用，不经 UI */
export async function readRuntimeHealth(page: Page): Promise<unknown> {
  const response = await page.request.get(
    `${targets.runtimeBase}/v1/health`,
    { timeout: 30_000 },
  );
  return response.json().catch(() => null);
}

/**
 * 读取账户余额（单位：cents）。
 *
 * 走 `/platform-api/v1/me`——`page.request` 与 browser context 共享 cookie，
 * 所以自动带上登录态。返回 `NaN` 表示读取失败（不要让用例因此假通过）。
 */
export async function readBalanceCents(page: Page): Promise<number> {
  for (const path of ["/platform-api/v1/me", "/v1/me"]) {
    try {
      const response = await page.request.get(`${targets.studioBase}${path}`, {
        timeout: 30_000,
      });
      if (!response.ok()) continue;
      const body = await response.json().catch(() => null);
      const balance = findNumberField(body, "balance_cents");
      if (balance !== undefined) return balance;
    } catch {
      /* 试下一个路径 */
    }
  }
  return Number.NaN;
}

/** 账户快照：余额 + 账本条目（`/platform-api/v1/me`） */
export interface AccountSnapshot {
  balanceCents: number;
  ledger: Array<Record<string, unknown>>;
}

/** 读取账户快照（/me 的 account.balance_cents 与 ledger）；失败时余额为 NaN */
export async function readAccount(page: Page): Promise<AccountSnapshot> {
  try {
    const response = await page.request.get(`${targets.studioBase}/platform-api/v1/me`, {
      timeout: 30_000,
    });
    if (!response.ok()) return { balanceCents: Number.NaN, ledger: [] };
    const body = await response.json().catch(() => null);
    const balance = findNumberField(body, "balance_cents");
    const ledger = Array.isArray((body as { ledger?: unknown })?.ledger)
      ? ((body as { ledger: Array<Record<string, unknown>> }).ledger)
      : [];
    return { balanceCents: balance ?? Number.NaN, ledger };
  } catch {
    return { balanceCents: Number.NaN, ledger: [] };
  }
}

/** 读取会话的全部消息（未按 run 过滤），用于校验“一次提交只建一个 Job” */
export async function readConversationMessages(
  page: Page,
  conversationId: string,
): Promise<Array<Record<string, unknown>>> {
  if (!conversationId) return [];
  const response = await page.request.get(
    `${targets.studioBase}/runtime-api/v1/conversations/${encodeURIComponent(conversationId)}/messages?limit=200`,
    { timeout: 30_000 },
  );
  if (!response.ok()) return [];
  const body = await response.json().catch(() => null);
  return Array.isArray((body as { messages?: unknown })?.messages)
    ? ((body as { messages: Array<Record<string, unknown>> }).messages)
    : [];
}

/**
 * 轮询 Run 直到真正的终态。
 *
 * 与 `pollUntilSettled` 的区别：部分工作流（高光剪辑、混剪）会先返回
 * `requires_user_input` 的「渲染确认」，并带 `auto_render_at`——服务端到点后
 * 会自动继续渲染，状态随后回到 running 并最终 done。
 * 这种情况不能当成终态，否则会把「等待确认/自动渲染」误判成任务没跑完。
 * 真正的澄清（没有 auto_render_at）仍然立即返回，交给 G4 判定失败。
 */
export async function pollRunUntilSettled(
  page: Page,
  runId: string,
  options: { timeoutMs: number; intervalMs?: number },
): Promise<{ status: string | null; samples: StatusSample[]; elapsedMs: number; timedOut: boolean }> {
  const intervalMs = options.intervalMs ?? 5_000;
  const startedAt = Date.now();
  const deadline = startedAt + options.timeoutMs;
  const samples: StatusSample[] = [];

  for (;;) {
    const status = await readRunStatus(page, runId);
    const at = Date.now();
    if (status) samples.push({ status, at });

    if (status === "done" || status === "failed") {
      return { status, samples, elapsedMs: at - startedAt, timedOut: false };
    }

    if (status === "requires_user_input") {
      const detail = await getRunDetail(page, runId);
      if (!hasPendingAutoRender(detail)) {
        return { status, samples, elapsedMs: at - startedAt, timedOut: false };
      }
    }

    if (at >= deadline) {
      return { status, samples, elapsedMs: at - startedAt, timedOut: true };
    }

    await new Promise((resolve) => setTimeout(resolve, Math.min(intervalMs, deadline - at)));
  }
}

/** 是否存在「到点自动渲染」的待确认项（没有则是需要人工回答的真澄清） */
function hasPendingAutoRender(detail: unknown): boolean {
  const clarifications = (detail as { clarifications?: unknown } | null)?.clarifications;
  if (!Array.isArray(clarifications)) return false;

  return clarifications.some((entry) => {
    const item = entry as {
      metadata?: Record<string, unknown>;
      selected_value?: unknown;
      is_dismissed?: unknown;
    };
    const autoRenderAt = item?.metadata?.auto_render_at;
    return (
      typeof autoRenderAt === "string" &&
      autoRenderAt.length > 0 &&
      item.selected_value == null &&
      !item.is_dismissed
    );
  });
}

/**
 * 等 Runtime 的 active 回落到基线。
 *
 * 任务状态变成 done 之后，worker 仍可能占用 active 数秒；此时立刻读 health
 * 会看到“比提交前多 1”，被误判成孤儿任务（实测于 water‑mark 预发用例）。
 * 共享预发上其他人的任务也会干扰该全局指标，所以这里只在窗口内轮询，
 * 不做固定 sleep。
 */
export async function waitForActiveDrain(
  page: Page,
  baselineActive: number,
  options: { timeoutMs?: number; intervalMs?: number } = {},
): Promise<WorkerPools> {
  const timeoutMs = options.timeoutMs ?? 45_000;
  const intervalMs = options.intervalMs ?? 5_000;
  const deadline = Date.now() + timeoutMs;

  let pools = extractPools(await readRuntimeHealth(page));
  while (sumPoolMetric(pools, "active") > baselineActive && Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
    pools = extractPools(await readRuntimeHealth(page));
  }

  return pools;
}

/**
 * 取消一个 Run。
 *
 * G2 用例提交后**必须调用它**——即使 plan 阶段不扣费，也没必要让一个测试任务
 * 继续往下跑真实渲染。
 *
 * 新版端点（2026-11-03 起）：`POST /runtime-api/v2/agent/runs/{id}/cancel`；
 * 旧版 `/v1/agent/runs/{id}/cancel` 作为兼容回退。
 */
export async function cancelRun(page: Page, runId: string): Promise<boolean> {
  if (!runId) return false;

  const endpoints = [
    `/runtime-api/v2/agent/runs/${encodeURIComponent(runId)}/cancel`,
    `/v1/agent/runs/${encodeURIComponent(runId)}/cancel`,
  ];

  for (const path of endpoints) {
    try {
      const response = await page.request.post(`${targets.studioBase}${path}`, {
        timeout: 30_000,
      });
      if (response.ok()) return true;
    } catch {
      /* 试下一个端点 */
    }
  }
  return false;
}

/**
 * 删除云端素材。
 *
 * 端点依据：`api.js:1166` 的 `deleteAgentFile` → `DELETE /v1/agent/files/{id}`。
 *
 * ## 为什么测试必须清理（这是一条硬性要求，不是可选项）
 *
 * 实测（2026-10-16）：**项目素材库里累积同名文件会让 AI 无法消歧，任务直接不执行。**
 *
 * ```
 * 同一项目连续两次上传 7MB.mp4 后，每次提交的 context_files 都会带上全部同名文件：
 *   [ {file_1f4a..., name:"7MB.mp4", semantic_role:"explicit_mention"},   ← 本次引用
 *     {file_72c8..., name:"7MB.mp4"} ]                                    ← 上一次遗留
 * conversation_state.nlu_video_candidate_count = "0"
 * AI 回复：「要给哪一个视频加中文字幕？」
 * status = requires_user_input，plan = []，任务未执行
 * ```
 *
 * 注意新建**会话**并不能解决——素材挂在**项目**层面，新会话里照样会被带进上下文。
 * 所以清理是唯一可靠的解法。
 */
export async function deleteAgentFile(page: Page, cloudFileId: string): Promise<boolean> {
  if (!cloudFileId) return false;
  try {
    const response = await page.request.delete(
      `${targets.studioBase}/v1/agent/files/${encodeURIComponent(cloudFileId)}`,
      { timeout: 30_000 },
    );
    return response.ok();
  } catch {
    return false;
  }
}

/** 确认新版计划卡片并返回续跑 Run 的 id（没有确认入口则返回空串）。
 *
 * 两种形态：
 * - 高光/长变短：`Render highlight clips` 折叠菜单 → 点「提交」；
 * - 去口水词：计划卡片直接给出「提交」（提取音频/转写/分析/渲染 4 步）。
 */
export async function confirmRenderPlan(page: Page, options: { allowClarification?: boolean } = {}): Promise<string> {
  // 计划卡的提交按钮有独立容器；澄清卡的按钮在普通表单里
  const planSubmit = page
    .locator(".node-plan-review__actions button")
    .filter({ hasText: /^提交$|^Submit$/ })
    .first();
  const anySubmit = page.getByRole("button", { name: /^提交$|^Submit$/ }).first();
  const render = page
    .getByRole("button", { name: /Render\b[^]*highlight|确认并渲染|确认并生成/i })
    .first();

  const waitResponse = (timeout: number) =>
    page
      .waitForResponse(
        (response) =>
          isRunSubmission(response.url(), response.request().method()) ||
          /\/(confirmations|clarifications)(?:\/|$)/.test(response.url()),
        { timeout },
      )
      .catch(() => null);

  const parseTurns = async (response: { url: () => string; json: () => Promise<unknown> }) => {
    const raw = await response.json().catch(() => null);
    const runId = findStringField(raw, "run_id") ?? "";
    const conversation = response.url().match(/\/runtime-api\/v1\/conversations\/([^/]+)\/turns/);
    const sourceRun = response.url().match(/\/runs\/([^/]+)\/(?:confirmations|clarifications)/)?.[1];
    const conversationId = conversation?.[1] ?? (sourceRun ? runConversations.get(sourceRun) : undefined);
    if (runId && conversationId) runConversations.set(runId, conversationId);
    return runId;
  };

  // 选择型澄清（例如“Choose videos: A / B / both”）：先选第一个具体视频
  const selectChoice = async () => {
    const native = page.locator("select:visible").first();
    if (await native.count()) {
      if (!(await native.inputValue())) {
        const choices = await native.locator("option").evaluateAll(options => options.map(option => ({
          value: (option as HTMLOptionElement).value, label: option.textContent ?? "", disabled: (option as HTMLOptionElement).disabled,
        })));
        const selected = choices.find(option => option.value && !option.disabled && !/both|都|全部/i.test(option.label));
        if (selected) await native.selectOption(selected.value);
      }
      return;
    }
    const choice = page
      .locator(".next-select-trigger, [role=combobox]")
      .filter({ hasText: /请选择|Select|Choose/i })
      .first();
    if ((await choice.count()) === 0 || !(await choice.isVisible().catch(() => false))) return;
    await choice.click({ timeout: 10_000 }).catch(() => undefined);
    await page.waitForTimeout(800);
    const option = page
      .locator(".next-menu-item, [role=option]")
      .filter({ hasNotText: /both|都|全部/i })
      .first();
    if ((await option.count()) > 0) await option.click({ timeout: 10_000 }).catch(() => undefined);
    await page.waitForTimeout(500);
  };

  for (let attempt = 0; attempt < 5; attempt += 1) {
    if (options.allowClarification !== false) await selectChoice();
    // 1) 计划卡：点它自己的「提交」，等 /confirmations
    if ((await planSubmit.count()) > 0 && (await planSubmit.isVisible().catch(() => false))) {
      const responsePromise = waitResponse(30_000);
      await planSubmit.click({ timeout: 20_000 }).catch(() => undefined);
      const response = await responsePromise;
      if (!response) continue;
      if (/\/confirmations(?:\/|$)/.test(response.url())) return parseTurns(response);
      if (/\/clarifications(?:\/|$)/.test(response.url())) {
        if (options.allowClarification === false) return "";
        await page.waitForTimeout(2_500);
        continue;
      }
      return parseTurns(response);
    }

    // 2) 澄清卡（例如“确认最终时长 20 或 30”）：提交答案后等计划卡出现
    if (options.allowClarification !== false && (await anySubmit.count()) > 0 && (await anySubmit.isEnabled().catch(() => false))) {
      const responsePromise = waitResponse(20_000);
      await anySubmit.click({ timeout: 20_000 }).catch(() => undefined);
      const response = await responsePromise;
      if (response) {
        const resumedRun = await parseTurns(response);
        if (resumedRun) return resumedRun;
      }
      const deadline = Date.now() + 120_000;
      while (Date.now() < deadline && !(await planSubmit.isVisible().catch(() => false))) {
        await page.waitForTimeout(2_000);
      }
      continue;
    }

    // 3) 只有 Render 的情况：展开后会出现「提交」
    if ((await render.count()) > 0) {
      await render.click({ timeout: 20_000 }).catch(() => undefined);
      await page.waitForTimeout(1_500);
      continue;
    }

    await page.waitForTimeout(2_000);
  }

  return "";
}

/** 新版把 Run 挂在会话下：提交响应只给 run_id，状态/产物要从会话消息里取 */
const runConversations = new Map<string, string>();

/** 新版 Run 所属会话（提交时记录） */
export function conversationForRun(runId: string): string {
  return runConversations.get(runId) ?? "";
}

/** Restore an observed Run after a local runner interruption, without creating a second task. */
export function restoreRunConversation(runId: string, conversationId: string): void {
  if (!runId || !conversationId) throw new Error("恢复Run需要已观测的run_id和conversation_id");
  const existing = runConversations.get(runId);
  if (existing && existing !== conversationId) throw new Error("不能将已知Run重新绑定到不同会话");
  runConversations.set(runId, conversationId);
}

/** 读取 Run 详情。
 *
 * 新版（/runtime-api）没有单 Run 详情端点，改为从会话消息里取：
 *   GET /runtime-api/v1/conversations/{cid}/messages → 按 job_id === runId 过滤
 * 旧版仍回退到 `/v1/agent/runs/{id}`。
 */
export async function getRunDetail(page: Page, runId: string): Promise<unknown> {
  const conversationId = runConversations.get(runId);
  if (conversationId) {
    const response = await page.request.get(
      `${targets.studioBase}/runtime-api/v1/conversations/${encodeURIComponent(conversationId)}/messages?limit=200`,
      { timeout: 30_000 },
    );
    if (response.ok()) {
      const body = await response.json().catch(() => null);
      const messages: Array<Record<string, unknown>> = Array.isArray(
        (body as { messages?: unknown })?.messages,
      )
        ? ((body as { messages: Array<Record<string, unknown>> }).messages)
        : [];
      const related = messages.filter((message) => message?.job_id === runId);
      const assistant = [...related].reverse().find((message) => message.role === "assistant");
      const user = related.find((message) => message.role === "user");
      const base = assistant ?? user;
      if (base) {
        const rawArtifacts = Array.isArray(base.result_files)
          ? (base.result_files as Array<Record<string, unknown>>)
          : Array.isArray(base.files)
            ? (base.files as Array<Record<string, unknown>>)
            : [];

        // 新版 result_files 只有 file_id / facts，没有 id/url/cloud_file_id；
        // 这里归一化成框架内 RunArtifact 的形状，并补上预签名下载 URL。
        const artifacts = [];
        for (const item of rawArtifacts) {
          const facts = (item.facts as Record<string, unknown>) ?? {};
          const fileId = String(item.file_id ?? facts.file_id ?? item.id ?? "");
          let url = String(item.url ?? "");
          if (!url && fileId) {
            const urlResponse = await page.request
              .get(
                `${targets.studioBase}/studio-api/v1/agent/files/${encodeURIComponent(fileId)}/url?disposition=inline`,
                { timeout: 30_000 },
              )
              .catch(() => null);
            if (urlResponse?.ok()) {
              const payload = await urlResponse.json().catch(() => null);
              url = findStringField(payload, "url") ?? "";
            }
          }
          const metadata: Record<string, string> = {};
          for (const [key, value] of Object.entries(facts)) metadata[key] = String(value);
          if (item.size_bytes !== undefined) metadata.size_bytes = String(item.size_bytes);

          artifacts.push({
            id: fileId,
            cloud_file_id: fileId,
            deliveryId: String(item.artifact_id ?? item.id ?? ""),
            name: String(item.name ?? ""),
            kind: String(item.kind ?? ""),
            url,
            metadata,
          });
        }

        return {
          run_id: runId,
          conversation_id: conversationId,
          // 新版把澄清/确认态叫 waiting_for_clarification / waiting_for_confirmation；
          // 框架统一按 requires_user_input 处理
          status:
            String(base.status ?? "") === "waiting_for_clarification" ||
            String(base.status ?? "") === "waiting_for_confirmation"
              ? "requires_user_input"
              : String(base.status ?? ""),
          plan: base.plan ?? [],
          clarifications: base.clarifications ?? [],
          messages: related,
          artifacts,
          context_files: user?.files ?? [],
          completion: base.completion ?? null,
          error:
            base.error_code || base.error_msg
              ? { code: base.error_code ?? "", message: base.error_msg ?? "" }
              : null,
        };
      }
    }
  }

  const response = await page.request.get(
    `${targets.studioBase}/v1/agent/runs/${encodeURIComponent(runId)}`,
    { timeout: 30_000 },
  );
  if (!response.ok()) return null;
  return response.json().catch(() => null);
}

/** 从 Run 详情里取状态（字段名做兼容查找） */
export async function readRunStatus(page: Page, runId: string): Promise<string | null> {
  const detail = await getRunDetail(page, runId);
  if (!detail) return null;
  return findStringField(detail, "status") ?? null;
}

/**
 * 在 composer 里通过 `@` 引用刚上传的素材。
 *
 * 输入 @ 后等待真实候选，用稳定 data-* 锚点点击选择。
 * 传入 cloudFileId 时只选本次上传的素材，避免同名素材误命中。
 *
 * 返回值表示是否真的插入了不可编辑的引用元素。等待失败会直接抛错——
 * 没有引用上素材的任务会被 AI 追问，测出来的就不是完整链路。
 */
export interface ReferenceOutcome {
  ok: boolean;
  /** prompt 中引用元素的数量 */
  referenceCount: number;
  /** 失败时记录的候选列表快照，便于排查 */
  candidates: string[];
}

export async function referenceAssetInPrompt(
  page: Page,
  assetName: string,
  cloudFileId?: string,
  options: { clear?: boolean } = {},
): Promise<ReferenceOutcome> {
  const editor = page.locator("#workspace-prompt");
  await editor.click({ timeout: 20_000 });

  // 默认清空 composer；多素材引用时后续调用必须传 { clear: false }，
  // 否则 fill("") 会把前一个引用元素一起抹掉。
  if (options.clear !== false) {
    await editor.fill("");
  } else {
    await page.keyboard.press("End");
  }

  // 用文件名前缀触发候选过滤（去掉扩展名，避免点号干扰）
  const stem = assetName.replace(/\.[^.]+$/, "");
  await page.keyboard.insertText(`@${stem}`);

  // 旧版候选项带 data-workspace-mention-file-key（可按 cloud_file_id 精确选择）；
  // 新版（/studio/workspace）改用 [role=option]，只能按显示名匹配。
  const optionsLocator = page.locator("[data-workspace-mention-file-key], [role=option]");
  const byCloudId = cloudFileId
    ? page.locator(`[data-workspace-mention-file-key=${JSON.stringify(`cloud:${cloudFileId}`)}]`)
    : null;
  const candidate =
    byCloudId && (await byCloudId.count()) > 0
      ? byCloudId.first()
      : optionsLocator.filter({ hasText: assetName }).first();
  await candidate.waitFor({ state: "visible", timeout: 20_000 });

  const candidates = await optionsLocator.allTextContents();

  await candidate.first().click();
  const references = editor.locator('[contenteditable="false"]').filter({ hasText: `@${assetName}` });
  await references.first().waitFor({ state: "visible", timeout: 10_000 });

  const referenceCount = await references.count();

  return { ok: referenceCount > 0, referenceCount, candidates };
}

/** 清空 composer（避免上一条用例的残留文本影响下一次提交） */
export async function clearPrompt(page: Page): Promise<void> {
  const editor = page.locator("#workspace-prompt");
  await editor.click({ timeout: 20_000 });
  await editor.fill("");
}
