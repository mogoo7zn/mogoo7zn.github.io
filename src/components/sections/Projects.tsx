import { useState } from "react";
import { useStore } from "@nanostores/react";
import { $lang } from "@/i18n/store";
import { ui } from "@/i18n/ui";
import { projects } from "@/data/projects";
import SectionLoader from "@/components/ui/SectionLoader";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  Cpu,
  Building2,
  Gamepad2,
  Clock,
  Dna,
  X,
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

interface ProjectsProps {
  validBlogSlugs?: string[];
}

export default function Projects({ validBlogSlugs = [] }: ProjectsProps) {
  const lang = useStore($lang);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionLoader>
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-gradient inline-block">
            {ui.projects.title[lang]}
          </h2>
        </SectionLoader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, i) => {
            const Icon = iconMap[project.icon] || Palette;
            const isExpanded = expanded === project.id;

            return (
              <SectionLoader key={project.id} delay={0.08 * i}>
                <motion.div
                  layout
                  className="rounded-2xl p-6 transition-all duration-300 hover:shadow-xl group border border-transparent hover:border-[var(--color-primary)]/20 relative overflow-hidden"
                  style={{
                    backgroundColor: "var(--color-bg-card)",
                    // Removed explicit border to use class based border for better transition or keep it consistent
                    border: "1px solid var(--color-border)",
                  }}
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                      }}
                    >
                      <Icon size={20} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3
                          className="font-bold text-base leading-tight mb-1"
                          style={{ color: "var(--color-text)" }}
                        >
                          {project.title[lang]}
                        </h3>
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap ml-2 opacity-80"
                          style={{
                            border: "1px solid var(--color-border)",
                            color: "var(--color-text-muted)",
                          }}
                        >
                          {project.date}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{
                            backgroundColor: "var(--color-bg-secondary)",
                            color: "var(--color-primary)",
                          }}
                        >
                          {project.category[lang]}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description & Details */}
                  <div className="relative">
                    <motion.div
                      initial={false}
                      animate={{ height: isExpanded ? "auto" : "4.5em" }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p
                        className="text-sm leading-relaxed mb-4"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {project.description[lang]}
                      </p>

                      <div
                        className={`rounded-xl p-4 transition-opacity duration-300 ${isExpanded ? "opacity-100" : "opacity-0"}`}
                        style={{
                          backgroundColor: "var(--color-bg-tertiary)",
                          border: "1px solid var(--color-border)",
                        }}
                      >
                        {/* Key takeaway */}
                        <div className="mb-3">
                          <span
                            className="text-xs font-bold uppercase tracking-wider block mb-1"
                            style={{ color: "var(--color-accent)" }}
                          >
                            {ui.projects.highlight[lang]}
                          </span>
                          <p
                            className="text-xs leading-relaxed"
                            style={{ color: "var(--color-text-secondary)" }}
                          >
                            {project.highlight[lang]}
                          </p>
                        </div>

                        {/* Tech stack */}
                        <div>
                          <span
                            className="text-xs font-bold uppercase tracking-wider block mb-2"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            {ui.projects.techStack[lang]}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {project.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="text-[10px] px-2 py-1 rounded-md font-medium transition-colors hover:bg-[var(--color-bg-card)]"
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

                        {/* Blog link */}
                        {project.blogSlug && (
                          <div className="mt-4 pt-3 border-t border-[var(--color-border)] flex justify-end">
                            <a
                              href={`/blog/${project.blogSlug}`}
                              className="inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:bg-[var(--color-bg-secondary)]"
                              style={{
                                color: "var(--color-accent)",
                              }}
                            >
                              <BookOpen size={14} />
                              {ui.projects.readBlog[lang]}
                            </a>
                          </div>
                        )}
                      </div>
                    </motion.div>

                    {!isExpanded && (
                      <div
                        className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(to top, var(--color-bg-card), transparent)",
                        }}
                      />
                    )}
                  </div>

                  {/* Toggle */}

                  {/* Toggle */}
                  <button
                    onClick={() => setExpanded(isExpanded ? null : project.id)}
                    className="w-full flex items-center justify-center gap-2 mt-4 text-xs font-medium py-2 rounded-lg transition-colors hover:bg-[var(--color-bg-secondary)]"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    <span>
                      {isExpanded
                        ? ui.projects.collapse[lang]
                        : ui.projects.viewMore[lang]}
                    </span>
                    {isExpanded ? (
                      <ChevronUp size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    )}
                  </button>
                </motion.div>
              </SectionLoader>
            );
          })}
        </div>
      </div>
    </section>
  );
}
