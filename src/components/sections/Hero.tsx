import { useStore } from "@nanostores/react";
import { $lang } from "@/i18n/store";
import { ui } from "@/i18n/ui";
import { profile } from "@/data/profile";
import { motion } from "framer-motion";
import { Github, Mail, ChevronDown } from "lucide-react";
import HeroScene from "@/components/three/HeroScene";

/* Small orbiting data particles around the avatar */
function DataParticles() {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    delay: `${i * 0.625}s`,
    radius: `${82 + (i % 3) * 14}px`,
    size: 2 + (i % 3),
    dur: `${4 + (i % 4) * 1.5}s`,
  }));
  return (
    <>
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            top: "50%",
            left: "50%",
            background:
              i % 2 === 0 ? "var(--color-primary)" : "var(--color-accent)",
            boxShadow: `0 0 6px ${i % 2 === 0 ? "var(--color-primary)" : "var(--color-accent)"}`,
            animationDelay: p.delay,
            animationDuration: p.dur,
            ["--orbit-radius" as string]: p.radius,
            animation: `data-particle-orbit ${p.dur} linear infinite`,
          }}
        />
      ))}
    </>
  );
}

export default function Hero() {
  const lang = useStore($lang);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
    >
      <HeroScene />
      <div className="text-center z-10 max-w-4xl mx-auto flex flex-col items-center justify-center mt-10">
        {/* Avatar with enhanced sci-fi effects */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto mb-8 relative w-44 h-44 md:w-52 md:h-52"
          style={{ perspective: "600px" }}
        >
          {/* Ripple rings expanding outward */}
          {[0, 1, 2].map((i) => (
            <div
              key={`ripple-${i}`}
              className="absolute inset-0 rounded-full animate-ripple"
              style={{
                border: "1px solid var(--color-primary)",
                animationDelay: `${i * 1}s`,
              }}
            />
          ))}

          {/* Orbiting 3D rings */}
          <div
            className="absolute inset-[-18px] animate-orbit-ring-1"
            style={{
              borderRadius: "50%",
              border: "1.5px dashed var(--color-primary)",
              opacity: 0.3,
              transformStyle: "preserve-3d",
            }}
          />
          <div
            className="absolute inset-[-32px] animate-orbit-ring-2"
            style={{
              borderRadius: "50%",
              border: "1px solid var(--color-accent)",
              opacity: 0.2,
              transformStyle: "preserve-3d",
            }}
          />
          <div
            className="absolute inset-[-10px] animate-orbit-ring-3"
            style={{
              borderRadius: "50%",
              border: "1px dotted var(--color-primary)",
              opacity: 0.25,
              transformStyle: "preserve-3d",
            }}
          />

          {/* Hexagonal pulse frame */}
          <div
            className="absolute inset-[-6px] animate-hex-pulse"
            style={{
              clipPath:
                "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
              border: "2px solid var(--color-primary)",
              background: "transparent",
            }}
          >
            <div
              className="w-full h-full"
              style={{
                clipPath:
                  "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                border: "1px solid var(--color-accent)",
                opacity: 0.4,
              }}
            />
          </div>

          {/* Avatar image */}
          <div
            className="absolute inset-[3px] rounded-full overflow-hidden"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              boxShadow:
                "0 0 30px var(--color-glow), 0 0 60px var(--color-glow)",
            }}
          >
            <img
              src={profile.avatar}
              alt={profile.name[lang]}
              className="w-full h-full object-cover scale-110"
            />

            {/* Holographic overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, transparent 30%, var(--color-primary) 50%, transparent 70%)",
                opacity: 0.06,
                mixBlendMode: "screen",
              }}
            />
          </div>

          {/* Breathing ambient glow (enhanced multi-layer) */}
          <div
            className="absolute inset-2 -z-10 rounded-full blur-2xl animate-breathing-glow"
            style={{ background: "var(--color-primary)" }}
          />
          <div
            className="absolute inset-[-12px] -z-10 rounded-full blur-3xl"
            style={{
              background: "var(--color-accent)",
              animation: "breathing-glow 5s ease-in-out infinite 1s",
              opacity: 0.08,
            }}
          />

          {/* Orbiting data particles */}
          <DataParticles />
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-base md:text-lg mb-3 font-medium tracking-wide uppercase"
          style={{ color: "var(--color-primary)" }}
        >
          {ui.hero.greeting[lang]}
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-5xl md:text-7xl font-extrabold mb-6 text-gradient leading-[1.2] pb-2 tracking-tight"
        >
          {profile.name[lang]}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {ui.hero.subtitle[lang]}
        </motion.p>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex items-center justify-center gap-4"
        >
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg text-white"
            style={{
              background:
                "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
              boxShadow: "0 4px 15px var(--color-glow)",
            }}
          >
            <Github size={18} />
            GitHub
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
            style={{
              color: "var(--color-primary)",
              border: "1px solid var(--color-primary)",
            }}
          >
            <Mail size={16} />
            {lang === "zh" ? "联系我" : "Contact"}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
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
