/**
 * ============================================================================
 * PARTICLES.JS - Efeito de Partículas Animadas
 * ============================================================================
 * Este módulo cria partículas flutuantes no fundo usando Canvas
 * para melhor performance e efeito visual premium.
 * ============================================================================
 */

// ============================================================================
// CONFIGURAÇÃO
// ============================================================================

const ParticlesConfig = {
    particleCount: 50,        // Número de partículas
    particleColor: '#ff9800', // Cor das partículas (laranja)
    lineColor: 'rgba(255, 152, 0, 0.1)', // Cor das linhas
    particleRadius: 2,        // Raio base
    maxSpeed: 0.5,            // Velocidade máxima
    linkDistance: 150,        // Distância para conectar
    mouseRadius: 100,         // Raio de interação do mouse
};

// ============================================================================
// CLASSE PARTICLE
// ============================================================================

class Particle {
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

    update(mouse) {
        // Movimento
        this.x += this.vx;
        this.y += this.vy;

        // Bounce nas bordas
        if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;

        // Interação com mouse
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
// SISTEMA DE PARTÍCULAS
// ============================================================================

class ParticleSystem {
    constructor(containerId = 'particles-canvas') {
        this.config = { ...ParticlesConfig };
        this.particles = [];
        this.mouse = { x: null, y: null };
        this.animationId = null;
        this.canvas = null;
        this.ctx = null;

        this.init(containerId);
    }

    init(containerId) {
        // Cria canvas
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

        // Configura tamanho
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Mouse tracking
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        document.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });

        // Cria partículas
        this.createParticles();

        // Inicia animação
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push(new Particle(this.canvas, this.config));
        }
    }

    drawLines() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < this.config.linkDistance) {
                    const opacity = 1 - (dist / this.config.linkDistance);
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

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update e draw partículas
        this.particles.forEach(p => {
            p.update(this.mouse);
            p.draw(this.ctx);
        });

        // Desenha linhas
        this.drawLines();

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas) {
            this.canvas.remove();
        }
    }
}

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================

let particleSystemInstance = null;

function initParticles() {
    // Verifica preferência de movimento reduzido
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        console.log('⚠️ Partículas desabilitadas (prefers-reduced-motion)');
        return;
    }

    // Verifica se é mobile (reduz performance impact)
    if (window.innerWidth < 768) {
        ParticlesConfig.particleCount = 25;
    }

    particleSystemInstance = new ParticleSystem();
    console.log('✅ Módulo de Partículas inicializado');
}

// Exporta
window.initParticles = initParticles;
window.ParticleSystem = ParticleSystem;
