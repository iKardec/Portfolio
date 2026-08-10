export function SectionHeader({ eyebrow, title }) {
  return (
    <header className="section-header reveal">
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <h2 className="section-title">{title}</h2>
    </header>
  );
}
