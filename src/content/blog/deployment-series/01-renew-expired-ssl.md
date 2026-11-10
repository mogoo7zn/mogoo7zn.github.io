---
title: "更新过期 SSL 证书"
titleEn: "Renewing Expired TLS Certificates"
description: "适用于一台跳板机通过 Nginx 和反向 SSH 隧道转发多个 GPU 网站"
descriptionEn: "Inspect and renew one site's certificate on a shared Nginx gateway connected to GPU servers through reverse SSH tunnels."
pubDate: 2026-10-15
updatedDate: 2026-10-16
tags: [Deployment, HTTPS, Nginx, Operations]
series: deployment
seriesOrder: 1
draft: false
---

本文用于**已经正常配置过 HTTPS、现在证书过期，需要重新申请并替换证书**的场景。架构是：在阿里云租一台轻量应用服务器作为公网跳板机，多个网站共用这台机器的 Nginx，后台 GPU 服务器通过长期运行的反向 SSH 隧道提供服务。

本文所有域名、IP、文件名和端口都是示例。按顺序操作，每一步先确认结果再继续。密码、私钥正文不写入文档，也不上传到代码仓库。

## 1. 这次到底要改哪里

```text
用户浏览器
    │ HTTPS
    ▼
阿里云跳板机：Nginx，公网 443
    │
    ├─ 网站 A 域名 → A 的 SSL 证书 → 本地隧道端口 → GPU 服务器 A
    │
    └─ 网站 B 域名 → B 的 SSL 证书 → 本地隧道端口 → GPU 服务器 B
```

**证书放在跳板机上。** 这次维护只替换目标网站的证书和配套私钥，然后让 Nginx 加载新文件。现有域名转发、GPU 服务和 SSH 隧道保持原来的工作方式。

不同网站共用 443 是正常的：Nginx 根据域名选择对应证书和转发规则。不要为了换证书新增一个 Nginx、重建隧道，或把其他网站的配置覆盖掉。

整个流程只有八步：

1. 登录阿里云跳板机。
2. 查清目标域名的配置、证书路径和隧道端口。
3. 在阿里云申请新证书，下载 Nginx 格式。
4. 上传到跳板机的独立暂存目录。
5. 检查新证书并备份原文件。
6. 只替换目标网站的证书和私钥。
7. 检查配置，平滑加载 Nginx。
8. 验证目标网站和同机其他网站。

## 2. 登录：进入跳板机，不是 GPU 服务器

### 在阿里云浏览器控制台找机器

打开阿里云控制台，搜索 **轻量应用服务器**，进入承载网站公网入口的实例，记下它的**公网 IP**。如果有多台实例，结合域名解析记录确认是哪一台。

### 在 Mac 终端登录

```sh
ssh admin@跳板机公网IP
```

把 `admin` 替换成实际登录用户。已经配置 SSH 别名时，也可以用 `ssh 别名`。第一次连接时核对主机指纹；使用已有的密钥或正常交互方式登录，不把密码写进命令。

登录后执行：

```sh
hostname
whoami
sudo systemctl status nginx --no-pager
```

预期能看到这台机器的主机名、登录用户，以及 Nginx 的 `active (running)`。如果 Nginx 不存在，先确认是否登录了错误的机器，不要直接安装。

**后文标注“跳板机”的命令都在这个 SSH 窗口执行；标注“Mac”的命令在另一个本地终端执行。**

## 3. 查询现有信息：先看清楚，再动文件

### 3.1 跳板机：检查现有配置是否正常

```sh
sudo nginx -t
```

预期出现：

```text
syntax is ok
test is successful
```

证书过期时，这个检查仍可能通过：它检查配置和文件是否可加载，不代表证书仍在有效期。如果这里已经报错，先处理错误，暂不替换或 reload。

### 3.2 跳板机：列出所有域名和证书路径

```sh
sudo nginx -T 2>&1 | grep -nE 'configuration file|server_name|listen|ssl_certificate|proxy_pass'
```

输出用于快速找线索，例如：

```nginx
# configuration file /etc/nginx/conf.d/site-a.conf:
server_name example.com www.example.com;
ssl_certificate     /etc/nginx/cert/example.com.pem;
ssl_certificate_key /etc/nginx/cert/example.com.key;
proxy_pass http://127.0.0.1:13001;
```

再打开完整输出确认它们属于同一个站点，而不是相邻网站：

```sh
sudo nginx -T 2>&1 | less
```

输入 `/你的域名` 搜索，按 `n` 找下一处，按 `q` 退出。找到目标域名对应的 HTTPS `server` 块，记录它上方的 `# configuration file ...` 文件名。也可对找到的文件运行：

```sh
sudo cat /etc/nginx/conf.d/site-a.conf
```

这里的 `site-a.conf` 只是示例，必须用真实路径。不要猜配置位于 `sites-available`，也不要照抄旧记录中的固定行号。

把查询结果填成这张小表，后面会反复用到：

| 必须查清的信息 | 示例 |
| --- | --- |
| 本次更新域名 | `example.com` |
| 是否也服务 www | `www.example.com` |
| 实际站点配置文件 | `/etc/nginx/conf.d/site-a.conf` |
| 证书路径 `ssl_certificate` | `/etc/nginx/cert/example.com.pem` |
| 私钥路径 `ssl_certificate_key` | `/etc/nginx/cert/example.com.key` |
| 各 location 的 `proxy_pass` | `/` → `127.0.0.1:13001`；其他路由按实际记录 |
| 同机需要回归的网站 | 网站 B、网站 C 的域名 |

**同一张证书如果被多个 server 块引用，这次替换会同时影响它们。** 查询时也要确认是否存在多组证书，例如分别配置了 RSA 和 ECDSA；这种情况不能只更新其中一份就结束。

### 3.3 跳板机：检查旧证书和隧道

用查到的真实路径执行：

```sh
sudo ls -l /etc/nginx/cert/example.com.pem /etc/nginx/cert/example.com.key
sudo openssl x509 -in /etc/nginx/cert/example.com.pem \
  -noout -subject -issuer -dates -ext subjectAltName
sudo ss -lntp
```

看三个信息：

- `notAfter`：旧证书的到期时间。
- `Subject Alternative Name`：证书实际覆盖的域名。
- `ss` 输出：Nginx 是否监听 80/443，配置中的本地上游端口是否由 `sshd` 监听。

如果证书路径是符号链接，尤其指向 `/etc/letsencrypt/`，先确认是否由自动工具管理。下面的手动替换流程针对**从阿里云下载并手动安装的普通证书文件**，不要直接覆盖自动工具管理的链接。

按实际上游端口检查业务响应，例如：

```sh
curl -sS -D- -o /dev/null --max-time 10 \
  -H 'Host: example.com' http://127.0.0.1:13001/
```

能返回应用预期的 HTTP 状态，说明这一段链路可达；401、404 等只代表收到响应，不等于整个业务正常。拒绝连接或超时说明还存在隧道或后端问题，应单独处理，换证书不会修好这部分。

### 3.4 Mac：记录当前公网状态

```sh
curl -Iv --connect-timeout 10 --max-time 20 https://example.com/
```

若返回 `certificate has expired`，记录为本次维护前状态。先对同机其他网站也做一次检查，方便更新后比较。

## 4. 在阿里云获取新 SSL 证书

### 4.1 打开申请入口

在**Mac 浏览器**登录阿里云控制台，搜索 **数字证书管理服务**，进入证书管理，找到目标域名的旧证书。

若原来使用个人测试证书，可进入 **个人测试证书（原免费证书）→ 创建证书**，按当前账号可用额度和页面提示申请；其他证书则使用对应的续签或新申请入口。到期证书不会因为文件仍在服务器上而自动延长，需要得到新的签发结果。产品名称、额度和有效期以当前页面为准。[阿里云申请说明](https://help.aliyun.com/zh/ssl-certificate/create-a-certificate)

### 4.2 填写需要覆盖的域名

按第 3 节查到的 `server_name` 和实际使用情况填写。尤其注意根域名与 `www`：

```text
example.com
www.example.com
```

最终新证书需要覆盖仍在使用的全部域名。不要假定申请根域名就一定包含 `www`，下载后必须检查 SAN。即使 `www` 只是跳转到根域名，HTTPS 跳转前也需要完成证书校验。

### 4.3 完成域名验证

按订单选择 DNS 验证：

1. 如果域名解析在同一阿里云账号，且页面提供自动验证，按页面操作。
2. 否则打开域名真正使用的 DNS 管理平台；在阿里云托管时，搜索“云解析 DNS”，找到该域名的解析设置。
3. 新增订单要求的 **TXT 或 CNAME**，逐项复制记录类型、主机记录和记录值。
4. 检查主机记录是否被平台自动补全域名，避免重复后缀。
5. 保存并等待解析生效，回到证书订单验证、提交，直到显示“已签发”。

**不要修改原有指向跳板机的 A/AAAA 记录。** 验证记录是额外添加的记录，值来自本次订单，不沿用旧订单的值。当前 HTTPS 过期不妨碍 DNS 验证。[阿里云验证说明](https://www.alibabacloud.com/help/zh/ssl-certificate/verify-the-ownership-of-a-domain-name)

### 4.4 下载 Nginx 格式

在新证书的下载入口选择 **Nginx**，解压后找到证书链 `.pem` 和配套私钥 `.key`。文件可能带订单编号，以下载结果为准。若使用自己生成的 CSR，则需使用该 CSR 对应的私钥。

在 Mac 的下载目录新建 `ssl-renewal` 文件夹，只放这次要更新的两个文件。为方便后续命令，可以重命名为：

```text
~/Downloads/ssl-renewal/new-cert.pem
~/Downloads/ssl-renewal/new-key.key
```

重命名不会改变证书内容。不要把其他网站的证书或私钥混进这个文件夹。

## 5. 上传新文件，并检查是否拿对

### 跳板机：创建独立暂存目录

```sh
mkdir -m 700 "$HOME/ssl-renewal-upload"
```

如果提示已存在，先查看目录内是否有旧文件；不要不加检查地覆盖。必要时换一个新目录名，并同步修改后续命令。

### Mac：上传指定的两个文件

```sh
chmod 600 ~/Downloads/ssl-renewal/new-key.key
scp ~/Downloads/ssl-renewal/new-cert.pem \
    ~/Downloads/ssl-renewal/new-key.key \
    admin@跳板机公网IP:ssl-renewal-upload/
```

替换实际用户名和 IP。不要使用 `Downloads/*.key` 等通配符。此时只是上传到暂存目录，线上证书还没有改变。

### 跳板机：检查新证书有效期、域名和配对

```sh
chmod 600 "$HOME/ssl-renewal-upload/new-key.key"
openssl x509 -in "$HOME/ssl-renewal-upload/new-cert.pem" \
  -noout -subject -issuer -dates -ext subjectAltName
```

确认新到期时间已更新、当前时间在有效期内，SAN 覆盖所需域名。然后检查证书和私钥是否配对：

```sh
openssl x509 -in "$HOME/ssl-renewal-upload/new-cert.pem" -pubkey -noout |
  openssl pkey -pubin -outform DER | openssl dgst -sha256
openssl pkey -in "$HOME/ssl-renewal-upload/new-key.key" -pubout -outform DER |
  openssl dgst -sha256
```

两条命令都应无报错，输出的摘要应完全相同。域名不全、有效期不对或摘要不同，**停在这里，不替换线上文件**。文件名相似不代表它们配对。

## 6. 跳板机：备份并只替换目标网站的两个文件

### 6.1 设置本次目标路径

在当前 SSH 窗口设置变量，下面路径必须替换为第 3 节实际查到的路径：

```sh
TARGET_CERT='/etc/nginx/cert/example.com.pem'
TARGET_KEY='/etc/nginx/cert/example.com.key'
TLS_BACKUP_DIR="/root/ssl-backup/$(date +%Y%m%d-%H%M%S)"
printf '证书：%s\n私钥：%s\n备份：%s\n' \
  "$TARGET_CERT" "$TARGET_KEY" "$TLS_BACKUP_DIR"
sudo ls -l "$TARGET_CERT" "$TARGET_KEY"
```

再次核对打印出的路径属于目标域名，不是同机其他网站。下面的命令要在**同一个 SSH 窗口**继续执行。重连后需要重新设置变量，备份路径必须使用原先记录的实际路径。

### 6.2 创建备份

```sh
sudo install -d -m 700 "$TLS_BACKUP_DIR" &&
sudo cp -a "$TARGET_CERT" "$TLS_BACKUP_DIR/old-cert.pem" &&
sudo cp -a "$TARGET_KEY" "$TLS_BACKUP_DIR/old-key.key" &&
sudo cp -a /etc/nginx "$TLS_BACKUP_DIR/nginx" &&
sudo ls -l "$TLS_BACKUP_DIR"
```

确认存在 `old-cert.pem`、`old-key.key` 和 `nginx` 备份。记下备份目录。备份包含私钥，仅在服务器受限目录保存，不放进公开文档。

### 6.3 安装新文件到原路径

```sh
sudo install -o root -g root -m 644 \
  "$HOME/ssl-renewal-upload/new-cert.pem" "$TARGET_CERT" &&
sudo install -o root -g root -m 600 \
  "$HOME/ssl-renewal-upload/new-key.key" "$TARGET_KEY" &&
sudo nginx -t
```

本例适用于常规 root 主进程的 Nginx。私钥权限为 `600`，证书为 `644`。`&&` 使前一步失败时后续不再执行。

**保持原路径的好处是无需编辑 Nginx 配置。** 目标域名的 `server_name`、所有 `location`、`proxy_pass`、WebSocket、超时、HTTP 跳转和其他网站的证书都保留原样。

两个文件不是同时替换的，因此这个短暂过程中不要让别人并行 reload 或发布。如果中途失败，应立即修正或按第 9 节恢复成对备份，不把不匹配的文件留到下一次加载。

## 7. 跳板机：检查成功后平滑加载

只有 `nginx -t` 显示成功后，继续执行：

```sh
sudo nginx -t && sudo systemctl reload nginx
sudo systemctl status nginx --no-pager
```

确认 reload 无报错且服务仍为 `active (running)`。使用 reload 平滑加载，不需要停止 Nginx，也不需要重启 GPU 服务或 SSH 隧道。

这里加载的是**整个 Nginx 配置**，不是仅加载目标网站。因此如果报错，不要强行 restart；先查看：

```sh
sudo journalctl -u nginx -n 50 --no-pager
sudo tail -n 50 /var/log/nginx/error.log
```

自定义日志路径以实际配置为准。常见错误是路径写错、文件权限不正确、证书与私钥不配对。配置检查通过也不等于线上已成功，继续验收。

## 8. 验收：先查目标网站，再查同机其他网站

### 8.1 跳板机：直接测试本机 Nginx

把域名替换为目标域名：

```sh
curl -Iv --connect-timeout 10 --max-time 20 \
  --resolve example.com:443:127.0.0.1 https://example.com/
```

这个命令直接连接跳板机本机，同时保留正确域名，能检查 Nginx 是否为该域名发出了有效证书。不要用 `-k` 跳过校验。

### 8.2 Mac：检查公网

```sh
curl -Iv --connect-timeout 10 --max-time 20 https://example.com/
curl -Iv --connect-timeout 10 --max-time 20 https://www.example.com/
```

只测试实际使用的域名，但根域名和 `www` 不能互相代替。预期证书校验通过，页面返回应用预期的状态或跳转。若应用不支持 HEAD，可改用浏览器或 GET 检查。

查看公网实际发出的证书日期：

```sh
openssl s_client -connect example.com:443 -servername example.com \
  </dev/null 2>/dev/null |
  openssl x509 -noout -subject -issuer -dates -fingerprint -sha256
```

应看到本次新证书的有效期。若仍是旧证书，可在跳板机运行下面命令，与公网指纹比较：

```sh
sudo openssl x509 -in "$TARGET_CERT" -noout -dates -fingerprint -sha256
```

直连这台跳板机时，两者应一致；不一致则检查是否 reload 成功、域名是否解析到另一台机器，以及是否命中了其他 server 块。

### 8.3 检查业务和其他网站

在浏览器打开目标网站，检查首页、必要 API、一个低成本操作及实时连接（如有）。再对第 3 节记录的同机其他网站执行 HTTPS 检查。

确认以下四项才算本次完成：

- 目标域名及需要支持的子域名证书校验通过。
- 公网发出的证书是新证书。
- 原有页面和 GPU 后端业务正常。
- 其他域名仍提供各自正确的证书，业务状态没有因这次更新而改变。

## 9. 出错时怎么处理

| 现象 | 先做什么 |
| --- | --- |
| 新证书域名不包含 www | 回到申请平台补齐覆盖，先不替换 |
| 公钥摘要不同 | 重新下载同一订单的证书与配套私钥 |
| `nginx -t` 失败 | 不 reload；检查错误路径、权限及文件配对 |
| 本机已更新，公网仍过期 | 检查 DNS、实际入口、SNI 匹配和加载结果 |
| 证书正常，但页面 502/504 | 查本地隧道监听、GPU 服务及 Nginx 日志 |
| 同机其他网站异常 | 对比维护前状态，检查配置是否被额外修改 |

若新文件导致配置检查失败，可以在**保留第 6 节变量的同一 SSH 窗口**恢复：

```sh
sudo cp -a "$TLS_BACKUP_DIR/old-cert.pem" "$TARGET_CERT" &&
sudo cp -a "$TLS_BACKUP_DIR/old-key.key" "$TARGET_KEY" &&
sudo nginx -t
```

如果此前已经加载了新文件，并决定回退，检查通过后再 reload。旧证书已过期时，回退只能恢复文件状态，不能解决过期问题；仍要重新安装正确的新证书。

不要直接把整个 Nginx 备份覆盖回去，以免撤销其他网站同时发生的合法变更。此次正常流程没有改站点配置，通常只需恢复上述两个文件。

## 10. 补充：忘记隧道连接哪台 GPU 时如何查

换证书不要求先登录 GPU。只有需要确认后端归属或排查隧道故障时，才使用本节。

在跳板机运行：

```sh
sudo ss -lntp
```

找到目标 `proxy_pass` 端口对应的 `sshd` PID，再用**当前 PID**查询已建立连接，例如：

```sh
sudo ss -tnp state established | grep 'pid=123456,'
```

把 `123456` 换成实际 PID，观察 Peer Address。它可能是 GPU 所在网络的 NAT 出口，不能直接当作可登录的 GPU 地址；需要结合原隧道服务配置确认。历史 PID 会变化，不能复用。

不要仅凭发现某个端口就给它新增路由。一个域名可能分别转发前端和 API，以已有 Nginx 配置为准。

## 11. 留下下次能用的记录

只记录必要信息：

| 信息 | 本次填写 |
| --- | --- |
| 更新域名及子域名 |  |
| 跳板机标识 |  |
| 站点配置文件 |  |
| 证书 / 私钥路径 |  |
| 反向隧道端口及对应服务 |  |
| 新证书到期时间 |  |
| 备份目录 |  |
| 更新与验收时间 |  |
| 同机其他网站检查结果 |  |
| 下次提醒日期 |  |

手动下载并安装的证书不会自行更新。按新证书的实际 `notAfter` 设置提前提醒，例如到期前 14 天与 7 天，并明确由谁完成申请和替换。证书平台显示续签成功后，仍要完成服务器安装和加载。

确认全部验收通过后，按自己的保留策略清理上传暂存文件，保留受限的必要备份。私钥不要遗留在公共目录、聊天记录或博客附件中。
