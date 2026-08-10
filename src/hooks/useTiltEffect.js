/**
 * ============================================================================
 * hooks/useTiltEffect.js - Efeito 3D Tilt em Cards
 * ============================================================================
 * Hook React que aplica o efeito de inclinação 3D (Tilt) a todos os elementos
 * com o atributo [data-tilt] no DOM. Baseado na classe TiltEffect do BASE.
 * ============================================================================
 */

import { useEffect } from 'react';
import { AnimationConfig } from '../utils/animations.js';

/**
 * Aplica o efeito tilt 3D em todos os elementos [data-tilt].
 * Não funciona em dispositivos touch.
 *
 * @example
 * // Em App.jsx:
 * useTiltEffect();
 *
 * // Em qualquer JSX:
 * <div data-tilt className="compact-card">...</div>
 */
export function useTiltEffect() {
  useEffect(() => {
    // Não aplica em dispositivos touch
    if ('ontouchstart' in window) return;

    const { maxTilt, perspective, scale, speed, glare, maxGlare } =
      AnimationConfig.tilt;

    const elements = document.querySelectorAll('[data-tilt]');
    const cleanups = [];

    elements.forEach((element) => {
      // Configura estilos base
      element.style.transformStyle = 'preserve-3d';
      element.style.transition = `transform ${speed}ms ease`;

      // Cria o elemento de glare
      let glareEl = null;
      if (glare) {
        glareEl = document.createElement('div');
        glareEl.className = 'tilt-glare';
        glareEl.style.cssText = `
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          background: linear-gradient(135deg, rgba(255,255,255,${maxGlare}) 0%, transparent 50%);
          opacity: 0;
          transition: opacity ${speed}ms ease;
        `;
        const pos = window.getComputedStyle(element).position;
        if (pos === 'static') element.style.position = 'relative';
        element.appendChild(glareEl);
      }

      // ---- Handlers --------------------------------------------------------
      const onMouseEnter = () => {
        element.style.transition = `transform ${speed}ms ease`;
        if (glareEl) glareEl.style.opacity = '1';
      };

      const onMouseMove = (e) => {
        const rect = element.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const tiltX = (maxTilt * 2 * y - maxTilt) * -1;
        const tiltY = maxTilt * 2 * x - maxTilt;

        element.style.transform = `
          perspective(${perspective}px)
          rotateX(${tiltX}deg)
          rotateY(${tiltY}deg)
          scale(${scale})
        `;

        if (glareEl) {
          const angle = Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI) + 135;
          glareEl.style.background = `
            linear-gradient(${angle}deg, rgba(255,255,255,${maxGlare}) 0%, transparent 50%)
          `;
        }
      };

      const onMouseLeave = () => {
        element.style.transform = `
          perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)
        `;
        if (glareEl) glareEl.style.opacity = '0';
      };

      element.addEventListener('mouseenter', onMouseEnter);
      element.addEventListener('mousemove', onMouseMove);
      element.addEventListener('mouseleave', onMouseLeave);

      // Registra cleanup para este elemento
      cleanups.push(() => {
        element.removeEventListener('mouseenter', onMouseEnter);
        element.removeEventListener('mousemove', onMouseMove);
        element.removeEventListener('mouseleave', onMouseLeave);
        if (glareEl) glareEl.remove();
      });
    });

    // Cleanup geral ao desmontar
    return () => cleanups.forEach((fn) => fn());
  }, []);
}
