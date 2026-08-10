/**
 * ============================================================================
 * sections/Contato.jsx - Seção de Contato
 * ============================================================================
 * Cards clicáveis para GitHub, E-mail, LinkedIn e WhatsApp.
 * Seção centralizada com espaçamento reduzido.
 * ============================================================================
 */

import { SectionHeader } from '../components/ui/SectionHeader.jsx';
import { contatoData } from '../data/portfolio.js';

/** Seção Contato */
export function Contato() {
  return (
    <section id="contato" className="portfolio-section contact-section" aria-labelledby="contato-title">
      <div className="container">

        <SectionHeader
          icon="fas fa-paper-plane"
          title="Vamos Conversar?"
          subtitle="Entre em contato para oportunidades e projetos"
          center
          titleId="contato-title"
        />

        {/* Links de contato */}
        <div className="contact-links reveal">
          {contatoData.links.map(({ icon, label, href }) => {
            const isExternal = href.startsWith('http');

            return (
            <a
              key={label}
              href={href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noreferrer' : undefined}
              className="contact-link"
            >
              <i className={icon} aria-hidden="true" />
              <span>{label}</span>
            </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
