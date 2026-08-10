# Portfólio — Alan Kardec

Portfólio pessoal de Alan Kardec Lima Campos Júnior, **Desenvolvedor Fullstack Júnior**, desenvolvido em React 19 + Vite. Site de página única com apresentação, stack técnica, projetos e contato.

## Tecnologias

- React 19
- Vite 8
- CSS vanilla organizado por responsabilidade (sem framework de CSS)
- ESLint para análise estática
- Font Awesome e Google Fonts (Space Grotesk + Inter)

## Como executar

Pré-requisito: Node.js 20 ou superior.

```bash
npm ci
npm run dev
```

O servidor de desenvolvimento informará a URL local. Para gerar a versão de produção:

```bash
npm run lint
npm run build
npm run preview
```

## Estrutura do projeto

```
src/
├── assets/          # Imagens importadas pelos componentes
├── components/       # Componentes de UI reutilizáveis (nav, cards, seções auxiliares)
├── data/portfolio.js # Todo o conteúdo e links do site — edite aqui para atualizar textos
├── hooks/             # Efeitos React (revelação ao rolar a página)
├── sections/          # Hero, Sobre, Programação, Contato
├── styles/            # CSS em base, components e sections
├── App.jsx            # Composição da página
└── main.jsx           # Ponto de entrada React

public/
├── downloads/          # Currículo em PDF disponibilizado ao visitante
├── favicon.ico
├── og-image.jpg         # Imagem de preview ao compartilhar o link
├── robots.txt
└── sitemap.xml
```

## Decisões de arquitetura

- Todo o conteúdo (textos, links, dados de projetos) está centralizado em `src/data/portfolio.js`, separado da renderização — para atualizar o portfólio, normalmente basta editar esse arquivo.
- `src/components/` não é mais dividido em subpastas `ui/`/`layout/`: com poucos componentes, uma pasta única é mais rápida de escanear.
- `src/styles/` foi consolidado em 3 arquivos (`base.css`, `components.css`, `sections.css`) em vez de várias subpastas — a cascata é `base` → `components` → `sections`.
- O efeito visual assinatura é o `.glass-card` (superfície translúcida com `backdrop-filter`), usado em cards e na navegação lateral, seguindo uma estética minimalista com toque "Aero" (vidro, um único acento de azul, bastante espaço em branco).
- A revelação de elementos ao rolar a página usa um único hook (`useScrollReveal`), respeitando `prefers-reduced-motion`.

## Atualizando o currículo

O botão "Baixar Currículo" do Hero aponta para um único arquivo, referenciado em `personalInfo.curriculoHref` (`src/data/portfolio.js`). Para trocar o currículo:

1. Substitua o arquivo em `public/downloads/curriculo-alan-kardec-dev.pdf` pelo PDF atualizado, mantendo o mesmo nome — **ou**
2. Salve o novo arquivo com outro nome e atualize `curriculoHref` em `src/data/portfolio.js` de acordo.

## Adicionando projetos

Projetos exibidos na seção "Programação" vêm do array `programacaoData.projetos` em `src/data/portfolio.js`. Cada item aceita `title`, `description`, `tags`, `href` (link do repositório/deploy) e `image` (screenshot, opcional — coloque o arquivo em `src/assets/` e importe-o antes de referenciar aqui).

## Scripts disponíveis

| Comando           | Finalidade                                     |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Inicia o servidor de desenvolvimento com HMR.   |
| `npm run build`   | Gera os arquivos otimizados em `dist/`.         |
| `npm run preview` | Serve localmente o build de produção.           |
| `npm run lint`    | Verifica erros e padrões de código com ESLint.  |

## Antes de publicar

- Substitua `https://SEU-DOMINIO-AQUI/` em `index.html`, `public/robots.txt` e `public/sitemap.xml` pelo domínio real do site.
- Substitua `public/downloads/curriculo-alan-kardec-dev.pdf` (placeholder) pelo currículo real.
- Substitua `public/og-image.jpg` por uma imagem definitiva de preview, se desejar uma diferente da foto de perfil.
