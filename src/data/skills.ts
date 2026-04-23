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
    title: { zh: "人工智能与科学计算", en: "AI & Scientific Computing" },
    icon: "Layers",
    items: ["PyTorch", "OpenCV", "NumPy", "SciPy"],
  },
  {
    title: { zh: "仿真与三维工具", en: "Simulation & 3D" },
    icon: "Box",
    items: ["PyBullet", "Isaac Gym / Sim", "Blender", "Unity", "Trimesh"],
  },
  {
    title: { zh: "开发工具", en: "Development Tools" },
    icon: "Wrench",
    items: ["Linux", "Git", "Docker", "ROS / ROS 2", "VS Code"],
  },
];
