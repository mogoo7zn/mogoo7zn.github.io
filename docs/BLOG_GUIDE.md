# 博客维护说明：从打开文件开始

这个网站没有后台编辑器。**一篇文章就是一个 `.md` 或 `.mdx` 文件；一个系列就是配置文件里的一项。** 修改文件、保存、本地预览，最后提交并推送，网站才会上线更新。

本文中的路径均以仓库根目录为起点：`/Users/mogu/Workspace/personal/mogoo7zn.github.io`。在编辑器中打开这个文件夹，就能按左侧目录找到下面的文件。

## 1. 先认识三个位置

| 你要做什么 | 打开哪里 |
| --- | --- |
| 新建文章、改正文、改文章标题、设置草稿 | `src/content/blog/` |
| 改系列名称、简介、标签 | `src/data/blogSeries.ts` |
| 放文章插图、附件 | `public/images/blog/`、`public/files/` |

通常不需要改 `src/pages/`、`src/layouts/` 或组件代码。

## 2. 第一次本地预览

1. 用编辑器打开上面的仓库文件夹。
2. 打开编辑器的“终端”。确认终端所在目录是这个仓库；不确定就运行：

```sh
cd /Users/mogu/Workspace/personal/mogoo7zn.github.io
```

3. 运行：

```sh
npm run dev
```

如果终端提示找不到依赖，先运行 `npm ci`，再运行 `npm run dev`。需要已安装 Node.js 和 npm。

4. 打开终端给出的 Local 地址，通常是 `http://localhost:4321`。如果端口被占用，以终端显示的地址为准。
5. 修改文件后保存，浏览器一般会自动更新。看不到变化时刷新页面。
6. 不预览时，在终端按 `Control + C` 结束服务。

如果出现 Astro 无法创建 Preferences 目录的权限报错，可使用 `ASTRO_TELEMETRY_DISABLED=1 npm run dev`。这只是关闭本地遥测，不改变网站功能。

## 3. 新建一篇 S4AI 阅读笔记

1. 打开 `src/content/blog/s4ai-series/`。
2. 新建文件 `01-my-first-paper.md`。文件名建议只用小写英文、数字和连字符，不用空格。
3. 将下面整段复制到新文件，修改标题、日期和正文，保存。

```md
---
title: "论文阅读：这里写中文标题"
titleEn: "Paper Notes: Your English Title"
description: "用一两句话写清楚这篇论文解决的问题和你关注的点。"
descriptionEn: "A short description of the question and focus of this note."
pubDate: 2026-10-10
tags: [S4AI, Reasoning]
series: s4ai
seriesOrder: 1
draft: true
---

## 论文信息

- 标题：
- 作者与年份：
- 原文：[论文链接](https://example.com)
- 代码：

## 研究问题

这里写正文。

## 使用了什么科学知识

这里写知识形式、假设以及成立条件。

## 方法与机制

这里解释知识如何进入训练、模型结构或推理过程。

## 实验证据

记录任务、基线、数据划分、消融和泛化结果。

## 局限与个人判断

分别说明作者主张、证据支持的内容和你自己的推测。
```

4. 写作期间保留 `draft: true`。草稿不会进入博客列表和系列目录；直接打开地址只会显示“写作中”，不会展示正文。
5. 想预览正文时，**在本地临时改为 `draft: false`**，保存后访问：`http://localhost:4321/blog/s4ai-series/01-my-first-paper`。
6. 如果尚不准备发布，推送前改回 `draft: true`。草稿不是隐私保护：文章源文件仍可能被公开仓库的访问者看到。
7. 准备发布时保持 `draft: false`，按后面的上线步骤操作。

`titleEn` 和 `descriptionEn` 只影响列表中的英文标题和简介，**不会自动翻译正文**。正文是什么语言，读者就看到什么语言。

## 4. 新建部署系列文章

操作与上面一样，只改三个位置：

- 放到 `src/content/blog/deployment-series/`。
- 文件名例如 `01-requirements.md`。
- 文件开头填写 `series: deployment`。

正文可以这样组织：场景与目标、前置条件、操作步骤、验收结果、失败处理、交接清单。导读是 `seriesOrder: 0`，第一篇正式章节填 `1`，第二篇填 `2`，依次增加。

## 5. 新建不属于任何系列的文章

在 `src/content/blog/` 下面新建文件，例如 `my-note.md`，复制上面的模板，**删除 `series` 和 `seriesOrder` 两行**。

发布后，它会作为独立文章出现在博客首页，地址为 `/blog/my-note`。

## 6. 文件开头各字段是什么意思

两条 `---` 之间的内容叫“文章信息”。不要删掉这两条分隔线。

| 字段 | 怎么填 | 是否必须 |
| --- | --- | --- |
| `title` | 中文标题，建议用英文双引号包住 | 必须 |
| `description` | 一两句简介 | 必须 |
| `pubDate` | 首次发布日期，如 `2026-10-10` | 必须 |
| `titleEn` / `descriptionEn` | 英文标题与简介 | 可选，省略时回退到中文 |
| `updatedDate` | 更新日期，如 `2026-10-12`，作为内容元数据保存；当前页面不单独显示 | 可选 |
| `tags` | 标签列表，如 `[S4AI, Reasoning]` | 可选 |
| `series` | 系列的固定 ID，例如 `s4ai` | 系列文章要填 |
| `seriesOrder` | 章节顺序，越小越靠前 | 建议填写，不要重复 |
| `draft` | `true` 是草稿；`false` 是公开文章 | 建议显式填写 |
| `cover` | 封面图片路径，例如 `/images/blog/my-note/cover.png` | 可选，画廊式系列会显示 |

`pubDate` 只是排序与展示用的日期，**写未来日期不等于定时发布**。要暂缓发布，请用 `draft: true`。

## 7. 修改文章内容、标题与顺序

- **改正文**：找到对应 `.md` / `.mdx`，修改第二条 `---` 后面的内容，保存。
- **改文章标题**：改 `title`，如果有英文标题也改 `titleEn`。不需要改文件名。
- **改文章简介**：改 `description` / `descriptionEn`。
- **改章节顺序**：改 `seriesOrder`。目录和上一篇／下一篇都按此排序。没填时排在有编号的文章后面，再按日期从早到晚排序。
- **修改标签**：改 `tags`。相同标签尽量使用完全一样的拼写和大小写。
- **改所属系列**：把 `series: s4ai` 换成目标系列 ID，例如 `series: research`；调整 `seriesOrder`。**不用移动文件**。
- **取消系列归属**：删除 `series` 和 `seriesOrder` 两行。
- **暂时下架文章**：改为 `draft: true`；不需要删除文件。

文章网址来自 `src/content/blog/` 下的文件相对路径。例如 `s4ai-series/01-my-first-paper.md` 对应 `/blog/s4ai-series/01-my-first-paper`。**改文件名或移动文件会改变网址，旧链接可能失效。** 为了整理分类，优先改 `series`，不要移动已发布文件。

## 8. 改系列名称和简介：只改这一个文件

打开 `src/data/blogSeries.ts`。找到你要改的系列，例如：

```ts
{
  id: 's4ai',
  title: { zh: 'S4AI · 论文阅读', en: 'S4AI · Paper Notes' },
  description: {
    zh: '这里是中文系列简介。',
    en: 'This is the English description.',
  },
  tags: ['S4AI', 'Science for AI', 'Reasoning'],
},
```

- 修改 `title.zh`：改中文系列名称。
- 修改 `title.en`：改英文系列名称。
- 修改 `description.zh` / `.en`：改系列简介。
- 修改 `tags`：改博客首页系列卡片的标签；不会自动修改文章自己的标签。
- **不要为了改名称去改 `id`。** `id` 是文章归属和网址使用的固定标识，不是给读者看的标题。

保存后，主页推荐卡片、博客系列入口、系列页面、文章系列导航和返回链接会使用同一份配置。

## 9. 新建一个系列

假设想开“模型评估”系列：

1. 打开 `src/data/blogSeries.ts`。
2. 找到末尾的 `];`。在它的**前面**插入下面这一整个对象，保留逗号：

```ts
  {
    id: 'evaluation',
    title: { zh: '模型评估', en: 'Model Evaluation' },
    description: {
      zh: '记录评估任务、实验设计与结果分析。',
      en: 'Notes on evaluation tasks, experiment design, and results.',
    },
    tags: ['Evaluation', 'Research'],
    layout: 'list',
  },
```

3. `id` 用小写英文和连字符，并且不能和已有系列或独立文章的网址重名。不要使用 `index`。
4. 在 `src/content/blog/` 下新建文件夹 `evaluation-series`，再新建第一篇文章。
5. 文章开头写 `series: evaluation`，并填写 `seriesOrder: 0`。
6. 保存后，系列网址自动生成：`/blog/evaluation`。**不需要新建 `.astro` 页面。**
7. 系列没有公开文章时，目录会显示准备中；发布第一篇 `draft: false` 的文章后，博客首页才会出现该系列聚合入口。

`layout: 'list'` 是文字目录，适合论文和技术文档。`layout: 'gallery'` 是封面画廊，适合 Blender 等视觉内容；配合文章 `cover` 使用。没有写 `layout` 时默认文字目录。

已有的 `blender` 和 `research` 保留了旧路由兼容文件。它们的名称和简介同样只改配置；不要随意改这两个 ID 或删除配置项。

## 10. 插入图片和附件

1. 在 `public/images/blog/` 下建一个与文章相关的文件夹，例如 `my-paper`。
2. 把图片放进去，例如 `method.png`。
3. 在正文插入：

```md
![方法示意图：描述图片内容](/images/blog/my-paper/method.png)
```

注意：链接中**不写 `public`**。同理，把 PDF 放在 `public/files/my-paper.pdf` 后，可以写：

```md
[下载 PDF](/files/my-paper.pdf)
```

图片和文件名建议用英文，不要使用自己电脑上的绝对路径。

## 11. 最常用的 Markdown 写法

```md
## 二级标题

普通正文。不同段落之间空一行。

### 三级标题

**加粗文字**，`行内代码`。

- 第一项
- 第二项

1. 第一步
2. 第二步

[链接说明](https://example.com)

> 引用或提示。

| 方法 | 结果 |
| --- | --- |
| Baseline | 待填写 |
```

文章标题已经由 `title` 显示，正文通常从 `##` 开始。普通写作优先用 `.md`；只有需要 React/MDX 交互组件时才用 `.mdx`。已有 `.mdx` 文件中的 `import` 行不要随意删除。

## 12. 发布前检查与上线

1. 在本地检查：标题、图片、表格、链接、系列归属、章节顺序和 `draft` 是否正确。
2. 在终端运行：

```sh
npm run build
```

出现 `[build] Complete!` 才说明构建完成。如果 Astro 遥测遇到权限报错，运行 `ASTRO_TELEMETRY_DISABLED=1 npm run build`。

3. 运行 `git status --short`，查看改动文件。**只提交你这次确定要上线的文件**。例如只新增一篇文章：

```sh
git add src/content/blog/s4ai-series/01-my-first-paper.md
git commit -m "docs: add S4AI reading note"
```

如果还改了系列配置，也要执行 `git add src/data/blogSeries.ts`，再提交。如果有图片，也要加入对应图片路径。

4. 运行 `git branch --show-current` 确认所在分支。仓库现有配置只在推送到 `main` 时自动部署。若当前就在 `main`，并确认要发布，运行 `git push origin main`；其他分支需要先通过你平时的方式合入 `main`。
5. 在 GitHub 仓库的 **Actions → Deploy to GitHub Pages** 查看最新运行。等 build 和 deploy 成功后，再检查正式网站。

保存文件只更新本地预览，`git commit` 只记录本地版本；推送并部署成功后，正式网站才会更新。这里没有替你执行提交或推送。

## 13. 常见问题

| 现象 | 先检查 |
| --- | --- |
| 文章不出现在列表 | `draft` 是否仍是 `true`？属于系列的文章会收在系列入口里 |
| 系列目录里找不到文章 | 文章的 `series` 是否与配置的 `id` 完全相同？ |
| 新系列在博客首页不出现 | 是否已有至少一篇公开文章？ |
| 改了系列名字，网址没变 | 正常，标题与 `id` 分开管理 |
| 顺序不对 | 是否填写了唯一的 `seriesOrder`？ |
| 图片不显示 | 文件是否存在？链接是否误写了 `public`？大小写是否一致？ |
| 开头信息导致构建失败 | 检查 `---`、英文冒号、引号、日期和列表方括号 |
| 正文切英文没有变化 | 语言切换不翻译正文；需要自己写英文内容 |
| 本地正常，线上没变化 | 是否推送到 `main`，部署任务是否成功？ |

## 14. 首页与全站编辑

首页编辑请看 [HOMEPAGE_GUIDE.md](./HOMEPAGE_GUIDE.md)。

- 首页简介、导航名称、笔记入口：`src/data/homepage.ts`。
- 姓名、学校、邮箱、头像和研究方向：`src/data/profile.ts`。
- 论文内容：`src/content/publications/`，首页与论文页都读取这里，不再维护第二份论文数据。
- 项目信息：`src/data/projects.ts`。
- 浅色／深色主题：`src/styles/themes/light.css` 和 `src/styles/themes/dark.css`。
- 旧技能、经历与荣誉资料：`docs/archive/PERSONAL_RECORDS.md`，只作资料保留，不在网站展示。
- 本轮清理文件清单：[CLEANUP_REPORT.md](./CLEANUP_REPORT.md)。
