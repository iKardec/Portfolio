/** Seção que apresenta experiências em atendimento e competências administrativas. */

import { CompactCard } from '../components/ui/CompactCard.jsx';
import { ContentBox } from '../components/ui/ContentBox.jsx';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';
import { SkillTags } from '../components/ui/SkillTags.jsx';
import { experienciaData } from '../data/portfolio.js';

export function Experiencia() {
  return (
    <section id="experiencia" className="portfolio-section" aria-labelledby="experiencia-title">
      <div className="container">
        <SectionHeader
          icon="fas fa-briefcase"
          title="Experiências Diversas"
          subtitle="Gastronomia, atendimento e administração"
          titleId="experiencia-title"
        />

        <div className="two-column-grid">
          <div>
            {experienciaData.experiences.map((experience, index) => (
              <div key={experience.title} className={index > 0 ? 'mt-lg' : undefined}>
                <CompactCard {...experience} />
              </div>
            ))}
          </div>

          <ContentBox>
            <h3 className="info-block-title">
              <i className="fas fa-clipboard-list" aria-hidden="true" />
              Área Administrativa
            </h3>
            <p className="compact-card-body mb-lg">{experienciaData.adminText}</p>
            <SkillTags tags={experienciaData.adminSkills} />

            <div className="section-actions mt-xl">
              <a
                href={experienciaData.curriculoHref}
                download
                target="_blank"
                rel="noreferrer"
                className="download-btn"
              >
                <i className="fas fa-file-pdf" aria-hidden="true" />
                Currículo Atendimento
              </a>
            </div>
          </ContentBox>
        </div>
      </div>
    </section>
  );
}
