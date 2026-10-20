# 准备视频批注用例的本地环境：批注分支 worktree + node_modules + 可选 dev server
param([switch]$StartServer)

$ErrorActionPreference = "Stop"
$repo = "E:\proj\cinlink-studio-web"
$wt = "E:\proj\cinlink-annotation-wt"
$branch = "origin/dev"   # dev 已合并批注分支；没有 dev 时改用 origin/feature/web-editor-video-annotation

if (-not (Test-Path $repo)) { throw "找不到产品仓库：$repo" }

if (-not (Test-Path $wt)) {
  Write-Host "创建 worktree：$wt"
  git -C $repo worktree add --detach $wt $branch
}

if (-not (Test-Path "$wt\node_modules")) {
  Write-Host "复用主仓库 node_modules（junction）"
  cmd /c mklink /J "$wt\node_modules" "$repo\node_modules" | Out-Null
}

Write-Host "worktree 就绪：$wt"

if ($StartServer) {
  Write-Host "启动 dev server：http://127.0.0.1:4173"
  Set-Location $wt
  npm run dev -- --port 4173 --host 127.0.0.1
} else {
  Write-Host "下一步：cd $wt; npm run dev -- --port 4173 --host 127.0.0.1"
  Write-Host "然后：cd E:\proj\deepseek-cinlink; npm run test:annotation"
}
