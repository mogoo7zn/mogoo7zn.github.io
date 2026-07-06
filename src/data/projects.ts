export interface Project {
  id: string;
  title: { zh: string; en: string };
  category: { zh: string; en: string };
  date: string;
  description: { zh: string; en: string };
  highlight: { zh: string; en: string };
  techStack: string[];
  icon: string;
  award?: { zh: string; en: string };
  links?: ProjectLink[];
  blogSlug?: string; // slug matching a blog post in src/content/blog/
}

export interface ProjectLink {
  label: { zh: string; en: string };
  href: string;
  type?: "code" | "paper" | "report" | "website";
}

export const projects: Project[] = [
  {
    id: "phaseflow",
    title: {
      zh: "PhaseFlow：蛋白序列与 LLPS 相图的双向生成模型",
      en: "PhaseFlow: Bidirectional Generation for Protein Sequences and LLPS Phase Diagrams",
    },
    category: { zh: "AI4Bio 论文工作", en: "AI4Bio Manuscript" },
    date: "2026.07 – Present",
    description: {
      zh: "围绕蛋白质液-液相分离（LLPS）构建统一生成模型，将氨基酸序列与 4×4 PSSI 相图作为双模态对象联合建模，支持序列到相图预测、目标相图条件下的蛋白序列设计，以及面向目标相分离性质的定向演化.",
      en: "Developing a unified generative model for protein liquid-liquid phase separation by jointly modeling amino-acid sequences and 4x4 PSSI phase diagrams, supporting sequence-to-phase prediction, phase-conditioned protein design, and directed evolution toward target phase-separation properties.",
    },
    highlight: {
      zh: "最新论文工作，当前准备投稿 Nature；围绕蛋白序列与 LLPS 相图建立统一生成建模框架",
      en: "Latest manuscript project, currently in preparation for submission to Nature; building a unified generative framework for protein sequences and LLPS phase diagrams",
    },
    links: [
      {
        label: { zh: "代码仓库", en: "Code Repository" },
        href: "https://github.com/kevinhyj/PhaseFlow",
        type: "code",
      },
    ],
    techStack: [
      "Python",
      "PyTorch",
      "Protein Design",
      "Flow Matching",
      "Transformer",
      "LLPS",
    ],
    icon: "Atom",
  },
  {
    id: "eva-rna-foundation-model",
    title: {
      zh: "EVA：RNA 设计原理解析与长上下文生成式基础模型",
      en: "EVA: Long-Context Generative Foundation Model for RNA Design",
    },
    category: { zh: "AI4Bio 研究", en: "AI4Bio Research" },
    date: "2026.02 – Present",
    description: {
      zh: "参与构建面向 RNA 序列理解与设计的长上下文生成式基础模型，支持 RNA 设计原则建模、序列生成与下游任务适配.工作覆盖模型训练与微调协作、研究网站前后端实现，以及预印本与项目材料的工程支撑.",
      en: "Contributing to a long-context generative foundation model for RNA sequence understanding and design, with emphasis on RNA design principles, sequence generation, and downstream adaptation. My work spans model training and fine-tuning support, full-stack implementation of the project website, and engineering support for the preprint and project release.",
    },
    highlight: {
      zh: "论文在投 Nature Machine Intelligence；bioRxiv 预印本已公开；参与模型训练、微调协作与项目网站实现",
      en: "Manuscript under review at Nature Machine Intelligence; bioRxiv preprint available; contributed to training support, fine-tuning collaboration, and project website implementation",
    },
    links: [
      {
        label: { zh: "代码仓库", en: "Code Repository" },
        href: "https://github.com/GENTEL-lab/EVA",
        type: "code",
      },
      {
        label: { zh: "bioRxiv 预印本", en: "bioRxiv Preprint" },
        href: "https://www.biorxiv.org/content/10.64898/2026.03.17.712398v1",
        type: "paper",
      },
    ],
    techStack: [
      "Python",
      "PyTorch",
      "RNA Modeling",
      "Foundation Models",
      "Full-stack Development",
    ],
    icon: "Dna",
  },
  {
    id: "wangjiang-embroidery",
    title: {
      zh: "望江挑花数字化设计与风格生成",
      en: "Digital Design and Style Generation for Wangjiang Embroidery",
    },
    category: { zh: "大学生研究计划", en: "Undergraduate Research" },
    date: "2024.01 – 2025.11",
    description: {
      zh: "围绕望江挑花非遗工艺开展数字化保护与设计辅助研究，构建设计软件、图像处理与风格生成流程，并将生成结果接入后续工艺验证.本人主要负责风格融合、图像处理实验与软件链路联调，重点关注生成结果的工艺可用性与传统视觉特征保留.",
      en: "Conducted digital-preservation and design-assistance research for Wangjiang embroidery, integrating design software, image processing, style generation, and craft-process validation. My contributions focused on style-fusion experiments, image-processing modules, and system integration, with attention to craft usability and preservation of traditional visual characteristics.",
    },
    highlight: {
      zh: "完成从图样编辑、风格生成到实验室工艺验证与实地调研的闭环流程；相关专利申请中",
      en: "Established a closed workflow from pattern editing and style generation to lab validation and field research; related patent pending",
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
      zh: "作为队长推进 OpenHarmony 端侧大模型部署项目，搭建从 ArkUI/ArkTS 应用界面、NAPI 桥接到 C++ 推理后端的完整链路.决赛阶段进一步探索多模态输入、真机适配与设备 GPU 加速，实现约 15 token/s 的端侧推理能力.",
      en: "Led an OpenHarmony edge-LLM deployment project, building an end-to-end pipeline from ArkUI/ArkTS interfaces and NAPI bridging to a C++ inference backend. During the finals, we explored multimodal input, hardware adaptation, and device-GPU acceleration, achieving approximately 15 token/s on edge devices.",
    },
    highlight: {
      zh: "在资源受限设备上完成本地 LLM 部署、性能调优、系统演示与技术答辩",
      en: "Delivered local LLM deployment, performance tuning, system demonstration, and technical presentation on resource-constrained devices",
    },
    techStack: ["C++", "ArkTS", "Llama", "MNN"],
    icon: "Cpu",
    links: [
      {
        label: { zh: "源码仓库", en: "Source Repository" },
        href: "https://gitlab.eduxiji.net/T202510358995850/project2721707-302713",
        type: "code",
      },
      {
        label: { zh: "项目文档", en: "Project Document" },
        href: "/projects/project-os-competition/项目文档.pdf",
        type: "report",
      },
    ],
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
      zh: "经校内选拔进入华为 HarmonyOS 菁英班，在终端相机软件部门参与工程工具链开发.主要负责参数自动化适配工具，支持多机型配置解析、规则校验与批量处理，提升相机参数适配流程的效率与一致性.",
      en: "Selected for Huawei's HarmonyOS Elite Program and worked on engineering tooling in the terminal camera software department. I developed automated parameter-adaptation tooling for multi-device configuration parsing, rule validation, and batch processing, improving workflow efficiency and consistency.",
    },
    highlight: {
      zh: "面向真实业务流程完成自动化工具开发，并训练复杂系统中的问题定位与技术沟通",
      en: "Built automation tooling for a real engineering workflow while strengthening debugging and technical communication in complex systems",
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
      zh: "围绕 Kaggle ConnectX 构建重力四子棋智能体，系统比较 DQN、AlphaZero 与 MCTS 搜索策略在离散博弈环境中的训练稳定性、搜索效率与对战表现，历史最高排名 19/241.",
      en: "Built Connect Four agents for Kaggle ConnectX and systematically compared DQN, AlphaZero, and MCTS-based strategies in terms of training stability, search efficiency, and competitive performance. Achieved a peak rank of 19/241.",
    },
    highlight: {
      zh: "完成从状态编码、策略训练到 MCTS 搜索的完整 Agent 实现",
      en: "Implemented the full agent pipeline from state encoding and policy training to MCTS-based search",
    },
    techStack: ["PyTorch", "DQN", "AlphaZero", "RL"],
    icon: "Gamepad2",
    links: [
      {
        label: { zh: "源代码 ZIP", en: "Source ZIP" },
        href: "/projects/project-kaggle-connectx/Kaggle-ConnectX-source-code.zip",
        type: "code",
      },
      {
        label: { zh: "技术报告", en: "Technical Report" },
        href: "/projects/project-kaggle-connectx/report.pdf",
        type: "report",
      },
    ],
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
      zh: "面向高校学生的时间管理需求开发 Android 原生应用，将课程、任务、目标、习惯与提醒整合到统一日程视图中，并探索基于优先级与用户行为的自动排程机制.",
      en: "Developed an Android-native time-management app for university students, integrating courses, tasks, goals, habits, and reminders into a unified schedule view while exploring automatic scheduling based on priorities and user behavior.",
    },
    highlight: {
      zh: "覆盖需求调研、产品抽象、界面实现与迭代反馈的完整应用开发流程",
      en: "Covered the full app-development cycle from user research and product abstraction to UI implementation and iteration",
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
      zh: "担任 USTC iGEM 队网页组组长，负责 Wiki 网站架构设计、页面开发、内容管线与静态部署.项目围绕合成生物学竞赛的展示和评审要求，支持实验、建模、人类实践等复杂文档的结构化呈现.",
      en: "Led the web team for the USTC iGEM project, responsible for Wiki architecture, page development, content pipeline design, and static deployment. The site supported structured presentation of experimental, modeling, and human-practices materials for a synthetic-biology competition.",
    },
    highlight: {
      zh: "USTC iGEM 2025 团队获得国际金奖；完成面向评审场景的静态站点工程，并推进多人协作下的内容与代码交付",
      en: "The USTC iGEM 2025 team received an International Gold Medal; delivered a judging-oriented static site and coordinated content-code delivery across a multi-person team",
    },
    techStack: ["JavaScript", "React", "Next.js", "Haskell"],
    icon: "Dna",
    award: {
      zh: "iGEM 国际金奖",
      en: "iGEM Gold Medal",
    },
    links: [
      {
        label: { zh: "源码仓库", en: "Source Repository" },
        href: "https://gitlab.eduxiji.net/ustc-igem/2025-wiki",
        type: "code",
      },
    ],
    blogSlug: "project-igem",
  },
];
