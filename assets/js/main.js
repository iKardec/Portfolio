/**
 * ============================================================================
 * MAIN.JS - Arquivo Principal de JavaScript
 * ============================================================================
 * Este arquivo inicializa todos os módulos e serve como ponto de entrada
 * da aplicação. Carrega os módulos na ordem correta e configura o estado
 * inicial.
 * ============================================================================
 */

// ============================================================================
// INICIALIZAÇÃO DO DOCUMENTO
// ============================================================================

/**
 * Aguarda o DOM estar completamente carregado
 * antes de inicializar os módulos
 */
document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 Iniciando Portfólio - Alan Kardec');

    // ========================================================================
    // INICIALIZAÇÃO DOS MÓDULOS
    // ========================================================================

    // 1. Navegação (tabs, header sticky)
    if (typeof initNavigation === 'function') {
        initNavigation();
    }

    // 2. Animações (typing, tilt, scroll reveal)
    if (typeof initAnimations === 'function') {
        initAnimations();
    }

    // 3. Efeitos de scroll (progress bar, scroll to top)
    if (typeof initScrollEffects === 'function') {
        initScrollEffects();
    }

    // 4. Partículas (background animado)
    if (typeof initParticles === 'function') {
        initParticles();
    }

    // ========================================================================
    // CONFIGURAÇÃO INICIAL
    // ========================================================================

    // Mostra a seção welcome por padrão
    const welcomeSection = document.getElementById('welcome');
    if (welcomeSection) {
        welcomeSection.style.display = 'block';
        welcomeSection.classList.add('active');
    }

    // Remove loading screen se existir
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 500);
    }

    // ========================================================================
    // OBSERVERS E LISTENERS GLOBAIS
    // ========================================================================

    // Observer para mudanças na seção welcome
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.attributeName === 'style') {
                const welcomeSection = document.getElementById('welcome');
                if (welcomeSection) {
                    const isWelcome = welcomeSection.style.display !== 'none';
                    document.dispatchEvent(new CustomEvent('welcomeStateChanged', {
                        detail: { isWelcome }
                    }));
                }
            }
        });
    });

    if (welcomeSection) {
        observer.observe(welcomeSection, { attributes: true });
    }

    // ========================================================================
    // FINALIZAÇÃO
    // ========================================================================

    console.log('✅ Portfólio inicializado com sucesso!');
});

// ============================================================================
// UTILITÁRIOS GLOBAIS
// ============================================================================

/**
 * Debounce - Atrasa a execução de uma função
 * @param {Function} func - Função a ser executada
 * @param {number} wait - Tempo de espera em ms
 * @returns {Function}
 */
function debounce(func, wait) {
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
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Verifica se é dispositivo mobile
 * @returns {boolean}
 */
function isMobileDevice() {
    return window.innerWidth <= 768 || 'ontouchstart' in window;
}

/**
 * Formata data em português
 * @param {Date} date - Data a ser formatada
 * @returns {string}
 */
function formatDatePtBR(date) {
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
}

// Exporta utilitários
window.debounce = debounce;
window.throttle = throttle;
window.isMobileDevice = isMobileDevice;
