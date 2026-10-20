import { test } from "@playwright/test";

import {
  credentialStatus,
  credentials,
  isLocalTarget,
  targets,
} from "../src/config.js";

/**
 * 配置诊断：不开浏览器，只检查凭据与环境是否就绪。
 *
 * 运行：
 *   npx playwright test --project=doctor
 *
 * 跑真实测试之前先跑这个，能避免"配置没读到"被误判成"产品有问题"。
 */
test("检查靶场与凭据配置", () => {
  const status = credentialStatus();

  const line = "─".repeat(52);
  console.log("");
  console.log(line);
  console.log("CinLink Web 测试环境诊断");
  console.log(line);

  console.log("");
  console.log("[靶场]");
  console.log(`  前端        : ${targets.webBase}`);
  console.log(`  Orchestrator: ${targets.studioBase}`);
  console.log(`  Runtime     : ${targets.runtimeBase}`);
  console.log(`  本地靶场    : ${isLocalTarget() ? "是（可使用 ?workspace-preview 免登录）" : "否"}`);
  console.log("  说明：免登录预览入口仅在 localhost/127.0.0.1 生效（源码硬校验）");

  console.log("");
  console.log("[凭据]");
  if (status.localEnvFiles.length === 0) {
    console.log("  凭据文件    : 未找到");
    console.log("  → 请执行：Copy-Item .env.local.example local.env");
  } else {
    for (const file of status.localEnvFiles) {
      console.log(`  凭据文件    : ${file}`);
    }
  }
  console.log(`  测试邮箱    : ${status.hasEmail ? maskEmail(credentials.email) : "未配置"}`);
  console.log(`  密码        : ${status.hasPassword ? "已配置" : "未配置（邮箱验证码登录不需要）"}`);
  console.log(`  API Key     : ${status.hasApiKey ? "已配置" : "未配置"}`);

  console.log("");
  console.log("[会话]");
  console.log(`  storageState: ${credentials.storageStatePath}`);
  console.log(`  是否已保存  : ${status.storageStatePresent ? "是（测试会自动带上会话）" : "否"}`);

  console.log("");
  console.log("[结论]");
  if (status.ready) {
    console.log("  ✓ 已就绪，可以直接跑真实测试");
  } else {
    console.log("  ✗ 尚未就绪，缺少：");
    for (const item of status.missing) {
      console.log(`    - ${item}`);
    }
    console.log("");
    console.log("  → 执行一次人工登录：npx playwright test --project=auth");
  }
  console.log("");
  console.log(line);
  console.log("");
});

/** 只显示邮箱前 2 位，避免日志里留全量账号 */
function maskEmail(email: string): string {
  const [name, domain] = email.split("@");
  if (!domain) return "***";
  const head = name.slice(0, 2);
  return `${head}${"*".repeat(Math.max(name.length - 2, 1))}@${domain}`;
}
