import {
  checkExpectedTerminal,
  checkNoIllegalBackward,
  checkNoOrphans,
  checkSettledWithin,
  checkSingleSubmission,
  checkSingleTerminal,
  isActiveStatus,
  type CheckResult,
  type StatusSample,
  type WorkerPools,
} from "../assertions/job.js";

/**
 * 七道关卡：每关都有独立可断言的产出物，失败即可定位到链路的具体一段。
 * 全部为纯函数，接收观测快照返回判定结果——便于用 mock 完整演练。
 */

export type ArtifactKind = "video" | "audio" | "image" | "subtitle" | "unknown";

export interface ArtifactRef {
  name: string;
  sizeBytes: number;
  kind: ArtifactKind;
}

export interface UploadedFile {
  cloudFileId: string;
  sizeBytes: number;
  /** @ 引用时是否能在候选列表中看到 */
  listable?: boolean;
}

export interface Observation {
  /** G1 */
  uploaded: UploadedFile[];

  /** G2 */
  jobIds: string[];
  poolBefore: WorkerPools;
  poolAfter: WorkerPools;
  creditsBefore?: number;
  creditsAfter?: number;
  /** 该工作流是否应当计费；不确定时留空，避免假红灯 */
  expectCreditsCharged?: boolean;

  /** G3 / G4 */
  timeline: StatusSample[];
  timeoutMs: number;
  /** 期望的终态，默认不校验；期望 done 时能抓出"停在澄清态"的情况 */
  expectedTerminal?: string;

  /** G5 */
  submittedJobId?: string;
  resultCardJobId?: string;
  artifacts: ArtifactRef[];

  /** G7 */
  expectedJobCount?: number;
}

function ok(): CheckResult {
  return { ok: true, failures: [] };
}

function fail(...messages: string[]): CheckResult {
  return { ok: false, failures: messages };
}

function merge(...results: CheckResult[]): CheckResult {
  const failures = results.flatMap((r) => r.failures);
  return { ok: failures.length === 0, failures };
}

/** G1 · 素材就绪 */
export function gate1MaterialReady(obs: Observation): CheckResult {
  if (obs.uploaded.length === 0) return fail("没有上传成功的素材");

  const failures: string[] = [];
  obs.uploaded.forEach((file, i) => {
    if (!file.cloudFileId || !file.cloudFileId.trim()) {
      failures.push(`第 ${i + 1} 个素材未返回 cloud_file_id`);
    }
    if (!(file.sizeBytes > 0)) {
      failures.push(`第 ${i + 1} 个素材大小为 ${file.sizeBytes}`);
    }
    if (file.listable === false) {
      failures.push(`第 ${i + 1} 个素材未出现在 @ 引用候选中`);
    }
  });

  return failures.length ? fail(...failures) : ok();
}

/** G2 · 提交受理：只受理一次，且未被队列拒绝 */
export function gate2Accepted(obs: Observation): CheckResult {
  const results: CheckResult[] = [];
  const uniqueJobs = new Set(obs.jobIds);

  if (uniqueJobs.size === 0) {
    return fail("提交后没有产生任何 Job ID");
  }
  if (uniqueJobs.size > 1) {
    return fail(`一次提交产生了 ${uniqueJobs.size} 个 Job ID：${[...uniqueJobs].join(", ")}`);
  }

  results.push(checkSingleSubmission(obs.poolBefore, obs.poolAfter));

  if (
    obs.expectCreditsCharged &&
    obs.creditsBefore !== undefined &&
    obs.creditsAfter !== undefined
  ) {
    if (obs.creditsAfter >= obs.creditsBefore) {
      results.push(
        fail(
          `未产生积分扣减：余额由 ${obs.creditsBefore} 变为 ${obs.creditsAfter}`,
        ),
      );
    }
  }

  return merge(...results);
}

/** G3 · 执行可观测 */
export function gate3Observable(obs: Observation): CheckResult {
  const results: CheckResult[] = [];

  if (!obs.timeline.some((s) => isActiveStatus(s.status))) {
    results.push(fail("时间线中没有观察到任何活跃态，进度可能未上报"));
  }

  results.push(checkNoIllegalBackward(obs.timeline));
  return merge(...results);
}

/** G4 · 终态收敛 */
export function gate4Settled(obs: Observation): CheckResult {
  const results: CheckResult[] = [
    checkSingleTerminal(obs.timeline),
    checkSettledWithin(obs.timeline, obs.timeoutMs),
  ];

  if (obs.expectedTerminal) {
    results.push(checkExpectedTerminal(obs.timeline, obs.expectedTerminal));
  }

  return merge(...results);
}

/** G5 · 产物可交付 */
export function gate5Deliverable(obs: Observation): CheckResult {
  const failures: string[] = [];

  if (obs.artifacts.length === 0) {
    failures.push("结果卡片未列出任何产物");
  }

  obs.artifacts.forEach((artifact) => {
    if (!(artifact.sizeBytes > 0)) {
      failures.push(`产物 ${artifact.name} 大小为 ${artifact.sizeBytes}`);
    }
  });

  if (obs.submittedJobId && obs.resultCardJobId && obs.submittedJobId !== obs.resultCardJobId) {
    failures.push(
      `结果卡片关联的 Job(${obs.resultCardJobId}) 不是本次提交的 Job(${obs.submittedJobId})`,
    );
  }

  return failures.length ? fail(...failures) : ok();
}

/** G7 · 资源账本 */
export function gate7Ledger(obs: Observation): CheckResult {
  const results: CheckResult[] = [checkNoOrphans(obs.poolBefore, obs.poolAfter)];

  if (obs.expectedJobCount !== undefined) {
    const unique = new Set(obs.jobIds).size;
    if (unique !== obs.expectedJobCount) {
      results.push(
        fail(`任务数为 ${unique}，期望 ${obs.expectedJobCount}，存在重复提交或漏提交`),
      );
    }
  }

  if (
    obs.expectCreditsCharged &&
    obs.creditsBefore !== undefined &&
    obs.creditsAfter !== undefined
  ) {
    const charged = obs.creditsBefore - obs.creditsAfter;
    if (charged < 0) {
      results.push(fail(`积分不降反增：${obs.creditsBefore} -> ${obs.creditsAfter}`));
    }
  }

  return merge(...results);
}

export const GATES = {
  G1: gate1MaterialReady,
  G2: gate2Accepted,
  G3: gate3Observable,
  G4: gate4Settled,
  G5: gate5Deliverable,
  G7: gate7Ledger,
} as const;

/**
 * 一次评估全部关卡。
 * G6（产物正确性）不在此列——它需要真实文件路径，由断言器直接跑 ffprobe / SRT 解析。
 */
export function evaluateGates(obs: Observation): Record<keyof typeof GATES, CheckResult> {
  return {
    G1: GATES.G1(obs),
    G2: GATES.G2(obs),
    G3: GATES.G3(obs),
    G4: GATES.G4(obs),
    G5: GATES.G5(obs),
    G7: GATES.G7(obs),
  };
}
