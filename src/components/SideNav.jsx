import { useEffect, useRef, useState } from 'react';
import { sideNavDots } from '../data/portfolio.js';

export function SideNav() {
  const [activeSection, setActiveSection] = useState(sideNavDots[0].section);
  const sectionRefs = useRef({});

  useEffect(() => {
    sectionRefs.current = Object.fromEntries(
      sideNavDots.map(({ section }) => [section, document.getElementById(section)])
    );

    const sections = Object.values(sectionRefs.current).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleDotClick = (sectionId) => {
    sectionRefs.current[sectionId]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="side-nav" aria-label="Navegação rápida">
      {sideNavDots.map(({ section, tooltip }) => (
        <button
          key={section}
          type="button"
          className={`side-nav-dot ${activeSection === section ? 'active' : ''}`}
          data-tooltip={tooltip}
          aria-label={`Ir para ${tooltip}`}
          aria-current={activeSection === section ? 'true' : undefined}
          onClick={() => handleDotClick(section)}
        />
      ))}
    </nav>
  );
}
