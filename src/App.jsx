import { Footer } from './components/layout/Footer.jsx';
import { SideNav } from './components/layout/SideNav.jsx';
import { useParticles } from './hooks/useParticles.js';
import { useScrollReveal } from './hooks/useScrollReveal.js';
import { useTiltEffect } from './hooks/useTiltEffect.js';
import { Contato } from './sections/Contato.jsx';
import { Engenharia } from './sections/Engenharia.jsx';
import { Experiencia } from './sections/Experiencia.jsx';
import { Hero } from './sections/Hero.jsx';
import { Programacao } from './sections/Programacao.jsx';
import { Sobre } from './sections/Sobre.jsx';

function App() {
  useParticles();
  useScrollReveal();
  useTiltEffect();

  return (
    <>
      <SideNav />
      <main>
        <Hero />
        <Sobre />
        <Engenharia />
        <Programacao />
        <Experiencia />
        <Contato />
      </main>
      <Footer />
    </>
  );
}

export default App;
