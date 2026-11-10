#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STATE="$ROOT/.local-site"
PID_FILE="$STATE/server.pid"
LOG="$STATE/server.log"
ASTRO="$ROOT/node_modules/astro/astro.js"
PORT="${PORT:-4321}"
mkdir -p "$STATE"

running() {
  [[ -f "$PID_FILE" ]] || return 1
  read -r PID < "$PID_FILE"
  [[ "$PID" =~ ^[0-9]+$ ]] || return 1
  kill -0 "$PID" 2>/dev/null || return 1
  local command
  command="$(ps -p "$PID" -o command=)"
  [[ "$command" == *"$ASTRO dev --host 127.0.0.1 --port "* ]]
}

case "${1:-status}" in
  start)
    if running; then
      echo "网站已运行 (PID $PID)。日志：$LOG"
      exit 0
    fi
    command -v node >/dev/null || { echo "请先安装 Node.js 和 npm。" >&2; exit 1; }
    command -v curl >/dev/null || { echo "需要 curl 检查启动状态。" >&2; exit 1; }
    command -v lsof >/dev/null || { echo "需要 lsof 检查端口。" >&2; exit 1; }
    [[ "$PORT" =~ ^[0-9]+$ ]] && (( PORT >= 1024 && PORT <= 65535 )) || { echo "PORT 必须为 1024–65535。" >&2; exit 1; }
    if lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
      echo "端口 $PORT 已被占用。请先停止原服务，或使用 PORT=4323 ./scripts/start.sh。" >&2
      exit 1
    fi
    cd "$ROOT"
    if [[ ! -f "$ASTRO" ]]; then npm ci; fi
    PID="$(node --input-type=module - "$ASTRO" "$PORT" "$LOG" <<'JS'
import { spawn } from 'node:child_process';
import { openSync, closeSync } from 'node:fs';
const [astro, port, log] = process.argv.slice(2);
const fd = openSync(log, 'w');
const child = spawn(process.execPath, [astro, 'dev', '--host', '127.0.0.1', '--port', port], {
  detached: true,
  stdio: ['ignore', fd, fd],
  env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' },
});
child.on('error', error => { console.error(error); process.exitCode = 1; });
child.unref();
closeSync(fd);
console.log(child.pid);
JS
)"
    echo "$PID" > "$PID_FILE"
    for ((i=0; i<60; i++)); do
      if ! running; then
        echo "启动失败，请查看：$LOG" >&2
        tail -n 20 "$LOG"
        exit 1
      fi
      if curl --silent --fail --max-time 2 "http://127.0.0.1:$PORT/" > /dev/null; then
        echo "网站已启动：http://127.0.0.1:$PORT/ (PID $PID)"
        echo "保存文件后自动更新。日志：$LOG"
        exit 0
      fi
      sleep 0.5
    done
    echo "启动超时，请查看 $LOG；可使用 ./scripts/stop.sh 停止。" >&2
    exit 1
    ;;
  stop)
    if ! running; then
      echo "没有由此脚本启动的运行中网站。"
      exit 0
    fi
    kill "$PID"
    for ((i=0; i<40; i++)); do
      if ! running; then
        rm -f "$PID_FILE"
        echo "网站已停止。"
        exit 0
      fi
      sleep 0.25
    done
    echo "进程尚未退出，请检查 PID $PID；未强制终止。" >&2
    exit 1
    ;;
  status)
    if running; then echo "网站正在运行 (PID $PID)。日志：$LOG"; else echo "网站未由此脚本运行。"; fi
    ;;
  *) echo "用法：$0 {start|stop|status}" >&2; exit 1 ;;
esac
