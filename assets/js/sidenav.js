/**
 * ============================================================================
 * SIDENAV.JS - Navegação Lateral por Dots
 * ============================================================================
 * Gerencia a navegação lateral fixa com dots:
 * - Click para navegar entre seções
 * - Atualização automática do dot ativo no scroll
 * - Smooth scroll para seções
 * ============================================================================
 */

/**
 * Inicializa a navegação lateral por dots
 * @description Configura event listeners e observer para navegação
 */
function initSideNav() {
    const dots = document.querySelectorAll('.side-nav-dot');
    const sections = document.querySelectorAll('.portfolio-section, .hero');

    // Verifica se existem elementos
    if (!dots.length || !sections.length) {
        console.log('⚠️ SideNav: Elementos não encontrados');
        return;
    }

    // ========================================================================
    // CLICK NOS DOTS
    // Navega para a seção correspondente
    // ========================================================================
    dots.forEach(dot => {
        dot.addEventListener('click', function () {
            const targetId = this.getAttribute('data-section');
            const target = document.getElementById(targetId);

            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ========================================================================
    // OBSERVER PARA ATUALIZAR DOT ATIVO
    // Detecta qual seção está visível e atualiza o dot correspondente
    // ========================================================================
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;

                // Remove active de todos e adiciona ao correspondente
                dots.forEach(dot => {
                    dot.classList.remove('active');
                    if (dot.getAttribute('data-section') === id) {
                        dot.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    // Observa todas as seções
    sections.forEach(section => observer.observe(section));

    console.log('✅ Módulo SideNav inicializado');
}

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================
document.addEventListener('DOMContentLoaded', initSideNav);

// Exporta para uso global
window.initSideNav = initSideNav;
