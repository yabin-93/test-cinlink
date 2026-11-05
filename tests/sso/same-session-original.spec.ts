import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { expect, test, type BrowserContext, type Page } from "@playwright/test";
import { credentials, optionalStorageState, targets } from "../../src/config.js";
import { extractArtifacts } from "../../src/assertions/artifact.js";
import { checkMedia, probeMedia } from "../../src/assertions/media.js";
import { checkSrtStructure } from "../../src/assertions/srt.js";
import { SSOSessionRecovery, type SSORecoveryMode, type SSORecoveryRecord } from "../../src/fixtures/sso-session-recovery.js";
import { auditSourceLineage } from "../../src/fixtures/sso-source-lineage.js";
import { resolveRoundInput } from "../../src/fixtures/sso-round-input.js";
import { sourceArtifactCases, type SSODefinition } from "./cases/source-artifact.js";
import { appendPromptText, cancelRun, confirmRenderPlan, conversationForRun,
  findStringField, getRunDetail, isRunSubmission, openWorkspaceSession,
  restoreRunConversation, submitCurrentPrompt } from "../../src/workspace.js";

const execFileAsync = promisify(execFile);
const sourcePath = "E:/图片视频素材/talecast测试素材/不同的内容/单音频轨道/7MB.mp4";
type Step = SSODefinition["steps"][number];
const definitions: SSODefinition[] = [
  {
    "id": "SSO-001",
    "title": "两轮穿插：英文字幕→20秒高光",
    "steps": [
      {
        "workflow": "subtitle",
        "prompt": "根据源视频中的英文语音生成英文字幕，只交付英文SRT文件，保留原片完整时间轴，不烧录视频。",
        "kind": "srt",
        "language": "en"
      },
      {
        "workflow": "long-to-short",
        "prompt": "把源视频剪成20秒高光，保留选中片段原音轨和原分辨率1280×720，只交付一个MP4，不增加字幕或水印。",
        "kind": "mp4",
        "duration": 20,
        "width": 1280,
        "height": 720
      }
    ]
  },
  {
    "id": "SSO-002",
    "title": "三轮穿插：水印→增强→英文字幕",
    "steps": [
      {
        "workflow": "text-watermark",
        "prompt": "给源视频添加文字水印SSO-C2-R1，位于右上角、全程可见，保留原片完整时长、原分辨率1280×720和原音轨，只交付一个MP4，不增加字幕。",
        "kind": "mp4",
        "duration": 60.5,
        "width": 1280,
        "height": 720,
        "watermark": "SSO-C2-R1",
        "position": "top-right"
      },
      {
        "workflow": "enhance",
        "prompt": "把源视频分辨率提升2倍至2560×1440，保留原片完整时长和原音轨，只交付一个增强MP4，不增加字幕或水印。",
        "kind": "mp4",
        "duration": 60.5,
        "width": 2560,
        "height": 1440
      },
      {
        "workflow": "subtitle",
        "prompt": "根据源视频中的英文语音生成英文字幕，只交付英文SRT文件，保留原片完整时间轴，不烧录视频。",
        "kind": "srt",
        "language": "en"
      }
    ]
  },
  {
    "id": "SSO-003",
    "title": "四轮穿插：中文翻译→30秒高光→水印→增强",
    "steps": [
      {
        "workflow": "translation",
        "prompt": "识别源视频中的英文语音并翻译成简体中文，只交付中文SRT文件，保留原片完整时间轴，不烧录视频。",
        "kind": "srt",
        "language": "zh"
      },
      {
        "workflow": "long-to-short",
        "prompt": "把源视频剪成30秒高光，保留选中片段原音轨和原分辨率1280×720，只交付一个MP4，不增加字幕或水印。",
        "kind": "mp4",
        "duration": 30,
        "width": 1280,
        "height": 720
      },
      {
        "workflow": "text-watermark",
        "prompt": "给源视频添加文字水印SSO-C3-R3，位于右下角、全程可见，保留原片完整时长、原分辨率1280×720和原音轨，只交付一个MP4，不增加字幕。",
        "kind": "mp4",
        "duration": 60.5,
        "width": 1280,
        "height": 720,
        "watermark": "SSO-C3-R3",
        "position": "bottom-right"
      },
      {
        "workflow": "enhance",
        "prompt": "把源视频分辨率提升2倍至2560×1440，保留原片完整时长和原音轨，只交付一个增强MP4，不增加字幕或水印。",
        "kind": "mp4",
        "duration": 60.5,
        "width": 2560,
        "height": 1440
      }
    ]
  },
  {
    "id": "SSO-004",
    "title": "五轮穿插：英文字幕→水印→增强→20秒高光→日文翻译",
    "steps": [
      {
        "workflow": "subtitle",
        "prompt": "根据源视频中的英文语音生成英文字幕，只交付英文SRT文件，保留原片完整时间轴，不烧录视频。",
        "kind": "srt",
        "language": "en"
      },
      {
        "workflow": "text-watermark",
        "prompt": "给源视频添加文字水印SSO-C4-R2，位于左上角、全程可见，保留原片完整时长、原分辨率1280×720和原音轨，只交付一个MP4，不增加字幕。",
        "kind": "mp4",
        "duration": 60.5,
        "width": 1280,
        "height": 720,
        "watermark": "SSO-C4-R2",
        "position": "top-left"
      },
      {
        "workflow": "enhance",
        "prompt": "把源视频分辨率提升2倍至2560×1440，保留原片完整时长和原音轨，只交付一个增强MP4，不增加字幕或水印。",
        "kind": "mp4",
        "duration": 60.5,
        "width": 2560,
        "height": 1440
      },
      {
        "workflow": "long-to-short",
        "prompt": "把源视频剪成20秒高光，保留选中片段原音轨和原分辨率1280×720，只交付一个MP4，不增加字幕或水印。",
        "kind": "mp4",
        "duration": 20,
        "width": 1280,
        "height": 720
      },
      {
        "workflow": "translation",
        "prompt": "识别源视频中的英文语音并翻译成日文，只交付日文SRT文件，保留原片完整时间轴，不烧录视频。",
        "kind": "srt",
        "language": "ja"
      }
    ]
  },
  {
    "id": "SSO-005",
    "title": "五轮同工作流：中文→日文→韩文→法文→西班牙文字幕",
    "steps": [
      {
        "workflow": "subtitle",
        "prompt": "根据源视频中的英文语音生成简体中文单语字幕并烧录到视频，保留原片完整时长、原分辨率1280×720和原英语音轨，交付一个带简体中文字幕的MP4，不更改配音、不增加水印或画面增强。",
        "kind": "mp4",
        "language": "zh",
        "duration": 60.5,
        "width": 1280,
        "height": 720
      },
      {
        "workflow": "subtitle",
        "prompt": "根据源视频中的英文语音生成日文单语字幕并烧录到视频，保留原片完整时长、原分辨率1280×720和原英语音轨，交付一个带日文字幕的MP4，不更改配音、不增加水印或画面增强。",
        "kind": "mp4",
        "language": "ja",
        "duration": 60.5,
        "width": 1280,
        "height": 720
      },
      {
        "workflow": "subtitle",
        "prompt": "根据源视频中的英文语音生成韩文单语字幕并烧录到视频，保留原片完整时长、原分辨率1280×720和原英语音轨，交付一个带韩文字幕的MP4，不更改配音、不增加水印或画面增强。",
        "kind": "mp4",
        "language": "ko",
        "duration": 60.5,
        "width": 1280,
        "height": 720
      },
      {
        "workflow": "subtitle",
        "prompt": "根据源视频中的英文语音生成法文单语字幕并烧录到视频，保留原片完整时长、原分辨率1280×720和原英语音轨，交付一个带法文字幕的MP4，不更改配音、不增加水印或画面增强。",
        "kind": "mp4",
        "language": "fr",
        "duration": 60.5,
        "width": 1280,
        "height": 720
      },
      {
        "workflow": "subtitle",
        "prompt": "根据源视频中的英文语音生成西班牙文单语字幕并烧录到视频，保留原片完整时长、原分辨率1280×720和原英语音轨，交付一个带西班牙文字幕的MP4，不更改配音、不增加水印或画面增强。",
        "kind": "mp4",
        "language": "es",
        "duration": 60.5,
        "width": 1280,
        "height": 720
      }
    ]
  },
  {
    "id": "SSO-006",
    "title": "五轮同工作流：中日韓法西配音及对应字幕",
    "steps": [
      {
        "workflow": "dub",
        "prompt": "将源视频中的英文人声翻译并配音为中文普通话，使用产品默认的目标语言音色，替换原英语人声，并烧录与该配音对应的简体中文单语字幕；保留原片完整时长、原分辨率1280×720和原画面顺序，目标配音与字幕时间同步，交付一个中文普通话配音且带简体中文字幕的MP4，不做口型同步或添加水印。",
        "kind": "mp4",
        "duration": 60.5,
        "width": 1280,
        "height": 720,
        "language": "zh"
      },
      {
        "workflow": "dub",
        "prompt": "将源视频中的英文人声翻译并配音为日语，使用产品默认的目标语言音色，替换原英语人声，并烧录与该配音对应的日文单语字幕；保留原片完整时长、原分辨率1280×720和原画面顺序，目标配音与字幕时间同步，交付一个日语配音且带日文字幕的MP4，不做口型同步或添加水印。",
        "kind": "mp4",
        "duration": 60.5,
        "width": 1280,
        "height": 720,
        "language": "ja"
      },
      {
        "workflow": "dub",
        "prompt": "将源视频中的英文人声翻译并配音为韩语，使用产品默认的目标语言音色，替换原英语人声，并烧录与该配音对应的韩文单语字幕；保留原片完整时长、原分辨率1280×720和原画面顺序，目标配音与字幕时间同步，交付一个韩语配音且带韩文字幕的MP4，不做口型同步或添加水印。",
        "kind": "mp4",
        "duration": 60.5,
        "width": 1280,
        "height": 720,
        "language": "ko"
      },
      {
        "workflow": "dub",
        "prompt": "将源视频中的英文人声翻译并配音为法语，使用产品默认的目标语言音色，替换原英语人声，并烧录与该配音对应的法文单语字幕；保留原片完整时长、原分辨率1280×720和原画面顺序，目标配音与字幕时间同步，交付一个法语配音且带法文字幕的MP4，不做口型同步或添加水印。",
        "kind": "mp4",
        "duration": 60.5,
        "width": 1280,
        "height": 720,
        "language": "fr"
      },
      {
        "workflow": "dub",
        "prompt": "将源视频中的英文人声翻译并配音为西班牙语，使用产品默认的目标语言音色，替换原英语人声，并烧录与该配音对应的西班牙文单语字幕；保留原片完整时长、原分辨率1280×720和原画面顺序，目标配音与字幕时间同步，交付一个西班牙语配音且带西班牙文字幕的MP4，不做口型同步或添加水印。",
        "kind": "mp4",
        "duration": 60.5,
        "width": 1280,
        "height": 720,
        "language": "es"
      }
    ]
  },
  {
    "id": "SSO-007",
    "title": "五轮同工作流：水印文字与四角位置切换",
    "steps": [
      {
        "workflow": "text-watermark",
        "prompt": "给源视频添加文字水印SSO-C7-R1，位于右上角、全程可见，保留原片完整时长、原分辨率1280×720和原音轨，只交付一个MP4，不增加字幕。",
        "kind": "mp4",
        "duration": 60.5,
        "width": 1280,
        "height": 720,
        "watermark": "SSO-C7-R1",
        "position": "top-right"
      },
      {
        "workflow": "text-watermark",
        "prompt": "给源视频添加文字水印SSO-C7-R2，位于左上角、全程可见，保留原片完整时长、原分辨率1280×720和原音轨，只交付一个MP4，不增加字幕。",
        "kind": "mp4",
        "duration": 60.5,
        "width": 1280,
        "height": 720,
        "watermark": "SSO-C7-R2",
        "position": "top-left"
      },
      {
        "workflow": "text-watermark",
        "prompt": "给源视频添加文字水印SSO-C7-R3，位于右下角、全程可见，保留原片完整时长、原分辨率1280×720和原音轨，只交付一个MP4，不增加字幕。",
        "kind": "mp4",
        "duration": 60.5,
        "width": 1280,
        "height": 720,
        "watermark": "SSO-C7-R3",
        "position": "bottom-right"
      },
      {
        "workflow": "text-watermark",
        "prompt": "给源视频添加文字水印SSO-C7-R4，位于左下角、全程可见，保留原片完整时长、原分辨率1280×720和原音轨，只交付一个MP4，不增加字幕。",
        "kind": "mp4",
        "duration": 60.5,
        "width": 1280,
        "height": 720,
        "watermark": "SSO-C7-R4",
        "position": "bottom-left"
      },
      {
        "workflow": "text-watermark",
        "prompt": "给源视频添加文字水印SSO-C7-R5，位于右上角、全程可见，保留原片完整时长、原分辨率1280×720和原音轨，只交付一个MP4，不增加字幕。",
        "kind": "mp4",
        "duration": 60.5,
        "width": 1280,
        "height": 720,
        "watermark": "SSO-C7-R5",
        "position": "top-right"
      }
    ]
  },
  {
    "id": "SSO-008",
    "title": "五轮同工作流：20→30→15→25→20秒高光",
    "steps": [
      {
        "workflow": "long-to-short",
        "prompt": "把源视频剪成20秒高光，保留选中片段原音轨和原分辨率1280×720，只交付一个MP4，不增加字幕或水印。",
        "kind": "mp4",
        "duration": 20,
        "width": 1280,
        "height": 720
      },
      {
        "workflow": "long-to-short",
        "prompt": "把源视频剪成30秒高光，保留选中片段原音轨和原分辨率1280×720，只交付一个MP4，不增加字幕或水印。",
        "kind": "mp4",
        "duration": 30,
        "width": 1280,
        "height": 720
      },
      {
        "workflow": "long-to-short",
        "prompt": "把源视频剪成15秒高光，保留选中片段原音轨和原分辨率1280×720，只交付一个MP4，不增加字幕或水印。",
        "kind": "mp4",
        "duration": 15,
        "width": 1280,
        "height": 720
      },
      {
        "workflow": "long-to-short",
        "prompt": "把源视频剪成25秒高光，保留选中片段原音轨和原分辨率1280×720，只交付一个MP4，不增加字幕或水印。",
        "kind": "mp4",
        "duration": 25,
        "width": 1280,
        "height": 720
      },
      {
        "workflow": "long-to-short",
        "prompt": "把源视频剪成20秒高光，保留选中片段原音轨和原分辨率1280×720，只交付一个MP4，不增加字幕或水印。",
        "kind": "mp4",
        "duration": 20,
        "width": 1280,
        "height": 720
      }
    ]
  },
  {
    "id": "SSO-009",
    "title": "五轮不同组合交替",
    "steps": [
      {
        "workflow": "compound",
        "workflows": [
          "subtitle",
          "text-watermark"
        ],
        "prompt": "根据源视频中的英文语音生成英文单语字幕并烧录，添加右上角全程可见的文字水印C1-R1，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。",
        "kind": "mp4",
        "duration": 60.5,
        "durationToleranceSec": 0.5,
        "width": 1280,
        "height": 720,
        "language": "en",
        "watermark": "C1-R1",
        "position": "top-right",
        "dubbed": false,
        "subtitles": true
      },
      {
        "workflow": "compound",
        "workflows": [
          "long-to-short",
          "enhance"
        ],
        "prompt": "先把源视频剪成30秒高光，再把本轮高光的分辨率提升2倍至2560×1440，保留选中片段的原英语音轨，只交付一个同时完成高光剪辑和增强的MP4，不增加字幕或水印。",
        "kind": "mp4",
        "duration": 30,
        "durationToleranceSec": 2,
        "width": 2560,
        "height": 1440,
        "language": "en",
        "dubbed": false,
        "subtitles": false
      },
      {
        "workflow": "compound",
        "workflows": [
          "subtitle",
          "text-watermark"
        ],
        "prompt": "根据源视频中的英文语音生成简体中文单语字幕并烧录，添加左上角全程可见的文字水印C1-R3，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。",
        "kind": "mp4",
        "duration": 60.5,
        "durationToleranceSec": 0.5,
        "width": 1280,
        "height": 720,
        "language": "zh",
        "watermark": "C1-R3",
        "position": "top-left",
        "dubbed": false,
        "subtitles": true
      },
      {
        "workflow": "compound",
        "workflows": [
          "long-to-short",
          "enhance"
        ],
        "prompt": "先把源视频剪成20秒高光，再把本轮高光的分辨率提升2倍至2560×1440，保留选中片段的原英语音轨，只交付一个同时完成高光剪辑和增强的MP4，不增加字幕或水印。",
        "kind": "mp4",
        "duration": 20,
        "durationToleranceSec": 2,
        "width": 2560,
        "height": 1440,
        "language": "en",
        "dubbed": false,
        "subtitles": false
      },
      {
        "workflow": "compound",
        "workflows": [
          "subtitle",
          "text-watermark"
        ],
        "prompt": "根据源视频中的英文语音生成英文单语字幕并烧录，添加右下角全程可见的文字水印C1-R5，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。",
        "kind": "mp4",
        "duration": 60.5,
        "durationToleranceSec": 0.5,
        "width": 1280,
        "height": 720,
        "language": "en",
        "watermark": "C1-R5",
        "position": "bottom-right",
        "dubbed": false,
        "subtitles": true
      }
    ]
  },
  {
    "id": "SSO-010",
    "title": "五轮组合字幕语言切换",
    "steps": [
      {
        "workflow": "compound",
        "workflows": [
          "subtitle",
          "text-watermark"
        ],
        "prompt": "根据源视频中的英文语音生成简体中文单语字幕并烧录，添加右上角全程可见的文字水印C2-ZH，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。",
        "kind": "mp4",
        "duration": 60.5,
        "durationToleranceSec": 0.5,
        "width": 1280,
        "height": 720,
        "language": "zh",
        "watermark": "C2-ZH",
        "position": "top-right",
        "dubbed": false,
        "subtitles": true
      },
      {
        "workflow": "compound",
        "workflows": [
          "subtitle",
          "text-watermark"
        ],
        "prompt": "根据源视频中的英文语音生成日文单语字幕并烧录，添加左上角全程可见的文字水印C2-JA，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。",
        "kind": "mp4",
        "duration": 60.5,
        "durationToleranceSec": 0.5,
        "width": 1280,
        "height": 720,
        "language": "ja",
        "watermark": "C2-JA",
        "position": "top-left",
        "dubbed": false,
        "subtitles": true
      },
      {
        "workflow": "compound",
        "workflows": [
          "subtitle",
          "text-watermark"
        ],
        "prompt": "根据源视频中的英文语音生成韩文单语字幕并烧录，添加右下角全程可见的文字水印C2-KO，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。",
        "kind": "mp4",
        "duration": 60.5,
        "durationToleranceSec": 0.5,
        "width": 1280,
        "height": 720,
        "language": "ko",
        "watermark": "C2-KO",
        "position": "bottom-right",
        "dubbed": false,
        "subtitles": true
      },
      {
        "workflow": "compound",
        "workflows": [
          "subtitle",
          "text-watermark"
        ],
        "prompt": "根据源视频中的英文语音生成法文单语字幕并烧录，添加左下角全程可见的文字水印C2-FR，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。",
        "kind": "mp4",
        "duration": 60.5,
        "durationToleranceSec": 0.5,
        "width": 1280,
        "height": 720,
        "language": "fr",
        "watermark": "C2-FR",
        "position": "bottom-left",
        "dubbed": false,
        "subtitles": true
      },
      {
        "workflow": "compound",
        "workflows": [
          "subtitle",
          "text-watermark"
        ],
        "prompt": "根据源视频中的英文语音生成西班牙文单语字幕并烧录，添加右上角全程可见的文字水印C2-ES，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。",
        "kind": "mp4",
        "duration": 60.5,
        "durationToleranceSec": 0.5,
        "width": 1280,
        "height": 720,
        "language": "es",
        "watermark": "C2-ES",
        "position": "top-right",
        "dubbed": false,
        "subtitles": true
      }
    ]
  },
  {
    "id": "SSO-011",
    "title": "五轮高光组合与完整原片组合交替",
    "steps": [
      {
        "workflow": "compound",
        "workflows": [
          "long-to-short",
          "subtitle"
        ],
        "prompt": "先把源视频剪成20秒高光，再根据本轮高光中的英文语音生成英文单语字幕并烧录，保留选中片段的原英语音轨和原分辨率1280×720，只交付一个带英文字幕的高光MP4，不增加水印或画面增强。",
        "kind": "mp4",
        "duration": 20,
        "durationToleranceSec": 2,
        "width": 1280,
        "height": 720,
        "language": "en",
        "dubbed": false,
        "subtitles": true
      },
      {
        "workflow": "compound",
        "workflows": [
          "subtitle",
          "text-watermark"
        ],
        "prompt": "根据源视频中的英文语音生成英文单语字幕并烧录，添加右上角全程可见的文字水印C3-FULL2，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。",
        "kind": "mp4",
        "duration": 60.5,
        "durationToleranceSec": 0.5,
        "width": 1280,
        "height": 720,
        "language": "en",
        "watermark": "C3-FULL2",
        "position": "top-right",
        "dubbed": false,
        "subtitles": true
      },
      {
        "workflow": "compound",
        "workflows": [
          "long-to-short",
          "subtitle"
        ],
        "prompt": "先把源视频剪成30秒高光，再根据本轮高光中的英文语音生成英文单语字幕并烧录，保留选中片段的原英语音轨和原分辨率1280×720，只交付一个带英文字幕的高光MP4，不增加水印或画面增强。",
        "kind": "mp4",
        "duration": 30,
        "durationToleranceSec": 2,
        "width": 1280,
        "height": 720,
        "language": "en",
        "dubbed": false,
        "subtitles": true
      },
      {
        "workflow": "compound",
        "workflows": [
          "subtitle",
          "text-watermark"
        ],
        "prompt": "根据源视频中的英文语音生成英文单语字幕并烧录，添加左上角全程可见的文字水印C3-FULL4，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。",
        "kind": "mp4",
        "duration": 60.5,
        "durationToleranceSec": 0.5,
        "width": 1280,
        "height": 720,
        "language": "en",
        "watermark": "C3-FULL4",
        "position": "top-left",
        "dubbed": false,
        "subtitles": true
      },
      {
        "workflow": "compound",
        "workflows": [
          "long-to-short",
          "subtitle"
        ],
        "prompt": "先把源视频剪成15秒高光，再根据本轮高光中的英文语音生成英文单语字幕并烧录，保留选中片段的原英语音轨和原分辨率1280×720，只交付一个带英文字幕的高光MP4，不增加水印或画面增强。",
        "kind": "mp4",
        "duration": 15,
        "durationToleranceSec": 2,
        "width": 1280,
        "height": 720,
        "language": "en",
        "dubbed": false,
        "subtitles": true
      }
    ]
  },
  {
    "id": "SSO-012",
    "title": "五轮组合效果扩增与缩减",
    "steps": [
      {
        "workflow": "compound",
        "workflows": [
          "subtitle",
          "text-watermark"
        ],
        "prompt": "根据源视频中的英文语音生成英文单语字幕并烧录，添加右上角全程可见的文字水印C4-R1，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。",
        "kind": "mp4",
        "duration": 60.5,
        "durationToleranceSec": 0.5,
        "width": 1280,
        "height": 720,
        "language": "en",
        "watermark": "C4-R1",
        "position": "top-right",
        "dubbed": false,
        "subtitles": true
      },
      {
        "workflow": "compound",
        "workflows": [
          "subtitle",
          "text-watermark",
          "enhance"
        ],
        "prompt": "根据源视频中的英文语音生成英文单语字幕并烧录，添加左上角全程可见的文字水印C4-R2，把分辨率提升2倍至2560×1440；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。",
        "kind": "mp4",
        "duration": 60.5,
        "durationToleranceSec": 0.5,
        "width": 2560,
        "height": 1440,
        "language": "en",
        "watermark": "C4-R2",
        "position": "top-left",
        "dubbed": false,
        "subtitles": true
      },
      {
        "workflow": "compound",
        "workflows": [
          "subtitle",
          "enhance"
        ],
        "prompt": "根据源视频中的英文语音生成英文单语字幕并烧录，同时把分辨率提升2倍至2560×1440；保留原片完整时长和原英语音轨，只交付一个同时带英文字幕和增强效果的MP4，不添加水印、不更改配音或剪短视频。",
        "kind": "mp4",
        "duration": 60.5,
        "durationToleranceSec": 0.5,
        "width": 2560,
        "height": 1440,
        "language": "en",
        "dubbed": false,
        "subtitles": true
      },
      {
        "workflow": "compound",
        "workflows": [
          "subtitle",
          "text-watermark"
        ],
        "prompt": "根据源视频中的英文语音生成英文单语字幕并烧录，添加右下角全程可见的文字水印C4-R4，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。",
        "kind": "mp4",
        "duration": 60.5,
        "durationToleranceSec": 0.5,
        "width": 1280,
        "height": 720,
        "language": "en",
        "watermark": "C4-R4",
        "position": "bottom-right",
        "dubbed": false,
        "subtitles": true
      },
      {
        "workflow": "compound",
        "workflows": [
          "subtitle",
          "text-watermark",
          "enhance"
        ],
        "prompt": "根据源视频中的英文语音生成英文单语字幕并烧录，添加左下角全程可见的文字水印C4-R5，把分辨率提升2倍至2560×1440；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。",
        "kind": "mp4",
        "duration": 60.5,
        "durationToleranceSec": 0.5,
        "width": 2560,
        "height": 1440,
        "language": "en",
        "watermark": "C4-R5",
        "position": "bottom-left",
        "dubbed": false,
        "subtitles": true
      }
    ]
  },
  {
    "id": "SSO-013",
    "title": "五轮相同组合连续及间隔恢复",
    "steps": [
      {
        "workflow": "compound",
        "workflows": [
          "text-watermark",
          "enhance"
        ],
        "prompt": "给源视频添加右上角全程可见的文字水印C5-A，同时把分辨率提升2倍至2560×1440；保留原片完整时长和原英语音轨，只交付一个同时带水印和增强效果的MP4，不增加字幕、不更改配音或剪短视频。",
        "kind": "mp4",
        "duration": 60.5,
        "durationToleranceSec": 0.5,
        "width": 2560,
        "height": 1440,
        "language": "en",
        "watermark": "C5-A",
        "position": "top-right",
        "dubbed": false,
        "subtitles": false
      },
      {
        "workflow": "compound",
        "workflows": [
          "text-watermark",
          "enhance"
        ],
        "prompt": "给源视频添加右上角全程可见的文字水印C5-A，同时把分辨率提升2倍至2560×1440；保留原片完整时长和原英语音轨，只交付一个同时带水印和增强效果的MP4，不增加字幕、不更改配音或剪短视频。",
        "kind": "mp4",
        "duration": 60.5,
        "durationToleranceSec": 0.5,
        "width": 2560,
        "height": 1440,
        "language": "en",
        "watermark": "C5-A",
        "position": "top-right",
        "dubbed": false,
        "subtitles": false
      },
      {
        "workflow": "compound",
        "workflows": [
          "subtitle",
          "text-watermark"
        ],
        "prompt": "根据源视频中的英文语音生成英文单语字幕并烧录，添加左上角全程可见的文字水印C5-B，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。",
        "kind": "mp4",
        "duration": 60.5,
        "durationToleranceSec": 0.5,
        "width": 1280,
        "height": 720,
        "language": "en",
        "watermark": "C5-B",
        "position": "top-left",
        "dubbed": false,
        "subtitles": true
      },
      {
        "workflow": "compound",
        "workflows": [
          "text-watermark",
          "enhance"
        ],
        "prompt": "给源视频添加右上角全程可见的文字水印C5-A，同时把分辨率提升2倍至2560×1440；保留原片完整时长和原英语音轨，只交付一个同时带水印和增强效果的MP4，不增加字幕、不更改配音或剪短视频。",
        "kind": "mp4",
        "duration": 60.5,
        "durationToleranceSec": 0.5,
        "width": 2560,
        "height": 1440,
        "language": "en",
        "watermark": "C5-A",
        "position": "top-right",
        "dubbed": false,
        "subtitles": false
      },
      {
        "workflow": "compound",
        "workflows": [
          "text-watermark",
          "enhance"
        ],
        "prompt": "给源视频添加右上角全程可见的文字水印C5-A，同时把分辨率提升2倍至2560×1440；保留原片完整时长和原英语音轨，只交付一个同时带水印和增强效果的MP4，不增加字幕、不更改配音或剪短视频。",
        "kind": "mp4",
        "duration": 60.5,
        "durationToleranceSec": 0.5,
        "width": 2560,
        "height": 1440,
        "language": "en",
        "watermark": "C5-A",
        "position": "top-right",
        "dubbed": false,
        "subtitles": false
      }
    ]
  },
  {
    "id": "SSO-014",
    "title": "五轮译制组合与原英语组合交替",
    "steps": [
      {
        "workflow": "compound",
        "workflows": [
          "video-translation",
          "text-watermark"
        ],
        "prompt": "将源视频中的英文人声翻译并配音为日语，使用产品默认的目标语言音色，替换原英语人声，烧录与该配音对应的日文单语字幕，并添加右上角全程可见的文字水印C6-JA；保留原片完整时长、原分辨率1280×720和原画面顺序，目标配音与字幕内容一致、时间同步，只交付一个同时包含上述效果的MP4，不做口型同步、画面增强或剪短视频。",
        "kind": "mp4",
        "duration": 60.5,
        "durationToleranceSec": 0.5,
        "width": 1280,
        "height": 720,
        "language": "ja",
        "watermark": "C6-JA",
        "position": "top-right",
        "dubbed": true,
        "subtitles": true
      },
      {
        "workflow": "compound",
        "workflows": [
          "subtitle",
          "text-watermark"
        ],
        "prompt": "根据源视频中的英文语音生成英文单语字幕并烧录，添加左上角全程可见的文字水印C6-EN2，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。",
        "kind": "mp4",
        "duration": 60.5,
        "durationToleranceSec": 0.5,
        "width": 1280,
        "height": 720,
        "language": "en",
        "watermark": "C6-EN2",
        "position": "top-left",
        "dubbed": false,
        "subtitles": true
      },
      {
        "workflow": "compound",
        "workflows": [
          "video-translation",
          "text-watermark"
        ],
        "prompt": "将源视频中的英文人声翻译并配音为中文普通话，使用产品默认的目标语言音色，替换原英语人声，烧录与该配音对应的简体中文单语字幕，并添加右下角全程可见的文字水印C6-ZH；保留原片完整时长、原分辨率1280×720和原画面顺序，目标配音与字幕内容一致、时间同步，只交付一个同时包含上述效果的MP4，不做口型同步、画面增强或剪短视频。",
        "kind": "mp4",
        "duration": 60.5,
        "durationToleranceSec": 0.5,
        "width": 1280,
        "height": 720,
        "language": "zh",
        "watermark": "C6-ZH",
        "position": "bottom-right",
        "dubbed": true,
        "subtitles": true
      },
      {
        "workflow": "compound",
        "workflows": [
          "subtitle",
          "text-watermark"
        ],
        "prompt": "根据源视频中的英文语音生成英文单语字幕并烧录，添加左下角全程可见的文字水印C6-EN4，保留原分辨率1280×720；保留原片完整时长和原英语音轨，只交付一个同时包含上述效果的MP4，不更改配音或剪短视频。",
        "kind": "mp4",
        "duration": 60.5,
        "durationToleranceSec": 0.5,
        "width": 1280,
        "height": 720,
        "language": "en",
        "watermark": "C6-EN4",
        "position": "bottom-left",
        "dubbed": false,
        "subtitles": true
      },
      {
        "workflow": "compound",
        "workflows": [
          "video-translation",
          "text-watermark"
        ],
        "prompt": "将源视频中的英文人声翻译并配音为法语，使用产品默认的目标语言音色，替换原英语人声，烧录与该配音对应的法文单语字幕，并添加右上角全程可见的文字水印C6-FR；保留原片完整时长、原分辨率1280×720和原画面顺序，目标配音与字幕内容一致、时间同步，只交付一个同时包含上述效果的MP4，不做口型同步、画面增强或剪短视频。",
        "kind": "mp4",
        "duration": 60.5,
        "durationToleranceSec": 0.5,
        "width": 1280,
        "height": 720,
        "language": "fr",
        "watermark": "C6-FR",
        "position": "top-right",
        "dubbed": true,
        "subtitles": true
      }
    ]
  },
  {
    "id": "SSO-015",
    "title": "五轮完成后刷新恢复",
    "recoveryMode": "after-refresh",
    "steps": [
      {
        "workflow": "compound",
        "prompt": "根据源视频中的英文语音生成英文单语字幕并烧录，同时添加右上角全程可见的文字水印REC-R1；保留原片完整时长、原分辨率1280×720和原英语音轨，只交付一个同时带英文字幕和水印的MP4，不更改配音、剪短视频或画面增强。",
        "kind": "mp4",
        "workflows": [
          "subtitle",
          "text-watermark"
        ],
        "duration": 60.5,
        "width": 1280,
        "height": 720,
        "language": "en",
        "watermark": "REC-R1",
        "position": "top-right",
        "subtitles": true
      },
      {
        "workflow": "compound",
        "prompt": "先把源视频剪成20秒高光，再把本轮高光的分辨率提升2倍至2560×1440，保留选中片段的原英语音轨，只交付一个同时完成高光剪辑和增强的MP4，不增加字幕或水印。",
        "kind": "mp4",
        "workflows": [
          "long-to-short",
          "enhance"
        ],
        "duration": 20,
        "durationToleranceSec": 2,
        "width": 2560,
        "height": 1440,
        "language": "en",
        "subtitles": false
      },
      {
        "workflow": "compound",
        "prompt": "根据源视频中的英文语音生成简体中文单语字幕并烧录，同时添加左上角全程可见的文字水印REC-R3；保留原片完整时长、原分辨率1280×720和原英语音轨，只交付一个同时带简体中文字幕和水印的MP4，不更改配音、剪短视频或画面增强。",
        "kind": "mp4",
        "workflows": [
          "translation",
          "text-watermark"
        ],
        "duration": 60.5,
        "width": 1280,
        "height": 720,
        "language": "zh",
        "watermark": "REC-R3",
        "position": "top-left",
        "subtitles": true
      },
      {
        "workflow": "compound",
        "prompt": "根据源视频中的英文语音生成英文单语字幕并烧录，同时把分辨率提升2倍至2560×1440；保留原片完整时长和原英语音轨，只交付一个同时带英文字幕和增强效果的MP4，不增加水印、不更改配音或剪短视频。",
        "kind": "mp4",
        "workflows": [
          "subtitle",
          "enhance"
        ],
        "duration": 60.5,
        "width": 2560,
        "height": 1440,
        "language": "en",
        "subtitles": true
      },
      {
        "workflow": "compound",
        "prompt": "先把源视频剪成30秒高光，再根据本轮高光中的英文语音生成英文单语字幕并烧录，保留选中片段的原英语音轨和原分辨率1280×720，只交付一个带英文字幕的高光MP4，不增加水印或画面增强。",
        "kind": "mp4",
        "workflows": [
          "long-to-short",
          "subtitle"
        ],
        "duration": 30,
        "durationToleranceSec": 2,
        "width": 1280,
        "height": 720,
        "language": "en",
        "subtitles": true
      }
    ]
  },
  {
    "id": "SSO-016",
    "title": "五轮执行中刷新恢复",
    "recoveryMode": "during-refresh",
    "steps": [
      {
        "workflow": "compound",
        "prompt": "根据源视频中的英文语音生成英文单语字幕并烧录，同时添加右上角全程可见的文字水印REC-R1；保留原片完整时长、原分辨率1280×720和原英语音轨，只交付一个同时带英文字幕和水印的MP4，不更改配音、剪短视频或画面增强。",
        "kind": "mp4",
        "workflows": [
          "subtitle",
          "text-watermark"
        ],
        "duration": 60.5,
        "width": 1280,
        "height": 720,
        "language": "en",
        "watermark": "REC-R1",
        "position": "top-right",
        "subtitles": true
      },
      {
        "workflow": "compound",
        "prompt": "先把源视频剪成20秒高光，再把本轮高光的分辨率提升2倍至2560×1440，保留选中片段的原英语音轨，只交付一个同时完成高光剪辑和增强的MP4，不增加字幕或水印。",
        "kind": "mp4",
        "workflows": [
          "long-to-short",
          "enhance"
        ],
        "duration": 20,
        "durationToleranceSec": 2,
        "width": 2560,
        "height": 1440,
        "language": "en",
        "subtitles": false
      },
      {
        "workflow": "compound",
        "prompt": "根据源视频中的英文语音生成简体中文单语字幕并烧录，同时添加左上角全程可见的文字水印REC-R3；保留原片完整时长、原分辨率1280×720和原英语音轨，只交付一个同时带简体中文字幕和水印的MP4，不更改配音、剪短视频或画面增强。",
        "kind": "mp4",
        "workflows": [
          "translation",
          "text-watermark"
        ],
        "duration": 60.5,
        "width": 1280,
        "height": 720,
        "language": "zh",
        "watermark": "REC-R3",
        "position": "top-left",
        "subtitles": true
      },
      {
        "workflow": "compound",
        "prompt": "根据源视频中的英文语音生成英文单语字幕并烧录，同时把分辨率提升2倍至2560×1440；保留原片完整时长和原英语音轨，只交付一个同时带英文字幕和增强效果的MP4，不增加水印、不更改配音或剪短视频。",
        "kind": "mp4",
        "workflows": [
          "subtitle",
          "enhance"
        ],
        "duration": 60.5,
        "width": 2560,
        "height": 1440,
        "language": "en",
        "subtitles": true
      },
      {
        "workflow": "compound",
        "prompt": "先把源视频剪成30秒高光，再根据本轮高光中的英文语音生成英文单语字幕并烧录，保留选中片段的原英语音轨和原分辨率1280×720，只交付一个带英文字幕的高光MP4，不增加水印或画面增强。",
        "kind": "mp4",
        "workflows": [
          "long-to-short",
          "subtitle"
        ],
        "duration": 30,
        "durationToleranceSec": 2,
        "width": 1280,
        "height": 720,
        "language": "en",
        "subtitles": true
      }
    ]
  },
  {
    "id": "SSO-017",
    "title": "五轮关闭页签后从历史重开",
    "recoveryMode": "reopen-history",
    "steps": [
      {
        "workflow": "compound",
        "prompt": "根据源视频中的英文语音生成英文单语字幕并烧录，同时添加右上角全程可见的文字水印REC-R1；保留原片完整时长、原分辨率1280×720和原英语音轨，只交付一个同时带英文字幕和水印的MP4，不更改配音、剪短视频或画面增强。",
        "kind": "mp4",
        "workflows": [
          "subtitle",
          "text-watermark"
        ],
        "duration": 60.5,
        "width": 1280,
        "height": 720,
        "language": "en",
        "watermark": "REC-R1",
        "position": "top-right",
        "subtitles": true
      },
      {
        "workflow": "compound",
        "prompt": "先把源视频剪成20秒高光，再把本轮高光的分辨率提升2倍至2560×1440，保留选中片段的原英语音轨，只交付一个同时完成高光剪辑和增强的MP4，不增加字幕或水印。",
        "kind": "mp4",
        "workflows": [
          "long-to-short",
          "enhance"
        ],
        "duration": 20,
        "durationToleranceSec": 2,
        "width": 2560,
        "height": 1440,
        "language": "en",
        "subtitles": false
      },
      {
        "workflow": "compound",
        "prompt": "根据源视频中的英文语音生成简体中文单语字幕并烧录，同时添加左上角全程可见的文字水印REC-R3；保留原片完整时长、原分辨率1280×720和原英语音轨，只交付一个同时带简体中文字幕和水印的MP4，不更改配音、剪短视频或画面增强。",
        "kind": "mp4",
        "workflows": [
          "translation",
          "text-watermark"
        ],
        "duration": 60.5,
        "width": 1280,
        "height": 720,
        "language": "zh",
        "watermark": "REC-R3",
        "position": "top-left",
        "subtitles": true
      },
      {
        "workflow": "compound",
        "prompt": "根据源视频中的英文语音生成英文单语字幕并烧录，同时把分辨率提升2倍至2560×1440；保留原片完整时长和原英语音轨，只交付一个同时带英文字幕和增强效果的MP4，不增加水印、不更改配音或剪短视频。",
        "kind": "mp4",
        "workflows": [
          "subtitle",
          "enhance"
        ],
        "duration": 60.5,
        "width": 2560,
        "height": 1440,
        "language": "en",
        "subtitles": true
      },
      {
        "workflow": "compound",
        "prompt": "先把源视频剪成30秒高光，再根据本轮高光中的英文语音生成英文单语字幕并烧录，保留选中片段的原英语音轨和原分辨率1280×720，只交付一个带英文字幕的高光MP4，不增加水印或画面增强。",
        "kind": "mp4",
        "workflows": [
          "long-to-short",
          "subtitle"
        ],
        "duration": 30,
        "durationToleranceSec": 2,
        "width": 1280,
        "height": 720,
        "language": "en",
        "subtitles": true
      }
    ]
  },
  {
    "id": "SSO-018",
    "title": "五轮查看历史后仍处理原片",
    "recoveryMode": "history-view",
    "steps": [
      {
        "workflow": "compound",
        "prompt": "根据源视频中的英文语音生成英文单语字幕并烧录，同时添加右上角全程可见的文字水印REC-R1；保留原片完整时长、原分辨率1280×720和原英语音轨，只交付一个同时带英文字幕和水印的MP4，不更改配音、剪短视频或画面增强。",
        "kind": "mp4",
        "workflows": [
          "subtitle",
          "text-watermark"
        ],
        "duration": 60.5,
        "width": 1280,
        "height": 720,
        "language": "en",
        "watermark": "REC-R1",
        "position": "top-right",
        "subtitles": true
      },
      {
        "workflow": "compound",
        "prompt": "先把源视频剪成20秒高光，再把本轮高光的分辨率提升2倍至2560×1440，保留选中片段的原英语音轨，只交付一个同时完成高光剪辑和增强的MP4，不增加字幕或水印。",
        "kind": "mp4",
        "workflows": [
          "long-to-short",
          "enhance"
        ],
        "duration": 20,
        "durationToleranceSec": 2,
        "width": 2560,
        "height": 1440,
        "language": "en",
        "subtitles": false
      },
      {
        "workflow": "compound",
        "prompt": "根据源视频中的英文语音生成简体中文单语字幕并烧录，同时添加左上角全程可见的文字水印REC-R3；保留原片完整时长、原分辨率1280×720和原英语音轨，只交付一个同时带简体中文字幕和水印的MP4，不更改配音、剪短视频或画面增强。",
        "kind": "mp4",
        "workflows": [
          "translation",
          "text-watermark"
        ],
        "duration": 60.5,
        "width": 1280,
        "height": 720,
        "language": "zh",
        "watermark": "REC-R3",
        "position": "top-left",
        "subtitles": true
      },
      {
        "workflow": "compound",
        "prompt": "根据源视频中的英文语音生成英文单语字幕并烧录，同时把分辨率提升2倍至2560×1440；保留原片完整时长和原英语音轨，只交付一个同时带英文字幕和增强效果的MP4，不增加水印、不更改配音或剪短视频。",
        "kind": "mp4",
        "workflows": [
          "subtitle",
          "enhance"
        ],
        "duration": 60.5,
        "width": 2560,
        "height": 1440,
        "language": "en",
        "subtitles": true
      },
      {
        "workflow": "compound",
        "prompt": "先把源视频剪成30秒高光，再根据本轮高光中的英文语音生成英文单语字幕并烧录，保留选中片段的原英语音轨和原分辨率1280×720，只交付一个带英文字幕的高光MP4，不增加水印或画面增强。",
        "kind": "mp4",
        "workflows": [
          "long-to-short",
          "subtitle"
        ],
        "duration": 30,
        "durationToleranceSec": 2,
        "width": 1280,
        "height": 720,
        "language": "en",
        "subtitles": true
      }
    ]
  }
];
definitions.push(...sourceArtifactCases);
type Download = { id: string; name: string; file: string; sha256: string; sizeBytes: number; durationSec?: number; width?: number; height?: number; cues?: number };
type InputSnapshot = { stepId: string; tool: string; rootStep?: boolean; inputFileIds: string[]; currentOutputIds?: string[]; nodeId?: string; groupId?: string; evidence: "live-poll" | "initial-trace" | "original-runtime-plan" };
type Round = { prompt: string; runIds: string[]; finalStatus?: string; submittedFileIds?: string[]; userFileIds?: string[]; planInputIds?: string[]; inputSnapshots?: InputSnapshot[]; evidencedInputIds?: string[]; producedFileIds?: string[]; downloads: Download[]; error?: string; blockedReason?: string; expectedInputRound?: number; expectedInputId?: string; checks?: string[]; priorObservationErrors?: string[]; recoveryChecks?: SSORecoveryRecord[]; historyChecks?: Array<{round:number;runId:string;fileId:string;sha256:string;unchanged:boolean}> };
type Audit = { caseId: string; inputMode: "plain-text-original" | "plain-text-source-artifact"; startedAt: string; stage: string; headed: true; sourceSha256: string; sourceFileId?: string; sourceName?: string; sourceRegistrationMode?: string; conversationId?: string; setupRunId?: string;
  uploadRequests: number; initialUploadRequests?: number; rounds: Round[]; interactions: unknown[]; issues: string[]; coverageLimits: string[]; outcome?: string; error?: string; executorBuild?: string };
const hash = (bytes: Uint8Array) => createHash("sha256").update(bytes).digest("hex");
function fileIds(value: unknown): string[] { return [...new Set(JSON.stringify(value ?? {}).match(/file_cloud_[\w-]+|file_[a-f0-9]{16,}/g) ?? [])]; }
function clean(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(clean);
  if (!value || typeof value !== "object") return typeof value === "string" ? redactDiagnostic(value) : value;
  return Object.fromEntries(Object.entries(value).filter(([k]) => !/url|token|cookie|authorization/i.test(k)).map(([k,v]) => [k,clean(v)]));
}
function redactDiagnostic(value: string): string {
  return value.replace(/\b(?:cookie|set-cookie|authorization):[^\r\n]*/gi,"[authentication header redacted]")
    .replace(/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g,"[credential redacted]")
    .replace(/https?:\/\/[^\s"'<>]+/g,"[URL redacted]");
}

let context: BrowserContext;
let page: Page;
let unresolvedCompoundRun = "";
test.beforeAll(async ({ browser }) => {
  context = await browser.newContext({ storageState: optionalStorageState(), viewport: { width: 1440, height: 1000 } });
  page = await context.newPage();
});
test.afterAll(async () => {
  if (!context) return;
  const cookies = await context.cookies().catch(() => []);
  if (cookies.some(c => c.domain.includes("cinlink.ai") && c.httpOnly && c.secure && /access_token|refresh_token/.test(c.name))) {
    await context.storageState({ path: credentials.storageStatePath });
  }
  await context.close();
});

for (const definition of definitions) test(`${definition.id} ${definition.title}`, async ({}, info) => {
  const mixed = Boolean(definition.mixedSources);
  if(definition.recoveryMode || mixed)context.setDefaultTimeout(30_000);
  const compound = mixed || definition.steps.some(s => s.workflow === "compound");
  if (compound) {
    test.setTimeout(90 * 60_000);
    test.skip(Boolean(unresolvedCompoundRun), `前例任务${unresolvedCompoundRun}尚未确认终态，停止后续提交避免并发`);
    // Playwright replaces the worker after failure. Persisted checkpoints must
    // also guard the next worker; a module variable alone cannot prevent overlap.
    const auditDir=process.env.CINLINK_SSO_CHECKPOINT_DIR;
    if(auditDir) for(const file of await readdir(auditDir).catch(()=>[])) {
      if(!/^SSO-\d{3}\.json$/.test(file))continue;
      const peer=await readFile(path.join(auditDir,file),"utf8").then(JSON.parse).catch(()=>null) as Audit|null;
      if(!peer?.setupRunId)continue;
      if(peer.caseId===definition.id) {
        test.skip(process.env.CINLINK_SSO_RESUME!=="1","本例已受理任务，须接原检查点续跑，不得重复新建");
        continue;
      }
      const pending=peer.rounds.find(r=>r.runIds.some(Boolean)&&!['done','failed','cancelled','canceled'].includes(r.finalStatus??""));
      test.skip(Boolean(pending)||(peer.outcome==="failed"&&!peer.rounds.length),`前例${peer.caseId}受理任务终态未核实，须先接原run恢复`);
    }
  }
  const sourceBytes = await readFile(sourcePath);
  const checkpointDir = process.env.CINLINK_SSO_CHECKPOINT_DIR ?? info.outputDir;
  await mkdir(checkpointDir, { recursive: true });
  const checkpoint = path.join(checkpointDir, `${definition.id}.json`);
  const prior = process.env.CINLINK_SSO_RESUME === "1" ? await readFile(checkpoint, "utf8").then(JSON.parse).catch(() => null) as Audit | null : null;
  const inputMode = mixed ? "plain-text-source-artifact" : "plain-text-original";
  let audit: Audit = prior ?? { caseId: definition.id, inputMode, startedAt: new Date().toISOString(), stage: "open-workspace", headed: true, sourceSha256: hash(sourceBytes), uploadRequests: 0,
    ...(compound?{executorBuild:"compound-history-batch-v5"}:{}), rounds: [], interactions: [], issues: [], coverageLimits: ["脚本验证无@提交、实际计划来源、状态、下载、媒体/SRT结构与语言特征；画面水印位置/旧水印残留、语义翻译准确性另用原始产物帧和字幕核验，不能仅由脚本passed推断完整业务通过。"] };
  expect(audit.caseId).toBe(definition.id);
  expect(audit.inputMode, "检查点来源模式必须与当前用例一致").toBe(inputMode);
  expect(audit.sourceSha256, "恢复时原始视频必须相同").toBe(hash(sourceBytes));
  audit.issues = []; delete audit.error; delete audit.outcome;
  let activeRun = "";
  let currentRound: Round | undefined;
  let expectedInput = { id: "", name: "", durationSec: 60.5 };
  let recovery: SSOSessionRecovery | undefined;
  let observedTurnRequests=0;
  const originalPlansSaved = new Set<string>();
  const submissionURLPattern=/\/(?:studio-api\/)?v1\/agent\/runs(?:\?|$)|\/runtime-api\/v1\/conversations\/[^/]+\/turns(?:\?|$)/;
  const submissionGuard = async (route: import("@playwright/test").Route) => {
    const request=route.request();
    if((definition.recoveryMode || mixed) && audit.conversationId && isRunSubmission(request.url(),request.method())) {
      const pathId=new URL(request.url()).pathname.match(/\/conversations\/([^/]+)\/turns$/)?.[1];
      const body=request.postDataJSON();
      const target=pathId ?? findStringField(body,"conversation_id");
      if(target!==audit.conversationId) {
        audit.interactions.push({at:new Date().toISOString(),blockedSubmission:true,expectedConversationId:audit.conversationId,actualConversationId:target??null});
        await save();await route.abort("blockedbyclient");return;
      }
    }
    await route.continue();
  };
  const pending = new Set<Promise<unknown>>();
  const save = async () => {
    const body = JSON.stringify(clean(audit), null, 2);
    await writeFile(checkpoint, body);
    await writeFile(info.outputPath(`${definition.id}.json`), body);
  };
  const shot = async (name: string) => {
    // Use a bounded capture; raw traces remain available if the page cannot render.
    await page.screenshot({ path: info.outputPath(name), fullPage: true, timeout: 15_000 });
  };
  const listener = (response: import("@playwright/test").Response) => {
    const task = (async () => {
      const request = response.request();
      if (request.method() !== "POST") return;
      if(isRunSubmission(response.url(),request.method()))observedTurnRequests++;
      if (/\/agent\/files\/(multipart\/)?complete(?:\?|$)/.test(response.url()) && response.ok()) {
        const body = await response.json().catch(() => null);
        audit.uploadRequests++;
        if (!audit.sourceFileId) { audit.sourceFileId = findStringField(body, "file_id") ?? findStringField(body, "cloud_file_id"); audit.sourceName = findStringField(body, "name"); }
      }
      if (isRunSubmission(response.url(), request.method()) && currentRound) {
        currentRound.submittedFileIds = fileIds(request.postDataJSON());
      }
      if (/\/(confirmations|clarifications)(?:\/|$)/.test(response.url())) {
        audit.interactions.push({ at: new Date().toISOString(), round: audit.rounds.indexOf(currentRound!) + 1, path: new URL(response.url()).pathname, status: response.status(), answer: clean(request.postDataJSON()) });
      }
    })();
    pending.add(task); void task.finally(() => pending.delete(task));
  };
  page.on("response", listener);
  let sessionRefreshInFlight:Promise<boolean>|undefined;
  const refreshReadbackSession=async():Promise<boolean>=>{
    if(sessionRefreshInFlight)return sessionRefreshInFlight;
    const refresh=(async()=>{
      const response=await page.request.post(`${targets.studioBase}/platform-api/v1/auth/refresh`,{headers:{"Content-Type":"application/json"},data:{},timeout:30_000});
      audit.interactions.push({round:currentRound?audit.rounds.indexOf(currentRound)+1:0,kind:"readback-session-refresh",path:"/platform-api/v1/auth/refresh",status:response.status(),at:new Date().toISOString()});
      await save();
      if(response.ok())await context.storageState({path:credentials.storageStatePath});
      return response.ok();
    })();
    sessionRefreshInFlight=refresh;
    try{return await refresh;}finally{if(sessionRefreshInFlight===refresh)sessionRefreshInFlight=undefined;}
  };
  const readRun = async (runId: string): Promise<unknown> => {
    const detail=await getRunDetail(page,runId) as Record<string,any>|null;
    if(!compound||!audit.conversationId) return detail;
    if(detail?.status && !(detail.artifacts??[]).some((a:any)=>!a.url)) return detail;
    // Match the product's refreshBrowserSession flow for readbacks only.
    // Never replay an AI submission or treat HTTP 401 as a missing old artifact.
    const probe=await page.request.get(`${targets.studioBase}/runtime-api/v1/conversations/${encodeURIComponent(audit.conversationId)}/messages?limit=200`,{timeout:30_000});
    if(probe.status()!==401) return detail;
    if(!await refreshReadbackSession()) return detail;
    return getRunDetail(page,runId);
  };
  const restoreSession=async(phase:string,runId:string)=>{
    const record:SSORecoveryRecord={mode:definition.recoveryMode!,phase,round:audit.rounds.indexOf(currentRound!)+1,startedAt:new Date().toISOString(),covered:false,turnRequestsBefore:observedTurnRequests};
    (currentRound!.recoveryChecks??=[]).push(record);await save();
    await recovery!.restore(record,runId);
    if(record.phase!=="awaiting-running")expect.soft(record.covered,record.error??"指定恢复触发必须完成").toBe(true);
  };
  const viewHistory=async(phase:string,indices:number[])=>{
    const record:SSORecoveryRecord={mode:"history-view",phase,round:audit.rounds.indexOf(currentRound!)+1,startedAt:new Date().toISOString(),covered:false,turnRequestsBefore:observedTurnRequests};
    (currentRound!.recoveryChecks??=[]).push(record);await save();
    await recovery!.viewHistory(record,audit.rounds,indices);
  };
  const settle = async (id: string, step: Step | undefined, label: string) => {
    let run = id;
    let interactions = 0;
    const deadline = Date.now() + (compound ? 30 : 20) * 60_000;
    let lastStatus = "";
    while (Date.now() < deadline) {
      activeRun = run;
      const detail = await readRun(run) as Record<string, any> | null;
      const status = String(detail?.status ?? "");
      if (compound && currentRound && Array.isArray(detail?.plan) && detail.plan.length && !originalPlansSaved.has(run)) {
        const originalResponse = await page.request.get(`${targets.studioBase}/runtime-api/v2/agent/runs/${encodeURIComponent(run)}`, { timeout: 30_000 });
        if (originalResponse.ok()) {
          const original = await originalResponse.json();
          if (original.run_id === run && original.conversation_id === audit.conversationId && Array.isArray(original.plan_detail) && original.plan_detail.length) {
            await writeFile(info.outputPath(`${label}-${run}-original-plan.json`), JSON.stringify(clean(original), null, 2));
            originalPlansSaved.add(run);
          }
        }
      }
      // Execution updates input_media_context in place with output files. Retain
      // the running tool's inputs before that mutation, including on resumed runs.
      if (currentRound && step && Array.isArray(detail?.plan)) {
        currentRound.inputSnapshots ??= [];
        for (const node of detail.plan.filter((node: any) => node.status === "running")) {
          const snapshot: InputSnapshot = { stepId: String(node.step_id ?? ""), tool: String(node.tool ?? node.tool_name ?? ""), rootStep: node === detail.plan[0],
            inputFileIds: fileIds({ arguments: node.arguments, resource_inputs: node.resource_inputs, input_media_context: node.input_media_context }),
            ...(compound ? { currentOutputIds: fileIds(detail.plan.filter((n: any) => n.status === "done").map((n: any) => n.result_files)), nodeId: String(node.node_id ?? ""), groupId: String(node.group_id ?? "") } : {}), evidence: "live-poll" };
          if (!currentRound.inputSnapshots.some(s => JSON.stringify(s) === JSON.stringify(snapshot))) currentRound.inputSnapshots.push(snapshot);
        }
        await save();
      }
      if (status !== lastStatus) { console.log(`${definition.id} ${label}: ${status || "waiting"} (${run})`); lastStatus = status; await save(); }
      if(step && definition.recoveryMode==="during-refresh" && status==="running" && !currentRound?.recoveryChecks?.some(r=>r.phase==="during-run")) {
        await restoreSession("during-run",run);continue;
      }
      if (["done", "failed", "cancelled", "canceled"].includes(status)) {
        if (currentRound) currentRound.finalStatus = status;
        await writeFile(info.outputPath(`${label}-server-state.json`),JSON.stringify(clean(detail),null,2));
        await save();
        if(step && definition.recoveryMode==="during-refresh" && !currentRound?.recoveryChecks?.some(r=>r.phase==="during-run")) {
          (currentRound!.recoveryChecks??=[]).push({mode:"during-refresh",phase:"during-run",round:audit.rounds.indexOf(currentRound!)+1,startedAt:new Date().toISOString(),completedAt:new Date().toISOString(),covered:false,triggerStatus:status,turnRequestsBefore:observedTurnRequests,error:"任务已终态，运行中刷新未覆盖；不重发"});
          await save();expect.soft(false,"本轮未实际在running时刷新，不能计恢复通过").toBe(true);
        }
        if (status !== "done") await shot(`${label}-failed.png`);
        expect(status, `${label}任务未完成：${JSON.stringify(clean(detail?.error))}`).toBe("done");
        return { run, detail: detail! };
      }
      if (status === "requires_user_input") {
        expect(++interactions, "补槽/确认轮次超过8次").toBeLessThanOrEqual(8);
        const raw = detail?.messages?.filter((m: any) => m.role === "assistant").at(-1)?.status;
        if (raw === "waiting_for_clarification") {
          audit.interactions.push({ round: audit.rounds.indexOf(currentRound!) + 1, questions: clean(detail?.clarifications) });
          const values = { duration: String(step?.duration ?? 60.5), source: "en", target: step?.language === "zh" ? "zh-Hans" : step?.language ?? "en",
            watermark: step?.watermark ?? "", position: step?.position ?? "", width: String(step?.width ?? 1280), height: String(step?.height ?? 720) };
          for (const input of await page.locator('input:visible:not([type="file"]):not([type="password"]):not([type="search"]), textarea:visible').all()) {
            const facts = await input.evaluate(el => { const f=el as HTMLInputElement; return { name: [f.name,f.id,f.placeholder,...Array.from(f.labels ?? []).map(l=>l.textContent)].join(" "), readOnly:f.readOnly }; });
            if (facts.readOnly || !await input.isEditable() || /search|email|password/i.test(facts.name)) continue;
            let value: string | undefined;
            if (/duration|时长|秒/i.test(facts.name)) value=values.duration;
            else if (/width|宽度/i.test(facts.name)) value=values.width;
            else if (/height|高度/i.test(facts.name)) value=values.height;
            else if (/resolution|分辨率/i.test(facts.name)) value=values.width+"x"+values.height;
            else if (/scale|倍率|倍数/i.test(facts.name)) value=step?.workflow==="enhance"||step?.workflows?.includes("enhance")?"2":"1";
            else if (/language|语言|语种/i.test(facts.name)) value=/source|源/i.test(facts.name)?values.source:values.target;
            else if (/position|位置/i.test(facts.name)) value=values.position;
            else if (/watermark|水印|text|文字/i.test(facts.name)) value=values.watermark;
            if (value !== undefined) { await input.fill(value); audit.interactions.push({ field:facts.name,value }); }
          }
          for (const select of await page.locator("select:visible").all()) {
            const options = await select.locator("option").evaluateAll(items=>items.map(el=>({value:(el as HTMLOptionElement).value,label:el.textContent??""})));
            const material = options.filter(o=>/file_cloud_|\.mp4|\.srt/i.test(o.value+o.label));
            if (material.length) {
              const targetId = mixed ? expectedInput.id : audit.sourceFileId;
              const targetName = mixed ? expectedInput.name : audit.sourceName;
              const named = material.filter(o=>Boolean(targetName)&&o.label.includes(targetName!));
              const original = material.find(o=>o.value===targetId || o.label.includes(targetId!)) ?? (named.length===1 ? named[0] : undefined);
              expect(original, "补槽必须选择本轮指定输入，不能回退F或默认其他产物").toBeTruthy();
              await select.selectOption(original!.value);
            } else if (compound) {
              const facts = await select.evaluate(el => { const f=el as HTMLSelectElement; return [f.name,f.id,...Array.from(f.labels??[]).map(l=>l.textContent)].join(" "); });
              const requested = /source|源语言/i.test(facts) ? values.source : /language|语言|语种/i.test(facts) ? values.target : /position|位置/i.test(facts) ? values.position : /scale|倍率|倍数/i.test(facts) ? step?.workflows?.includes("enhance")?"2":"1" : undefined;
              if (requested) {
                const aliases: Record<string,string[]> = {"zh-Hans":["zh-Hans","zh","中文","简体中文","普通话"],en:["en","英文","英语","English"],ja:["ja","日语","日文","Japanese"],ko:["ko","韩语","韩文","Korean"],fr:["fr","法语","法文","French"],es:["es","西班牙语","西班牙文","Spanish"],"top-right":["top-right","右上","右上角"],"top-left":["top-left","左上","左上角"],"bottom-right":["bottom-right","右下","右下角"],"bottom-left":["bottom-left","左下","左下角"],center:["center","中央","居中"]};
                const option=options.find(o=>o.value===requested)??options.find(o=>(aliases[requested]??[requested]).some(a=>o.label.toLowerCase()===a.toLowerCase()));
                if(option) { await select.selectOption(option.value); audit.interactions.push({field:facts,value:option.value}); }
              }
            }
          }
        }
        await shot(`${label}-interaction-${interactions}.png`); await save();
        const next = await confirmRenderPlan(page, { allowClarification: true });
        if (next) { run=next; if (currentRound && !currentRound.runIds.includes(next)) currentRound.runIds.push(next); }
      }
      await page.waitForTimeout(5_000);
    }
    throw new Error(`${label}任务${compound ? 30 : 20}分钟未收敛：${run}`);
  };
  try {
    if(definition.recoveryMode || mixed)await context.route(submissionURLPattern,submissionGuard);
    if (prior?.conversationId && prior.setupRunId) {
      restoreRunConversation(prior.setupRunId, prior.conversationId);
      for (const round of prior.rounds) for (const run of round.runIds.filter(Boolean)) restoreRunConversation(run, prior.conversationId);
      await page.goto(`${targets.studioBase}/c/${prior.conversationId}`, { waitUntil: "domcontentloaded" });
      await page.locator("#workspace-prompt").waitFor({ state: "visible", timeout: 45_000 }).catch(async error=>{
        if(process.env.CINLINK_SSO_ALLOW_LOGIN_WAIT!=="1")throw error;
        console.log(`${definition.id}: awaiting login in the current browser window`);
        await page.locator("#workspace-prompt").waitFor({state:"visible",timeout:300_000});
        await page.goto(`${targets.studioBase}/c/${prior.conversationId}`,{waitUntil:"domcontentloaded"});
        await page.locator("#workspace-prompt").waitFor({state:"visible",timeout:45_000});
      });
      // A rejected HTTP submission has no run. Reconcile the conversation
      // before clearing that empty ID, including any client-side auth retry.
      for(const round of audit.rounds.filter(r=>r.runIds.some(id=>!id))) {
        expect(round.error,"仅允许恢复明确的401拒绝，不能猜测未知提交结果").toContain("401");
        const listing=await page.request.get(`${targets.studioBase}/runtime-api/v1/conversations/${audit.conversationId}/messages?limit=200`,{timeout:30_000});
        expect(listing.ok(),"恢复后必须先能回读服务端会话").toBe(true);
        const body=await listing.json();
        const known=new Set([audit.setupRunId,...audit.rounds.flatMap(r=>r.runIds)].filter(Boolean));
        const accepted=(body.messages??[]).filter((m:any)=>m.role==="user" && m.job_id && !known.has(m.job_id) && String(m.text??m.content_text??m.content??"").trim()===round.prompt);
        expect(accepted.length,"拒绝后最多只能发现一个已受理任务").toBeLessThanOrEqual(1);
        audit.interactions.push({round:audit.rounds.indexOf(round)+1,rejectedSubmissionHttpStatus:401,originalError:round.error,reconciledAcceptedRunIds:accepted.map((m:any)=>m.job_id),at:new Date().toISOString()});
        round.runIds=accepted.map((m:any)=>String(m.job_id));
        for(const run of round.runIds)restoreRunConversation(run,audit.conversationId!);
        delete round.error;await save();
      }
    } else {
      await openWorkspaceSession(page).catch(async error=>{
        const text=await page.locator("body").innerText().catch(()=>"");
        if(!(definition.recoveryMode || mixed) || process.env.CINLINK_SSO_ALLOW_LOGIN_WAIT!=="1" || !/登录|sign in|log in|使用其他方式/i.test(text))throw error;
        console.log(`${definition.id}: awaiting login in the current browser window`);
        await page.locator("#workspace-prompt").waitFor({state:"visible",timeout:300_000});
      });
      // Wait for the live sidebar, then select its real React action. A hidden
      // legacy composer/input can coexist with the currently displayed one.
      const fresh = page.locator('[data-react-new-session="non-project"]');
      await fresh.waitFor({ state: "attached", timeout: 30_000 });
      await fresh.evaluate((el: HTMLElement) => el.click());
      await expect(page.locator("#workspace-prompt")).toHaveText("");
      await expect.poll(() => new URL(page.url()).searchParams.get("project_id"), { timeout: 20_000 }).toBeNull();
      await expect(page.getByRole("article")).toHaveCount(0);
      audit.stage = "register-source"; await save();
      const inputs = page.locator('input[type="file"]');
      let inputIndex = -1;
      for(let i=0;i<await inputs.count();i++) {
        if(await inputs.nth(i).evaluate(el=>{const parent=el.closest('.workspace-media-strip'); return Boolean(parent&&parent.getBoundingClientRect().width>0&&!parent.classList.contains('is-read-only'));})) inputIndex=i;
      }
      expect(inputIndex,"必须使用当前可见composer的文件输入框").toBeGreaterThanOrEqual(0);
      await inputs.nth(inputIndex).setInputFiles(sourcePath);
      await expect(page.locator('.workspace-media-thumb')).toHaveCount(1, { timeout: 30_000 });
      await appendPromptText(page, "保存我上传的原始视频供本会话后续处理，本条只登记素材，不执行剪辑、字幕或增强任务。");
      const submitted = await submitCurrentPrompt(page);
      audit.setupRunId = submitted.runId; audit.conversationId = conversationForRun(submitted.runId);
      await Promise.allSettled([...pending]); await save();
      expect(submitted.httpStatus).toBeLessThan(300); expect(submitted.runId).not.toBe("");
    }
    const setup = await settle(audit.setupRunId!, undefined, "setup");
    const setupFiles = Array.isArray(setup.detail.context_files) ? setup.detail.context_files : [];
    expect(setupFiles,"素材登记消息必须只关联一个原片").toHaveLength(1);
    audit.sourceFileId ??= String(setupFiles[0].file_id ?? "");
    audit.sourceName ??= String(setupFiles[0].name ?? "");
    expect(audit.sourceFileId, "登记必须取得真实F的file_id").toBeTruthy();
    expect(audit.sourceName, "登记必须取得云端保存名").toBeTruthy();
    audit.initialUploadRequests ??= audit.uploadRequests;
    expect(audit.initialUploadRequests, "不允许重复上传原视频").toBeLessThanOrEqual(1);
    audit.sourceRegistrationMode = audit.initialUploadRequests === 0 ? "UI attached local file; existing cloud file reused; SHA-256 verification required" : "UI uploaded local file once";
    // Validate that F refers to the exact uploaded local file, rather than a generated video.
    const sourceUrl = await page.request.get(`${targets.studioBase}/studio-api/v1/agent/files/${encodeURIComponent(audit.sourceFileId!)}/url?disposition=inline`);
    expect(sourceUrl.ok()).toBe(true);
    const sourcePayload = await sourceUrl.json();
    const sourceResponse = await page.request.get(findStringField(sourcePayload,"url")!, { timeout:300_000, maxRetries:2 });
    expect(sourceResponse.ok()).toBe(true); expect(hash(await sourceResponse.body())).toBe(audit.sourceSha256);
    if(definition.recoveryMode)recovery=new SSOSessionRecovery({baseURL:targets.studioBase,conversationId:audit.conversationId!,sourceFileId:audit.sourceFileId!,setupRunId:audit.setupRunId!,context,
      page:()=>page,replacePage:(next)=>{page.off("response",listener);page=next;page.on("response",listener);},turnRequests:()=>observedTurnRequests,
      refreshSession:refreshReadbackSession,shot,save});
    const startRound=Number(process.env.CINLINK_SSO_FROM_ROUND??1);
    expect(Number.isInteger(startRound)&&startRound>=1&&startRound<=definition.steps.length).toBe(true);
    if(startRound>1) {
      expect(prior,"指定续跑轮次必须提供原检查点").toBeTruthy();
      for(const previous of audit.rounds.slice(0,startRound-1)) {
        if(definition.recoveryMode && previous.finalStatus==="failed") {
          const failed=await readRun(previous.runIds.at(-1)!) as {status?:string};
          expect(failed.status).toBe("failed");expect(previous.downloads).toHaveLength(0);
          continue; // Retain a confirmed failed turn without submitting it again.
        }
        expect(previous.finalStatus).toBe("done");expect(previous.error).toBeUndefined();
        expect(previous.evidencedInputIds).toContain(mixed ? previous.expectedInputId : audit.sourceFileId);expect(previous.downloads).toHaveLength(1);
        for(const file of previous.downloads)expect(hash(await readFile(file.file))).toBe(file.sha256);
      }
      console.log(`${definition.id}: resuming round ${startRound}; earlier validated rounds retained without new submissions`);
    }
    for (let index=startRound-1; index<definition.steps.length; index++) {
      let step=definition.steps[index]; const label=`round-${index+1}`;
      const prompt=step.prompt;
      currentRound=audit.rounds[index] ?? { prompt,runIds:[],downloads:[] };
      audit.rounds[index]=currentRound;
      if (mixed) {
        const resolved = resolveRoundInput(step.inputRound ?? 0, index + 1,
          { id: audit.sourceFileId!, name: audit.sourceName!, durationSec: 60.5 }, audit.rounds);
        currentRound.expectedInputRound = step.inputRound ?? 0;
        if (!resolved.video) {
          currentRound.blockedReason = resolved.blockedReason;
          audit.stage = `${label}-dependency-blocked`; await shot(`${label}-blocked.png`); await save();
          console.log(`${definition.id} ${label}: blocked (${resolved.blockedReason})`);
          continue;
        }
        expectedInput = { ...resolved.video, durationSec: resolved.video.durationSec ?? 60.5 };
        currentRound.expectedInputId = expectedInput.id;
        // Artifact-preserving operations compare with the actual input duration,
        // not the nominal 20-second target of an earlier highlight request.
        if ((step.inputRound ?? 0) > 0) step = { ...step, duration: expectedInput.durationSec, durationToleranceSec: 0.5 };
      }
      if (compound && prior && !currentRound.runIds.length && currentRound.error?.startsWith("page.screenshot:")) {
        // This capture occurs before submitCurrentPrompt. Preserve the old
        // observation failure while retrying only the never-submitted round.
        (currentRound.priorObservationErrors ??= []).push(currentRound.error);
        delete currentRound.error;
      }
      if (prior && currentRound.runIds.length) {
        // Keep the actual prompt of an already submitted task when resuming after
        // the user removed its shared header. Never prepend that header again.
        expect(currentRound.prompt.endsWith(prompt),"已提交任务的工作流正文必须一致").toBe(true);
      } else {
        expect(currentRound.prompt,"未提交轮次必须使用当前完整正文").toBe(prompt);
      }
      audit.stage=`${label}-plain-text-original`; await save();
      const roundErrorCount=info.errors.length;
      try {
      if(definition.recoveryMode || mixed)await expect.poll(()=>new URL(page.url()).pathname,{timeout:45_000,message:"本轮提交前必须仍在原会话S，不能在恢复失败后误发到其他会话"}).toBe(`/c/${audit.conversationId}`);
      if(definition.recoveryMode==="history-view" && index>0 && !currentRound.recoveryChecks?.some(r=>r.phase==="before-submit"&&r.covered)) {
        await viewHistory("before-submit",[...new Set([0,index-1])]);
      }
      if (!currentRound.runIds.length) {
        await expect.poll(async()=>{
          const send=page.locator("#workspace-send");
          const name=[await send.getAttribute("aria-label"),await send.getAttribute("title")].join(" ");
          return /send|发送|submit|提交/i.test(name)&&!/stop|停止|cancel|取消/i.test(name);
        },{ timeout:30_000,message:"必须等发送按钮恢复，不能误点Stop" }).toBe(true);
        const editor=page.locator("#workspace-prompt");
        if(prior && (await editor.innerText()).trim()===prompt)await editor.fill("");
        await expect(editor).toHaveText("");
        await appendPromptText(page,prompt);
        await expect(editor.locator('[contenteditable="false"]'), "本轮必须纯文本提交，不插入@引用标签").toHaveCount(0);
        await shot(`${label}-before-submit.png`);
        const submitted=await submitCurrentPrompt(page); currentRound.runIds.push(submitted.runId);
        await Promise.allSettled([...pending]); await save();
        expect(submitted.httpStatus).toBeLessThan(300); expect(submitted.runId).not.toBe("");
        expect(conversationForRun(submitted.runId)).toBe(audit.conversationId);
      }
      audit.stage=`${label}-wait`; await save();
      const {run,detail}=await settle(currentRound.runIds.at(-1)!,step,label);
      currentRound.finalStatus=String(detail.status);
      currentRound.userFileIds=fileIds(detail.context_files);
      const plan=Array.isArray(detail.plan)?detail.plan:[];
      if(compound) currentRound.producedFileIds=fileIds(plan.map((node:any)=>node.result_files));
      currentRound.planInputIds=fileIds(plan.map((node:any)=>({ arguments:node.arguments,resource_inputs:node.resource_inputs,input_media_context:node.input_media_context })));
      currentRound.evidencedInputIds=[...new Set([...currentRound.planInputIds, ...(currentRound.inputSnapshots ?? []).flatMap(s => s.inputFileIds)])];
      // The journal replaces completed tool inputs with result files. If polling
      // missed execution, the run endpoint retains the original plan binding.
      const expectedSourceId = mixed ? expectedInput.id : audit.sourceFileId!;
      if (mixed || !currentRound.evidencedInputIds.includes(expectedSourceId)) {
        const originalResponse=await page.request.get(`${targets.studioBase}/runtime-api/v2/agent/runs/${encodeURIComponent(run)}`,{timeout:30_000});
        if(originalResponse.ok()) {
          const original=await originalResponse.json();
          const root=Array.isArray(original.plan_detail)?original.plan_detail[0]:undefined;
          if(original.run_id===run && original.conversation_id===audit.conversationId && root?.step_id===plan[0]?.step_id && root?.tool===plan[0]?.tool) {
            const snapshot:InputSnapshot={stepId:String(root.step_id),tool:String(root.tool),rootStep:true,
              inputFileIds:fileIds({arguments:root.arguments,resource_inputs:root.resource_inputs,input_media_context:root.input_media_context}),evidence:"original-runtime-plan"};
            (currentRound.inputSnapshots ??= []).push(snapshot);
            currentRound.evidencedInputIds=[...new Set([...currentRound.evidencedInputIds,...snapshot.inputFileIds])];
            await writeFile(info.outputPath(`${label}-original-input-plan.json`),JSON.stringify(clean({run_id:run,conversation_id:original.conversation_id,original_node:root}),null,2));
            await save();
          }
        }
      }
      if(mixed)expect.soft((currentRound.inputSnapshots??[]).filter(s=>s.rootStep).flatMap(s=>s.inputFileIds), "必须在根工具输入核实本轮指定F或产物，不能只证明共同原片祖先").toContain(expectedSourceId);
      else expect(currentRound.evidencedInputIds, "须从运行时输入或保留的计划输入核实源视频F，不能仅凭助手说明判来源通过").toContain(audit.sourceFileId);
      const previousIds=[...(mixed?[audit.sourceFileId!]:[]),...audit.rounds.slice(0,index).flatMap(r=>[...r.downloads.map(d=>d.id),...(compound?r.producedFileIds??[]:[])])].filter(id=>id!==expectedSourceId);
      // Inspect the root tool's actual inputs. Terminal contexts contain outputs,
      // which may legitimately have the same IDs as historical cached results.
      const rootInputs=fileIds({arguments:plan[0]?.arguments,resource_inputs:plan[0]?.resource_inputs});
      const lineage=auditSourceLineage(currentRound.inputSnapshots??[],previousIds,expectedSourceId,rootInputs);
      const wrong=lineage.wrongRootInputIds;
      expect.soft(wrong, "本轮根步骤不得使用指定输入之外的原片/历史交付物").toEqual([]);
      if (compound) {
        // A historical cached ID is allowed only after a current step has
        // produced/bound it. Inspect every observed running branch, not just root.
        const staleInputs=lineage.staleInputs;
        await writeFile(info.outputPath(`${label}-branch-source-check.json`),JSON.stringify({sourceFileId:audit.sourceFileId,expectedInputId:expectedSourceId,expectedInputRound:step.inputRound??0,observedSnapshots:currentRound.inputSnapshots,staleInputs,coverage:"Running branch snapshots plus retained original plan; final lineage/content review still required."},null,2));
        expect.soft(staleInputs,"本轮任一运行分支不得未经当前链路生成而直接使用历史交付物").toEqual([]);
      }
      await writeFile(info.outputPath(`${label}-server-state.json`),JSON.stringify(clean(detail),null,2));
      const artifacts=extractArtifacts(detail).filter(a=>new RegExp(`\\.${step.kind}$`,"i").test(a.name));
      expect(artifacts, "当前轮次缺少指定交付物，不能用历史产物替代").toHaveLength(1);
      currentRound.downloads=[];
      for (const artifact of artifacts) {
        const response=await page.request.get(artifact.url,{ timeout:300_000, maxRetries:2 });
        expect(response.ok()).toBe(true); const bytes=await response.body(); expect(bytes.length).toBeGreaterThan(0);
        const file=info.outputPath(`${label}-${artifact.id}.${step.kind}`); await writeFile(file,bytes);
        const download:Download={id:artifact.id,name:artifact.name,file,sha256:hash(bytes),sizeBytes:bytes.length};
        currentRound.downloads.push(download); await save();
        if(step.kind==="mp4") {
          const media=await probeMedia(file,targets.ffprobePath); download.durationSec=media.durationSec; download.width=media.video?.width; download.height=media.video?.height;
          const checked=checkMedia(media,{requireVideo:true,requireAudio:true,durationSec:step.duration,durationToleranceSec:step.durationToleranceSec??(step.workflow==="long-to-short"?2:0.5),width:step.width,height:step.height});
          expect.soft(checked.ok,checked.failures.join("\n")).toBe(true);
          for(const [name,time] of [["start",0.5],["middle",media.durationSec/2],["end",Math.max(0.5,media.durationSec-0.5)]] as const) {
            await execFileAsync("ffmpeg",["-hide_banner","-loglevel","error","-y","-ss",String(time),"-i",file,"-frames:v","1",info.outputPath(`${label}-${name}.png`)],{timeout:60_000});
          }
        } else {
          const checked=checkSrtStructure(bytes.toString("utf8"),{sourceBytes:bytes});
          download.cues=checked.cues.length;
          expect.soft(checked.ok,checked.failures.join("\n")).toBe(true);
          expect.soft(Math.max(...checked.cues.map(c=>c.endMs)),"字幕不得超过原片时间轴").toBeLessThanOrEqual(61_000);
          const text=checked.cues.map(c=>c.text).join(" ");
          const language=step.language==="ja"?/[\u3040-\u30ff]/.test(text):step.language==="zh"?/[\u4e00-\u9fff]/.test(text)&&!/[\u3040-\u30ff]/.test(text):/[a-z]{3}/i.test(text);
          expect.soft(language,`字幕缺少目标语言特征：${step.language}`).toBe(true);
        }
      }
      expect(audit.uploadRequests,"后续各轮不能重新上传原视频").toBe(audit.initialUploadRequests);
      await shot(`${label}-final.png`); await save();
      if((definition.recoveryMode==="after-refresh"||definition.recoveryMode==="reopen-history") && !currentRound.recoveryChecks?.some(r=>r.phase==="after-complete"&&r.covered))await restoreSession("after-complete",run);
      if(definition.recoveryMode==="history-view" && index===definition.steps.length-1)await viewHistory("after-final",audit.rounds.map((_,i)=>i));
      if(compound)currentRound.historyChecks=[];
      const verifyPrevious=async(previousRound:Round,previousIndex:number)=>{
        const oldRun=previousRound.runIds.at(-1)!;
        const oldArtifacts=extractArtifacts(await readRun(oldRun));
        for(const old of previousRound.downloads) {
          const found=oldArtifacts.find(a=>a.id===old.id); expect(found,"历史产物必须保留").toBeTruthy();
          const response=await page.request.get(found!.url,{timeout:300_000,maxRetries:2});expect(response.ok()).toBe(true);
          const actualHash=hash(await response.body());
          if(compound)currentRound!.historyChecks!.push({round:previousIndex+1,runId:oldRun,fileId:old.id,sha256:actualHash,unchanged:actualHash===old.sha256});
          expect(actualHash,"新轮次不得覆盖任一历史文件内容").toBe(old.sha256);
        }
      };
      if(compound){
        // Only independent read-only history downloads are batched. All checks
        // settle before the next business turn; workers/retries remain 1/0.
        const results=await Promise.allSettled(audit.rounds.slice(0,index+(definition.recoveryMode?1:0)).map(verifyPrevious));
        currentRound.historyChecks!.sort((a,b)=>a.round-b.round);
        await save();
        const failed=results.find((r):r is PromiseRejectedResult=>r.status==='rejected');
        if(failed)throw failed.reason;
      }else{
        for(const[previousIndex,previousRound]of audit.rounds.slice(0,index).entries())await verifyPrevious(previousRound,previousIndex);
      }
      if (info.errors.length>roundErrorCount) await shot(`${label}-failed-checks.png`).catch(()=>undefined);
      currentRound.checks = info.errors.slice(roundErrorCount).map(e=>redactDiagnostic(e.message??"assertion failed")); await save();
      console.log(`${definition.id} ${label}: verified artifacts (${run})`);
      } catch (error) {
        currentRound.error=redactDiagnostic(error instanceof Error?error.message:String(error));
        currentRound.checks=info.errors.slice(roundErrorCount).map(e=>redactDiagnostic(e.message??"assertion failed"));
        await shot(`${label}-failure.png`).catch(()=>undefined); await save();
        // Independent rounds may continue after a terminal product failure. A
        // nonterminal/unknown task must stop here to avoid overlapping real jobs.
        if (!currentRound.finalStatus || !["done","failed","cancelled","canceled"].includes(currentRound.finalStatus)) throw error;
        if(definition.recoveryMode && currentRound.recoveryChecks?.some(r=>!r.covered && r.error && r.phase!=="awaiting-running") && currentRound.finalStatus==="done")throw error;
        expect.soft(false, `${definition.id} ${label}: ${currentRound.error}`).toBe(true);
        console.log(`${definition.id} ${label}: failed checks; continuing eligible next round`);
      }
    }
    audit.issues=info.errors.map(e=>redactDiagnostic(e.message??"assertion failed"));
    audit.outcome=audit.issues.length?"failed-assertions":audit.rounds.some(r=>r.blockedReason)?"dependency-blocked":"passed-automated-checks; content-review-pending";
  } catch(error) {
    audit.error=redactDiagnostic(error instanceof Error?error.message:String(error)); audit.outcome="failed";
    await shot("failure.png").catch(()=>undefined); throw error;
  } finally {
    if(definition.recoveryMode || mixed)await context.unroute(submissionURLPattern,submissionGuard);
    page.off("response",listener); await Promise.allSettled([...pending]);
    if(activeRun) { const detail=await readRun(activeRun).catch(()=>null) as any;
      if(compound) {
        if(!detail?.status||!['done','failed','cancelled','canceled'].includes(detail.status)) unresolvedCompoundRun=activeRun;
      } else if(detail?.status&&!['done','failed','cancelled','canceled'].includes(detail.status)) await cancelRun(page,activeRun).catch(()=>false);
    }
    await save();
    await info.attach("SSO audit",{path:info.outputPath(`${definition.id}.json`),contentType:"application/json"});
    const cookies=await context.cookies();
    if(cookies.some(c=>c.domain.includes("cinlink.ai")&&c.httpOnly&&c.secure&&/access_token|refresh_token/.test(c.name))) await context.storageState({path:credentials.storageStatePath});
  }
});
