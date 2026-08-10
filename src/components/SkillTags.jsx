export function SkillTags({ items }) {
  return (
    <ul className="skill-tags">
      {items.map((item) => (
        <li key={item.icon ?? item.label ?? item} className="skill-tag">
          {item.icon && <i className={item.icon} aria-hidden="true" />}
          <span>{item.label ?? item}</span>
        </li>
      ))}
    </ul>
  );
}
