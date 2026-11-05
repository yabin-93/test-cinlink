import { test, expect } from "@playwright/test";
import { fillClarificationFields } from "../../src/fixtures/clarification.js";

test("完整用例参数用于补槽：混剪两素材、18秒、文字水印；保留无关搜索框", async ({ page }) => {
  await page.setContent(`<input type="search" placeholder="Search conversations"><input required name="duration_seconds" type="number" value="30"><input required name="watermark_text"><select name="source_media"><option value="">请选择</option><option value="A">A</option><option value="B">B</option><option value="both">Both videos</option></select>`);
  const filled = await fillClarificationFields(page, "MW-09", "把这两个视频混剪成18秒，添加文字水印E2E-TEST");
  expect(await page.locator('[name="duration_seconds"]').inputValue()).toBe("18");
  expect(await page.locator('[name="watermark_text"]').inputValue()).toBe("E2E-TEST");
  expect(await page.locator('[name="source_media"]').inputValue()).toBe("both");
  expect(await page.locator('input[type="search"]').inputValue()).toBe("");
  expect(filled).toHaveLength(3);
});
