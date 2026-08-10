import { Footer } from './components/Footer.jsx';
import { SideNav } from './components/SideNav.jsx';
import { useScrollReveal } from './hooks/useScrollReveal.js';
import { Contato } from './sections/Contato.jsx';
import { Hero } from './sections/Hero.jsx';
import { Programacao } from './sections/Programacao.jsx';
import { Sobre } from './sections/Sobre.jsx';

function App() {
  useScrollReveal();

  return (
    <>
      <SideNav />
      <main>
        <Hero />
        <Sobre />
        <Programacao />
        <Contato />
      </main>
      <Footer />
    </>
  );
}

export default App;
