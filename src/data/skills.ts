export interface SkillCategory {
  title: { zh: string; en: string };
  icon: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    title: { zh: "编程语言", en: "Languages" },
    icon: "Code2",
    items: [
      "C++",
      "Python",
      "Java",
      "Kotlin",
      "C#",
      "ArkTS",
      "JavaScript",
      "TypeScript",
    ],
  },
  {
    title: { zh: "框架与库", en: "Frameworks" },
    icon: "Layers",
    items: ["PyTorch", "React", "Next.js", "WPF"],
  },
  {
    title: { zh: "开发平台", en: "Platforms" },
    icon: "Monitor",
    items: [
      "HarmonyOS",
      "OpenHarmony",
      "Android",
      "Embedded (OrangePi, DAYU200)",
      "Linux",
    ],
  },
  {
    title: { zh: "开发工具", en: "Tools" },
    icon: "Wrench",
    items: ["Git", "Docker", "Anaconda", "Android Studio", "VS Code"],
  },
];
