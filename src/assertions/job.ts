/**
 * Agent Run 状态机与关卡判定
 *
 * 状态取值来自被测仓库实测，不是猜测：
 *   src/lib/task-status.js:1   ACTIVE  = preparing | queued | running | waiting_for_local
 *   src/lib/api.js:405         SETTLED = done | failed | requires_user_input
 *
 * 关键陷阱：requires_user_input 归在 settled 集合里，但它并不是"结束"——
 * 用户在澄清界面回应后，同一个 Run 会回到活跃态继续跑。因此：
 *   1) 终态唯一性判定必须先对连续重复去重再比较；
 *   2) 推进判定必须放行 requires_user_input → 活跃态 这一条合法回退。
 * 把这条当成"状态倒退缺陷"上报，会产生一批假红灯。
 */

export const ACTIVE_STATUSES = [
  "preparing",
  "queued",
  "running",
  "waiting_for_local",
] as const;

export const SETTLED_STATUSES = ["done", "failed", "requires_user_input"] as const;

export const STATUS_DONE = "done";
export const STATUS_FAILED = "failed";
export const STATUS_REQUIRES_INPUT = "requires_user_input";

export type JobStatus = string;

export interface StatusSample {
  status: JobStatus;
  at: number;
}

export interface CheckResult {
  ok: boolean;
  failures: string[];
}

export function isActiveStatus(status: JobStatus): boolean {
  return (ACTIVE_STATUSES as readonly string[]).includes(normalize(status));
}

export function isSettledStatus(status: JobStatus): boolean {
  return (SETTLED_STATUSES as readonly string[]).includes(normalize(status));
}

function normalize(status: JobStatus): string {
  return String(status ?? "").trim().toLowerCase();
}

function result(failures: string[]): CheckResult {
  return { ok: failures.length === 0, failures };
}

// ---------------------------------------------------------------------------
// 时间线判定
// ---------------------------------------------------------------------------

/**
 * 终态唯一：连续去重后，settled 采样只能有一个。
 * 两个不同的终态、或终态之间又冒出活跃态，都判定失败。
 */
export function checkSingleTerminal(samples: StatusSample[]): CheckResult {
  const failures: string[] = [];

  // 必须在完整时间线上做连续去重。
  // 若先过滤出终态再判连续，中间的活跃态会被丢掉，
  // "done -> running -> done" 会退化成 "done -> done" 而漏判。
  const sequence: string[] = [];
  for (const sample of samples) {
    const status = normalize(sample.status);
    if (sequence[sequence.length - 1] !== status) sequence.push(status);
  }

  if (!sequence.some(isSettledStatus)) {
    failures.push("时间线中没有出现任何终态，任务未收敛");
    return result(failures);
  }

  // requires_user_input 之后继续跑，属于澄清流程，不计入真终态
  const terminals = sequence.filter((s) => s === STATUS_DONE || s === STATUS_FAILED);

  if (terminals.length === 0) {
    return result(failures);
  }

  const distinctTerminals = [...new Set(terminals)];
  if (distinctTerminals.length > 1) {
    failures.push(`出现了多个终态：${distinctTerminals.join(", ")}`);
  }

  const firstIndex = sequence.findIndex(
    (s) => s === STATUS_DONE || s === STATUS_FAILED,
  );
  const firstTerminal = sequence[firstIndex];
  const after = sequence.slice(firstIndex + 1).filter((s) => s !== firstTerminal);
  if (after.length > 0) {
    failures.push(`终态 ${firstTerminal} 之后又出现状态变化：${after.join(" -> ")}`);
  }

  return result(failures);
}

/** 期望的终态：多数用例期望 done；停在 requires_user_input 说明需要人工介入 */
export function checkExpectedTerminal(
  samples: StatusSample[],
  expected: string,
): CheckResult {
  const actual = samples
    .map((s) => normalize(s.status))
    .filter(
      (s) =>
        s === STATUS_DONE || s === STATUS_FAILED || s === STATUS_REQUIRES_INPUT,
    )
    .pop();

  if (actual === undefined) {
    return result([`未观察到终态，期望 ${expected}`]);
  }
  if (actual !== expected) {
    return result([`终态为 ${actual}，期望 ${expected}`]);
  }
  return result([]);
}

/**
 * 状态推进：只比较有明确先后关系的活跃态。
 * waiting_for_local 与澄清流程的语义存在交叉，不参与顺序判定，避免误报。
 */
const ORDERED_RANK: Record<string, number> = {
  preparing: 0,
  queued: 1,
  running: 2,
};

export function checkNoIllegalBackward(samples: StatusSample[]): CheckResult {
  const failures: string[] = [];
  const statuses = samples.map((s) => normalize(s.status));

  for (let i = 1; i < statuses.length; i += 1) {
    const prev = statuses[i - 1];
    const curr = statuses[i];
    if (prev === curr) continue;

    // 真终态之后不得复活
    if ((prev === STATUS_DONE || prev === STATUS_FAILED) && isActiveStatus(curr)) {
      failures.push(`终态 ${prev} 之后回到活跃态 ${curr}`);
      continue;
    }

    // 澄清后继续执行：合法
    if (prev === STATUS_REQUIRES_INPUT) continue;
    if (isSettledStatus(curr)) continue;

    const a = ORDERED_RANK[prev];
    const b = ORDERED_RANK[curr];
    if (a !== undefined && b !== undefined && b < a) {
      failures.push(`状态倒退：${prev} -> ${curr}`);
    }
  }

  return result(failures);
}

/** 是否在给定观察窗口内收敛 */
export function checkSettledWithin(
  samples: StatusSample[],
  timeoutMs: number,
): CheckResult {
  const failures: string[] = [];
  const settled = samples.find((s) => isSettledStatus(s.status));
  if (!settled) {
    failures.push(`超过 ${timeoutMs} ms 仍未到达终态`);
    return result(failures);
  }
  const first = samples[0]?.at ?? settled.at;
  const elapsed = settled.at - first;
  if (elapsed > timeoutMs) {
    failures.push(`收敛耗时 ${elapsed} ms，超出上限 ${timeoutMs} ms`);
  }
  return result(failures);
}

// ---------------------------------------------------------------------------
// 轮询（一律轮询 + 上限，禁止固定 sleep）
// ---------------------------------------------------------------------------

export interface PollOptions {
  timeoutMs: number;
  intervalMs?: number;
  now?: () => number;
  sleep?: (ms: number) => Promise<void>;
}

export interface PollOutcome {
  status: JobStatus | null;
  samples: StatusSample[];
  timedOut: boolean;
  elapsedMs: number;
}

export async function pollUntilSettled(
  observe: () => Promise<JobStatus | null>,
  options: PollOptions,
): Promise<PollOutcome> {
  const intervalMs = options.intervalMs ?? 5_000;
  const now = options.now ?? (() => Date.now());
  const sleep =
    options.sleep ?? ((ms: number) => new Promise((r) => setTimeout(r, ms)));

  const startedAt = now();
  const samples: StatusSample[] = [];

  for (;;) {
    const status = await observe();
    const at = now();
    if (status != null) samples.push({ status, at });

    if (status != null && isSettledStatus(status)) {
      return { status, samples, timedOut: false, elapsedMs: at - startedAt };
    }

    const elapsed = at - startedAt;
    if (elapsed >= options.timeoutMs) {
      return { status, samples, timedOut: true, elapsedMs: elapsed };
    }

    // 不越过超时边界
    await sleep(Math.min(intervalMs, options.timeoutMs - elapsed));
  }
}

// ---------------------------------------------------------------------------
// Runtime worker 池指标（G2 / G7 的辅助断言）
// ---------------------------------------------------------------------------

export interface WorkerPool {
  name: string;
  max_workers: number;
  max_pending: number;
  active: number;
  queued: number;
  submitted: number;
  completed: number;
  rejected: number;
}

export type WorkerPools = Record<string, WorkerPool>;

/** 从 /v1/health 响应中提取 worker_pools */
export function extractPools(health: unknown): WorkerPools {
  const pools = (health as { worker_pools?: unknown } | null)?.worker_pools;
  if (!pools || typeof pools !== "object") return {};
  return pools as WorkerPools;
}

export function sumPoolMetric(pools: WorkerPools, metric: keyof WorkerPool): number {
  return Object.values(pools).reduce((total, pool) => {
    const value = pool?.[metric];
    return total + (typeof value === "number" ? value : 0);
  }, 0);
}

/**
 * 提交受理：submitted 增量必须恰好为 1。
 *
 * ⚠️ **仅适用于独占靶场**。`submitted` 是 Runtime 的**全局累计值**，
 * 在共享预发上任何其他人的任务都会让它增加，"恰好 +1"必然被干扰。
 * 共享靶场请改用 `checkSubmissionAccepted`，并把"我们只提交了一次"
 * 交给客户端侧的请求计数（`submitRequests === 1`）来证明。
 */
export function checkSingleSubmission(before: WorkerPools, after: WorkerPools): CheckResult {
  const failures: string[] = [];
  const delta = sumPoolMetric(after, "submitted") - sumPoolMetric(before, "submitted");
  if (delta !== 1) {
    failures.push(`submitted 增量为 ${delta}，期望恰好为 1`);
  }
  const rejectedDelta =
    sumPoolMetric(after, "rejected") - sumPoolMetric(before, "rejected");
  if (rejectedDelta > 0) {
    failures.push(`队列拒绝了 ${rejectedDelta} 个任务`);
  }
  return result(failures);
}

/**
 * 提交受理（共享靶场安全版）：增量 **>= 1** 且队列未拒绝。
 *
 * 语义边界要说清楚：
 *   - 它能证明的是「任务确实进了队列，不是只在界面上假装提交」；
 *   - 它**不能**证明「我们只提交了一次」——那是全局累计值，会被并发干扰。
 *
 * 因此"防重复提交"必须由客户端侧证据承担：
 * 一次提交只发出 **1 个** `POST /v1/agent/runs` 请求，且只产生 **1 个** run_id。
 */
export function checkSubmissionAccepted(before: WorkerPools, after: WorkerPools): CheckResult {
  const failures: string[] = [];
  const delta = sumPoolMetric(after, "submitted") - sumPoolMetric(before, "submitted");
  if (delta < 1) {
    failures.push(
      `submitted 增量为 ${delta}，任务未被受理（界面可能显示成功但实际没进队列）`,
    );
  }
  const rejectedDelta =
    sumPoolMetric(after, "rejected") - sumPoolMetric(before, "rejected");
  if (rejectedDelta > 0) {
    failures.push(`队列拒绝了 ${rejectedDelta} 个任务`);
  }
  return result(failures);
}

/**
 * 无孤儿：本次任务结束后，活跃数不应比提交前更高。
 * 允许下降（说明顺带清掉了历史残留），不允许上升。
 */
export function checkNoOrphans(before: WorkerPools, after: WorkerPools): CheckResult {
  const failures: string[] = [];
  for (const metric of ["active", "queued"] as const) {
    const delta = sumPoolMetric(after, metric) - sumPoolMetric(before, metric);
    if (delta > 0) {
      failures.push(`任务结束后 ${metric} 增加了 ${delta}，疑似留下孤儿任务`);
    }
  }
  return result(failures);
}
