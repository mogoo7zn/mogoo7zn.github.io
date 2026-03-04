import { useState, type ReactNode } from "react";

interface TabItem {
  label: string;
  children: ReactNode;
}

interface Props {
  items: TabItem[];
}

export default function Tabs({ items }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className="my-6 not-prose">
      <div
        className="flex border-b"
        style={{ borderColor: "var(--color-border)" }}
      >
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="px-4 py-2 text-sm font-medium transition-colors relative"
            style={{
              color:
                active === i
                  ? "var(--color-primary)"
                  : "var(--color-text-muted)",
            }}
          >
            {item.label}
            {active === i && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: "var(--color-primary)" }}
              />
            )}
          </button>
        ))}
      </div>
      <div
        className="pt-4 text-sm leading-relaxed"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {items[active]?.children}
      </div>
    </div>
  );
}
