/**
 * ============================================================================
 * utils/animations.js - Utilitários de Animação
 * ============================================================================
 * Funções utilitárias puras exportadas como ES Modules.
 * Extraídas do animations.js e main.js do projeto BASE.
 * ============================================================================
 */

// ============================================================================
// CONFIGURAÇÃO PADRÃO DE ANIMAÇÕES
// ============================================================================

/** Configurações padrão para o TypeWriter */
export const AnimationConfig = {
  typing: {
    speed: 100,              // Velocidade de digitação (ms por caractere)
    deleteSpeed: 50,         // Velocidade de apagar (ms por caractere)
    pauseTime: 2000,         // Pausa entre palavras (ms)
  },
  tilt: {
    maxTilt: 10,             // Ângulo máximo de inclinação (graus)
    perspective: 1000,       // Perspectiva 3D (px)
    scale: 1.02,             // Escala no hover
    speed: 400,              // Duração da transição (ms)
    glare: true,             // Efeito de brilho
    maxGlare: 0.2,           // Intensidade máxima do brilho
  },
  reveal: {
    threshold: 0.15,         // % do elemento visível para trigger
    rootMargin: '0px 0px -50px 0px',
  },
};

// ============================================================================
// FUNÇÕES UTILITÁRIAS
// ============================================================================

/**
 * Debounce - Atrasa a execução de uma função
 * @param {Function} func - Função a ser executada
 * @param {number} wait - Tempo de espera em ms
 * @returns {Function}
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle - Limita a frequência de execução de uma função
 * @param {Function} func - Função a ser executada
 * @param {number} limit - Limite de tempo em ms
 * @returns {Function}
 */
export function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Verifica se o dispositivo atual é mobile
 * @returns {boolean}
 */
export function isMobileDevice() {
  return window.innerWidth <= 768 || 'ontouchstart' in window;
}
