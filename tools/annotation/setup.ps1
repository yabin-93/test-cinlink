# 准备视频批注用例的本地环境：批注分支 worktree + node_modules + 可选 dev server
param([switch]$StartServer)

$ErrorActionPreference = "Stop"
$repo = "E:\proj\cinlink-studio-web"
$wt = "E:\proj\cinlink-annotation-wt"
$branch = "origin/dev"   # dev 已合并批注分支；没有 dev 时改用 origin/feature/web-editor-video-annotation
$port = 4210             # 4173 在 Windows 保留端口段（4102-4201），本机不可用

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

# 本地 preview 默认不渲染批注 UI（只有 staging 渲染）；这里打一个幂等的本地 preview 开关
$app = Join-Path $wt "src\app.js"
if (Test-Path $app) {
  $text = [System.IO.File]::ReadAllText($app, [System.Text.Encoding]::UTF8)
  $needle = 'const VIDEO_EDITOR_ANNOTATIONS_VISIBLE = resolveHostedBases().environment === "staging";'
  if ($text.Contains($needle)) {
    $replacement = 'const VIDEO_EDITOR_ANNOTATIONS_VISIBLE = resolveHostedBases().environment === "staging"' + "`n" +
      '  || (["localhost", "127.0.0.1"].includes(window.location.hostname)' + "`n" +
      '    && new URLSearchParams(window.location.search).get("workspace-preview") === "editor");'
    [System.IO.File]::WriteAllText($app, $text.Replace($needle, $replacement), (New-Object System.Text.UTF8Encoding($false)))
    Write-Host "已为本地 preview 启用批注 UI（workspace-preview=editor）"
  }
}

if ($StartServer) {
  Write-Host "启动 dev server：http://127.0.0.1:$port"
  Set-Location $wt
  npm run dev -- --port $port --host 127.0.0.1
} else {
  Write-Host "下一步：cd $wt; npm run dev -- --port $port --host 127.0.0.1"
  Write-Host "然后：cd E:\proj\deepseek-cinlink; npm run test:annotation"
}
