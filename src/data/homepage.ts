// Edit homepage text here. Keep zh and en together; section order matches the page.
export const homepage = {
  summary: {
  "zh": "我的研究兴趣聚焦于 AI for Science。目前关注 AI4Bio 与 LLM 基础模型相关研究和数据合成。",
  "en": "My research interests center on AI for Science. Currently focusing on AI4Bio and LLM foundation models."
},
  perspective: {
  "zh": "模型如何利用科学知识，泛化推理和实际系统中的能力边界。",
  "en": "Using scientific knowledge, how models can generalize, reason, and make it work in real systems."
},
  sections: [
    { id: 'about', label: { zh: '方向', en: 'Interests' }, eyebrow: '01 / INTERESTS' },
    { id: 'publications', label: { zh: '成果', en: 'Papers' }, eyebrow: '02 / PAPERS' },
    { id: 'practice', label: { zh: '笔记', en: 'Notes' }, eyebrow: '03 / NOTES' },
  ],
  notes: {
    description: {
      zh: '论文阅读、实验记录与工程实践，持续整理在博客中。',
      en: 'Paper readings, experiment notes, and engineering practice are collected in my blog.',
    },
    link: { zh: '进入博客', en: 'Read the blog' },
    href: '/blog',
  },
} as const;
