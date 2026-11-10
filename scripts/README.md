# 本地预览

需要 Node.js、npm，以及 macOS 自带的 bash、curl、lsof。

在项目根目录执行：

```bash
./scripts/start.sh            # 后台启动，默认 http://127.0.0.1:4321/
./scripts/stop.sh             # 停止脚本启动的网站
./scripts/local-site.sh status
```

脚本自动定位项目目录，也可从其他目录通过绝对路径调用。第一次缺少依赖时会运行 `npm ci`；更新 package-lock.json 后请手动运行 `npm ci`。保存源码后预览自动更新，无需重新构建。

启动后可以关闭终端。日志存放在 `.local-site/server.log`，PID 存放在 `.local-site/server.pid`，不提交到 Git。重复启动不会另开进程；停止操作只处理脚本记录且命令匹配的网站进程。旧的手动 `npm run dev` 服务需在原终端按 Ctrl+C 停止。

端口被其他程序占用时，脚本会报错，可指定其他端口：

```bash
PORT=4323 ./scripts/start.sh
```

检查正式构建（不发布线上）：

```bash
ASTRO_TELEMETRY_DISABLED=1 npm run build
```
