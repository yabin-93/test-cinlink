import { expect, test } from "@playwright/test";
import { auditSourceLineage, type SourceSnapshot } from "../../src/fixtures/sso-source-lineage.js";

test("current F audio cache remains valid when a later extract_audio replaces its journal output", () => {
  const snapshots: SourceSnapshot[] = [
    { stepId:"shorten",tool:"shorten_video",rootStep:false,inputFileIds:["audio-F","F"],currentOutputIds:["audio-F"] },
    { stepId:"render",tool:"render_highlight_clips",rootStep:false,inputFileIds:["audio-F","F"],currentOutputIds:["audio-F","clip"] },
    { stepId:"extract",tool:"extract_audio",rootStep:true,inputFileIds:["audio-F","clip"],currentOutputIds:["clip"] },
  ];
  expect(auditSourceLineage(snapshots,["audio-F","old-watermark"],"F").staleInputs).toEqual([]);
  expect(auditSourceLineage(snapshots,["audio-F"],"F").wrongRootInputIds).toEqual([]);
});
test("including F in context does not authorize a previous watermarked video", () => {
  const result=auditSourceLineage([{stepId:"root",tool:"enhance_video",rootStep:true,inputFileIds:["F","old-watermark"],currentOutputIds:[]}],["old-watermark"],"F");
  expect(result.wrongRootInputIds).toEqual(["old-watermark"]);
  expect(result.staleInputs).toHaveLength(1);
});
test("a future output cannot retroactively legitimize an earlier historical input", () => {
  const result=auditSourceLineage([
    {stepId:"bad",tool:"burn_subtitles",rootStep:false,inputFileIds:["old-srt"],currentOutputIds:[]},
    {stepId:"later",tool:"transcribe_audio",rootStep:false,inputFileIds:["F"],currentOutputIds:["old-srt"]},
  ],["old-srt"],"F");
  expect(result.staleInputs).toEqual([{stepId:"bad",tool:"burn_subtitles",fileId:"old-srt"}]);
});
test("an unobserved historical input in terminal root arguments remains a violation", () => {
  expect(auditSourceLineage([], ["old-video"], "F", ["old-video"]).wrongRootInputIds).toEqual(["old-video"]);
});
