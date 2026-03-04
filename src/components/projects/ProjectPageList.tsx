import { useState } from "react";
import { useStore } from "@nanostores/react";
import { $lang } from "@/i18n/store";
import { ui } from "@/i18n/ui";
import { projects } from "@/data/projects";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  Cpu,
  Building2,
  Gamepad2,
  Clock,
  Dna,
  ChevronDown,
  ChevronUp,
  BookOpen,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Palette,
  Cpu,
  Building2,
  Gamepad2,
  Clock,
  Dna,
};

export default function ProjectPageList() {
  const lang = useStore($lang);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-5">
      {projects.map((project, i) => {
        const Icon = iconMap[project.icon] || Palette;
        const isExpanded = expandedId === project.id;

        return (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 * i, duration: 0.4 }}
            className="rounded-xl p-6 transition-all duration-300 hover:shadow-lg hud-corners embodied-glow"
            style={{
              backgroundColor: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
            }}
          >
            {/* Header */}
            <div className="flex items-start gap-4 mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                }}
              >
                <Icon size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className="font-semibold text-base md:text-lg leading-snug"
                  style={{ color: "var(--color-text)" }}
                >
                  {project.title[lang]}
                </h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: "var(--color-bg-secondary)",
                      color: "var(--color-primary)",
                    }}
                  >
                    {project.category[lang]}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {project.date}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {project.description[lang]}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    backgroundColor: "var(--color-bg-secondary)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Highlight toggle */}
            <button
              onClick={() => setExpandedId(isExpanded ? null : project.id)}
              className="inline-flex items-center gap-1 text-xs font-medium transition-colors"
              style={{ color: "var(--color-primary)" }}
            >
              {isExpanded
                ? ui.projects.collapse[lang]
                : ui.projects.viewMore[lang]}
              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div
                    className="mt-3 p-3 rounded-lg"
                    style={{
                      backgroundColor: "var(--color-bg-secondary)",
                    }}
                  >
                    <p
                      className="text-xs font-medium mb-1"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {ui.projects.highlight[lang]}
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {project.highlight[lang]}
                    </p>

                    {/* Blog link */}
                    {project.blogSlug && (
                      <a
                        href={`/blog/${project.blogSlug}`}
                        className="inline-flex items-center gap-1.5 mt-3 text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105"
                        style={{
                          color: "var(--color-accent)",
                          border: "1px solid var(--color-accent)",
                          opacity: 0.8,
                        }}
                      >
                        <BookOpen size={12} />
                        {ui.projects.readBlog[lang]}
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.article>
        );
      })}
    </div>
  );
}
