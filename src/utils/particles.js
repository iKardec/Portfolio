/**
 * ============================================================================
 * utils/particles.js - Sistema de Partículas Animadas
 * ============================================================================
 * Classes Particle e ParticleSystem extraídas do projeto BASE como ES Modules.
 * Cria partículas flutuantes usando Canvas API para performance premium.
 * ============================================================================
 */

// ============================================================================
// CONFIGURAÇÃO
// ============================================================================

/** Configurações padrão do sistema de partículas */
export const ParticlesConfig = {
  particleCount: 50,
  particleColor: '#ff9800',
  lineColor: 'rgba(255, 152, 0, 0.1)',
  particleRadius: 2,
  maxSpeed: 0.5,
  linkDistance: 150,
  mouseRadius: 100,
};

// ============================================================================
// CLASSE PARTICLE
// ============================================================================

/** Representa uma partícula individual no canvas */
export class Particle {
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {typeof ParticlesConfig} config
   */
  constructor(canvas, config) {
    this.canvas = canvas;
    this.config = config;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * config.maxSpeed;
    this.vy = (Math.random() - 0.5) * config.maxSpeed;
    this.radius = Math.random() * config.particleRadius + 1;
    this.opacity = Math.random() * 0.5 + 0.2;
  }

  /**
   * Atualiza posição e aplica interação com o mouse
   * @param {{ x: number|null, y: number|null }} mouse
   */
  update(mouse) {
    this.x += this.vx;
    this.y += this.vy;

    // Bounce nas bordas do canvas
    if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;

    // Repulsão pelo mouse
    if (mouse.x && mouse.y) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < this.config.mouseRadius) {
        const force = (this.config.mouseRadius - dist) / this.config.mouseRadius;
        this.x -= dx * force * 0.02;
        this.y -= dy * force * 0.02;
      }
    }
  }

  /**
   * Desenha a partícula no canvas
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.config.particleColor;
    ctx.globalAlpha = this.opacity;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

// ============================================================================
// CLASSE PARTICLE SYSTEM
// ============================================================================

/** Gerencia o sistema completo de partículas interativas */
export class ParticleSystem {
  /**
   * @param {string} [containerId='particles-canvas']
   */
  constructor(containerId = 'particles-canvas') {
    this.config = { ...ParticlesConfig };
    this.particles = [];
    this.mouse = { x: null, y: null };
    this.animationId = null;
    this.canvas = null;
    this.ctx = null;
    this._handleResize = this._resize.bind(this);
    this._handleMouseMove = this._handleMouseMove.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);

    // Reduz partículas em mobile para melhor performance
    if (window.innerWidth < 768) {
      this.config.particleCount = 25;
    }

    this._init(containerId);
  }

  /** Inicializa o canvas e os event listeners */
  _init(containerId) {
    this.canvas = document.createElement('canvas');
    this.canvas.id = containerId;
    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
    `;

    document.body.prepend(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this._resize();
    window.addEventListener('resize', this._handleResize);
    document.addEventListener('mousemove', this._handleMouseMove);
    document.addEventListener('mouseleave', this._handleMouseLeave);

    this._createParticles();
    this._animate();
  }

  /** Redimensiona o canvas ao viewport */
  _resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  /** Atualiza a posição usada na interação entre cursor e partículas. */
  _handleMouseMove(event) {
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;
  }

  /** Limpa a interação quando o cursor deixa a janela. */
  _handleMouseLeave() {
    this.mouse.x = null;
    this.mouse.y = null;
  }

  /** Cria o array inicial de partículas */
  _createParticles() {
    this.particles = [];
    for (let i = 0; i < this.config.particleCount; i++) {
      this.particles.push(new Particle(this.canvas, this.config));
    }
  }

  /** Desenha as linhas de conexão entre partículas próximas */
  _drawLines() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.config.linkDistance) {
          const opacity = 1 - dist / this.config.linkDistance;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = this.config.lineColor;
          this.ctx.globalAlpha = opacity * 0.5;
          this.ctx.stroke();
          this.ctx.globalAlpha = 1;
        }
      }
    }
  }

  /** Loop de animação via requestAnimationFrame */
  _animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach((p) => {
      p.update(this.mouse);
      p.draw(this.ctx);
    });
    this._drawLines();
    this.animationId = requestAnimationFrame(() => this._animate());
  }

  /** Destrói o canvas e cancela a animação (cleanup) */
  destroy() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this._handleResize);
    document.removeEventListener('mousemove', this._handleMouseMove);
    document.removeEventListener('mouseleave', this._handleMouseLeave);
    if (this.canvas) this.canvas.remove();
  }
}
