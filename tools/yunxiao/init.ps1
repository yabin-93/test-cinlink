#requires -Version 7.2
param([string]$CredentialPath, [switch]$Force)
$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'yunxiao-credential.ps1')
$location = Get-YunxiaoCredentialPath $CredentialPath
if ($Force) {
    $secure = Read-Host '请输入新的云效个人访问令牌（输入不回显）' -AsSecureString
    Save-YunxiaoAccessToken -SecureToken $secure -CredentialPath $location
} else { $null = Get-YunxiaoAccessToken -CredentialPath $location }
[pscustomobject]@{ configured = $true; credentialPath = $location; networkRequests = 0 } | ConvertTo-Json
