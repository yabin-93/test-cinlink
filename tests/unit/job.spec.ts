import { expect, test } from "@playwright/test";

import {
  checkExpectedTerminal,
  checkNoIllegalBackward,
  checkNoOrphans,
  checkSettledWithin,
  checkSingleSubmission,
  checkSingleTerminal,
  extractPools,
  pollUntilSettled,
  type StatusSample,
  type WorkerPools,
} from "../../src/assertions/job.js";

function timeline(...statuses: string[]): StatusSample[] {
  return statuses.map((status, i) => ({ status, at: 1_000 + i * 5_000 }));
}

const POOLS_BASE: WorkerPools = {
  intent: {
    name: "cinlink-intent",
    max_workers: 16,
    max_pending: 64,
    active: 0,
    queued: 0,
    submitted: 10,
    completed: 10,
    rejected: 0,
  },
};

function withPool(patch: Partial<WorkerPools["intent"]>): WorkerPools {
  return { intent: { ...POOLS_BASE.intent, ...patch } };
}

test.describe("checkSingleTerminal 终态唯一", () => {
  test("连续重复采样同一终态视为通过", () => {
    const result = checkSingleTerminal(timeline("running", "done", "done", "done"));
    expect(result.failures).toEqual([]);
  });

  test("没有终态判定失败", () => {
    const result = checkSingleTerminal(timeline("queued", "running"));
    expect(result.ok).toBe(false);
    expect(result.failures.join(" ")).toContain("未收敛");
  });

  test("出现两个不同终态判定失败", () => {
    const result = checkSingleTerminal(timeline("running", "done", "failed"));
    expect(result.ok).toBe(false);
    expect(result.failures.join(" ")).toContain("多个终态");
  });

  test("终态之后又出现状态变化判定失败", () => {
    const result = checkSingleTerminal(timeline("running", "done", "running", "done"));
    expect(result.ok).toBe(false);
    expect(result.failures.join(" ")).toContain("之后又出现状态变化");
  });
});

test.describe("checkExpectedTerminal 期望终态", () => {
  test("终态与期望一致通过", () => {
    expect(checkExpectedTerminal(timeline("running", "done"), "done").failures).toEqual([]);
  });

  test("期望 done 却停在 requires_user_input 判定失败", () => {
    const result = checkExpectedTerminal(
      timeline("running", "requires_user_input"),
      "done",
    );
    expect(result.ok).toBe(false);
    expect(result.failures.join(" ")).toContain("requires_user_input");
  });

  test("期望 done 但失败判定失败", () => {
    const result = checkExpectedTerminal(timeline("running", "failed"), "done");
    expect(result.ok).toBe(false);
  });

  test("完全没有终态判定失败", () => {
    const result = checkExpectedTerminal(timeline("queued", "running"), "done");
    expect(result.failures.join(" ")).toContain("未观察到终态");
  });
});

test.describe("checkNoIllegalBackward 状态推进", () => {
  test("澄清流程是合法回退，不应误报", () => {
    const result = checkNoIllegalBackward(
      timeline("queued", "running", "requires_user_input", "running", "done"),
    );
    expect(result.failures).toEqual([]);
  });

  test("终态之后复活判定失败", () => {
    const result = checkNoIllegalBackward(timeline("running", "done", "running"));
    expect(result.ok).toBe(false);
    expect(result.failures.join(" ")).toContain("回到活跃态");
  });

  test("状态倒退判定失败", () => {
    const result = checkNoIllegalBackward(timeline("queued", "running", "preparing"));
    expect(result.ok).toBe(false);
    expect(result.failures.join(" ")).toContain("状态倒退");
  });

  test("waiting_for_local 不参与顺序判定，避免假红灯", () => {
    const result = checkNoIllegalBackward(
      timeline("queued", "waiting_for_local", "running", "done"),
    );
    expect(result.failures).toEqual([]);
  });

  test("正常推进不报错", () => {
    expect(checkNoIllegalBackward(timeline("preparing", "queued", "running", "done")).ok).toBe(
      true,
    );
  });
});

test.describe("checkSettledWithin 收敛时限", () => {
  test("时限内收敛通过", () => {
    const samples: StatusSample[] = [
      { status: "running", at: 0 },
      { status: "done", at: 30_000 },
    ];
    expect(checkSettledWithin(samples, 60_000).ok).toBe(true);
  });

  test("超时判定失败", () => {
    const samples: StatusSample[] = [
      { status: "running", at: 0 },
      { status: "done", at: 90_000 },
    ];
    const result = checkSettledWithin(samples, 60_000);
    expect(result.ok).toBe(false);
    expect(result.failures.join(" ")).toContain("超出上限");
  });

  test("始终未收敛判定失败", () => {
    const result = checkSettledWithin(timeline("queued", "running"), 60_000);
    expect(result.ok).toBe(false);
    expect(result.failures.join(" ")).toContain("仍未到达终态");
  });
});

test.describe("pollUntilSettled 轮询", () => {
  test("收敛后立即返回，不额外轮询", async () => {
    const statuses = ["queued", "running", "done", "failed"];
    let index = 0;
    let clock = 0;

    const outcome = await pollUntilSettled(async () => statuses[index++], {
      timeoutMs: 60_000,
      intervalMs: 1_000,
      now: () => clock,
      sleep: async (ms) => {
        clock += ms;
      },
    });

    expect(outcome.status).toBe("done");
    expect(outcome.timedOut).toBe(false);
    expect(index).toBe(3);
  });

  test("超过上限返回超时且不越界", async () => {
    let clock = 0;
    const outcome = await pollUntilSettled(async () => "running", {
      timeoutMs: 10_000,
      intervalMs: 3_000,
      now: () => clock,
      sleep: async (ms) => {
        clock += ms;
      },
    });

    expect(outcome.timedOut).toBe(true);
    expect(outcome.elapsedMs).toBeLessThanOrEqual(10_000);
    expect(outcome.samples.length).toBeGreaterThan(0);
  });

  test("观测函数返回 null 时不记录采样", async () => {
    let clock = 0;
    const outcome = await pollUntilSettled(async () => null, {
      timeoutMs: 5_000,
      intervalMs: 1_000,
      now: () => clock,
      sleep: async (ms) => {
        clock += ms;
      },
    });
    expect(outcome.samples).toEqual([]);
    expect(outcome.timedOut).toBe(true);
  });
});

test.describe("worker 池指标", () => {
  test("extractPools 从 health 响应提取", () => {
    const pools = extractPools({ status: "ok", worker_pools: POOLS_BASE });
    expect(Object.keys(pools)).toEqual(["intent"]);
  });

  test("缺少 worker_pools 时返回空对象", () => {
    expect(extractPools({ status: "ok" })).toEqual({});
    expect(extractPools(null)).toEqual({});
  });

  test("submitted 增量为 1 通过", () => {
    const result = checkSingleSubmission(withPool({}), withPool({ submitted: 11 }));
    expect(result.failures).toEqual([]);
  });

  test("submitted 增量为 2 判定为重复提交", () => {
    const result = checkSingleSubmission(withPool({}), withPool({ submitted: 12 }));
    expect(result.ok).toBe(false);
    expect(result.failures.join(" ")).toContain("期望恰好为 1");
  });

  test("rejected 增加判定失败", () => {
    const result = checkSingleSubmission(
      withPool({}),
      withPool({ submitted: 11, rejected: 1 }),
    );
    expect(result.ok).toBe(false);
    expect(result.failures.join(" ")).toContain("队列拒绝了");
  });

  test("活跃数上升判定为孤儿任务", () => {
    const result = checkNoOrphans(withPool({}), withPool({ active: 1 }));
    expect(result.ok).toBe(false);
    expect(result.failures.join(" ")).toContain("孤儿任务");
  });

  test("活跃数下降不算孤儿", () => {
    const result = checkNoOrphans(withPool({ active: 2 }), withPool({ active: 0 }));
    expect(result.failures).toEqual([]);
  });
});
