import { useMemo, useState } from "react";
import { useStore } from "@nanostores/react";
import { $lang } from "@/i18n/store";
import { ui } from "@/i18n/ui";
import { timelineEvents } from "@/data/timeline";
import SectionLoader from "@/components/ui/SectionLoader";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  Award,
  Building2,
  Clock,
  Cpu,
  Dna,
  Gamepad2,
  GraduationCap,
  Palette,
  Trophy,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Clock,
  Trophy,
  Building2,
  Cpu,
  Palette,
  Gamepad2,
  Dna,
  Award,
};

const categoryColors: Record<string, string> = {
  education: "var(--color-primary)",
  project: "var(--color-accent)",
  award: "#F59E0B",
  internship: "#10B981",
  competition: "#8B5CF6",
};

const categoryLabels: Record<string, { zh: string; en: string }> = {
  education: { zh: "教育", en: "Education" },
  project: { zh: "项目", en: "Projects" },
  award: { zh: "奖项", en: "Awards" },
  internship: { zh: "实习", en: "Internships" },
  competition: { zh: "竞赛", en: "Competitions" },
};

export default function Timeline() {
  const lang = useStore($lang);
  const [isExpanded, setIsExpanded] = useState(false);

  const timelineGroups = useMemo(() => {
    const groups = new Map<string, (typeof timelineEvents)[number][]>();

    [...timelineEvents]
      .sort((a, b) => b.sortDate - a.sortDate)
      .forEach((event) => {
        const year = event.date.split(".")[0];
        const items = groups.get(year);

        if (items) {
          items.push(event);
          return;
        }

        groups.set(year, [event]);
      });

    return Array.from(groups.entries()).map(([year, events]) => ({
      year,
      events,
      previewEvents: events.slice(0, 3),
      hiddenCount: Math.max(events.length - 3, 0),
      categories: Array.from(new Set(events.map((event) => event.category))),
    }));
  }, []);

  return (
    <section id="timeline" className="py-24">
      <div className="section-shell">
        <div className="section-band overflow-hidden px-6 py-8 md:px-10 md:py-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-10 top-10 h-24 w-24 rounded-full border"
            style={{
              borderColor:
                "color-mix(in srgb, var(--color-accent) 22%, transparent)",
              background:
                "radial-gradient(circle, rgba(var(--color-accent-rgb), 0.12), transparent 68%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-10 left-10 h-12 w-28 rounded-full border"
            style={{
              borderColor:
                "color-mix(in srgb, var(--color-primary) 18%, transparent)",
              background:
                "linear-gradient(90deg, rgba(var(--color-primary-rgb), 0.06), transparent)",
            }}
          />

          <SectionLoader className="mb-8">
            <SectionHeader
              eyebrow={lang === "zh" ? "成长历程" : "Journey"}
              title={ui.timeline.title[lang]}
            />
          </SectionLoader>

          <div
            className="mb-8 rounded-[1.75rem] border px-4 py-4 md:px-5"
            style={{
              borderColor: "var(--color-border)",
              background:
                "linear-gradient(180deg, color-mix(in srgb, var(--color-bg-card) 94%, transparent), color-mix(in srgb, var(--color-bg-secondary) 88%, transparent))",
            }}
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <div
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  {lang === "zh" ? "时间线视图" : "Timeline View"}
                </div>
                <p
                  className="mt-1 text-sm leading-7"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {isExpanded
                    ? lang === "zh"
                      ? "展开后可以按时间顺序查看完整经历"
                      : "Expanded view shows every milestone in chronological order."
                    : lang === "zh"
                      ? "摘要视图按年份梳理主要阶段，适合先快速浏览"
                      : "Summary view groups milestones by year for quicker scanning."}
                </p>
              </div>

              <div
                className="inline-flex w-full rounded-full border p-1 md:w-auto"
                style={{
                  borderColor: "var(--color-border)",
                  background:
                    "color-mix(in srgb, var(--color-bg-card) 92%, transparent)",
                }}
              >
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors md:flex-none"
                  style={{
                    color: isExpanded ? "var(--color-text-secondary)" : "white",
                    background: isExpanded
                      ? "transparent"
                      : "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                  }}
                >
                  {lang === "zh" ? "摘要视图" : "Summary"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsExpanded(true)}
                  className="flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors md:flex-none"
                  style={{
                    color: isExpanded ? "white" : "var(--color-text-secondary)",
                    background: isExpanded
                      ? "linear-gradient(135deg, var(--color-primary), var(--color-accent))"
                      : "transparent",
                  }}
                >
                  {lang === "zh" ? "完整时间线" : "Full Timeline"}
                </button>
              </div>
            </div>
          </div>

          {isExpanded ? (
            <div className="relative ml-2">
              <div
                className="absolute bottom-0 left-[1.1rem] top-0 w-px"
                style={{
                  background:
                    "linear-gradient(to bottom, var(--color-primary), var(--color-accent))",
                  opacity: 0.34,
                }}
              />

              <div className="space-y-5">
                {timelineEvents.map((event, index) => {
                  const Icon = iconMap[event.icon] || Clock;
                  const color =
                    categoryColors[event.category] || "var(--color-primary)";

                  return (
                    <SectionLoader
                      key={`${event.date}-${event.title.en}`}
                      delay={0.06 * index}
                    >
                      <div className="relative grid grid-cols-[2.2rem,1fr] gap-4">
                        <div className="relative flex justify-center">
                          <div
                            className="relative z-10 mt-4 h-4 w-4 rounded-full ring-4"
                            style={{
                              backgroundColor: color,
                              ringColor: "var(--color-bg)",
                              boxShadow: `0 0 0 6px color-mix(in srgb, ${color} 18%, transparent)`,
                            }}
                          />
                        </div>

                        <div className="surface-card surface-card-hover px-5 py-5 hud-corners">
                          <div className="relative z-10">
                            <div className="mb-3 flex flex-wrap items-center gap-2">
                              <span
                                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
                                style={{
                                  backgroundColor: `${color}18`,
                                  color,
                                }}
                              >
                                <Icon size={14} />
                                {event.date}
                              </span>
                            </div>

                            <h3
                              className="mb-2 text-base font-semibold md:text-lg"
                              style={{ color: "var(--color-text)" }}
                            >
                              {event.title[lang]}
                            </h3>
                            <p
                              className="text-sm leading-7"
                              style={{ color: "var(--color-text-secondary)" }}
                            >
                              {event.description[lang]}
                            </p>
                          </div>
                        </div>
                      </div>
                    </SectionLoader>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {timelineGroups.map((group, index) => (
                <SectionLoader key={group.year} delay={0.06 * index}>
                  <article className="surface-card px-5 py-5 hud-corners">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div
                          className="text-2xl font-extrabold tracking-tight"
                          style={{ color: "var(--color-text)" }}
                        >
                          {group.year}
                        </div>
                        <p
                          className="mt-1 text-sm"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          {lang === "zh"
                            ? `${group.events.length} 个阶段节点`
                            : `${group.events.length} milestones`}
                        </p>
                      </div>

                      <div className="flex flex-wrap justify-end gap-2">
                        {group.categories.map((category) => {
                          const color = categoryColors[category];
                          return (
                            <span
                              key={`${group.year}-${category}`}
                              className="rounded-full px-3 py-1 text-xs font-semibold"
                              style={{
                                color,
                                backgroundColor: `${color}16`,
                              }}
                            >
                              {categoryLabels[category][lang]}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-5 space-y-3">
                      {group.previewEvents.map((event) => {
                        const Icon = iconMap[event.icon] || Clock;
                        const color =
                          categoryColors[event.category] || "var(--color-primary)";

                        return (
                          <div
                            key={`${group.year}-${event.date}-${event.title.en}`}
                            className="rounded-2xl border px-4 py-3"
                            style={{
                              borderColor: "var(--color-border)",
                              background:
                                "color-mix(in srgb, var(--color-bg-secondary) 80%, transparent)",
                            }}
                          >
                            <div className="mb-2 flex items-center gap-2">
                              <span
                                className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold"
                                style={{
                                  color,
                                  backgroundColor: `${color}18`,
                                }}
                              >
                                <Icon size={12} />
                                {event.date}
                              </span>
                            </div>
                            <div
                              className="text-sm font-semibold leading-6"
                              style={{ color: "var(--color-text)" }}
                            >
                              {event.title[lang]}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {group.hiddenCount > 0 && (
                      <p
                        className="mt-4 text-sm font-medium"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {lang === "zh"
                          ? `另有 ${group.hiddenCount} 条详细节点可在完整时间线中查看`
                          : `${group.hiddenCount} more milestones in full timeline.`}
                      </p>
                    )}
                  </article>
                </SectionLoader>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
