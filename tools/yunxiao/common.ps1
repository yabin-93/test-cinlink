. (Join-Path $PSScriptRoot 'yunxiao-credential.ps1')

function Write-YunxiaoJson {
    param([string]$Path, [object]$Value)
    [IO.File]::WriteAllText($Path, ($Value | ConvertTo-Json -Depth 80), [Text.UTF8Encoding]::new($false))
}

function Read-YunxiaoConfig {
    param([string]$ConfigPath = (Join-Path $PSScriptRoot 'config.json'))
    $location = (Resolve-Path -LiteralPath $ConfigPath -ErrorAction Stop).Path
    $config = Get-Content -LiteralPath $location -Raw | ConvertFrom-Json -AsHashtable
    if ($config.schemaVersion -ne 1 -or $config.apiBase -cne 'https://openapi-rdc.aliyuncs.com/oapi/v1/projex') { throw '不支持的配置版本或API地址。' }
    foreach ($key in @('organizationId', 'projectId', 'workitemTypeId')) {
        if ($config[$key] -notmatch '^[a-zA-Z0-9-]+$') { throw "配置缺少有效的$key。" }
    }
    $config['_path'] = $location
    $config['_stateRoot'] = [IO.Path]::GetFullPath((Join-Path (Split-Path -Parent $location) $config.stateDirectory))
    $config['_base'] = "$($config.apiBase)/organizations/$($config.organizationId)"
    return $config
}

function Assert-YunxiaoUri {
    param([string]$Uri, [hashtable]$Config)
    $parsed = [Uri]$Uri
    if ($parsed.Scheme -ne 'https' -or $parsed.Host -ne 'openapi-rdc.aliyuncs.com' -or
        $parsed.Port -ne 443 -or $parsed.UserInfo -or $parsed.Fragment -or
        -not $Uri.StartsWith($Config._base + '/', [StringComparison]::Ordinal) -or
        $parsed.Query -match '(?i)(?:[?&])(?:access_token|x-yunxiao-token|token)=') { throw '拒绝目标组织之外或URL携带凭据的请求。' }
}

function Invoke-YunxiaoRequest {
    param([string]$Method, [string]$Uri, [object]$Body, [string]$Token,
          [hashtable]$Config, [string]$WorkingDir, [string]$UploadPath)
    Assert-YunxiaoUri $Uri $Config
    if (-not $Token -or $Token -match "[`r`n]") { throw '无有效云效凭据。' }
    $null = Get-Command curl.exe -ErrorAction Stop
    $null = New-Item -ItemType Directory -Path $WorkingDir -Force
    $tag = [Guid]::NewGuid().ToString('N')
    $responsePath = Join-Path $WorkingDir "$tag-response.json"
    $requestPath = Join-Path $WorkingDir "$tag-request.json"
    if ($null -ne $Body) { Write-YunxiaoJson $requestPath $Body }
    $safeRead = $Method -eq 'GET' -or ($Method -eq 'POST' -and $Uri.EndsWith('/workitems:search'))
    $limit = if ($safeRead) { 3 } else { 1 }
    for ($attempt = 1; $attempt -le $limit; $attempt++) {
        $start = [Diagnostics.ProcessStartInfo]::new('curl.exe')
        $start.UseShellExecute = $false; $start.CreateNoWindow = $true
        $start.RedirectStandardInput = $true; $start.RedirectStandardOutput = $true; $start.RedirectStandardError = $true
        foreach ($arg in @('--config', '-', '--silent', '--show-error', '--http1.1', '--connect-timeout', '10', '--max-time', '50',
            '--request', $Method, '--header', 'Accept: application/json', '--header', 'Expect:', '--output', $responsePath, '--write-out', '%{http_code}')) {
            $start.ArgumentList.Add($arg)
        }
        if ($null -ne $Body) {
            foreach ($arg in @('--header', 'Content-Type: application/json', '--data-binary', ('@' + $requestPath))) { $start.ArgumentList.Add($arg) }
        }
        if ($UploadPath) {
            if ($UploadPath -match "[`r`n]") { throw '附件路径含非法换行。' }
            $types = @{ '.png' = 'image/png'; '.json' = 'application/json'; '.md' = 'text/markdown'; '.txt' = 'text/plain';
                '.srt' = 'application/x-subrip'; '.wav' = 'audio/wav'; '.mp4' = 'video/mp4'; '.pdf' = 'application/pdf' }
            $mime = $types[[IO.Path]::GetExtension($UploadPath).ToLowerInvariant()]
            if (-not $mime) { throw '不支持的附件类型。' }
            $quotedPath = $UploadPath.Replace('\', '/').Replace('"', '\"')
            $form = 'file=@"' + $quotedPath + '";type=' + $mime
            $start.ArgumentList.Add('--form'); $start.ArgumentList.Add($form)
        }
        $start.ArgumentList.Add($Uri)
        $process = [Diagnostics.Process]::Start($start)
        $escaped = $Token.Replace('\', '\\').Replace('"', '\"')
        $process.StandardInput.WriteLine('header = "x-yunxiao-token: ' + $escaped + '"'); $process.StandardInput.Close()
        $stdout = $process.StandardOutput.ReadToEndAsync(); $stderr = $process.StandardError.ReadToEndAsync()
        $process.WaitForExit(); $exitCode = $process.ExitCode
        $http = $stdout.GetAwaiter().GetResult().Trim(); $null = $stderr.GetAwaiter().GetResult(); $process.Dispose()
        if ($exitCode -eq 0 -and $http -match '^2\d\d$') {
            $text = [IO.File]::ReadAllText($responsePath)
            if (-not [string]::IsNullOrWhiteSpace($text)) { return ($text | ConvertFrom-Json -AsHashtable) }
            return $null
        }
        if ($attempt -lt $limit) { Start-Sleep -Milliseconds 500 }
    }
    # Do not echo curl stderr, request headers or response bodies; they may contain secrets.
    throw "云效请求失败：$Method，HTTP $http，curl退出码$exitCode。写入请求没有自动重试；响应保留在本机报告目录。"
}
