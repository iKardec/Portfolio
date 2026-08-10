import { SectionHeader } from '../components/SectionHeader.jsx';
import { contatoData } from '../data/portfolio.js';

export function Contato() {
  return (
    <section id="contato" className="portfolio-section">
      <SectionHeader eyebrow="Vamos conversar" title="Contato" />

      <div className="contact-links reveal">
        {contatoData.links.map(({ icon, label, href }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" className="glass-card contact-link">
            <i className={icon} aria-hidden="true" />
            <span>{label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
