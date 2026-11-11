# No machine-specific path or plaintext credential is stored in the repository.
function Get-YunxiaoCredentialPath {
    param([string]$CredentialPath)
    if ($CredentialPath) { return [IO.Path]::GetFullPath($CredentialPath) }
    if ($env:YUNXIAO_CREDENTIAL_PATH) { return [IO.Path]::GetFullPath($env:YUNXIAO_CREDENTIAL_PATH) }
    return Join-Path ([Environment]::GetFolderPath('UserProfile')) '.codex/.sandbox-secrets/yunxiao-pat.clixml'
}

function Save-YunxiaoAccessToken {
    [CmdletBinding(DefaultParameterSetName = 'Secure')]
    param(
        [Parameter(Mandatory, ParameterSetName = 'Secure')][Security.SecureString]$SecureToken,
        [Parameter(Mandatory, ParameterSetName = 'Text')][string]$Token,
        [string]$CredentialPath
    )
    if (-not $IsWindows) { throw '本凭据缓存使用Windows DPAPI，请在Windows上初始化；不要复制为明文。' }
    if ($PSCmdlet.ParameterSetName -eq 'Text') {
        if ([string]::IsNullOrWhiteSpace($Token)) { throw '不能保存空令牌。' }
        $SecureToken = ConvertTo-SecureString -String $Token -AsPlainText -Force
    }
    if (-not $SecureToken.Length) { throw '不能保存空令牌。' }
    $destination = Get-YunxiaoCredentialPath $CredentialPath
    $null = New-Item -ItemType Directory -Path (Split-Path -Parent $destination) -Force
    [Management.Automation.PSCredential]::new('yunxiao-pat', $SecureToken) | Export-Clixml -LiteralPath $destination -Force
}

function Get-YunxiaoAccessToken {
    param([string]$CredentialPath, [switch]$NoPrompt)
    $value = [Environment]::GetEnvironmentVariable('YUNXIAO_ACCESS_TOKEN', 'Process')
    if (-not $value -and $IsWindows) { $value = [Environment]::GetEnvironmentVariable('YUNXIAO_ACCESS_TOKEN', 'User') }
    if ($value) { return $value }
    $location = Get-YunxiaoCredentialPath $CredentialPath
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
