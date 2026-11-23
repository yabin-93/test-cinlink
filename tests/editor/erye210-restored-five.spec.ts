import {test210 as test,guarded210} from '../../tools/editor/erye210-runner.js';
import {restored004,restored005,restored018,restored020,restored041,restoredFiveVersion210} from '../../tools/editor/erye210-restored-five.js';
for(const[id,title,action]of[
 ['004','原生译制工程句子选择与时间定位',restored004],['005','未应用清理审核跨TAB保持',restored005],
 ['018','原生配音生成中独立水印保存',restored018],['020','原生配音稿撤销重做及保存',restored020],
 ['041','素材范围搜索无结果及清空恢复',restored041],
]as const)test(`ERYE210-${id} v4 ${title} @ERYE-210`,async({nav210:n})=>guarded210(async()=>{test.setTimeout(1200000);test.info().annotations.push({type:'case-version',description:restoredFiveVersion210});await action(n);}));
