/**
 * ============================================================================
 * SCROLL.JS - Efeitos de Scroll
 * ============================================================================
 * Este módulo gerencia:
 * - Smooth scroll aprimorado
 * - Barra de progresso de leitura
 * - Botão scroll to top
 * ============================================================================
 */

// ============================================================================
// BARRA DE PROGRESSO DE LEITURA
// ============================================================================

/**
 * Cria e gerencia a barra de progresso
 */
function initProgressBar() {
    // Cria elemento
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.setAttribute('role', 'progressbar');
    document.body.appendChild(progressBar);

    // Atualiza no scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset;
                const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
                progressBar.style.width = `${progress}%`;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ============================================================================
// BOTÃO SCROLL TO TOP
// ============================================================================

/**
 * Cria e gerencia o botão de voltar ao topo
 */
function initScrollToTop() {
    // Cria elemento
    const button = document.createElement('button');
    button.className = 'scroll-to-top';
    button.setAttribute('aria-label', 'Voltar ao topo');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';

    // Estilos
    button.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--orange-500, #ff9800);
    color: var(--black-900, #0a0a0a);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    box-shadow: 0 4px 20px rgba(255, 152, 0, 0.4);
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    transition: all 0.3s ease;
    z-index: 999;
  `;

    document.body.appendChild(button);

    // Click handler
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Hover effects
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-5px) scale(1.1)';
        button.style.boxShadow = '0 8px 30px rgba(255, 152, 0, 0.6)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = button.style.opacity === '1' ? 'translateY(0)' : 'translateY(20px)';
        button.style.boxShadow = '0 4px 20px rgba(255, 152, 0, 0.4)';
    });

    // Visibilidade baseada no scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const shouldShow = window.pageYOffset > 400;
                if (shouldShow) {
                    button.style.opacity = '1';
                    button.style.visibility = 'visible';
                    button.style.transform = 'translateY(0)';
                } else {
                    button.style.opacity = '0';
                    button.style.visibility = 'hidden';
                    button.style.transform = 'translateY(20px)';
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ============================================================================
// SMOOTH SCROLL PARA ÂNCORAS
// ============================================================================

/**
 * Configura smooth scroll para links de âncora
 */
function initSmoothScrollAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
}

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================

/**
 * Inicializa todos os módulos de scroll
 */
function initScrollEffects() {
    initProgressBar();
    initScrollToTop();
    initSmoothScrollAnchors();
    console.log('✅ Módulo de Scroll inicializado');
}

// Exporta
window.initScrollEffects = initScrollEffects;
