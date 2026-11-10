import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useReducedMotion } from "framer-motion";

/**
 * A minimalist wireframe drone that hovers at the bottom-right
 * and "flies" to the top of the page on click.
 */
export default function DroneBackToTop() {
  const reducedMotion = useReducedMotion();
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const [visible, setVisible] = useState(false);
  const [flying, setFlying] = useState(false);
  const { scrollYProgress } = useScroll();
  const droneRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setVisible(v > 0.08);
    });
    return unsub;
  }, [scrollYProgress]);

  const handleClick = () => {
    if (flying) return;
    if (reducedMotion) { window.scrollTo({ top: 0, behavior: "instant" }); return; }
    setFlying(true);
    // Start the flight animation, then scroll
    timers.current.push(setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 200));
    // Reset after flight finishes
    timers.current.push(setTimeout(() => {
      setFlying(false);
    }, 1200));
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          ref={droneRef}
          onClick={handleClick}
          initial={{ opacity: 0, y: 40, scale: 0.6 }}
          animate={
            flying
              ? { opacity: 0, y: -800, scale: 0.3, rotate: -10 }
              : { opacity: 1, y: 0, scale: 1, rotate: 0 }
          }
          exit={{ opacity: 0, y: 40, scale: 0.6 }}
          transition={
            flying
              ? { duration: 1, ease: [0.22, 1, 0.36, 1] }
              : { duration: 0.4, ease: "easeOut" }
          }
          className="drone-back-to-top fixed bottom-5 right-4 sm:bottom-8 sm:right-8 z-50 cursor-pointer"
          style={{ filter: "drop-shadow(0 2px 12px var(--color-glow))" }}
          aria-label="Back to top"
          title="Back to top"
        >
          <div className="relative w-14 h-14 flex items-center justify-center">
            {/* Drone SVG */}
            <svg
              viewBox="0 0 64 64"
              width="48"
              height="48"
              fill="none"
              className="relative z-10"
            >
              {/* Propeller arms */}
              <line
                x1="14"
                y1="22"
                x2="50"
                y2="22"
                stroke="var(--color-primary)"
                strokeWidth="1.5"
                opacity="0.6"
              />
              <line
                x1="20"
                y1="22"
                x2="20"
                y2="36"
                stroke="var(--color-primary)"
                strokeWidth="1.5"
                opacity="0.5"
              />
              <line
                x1="44"
                y1="22"
                x2="44"
                y2="36"
                stroke="var(--color-primary)"
                strokeWidth="1.5"
                opacity="0.5"
              />
              {/* Body */}
              <rect
                x="24"
                y="28"
                width="16"
                height="12"
                rx="3"
                stroke="var(--color-primary)"
                strokeWidth="1.8"
                opacity="0.8"
              />
              {/* Inner core */}
              <rect
                x="28"
                y="31"
                width="8"
                height="6"
                rx="1.5"
                stroke="var(--color-accent)"
                strokeWidth="1"
                opacity="0.5"
              />
              {/* Eye / sensor */}
              <circle
                cx="32"
                cy="34"
                r="2"
                fill="var(--color-accent)"
                opacity="0.9"
              >
              </circle>
              {/* Left propeller */}
              <ellipse
                cx="14"
                cy="22"
                rx="10"
                ry="2"
                stroke="var(--color-accent)"
                strokeWidth="1"
                opacity="0.5"
              >
              </ellipse>
              {/* Right propeller */}
              <ellipse
                cx="50"
                cy="22"
                rx="10"
                ry="2"
                stroke="var(--color-accent)"
                strokeWidth="1"
                opacity="0.5"
              >
              </ellipse>
              {/* Landing gear */}
              <line
                x1="26"
                y1="40"
                x2="22"
                y2="46"
                stroke="var(--color-primary)"
                strokeWidth="1.2"
                opacity="0.4"
              />
              <line
                x1="38"
                y1="40"
                x2="42"
                y2="46"
                stroke="var(--color-primary)"
                strokeWidth="1.2"
                opacity="0.4"
              />
              <line
                x1="20"
                y1="46"
                x2="24"
                y2="46"
                stroke="var(--color-primary)"
                strokeWidth="1.2"
                opacity="0.4"
              />
              <line
                x1="40"
                y1="46"
                x2="44"
                y2="46"
                stroke="var(--color-primary)"
                strokeWidth="1.2"
                opacity="0.4"
              />
              {/* Signal waves when hovering */}
              <circle
                cx="32"
                cy="50"
                r="3"
                stroke="var(--color-accent)"
                strokeWidth="0.8"
                fill="none"
                opacity="0"
              >
              </circle>
              <circle
                cx="32"
                cy="50"
                r="3"
                stroke="var(--color-accent)"
                strokeWidth="0.8"
                fill="none"
                opacity="0"
              >
              </circle>
            </svg>
            {/* Hover float animation */}
            <style>{`
              .drone-back-to-top:not(:active) svg {
                animation: drone-hover 2.5s ease-in-out infinite;
              }
              @keyframes drone-hover {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-4px); }
              }
            `}</style>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
