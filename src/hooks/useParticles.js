import { useEffect } from 'react';
import { ParticleSystem } from '../utils/particles.js';

export function useParticles() {
  useEffect(() => {
    // Respeita a preferência de acessibilidade
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const system = new ParticleSystem('particles-canvas');

    // Cleanup: remove o canvas ao desmontar o componente
    return () => system.destroy();
  }, []);
}
