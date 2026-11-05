import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Page } from "@playwright/test";
import { extractArtifacts } from "../assertions/artifact.js";
import { conversationForRun, getRunDetail } from "../workspace.js";

export interface CompoundAudit {
  caseId: string;
  prompt: string;
  startedAt: string;
  coverage: string;
  stage: string;
  planConfirmations: number;
  clarificationObserved: boolean;
  clarificationRequests: number;
  clarificationAnswers?: unknown[];
  clarificationQuestions?: unknown[];
  clarificationFieldValues?: unknown[];
  runs: Record<string, {
    conversationId: string;
    status: string | null;
    rawStatus: string;
    error: unknown;
    artifacts: Array<{ id: string; name: string }>;
  }>;
  setupRunId?: string;
  sourceFileId?: string;
  sourceFileName?: string;
  setupConversationId?: string;
  projectId?: string;
  projectName?: string;
  sourceProjectId?: string;
  sourceRegisteredInProject?: boolean;
  targetDraftProjectId?: string;
  targetProjectId?: string;
  targetConversationId?: string;
  targetUploadRequests?: number;
  referenceCandidates?: string[];
  targetFileIds?: string[];
  media?: { durationSec: number; audioStreams: number; width?: number; height?: number };
  crossSessionReferenceVerified?: boolean;
  finalStatus?: string | null;
  outcome?: string;
  error?: string;
  failedStage?: string;
  cleanup?: Record<string, boolean>;
}

export async function saveCompoundAudit(audit: CompoundAudit): Promise<void> {
  const directory = process.env.CINLINK_AUDIT_DIR;
  if (!directory) return;
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, `${audit.caseId}.json`), JSON.stringify(audit, null, 2), "utf8");
}

/** Record server state separately from the legacy requires_user_input normalization. */
export async function observeCompoundRun(page: Page, runId: string, audit: CompoundAudit) {
  const detail = await getRunDetail(page, runId) as {
    status?: string;
    messages?: Array<{ role?: string; status?: string }>;
    error?: unknown;
    context_files?: unknown[];
  } | null;
  const message = [...(detail?.messages ?? [])].reverse().find((item) => item.role === "assistant");
  const rawStatus = message?.status ?? detail?.status ?? "";
  if (rawStatus === "waiting_for_clarification") audit.clarificationObserved = true;
  audit.runs[runId] = {
    conversationId: conversationForRun(runId),
    status: detail?.status ?? null,
    rawStatus,
    error: detail?.error ?? null,
    artifacts: extractArtifacts(detail).map((item) => ({ id: item.id, name: item.name })),
  };
  await saveCompoundAudit(audit);
  return detail;
}

/** A prompt probe must stop at a clarification instead of choosing/submitting an answer. */
export async function waitForObservedCompound(
  page: Page,
  runId: string,
  audit: CompoundAudit,
  timeoutMs: number,
) {
  const start = Date.now();
  let status: string | null = null;
  while (Date.now() - start < timeoutMs) {
    const detail = await observeCompoundRun(page, runId, audit);
    status = detail?.status ?? null;
    if (status === "done" || status === "failed" || status === "requires_user_input") break;
    await new Promise((resolve) => setTimeout(resolve, 5_000));
  }
  return { status, samples: [], elapsedMs: Date.now() - start, timedOut: Date.now() - start >= timeoutMs };
}
