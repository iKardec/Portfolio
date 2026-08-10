/**
 * SkillItem - Item individual de habilidade com ícone e nome
 *
 * @param {Object} props
 * @param {string} props.icon  - Classe Font Awesome do ícone
 * @param {string} props.label - Nome da habilidade
 */
export function SkillItem({ icon, label }) {
  return (
    <div className="skill-item">
      <span className="skill-icon">
        <i className={icon} />
      </span>
      <span className="skill-name">{label}</span>
    </div>
  );
}
