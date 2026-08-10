/**
 * ============================================================================
 * SideNav - Navegação Lateral por Dots
 * ============================================================================
 * Barra de navegação lateral fixada no lado direito da tela.
 * Cada dot corresponde a uma seção e fica ativo via IntersectionObserver.
 *
 * Equivalente ao sidenav.js do projeto BASE.
 * ============================================================================
 */

import { useEffect } from 'react';
import { sideNavDots } from '../../data/portfolio.js';

/**
 * SideNav component
 *
 * Renderiza os dots laterais e registra o IntersectionObserver para
 * atualizar qual dot está ativo conforme o usuário rola a página.
 */
export function SideNav() {
  useEffect(() => {
    const dots = document.querySelectorAll('.side-nav-dot');
    const sections = document.querySelectorAll('.portfolio-section, .hero');

    if (!dots.length || !sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            dots.forEach((dot) => {
              dot.classList.toggle('active', dot.getAttribute('data-section') === id);
            });
          }
        });
      },
      { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleDotClick = (sectionId) => {
    const target = document.getElementById(sectionId);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="side-nav" aria-label="Navegação rápida">
      {sideNavDots.map(({ section, tooltip }, index) => (
        <button
          key={section}
          className={`side-nav-dot ${index === 0 ? 'active' : ''}`}
          data-section={section}
          data-tooltip={tooltip}
          aria-label={`Ir para ${tooltip}`}
          onClick={() => handleDotClick(section)}
        />
      ))}
    </nav>
  );
}
