# ERYE199-006 v2生产执行（2026-11-16）

**结果：Passed。** 新建专用项目、独立会话/工程，以原006仓库自动化函数实跑，真实Agent一次完成三项变换。没有补槽、没有重复发送；普通预览、全屏、刷新及实际播放通过。当前63条：**22 Passed、10 Failed、0 Blocked、31 Not Applicable、0 Not Run**。其他用例未重跑、既有云效未改。

**本轮跳过：**独立可编辑蒙版及输入局部坐标；独立局部锚点及其坐标变换。原完整定义及旧Blocked保留[归档](revision-006-original-20261116.json)，当前v2通过不代表这些高级目标已支持。

[当前完整用例](cases.md#erye199-006-current) · [范围修订](revision-006-current-transform-20261116.md) · [结构化结果](execution-status-006-v2-production-20261116.json) · [原图哈希](evidence-006-v2-current-transform-production-20261116/manifest.json)

## 前置和实际指令

生产app.cinlink.ai，Windows / Ego Lite有头。新工程仅含一段640×360、30fps、10秒V及关联原声，源0～10秒、时间线起点0、1倍速；初始中心(320,180)、100%、0度。API仅用于夹具准备和已保存结果回读，三项变换由页面发送Agent完成。

工程：`ERYE199-006-v2-current-transform-20261116`；工程ID：`0f453b23-11ca-469b-a5f5-6c44d2c5b0d6`；会话ID：`c06f02e6-4751-4349-a88d-ab6d683bfa84`；项目ID：`bfe54e5e-a9b0-4c88-99b9-ce353d786b4a`。

原run：`run_v2_54dc746c4adc47bfa86e0a93931619b9`，done；页面显示耗时约63秒。

> 只编辑当前工程“ERYE199-006-v2-current-transform-20261116”（工程ID：0f453b23-11ca-469b-a5f5-6c44d2c5b0d6），不新建工程、不生成替代视频。请只编辑当前视频工程“ERYE199-006-v2-current-transform-20261116”（工程ID：0f453b23-11ca-469b-a5f5-6c44d2c5b0d6）唯一的视频片段（轨道ID：70278086-26ea-4310-a302-0288f8256d8e，片段ID：06604a00-009a-495e-bc58-f5527e0c9ff0）：以640×360序列左上角为原点，将片段中心位置设为序列像素(400,200)，等比缩放设为50%，顺时针旋转30度。位置使用序列像素，不使用窗口坐标或旋转后的局部坐标；50%表示原片宽高各一半。这是静态参数设置，保留同一原片、源0～10秒、时间线起点0秒、1倍速及关联原声，不改变不透明度，不新建工程、不生成替代视频。当前未实现的独立蒙版、局部锚点及输入局部坐标本轮跳过，不创建这些对象，也不请求关键帧。请执行已支持的这三项设置。

## 实际步骤与结果

| 步骤 | 操作及结果 |
|---|---|
| 1 | 新工程选择唯一视频，保存基线，发送完整指令一次 |
| 2 | 原任务done后定位2秒，核验画面中心(400,200)、未旋转尺寸320×180、顺时针30度；原片帧内标注为frame60、2秒 |
| 3 | 点击“放大预览”进入真实全屏，显示变大，序列内中心/大小/角度保持；随后原生退出 |
| 4 | 刷新同一工程再定位2秒，三项设置和画面保持 |
| 5 | 从2秒实际播放再暂停，静态变换保持；回读工程仅三项变换改变，原片/源范围/速度/起点/关联原声及其他内容不变 |

## 可见画面核验

采用原始截图审核，并将页面实际画布/视频边界换算为640×360序列坐标；不以Agent“已完成”或保存参数代替画面验收。

| 场景 | 画布显示尺寸 | 画面中心（序列像素） | 未旋转尺寸 | 旋转角度 | 旋转后边界 |
|---|---|---|---|---|
| normal | 896.00×504.00 | (400.0000,200.0000) | 320×180 | 30.0000° | 367.1282×315.8846 |
| fullscreen | 1509.33×849.00 | (400.0000,200.0000) | 320×180 | 30.0000° | 367.1281×315.8846 |
| refreshed | 896.00×504.00 | (400.0000,200.0000) | 320×180 | 30.0000° | 367.1282×315.8846 |

2秒源画面三处均为2.000秒，工程时长均10秒；实际画面中心误差小于1序列像素，边界与独立矩形几何367.1281×315.8846一致。全屏只是显示尺度变大，没有按窗口坐标重算对象位置。

## 截图及范围

本轮无失败，无新增失败截图；保存7张实测原图，旧Blocked截图仍留历史。未执行正式导出、蒙版、局部锚点、输入局部坐标或关键帧。

![006 baseline](evidence-006-v2-current-transform-production-20261116/006-baseline.png)

![006 before-submit](evidence-006-v2-current-transform-production-20261116/006-before-submit.png)

![006 agent-terminal](evidence-006-v2-current-transform-production-20261116/006-agent-terminal.png)

![006 normal-verified](evidence-006-v2-current-transform-production-20261116/006-normal-verified.png)

![006 fullscreen-verified](evidence-006-v2-current-transform-production-20261116/006-fullscreen-verified.png)

![006 refreshed-verified](evidence-006-v2-current-transform-production-20261116/006-refreshed-verified.png)

![006 playback-verified](evidence-006-v2-current-transform-production-20261116/006-playback-verified.png)

## 脚本与验证

入口保持：`npm run test:editor:199 -- --base-url https://app.cinlink.ai --cases 006`。006函数及可见画面核验均接入仓库，后续默认执行新版；自动化登记AUTO，与历史Blocked区分。没有新增依赖。

`npm run test:editor:199:unit`：12通过；`npm run cases:check`：526条、0问题；新增模块语法检查通过。离线检查不代替上述生产实跑。
