#requires -Version 7.2
param([string]$ConfigPath = (Join-Path $PSScriptRoot 'config.json'), [string]$ReferenceWorkitemId)
$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'common.ps1')
$config = Read-YunxiaoConfig $ConfigPath
$out = Join-Path $config._stateRoot ('check-' + (Get-Date -Format 'yyyyMMdd-HHmmss-fff'))
$token = Get-YunxiaoAccessToken -NoPrompt
try {
    $project = Invoke-YunxiaoRequest GET "$($config._base)/projects/$($config.projectId)" $null $token $config $out
    if ($project.name -cne $config.projectName) { throw '返回项目名称与配置不一致。' }
    $fields = @(Invoke-YunxiaoRequest GET "$($config._base)/projects/$($config.projectId)/workitemTypes/$($config.workitemTypeId)/fields" $null $token $config $out)
    $result = [ordered]@{ ready = $true; project = $project.name; projectId = $project.id; workitemTypeId = $config.workitemTypeId;
        requiredFields = @($fields | Where-Object required | ForEach-Object { @{ id = $_.id; name = $_.name; defaultValue = $_.defaultValue } });
        configuredDefaults = $config.defaults; writes = 0 }
    if ($ReferenceWorkitemId) {
        if ($ReferenceWorkitemId -notmatch '^[a-zA-Z0-9-]+$') { throw '请提供工作项内部ID，而不是编号或链接。' }
        $item = Invoke-YunxiaoRequest GET "$($config._base)/workitems/$ReferenceWorkitemId" $null $token $config $out
        if ($item.space.id -ne $config.projectId -or $item.workitemType.id -ne $config.workitemTypeId) { throw '参考工作项不属于目标项目/缺陷类型。' }
        $result['reference'] = @{ serialNumber = $item.serialNumber; assignedTo = $item.assignedTo; sprint = $item.sprint; labels = $item.labels }
        $attachments = @(Invoke-YunxiaoRequest GET "$($config._base)/workitems/$ReferenceWorkitemId/attachments" $null $token $config $out)
        $result.reference['attachmentCount'] = $attachments.Count
    }
    Write-YunxiaoJson (Join-Path $out 'result.json') $result
    $result | ConvertTo-Json -Depth 10
} finally { $token = $null }
