#requires -Version 7.2
param([Parameter(Mandatory)][string]$PlanPath,
      [string]$ConfigPath = (Join-Path $PSScriptRoot 'config.json'),
      [switch]$DryRun, [switch]$Execute, [switch]$CheckDuplicates)
$ErrorActionPreference = 'Stop'
if ($DryRun -and $Execute) { throw 'DryRun和Execute不能同时使用。' }
. (Join-Path $PSScriptRoot 'sync-core.ps1')
$config = Read-YunxiaoConfig $ConfigPath
$plan = Read-YunxiaoPlan $PlanPath $config
if ($plan.key.StartsWith('OFFLINE-')) { throw 'OFFLINE-前缀是离线测试专用，不能由公开入口同步到云效。' }
Invoke-YunxiaoDefectSync -Plan $plan -Execute:$Execute -CheckDuplicates:$CheckDuplicates | ConvertTo-Json -Depth 30
