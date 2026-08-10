import { SectionHeader } from '../components/SectionHeader.jsx';
import { TechCard } from '../components/TechCard.jsx';
import { ProjectCard } from '../components/ProjectCard.jsx';
import { programacaoData } from '../data/portfolio.js';

export function Programacao() {
  return (
    <section id="programacao" className="portfolio-section">
      <SectionHeader eyebrow="O que eu faço" title="Programação" />

      <p
        className="section-intro reveal"
        dangerouslySetInnerHTML={{ __html: programacaoData.intro }}
      />

      <div className="tech-grid">
        {programacaoData.tecnologias.map((tech) => (
          <TechCard key={tech.title} {...tech} />
        ))}
      </div>

      <h3 className="subsection-title reveal">Projetos</h3>
      <div className="project-grid">
        {programacaoData.projetos.map((projeto) => (
          <ProjectCard key={projeto.title} {...projeto} />
        ))}
      </div>

      <a
        href={programacaoData.githubHref}
        target="_blank"
        rel="noreferrer"
        className="btn btn-outline reveal"
      >
        <i className="fab fa-github" aria-hidden="true" />
        Ver mais no GitHub
      </a>
    </section>
  );
}
