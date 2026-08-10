import { AnimationConfig } from './animations.js';

export class TypeWriter {
  constructor(element, words, options = {}) {
    this.element = element;
    this.words = words;
    this.options = { ...AnimationConfig.typing, ...options };

    this.wordIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;

    this._init();
  }

  _init() {
    this.element.classList.add('typing-text');
    this._type();
  }

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

    if (!this.isDeleting && this.charIndex === currentWord.length) {
      nextDelay = this.options.pauseTime;
      this.isDeleting = true;
    }

    if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.wordIndex = (this.wordIndex + 1) % this.words.length;
      nextDelay = this.options.speed;
    }

    setTimeout(() => this._type(), nextDelay);
  }
}
