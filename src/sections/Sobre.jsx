/**
 * ============================================================================
 * sections/Sobre.jsx - Seção "Sobre Mim"
 * ============================================================================
 * Apresenta um texto introdutório e um grid de informações pessoais
 * (formação, localização, idiomas).
 * ============================================================================
 */

import { SectionHeader } from '../components/ui/SectionHeader.jsx';
import { SkillItem } from '../components/ui/SkillItem.jsx';
import { sobreData } from '../data/portfolio.js';

/** Seção Sobre Mim */
export function Sobre() {
  return (
    <section id="sobre" className="portfolio-section" aria-labelledby="sobre-title">
      <div className="container">

        <SectionHeader
          icon="fas fa-user"
          title="Sobre Mim"
          subtitle="Profissional multidisciplinar em constante evolução"
          titleId="sobre-title"
        />

        <div className="two-column-grid">
          {/* Texto introdutório */}
          <div className="intro-text reveal">
            {sobreData.paragraphs.map((text, i) => (
              <p
                key={i}
                dangerouslySetInnerHTML={{ __html: text }}
                style={i > 0 ? { marginTop: '1rem' } : undefined}
              />
            ))}
          </div>

          {/* Grid de informações pessoais */}
          <div className="skills-grid reveal">
            {sobreData.skills.map(({ icon, label }) => (
              <SkillItem key={label} icon={icon} label={label} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
