# 项目清理记录

## 已删除的闲置实现

已核对当前页面及 MDX 引用，以下文件不再参与当前网站：

- `src/components/sections/About.tsx`
- `src/components/sections/CV.tsx`
- `src/components/sections/Hero.tsx`
- `src/components/sections/Projects.tsx`
- `src/components/sections/Skills.tsx`
- `src/components/sections/Timeline.tsx`
- `src/components/sections/ResearchWriting.tsx`
- `src/components/three/FloatingParticles.tsx`
- `src/components/three/NeuralNetwork.tsx`
- `src/components/three/Scene.tsx`
- `src/components/three/HeroScene.tsx`
- `src/components/ui/CircuitDivider.tsx`
- `src/components/ui/LoadingScreen.tsx`
- `src/components/ui/SectionHeader.tsx`
- `src/components/ui/SectionLoader.tsx`
- `src/i18n/utils.ts`
- `src/data/awards.ts`
- `src/data/skills.ts`
- `src/data/timeline.ts`

旧技能、荣誉与时间线原始资料完整归档到 `docs/archive/PERSONAL_RECORDS.md`，没有删除博客、论文、图片、附件或内嵌项目资料。MDX 写作组件继续保留供文章使用。

## 其他修改

- `package.json`、`package-lock.json`：移除 Three.js、React Three Fiber、Drei 及类型依赖，清理 74 个依赖包。
- `astro.config.mjs`：删除不再需要的 3D 手动分包配置。
- `src/styles/global.css`：删除旧首页 3D、HUD、光圈、卡片与动画样式，保留页尾、正文和无人机所需样式。
- `src/styles/themes/light.css`、`src/styles/themes/dark.css`：删除废弃 3D 变量。
- `src/data/blogSeries.ts`：删除无消费方的 `featured` 配置。
- `src/i18n/ui.ts`：删除旧首页区块的翻译文案。
- `src/data/publications.ts`：移除重复论文数据，只保留组件类型。
- `src/components/publications/PublicationList.tsx`：移除旧数据回退，接收内容集合数据。
- `src/pages/publications/index.astro`：移除 `as any`，与首页一致过滤草稿。
- `tsconfig.json`：检查范围限定为主站源码，排除 `public` 中独立项目的资料源码。
- `src/data/homepage.ts`（新增）：集中管理首页两段介绍、三个导航／标题和博客入口。
- `src/data/profile.ts`：集中配置深色头像路径。
- `src/components/sections/ResearchHome.tsx`：读取首页文案配置，统一标题命名。
- `src/components/ui/Navbar.tsx`：按页面顺序显示成果、方向、笔记，复用头像和姓名配置。
- `docs/HOMEPAGE_GUIDE.md`（新增）：手动编辑首页的逐步说明。
- `docs/BLOG_GUIDE.md`：清理已过时说明，更新文件入口。
- `docs/archive/PERSONAL_RECORDS.md`（新增）：个人资料归档。
- `docs/CLEANUP_REPORT.md`（本文件）：具体清理清单。

## 验证

- Astro 生产构建成功，生成 21 个页面。
- 主站 TypeScript 检查通过。
- 内嵌项目保留为独立资料，不纳入主站类型检查。
