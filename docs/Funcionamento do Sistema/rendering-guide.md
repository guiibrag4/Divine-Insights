# Guia de Renderização: Home e Páginas de Estudo

## 1. Renderização da Home

### Arquivo Principal
**Local**: [src/app/page.tsx](../src/app/page.tsx)

Esse arquivo é o responsável por:
- Buscar todos os posts e séries
- Renderizar a estrutura geral da home
- Orquestrar os componentes principais

### Componentes Utilizados (em ordem de renderização)

| Componente | Arquivo | Função |
|-----------|---------|--------|
| `Header` | [src/app/_components/header.tsx](../src/app/_components/header.tsx) | Menu de navegação topo |
| `HomeHero` | [src/app/_components/home-hero.tsx](../src/app/_components/home-hero.tsx) | Seção hero com CTAs |
| `LatestChapterCard` | [src/app/_components/latest-chapter-card.tsx](../src/app/_components/latest-chapter-card.tsx) | Card do post mais recente |
| `SeriesFilters` | [src/app/_components/series-filters.tsx](../src/app/_components/series-filters.tsx) | Filtros de série |
| `StudySeriesGrid` | [src/app/_components/study-series-grid.tsx](../src/app/_components/study-series-grid.tsx) | Grid de séries |
| `Footer` | [src/app/_components/footer.tsx](../src/app/_components/footer.tsx) | Rodapé (via layout) |

### Modificações Comuns na Home

#### Alterar a ordem dos componentes
**O quê**: Mudar qual seção aparece primeiro na home.
**Onde mexer**: [src/app/page.tsx](../src/app/page.tsx) - reordene as linhas de renderização.

**Exemplo**: Se quiser que `StudySeriesGrid` apareça antes de `LatestChapterCard`:
```tsx
// De:
<HomeHero />
<LatestChapterCard />
<StudySeriesGrid />

// Para:
<HomeHero />
<StudySeriesGrid />
<LatestChapterCard />
```

#### Adicionar ou remover uma seção
**O quê**: Incluir novo componente ou remover seção existente.
**Onde mexer**: [src/app/page.tsx](../src/app/page.tsx)

**Exemplos**:
- Remover `SeriesFilters`: delete a linha `<SeriesFilters />`
- Adicionar nova seção: importe o componente e adicione uma linha `<MeuComponente />`

#### Modificar textos, cores ou padding
**O quê**: Ajustar espaçamento, cores de fundo ou textos da home.
**Onde mexer**: Em cada componente individual:
- Textos → edite o arquivo do componente
- Cores → use variantes `dark:` do Tailwind em [src/lib/theme-constants.ts](../src/lib/theme-constants.ts)
- Padding/margem → altere as classes Tailwind (`px-5`, `py-10`, etc.) no componente

---

## 2. Renderização das Páginas de Estudo (Posts)

### Arquivo Principal
**Local**: [src/app/posts/[...slug]/page.tsx](../src/app/posts/[...slug]/page.tsx)

Esse arquivo é o responsável por:
- Receber dinamicamente o slug do post (URL)
- Buscar dados do markdown
- Renderizar a estrutura completa do post
- Detectar se é página de índice (`-00-indice`)

### Seções Renderizadas

| Seção | Arquivo | Função |
|-------|---------|--------|
| **Header** | [src/app/_components/header.tsx](../src/app/_components/header.tsx) | Menu topo |
| **Hero/Metadata** | [src/app/posts/[...slug]/page.tsx](../src/app/posts/[...slug]/page.tsx) (inline) | Título, série, data, tempo leitura, autor |
| **Imagem de Capa** | [src/app/_components/cover-image.tsx](../src/app/_components/cover-image.tsx) | Imagem de destaque |
| **Corpo do Post** | [src/app/_components/post-body.tsx](../src/app/_components/post-body.tsx) | Conteúdo markdown renderizado |
| **Navegação Capítulos** | [src/app/_components/chapter-navigation.tsx](../src/app/_components/chapter-navigation.tsx) | Botões anterior/próximo |
| **Sidebar** | [src/app/_components/series-sidebar.tsx](../src/app/_components/series-sidebar.tsx) | Índice da série (opcional) |

### Modificações Comuns nos Posts

#### 1. Modificar Layout Geral (Hero Split, sidebar posição, etc)

**O quê**: Mudar onde fica o título, imagem de capa, onde aparece a sidebar.
**Onde mexer**: [src/app/posts/[...slug]/page.tsx](../src/app/posts/[...slug]/page.tsx)

**Layout atual** (resumido):
```tsx
<main>
  <Container>
    <Header />
    
    <article>
      {/* Hero section com título + metadata */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          {/* Título e metadata */}
        </div>
        <div className="lg:col-span-5">
          {/* Imagem de capa */}
        </div>
      </div>
      
      {/* Corpo do post + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8">
          {/* PostBody */}
        </div>
        <div className="lg:col-span-4">
          {/* Sidebar */}
        </div>
      </div>
      
      {/* Navegação prev/next */}
      <ChapterNavigation />
    </article>
  </Container>
</main>
```

**Para modificar**:
- **Mudar proporção hero** (ex: 7/5 para 6/6): altere `lg:col-span-7` e `lg:col-span-5`
- **Remover sidebar**: delete a `<div className="lg:col-span-4">` com `SeriesSidebar`
- **Mover sidebar para cima**: recorte o `<SeriesSidebar />` e cole antes do `<PostBody />`
- **Fazer sidebar full-width**: altere o grid para `lg:col-span-12` no div da sidebar
- **Remover hero section**: delete o primeiro `<div className="grid...">` que contém título e imagem

#### 2. Modificar Proporção ou Tamanho da Imagem de Capa

**O quê**: A imagem está grande demais, pequena demais, ou quer ajustar aspect ratio.
**Onde mexer**: [src/app/_components/cover-image.tsx](../src/app/_components/cover-image.tsx)

**O que fazer**:
- **Altura**: procure por `h-96` ou similar e altere para `h-64` (menor) ou `h-full` (maior)
- **Largura**: altere `w-full` ou remova constraint
- **Aspect ratio**: altere `aspect-video` ou `aspect-square` (se existir)
- **Bordas**: procure por `rounded-` e altere valor (ou remova)

**Exemplo**:
```tsx
// De:
<Image
  src={src}
  alt={title}
  className="h-96 w-full object-cover rounded-lg"
/>

// Para:
<Image
  src={src}
  alt={title}
  className="h-64 w-full object-cover rounded-none"
/>
```

#### 3. Modificar Espaçamento, Cores ou Tipografia do Hero

**O quê**: Título maior/menor, metadata com cores diferentes, espaçamento diferente.
**Onde mexer**: [src/app/posts/[...slug]/page.tsx](../src/app/posts/[...slug]/page.tsx) - seção "NOVO HERO SECTION"

**O que fazer**:
- **Tamanho do título**: altere `text-4xl md:text-5xl lg:text-6xl` para valores menores/maiores
- **Cor do título**: altere `text-stone-900 dark:text-stone-100` para outra cor
- **Tamanho da série/metadata**: altere `text-sm` ou `text-base`
- **Espaçamento**: altere `mb-6`, `pt-8`, `px-5` para valores diferentes
- **Background do hero**: altere `from-transparent to-stone-50/50` em `bg-gradient-to-b`

#### 4. Modificar Corpo do Post (PostBody)

**O quê**: Mudar cor do texto, tamanho de fonte, estilo das tabelas/listas.
**Onde mexer**: [src/app/_components/post-body.tsx](../src/app/_components/post-body.tsx)

**O que fazer**:
- **Cor/tamanho texto**: altere as classes `prose-lg`, `text-stone-900`, `dark:text-stone-100`
- **Estilo markdown** (tabelas, código, blockquotes): edite ou estenda a classe `prose` com variantes `prose-{elemento}:{style}`
- **Largura máxima**: altere `max-w-5xl` para mais/menos largo
- **Alinhamento**: `text-justify` alinha em português; altere para `text-left` se desejar

#### 5. Modificar Sidebar

**O quê**: Remover, redesenhar, mudar cor/tamanho da sidebar.
**Onde mexer**: [src/app/_components/series-sidebar.tsx](../src/app/_components/series-sidebar.tsx)

**O que fazer**:
- **Remover sidebar inteira**: na página do post `[...slug]/page.tsx`, delete o `<SeriesSidebar />`
- **Mudar aparência**: edite cores, padding, estilo dos itens em [src/app/_components/series-sidebar.tsx](../src/app/_components/series-sidebar.tsx)
- **Mudar posição**: em `[...slug]/page.tsx`, altere `lg:col-span-4` para `lg:col-span-12` (full-width) ou remova o grid
- **Fazer sticky**: procure por `sticky top-20` em `[src/app/_components/sticky-sidebar.tsx](../src/app/_components/sticky-sidebar.tsx)` e ajuste

#### 6. Modificar Navegação de Capítulos (Anterior/Próximo)

**O quê**: Mudar visual dos botões, remover, redesenhar.
**Onde mexer**: [src/app/_components/chapter-navigation.tsx](../src/app/_components/chapter-navigation.tsx)

**O que fazer**:
- **Remover**: em `[...slug]/page.tsx`, delete `<ChapterNavigation />`
- **Cores dos botões**: altere `bg-blue-600`, `text-white`, etc.
- **Tamanho/padding**: altere `px-6 py-3` ou `text-lg`
- **Layout**: altere de `grid grid-cols-2` para `flex justify-between` ou outro

---

## 3. Páginas de Índice de Série

### Arquivo Principal
**Local**: [src/app/_components/dynamic-series-index.tsx](../src/app/_components/dynamic-series-index.tsx)

Renderizada quando o post é nomeado `*-00-indice.md`.

**O que fazer se quiser modificar**:
- **Layout**: edite a estrutura de cards/listas
- **Estilos**: altere cores, tipografia
- **Listar capítulos**: modifique como aparecem os links dos capítulos

---

## 4. Mapa Prático: Por Elemento Visual

### Se quiser mudar...

| Elemento | Arquivo | Tipo de Mudança |
|----------|---------|-----------------|
| **Todos os títulos (site)** | [src/app/globals.css](../src/app/globals.css) | CSS global |
| **Cores gerais** | [src/lib/theme-constants.ts](../src/lib/theme-constants.ts) | Variáveis CSS/tokens |
| **Menu superior** | [src/app/_components/header.tsx](../src/app/_components/header.tsx) | Componente |
| **Rodapé** | [src/app/_components/footer.tsx](../src/app/_components/footer.tsx) | Componente |
| **Hero da home** | [src/app/_components/home-hero.tsx](../src/app/_components/home-hero.tsx) | Componente |
| **Cards de série** | [src/app/_components/series-card.tsx](../src/app/_components/series-card.tsx) | Componente |
| **Grid de séries** | [src/app/_components/study-series-grid.tsx](../src/app/_components/study-series-grid.tsx) | Componente |
| **Post: Título/metadata** | [src/app/posts/[...slug]/page.tsx](../src/app/posts/[...slug]/page.tsx) | Layout página |
| **Post: Imagem capa** | [src/app/_components/cover-image.tsx](../src/app/_components/cover-image.tsx) | Componente |
| **Post: Corpo (markdown)** | [src/app/_components/post-body.tsx](../src/app/_components/post-body.tsx) | Componente |
| **Post: Sidebar** | [src/app/_components/series-sidebar.tsx](../src/app/_components/series-sidebar.tsx) | Componente |
| **Post: Nav prev/next** | [src/app/_components/chapter-navigation.tsx](../src/app/_components/chapter-navigation.tsx) | Componente |
| **Tema (dark/light)** | [src/app/_components/theme-switcher.tsx](../src/app/_components/theme-switcher.tsx) | Client component |

---

## 5. Processo Passo-a-Passo: Exemplo Real

### Cenário: Aumentar tamanho da imagem de capa e remover sidebar

1. Abra [src/app/posts/[...slug]/page.tsx](../src/app/posts/[...slug]/page.tsx)
2. Procure pela seção `grid grid-cols-1 lg:grid-cols-12 gap-10` que contém `PostBody` e sidebar
3. Altere `lg:col-span-8` (corpo) para `lg:col-span-12` (full-width)
4. Delete o `<div className="lg:col-span-4">` que contém `<SeriesSidebar />`
5. Procure pela imagem de capa (em `CoverImage`)
6. Abra [src/app/_components/cover-image.tsx](../src/app/_components/cover-image.tsx)
7. Aumente `h-96` para `h-screen` ou outro valor desejado
8. Salve e teste no navegador (dev mode: `npm run dev`)

---

## 6. Dicas Importantes

- **Classes Tailwind**: Use `px-5 md:px-8 lg:px-12` para responsividade
- **Dark mode**: Sempre use variante `dark:` (ex: `bg-white dark:bg-slate-900`)
- **Layout responsivo**: Teste em mobile/tablet/desktop ao fazer mudanças
- **Rebuild posts**: Se mudou algo que afeta parsing (não é o caso aqui), rode `npm run build`
- **Hot reload**: Dev server (`npm run dev`) recarrega automático ao salvar componente
- **Proporções imagem**: Ajuste `aspect-video` ou altura em [cover-image.tsx](../src/app/_components/cover-image.tsx)

---

## 7. Estrutura de Pastas Resumida

```
src/app/
  page.tsx                          ← Home principal
  layout.tsx                        ← Layout global
  posts/[...slug]/page.tsx          ← Página dinâmica de posts
  _components/
    ├── header.tsx                  ← Menu topo
    ├── footer.tsx                  ← Rodapé
    ├── home-hero.tsx               ← Hero home
    ├── series-card.tsx             ← Card série
    ├── study-series-grid.tsx       ← Grid de séries
    ├── latest-chapter-card.tsx     ← Último post
    ├── cover-image.tsx             ← Imagem capa
    ├── post-body.tsx               ← Conteúdo markdown
    ├── chapter-navigation.tsx      ← Nav prev/next
    ├── series-sidebar.tsx          ← Sidebar índice
    └── theme-switcher.tsx          ← Toggle dark/light

src/lib/
  ├── api.ts                        ← Lê posts (não editar renderização)
  ├── theme-constants.ts            ← Tokens de cor/tema
  └── navigation.ts                 ← Calcula prev/next (não editar renderização)
```
