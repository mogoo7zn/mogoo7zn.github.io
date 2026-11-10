export const ui = {
  nav: {
    home: { zh: "首页", en: "Home" },
    projects: { zh: "项目", en: "Projects" },
    blog: { zh: "博客", en: "Blog" },
    publications: { zh: "论文", en: "Publications" },
  },
  projects: {
    title: { zh: "项目经历", en: "Projects" },
    viewMore: { zh: "查看详情", en: "View Details" },
    collapse: { zh: "收起", en: "Collapse" },
    techStack: { zh: "技术栈", en: "Tech Stack" },
    highlight: { zh: "项目要点", en: "Highlights" },
    readBlog: { zh: "阅读项目博客", en: "Read Project Blog" },
  },
  publications: {
    title: { zh: "论文成果", en: "Publications" },
    showAbstract: { zh: "查看摘要", en: "Abstract" },
    hideAbstract: { zh: "收起摘要", en: "Hide" },
    noPubs: {
      zh: "相关成果整理中",
      en: "Selected work will be added here.",
    },
  },
  footer: {
    builtWith: {
      zh: "使用 Astro + React 构建",
      en: "Built with Astro + React",
    },
    copyright: {
      zh: "© 2026 王子宁. 保留所有权利.",
      en: "© 2026 Zining Wang. All rights reserved.",
    },
  },
  visitCounter: {
    views: { zh: "浏览", en: "Views" },
    totalViews: { zh: "总访问", en: "Total Views" },
  },
  comments: {
    title: { zh: "评论区", en: "Comments" },
    leaveComment: { zh: "发表评论", en: "Leave a Comment" },
    loginPrompt: {
      zh: "请使用 GitHub 账号登录后发表评论",
      en: "Sign in with GitHub to leave a comment",
    },
    githubLogin: { zh: "使用 GitHub 登录", en: "Sign in with GitHub" },
    githubLogout: { zh: "退出登录", en: "Sign out" },
    loggedInAs: { zh: "已通过 GitHub 认证", en: "Authenticated via GitHub" },
    content: { zh: "评论内容", en: "Comment" },
    contentPlaceholder: {
      zh: "写下你的想法或问题...",
      en: "Share your thoughts or questions...",
    },
    submit: { zh: "提交评论", en: "Submit" },
    submitting: { zh: "提交中...", en: "Submitting..." },
    submitSuccess: { zh: "评论已提交！", en: "Comment submitted!" },
    loading: { zh: "加载评论中...", en: "Loading comments..." },
    noComments: {
      zh: "目前还没有评论",
      en: "No comments yet.",
    },
    errors: {
      contentRequired: {
        zh: "评论内容不能为空",
        en: "Comment content is required",
      },
      notLoggedIn: {
        zh: "请先登录 GitHub 账号",
        en: "Please sign in with GitHub first",
      },
      tooShort: {
        zh: "评论内容至少需要2个字符",
        en: "Comment must be at least 2 characters",
      },
      tooLong: {
        zh: "评论内容不能超过2000个字符",
        en: "Comment must be under 2000 characters",
      },
      rateLimited: {
        zh: "评论太频繁，请稍后再试",
        en: "Too many comments, please wait a few minutes",
      },
      notConfigured: {
        zh: "评论系统未配置",
        en: "Comment system not configured",
      },
      unknown: {
        zh: "提交失败，请重试",
        en: "Submission failed, please retry",
      },
    },
    admin: {
      title: { zh: "管理员", en: "Admin" },
      login: { zh: "登录", en: "Login" },
      logout: { zh: "退出管理", en: "Logout" },
      loggedIn: { zh: "管理员模式已启用", en: "Admin mode active" },
      delete: { zh: "删除评论", en: "Delete comment" },
      passwordPlaceholder: { zh: "管理员密码", en: "Admin password" },
      wrongPassword: { zh: "密码错误", en: "Wrong password" },
      loginError: { zh: "登录失败", en: "Login failed" },
    },
  },
} as const;

export type UIKeys = typeof ui;
