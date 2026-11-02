import type { Page } from "@playwright/test";

import { expect, test } from "../../src/fixtures/staging-session.js";
import { TEST_ASSETS, type TestAsset } from "../../src/assets.js";
import { extractArtifacts } from "../../src/assertions/artifact.js";
import {
  getRunDetail,
  isRunSubmission,
  openWorkspaceSession,
  pollRunUntilSettled,
  referenceAssetInPrompt,
  submitCurrentPrompt,
  uploadAsset,
  type UploadOutcome,
} from "../../src/workspace.js";

/**
 * 多工作流复合用例（MW-06 ~ MW-22）
 *
 * 每条只跑一次完整链路：上传 1–3 个素材 → @ 引用 → 一句话提示词 → 等待所有 run 收敛。
 * 复合指令是否拆成多个 run、产物数量与类型，以实际产品行为为准；
 * 依赖故障注入、混剪、澄清或跨会话的场景先 fixme。
 */

const POLL_TIMEOUT_MS = 30 * 60_000;
const SHORT = TEST_ASSETS.videoShort;

interface CompoundCase {
  id: string;
  name: string;
  prompt: string;
  assets: TestAsset[];
  expectArtifacts: number;
  expectKinds?: Array<"srt" | "video" | "image" | "text">;
  videoDuration?: { min?: number; max?: number };
  fixme?: string;
}

const CASES: CompoundCase[] = [
  {
    id: "MW-06", name: "字幕+翻译+总结",
    prompt: "给这个视频生成中文字幕，翻译成英文，并总结要点",
    assets: [SHORT], expectArtifacts: 3, expectKinds: ["srt", "text"],
  },
  {
    id: "MW-07", name: "去口水词+字幕+翻译+导出",
    prompt: "去掉口水词，加中文字幕，翻译成英文，并导出字幕文件",
    assets: [SHORT], expectArtifacts: 3, expectKinds: ["video", "srt"],
  },
  {
    id: "MW-08", name: "长变短+字幕+翻译+水印+导出",
    prompt: "剪成 30 秒高光，加中文字幕并翻译英文，再加文字水印，最后导出成片",
    assets: [SHORT], expectArtifacts: 3, expectKinds: ["video", "srt"],
    videoDuration: { min: 20, max: 45 },
  },
  {
    id: "MW-09", name: "混剪+字幕+翻译+增强+水印+导出",
    prompt: "把两个视频混剪成 18 秒，加字幕并翻译，增强画质，加水印后导出",
    assets: [SHORT, TEST_ASSETS.videoLong], expectArtifacts: 3,
    fixme: "双素材混剪受 CINLINK-MIX-001 阻塞，待修复后启用",
  },
  {
    id: "MW-10", name: "显式顺序：增强→字幕→长变短",
    prompt: "先增强画质，再加中文字幕，最后剪成 20 秒",
    assets: [SHORT], expectArtifacts: 2, expectKinds: ["video", "srt"],
    videoDuration: { min: 15, max: 30 },
  },
  {
    id: "MW-11", name: "生成→字幕→翻译",
    prompt: "先生成视频，再加中文字幕，最后翻译成英文",
    assets: [], expectArtifacts: 2, expectKinds: ["srt"],
    fixme: "卡片生成 + 上下文引用需先确认，当前用提示词生成不稳定",
  },
  {
    id: "MW-12", name: "中间翻译失败",
    prompt: "加中文字幕、翻译成英文、导出成片",
    assets: [SHORT], expectArtifacts: 1,
    fixme: "需要故障注入使翻译失败，工具未提供",
  },
  {
    id: "MW-13", name: "参数冲突",
    prompt: "剪成 20 秒，再剪成 30 秒",
    assets: [SHORT], expectArtifacts: 1,
    fixme: "澄清/覆盖规则待产品确认",
  },
  {
    id: "MW-14", name: "8+ 工作流长链路",
    prompt: "总结、加字幕、翻译成英文、剪成 30 秒、增强画质、加水印、导出成片、生成解说",
    assets: [SHORT], expectArtifacts: 2,
    fixme: "单任务步骤上限未定义，先不执行",
  },
  {
    id: "MW-15", name: "双视频分别字幕",
    prompt: "给第一个视频加中文字幕；给第二个视频加英文字幕",
    assets: [SHORT, SHORT], expectArtifacts: 2, expectKinds: ["srt"],
  },
  {
    id: "MW-16", name: "双视频分别翻译",
    prompt: "把第一个视频翻译成英文字幕；把第二个视频翻译成日文字幕",
    assets: [SHORT, SHORT], expectArtifacts: 2, expectKinds: ["srt"],
  },
  {
    id: "MW-17", name: "三视频混剪+字幕+翻译",
    prompt: "把这三个视频混剪成 30 秒，加中文字幕并翻译成英文",
    assets: [SHORT, SHORT, SHORT], expectArtifacts: 2,
    fixme: "三素材混剪未验证，且受 MIX-001 影响",
  },
  {
    id: "MW-18", name: "视频+图片水印+字幕",
    prompt: "给这个视频加图片水印（用引用的水印图），并生成中文字幕",
    assets: [SHORT], expectArtifacts: 2, expectKinds: ["video", "srt"],
    fixme: "图片水印的素材引用方式待确认（当前素材登记只含视频）",
  },
  {
    id: "MW-19", name: "视频+音频配音",
    prompt: "用引用的音频给这个视频生成配音并合成成片",
    assets: [SHORT], expectArtifacts: 1,
    fixme: "音频素材与配音链路未接入自动化",
  },
  {
    id: "MW-20", name: "多素材歧义",
    prompt: "给这个视频加中文字幕",
    assets: [SHORT, SHORT], expectArtifacts: 1,
    fixme: "需要断言澄清/选择交互，当前无稳定锚点",
  },
  {
    id: "MW-21", name: "跨会话素材复用",
    prompt: "给引用的素材加中文字幕",
    assets: [SHORT], expectArtifacts: 1,
    fixme: "跨会话素材可见性需要双会话夹具",
  },
  {
    id: "MW-22", name: "多素材部分失败",
    prompt: "给第一个视频加中文字幕；把第二个视频翻译成英文字幕",
    assets: [SHORT, SHORT], expectArtifacts: 1,
    fixme: "需要故障注入使第二个视频失败",
  },
];

async function uploadAndReference(page: Page, assets: TestAsset[]): Promise<UploadOutcome[]> {
  const uploaded: UploadOutcome[] = [];
  for (const asset of assets) {
    const outcome = await uploadAsset(page, asset);
    expect(outcome.cloudFileId, `素材 ${asset.name} 上传失败`).not.toBe("");
    const reference = await referenceAssetInPrompt(page, outcome.uploadedAs, outcome.cloudFileId, {
      clear: uploaded.length === 0,
    });
    expect(reference.ok, `素材 ${outcome.uploadedAs} 未能 @ 引用`).toBe(true);
    uploaded.push(outcome);
  }
  return uploaded;
}

function artifactKind(name: string): "srt" | "video" | "image" | "text" | null {
  if (/\.srt$/i.test(name)) return "srt";
  if (/\.(mp4|mov|webm)$/i.test(name)) return "video";
  if (/\.(png|jpe?g|webp)$/i.test(name)) return "image";
  if (/\.(txt|md|json)$/i.test(name)) return "text";
  return null;
}

test.describe("@regression 多工作流复合（MW-06~22）", () => {
  for (const c of CASES) {
    test(`${c.id} ${c.name}`, async ({ page }) => {
      if (c.fixme) {
        test.fixme(true, c.fixme);
        return;
      }
      test.setTimeout(POLL_TIMEOUT_MS + 10 * 60_000);
      await openWorkspaceSession(page);

      const runIds = new Set<string>();
      page.on("response", async (response) => {
        if (!isRunSubmission(response.url(), response.request().method())) return;
        const body = await response.json().catch(() => null);
        const id = body && typeof body === "object" ? (body as { run_id?: string }).run_id : undefined;
        if (id) runIds.add(id);
      });

      const uploaded: UploadOutcome[] = [];
      try {
        if (c.assets.length > 0) uploaded.push(...(await uploadAndReference(page, c.assets)));

        const submit = await submitCurrentPrompt(page);
        expect(submit.httpStatus, "提交被拒绝").toBeLessThan(300);
        expect(submit.runId, "提交未返回 run_id").not.toBe("");
        runIds.add(submit.runId);

        // 复合指令可能在首个 run 完成后继续派生新 run，先等首条收敛
        await pollRunUntilSettled(page, submit.runId, { timeoutMs: POLL_TIMEOUT_MS, intervalMs: 5_000 });
        await page.waitForTimeout(5_000);

        const artifacts: Array<{ name: string; kind: string | null }> = [];
        for (const id of runIds) {
          const detail = await getRunDetail(page, id);
          for (const a of extractArtifacts(detail)) artifacts.push({ name: a.name, kind: artifactKind(a.name) });
        }

        expect(
          artifacts.length,
          `${c.id} 产物不足：期望 ≥${c.expectArtifacts}，实际 ${artifacts.map((a) => a.name).join(", ")}`,
        ).toBeGreaterThanOrEqual(c.expectArtifacts);

        if (c.expectKinds) {
          const kinds = new Set(artifacts.map((a) => a.kind));
          for (const kind of c.expectKinds) {
            expect(kinds.has(kind), `${c.id} 缺少 ${kind} 产物（现有：${[...kinds].join(", ")}）`).toBe(true);
          }
        }
      } finally {
        for (const u of uploaded) {
          await page.request.delete(`/v1/agent/files/${encodeURIComponent(u.cloudFileId)}`).catch(() => undefined);
        }
      }
    });
  }
});
