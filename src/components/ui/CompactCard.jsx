/**
 * CompactCard - Card compacto com ícone, título, subtítulo e corpo
 *
 * Usado nas seções de Engenharia e Experiências para exibir
 * experiências profissionais. Suporta o efeito tilt 3D via data-tilt.
 *
 * @param {Object} props
 * @param {string} props.icon     - Classe Font Awesome do ícone
 * @param {string} props.title    - Título (nome da empresa/cargo)
 * @param {string} props.subtitle - Subtítulo (período/cargo)
 * @param {string} props.body     - Texto descritivo
 */
export function CompactCard({ icon, title, subtitle, body }) {
  return (
    <div className="compact-card reveal" data-tilt>
      <div className="compact-card-header">
        <div className="compact-card-icon">
          <i className={icon} />
        </div>
        <div>
          <div className="compact-card-title">{title}</div>
          <div className="compact-card-subtitle">{subtitle}</div>
        </div>
      </div>
      <div className="compact-card-body">{body}</div>
    </div>
  );
}
