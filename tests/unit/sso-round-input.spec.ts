import { expect, test } from "@playwright/test";
import { resolveRoundInput } from "../../src/fixtures/sso-round-input.js";

const source = { id: "original", name: "7MB.mp4", durationSec: 60.5, width: 1280, height: 720 };
const video = (id: string) => ({ ...source, id, name: `${id}.mp4`, durationSec: 20 });
test("指定历史产物不受更新产物影响；独立原片轮不受失败依赖影响", () => {
  const rounds = [{ finalStatus: "done", downloads: [video("v1")] }, { finalStatus: "done", downloads: [video("v2")] }, { finalStatus: "failed", downloads: [] }];
  expect(resolveRoundInput(2, 4, source, rounds).video?.id).toBe("v2");
  expect(resolveRoundInput(0, 5, source, rounds).video?.id).toBe("original");
});
test("缺失、失败、多个产物或未解码均阻塞依赖轮，不回退原片", () => {
  for (const dependency of [undefined, { finalStatus: "failed", downloads: [video("v1")] }, { finalStatus: "done", downloads: [] }, { finalStatus: "done", downloads: [video("a"), video("b")] }, { finalStatus: "done", downloads: [{ id: "x", name: "x.mp4" }] }]) {
    const result = resolveRoundInput(1, 2, source, dependency ? [dependency] : []);
    expect(result.video).toBeUndefined();
    expect(result.blockedReason).toContain("不替换来源");
  }
});
test("拒绝未来轮次及无效来源编号，防止意外发起真实任务", () => {
  for (const index of [-1, 2, 4, 0.5, NaN]) expect(() => resolveRoundInput(index, 2, source, [])).toThrow("Invalid source round");
});
