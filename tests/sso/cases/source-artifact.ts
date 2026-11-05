import type { SSORecoveryMode } from "../../../src/fixtures/sso-session-recovery.js";

export type Step = {
  workflow: "subtitle" | "translation" | "enhance" | "text-watermark" | "long-to-short" | "dub" | "compound";
  workflows?: string[]; prompt: string; kind: "mp4" | "srt";
  duration?: number; durationToleranceSec?: number; width?: number; height?: number;
  language?: "zh" | "ja" | "en" | "ko" | "fr" | "es";
  watermark?: string; position?: string; dubbed?: boolean; subtitles?: boolean;
  /** 0 = original F; positive numbers identify a business round, excluding setup. */
  inputRound?: number;
  expectedWatermarks?: Array<{ text: string; position: string }>;
  expected: string;
};
export type SSODefinition = { id: string; title: string; steps: Array<Omit<Step, "expected"> & { expected?: string }>; recoveryMode?: SSORecoveryMode; mixedSources?: boolean };

const full = { kind: "mp4" as const, duration: 60.5, durationToleranceSec: 0.5, width: 1280, height: 720 };
const watermark = (text: string, position: string) => ({ text, position });

export const sourceArtifactCases: SSODefinition[] = [
  { id: "SSO-019", title: "不同工作流在原片与最近产物间切换", mixedSources: true, steps: [
    { ...full, workflow: "subtitle", inputRound: 0, language: "en", subtitles: true, expectedWatermarks: [],
      prompt: "根据本会话最初上传的7MB.mp4中的英文语音，生成英文单语字幕并烧录。保留原片完整时长、1280×720分辨率和原英语音轨，只输出一个MP4，不添加水印、不剪短、不增强画面。",
      expected: "V1全长720p，英文字幕正确，无水印。" },
    { ...full, workflow: "text-watermark", inputRound: 1, language: "en", subtitles: true, watermark: "SSO19-R2", position: "top-right", expectedWatermarks: [watermark("SSO19-R2", "top-right")],
      prompt: "在上一轮生成的带英文字幕视频上，添加右上角全程显示的文字水印SSO19-R2，水印样式使用默认值。保留已有英文字幕、时长、分辨率和音轨，只输出一个MP4，不重新生成字幕。",
      expected: "V2以V1为输入，保留英文字幕并新增右上SSO19-R2；时长与V1相差不超过0.5秒，720p。" },
    { ...full, workflow: "long-to-short", inputRound: 0, duration: 20, durationToleranceSec: 2, subtitles: false, expectedWatermarks: [],
      prompt: "回到本会话最初上传的7MB.mp4原始视频，将原片剪成20秒高光。保留选中片段的原英语音轨和1280×720分辨率，只输出一个MP4，不添加字幕或水印。",
      expected: "V3来自F，20±2秒、720p；没有V1字幕和SSO19-R2。" },
    { ...full, workflow: "enhance", inputRound: 3, duration: undefined, width: 2560, height: 1440, subtitles: false, expectedWatermarks: [],
      prompt: "将上一轮生成的20秒高光视频的分辨率提升2倍至2560×1440。保留该视频的全部片段、现有时长和音轨，只输出一个MP4，不重新选择高光片段、不添加字幕或水印。",
      expected: "V4以V3为输入，1440p、内容与V3一致，时长与V3相差不超过0.5秒，不能变回完整原片。" },
    { ...full, workflow: "compound", workflows: ["translation", "text-watermark"], inputRound: 0, language: "zh", subtitles: true, watermark: "SSO19-R5", position: "top-left", expectedWatermarks: [watermark("SSO19-R5", "top-left")],
      prompt: "使用本会话最初上传的7MB.mp4原始视频，生成并烧录简体中文单语字幕，同时添加左上角全程显示的文字水印SSO19-R5，水印样式使用默认值。保留原片完整时长、1280×720分辨率和原英语音轨，只输出一个同时包含字幕和水印的MP4，不剪短、不增强画面。",
      expected: "V5来自F，全长720p，同一MP4有中文字幕及SSO19-R5；无旧英文字幕和SSO19-R2。" },
  ] },
  { id: "SSO-020", title: "指定历史产物，避免误用最新视频", mixedSources: true, steps: [
    { ...full, workflow: "long-to-short", inputRound: 0, duration: 20, durationToleranceSec: 2, subtitles: false, expectedWatermarks: [],
      prompt: "将本会话最初上传的7MB.mp4原始视频剪成20秒高光，保留选中片段的原英语音轨和1280×720分辨率。只输出一个MP4，不添加字幕、水印或画质增强。",
      expected: "V1来自F，20±2秒、720p，无字幕和水印。" },
    { ...full, workflow: "subtitle", inputRound: 1, duration: undefined, language: "en", subtitles: true, expectedWatermarks: [],
      prompt: "根据上一轮生成的20秒高光视频中的英文语音，生成英文单语字幕并烧录。保留该高光视频的全部片段、时长、分辨率和音轨，只输出一个MP4，不重新剪辑、不添加水印。",
      expected: "V2以V1为输入，保留V1时间轴及720p，英文字幕只对应高光片段。" },
    { ...full, workflow: "long-to-short", inputRound: 0, duration: 30, durationToleranceSec: 2, subtitles: false, expectedWatermarks: [],
      prompt: "重新使用本会话最初上传的7MB.mp4原始视频，剪成30秒高光。保留选中片段的原英语音轨和1280×720分辨率，只输出一个MP4，不添加字幕、水印或画质增强。",
      expected: "V3来自F，30±2秒、720p，无字幕；此时最新成功视频为V3。" },
    { ...full, workflow: "compound", workflows: ["enhance", "text-watermark"], inputRound: 2, duration: undefined, width: 2560, height: 1440, language: "en", subtitles: true, watermark: "SSO20-R4", position: "top-right", expectedWatermarks: [watermark("SSO20-R4", "top-right")],
      prompt: "使用本会话第2轮生成的带英文字幕的20秒高光视频，将分辨率提升2倍至2560×1440，并添加右上角全程显示的文字水印SSO20-R4，水印样式使用默认值。保留该视频的全部片段、已有英文字幕、时长和音轨，只输出一个MP4。",
      expected: "V4来自历史V2而非最新V3；保留V2时长/片段/英文字幕，1440p并新增SSO20-R4。" },
    { ...full, workflow: "text-watermark", inputRound: 0, subtitles: false, watermark: "SSO20-R5", position: "top-left", expectedWatermarks: [watermark("SSO20-R5", "top-left")],
      prompt: "回到本会话最初上传的7MB.mp4原始视频，只添加左上角全程显示的文字水印SSO20-R5，水印样式使用默认值。保留原片完整时长、1280×720分辨率和原英语音轨，只输出一个MP4，不添加字幕、不剪短、不增强画面。",
      expected: "V5来自F，全长720p，仅SSO20-R5；无历史字幕和SSO20-R4。" },
  ] },
  { id: "SSO-021", title: "同一水印工作流重复执行，验证叠加与分支隔离", mixedSources: true, steps: [
    { ...full, workflow: "text-watermark", inputRound: 0, subtitles: false, watermark: "SSO21-A", position: "top-left", expectedWatermarks: [watermark("SSO21-A", "top-left")],
      prompt: "使用本会话最初上传的7MB.mp4原始视频，在左上角添加全程显示的文字水印SSO21-A，水印样式使用默认值。保留原片完整时长、1280×720分辨率和原英语音轨，只输出一个MP4，不添加字幕、不剪辑。",
      expected: "V1来自F，只有左上A，全长720p。" },
    { ...full, workflow: "text-watermark", inputRound: 1, subtitles: false, watermark: "SSO21-B", position: "top-right", expectedWatermarks: [watermark("SSO21-A", "top-left"), watermark("SSO21-B", "top-right")],
      prompt: "在上一轮生成的带SSO21-A水印的视频上，新增右上角全程显示的文字水印SSO21-B，水印样式使用默认值。保留已有水印、时长、分辨率和音轨，只输出一个MP4，不添加字幕、不剪辑。",
      expected: "V2来自V1，同时有A/B，不能用B替换A；时长与V1相差不超过0.5秒。" },
    { ...full, workflow: "text-watermark", inputRound: 0, subtitles: false, watermark: "SSO21-C", position: "bottom-left", expectedWatermarks: [watermark("SSO21-C", "bottom-left")],
      prompt: "重新使用本会话最初上传的7MB.mp4原始视频，只在左下角添加全程显示的文字水印SSO21-C，水印样式使用默认值。保留原片完整时长、1280×720分辨率和原英语音轨，只输出一个MP4，不添加字幕、不剪辑。",
      expected: "V3来自F，只有C，没有A/B。" },
    { ...full, workflow: "text-watermark", inputRound: 2, subtitles: false, watermark: "SSO21-D", position: "bottom-right", expectedWatermarks: [watermark("SSO21-A", "top-left"), watermark("SSO21-B", "top-right"), watermark("SSO21-D", "bottom-right")],
      prompt: "使用本会话第2轮生成的同时带SSO21-A和SSO21-B水印的视频，新增右下角全程显示的文字水印SSO21-D，水印样式使用默认值。保留已有水印、时长、分辨率和音轨，只输出一个MP4，不添加字幕、不剪辑。",
      expected: "V4来自V2，同时有A/B/D；不能出现V3的C。" },
    { ...full, workflow: "text-watermark", inputRound: 0, subtitles: false, watermark: "SSO21-E", position: "center", expectedWatermarks: [watermark("SSO21-E", "center")],
      prompt: "回到本会话最初上传的7MB.mp4原始视频，只在画面中央添加全程显示的文字水印SSO21-E，水印样式使用默认值。保留原片完整时长、1280×720分辨率和原英语音轨，只输出一个MP4，不添加字幕、不剪辑。",
      expected: "V5来自F，只有E，没有A/B/C/D；原片和历史产物未被覆盖。" },
  ] },
  { id: "SSO-022", title: "自然指代最近成功产物，穿插显式返回原片", mixedSources: true, steps: [
    { ...full, workflow: "long-to-short", inputRound: 0, duration: 20, durationToleranceSec: 2, subtitles: false, expectedWatermarks: [],
      prompt: "将本会话最初上传的7MB.mp4原始视频剪成20秒高光，保留选中片段的原英语音轨和1280×720分辨率，只输出一个MP4，不添加字幕、水印或画质增强。",
      expected: "V1来自F，20±2秒、720p，无字幕/水印。" },
    { ...full, workflow: "text-watermark", inputRound: 1, duration: undefined, subtitles: false, watermark: "SSO22-R2", position: "top-right", expectedWatermarks: [watermark("SSO22-R2", "top-right")],
      prompt: "继续处理这个视频，在右上角添加全程显示的文字水印SSO22-R2，水印样式使用默认值。保留视频已有内容、时长、分辨率和音轨，只输出一个MP4，不添加字幕、不重新剪辑。",
      expected: "隐式选V1；V2保留其高光时间轴和720p，新增SSO22-R2，不能处理完整F。" },
    { ...full, workflow: "subtitle", inputRound: 0, language: "en", subtitles: true, expectedWatermarks: [],
      prompt: "回到本会话最初上传的7MB.mp4原始视频，根据原片英文语音生成英文单语字幕并烧录。保留原片完整时长、1280×720分辨率和原英语音轨，只输出一个MP4，不添加水印、不剪短、不增强画面。",
      expected: "V3来自F，全长720p，有英文字幕，无水印；更新最近成功产物。" },
    { ...full, workflow: "enhance", inputRound: 3, duration: undefined, width: 2560, height: 1440, language: "en", subtitles: true, expectedWatermarks: [],
      prompt: "继续处理这个视频，将它的分辨率提升2倍，保留它已有的全部画面内容、字幕、时长和音轨，只输出一个增强后的MP4，不重新剪辑、不添加水印。",
      expected: "隐式选V3；V4全长1440p并保留英文字幕，不能误用20秒V2或带入SSO22-R2。" },
    { ...full, workflow: "long-to-short", inputRound: 0, duration: 30, durationToleranceSec: 2, subtitles: false, expectedWatermarks: [],
      prompt: "使用本会话最初上传的7MB.mp4原始视频，剪成30秒高光。保留选中片段的原英语音轨和1280×720分辨率，只输出一个MP4，不添加字幕、水印或画质增强。",
      expected: "V5来自F，30±2秒、720p；无V4字幕、增强和SSO22-R2。" },
  ] },
];
