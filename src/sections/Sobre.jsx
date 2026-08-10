import { SectionHeader } from '../components/SectionHeader.jsx';
import { SkillTags } from '../components/SkillTags.jsx';
import { sobreData } from '../data/portfolio.js';

export function Sobre() {
  return (
    <section id="sobre" className="portfolio-section">
      <SectionHeader eyebrow="Quem sou" title="Sobre Mim" />

      <div className="glass-card reveal">
        {sobreData.paragraphs.map((paragraph, index) => (
          <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
        ))}

        <SkillTags items={sobreData.skills} />
      </div>
    </section>
  );
}
