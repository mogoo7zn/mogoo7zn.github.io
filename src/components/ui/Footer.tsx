import { useStore } from "@nanostores/react";
import { $lang } from "@/i18n/store";
import { ui } from "@/i18n/ui";
import { Github, Mail, Cpu, Network } from "lucide-react";
import { profile } from "@/data/profile";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import VisitCounter from "@/components/blog/VisitCounter";

function EmbodiedAICore() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set((event.clientX / window.innerWidth - 0.5) * 2);
      mouseY.set((event.clientY / window.innerHeight - 0.5) * 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const springConfig = { damping: 25, stiffness: 150 };
  const eyeX = useSpring(
    useTransform(mouseX, [-1, 1], [-20, 20]),
    springConfig,
  );
  const eyeY = useSpring(
    useTransform(mouseY, [-1, 1], [-20, 20]),
    springConfig,
  );
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
      timeoutId = setTimeout(triggerBlink, Math.random() * 5000 + 3000);
    };

    timeoutId = setTimeout(triggerBlink, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  const pupilX = useTransform(eyeX, (value) => value * 1.5);
  const pupilY = useTransform(eyeY, (value) => value * 1.5);

  const pathD = useTransform([eyeX, eyeY], ([x, y]) => {
    const p1 = [33.15, 133.58];
    const p2 = [92.0, 92.0];
    const p3 = [150.0 + x, 116.0 + y];
    const p4 = [208.0, 92.0];
    const p5 = [266.85, 133.58];

    return `M ${p1[0]} ${p1[1]} L ${p2[0]} ${p2[1]} L ${p3[0]} ${p3[1]} L ${p4[0]} ${p4[1]} L ${p5[0]} ${p5[1]}`;
  });

  return (
    <div className="group flex flex-col items-center gap-4">
      <div className="relative flex h-32 w-32 items-center justify-center transition-transform duration-500 group-hover:scale-105">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 300 300"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.3)]"
        >
          <defs>
            <linearGradient
              id="avatar-gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="0"
              x2="300"
              y2="300"
            >
              <stop offset="0" stopColor="var(--color-primary)" />
              <stop offset="1" stopColor="var(--color-accent)" />
            </linearGradient>
          </defs>

          <circle
            cx="150"
            cy="150"
            r="118"
            stroke="url(#avatar-gradient)"
            strokeWidth="3"
            fill="none"
            opacity="0.8"
          />

          <motion.g>
            <motion.path
              d={pathD}
              stroke="url(#avatar-gradient)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <motion.circle
              cx="150"
              cy="150"
              r="34"
              style={{ x: eyeX, y: eyeY, originX: "150px", originY: "150px" }}
              animate={{ scaleY: isBlinking ? 0.1 : 1 }}
              transition={
                isBlinking
                  ? { duration: 0.1, ease: "easeOut" }
                  : { type: "spring", stiffness: 250, damping: 25 }
              }
              stroke="url(#avatar-gradient)"
              strokeWidth="5"
              fill="transparent"
            />
            <motion.circle
              cx="150"
              cy="150"
              r="10"
              style={{
                x: pupilX,
                y: pupilY,
                originX: "150px",
                originY: "150px",
              }}
              animate={{ scaleY: isBlinking ? 0.1 : 1 }}
              transition={
                isBlinking
                  ? { duration: 0.1, ease: "easeOut" }
                  : { type: "spring", stiffness: 250, damping: 25 }
              }
              fill="var(--color-primary)"
              opacity="0.8"
            />
          </motion.g>
        </svg>
      </div>

      <div
        className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest opacity-60"
        style={{ color: "var(--color-text-secondary)" }}
      >
        <Cpu size={14} />
        <span>Embodied AI / AI4S</span>
        <Network size={14} />
      </div>
    </div>
  );
}

export default function Footer() {
  const lang = useStore($lang);

  return (
    <footer className="relative overflow-hidden px-4 pb-8 pt-4 sm:px-6">
      <div className="surface-panel relative mx-auto max-w-7xl overflow-hidden px-6 py-16 sm:px-8">
        <div className="mesh-overlay opacity-35" />

        <div className="relative z-10 flex flex-col items-center justify-center gap-10">
          <EmbodiedAICore />

          <div
            className="h-px w-full opacity-20"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--color-primary), transparent)",
            }}
          />

          <div className="flex w-full flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-5">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-3 transition-all duration-300 hover:-translate-y-1 hover:scale-110"
                style={{
                  color: "var(--color-text-secondary)",
                  backgroundColor:
                    "color-mix(in srgb, var(--color-bg-card) 92%, transparent)",
                  border: "1px solid var(--color-border)",
                }}
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="rounded-full p-3 transition-all duration-300 hover:-translate-y-1 hover:scale-110"
                style={{
                  color: "var(--color-text-secondary)",
                  backgroundColor:
                    "color-mix(in srgb, var(--color-bg-card) 92%, transparent)",
                  border: "1px solid var(--color-border)",
                }}
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>

            <div
              className="flex flex-col items-center gap-2 text-sm md:items-end"
              style={{ color: "var(--color-text-muted)" }}
            >
              <span
                className="font-medium"
                style={{ color: "var(--color-text-primary)" }}
              >
                {profile.realName?.[lang] ?? profile.name[lang]}
              </span>
              <VisitCounter pagePath="/" showTotal={true} />
              <span>{ui.footer.builtWith[lang]}</span>
              <span>{ui.footer.copyright[lang]}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
