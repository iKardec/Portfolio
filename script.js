// Controle de scroll para minimizar header
let lastScrollTop = 0;
const header = document.getElementById('mainHeader');
const tabNavigation = document.getElementById('tabNavigation');
let isWelcomePage = true;
let scrollThreshold = 50;
let currentScrollPosition = 0; // Armazena posição do scroll da navegação mobile
let isScrollingUp = false;
let scrollTimeout;

// Função para verificar se estamos em mobile
function isMobile() {
  return window.innerWidth <= 768;
}

// Scroll suave automático para botões no mobile
function setupMobileNavigation() {
  if (!isMobile()) return;
  
  const buttons = document.querySelectorAll('.tab-btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      // Salva a posição atual do scroll antes de qualquer ação
      currentScrollPosition = tabNavigation.scrollLeft;
      
      // Centraliza o botão clicado no viewport
      const buttonRect = this.getBoundingClientRect();
      const navRect = tabNavigation.getBoundingClientRect();
      const scrollLeft = tabNavigation.scrollLeft;
      const buttonCenter = buttonRect.left + buttonRect.width / 2;
      const navCenter = navRect.width / 2;
      const offset = buttonCenter - navCenter;
      
      tabNavigation.scrollTo({
        left: scrollLeft + offset,
        behavior: 'smooth'
      });
      
      // Atualiza a posição salva após o scroll suave
      setTimeout(() => {
        currentScrollPosition = tabNavigation.scrollLeft;
      }, 300);
    });
  });
  
  // Monitora mudanças no scroll da navegação
  tabNavigation.addEventListener('scroll', function() {
    currentScrollPosition = this.scrollLeft;
  });
}

// Controle de scroll do header
window.addEventListener('scroll', function() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Detecta direção do scroll
  isScrollingUp = scrollTop < lastScrollTop;
  
  // No mobile, minimização mais suave e menos agressiva
  if (isMobile()) {
    // Na página de boas-vindas, não minimiza no mobile
    if (isWelcomePage) {
      header.classList.remove('sticky');
      header.classList.remove('minimized');
      document.body.classList.remove('header-fixed');
      document.body.classList.remove('header-minimized');
      lastScrollTop = scrollTop;
      return;
    }
    
    // Header fixo começa após scroll mínimo
    if (scrollTop > 50) {
      header.classList.add('sticky');
      document.body.classList.add('header-fixed');
    } else {
      header.classList.remove('sticky');
      document.body.classList.remove('header-fixed');
    }
    
    // Minimização muito suave no mobile - apenas após muito scroll
    const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / documentHeight) * 100;
    
    if (scrollPercent > 25) {
      header.classList.add('minimized');
      document.body.classList.add('header-minimized');
    } else {
      header.classList.remove('minimized');
      document.body.classList.remove('header-minimized');
    }
    
    lastScrollTop = scrollTop;
    return;
  }
  
  // DESKTOP - comportamento suavizado
  if (isWelcomePage) {
    header.classList.remove('sticky');
    header.classList.remove('minimized');
    document.body.classList.remove('header-fixed');
    document.body.classList.remove('header-minimized');
    lastScrollTop = scrollTop;
    return;
  }
  
  const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / documentHeight) * 100;
  
  // Se scrollando para cima E já passou do topo, remove fixação para evitar loop
  if (isScrollingUp && scrollTop < 150) {
    header.classList.remove('sticky');
    header.classList.remove('minimized');
    document.body.classList.remove('header-fixed');
    document.body.classList.remove('header-minimized');
    lastScrollTop = scrollTop;
    return;
  }
  
  // Transição mais suave para fixar o header - só fixa após scroll significativo
  if (scrollTop > 120 && !isScrollingUp) {
    header.classList.add('sticky');
    document.body.classList.add('header-fixed');
  } else if (scrollTop < 80) {
    header.classList.remove('sticky');
    document.body.classList.remove('header-fixed');
  }
  
  // Minimização mais gradual e suave - inicia após 10% de scroll
  if (scrollPercent > 10 && scrollTop > 120) {
    header.classList.add('minimized');
    document.body.classList.add('header-minimized');
  } else if (scrollPercent < 8 || scrollTop < 100) {
    header.classList.remove('minimized');
    document.body.classList.remove('header-minimized');
  }
  
  lastScrollTop = scrollTop;
}, { passive: true });

// Função para mostrar seção
function showSection(sectionId) {
  // Pega todas as seções
  var sections = document.querySelectorAll('.content-section');
  
  // Esconde todas as seções
  for (var i = 0; i < sections.length; i++) {
    sections[i].style.display = 'none';
  }
  
  // Mostra apenas a seção selecionada
  var targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.style.display = 'block';
  }
  
  // Remove active de todos os botões
  var buttons = document.querySelectorAll('.tab-btn');
  for (var j = 0; j < buttons.length; j++) {
    buttons[j].classList.remove('active');
  }
  
  // Adiciona active ao botão clicado
  if (event && event.target) {
    event.target.closest('.tab-btn').classList.add('active');
  }
  
  // Atualiza flag de página welcome
  isWelcomePage = (sectionId === 'welcome');
  
  // Remove minimização e fixação se voltar para welcome
  if (isWelcomePage) {
    header.classList.remove('minimized');
    header.classList.remove('sticky');
    document.body.classList.remove('header-fixed');
    document.body.classList.remove('header-minimized');
  }
  
  // Scroll para o topo suave
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // NO MOBILE: MANTÉM a posição atual da navegação (NÃO volta ao início)
  if (isMobile() && currentScrollPosition !== undefined) {
    setTimeout(() => {
      tabNavigation.scrollLeft = currentScrollPosition;
    }, 50);
  }
}

// Detecta quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
  // Garante que estamos na página de boas-vindas
  isWelcomePage = true;
  
  // Remove minimização inicial
  header.classList.remove('minimized');
  header.classList.remove('sticky');
  document.body.classList.remove('header-fixed');
  document.body.classList.remove('header-minimized');
  
  // Setup mobile navigation
  setupMobileNavigation();
  
  // FORÇA o scroll da navegação mobile para o INÍCIO ABSOLUTO (posição 0)
  if (isMobile() && tabNavigation) {
    setTimeout(() => {
      tabNavigation.scrollLeft = 0;
      tabNavigation.scrollTo({ left: 0, behavior: 'auto' });
    }, 100);
  }
  
  // Adiciona listener para detectar mudanças de seção
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.attributeName === 'style') {
        const welcomeSection = document.getElementById('welcome');
        if (welcomeSection && welcomeSection.style.display !== 'none') {
          isWelcomePage = true;
          header.classList.remove('minimized');
          header.classList.remove('sticky');
          document.body.classList.remove('header-fixed');
          document.body.classList.remove('header-minimized');
        } else {
          isWelcomePage = false;
        }
      }
    });
  });
  
  // Observa mudanças na seção welcome
  const welcomeSection = document.getElementById('welcome');
  if (welcomeSection) {
    observer.observe(welcomeSection, { attributes: true });
  }
});

// Ajusta comportamento em resize
window.addEventListener('resize', function() {
  if (isWelcomePage) {
    header.classList.remove('minimized');
    header.classList.remove('sticky');
    document.body.classList.remove('header-fixed');
    document.body.classList.remove('header-minimized');
  }
  
  // FORÇA scroll para INÍCIO ABSOLUTO no mobile após resize
  if (isMobile() && tabNavigation) {
    setTimeout(() => {
      tabNavigation.scrollLeft = 0;
      tabNavigation.scrollTo({ left: 0, behavior: 'auto' });
    }, 100);
  }
  
  // Reconfigura navegação mobile se necessário
  setupMobileNavigation();
});

// Adiciona indicador visual de scroll na navegação mobile
if (isMobile()) {
  let scrollTimeout;
  tabNavigation.addEventListener('scroll', function() {
    // Adiciona classe durante scroll
    tabNavigation.classList.add('scrolling');
    
    // Remove após parar de scrollar
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      tabNavigation.classList.remove('scrolling');
    }, 150);
  });
}