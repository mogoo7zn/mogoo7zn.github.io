import { useStore } from "@nanostores/react";
import { $lang } from "@/i18n/store";
import { ui } from "@/i18n/ui";
import { profile } from "@/data/profile";
import SectionLoader from "@/components/ui/SectionLoader";
import SensorGrid from "@/components/ui/SensorGrid";
import { Box, Bot, Eye, Gamepad2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = { Box, Bot, Eye, Gamepad2 };

export default function About() {
  const lang = useStore($lang);

  return (
    <section id="about" className="relative py-20 px-4">
      <SensorGrid />
      <div className="max-w-6xl mx-auto">
        <SectionLoader>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gradient inline-block">
            {ui.about.title[lang]}
          </h2>
          <p
            className="text-base md:text-lg leading-relaxed max-w-3xl mb-12"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {ui.about.description[lang]}
          </p>
        </SectionLoader>

        <SectionLoader delay={0.2}>
          <h3
            className="text-lg font-semibold mb-6"
            style={{ color: "var(--color-text)" }}
          >
            {ui.about.researchAreas[lang]}
          </h3>
        </SectionLoader>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {profile.researchInterests.map((area, i) => {
            const Icon = iconMap[area.icon] || Box;
            return (
              <SectionLoader key={area.icon} delay={0.1 * (i + 1)}>
                <div
                  className="group relative rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 cursor-default hud-corners embodied-glow"
                  style={{
                    backgroundColor: "var(--color-bg-card)",
                    border: "1px solid var(--color-border)",
                  }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = (e.clientX - rect.left - rect.width / 2) / 20;
                    const y = -(e.clientY - rect.top - rect.height / 2) / 20;
                    e.currentTarget.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) translateY(-4px)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "";
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                    }}
                  >
                    <Icon size={20} className="text-white" />
                  </div>
                  <h4
                    className="font-semibold text-sm mb-1.5"
                    style={{ color: "var(--color-text)" }}
                  >
                    {area.title[lang]}
                  </h4>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {area.description[lang]}
                  </p>
                </div>
              </SectionLoader>
            );
          })}
        </div>
      </div>
    </section>
  );
}
