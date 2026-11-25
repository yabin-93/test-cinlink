// Manual cases have no matching automated flow in this runner.
export const pendingManualRevisionIds = Object.freeze(['045']);
const deferred = {
  '014': '轨道编辑锁及锁定批量操作本版本不做，后续版本再测',
  '016': '真实子序列创建暂不支持，按用户要求当前先跳过，功能实现后再测',
  '018': '父子序列范围及嵌套引用暂不支持，按用户要求当前先跳过，功能实现后再测',
  '021': '真实动画通道和关键帧尚未提供',
  '022': '关键帧及其有效源边界前置尚未提供',
  '023': '独立可编辑视频蒙版尚未提供',
  '024': '路径蒙版及路径关键帧前置尚未提供',
  '025': '可编辑效果栈及效果实例尚未提供',
  '026': '真实可排序效果栈前置尚未提供',
  '027': '独立Graphic组及可编辑模板尚未提供',
  '031': '工程内真实可编辑视频转场尚未提供',
  '032': '真实视频转场及余量校验前置尚未提供',
  '033': '工程内真实可编辑音频转场尚未提供',
  '035': '工程LUT与可编辑SDR调色尚未提供',
  '037': '真实调整层及其效果范围控制尚未提供',
  '038': '视频波形/矢量示波器及调色前置尚未提供',
  '039': '工程内可编辑色度抠像及边缘控制尚未提供',
  '041': '工程稳定分析/取消/失败恢复前置尚未提供',
  '044': '工程内可编辑音频效果链尚未提供',
  '046': '音乐结构重组及候选替换前置尚未提供',
  '056': '真实效果能力注册表读取入口尚未提供'
};
export function currentReleaseScope(id) {
  if (pendingManualRevisionIds.includes(id)) return { status: 'Not Run', reason: '045遵循021～050暂不接自动化的约定；本执行器不代跑人工用例，人工业务实测状态见当前进度', source: '用户既有021～050人工执行范围；保留旧自动探测门禁，不代表本地人工业务未执行' };
  if (id === '051') return { status: 'Not Run', reason: '051 v4 按手工用例核验「选择媒体」入口，业务结果见当前测试进度', source: 'docs/cases/requirements/ERYE-199/cases.md#erye199-051-current-v4' };
  return deferred[id] ? { status: 'Not Applicable', reason: deferred[id], source: '2026-11-16逐条复核；核心能力/原目标仍延期，恢复条件见revision-na31-current-capabilities-20261116.md' } : null;
}
