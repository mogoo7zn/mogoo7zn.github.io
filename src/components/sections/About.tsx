import { useStore } from "@nanostores/react";
import { $lang } from "@/i18n/store";
import { ui } from "@/i18n/ui";
import { profile } from "@/data/profile";
import SectionLoader from "@/components/ui/SectionLoader";
import SensorGrid from "@/components/ui/SensorGrid";
import SectionHeader from "@/components/ui/SectionHeader";
import { Box, Bot, Eye, Gamepad2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = { Box, Bot, Eye, Gamepad2 };

export default function About() {
  const lang = useStore($lang);

  return (
    <section id="about" className="relative py-24">
      <div className="section-shell">
        <div className="section-band overflow-hidden px-6 py-8 md:px-10 md:py-12">
          <SensorGrid className="opacity-60" />

          <div className="relative z-10 grid gap-8 xl:grid-cols-[1.08fr,1fr] xl:gap-10">
            <SectionLoader className="flex flex-col gap-6">
              <SectionHeader
                eyebrow={lang === "zh" ? "个人介绍" : "About Me"}
                title={ui.about.title[lang]}
              />

              <div className="surface-card px-6 py-6 md:px-7">
                <div className="relative z-10">
                  <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
                    <span>
                      {lang === "zh" ? "研究叙事" : "Research Narrative"}
                    </span>
                  </div>
                  <p
                    className="text-base leading-8"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {profile.bio[lang]}
                  </p>
                </div>
              </div>
            </SectionLoader>

            <div className="flex flex-col gap-5">
              <SectionLoader delay={0.15}>
                <div className="flex items-center justify-between">
                  <h3
                    className="text-xl font-semibold"
                    style={{ color: "var(--color-text)" }}
                  >
                    {ui.about.researchAreas[lang]}
                  </h3>
                  <span className="surface-chip text-xs font-semibold uppercase tracking-[0.2em]">
                    {lang === "zh" ? "4 个方向" : "4 Focus Areas"}
                  </span>
                </div>
              </SectionLoader>

              <div className="grid gap-4 sm:grid-cols-2">
                {profile.researchInterests.map((area, index) => {
                  const Icon = iconMap[area.icon] || Box;

                  return (
                    <SectionLoader key={area.icon} delay={0.12 * (index + 1)}>
                      <div className="surface-card surface-card-hover h-full px-5 py-5">
                        <div className="relative z-10">
                          <div className="mb-4 flex items-center justify-between">
                            <div
                              className="flex h-11 w-11 items-center justify-center rounded-2xl"
                              style={{
                                background:
                                  "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                                boxShadow: "0 12px 32px var(--color-glow)",
                              }}
                            >
                              <Icon size={20} className="text-white" />
                            </div>
                            <span
                              className="text-xs font-semibold"
                              style={{ color: "var(--color-text-muted)" }}
                            >
                              0{index + 1}
                            </span>
                          </div>

                          <h4
                            className="mb-3 text-lg font-semibold"
                            style={{ color: "var(--color-text)" }}
                          >
                            {area.title[lang]}
                          </h4>
                          <p
                            className="text-sm leading-7"
                            style={{ color: "var(--color-text-secondary)" }}
                          >
                            {area.description[lang]}
                          </p>
                        </div>
                      </div>
                    </SectionLoader>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
