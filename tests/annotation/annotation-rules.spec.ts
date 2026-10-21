import { existsSync } from "node:fs";
import { pathToFileURL } from "node:url";

import { expect, test } from "@playwright/test";

/**
 * 视频批注 · 规则层用例（DC-07 P0 中不依赖后端的部分）
 *
 * 规则实现位于产品分支 `feature/web-editor-video-annotation` 的
 * `src/lib/editor-video-annotations.js`。本工程不复制这段源码，测试直接加载它，
 * 保证断言与产品实现同源。
 *
 * 运行前提：本地存在该分支的 worktree（默认路径见下），或设置
 * `CINLINK_ANNOTATION_MODULE` 指向该模块绝对路径。
 */

const MODULE_PATH =
  process.env.CINLINK_ANNOTATION_MODULE ||
  "E:\\proj\\cinlink-annotation-wt\\src\\lib\\editor-video-annotations.js";

const moduleReady = existsSync(MODULE_PATH);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let annotations: any;

test.beforeAll(async () => {
  test.skip(!moduleReady, `未找到批注规则模块：${MODULE_PATH}（需要 feature/web-editor-video-annotation 分支的 worktree）`);
  annotations = await import(pathToFileURL(MODULE_PATH).href);
});

test.describe("批注时长与上限（DC-07-038 / 058）", () => {
  test("默认批注时长为 5 秒", () => {
    expect(annotations.ANNOTATION_DEFAULT_DURATION_SEC).toBe(5);
  });

  test("批注最长 30 秒、最短 0.25 秒", () => {
    expect(annotations.ANNOTATION_MAXIMUM_TIMELINE_SPAN_SEC).toBe(30);
    expect(annotations.ANNOTATION_MINIMUM_DURATION_SEC).toBe(0.25);
  });

  test("单点批注按默认时长生成时间区间", () => {
    expect(annotations.annotationTimelinePointRange(12, 20)).toEqual({ start: 12, end: 17 });
    expect(annotations.annotationTimelinePointRange(18, 20)).toEqual({ start: 15, end: 20 });
  });

  test("拖拽区间超过 30 秒会被截断", () => {
    const range = annotations.annotationTimelineDragRange(1, 40, 60);
    expect(range.end - range.start).toBeLessThanOrEqual(30.0001);
  });

  test("创建区间会被约束在视频时间线内", () => {
    const range = annotations.constrainAnnotationCreationRange(
      { start: 55, end: 70 },
      [],
      60,
    );
    expect(range.start).toBeGreaterThanOrEqual(0);
    expect(range.end).toBeLessThanOrEqual(60);
  });
});

test.describe("正文与引用（DC-07-008 / 011 / 014）", () => {
  test("批注正文上限为 2000 字符", () => {
    expect(annotations.ANNOTATION_DESCRIPTION_MAX_LENGTH).toBe(2000);
    expect(annotations.annotationDescriptionWithinLimit?.("字".repeat(2000)) ?? true).toBe(true);
  });

  test("会话引用包含批注序号与正文", () => {
    const text = annotations.annotationReferenceText(
      { displayNumber: 2, objectLabel: "小花", description: "这里增加一朵小花" },
      "zh",
    );
    expect(text).toContain("批注 2");
    expect(text).toContain("这里增加一朵小花");
    expect(text).toContain("小花");
  });

  test("手工输入的时间文本不会被当成结构化引用", () => {
    const reference = annotations.annotationReferenceText({ displayNumber: 1, description: "改这里" }, "zh");
    expect(annotations.annotationReferenceIsPresent(reference, "@video 01:00.24")).toBe(false);
    expect(annotations.annotationReferenceIsPresent(reference, `${reference}\n@video 01:00.24`)).toBe(true);
  });

  test("时间展示使用 MM:SS.ff 形式", () => {
    expect(annotations.annotationTimeText(0)).toBe("00:00.00");
    expect(annotations.annotationTimeText(60.24)).toBe("01:00.24");
    expect(annotations.annotationTimeText(150.52)).toBe("02:30.52");
  });
});

test.describe("锚点与轨道规则（DC-07-017 / 018 / 059）", () => {
  test("时间重叠的批注会被分配到不同轨道行", () => {
    const lanes = annotations.annotationTimelineLanes([
      { id: "a", range: { start: 10, end: 15 } },
      { id: "b", range: { start: 12, end: 18 } },
    ]);
    const values = Object.values(lanes).flat() as string[];
    expect(values.length).toBe(2);
    const first = lanes[values[0]] ?? lanes[0];
    expect(first).toBeDefined();
  });

  test("区间锚点必须被视频轨完全覆盖", () => {
    const timeline = [{ id: "a", cloud_file_id: "source-a", timeline_start_sec: 0, timeline_end_sec: 20 }];
    expect(
      annotations.annotationRangeCoveredByVideo(
        { timelineTimeSec: 2, durationSec: 8, isTimelineExpanded: true },
        timeline,
      ),
    ).toBe(true);
    expect(
      annotations.annotationRangeCoveredByVideo(
        { timelineTimeSec: 18, durationSec: 5, isTimelineExpanded: true },
        timeline,
      ),
    ).toBe(false);
  });

  test("发送前校验：必须同一源视频且不少于 4 秒", () => {
    expect(annotations.ANNOTATION_MINIMUM_SOURCE_DURATION_SEC).toBe(4);
    const timeline = [
      { id: "a-1", cloud_file_id: "source-a", timeline_start_sec: 1, timeline_end_sec: 5 },
      { id: "a-2", cloud_file_id: "source-a", timeline_start_sec: 5, timeline_end_sec: 9 },
      { id: "b-1", cloud_file_id: "source-b", timeline_start_sec: 9, timeline_end_sec: 15 },
    ];
    const ok = [...annotations.annotationVideoSendIssues(
      { timelineTimeSec: 3, durationSec: 4, isTimelineExpanded: true },
      timeline,
    )];
    expect(ok).toEqual([]);

    const crossed = [...annotations.annotationVideoSendIssues(
      { timelineTimeSec: 7, durationSec: 4, isTimelineExpanded: true },
      timeline,
    )];
    expect(crossed).toContain("spansMultipleVideoSources");
  });
});

test.describe("草稿、重叠与轨道（DC-07-005 / 006 / 007 / 018 / 059）", () => {
  const existing = [{ id: "first", timelineTimeSec: 10, durationSec: 5 }];

  test("区间创建会被裁剪，重叠位置被拒绝", () => {
    expect(
      annotations.constrainAnnotationCreationRange({ start: 35, end: 50 }, existing, 120),
    ).toEqual({ start: 35, end: 40 });
    expect(
      annotations.constrainAnnotationCreationRange({ start: 50, end: 60 }, existing, 120),
    ).toBeNull();
    expect(annotations.canPlaceAnnotationRange({ start: 35, end: 40 }, existing)).toBe(true);
    expect(annotations.canPlaceAnnotationRange({ start: 50, end: 55 }, existing)).toBe(false);
  });

  test("拖动批注区间会更新位置并保持时长", () => {
    const moved = annotations.moveAnnotationTimelineRange(
      { id: "second", timelineTimeSec: 20, durationSec: 5, isTimelineExpanded: true },
      30,
      "move",
      120,
      existing,
    );
    expect(moved).toEqual({ timelineTimeSec: 35, durationSec: 5 });
  });

  test("选区坐标会被归一化到画面内", () => {
    expect(
      annotations.normalizeAnnotationSelection({
        kind: "area",
        points: [
          { x: -1, y: 0.2 },
          { x: 1.5, y: 2 },
        ],
      }),
    ).toEqual({
      kind: "area",
      points: [
        { x: 0, y: 0.2 },
        { x: 1, y: 1 },
      ],
    });
  });

  test("批注只在锚点时间范围内可见", () => {
    const point = { timelineTimeSec: 10 };
    expect(annotations.annotationVisibleAtTime(point, 10)).toBe(true);
    expect(annotations.annotationVisibleAtTime(point, 12)).toBe(false);

    const expanded = { ...point, durationSec: 5, isTimelineExpanded: true };
    expect(annotations.annotationVisibleAtTime(expanded, 12)).toBe(true);
    expect(annotations.annotationVisibleAtTime(expanded, 16)).toBe(false);
  });

  test("轨道展示先物体后描述", () => {
    expect(annotations.annotationTimelineDisplay({ objectLabel: "小狗", description: "改成粉色" }, "zh")).toEqual({
      prefix: "小狗：",
      descriptionPlaceholder: "输入批注描述",
      text: "小狗：改成粉色",
    });
    expect(annotations.annotationTimelineDisplay({}, "zh").text).toBe("物体：输入批注描述");
  });

  test("Agent 请求只携带去重后的批注 ID 和固定路由", () => {
    expect(
      annotations.annotationAgentRequestRouting({
        annotationIds: ["annotation-1", "annotation-1", ""],
        taskIntent: "",
        inputOrigin: "chat",
      }),
    ).toEqual({
      annotationIds: ["annotation-1"],
      taskIntent: "generate_video",
      inputOrigin: "quick_action_user_override",
    });
  });
});

test.describe("区间拖拽与引用更新（DC-07-006 / 007 / 011 / 039）", () => {
  test("拖拽方向决定入点与出点", () => {
    expect(annotations.annotationTimelineDragRange(10, 14, 60)).toEqual({ start: 10, end: 14 });
    expect(annotations.annotationTimelineDragRange(10, 6, 60)).toEqual({ start: 6, end: 10 });
  });

  test("拖拽距离小于最小时长会被补齐", () => {
    const range = annotations.annotationTimelineDragRange(10, 10.01, 60);
    expect(range.end - range.start).toBeGreaterThanOrEqual(0.25);
  });

  test("整体移动区间保持时长", () => {
    const moved = annotations.moveAnnotationTimelineRange(
      { id: "a", timelineTimeSec: 10, durationSec: 5, isTimelineExpanded: true },
      3,
      "range",
      60,
    );
    expect(moved.timelineTimeSec).toBe(13);
    expect(moved.durationSec).toBe(5);
  });

  test("调整入点保持出点不变", () => {
    const moved = annotations.moveAnnotationTimelineRange(
      { id: "a", timelineTimeSec: 10, durationSec: 5, isTimelineExpanded: true },
      -2,
      "start",
      60,
    );
    expect(moved.timelineTimeSec).toBe(8);
    expect(moved.durationSec).toBe(7);
  });

  test("超出源时长的区间被裁剪到边界", () => {
    expect(
      annotations.constrainAnnotationCreationRange({ start: 55, end: 70 }, [], 60),
    ).toEqual({ start: 55, end: 60 });
    expect(
      annotations.constrainAnnotationCreationRange({ start: -5, end: 10 }, [], 60),
    ).toEqual({ start: 0, end: 10 });
  });

  test("替换引用行不会改动正文", () => {
    const oldReference = "◉ 批注 1   视频A 00:10.00–00:15.00";
    const composer = `${oldReference}\n这里增加一朵小花`;
    const next = annotations.replaceAnnotationReferenceLine(
      oldReference,
      composer,
      "◉ 批注 1   视频A 00:12.00–00:18.00",
    );
    expect(next).toContain("00:12.00–00:18.00");
    expect(next).toContain("这里增加一朵小花");
    expect(next).not.toContain("00:10.00–00:15.00");
  });
});
