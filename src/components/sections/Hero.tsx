import { useStore } from "@nanostores/react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Dna,
  Download,
  Gamepad2,
  Github,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import HeroScene from "@/components/three/HeroScene";
import { profile } from "@/data/profile";
import { $lang } from "@/i18n/store";
import { ui } from "@/i18n/ui";

export default function Hero() {
  const lang = useStore($lang);

  const introLabel = lang === "zh" ? "你好，我是" : "Hi, I'm";
  const cardIntro =
    lang === "zh"
      ? "这里放的是我最近最关心的研究与工程方向，也记录了我正在持续推进的事情"
      : "This is a snapshot of the research and engineering work I care about most right now.";

  const focusAreas: Array<{
    icon: LucideIcon;
    label: { zh: string; en: string };
  }> = [
    {
      icon: Gamepad2,
      label: {
        zh: "具身智能",
        en: "Embodied AI",
      },
    },
    {
      icon: Dna,
      label: {
        zh: "AI4S",
        en: "AI4S",
      },
    },
  ];

  const profileItems = [
    {
      label: lang === "zh" ? "教育背景" : "Education",
      value: `${profile.university[lang]} · ${profile.major[lang]}`,
    },
    {
      label: lang === "zh" ? "研究重点" : "Research Focus",
      value:
        lang === "zh" ? "具身智能与 AI4S" : "Embodied AI and AI4S",
    },
    {
      label: lang === "zh" ? "英语能力" : "English",
      value: `CET-4 ${profile.english.cet4} · CET-6 ${profile.english.cet6}`,
    },
  ];

  const highlights = [
    {
      year: "2024",
      text:
        lang === "zh"
          ? "URGP 本科科研，聚焦传统纹样数字化与风格融合算法"
          : "URGP research on heritage digitization and style-fusion algorithms.",
      href: "/blog/project-wangjiang-embroidery",
    },
    {
      year: "2025",
      text:
        lang === "zh"
          ? "操作系统大赛队长，完成多模态模型的端侧部署与工程落地"
          : "Led the OS competition team to deploy multimodal models on edge devices.",
      href: "/blog/project-os-competition",
    },
    {
      year: "2026",
      text:
        lang === "zh"
          ? "围绕第一视角交互，继续探索联合 2D-3D 的生成与理解"
          : "Exploring joint 2D-3D generation and understanding for egocentric interaction.",
      href: "/publications/thread",
    },
  ];

  const quickLinks: Array<{
    href: string;
    label: string;
    icon: LucideIcon;
    external?: boolean;
  }> = [
    { href: profile.github, label: "GitHub", icon: Github, external: true },
    { href: profile.website, label: "Website", icon: Globe, external: true },
    { href: "/blog", label: "Blog", icon: Sparkles },
    {
      href: "/publications",
      label: lang === "zh" ? "论文" : "Publications",
      icon: ArrowUpRight,
    },
  ];

  const heroName = profile.realName?.[lang] ?? profile.name[lang];

  return (
    <section
      id="hero"
      className="relative flex min-h-screen select-none items-center overflow-hidden px-4 pb-16 pt-28 md:pb-20"
      onDragStart={(event) => event.preventDefault()}
    >
      <HeroScene />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(15,23,42,0.05),transparent_18%,rgba(15,23,42,0.09))]" />

      <div className="section-shell pointer-events-none relative z-10">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:gap-12">
          <motion.div
            data-no-scene-drag
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="pointer-events-auto max-w-2xl"
          >
            <div
              className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
              style={{
                borderColor:
                  "color-mix(in srgb, var(--color-border) 84%, transparent)",
                background:
                  "color-mix(in srgb, var(--color-bg-card) 82%, transparent)",
                color: "var(--color-text-secondary)",
                boxShadow: "0 14px 36px rgba(15, 23, 42, 0.08)",
              }}
            >
              <GraduationCap
                size={16}
                style={{ color: "var(--color-primary)" }}
              />
              <span>{profile.university[lang]}</span>
            </div>

            <div
              className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
              style={{
                color: "var(--color-primary)",
                background:
                  "color-mix(in srgb, var(--color-primary) 12%, transparent)",
                border:
                  "1px solid color-mix(in srgb, var(--color-primary) 22%, transparent)",
              }}
            >
              <Sparkles size={16} />
              <span>{introLabel}</span>
            </div>

            <h1
              className="text-4xl font-extrabold leading-[1.04] tracking-tight md:text-6xl"
              style={{ color: "var(--color-text)" }}
            >
              {heroName}
            </h1>

            <p
              className="mt-4 max-w-xl text-lg font-medium md:text-[1.3rem]"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {profile.title[lang]}
            </p>

            <p
              className="mt-5 max-w-2xl text-base leading-7 md:text-lg md:leading-8"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {ui.hero.subtitle[lang]}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {focusAreas.map(({ icon: Icon, label }) => (
                <span
                  key={label.en}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium"
                  style={{
                    color: "var(--color-text-secondary)",
                    background:
                      "color-mix(in srgb, var(--color-bg-card) 86%, transparent)",
                    border:
                      "1px solid color-mix(in srgb, var(--color-border) 78%, transparent)",
                  }}
                >
                  <Icon size={14} style={{ color: "var(--color-accent)" }} />
                  {label[lang]}
                </span>
              ))}
            </div>

            <div
              className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              <span className="inline-flex items-center gap-2">
                <MapPin size={15} style={{ color: "var(--color-accent)" }} />
                {lang === "zh" ? "合肥，中国" : "Hefei, China"}
              </span>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors duration-200 hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
                style={{
                  background:
                    "color-mix(in srgb, var(--color-bg-card) 82%, transparent)",
                  border:
                    "1px solid color-mix(in srgb, var(--color-border) 74%, transparent)",
                }}
                aria-label={`Email ${profile.email}`}
              >
                <Mail size={15} style={{ color: "var(--color-accent)" }} />
                {profile.email}
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors duration-200 hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
                style={{
                  background:
                    "color-mix(in srgb, var(--color-bg-card) 82%, transparent)",
                  border:
                    "1px solid color-mix(in srgb, var(--color-border) 74%, transparent)",
                }}
                aria-label={`Open GitHub profile ${profile.githubHandle}`}
              >
                <Github size={15} style={{ color: "var(--color-accent)" }} />@
                {profile.githubHandle}
              </a>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/projects"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                  boxShadow: "0 16px 32px rgba(var(--color-primary-rgb), 0.22)",
                }}
              >
                {lang === "zh" ? "查看项目" : "View Projects"}
                <ArrowRight size={16} />
              </a>

              {/* Temporarily hide resume download UI without removing the implementation
              <a
                href={
                  lang === "zh"
                    ? "/cv/USTC_简历_王子宁.pdf"
                    : "/cv/USTC_CV_WZN.pdf"
                }
                download
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  color: "var(--color-text)",
                  background:
                    "color-mix(in srgb, var(--color-bg-card) 92%, transparent)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <Download size={16} />
                {lang === "zh" ? "下载简历" : "Download Resume"}
              </a>
              */}
            </div>
          </motion.div>

          <motion.aside
            data-no-scene-drag
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12, duration: 0.5, ease: "easeOut" }}
            className="surface-panel pointer-events-auto relative ml-auto w-full max-w-[34rem] overflow-hidden p-0 lg:max-w-none"
          >
            <div className="mesh-overlay opacity-60" />
            <div
              className="absolute -right-12 top-[-2.5rem] h-40 w-40 rounded-full blur-3xl"
              style={{ background: "rgba(var(--color-primary-rgb), 0.18)" }}
            />
            <div
              className="absolute -left-8 bottom-8 h-32 w-32 rounded-full blur-3xl"
              style={{ background: "rgba(var(--color-accent-rgb), 0.16)" }}
            />

            <div className="relative z-10 p-6 md:p-7">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="flex items-start gap-4">
                  <div
                    className="relative h-[5.6rem] w-[5.6rem] shrink-0 overflow-hidden rounded-[1.65rem] p-[1px]"
                    style={{
                      background:
                        "linear-gradient(145deg, rgba(var(--color-primary-rgb), 0.7), rgba(var(--color-accent-rgb), 0.55))",
                      boxShadow:
                        "0 20px 40px rgba(var(--color-primary-rgb), 0.18)",
                    }}
                  >
                    <div
                      className="flex h-full w-full items-center justify-center rounded-[calc(1.65rem-1px)]"
                      style={{
                        background:
                          "linear-gradient(180deg, color-mix(in srgb, var(--color-bg-card) 96%, transparent), color-mix(in srgb, var(--color-bg-secondary) 88%, transparent))",
                      }}
                    >
                      <img
                        src={profile.avatar}
                        alt={heroName}
                        className="h-[82%] w-[82%] object-contain"
                      />
                    </div>
                  </div>

                  <div className="min-w-0 -mt-0.5">
                    <h2
                      className="text-2xl font-bold tracking-tight"
                      style={{ color: "var(--color-text)" }}
                    >
                      {lang === "zh" ? "个人名片" : "Profile Capsule"}
                    </h2>
                    <p
                      className="mt-1.5 max-w-md text-sm leading-7"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {cardIntro}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {focusAreas.map(({ icon: Icon, label }) => (
                    <span
                      key={`card-${label.en}`}
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold"
                      style={{
                        color: "var(--color-text)",
                        background:
                          "color-mix(in srgb, var(--color-bg-card) 84%, transparent)",
                        border:
                          "1px solid color-mix(in srgb, var(--color-border) 74%, transparent)",
                      }}
                    >
                      <Icon
                        size={13}
                        style={{ color: "var(--color-accent)" }}
                      />
                      {label[lang]}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <div className="space-y-3">
                  {profileItems.map((item, index) => (
                    <div
                      key={item.label}
                      className="rounded-[1.15rem] border px-4 py-4"
                      style={{
                        borderColor: "var(--color-border)",
                        background:
                          index === 0
                            ? "linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 10%, transparent), color-mix(in srgb, var(--color-bg-card) 92%, transparent))"
                            : "color-mix(in srgb, var(--color-bg-card) 90%, transparent)",
                      }}
                    >
                      <div
                        className="text-[0.7rem] font-semibold uppercase tracking-[0.22em]"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {item.label}
                      </div>
                      <div
                        className="mt-2 text-sm leading-7"
                        style={{ color: "var(--color-text)" }}
                      >
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="rounded-[1.35rem] border p-4"
                  style={{
                    borderColor:
                      "color-mix(in srgb, var(--color-border) 85%, transparent)",
                    background:
                      "linear-gradient(180deg, color-mix(in srgb, var(--color-bg-card) 94%, transparent), color-mix(in srgb, var(--color-bg-secondary) 86%, transparent))",
                  }}
                >
                  <div
                    className="text-xs font-semibold uppercase tracking-[0.22em]"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {lang === "zh" ? "近期重点" : "Recent Highlights"}
                  </div>

                  <div className="mt-4 space-y-3">
                    {highlights.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="group flex items-start gap-3 rounded-2xl border px-4 py-3 transition-all duration-200 hover:-translate-y-0.5"
                        style={{
                          borderColor:
                            "color-mix(in srgb, var(--color-border) 88%, transparent)",
                          background:
                            "color-mix(in srgb, var(--color-bg-secondary) 78%, transparent)",
                        }}
                      >
                        <div
                          className="min-w-[3rem] text-sm font-semibold"
                          style={{ color: "var(--color-primary)" }}
                        >
                          {item.year}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div
                            className="text-sm leading-7"
                            style={{ color: "var(--color-text-secondary)" }}
                          >
                            {item.text}
                          </div>
                        </div>
                        <ArrowUpRight
                          size={16}
                          className="mt-1 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          style={{ color: "var(--color-text-muted)" }}
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {quickLinks.map(({ href, label, icon: Icon, external }) => (
                  <a
                    key={label}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="surface-chip text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <Icon size={15} />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>

      <motion.div
        data-no-scene-drag
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="pointer-events-auto absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
          {ui.hero.scrollDown[lang]}
        </span>
        <ChevronDown
          size={18}
          className="animate-bounce"
          style={{ color: "var(--color-text-muted)" }}
        />
      </motion.div>
    </section>
  );
}
