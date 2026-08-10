/**
 * SectionHeader - Cabeçalho padrão de cada seção do portfólio
 *
 * Renderiza o ícone circular laranja + título + subtítulo
 * que aparece no topo de cada seção.
 *
 * @param {Object}  props
 * @param {string}  props.icon       - Classe Font Awesome (ex: "fas fa-user")
 * @param {string}  props.title      - Título principal da seção
 * @param {string}  props.subtitle   - Subtítulo descritivo
 * @param {boolean} [props.center]   - Se true, centraliza o header (usado em Contato)
 * @param {string}  [props.titleId]  - ID para associar o título à seção
 */
export function SectionHeader({ icon, title, subtitle, center = false, titleId }) {
  return (
    <div
      className="section-icon-header reveal"
      style={center ? { justifyContent: 'center' } : undefined}
    >
      <div className="section-icon-circle">
        <i className={icon} aria-hidden="true" />
      </div>
      <div style={center ? { textAlign: 'center' } : undefined}>
        <h2 id={titleId}>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}
