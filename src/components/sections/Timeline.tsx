import { useMemo } from "react";
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

  const summaryStats = useMemo(
    () => [
      {
        label: lang === "zh" ? "阶段年份" : "Years",
        value: `${timelineGroups.length}`,
      },
      {
        label: lang === "zh" ? "关键节点" : "Milestones",
        value: `${timelineEvents.length}`,
      },
      {
        label: lang === "zh" ? "覆盖方向" : "Categories",
        value: `${Object.keys(categoryLabels).length}`,
      },
    ],
    [lang, timelineGroups.length],
  );

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
              description={
                lang === "zh"
                  ? "按年份梳理学习、项目、竞赛与研究节点，方便快速浏览关键阶段"
                  : "A year-based overview of study, projects, competitions, and research milestones."
              }
            />
          </SectionLoader>

          <div className="mb-8 grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <div className="surface-card overflow-hidden px-5 py-5 md:px-6">
              <div className="relative z-10 grid gap-4 sm:grid-cols-3">
                {summaryStats.map((item, index) => (
                  <div
                    key={item.label}
                    className="rounded-[1.35rem] border px-4 py-4"
                    style={{
                      borderColor: "var(--color-border)",
                      background:
                        index === 0
                          ? "linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 12%, transparent), color-mix(in srgb, var(--color-bg-card) 94%, transparent))"
                          : "color-mix(in srgb, var(--color-bg-card) 90%, transparent)",
                    }}
                  >
                    <div
                      className="text-[0.76rem] font-semibold uppercase tracking-[0.18em]"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {item.label}
                    </div>
                    <div
                      className="mt-2 text-2xl font-bold tracking-tight md:text-[2rem]"
                      style={{ color: "var(--color-text)" }}
                    >
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="surface-card overflow-hidden px-5 py-5 md:px-6">
              <div className="relative z-10">
                <div
                  className="inline-flex items-center gap-2 text-[0.76rem] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: "var(--color-primary)" }}
                >
                  <span>{lang === "zh" ? "阶段概览" : "Overview"}</span>
                </div>
                <p
                  className="mt-3 text-[0.98rem] leading-8 md:text-base"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {lang === "zh"
                    ? "从进入 USTC 开始，这里按年份整理了项目推进、竞赛训练、奖项与研究经历，重点保留对阶段判断最有代表性的节点"
                    : "Starting from my time at USTC, this section groups project work, competitions, awards, and research by year, keeping the milestones that best represent each stage."}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {timelineGroups.map((group, index) => (
              <SectionLoader key={group.year} delay={0.06 * index}>
                <article className="surface-card surface-card-hover overflow-hidden px-5 py-5 md:px-6 hud-corners">
                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div
                          className="text-[2rem] font-extrabold tracking-tight md:text-[2.35rem]"
                          style={{ color: "var(--color-text)" }}
                        >
                          {group.year}
                        </div>
                        <p
                          className="mt-1 text-[0.96rem]"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          {lang === "zh"
                            ? `${group.events.length} 个关键节点`
                            : `${group.events.length} key milestones`}
                        </p>
                      </div>

                      <div className="flex max-w-[14rem] flex-wrap justify-end gap-2">
                        {group.categories.map((category) => {
                          const color = categoryColors[category];
                          return (
                            <span
                              key={`${group.year}-${category}`}
                              className="rounded-full px-3 py-1 text-[0.76rem] font-semibold"
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

                    <div className="mt-6 space-y-4">
                      {group.previewEvents.map((event) => {
                        const Icon = iconMap[event.icon] || Clock;
                        const color =
                          categoryColors[event.category] || "var(--color-primary)";

                        return (
                          <div
                            key={`${group.year}-${event.date}-${event.title.en}`}
                            className="grid grid-cols-[auto,1fr] gap-3 rounded-[1.25rem] border px-4 py-4"
                            style={{
                              borderColor: "var(--color-border)",
                              background:
                                "color-mix(in srgb, var(--color-bg-secondary) 78%, transparent)",
                            }}
                          >
                            <div
                              className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl"
                              style={{
                                color,
                                backgroundColor: `${color}16`,
                              }}
                            >
                              <Icon size={17} />
                            </div>
                            <div className="min-w-0">
                              <div
                                className="text-[0.78rem] font-semibold uppercase tracking-[0.16em]"
                                style={{ color }}
                              >
                                {event.date}
                              </div>
                              <div
                                className="mt-1 text-[1rem] font-semibold leading-7 md:text-[1.04rem]"
                                style={{ color: "var(--color-text)" }}
                              >
                                {event.title[lang]}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {group.hiddenCount > 0 && (
                      <p
                        className="mt-4 text-[0.96rem] font-medium"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {lang === "zh"
                          ? `另含 ${group.hiddenCount} 条同年节点`
                          : `${group.hiddenCount} additional milestones in the same year`}
                      </p>
                    )}
                  </div>
                </article>
              </SectionLoader>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
