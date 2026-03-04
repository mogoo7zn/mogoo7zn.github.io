import { useStore } from "@nanostores/react";
import { $lang } from "@/i18n/store";
import { ui } from "@/i18n/ui";
import { timelineEvents } from "@/data/timeline";
import SectionLoader from "@/components/ui/SectionLoader";
import {
  GraduationCap,
  Clock,
  Trophy,
  Building2,
  Cpu,
  Palette,
  Gamepad2,
  Dna,
  Award,
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

export default function Timeline() {
  const lang = useStore($lang);

  return (
    <section id="timeline" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionLoader>
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-gradient inline-block">
            {ui.timeline.title[lang]}
          </h2>
        </SectionLoader>

        <div className="relative">
          {/* Center line */}
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px"
            style={{
              background:
                "linear-gradient(to bottom, var(--color-primary), var(--color-accent))",
              opacity: 0.3,
            }}
          />

          {timelineEvents.map((event, i) => {
            const Icon = iconMap[event.icon] || Clock;
            const color =
              categoryColors[event.category] || "var(--color-primary)";
            const isLeft = i % 2 === 0;

            return (
              <SectionLoader
                key={`${event.date}-${event.title.en}`}
                delay={0.08 * i}
                direction={isLeft ? "left" : "right"}
              >
                <div
                  className={`relative flex items-start mb-8 md:mb-6 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot on timeline */}
                  <div
                    className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 mt-1.5 z-10 ring-4"
                    style={{
                      backgroundColor: color,
                      ringColor: "var(--color-bg)",
                    }}
                  />

                  {/* Content card */}
                  <div
                    className={`ml-10 md:ml-0 md:w-[calc(50%-24px)] rounded-xl p-4 transition-all duration-300 hover:shadow-md ${
                      isLeft ? "md:mr-auto md:pr-6" : "md:ml-auto md:pl-6"
                    }`}
                    style={{
                      backgroundColor: "var(--color-bg-card)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon size={14} style={{ color }} />
                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${color}15`,
                          color,
                        }}
                      >
                        {event.date}
                      </span>
                    </div>
                    <h3
                      className="font-semibold text-sm mb-1"
                      style={{ color: "var(--color-text)" }}
                    >
                      {event.title[lang]}
                    </h3>
                    <p
                      className="text-xs"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {event.description[lang]}
                    </p>
                  </div>
                </div>
              </SectionLoader>
            );
          })}
        </div>
      </div>
    </section>
  );
}
