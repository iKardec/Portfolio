/**
 * ============================================================================
 * ANIMATIONS.JS - Animações Interativas
 * ============================================================================
 * Este módulo gerencia:
 * - Efeito de typing (digitação)
 * - Tilt effect em cards (3D)
 * - Scroll reveal (elementos aparecem ao scroll)
 * - Contadores animados
 * - Hover effects avançados
 * ============================================================================
 */

// ============================================================================
// CONFIGURAÇÃO
// ============================================================================

/**
 * Configurações padrão para animações
 */
const AnimationConfig = {
    typing: {
        speed: 100,              // Velocidade de digitação (ms por caractere)
        deleteSpeed: 50,         // Velocidade de apagar (ms por caractere)
        pauseTime: 2000,         // Pausa entre palavras (ms)
        cursorBlinkSpeed: 530,   // Velocidade do cursor piscando (ms)
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
        rootMargin: '0px 0px -50px 0px',  // Margem do viewport
    },
};

// ============================================================================
// TYPING EFFECT (EFEITO DE DIGITAÇÃO)
// ============================================================================

/**
 * Classe para gerenciar o efeito de digitação
 */
class TypeWriter {
    /**
     * Cria uma instância do TypeWriter
     * @param {HTMLElement} element - Elemento onde o texto será digitado
     * @param {string[]} words - Array de palavras para digitar
     * @param {Object} options - Configurações opcionais
     */
    constructor(element, words, options = {}) {
        this.element = element;
        this.words = words;
        this.options = { ...AnimationConfig.typing, ...options };

        this.wordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.isPaused = false;

        this.init();
    }

    /**
     * Inicializa o efeito de digitação
     */
    init() {
        // Adiciona cursor ao elemento
        this.element.classList.add('typing-text');
        this.type();
    }

    /**
     * Executa a animação de digitação
     */
    type() {
        const currentWord = this.words[this.wordIndex];

        if (this.isDeleting) {
            // Apagando caractere
            this.element.textContent = currentWord.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            // Digitando caractere
            this.element.textContent = currentWord.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        // Calcula próximo delay
        let nextDelay = this.isDeleting
            ? this.options.deleteSpeed
            : this.options.speed;

        // Palavra completa - pausa antes de apagar
        if (!this.isDeleting && this.charIndex === currentWord.length) {
            nextDelay = this.options.pauseTime;
            this.isDeleting = true;
        }

        // Palavra apagada - próxima palavra
        if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.wordIndex = (this.wordIndex + 1) % this.words.length;
            nextDelay = this.options.speed;
        }

        setTimeout(() => this.type(), nextDelay);
    }

    /**
     * Para a animação
     */
    stop() {
        this.isPaused = true;
    }

    /**
     * Retoma a animação
     */
    resume() {
        if (this.isPaused) {
            this.isPaused = false;
            this.type();
        }
    }
}

/**
 * Inicializa todos os elementos com typing effect
 */
function initTypingEffects() {
    const typingElements = document.querySelectorAll('[data-typing]');

    typingElements.forEach(element => {
        const wordsAttr = element.getAttribute('data-typing');
        if (wordsAttr) {
            const words = wordsAttr.split('|');
            new TypeWriter(element, words);
        }
    });
}

// ============================================================================
// TILT EFFECT (EFEITO 3D EM CARDS)
// ============================================================================

/**
 * Classe para gerenciar o efeito de inclinação 3D
 */
class TiltEffect {
    /**
     * Cria uma instância do TiltEffect
     * @param {HTMLElement} element - Elemento a aplicar o efeito
     * @param {Object} options - Configurações opcionais
     */
    constructor(element, options = {}) {
        this.element = element;
        this.options = { ...AnimationConfig.tilt, ...options };

        this.init();
    }

    /**
     * Inicializa o efeito tilt
     */
    init() {
        // Configura estilos base
        this.element.style.transformStyle = 'preserve-3d';
        this.element.style.transition = `transform ${this.options.speed}ms ease`;

        // Adiciona container de glare se habilitado
        if (this.options.glare) {
            this.createGlareElement();
        }

        // Event listeners
        this.element.addEventListener('mouseenter', () => this.onMouseEnter());
        this.element.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.element.addEventListener('mouseleave', () => this.onMouseLeave());
    }

    /**
     * Cria o elemento de brilho (glare)
     */
    createGlareElement() {
        this.glareElement = document.createElement('div');
        this.glareElement.className = 'tilt-glare';
        this.glareElement.style.cssText = `
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, ${this.options.maxGlare}) 0%,
        transparent 50%
      );
      opacity: 0;
      transition: opacity ${this.options.speed}ms ease;
    `;

        // Força position relative no elemento pai se necessário
        const computedPosition = window.getComputedStyle(this.element).position;
        if (computedPosition === 'static') {
            this.element.style.position = 'relative';
        }

        this.element.appendChild(this.glareElement);
    }

    /**
     * Handler para mouse enter
     */
    onMouseEnter() {
        this.element.style.transition = `transform ${this.options.speed}ms ease`;

        if (this.glareElement) {
            this.glareElement.style.opacity = '1';
        }
    }

    /**
     * Handler para movimento do mouse
     * @param {MouseEvent} e - Evento do mouse
     */
    onMouseMove(e) {
        const rect = this.element.getBoundingClientRect();

        // Posição relativa do mouse no elemento (0 a 1)
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        // Calcula ângulos de inclinação (-maxTilt a +maxTilt)
        const tiltX = (this.options.maxTilt * 2 * y - this.options.maxTilt) * -1;
        const tiltY = this.options.maxTilt * 2 * x - this.options.maxTilt;

        // Aplica transformação
        this.element.style.transform = `
      perspective(${this.options.perspective}px)
      rotateX(${tiltX}deg)
      rotateY(${tiltY}deg)
      scale(${this.options.scale})
    `;

        // Atualiza glare
        if (this.glareElement) {
            const glareAngle = Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI) + 135;
            this.glareElement.style.background = `
        linear-gradient(
          ${glareAngle}deg,
          rgba(255, 255, 255, ${this.options.maxGlare}) 0%,
          transparent 50%
        )
      `;
        }
    }

    /**
     * Handler para mouse leave
     */
    onMouseLeave() {
        // Reseta transformação suavemente
        this.element.style.transform = `
      perspective(${this.options.perspective}px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;

        if (this.glareElement) {
            this.glareElement.style.opacity = '0';
        }
    }

    /**
     * Destrói o efeito e limpa listeners
     */
    destroy() {
        this.element.removeEventListener('mouseenter', this.onMouseEnter);
        this.element.removeEventListener('mousemove', this.onMouseMove);
        this.element.removeEventListener('mouseleave', this.onMouseLeave);

        if (this.glareElement) {
            this.glareElement.remove();
        }
    }
}

/**
 * Inicializa todos os elementos com tilt effect
 */
function initTiltEffects() {
    // Não aplica em dispositivos touch
    if ('ontouchstart' in window) return;

    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach(element => {
        new TiltEffect(element);
    });
}

// ============================================================================
// SCROLL REVEAL (ANIMAÇÃO AO SCROLL)
// ============================================================================

/**
 * Classe para gerenciar o reveal de elementos ao scroll
 */
class ScrollReveal {
    /**
     * Cria uma instância do ScrollReveal
     * @param {Object} options - Configurações opcionais
     */
    constructor(options = {}) {
        this.options = { ...AnimationConfig.reveal, ...options };
        this.observedElements = new Set();

        this.init();
    }

    /**
     * Inicializa o Intersection Observer
     */
    init() {
        // Verifica suporte
        if (!('IntersectionObserver' in window)) {
            this.fallback();
            return;
        }

        // Cria observer
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            {
                threshold: this.options.threshold,
                rootMargin: this.options.rootMargin,
            }
        );

        // Observa elementos
        this.observeElements();
    }

    /**
     * Fallback para navegadores sem suporte
     */
    fallback() {
        const elements = document.querySelectorAll('.reveal');
        elements.forEach(el => el.classList.add('revealed'));
    }

    /**
     * Observa todos os elementos com classe .reveal
     */
    observeElements() {
        const elements = document.querySelectorAll('.reveal:not(.revealed)');

        elements.forEach(element => {
            if (!this.observedElements.has(element)) {
                this.observedElements.add(element);
                this.observer.observe(element);
            }
        });
    }

    /**
     * Handler para interseção dos elementos
     * @param {IntersectionObserverEntry[]} entries - Entradas do observer
     */
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona delay se especificado
                const delay = entry.target.getAttribute('data-reveal-delay') || 0;

                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, parseInt(delay));

                // Para de observar após revelar
                this.observer.unobserve(entry.target);
                this.observedElements.delete(entry.target);
            }
        });
    }

    /**
     * Reobserva novos elementos (útil após mudança de seção)
     */
    refresh() {
        this.observeElements();
    }

    /**
     * Destrói o observer
     */
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        this.observedElements.clear();
    }
}

// Instância global do ScrollReveal
let scrollRevealInstance = null;

/**
 * Inicializa o scroll reveal
 */
function initScrollReveal() {
    scrollRevealInstance = new ScrollReveal();

    // Reobserva quando seção muda
    document.addEventListener('sectionChanged', () => {
        setTimeout(() => {
            if (scrollRevealInstance) {
                scrollRevealInstance.refresh();
            }
        }, 100);
    });
}

// ============================================================================
// CONTADORES ANIMADOS
// ============================================================================

/**
 * Anima um contador de número
 * @param {HTMLElement} element - Elemento do contador
 * @param {number} start - Valor inicial
 * @param {number} end - Valor final
 * @param {number} duration - Duração em ms
 */
function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    const range = end - start;

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);

        const current = Math.round(start + range * easeOut);
        element.textContent = current.toLocaleString('pt-BR');

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/**
 * Inicializa todos os contadores animados
 */
function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.getAttribute('data-counter'));
                const duration = parseInt(element.getAttribute('data-duration')) || 2000;

                animateCounter(element, 0, target, duration);
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ============================================================================
// ANIMAÇÕES DE HOVER AVANÇADAS
// ============================================================================

/**
 * Aplica efeito de magnetic hover em elementos
 * O elemento "segue" o cursor suavemente
 * @param {string} selector - Seletor CSS dos elementos
 */
function initMagneticHover(selector = '[data-magnetic]') {
    // Não aplica em touch devices
    if ('ontouchstart' in window) return;

    const elements = document.querySelectorAll(selector);

    elements.forEach(element => {
        const strength = parseFloat(element.getAttribute('data-magnetic-strength')) || 0.3;

        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
            element.style.transition = 'transform 0.3s ease';
        });

        element.addEventListener('mouseenter', () => {
            element.style.transition = 'none';
        });
    });
}

// ============================================================================
// INICIALIZAÇÃO GERAL
// ============================================================================

/**
 * Inicializa todos os módulos de animação
 */
function initAnimations() {
    initTypingEffects();
    initTiltEffects();
    initScrollReveal();
    initCounters();
    initMagneticHover();

    console.log('✅ Módulo de Animações inicializado');
}

// Exporta funções para uso global
window.TypeWriter = TypeWriter;
window.TiltEffect = TiltEffect;
window.initAnimations = initAnimations;
window.initScrollReveal = initScrollReveal;
