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
  status: "published" | "preprint" | "under-review";
}

export const publications: Publication[] = [
  {
    id: "THREAD",
    title: {
      zh: "THREAD: Joint 2D-3D Generation of Egocentric Hand-Object Interactions",
      en: "THREAD: Joint 2D-3D Generation of Egocentric Hand-Object Interactions",
    },
    authors: [
      { name: "Co-author Name" },
      { name: "Zining Wang", isMe: true },
      { name: "Et al." },
    ],
    venue: {
      zh: "In submission",
      en: "Under Review",
    },
    year: 2024,
    abstract: {
      zh: "本文提出了一种从第一人称视角联合生成二维与三维手物交互序列的方法，旨在为具身智能操作任务提供更丰富、精细的交互合成数据和动作先验指导。论文目前正在审稿阶段。",
      en: "We propose THREAD, a method for the joint generation of 2D and 3D hand-object interactions from an egocentric perspective. Note: This paper is currently under review.",
    },
    tags: ["Hand-Object Interaction", "Embodied AI", "3D Generation"],
    status: "under-review",
  },
];
