import type { SSODefinition } from "./source-artifact.js";

/** Editor review/delivery branches. inputRound excludes the setup message. */
export const editorOperationCases: SSODefinition[] = [
  {
    "id": "SSO-023",
    "title": "审片返修：换字幕语言后重新出片",
    "mixedSources": true,
    "steps": [
      {
        "workflow": "long-to-short",
        "kind": "mp4",
        "inputRound": 0,
        "width": 1280,
        "height": 720,
        "subtitles": false,
        "expectedWatermarks": [],
        "prompt": "先用本会话最初上传的7MB.mp4原片，剪一个30秒高光版本。保留1280×720和选中片段原英语音轨，交付一个MP4。",
        "expected": "交付V1；V1为30±2秒高光，记录实际保留片段。同时满足通用验收。",
        "duration": 30,
        "durationToleranceSec": 2
      },
      {
        "workflow": "translation",
        "kind": "mp4",
        "inputRound": 1,
        "width": 1280,
        "height": 720,
        "subtitles": true,
        "expectedWatermarks": [],
        "prompt": "给上一轮的30秒高光加简体中文字幕并烧录，保留全部剪辑片段、时长、分辨率和原音轨，交付一个MP4。",
        "expected": "交付V2；V2保留V1剪辑，中文字幕对应短片语音。同时满足通用验收。",
        "language": "zh"
      },
      {
        "workflow": "subtitle",
        "kind": "mp4",
        "inputRound": 1,
        "width": 1280,
        "height": 720,
        "subtitles": true,
        "expectedWatermarks": [],
        "prompt": "客户改要英文字幕。请从本会话第1轮的无字幕30秒高光重新制作，生成并烧录英文单语字幕，保留该版片段、时长、分辨率和原音轨，交付一个MP4。",
        "expected": "交付V3；V3来源为V1，只有新英文字幕，无V2中文字幕残留。同时满足通用验收。",
        "language": "en"
      },
      {
        "workflow": "text-watermark",
        "kind": "mp4",
        "inputRound": 3,
        "width": 1280,
        "height": 720,
        "subtitles": true,
        "expectedWatermarks": [
          {
            "text": "CLIENT-REVIEW",
            "position": "top-right"
          }
        ],
        "prompt": "在上一轮英文字幕版本右上角加全程文字水印CLIENT-REVIEW，默认样式，其他内容保持，交付一个MP4审片版。",
        "expected": "交付V4；V4保留V3字幕与剪辑，仅新增审片水印。同时满足通用验收。",
        "language": "en",
        "watermark": "CLIENT-REVIEW",
        "position": "top-right"
      },
      {
        "workflow": "enhance",
        "kind": "mp4",
        "inputRound": 3,
        "width": 2560,
        "height": 1440,
        "subtitles": true,
        "expectedWatermarks": [],
        "prompt": "客户通过了，请使用本会话第3轮的英文字幕版本作为正式版，将分辨率提升2倍至2560×1440，保留片段、时长和原音轨，交付一个MP4。",
        "expected": "交付V5；V5来自V3，1440p，无CLIENT-REVIEW水印。同时满足通用验收。",
        "language": "en"
      }
    ]
  },
  {
    "id": "SSO-024",
    "title": "同一内容交付30秒与20秒版本",
    "mixedSources": true,
    "steps": [
      {
        "workflow": "long-to-short",
        "kind": "mp4",
        "inputRound": 0,
        "width": 1280,
        "height": 720,
        "subtitles": false,
        "expectedWatermarks": [],
        "prompt": "把最初上传的7MB.mp4原片剪成30秒高光，保留1280×720及选中片段原英语音轨，交付一个无新增字幕和水印的MP4。",
        "expected": "交付V1；V1为30±2秒。同时满足通用验收。",
        "duration": 30,
        "durationToleranceSec": 2
      },
      {
        "workflow": "subtitle",
        "kind": "mp4",
        "inputRound": 1,
        "width": 1280,
        "height": 720,
        "subtitles": true,
        "expectedWatermarks": [],
        "prompt": "给上一轮30秒版生成并烧录英文单语字幕，保持片段、时长、分辨率和原音轨，交付一个MP4。",
        "expected": "交付V2；V2为带英文字幕的30秒版。同时满足通用验收。",
        "language": "en"
      },
      {
        "workflow": "long-to-short",
        "kind": "mp4",
        "inputRound": 0,
        "width": 1280,
        "height": 720,
        "subtitles": false,
        "expectedWatermarks": [],
        "prompt": "再从最初上传的7MB.mp4原片独立剪一个20秒高光版，保留1280×720和选中片段原英语音轨，交付一个无新增字幕和水印的MP4。",
        "expected": "交付V3；V3来源F，为20±2秒，不从30秒版二次截取。同时满足通用验收。",
        "duration": 20,
        "durationToleranceSec": 2
      },
      {
        "workflow": "subtitle",
        "kind": "mp4",
        "inputRound": 3,
        "width": 1280,
        "height": 720,
        "subtitles": true,
        "expectedWatermarks": [],
        "prompt": "给上一轮20秒版生成并烧录英文单语字幕，保持片段、时长、分辨率和原音轨，交付一个MP4。",
        "expected": "交付V4；V4字幕按20秒版时间轴显示。同时满足通用验收。",
        "language": "en"
      },
      {
        "workflow": "text-watermark",
        "kind": "mp4",
        "inputRound": 2,
        "width": 1280,
        "height": 720,
        "subtitles": true,
        "expectedWatermarks": [
          {
            "text": "BRAND",
            "position": "top-right"
          }
        ],
        "prompt": "回到本会话第2轮带英文字幕的30秒版，在右上角添加全程文字水印BRAND，默认样式，保持其他内容，交付一个MP4。",
        "expected": "交付V5；V5来自历史V2，仍为30秒版，不串入最近20秒版。同时满足通用验收。",
        "language": "en",
        "watermark": "BRAND",
        "position": "top-right"
      }
    ]
  },
  {
    "id": "SSO-025",
    "title": "同一剪辑制作中英日三种字幕交付版",
    "mixedSources": true,
    "steps": [
      {
        "workflow": "long-to-short",
        "kind": "mp4",
        "inputRound": 0,
        "width": 1280,
        "height": 720,
        "subtitles": false,
        "expectedWatermarks": [],
        "prompt": "从最初上传的7MB.mp4原片剪一个30秒高光母版，保持1280×720及选中片段原英语音轨，交付一个无新增字幕和水印的MP4。",
        "expected": "交付V1；V1为30±2秒无字幕母版。同时满足通用验收。",
        "duration": 30,
        "durationToleranceSec": 2
      },
      {
        "workflow": "translation",
        "kind": "mp4",
        "inputRound": 1,
        "width": 1280,
        "height": 720,
        "subtitles": true,
        "expectedWatermarks": [],
        "prompt": "使用第1轮30秒无字幕母版，生成并烧录简体中文单语字幕，保留全部片段、时长、分辨率和原英语音轨，交付一个MP4。",
        "expected": "交付V2；V2为中文版本。同时满足通用验收。",
        "language": "zh"
      },
      {
        "workflow": "subtitle",
        "kind": "mp4",
        "inputRound": 1,
        "width": 1280,
        "height": 720,
        "subtitles": true,
        "expectedWatermarks": [],
        "prompt": "继续使用第1轮30秒无字幕母版，生成并烧录英文单语字幕，保留全部片段、时长、分辨率和原英语音轨，交付一个MP4。",
        "expected": "交付V3；V3为英文版本，不叠加V2中文字幕。同时满足通用验收。",
        "language": "en"
      },
      {
        "workflow": "translation",
        "kind": "mp4",
        "inputRound": 1,
        "width": 1280,
        "height": 720,
        "subtitles": true,
        "expectedWatermarks": [],
        "prompt": "仍使用第1轮30秒无字幕母版，生成并烧录日文单语字幕，保留全部片段、时长、分辨率和原英语音轨，交付一个MP4。",
        "expected": "交付V4；V4为日文版本，无中文或英文新增字幕残留。同时满足通用验收。",
        "language": "ja"
      },
      {
        "workflow": "enhance",
        "kind": "mp4",
        "inputRound": 2,
        "width": 2560,
        "height": 1440,
        "subtitles": true,
        "expectedWatermarks": [],
        "prompt": "请把第2轮中文字幕版提升2倍分辨率至2560×1440，保留全部片段、时长、中文字幕和原英语音轨，交付一个MP4。",
        "expected": "交付V5；V5来自V2中文分支，不能沿用最近日文版；三语言版本画面片段一致。同时满足通用验收。",
        "language": "zh"
      }
    ]
  },
  {
    "id": "SSO-026",
    "title": "带水印审片通过后交付干净正式版",
    "mixedSources": true,
    "steps": [
      {
        "workflow": "subtitle",
        "kind": "mp4",
        "inputRound": 0,
        "width": 1280,
        "height": 720,
        "subtitles": true,
        "expectedWatermarks": [],
        "prompt": "给最初上传的7MB.mp4完整原片生成并烧录英文单语字幕，保持1280×720、完整时长和原英语音轨，交付一个无新增水印的MP4。",
        "expected": "交付V1；V1为全长带英文字幕母版。同时满足通用验收。",
        "duration": 60.5,
        "durationToleranceSec": 0.5,
        "language": "en"
      },
      {
        "workflow": "text-watermark",
        "kind": "mp4",
        "inputRound": 1,
        "width": 1280,
        "height": 720,
        "subtitles": true,
        "expectedWatermarks": [
          {
            "text": "INTERNAL",
            "position": "top-right"
          }
        ],
        "prompt": "在上一轮字幕母版右上角添加全程文字水印INTERNAL，默认样式，保留字幕、时长、分辨率和音轨，交付一个MP4内部审片版。",
        "expected": "交付V2；V2为INTERNAL审片版。同时满足通用验收。",
        "language": "en",
        "watermark": "INTERNAL",
        "position": "top-right"
      },
      {
        "workflow": "text-watermark",
        "kind": "mp4",
        "inputRound": 1,
        "width": 1280,
        "height": 720,
        "subtitles": true,
        "expectedWatermarks": [
          {
            "text": "CLIENT",
            "position": "top-right"
          }
        ],
        "prompt": "请从第1轮字幕母版另做客户审片版，右上角添加全程文字水印CLIENT，默认样式，保持其他内容，交付一个MP4。",
        "expected": "交付V3；V3仅有CLIENT，不叠加INTERNAL。同时满足通用验收。",
        "language": "en",
        "watermark": "CLIENT",
        "position": "top-right"
      },
      {
        "workflow": "enhance",
        "kind": "mp4",
        "inputRound": 1,
        "width": 2560,
        "height": 1440,
        "subtitles": true,
        "expectedWatermarks": [],
        "prompt": "客户审片通过，请从第1轮无水印字幕母版制作正式版，提升2倍分辨率至2560×1440，保留完整时长、英文字幕和原音轨，交付一个MP4。",
        "expected": "交付V4；V4来自V1，无两种审片水印，1440p。同时满足通用验收。",
        "language": "en"
      },
      {
        "workflow": "enhance",
        "kind": "mp4",
        "inputRound": 0,
        "width": 2560,
        "height": 1440,
        "subtitles": false,
        "expectedWatermarks": [],
        "prompt": "另交一份干净原画面版本：仅将最初上传的7MB.mp4原片提升2倍至2560×1440，保持完整时长和原英语音轨，交付一个无新增字幕和水印的MP4。",
        "expected": "交付V5；V5来自F，无历史新增字幕、水印；不要求擦除原片固有画面文字。同时满足通用验收。",
        "duration": 60.5,
        "durationToleranceSec": 0.5
      }
    ]
  },
  {
    "id": "SSO-027",
    "title": "客户改回旧剪辑后继续包装",
    "mixedSources": true,
    "steps": [
      {
        "workflow": "long-to-short",
        "kind": "mp4",
        "inputRound": 0,
        "width": 1280,
        "height": 720,
        "subtitles": false,
        "expectedWatermarks": [],
        "prompt": "从最初上传的7MB.mp4原片剪一个20秒高光提案，保留1280×720和选中片段原英语音轨，交付一个无新增字幕和水印的MP4。",
        "expected": "交付V1；V1为20±2秒提案。同时满足通用验收。",
        "duration": 20,
        "durationToleranceSec": 2
      },
      {
        "workflow": "long-to-short",
        "kind": "mp4",
        "inputRound": 0,
        "width": 1280,
        "height": 720,
        "subtitles": false,
        "expectedWatermarks": [],
        "prompt": "客户想多保留信息，请重新从最初上传的7MB.mp4原片剪一个30秒高光提案，保留1280×720和选中片段原英语音轨，交付一个无新增字幕和水印的MP4。",
        "expected": "交付V2；V2来自F，为30±2秒独立提案。同时满足通用验收。",
        "duration": 30,
        "durationToleranceSec": 2
      },
      {
        "workflow": "subtitle",
        "kind": "mp4",
        "inputRound": 2,
        "width": 1280,
        "height": 720,
        "subtitles": true,
        "expectedWatermarks": [],
        "prompt": "给上一轮30秒提案生成并烧录英文字幕，保持片段、时长、分辨率和原音轨，交付一个MP4。",
        "expected": "交付V3；V3为30秒字幕提案。同时满足通用验收。",
        "language": "en"
      },
      {
        "workflow": "translation",
        "kind": "mp4",
        "inputRound": 1,
        "width": 1280,
        "height": 720,
        "subtitles": true,
        "expectedWatermarks": [],
        "prompt": "客户最终选回第1轮20秒提案，请使用第1轮视频生成并烧录简体中文字幕，保留那一版全部片段、时长、分辨率和原音轨，交付一个MP4。",
        "expected": "交付V4；V4来自V1，为20秒中文分支，无V3英文字幕。同时满足通用验收。",
        "language": "zh"
      },
      {
        "workflow": "text-watermark",
        "kind": "mp4",
        "inputRound": 4,
        "width": 1280,
        "height": 720,
        "subtitles": true,
        "expectedWatermarks": [
          {
            "text": "FINAL",
            "position": "top-right"
          }
        ],
        "prompt": "在上一轮确定的20秒中文字幕版右上角添加全程文字水印FINAL，默认样式，保持其他内容，交付一个MP4。",
        "expected": "交付V5；V5保留V4剪辑与中文字幕，仅新增FINAL；旧提案仍能回读。同时满足通用验收。",
        "language": "zh",
        "watermark": "FINAL",
        "position": "top-right"
      }
    ]
  }
];
