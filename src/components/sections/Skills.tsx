import React from "react";
import { useStore } from "@nanostores/react";
import { $lang } from "@/i18n/store";
import { ui } from "@/i18n/ui";
import { skills } from "@/data/skills";
import SectionHeader from "@/components/ui/SectionHeader";
import { Box, Braces, Code2, Layers, Monitor, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  SiAndroid,
  SiAndroidstudio,
  SiAnaconda,
  SiCplusplus,
  SiDocker,
  SiDotnet,
  SiGit,
  SiJavascript,
  SiKotlin,
  SiLatex,
  SiLinux,
  SiNextdotjs,
  SiPython,
  SiPytorch,
  SiReact,
  SiThreedotjs,
  SiTypescript,
} from "react-icons/si";
import { FaJava, FaMicrochip, FaWindows } from "react-icons/fa6";
import { VscVscode } from "react-icons/vsc";

const iconMap: Record<string, LucideIcon> = {
  Box,
  Braces,
  Code2,
  Layers,
  Monitor,
  Wrench,
};

const skillIconMap: Record<
  string,
  React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
    size?: number;
  }>
> = {
  "C++": SiCplusplus,
  Python: SiPython,
  Java: FaJava,
  Kotlin: SiKotlin,
  "C#": SiDotnet,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  PyTorch: SiPytorch,
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Three.js": SiThreedotjs,
  WPF: FaWindows,
  Android: SiAndroid,
  Linux: SiLinux,
  "Embedded (OrangePi, DAYU200)": FaMicrochip,
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
  PyTorch: "#EE4C2C",
  React: "#61DAFB",
  "Next.js": "var(--color-text)",
  "Three.js": "var(--color-text)",
  WPF: "#0078D7",
  Android: "#3DDC84",
  Linux: "#FCC624",
  "Embedded (OrangePi, DAYU200)": "#EA580C",
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
    <section id="skills" className="py-24">
      <div className="section-shell">
        <div className="section-band overflow-hidden px-6 py-8 md:px-10 md:py-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-8 top-8 h-28 w-28 rounded-full border"
            style={{
              borderColor:
                "color-mix(in srgb, var(--color-primary) 28%, transparent)",
              background:
                "radial-gradient(circle, rgba(var(--color-primary-rgb), 0.12), transparent 68%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-10 right-28 h-16 w-16 rotate-12 rounded-2xl border"
            style={{
              borderColor:
                "color-mix(in srgb, var(--color-accent) 30%, transparent)",
              background:
                "linear-gradient(135deg, rgba(var(--color-accent-rgb), 0.08), transparent)",
            }}
          />

          <div className="mb-10">
            <SectionHeader
              eyebrow={lang === "zh" ? "技能体系" : "Skill Matrix"}
              title={ui.skills.title[lang]}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {skills.map((category, index) => {
              const Icon = iconMap[category.icon] || Code2;

              return (
                <div
                  key={category.icon}
                  className="surface-card surface-card-hover h-full px-5 py-5 hud-corners"
                >
                  <div className="relative z-10">
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-11 w-11 items-center justify-center rounded-2xl"
                          style={{
                            background:
                              "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                            boxShadow: "0 10px 24px var(--color-glow)",
                          }}
                        >
                          <Icon size={20} className="text-white" />
                        </div>
                        <h3
                          className="text-lg font-semibold"
                          style={{ color: "var(--color-text)" }}
                        >
                          {category.title[lang]}
                        </h3>
                      </div>
                      <span
                        className="text-xs font-semibold uppercase tracking-[0.22em]"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        0{index + 1}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {category.items.map((skill) => {
                        const SkillIcon = skillIconMap[skill];
                        const skillColor =
                          skillColorMap[skill] || "var(--color-text-secondary)";

                        return (
                          <span
                            key={skill}
                            className="inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
                            style={{
                              backgroundColor: "var(--color-bg-secondary)",
                              color: "var(--color-text-secondary)",
                              borderColor: "var(--color-border)",
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
      </div>
    </section>
  );
}
