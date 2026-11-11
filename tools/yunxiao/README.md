# 云效缺陷同步与家里电脑配置

这套工具使用PowerShell 7.2+和curl调用云效OpenAPI：创建缺陷 → 上传真实截图及补充附件 → 正文嵌图 → 回读验证。目录可随整个工程移动，不再依赖办公室用户名、兄弟`test`工程、临时脚本或旧报告中的公共函数。

## 目录与入口

| 文件 | 用途 |
|---|---|
| `config.json` | 当前cinlink-WEB组织、项目、缺陷类型及默认字段；没有令牌 |
| `yunxiao-credential.ps1` | 当前Windows用户的DPAPI凭据管理；兼容原加密缓存位置 |
| `init.ps1` | 本机首次输入令牌，或`-Force`更新缓存 |
| `check.ps1` | 只读检查令牌、项目与当前必填字段，可读取参考缺陷的字段 |
| `sync-defect.ps1` | 单条缺陷同步入口；默认DryRun，显式`-Execute`才写云效 |
| `common.ps1` / `sync-core.ps1` | HTTP、计划校验、检查点恢复、上传、嵌图及回读实现 |
| `examples/plan.json` / `examples/description.md` | 新批次的计划和九段正文模板；没有假失败截图 |
| `test-offline.ps1` | 离线契约测试，使用内存假服务，不访问云效 |

所有入口用`$PSScriptRoot`定位公共脚本和默认配置。计划里的描述/图片/附件路径相对于**plan.json所在文件夹**。`stateDirectory`相对于**配置文件所在文件夹**；默认落在工程的`reports/yunxiao/`。凭据路径相对于当前用户，不跟随工程一起拷贝。

## 家里电脑首次配置（Windows）

### 1. 复制代码

建议将整个工程放在家里自己的目录，例如`D:\proj\cinlink`。至少带上`tools/yunxiao/`、根目录`AGENTS.md`及需要参考的`docs/defects/`。只运行云效工具不需要Node、Playwright或CinLink浏览器登录。

不需要复制旧`.tmp-*`脚本、其他工程的`test/tools`或旧`reports`公共脚本。也不要把旧批次计划当作新缺陷直接重放：它可能已经提交过。

### 2. 准备PowerShell和curl

需要PowerShell **7.2或以上**（命令名`pwsh`），不是Windows自带5.1。可按[微软安装说明](https://learn.microsoft.com/en-us/powershell/scripting/install/install-powershell-on-windows)安装，例如：

```powershell
winget install --id Microsoft.PowerShell --source winget
pwsh --version
curl.exe --version
```

后续示例在工程根目录执行；脚本也支持从其他工作目录用完整路径调用。

### 3. 核对不含密钥的配置

`config.json`已配置本工程常用值：

| 配置 | 当前值/含义 |
|---|---|
| organizationId | `645887adc88feae8ff9706ae` |
| projectId / projectName | `1e401ac99539c3999e00e40006` / cinlink-WEB |
| workitemTypeId | `37da3a07df4d08aef2e3b393` / 缺陷 |
| defaults.assignedTo | 当前常用负责人ID（牛诗晴） |
| defaults.sprint | 现有“重构10-29”迭代ID；以后换迭代需要更新 |
| defaults.labels | 现有“测试环境win-chrome”标签ID；其他环境不要照搬 |
| defaults.priority / seriousLevel | 高 / 2-严重；每条计划可以覆盖 |

默认值是从现有项目同步配置整理的，**不是要求所有新缺陷都用同一迭代、环境或严重程度**。换环境或迭代时修改配置，或在`plan.fields`覆盖。脚本执行时会重新读取目标项目必填字段和优先级/严重程度选项。

个性化配置可先复制一份；`config.local.json`已被Git忽略：

```powershell
Copy-Item .\tools\yunxiao\config.json .\tools\yunxiao\config.local.json
```

使用这份配置时，后续`check.ps1`和`sync-defect.ps1`都加：

```text
-ConfigPath .\tools\yunxiao\config.local.json
```

### 4. 在家里电脑配置自己的令牌

云效右上角头像 → 个人设置 → 个人访问令牌 → 新建访问令牌，按[云效官方说明](https://help.aliyun.com/zh/yunxiao/developer-reference/obtain-personal-access-token/)选择有效期和同步所需权限。需要能查询目标项目/字段、查询和创建/更新工作项、查询和上传附件；账号本身也必须有cinlink-WEB访问权限。

```powershell
pwsh -NoProfile -File .\tools\yunxiao\init.ps1
```

按提示在本机终端输入令牌，输入不回显。不要把令牌发到聊天、写进`config.json`或放进命令参数。

默认加密缓存位置为：

```text
%USERPROFILE%\.codex\.sandbox-secrets\yunxiao-pat.clixml
```

该路径由当前用户计算，家里用户名不同也无需修改源码。Windows DPAPI加密缓存绑定原用户和原电脑，[不能直接跨电脑解密使用](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/import-clixml)。办公室缓存不要复制过去，在家里重新配置即可。

令牌读取优先级：进程级`YUNXIAO_ACCESS_TOKEN` → Windows用户级同名环境变量 → 本机加密缓存。环境变量已设置时会优先于缓存；更新缓存不会替换环境变量。一般使用加密缓存即可；有需要时可用`YUNXIAO_CREDENTIAL_PATH`或`init.ps1 -CredentialPath`指定本机其他缓存位置。

### 5. 做只读联通检查

```powershell
pwsh -NoProfile -File .\tools\yunxiao\check.ps1
```

成功会显示`ready: true`、cinlink-WEB及当前必填字段。此命令只GET，不新建缺陷、不上传附件。

需要核对已有缺陷的负责人/迭代/标签时，可从云效链接的`openWorkitemIdentifier`取**内部ID**，不能直接填FWXC编号：

```powershell
pwsh -NoProfile -File .\tools\yunxiao\check.ps1 -ReferenceWorkitemId 1a1873114f90458a91dff393ee
```

这只输出该参考项字段供核对，不修改配置或已有缺陷。

## 同步一条新的真实缺陷

### 1. 建独立批次并准备证据

```powershell
$batch = '.\reports\yunxiao\my-new-defect'
New-Item -ItemType Directory -Path $batch -Force | Out-Null
Copy-Item .\tools\yunxiao\examples\plan.json $batch
Copy-Item .\tools\yunxiao\examples\description.md $batch
```

将对应本次用例/运行的真实失败PNG复制到该批次，保留原图，不加工画面；补充附件可用脱敏JSON/MD/TXT/SRT、必要WAV/MP4/PDF。原始trace、storageState、带签名链接和未经脱敏的诊断包不直接上传。截图须人工核对场景、批次及敏感内容。

工具不生成失败截图。离线测试的1像素PNG仅用于假服务；公开同步入口拒绝`OFFLINE-`计划。

### 2. 填写计划与九段正文

编辑`plan.json`：

- `key`：本次缺陷的唯一同步标识，例如`CINLINK-NEW-CASE-20261106-001`，也用作检查点目录名。不能使用示例占位。
- `subject`：功能/场景 + 可观察的问题。
- `descriptionPath`：正文文件相对路径。
- `fields`：可覆盖配置中的`assignedTo/sprint/labels/priority/seriousLevel`；保留`{}`时沿用配置。
- `images`：真实PNG相对路径、场景说明`caption`和原图SHA256，至少一张。
- `attachments`：可选补充附件，结构为`{"path":"evidence.json","sha256":"实际哈希"}`。

取得哈希：

```powershell
Get-FileHash -LiteralPath "$batch\failure.png" -Algorithm SHA256
```

文件名保持简单且唯一。正文沿用`AGENTS.md`九段模板：现象、前置步骤、提示词、复现步骤、实际结果、预期结果、影响、补充、失败截图。写完整指令、真实补槽填写值及已知run/会话；页面操作无run则注明，不编造。

保留末节的`__SCREENSHOTS__`。工具上传后会替换为云效附件的稳定图片引用，并在“补充”中加入同步标识。不要手填临时下载URL。

### 3. 先离线预检

```powershell
pwsh -NoProfile -File .\tools\yunxiao\sync-defect.ps1 -PlanPath "$batch\plan.json" -DryRun
```

DryRun验证格式、真实文件存在、PNG签名、哈希、文件名和明显凭据/签名链接，输出准备提交的正文/字段和附件清单；**不取令牌、不联网、不写云效**。不加`-Execute`时也默认DryRun。

### 4. 本次已获同步授权后执行

```powershell
pwsh -NoProfile -File .\tools\yunxiao\sync-defect.ps1 -PlanPath "$batch\plan.json" -Execute
```

只对本计划新建的缺陷上传附件和写描述。默认不查询历史重复缺陷；用户要求查重时可加`-CheckDuplicates`。无论是否查重，都保留本批检查点以防同一提交重复创建。

正常完成输出缺陷编号、链接、`verified: true`和附件清单。脚本回读正文、字段、截图附件ID/名称/字节数与图片引用，结果留在：

```text
reports/yunxiao/<key>/
  checkpoint.json
  verified-description.md
  verified-item.json
  verified-attachments.json
  result.json
```

再按项目习惯更新`docs/defects/`、用例状态/报告、`docs/testing-progress.md`、`docs/verification.md`及`docs/codex-context.md`。工具不会把失败用例改为通过，也不自行修改这些测试文档。

## 中断、恢复及常见问题

| 情况 | 处理 |
|---|---|
| 创建/上传响应丢失 | 保留检查点，用完全相同计划再次执行；先只读核对自身标识或附件。无法唯一确认时停止，不盲目重发 |
| 已完成的同计划再次执行 | 仅回读核验，不再次创建、上传或覆盖正文 |
| 同key的计划/配置/图片变化 | 停止；先核对原工作项，不删除检查点“重来” |
| 云效正文被人修改 | 核验不一致则停止，不覆盖人工修改 |
| 401/403 | 检查令牌有效期、API权限及账号项目权限；不是CinLink浏览器登录问题 |
| 必填字段/选项不符 | 用check读取当前字段，更新新计划或配置；不照搬过期迭代/旧环境标签 |
| 复制办公室clixml后不能解密 | 在家里执行`init.ps1 -Force`重新配置 |
| 找不到截图/哈希不符 | 检查相对于计划文件的路径并核对原图；不能用别的场景图片替代 |

写操作不做传输自动重试；只读请求最多尝试3次。正常恢复只会操作检查点绑定、正文含本次同步标识的缺陷。已经发出但服务端仍无可确认记录的操作，保留检查点并人工核对；不要手工清除标记后重复提交。

若换电脑要续接**未完成**批次，应先核对云效现状，保留同一计划、原图、配置与对应检查点；不要将已完成历史批次作为新缺陷重放。常规迁移只带源码、模板、需要的脱敏缺陷文档及归档截图；`reports/`里的原始响应可能有签名URL，不整包外传。

## 给家里电脑Codex的使用指令

> 先读AGENTS.md和tools/yunxiao/README.md。使用tools/yunxiao/config.json及本机凭据，通过OpenAPI同步本次授权范围的真实失败。按九段模板生成独立计划、完整步骤和对应截图，先DryRun；已有同步授权时继续Execute，上传并嵌图，回读验证后更新本地记录。不要重放旧批次或新建测试任务，不打印令牌。

## 验证方式与范围

```powershell
pwsh -NoProfile -File .\tools\yunxiao\test-offline.ps1
pwsh -NoProfile -File .\tools\yunxiao\check.ps1
```

离线测试覆盖本机凭据、带空格路径/异地工作目录、预检、假服务完整同步、创建/上传结果丢失恢复、完成后重跑、哈希/必填字段/目标组织/敏感URL保护。只读check验证本机到真实云效的认证及目标项目。整理工具本身不新建真实缺陷，真实云效创建/上传需要下一次明确的缺陷同步任务验证。

2026-11-06整理验证：7个脚本语法检查、20项离线检查通过；本机复制到独立带空格目录并从其他工作目录执行公开入口DryRun通过，真实PNG哈希已校验；复制后只读check读取cinlink-WEB及参考缺陷通过，云效写入0。家里实体电脑尚未执行，首次到家仍需init和check。详见[验证记录](../../docs/verification.md)。

旧临时批次脚本和原凭据脚本保留历史，不批量改写或删除；新任务优先使用本目录入口。
