# ERYE-210 006～010 历史批次进度

执行时2 Passed / 2 Failed / 1 Blocked（008旧定义）。新版008已替换，Not Run。

[完整报告](results-006-010-prod-20261113.md) · [当前进度](execution-status-current.md)

| 用例 | 执行时状态 | 实际结果 |
|---|---|---|
| [ERYE210-006](results-006-010-prod-20261113.md#erye210-006) | Passed | Passed；从Captions通过当前真实Watermark一级→文字/图片二级控件定位，两子页切换正确；NAV006和logo-A.png保持；导航前后版本2及全部内容相同。仅覆盖实际两级入口，不宣称存在独立结果卡快捷入口。 |
| [ERYE210-007](results-006-010-prod-20261113.md#erye210-007) | Failed | Failed；同一工程Watermark/Image收起编辑器再重开变成Watermark/Text，刷新重开变成Captions；内容及版本1保持。无真实旧voice样本，旧映射/清除偏好分支未执行。 |
| [ERYE210-008](results-006-010-prod-20261113.md#erye210-008) | Blocked | Blocked（旧定义）；没有真实失效偏好/旧导航链接，用户确认“没有，记录前置缺口”；仅准备工程并核对正常打开，负向步骤未执行。随后按用户要求替换为面板收起/展开v2，新版Not Run。 |
| [ERYE210-009](results-006-010-prod-20261113.md#erye210-009) | Passed | Passed；五入口及可见子页14个检查点均保持同一工程、12秒、暂停和原C1；版本1及内容不变，会话消息0→0，导航写请求0，页面积分前后及刷新回读均3045。未提交Agent写操作，不宣称Agent执行或服务端账本专项通过。 |
| [ERYE210-010](results-006-010-prod-20261113.md#erye210-010) | Failed | Failed；U1/D1的PA=Captions、PB=Media在页内分别恢复正确，但刷新重开同一PB变成Captions；两工程版本1及内容不变。U2和D2无环境，跨账号/设备分支未执行。 |
