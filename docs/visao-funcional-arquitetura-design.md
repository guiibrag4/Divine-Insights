# Visão Geral: Funcionalidade, Rotas, Arquitetura e Design

## 1) Funcionalidade Atual
- **CMS baseado em arquivos**: Conteúdo em Markdown dentro de `_posts/{serie}/`, parseado com `gray-matter` e renderizado via `remark` + `remark-gfm` para suportar GFM (tabelas, tasklists, strikethrough).
- **Rotas SSG**: `generateStaticParams()` gera páginas estáticas para cada slug; `markdownToHtml` converte para HTML antes do render (Server Components).
- **Navegação inteligente entre capítulos**: `getChapterNavigation()` identifica índice (`*-00-indice`) e prev/next por padrão `{serie}-{ordem}-{descricao}.md`.
- **Tema e UI**: Tailwind com modo escuro (`class`), script anti-FOUC, tipografia via `@tailwindcss/typography`; componentes server-first em `src/app/_components` (apenas `theme-switcher` é client).
- **Localização**: Todo o texto em PT-BR; datas com `date-fns`; HTML com `lang="pt"`.
- **Deploy**: Next.js 16/Turbopack, build estático otimizado para Vercel.

## 2) Navegação de Rotas (Visão Geral)
- `/` (Home): hero + grid de séries (`StudySeriesGrid`), card do último capítulo, filtros.
- `/posts/[...slug]`: páginas de capítulos e índices de séries. Exemplos: `/posts/1joao/1joao-00-indice`, `/posts/1joao/1joao-01-capitulo-1`, `/posts/1joao/1joao-02-capitulo-2`.
- Slug = caminho relativo em `_posts/`: `serie/arquivo-sem-extensao`.
- Índices de série usam sufixo `-00-indice` (sem navegação prev/next); capítulos usam ordem zero-padded `01..99` para navegação correta.

## 3) Otimizações de Arquitetura (sugeridas)
- **Normalizar slugs na camada de dados**: expor sempre `seriesPath` e `fileSlug` para reduzir regex em `navigation.ts` e links de componentes.
- **Cache leve de frontmatter**: memoizar `getAllPosts()` em build/dev para evitar IO repetido; usar um mapa `{slug -> post}`.
- **Validação de frontmatter**: esquema zod para garantir campos obrigatórios (title, excerpt, date, coverImage, author.name/picture), evitando build quebrar tarde.
- **Configuração Turbopack root**: definir `turbopack: { root: __dirname }` no `next.config.js` ou remover lockfile duplicado fora do repo, silenciando warning de raiz inferida.
- **Checagem de assets**: criar helper para validar se `coverImage` existe em `/public/` durante build (falha rápida).
- **Gerador de rotas**: util único `buildPostHref(slug)` para padronizar `/posts/${slug}` e evitar divergências em componentes/markdown.

## 4) Recomendações de Design (Dribbble, Behance, CollectUI)
- **Tipografia editorial**: usar contraste forte (Título serif display + corpo sans humanista). Ex.: Título com peso 700 e espaçamento apertado; corpo 18–20px com altura de linha 1.7 para leitura longa.
- **Paleta coesa**: base neutra (stone/sand) com acentos azuis profundos e detalhes roxo-indigo sutis. Gradientes discretos em CTAs, fundos sólidos em cards.
- **Cartões de série**: inspiração em dashboards minimalistas (CollectUI): capas com overlay + badge de status; microanimações de hover (elevação, leve escala <1.02).
- **Hero e destaques**: blocos assimétricos e grids fragmentados (Behance cases de editorial/digital magazine); manter espaçamento generoso e ritmo vertical consistente.
- **Leitura de capítulos**: largura de coluna confortável (~70–80 chars), margens laterais largas em desktop; para mobile, blocos com respiro e navegação fixa simplificada.
- **Acessibilidade e foco**: estados de foco visíveis nos botões/links; contraste AA mínimo; ícones auxiliares apenas onde agregam sem poluir.
- **Microcopy em PT-BR**: manter tom pastoral e direto; utilizar chamadas claras nos CTAs ("Continuar estudo", "Ir ao índice").

## 5) Adaptações Específicas — Livro de Tiago
- **Estrutura de série**: pasta `_posts/tiago/` seguindo padrão `{serie}-{ordem}-{descricao}.md` (ex.: `tiago-00-indice`, `tiago-01-fe-e-obras`).
- **Temas recorrentes**: fé e obras, domínio da língua, sabedoria prática, justiça e cuidado dos necessitados. Destacar estes tópicos nos cards e no índice.
- **Componentes visuais**: usar badges temáticos ("Sabedoria", "Prática", "Fé Viva"); ícones leves para seções práticas.
- **Navegação contextual**: índice com âncoras para seções temáticas; prev/next mantendo ordem teológica (ex.: provar a fé → controlar a língua → prática comunitária).

## 6) Proposta de Interface Administrativa (GUI) para Novos Estudos
**Objetivo**: Administradores adicionarem estudos com múltiplos tópicos e múltiplos blocos de corpo.

### Funcionalidades
- Criar/editar série (slug da série, título, descrição, status, capa, data de última atualização).
- Adicionar capítulos com:
  - Título
  - Tópicos (lista de strings)
  - Corpos de texto (múltiplos blocos rich-text/markdown)
  - Metadados: excerpt, coverImage, data, autor
- Pré-visualização em tempo real (markdown + GFM), com tema claro/escuro.
- Validação de slug/padrão `{serie}-{ordem}-{descricao}` e número sequencial.
- Upload/seleção de capas de `/public/assets/blog/...` (com validação de existência).

### UX e Layout
- Layout em duas colunas: formulário à esquerda, preview sticky à direita (inspiração em editores Behance/Dribbble de estudos de caso).
- Navegação lateral com seções: "Série", "Capítulo", "Preview".
- Controles de bloco: adicionar/remover/ordenar tópicos e blocos de corpo (drag-and-drop leve).
- CTA primário destacado (gradiente azul-indigo), secundário neutro.

### Fluxo de Dados (sugerido)
- Persistir em filesystem mantendo padrão `_posts/{serie}/`; cada capítulo gera um .md com frontmatter enriquecido (tópicos, blocos numerados).
- Builder server-side normaliza slug e preenche ordem zero-padded.
- Opcional: camada de validação (zod) antes de escrever arquivos; testes unitários para o gerador.

## 7) Próximos Passos Recomendados
- Adicionar helper de slug/href único para todos os componentes e markdowns.
- Implementar validação de frontmatter + assets na build para falhas rápidas.
- Definir tipografia e paleta finais (tokens Tailwind) e aplicá-las aos principais componentes.
- Criar a série "Tiago" seguindo o padrão de pastas e frontmatter acima.
- Planejar a GUI administrativa (protótipo low-fidelity primeiro) e integrar gradualmente ao pipeline de geração de markdown.
