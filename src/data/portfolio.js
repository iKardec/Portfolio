import portfolioPrint from '../assets/portfolio_print.webp';
import jericoPrint from '../assets/landing_jerico_print.webp';
import daycountPrint from '../assets/daycount_print.webp';

export const personalInfo = {
  name: 'Alan Kardec',
  fullName: 'Alan Kardec Lima Campos Júnior',
  role: 'Desenvolvedor Fullstack',
  location: 'Salvador - BA, Brasil',
  github: 'https://github.com/iKardec',
  linkedin: 'https://www.linkedin.com/in/kardecjr',
  email: 'kardec2710@gmail.com',
  whatsapp: 'https://wa.me/5571988396237',
  curriculoHref: '/downloads/curriculo-alan-kardec-dev.pdf',
};

export const heroData = {
  title: 'Alan Kardec',
  subtitle: 'Desenvolvedor Fullstack',
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

export const sobreData = {
  paragraphs: [
    `Sou desenvolvedor fullstack com foco em front-end, atualmente cursando Bacharelado Interdisciplinar
    em Ciência e Tecnologia na <strong>UFBA</strong>.`,
    `Comecei a programar em 2025, evoluindo por HTML, JavaScript, Python e Java até chegar ao
    desenvolvimento web moderno com <strong>React e Angular</strong>.`,
    `Gosto de resolver problemas de ponta a ponta: interface, lógica e organização de
    código. Busco constantemente aprender novas ferramentas e boas práticas.`,
  ],
  skills: [
    { icon: 'fas fa-graduation-cap', label: 'UFBA - BI Ciências e Tecnologia' },
    { icon: 'fas fa-map-marker-alt', label: personalInfo.location },
    { icon: 'fas fa-language', label: 'Português (Nativo) | Inglês (Intermediário)' },
  ],
};

export const programacaoData = {
  intro: `Foco em <strong>desenvolvimento Front-End</strong> com React, complementado por
    <strong>Back-End em Java </strong>. Este portfólio foi construído com <strong>React 19 e Vite</strong>,
    a mesma stack listada abaixo.`,
  tecnologias: [
    { icon: 'fab fa-react', title: 'React & Vite', desc: 'Interfaces modernas e componentizadas' },
    { icon: 'fab fa-angular', title: 'Angular', desc: 'Aplicações web escaláveis e componentizadas' },
    { icon: 'fab fa-html5', title: 'HTML5 & CSS3', desc: 'Estrutura semântica e estilização avançada' },
    { icon: 'fab fa-sass', title: 'SCSS', desc: 'Estilização modular, reutilizável e organizada' },
    { icon: 'fab fa-js-square', title: 'JavaScript', desc: 'Interatividade e lógica de aplicações web' },
    { icon: 'fas fa-code', title: 'TypeScript', desc: 'Tipagem estática e desenvolvimento web escalável' },
    { icon: 'fa-solid fa-database', title: 'SQL', desc: 'Banco de dados e querries' },
    { icon: 'fab fa-python', title: 'Python', desc: 'Automações, back-end e aplicações desktop' },
    { icon: 'fab fa-java', title: 'Java', desc: 'APIs, back-end e sistemas' }

  ],
  projetos: [
    {
      title: 'Este Portfólio',
      description: 'Site pessoal construído com React + Vite',
      tags: ['React', 'Vite', 'CSS'],
      href: 'https://github.com/iKardec/Portfolio',
      image: portfolioPrint,
    },
    {
      title: 'Landing Page',
      description: 'Landing page desenvolvida para um sistema corporativo, com foco em interface, responsividade e experiência do usuário',
      tags: ['Vanilla', 'HTML', 'CSS'],
      image: jericoPrint,
    },
        {
      title: 'DayCount',
      description: 'Uma aplicação web desenvolvida para acompanhar a quantidade de dias de forma organizada',
      tags: ['React', 'LocalStorage', 'CSS'],
      href: 'https://ikardec.github.io/Day-Count/',
      image: daycountPrint,
    },
      {
      title: 'CryptoTracker',
      description: 'Um site web para acompanhar preços e variações de criptomoedas',
      tags: ['Angular', 'Consumo de API', 'SCSS'],
      href: 'https://ikardec.github.io/CryptoTracker/',
      image: '',
    },
  ],
  githubHref: personalInfo.github,
};

export const contatoData = {
  links: [
    { icon: 'fab fa-github', label: 'GitHub', href: personalInfo.github },
    { icon: 'fas fa-envelope', label: 'E-mail', href: `mailto:${personalInfo.email}` },
    { icon: 'fab fa-linkedin', label: 'LinkedIn', href: personalInfo.linkedin },
    { icon: 'fab fa-whatsapp', label: 'WhatsApp', href: personalInfo.whatsapp },
  ],
};

export const sideNavDots = [
  { section: 'hero', tooltip: 'Início' },
  { section: 'sobre', tooltip: 'Sobre Mim' },
  { section: 'programacao', tooltip: 'Programação' },
  { section: 'contato', tooltip: 'Contato' },
];