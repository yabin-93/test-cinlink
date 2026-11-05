import { expect, type BrowserContext, type Page } from "@playwright/test";

export type SSORecoveryMode = "after-refresh" | "during-refresh" | "reopen-history" | "history-view";
export type SSORecoveryRecord = {
  mode: SSORecoveryMode; phase: string; round: number; startedAt: string; completedAt?: string;
  covered: boolean; triggerStatus?: string; before?: unknown; after?: unknown;
  turnRequestsBefore: number; turnRequestsAfter?: number; selectedConversationId?: string;
  played?: Array<{ round: number; runId: string; fileId: string; title: string; timeSec: number; durationSec: number; startTimeSec?: number }>;
  referenceIntroduced?: boolean; error?: string;
  historyEntry?: { text: string; visible: boolean };
};
type Delivered = { runIds: string[]; downloads: Array<{ id: string; name: string }> };
type Dependencies = {
  baseURL: string; conversationId: string; sourceFileId: string; setupRunId: string;
  context: BrowserContext; page: () => Page; replacePage: (page: Page) => void;
  turnRequests: () => number; refreshSession: () => Promise<boolean>;
  shot: (name: string) => Promise<void>; save: () => Promise<void>;
};

/** Real page interactions with server identity checks, without submitting turns. */
export class SSOSessionRecovery {
  constructor(private readonly deps: Dependencies) {}

  private async observe(runId: string) {
    const d=this.deps;
    const read=()=>d.page().request.get(`${d.baseURL}/runtime-api/v1/conversations/${encodeURIComponent(d.conversationId)}/messages?limit=200`,{timeout:30_000});
    let response=await read();
    if(response.status()===401 && await d.refreshSession())response=await read();
    expect(response.ok(),"恢复操作前后必须可回读原会话").toBe(true);
    const body=await response.json();
    if(body.conversation_id)expect(body.conversation_id).toBe(d.conversationId);
    const messages:Array<Record<string,any>>=body.messages??[];
    const setup=messages.find(m=>m.role==="user"&&m.job_id===d.setupRunId);
    const sourceIds=(setup?.files??[]).map((f:any)=>String(f.file_id??f.cloud_file_id??f.id??""));
    expect(sourceIds,"恢复后必须仍是最初登记的唯一F").toEqual([d.sourceFileId]);
    const current=messages.filter(m=>m.role==="assistant"&&m.job_id===runId).at(-1);
    expect(current,"恢复后须接到原已受理任务").toBeTruthy();
    return { at:new Date().toISOString(),conversationId:d.conversationId,sourceIds,runId,status:String(current!.status),
      acceptedUserRunIds:[...new Set(messages.filter(m=>m.role==="user"&&m.job_id).map(m=>String(m.job_id)))].sort(),
      artifactIds:(current!.result_files??[]).map((f:any)=>String(f.file_id??f.id??"")) };
  }

  private async ready(runId: string) {
    const d=this.deps;
    await d.page().locator("#workspace-prompt").waitFor({state:"visible",timeout:60_000});
    await expect.poll(()=>new URL(d.page().url()).pathname,{timeout:45_000,message:"恢复必须停留原会话S"}).toBe(`/c/${d.conversationId}`);
    await d.page().locator(`[data-agent-run-id="${runId}"]`).waitFor({state:"attached",timeout:45_000});
  }

  async restore(record: SSORecoveryRecord,runId: string) {
    const d=this.deps;const label=`round-${record.round}-${record.mode}`;
    try {
      record.before=await this.observe(runId);await d.shot(`${label}-before.png`);await d.save();
      // Check again immediately before reload, after taking the screenshot.
      const gate=await this.observe(runId);record.triggerStatus=gate.status;
      if(record.mode==="during-refresh"&&gate.status!=="running") {
        if(!["done","failed","cancelled","canceled"].includes(gate.status)) {
          record.phase="awaiting-running";record.error="状态已变化，尚未刷新，等待下一次真实running";record.completedAt=new Date().toISOString();await d.save();return;
        }
        record.error="运行中刷新时机已错过；不重发任务补覆盖";record.completedAt=new Date().toISOString();await d.save();return;
      }
      if(record.mode==="reopen-history") {
        const old=d.page();await old.close();
        const next=await d.context.newPage();d.replacePage(next);
        await next.goto(d.baseURL,{waitUntil:"domcontentloaded"});
        await next.locator("#workspace-prompt").waitFor({state:"visible",timeout:60_000});
        const history=next.locator(`[data-react-conversation-id="${d.conversationId}"]`);
        // Sidebar conversations are paginated; a missing first-page row is not
        // evidence that the original conversation has disappeared.
        for(let attempt=0;attempt<20 && !await history.count();attempt++) {
          const more=next.locator('[data-react-sidebar-pagination="conversations"] button');
          await more.waitFor({state:"visible",timeout:30_000});
          const loaded=await next.locator('[data-react-conversation-row]').count();
          await more.click({timeout:15_000});
          await expect.poll(async()=>await history.count()>0 || await next.locator('[data-react-conversation-row]').count()>loaded,{timeout:30_000,message:"历史分页必须加载新会话后才能继续"}).toBe(true);
        }
        await history.waitFor({state:"attached",timeout:15_000});
        record.historyEntry={text:await history.innerText(),visible:await history.isVisible()};await d.save();
        // Focus pins virtualized sidebar rows while scrolling; Enter invokes the
        // same supported history selection action as a mouse click.
        await history.focus({timeout:15_000});
        await history.scrollIntoViewIfNeeded({timeout:15_000});
        await expect(history).toBeFocused();
        await d.shot(`${label}-history-entry.png`);await history.press("Enter",{timeout:15_000});record.selectedConversationId=d.conversationId;
      } else {
        await d.page().reload({waitUntil:"domcontentloaded"});
      }
      await this.ready(runId);
      // Selecting history reloads the sidebar's first page and may unmount this
      // virtualized row. Original run content and URL establish the restored S;
      // the submission guard independently rejects any mismatched target CID.
      const after=await this.observe(runId);record.after=after;
      expect(after.acceptedUserRunIds,"刷新/重开不能产生新的业务提交").toEqual(gate.acceptedUserRunIds);
      record.turnRequestsAfter=d.turnRequests();
      expect(record.turnRequestsAfter,"恢复操作期间不能重复POST任务").toBe(record.turnRequestsBefore);
      record.covered=true;record.completedAt=new Date().toISOString();
      await d.shot(`${label}-after.png`);await d.save();
    } catch(error) {
      record.error=error instanceof Error?error.message:String(error);await d.shot(`${label}-failure.png`).catch(()=>undefined);await d.save();throw error;
    }
  }

  async viewHistory(record: SSORecoveryRecord,rounds: Delivered[],indices: number[]) {
    const d=this.deps;const label=`round-${record.round}-history-${record.phase}`;
    try {
      const latest=rounds[Math.max(...indices)].runIds.at(-1)!;
      record.before=await this.observe(latest);record.played=[];await d.save();
      for(const index of [...new Set(indices)]) {
        const previous=rounds[index];expect(previous.downloads).toHaveLength(1);
        const runId=previous.runIds.at(-1)!;const artifact=previous.downloads[0];
        const article=d.page().locator(`[data-agent-run-id="${runId}"]`);
        await article.waitFor({state:"attached",timeout:45_000});
        const card=article.locator(".workspace-artifact-video-card").first();
        await card.scrollIntoViewIfNeeded();await card.hover();
        const video=card.locator("video");await video.waitFor({state:"attached",timeout:45_000});
        expect(await video.getAttribute("title"),"历史卡片须对应该轮实际交付").toBe(artifact.name);
        const beforePlay=await video.evaluate((el:HTMLVideoElement)=>({time:el.currentTime,ended:el.ended}));
        await card.getByRole("button",{name:"Play",exact:true}).click();
        await expect.poll(()=>video.evaluate((el:HTMLVideoElement,before)=>!el.paused&&(el.currentTime>before.time+.15||(before.ended&&el.currentTime>.15&&el.currentTime<before.time)),beforePlay),{timeout:30_000,message:"必须实际播放历史成片且播放时间推进，不能用旧进度代替播放"}).toBe(true);
        const state=await video.evaluate((el:HTMLVideoElement)=>({timeSec:el.currentTime,durationSec:el.duration}));
        record.played.push({round:index+1,runId,fileId:artifact.id,title:artifact.name,startTimeSec:beforePlay.time,...state});
        await d.shot(`${label}-view-R${index+1}.png`);
        await card.getByRole("button",{name:"Pause",exact:true}).click();await d.save();
      }
      const editor=d.page().locator("#workspace-prompt");await editor.scrollIntoViewIfNeeded();
      const references=await editor.locator('[contenteditable="false"]').count();
      if(references) {
        record.referenceIntroduced=true;await d.shot(`${label}-unexpected-reference.png`);await editor.fill("");
        expect.soft(references,"只查看历史不应自动添加@引用；已记录并清除后继续").toBe(0);
      }
      await expect(editor).toHaveText("");
      await expect(d.page().locator('.workspace-media-strip:not(.is-read-only) .workspace-media-thumb'),"仅查看后输入框不能残留附件").toHaveCount(0);
      await expect(editor.locator('[contenteditable="false"]')).toHaveCount(0);
      const after=await this.observe(latest);record.after=after;
      expect(after.acceptedUserRunIds).toEqual((record.before as typeof after).acceptedUserRunIds);
      record.turnRequestsAfter=d.turnRequests();expect(record.turnRequestsAfter).toBe(record.turnRequestsBefore);
      record.covered=true;record.completedAt=new Date().toISOString();await d.shot(`${label}-back-to-composer.png`);await d.save();
    } catch(error) {
      record.error=error instanceof Error?error.message:String(error);await d.shot(`${label}-failure.png`).catch(()=>undefined);await d.save();throw error;
    }
  }
}
