/**
 * ============================================================================
 * hooks/useParticles.js - Sistema de Partículas Animadas
 * ============================================================================
 * Hook React que inicializa e destrói o ParticleSystem via useEffect.
 * Respeita a preferência de movimento reduzido (prefers-reduced-motion).
 * ============================================================================
 */

import { useEffect } from 'react';
import { ParticleSystem } from '../utils/particles.js';

/**
 * Inicializa o sistema de partículas no background.
 * Deve ser chamado uma única vez no componente raiz (App).
 *
 * @example
 * // Em App.jsx:
 * useParticles();
 */
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
