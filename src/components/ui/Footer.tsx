import { useStore } from "@nanostores/react";
import { $lang } from "@/i18n/store";
import { ui } from "@/i18n/ui";
import { Github, Mail, Cpu, Network } from "lucide-react";
import { profile } from "@/data/profile";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  animate,
} from "framer-motion";
import { useEffect, useState } from "react";
import VisitCounter from "@/components/blog/VisitCounter";

function EmbodiedAICore() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position relative to window center (-1 to 1)
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const springConfig = { damping: 25, stiffness: 150 };

  // Eye movement range (adjust multiplier for sensitivity)
  const eyeX = useSpring(
    useTransform(mouseX, [-1, 1], [-20, 20]),
    springConfig,
  );
  const eyeY = useSpring(
    useTransform(mouseY, [-1, 1], [-20, 20]),
    springConfig,
  );

  // Blinking effect
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);

      const nextBlink = Math.random() * 5000 + 3000; // Blink every 3-8 seconds
      timeoutId = setTimeout(triggerBlink, nextBlink);
    };

    timeoutId = setTimeout(triggerBlink, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  // Pupil movement (moves slightly more than the eye to create looking effect)
  const pupilX = useTransform(eyeX, (x) => x * 1.5);
  const pupilY = useTransform(eyeY, (y) => y * 1.5);

  // Path deformation
  const pathD = useTransform([eyeX, eyeY], ([x, y]) => {
    const p1 = [33.15, 133.58];
    const p2 = [92.0, 92.0];
    const p3_base = [150.0, 116.0];
    const p4 = [208.0, 92.0];
    const p5 = [266.85, 133.58];

    const p3 = [p3_base[0] + x, p3_base[1] + y];

    return `M ${p1[0]} ${p1[1]} L ${p2[0]} ${p2[1]} L ${p3[0]} ${p3[1]} L ${p4[0]} ${p4[1]} L ${p5[0]} ${p5[1]}`;
  });

  return (
    <div className="flex flex-col items-center gap-4 group">
      <div className="relative w-32 h-32 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
        {/* Interactive SVG Avatar */}
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
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer Ring (Static or slight rotation could be added) */}
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
            {/* Connecting Lines */}
            <motion.path
              d={pathD}
              stroke="url(#avatar-gradient)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* The Eye (Inner Circle) */}
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

            {/* Pupil inside the eye for extra detail */}
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
        className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase opacity-60"
        style={{ color: "var(--color-text-secondary)" }}
      >
        <Cpu size={14} />
        <span>Embodied AI Core</span>
        <Network size={14} />
      </div>
    </div>
  );
}

export default function Footer() {
  const lang = useStore($lang);

  return (
    <footer
      className="border-t relative overflow-hidden"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-bg-secondary)",
      }}
    >
      {/* Background decorative elements */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, var(--color-primary) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 relative z-10">
        <div className="flex flex-col items-center justify-center gap-10">
          {/* Interactive Embodied AI Element */}
          <EmbodiedAICore />

          <div
            className="w-full h-px opacity-20"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--color-primary), transparent)",
            }}
          />

          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-5">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                style={{
                  color: "var(--color-text-secondary)",
                  backgroundColor: "var(--color-bg-primary)",
                  border: "1px solid var(--color-border)",
                }}
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="p-3 rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                style={{
                  color: "var(--color-text-secondary)",
                  backgroundColor: "var(--color-bg-primary)",
                  border: "1px solid var(--color-border)",
                }}
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>

            {/* Info */}
            <div
              className="flex flex-col items-center md:items-end gap-2 text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              <span
                className="font-medium"
                style={{ color: "var(--color-text-primary)" }}
              >
                {profile.name[lang]}
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
