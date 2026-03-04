export interface Project {
  id: string;
  title: { zh: string; en: string };
  category: { zh: string; en: string };
  date: string;
  description: { zh: string; en: string };
  highlight: { zh: string; en: string };
  techStack: string[];
  icon: string;
  blogSlug?: string; // slug matching a blog post in src/content/blog/
}

export const projects: Project[] = [
  {
    id: "wangjiang-embroidery",
    title: {
      zh: "风格融合在望江挑花非遗传承的研究与应用",
      en: "Style Fusion for Wangjiang Embroidery Heritage Preservation",
    },
    category: { zh: "大学生研究计划", en: "Undergraduate Research" },
    date: "2024.01 – 2025.11",
    description: {
      zh: "对中国非物质文化遗产望江挑花进行数字化保护与创新。通过将传统工艺美学精髓与个性化定制图像进行智能风格融合，生成自动化针织图样。本人主要实现风格融合和图像处理任务，协助团队研发针织工艺软件系统。该系统可以将原始素材转化为可操作的针织纹样，并生成可视化操作指南。",
      en: "Digitized preservation and innovation of Wangjiang embroidery, a Chinese intangible cultural heritage. Built an intelligent style fusion pipeline combining traditional aesthetics with personalized images to generate automated knitting patterns. Led the style transfer and image processing tasks, and co-developed a knitting craft software system that converts raw materials into operable patterns with step-by-step visual guides.",
    },
    highlight: {
      zh: "专利申请中；掌握扩散模型调优与数据集标注",
      en: "Patent pending; Mastered diffusion model fine-tuning and dataset annotation",
    },
    techStack: [
      "Python",
      "PyTorch",
      "Computer Vision",
      "Diffusion Models",
      "C#",
      "WPF",
    ],
    icon: "Palette",
    blogSlug: "project-wangjiang-embroidery",
  },
  {
    id: "os-competition",
    title: {
      zh: "全国大学生操作系统竞赛",
      en: "National OS Design Competition",
    },
    category: { zh: "学科竞赛", en: "Academic Competition" },
    date: "2025.04 – 2025.08",
    description: {
      zh: "面向 DAYU200 开发板进行端侧大语言模型部署。决赛阶段面向华为真机，利用设备 GPU 算力提高模型推理速度，探索并初步实现多模态大模型与操作系统的协调，实现约 15 token/s 的端侧推理能力。担任队长。",
      en: "Deployed LLMs on edge devices (DAYU200 board). In the finals, developed on Huawei devices leveraging GPU for model inference acceleration, achieving ~15 token/s for multi-modal LLM inference on edge. Served as team leader.",
    },
    highlight: {
      zh: "多模态大模型嵌入式设备端侧部署",
      en: "Multi-modal LLM deployment on embedded devices",
    },
    techStack: ["C++", "ArkTS", "Llama", "MNN"],
    icon: "Cpu",
    blogSlug: "project-os-competition",
  },
  {
    id: "huawei-internship",
    title: {
      zh: "华为 HarmonyOS 菁英班实习",
      en: "Huawei HarmonyOS Elite Program Internship",
    },
    category: { zh: "企业实习", en: "Industry Internship" },
    date: "2025.06 – 2025.08",
    description: {
      zh: "经校内选拔参与华为举办的 HarmonyOS 菁英班，学习 OpenHarmony 和 HarmonyOS 技术。为终端底层软件相机部门开发参数自动化适配工具，提升产品参数适配效率。",
      en: "Selected for Huawei's HarmonyOS Elite Program. Studied OpenHarmony/HarmonyOS technologies and developed automated parameter adaptation tools for the camera software department, improving product adaptation efficiency.",
    },
    highlight: {
      zh: "快速定位与解决问题并正确展示和表达才是实践工作最关键的能力",
      en: "The key ability in practice is quickly identifying and solving problems while effectively communicating results",
    },
    techStack: ["C++", "Python", "HarmonyOS"],
    icon: "Building2",
    blogSlug: "project-huawei-internship",
  },
  {
    id: "kaggle-connectx",
    title: {
      zh: "Kaggle ConnectX 强化学习竞赛",
      en: "Kaggle ConnectX RL Competition",
    },
    category: { zh: "课程大作业", en: "Course Project" },
    date: "2025.10 – 2025.12",
    description: {
      zh: "使用 DQN、AlphaZero 等强化学习方法开发重力四子棋 Agent，参与 Kaggle ConnectX 比赛，历史最高排名 19/241 名。",
      en: "Developed Connect Four agents using RL methods (DQN, AlphaZero) for the Kaggle ConnectX competition. Achieved a peak ranking of 19th out of 241 participants.",
    },
    highlight: {
      zh: "掌握基本强化学习方法和 Agent 开发思路",
      en: "Mastered fundamental RL methods and agent development paradigms",
    },
    techStack: ["PyTorch", "DQN", "AlphaZero", "RL"],
    icon: "Gamepad2",
    blogSlug: "project-kaggle-connectx",
  },
  {
    id: "timeflow-app",
    title: {
      zh: "时间流：智能时间管理应用",
      en: "TimeFlow: Smart Time Management App",
    },
    category: { zh: "安卓软件开发", en: "Android Development" },
    date: "2023.10 – 2024.11",
    description: {
      zh: "开发一款为校园师生设计的时间优化管理应用，基于用户习惯分析系统，结合个体作息规律与任务优先级矩阵，自主生成科学化日程规划方案。",
      en: "Developed a time management app for campus users that analyzes habits and generates optimized scheduling plans based on personal routines and task priority matrices.",
    },
    highlight: {
      zh: "掌握从用户需求到开发、反馈再调优的完整项目流程",
      en: "Gained end-to-end experience from user requirements to development, feedback, and iteration",
    },
    techStack: ["Kotlin", "Java", "MySQL"],
    icon: "Clock",
    blogSlug: "project-timeflow-app",
  },
  {
    id: "igem",
    title: {
      zh: "iGEM 国际遗传基因工程设计大赛",
      en: "iGEM International Genetic Engineering Competition",
    },
    category: { zh: "学科竞赛", en: "Academic Competition" },
    date: "2025.02 – 2025.10",
    description: {
      zh: "与网页组队员共同搭建校内比赛实验服务器平台，完成网页美工与功能设计。在项目中学习网页前后端开发知识，担任网页组组长。",
      en: "Led the web development team to build the team's experimental server platform and website. Gained full-stack web development experience while managing team communication and task allocation.",
    },
    highlight: {
      zh: "学会高效沟通、团队管理，懂得协商与鼓励",
      en: "Learned effective communication, team management, and collaborative leadership",
    },
    techStack: ["JavaScript", "React", "Next.js", "Haskell"],
    icon: "Dna",
    blogSlug: "project-igem",
  },
];
