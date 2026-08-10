export function TechCard({ icon, title, desc }) {
  return (
    <div className="glass-card tech-card reveal">
      <i className={icon} aria-hidden="true" />
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}
