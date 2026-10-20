/**
 * 产物断言（G5 可交付 / G6 正确性）
 *
 * 全部基于**实测结构**（2026-10-16，run_158923c8f60984981d85d6a2）：
 * 不是从文档猜的，也不是从类型定义推的——是把已完成的 run 拉下来打全之后照着写的。
 *
 * ## 关键结构备忘
 *
 * ```
 * artifacts[]                顶层产物列表（另有 goal_validation.artifacts 与 plan[].artifacts）
 *   .id                      云端文件 ID，形如 file_4a49642dcd134a03
 *   .kind                    video | audio | subtitle | ...
 *   .name                    subtitled-video.mp4 / rendered.txt
 *   .url                     预签名 URL（X-Amz-Expires=21600，6 小时）
 *   .metadata.*              全部为**字符串**（"60.487982" 而非 60.487982）
 *
 * completion.primary_artifact_ids[]   形如 artifact-d0bdf48fb6eb36cbf909（注意与 .id 不是一套）
 * client_delivery.status              "ready"
 * client_delivery.primary[].cloud_file_id
 * ```
 *
 * **两个 ID 体系不要混用**：`artifacts[].id` 是 `file_*`，
 * `completion.primary_artifact_ids[]` 是 `artifact-*`。
 * 它们通过 `client_delivery.primary[].id` / `.cloud_file_id` 关联。
 */

export interface RunArtifact {
  /** 云端文件 ID（file_*） */
  id: string;
  /** 交付物 ID（artifact-*），可能为空 */
  deliveryId: string;
  name: string;
  kind: string;
  url: string;
  cloudFileId: string;
  /** 全部为字符串，取值时注意转换 */
  metadata: Record<string, string>;
}

export interface ArtifactCheckResult {
  ok: boolean;
  failures: string[];
}

function result(failures: string[]): ArtifactCheckResult {
  return { ok: failures.length === 0, failures };
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : value === undefined || value === null ? "" : String(value);
}

/** metadata 的值全部是字符串，这里统一做安全转换 */
function metaString(artifact: RunArtifact, key: string): string {
  return asString(artifact.metadata[key]);
}

function metaNumber(artifact: RunArtifact, key: string): number {
  const raw = metaString(artifact, key).trim();
  // 缺失与空串必须返回 NaN：Number("") === 0 会让"字段缺失"被当成 0，
  // 于是 audio_stream_count 缺失会误报"音轨数为 0"，duration_sec 缺失会误报时长偏差。
  if (!raw) return Number.NaN;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

/** 从 run 详情顶层提取产物列表 */
export function extractArtifacts(runDetail: unknown): RunArtifact[] {
  const list = asRecord(runDetail).artifacts;
  if (!Array.isArray(list)) return [];

  return list.map((item) => {
    const record = asRecord(item);
    const metadata: Record<string, string> = {};
    for (const [key, value] of Object.entries(asRecord(record.metadata))) {
      metadata[key] = asString(value);
    }
    return {
      id: asString(record.id),
      deliveryId: asString(record.deliveryId),
      name: asString(record.name),
      kind: asString(record.kind),
      url: asString(record.url),
      cloudFileId: asString(record.cloud_file_id),
      metadata,
    };
  });
}

/** 按 kind 筛选产物 */
export function artifactsOfKind(artifacts: RunArtifact[], kind: string): RunArtifact[] {
  return artifacts.filter((a) => a.kind === kind);
}

// ---------------------------------------------------------------------------
// G5 · 产物可交付
// ---------------------------------------------------------------------------

/**
 * 产物必须存在且每个都具备可交付的三要素：ID、名称、可下载 URL。
 *
 * 「结果卡片在界面上显示了」不能替代这一条 —— 界面上有卡片但 URL 为空、
 * 或者文件根本没上传成功，都是实际发生过的故障形态。
 */
export function checkArtifactsDeliverable(artifacts: RunArtifact[]): ArtifactCheckResult {
  const failures: string[] = [];

  if (artifacts.length === 0) {
    return result(["任务完成但没有任何产物"]);
  }

  artifacts.forEach((artifact, index) => {
    const label = `产物[${index}](${artifact.name || artifact.kind || "未命名"})`;
    if (!artifact.id) failures.push(`${label} 缺少 id`);
    if (!artifact.name) failures.push(`${label} 缺少 name`);
    if (!artifact.url) failures.push(`${label} 没有可下载 URL`);
    if (!artifact.cloudFileId) failures.push(`${label} 缺少 cloud_file_id`);
  });

  return result(failures);
}

/**
 * 归属校验：**交付级**产物必须由本次 run 产出。
 *
 * ## 为什么只校验交付级（实测修正）
 *
 * 首版对**所有**产物都要求 `producer_run_id`，结果在一个正常完成的 run 上大面积误报。
 * 实测发现产物分两类（run_158923c8f60984981d85d6a2，共 9 个产物）：
 *
 * | 类别 | 例子 | 有 producer_run_id / size_bytes |
 * |---|---|---|
 * | 本地工具产出 | `subtitled-video.mp4`、`extracted-audio.m4a`、`rendered.txt` | **有** |
 * | 服务端中间产物 | `subtitle.srt`、`translated.srt`、`transcript.txt`、`timed-transcript.json` | **没有** |
 *
 * 中间产物是链路内部流转物，不面向用户交付，对它们做归属强断言会产生假红灯。
 *
 * 判据改为：**`client_delivery.primary` 指向的产物**（用户真正拿到的东西）必须有
 * `producer_run_id` 且等于本次 run。其余产物若带了该字段则一并校验。
 */
export function checkArtifactOwnership(
  artifacts: RunArtifact[],
  runId: string,
  deliveryCloudFileIds: string[] = [],
): ArtifactCheckResult {
  const failures: string[] = [];
  const deliverySet = new Set(deliveryCloudFileIds);
  let validated = 0;

  artifacts.forEach((artifact, index) => {
    const label = `产物[${index}](${artifact.name || artifact.kind})`;
    const producerRunId = metaString(artifact, "producer_run_id");
    const creationKey = metaString(artifact, "creation_key");
    const isDelivery = deliverySet.has(artifact.cloudFileId) || deliverySet.has(artifact.id);

    // 交付级产物：必须能证明归属
    if (isDelivery && !producerRunId) {
      failures.push(`${label} 是交付级产物但缺少 producer_run_id，无法确认归属`);
      return;
    }

    if (!producerRunId) return; // 中间产物无此字段，跳过（不算失败）

    validated += 1;

    if (producerRunId !== runId) {
      failures.push(`${label} 归属错误：producer_run_id=${producerRunId}，本次 run=${runId}`);
    }

    if (creationKey && !creationKey.includes(runId)) {
      failures.push(`${label} creation_key 不含本次 run：${creationKey}`);
    }
  });

  if (deliverySet.size > 0 && validated === 0) {
    failures.push(
      `交付级产物一个都没能校验归属（delivery 声明了 ${deliverySet.size} 个，实际带 producer_run_id 的为 0）`,
    );
  }

  return result(failures);
}

/** 从 run 详情里取出交付级产物的 cloud_file_id 列表 */
export function deliveryCloudFileIds(runDetail: unknown): string[] {
  const delivery = asRecord(asRecord(runDetail).client_delivery);
  const primary = Array.isArray(delivery.primary) ? delivery.primary : [];
  return primary.map((item) => asString(asRecord(item).cloud_file_id)).filter(Boolean);
}

/** 交付状态就绪，且 completion 声明的产物都能在 artifacts 里找到 */
export function checkCompletionDelivered(runDetail: unknown): ArtifactCheckResult {
  const failures: string[] = [];
  const record = asRecord(runDetail);

  const completion = asRecord(record.completion);
  const delivery = asRecord(record.client_delivery);
  const artifacts = extractArtifacts(runDetail);

  const primaryIds = Array.isArray(completion.primary_artifact_ids)
    ? completion.primary_artifact_ids.map(asString)
    : [];

  if (primaryIds.length === 0) {
    failures.push("completion.primary_artifact_ids 为空 —— 任务没有声明主产物");
  }

  const deliveryStatus = asString(delivery.status);
  if (!deliveryStatus) {
    failures.push("client_delivery.status 缺失");
  } else if (deliveryStatus !== "ready") {
    failures.push(`client_delivery.status=${deliveryStatus}，期望 ready`);
  }

  // completion 声明的交付物 ID 应能在 client_delivery.primary 里找到对应项
  const delivered = Array.isArray(delivery.primary) ? delivery.primary.map(asRecord) : [];
  const deliveredIds = new Set(delivered.map((d) => asString(d.id)));
  const deliveredCloudIds = new Set(delivered.map((d) => asString(d.cloud_file_id)));

  for (const id of primaryIds) {
    if (!deliveredIds.has(id)) {
      failures.push(`completion 声明的产物 ${id} 未出现在 client_delivery.primary 中`);
    }
  }

  // 交付物必须指向真实存在的产物
  for (const cloudId of deliveredCloudIds) {
    if (cloudId && !artifacts.some((a) => a.cloudFileId === cloudId || a.id === cloudId)) {
      failures.push(`client_delivery 指向的 ${cloudId} 在 artifacts 中不存在`);
    }
  }

  return result(failures);
}

// ---------------------------------------------------------------------------
// G6 · 产物正确性（结构层 + 参数层，不含内容层）
// ---------------------------------------------------------------------------

/**
 * 视频产物确实烧进了字幕。
 *
 * 三个标志缺一不可（都来自产品自己的 fact receipt，不是我们推断的）：
 *   `contains_burned_subtitles` 烧录动作真的执行了
 *   `subtitle_has_usable_cues`  字幕有可用条目（不是空文件走过场）
 *   `subtitle_languages`        语言符合预期
 */
export function checkBurnedSubtitleVideo(
  artifact: RunArtifact,
  expectedLanguages: string[] = ["zh"],
): ArtifactCheckResult {
  const failures: string[] = [];

  if (artifact.kind !== "video") {
    return result([`产物 ${artifact.name} 的 kind 是 ${artifact.kind}，期望 video`]);
  }

  if (metaString(artifact, "contains_burned_subtitles") !== "true") {
    failures.push(
      `contains_burned_subtitles=${metaString(artifact, "contains_burned_subtitles") || "(缺失)"}，期望 true —— 字幕可能没烧进视频`,
    );
  }

  if (metaString(artifact, "subtitle_has_usable_cues") !== "true") {
    failures.push(
      `subtitle_has_usable_cues=${metaString(artifact, "subtitle_has_usable_cues") || "(缺失)"}，期望 true —— 字幕文件可能是空的`,
    );
  }

  const languagesRaw = metaString(artifact, "subtitle_languages");
  if (!languagesRaw) {
    failures.push("缺少 subtitle_languages，无法确认字幕语言");
  } else {
    for (const language of expectedLanguages) {
      if (!languagesRaw.includes(language)) {
        failures.push(`subtitle_languages=${languagesRaw} 不包含期望语言 ${language}`);
      }
    }
  }

  return result(failures);
}

/**
 * 视频产物的媒体参数与源素材一致（参数层）。
 *
 * 实测容差依据：源 60.495778 秒 → 产物 60.487982 秒，**偏差 0.0078 秒**。
 * 默认容差取 0.2 秒，足以覆盖编码时的帧对齐误差，又能抓住"产物被截断"这类真实问题
 * （截断通常是秒级甚至分钟级差异）。
 */
export function checkVideoMetadataMatches(
  artifact: RunArtifact,
  source: { durationSec: number; durationToleranceSec?: number; requireAudio?: boolean },
): ArtifactCheckResult {
  const failures: string[] = [];
  const tolerance = source.durationToleranceSec ?? 0.2;

  const duration = metaNumber(artifact, "duration_sec");
  if (!Number.isFinite(duration)) {
    failures.push("产物未提供 duration_sec，无法校验时长");
  } else if (Math.abs(duration - source.durationSec) > tolerance) {
    failures.push(
      `产物时长 ${duration}s 与源素材 ${source.durationSec}s 偏差超过 ${tolerance}s —— 产物可能被截断或拼接出错`,
    );
  }

  if (source.requireAudio !== false) {
    const hasAudio = metaString(artifact, "has_audio") || metaString(artifact, "contains_audio");
    if (hasAudio !== "true") {
      failures.push(`产物丢失音轨（has_audio=${hasAudio || "(缺失)"}）`);
    }
    const streams = metaNumber(artifact, "audio_stream_count");
    if (Number.isFinite(streams) && streams < 1) {
      failures.push(`产物音轨数为 ${streams}，期望至少 1`);
    }
  }

  if (!metaString(artifact, "content_sha256")) {
    failures.push("产物缺少 content_sha256 —— 无法做完整性校验");
  }

  return result(failures);
}

/**
 * 字幕产物存在且具备可下载条件。
 *
 * ⚠️ **不强制要求 `size_bytes`**：实测 9 个产物里，服务端产生的
 * `subtitle.srt` / `translated.srt` 都没有这个字段，只有本地工具产出的才有。
 * 首版对所有字幕产物要求 `size_bytes`，在正常 run 上误报了 3 条。
 *
 * 「非空」这件事改由**下载后校验字节数**来证明（见用例），
 * 那比依赖一个未必存在的元数据字段可靠得多。
 *
 * 优先检查 `.srt` 结尾的产物 —— 那才是结构化字幕；`rendered.txt` 是渲染用的文本。
 */
export function checkSubtitleArtifact(artifacts: RunArtifact[]): ArtifactCheckResult {
  const subtitles = artifactsOfKind(artifacts, "subtitle");

  if (subtitles.length === 0) {
    return result(["没有 subtitle 类型的产物"]);
  }

  const failures: string[] = [];

  subtitles.forEach((artifact, index) => {
    const label = `字幕产物[${index}](${artifact.name})`;
    if (!artifact.url) failures.push(`${label} 没有可下载 URL`);
    if (!artifact.name) failures.push(`${label} 缺少 name`);

    // size_bytes 存在时才校验 —— 缺失不代表缺陷
    const sizeRaw = metaString(artifact, "size_bytes");
    if (sizeRaw && Number(sizeRaw) <= 0) {
      failures.push(`${label} 声明大小为 ${sizeRaw} 字节 —— 空文件`);
    }
  });

  // 必须有至少一个结构化字幕（.srt），否则"字幕工作流"没有真正可用的字幕产物
  const structured = subtitles.filter((a) => /\.srt$/i.test(a.name));
  if (structured.length === 0) {
    failures.push(
      `没有 .srt 结构化字幕产物（现有：${subtitles.map((a) => a.name).join(", ")}）`,
    );
  }

  return result(failures);
}
