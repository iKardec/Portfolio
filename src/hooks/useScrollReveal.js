/**
 * ============================================================================
 * hooks/useScrollReveal.js - Scroll Reveal via IntersectionObserver
 * ============================================================================
 * Hook React que encapsula o comportamento do ScrollReveal do projeto BASE.
 * Observa elementos com a classe `.reveal` e adiciona `.revealed` quando
 * eles entram no viewport.
 * ============================================================================
 */

import { useEffect } from 'react';
import { AnimationConfig } from '../utils/animations.js';

/**
 * Inicializa o IntersectionObserver para revelar elementos ao scroll.
 * Deve ser chamado uma única vez no componente raiz (App).
 *
 * @example
 * // Em App.jsx:
 * useScrollReveal();
 *
 * // Em qualquer JSX:
 * <div className="reveal">Conteúdo animado</div>
 */
export function useScrollReveal() {
  useEffect(() => {
    const { threshold, rootMargin } = AnimationConfig.reveal;
    const timeoutIds = new Set();

    // Fallback para navegadores sem suporte
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach((el) =>
        el.classList.add('revealed')
      );
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = Number(entry.target.getAttribute('data-reveal-delay')) || 0;
            const reveal = () => entry.target.classList.add('revealed');

            if (delay > 0) {
              const timeoutId = window.setTimeout(() => {
                reveal();
                timeoutIds.delete(timeoutId);
              }, delay);
              timeoutIds.add(timeoutId);
            } else {
              reveal();
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    // Observa todos os elementos com classe .reveal
    const observeAll = () => {
      document.querySelectorAll('.reveal:not(.revealed)').forEach((el) => {
        observer.observe(el);
      });
    };

    observeAll();

    // Cleanup ao desmontar
    return () => {
      observer.disconnect();
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, []);
}
