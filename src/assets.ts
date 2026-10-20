import path from "node:path";

/**
 * 测试素材登记表。
 *
 * 168 条桌面用例只引用 3 个唯一素材，这里把它们固化成常量，
 * 避免路径散落在各个 spec 里（也避免以后换素材要满仓库搜字符串）。
 *
 * 规格（ffprobe 实测，2026-10-16）：
 *   7MB.mp4                 7,815,126 B · 60.5 s · 1280x720 · 25 fps · h264 + aac
 *   1270510918-1-12.mp4    37,942,081 B · 169.0 s · 1280x720 · 30 fps · h264 + aac
 *   cinlink-smoke-watermark.png  512x512 PNG（本地生成，原素材本机不存在）
 *
 * 为什么这两个视频的字节数很重要：
 *   UPLOAD_CHUNK_SIZE_BYTES = 5 MiB = 5,242,880
 *   两个文件都 **超过** 5 MiB，所以都会走**分片上传**——
 *   7MB.mp4 恰好 2 片，1270510918-1-12.mp4 需要 8 片。
 *   G1 的分片数断言直接建立在这个关系上。
 */

const MEDIA_ROOT = process.env.CINLINK_MEDIA_ROOT || "E:\\图片视频素材";

export interface TestAsset {
  /** 绝对路径 */
  path: string;
  /** 文件名（用于与云端返回的 name 比对） */
  name: string;
  /** 字节数（用于大小与分片数断言） */
  sizeBytes: number;
  /** MIME 类型 */
  mimeType: string;
  /** 时长（秒），仅用于可读性说明 */
  durationSec: number;
}

function asset(fileName: string, sizeBytes: number, mimeType: string, durationSec: number): TestAsset {
  return {
    path: path.join(MEDIA_ROOT, fileName),
    name: fileName,
    sizeBytes,
    mimeType,
    durationSec,
  };
}

export const TEST_ASSETS = {
  /** 60.5 秒短视频 —— 首选，单次任务成本最低 */
  videoShort: asset("7MB.mp4", 7_815_126, "video/mp4", 60.5),
  /** 169 秒长视频 —— 用于长任务、时长相关断言 */
  videoLong: asset("1270510918-1-12.mp4", 37_942_081, "video/mp4", 169.0),
} as const;

/** 图片水印工作流用的 PNG（本工程内生成，路径与 MEDIA_ROOT 无关） */
export const WATERMARK_IMAGE: TestAsset = {
  path: path.resolve(process.cwd(), "assets", "cinlink-smoke-watermark.png"),
  name: "cinlink-smoke-watermark.png",
  sizeBytes: 2_007,
  mimeType: "image/png",
  durationSec: 0,
};
