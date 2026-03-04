/**
 * A subtle circuit / data-flow line divider between sections.
 * Purely decorative – represents data flowing through an embodied agent's system.
 */
export default function CircuitDivider() {
  return (
    <div
      className="relative w-full py-2 overflow-hidden select-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 32"
        preserveAspectRatio="none"
        className="w-full h-8"
        fill="none"
      >
        {/* Main horizontal line */}
        <line
          x1="0"
          y1="16"
          x2="1200"
          y2="16"
          stroke="var(--color-border)"
          strokeWidth="1"
          strokeDasharray="6 4"
        />
        {/* Circuit nodes */}
        {[120, 360, 600, 840, 1080].map((cx, i) => (
          <g key={cx}>
            <circle
              cx={cx}
              cy="16"
              r="3"
              fill="var(--color-primary)"
              opacity="0.5"
            >
              <animate
                attributeName="opacity"
                values="0.3;0.8;0.3"
                dur={`${2 + i * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx={cx}
              cy="16"
              r="6"
              stroke="var(--color-primary)"
              strokeWidth="0.5"
              fill="none"
              opacity="0.2"
            >
              <animate
                attributeName="r"
                values="6;10;6"
                dur={`${2 + i * 0.3}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.2;0;0.2"
                dur={`${2 + i * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
        {/* Traveling pulse */}
        <circle cx="0" cy="16" r="2" fill="var(--color-accent)" opacity="0.7">
          <animate
            attributeName="cx"
            values="0;1200"
            dur="4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;0.8;0"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}
