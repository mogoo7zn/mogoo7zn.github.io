interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const isCentered = align === "center";

  return (
    <div
      className={`section-header ${isCentered ? "text-center items-center mx-auto" : "items-start"} ${className}`}
    >
      <div
        aria-hidden="true"
        className={`section-header-art ${isCentered ? "section-header-art-center" : ""}`}
      >
        <span className="section-art-line" />
        <span className="section-art-dot" />
        <span className="section-art-ring" />
      </div>
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <h2 className="section-title">{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
