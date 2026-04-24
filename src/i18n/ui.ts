export const ui = {
  nav: {
    home: { zh: "首页", en: "Home" },
    about: { zh: "关于", en: "About" },
    projects: { zh: "项目", en: "Projects" },
    skills: { zh: "技能", en: "Skills" },
    timeline: { zh: "时间线", en: "Timeline" },
    cv: { zh: "简历", en: "CV" },
    blog: { zh: "博客", en: "Blog" },
    publications: { zh: "论文", en: "Publications" },
  },
  hero: {
    greeting: { zh: "你好，我是", en: "Hi, I'm" },
    subtitle: {
      zh: "我从工程实践进入研究，现在主要围绕具身智能与 AI4S，关心交互理解、系统落地和可验证的问题设定",
      en: "I moved from engineering practice into research. My current work centers on embodied AI and AI4S, with an emphasis on interaction understanding, deployable systems, and problems that can be tested in the real world.",
    },
    cta: { zh: "了解更多", en: "Learn More" },
    scrollDown: { zh: "向下滚动", en: "Scroll Down" },
  },
  about: {
    title: { zh: "关于我", en: "About Me" },
    description: {
      zh: "我目前在中国科学技术大学学习计算机科学与技术，主要关注具身智能与 AI4S，也持续从工程实践里寻找真正值得研究的问题",
      en: "I study Computer Science and Technology at USTC. My main interests are embodied AI and AI4S, and I keep looking for research questions that emerge from real engineering practice.",
    },
    researchAreas: { zh: "研究方向", en: "Research Interests" },
  },
  projects: {
    title: { zh: "项目经历", en: "Projects" },
    viewMore: { zh: "查看详情", en: "View Details" },
    collapse: { zh: "收起", en: "Collapse" },
    techStack: { zh: "技术栈", en: "Tech Stack" },
    highlight: { zh: "核心收获", en: "Key Takeaway" },
    readBlog: { zh: "阅读项目博客", en: "Read Project Blog" },
  },
  skills: {
    title: { zh: "技术能力", en: "Skills" },
    languages: { zh: "编程语言", en: "Languages" },
    frameworks: { zh: "框架与库", en: "Frameworks" },
    platforms: { zh: "开发平台", en: "Platforms" },
    tools: { zh: "开发工具", en: "Tools" },
  },
  timeline: {
    title: { zh: "成长历程", en: "Timeline" },
  },
  cv: {
    title: { zh: "学术简历", en: "Academic CV" },
    education: { zh: "教育背景", en: "Education" },
    awards: { zh: "奖项荣誉", en: "Awards" },
    english: { zh: "英语水平", en: "English" },
    download: { zh: "下载完整简历", en: "Download Full CV" },
    gpa: { zh: "GPA", en: "GPA" },
    rank: { zh: "专业排名", en: "Major Rank" },
  },
  publications: {
    title: { zh: "论文成果", en: "Publications" },
    showAbstract: { zh: "查看摘要", en: "Abstract" },
    hideAbstract: { zh: "收起摘要", en: "Hide" },
    noPubs: {
      zh: "论文即将发布，敬请期待",
      en: "Publications coming soon — stay tuned",
    },
  },
  blog: {
    title: { zh: "博客", en: "Blog" },
    readMore: { zh: "阅读全文", en: "Read More" },
    backToList: { zh: "返回列表", en: "Back to List" },
    noPosts: { zh: "暂无文章", en: "No posts yet" },
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
  loading: {
    text: { zh: "加载中...", en: "Loading..." },
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
      zh: "还没有评论，来留下第一条吧！",
      en: "No comments yet — be the first!",
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
