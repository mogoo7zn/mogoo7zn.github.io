import { useStore } from "@nanostores/react";
import { $lang } from "@/i18n/store";
import { ui } from "@/i18n/ui";
import { profile } from "@/data/profile";
import { awards } from "@/data/awards";
import SectionLoader from "@/components/ui/SectionLoader";
import { GraduationCap, Trophy, BookOpen, Download } from "lucide-react";

const levelBadge: Record<string, { zh: string; en: string; color: string }> = {
  international: { zh: "国际级", en: "International", color: "#F59E0B" },
  national: { zh: "国家级", en: "National", color: "#EF4444" },
  provincial: { zh: "省级", en: "Provincial", color: "#8B5CF6" },
  university: { zh: "校级", en: "University", color: "var(--color-primary)" },
};

export default function CV() {
  const lang = useStore($lang);

  return (
    <section id="cv" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionLoader>
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-gradient inline-block">
            {ui.cv.title[lang]}
          </h2>
        </SectionLoader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Education & English */}
          <div className="flex flex-col gap-6">
            {/* Education */}
            <SectionLoader delay={0.1}>
              <div
                className="rounded-xl p-5"
                style={{
                  backgroundColor: "var(--color-bg-card)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap
                    size={18}
                    style={{ color: "var(--color-primary)" }}
                  />
                  <h3
                    className="font-semibold text-sm"
                    style={{ color: "var(--color-text)" }}
                  >
                    {ui.cv.education[lang]}
                  </h3>
                </div>
                <div className="space-y-2.5">
                  <div>
                    <p
                      className="font-semibold text-sm"
                      style={{ color: "var(--color-text)" }}
                    >
                      {profile.university[lang]}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {profile.college[lang]}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {profile.major[lang]} · {profile.degree[lang]}
                    </p>
                  </div>
                  {profile.coreCourses && (
                    <div
                      className="pt-3 mt-2"
                      style={{ borderTop: "1px solid var(--color-border)" }}
                    >
                      <span
                        className="text-xs block mb-1"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {lang === "zh" ? "核心课程" : "Core Courses"}
                      </span>
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {profile.coreCourses[lang]}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </SectionLoader>

            {/* English Proficiency */}
            <SectionLoader delay={0.3}>
              <div
                className="rounded-xl p-5"
                style={{
                  backgroundColor: "var(--color-bg-card)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen
                    size={18}
                    style={{ color: "var(--color-accent)" }}
                  />
                  <h3
                    className="font-semibold text-sm"
                    style={{ color: "var(--color-text)" }}
                  >
                    {ui.cv.english[lang]}
                  </h3>
                </div>
                <div className="flex gap-6">
                  <div>
                    <span
                      className="text-xs"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      CET-4
                    </span>
                    <p
                      className="font-bold text-lg"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {profile.english.cet4}
                    </p>
                  </div>
                  <div>
                    <span
                      className="text-xs"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      CET-6
                    </span>
                    <p
                      className="font-bold text-lg"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {profile.english.cet6}
                    </p>
                  </div>
                </div>
                <p
                  className="text-xs mt-2"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {profile.english.note[lang]}
                </p>
              </div>
            </SectionLoader>
          </div>

          {/* Awards */}
          <SectionLoader delay={0.2} className="lg:col-span-2">
            <div
              className="rounded-xl p-5 h-full"
              style={{
                backgroundColor: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Trophy size={18} style={{ color: "#F59E0B" }} />
                <h3
                  className="font-semibold text-sm"
                  style={{ color: "var(--color-text)" }}
                >
                  {ui.cv.awards[lang]}
                </h3>
              </div>
              <div className="space-y-2">
                {awards.map((award, i) => {
                  const badge = levelBadge[award.level];
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 py-1.5"
                      style={{
                        borderBottom:
                          i < awards.length - 1
                            ? "1px solid var(--color-border)"
                            : "none",
                      }}
                    >
                      <span
                        className="shrink-0 text-xs font-medium rounded-full px-2 py-0.5 mt-0.5"
                        style={{
                          backgroundColor: `${badge.color}15`,
                          color: badge.color,
                        }}
                      >
                        {award.year}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-xs leading-relaxed"
                          style={{ color: "var(--color-text)" }}
                        >
                          {award.title[lang]}
                        </p>
                      </div>
                      <span
                        className="shrink-0 text-xs px-1.5 py-0.5 rounded"
                        style={{ color: badge.color, fontSize: "10px" }}
                      >
                        {badge[lang]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </SectionLoader>
        </div>

        {/* Download */}
        <div className="mt-10 flex justify-center">
          <SectionLoader delay={0.4}>
            <a
              href={
                lang === "zh"
                  ? "/cv/USTC_简历_王子宁.pdf"
                  : "/cv/USTC_CV_WZN.pdf"
              }
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
              }}
            >
              <Download size={16} />
              {ui.cv.download[lang]}
            </a>
          </SectionLoader>
        </div>
      </div>
    </section>
  );
}
