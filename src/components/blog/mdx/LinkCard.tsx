import { ExternalLink } from "lucide-react";

interface Props {
  href: string;
  title: string;
  description?: string;
}

export default function LinkCard({ href, title, description }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="my-4 flex items-center gap-4 rounded-lg border px-5 py-4 not-prose transition-all duration-200 hover:shadow-md group"
      style={{
        borderColor: "var(--color-border)",
        background: "var(--color-bg-secondary)",
      }}
    >
      <div className="flex-1 min-w-0">
        <div
          className="font-semibold text-sm truncate group-hover:underline"
          style={{ color: "var(--color-primary)" }}
        >
          {title}
        </div>
        {description && (
          <div
            className="text-xs mt-1 truncate"
            style={{ color: "var(--color-text-muted)" }}
          >
            {description}
          </div>
        )}
        <div
          className="text-xs mt-1 truncate"
          style={{ color: "var(--color-text-muted)", opacity: 0.6 }}
        >
          {href}
        </div>
      </div>
      <ExternalLink
        size={16}
        style={{ color: "var(--color-text-muted)" }}
        className="shrink-0"
      />
    </a>
  );
}
