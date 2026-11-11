#!/bin/sh
set -eu
script_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
if command -v pwsh >/dev/null 2>&1; then
    powershell_bin=$(command -v pwsh)
else
    powershell_bin="$HOME/.local/share/cinlink-powershell/current/pwsh"
fi
if [ ! -x "$powershell_bin" ]; then
    echo '缺少 PowerShell 7.2+，请先安装后再运行。' >&2
    exit 1
fi
entry=${1:-check.ps1}
if [ "$#" -gt 0 ]; then shift; fi
case "$entry" in
    check.ps1|init.ps1|sync-defect.ps1|test-offline.ps1) ;;
    *) echo '入口仅支持 check.ps1 / init.ps1 / sync-defect.ps1 / test-offline.ps1' >&2; exit 1 ;;
esac
if [ "$entry" = check.ps1 ] || [ "$entry" = sync-defect.ps1 ]; then
    if [ -f "$script_dir/config.local.json" ]; then
        exec "$powershell_bin" -NoLogo -NoProfile -File "$script_dir/$entry" -ConfigPath "$script_dir/config.local.json" "$@"
    fi
fi
exec "$powershell_bin" -NoLogo -NoProfile -File "$script_dir/$entry" "$@"
