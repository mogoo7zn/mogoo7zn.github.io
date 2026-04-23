import { useStore } from "@nanostores/react";
import { $lang } from "@/i18n/store";
import { ui } from "@/i18n/ui";
import { profile } from "@/data/profile";
import { awards } from "@/data/awards";
import SectionLoader from "@/components/ui/SectionLoader";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  BookOpen,
  Briefcase,
  Download,
  GraduationCap,
  Trophy,
} from "lucide-react";

const levelBadge: Record<string, { zh: string; en: string; color: string }> = {
  international: { zh: "国际级", en: "International", color: "#F59E0B" },
  national: { zh: "国家级", en: "National", color: "#EF4444" },
  provincial: { zh: "省级", en: "Provincial", color: "#8B5CF6" },
  university: { zh: "校级", en: "University", color: "var(--color-primary)" },
};

export default function CV() {
  const lang = useStore($lang);

  return (
    <section id="cv" className="py-24">
      <div className="section-shell">
        <div className="section-band overflow-hidden px-6 py-8 md:px-10 md:py-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-10 top-10 h-20 w-20 rounded-3xl border rotate-12"
            style={{
              borderColor: "color-mix(in srgb, var(--color-primary) 22%, transparent)",
              background:
                "linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.08), transparent)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-10 left-10 h-10 w-24 rounded-full border"
            style={{
              borderColor: "color-mix(in srgb, var(--color-accent) 20%, transparent)",
              background:
                "linear-gradient(90deg, rgba(var(--color-accent-rgb), 0.08), transparent)",
            }}
          />

          <SectionLoader className="mb-8">
            <SectionHeader
              eyebrow={lang === "zh" ? "学术简历" : "Resume Snapshot"}
              title={ui.cv.title[lang]}
            />
          </SectionLoader>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr,1.45fr]">
            <div className="flex flex-col gap-6">
              <SectionLoader delay={0.1}>
                <div className="surface-card px-6 py-6 hud-corners">
                  <div className="relative z-10">
                    <div className="mb-4 flex items-center gap-3">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-2xl"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                        }}
                      >
                        <GraduationCap size={20} className="text-white" />
                      </div>
                      <h3
                        className="text-lg font-semibold"
                        style={{ color: "var(--color-text)" }}
                      >
                        {ui.cv.education[lang]}
                      </h3>
                    </div>

                    <div className="space-y-2">
                      <p
                        className="text-lg font-semibold"
                        style={{ color: "var(--color-text)" }}
                      >
                        {profile.university[lang]}
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {profile.college[lang]}
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {profile.major[lang]} · {profile.degree[lang]}
                      </p>
                    </div>

                    {profile.coreCourses && (
                      <div
                        className="mt-5 rounded-2xl border px-4 py-4"
                        style={{
                          borderColor: "var(--color-border)",
                          background:
                            "color-mix(in srgb, var(--color-bg-secondary) 82%, transparent)",
                        }}
                      >
                        <div
                          className="mb-2 text-xs font-semibold uppercase tracking-[0.22em]"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          {lang === "zh" ? "核心课程" : "Core Courses"}
                        </div>
                        <p
                          className="text-sm leading-7"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          {profile.coreCourses[lang]}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </SectionLoader>

              <SectionLoader delay={0.18}>
                <div className="surface-card px-6 py-6 hud-corners">
                  <div className="relative z-10">
                    <div className="mb-4 flex items-center gap-3">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-2xl"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--color-accent), var(--color-primary))",
                        }}
                      >
                        <BookOpen size={20} className="text-white" />
                      </div>
                      <h3
                        className="text-lg font-semibold"
                        style={{ color: "var(--color-text)" }}
                      >
                        {ui.cv.english[lang]}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "CET-4", value: profile.english.cet4 },
                        { label: "CET-6", value: profile.english.cet6 },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="rounded-2xl border px-4 py-4"
                          style={{
                            borderColor: "var(--color-border)",
                            background:
                              "color-mix(in srgb, var(--color-bg-secondary) 82%, transparent)",
                          }}
                        >
                          <div
                            className="text-xs uppercase tracking-[0.22em]"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            {item.label}
                          </div>
                          <div
                            className="mt-2 text-3xl font-bold tracking-tight"
                            style={{ color: "var(--color-primary)" }}
                          >
                            {item.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    <p
                      className="mt-4 text-sm leading-7"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {profile.english.note[lang]}
                    </p>
                  </div>
                </div>
              </SectionLoader>

              <SectionLoader delay={0.26}>
                <div className="surface-card px-6 py-6 hud-corners">
                  <div className="relative z-10">
                    <div className="mb-4 flex items-center gap-3">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-2xl"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                        }}
                      >
                        <Briefcase size={20} className="text-white" />
                      </div>
                      <h3
                        className="text-lg font-semibold"
                        style={{ color: "var(--color-text)" }}
                      >
                        {lang === "zh" ? "校园经历" : "Campus Experience"}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {profile.studentWork.map((item) => (
                        <div
                          key={item.en}
                          className="rounded-2xl border px-4 py-4 text-sm leading-7"
                          style={{
                            borderColor: "var(--color-border)",
                            color: "var(--color-text-secondary)",
                            background:
                              "color-mix(in srgb, var(--color-bg-secondary) 82%, transparent)",
                          }}
                        >
                          {item[lang]}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SectionLoader>
            </div>

            <div className="flex flex-col gap-6">
              <SectionLoader delay={0.14}>
                <div className="surface-card h-full px-6 py-6 hud-corners">
                  <div className="relative z-10">
                    <div className="mb-5 flex items-center gap-3">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-2xl"
                        style={{
                          background:
                            "linear-gradient(135deg, #F59E0B, var(--color-accent))",
                        }}
                      >
                        <Trophy size={20} className="text-white" />
                      </div>
                      <h3
                        className="text-lg font-semibold"
                        style={{ color: "var(--color-text)" }}
                      >
                        {ui.cv.awards[lang]}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {awards.map((award, index) => {
                        const badge = levelBadge[award.level];

                        return (
                          <div
                            key={`${award.year}-${index}`}
                            className="rounded-2xl border px-4 py-4"
                            style={{
                              borderColor: "var(--color-border)",
                              background:
                                "color-mix(in srgb, var(--color-bg-secondary) 80%, transparent)",
                            }}
                          >
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              <span
                                className="rounded-full px-2.5 py-1 text-xs font-semibold"
                                style={{
                                  backgroundColor: `${badge.color}18`,
                                  color: badge.color,
                                }}
                              >
                                {award.year}
                              </span>
                              <span
                                className="text-xs font-semibold uppercase tracking-[0.18em]"
                                style={{ color: badge.color }}
                              >
                                {badge[lang]}
                              </span>
                            </div>
                            <p
                              className="text-sm leading-7"
                              style={{ color: "var(--color-text)" }}
                            >
                              {award.title[lang]}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </SectionLoader>

              {/* Temporarily hide resume download UI without removing the implementation
              <SectionLoader delay={0.24}>
                <div className="surface-card px-6 py-6 hud-corners">
                  <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-xl">
                      <div
                        className="mb-2 text-xs font-semibold uppercase tracking-[0.24em]"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {lang === "zh" ? "简历下载" : "Resume Download"}
                      </div>
                      <h3
                        className="text-xl font-semibold"
                        style={{ color: "var(--color-text)" }}
                      >
                        {lang === "zh"
                          ? "如需正式版本，可在后续阶段提供 PDF 简历"
                          : "The full PDF resume can be provided when needed"}
                      </h3>
                    </div>

                    <a
                      href={
                        lang === "zh"
                          ? "/cv/USTC_简历_王子宁.pdf"
                          : "/cv/USTC_CV_WZN.pdf"
                      }
                      download
                      className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                      }}
                    >
                      <Download size={16} />
                      {ui.cv.download[lang]}
                    </a>
                  </div>
                </div>
              </SectionLoader>
              */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
