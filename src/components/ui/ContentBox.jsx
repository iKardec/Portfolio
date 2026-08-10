/**
 * ContentBox - Container com efeito glassmorphism
 *
 * Wrapper genérico com fundo de vidro e blur. Usado em seções
 * para agrupar conteúdo de competências técnicas.
 *
 * @param {Object}    props
 * @param {ReactNode} props.children - Conteúdo interno
 * @param {string}    [props.className] - Classes CSS adicionais
 */
export function ContentBox({ children, className = '' }) {
  return (
    <div className={`content-box reveal ${className}`}>
      {children}
    </div>
  );
}
