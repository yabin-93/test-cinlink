# No machine-specific path or plaintext credential is stored in the repository.
function Get-YunxiaoCredentialPath {
    param([string]$CredentialPath)
    if ($CredentialPath) { return [IO.Path]::GetFullPath($CredentialPath) }
    if ($env:YUNXIAO_CREDENTIAL_PATH) { return [IO.Path]::GetFullPath($env:YUNXIAO_CREDENTIAL_PATH) }
    if (-not $IsWindows) { return [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../../local.env')) }
    return Join-Path ([Environment]::GetFolderPath('UserProfile')) '.codex/.sandbox-secrets/yunxiao-pat.clixml'
}

function Save-YunxiaoAccessToken {
    [CmdletBinding(DefaultParameterSetName = 'Secure')]
    param(
        [Parameter(Mandatory, ParameterSetName = 'Secure')][Security.SecureString]$SecureToken,
        [Parameter(Mandatory, ParameterSetName = 'Text')][string]$Token,
        [string]$CredentialPath
    )
    if ($PSCmdlet.ParameterSetName -eq 'Text') {
        if ([string]::IsNullOrWhiteSpace($Token)) { throw '不能保存空令牌。' }
        $SecureToken = ConvertTo-SecureString -String $Token -AsPlainText -Force
    }
    if (-not $SecureToken.Length) { throw '不能保存空令牌。' }
    $destination = Get-YunxiaoCredentialPath $CredentialPath
    $null = New-Item -ItemType Directory -Path (Split-Path -Parent $destination) -Force
    if (-not $IsWindows) {
        $value = ([Management.Automation.PSCredential]::new('yunxiao-pat', $SecureToken)).GetNetworkCredential().Password
        if ($value -match '[\r\n]') { throw '令牌不能包含换行。' }
        $lines = if (Test-Path -LiteralPath $destination) { [IO.File]::ReadAllLines($destination) } else { @() }
        $lines = @($lines | Where-Object { $_ -notmatch '^\s*ALIBABA_CLOUD_YUNXIAO_ACCESS_TOKEN\s*=' })
        # Create privately before writing any secret, including when init is used on a new machine.
        if (-not (Test-Path -LiteralPath $destination)) { [IO.File]::WriteAllText($destination, '') }
        & chmod 600 $destination
        if ($LASTEXITCODE -ne 0) { throw '无法限制本机凭据文件权限，未保存令牌。' }
        [IO.File]::WriteAllLines($destination, @($lines) + @('ALIBABA_CLOUD_YUNXIAO_ACCESS_TOKEN=' + $value), [Text.UTF8Encoding]::new($false))
        $value = $null
        return
    }
    [Management.Automation.PSCredential]::new('yunxiao-pat', $SecureToken) | Export-Clixml -LiteralPath $destination -Force
}

function Get-YunxiaoAccessToken {
    param([string]$CredentialPath, [switch]$NoPrompt)
    $value = [Environment]::GetEnvironmentVariable('ALIBABA_CLOUD_YUNXIAO_ACCESS_TOKEN', 'Process')
    if (-not $value) { $value = [Environment]::GetEnvironmentVariable('YUNXIAO_ACCESS_TOKEN', 'Process') }
    if (-not $value -and $IsWindows) { $value = [Environment]::GetEnvironmentVariable('YUNXIAO_ACCESS_TOKEN', 'User') }
    if ($value) { return $value }
    $location = Get-YunxiaoCredentialPath $CredentialPath
    if (-not $IsWindows) {
        $candidates = @($location)
        if (-not $CredentialPath -and -not $env:YUNXIAO_CREDENTIAL_PATH) { $candidates += Join-Path $PSScriptRoot '../../.env.local' }
        foreach ($file in $candidates) {
            if (-not (Test-Path -LiteralPath $file -PathType Leaf)) { continue }
            foreach ($line in [IO.File]::ReadAllLines($file)) {
                if ($line -match '^\s*ALIBABA_CLOUD_YUNXIAO_ACCESS_TOKEN\s*=(.*)$') {
                    $value = $Matches[1].Trim().Trim([char]34, [char]39)
                    if ($value) { return $value }
                    # An empty value in local.env also takes precedence over .env.local.
                    break
                }
            }
            if ($null -ne $value) { break }
        }
        if ($NoPrompt) { throw '尚未配置云效令牌。请填写项目local.env的ALIBABA_CLOUD_YUNXIAO_ACCESS_TOKEN或运行tools/yunxiao/run.sh init.ps1。' }
        $secure = Read-Host '请输入云效个人访问令牌（输入不回显）' -AsSecureString
        Save-YunxiaoAccessToken -SecureToken $secure -CredentialPath $location
        return ([Management.Automation.PSCredential]::new('yunxiao-pat', $secure)).GetNetworkCredential().Password
    }
    if (Test-Path -LiteralPath $location -PathType Leaf) {
        try {
            $credential = Import-Clixml -LiteralPath $location
            if ($credential -isnot [Management.Automation.PSCredential]) { throw '凭据格式不正确' }
            $value = $credential.GetNetworkCredential().Password
            if (-not $value) { throw '令牌为空' }
            return $value
        } catch { throw '无法解密本机云效凭据。请在这台电脑运行init.ps1 -Force重新输入令牌，不要复制其他电脑的加密缓存。' }
    }
    if ($NoPrompt) { throw '尚未配置云效令牌。先运行tools/yunxiao/init.ps1。' }
    $secure = Read-Host '请输入云效个人访问令牌（输入不回显）' -AsSecureString
    Save-YunxiaoAccessToken -SecureToken $secure -CredentialPath $location
    return ([Management.Automation.PSCredential]::new('yunxiao-pat', $secure)).GetNetworkCredential().Password
}
