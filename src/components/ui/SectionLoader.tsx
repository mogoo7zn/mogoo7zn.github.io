import { type ReactNode, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

const directionOffset = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
};

export default function SectionLoader({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [forceVisible, setForceVisible] = useState(false);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const offset = directionOffset[direction];
  const shouldShow = !hasMounted || isInView || forceVisible;

  useEffect(() => {
    setHasMounted(true);
    const fallbackTimer = window.setTimeout(() => setForceVisible(true), 1400);
    return () => window.clearTimeout(fallbackTimer);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={
        shouldShow
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: offset.x, y: offset.y }
      }
      transition={{
        duration: hasMounted ? 0.42 : 0,
        delay: shouldShow && isInView ? delay : 0,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
