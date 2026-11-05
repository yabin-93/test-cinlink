import type { Page } from "@playwright/test";

/** Fill visible workflow fields from the already accepted case parameters. */
export async function fillClarificationFields(page: Page, caseId: string, prompt: string) {
  const filled: Array<{ field: string; value: string }> = [];
  const durations: Record<string, string> = { "MW-03": "60.5", "MW-08": "30", "MW-09": "18", "MW-10": "20", "MW-25": "30" };
  const inputs = page.locator('input:visible:not([type="file"]):not([type="password"]):not([type="search"]), textarea:visible');
  for (let i = 0; i < await inputs.count(); i++) {
    const input = inputs.nth(i);
    if (!await input.isEnabled()) continue;
    const facts = await input.evaluate(element => {
      const el = element as HTMLInputElement;
      return { name: [el.name, el.id, el.placeholder, ...Array.from(el.labels ?? []).map(l => l.textContent ?? "")].join(" "), type: el.type, value: el.value, required: el.required || el.getAttribute("aria-required") === "true", readOnly: el.readOnly, min: el.min };
    });
    if (facts.readOnly || /search|搜索|email|mail|password/i.test(facts.name) || ["checkbox", "radio", "button", "submit"].includes(facts.type)) continue;
    let value: string | undefined;
    if (/duration|时长|秒/i.test(facts.name)) value = durations[caseId] ?? "30";
    else if (/watermark|水印/i.test(facts.name)) value = caseId === "MW-26" ? "E2E-P0" : "E2E-TEST";
    else if (/scale|倍率|放大倍/i.test(facts.name)) value = "2";
    else if (/width|宽度/i.test(facts.name)) value = "2560";
    else if (/height|高度/i.test(facts.name)) value = "1440";
    else if (/language|语言|语种/i.test(facts.name)) value = /source|源/i.test(facts.name) ? "zh" : "en";
    else if (!facts.value && facts.required) value = facts.type === "number" ? (facts.min || "1") : prompt;
    if (value !== undefined && value !== facts.value) { await input.fill(value); filled.push({ field: facts.name, value }); }
  }
  const selects = page.locator("select:visible");
  for (let i = 0; i < await selects.count(); i++) {
    const select = selects.nth(i);
    if (!await select.isEnabled() || await select.inputValue()) continue;
    const choices = await select.locator("option").evaluateAll(options => options.map(el => ({ value: (el as HTMLOptionElement).value, label: el.textContent ?? "", disabled: (el as HTMLOptionElement).disabled })));
    let chosen = /两个|三个/.test(prompt) ? choices.find(c => c.value && !c.disabled && /both|all|全部|都/i.test(c.label)) : undefined;
    if (/文字水印/.test(prompt)) chosen ??= choices.find(c => c.value && !c.disabled && /文字|text/i.test(c.label));
    if (chosen) { await select.selectOption(chosen.value); filled.push({ field: await select.getAttribute("name") ?? "select", value: chosen.value }); }
  }
  return filled;
}
