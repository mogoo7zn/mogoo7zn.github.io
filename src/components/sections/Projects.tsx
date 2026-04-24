import { useState } from "react";
import { useStore } from "@nanostores/react";
import { $lang } from "@/i18n/store";
import { ui } from "@/i18n/ui";
import { projects } from "@/data/projects";
import SectionLoader from "@/components/ui/SectionLoader";
import SectionHeader from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";
import {
  BookOpen,
  Building2,
  ChevronDown,
  ChevronUp,
  Clock,
  Cpu,
  Dna,
  Gamepad2,
  Palette,
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

interface ProjectsProps {
  validBlogSlugs?: string[];
}

export default function Projects({ validBlogSlugs = [] }: ProjectsProps) {
  const lang = useStore($lang);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="projects" className="py-24">
      <div className="section-shell">
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-6 top-2 h-18 w-18 rounded-full border md:h-24 md:w-24"
            style={{
              borderColor: "color-mix(in srgb, var(--color-primary) 24%, transparent)",
              background:
                "radial-gradient(circle, rgba(var(--color-primary-rgb), 0.08), transparent 72%)",
            }}
          />
          <SectionLoader className="mb-10">
            <SectionHeader
              eyebrow={lang === "zh" ? "精选项目" : "Featured Work"}
              title={ui.projects.title[lang]}
            />
          </SectionLoader>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {projects.map((project, index) => {
            const Icon = iconMap[project.icon] || Palette;
            const isExpanded = expanded === project.id;
            const hasBlog =
              !!project.blogSlug && validBlogSlugs.includes(project.blogSlug);

            return (
              <SectionLoader key={project.id} delay={0.08 * index}>
                <motion.div
                  layout
                  className="surface-card surface-card-hover h-full px-6 py-6 hud-corners"
                >
                  <div className="relative z-10">
                    <div className="mb-5 flex items-start gap-4">
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                          boxShadow: "0 12px 32px var(--color-glow)",
                        }}
                      >
                        <Icon size={22} className="text-white" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex items-start justify-between gap-4">
                          <h3
                            className="text-lg font-semibold leading-tight"
                            style={{ color: "var(--color-text)" }}
                          >
                            {project.title[lang]}
                          </h3>
                          <span
                            className="rounded-full px-3 py-1 text-[11px] font-semibold"
                            style={{
                              color: "var(--color-text-muted)",
                              border: "1px solid var(--color-border)",
                              background:
                                "color-mix(in srgb, var(--color-bg-secondary) 84%, transparent)",
                            }}
                          >
                            {project.date}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className="rounded-full px-2.5 py-1 text-xs font-semibold"
                            style={{
                              background:
                                "color-mix(in srgb, var(--color-primary) 12%, transparent)",
                              color: "var(--color-primary)",
                            }}
                          >
                            {project.category[lang]}
                          </span>
                          <span
                            className="text-xs font-semibold"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            0{index + 1}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <motion.div
                        initial={false}
                        animate={{ height: isExpanded ? "auto" : "5.6em" }}
                        transition={{ duration: 0.32, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p
                          className="mb-4 text-[0.97rem] leading-8 md:text-base"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          {project.description[lang]}
                        </p>

                        <div className="surface-panel px-4 py-4">
                          <div className="mb-4">
                            <div
                              className="mb-2 text-xs font-bold uppercase tracking-[0.22em]"
                              style={{ color: "var(--color-accent)" }}
                            >
                              {ui.projects.highlight[lang]}
                            </div>
                            <p
                              className="text-[0.96rem] leading-8 md:text-base"
                              style={{ color: "var(--color-text-secondary)" }}
                            >
                              {project.highlight[lang]}
                            </p>
                          </div>

                          <div>
                            <div
                              className="mb-2 text-xs font-bold uppercase tracking-[0.22em]"
                              style={{ color: "var(--color-text-muted)" }}
                            >
                              {ui.projects.techStack[lang]}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {project.techStack.map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-full px-3 py-1.5 text-xs font-medium"
                                  style={{
                                    backgroundColor: "var(--color-bg-secondary)",
                                    color: "var(--color-text-secondary)",
                                    border: "1px solid var(--color-border)",
                                  }}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {hasBlog && project.blogSlug && (
                            <div className="mt-5 flex justify-end border-t border-[var(--color-border)] pt-4">
                              <a
                                href={`/blog/${project.blogSlug}`}
                                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 hover:translate-x-1"
                                style={{
                                  color: "var(--color-accent)",
                                  background:
                                    "color-mix(in srgb, var(--color-bg-card) 86%, transparent)",
                                }}
                              >
                                <BookOpen size={15} />
                                {ui.projects.readBlog[lang]}
                              </a>
                            </div>
                          )}
                        </div>
                      </motion.div>

                      {!isExpanded && (
                        <div
                          className="pointer-events-none absolute bottom-0 left-0 right-0 h-14"
                          style={{
                            background:
                              "linear-gradient(to top, var(--color-bg-card), transparent)",
                          }}
                        />
                      )}
                    </div>

                    <button
                      onClick={() => setExpanded(isExpanded ? null : project.id)}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-medium transition-colors hover:bg-[var(--color-bg-secondary)]"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      <span>
                        {isExpanded
                          ? ui.projects.collapse[lang]
                          : ui.projects.viewMore[lang]}
                      </span>
                      {isExpanded ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>
                  </div>
                </motion.div>
              </SectionLoader>
            );
          })}
        </div>
      </div>
    </section>
  );
}
