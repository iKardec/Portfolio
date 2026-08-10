/**
 * SkillTags - Lista de tags de competências
 *
 * Renderiza um array de strings como badges de skill.
 *
 * @param {Object}   props
 * @param {string[]} props.tags - Array de labels de competências
 */
export function SkillTags({ tags }) {
  return (
    <div className="skill-tags">
      {tags.map((tag) => (
        <span key={tag} className="skill-tag">
          {tag}
        </span>
      ))}
    </div>
  );
}
