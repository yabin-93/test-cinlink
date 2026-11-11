. (Join-Path $PSScriptRoot 'common.ps1')

function Assert-YunxiaoEvidenceText {
    param([string]$Text)
    if ($Text -match '(?i)(?:Bearer\s+[a-z0-9._-]{15,}|x-yunxiao-token\s*[:=]\s*[a-z0-9._-]{12,}|[?&](?:x-amz-signature|signature|access_token)=|LTAI[a-z0-9]{12,})') {
        throw '描述或文本附件疑似含凭据/签名链接，请脱敏后再同步；不会输出匹配内容。'
    }
}

function Read-YunxiaoPlan {
    param([string]$PlanPath, [hashtable]$Config)
    $location = (Resolve-Path -LiteralPath $PlanPath -ErrorAction Stop).Path
    $directory = Split-Path -Parent $location
    $plan = Get-Content -LiteralPath $location -Raw | ConvertFrom-Json -AsHashtable
    if ($plan.key -notmatch '^[A-Za-z0-9][A-Za-z0-9._-]{2,100}$' -or $plan.key.StartsWith('REPLACE-') -or -not $plan.subject) { throw 'plan需要安全且唯一的真实key和非空subject，不能直接使用示例占位。' }
    $descriptionPath = [IO.Path]::GetFullPath((Join-Path $directory $plan.descriptionPath))
    $description = [IO.File]::ReadAllText($descriptionPath).Replace("`r`n", "`n")
    $headings = @([regex]::Matches($description, '(?m)^\*\*(.+?)\*\*\r?$') | ForEach-Object { $_.Groups[1].Value })
    $expected = @('现象', '前置步骤', '提示词', '复现步骤', '实际结果', '预期结果', '影响', '补充', '失败截图')
    if (($headings -join '|') -cne ($expected -join '|') -or $description.Contains('**排查信息**')) { throw '描述须按AGENTS.md的九段模板填写。' }
    if ([regex]::Matches($description, '__SCREENSHOTS__').Count -ne 1 -or $description.IndexOf('__SCREENSHOTS__') -lt $description.IndexOf('**失败截图**')) {
        throw '失败截图末节须有且只有一个__SCREENSHOTS__占位。'
    }
    if (-not $description.Contains($plan.key)) { $description = $description.Replace('**补充**', "**补充**`n`n同步标识：$($plan.key)") }
    Assert-YunxiaoEvidenceText $description
    $files = @(); $names = @()
    if (@($plan.images).Count -lt 1) { throw '缺陷至少需要一张对应场景的真实PNG/JPEG截图。' }
    foreach ($group in @('images', 'attachments')) {
        foreach ($item in @($plan[$group])) {
            if (-not $item) { continue }
            $file = (Resolve-Path -LiteralPath (Join-Path $directory $item.path) -ErrorAction Stop).Path
            $name = [IO.Path]::GetFileName($file)
            if ($name -match '[\r\n\[\]()]' -or $name -in $names) { throw '附件文件名重复或不适合Markdown引用，请复制为简单文件名。' }
            $names += $name
            $extension = [IO.Path]::GetExtension($name).ToLowerInvariant()
            if ($group -eq 'images') {
                if ($extension -notin @('.png', '.jpg', '.jpeg') -or -not $item.caption) { throw '截图须为PNG/JPEG并有对应场景caption。' }
                $bytes = [IO.File]::ReadAllBytes($file)
                if ($extension -eq '.png') {
                    if ($bytes.Length -lt 24 -or [Convert]::ToHexString($bytes[0..7]) -ne '89504E470D0A1A0A') { throw '截图不是有效PNG文件。' }
                } else {
                    if ($bytes.Length -lt 4 -or [Convert]::ToHexString($bytes[0..2]) -ne 'FFD8FF' -or [Convert]::ToHexString($bytes[($bytes.Length-2)..($bytes.Length-1)]) -ne 'FFD9') { throw '截图不是有效JPEG文件。' }
                }
            } elseif ($extension -notin @('.json', '.md', '.txt', '.srt', '.wav', '.mp4', '.pdf')) {
                throw '补充附件仅支持已检查的JSON/MD/TXT/SRT/WAV/MP4/PDF；不直接上传原始trace或诊断压缩包。'
            }
            $digest = (Get-FileHash -LiteralPath $file -Algorithm SHA256).Hash.ToLowerInvariant()
            if ($item.sha256 -notmatch '^[a-fA-F0-9]{64}$' -or $digest -cne $item.sha256.ToLowerInvariant()) { throw "附件哈希缺失或与原证据不一致：$name" }
            if ($extension -in @('.json', '.md', '.txt', '.srt')) { Assert-YunxiaoEvidenceText ([IO.File]::ReadAllText($file)) }
            $files += @{ name = $name; path = $file; sha256 = $digest; size = (Get-Item -LiteralPath $file).Length;
                image = $group -eq 'images'; caption = $item.caption }
        }
    }
    if (@($files | Where-Object image).Count -lt 1) { throw '缺陷至少需要一张真实PNG/JPEG截图。' }
    $metadata = @{} + $Config.defaults
    if ($plan.fields) { foreach ($key in $plan.fields.Keys) { $metadata[$key] = $plan.fields[$key] } }
    $body = @{ subject = $plan.subject; description = $description.Replace('__SCREENSHOTS__', '原始截图附件及嵌入正在同步。'); formatType = 'MARKDOWN';
        spaceId = $Config.projectId; workitemTypeId = $Config.workitemTypeId;
        assignedTo = $metadata.assignedTo; sprint = $metadata.sprint; labels = @($metadata.labels);
        customFieldValues = @{ priority = $metadata.priority; seriousLevel = $metadata.seriousLevel } }
    $fingerprintText = [IO.File]::ReadAllText($location).Replace("`r`n", "`n") + [IO.File]::ReadAllText($Config._path).Replace("`r`n", "`n") + $description + (($files | ForEach-Object { $_.name + ':' + $_.sha256 }) -join '|')
    $fingerprint = [Convert]::ToHexString([Security.Cryptography.SHA256]::HashData([Text.Encoding]::UTF8.GetBytes($fingerprintText))).ToLowerInvariant()
    return @{ key = $plan.key; fingerprint = $fingerprint; body = $body; files = $files; description = $description; config = $Config }
}

function Invoke-YunxiaoDefectSync {
    param([hashtable]$Plan, [switch]$Execute, [switch]$CheckDuplicates,
          [scriptblock]$Request, [scriptblock]$Upload)
    $config = $Plan.config
    $out = Join-Path $config._stateRoot $Plan.key
    if (-not $Execute) {
        return @{ dryRun = $true; key = $Plan.key; body = $Plan.body;
            images = @($Plan.files | Where-Object image | ForEach-Object { @{ name = $_.name; caption = $_.caption; sha256 = $_.sha256 } });
            attachmentCount = $Plan.files.Count; stateDirectory = $out; networkRequests = 0; cloudWrites = 0 }
    }
    $null = New-Item -ItemType Directory -Path $out -Force
    $lock = $null; $token = $null
    try {
        $lock = [IO.File]::Open((Join-Path $out 'sync.lock'), 'OpenOrCreate', 'ReadWrite', 'None')
        $checkpoint = Join-Path $out 'checkpoint.json'
        $state = @{ key = $Plan.key; fingerprint = $Plan.fingerprint; createAttempted = $false; workitemId = ''; verified = $false; uploadAttempts = @{}; attachments = @() }
        if (Test-Path -LiteralPath $checkpoint) { $state = Get-Content -LiteralPath $checkpoint -Raw | ConvertFrom-Json -AsHashtable }
        if ($state.fingerprint -cne $Plan.fingerprint) { throw '此key的计划/配置/证据已改变，不能覆盖已有提交。先核对检查点和云效状态。' }
        $token = Get-YunxiaoAccessToken -NoPrompt
        if (-not $Request) { $Request = { param($m, $u, $b) Invoke-YunxiaoRequest $m $u $b $token $config $out } }
        if (-not $Upload) { $Upload = { param($u, $f) Invoke-YunxiaoRequest POST $u $null $token $config $out -UploadPath $f.path } }
        $project = & $Request GET "$($config._base)/projects/$($config.projectId)" $null
        if ($project.name -cne $config.projectName -or $project.id -ne $config.projectId) { throw '目标项目核验失败。' }
        # Live required fields/options are evidence of the current project, not copied PRD assumptions.
        $fields = @(& $Request GET "$($config._base)/projects/$($config.projectId)/workitemTypes/$($config.workitemTypeId)/fields" $null)
        foreach ($field in $fields) {
            $value = if ($field.id -in @('priority', 'seriousLevel')) { $Plan.body.customFieldValues[$field.id] } else { $Plan.body[$field.id] }
            if ($field.required -and ($null -eq $value -or @($value).Count -eq 0 -or "$value" -eq '')) { throw "请在config或plan.fields补齐必填项：$($field.name)" }
            if ($field.id -in @('priority', 'seriousLevel') -and $field.options.Count -and $value -notin @($field.options.id)) { throw "配置选项不属于当前项目：$($field.name)" }
        }
        if (-not $state.workitemId -and ($CheckDuplicates -or $state.createAttempted)) {
            $candidates = @()
            for ($page = 1; $page -le 100; $page++) {
                $rows = @(& $Request POST "$($config._base)/workitems:search" @{ category = 'Bug'; spaceId = $config.projectId; spaceType = 'Project'; page = $page; perPage = 200; orderBy = 'gmtCreate'; sort = 'desc' })
                $candidates += @($rows | Where-Object { $_.subject -ceq $Plan.body.subject })
                if ($rows.Count -lt 200) { break }
                if ($page -eq 100) { throw '恢复/查重分页未完成，未创建。' }
            }
            $owned = @()
            foreach ($candidate in $candidates) {
                $detail = & $Request GET "$($config._base)/workitems/$($candidate.id)" $null
                if (([string]$detail.description).Contains($Plan.key)) { $owned += $detail }
            }
            if ($owned.Count -gt 1) { throw '同一同步标识匹配多个工作项，已停止，需核对。' }
            if ($owned.Count -eq 1 -and $state.createAttempted) { $state.workitemId = $owned[0].id; Write-YunxiaoJson $checkpoint $state }
            elseif ($state.createAttempted) { throw '上次创建结果不确定且尚未唯一找到；不会自动重发创建。请人工核对云效。' }
            elseif ($candidates.Count) { throw '查重发现同标题/标识工作项，未创建或更新既有缺陷。' }
        }
        $createdNow = $false
        if (-not $state.workitemId) {
            $state.createAttempted = $true; Write-YunxiaoJson $checkpoint $state
            $created = & $Request POST "$($config._base)/workitems" $Plan.body
            if (-not $created.id) { throw '创建响应缺少ID；保留检查点，先恢复核对，不能重发。' }
            $state.workitemId = $created.id; Write-YunxiaoJson $checkpoint $state; $createdNow = $true
        }
        $uri = "$($config._base)/workitems/$($state.workitemId)"
        $current = & $Request GET $uri $null
        if ($current.space.id -ne $config.projectId -or $current.workitemType.id -ne $config.workitemTypeId -or
            $current.subject -cne $Plan.body.subject -or -not ([string]$current.description).Contains($Plan.key)) { throw '检查点工作项与本计划不匹配，未上传或覆盖。' }
        $blocks = @()
        foreach ($file in $Plan.files) {
            if ((Get-FileHash -LiteralPath $file.path -Algorithm SHA256).Hash.ToLowerInvariant() -cne $file.sha256) { throw '证据在预检后发生变化，已停止。' }
            $files = @(& $Request GET "$uri/attachments" $null)
            $matching = @($files | Where-Object fileName -ceq $file.name)
            if ($matching.Count -gt 1) { throw '云效存在重复附件文件名，已停止。' }
            if ($matching.Count) { $attached = $matching[0] }
            else {
                if ($state.verified -or $state.uploadAttempts[$file.name]) { throw '截图缺失或上次上传结果不确定；不会重复上传，请先核对附件。' }
                $state.uploadAttempts[$file.name] = $true; Write-YunxiaoJson $checkpoint $state
                $attached = & $Upload "$uri/attachments" $file
                # Upload returns name, whereas the attachment list returns fileName.
                if (-not $attached.fileName -and $attached.name) { $attached.fileName = $attached.name }
            }
            if (-not $attached.id -or $attached.size -ne $file.size -or $attached.fileName -cne $file.name) { throw '附件名称/ID/字节数不符，已停止。' }
            $state.attachments = @($state.attachments | Where-Object name -cne $file.name) + @(@{ name = $file.name; id = $attached.id; size = $file.size; sha256 = $file.sha256 })
            Write-YunxiaoJson $checkpoint $state
            if ($file.image) { $blocks += "$($file.caption)`n`n![$($file.name)](https://devops.aliyun.com/projex/api/workitem/file/url?fileIdentifier=$($attached.id))" }
        }
        $description = $Plan.description.Replace('__SCREENSHOTS__', ($blocks -join "`n`n"))
        if (-not $state.verified) {
            $latest = & $Request GET $uri $null
            if ($latest.description -cne $Plan.body.description -and $latest.description -cne $description) { throw '同步期间正文被修改，已停止，不覆盖人工修改。' }
            if ($latest.description -cne $description) { $null = & $Request PUT $uri @{ description = $description; formatType = 'MARKDOWN' } }
        }
        $verified = & $Request GET $uri $null
        $verifiedFiles = @(& $Request GET "$uri/attachments" $null)
        if ($verified.space.id -ne $config.projectId -or $verified.workitemType.id -ne $config.workitemTypeId -or
            $verified.description -cne $description -or $verified.subject -cne $Plan.body.subject -or $verified.formatType -ne 'MARKDOWN') { throw '项目/正文回读不一致；不会自动覆盖人工修改。' }
        foreach ($file in $state.attachments) {
            $matching = @($verifiedFiles | Where-Object { $_.id -eq $file.id -and $_.fileName -ceq $file.name -and $_.size -eq $file.size })
            if ($matching.Count -ne 1) { throw '附件最终回读不一致。' }
        }
        foreach ($field in @('priority', 'seriousLevel')) {
            if (-not $state.verified -and @($verified.customFieldValues | Where-Object { $_.fieldId -eq $field } | ForEach-Object { $_.values.identifier }) -notcontains $Plan.body.customFieldValues[$field]) { throw '优先级/严重程度回读不一致。' }
        }
        if (-not $state.verified -and ($verified.assignedTo.id -ne $Plan.body.assignedTo -or $verified.sprint.id -ne $Plan.body.sprint -or
            @($Plan.body.labels | Where-Object { $_ -notin @($verified.labels.id) }).Count)) { throw '负责人/迭代/标签回读不一致，未擅自覆盖。' }
        $state.verified = $true; $state.serialNumber = $verified.serialNumber; Write-YunxiaoJson $checkpoint $state
        [IO.File]::WriteAllText((Join-Path $out 'verified-description.md'), $description, [Text.UTF8Encoding]::new($false))
        Write-YunxiaoJson (Join-Path $out 'verified-item.json') $verified
        Write-YunxiaoJson (Join-Path $out 'verified-attachments.json') $verifiedFiles
        $result = @{ key = $Plan.key; createdNow = $createdNow; verified = $true; workitemId = $state.workitemId; serialNumber = $verified.serialNumber;
            verifiedAt = (Get-Date).ToString('o'); screenshots = @($Plan.files | Where-Object image).Count; attachments = $state.attachments;
            url = "https://devops.aliyun.com/projex/project/$($config.projectId)/bug#openWorkitemIdentifier=$($state.workitemId)" }
        Write-YunxiaoJson (Join-Path $out 'result.json') $result
        return $result
    } finally { $token = $null; if ($lock) { $lock.Dispose() } }
}
