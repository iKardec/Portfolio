export const personalInfo = {
  name: 'Alan Kardec',
  fullName: 'Alan Kardec Lima Campos Júnior',
  role: 'Desenvolvedor Fullstack Júnior',
  location: 'Salvador - BA, Brasil',
  github: 'https://github.com/iKardec',
  linkedin: 'https://www.linkedin.com/in/kardecjr',
  email: 'kardec2710@gmail.com',
  whatsapp: 'https://wa.me/5571988396237',
  // Currículo único — substitua o arquivo em public/downloads/ mantendo este nome,
  // ou atualize o caminho abaixo se usar outro nome de arquivo.
  curriculoHref: '/downloads/curriculo-alan-kardec-dev.pdf',
};

// ----------------------------------------------------------------------------
// Seção Hero
// ----------------------------------------------------------------------------

export const heroData = {
  title: 'Alan Kardec',
  subtitle: 'Desenvolvedor Fullstack Júnior',
  badges: [
    { label: 'Front-End', icon: 'fas fa-code' },
    { label: 'React & Vite', icon: 'fab fa-react' },
    { label: 'Back-End', icon: 'fas fa-server' },
  ],
  ctas: [
    {
      label: 'Baixar Currículo',
      icon: 'fas fa-download',
      href: personalInfo.curriculoHref,
      download: true,
      variant: 'btn-primary',
    },
    {
      label: 'GitHub',
      icon: 'fab fa-github',
      href: personalInfo.github,
      download: false,
      variant: 'btn-outline',
    },
  ],
};

// ----------------------------------------------------------------------------
// Seção Sobre Mim
// ----------------------------------------------------------------------------

export const sobreData = {
  paragraphs: [
    `Sou desenvolvedor fullstack júnior, atualmente cursando Bacharelado Interdisciplinar
    em Ciência e Tecnologia na <strong>UFBA</strong>.`,
    `Comecei a programar em 2013, evoluindo por HTML, JavaScript e Python até chegar ao
    desenvolvimento web moderno com <strong>React</strong>. Este próprio portfólio é
    construído com React e Vite.`,
    `Gosto de resolver problemas de ponta a ponta: interface, lógica e organização de
    código. Busco constantemente aprender novas ferramentas e boas práticas.`,
  ],
  skills: [
    { icon: 'fas fa-graduation-cap', label: 'UFBA - BI Ciências e Tecnologia' },
    { icon: 'fas fa-map-marker-alt', label: personalInfo.location },
    { icon: 'fas fa-language', label: 'Português (Nativo) | Inglês (Intermediário)' },
  ],
};

// ----------------------------------------------------------------------------
// Seção Programação — stack técnica e projetos
// ----------------------------------------------------------------------------

export const programacaoData = {
  intro: `Foco em <strong>desenvolvimento Front-End</strong> com React, complementado por
    Back-End em Python. Este portfólio foi construído com <strong>React 19 e Vite</strong>,
    a mesma stack listada abaixo.`,
  tecnologias: [
    { icon: 'fab fa-react', title: 'React & Vite', desc: 'Interfaces modernas e componentizadas — usado neste site' },
    { icon: 'fab fa-html5', title: 'HTML5 & CSS3', desc: 'Estrutura semântica e estilização avançada' },
    { icon: 'fab fa-js-square', title: 'JavaScript', desc: 'Interatividade e lógica de aplicações web' },
    { icon: 'fab fa-python', title: 'Python', desc: 'Automações, back-end e aplicações desktop' },
  ],
  // Projetos reais com link e/ou imagem — troque os placeholders pelos seus.
  projetos: [
    {
      title: 'Este Portfólio',
      description: 'Site pessoal construído com React 19 + Vite, com dados centralizados e CSS organizado por responsabilidade.',
      tags: ['React', 'Vite', 'CSS'],
      href: 'https://github.com/iKardec/Portfolio',
      image: null, // adicione um screenshot em src/assets/ e referencie aqui
    },
    {
      title: 'RFCC',
      description: 'Software para dimensionamento de reforço estrutural com fibra de carbono em vigas.',
      tags: ['Python'],
      href: null, // adicione o link do repositório quando disponível
      image: null,
    },
    // Adicione mais projetos aqui seguindo o mesmo formato.
  ],
  githubHref: personalInfo.github,
};

// ----------------------------------------------------------------------------
// Seção Contato
// ----------------------------------------------------------------------------

export const contatoData = {
  links: [
    { icon: 'fab fa-github', label: 'GitHub', href: personalInfo.github },
    { icon: 'fas fa-envelope', label: 'E-mail', href: `mailto:${personalInfo.email}` },
    { icon: 'fab fa-linkedin', label: 'LinkedIn', href: personalInfo.linkedin },
    { icon: 'fab fa-whatsapp', label: 'WhatsApp', href: personalInfo.whatsapp },
  ],
};

// ----------------------------------------------------------------------------
// Navegação lateral
// ----------------------------------------------------------------------------

export const sideNavDots = [
  { section: 'hero', tooltip: 'Início' },
  { section: 'sobre', tooltip: 'Sobre Mim' },
  { section: 'programacao', tooltip: 'Programação' },
  { section: 'contato', tooltip: 'Contato' },
];
