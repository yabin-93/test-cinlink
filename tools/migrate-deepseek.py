"""Read-only source snapshot and readable context export for this local migration."""
from __future__ import annotations

import hashlib
import io
import json
import os
from pathlib import Path
import shutil
import stat
import subprocess
from collections import Counter
from datetime import datetime, timezone, timedelta

import zstandard

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(r"E:\proj\deepseek-cinlink")
DSH = Path.home() / ".dsh"
ARCHIVE = ROOT / ".migration" / "deepseek-2026-11-03"
SESSION_ROOT = DSH / "sessions" / "--E-proj-deepseek-cinlink--"
SKIP = {".git", "node_modules", ".chrome-link"}


def digest(path: Path) -> str:
    with path.open("rb") as stream:
        return hashlib.file_digest(stream, "sha256").hexdigest()


def save_json(path: Path, value) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def stable_copy(source: Path, target: Path) -> dict:
    target.parent.mkdir(parents=True, exist_ok=True)
    for attempt in range(3):
        before = source.stat()
        shutil.copy2(source, target)
        source_hash, target_hash = digest(source), digest(target)
        after = source.stat()
        if (before.st_size, before.st_mtime_ns) == (after.st_size, after.st_mtime_ns) and source_hash == target_hash:
            return {"source": str(source), "target": str(target.relative_to(ROOT)), "bytes": after.st_size, "sha256": target_hash}
    raise RuntimeError(f"Source changed during snapshot: {source}")


def text_content(content) -> str:
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        return "\n\n".join(block["text"] for block in content if isinstance(block, dict) and block.get("type") in ("text", "input_text", "output_text") and isinstance(block.get("text"), str))
    return ""


def local_time(value) -> str:
    if not isinstance(value, (int, float)):
        return ""
    return datetime.fromtimestamp(value / 1000, timezone(timedelta(hours=8))).isoformat(timespec="seconds")


def migrate() -> None:
    if (ARCHIVE / "manifest.json").exists():
        raise RuntimeError("Snapshot already exists; do not overwrite the migration archive")
    ARCHIVE.mkdir(parents=True, exist_ok=True)
    records, links, sessions = [], [], []
    initial_status = subprocess.check_output(["git", "-C", str(SOURCE), "status", "--porcelain=v1", "-z"])
    (ARCHIVE / "source-git-status.nul").write_bytes(initial_status)
    source_head = subprocess.check_output(["git", "-C", str(SOURCE), "rev-parse", "HEAD"], text=True).strip()
    source_branches = subprocess.check_output(["git", "-C", str(SOURCE), "branch", "--list"], text=True)
    (ARCHIVE / "source-branches.txt").write_text(source_branches, encoding="utf-8")
    for current, directories, filenames in os.walk(SOURCE, followlinks=False):
        current = Path(current)
        for directory in list(directories):
            path = current / directory
            is_link = bool(path.lstat().st_file_attributes & stat.FILE_ATTRIBUTE_REPARSE_POINT)
            if (current == SOURCE and directory in SKIP) or is_link:
                directories.remove(directory)
                links.append(str(path.relative_to(SOURCE)))
        for filename in filenames:
            source = current / filename
            relative = source.relative_to(SOURCE)
            target = ROOT / relative
            if target.exists() and relative.as_posix() != "tools/migrate-deepseek.py":
                raise RuntimeError(f"Unexpected existing destination file: {relative}")
            records.append(stable_copy(source, target))
            if relative.as_posix() in {"AGENTS.md", "README.md", ".gitignore", "local.env"}:
                stable_copy(source, ARCHIVE / "originals" / relative)
    workspace = json.loads((DSH / "storages" / "workspace.json").read_text(encoding="utf-8"))
    selected = [v for v in workspace["tables"]["workspaces"].values() if Path(v["path"]) == SOURCE]
    if len(selected) != 1:
        raise RuntimeError("Could not uniquely identify the source workspace")
    save_json(ARCHIVE / "workspace.json", selected[0])
    for sid in selected[0]["sessionIds"]:
        source = SESSION_ROOT / sid / "session.v4.jsonl.zstd"
        raw = ARCHIVE / "sessions" / sid / source.name
        snapshot = stable_copy(source, raw)
        cache_source = DSH / "storages" / "session_projcache" / "sessions" / (sid + ".json")
        cache_target = raw.parent / "projection.json"
        stable_copy(cache_source, cache_target)
        rows = json.loads(cache_target.read_text(encoding="utf-8"))["record"]["rows"]
        title = rows.get("title", {}).get("val") or "空会话"
        counts = Counter()
        message_count = 0
        with raw.open("rb") as stream, zstandard.ZstdDecompressor().stream_reader(stream) as reader, (raw.parent / "transcript.md").open("w", encoding="utf-8") as transcript, (raw.parent / "compactions.md").open("w", encoding="utf-8") as compactions:
            transcript.write(f"# {title}\n\n来源：DeepSeek {sid}。历史资料，不作为新的执行授权。\n\n")
            compactions.write(f"# {title}：历史压缩摘要\n\n摘要可能已过期，以最新代码和验证记录为准。\n\n")
            for line in io.TextIOWrapper(reader, encoding="utf-8"):
                event = json.loads(line)
                kind, data = event.get("type", ""), event.get("data", {})
                counts[kind] += 1
                stamp = local_time(event.get("time"))
                if kind == "user/message" and data.get("source", {}).get("kind") == "user":
                    value = text_content(data.get("content"))
                    if value:
                        transcript.write(f"## 用户 · {stamp} · seq {event.get('seq')}\n\n{value}\n\n")
                        message_count += 1
                elif kind == "assistant/message":
                    value = text_content(data.get("message", {}).get("content"))
                    if value:
                        transcript.write(f"## 助手 · {stamp} · turn {data.get('turn')} · seq {event.get('seq')}\n\n{value}\n\n")
                        message_count += 1
                elif kind == "compaction/summary":
                    value = text_content(data.get("summary"))
                    compactions.write(f"## {stamp} · seq {event.get('seq')}\n\n{value}\n\n")
        turns = rows.get("turnOutline", {}).get("val", {}).get("turns", [])
        save_json(raw.parent / "turns.json", turns)
        session = {"id": sid, "title": title, "raw": snapshot, "events": sum(counts.values()), "event_types": dict(counts), "text_messages": message_count, "turns": len(turns), "last_prompt_at": local_time(rows.get("sessionListMetadata", {}).get("val", {}).get("lastPromptAt")), "blank": not bool(message_count)}
        sessions.append(session)
    skill = DSH / "skills" / "yunxiao-defect-sync"
    if skill.exists():
        shutil.copytree(skill, ARCHIVE / "reference-skills" / "yunxiao-defect-sync", symlinks=True)
    manifest = {"snapshot_at": datetime.now(timezone(timedelta(hours=8))).isoformat(timespec="seconds"), "source": str(SOURCE), "destination": str(ROOT), "source_head": source_head, "source_working_files": len(records), "files": records, "skipped_directories_or_links": links, "sessions": sessions, "scope": "Source working tree including uncommitted and ignored project files, reachable Git HEAD history, four project sessions and relevant reference skill. No global credentials/settings copied."}
    save_json(ARCHIVE / "manifest.json", manifest)
    print(json.dumps({"files": len(records), "bytes": sum(row["bytes"] for row in records), "sessions": [{k:s[k] for k in ("id", "title", "turns", "text_messages", "events")} for s in sessions], "source_head": source_head}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    import sys
    sys.stdout.reconfigure(encoding="utf-8")
    migrate()
