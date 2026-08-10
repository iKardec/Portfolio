/**
 * ============================================================================
 * data/portfolio.js - Dados Estáticos do Portfólio
 * ============================================================================
 * Centraliza todo o conteúdo textual e configurável do portfólio.
 * Separar dados da lógica e da apresentação é uma boa prática que facilita
 * manutenção, internacionalização e análise por recrutadores.
 * ============================================================================
 */

// ============================================================================
// INFORMAÇÕES PESSOAIS
// ============================================================================

export const personalInfo = {
  name: 'Alan Kardec',
  fullName: 'Alan Kardec Lima Campos Júnior',
  location: 'Salvador - BA, Brasil',
  github: 'https://github.com/iKardec',
  linkedin: 'https://www.linkedin.com/in/kardecjr',
  email: 'kardec2710@gmail.com',
  whatsapp: 'https://wa.me/5571988396237',
};

// ============================================================================
// SEÇÃO HERO
// ============================================================================

export const heroData = {
  title: 'Alan Kardec',
  subtitle: 'Lima Campos Júnior',
  badges: [
    { label: 'Técnico em Edificações', icon: 'fas fa-building', href: '#engenharia' },
    { label: 'Desenvolvedor Front-End',  icon: 'fas fa-code',     href: '#programacao' },
    { label: 'Atendimento Premium',      icon: 'fas fa-utensils', href: '#experiencia' },
    { label: 'Gestão Administrativa',    icon: 'fas fa-tasks',    href: '#sobre' },
  ],
  ctas: [
    {
      label: 'Currículo Técnico',
      icon: 'fas fa-download',
      href: '/downloads/CURRÍCULO 3 - CIVIL & T.I.pdf',
      download: true,
      variant: 'btn-primary',
    },
    {
      label: 'GitHub',
      icon: 'fab fa-github',
      href: 'https://github.com/iKardec',
      download: false,
      variant: 'btn-outline',
    },
  ],
};

// ============================================================================
// SEÇÃO SOBRE MIM
// ============================================================================

export const sobreData = {
  paragraphs: [
    `Sou um profissional versátil com formação Técnica em Edificações pelo <strong>IFBA</strong> e atualmente
    cursando Bacharelado Interdisciplinar de Ciências e Tecnologia na <strong>UFBA</strong>.`,
    `Minha trajetória me levou por diversas áreas: desde o desenho técnico de projetos estruturais até o
    desenvolvimento de softwares, passando pelo atendimento ao público em restaurantes e bares, sempre buscando
    excelência e aprendizado contínuo.`,
    `Acredito que a versatilidade é meu maior diferencial. Consigo me adaptar rapidamente a novos desafios e
    tecnologias, mantendo sempre uma postura proativa e colaborativa.`,
  ],
  skills: [
    { icon: 'fas fa-graduation-cap', label: 'UFBA - BI Ciências e Tecnologia' },
    { icon: 'fas fa-certificate',    label: 'IFBA - Técnico em Edificações' },
    { icon: 'fas fa-map-marker-alt', label: 'Salvador - BA, Brasil' },
    { icon: 'fas fa-language',       label: 'Português (Nativo) | Inglês (Intermediário)' },
  ],
};

// ============================================================================
// SEÇÃO ENGENHARIA CIVIL
// ============================================================================

export const engenhariaData = {
  experiences: [
    {
      icon: 'fas fa-hard-hat',
      title: 'Lessa Engenharia',
      subtitle: 'Mestre de Obras | 2024',
      body: 'Gestão de obra de restauração de edifício de 4 andares na Pituba. Coordenação de equipe, almoxarifado e diário de obras.',
    },
    {
      icon: 'fas fa-drafting-compass',
      title: 'Tesseract Engenharia',
      subtitle: 'Técnico em Edificações | 2024',
      body: 'Registros cadastrais para SEDUR, revisão de pranchas estruturais e elaboração de planilhas orçamentárias.',
    },
    {
      icon: 'fas fa-pencil-ruler',
      title: 'Paulo Braga Projetos',
      subtitle: 'Estagiário | 2023',
      body: 'Desenho de projetos de formas e armaduras em AutoCAD e TQS. Detalhamento de parque aquático.',
    },
  ],
  competencias: [
    'AutoCAD', 'TQS', 'Projetos Estruturais', 'Detalhamento Técnico',
    'Planilhas Orçamentárias', 'Diário de Obras', 'Gestão de Almoxarifado',
    'Leitura de Projetos', 'Normas Técnicas', 'Redação Técnica',
  ],
  curriculoHref: '/downloads/CURRÍCULO 3 - CIVIL & T.I.pdf',
};

// ============================================================================
// SEÇÃO PROGRAMAÇÃO E T.I
// ============================================================================

export const programacaoData = {
  intro: `Comecei a programar em HTML em 2013, evoluindo para JavaScript e Python. Em 2023, desenvolvi o
    <strong>RFCC</strong>, um software para dimensionamento de fibra de carbono em vigas. Atualmente foco em
    <strong>desenvolvimento Front-End</strong>, criando interfaces modernas e interativas como este portfólio.`,
  tecnologias: [
    { icon: 'fab fa-html5',      title: 'HTML5 & CSS3',   desc: 'Estrutura semântica e estilização avançada' },
    { icon: 'fab fa-js-square',  title: 'JavaScript',      desc: 'Interatividade e aplicações web' },
    { icon: 'fab fa-python',     title: 'Python',          desc: 'Automações e aplicações desktop' },
    { icon: 'fas fa-gamepad',    title: 'GML',             desc: 'Desenvolvimento de jogos indies' },
    { icon: 'fas fa-palette',    title: 'Adobe Suite',     desc: 'Photoshop, Premiere, After Effects' },
  ],
  githubHref: 'https://github.com/iKardec',
};

// ============================================================================
// SEÇÃO EXPERIÊNCIAS DIVERSAS
// ============================================================================

export const experienciaData = {
  experiences: [
    {
      icon: 'fas fa-cocktail',
      title: 'Barman & Coquetelaria',
      subtitle: 'Eventos e Estabelecimentos',
      body: 'Experiência em agências como Gipsy Drinks, eventos sociais e baladas. Conhecimento avançado em mixologia.',
    },
    {
      icon: 'fas fa-fire',
      title: 'Auxiliar de Cozinha',
      subtitle: 'Restaurantes e Confeitarias',
      body: 'Atuação em restaurantes, pizzarias e confeitarias. Vasto conhecimento culinário e alta adaptabilidade.',
    },
    {
      icon: 'fas fa-handshake',
      title: 'Atendimento ao Cliente',
      subtitle: 'Soft Skills Premium',
      body: 'Excelência em relacionamento com clientes, cordialidade e resolução de problemas em tempo real.',
    },
  ],
  adminText: `Capacidade de organização exemplar, cumprimento de prazos e comunicação clara. Proativo na identificação
    de necessidades e melhoria de processos através de planilhas e automações.`,
  adminSkills: [
    'Organização de Documentos', 'Suporte Operacional', 'Gestão de Dados',
    'Comunicação Interna', 'Coordenação de Projetos', 'Gestão de Tempo',
    'Elaboração de Planilhas', 'Automação de Processos',
  ],
  curriculoHref: '/downloads/CURRÍCULO 2 - ATEND. PÚBLICO.pdf',
};

// ============================================================================
// SEÇÃO CONTATO
// ============================================================================

export const contatoData = {
  links: [
    { icon: 'fab fa-github',   label: 'GitHub',    href: 'https://github.com/iKardec' },
    { icon: 'fas fa-envelope', label: 'E-mail',    href: 'mailto:kardec2710@gmail.com' },
    { icon: 'fab fa-linkedin', label: 'LinkedIn',  href: 'https://www.linkedin.com/in/kardecjr' },
    { icon: 'fab fa-whatsapp', label: 'WhatsApp',  href: 'https://wa.me/5571988396237' },
  ],
};

// ============================================================================
// NAVEGAÇÃO LATERAL
// ============================================================================

export const sideNavDots = [
  { section: 'hero',        tooltip: 'Início' },
  { section: 'sobre',       tooltip: 'Sobre Mim' },
  { section: 'engenharia',  tooltip: 'Engenharia' },
  { section: 'programacao', tooltip: 'Programação' },
  { section: 'experiencia', tooltip: 'Experiências' },
  { section: 'contato',     tooltip: 'Contato' },
];
