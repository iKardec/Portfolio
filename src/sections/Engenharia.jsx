/** Seção que reúne a formação e as experiências em engenharia civil. */

import { CompactCard } from '../components/ui/CompactCard.jsx';
import { ContentBox } from '../components/ui/ContentBox.jsx';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';
import { SkillTags } from '../components/ui/SkillTags.jsx';
import { engenhariaData } from '../data/portfolio.js';

export function Engenharia() {
  return (
    <section id="engenharia" className="portfolio-section" aria-labelledby="engenharia-title">
      <div className="container">
        <SectionHeader
          icon="fas fa-building"
          title="Engenharia Civil"
          subtitle="Formação técnica e experiência em projetos estruturais"
          titleId="engenharia-title"
        />

        <div className="two-column-grid">
          <div>
            {engenhariaData.experiences.map((experience, index) => (
              <div key={experience.title} className={index > 0 ? 'mt-lg' : undefined}>
                <CompactCard {...experience} />
              </div>
            ))}
          </div>

          <ContentBox>
            <h3 className="info-block-title">
              <i className="fas fa-tools" aria-hidden="true" />
              Competências Técnicas
            </h3>
            <SkillTags tags={engenhariaData.competencias} />

            <div className="section-actions mt-xl">
              <a
                href={engenhariaData.curriculoHref}
                download
                target="_blank"
                rel="noreferrer"
                className="download-btn"
              >
                <i className="fas fa-file-pdf" aria-hidden="true" />
                Baixar Currículo
              </a>
            </div>
          </ContentBox>
        </div>
      </div>
    </section>
  );
}
