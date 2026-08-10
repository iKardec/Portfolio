/**
 * ============================================================================
 * utils/typeWriter.js - Efeito de Digitação
 * ============================================================================
 * Classe TypeWriter extraída do projeto BASE como ES Module.
 * Cria um efeito de digitação/apagamento automático de textos.
 * ============================================================================
 */

import { AnimationConfig } from './animations.js';

/**
 * Classe para gerenciar o efeito de digitação
 *
 * @example
 * const el = document.querySelector('[data-typing]');
 * new TypeWriter(el, ['Desenvolvedor Front-End', 'Técnico em Edificações']);
 */
export class TypeWriter {
  /**
   * @param {HTMLElement} element - Elemento onde o texto será digitado
   * @param {string[]} words - Array de palavras para digitar
   * @param {Object} [options] - Configurações opcionais
   */
  constructor(element, words, options = {}) {
    this.element = element;
    this.words = words;
    this.options = { ...AnimationConfig.typing, ...options };

    this.wordIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;

    this._init();
  }

  /** Inicializa o efeito de digitação */
  _init() {
    this.element.classList.add('typing-text');
    this._type();
  }

  /** Executa a animação de digitação recursivamente */
  _type() {
    const currentWord = this.words[this.wordIndex];

    if (this.isDeleting) {
      this.element.textContent = currentWord.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = currentWord.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let nextDelay = this.isDeleting
      ? this.options.deleteSpeed
      : this.options.speed;

    // Palavra completa — pausa antes de apagar
    if (!this.isDeleting && this.charIndex === currentWord.length) {
      nextDelay = this.options.pauseTime;
      this.isDeleting = true;
    }

    // Palavra apagada — avança para a próxima
    if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.wordIndex = (this.wordIndex + 1) % this.words.length;
      nextDelay = this.options.speed;
    }

    setTimeout(() => this._type(), nextDelay);
  }
}
