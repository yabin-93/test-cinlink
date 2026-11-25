#requires -Version 7.2
param([Parameter(Mandatory)][string]$BatchPath,[Parameter(Mandatory)][string]$DefectNumber)
$ErrorActionPreference='Stop'
. (Join-Path $PSScriptRoot 'common.ps1')
$config=Read-YunxiaoConfig
$batch=(Resolve-Path -LiteralPath $BatchPath).Path
$inventory=Get-Content -Raw -LiteralPath (Join-Path $batch 'inventory.json') | ConvertFrom-Json -AsHashtable
$matches=@($inventory.defects | Where-Object serialNumber -ceq $DefectNumber)
if($matches.Count -ne 1){throw '缺陷不在本批唯一筛选清单中'}
$selected=$matches[0]
$resultFile=Join-Path $batch ($DefectNumber+'/result.json')
$evidence=Get-Content -Raw -LiteralPath $resultFile | ConvertFrom-Json -AsHashtable
if($evidence.id -cne $DefectNumber -or $evidence.result -notin @('Passed','Failed') -or -not $evidence.verifiedBusiness -or $evidence.environment -cne 'production' -or $evidence.browser -notlike 'ego-browser*' -or -not $evidence.workspaceId -or -not $evidence.editorId -or -not $evidence.conversationId -or -not $evidence.actual -or $evidence.steps.Count -lt 1){throw '缺少本轮真实生产页面业务结果，禁止改状态'}
foreach($image in $evidence.screenshots){if(-not(Test-Path -LiteralPath (Join-Path $batch ($DefectNumber+'/'+$image)))){throw '本轮截图缺失'}}
if($evidence.result -eq 'Failed' -and @($evidence.screenshots | Where-Object {$_ -like 'failed*.png'}).Count -lt 1){throw '未通过必须有本轮真实失败截图'}
$output=Join-Path $batch ($DefectNumber+'/status-update')
$null=New-Item -ItemType Directory -Path $output -Force
$evidenceHash=(Get-FileHash -LiteralPath $resultFile -Algorithm SHA256).Hash.ToLowerInvariant()
$checkpoint=Join-Path $output 'intent.json'
$token=Get-YunxiaoAccessToken -NoPrompt
try {
 $workflow=Invoke-YunxiaoRequest GET "$($config._base)/projects/$($config.projectId)/workitemTypes/$($config.workitemTypeId)/workflows" $null $token $config $output
 $wanted=if($evidence.result -eq 'Passed'){'✅AI通过'}else{'❌AI未通过'}
 $targets=@($workflow.statuses | Where-Object name -ceq $wanted)
 if($targets.Count -ne 1){throw '当前工作流没有唯一目标状态'}
 $target=$targets[0]
 $uri="$($config._base)/workitems/$($selected.id)"
 $before=Invoke-YunxiaoRequest GET $uri $null $token $config $output
 if($before.serialNumber -cne $DefectNumber -or $before.space.id -ne $config.projectId -or $before.workitemType.id -ne $config.workitemTypeId -or $before.creator.id -ne '64706f1835bcf6a00f0ddfc3' -or $before.creator.name -cne '陈亚宾'){throw '缺陷身份或创建者不匹配'}
 $alreadyAttempted=Test-Path -LiteralPath $checkpoint
 if($alreadyAttempted){
  $intent=Get-Content -Raw -LiteralPath $checkpoint | ConvertFrom-Json -AsHashtable
  if($intent.evidenceSha256 -cne $evidenceHash -or $intent.targetId -ne $target.id -or $intent.workitemId -ne $before.id){throw '已有状态修改意图与本次结果不一致，禁止覆盖'}
  if($before.status.id -ne $target.id){throw '上次状态修改结果不确定或被他人改动，禁止自动重发'}
  $baseline=Get-Content -Raw -LiteralPath (Join-Path $output 'before.json') | ConvertFrom-Json -AsHashtable
 }else{
  if($before.status.name -cne '已修复'){throw '缺陷已不再是已修复，保留他人状态，未修改'}
  $baseline=$before
  Write-YunxiaoJson (Join-Path $output 'before.json') $before
  Write-YunxiaoJson (Join-Path $output 'workflow.json') $workflow
  Write-YunxiaoJson $checkpoint @{workitemId=$before.id;serialNumber=$DefectNumber;onlyField='status';before=$before.status;targetId=$target.id;targetName=$target.name;evidenceSha256=$evidenceHash;attempted=$true}
  $null=Invoke-YunxiaoRequest PUT $uri @{status=$target.id} $token $config $output
 }
 $after=Invoke-YunxiaoRequest GET $uri $null $token $config $output
 if($after.status.id -ne $target.id -or $after.status.name -cne $wanted){throw '状态回读不匹配'}
 foreach($key in @('subject','description','formatType')){if($baseline[$key] -cne $after[$key]){throw "状态之外的$key发生变化，需核对"}}
 if($baseline.assignedTo.id -ne $after.assignedTo.id -or $baseline.sprint.id -ne $after.sprint.id -or $baseline.creator.id -ne $after.creator.id -or ((@($baseline.labels.id)|Sort-Object)-join '|') -cne ((@($after.labels.id)|Sort-Object)-join '|')){throw '其他关键字段发生变化，需核对'}
 Write-YunxiaoJson (Join-Path $output 'after.json') $after
 $receipt=@{serialNumber=$DefectNumber;workitemId=$after.id;verified=$true;changed=(-not $alreadyAttempted);before=$baseline.status;after=$after.status;onlyField='status';otherCheckedFieldsUnchanged=$true;evidenceSha256=$evidenceHash;verifiedAt=(Get-Date).ToString('o');url=$selected.url}
 Write-YunxiaoJson (Join-Path $output 'result.json') $receipt
 $receipt | ConvertTo-Json -Depth 8
}finally{$token=$null}
