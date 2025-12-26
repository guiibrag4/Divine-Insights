# Visão Geral do Sistema

## Fluxo de Conteúdo
- Origem: markdown em `_posts/{serie}/{serie}-{ordem}-{descricao}.md`.
- Leitura/parse: [src/lib/api.ts](src/lib/api.ts) usa gray-matter para frontmatter e chama `ensureAssetExists` para validar imagens.
- Validação de frontmatter: [src/lib/validation.ts](src/lib/validation.ts) com Zod (campos obrigatórios: `title`, `excerpt`, `date`, `author`, `coverImage`, `ogImage`). Builds falham se inválido.
- Conversão para HTML: [src/lib/markdownToHtml.ts](src/lib/markdownToHtml.ts) com remark + remark-gfm.

## Slugs, Navegação e URLs
- Slugs são caminhos relativos a `_posts/` (ex.: `1joao/1joao-01-capitulo-1`).
- [src/lib/slug.ts](src/lib/slug.ts) é fonte única para URLs: `buildPostHref`, `normalizeSlug`, `parsePostSlug`. Use `buildPostHref` em todos os `Link`.
- Navegação entre capítulos: [src/lib/navigation.ts](src/lib/navigation.ts) extrai prefixo de série via regex `{serie}-{ordem}-{descricao}` e computa anterior/próximo. Arquivos `*-00-indice` são tratados como índice sem navegação.

## Rotas e Páginas
- Home: [src/app/page.tsx](src/app/page.tsx) lista séries do array `studySeries`, usa cards e hero.
- Post: [src/app/posts/[...slug]/page.tsx](src/app/posts/[...slug]/page.tsx) lê `getPostBySlug`, renderiza corpo e `ChapterNavigation`.
- Admin: [src/app/admin/page.tsx](src/app/admin/page.tsx) com ações em [src/app/admin/actions.ts](src/app/admin/actions.ts) se habilitado.

## Componentes (Server por padrão)
- Layout básico: [src/app/layout.tsx](src/app/layout.tsx) define HTML, injeta `NoFOUCScript` para tema e aplica fontes/metadata.
- Estrutura: [src/app/_components/container.tsx](src/app/_components/container.tsx), [header.tsx](src/app/_components/header.tsx), [footer.tsx](src/app/_components/footer.tsx), [section-separator.tsx](src/app/_components/section-separator.tsx).
- Post view: [post-header.tsx](src/app/_components/post-header.tsx) (título/data), [cover-image.tsx](src/app/_components/cover-image.tsx), [post-body.tsx](src/app/_components/post-body.tsx) (prose + GFM), [chapter-navigation.tsx](src/app/_components/chapter-navigation.tsx) (prev/next), [post-title.tsx](src/app/_components/post-title.tsx).
- Listagens/cards: [post-preview.tsx](src/app/_components/post-preview.tsx), [latest-chapter-card.tsx](src/app/_components/latest-chapter-card.tsx), [series-card.tsx](src/app/_components/series-card.tsx), [study-series-grid.tsx](src/app/_components/study-series-grid.tsx), [home-hero.tsx](src/app/_components/home-hero.tsx), [hero-bento.tsx](src/app/_components/hero-bento.tsx), [more-stories.tsx](src/app/_components/more-stories.tsx).
- Utilidades: [avatar.tsx](src/app/_components/avatar.tsx), [alert.tsx](src/app/_components/alert.tsx), [date-formatter.tsx](src/app/_components/date-formatter.tsx), [sticky-sidebar.tsx](src/app/_components/sticky-sidebar.tsx), [series-sidebar.tsx](src/app/_components/series-sidebar.tsx), [series-filters.tsx](src/app/_components/series-filters.tsx), [dynamic-series-index.tsx](src/app/_components/dynamic-series-index.tsx), [sidebar-dynamic-title.tsx](src/app/_components/sidebar-dynamic-title.tsx).
- Tema (único client): [theme-switcher.tsx](src/app/_components/theme-switcher.tsx) alterna `dark`/`light` via classe no `<html>` e localStorage.

## Estilo, Tema e Tokens
- Tailwind em modo `class`; estilos globais em [src/app/globals.css](src/app/globals.css).
- Tokens de cor/gradiente/sombra em [src/lib/theme-constants.ts](src/lib/theme-constants.ts); usar variantes `dark:` nas classes Tailwind.
- Guia de cor Clean (light/dark) com variáveis CSS em [.github/instructions/temas-blog.instructions.md](.github/instructions/temas-blog.instructions.md).
- Tipografia: plugin `@tailwindcss/typography` aplicado em [post-body.tsx](src/app/_components/post-body.tsx) com `prose prose-lg dark:prose-invert`.

## Convenções de Conteúdo
- Pastas por série em `_posts/{serie}`; nomes `{serie}-{ordem:00-99}-{descricao}.md`. `-00-indice` marca índice da série.
- Campos obrigatórios no frontmatter: `title`, `excerpt`, `date`, `author`, `coverImage`, `ogImage`. Imagens devem existir em `/public` ou ser URLs externas.
- `studySeries` em [src/app/page.tsx](src/app/page.tsx) registra metadados (título, status, capítulos, preview) por série.

## Interação entre Partes
- `getAllPosts`/`getPostBySlug` (api.ts) → valida frontmatter/assets → fornece `Post` a páginas/components.
- Links: todos os `Link` que apontam para posts/séries devem usar `buildPostHref` (slug.ts) para consistência.
- Navegação: `ChapterNavigation` depende de slugs bem formados e ordem zero-padded; quebra se padrão não for seguido.
- Tema: `layout.tsx` + `NoFOUCScript` evitam flash; `theme-switcher` ajusta classe `dark` e respeita `THEME_DEFAULT` em `theme-constants`.

## Scripts e Configuração
- Tailwind config em [tailwind.config.ts](tailwind.config.ts); Next 16/Turbopack em [next.config.js](next.config.js); tsconfig com alias `@/*`.
- Scripts auxiliares em `/scripts` (migrações, contagem de capítulos) e documentação de setup em `/docs`.

## Checkpoints Rápidos
- Sempre adicionar `-00-indice` por série.
- Sempre usar `buildPostHref` em cards/links.
- Conferir assets de `coverImage` e `author.picture` em `/public`.
- Não remover `remark-gfm` ou `@tailwindcss/typography`.
