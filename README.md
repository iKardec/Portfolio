# Portfólio — Alan Kardec

Portfólio profissional de Alan Kardec Lima Campos Júnior, desenvolvido em React. O projeto apresenta experiências em engenharia civil, desenvolvimento front-end, atendimento e gestão administrativa.

## Tecnologias

- React 19
- Vite 8
- CSS vanilla organizado por responsabilidade
- ESLint para análise estática
- Font Awesome e Google Fonts

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

```text
src/
├── assets/                 # Imagens importadas pelos componentes
├── components/
│   ├── layout/             # Elementos estruturais, como navegação e rodapé
│   └── ui/                 # Componentes visuais reutilizáveis
├── data/portfolio.js       # Conteúdo e links centralizados
├── hooks/                  # Efeitos React: partículas, tilt e scroll reveal
├── sections/               # Seções de domínio do portfólio
├── styles/                 # CSS em base, layout, components e sections
├── utils/                  # Funções e classes independentes de React
├── App.jsx                 # Composição da página
└── main.jsx                # Ponto de entrada React

public/
├── downloads/              # Currículos disponibilizados ao visitante
└── img/                    # Favicon e outros arquivos estáticos

BASE/                       # Implementação estática original, preservada como referência
```

## Decisões de arquitetura

- O conteúdo do currículo está em `src/data/portfolio.js`, separado da renderização para facilitar manutenção e revisão.
- Os componentes de interface são pequenos e reutilizáveis; as seções apenas compõem dados e componentes.
- Os estilos seguem uma cascata previsível: `base` → `layout` → `components` → `sections` → `animations` → `responsive`.
- Efeitos que interagem com o DOM foram encapsulados em hooks e possuem limpeza ao desmontar o componente.
- A pasta `BASE/` não participa do build nem do lint; ela conserva a fonte da migração.

## Scripts disponíveis

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento com HMR. |
| `npm run build` | Gera os arquivos otimizados em `dist/`. |
| `npm run preview` | Serve localmente o build de produção. |
| `npm run lint` | Verifica erros e padrões de código com ESLint. |

## Manutenção

Para atualizar textos, experiências, contatos ou links, edite apenas `src/data/portfolio.js`. Para criar uma nova área, adicione uma seção em `src/sections/`, mantenha o CSS específico em `src/styles/sections/` e componha-a em `src/App.jsx`.
