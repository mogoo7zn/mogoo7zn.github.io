export interface TimelineEvent {
  date: string;
  sortDate: number; // YYYYMM for sorting
  title: { zh: string; en: string };
  description: { zh: string; en: string };
  category: "education" | "project" | "award" | "internship" | "competition";
  icon: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    date: "2023.09",
    sortDate: 202309,
    title: { zh: "进入中国科学技术大学", en: "Enrolled at USTC" },
    description: {
      zh: "计算机科学与技术学院，计算机科学与技术专业",
      en: "Began undergraduate study in Computer Science and Technology at the School of Computer Science and Technology.",
    },
    category: "education",
    icon: "GraduationCap",
  },
  {
    date: "2024.01",
    sortDate: 202401,
    title: { zh: "时间流 App 项目启动", en: "TimeFlow App Project Begins" },
    description: {
      zh: "开始开发智能时间管理安卓应用",
      en: "Started building a smart time-management app for Android.",
    },
    category: "project",
    icon: "Clock",
  },
  {
    date: "2024.01",
    sortDate: 202401,
    title: { zh: "外研社国才杯省级二等奖", en: "FLTRP Provincial Second Prize" },
    description: {
      zh: "2023 年度外研社国才杯省级二等奖",
      en: "Won the Anhui Provincial Second Prize in the FLTRP·ETIC competition.",
    },
    category: "award",
    icon: "Trophy",
  },
  {
    date: "2024.04",
    sortDate: 202404,
    title: {
      zh: "望江挑花研究项目启动",
      en: "Wangjiang Embroidery Research Begins",
    },
    description: {
      zh: "大学生研究计划：非遗数字化保护与风格融合",
      en: "Launched an undergraduate research project on digital heritage preservation and style fusion.",
    },
    category: "project",
    icon: "Palette",
  },
  {
    date: "2024.12",
    sortDate: 202412,
    title: { zh: "时间流 App 发布", en: "TimeFlow App Released" },
    description: {
      zh: "完成 v1.0 版本开发并面向校园用户发布",
      en: "Completed version 1.0 and released it to campus users.",
    },
    category: "project",
    icon: "Clock",
  },
  {
    date: "2024.12",
    sortDate: 202412,
    title: {
      zh: "获校优秀学生奖学金银奖",
      en: "University Scholarship Silver",
    },
    description: {
      zh: "2024 年度校优秀学生奖学金",
      en: "Received the 2024 Outstanding Student Scholarship.",
    },
    category: "award",
    icon: "Trophy",
  },
  {
    date: "2024.12",
    sortDate: 202412,
    title: {
      zh: "余庆杯 三等奖",
      en: "Yuqing Cup Third Prize",
    },
    description: {
      zh: "2024 年度余庆杯竞赛三等奖",
      en: "Won Third Prize in the 2024 Yuqing Cup competition.",
    },
    category: "award",
    icon: "Trophy",
  },
  {
    date: "2025.02",
    sortDate: 202502,
    title: { zh: "iGEM 竞赛启动", en: "iGEM Competition Begins" },
    description: {
      zh: "担任网页组组长，负责实验服务器平台搭建",
      en: "Led the web team and was responsible for building the experimental server platform.",
    },
    category: "competition",
    icon: "Dna",
  },
  {
    date: "2025.04",
    sortDate: 202504,
    title: { zh: "全国操作系统大赛", en: "National OS Competition" },
    description: {
      zh: "担任队长，端侧部署多模态大语言模型",
      en: "Served as team leader and deployed multimodal LLMs on edge devices.",
    },
    category: "competition",
    icon: "Cpu",
  },
  {
    date: "2025.06",
    sortDate: 202506,
    title: { zh: "华为 HarmonyOS 实习", en: "Huawei HarmonyOS Internship" },
    description: {
      zh: "华为终端部门实习，开发相机参数自动化适配工具",
      en: "Interned at Huawei and developed automated camera-parameter adaptation tools.",
    },
    category: "internship",
    icon: "Building2",
  },
  {
    date: "2025.08",
    sortDate: 202508,
    title: {
      zh: "操作系统大赛获国家级三等奖",
      en: "National OS Competition — Third Prize",
    },
    description: {
      zh: "全国操作系统设计大赛国家级三等奖",
      en: "Received the National Third Prize in the OS Design Competition.",
    },
    category: "award",
    icon: "Trophy",
  },
  {
    date: "2025.08",
    sortDate: 202508,
    title: { zh: "华为实习结项", en: "Huawei Internship Conclusion" },
    description: {
      zh: "顺利完成实习项目并进行经验分享",
      en: "Successfully completed the internship project and shared the experience with peers.",
    },
    category: "internship",
    icon: "Building2",
  },
  {
    date: "2025.10",
    sortDate: 202510,
    title: { zh: "iGEM 国际金奖", en: "iGEM International Gold Medal" },
    description: {
      zh: "国际遗传基因工程大赛获得国际级金奖",
      en: "Received an International Gold Medal at iGEM.",
    },
    category: "award",
    icon: "Award",
  },
  {
    date: "2025.12",
    sortDate: 202512,
    title: {
      zh: "望江挑花研究项目结题",
      en: "Wangjiang Embroidery Research Conclusion",
    },
    description: {
      zh: "完成风格融合算法研究与论文撰写",
      en: "Completed research on style-fusion algorithms and paper writing.",
    },
    category: "project",
    icon: "Palette",
  },
  {
    date: "2025.12",
    sortDate: 202512,
    title: {
      zh: "获校优秀学生奖学金银奖",
      en: "University Scholarship Silver",
    },
    description: {
      zh: "2025 年度校优秀学生奖学金",
      en: "Received the 2025 Outstanding Student Scholarship.",
    },
    category: "award",
    icon: "Trophy",
  },
  {
    date: "2026.01",
    sortDate: 202601,
    title: { zh: "Kaggle ConnectX 竞赛", en: "Kaggle ConnectX Competition" },
    description: {
      zh: "使用强化学习开发博弈 Agent，最高排名 19/241",
      en: "Built game-playing agents with reinforcement learning and reached a peak ranking of 19/241.",
    },
    category: "project",
    icon: "Gamepad2",
  }
].sort((a, b) => a.sortDate - b.sortDate);
