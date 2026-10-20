import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

/**
 * 凭据文件候选名，按优先级排列。
 *
 * Windows 上以点开头的文件默认隐藏、且没有关联程序，双击打不开，
 * 所以优先用不带点的 `local.env` —— 直接双击即可用记事本编辑。
 * `.env.local` 仍被支持（Linux/macOS 习惯），但优先级更低。
 *
 * 两个文件都会被读取；同名键以先出现的为准（即 local.env 优先）。
 */
const CANDIDATE_FILES = ["local.env", ".env.local"];

/**
 * 极简 env 加载器。
 *
 * **不覆盖**已存在的环境变量——CI 注入的变量优先级更高。
 * 凭据绝不写进代码、不写进 README、不提交。
 *
 * @returns 实际读取到的文件列表（可能为空）
 */
export function loadLocalEnv(root = process.cwd()): string[] {
  const loaded: string[] = [];

  for (const name of CANDIDATE_FILES) {
    const file = path.join(root, name);
    if (!existsSync(file)) continue;

    loaded.push(file);

    for (const rawLine of readFileSync(file, "utf8").split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;

      const separator = line.indexOf("=");
      if (separator === -1) continue;

      const key = line.slice(0, separator).trim();
      if (!key) continue;

      const value = line
        .slice(separator + 1)
        .trim()
        .replace(/^["']|["']$/g, "");

      if (!(key in process.env)) process.env[key] = value;
    }
  }

  return loaded;
}

/** 供文档与提示使用 */
export const CREDENTIAL_FILE_CANDIDATES = CANDIDATE_FILES;
