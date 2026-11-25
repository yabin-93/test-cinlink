import { test210 as test, guarded210 } from '../../tools/editor/erye210-runner.js';
import { restored002, restored007, restored010, restored013, restored015, restored040, rapid055, errorNavigation056, restoredEightVersion210 } from '../../tools/editor/erye210-restored-eight.js';
for(const [id,title,action] of [
 ['002','恢复：首次导入默认Media',restored002],['007','恢复：Watermark/Image重开记忆',restored007],
 ['010','恢复：同账号双工程导航记忆隔离',restored010],['013','恢复：纯音频水印写操作限制',restored013],
 ['015','恢复：空选区引导与有效选区恢复',restored015],['040','恢复：删除重叠独立音频及撤销',restored040],
 ['055','新增：快速切TAB最终面板一致',rapid055],['056','新增：真实模块错误后导航仍可用',errorNavigation056],
] as const)test(`ERYE210-${id} ${title} @ERYE-210`,async({nav210:n})=>guarded210(async()=>{
 test.setTimeout(600000);test.info().annotations.push({type:'case-version',description:restoredEightVersion210});await action(n);
}));
