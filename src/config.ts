import { existsSync } from "node:fs";
import path from "node:path";

import { loadLocalEnv } from "./env.js";

// 在模块加载时就读取凭据文件，保证所有 import 本文件的地方都能拿到
const localEnvFiles = loadLocalEnv();

export interface CinLinkTargets {
  /** 被测前端地址：填预发就是预发，留给端到端与契约用例 */
  webBase: string;
  /**
   * 本地 preview 靶场地址 —— **与 webBase 解耦**。
   *
   * 为什么必须分开：`?workspace-preview=<场景>` 在 app.js 里硬校验 hostname
   * 必须是 localhost / 127.0.0.1。曾把两条线共用一个 CINLINK_BASE_URL，
   * 用户填了预发地址后，编辑器用例的 `page.goto("/?workspace-preview=editor")`
   * 被 baseURL 带到预发，preview 不生效 → 编辑器永远不渲染 → 8 条用例全超时。
   * 本地靶场地址不该随被测目标漂移。
   */
  localBase: string;
  /** Orchestrator 网关：本地工具与健康检查入口 */
  studioBase: string;
  /** Runtime 服务：Agent Run 与 worker 池指标 */
  runtimeBase: string;
  /** ffprobe 可执行文件；留空则使用 PATH 中的 ffprobe */
  ffprobePath: string;
}

export interface TestCredentials {
  /** 测试账号邮箱（预发为邮箱验证码登录） */
  email: string;
  /** 若产品支持密码登录 */
  password: string;
  /** 若可用 API Key 直接换取会话 */
  apiKey: string;
  /** 手动登录后导出的 Playwright storageState 绝对路径 */
  storageStatePath: string;
}

export interface CredentialStatus {
  /** 是否找到了凭据文件 */
  localEnvPresent: boolean;
  /** 实际读取到的凭据文件（可能不止一个） */
  localEnvFiles: string[];
  hasEmail: boolean;
  hasPassword: boolean;
  hasApiKey: boolean;
  storageStatePresent: boolean;
  /** 当前是否具备可用的登录凭据 */
  ready: boolean;
  /** 缺什么，直接可读 */
  missing: string[];
}

export const targets: CinLinkTargets = {
  webBase: process.env.CINLINK_BASE_URL || "https://staging-app.cinlink.ai",
  localBase: process.env.CINLINK_LOCAL_BASE_URL || "http://127.0.0.1:4173",
  studioBase: process.env.CINLINK_STUDIO_BASE || "https://staging-app.cinlink.ai",
  runtimeBase: process.env.CINLINK_RUNTIME_BASE || "https://staging-runtime.cinlink.ai",
  ffprobePath: process.env.CINLINK_FFPROBE || "ffprobe",
};

export const credentials: TestCredentials = {
  email: (process.env.CINLINK_TEST_EMAIL || "").trim(),
  password: (process.env.CINLINK_TEST_PASSWORD || "").trim(),
  apiKey: (process.env.CINLINK_TEST_API_KEY || "").trim(),
  storageStatePath: (
    process.env.CINLINK_TEST_STORAGE_STATE ||
    path.resolve(process.cwd(), ".auth", "storage-state.json")
  ).trim(),
};

export function credentialStatus(): CredentialStatus {
  const storageStatePresent = existsSync(credentials.storageStatePath);
  const missing: string[] = [];

  const canLoginByEmail = Boolean(credentials.email);
  const canLoginByApiKey = Boolean(credentials.apiKey);

  // 浏览器用例只吃 storageState；邮箱/API Key 只用于重新登录。
  // 因此"能否立刻跑预发用例"只看会话文件是否存在——
  // 否则"会话文件有效但没填邮箱"会被误报成未就绪（实测过，容易误导）。
  if (!storageStatePresent) {
    missing.push(
      `已登录的 storageState（${credentials.storageStatePath}）—— 需先执行一次登录流程`,
    );
    if (!canLoginByEmail && !canLoginByApiKey) {
      missing.push("CINLINK_TEST_EMAIL 或 CINLINK_TEST_API_KEY（重新登录时二选一）");
    }
  }

  return {
    localEnvPresent: localEnvFiles.length > 0,
    localEnvFiles,
    hasEmail: canLoginByEmail,
    hasPassword: Boolean(credentials.password),
    hasApiKey: canLoginByApiKey,
    storageStatePresent,
    // 会话文件存在即可跑预发用例；它是否仍然有效由实际运行判定
    ready: storageStatePresent,
    missing,
  };
}

/** 本地 preview 靶场是否可用（只取决于 localBase，与 webBase 无关） */
export function isLocalTarget(): boolean {
  try {
    const host = new URL(targets.localBase).hostname;
    return host === "localhost" || host === "127.0.0.1";
  } catch {
    return false;
  }
}

/**
 * 真正"不使用任何会话"的 storageState。
 *
 * 注意：传 `undefined` 表示**不覆盖**，会继承全局的 storageState（即预发会话）。
 * 本地 preview 用例必须用这个空对象，否则会带着预发 Cookie 打本地靶场。
 */
export const NO_STORAGE_STATE = { cookies: [], origins: [] };

/** storageState 文件存在时返回路径，否则返回 undefined（Playwright 只在有值时套用会话） */
export function optionalStorageState(): string | undefined {
  return existsSync(credentials.storageStatePath)
    ? credentials.storageStatePath
    : undefined;
}
