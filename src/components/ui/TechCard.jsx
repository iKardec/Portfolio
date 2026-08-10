/**
 * TechCard - Card de tecnologia com ícone, nome e descrição
 *
 * Usado na seção de Programação para exibir as tecnologias dominadas.
 * Suporta o efeito tilt 3D via data-tilt.
 *
 * @param {Object} props
 * @param {string} props.icon  - Classe Font Awesome do ícone
 * @param {string} props.title - Nome da tecnologia
 * @param {string} props.desc  - Descrição breve
 */
export function TechCard({ icon, title, desc }) {
  return (
    <div className="programming-tech-card reveal" data-tilt>
      <i className={icon} />
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  );
}
