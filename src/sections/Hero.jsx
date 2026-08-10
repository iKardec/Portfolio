import heroImage from '../assets/hero.jpg';
import heroImageWebp from '../assets/hero.webp';
import { heroData } from '../data/portfolio.js';

export function Hero() {
  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <div className="hero-content">
        <picture>
          <source srcSet={heroImageWebp} type="image/webp" />
          <img
            src={heroImage}
            alt="Alan Kardec Lima Campos Júnior"
            className="hero-avatar"
            width="180"
            height="180"
            fetchPriority="high"
          />
        </picture>

        <h1 id="hero-title" className="hero-title">{heroData.title}</h1>
        <p className="hero-subtitle">{heroData.subtitle}</p>

        <div className="hero-badges" aria-label="Áreas de atuação">
          {heroData.badges.map(({ label, icon }) => (
            <span key={label} className="hero-badge">
              <i className={icon} aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>

        <div className="hero-cta">
          {heroData.ctas.map(({ label, icon, href, download, variant }) => (
            <a
              key={label}
              href={href}
              download={download || undefined}
              target="_blank"
              rel="noreferrer"
              className={`btn ${variant}`}
            >
              <i className={icon} aria-hidden="true" />
              {label}
            </a>
          ))}
        </div>
      </div>

      <a href="#sobre" className="scroll-indicator" aria-label="Ir para a seção Sobre Mim">
        <span>Role para explorar</span>
        <i className="fas fa-chevron-down" aria-hidden="true" />
      </a>
    </section>
  );
}
