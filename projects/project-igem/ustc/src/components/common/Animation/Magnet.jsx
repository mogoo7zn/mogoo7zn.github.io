import { useEffect, useRef } from "react";

const resolvePadding = (padding) => {
  if (typeof padding === "string" && padding.endsWith("vw")) {
    const vw = parseFloat(padding);
    return (vw / 100) * window.innerWidth;
  }
  return Number(padding); // fallback: assume it's in px
};

const Magnet = ({
  children,
  padding = "5vw",
  disabled = false,
  magnetStrength = 2,
  a = 0.5,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.5s ease-in-out",
  wrapperClassName = "",
  innerClassName = "",
  ...props
}) => {
  const magnetRef = useRef(null);
  const innerRefs = [useRef(null), useRef(null)];
  const animationFrameRef = useRef(null);

  const updateTransforms = (x, y) => {
    if (innerRefs[0].current && innerRefs[1].current) {
      innerRefs[0].current.style.transform = `translate3d(${x * a}px, ${y * a}px, 0)`;
      innerRefs[1].current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
  };

  useEffect(() => {
  if (disabled) return;

  const handleMouseMove = (e) => {
    if (!magnetRef.current || !innerRefs[0].current || !innerRefs[1].current) return;

    const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distX = Math.abs(centerX - e.clientX);
    const distY = Math.abs(centerY - e.clientY);

    const paddingPx = resolvePadding(padding);

    if (distX < width / 2 + paddingPx && distY < height / 2 + paddingPx) {
      const offsetX = (e.clientX - centerX) / magnetStrength;
      const offsetY = (e.clientY - centerY) / magnetStrength;

      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = requestAnimationFrame(() => {
        updateTransforms(offsetX, offsetY);
      });

      innerRefs.forEach((ref) => {
        if (ref.current) ref.current.style.transition = activeTransition;
      });
    } else {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = requestAnimationFrame(() => {
        updateTransforms(0, 0);
      });

      innerRefs.forEach((ref) => {
        if (ref.current) ref.current.style.transition = inactiveTransition;
      });
    }
  };

  window.addEventListener("mousemove", handleMouseMove);
  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    cancelAnimationFrame(animationFrameRef.current);
  };
}, [padding, disabled, magnetStrength, a]);

  const childArray = Array.isArray(children) ? children : [children];

  return (
    <div
      ref={magnetRef}
      className={wrapperClassName}
      style={{ position: "relative", display: "inline-block" }}
      {...props}
    >
      {childArray.slice(0, 2).map((child, index) => (
        <div
          key={index}
          ref={innerRefs[index]}
          className={innerClassName}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transform: `translate3d(0, 0, 0)`,
            willChange: "transform",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default Magnet;
