import type { ReactNode } from "react";

interface StepProps {
  number?: number;
  title: string;
  children: ReactNode;
}

export function Step({ number, title, children }: StepProps) {
  return (
    <div className="flex gap-4 not-prose">
      <div className="flex flex-col items-center">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
          style={{
            background:
              "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
          }}
        >
          {number}
        </div>
        <div
          className="w-px flex-1 my-1"
          style={{ background: "var(--color-border)" }}
        />
      </div>
      <div className="pb-8 flex-1">
        <h4
          className="font-semibold text-base mb-2"
          style={{ color: "var(--color-text)" }}
        >
          {title}
        </h4>
        <div
          className="text-sm leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

interface StepsProps {
  children: ReactNode;
}

export default function Steps({ children }: StepsProps) {
  return <div className="my-6">{children}</div>;
}
