import type { ReactNode } from "react";
import {
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Lightbulb,
  Quote,
} from "lucide-react";

type CalloutType = "info" | "warning" | "success" | "error" | "tip" | "quote";

const config: Record<
  CalloutType,
  {
    icon: typeof Info;
    color: string;
    bg: string;
    border: string;
    label: string;
  }
> = {
  info: {
    icon: Info,
    color: "var(--color-primary)",
    bg: "rgba(99, 102, 241, 0.06)",
    border: "rgba(99, 102, 241, 0.3)",
    label: "Info",
  },
  warning: {
    icon: AlertTriangle,
    color: "#f59e0b",
    bg: "rgba(245, 158, 11, 0.06)",
    border: "rgba(245, 158, 11, 0.3)",
    label: "Warning",
  },
  success: {
    icon: CheckCircle,
    color: "#10b981",
    bg: "rgba(16, 185, 129, 0.06)",
    border: "rgba(16, 185, 129, 0.3)",
    label: "Success",
  },
  error: {
    icon: XCircle,
    color: "#ef4444",
    bg: "rgba(239, 68, 68, 0.06)",
    border: "rgba(239, 68, 68, 0.3)",
    label: "Error",
  },
  tip: {
    icon: Lightbulb,
    color: "var(--color-accent)",
    bg: "rgba(6, 182, 212, 0.06)",
    border: "rgba(6, 182, 212, 0.3)",
    label: "Tip",
  },
  quote: {
    icon: Quote,
    color: "var(--color-text-muted)",
    bg: "rgba(148, 163, 184, 0.06)",
    border: "rgba(148, 163, 184, 0.3)",
    label: "Quote",
  },
};

interface Props {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

export default function Callout({ type = "info", title, children }: Props) {
  const c = config[type];
  const Icon = c.icon;

  return (
    <div
      className="my-6 rounded-lg px-5 py-4 not-prose"
      style={{
        background: c.bg,
        borderLeft: `3px solid ${c.border}`,
      }}
    >
      <div
        className="flex items-center gap-2 mb-2 font-semibold text-sm"
        style={{ color: c.color }}
      >
        <Icon size={16} />
        <span>{title || c.label}</span>
      </div>
      <div
        className="text-sm leading-relaxed"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {children}
      </div>
    </div>
  );
}
