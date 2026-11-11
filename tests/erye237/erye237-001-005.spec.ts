import { test } from "../../src/fixtures/staging-session.js";

/**
 * ERYE-237 图像编辑 001～005。
 *
 * 这些用例依赖提测方提供的真实图像编辑入口、I1/I2/I3 及 V1/V2/V3
 * 版本基线。当前仓库尚无稳定的页面/领域锚点和专用基线，因此先以
 * fixme 形式登记，避免把普通素材或模拟点击误报为业务通过。
 */
test.describe("@ERYE-237 图像编辑 001～005", () => {
  test.fixme("ERYE237-001 导入图与生成图统一打开", async () => {});
  // 002另有tools/erye237/erye237-002.cua.mjs有头部分脚本；此Playwright条目仍为占位。
  test.fixme("ERYE237-002 指定第二张图片而非最近图片", async () => {});
  test.fixme("ERYE237-003 无打开文档时明确资源打开", async () => {});
  test.fixme("ERYE237-004 查看版本与生成版本血缘", async () => {});
  test.fixme("ERYE237-005 同一图片连续编辑追加同一文档", async () => {});
});
