import React from "react";
import { useStore } from "@nanostores/react";
import { $lang } from "@/i18n/store";
import { ui } from "@/i18n/ui";
import { skills } from "@/data/skills";
import { Braces, Code2, Layers, Monitor, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  SiCplusplus,
  SiPython,
  SiKotlin,
  SiJavascript,
  SiTypescript,
  SiDotnet,
  SiPytorch,
  SiReact,
  SiNextdotjs,
  SiThreedotjs,
  SiHuawei,
  SiAndroid,
  SiLinux,
  SiGit,
  SiDocker,
  SiAnaconda,
  SiLatex,
  SiAndroidstudio,
} from "react-icons/si";
import { FaJava, FaMicrochip, FaWindows } from "react-icons/fa6";
import { VscVscode } from "react-icons/vsc";

// Generic fallback
const iconMap: Record<string, LucideIcon> = {
  Braces,
  Code2,
  Layers,
  Monitor,
  Wrench,
};

// Skill to Icon mapping
const skillIconMap: Record<
  string,
  React.ComponentType<{ className?: string; style?: any; size?: number }>
> = {
  // Languages
  "C++": SiCplusplus,
  Python: SiPython,
  Java: FaJava,
  Kotlin: SiKotlin,
  "C#": SiDotnet,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  ArkTS: SiHuawei, // Using Huawei icon for ArkTS as it's related

  // Frameworks
  PyTorch: SiPytorch,
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Three.js": SiThreedotjs,
  WPF: FaWindows,

  // Platforms
  HarmonyOS: SiHuawei,
  OpenHarmony: SiHuawei,
  Android: SiAndroid,
  Linux: SiLinux,
  "Embedded (OrangePi, DAYU200)": FaMicrochip,

  // Tools
  Git: SiGit,
  Docker: SiDocker,
  Anaconda: SiAnaconda,
  LaTeX: SiLatex,
  "Android Studio": SiAndroidstudio,
  "VS Code": VscVscode,
};

const skillColorMap: Record<string, string> = {
  "C++": "#00599C",
  Python: "#3776AB",
  Java: "#007396",
  Kotlin: "#7F52FF",
  "C#": "#239120",
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  ArkTS: "#CF0A2C",
  PyTorch: "#EE4C2C",
  React: "#61DAFB",
  "Next.js": "var(--color-text)", // Adapts to theme (Black/White)
  "Three.js": "var(--color-text)", // Adapts to theme (Black/White)
  WPF: "#0078D7",
  HarmonyOS: "#CF0A2C", // Huawei Red
  OpenHarmony: "#0052D9", // OpenHarmony Blue
  Android: "#3DDC84",
  Linux: "#FCC624",
  "Embedded (OrangePi, DAYU200)": "#EA580C", // Orange for OrangePi
  Git: "#F05032",
  Docker: "#2496ED",
  Anaconda: "#44A833",
  LaTeX: "#008080",
  "Android Studio": "#3DDC84",
  "VS Code": "#007ACC",
};

export default function Skills() {
  const lang = useStore($lang);

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-gradient inline-block">
          {ui.skills.title[lang]}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((category, i) => {
            const Icon = iconMap[category.icon] || Code2;
            return (
              <div key={category.icon} className="h-full">
                <div
                  className="rounded-xl p-5 h-full"
                  style={{
                    backgroundColor: "var(--color-bg-card)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <div className="flex items-center gap-2.5 mb-4">
                    <Icon size={18} style={{ color: "var(--color-primary)" }} />
                    <h3
                      className="font-semibold text-sm"
                      style={{ color: "var(--color-text)" }}
                    >
                      {category.title[lang]}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {category.items.map((skill, j) => {
                      const SkillIcon = skillIconMap[skill];
                      const skillColor =
                        skillColorMap[skill] || "var(--color-text-secondary)";

                      return (
                        <span
                          key={skill}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium cursor-default"
                          style={{
                            backgroundColor: "var(--color-bg-secondary)",
                            color: "var(--color-text-secondary)",
                            border: "1px solid var(--color-border)",
                          }}
                        >
                          {SkillIcon && (
                            <SkillIcon
                              size={16}
                              style={{ color: skillColor }}
                            />
                          )}
                          <span>{skill}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
