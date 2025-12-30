/**
 * ============================================================================
 * NAVIGATION.JS - Sistema de Navegação
 * ============================================================================
 * Este módulo gerencia:
 * - Navegação entre seções (tabs)
 * - Header sticky com minimização
 * - Scroll inteligente no mobile
 * - Estado ativo dos botões
 * ============================================================================
 */

// ============================================================================
// CONFIGURAÇÃO E ESTADO
// ============================================================================

/**
 * Estado global da navegação
 * Armazena informações sobre scroll, seção ativa e configurações
 */
const NavigationState = {
  lastScrollTop: 0,               // Última posição do scroll
  isWelcomePage: true,            // Se está na página de boas-vindas
  isScrollingUp: false,           // Direção do scroll
  currentNavScrollPosition: 0,    // Posição do scroll da nav mobile
  scrollThreshold: 50,            // Threshold para iniciar minimização
};

/**
 * Elementos DOM principais
 * Cache de elementos para performance
 */
let headerElement = null;
let navTabsElement = null;
let mainContentElement = null;

// ============================================================================
// FUNÇÕES UTILITÁRIAS
// ============================================================================

/**
 * Verifica se o dispositivo é mobile (largura <= 768px)
 * @returns {boolean} True se for mobile
 */
function isMobile() {
  return window.innerWidth <= 768;
}

/**
 * Obtém a altura atual do header
 * @returns {number} Altura do header em pixels
 */
function getHeaderHeight() {
  if (!headerElement) return 0;
  return headerElement.offsetHeight;
}

/**
 * Debounce local para otimizar eventos de scroll/resize
 * @param {Function} func - Função a ser executada
 * @param {number} wait - Tempo de espera em ms
 * @returns {Function} Função com debounce
 */
function _debounce(func, wait) {
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

// ============================================================================
// NAVEGAÇÃO POR SEÇÕES
// ============================================================================

/**
 * Mostra uma seção específica e esconde as outras
 * @param {string} sectionId - ID da seção a ser mostrada
 */
function showSection(sectionId) {
  // Obtém todas as seções de conteúdo
  const sections = document.querySelectorAll('.content-section');
  
  // Esconde todas as seções
  sections.forEach(section => {
    section.style.display = 'none';
    section.classList.remove('active');
  });
  
  // Mostra apenas a seção selecionada
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.style.display = 'block';
    
    // Pequeno delay para trigger da animação CSS
    requestAnimationFrame(() => {
      targetSection.classList.add('active');
    });
  }
  
  // Atualiza estado dos botões de navegação
  updateActiveTab(sectionId);
  
  // Atualiza flag de página welcome
  NavigationState.isWelcomePage = (sectionId === 'welcome');
  
  // Remove minimização se voltar para welcome
  if (NavigationState.isWelcomePage) {
    removeHeaderMinimization();
  }
  
  // Scroll suave para o topo
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // No mobile: mantém a posição atual da navegação
  if (isMobile() && navTabsElement) {
    setTimeout(() => {
      navTabsElement.scrollLeft = NavigationState.currentNavScrollPosition;
    }, 50);
  }
  
  // Dispara evento customizado para outros módulos
  document.dispatchEvent(new CustomEvent('sectionChanged', { 
    detail: { sectionId } 
  }));
}

/**
 * Atualiza o estado visual do tab ativo
 * @param {string} activeSectionId - ID da seção ativa
 */
function updateActiveTab(activeSectionId) {
  const buttons = document.querySelectorAll('.tab-btn');
  
  buttons.forEach(button => {
    // Remove classe active de todos
    button.classList.remove('active');
    
    // Adiciona active ao botão correspondente
    const buttonSection = button.getAttribute('data-section');
    if (buttonSection === activeSectionId) {
      button.classList.add('active');
    }
  });
}

// ============================================================================
// HEADER STICKY E MINIMIZAÇÃO
// ============================================================================

/**
 * Remove todas as classes de minimização do header
 */
function removeHeaderMinimization() {
  if (headerElement) {
    headerElement.classList.remove('minimized');
    headerElement.classList.remove('sticky');
  }
  document.body.classList.remove('header-fixed');
  document.body.classList.remove('header-minimized');
}

/**
 * Aplica estado sticky ao header
 */
function applyHeaderSticky() {
  if (headerElement) {
    headerElement.classList.add('sticky');
  }
  document.body.classList.add('header-fixed');
}

/**
 * Aplica estado minimizado ao header
 */
function applyHeaderMinimized() {
  if (headerElement) {
    headerElement.classList.add('minimized');
  }
  document.body.classList.add('header-minimized');
}

/**
 * Gerencia o comportamento do header baseado no scroll
 * Chamado a cada evento de scroll
 */
function handleHeaderScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Detecta direção do scroll
  NavigationState.isScrollingUp = scrollTop < NavigationState.lastScrollTop;
  
  // Se está na página de welcome, não aplica minimização
  if (NavigationState.isWelcomePage) {
    removeHeaderMinimization();
    NavigationState.lastScrollTop = scrollTop;
    return;
  }
  
  // Cálculo da porcentagem de scroll
  const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
  
  if (isMobile()) {
    // COMPORTAMENTO MOBILE
    handleMobileHeaderScroll(scrollTop, scrollPercent);
  } else {
    // COMPORTAMENTO DESKTOP
    handleDesktopHeaderScroll(scrollTop, scrollPercent);
  }
  
  NavigationState.lastScrollTop = scrollTop;
}

/**
 * Comportamento do header no mobile
 * @param {number} scrollTop - Posição atual do scroll
 * @param {number} scrollPercent - Porcentagem do scroll
 */
function handleMobileHeaderScroll(scrollTop, scrollPercent) {
  // Header fixo após scroll mínimo
  if (scrollTop > 50) {
    applyHeaderSticky();
  } else {
    if (headerElement) headerElement.classList.remove('sticky');
    document.body.classList.remove('header-fixed');
  }
  
  // Minimização suave no mobile - apenas após muito scroll
  if (scrollPercent > 25) {
    applyHeaderMinimized();
  } else {
    if (headerElement) headerElement.classList.remove('minimized');
    document.body.classList.remove('header-minimized');
  }
}

/**
 * Comportamento do header no desktop
 * @param {number} scrollTop - Posição atual do scroll
 * @param {number} scrollPercent - Porcentagem do scroll
 */
function handleDesktopHeaderScroll(scrollTop, scrollPercent) {
  // Se scrollando para cima próximo ao topo, remove fixação
  if (NavigationState.isScrollingUp && scrollTop < 150) {
    removeHeaderMinimization();
    return;
  }
  
  // Fixa header após scroll significativo
  if (scrollTop > 120 && !NavigationState.isScrollingUp) {
    applyHeaderSticky();
  } else if (scrollTop < 80) {
    if (headerElement) headerElement.classList.remove('sticky');
    document.body.classList.remove('header-fixed');
  }
  
  // Minimização gradual
  if (scrollPercent > 10 && scrollTop > 120) {
    applyHeaderMinimized();
  } else if (scrollPercent < 8 || scrollTop < 100) {
    if (headerElement) headerElement.classList.remove('minimized');
    document.body.classList.remove('header-minimized');
  }
}

// ============================================================================
// NAVEGAÇÃO MOBILE - SCROLL HORIZONTAL
// ============================================================================

/**
 * Configura a navegação horizontal no mobile
 * Centraliza o botão clicado e monitora scroll
 */
function setupMobileNavigation() {
  if (!isMobile() || !navTabsElement) return;
  
  const buttons = document.querySelectorAll('.tab-btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      // Salva posição atual do scroll
      NavigationState.currentNavScrollPosition = navTabsElement.scrollLeft;
      
      // Centraliza o botão clicado no viewport
      const buttonRect = this.getBoundingClientRect();
      const navRect = navTabsElement.getBoundingClientRect();
      const scrollLeft = navTabsElement.scrollLeft;
      const buttonCenter = buttonRect.left + buttonRect.width / 2;
      const navCenter = navRect.width / 2;
      const offset = buttonCenter - navCenter;
      
      navTabsElement.scrollTo({
        left: scrollLeft + offset,
        behavior: 'smooth'
      });
      
      // Atualiza posição salva após scroll suave
      setTimeout(() => {
        NavigationState.currentNavScrollPosition = navTabsElement.scrollLeft;
      }, 300);
    });
  });
  
  // Monitora mudanças no scroll da navegação
  navTabsElement.addEventListener('scroll', () => {
    NavigationState.currentNavScrollPosition = navTabsElement.scrollLeft;
  });
}

/**
 * Reseta a navegação mobile para o início
 */
function resetMobileNavigation() {
  if (isMobile() && navTabsElement) {
    setTimeout(() => {
      navTabsElement.scrollLeft = 0;
      navTabsElement.scrollTo({ left: 0, behavior: 'auto' });
    }, 100);
  }
}

// ============================================================================
// CONFIGURAÇÃO DE EVENT LISTENERS
// ============================================================================

/**
 * Configura todos os event listeners dos botões de navegação
 */
function setupNavigationListeners() {
  const buttons = document.querySelectorAll('.tab-btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      const sectionId = this.getAttribute('data-section');
      if (sectionId) {
        showSection(sectionId);
      }
    });
  });
}

/**
 * Configura listener de scroll com otimização
 */
function setupScrollListener() {
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
}

/**
 * Configura listener de resize
 */
function setupResizeListener() {
  const handleResize = _debounce(() => {
    if (NavigationState.isWelcomePage) {
      removeHeaderMinimization();
    }
    
    // Reconfigura navegação mobile
    resetMobileNavigation();
    setupMobileNavigation();
  }, 150);
  
  window.addEventListener('resize', handleResize);
}

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================

/**
 * Inicializa o módulo de navegação
 * Deve ser chamado após o DOM estar pronto
 */
function initNavigation() {
  // Cache de elementos DOM
  headerElement = document.getElementById('mainHeader');
  navTabsElement = document.getElementById('navTabs');
  mainContentElement = document.querySelector('.main-content');
  
  // Garante estado inicial correto
  NavigationState.isWelcomePage = true;
  removeHeaderMinimization();
  
  // Configura listeners
  setupNavigationListeners();
  setupScrollListener();
  setupResizeListener();
  setupMobileNavigation();
  
  // Reseta navegação mobile ao carregar
  resetMobileNavigation();
  
  console.log('✅ Módulo de Navegação inicializado');
}

// Exporta funções para uso global
window.showSection = showSection;
window.initNavigation = initNavigation;
