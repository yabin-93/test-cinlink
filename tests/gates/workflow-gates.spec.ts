import { expect, test } from "@playwright/test";

import type { StatusSample, WorkerPools } from "../../src/assertions/job.js";
import {
  evaluateGates,
  gate1MaterialReady,
  gate2Accepted,
  gate3Observable,
  gate4Settled,
  gate5Deliverable,
  gate7Ledger,
  type Observation,
} from "../../src/levels/gates.js";

function pools(patch: Partial<WorkerPools["intent"]> = {}): WorkerPools {
  return {
    intent: {
      name: "cinlink-intent",
      max_workers: 16,
      max_pending: 64,
      active: 0,
      queued: 0,
      submitted: 10,
      completed: 10,
      rejected: 0,
      ...patch,
    },
  };
}

function base(patch: Partial<Observation> = {}): Observation {
  return {
    uploaded: [{ cloudFileId: "cf-1", sizeBytes: 7_340_032, listable: true }],
    jobIds: ["job-1"],
    poolBefore: pools(),
    poolAfter: pools({ submitted: 11 }),
    timeline: [
      { status: "queued", at: 0 },
      { status: "running", at: 5_000 },
      { status: "done", at: 60_000 },
    ],
    timeoutMs: 1_200_000,
    submittedJobId: "job-1",
    resultCardJobId: "job-1",
    artifacts: [
      { name: "result.mp4", sizeBytes: 8_000_000, kind: "video" },
      { name: "result.srt", sizeBytes: 1_024, kind: "subtitle" },
    ],
    ...patch,
  };
}

test.describe("正向：完整链路应全绿", () => {
  test("标准任务走完 G1–G7", () => {
    const results = evaluateGates(base());
    for (const [gate, result] of Object.entries(results)) {
      expect(result.failures, `${gate} 不应失败：${result.failures.join("; ")}`).toEqual([]);
    }
  });

  test("澄清流程（requires_user_input 后继续）不应误报", () => {
    const obs = base({
      timeline: [
        { status: "queued", at: 0 },
        { status: "running", at: 5_000 },
        { status: "requires_user_input", at: 30_000 },
        { status: "running", at: 45_000 },
        { status: "done", at: 90_000 },
      ] as StatusSample[],
    });

    expect(gate3Observable(obs).failures).toEqual([]);
    expect(gate4Settled(obs).failures).toEqual([]);
  });
});

test.describe("G1 素材就绪", () => {
  test("未上传任何素材判定失败", () => {
    const result = gate1MaterialReady(base({ uploaded: [] }));
    expect(result.ok).toBe(false);
    expect(result.failures.join(" ")).toContain("没有上传成功的素材");
  });

  test("缺少 cloud_file_id 判定失败", () => {
    const result = gate1MaterialReady(
      base({ uploaded: [{ cloudFileId: "  ", sizeBytes: 100 }] }),
    );
    expect(result.failures.join(" ")).toContain("cloud_file_id");
  });

  test("零字节素材判定失败", () => {
    const result = gate1MaterialReady(
      base({ uploaded: [{ cloudFileId: "cf-1", sizeBytes: 0 }] }),
    );
    expect(result.failures.join(" ")).toContain("大小为 0");
  });

  test("素材未出现在 @ 候选中判定失败", () => {
    const result = gate1MaterialReady(
      base({ uploaded: [{ cloudFileId: "cf-1", sizeBytes: 100, listable: false }] }),
    );
    expect(result.failures.join(" ")).toContain("@ 引用候选");
  });
});

test.describe("G2 提交受理", () => {
  test("未产生 Job 判定失败", () => {
    const result = gate2Accepted(base({ jobIds: [] }));
    expect(result.failures.join(" ")).toContain("没有产生任何 Job ID");
  });

  test("一次提交产生多个 Job 判定为重复提交", () => {
    const result = gate2Accepted(base({ jobIds: ["job-1", "job-2"] }));
    expect(result.ok).toBe(false);
    expect(result.failures.join(" ")).toContain("2 个 Job ID");
  });

  test("池指标显示提交两次判定失败", () => {
    const result = gate2Accepted(base({ poolAfter: pools({ submitted: 12 }) }));
    expect(result.failures.join(" ")).toContain("期望恰好为 1");
  });

  test("期望计费却未扣减判定失败", () => {
    const result = gate2Accepted(
      base({ expectCreditsCharged: true, creditsBefore: 100, creditsAfter: 100 }),
    );
    expect(result.failures.join(" ")).toContain("未产生积分扣减");
  });

  test("未声明计费时不校验积分，避免假红灯", () => {
    const result = gate2Accepted(base({ creditsBefore: 100, creditsAfter: 100 }));
    expect(result.failures).toEqual([]);
  });
});

test.describe("G3 执行可观测", () => {
  test("从未观察到活跃态判定失败", () => {
    const result = gate3Observable(
      base({ timeline: [{ status: "done", at: 1_000 }] as StatusSample[] }),
    );
    expect(result.ok).toBe(false);
    expect(result.failures.join(" ")).toContain("活跃态");
  });

  test("状态倒退判定失败", () => {
    const result = gate3Observable(
      base({
        timeline: [
          { status: "queued", at: 0 },
          { status: "running", at: 5_000 },
          { status: "preparing", at: 6_000 },
          { status: "done", at: 60_000 },
        ] as StatusSample[],
      }),
    );
    expect(result.failures.join(" ")).toContain("状态倒退");
  });
});

test.describe("G4 终态收敛", () => {
  test("任务悬挂（无终态）判定失败", () => {
    const result = gate4Settled(
      base({
        timeline: [
          { status: "queued", at: 0 },
          { status: "running", at: 5_000 },
        ] as StatusSample[],
      }),
    );
    expect(result.ok).toBe(false);
    expect(result.failures.join(" ")).toContain("未收敛");
  });

  test("超出收敛时限判定失败", () => {
    const result = gate4Settled(
      base({
        timeoutMs: 30_000,
        timeline: [
          { status: "running", at: 0 },
          { status: "done", at: 120_000 },
        ] as StatusSample[],
      }),
    );
    expect(result.failures.join(" ")).toContain("超出上限");
  });

  test("出现两个终态判定失败", () => {
    const result = gate4Settled(
      base({
        timeline: [
          { status: "running", at: 0 },
          { status: "done", at: 10_000 },
          { status: "failed", at: 20_000 },
        ] as StatusSample[],
      }),
    );
    expect(result.failures.join(" ")).toContain("多个终态");
  });

  test("期望 done 但停在澄清态判定失败", () => {
    const result = gate4Settled(
      base({
        expectedTerminal: "done",
        timeline: [
          { status: "queued", at: 0 },
          { status: "running", at: 5_000 },
          { status: "requires_user_input", at: 30_000 },
        ] as StatusSample[],
      }),
    );
    expect(result.ok).toBe(false);
    expect(result.failures.join(" ")).toContain("requires_user_input");
  });

  test("未声明期望终态时不额外校验", () => {
    const result = gate4Settled(
      base({
        timeline: [
          { status: "queued", at: 0 },
          { status: "running", at: 5_000 },
          { status: "requires_user_input", at: 30_000 },
        ] as StatusSample[],
      }),
    );
    expect(result.failures).toEqual([]);
  });
});

test.describe("G5 产物可交付", () => {
  test("无产物判定失败", () => {
    const result = gate5Deliverable(base({ artifacts: [] }));
    expect(result.failures.join(" ")).toContain("未列出任何产物");
  });

  test("零字节产物判定失败", () => {
    const result = gate5Deliverable(
      base({ artifacts: [{ name: "empty.srt", sizeBytes: 0, kind: "subtitle" }] }),
    );
    expect(result.failures.join(" ")).toContain("empty.srt");
  });

  test("结果卡片串台判定失败", () => {
    const result = gate5Deliverable(base({ resultCardJobId: "job-history" }));
    expect(result.ok).toBe(false);
    expect(result.failures.join(" ")).toContain("不是本次提交的 Job");
  });
});

test.describe("G7 资源账本", () => {
  test("任务结束后活跃数上升判定为孤儿", () => {
    const result = gate7Ledger(base({ poolAfter: pools({ submitted: 11, active: 1 }) }));
    expect(result.failures.join(" ")).toContain("孤儿任务");
  });

  test("任务数与期望不符判定失败", () => {
    const result = gate7Ledger(base({ jobIds: ["job-1", "job-2"], expectedJobCount: 1 }));
    expect(result.failures.join(" ")).toContain("期望 1");
  });

  test("积分不降反增判定失败", () => {
    const result = gate7Ledger(
      base({
        expectCreditsCharged: true,
        creditsBefore: 100,
        creditsAfter: 120,
      }),
    );
    expect(result.failures.join(" ")).toContain("不降反增");
  });
});
