export interface BlogSeries {
  id: string;
  title: { zh: string; en: string };
  description: { zh: string; en: string };
  tags: string[];
  layout?: 'list' | 'gallery';
}

export const blogSeries: BlogSeries[] = [
  {
    id: 'deployment',
    title: { zh: '网站部署、交付与维护', en: 'Web Deployment & Operations' },
    description: { zh: '从需求与架构、环境配置到上线验收、交接和长期维护，记录可复用的工程流程。', en: 'A practical workflow from requirements and infrastructure to release, handover, and ongoing operations.' },
    tags: ['Deployment', 'Engineering', 'Operations'],
  },
  {
    id: 's4ai',
    title: { zh: 'S4AI · 论文阅读', en: 'S4AI · Paper Notes' },
    description: { zh: 'Science for AI：探索科学知识如何增强模型的泛化、推理与可靠性，关注方法假设、实验证据和适用边界。', en: 'Science for AI: how scientific knowledge can improve generalization, reasoning, and reliability, with attention to assumptions, evidence, and limitations.' },
    tags: ['S4AI', 'Science for AI', 'Reasoning'],
  },
  {
    id: 'research',
    title: { zh: '科研笔记', en: 'Research Notes' },
    description: { zh: '科研工作中的问题拆解、实验设计与方法记录。', en: 'Notes on research questions, experimental design, and methodology.' },
    tags: ['Research', 'Notes'],
  },
  {
    id: 'blender',
    layout: 'gallery',
    title: { zh: 'Blender 笔记', en: 'Blender Notes' },
    description: { zh: '3D 建模、材质配置与科研配图渲染。', en: '3D modeling, materials, and rendering for scientific figures.' },
    tags: ['Blender', '3D'],
  },
];
