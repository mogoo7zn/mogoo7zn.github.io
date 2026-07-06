export interface Publication {
  id: string;
  title: { zh: string; en: string };
  authors: { name: string; isMe?: boolean }[];
  venue: { zh: string; en: string };
  year: number;
  abstract?: { zh: string; en: string };
  doi?: string;
  arxiv?: string;
  pdf?: string;
  code?: string;
  tags: string[];
  status: "published" | "preprint" | "under-review" | "in-preparation";
}

export const publications: Publication[] = [
  {
    id: "phaseflow",
    title: {
      zh: "PhaseFlow: Bidirectional Generation of Protein Sequences and Phase Diagrams for LLPS",
      en: "PhaseFlow: Bidirectional Generation of Protein Sequences and Phase Diagrams for LLPS",
    },
    authors: [
      { name: "Zining Wang", isMe: true },
      { name: "PhaseFlow Project Team" },
    ],
    venue: {
      zh: "准备投稿 Nature",
      en: "Manuscript in preparation for Nature",
    },
    year: 2026,
    abstract: {
      zh: "PhaseFlow 面向蛋白质液-液相分离（LLPS）建模，统一处理蛋白序列与 4×4 PSSI 相图两类模态，支持从序列预测相图、从目标相图设计蛋白序列，并进一步服务于面向相分离性质的定向演化.该工作目前处于论文准备阶段，计划投稿 Nature.",
      en: "PhaseFlow models protein liquid-liquid phase separation by jointly representing amino-acid sequences and 4x4 PSSI phase diagrams. It supports sequence-to-phase prediction, phase-conditioned protein design, and property-directed evolution. The manuscript is currently in preparation for submission to Nature.",
    },
    code: "https://github.com/kevinhyj/PhaseFlow",
    tags: [
      "AI4Bio",
      "Protein Design",
      "LLPS",
      "Flow Matching",
      "Generative Modeling",
    ],
    status: "in-preparation",
  },
  {
    id: "eva",
    title: {
      zh: "EVA: Deciphering RNA Design Principles",
      en: "EVA: Deciphering RNA Design Principles",
    },
    authors: [
      { name: "Zining Wang", isMe: true },
      { name: "EVA Project Team" },
      { name: "Shuangjia Zheng" },
    ],
    venue: {
      zh: "Nature Machine Intelligence（在投）；bioRxiv 预印本",
      en: "Under Review at Nature Machine Intelligence; bioRxiv Preprint",
    },
    year: 2026,
    abstract: {
      zh: "EVA 构建面向 RNA 序列理解与设计的长上下文生成式基础模型，用于学习 RNA 设计原则，并支持序列生成、下游适配与可验证的生物学任务.我参与模型训练与微调协作，并负责项目网站前后端实现.",
      en: "EVA develops a long-context generative foundation model for RNA sequence understanding and design, supporting RNA design-principle learning, sequence generation, downstream adaptation, and biologically meaningful evaluation. I contributed to model training and fine-tuning support and implemented the project website.",
    },
    doi: "https://www.biorxiv.org/content/10.64898/2026.03.17.712398v1",
    code: "https://github.com/GENTEL-lab/EVA",
    tags: [
      "AI4Bio",
      "RNA Design",
      "Foundation Models",
      "Generative Modeling",
      "Long-Context Modeling",
    ],
    status: "under-review",
  },
  {
    id: "THREAD",
    title: {
      zh: "THREAD: Joint 2D-3D Generation of Egocentric Hand-Object Interactions",
      en: "THREAD: Joint 2D-3D Generation of Egocentric Hand-Object Interactions",
    },
    authors: [
      { name: "Guangyi Han" },
      { name: "Wei Zhai" },
      { name: "Yuhang Yang" },
      { name: "Zining Wang", isMe: true },
      { name: "Yang Cao" },
      { name: "Zheng-Jun Zha" },
    ],
    venue: {
      zh: "SCIENCE CHINA Information Sciences（在投）",
      en: "SCIENCE CHINA Information Sciences (Under Review)",
    },
    year: 2026,
    abstract: {
      zh: "本文提出一种从第一人称视角联合生成二维与三维手物交互序列的方法，用于提升 HOI 场景中的视觉合成、几何一致性与交互先验建模.论文目前正在审稿阶段.",
      en: "We propose THREAD, a method for joint 2D and 3D generation of egocentric hand-object interactions, improving visual synthesis, geometric consistency, and interaction-prior modeling in HOI settings. This paper is currently under review.",
    },
    tags: ["Hand-Object Interaction", "Egocentric Vision", "3D Generation"],
    status: "under-review",
  },
];
