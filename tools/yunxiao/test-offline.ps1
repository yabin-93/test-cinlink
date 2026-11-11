#requires -Version 7.2
# Contract tests use an in-memory fake service. No requests reach Yunxiao.
$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'sync-core.ps1')
$checks = [Collections.Generic.List[string]]::new()
function Assert-Test { param([bool]$Condition, [string]$Name) if (-not $Condition) { throw "离线检查失败：$Name" }; $checks.Add($Name) }
function Expect-Failure { param([scriptblock]$Action, [string]$Name) $caught = $false; try { & $Action | Out-Null } catch { $caught = $true }; Assert-Test $caught $Name }
$root = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../..'))
$out = Join-Path $root ('reports/yunxiao/offline-' + [Guid]::NewGuid().ToString('N'))
$fixture = Join-Path $out 'home computer with spaces'
$null = New-Item -ItemType Directory -Path $fixture -Force
$configFile = Join-Path $fixture 'config.json'
Copy-Item -LiteralPath (Join-Path $PSScriptRoot 'config.json') -Destination $configFile
$config = Read-YunxiaoConfig $configFile
$config._stateRoot = Join-Path $out 'states'
$credentialFile = Join-Path $fixture $(if ($IsWindows) { 'profile/.codex/.sandbox-secrets/test-only.clixml' } else { 'private-local.env' })
Save-YunxiaoAccessToken -SecureToken (ConvertTo-SecureString 'offline-cache-check-not-real' -AsPlainText -Force) -CredentialPath $credentialFile
if ($IsWindows) {
    $cached = Import-Clixml -LiteralPath $credentialFile
    Assert-Test ($cached.GetNetworkCredential().Password -eq 'offline-cache-check-not-real') 'DPAPI在临时用户目录保存/解密，未触碰实际凭据'
    Assert-Test ((Get-YunxiaoCredentialPath) -eq (Join-Path ([Environment]::GetFolderPath('UserProfile')) '.codex/.sandbox-secrets/yunxiao-pat.clixml')) '凭据路径从当前用户计算'
} else {
    $savedCanonical = $env:ALIBABA_CLOUD_YUNXIAO_ACCESS_TOKEN; $savedLegacy = $env:YUNXIAO_ACCESS_TOKEN
    try {
        $env:ALIBABA_CLOUD_YUNXIAO_ACCESS_TOKEN = $null; $env:YUNXIAO_ACCESS_TOKEN = $null
        Assert-Test ((Get-YunxiaoAccessToken -CredentialPath $credentialFile -NoPrompt) -eq 'offline-cache-check-not-real') 'Mac临时私有env凭据保存读取，未触碰实际凭据'
        Assert-Test ((& stat -f '%Lp' $credentialFile) -eq '600') 'Mac凭据文件权限0600'
        $env:ALIBABA_CLOUD_YUNXIAO_ACCESS_TOKEN = 'offline-process-token'
        Assert-Test ((Get-YunxiaoAccessToken -CredentialPath $credentialFile -NoPrompt) -eq 'offline-process-token') '进程令牌优先于本机文件'
        Assert-Test ((Get-YunxiaoCredentialPath) -eq (Join-Path $root 'local.env')) 'Mac默认凭据定位工程local.env'
    } finally { $env:ALIBABA_CLOUD_YUNXIAO_ACCESS_TOKEN = $savedCanonical; $env:YUNXIAO_ACCESS_TOKEN = $savedLegacy }
}
function Get-YunxiaoAccessToken { return 'offline-transport-token-not-real' }
# 1px fixture is ONLY for this fake transport; CLI rejects OFFLINE keys.
$png = Join-Path $fixture 'offline-transport-fixture.png'
[IO.File]::WriteAllBytes($png, [Convert]::FromBase64String('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a2ioAAAAASUVORK5CYII='))
$evidence = Join-Path $fixture 'redacted.json'; [IO.File]::WriteAllText($evidence, '{"offlineOnly":true}')
$description = Join-Path $fixture 'description.md'
Copy-Item -LiteralPath (Join-Path $PSScriptRoot 'examples/description.md') -Destination $description
function New-TestPlan {
    param([string]$Key)
    $json = @{ key = $Key; subject = '离线契约测试，不得上传'; descriptionPath = 'description.md'; fields = @{};
        images = @(@{ path = 'offline-transport-fixture.png'; caption = '离线夹具，非失败截图'; sha256 = (Get-FileHash $png -Algorithm SHA256).Hash });
        attachments = @(@{ path = 'redacted.json'; sha256 = (Get-FileHash $evidence -Algorithm SHA256).Hash }) }
    $path = Join-Path $fixture ($Key + '.json'); Write-YunxiaoJson $path $json
    return Read-YunxiaoPlan $path $config
}
function Reset-Fake {
    param([string]$Fault = '')
    $script:remote = @{ calls = [Collections.Generic.List[string]]::new(); uploads = [Collections.Generic.List[string]]::new(); item = $null; files = @(); fault = $Fault }
}
$request = {
    param($method, $uri, $body)
    $remote.calls.Add("$method $uri")
    if ($method -eq 'GET' -and $uri.EndsWith('/projects/' + $config.projectId)) { return @{ id = $config.projectId; name = $config.projectName } }
    if ($method -eq 'GET' -and $uri.EndsWith('/fields')) {
        return @(@{ id = 'subject'; name = '标题'; required = $true }, @{ id = 'assignedTo'; name = '负责人'; required = $true },
            @{ id = 'sprint'; name = '迭代'; required = $true }, @{ id = 'labels'; name = '标签'; required = $true })
    }
    if ($method -eq 'POST' -and $uri.EndsWith('/workitems:search')) { if ($remote.item) { return @(@{ id = $remote.item.id; subject = $remote.item.subject }) }; return @() }
    if ($method -eq 'POST' -and $uri.EndsWith('/workitems')) {
        $remote.item = @{ id = 'offline-item'; serialNumber = 'OFFLINE-1'; subject = $body.subject; description = $body.description; formatType = 'MARKDOWN';
            space = @{ id = $body.spaceId }; workitemType = @{ id = $body.workitemTypeId }; assignedTo = @{ id = $body.assignedTo };
            sprint = @{ id = $body.sprint }; labels = @($body.labels | ForEach-Object { @{ id = $_ } });
            customFieldValues = @($body.customFieldValues.Keys | ForEach-Object { @{ fieldId = $_; values = @(@{ identifier = $body.customFieldValues[$_] }) } }) }
        if ($remote.fault -eq 'create-timeout') { $remote.fault = ''; throw '模拟创建成功但响应丢失' }
        return @{ id = 'offline-item' }
    }
    if ($uri.EndsWith('/attachments') -and $method -eq 'GET') { return $remote.files }
    if ($method -eq 'GET' -and $uri.EndsWith('/offline-item')) { return $remote.item }
    if ($method -eq 'PUT' -and $uri.EndsWith('/offline-item')) { $remote.item.description = $body.description; return @{} }
    throw '离线假服务收到意外调用'
}
$upload = {
    param($uri, $file)
    $remote.uploads.Add($file.name)
    $entry = @{ id = 'offline-file-' + ($remote.files.Count + 1); fileName = $file.name; size = $file.size }
    $remote.files += $entry
    if ($remote.fault -eq 'upload-timeout') { $remote.fault = ''; throw '模拟上传成功但响应丢失' }
    return @{ id = $entry.id; name = $entry.fileName; size = $entry.size }
}
Reset-Fake
$plan = New-TestPlan 'OFFLINE-SUCCESS'
$originalDirectory = Get-Location
try { Set-Location ([IO.Path]::GetTempPath()); $dry = Invoke-YunxiaoDefectSync $plan } finally { Set-Location $originalDirectory }
Assert-Test ($dry.dryRun -and $dry.cloudWrites -eq 0 -and $remote.calls.Count -eq 0) '异地工作目录DryRun不读凭据、不联网、不写云效'
$done = Invoke-YunxiaoDefectSync $plan -Execute -Request $request -Upload $upload
Assert-Test ($done.verified -and $done.createdNow -and $done.attachments.Count -eq 2 -and $done.screenshots -eq 1) '创建、上传、正文嵌图与最终回读完整链路'
$callsBefore = $remote.calls.Count; $uploadsBefore = $remote.uploads.Count
$again = Invoke-YunxiaoDefectSync $plan -Execute -Request $request -Upload $upload
Assert-Test (-not $again.createdNow -and $again.verified -and $remote.uploads.Count -eq $uploadsBefore -and
    @($remote.calls.ToArray()[$callsBefore..($remote.calls.Count-1)] | Where-Object { $_ -match '^(POST|PUT)' }).Count -eq 0) '已完成检查点重跑只回读，不创建上传或覆盖'
$changed = New-TestPlan 'OFFLINE-SUCCESS'; $changed.fingerprint = 'changed'
Expect-Failure { Invoke-YunxiaoDefectSync $changed -Execute -Request $request -Upload $upload } '不同计划不能覆盖同key检查点'
Reset-Fake 'create-timeout'; $recovery = New-TestPlan 'OFFLINE-CREATE-RECOVERY'
Expect-Failure { Invoke-YunxiaoDefectSync $recovery -Execute -Request $request -Upload $upload } '创建结果未知时中止，未自动重试'
$recovered = Invoke-YunxiaoDefectSync $recovery -Execute -Request $request -Upload $upload
Assert-Test ($recovered.verified -and @($remote.calls | Where-Object { $_ -match 'POST .*/workitems$' }).Count -eq 1) '创建响应丢失后通过自身标识恢复，创建仍只有一次'
Reset-Fake 'upload-timeout'; $recovery = New-TestPlan 'OFFLINE-UPLOAD-RECOVERY'
Expect-Failure { Invoke-YunxiaoDefectSync $recovery -Execute -Request $request -Upload $upload } '附件响应未知时中止，未重传'
$recovered = Invoke-YunxiaoDefectSync $recovery -Execute -Request $request -Upload $upload
Assert-Test ($recovered.verified -and @($remote.uploads | Where-Object { $_ -eq 'offline-transport-fixture.png' }).Count -eq 1) '已到达云端附件按名称ID大小恢复，不重复上传'
Reset-Fake 'upload-timeout'; $manual = New-TestPlan 'OFFLINE-MANUAL-EDIT'
try { Invoke-YunxiaoDefectSync $manual -Execute -Request $request -Upload $upload | Out-Null } catch { }
$remote.item.description += "`n人工补充内容"
Expect-Failure { Invoke-YunxiaoDefectSync $manual -Execute -Request $request -Upload $upload } '中断期间有人编辑正文，恢复时停止覆盖'
Assert-Test (@($remote.calls | Where-Object { $_ -match '^PUT ' }).Count -eq 0 -and $remote.item.description.Contains('人工补充内容')) '保留人工正文，未发送覆盖请求'
Reset-Fake; $metadata = New-TestPlan 'OFFLINE-METADATA'; $metadata.body.sprint = ''
Expect-Failure { Invoke-YunxiaoDefectSync $metadata -Execute -Request $request -Upload $upload } '缺少当前必填字段不创建'
Assert-Test (@($remote.calls | Where-Object { $_ -match 'POST .*/workitems$' }).Count -eq 0) '字段校验失败无创建请求'
$tampered = Join-Path $fixture 'OFFLINE-SUCCESS.json'; $json = Get-Content $tampered -Raw | ConvertFrom-Json -AsHashtable; $json.images[0].sha256 = ('0' * 64); Write-YunxiaoJson $tampered $json
Expect-Failure { Read-YunxiaoPlan $tampered $config } '图片哈希不符停止预检'
$json.images = @(); Write-YunxiaoJson $tampered $json
Expect-Failure { Read-YunxiaoPlan $tampered $config } '缺失真实截图不能同步'
Expect-Failure { Assert-YunxiaoEvidenceText '?X-Amz-Signature=offline-fixture' } '签名链接拒绝进入描述/文本附件'
Expect-Failure { Assert-YunxiaoUri 'https://example.com/workitems' $config } '凭据不能发往其他域名'
Expect-Failure { Assert-YunxiaoUri ($config._base + '/workitems?access_token=fixture') $config } '令牌不能出现在URL'
Expect-Failure { Assert-YunxiaoUri ($config.apiBase + '/organizations/another-org/workitems') $config } '凭据不能发往其他组织'
$result = @{ passed = $checks.Count; checks = $checks.ToArray(); networkRequests = 0; cloudWrites = 0; reportDirectory = $out }
Write-YunxiaoJson (Join-Path $out 'result.json') $result
$result | ConvertTo-Json -Depth 5
