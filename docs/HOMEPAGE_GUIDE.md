# 首页手动编辑指南

首页从上到下是：个人简介 → 成果 → 方向 → 笔记。导航前三项与这三个区块顺序一致。

## 1. 先打开项目和预览

1. 用编辑器打开整个 `mogoo7zn.github.io` 文件夹。
2. 打开编辑器里的终端，在项目根目录运行 `npm run dev`。
3. 点击终端显示的本地地址，一般是 `http://localhost:4321`；如果已经有预览运行，直接使用现有预览。
4. 修改下面的数据文件，按 Command + S 保存，浏览器会自动更新。
5. `zh` 是中文，`en` 是英文。两份文字需要自己分别写，语言按钮不会自动翻译。

## 2. 修改姓名、学校、联系方式和头像

打开 `src/data/profile.ts`，搜索相应字段，只改引号里的内容。

| 显示位置 | 要改的字段 |
| --- | --- |
| 姓名，顶部导航姓名 | `realName.zh`、`realName.en` |
| 学校 | `university.zh`、`university.en` |
| 学院 | `college.zh`、`college.en` |
| 学位 | `degree.zh`、`degree.en` |
| 头像下面的简短身份 | `title.zh`、`title.en` |
| 邮箱 | `email` |
| GitHub 网址、显示用户名 | `github`、`githubHandle` |
| 浅色头像 | `avatar` |
| 深色头像 | `avatarDark` |

例如，把邮箱改为 `email: "yourname@example.com",`，首页与页尾都会使用新邮箱。

换头像：把图片放到 `public/images/`，例如 `my-avatar.png`，然后把路径改为 `/images/my-avatar.png`。网址里不写 `public`。如果明暗模式想用同一张图片，把 `avatar` 和 `avatarDark` 都填成这个路径。

`profile.ts` 中保留的 `bio` 等个人资料字段目前不控制首页两段介绍；首页介绍按下一节修改。

## 3. 修改首页两段介绍

打开 `src/data/homepage.ts`。

- `summary`：第一段研究介绍。
- `perspective`：第二段研究关注点。

例如：

```ts
summary: {
  zh: "我主要研究科学知识如何帮助模型推理与泛化。",
  en: "I study how scientific knowledge supports reasoning and generalization.",
},
```

保留逗号、引号和花括号。文字中有英文双引号时写成 `\"`，或换成中文引号“”。

## 4. 修改三个导航名称和区块标题

仍在 `src/data/homepage.ts`，找到 `sections`。

```ts
{ id: 'publications', label: { zh: '成果', en: 'Papers' }, eyebrow: '01 / PAPERS' },
```

- 改 `label.zh`、`label.en`：顶部导航和对应区块标题会一起改变。
- 改 `eyebrow`：修改区块标题上方的小字。
- 不要修改 `id`：它决定跳转地址，旧链接也依赖它。
- 不要只调整这个数组的顺序：当前组件按三个固定位置渲染。若要重新排列整个页面，需要同时调整 `ResearchHome.tsx` 中三个 `<section>` 的位置和对应配置。

首页当前三个区块链接依次为 `/#publications`、`/#about`、`/#practice`。保留旧 ID 是为了兼容已存在的链接。

## 5. 修改“方向”里的内容

打开 `src/data/profile.ts`，找到 `researchInterests`。

- `title.zh`、`title.en`：方向名称。
- `description.zh`、`description.en`：方向说明。
- 数组里从上到下的顺序，就是页面显示顺序。
- 新增方向：复制一个完整的 `{ ... },` 块，再修改内容；`icon` 当前作为唯一标识使用，填写一个不重复的值即可，不会展示图标。
- 删除方向：删除对应的完整 `{ ... },` 块。

## 6. 修改论文

打开 `src/content/publications/`，选择对应的 `.mdx` 文件。

文件最上面的两条 `---` 之间是论文信息：

- `title` / `titleEn`：标题。
- `authors`：作者列表。
- `year`：年份。
- `status`：`published` 已发表、`preprint` 预印本、`under-review` 审稿中、`in-preparation` 准备中。
- `pdf` / `code` / `doi` / `arxiv`：链接，没有就删除该字段。
- `draft: true`：从首页和论文列表隐藏；改回 `false` 后显示。

`---` 下面是论文详情页正文。首页论文按年份、日期倒序显示。新增论文可以复制一份现有文件，换一个文件名，再修改信息；文件名决定网址，不建议随意改动已公开的文件名。

不要去 `src/data/publications.ts` 改论文：那里现在只保留数据类型，没有第二份论文内容。

## 7. 修改“笔记”入口

打开 `src/data/homepage.ts`，找到 `notes`：

- `description.zh` / `.en`：入口说明。
- `link.zh` / `.en`：按钮文字。
- `href`：点击后去哪里，默认 `/blog`。

博客文章、系列名称和描述的修改方法见 [BLOG_GUIDE.md](./BLOG_GUIDE.md)。

## 8. 修改字号、布局和颜色

- 首页字号与间距：`src/styles/research-home.css`。
- 首页结构：`src/components/sections/ResearchHome.tsx`。日常改文字不需要打开它。
- 浅色调色板：`src/styles/themes/light.css`。
- 深色调色板：`src/styles/themes/dark.css`。

调色板中，背景是 `--color-bg`，卡片是 `--color-bg-card`，正文是 `--color-text`，次要文字是 `--color-text-secondary`，链接是 `--color-primary`。改主色时同步改 `--color-primary-rgb` 的 RGB 数字。

## 9. 改完检查

1. 保存文件，检查首页。
2. 点击中英文切换，检查两种语言。
3. 切换浅色和深色，检查两种主题。
4. 点三个导航，确认跳转位置正确。
5. 运行 `npm run build`，看到 `Complete!` 说明生产构建成功。
6. 运行 `npx tsc --noEmit`，没有输出说明 TypeScript 检查通过。

如果报错，先看报错文件和行号，最常见的是少了引号、逗号或花括号。这里的保存和预览只修改本地项目；线上发布方法见博客维护指南。
