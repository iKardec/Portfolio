/**
 * ============================================================================
 * sections/Programacao.jsx - Seção Programação e T.I
 * ============================================================================
 * Apresenta o histórico em programação, grid de tecnologias dominadas
 * e link para o GitHub.
 * ============================================================================
 */

import { SectionHeader } from '../components/ui/SectionHeader.jsx';
import { TechCard } from '../components/ui/TechCard.jsx';
import { programacaoData } from '../data/portfolio.js';

/** Seção Programação e T.I */
export function Programacao() {
  return (
    <section id="programacao" className="portfolio-section" aria-labelledby="programacao-title">
      <div className="container">

        <SectionHeader
          icon="fas fa-code"
          title="Programação e T.I"
          subtitle="Desenvolvimento Front-End e automações"
          titleId="programacao-title"
        />

        {/* Texto introdutório */}
        <div
          className="intro-text reveal"
          dangerouslySetInnerHTML={{ __html: programacaoData.intro }}
        />

        {/* Grid de tecnologias */}
        <div className="programming-tech-grid">
          {programacaoData.tecnologias.map(({ icon, title, desc }) => (
            <TechCard key={title} icon={icon} title={title} desc={desc} />
          ))}
        </div>

        {/* Link externo para GitHub */}
        <div className="section-actions mt-2xl reveal">
          <a
            href={programacaoData.githubHref}
            target="_blank"
            rel="noopener"
            className="external-link"
          >
            <i className="fab fa-github" /> Ver Projetos no GitHub
          </a>
        </div>

      </div>
    </section>
  );
}
