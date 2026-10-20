/**
 * 素材上传（G1）断言
 *
 * 分片大小来自被测仓库实测：`src/lib/api.js:4`
 *   export const UPLOAD_CHUNK_SIZE_BYTES = 5 * 1024 * 1024;
 *
 * 为什么单独一个文件：上传链路失败与 AI 工作流失败**根因完全不同**
 * （前者是 S3 / 分片 / 配额，后者是任务编排），红灯必须能一眼分开。
 */

/** 与被测仓库 `api.js` 的 UPLOAD_CHUNK_SIZE_BYTES 保持一致 */
export const UPLOAD_CHUNK_SIZE_BYTES = 5 * 1024 * 1024;

/**
 * `cloud_file_id` 的实测格式（预发 2026-10-16 实测）。
 *
 * 样例：`file_72c83ab55d4542f3` —— `file_` 前缀 + 16 位小写十六进制。
 *
 * **这是一条契约断言**：后端若改了 ID 生成规则，这里会红。
 * 失败时先判断是"契约变更"还是"生成逻辑出了缺陷"，不要直接当缺陷上报。
 */
export const CLOUD_FILE_ID_PATTERN = /^file_[0-9a-f]{16}$/;

export interface UploadedAsset {
  cloud_file_id?: string;
  name?: string;
  size_bytes?: number;
  size?: number;
  mime_type?: string;
}

export interface UploadExpectation {
  /** 源文件名 */
  name?: string;
  /** 源文件字节数 */
  sizeBytes?: number;
  /** 允许的字节偏差，默认 0 */
  sizeToleranceBytes?: number;
  mimeType?: string;
  /**
   * 是否校验 `cloud_file_id` 符合实测契约格式。
   * 默认关闭 —— 格式校验只在"已确认当前契约"的用例里开启，避免格式演进而大面积假红灯。
   */
  expectFormat?: boolean;
}

export interface UploadCheckResult {
  ok: boolean;
  failures: string[];
}

function result(failures: string[]): UploadCheckResult {
  return { ok: failures.length === 0, failures };
}

/** 按 5 MiB 分片计算应有的 part 数 */
export function expectedChunkCount(sizeBytes: number): number {
  if (!Number.isFinite(sizeBytes) || sizeBytes <= 0) return 0;
  return Math.ceil(sizeBytes / UPLOAD_CHUNK_SIZE_BYTES);
}

/**
 * 校验上传返回的素材登记信息。
 *
 * 注意：**空值本身必须判失败**。上传的典型故障就是"接口 200 但没返回 cloud_file_id"
 * 或"返回了但大小对不上"，只判有无字段会漏掉前者，只判相等会漏掉后者。
 */
export function checkUploadedAsset(
  asset: UploadedAsset | null | undefined,
  expected: UploadExpectation = {},
): UploadCheckResult {
  const failures: string[] = [];

  if (!asset) {
    return result(["上传未返回任何素材登记信息"]);
  }

  const id = String(asset.cloud_file_id ?? "").trim();
  if (!id) {
    failures.push("上传未返回 cloud_file_id");
  } else if (/\s/.test(id)) {
    failures.push(`cloud_file_id 含空白字符：${JSON.stringify(id.slice(0, 60))}`);
  } else if (id.length > 200) {
    failures.push(`cloud_file_id 长度异常（${id.length} 字符）：${id.slice(0, 60)}…`);
  } else if (expected.expectFormat && !CLOUD_FILE_ID_PATTERN.test(id)) {
    // 契约断言：格式变了要被发现，而不是靠后面某个不相关的用例莫名其妙地红
    failures.push(
      `cloud_file_id 格式不符合契约：${id}（期望匹配 ${CLOUD_FILE_ID_PATTERN}）`,
    );
  }

  if (expected.sizeBytes !== undefined) {
    const actual = Number(asset.size_bytes ?? asset.size ?? NaN);
    const tolerance = expected.sizeToleranceBytes ?? 0;
    if (!Number.isFinite(actual)) {
      failures.push("素材未返回 size_bytes / size，无法校验大小");
    } else if (Math.abs(actual - expected.sizeBytes) > tolerance) {
      failures.push(`素材大小不符：期望 ${expected.sizeBytes}，实际 ${actual}`);
    }
  }

  // 名称与 MIME 只在云端确实返回了该字段时比对 ——
  // 不同入口（对话上传 / 项目上传）返回的字段集不一定相同，
  // 把"没这个字段"一律判失败会产出假红灯。真正必须非空的只有 cloud_file_id。
  if (expected.name !== undefined && asset.name !== undefined && asset.name !== expected.name) {
    failures.push(`素材名称不符：期望 ${expected.name}，实际 ${asset.name}`);
  }

  if (
    expected.mimeType !== undefined &&
    asset.mime_type !== undefined &&
    asset.mime_type !== expected.mimeType
  ) {
    failures.push(`MIME 类型不符：期望 ${expected.mimeType}，实际 ${asset.mime_type}`);
  }

  return result(failures);
}

/** 校验实际观察到的分片数与文件大小是否匹配 */
export function checkChunkCount(sizeBytes: number, observedParts: number): UploadCheckResult {
  if (!Number.isSafeInteger(sizeBytes) || sizeBytes <= 0) {
    return result([`源文件大小无效：${sizeBytes}`]);
  }
  const expected = expectedChunkCount(sizeBytes);
  if (observedParts === expected) return result([]);
  return result([
    `分片数不符：按 ${UPLOAD_CHUNK_SIZE_BYTES} 字节分片应为 ${expected} 个，实际观察到 ${observedParts} 个`,
  ]);
}

/**
 * 校验 `@` 候选中能否检索到刚上传的素材。
 *
 * 这是 G1 的最后一项：**上传成功但引用不到，等于没上传**。
 */
export function checkAssetReferencable(
  candidates: Array<{ cloud_file_id?: string; name?: string }>,
  asset: UploadedAsset,
): UploadCheckResult {
  const id = String(asset.cloud_file_id ?? "").trim();
  if (!id) return result(["待校验素材缺少 cloud_file_id，无法验证可引用性"]);

  const hit = candidates.some((c) => String(c.cloud_file_id ?? "").trim() === id);
  if (hit) return result([]);

  const names = candidates
    .map((c) => c.name)
    .filter(Boolean)
    .slice(0, 5)
    .join(", ");
  return result([
    `@ 候选中未找到刚上传的素材（cloud_file_id=${id}）`,
    `  当前候选：${names || "（空）"}`,
  ]);
}
