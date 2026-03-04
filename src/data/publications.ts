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
  // ── Example entry (replace with your real publications) ───────
  // {
  //   id: "example-paper",
  //   title: {
  //     zh: "论文标题",
  //     en: "Paper Title",
  //   },
  //   authors: [
  //     { name: "Zining Wang", isMe: true },
  //     { name: "Collaborator Name" },
  //   ],
  //   venue: {
  //     zh: "会议/期刊名称",
  //     en: "Conference / Journal Name",
  //   },
  //   year: 2026,
  //   abstract: {
  //     zh: "摘要内容...",
  //     en: "Abstract content...",
  //   },
  //   doi: "https://doi.org/10.xxxx/xxxxx",
  //   arxiv: "https://arxiv.org/abs/xxxx.xxxxx",
  //   pdf: "/papers/example.pdf",
  //   code: "https://github.com/mogoo7zn/example",
  //   tags: ["3D Interaction", "Embodied AI"],
  //   status: "published",
  // },
];
