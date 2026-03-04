import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for window load + a minimum display time
    const minTime = new Promise((r) => setTimeout(r, 1200));
    const loaded = new Promise<void>((r) => {
      if (document.readyState === "complete") r();
      else window.addEventListener("load", () => r(), { once: true });
    });

    Promise.all([minTime, loaded]).then(() => setIsLoading(false));
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ backgroundColor: "var(--color-bg)" }}
        >
          {/* Custom logo loading animation */}
          <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 300 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.3)]"
            >
              <defs>
                <linearGradient
                  id="loading-gradient"
                  x1="0"
                  y1="0"
                  x2="300"
                  y2="300"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="var(--color-primary)">
                    <animate
                      attributeName="stop-color"
                      values="var(--color-primary);var(--color-accent);var(--color-primary)"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </stop>
                  <stop offset="1" stopColor="var(--color-accent)">
                    <animate
                      attributeName="stop-color"
                      values="var(--color-accent);var(--color-primary);var(--color-accent)"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </stop>
                </linearGradient>
              </defs>

              {/* Central Circle - Solid initially, then outlines */}
              <motion.circle
                cx="150"
                cy="150"
                r="34"
                stroke="url(#loading-gradient)"
                strokeWidth="16"
                fill="var(--color-primary)"
                initial={{ fillOpacity: 1 }}
                animate={{ fillOpacity: 0 }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 0.5,
                }}
              />

              {/* Left Wing (Flowing out from center) */}
              <motion.path
                d="M 150 116 L 92 92 L 33.15 133.58"
                stroke="url(#loading-gradient)"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 0.5,
                }}
              />

              {/* Right Wing (Flowing out from center) */}
              <motion.path
                d="M 150 116 L 208 92 L 266.85 133.58"
                stroke="url(#loading-gradient)"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 0.5,
                }}
              />
            </svg>
          </div>

          {/* Loading text */}
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-mono tracking-widest uppercase"
              style={{ color: "var(--color-text-muted)" }}
            >
              Initializing
            </span>
            <span className="flex gap-0.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1 h-1 rounded-full animate-bounce"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
