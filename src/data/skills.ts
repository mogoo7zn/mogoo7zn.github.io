export interface SkillCategory {
  title: { zh: string; en: string };
  icon: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    title: { zh: "编程语言", en: "Programming Languages" },
    icon: "Braces",
    items: ["Python", "C++", "JavaScript / TypeScript", "C#"],
  },
  {
    title: { zh: "AI 与科学计算", en: "AI & Scientific Computing" },
    icon: "Layers",
    items: ["PyTorch", "NumPy", "SciPy", "OpenCV"],
  },
  {
    title: { zh: "生物序列与数据处理", en: "Biosequence & Data Processing" },
    icon: "Box",
    items: ["RNA Modeling", "Sequence Generation", "Dataset Curation", "Model Evaluation"],
  },
  {
    title: { zh: "科研系统与工程工具", en: "Research Systems & Tools" },
    icon: "Wrench",
    items: ["Linux", "Git", "Docker", "LaTeX", "VS Code"],
  },
];
